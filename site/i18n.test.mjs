import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { LOCALES, matchLocale, languageState, formatMessage, localizedURL,
  localizedSiteLink, readCatalogState, catalogStateURL } from './i18n-core.mjs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const messages = JSON.parse(read('./locales/messages.json'));

test('the site supports exactly the README language links', () => {
  const line = read('../README.md').split('\n').find((s) => s.startsWith('**English**'));
  const readmes = ['README.md', ...[...line.matchAll(/\]\((README\.[^)]+)\)/g)].map((m) => m[1])];
  assert.deepEqual(LOCALES.map((item) => item.readme), readmes);
});

test('regional language tags match without confusing Chinese scripts', () => {
  for (const [input, expected] of Object.entries({
    'en-US': 'en', 'en-GB': 'en', 'ko-KR': 'ko', 'KO_kr': 'ko',
    'ja-JP': 'ja', 'es-MX': 'es', 'id-ID': 'id',
    zh: 'zh-Hans', 'zh-CN': 'zh-Hans', 'zh-SG': 'zh-Hans', 'zh-Hans-TW': 'zh-Hans',
    'zh-TW': null, 'zh-HK': null, 'zh-Hant-CN': null, 'fr-FR': null,
    'not a locale': null, '': null,
  })) assert.equal(matchLocale(input), expected, input);
  assert.equal(matchLocale(null), null);
});

test('first visit suggests the device language without redirecting', () => {
  assert.deepEqual(languageState({ languages: ['ko-KR', 'en-US'] }), {
    current: 'en', preferred: 'ko', unsupported: false, suggest: true,
  });
  assert.equal(languageState({ languages: ['en-GB', 'ko-KR'] }).suggest, false);
  assert.equal(languageState({ languages: [] }).suggest, false);
});

test('unsupported primary languages get a selector and the next supported preference', () => {
  assert.deepEqual(languageState({ languages: ['fr-FR', 'ja-JP', 'en-US'] }), {
    current: 'en', preferred: 'ja', unsupported: true, suggest: true,
  });
  assert.deepEqual(languageState({ languages: ['zh-TW'] }), {
    current: 'en', preferred: 'en', unsupported: true, suggest: true,
  });
});

test('explicit URL overrides saved choice; saved choice overrides the device', () => {
  assert.equal(languageState({ requested: 'es-MX', saved: 'ko', languages: ['ja'] }).current, 'es');
  assert.equal(languageState({ saved: 'ko', languages: ['ja'] }).suggest, false);
  assert.equal(languageState({ requested: 'en', languages: ['ko'] }).suggest, false);
  assert.equal(languageState({ requested: '<script>', saved: 'ja' }).current, 'ja');
  assert.equal(languageState({ saved: 'invalid value', languages: ['ko'] }).suggest, true);
});

test('language URLs preserve nested paths, other query parameters and anchors', () => {
  const url = new URL(localizedURL('../systems/carbon.html?filter=a%26b&lang=en#colors',
    'zh-Hans', 'https://example.test/project/patterns/button.html'));
  assert.equal(url.pathname, '/project/systems/carbon.html');
  assert.equal(url.searchParams.get('filter'), 'a&b');
  assert.deepEqual(url.searchParams.getAll('lang'), ['zh-Hans']);
  assert.equal(url.hash, '#colors');
});

test('invalid corpus links do not stop processing subsequent valid links', () => {
  const corpus = JSON.parse(read('../docs/data/corpus.json'));
  const malformed = corpus.systems.find((s) => s.file === 'rakuten-rex.md').url;
  const base = 'https://example.test/project/catalog.html';
  const root = 'https://example.test/project/';
  const results = [malformed, 'https://[', './systems/carbon.html#tokens'].map((href) =>
    localizedSiteLink(href, 'ko', base, root));
  assert.deepEqual(results, [null, null, 'https://example.test/project/systems/carbon.html?lang=ko#tokens']);
});

test('localizing site links leaves external, fragment and asset URLs untouched', () => {
  const base = 'https://example.test/project/catalog.html';
  for (const href of [null, '', '#tokens', 'mailto:hello@example.test',
    'https://other.test/a.html', '/another-project/a.html', './data/corpus.json']) {
    assert.equal(localizedSiteLink(href, 'ja', base, 'https://example.test/project/'), null);
  }
});

test('search and multiple filters survive a language change and reload', () => {
  const original = 'https://example.test/project/catalog.html?lang=en&campaign=a%26b#main';
  const state = { q: 'Carbon & 색상', platform: new Set(['web', 'mobile']),
    coverage: new Set(['full', 'partial']), domain: new Set(['enterprise']) };
  const next = localizedURL(catalogStateURL(original, state), 'ja', original);
  assert.deepEqual(readCatalogState(next), state);
  const url = new URL(next);
  assert.equal(url.searchParams.get('lang'), 'ja');
  assert.equal(url.searchParams.get('campaign'), 'a&b');
  assert.equal(url.hash, '#main');
  assert.equal(catalogStateURL(next, state), next);
});

test('reset removes search and filters without removing the chosen language or other parameters', () => {
  const before = 'https://example.test/catalog.html?lang=ko&q=Carbon&platform=web&coverage=full&domain=enterprise&campaign=docs#main';
  const empty = readCatalogState('https://example.test/catalog.html');
  const reset = new URL(catalogStateURL(before, empty));
  assert.deepEqual([...reset.searchParams], [['lang', 'ko'], ['campaign', 'docs']]);
  assert.equal(reset.hash, '#main');
});

test('every message has all five translations with unchanged placeholders', () => {
  const slots = (s) => (s.match(/\{\w+\}/g) || []).sort();
  for (const [source, values] of Object.entries(messages)) {
    assert.deepEqual(Object.keys(values), LOCALES.slice(1).map((l) => l.code));
    for (const [lang, text] of Object.entries(values)) {
      assert.ok(text.trim(), `${lang}: ${source}`);
      assert.deepEqual(slots(text), slots(source), `${lang}: ${source}`);
    }
  }
  assert.equal(formatMessage(messages['{shown} of {total}'].ko, { shown: 0, total: 116 }), '전체 116개 중 0개');
});

test('corpus-driven headings, descriptions and filters are translated', () => {
  const corpus = JSON.parse(read('../docs/data/corpus.json'));
  const sources = [...corpus.axes.flatMap((a) => [a.title, a.headline]),
    ...corpus.kit.flatMap((g) => [g.group, ...g.items.map((item) => item.what)]),
    ...Object.keys(corpus.by_domain), ...Object.keys(corpus.by_platform), ...Object.keys(corpus.by_coverage)];
  for (const source of sources) assert.ok(messages[source], `Missing UI translation: ${source}`);
});

test('Korean original links on generated document pages point to existing sources', () => {
  const pages = JSON.parse(read('../docs/data/pages.json'));
  for (const [group, entries] of Object.entries(pages)) {
    if (!['systems', 'patterns'].includes(group)) continue;
    for (const entry of entries) {
      const original = `design-systems/${group}/${entry.file.replace(/\.md$/, '.ko.md')}`;
      const html = read(`../docs/${group}/${entry.slug}.html`);
      assert.equal(html.includes(`/blob/main/${original}`), existsSync(new URL(`../${original}`, import.meta.url)), original);
    }
  }
});
