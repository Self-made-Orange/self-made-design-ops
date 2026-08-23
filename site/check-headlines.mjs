#!/usr/bin/env node
/**
 * check-headlines.mjs — the site's axis conclusions against the documents they summarise.
 *
 *   node site/check-headlines.mjs            human-readable table
 *   node site/check-headlines.mjs --strict   exit 1 on any failure (CI)
 *   node site/check-headlines.mjs --json     machine-readable
 *
 * Why this exists. `site/build.mjs` reads each axis's **sample count** out of its document,
 * so that number cannot drift. The **one-line conclusion** beside it is written by a person,
 * and nothing checked it. That is the corpus's known failure mode, observed three times now:
 * a table is reinforced and the summary sentence 200 lines away is left untouched
 * (typography's 13 → 17 on 2026-08-19; scales.md's 6 → 8 the same day; motion's reduced-motion
 * table reaching nine layers while three sentences still said six, caught 2026-08-23).
 *
 * What it can and cannot do. It does **not** read the prose and judge it — that is not
 * mechanisable. It checks the two things that actually go stale:
 *
 *   `counts`   a number stated in the headline, recomputed from the document's own table.
 *              This is the check that would have caught the motion drift.
 *   `literals` a value quoted in the headline, which must still appear in the document.
 *              Weaker, but it catches a value being edited out from under the summary.
 *
 * A claim with neither is listed as **unchecked** rather than silently passing — an axis
 * whose conclusion carries no verifiable claim is itself worth seeing.
 *
 * Adding an axis means adding its entry to CLAIMS below. If a headline changes, its claims
 * change with it; that coupling is the point.
 *
 * No dependencies. Node 18+ / Bun.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARGV, messages } from '../tools/cli-i18n.mjs';

const M = messages({
  en: {
    head: 'Axis conclusions against their documents',
    ok: 'every checked claim holds',
    bad: (n) => `${n} claim(s) no longer hold`,
    unchecked: (n) => `${n} claim(s) carry nothing verifiable`,
    missingHeadline: (f) => `no headline found for ${f} in site/build.mjs`,
    expected: 'stated',
    actual: 'counted',
  },
  ko: {
    head: '축 결론 대 원본 문서',
    ok: '검사한 주장 전부 유효합니다',
    bad: (n) => `주장 ${n}건이 더 이상 유효하지 않습니다`,
    unchecked: (n) => `주장 ${n}건은 기계 검증 대상이 없습니다`,
    missingHeadline: (f) => `site/build.mjs 에서 ${f} 의 headline 을 찾지 못했습니다`,
    expected: '문서가 말하는 값',
    actual: '실제로 센 값',
  },
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PATTERNS = join(ROOT, 'design-systems', 'patterns');

const NUMBER_WORD = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
};

/** Rows of the first markdown table after `heading`, excluding header and separator. */
function tableRows(md, heading) {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => l.startsWith(heading));
  if (start < 0) return null;
  const rows = [];
  let seenHeader = false;
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (!l.startsWith('|')) { if (rows.length) break; continue; }
    if (/^\|\s*:?-+/.test(l)) continue;        // separator
    if (!seenHeader) { seenHeader = true; continue; }  // the header row, once
    rows.push(l);
  }
  return rows;
}

