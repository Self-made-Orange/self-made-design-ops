#!/usr/bin/env node
/**
 * check-sources.mjs — systems/*.md 의 source: 필드에 박힌 버전이 최신인지 확인합니다.
 *
 * 이 코퍼스는 토큰 실값을 기록합니다. 값은 링크와 달리 스스로 갱신되지 않으므로,
 * 낡은 값은 링크 목록보다 위험합니다 — 열어보지 않고 그대로 믿게 됩니다.
 * 그래서 각 항목의 source: 에 패키지 버전을 박아 두고, 이 스크립트로 대조합니다.
 *
 * 사용법:
 *   node check-sources.mjs                 사람이 읽는 표
 *   node check-sources.mjs --json          기계 판독용
 *   node check-sources.mjs --strict        낡은 항목이 있으면 exit 1 (CI용)
 *   node check-sources.mjs --only=npm      특정 소스 종류만
 *   node check-sources.mjs --write-report  freshness.md 갱신 (보고서는 항상 영어)
 *
 * 화면 출력 언어는 기본 영어이고 `--lang=ko`로 한국어입니다 (`tools/cli-i18n.mjs`).
 *
 * 의존성 없음. Node 18+ / Bun.
 *
 * 확인되는 것 / 안 되는 것:
 *   npm     → registry.npmjs.org 로 최신 버전 대조 (자동)
 *   github  → 커밋 핀에 '최신 버전' 개념이 없어 수동. api.github.com 접근 가능
 *             여부는 세션에 따라 다릅니다 (HARVESTING.md 머리말 참조)
 *   figma   → 킷 버전이 API로 노출되지 않음. 수동
 *   web     → 문서 사이트. 프록시 차단 + 버전 개념 없음. 수동
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARGV, messages } from '../tools/cli-i18n.mjs';

/** 화면에 나가는 문장. 기본 영어, `--lang=ko`로 한국어 (`tools/cli-i18n.mjs`).
 *  `--write-report`가 쓰는 freshness.md는 **커밋되는 문서**라 언제나 영어입니다 —
 *  로케일을 따라가면 언어를 바꿀 때마다 저장소 문서가 갈아엎어집니다. */
const M = messages({
  en: {
    title: '  Source freshness — checking the source: field in systems/*.md',
    lookupFailed: (d) => `lookup failed: ${d ?? 'package not identified'}`,
    manual: (kind) => `${kind} — check by hand`,
    summary: (s) =>
      `  ${s.checked} checked · ${s.current} current · ` +
      `${s.outdated} outdated (major ${s.major} / minor ${s.minor} / patch ${s.patch}) · ` +
      `${s.manual} manual · ${s.error} failed`,
    reharvest:
      '  Re-harvest the outdated, majors first. If a value changed, fix the document with it.',
    figmaNote:
      '  Figma kits do not expose a version over the API. Look at the community file\'s Change Log page:',
    notRecorded: 'not recorded',
    reportWritten: '  freshness.md updated\n',
  },
  ko: {
    title: '  소스 신선도 — systems/*.md 의 source: 필드 대조',
    lookupFailed: (d) => `조회 실패: ${d ?? '패키지 미특정'}`,
    manual: (kind) => `${kind} — 수동 확인`,
    summary: (s) =>
      `  총 ${s.checked}건 · 최신 ${s.current} · ` +
      `낡음 ${s.outdated} (major ${s.major} / minor ${s.minor} / patch ${s.patch}) · ` +
      `수동 ${s.manual} · 실패 ${s.error}`,
    reharvest: '  낡은 항목 재수집 순서 — major 부터. 값이 바뀌었으면 문서도 함께 고칩니다.',
    figmaNote:
      '  Figma 킷은 버전이 API로 노출되지 않습니다. 커뮤니티 파일의 Change Log 페이지를 보세요:',
    notRecorded: '미기재',
    reportWritten: '  freshness.md 갱신됨\n',
  },
});

const HERE = dirname(fileURLToPath(import.meta.url));
const SYSTEMS_DIR = join(HERE, 'systems');
const REGISTRY = 'https://registry.npmjs.org';

const argv = ARGV;
const flag = (n) => argv.includes(`--${n}`);
const opt = (n) => {
  const hit = argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : null;
};

const AS_JSON = flag('json');
const STRICT = flag('strict');
const WRITE_REPORT = flag('write-report');
const ONLY = opt('only');

/* ── frontmatter ─────────────────────────────────────────────────────────── */

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z0-9_]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').trim();
  }
  return out;
}

/* ── source: 파싱 ─────────────────────────────────────────────────────────
 * 한 항목이 패키지를 여러 개 참조할 수 있습니다 (Carbon, Seed Design).
 * 그래서 배열을 돌려줍니다.
 *
 * 인식하는 형태:
 *   npm tailwindcss@4.3.3 → …
 *   npm @carbon/layout@11.57.0, @carbon/type@11.65.0
 *   npm @seed-design/stylesheet@1.1.2 (…) · @seed-design/design-token@1.0.5
 *   npm @wikimedia/codex-design-tokens@2.6.x   ← .x 는 부분 고정으로 취급
 *   github Shopify/polaris@main → …
 */
