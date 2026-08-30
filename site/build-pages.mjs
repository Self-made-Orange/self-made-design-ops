#!/usr/bin/env node
/**
 * build-pages.mjs — a page on the site for every document in the corpus.
 *
 *   node site/build-pages.mjs
 *
 * Why. Until now the site was three pages and the corpus was 128 documents. The catalogue
 * listed all 116 systems and then sent every one of them to github.com, so the questions this
 * corpus exists to answer — "what button height does Carbon use" — had no page here to land
 * on. This writes one:
 *
 *   docs/systems/<slug>.html    116 entries (the internal sample is excluded, as everywhere)
 *   docs/patterns/<slug>.html   the nine axes, the README and implementation-defaults
 *
 * Each page carries the document itself, its own canonical, its own share card text, a
 * breadcrumb, and structured data naming what it is. `site/build.mjs` reads the list this
 * writes so the sitemap and the catalogue's links stay in step — run that after this one.
 *
 * Nothing here is authored. Every page is its `.md` file rendered by `site/markdown.mjs`; if
 * a page looks wrong the document is where to fix it.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { messages } from '../tools/cli-i18n.mjs';
import { render, stripFrontmatter, esc } from './markdown.mjs';

const M = messages({
  en: {
    written: (s, p) => `docs/systems (${s}) · docs/patterns (${p}) — one page per document`,
    missing: (f) => `no entry in systems.json for ${f}`,
  },
  ko: {
    written: (s, p) => `docs/systems (${s}) · docs/patterns (${p}) — 문서마다 한 페이지`,
    missing: (f) => `systems.json 에 ${f} 항목이 없습니다`,
  },
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'docs');
const OWNER = 'Self-made-Orange';
const REPO = 'self-made-design-ops';
const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
const BASE = `https://${OWNER.toLowerCase()}.github.io/${REPO}/`;

const corpus = JSON.parse(readFileSync(join(DOCS, 'data', 'corpus.json'), 'utf8'));
const byFile = new Map(corpus.systems.map((s) => [s.file, s]));

/** The chrome every page shares. `depth` is how far below the site root the page sits. */
function page({ title, description, canonical, breadcrumb, jsonld, body, toc, meta, original }) {
  const up = '../';
  return `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Self-Made DesignOps">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${BASE}assets/og-catalog.png">
<meta property="og:image:width" content="2400">
<meta property="og:image:height" content="1260">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${BASE}assets/og-catalog.png">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%8D%8A%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="${up}assets/site.css">
<script type="application/ld+json">
${JSON.stringify(jsonld, null, 1)}
</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <a class="brand" href="${up}">🍊 Self-Made DesignOps<span class="dot">.</span></a>
  <span class="spacer"></span>
  <a class="ctrl pad" href="${up}catalog.html">Catalog</a>
  <a class="ctrl pad gh" href="${REPO_URL}">GitHub</a>
  <button class="ctrl icon" type="button" data-theme-toggle aria-label="Switch theme">
    <svg class="i-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
    <svg class="i-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>
  </button>
</header>

<div class="shell">
<aside class="rail">
  <div>
    <h2>On this page</h2>
    <ul class="sub" data-source-document lang="en">${toc}</ul>
  </div>
  <div class="railfoot">${meta}</div>
</aside>

<main class="page" id="main">
  <div class="wrap doc">
    <nav class="crumb" aria-label="Breadcrumb">${breadcrumb}</nav>
<p class="source-language-note"><span>This source document is in English. Website navigation follows your selected language.</span>${original ? ` <a href="${original}">Read the Korean original</a>` : ''}</p>
<article data-source-document lang="en">${body}</article>
  </div>
</main>
</div>
<script src="${up}assets/i18n.js" defer></script>
<script src="${up}assets/site.js" defer></script>
</body>
</html>
`;
}

