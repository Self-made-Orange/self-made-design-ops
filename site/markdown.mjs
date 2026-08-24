/**
 * markdown.mjs — the corpus's Markdown, and only the corpus's Markdown.
 *
 * Not a general Markdown implementation and not trying to be. The constructs it handles were
 * counted across all 128 `systems/` and `patterns/` documents first:
 *
 *   inline code 9622 · bold 9251 · table rows 5708 · bullets 3742 · headings 2042
 *   fenced code 922 · blockquotes 583 · strikethrough 316 · rules 234 · italic 159
 *   links 145 · ordered lists 6 · images 0
 *
 * Anything outside that list is left as text rather than guessed at. No dependencies, which
 * is the repository's rule and the reason this file exists instead of a parser off npm.
 *
 * **Everything is escaped before any markup is applied.** The corpus writes element names in
 * prose — `<dialog>`, `<input>`, `<option>` — and those are content, not tags. The one
 * exception is the `<!-- lang-links -->` block, which is navigation between the `.md` files
 * and has no meaning on a rendered page; it is dropped.
 */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ESC[c]);

/** A heading's id, so sections are linkable. Close enough to GitHub's to be useful. */
export const slugify = (t) => t.toLowerCase()
  .replace(/`|\*\*|~~|\*/g, '')
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .trim().replace(/\s+/g, '-');

/**
 * Inline rules. Code spans are lifted out first and put back last, so a `**` or `_` inside
 * one is never read as emphasis — the corpus is full of token names that would otherwise be
 * mangled. The placeholder is a private-use character, which cannot occur in the source.
 */
const HOLD = '\uE000';

function inline(text) {
  const code = [];
  let s = esc(text).replace(/`([^`]+)`/g, (_, c) => {
    code.push(c);
    return HOLD + (code.length - 1) + HOLD;
  });

  s = s
    // [label](target) — the corpus links to sibling documents and to the web
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const rel = /^https?:/.test(href) ? ' rel="noopener"' : '';
      return `<a href="${href}"${rel}>${label}</a>`;
    })
    // bare autolinks, written as <https://…> and escaped a moment ago
    .replace(/&lt;(https?:\/\/[^&\s]+)&gt;/g, '<a href="$1" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');

  return s.replace(new RegExp(HOLD + '(\\d+)' + HOLD, 'g'),
    (_, i) => `<code>${esc(code[Number(i)])}</code>`);
}

const isTableSep = (l) => /^\|[\s:|-]+\|?\s*$/.test(l) && l.includes('-');
const cells = (l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

/** Column alignment from the separator row: `:---`, `---:`, `:---:`. */
function alignments(sep) {
  return cells(sep).map((c) => {
    const l = c.startsWith(':'), r = c.endsWith(':');
    return l && r ? 'center' : r ? 'right' : l ? 'left' : null;
  });
}

const listItem = (l) => l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);

function listEnd(lines, start) {
  let i = start;
  while (i < lines.length) {
    if (listItem(lines[i])) { i++; continue; }
    // a blank line inside a list is fine as long as another item follows
    if (!lines[i].trim() && listItem(lines[i + 1] || '')) { i++; continue; }
    // a continuation line, indented under its item
    if (lines[i].startsWith('  ') && lines[i].trim()) { i++; continue; }
    break;
  }
  return i;
}