const NPM_RE = /(@[a-z0-9~][\w.-]*\/[a-z0-9~][\w.-]*|\b[a-z0-9~][\w.-]*)@(\d+\.\d+\.(?:\d+|x)(?:-[\w.]+)?)/g;
const GH_RE = /\b([\w.-]+\/[\w.-]+)@([\w.-]+)/g;

function parseSource(src) {
  if (!src) return [{ kind: 'unknown', ref: null, pinned: null }];
  const found = [];

  if (/^npm\b/i.test(src) || /\bnpm\s+@?[\w./-]+@/i.test(src)) {
    for (const m of src.matchAll(NPM_RE)) {
      // github owner/repo@ref 가 npm 패턴에 걸리는 것을 배제
      if (/^github/i.test(src) && !/^npm/i.test(src)) continue;
      found.push({ kind: 'npm', ref: m[1], pinned: m[2] });
    }
  }

  if (!found.length && /^github\b/i.test(src)) {
    for (const m of src.matchAll(GH_RE)) {
      found.push({ kind: 'github', ref: m[1], pinned: m[2] });
    }
  }

  // npm 과 Figma 킷을 함께 쓰는 항목이 있습니다 (Material 3).
  // npm 쪽이 최신이어도 킷은 따로 확인해야 하므로 둘 다 남깁니다.
  if (found.length && /figma|킷/i.test(src)) {
    found.push({ kind: 'figma', ref: null, pinned: null });
  }

  if (!found.length) {
    if (/figma|킷/i.test(src)) found.push({ kind: 'figma', ref: null, pinned: null });
    else if (/github/i.test(src)) found.push({ kind: 'github', ref: null, pinned: null });
    else if (/developer\.|\.com|\.io|\.dev/i.test(src)) found.push({ kind: 'web', ref: null, pinned: null });
    else found.push({ kind: 'unknown', ref: null, pinned: null });
  }
  return found;
}

/* ── semver 비교 ─────────────────────────────────────────────────────────── */

function cmp(a, b) {
  const norm = (v) => v.split('-')[0].split('.').map((x) => (x === 'x' ? -1 : Number(x) || 0));
  const [A, B] = [norm(a), norm(b)];
  for (let i = 0; i < 3; i++) {
    if (A[i] === -1 || B[i] === -1) return 0; // .x 는 그 자리까지만 비교
    if (A[i] !== B[i]) return A[i] < B[i] ? -1 : 1;
  }
  return 0;
}

function drift(pinned, latest) {
  const p = pinned.split('-')[0].split('.');
  const l = latest.split('-')[0].split('.');
  if (p[0] !== l[0]) return 'major';
  if (p[1] !== l[1]) return 'minor';
  return 'patch';
}

/* ── npm 조회 ────────────────────────────────────────────────────────────── */

async function latestVersion(pkg) {
  const url = `${REGISTRY}/${pkg.replace('/', '%2F')}/latest`;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (res.status === 404) return { error: 'not-found' };
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      return { version: body.version };
    } catch (err) {
      if (attempt === 3) return { error: String(err.message || err).slice(0, 60) };
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
    }
  }
}

/* ── 실행 ────────────────────────────────────────────────────────────────── */

// 언어 판본 규약: <slug>.md 가 주 노출본, <slug>.ko.md 등은 번역본입니다.
// 접미사가 붙은 판본까지 읽으면 같은 소스를 언어 수만큼 중복 대조하게 됩니다
// (build-data.mjs 의 LANG_SUFFIX 와 같은 규칙).
const LANG_SUFFIX = /\.[a-z]{2}(-[A-Za-z]+)?\.md$/;
const files = (await readdir(SYSTEMS_DIR))
  .filter((f) => f.endsWith('.md') && !LANG_SUFFIX.test(f))
  .sort();

const entries = [];
for (const file of files) {
  const text = await readFile(join(SYSTEMS_DIR, file), 'utf8');
  const fm = frontmatter(text);
  for (const s of parseSource(fm.source)) {
    entries.push({
      file,
      name: fm.name || file.replace(/\.md$/, ''),
      verified: fm.verified || null,
      ...s,
    });
  }
}

const targets = ONLY ? entries.filter((e) => e.kind === ONLY) : entries;

// npm 은 병렬로, 동시 6개까지
const npmTargets = targets.filter((e) => e.kind === 'npm' && e.ref);
const CONCURRENCY = 6;
for (let i = 0; i < npmTargets.length; i += CONCURRENCY) {
  const batch = npmTargets.slice(i, i + CONCURRENCY);
  await Promise.all(
    batch.map(async (e) => {
      const r = await latestVersion(e.ref);
      if (r.error) {
        e.status = 'error';
        e.detail = r.error;
      } else {
        e.latest = r.version;
        const c = cmp(e.pinned, r.version);
        e.status = c < 0 ? 'outdated' : 'current';
        if (c < 0) e.drift = drift(e.pinned, r.version);
      }
    }),
  );
}