/** Distinct system names in the second cell of each row, split on the corpus's `·`. */
function systemsIn(rows) {
  const set = new Set();
  for (const r of rows) {
    const cell = r.split('|')[2] ?? '';
    for (const part of cell.split('·')) {
      const name = part
        .replace(/\(.*?\)/g, '').replace(/`[^`]*`/g, '')
        .replace(/\*\*/g, '').replace(/[—–].*$/, '')
        .replace(/^\s*the\s+/i, '').trim();
      if (name) set.add(name);
    }
  }
  return set;
}

/**
 * Per axis, the claims its headline makes.
 *  · `count`   — { word|number stated in the headline, compute(md) }
 *  · `literal` — a string that must still appear in the document
 */
const CLAIMS = {
  'button.md': {
    literals: ['40px', '23%'],
  },
  'typography.md': {
    counts: [{
      label: 'the 14px camp',
      stated: 17,
      compute: (md) => {
        const row = md.split('\n').find((l) => /^\|\s*\*\*14px\*\*\s*\|/.test(l));
        return row ? systemsIn([row]).size : null;
      },
    }],
  },
  'color.md': { literals: ['WCAG'] },
  'form.md': { literals: ['GOV.UK', '16px'] },
  'modal.md': { literals: ['512px', '450'] },
  'motion.md': {
    counts: [
      {
        label: 'reduced-motion layers',
        stated: 'nine',
        compute: (md) => (tableRows(md, '### reduced-motion') ?? []).length || null,
      },
      {
        label: 'reduced-motion systems',
        stated: 17,
        compute: (md) => {
          const rows = tableRows(md, '### reduced-motion');
          return rows ? systemsIn(rows).size : null;
        },
      },
    ],
  },
  'table.md': {},
  'navigation.md': {},
  'feedback.md': { literals: ['8/8'] },
};

/** The headlines, read out of build.mjs rather than duplicated here. */
function headlines() {
  const src = readFileSync(join(ROOT, 'site', 'build.mjs'), 'utf8');
  const out = {};
  const re = /file:\s*'([^']+)',\s*title:\s*'(?:[^'\\]|\\.)*',\s*\n\s*headline:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(src))) out[m[1]] = m[2].replace(/\\'/g, "'");
  return out;
}

const strict = ARGV.includes('--strict');
const asJson = ARGV.includes('--json');

const results = [];
const heads = headlines();

for (const [file, claims] of Object.entries(CLAIMS)) {
  const headline = heads[file];
  if (!headline) {
    results.push({ file, claim: '—', status: 'fail', detail: M.missingHeadline(file) });
    continue;
  }
  const md = readFileSync(join(PATTERNS, file), 'utf8');
  let any = false;

  for (const c of claims.counts ?? []) {
    any = true;
    const stated = typeof c.stated === 'string' ? NUMBER_WORD[c.stated] : c.stated;
    const actual = c.compute(md);
    // the headline must actually still state the number this claim is about
    const inHeadline = new RegExp(`\\b(${c.stated}|${stated})\\b`, 'i').test(headline);
    const ok = actual === stated && inHeadline;
    results.push({
      file, claim: c.label, status: ok ? 'ok' : 'fail',
      detail: ok ? `${actual}` : `${M.expected} ${stated}, ${M.actual} ${actual ?? '—'}` +
        (inHeadline ? '' : ' · the headline no longer states it'),
    });
  }

  for (const lit of claims.literals ?? []) {
    any = true;
    const inHeadline = headline.includes(lit);
    const inDoc = md.includes(lit);
    const ok = inHeadline && inDoc;
    results.push({
      file, claim: `"${lit}"`, status: ok ? 'ok' : 'fail',
      detail: ok ? 'present in both' :
        !inHeadline ? 'not in the headline any more' : 'not in the document any more',
    });
  }

  if (!any) results.push({ file, claim: '—', status: 'unchecked', detail: 'no verifiable claim' });
}

/**
 * The hero's two numbers are written into `docs/index.html` as pre-JS fallbacks and then
 * overwritten at runtime from corpus.json. A stale fallback is a wrong number on screen until
 * the script runs, and nothing was checking it — `k-lines` had drifted to 4,635 against a
 * generated 4,854. Same class of defect as a stale headline, so it is checked here.
 */
{
  const html = readFileSync(join(ROOT, 'docs', 'index.html'), 'utf8');
  const corpus = JSON.parse(readFileSync(join(ROOT, 'docs', 'data', 'corpus.json'), 'utf8'));
  const want = { 'k-count': corpus.count, 'k-lines': corpus.kit_lines };
  for (const [id, n] of Object.entries(want)) {
    const m = html.match(new RegExp(`id="${id}"[^>]*>([^<]*)<`));
    const shown = m ? m[1].trim() : null;
    const ok = shown !== null && shown.replace(/,/g, '') === String(n);
    results.push({
      file: 'docs/index.html', claim: `#${id} fallback`, status: ok ? 'ok' : 'fail',
      detail: ok ? shown : `${M.expected} ${shown ?? '—'}, ${M.actual} ${n.toLocaleString('en')}`,
    });
  }
}

/**
 * `site/README.md` states the kit inventory's size in prose, in both languages. Same drift,
 * same check. Note that this script is itself a kit item, so editing it moves `kit_lines` —
 * which is how this check first fired.
 */
for (const readme of ['site/README.md', 'site/README.ko.md']) {
  const txt = readFileSync(join(ROOT, readme), 'utf8');
  const corpus = JSON.parse(readFileSync(join(ROOT, 'docs', 'data', 'corpus.json'), 'utf8'));
  const items = corpus.kit.reduce((n, g) => n + g.items.length, 0);
  const lines = corpus.kit_lines.toLocaleString('en');
  const ok = txt.includes(String(items)) && txt.includes(lines);
  results.push({
    file: readme, claim: 'kit inventory size', status: ok ? 'ok' : 'fail',
    detail: ok ? `${items} items · ${lines} lines`
                : `${M.expected} — , ${M.actual} ${items} items / ${lines} lines`,
  });
}

const failed = results.filter((r) => r.status === 'fail');
const unchecked = results.filter((r) => r.status === 'unchecked');

if (asJson) {
  console.log(JSON.stringify({ results, failed: failed.length, unchecked: unchecked.length }, null, 2));
} else {
  console.log(`\n  ${M.head}\n  ${'─'.repeat(76)}`);
  for (const r of results) {
    const mark = r.status === 'ok' ? '·' : r.status === 'fail' ? '✗' : '?';
    console.log(`  ${mark} ${r.file.padEnd(17)} ${String(r.claim).padEnd(26)} ${r.detail}`);
  }
  console.log(`  ${'─'.repeat(76)}`);
  console.log(`  ${failed.length ? M.bad(failed.length) : M.ok}` +
              (unchecked.length ? ` · ${M.unchecked(unchecked.length)}` : ''));
  console.log();
}

if (strict && failed.length) process.exit(1);
