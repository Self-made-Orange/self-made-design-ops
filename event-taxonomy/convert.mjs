#!/usr/bin/env node
/**
 * 이벤트 택소노미 시트 변환기
 *
 *   node convert.mjs <input.csv> --to <target> [options]
 *
 * targets: json | md | html | tsv | notion
 *
 * 이 스크립트의 핵심은 포맷 변환이 아니라 **행 그룹핑**입니다.
 * 규약상 조건부 프로퍼티는 카테고리·이벤트명·화면 위치·트리거를 비운 채
 * 이어지는 행으로 적습니다 (README의 "조건부 프로퍼티" 참고).
 * 그대로 덤프하면 빈 칸투성이가 되므로, 먼저 이벤트 단위로 묶습니다.
 *
 * 의존성 없음. Node 18+ / Bun.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { ARGV, LOCALE, messages } from '../tools/cli-i18n.mjs';

/** 화면·문서에 나가는 문장. 기본 영어, `--lang=ko`로 한국어 (`tools/cli-i18n.mjs`).
 *
 *  **입력 CSV의 컬럼 이름(HEADERS_KO)은 로케일을 따르지 않습니다** — 시트가 실제로
 *  쓰는 문자열이라 데이터 계약입니다. 같은 이유로 tsv·notion 평면 표의 헤더도
 *  원본 시트와 맞춰 그대로 둡니다. 로케일을 따르는 것은 **산문 렌더링**
 *  (md·html 라벨)과 CLI 메시지입니다.
 *
 *  `agents/case-studies/event-taxonomy-selfcheck.md`가 한국어 출력을 인용하고 있어,
 *  그 기록은 `--lang=ko`로 그대로 재현됩니다. */