/** One list, with its nested lists, from `start` to `listEnd`. */
function renderList(lines, start) {
  const end = listEnd(lines, start);
  const first = listItem(lines[start]);
  const baseIndent = first[1].length;
  const ordered = /^\d/.test(first[2]);
  const items = [];
  let i = start;

  while (i < end) {
    const m = listItem(lines[i]);
    if (!m) { i++; continue; }
    if (m[1].length > baseIndent) {              // a nested list belongs to the previous item
      const sub = renderList(lines, i);
      if (items.length) items[items.length - 1].nested.push(sub);
      i = listEnd(lines, i);
      continue;
    }
    const item = { text: [m[3]], nested: [] };
    i++;
    while (i < end) {                            // this item's continuation lines
      const n = listItem(lines[i]);
      if (n && n[1].length <= baseIndent) break;
      if (n && n[1].length > baseIndent) {
        item.nested.push(renderList(lines, i));
        i = listEnd(lines, i);
        continue;
      }
      if (lines[i].trim()) item.text.push(lines[i].trim());
      i++;
    }
    items.push(item);
  }

  const tag = ordered ? 'ol' : 'ul';
  return `<${tag} class="md-list">` + items.map((it) => {
    // `- [x] ~~done~~` / `- [ ] open` — the TODO convention, kept as a marker
    let text = it.text.join(' ');
    let box = '';
    const task = text.match(/^\[([ xX])\]\s*(.*)$/);
    if (task) {
      box = `<span class="md-task${task[1].trim() ? ' done' : ''}" aria-hidden="true"></span>`;
      text = task[2];
    }
    return `<li>${box}${inline(text)}${it.nested.join('')}</li>`;
  }).join('') + `</${tag}>`;
}

/**
 * Render a corpus document. Returns `{ html, title, headings }` — `headings` is what the page
 * template builds its on-page contents from.
 */
export function render(md) {
  // The language switcher between .md files means nothing on a rendered page.
  md = md.replace(/<!-- lang-links -->[\s\S]*?<!-- \/lang-links -->\n?/g, '');

  const lines = md.split('\n');
  const out = [];
  const headings = [];
  let title = null;
  let i = 0;

  const para = [];
  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p>${inline(para.join(' '))}</p>`);
    para.length = 0;
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code — verbatim, only escaped
    const fence = line.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      flushPara();
      const lang = fence[1];
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++; // closing fence
      const cls = lang ? ` class="language-${esc(lang)}"` : '';
      out.push(`<pre class="md-code"><code${cls}>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // table — a header row, a separator, then rows until the block ends
    if (line.startsWith('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flushPara();
      const head = cells(line);
      const align = alignments(lines[i + 1]);
      i += 2;
      const body = [];
      while (i < lines.length && lines[i].startsWith('|')) body.push(cells(lines[i++]));
      const th = head.map((c, n) =>
        `<th${align[n] ? ` style="text-align:${align[n]}"` : ''}>${inline(c)}</th>`).join('');
      const tr = body.map((r) => `<tr>${r.map((c, n) =>
        `<td${align[n] ? ` style="text-align:${align[n]}"` : ''}>${inline(c)}</td>`).join('')}</tr>`).join('');
      out.push('<div class="md-tablewrap"><table class="md-table">' +
        `<thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`);
      continue;
    }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      const level = h[1].length;
      const text = h[2].trim();
      const id = slugify(text);
      const plain = text.replace(/`|\*\*|~~/g, '');
      if (level === 1 && !title) title = plain;
      if (level === 2 || level === 3) headings.push({ level, text: plain, id });
      out.push(`<h${level} id="${esc(id)}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    // horizontal rule (frontmatter is stripped before this runs, so a lone --- is a rule)
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushPara();
      out.push('<hr>');
      i++;
      continue;
    }

    // blockquote — consecutive `>` lines, rendered as one quote
    if (line.startsWith('>')) {
      flushPara();
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${render(buf.join('\n')).html}</blockquote>`);
      continue;
    }

    if (listItem(line)) {
      flushPara();
      out.push(renderList(lines, i));
      i = listEnd(lines, i);
      continue;
    }

    if (!line.trim()) { flushPara(); i++; continue; }
    para.push(line.trim());
    i++;
  }
  flushPara();
  return { html: out.join('\n'), title, headings };
}

/** Split YAML frontmatter off the top. Values are not parsed — build-data.mjs owns that. */
export function stripFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? md.slice(m[0].length) : md;
}
