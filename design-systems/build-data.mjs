#!/usr/bin/env node
/**
 * systems/*.md frontmatter → data/systems.json
 *
 * 코퍼스의 시스템 메타데이터를 기계가독 형태로 내보냅니다.
 * 의존성 없음. 실행: node design-systems/build-data.mjs
 * 출력 언어는 기본 영어이고 `--lang=ko`로 한국어입니다 (`tools/cli-i18n.mjs`).
 *
 * 파싱 대상 필드: name / org / coverage / url / repo / license / tech /
 * figma_kit / tokens_format / a11y_target / platform / domain / verified / source
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { messages } from '../tools/cli-i18n.mjs';

/** 화면에 나가는 문장. 기본 영어, `--lang=ko`로 한국어 (`tools/cli-i18n.mjs`).
 *  JSON 안에 들어가는 문자열은 커밋되는 산출물이라 언어와 무관하게 영어입니다. */
const M = messages({
  en: {
    noFrontmatter: (f) => `no frontmatter: ${f}`,
    written: (n) => `data/systems.json — ${n} systems, platforms:`,
  },
  ko: {
    noFrontmatter: (f) => `frontmatter 없음: ${f}`,
    written: (n) => `data/systems.json — ${n}개 시스템, 플랫폼:`,
  },
});

const ROOT = dirname(fileURLToPath(import.meta.url));
const SYS_DIR = join(ROOT, 'systems');
const OUT_DIR = join(ROOT, 'data');

/** 아주 좁은 YAML 부분집합 파서 — 이 코퍼스의 frontmatter만 감당합니다. */
function parseFrontmatter(md, file) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    let v = raw.trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    if (v.startsWith('[') && v.endsWith(']')) {
      out[key] = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      continue;
    }
    if (v === 'null') v = null;
    else if (v === 'true') v = true;
    else if (v === 'false') v = false;
    out[key] = v;
  }
  out._file = basename(file);
  return out;
}

const systems = [];
// 언어별 판본 규약: <slug>.md 가 **영어(주 노출)**, <slug>.ko.md 등 언어 접미사가
// 붙은 것이 번역본입니다. 생성기는 접미사 없는 판본만 읽습니다 — 그러지 않으면
// 같은 시스템이 언어 수만큼 중복 집계됩니다.
const LANG_SUFFIX = /\.[a-z]{2}(-[A-Za-z]+)?\.md$/;
for (const f of readdirSync(SYS_DIR).sort()) {
  if (!f.endsWith('.md')) continue;
  if (LANG_SUFFIX.test(f)) continue;
  const fm = parseFrontmatter(readFileSync(join(SYS_DIR, f), 'utf8'), f);
  if (!fm) {
    console.error(M.noFrontmatter(f));
    process.exitCode = 1;
    continue;
  }
  // coverage: internal 표본(자체 제품 등)은 공개 코퍼스 데이터에서 제외합니다.
  // 예전 필드명은 tier: 내부 였습니다 — 서열로 읽히는 이름이라 바꿨습니다.
  if (fm.coverage === 'internal') continue;
  systems.push(fm);
}

// platform 첫 값 기준 집계 (index.md와 같은 기준)
const byPlatform = {};
for (const s of systems) {
  const p = Array.isArray(s.platform) ? s.platform[0] : s.platform;
  byPlatform[p] = (byPlatform[p] ?? 0) + 1;
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, 'systems.json'),
  JSON.stringify(
    {
      $schema: 'see ./systems.schema.md',
      generated_from: 'systems/*.md frontmatter',
      count: systems.length,
      by_platform_primary: byPlatform,
      systems,
    },
    null,
    2,
  ) + '\n',
);
console.log(M.written(systems.length), byPlatform);