const M = messages({
  en: {
    docTitle: 'Event taxonomy',
    uncategorised: '(uncategorised)',
    thCategory: 'Category', thEvent: 'Events', thPropCount: 'Properties',
    lblScreen: 'Screen', lblTrigger: 'Trigger',
    thProperty: 'Property', thValue: 'Value / type', thRequired: 'Required', thCondition: 'Condition',
    noProps: 'no properties',
    summary: (events, props) => `${events} events · ${props} properties`,
    searchPlaceholder: 'Search events, properties, screens',
    startsWithoutEvent: (raw) => `a row starts without an event name: ${raw}`,
    ignoredCell: (event, header, got, had) =>
      `  warning: ${event} — ${header} "${got}" is ignored ` +
      `(this event is already "${had}"). Split the rows if it is a separate event.`,
    badEventName: (at) => `${at}: the event name is not in {domain}_{action} form`,
    mixedDomain: (at, cat, a, b) => `${at}: category "${cat}" mixes domains (${a} / ${b})`,
    emptyTrigger: (at) => `${at}: the trigger is empty`,
    noProperties: (at) => `${at}: there are no properties`,
    noRequiredNoCondition: (at, key) =>
      `${at} · ${key}: neither required nor conditional — there is no way to know when it attaches`,
    emptyValue: (at, key) => `${at} · ${key}: the value/type is empty`,
    undecidedEnum: (at, key) =>
      `TODO|${at} · ${key}: the enum values are undecided (…) — outstanding until they are settled`,
    needInput: 'an input CSV path is required.',
    badTarget: (to, list) => `--to is not a valid value: ${to ?? '(none)'}\nValid values: ${list}`,
    parseFailed: (m) => `parse failed: ${m}`,
    todos: (n) => `${n} outstanding item(s) (not violations):`,
    violations: (n) => `${n} convention violation(s):`,
    strictStop: '\n--strict, so it exits without converting.',
    clean: 'No violations.',
    wrote: (out, n) => `${out} — ${n} events`,
    help: `Event taxonomy sheet converter

  node convert.mjs <input.csv> --to <target> [options]

  --to        json | md | html | tsv | notion
  -o <path>   write to a file (default: stdout)
  --lint-only check convention violations only, convert nothing
  --strict    exit 1 on a violation, converting nothing
  --lang      output language: en (default) | ko

The input CSV's column names are Korean — they are the sheet's own contract
(see the "Sheet columns" table in README.md). The tsv and notion targets keep
those headers so the output pastes back over the source sheet.

The point of the script is the row grouping, not the format conversion: a
conditional property is written on a following row with the category, event
name, screen and trigger left empty, so a straight dump would be full of blanks.
The notion and tsv targets flatten fully — those tools do not understand
hierarchy, and blanks break filtering, sorting and grouping.`,
  },
  ko: {
    docTitle: '이벤트 택소노미',
    uncategorised: '(분류 없음)',
    thCategory: '카테고리', thEvent: '이벤트', thPropCount: '프로퍼티 수',
    lblScreen: '화면', lblTrigger: '트리거',
    thProperty: '프로퍼티', thValue: '값 / 타입', thRequired: '필수', thCondition: '조건',
    noProps: '프로퍼티 없음',
    summary: (events, props) => `이벤트 ${events}개 · 프로퍼티 ${props}개`,
    searchPlaceholder: '이벤트·프로퍼티·화면 검색',
    startsWithoutEvent: (raw) => `이벤트명 없이 시작하는 행이 있습니다: ${raw}`,
    ignoredCell: (event, header, got, had) =>
      `  경고: ${event} — ${header} "${got}"가 무시됩니다 ` +
      `(이 이벤트는 이미 "${had}"입니다). 별도 이벤트라면 행을 나누세요.`,
    badEventName: (at) => `${at}: 이벤트명이 {도메인}_{동작} 형식이 아닙니다`,
    mixedDomain: (at, cat, a, b) => `${at}: 카테고리 "${cat}"에 도메인이 섞였습니다 (${a} / ${b})`,
    emptyTrigger: (at) => `${at}: 트리거가 비었습니다`,
    noProperties: (at) => `${at}: 프로퍼티가 없습니다`,
    noRequiredNoCondition: (at, key) =>
      `${at} · ${key}: 필수도 아니고 조건도 없습니다 — 언제 붙는지 알 수 없습니다`,
    emptyValue: (at, key) => `${at} · ${key}: 값/타입이 비었습니다`,
    undecidedEnum: (at, key) =>
      `TODO|${at} · ${key}: enum 값이 미확정입니다 (…) — 확정 전까지 잔여 작업`,
    needInput: '입력 CSV 경로가 필요합니다.',
    badTarget: (to, list) => `--to 값이 올바르지 않습니다: ${to ?? '(없음)'}\n가능한 값: ${list}`,
    parseFailed: (m) => `파싱 실패: ${m}`,
    todos: (n) => `잔여 작업 ${n}건 (위반 아님):`,
    violations: (n) => `규약 위반 ${n}건:`,
    strictStop: '\n--strict 이므로 변환하지 않고 종료합니다.',
    clean: '위반 없음.',
    wrote: (out, n) => `${out} — 이벤트 ${n}개`,
    help: `이벤트 택소노미 시트 변환기

  node convert.mjs <input.csv> --to <target> [options]

  --to        json | md | html | tsv | notion
  -o <경로>   파일로 씁니다 (기본: 표준출력)
  --lint-only 변환하지 않고 규약 위반만 검사합니다
  --strict    위반이 있으면 변환하지 않고 종료 코드 1
  --lang      출력 언어: en (기본) | ko

입력 CSV의 컬럼 이름은 한국어입니다 — 시트 자체의 계약입니다
(README.md의 "시트 컬럼" 표). tsv·notion 타깃은 원본 시트에 그대로 붙여넣도록
그 헤더를 유지합니다.

이 스크립트의 핵심은 포맷 변환이 아니라 행 그룹핑입니다. 조건부 프로퍼티는
카테고리·이벤트명·화면·트리거를 비운 채 이어지는 행으로 적으므로, 그대로
덤프하면 빈 칸투성이가 됩니다. notion·tsv는 완전 평면화합니다 — 두 도구는
계층을 모르고, 빈 칸이 있으면 필터·정렬·그룹핑이 깨집니다.`,
  },
});

const COLS = ['category', 'event', 'screen', 'trigger', 'key', 'value', 'note'];
const HEADERS_KO = {
  category: '카테고리', event: '이벤트명', screen: '화면 위치', trigger: '트리거',
  key: '프로퍼티 키', value: '프로퍼티 값 / 타입', note: '조건 / 비고',
};

// ---------------------------------------------------------------- CSV 파싱

/** RFC4180 기준. 따옴표 안의 쉼표·개행·이스케이프된 따옴표를 처리합니다. */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;

  // BOM 제거 — 엑셀에서 저장하면 붙습니다.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim() !== ''));
}

// ---------------------------------------------------------------- 정규화

/**
 * 평평한 행 목록을 이벤트 단위로 묶습니다.
 * 이벤트명이 빈 행은 직전 이벤트의 프로퍼티로 붙습니다.
 */