/** The first real sentence of a document, for the meta description. */
function firstSentence(html, fallback) {
  const p = html.match(/<p>([\s\S]*?)<\/p>/);
  if (!p) return fallback;
  const text = p[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  const cut = text.slice(0, 155);
  return cut.length < text.length ? cut.replace(/[\s,;:.]+\S*$/, '') + '…' : cut;
}

const toc = (headings) => headings
  .map((h) => `<li${h.level === 3 ? ' class="lvl3"' : ''}><a href="#${esc(h.id)}">${esc(h.text)}</a></li>`)
  .join('');

const crumb = (parts) => parts
  .map((p, i) => (p.href ? `<a href="${p.href}">${esc(p.label)}</a>` : `<span>${esc(p.label)}</span>`) +
    (i < parts.length - 1 ? '<span class="sep">/</span>' : ''))
  .join('');

/* ── systems ───────────────────────────────────────────────────────────── */

mkdirSync(join(DOCS, 'systems'), { recursive: true });
mkdirSync(join(DOCS, 'patterns'), { recursive: true });

const systemPages = [];
for (const s of corpus.systems) {
  const md = readFileSync(join(ROOT, 'design-systems', 'systems', s.file), 'utf8');
  const { html, headings } = render(stripFrontmatter(md));
  const slug = s.file.replace(/\.md$/, '');
  const canonical = `${BASE}systems/${slug}.html`;
  const platforms = s.platform.join(' · ');
  const description = firstSentence(html,
    `${s.name} by ${s.org} — measured token values, ${platforms}, verified ${s.verified}.`);

  const meta = [
    `<b>${esc(s.org)}</b>`,
    `${esc(s.coverage)} harvest · ${esc(platforms)}`,
    `verified ${esc(s.verified)}`,
    s.url ? `<a href="${esc(s.url)}" rel="noopener">Official site</a>` : '',
    s.repo && /^https?:/.test(s.repo) ? `<a href="${esc(s.repo)}" rel="noopener">Source</a>` : '',
    `<a href="${REPO_URL}/blob/main/design-systems/systems/${s.file}">This document on GitHub</a>`,
  ].filter(Boolean).join('<br>');

  writeFileSync(join(DOCS, 'systems', `${slug}.html`), page({
    original: `${REPO_URL}/blob/main/design-systems/systems/${s.file.replace(/\.md$/, '.ko.md')}`,
    title: `${s.name} — Self-Made DesignOps`,
    description,
    canonical,
    breadcrumb: crumb([
      { label: 'Home', href: '../' },
      { label: 'Catalog', href: '../catalog.html' },
      { label: s.name },
    ]),
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: s.name,
      description,
      url: canonical,
      about: { '@type': 'SoftwareApplication', name: s.name, applicationCategory: 'DesignApplication',
        ...(s.url ? { url: s.url } : {}) },
      author: { '@type': 'Organization', name: OWNER, url: `https://github.com/${OWNER}` },
      publisher: { '@type': 'Organization', name: OWNER, url: `https://github.com/${OWNER}` },
      dateModified: s.verified,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isPartOf: { '@type': 'Dataset', name: 'Self-Made DesignOps — design system corpus', url: BASE },
    },
    body: `    <h1>${esc(s.name)}</h1>\n    <p class="doc-lede">${esc(s.org)} · ${esc(s.domain)} · ${esc(platforms)}</p>\n${html}`,
    toc: toc(headings),
    meta,
  }));
  systemPages.push({ slug, name: s.name, file: s.file, verified: s.verified });
}

/* ── patterns ──────────────────────────────────────────────────────────── */

const patternPages = [];
const patternFiles = readdirSync(join(ROOT, 'design-systems', 'patterns'))
  .filter((f) => f.endsWith('.md') && !f.endsWith('.ko.md'))
  .sort();

for (const file of patternFiles) {
  const md = readFileSync(join(ROOT, 'design-systems', 'patterns', file), 'utf8');
  const { html, headings, title } = render(stripFrontmatter(md));
  const slug = file.replace(/\.md$/, '');
  const axis = corpus.axes.find((a) => a.file === file);
  const name = axis ? axis.title : (title || slug);
  const canonical = `${BASE}patterns/${slug}.html`;
  const description = axis ? axis.headline : firstSentence(html,
    `${name} across the design systems in the corpus.`);

  const meta = [
    axis ? `<b>${axis.samples} samples</b>` : '',
    'Cross-system comparison',
    `<a href="${REPO_URL}/blob/main/design-systems/patterns/${file}">This document on GitHub</a>`,
  ].filter(Boolean).join('<br>');

  writeFileSync(join(DOCS, 'patterns', `${slug}.html`), page({
    original: existsSync(join(ROOT, 'design-systems', 'patterns', file.replace(/\.md$/, '.ko.md')))
      ? `${REPO_URL}/blob/main/design-systems/patterns/${file.replace(/\.md$/, '.ko.md')}` : null,
    title: `${name} — Self-Made DesignOps`,
    description,
    canonical,
    breadcrumb: crumb([
      { label: 'Home', href: '../' },
      { label: 'Pattern axes', href: '../#patterns' },
      { label: name },
    ]),
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: name,
      description,
      url: canonical,
      author: { '@type': 'Organization', name: OWNER, url: `https://github.com/${OWNER}` },
      publisher: { '@type': 'Organization', name: OWNER, url: `https://github.com/${OWNER}` },
      dateModified: corpus.systems.map((s) => s.verified).filter(Boolean).sort().at(-1),
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isPartOf: { '@type': 'Dataset', name: 'Self-Made DesignOps — design system corpus', url: BASE },
    },
    body: `    <h1>${esc(name)}</h1>\n${axis ? `    <p class="doc-lede">${esc(axis.samples)} samples</p>\n` : ''}${html}`,
    toc: toc(headings),
    meta,
  }));
  patternPages.push({ slug, name, file, samples: axis ? axis.samples : null });
}

/* The list build.mjs reads, so the sitemap and the catalogue's links cannot drift from what
 * actually exists on disk. */
writeFileSync(join(DOCS, 'data', 'pages.json'),
  JSON.stringify({
    $comment: 'Generated by site/build-pages.mjs. Do not edit it directly.',
    systems: systemPages,
    patterns: patternPages,
  }, null, 1) + '\n');

console.log(M.written(systemPages.length, patternPages.length));
