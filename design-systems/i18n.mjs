#!/usr/bin/env node
/**
 * 언어 판본 관리 — 규약과 검증을 한곳에 둡니다.
 *
 * 규약
 *   <slug>.md      영어. **주 노출본**이고, 생성기와 사이트가 읽는 판본입니다.
 *   <slug>.ko.md   한국어 원문. 저자가 실제로 조사하며 쓴 판본입니다.
 *   <slug>.ja.md   (앞으로 늘릴 자리 — 규약은 이미 열려 있습니다)
 *
 * 왜 영어가 접미사 없는 쪽인가: 사이트·에이전트 소비가 영어 기준이고, 루트
 * README가 이미 `README.md`(영어) + `README.ko.md` 규약을 씁니다. 코퍼스 문서만
 * 반대로 두면 규약이 둘로 갈립니다.
 *
 * 이주는 **문서 단위**로 진행합니다. 아직 옮기지 않은 문서는 `<slug>.md`에
 * 한국어인 채로 남아 있고, 생성기는 그대로 읽습니다 — 그래서 이주 도중에도
 * 사이트가 깨지지 않습니다.
 *
 * 사용법
 *   node design-systems/i18n.mjs --check    판본 짝·전환 링크 검증 (CI용)
 *   node design-systems/i18n.mjs --links    전환 링크를 규약대로 다시 씁니다
 *
 * 출력 언어는 기본 영어이고 `--lang=ko`로 한국어입니다 (`tools/cli-i18n.mjs`).
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARGV, messages } from '../tools/cli-i18n.mjs';

/** 화면에 나가는 문장. 기본 영어, `--lang=ko`로 한국어 (`tools/cli-i18n.mjs`). */
const M = messages({
  en: {
    linksUpdated: (n) => `Language links updated: ${n} file(s)`,
    needsPlainEn: (dir, file, slug) =>
      `${dir}/${file}: English must be the suffix-less \`${slug}.md\``,
    noPrimary: (dir, slug, langs) =>
      `${dir}/${slug}: no suffix-less primary version (present: ${langs})`,
    linksMissing: (dir, file) =>
      `${dir}/${file}: the language links are missing — add them with \`--links\``,
    linksStale: (dir, file) =>
      `${dir}/${file}: the language links differ from the convention — rewrite them with \`--links\``,
    checkFailed: (n) => `Version check failed (${n} problem(s)):`,
    checkPassed: (total, multi) =>
      `Version check passed — ${multi} of ${total} documents are multilingual`,
    unknownArg: (mode) => `Unknown argument: ${mode} (--check | --links)`,
  },
  ko: {
    linksUpdated: (n) => `전환 링크 갱신: ${n}개 파일`,
    needsPlainEn: (dir, file, slug) =>
      `${dir}/${file}: 영어는 접미사 없는 \`${slug}.md\` 여야 합니다`,
    noPrimary: (dir, slug, langs) =>
      `${dir}/${slug}: 접미사 없는 주 노출본이 없습니다 (있는 판본: ${langs})`,
    linksMissing: (dir, file) => `${dir}/${file}: 전환 링크 줄이 없습니다 — \`--links\`로 넣으세요`,
    linksStale: (dir, file) =>
      `${dir}/${file}: 전환 링크가 규약과 다릅니다 — \`--links\`로 다시 쓰세요`,
    checkFailed: (n) => `판본 검증 실패 (${n}건):`,
    checkPassed: (total, multi) => `판본 검증 통과 — 문서 ${total}개 중 다국어 ${multi}개`,
    unknownArg: (mode) => `알 수 없는 인자: ${mode} (--check | --links)`,
  },
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** 이름에 언어 접미사가 붙은 판본인지. `carbon.ko.md` → 'ko' */
const LANG_RE = /\.([a-z]{2}(?:-[A-Za-z]+)?)\.md$/;

/** 판본 목록을 만들 디렉터리. 코퍼스 산문이 있는 곳만, **하위까지** 봅니다.
 *  `design-systems`를 통째로 넣으면 systems·patterns·tokens에 더해 루트 산문
 *  (index·HARVESTING·SCHEMA …)까지 한 규약으로 관리됩니다. */
const DIRS = [
  'design-systems',
  'agents',
  'profiles',
  'i18n',
  'event-taxonomy',
  'mockups',
  'site',
];

/** DIRS 아래의 모든 하위 디렉터리를 폅니다. agents/case-studies·profiles/measured
 *  처럼 한 겹 더 들어간 문서가 빠지면 검증이 조용히 통과해 버립니다. */
function walk(dir) {
  const out = [];
  let names;
  try { names = readdirSync(join(ROOT, dir)); } catch { return out; }
  out.push(dir);
  for (const n of names) {
    if (statSync(join(ROOT, dir, n)).isDirectory()) out.push(...walk(`${dir}/${n}`));
  }
  return out;
}

/** 표시 이름. 새 언어를 추가하면 여기만 늘리면 됩니다. */
const LANG_NAME = { en: 'English', ko: '한국어', ja: '日本語', 'zh-Hans': '简体中文' };

/** 전환 링크 줄은 이 표식으로 감쌉니다 — 다시 쓸 때 정확히 이 블록만 갈아끼웁니다. */
const MARK_OPEN = '<!-- lang-links -->';
const MARK_CLOSE = '<!-- /lang-links -->';

function scan() {
  /** slug → { dir, langs: { en: file, ko: file, ... } } */
  const groups = new Map();
  for (const dir of DIRS.flatMap(walk)) {
    let names;
    try {
      names = readdirSync(join(ROOT, dir));
    } catch {
      continue; // 없는 디렉터리는 조용히 건너뜁니다
    }
    for (const f of names) {
      if (!f.endsWith('.md')) continue;
      const m = f.match(LANG_RE);
      const lang = m ? m[1] : 'en';
      const slug = m ? f.slice(0, -m[0].length) : f.slice(0, -3);
      const key = `${dir}/${slug}`;
      if (!groups.has(key)) groups.set(key, { dir, slug, langs: {}, primary: null, explicitEn: null });
      const g = groups.get(key);
      g.langs[lang] = f;
      // 접미사가 붙지 않은 파일만 주 노출본입니다. `<slug>.en.md` 는 옛 규약의
      // 잔재라 별도로 잡아냅니다 — 사이트가 링크하는 건 접미사 없는 경로입니다.
      if (!m) g.primary = f;
      else if (m[1] === 'en') g.explicitEn = f;
    }
  }
  return groups;
}

/** 한 판본의 머리에 들어갈 전환 링크 줄. 현재 언어는 굵게, 나머지는 링크. */
function linkLine(group, current) {
  const langs = Object.keys(group.langs).sort((a, b) => (a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b)));
  if (langs.length < 2) return null; // 판본이 하나뿐이면 줄을 넣지 않습니다
  const parts = langs.map((l) => {
    const name = LANG_NAME[l] ?? l;
    return l === current ? `**${name}**` : `[${name}](${group.langs[l]})`;
  });
  return `${MARK_OPEN}\n> ${parts.join(' · ')}\n${MARK_CLOSE}`;
}

/** frontmatter 바로 뒤(없으면 파일 맨 앞)에 블록을 넣거나 갈아끼웁니다. */
function applyLinks(text, block) {
  const stripped = text.replace(
    new RegExp(`${MARK_OPEN}[\\s\\S]*?${MARK_CLOSE}\\n*`, 'g'),
    '',
  );
  if (!block) return stripped;
  const fm = stripped.match(/^---\n[\s\S]*?\n---\n/);
  const at = fm ? fm[0].length : 0;
  return stripped.slice(0, at) + block + '\n\n' + stripped.slice(at).replace(/^\n+/, '');
}

const groups = scan();
const mode = ARGV[0] ?? '--check';

if (mode === '--links') {
  let touched = 0;
  for (const group of groups.values()) {
    for (const [lang, file] of Object.entries(group.langs)) {
      const path = join(ROOT, group.dir, file);
      const before = readFileSync(path, 'utf8');
      const after = applyLinks(before, linkLine(group, lang));
      if (after !== before) {
        writeFileSync(path, after);
        touched++;
      }
    }
  }
  console.log(M.linksUpdated(touched));
} else if (mode === '--check') {
  const problems = [];
  for (const group of groups.values()) {
    const langs = Object.keys(group.langs);
    // `<slug>.en.md` 는 옛 규약(한국어가 주, 영어가 접미사)의 잔재입니다.
    if (group.explicitEn) {
      problems.push(M.needsPlainEn(group.dir, group.explicitEn, group.slug));
    }
    // 번역본만 있고 주 노출본이 없으면 사이트 링크가 깨집니다.
    if (!group.primary) {
      problems.push(M.noPrimary(group.dir, group.slug, langs.join(', ')));
      continue;
    }
    if (langs.length < 2) continue;
    for (const [lang, file] of Object.entries(group.langs)) {
      const text = readFileSync(join(ROOT, group.dir, file), 'utf8');
      const expected = linkLine(group, lang);
      if (!text.includes(MARK_OPEN)) {
        problems.push(M.linksMissing(group.dir, file));
      } else if (!text.includes(expected)) {
        problems.push(M.linksStale(group.dir, file));
      }
    }
  }
  const multi = [...groups.values()].filter((g) => Object.keys(g.langs).length > 1);
  if (problems.length) {
    console.error(M.checkFailed(problems.length));
    for (const p of problems) console.error('  · ' + p);
    process.exit(1);
  }
  console.log(M.checkPassed(groups.size, multi.length));
} else {
  console.error(M.unknownArg(mode));
  process.exit(2);
}