function normalize(rows) {
  const [, ...body] = rows;           // 헤더 버림 (컬럼 순서는 규약 고정)
  const events = [];
  let current = null;

  for (const raw of body) {
    const r = Object.fromEntries(COLS.map((c, i) => [c, (raw[i] ?? '').trim()]));

    // 이벤트명이 있으면 새 이벤트. 단, 같은 이벤트명이 연속되면 이어붙입니다
    // (규약상 이벤트명은 매 행 반복해서 적으므로).
    // (2026-08-18) 카테고리가 다르면 다른 이벤트입니다. 예전에는 이벤트명·화면만
    // 비교해서, 같은 이벤트명을 다른 카테고리가 쓰고 화면 위치가 비어 있으면
    // 앞 이벤트에 조용히 병합되고 카테고리가 유실됐습니다.
    const isNew = r.event && (!current || current.event !== r.event ||
                              (r.screen && r.screen !== current.screen) ||
                              (r.category && r.category !== current.category));
    if (isNew) {
      current = {
        category: r.category, event: r.event, screen: r.screen,
        trigger: r.trigger, properties: [],
      };
      events.push(current);
    }
    if (!current) {
      throw new Error(M.startsWithoutEvent(JSON.stringify(raw)));
    }
    // 카테고리·화면·트리거는 첫 행에만 있으므로, 비어 있으면 채우지 않고 유지합니다.
    // (2026-08-18) 다만 이어붙는 행이 **다른 값**을 들고 오면 조용히 버리지 않고
    // 경고합니다 — 값 유실이 눈에 안 보이는 것이 이 형식의 함정이었습니다.
    for (const f of ['category', 'screen', 'trigger']) {
      if (!r[f]) continue;
      if (!current[f]) current[f] = r[f];
      else if (current[f] !== r[f]) {
        console.error(M.ignoredCell(current.event, HEADERS_KO[f], r[f], current[f]));
      }
    }

    if (r.key) {
      current.properties.push({
        key: r.key,
        value: r.value,
        values: splitEnum(r.value),
        required: /필수/.test(r.note),
        condition: r.note.replace(/^필수$/, '').trim() || null,
      });
    }
  }
  return events;
}

/** `a | b | c` 형태면 배열로, 아니면 null (타입 문자열이므로). */
function splitEnum(v) {
  if (!v || !v.includes('|')) return null;
  return v.split('|').map(s => s.trim()).filter(Boolean);
}

// ---------------------------------------------------------------- 검증

/** README의 검토 체크리스트를 코드로 옮긴 것입니다. */
function lint(events) {
  const problems = [];
  const seen = new Map();

  for (const e of events) {
    const at = `${e.event}${e.screen ? ` (${e.screen})` : ''}`;

    if (!/^[a-z0-9]+(_[a-z0-9]+)+$/.test(e.event))
      problems.push(M.badEventName(at));

    const domain = e.event.split('_')[0];
    if (e.category && seen.has(e.category) && seen.get(e.category) !== domain)
      problems.push(M.mixedDomain(at, e.category, seen.get(e.category), domain));
    if (e.category) seen.set(e.category, domain);

    if (!e.trigger) problems.push(M.emptyTrigger(at));
    if (!e.properties.length) problems.push(M.noProperties(at));

    for (const p of e.properties) {
      if (!p.required && !p.condition)
        problems.push(M.noRequiredNoCondition(at, p.key));
      if (!p.value)
        problems.push(M.emptyValue(at, p.key));
      if (p.values && p.values.some(v => v === '…' || v === '...'))
        // (2026-08-18) '…'는 위반이 아니라 **잔여 작업 알림**입니다 —
        // 지침(agents/event-instrumentation.md)이 그렇게 규정했고, 도구도 그에 맞춥니다.
        problems.push(M.undecidedEnum(at, p.key));
    }
  }
  return problems;
}

// ---------------------------------------------------------------- 렌더러

