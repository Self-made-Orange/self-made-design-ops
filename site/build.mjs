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
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
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
    crawlable: (n, d) =>
      `sitemap.xml · robots.txt · JSON-LD · ${n} catalogue rows prerendered (lastmod ${d})`,
    noRegion: (name, file) => `no <!--${name}:start--> … <!--${name}:end--> region in docs/${file}`,
  },
  ko: {
    noHeading: (file) => `재종합 절 제목을 찾지 못했습니다 (KO/EN 모두 확인): patterns/${file}`,
    written: (systems, axes, samples) =>
      `docs/data/corpus.json — 시스템 ${systems} · 축 ${axes} (표본 ${samples})`,
    crawlable: (n, d) =>
      `sitemap.xml · robots.txt · JSON-LD · 카탈로그 ${n}행 프리렌더 (lastmod ${d})`,
    noRegion: (name, file) => `docs/${file} 에 <!--${name}:start--> … <!--${name}:end--> 구간이 없습니다`,
  },
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Where this repository lives, in one place.
 *
 * It has moved once — `keepYaoung` → the `Self-made-Orange` organisation, 2026-08-24 — and
 * that move meant editing the address in 40-odd hand-written spots because it had never been
 * defined anywhere. It is defined here now, and everything the generators emit reads it from
 * here. **GitHub does not redirect Pages addresses**, only repository URLs, so the previous
 * site address is simply gone; `site/README.md` records that.
 */
const OWNER = 'Self-made-Orange';
const REPO = 'self-made-design-ops';
const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
const BASE = `https://${OWNER.toLowerCase()}.github.io/${REPO}/`;
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
    headline: 'prefers-reduced-motion handling splits into nine layers across 17 systems. scroll-behavior counts as motion too.',
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
    { path: 'site/check-headlines.mjs', what: 'The axis conclusions on this page against the documents they summarise' },
    { path: 'site/markdown.mjs', what: 'The corpus\'s Markdown into HTML — only the constructs it actually uses' },
    { path: 'site/build-pages.mjs', what: 'A page on this site for every document in the corpus' },
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
  repo: REPO_URL,
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

/* ── What the crawlers get ─────────────────────────────────────────────────
 *
 * Three things are written from here rather than kept by hand: the sitemap, the
 * structured data, and a prerendered copy of the catalogue rows.
 *
 * The last one is the one that matters. `catalog.html` builds its list from
 * corpus.json at runtime, so before this the 116 system names — the terms anyone
 * would actually search for — existed nowhere in the served HTML. The rows are now
 * emitted statically and the script replaces them on load with the same rows plus
 * avatars and filtering.
 *
 * **Every date here is derived from the corpus, never from the clock.** `site.yml`
 * regenerates on each PR and fails if the result differs from what is committed, so
 * a `new Date()` in this file would break the build the day after any commit.
 */

const DOCS = join(ROOT, 'docs');

/** The newest verification date in the corpus — deterministic, and the honest "last modified". */
const lastmod = systems.map((s) => s.verified).filter(Boolean).sort().at(-1);

/* Every document has a page, so every document is in the sitemap. The list is derived here
 * rather than read from build-pages.mjs's output — that script reads corpus.json, which this
 * one writes, and having them read each other would be a cycle. Both use the same rule:
 * the file's name without `.md`. */
const patternFiles = readdirSync(join(ROOT, 'design-systems', 'patterns'))
  .filter((f) => f.endsWith('.md') && !f.endsWith('.ko.md')).sort();

const PAGES = [
  { loc: BASE, priority: '1.0' },
  { loc: `${BASE}catalog.html`, priority: '0.9' },
  ...patternFiles.map((f) => ({ loc: `${BASE}patterns/${f.replace(/\.md$/, '')}.html`, priority: '0.8' })),
  ...systems.map((s) => ({ loc: `${BASE}systems/${s.file.replace(/\.md$/, '')}.html`, priority: '0.7' })),
];