for (const e of targets) {
  if (!e.status) e.status = e.kind === 'npm' ? 'error' : 'manual';
}

/* ── 출력 ────────────────────────────────────────────────────────────────── */

const byStatus = (s) => targets.filter((e) => e.status === s);
const outdated = byStatus('outdated');
const summary = {
  checked: targets.length,
  current: byStatus('current').length,
  outdated: outdated.length,
  manual: byStatus('manual').length,
  error: byStatus('error').length,
  major: outdated.filter((e) => e.drift === 'major').length,
  minor: outdated.filter((e) => e.drift === 'minor').length,
  patch: outdated.filter((e) => e.drift === 'patch').length,
};

if (AS_JSON) {
  console.log(JSON.stringify({ generatedFrom: 'systems/*.md', summary, entries: targets }, null, 2));
} else {
  const pad = (s, n) => String(s ?? '').padEnd(n);
  const MARK = { outdated: '✗', current: '✓', manual: '·', error: '!' };

  console.log('');
  console.log(M.title);
  console.log('  ' + '─'.repeat(88));

  const order = { outdated: 0, error: 1, current: 2, manual: 3 };
  for (const e of [...targets].sort(
    (a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name),
  )) {
    let right;
    if (e.status === 'outdated') right = `${e.pinned} → ${e.latest}  (${e.drift})`;
    else if (e.status === 'current') right = `${e.pinned}`;
    else if (e.status === 'error') right = M.lookupFailed(e.detail);
    else right = M.manual(e.kind);
    console.log(`  ${MARK[e.status]} ${pad(e.name, 30)} ${pad(e.ref ?? '—', 34)} ${right}`);
  }

  console.log('  ' + '─'.repeat(88));
  console.log(M.summary(summary));

  if (outdated.length) {
    console.log('');
    console.log(M.reharvest);
    for (const e of outdated.filter((x) => x.drift === 'major')) {
      console.log(`    npm pack ${e.ref}@${e.latest}   # ${e.file}`);
    }
  }

  const manualFigma = byStatus('manual').filter((e) => e.kind === 'figma');
  if (manualFigma.length) {
    console.log('');
    console.log(M.figmaNote);
    for (const e of manualFigma)
      console.log(`    ${e.name}  (${e.file}, verified ${e.verified ?? M.notRecorded})`);
  }
  console.log('');
}

if (WRITE_REPORT) {
  const lines = [];
  lines.push('# Source freshness report');
  lines.push('');
  lines.push('Generated by `check-sources.mjs`. **Do not edit it by hand** — re-running overwrites it.');
  lines.push('');
  lines.push(
    `${summary.checked} checked · ${summary.current} current · ${summary.outdated} outdated ` +
      `(major ${summary.major} / minor ${summary.minor} / patch ${summary.patch}) · ` +
      `${summary.manual} manual · ${summary.error} failed`,
  );
  lines.push('');
  if (outdated.length) {
    lines.push('## Outdated sources');
    lines.push('');
    lines.push('| System | Package | Recorded | Latest | Drift | File |');
    lines.push('|--------|---------|:---:|:---:|:---:|------|');
    for (const e of outdated.sort((a, b) => a.drift.localeCompare(b.drift))) {
      lines.push(`| ${e.name} | \`${e.ref}\` | ${e.pinned} | **${e.latest}** | ${e.drift} | \`${e.file}\` |`);
    }
    lines.push('');
    lines.push('**A major drift may mean the token structure changed.** Do not just update the');
    lines.push('values — reread the `Characteristic decisions` section too; this corpus\'s');
    lines.push('cross-comparisons rest on it.');
  } else {
    lines.push('No npm source is outdated.');
  }
  lines.push('');
  lines.push('## Sources that cannot be checked automatically');
  lines.push('');
  lines.push('| System | Kind | Last verified | How to check |');
  lines.push('|--------|:---:|:---:|--------------|');
  const how = {
    figma: 'the Change Log page of the community file',
    github: 'repository commits (compare with `gh api` — blocked by the proxy in container sessions)',
    web: 'the documentation site (blocked by the proxy)',
    unknown: 'tidy up the `source:` field first',
  };
  for (const e of byStatus('manual').sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(`| ${e.name} | \`${e.kind}\` | ${e.verified ?? 'not recorded'} | ${how[e.kind] ?? '—'} |`);
  }
  lines.push('');
  await writeFile(join(HERE, 'freshness.md'), lines.join('\n') + '\n');
  if (!AS_JSON) console.log(M.reportWritten);
}

if (STRICT && (outdated.length || summary.error)) process.exit(1);
