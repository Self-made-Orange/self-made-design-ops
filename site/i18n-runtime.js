// Bundled after the pure helpers and the validated message catalog.
const scriptURL = new URL(document.currentScript.src);
const siteRoot = new URL('../', scriptURL);
const key = 'smo-language:' + siteRoot.pathname;
const read = (storage, name) => { try { return window[storage].getItem(name); } catch { return null; } };
const write = (storage, name, value) => { try { window[storage].setItem(name, value); } catch { /* URL still carries the choice. */ } };
const languages = Array.from(navigator.languages || [navigator.language]).filter(Boolean);
const state = languageState({
  requested: new URL(location.href).searchParams.get('lang'),
  saved: read('localStorage', key), languages,
});
const locale = state.current;
const message = (source, code = locale) => {
  if (MESSAGES[source]?.[code]) return MESSAGES[source][code];
  // Prerendered rows and document metadata need the same labels if data loading fails.
  const counted = source.match(/^(\d+) (ln|open|samples)$/);
  if (counted) return formatMessage(message(`{count} ${counted[2]}`, code), { count: counted[1] });
  const verified = source.match(/^verified (\d{4}-\d{2}-\d{2})$/);
  if (verified) return formatMessage(message('verified {date}', code), { date: verified[1] });
  const harvest = source.match(/^(full|partial|minimal) harvest · (.+)$/);
  if (harvest) return formatMessage(message('{coverage} harvest · {platforms}', code), {
    coverage: message(harvest[1], code), platforms: message(harvest[2], code),
  });
  if (source.includes(' · ')) return source.split(' · ').map((part) => message(part, code)).join(' · ');
  const more = source.match(/^(web|desktop|mobile|automotive|tv|wearable|spatial) \+(\d+)$/);
  if (more) return `${message(more[1], code)} +${more[2]}`;
  return source;
};
const t = (source, values, code = locale) => formatMessage(message(source, code), values);
const normalize = (s) => s.replace(/\s+/g, ' ').trim();
document.documentElement.lang = locale;

/** Translate whole sentences while moving their existing child elements into numbered
 * slots. Counts, emphasis, links, IDs and event listeners survive; translations are text,
 * never HTML. Source documents and executable examples are deliberately excluded. */
const skip = 'script,style,svg,pre,code,noscript,.nm,.mark,.path,[data-source-document],[data-no-translate]';
function translate(root = document.body) {
  if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
  if (root.tagName === 'A') localizeLink(root);
  if (root.matches(skip)) {
    for (const link of root.querySelectorAll('a[href]')) localizeLink(link);
    return;
  }
  const children = [...root.children];
  let index = 0;
  const source = normalize([...root.childNodes].map((node) =>
    node.nodeType === Node.TEXT_NODE ? node.nodeValue :
      node.nodeType === Node.ELEMENT_NODE ? `{${index++}}` : '').join(''));
  const translated = message(source);
  if (translated !== source) {
    const fragment = document.createDocumentFragment();
    for (const part of translated.split(/(\{\d+\})/g)) {
      const slot = part.match(/^\{(\d+)\}$/);
      fragment.append(slot ? children[Number(slot[1])] : document.createTextNode(part));
    }
    root.replaceChildren(fragment);
  } else {
    for (const node of root.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const text = normalize(node.nodeValue);
      const value = message(text);
      if (value !== text) node.nodeValue = node.nodeValue.replace(/\S[\s\S]*\S|\S/, value);
    }
  }
  for (const attr of ['aria-label', 'placeholder', 'title']) {
    if (root.hasAttribute(attr)) root.setAttribute(attr, message(root.getAttribute(attr)));
  }
  for (const child of children) translate(child);
}

function localizeLink(link) {
  if (link.hasAttribute('data-language-link')) return;
  const href = localizedSiteLink(link.getAttribute('href'), locale, location.href, siteRoot.href);
  if (href) link.href = href;
}

function choose(code) {
  if (!LOCALES.some((item) => item.code === code)) return;
  write('localStorage', key, code);
  location.assign(localizedURL(location.href, code, location.href));
}

function selectLanguage(id, selected, labelLocale = locale) {
  const select = document.createElement('select');
  select.id = id;
  select.className = 'ctrl language-select';
  select.setAttribute('aria-label', t('Website language', {}, labelLocale));
  select.setAttribute('data-no-translate', '');
  for (const item of LOCALES) {
    const option = new Option(item.name, item.code, false, item.code === selected);
    option.lang = item.code;
    select.append(option);
  }
  return select;
}

translate(document.body);
document.title = message(document.title);
for (const meta of document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"],meta[property="og:image:alt"]')) {
  meta.content = message(meta.content);
}
const ogLocale = document.querySelector('meta[property="og:locale"]');
if (ogLocale) ogLocale.content = locale.replace('-', '_');

const header = document.querySelector('header.top');
if (header) {
  // Header wrapping on narrow screens must also move the sticky rail and anchor offset.
  const resize = () => document.documentElement.style.setProperty('--head-h', `${header.getBoundingClientRect().height}px`);
  new ResizeObserver(resize).observe(header);
  resize();

  const dismissal = key + ':dismissed:' + languages.join(',') + ':' + locale;
  if (state.suggest && !read('sessionStorage', dismissal)) {
    const bannerLocale = state.preferred;
    const banner = document.createElement('section');
    banner.className = 'language-banner';
    banner.lang = bannerLocale;
    banner.setAttribute('aria-label', t('Language suggestion', {}, bannerLocale));
    banner.setAttribute('data-no-translate', '');
    const text = document.createElement('p');
    text.textContent = t(state.unsupported
      ? 'Your device language is not supported yet. Choose one of the available languages.'
      : 'This site is available in your preferred language.', {}, bannerLocale);
    const select = selectLanguage('suggested-language', state.preferred, bannerLocale);
    const picker = document.createElement('span');
    picker.className = 'language-picker';
    picker.append(select);
    const apply = document.createElement('button');
    apply.className = 'ctrl pad language-apply';
    apply.type = 'button';
    const updateLabel = () => {
      apply.textContent = t('Continue in {language}', {
        language: LOCALES.find((item) => item.code === select.value).name,
      }, bannerLocale);
    };
    updateLabel();
    select.addEventListener('change', updateLabel);
    apply.addEventListener('click', () => choose(select.value));
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'ctrl icon language-close';
    close.textContent = '×';
    close.setAttribute('aria-label', t('Dismiss language suggestion', {}, bannerLocale));
    close.addEventListener('click', () => {
      write('sessionStorage', dismissal, '1');
      banner.remove();
      header.querySelector('a[href], button')?.focus({ preventScroll: true });
    });
    banner.append(text, picker, apply, close);
    header.before(banner);
  }
}

// Footer language links switch this page rather than sending visitors to GitHub READMEs.
for (const link of document.querySelectorAll('nav[aria-labelledby="fc-lang"] a')) {
  const item = LOCALES.find((entry) => entry.name === link.textContent.trim());
  if (!item) continue;
  link.setAttribute('data-language-link', '');
  link.href = localizedURL(location.href, item.code, location.href);
  link.lang = item.code;
  link.hreflang = item.code;
  if (item.code === locale) link.setAttribute('aria-current', 'true');
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    choose(item.code);
  });
}
function updateLanguageLinks() {
  for (const link of document.querySelectorAll('[data-language-link]')) {
    link.href = localizedURL(location.href, link.hreflang, location.href);
  }
}
window.SMO_I18N = { t, translate, locale, choose, root: siteRoot.href,
  readCatalogState, catalogStateURL, updateLanguageLinks };