const esc = s => String(s ?? '').replace(/[&<>"]/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** 표 셀 안에서 파이프는 마크다운 표를 깨뜨립니다. */
const mdCell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

function toJson(events) {
  return JSON.stringify({ events }, null, 2);
}

function toMarkdown(events) {
  const out = [`# ${M.docTitle}`, ''];
  const byCat = groupBy(events, e => e.category || M.uncategorised);

  out.push(`| ${M.thCategory} | ${M.thEvent} | ${M.thPropCount} |`, '|---|---|---:|');
  for (const [cat, list] of byCat)
    out.push(`| ${mdCell(cat)} | ${list.length} | ${list.reduce((n, e) => n + e.properties.length, 0)} |`);
  out.push('');

  for (const [cat, list] of byCat) {
    out.push(`## ${cat}`, '');
    for (const e of list) {
      out.push(`### \`${e.event}\``, '');
      if (e.screen) out.push(`**${M.lblScreen}** ${mdCell(e.screen)}  `);
      if (e.trigger) out.push(`**${M.lblTrigger}** ${mdCell(e.trigger)}`);
      out.push('');
      if (e.properties.length) {
        out.push(`| ${M.thProperty} | ${M.thValue} | ${M.thRequired} | ${M.thCondition} |`, '|---|---|:---:|---|');
        for (const p of e.properties) {
          out.push(`| \`${mdCell(p.key)}\` | ${mdCell(p.value)} | ${p.required ? '●' : ''} | ${mdCell(p.condition ?? '')} |`);
        }
        out.push('');
      }
    }
  }
  return out.join('\n');
}

function toHtml(events) {
  const byCat = groupBy(events, e => e.category || M.uncategorised);
  const total = events.reduce((n, e) => n + e.properties.length, 0);

  const sections = [...byCat].map(([cat, list]) => `
  <section>
    <h2 id="${esc(slug(cat))}">${esc(cat)}</h2>
    ${list.map(e => `
    <article class="event" data-search="${esc((e.event + ' ' + e.screen + ' ' + e.properties.map(p => p.key).join(' ')).toLowerCase())}">
      <h3><code>${esc(e.event)}</code></h3>
      <dl class="meta">
        ${e.screen ? `<dt>${esc(M.lblScreen)}</dt><dd>${esc(e.screen)}</dd>` : ''}
        ${e.trigger ? `<dt>${esc(M.lblTrigger)}</dt><dd>${esc(e.trigger)}</dd>` : ''}
      </dl>
      ${e.properties.length ? `<table>
        <thead><tr><th>${esc(M.thProperty)}</th><th>${esc(M.thValue)}</th><th>${esc(M.thRequired)}</th><th>${esc(M.thCondition)}</th></tr></thead>
        <tbody>${e.properties.map(p => `
          <tr>
            <td><code>${esc(p.key)}</code></td>
            <td>${p.values
              ? p.values.map(v => `<span class="enum">${esc(v)}</span>`).join(' ')
              : esc(p.value)}</td>
            <td class="c">${p.required ? '●' : ''}</td>
            <td class="note">${esc(p.condition ?? '')}</td>
          </tr>`).join('')}</tbody>
      </table>` : `<p class="empty">${esc(M.noProps)}</p>`}
    </article>`).join('')}
  </section>`).join('');

  return `<!doctype html>
<html lang="${LOCALE}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(M.docTitle)}</title>
<style>
  :root{--bg:#fff;--fg:#1a1a1a;--dim:#666;--line:#e5e5e5;--accent:#0b5fff;--code:#f6f6f7}
  @media(prefers-color-scheme:dark){:root{--bg:#16171a;--fg:#e8e8ea;--dim:#9a9aa0;--line:#2c2d31;--accent:#6ea8ff;--code:#212228}}
  *{box-sizing:border-box}
  body{margin:0;padding:2rem 1.25rem 6rem;background:var(--bg);color:var(--fg);
       font:15px/1.6 -apple-system,BlinkMacSystemFont,"Pretendard","Segoe UI",sans-serif;
       max-width:64rem;margin-inline:auto}
  h1{font-size:1.6rem;margin:0 0 .25rem}
  h2{font-size:1.15rem;margin:2.5rem 0 .75rem;padding-bottom:.4rem;border-bottom:2px solid var(--line)}
  h3{font-size:1rem;margin:1.5rem 0 .5rem;font-weight:600}
  code{background:var(--code);padding:.12em .4em;border-radius:4px;font-size:.9em;
       font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
  .sum{color:var(--dim);margin:0 0 1.5rem}
  #q{width:100%;padding:.6rem .8rem;font-size:1rem;border:1px solid var(--line);
     border-radius:8px;background:var(--bg);color:var(--fg);margin-bottom:1rem}
  .meta{display:grid;grid-template-columns:max-content 1fr;gap:.15rem .75rem;margin:.4rem 0 .7rem}
  .meta dt{color:var(--dim);font-size:.85rem}
  .meta dd{margin:0;font-size:.9rem}
  table{width:100%;border-collapse:collapse;font-size:.9rem}
  th{text-align:left;font-weight:600;color:var(--dim);font-size:.8rem;
     border-bottom:1px solid var(--line);padding:.35rem .5rem}
  td{border-bottom:1px solid var(--line);padding:.45rem .5rem;vertical-align:top}
  td.c{text-align:center;color:var(--accent)}
  td.note{color:var(--dim);font-size:.85rem}
  .enum{display:inline-block;background:var(--code);border-radius:4px;
        padding:.1em .4em;margin:.1em .15em .1em 0;font-size:.82em;
        font-family:ui-monospace,Menlo,monospace}
  .empty{color:var(--dim);font-size:.85rem;font-style:italic}
  .event[hidden]{display:none}
  section:has(.event:not([hidden])) {display:block}
  @media print{#q{display:none}}
</style></head><body>
<h1>${esc(M.docTitle)}</h1>
<p class="sum">${esc(M.summary(events.length, total))}</p>
<input id="q" type="search" placeholder="${esc(M.searchPlaceholder)}" autocomplete="off">
${sections}
<script>
  const q=document.getElementById('q');
  q.addEventListener('input',()=>{
    const t=q.value.trim().toLowerCase();
    for(const el of document.querySelectorAll('.event'))
      el.hidden = t && !el.dataset.search.includes(t);
    for(const s of document.querySelectorAll('section'))
      s.hidden = !s.querySelector('.event:not([hidden])');
  });
</script>
</body></html>`;
}

/**
 * 스프레드시트·Notion용. 두 도구 모두 계층 구조를 모르므로
 * 빈 칸을 앞 값으로 채운 **완전 평면** 표를 냅니다.
 * 이래야 필터·정렬·그룹핑이 제대로 동작합니다.
 */
function toFlatRows(events) {
  const rows = [[...COLS.map(c => HEADERS_KO[c]), '필수']];
  for (const e of events) {
    if (!e.properties.length) {
      rows.push([e.category, e.event, e.screen, e.trigger, '', '', '', '']);
      continue;
    }
    for (const p of e.properties) {
      rows.push([e.category, e.event, e.screen, e.trigger,
                 p.key, p.value, p.condition ?? '', p.required ? 'TRUE' : 'FALSE']);
    }
  }
  return rows;
}

const toTsv = events => toFlatRows(events)
  .map(r => r.map(c => String(c ?? '').replace(/[\t\n]/g, ' ')).join('\t')).join('\n');

const toNotionCsv = events => toFlatRows(events)
  .map(r => r.map(c => {
    const s = String(c ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(',')).join('\n');

// ---------------------------------------------------------------- 유틸

function groupBy(arr, fn) {
  const m = new Map();
  for (const x of arr) {
    const k = fn(x);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  }
  return m;
}

const slug = s => String(s).toLowerCase().replace(/[^\w가-힣]+/g, '-').replace(/^-|-$/g, '');

// ---------------------------------------------------------------- CLI

const RENDERERS = {
  json: { fn: toJson, ext: 'json' },
  md: { fn: toMarkdown, ext: 'md' },
  html: { fn: toHtml, ext: 'html' },
  tsv: { fn: toTsv, ext: 'tsv' },
  notion: { fn: toNotionCsv, ext: 'csv' },
};

function main(args) {
  if (!args.length || args.includes('-h') || args.includes('--help')) {
    console.log(M.help);
    return 0;
  }

  const input = args.find(a => !a.startsWith('-'));
  const to = args[args.indexOf('--to') + 1];
  const outIdx = args.indexOf('-o');
  const out = outIdx >= 0 ? args[outIdx + 1] : null;
  const lintOnly = args.includes('--lint-only');
  const strict = args.includes('--strict');

  if (!input) { console.error(M.needInput); return 1; }
  if (!lintOnly && !RENDERERS[to]) {
    console.error(M.badTarget(to, Object.keys(RENDERERS).join(' | ')));
    return 1;
  }

  let events;
  try {
    events = normalize(parseCsv(readFileSync(input, 'utf8')));
  } catch (e) {
    console.error(M.parseFailed(e.message));
    return 1;
  }

  const all = lint(events);
  const todos = all.filter(p => p.startsWith('TODO|')).map(p => p.slice(5));
  const problems = all.filter(p => !p.startsWith('TODO|'));
  if (todos.length) {
    console.error(M.todos(todos.length));
    for (const t of todos) console.error(`  · ${t}`);
  }
  if (problems.length) {
    console.error(M.violations(problems.length));
    for (const p of problems) console.error(`  - ${p}`);
    if (strict) { console.error(M.strictStop); return 1; }
    console.error('');
  } else if (lintOnly) {
    console.error(M.clean);
  }
  if (lintOnly) return problems.length ? 1 : 0;

  const text = RENDERERS[to].fn(events);
  if (out) {
    writeFileSync(out, text);
    console.error(M.wrote(out, events.length));
  } else {
    process.stdout.write(text + '\n');
  }
  return 0;
}

process.exit(main(ARGV));