writeFileSync(join(DOCS, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  PAGES.map((p) =>
    `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>weekly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  ).join('\n') + '\n</urlset>\n');

writeFileSync(join(DOCS, 'robots.txt'),
  '# Everything here is meant to be read.\n' +
  'User-agent: *\n' +
  'Allow: /\n\n' +
  `Sitemap: ${BASE}sitemap.xml\n`);

/* ── Structured data ─────────────────────────────────────────────────────── */

const esc = (t) => String(t)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const jsonld = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Self-Made DesignOps — design system corpus',
  description:
    `Measured token values from ${systems.length} public design systems, each claim pinned to a ` +
    'source and a version, cross-compared on nine component axes. Values that could not be ' +
    'confirmed are marked unverified rather than filled in.',
  url: BASE,
  sameAs: out.repo,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  creator: { '@type': 'Organization', name: OWNER, url: `https://github.com/${OWNER}` },
  dateModified: lastmod,
  keywords: ['design systems', 'design tokens', 'UI patterns', 'design system corpus'],
  variableMeasured: out.axes.map((a) => ({
    '@type': 'PropertyValue', name: a.title, description: a.headline,
  })),
  distribution: [{
    '@type': 'DataDownload',
    encodingFormat: 'application/json',
    contentUrl: `${BASE}data/corpus.json`,
  }],
};

/** Replace the body between `<!--name:start-->` and `<!--name:end-->`, markers kept. */
function fillRegion(file, name, body) {
  const path = join(DOCS, file);
  const html = readFileSync(path, 'utf8');
  const re = new RegExp(`(<!--${name}:start-->)[\\s\\S]*?(<!--${name}:end-->)`);
  if (!re.test(html)) throw new Error(M.noRegion(name, file));
  writeFileSync(path, html.replace(re, `$1${body}$2`));
}

fillRegion('index.html', 'jsonld',
  `\n<script type="application/ld+json">\n${JSON.stringify(jsonld, null, 1)}\n</script>\n`);

/* ── The catalogue, prerendered ──────────────────────────────────────────── */

const hue = (t) => { let h = 0; for (const c of t) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const initials = (name) => name.replace(/\(.*?\)/g, ' ').split(/[\s/·-]+/).filter(Boolean)
  .slice(0, 2).map((w) => w[0]).join('').slice(0, 2);
const isUnverified = (v) => typeof v === 'string' &&
  (v.startsWith('미확인') || v.toLowerCase().startsWith('unverified'));

// Same six cells, same classes, as the row() in catalog.html — minus the org avatar,
// which is a runtime probe against github.com and has no business in committed HTML.
const rows = systems.map((s) => {
  const slug = s.file.replace(/\.md$/, '');
  const open = [s.figma, s.a11y].filter(isUnverified).length;
  const marks =
    (s.figma === true ? '<span class="mk">Figma</span>' : '') +
    (open ? `<span class="mk warn">${open} open</span>` : '');
  const links = [
    s.url && `<a href="${esc(s.url)}" rel="noopener">site</a>`,
    s.repo && `<a href="${esc(s.repo)}" rel="noopener">src</a>`,
  ].filter(Boolean).join('');
  const platform = s.platform.length > 1
    ? `${s.platform[0]} +${s.platform.length - 1}` : s.platform[0];

  return `<div class="row">` +
    `<span class="mark" style="--h:${hue(slug)}"><span class="ini">${esc(initials(s.name))}</span></span>` +
    `<span class="cell-nm">` +
      `<a class="nm" href="./systems/${slug}.html">${esc(s.name)}</a>` +
      marks +
    `</span>` +
    `<span class="ds">${esc(s.org)} · ${esc(s.domain)}</span>` +
    `<span class="cell-cov"><span class="cov" data-c="${esc(s.coverage)}">${esc(s.coverage)}</span></span>` +
    `<span class="rt" title="${esc(s.platform.join(' · '))}">${esc(platform)}</span>` +
    `<span class="rt">${links ? `<span class="out">${links}</span>` : ''}</span>` +
  `</div>`;
});

fillRegion('catalog.html', 'prerender', '\n' + rows.join('\n') + '\n    ');

/* The catalogue's own structured data. Deliberately not a 116-entry ItemList: the page is a
 * view onto the dataset the landing page already declares, and restating every row as
 * schema.org markup would add 30KB to say nothing new. */
fillRegion('catalog.html', 'jsonld', `\n<script type="application/ld+json">\n${
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Catalog — Self-Made DesignOps',
    description: 'Every design system in the corpus, filterable by platform, harvest depth and domain.',
    url: `${BASE}catalog.html`,
    isPartOf: { '@type': 'WebSite', name: 'Self-Made DesignOps', url: BASE },
    about: { '@type': 'Dataset', name: jsonld.name, url: BASE },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: systems.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
    },
    dateModified: lastmod,
  }, null, 1)}\n</script>\n`);

/* ── The landing page's lists, prerendered the same way ───────────────────
 *
 * The kit inventory, the nine axis cards and the catalogue preview were all built from
 * corpus.json at runtime, which left the landing page with 5,186 characters of static text
 * against a page that reads far longer. The script still replaces all of it on load — with
 * the org avatars on the preview marks, which are a runtime probe.
 */
const slug = (t) => t.toLowerCase().replace(/\s+/g, '-');

fillRegion('index.html', 'pr-kit', '\n' + KIT.map((g) =>
  `<div class="rowgrp" id="kit-${slug(g.group)}">` +
    `<h3>${esc(g.group)} · ${g.items.length}</h3>` +
    g.items.map((i) =>
      `<a class="kititem" href="${out.repo}/blob/main/${i.path}">` +
        `<code>${esc(i.path)}</code><span>${esc(i.what)}</span><em>${i.lines} ln</em>` +
      `</a>`).join('') +
  `</div>`).join('\n') + '\n  ');

fillRegion('index.html', 'pr-axes', '\n' + out.axes.map((a) =>
  `<a class="card" href="./patterns/${a.file.replace(/\.md$/, '')}.html">` +
    `<div class="axis-figure"><span class="axis-num">${a.samples}</span>` +
      `<span class="axis-unit">samples</span></div>` +
    `<h3>${esc(a.title)}</h3><p>${esc(a.headline)}</p>` +
    `<span class="path">${esc(a.path)}</span>` +
  `</a>`).join('\n') + '\n  ');

fillRegion('index.html', 'pr-rail', '\n' + KIT.map((g) =>
  `<li><a href="#kit-${slug(g.group)}">${esc(g.group)}` +
    `<span class="n">${g.items.length}</span></a></li>`).join('\n') + '\n    ');

// The preview rows carry the monogram; the avatar over it is added at runtime.
const PREVIEW = 10;
fillRegion('index.html', 'pr-preview', '\n' + systems.filter((s) => s.coverage === 'full')
  .slice(0, PREVIEW).map((s) => {
    const sl = s.file.replace(/\.md$/, '');
    return `<a class="dsrow" href="./systems/${sl}.html">` +
      `<span class="mark" style="--h:${hue(sl)}"><span class="ini">${esc(initials(s.name))}</span></span>` +
      `<span class="nm">${esc(s.name)}</span>` +
      `<span class="ds">${esc(s.org)} · ${esc(s.domain)}</span>` +
      `<span class="pl">${esc(s.platform.join(' · '))}</span>` +
    `</a>`;
  }).join('\n') + '\n    ');

/* ── 404 ─────────────────────────────────────────────────────────────────
 * GitHub Pages serves docs/404.html for any unknown path under the site. noindex, because a
 * 404 that gets indexed is worse than no 404 page at all. */
writeFileSync(join(DOCS, '404.html'), `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Not found — Self-Made DesignOps</title>
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<link rel="stylesheet" href="./assets/site.css">
</head>
<body>
<main class="page"><div class="hero"><div class="wrap">
  <span class="kicker">404</span>
  <h1>That page is not here.</h1>
  <p class="lede">The corpus has ${systems.length} entries and two pages. Whatever you were
     after is on one of them.</p>
  <div class="cta">
    <a class="btn btn-p" href="./">The kit</a>
    <a class="btn btn-g" href="./catalog.html">The catalog</a>
    <a class="btn btn-o" href="${out.repo}">The repository</a>
  </div>
</div></div></main>
</body>
</html>
`);

console.log(M.crawlable(systems.length, lastmod));
