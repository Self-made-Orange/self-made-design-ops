/** Public site locales mirror the language links in the root README. */
export const LOCALES = [
  { code: 'en', name: 'English', readme: 'README.md' },
  { code: 'ko', name: '한국어', readme: 'README.ko.md' },
  { code: 'ja', name: '日本語', readme: 'README.ja.md' },
  { code: 'zh-Hans', name: '简体中文', readme: 'README.zh-Hans.md' },
  { code: 'id', name: 'Bahasa Indonesia', readme: 'README.id.md' },
  { code: 'es', name: 'Español', readme: 'README.es.md' },
];

export function matchLocale(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const locale = new Intl.Locale(value.replaceAll('_', '-'));
    // Do not silently present Simplified Chinese as a Traditional Chinese translation.
    if (locale.language === 'zh') {
      return locale.maximize().script === 'Hans' ? 'zh-Hans' : null;
    }
    return LOCALES.find(({ code }) => code === locale.language)?.code ?? null;
  } catch { return null; }
}

export function languageState({ requested, saved, languages = [] }) {
  const explicit = matchLocale(requested) || matchLocale(saved);
  const current = explicit || 'en';
  const preferred = languages.map(matchLocale).find(Boolean) || 'en';
  const unsupported = languages.length > 0 && !matchLocale(languages[0]);
  return { current, preferred, unsupported,
    suggest: !explicit && languages.length > 0 && (unsupported || preferred !== current) };
}

export function formatMessage(message, values = {}) {
  return message.replace(/\{(\w+)\}/g, (token, key) => String(values[key] ?? token));
}

export function localizedURL(href, code, base) {
  const url = new URL(href, base);
  url.searchParams.set('lang', code);
  return url.href;
}

/** A bad corpus link must not prevent the rest of the page from initializing. */
export function localizedSiteLink(href, code, base, siteRoot) {
  if (!href || href.startsWith('#')) return null;
  try {
    const url = new URL(href, base);
    const root = new URL(siteRoot);
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname) ||
        !(url.pathname.endsWith('/') || url.pathname.endsWith('.html'))) return null;
    return localizedURL(url.href, code, base);
  } catch { return null; }
}

export function readCatalogState(href) {
  const params = new URL(href).searchParams;
  return {
    q: params.get('q') || '',
    platform: new Set(params.getAll('platform')),
    coverage: new Set(params.getAll('coverage')),
    domain: new Set(params.getAll('domain')),
  };
}

export function catalogStateURL(href, state) {
  const url = new URL(href);
  url.searchParams.delete('q');
  if (state.q) url.searchParams.set('q', state.q);
  for (const key of ['platform', 'coverage', 'domain']) {
    url.searchParams.delete(key);
    for (const value of state[key]) url.searchParams.append(key, value);
  }
  return url.href;
}
