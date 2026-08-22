#!/usr/bin/env node
/**
 * corpus → docs/data/corpus.json (the data behind the GitHub Pages static site)
 *
 * No dependencies. Run: node site/build.mjs
 *
 * Principle — no number is invented here.
 *  · the system list: design-systems/data/systems.json (build-data.mjs output)
 *  · samples per axis: read from each patterns/*.md's
 *    "## Re-synthesis across N samples" heading (the re-synthesis section wins over
 *    any summary sentence — the agents/design-review.md rule)
 *  · the one-line conclusions: written by a person, with the source file recorded
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { messages } from '../tools/cli-i18n.mjs';

/** Console output. English by default, `--lang=ko` for Korean (`tools/cli-i18n.mjs`).
 *  Strings that go *inside* corpus.json stay English regardless — that file is a
 *  committed artefact, not a message to whoever happens to run the build. */
const M = messages({
  en: {
    noHeading: (file) => `no re-synthesis heading found (checked EN and KO): patterns/${file}`,
    written: (systems, axes, samples) =>
      `docs/data/corpus.json — ${systems} systems · ${axes} axes (samples ${samples})`,
  },
  ko: {
    noHeading: (file) => `재종합 절 제목을 찾지 못했습니다 (KO/EN 모두 확인): patterns/${file}`,
    written: (systems, axes, samples) =>
      `docs/data/corpus.json — 시스템 ${systems} · 축 ${axes} (표본 ${samples})`,
  },
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'docs', 'data');

// How the corpus marks "could not confirm". The English primaries say `unverified`
// and the Korean versions `미확인`, so both spellings are recognised.
const UNVERIFIED = 'unverified';
const IS_UNVERIFIED = (v) =>
  typeof v === 'string' && (v.startsWith('미확인') || v.toLowerCase().startsWith('unverified'));

/**
 * Reads the sample count from patterns/<file>'s re-synthesis heading.
 * It follows the corpus rule that the re-synthesis section wins over any summary
 * earlier in the document (agents/design-review.md). With no heading it fails —
 * it does not estimate.
 *
 * The primaries are English (`## Re-synthesis across 77 samples`); the Korean form
 * (`## 77표본 재종합`) is still accepted so a *.ko.md can be pointed at directly.
 */
function sampleCount(file) {
  const md = readFileSync(join(ROOT, 'design-systems', 'patterns', file), 'utf8');
  const m = md.match(/^## (?:(\d+)표본 재종합|Re-synthesis across (\d+) samples?)/m);
  if (!m) throw new Error(M.noHeading(file));
  return Number(m[1] ?? m[2]);
}

/**
 * The axis cards. Each `headline` is a summary lifted from the "key criteria" table in
 * agents/design-review.md; the document itself is what decides. The sample counts are
 * read from the documents by the function above.
 */
const AXES = [
  {
    file: 'button.md', title: 'Buttons',
    headline: 'Default heights spread across 28–56px, and even the mode (40px) covers only ~23%. There is no standard height.',
  },
  {
    file: 'typography.md', title: 'Typography',
    headline: 'Base body size splits into six camps (13·14·16·17·18·24). The 14px camp is the largest, at 17 samples.',
  },
  {
    file: 'color.md', title: 'Color & contrast',
    headline: 'How palettes are organised. Contrast is computed with the WCAG formula — never eyeballed.',
  },
  {
    file: 'form.md', title: 'Forms & inputs',
    headline: 'About 30 systems match input height to button height. Checkboxes converge on 16px; GOV.UK breaks it at 40px.',
  },
  {
    file: 'modal.md', title: 'Modals',
    headline: 'The modal-width mode sits in the 450–520px band, with 512px right in the middle of it.',
  },
  {
    file: 'motion.md', title: 'Motion',
    headline: 'prefers-reduced-motion handling splits into six layers. scroll-behavior counts as motion too.',
  },
  {
    file: 'table.md', title: 'Tables',
    headline: 'Cell padding, row height, density, borders, sticky headers. A thin-sample axis.',
  },
  {
    file: 'navigation.md', title: 'Navigation',
    headline: 'Sidebar, tab and breadcrumb dimensions and structure. A thin-sample axis.',
  },
  {
    file: 'feedback.md', title: 'Feedback',
    headline: 'Severity systems for alerts, toasts and badges. "Banners never auto-dismiss" is unanimous at 8/8.',
  },
];

const GUIDES = [
  { file: 'agents/system-selection.md', title: 'system-selection',
    desc: 'Picks reference systems that fit the product\'s coordinates — platform, viewing distance, locale, domain.' },
  { file: 'agents/design-review.md', title: 'design-review',
    desc: 'Reviews a mockup or an implementation against corpus evidence. Three verdicts: convergence deviation / accepted divergence / internal inconsistency.' },
  { file: 'agents/event-instrumentation.md', title: 'event-instrumentation',
    desc: 'Reads UX context out of Figma or code and proposes an analytics event sheet.' },
  { file: 'agents/localization.md', title: 'localization',
    desc: 'Reads strings and their context out of code or Figma, then localises them.' },
];

const PROFILES = [
  { file: 'profiles/measured/web-comfortable.DESIGN.md', title: 'web-comfortable',
    desc: 'Desktop web · 16px body · 40px controls' },
  { file: 'profiles/measured/web-compact.DESIGN.md', title: 'web-compact',
    desc: 'Dense admin UI · 14px body (the 17-sample camp)' },
  { file: 'profiles/measured/touch-mobile.DESIGN.md', title: 'touch-mobile',
    desc: 'Touch · 48px controls (Material 48dp ∩ Apple 48pt)' },
  { file: 'profiles/measured/tv-wall.DESIGN.md', title: 'tv-wall',
    desc: 'Wall / TV at 3m · 60/80pt overscan · typography left empty (U)' },
];

/**
 * `tokens_format` values are quoted from the corpus as written. The entries are English
 * now, but the table below stays as a fallback: a value it lists is shipped with an
 * English label alongside, and anything else passes through verbatim (nothing is
 * translated on a guess).
 */
const TOKEN_LABEL_EN = {
  '문서': 'docs only',
  'SCSS 변수': 'SCSS vars',
  'Stylus 변수': 'Stylus vars',
  '토큰 배포 없음': 'no token package',
  '없음 — CSS 0': 'none (0 CSS)',
  '없음 — 값을 배포하지 않음': 'none (values unpublished)',
  '공개 CSS 실측': 'measured from public CSS',
  'API 기본값': 'API defaults',
  'JSON(패턴 데이터)': 'JSON (pattern data)',
  '문서층 표본 — 서버 렌더링 HTML에서 실측': 'docs-layer (server-rendered HTML)',
  '문서층 표본 — Gatsby page-data JSON + 스펙 이미지': 'docs-layer (Gatsby page-data)',
  '토큰 패키지 없음 — 컴포넌트별 *.static.css에서 실측': 'no token package (per-component CSS)',
};

const src = JSON.parse(
  readFileSync(join(ROOT, 'design-systems', 'data', 'systems.json'), 'utf8'),
);

/**
 * 킷 인벤토리 — 사이트가 "받아서 쓰는 것"을 말하려면 목록이 필요합니다.
 * **줄 수·존재 여부는 여기서 실제로 세고**, 한 줄 설명만 사람이 씁니다 (AXES와 같은 규칙).
 * 파일이 사라지면 조용히 빠지는 게 아니라 빌드가 실패해야 하므로 readFileSync 그대로 둡니다.
 */
const lines = (p) => readFileSync(join(ROOT, p), 'utf8').split('\n').length;

const KIT = [
  { group: 'Tools', items: [
    { path: 'design-systems/to-design-md.mjs', what: 'Emit a DESIGN.md build spec from the measured defaults' },
    { path: 'design-systems/check-sources.mjs', what: 'Compare every pinned source version against the registry' },
    { path: 'design-systems/i18n.mjs', what: 'Enforce the English/Korean document pairing' },
    { path: 'design-systems/build-data.mjs', what: 'Frontmatter across the corpus into one JSON' },
    { path: 'i18n/lint.mjs', what: 'ICU, CLDR plural categories and length budgets per locale' },
    { path: 'event-taxonomy/convert.mjs', what: 'An event sheet into json · md · html · tsv · Notion' },
    { path: 'site/build.mjs', what: 'The corpus into the data this page reads' },
    { path: 'site/design-spec.mjs', what: 'This site\'s own stylesheet into a graded DESIGN.md' },
  ] },
  { group: 'Procedures', items: [
    { path: 'agents/system-selection.md', what: 'Pick a reference system on evidence, not on taste' },
    { path: 'agents/design-review.md', what: 'Review a build against the corpus, contrast computed' },
    { path: 'agents/localization.md', what: 'Take a product multilingual without breaking layout' },
    { path: 'agents/event-instrumentation.md', what: 'Define analytics events that stay consistent' },
  ] },
  { group: 'Templates', items: [
    { path: 'event-taxonomy/template.csv', what: 'An empty event sheet in the convention' },
    { path: 'event-taxonomy/example.csv', what: 'The same sheet, worked' },
    { path: 'i18n/template.json', what: 'An empty string catalogue' },
    { path: 'i18n/kr.json', what: 'A deliberately broken file, to check the linter bites' },
  ] },
  { group: 'Build specs', items: [
    { path: 'profiles/measured/web-comfortable.DESIGN.md', what: 'Desktop web, comfortable density' },
    { path: 'profiles/measured/web-compact.DESIGN.md', what: 'Admin screens, compact density' },
    { path: 'profiles/measured/touch-mobile.DESIGN.md', what: 'Touch, 48px controls' },
    { path: 'profiles/measured/tv-wall.DESIGN.md', what: 'Wall and TV, 3m — typography left blank on purpose' },
    { path: 'profiles/interpreted/self-made-designops-site.DESIGN.md', what: 'This site, palette filled in — generated from its stylesheet' },
  ] },
].map((g) => ({
  group: g.group,
  items: g.items.map((i) => ({ ...i, lines: lines(i.path) })),
}));

const systems = src.systems.map((s) => ({
  name: s.name,
  org: s.org,
  coverage: s.coverage,
  url: s.url,
  repo: s.repo,
  platform: String(s.platform || UNVERIFIED).split(',').map((x) => x.trim()).filter(Boolean),
  domain: s.domain,
  tokens: (s.tokens_format ?? []).map((t) => ({ raw: t, en: TOKEN_LABEL_EN[t] ?? t })),
  tech: s.tech ?? [],
  figma: s.figma_kit,
  a11y: s.a11y_target,
  verified: s.verified,
  file: s._file,
}));

/** 다중값(platform)은 항목마다 세고, 단일값은 그대로 셉니다. */
const tally = (key) =>
  systems.reduce((acc, s) => {
    for (const v of [s[key] ?? UNVERIFIED].flat()) acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

const out = {
  $comment: 'Generated by site/build.mjs. Do not edit it directly.',
  generated_from:
    'design-systems/data/systems.json + the "Re-synthesis across N samples" heading in patterns/*.md',
  repo: 'https://github.com/keepYaoung/self-made-design-ops',
  count: systems.length,
  by_platform: tally('platform'),
  by_coverage: tally('coverage'),
  by_domain: tally('domain'),
  axes: AXES.map((a) => ({
    ...a,
    path: `design-systems/patterns/${a.file}`,
    samples: sampleCount(a.file),
  })),
  guides: GUIDES,
  profiles: PROFILES,
  kit: KIT,
  kit_lines: KIT.reduce((n, g) => n + g.items.reduce((m, i) => m + i.lines, 0), 0),
  systems,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'corpus.json'), JSON.stringify(out, null, 1) + '\n');
console.log(M.written(systems.length, out.axes.length, out.axes.map((a) => a.samples).join('/')));
