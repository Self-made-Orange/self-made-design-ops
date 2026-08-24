/* ── Self-Made DesignOps — shared page behaviour
 *
 * Loaded by both index.html and catalog.html. Anything that must behave the same
 * on both pages lives here; only the page's own rendering stays inline.
 *
 * The theme is applied *before paint* by a four-line inline script in each
 * <head> — see the comment there. This file only handles the toggle, because a
 * deferred script runs too late to prevent a flash.
 */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, props = {}, kids = []) => {
    const n = Object.assign(document.createElement(tag), props);
    for (const k of [].concat(kids)) if (k || k === 0) n.append(k);
    return n;
  };

  const REPO = 'https://github.com/Self-made-Orange/self-made-design-ops';
  const BLOB = REPO + '/blob/main/';

  /* ── Entry marks: a deterministic monogram, with the org's GitHub avatar over it
   *    when there is a public repo to take one from. Shared, because the catalogue
   *    and the landing page's catalogue preview must produce the same mark for the
   *    same system — a system keeps its colour between pages and between visits. */
  const hue = (t) => { let h = 0; for (const c of t) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const initials = (name) => name.replace(/\(.*?\)/g, ' ').split(/[\s/·-]+/).filter(Boolean)
    .slice(0, 2).map((w) => w[0]).join('').slice(0, 2);
  /* GitHub serves an org's avatar at github.com/<org>.png, so nothing third-party is
   * stored here — only the handle, which the corpus already carries in `repo`. Some
   * repo fields are prose rather than a bare URL, so the handle is matched anywhere. */
  const GH_ORG = /github\.com\/([A-Za-z0-9](?:[A-Za-z0-9-]{0,38})?)(?=[/\s)]|$)/;
  const orgOf = (s) => (s.repo && String(s.repo).match(GH_ORG) || [])[1] || null;

  function mark(s) {
    const slug = s.file.replace(/\.md$/, '');
    const box = el('span', { className: 'mark' }, [el('span', { className: 'ini', textContent: initials(s.name) })]);
    box.style.setProperty('--h', hue(slug));

    const org = orgOf(s);
    if (!org) return box;   // no public repo — the monogram stands, which is itself true

    // The <img> goes into the DOM straight away, stacked over the monogram and
    // transparent until it loads. A detached Image() with loading="lazy" never
    // fires at all — the browser has no viewport to defer against — so the probe
    // has to live in the document for lazy loading to mean anything.
    const img = el('img', { alt: '', loading: 'lazy', width: 28, height: 28, referrerPolicy: 'no-referrer' });
    img.addEventListener('load', () => box.classList.add('has-img'));
    img.addEventListener('error', () => img.remove());
    img.src = `https://github.com/${org}.png?size=56`;
    box.append(img);
    return box;
  }


  /* ── Theme toggle.
   * Three states are possible in storage: 'light', 'dark', or nothing at all.
   * "Nothing" means follow the OS, so the toggle writes an explicit choice and
   * stops following it from then on — matching how the OS switch is normally
   * expected to lose to an in-page choice. */
  const THEME_KEY = 'smo-theme';
  const systemDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
  const current = () => document.documentElement.dataset.theme || (systemDark() ? 'dark' : 'light');

  function setTheme(next) {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* private mode — the session still works */ }
    for (const b of document.querySelectorAll('[data-theme-toggle]')) {
      b.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      b.setAttribute('aria-pressed', String(next === 'dark'));
    }
  }
  for (const b of document.querySelectorAll('[data-theme-toggle]')) {
    b.addEventListener('click', () => setTheme(current() === 'dark' ? 'light' : 'dark'));
  }
  setTheme(current());   // normalises the attribute and labels the button on first paint

  // Until someone picks, the OS keeps deciding — including when it changes mid-visit.
  let stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch { /* ignore */ }
  if (!stored) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    });
  }

  /* ── Copyright year. A hard-coded year on a static page goes stale silently. */
  for (const y of document.querySelectorAll('[data-year]')) y.textContent = new Date().getFullYear();

  /* ── Copy buttons. `data-target` names the <pre> to copy. */
  for (const btn of document.querySelectorAll('.copy')) {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const src = document.getElementById(btn.dataset.target);
      if (!src) return;
      try {
        await navigator.clipboard.writeText(src.dataset.full || src.textContent);
        btn.textContent = 'Copied';
      } catch { btn.textContent = 'Copy failed'; }
      setTimeout(() => { btn.textContent = label; }, 1500);
    });
  }

  /* ── Rail scrollspy. Lights the rail entry for whatever section is in view, so
   * the rail reads as navigation rather than as a list of links. */
  const spies = [...document.querySelectorAll('[data-spy]')];
  if (spies.length) {
    const spy = () => {
      const at = window.scrollY + 140;
      let active = null;
      for (const a of spies) {
        const sec = document.getElementById(a.dataset.spy);
        if (sec && sec.offsetTop <= at) active = a;
      }
      // Above the first section nothing matches; showing the first entry beats
      // going blank.
      if (!active) active = spies[0];
      for (const a of spies) a.toggleAttribute('aria-current', a === active);
    };
    addEventListener('scroll', () => requestAnimationFrame(spy), { passive: true });
    addEventListener('resize', spy, { passive: true });
    spy();
  }

  /* ── Footer brand scrolls back to the top rather than reloading the page. */
  {
    const top = $('#to-top');
    if (top) top.addEventListener('click', (e) => {
      e.preventDefault();
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', location.pathname + location.search);
    });
  }

  /* ── The one loader. Both pages read the same generated file. */
  const corpus = fetch('./data/corpus.json').then((r) => {
    if (!r.ok) throw new Error('corpus.json ' + r.status);
    return r.json();
  });

  window.SMO = { $, el, REPO, BLOB, corpus, mark, hue, initials, orgOf,
    spy: () => dispatchEvent(new Event('resize')) };
})();
