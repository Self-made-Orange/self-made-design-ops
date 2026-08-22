#!/usr/bin/env node
/**
 * 로컬라이제이션 문자열 검사기
 *
 *   node lint.mjs <file.json...> [--against <base.json>] [--strict] [--json]
 *
 * README의 규약을 코드로 옮긴 것입니다. 의존성 없음. Node 18+ / Bun.
 *
 * 파일명에서 로케일을 읽어 **그 언어에 필요한 복수형 카테고리**를 검사합니다.
 * 한국어에 `one`을 넣었거나, 아랍어에서 카테고리가 빠진 것을 잡습니다.
 */

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { ARGV, messages } from '../tools/cli-i18n.mjs';

/** 화면에 나가는 문장. 기본 영어, `--lang=ko`로 한국어 (`tools/cli-i18n.mjs`).
 *  `agents/case-studies/i18n-selfcheck.md`가 한국어 출력을 인용하고 있어,
 *  그 기록은 `--lang=ko`로 그대로 재현됩니다. */
const M = messages({
  en: {
    underscoreLocale: (raw, fixed) =>
      `the locale has an underscore: "${raw}" — BCP 47 uses a hyphen (${fixed})`,
    notALanguage: (lang, right) => `"${lang}" is not a language code — use "${right}"`,
    badLanguageLength: (lang) => `the language code is not 2–3 letters: "${lang}"`,
    zhNeedsScript:
      'Chinese should carry a script subtag — zh-Hans / zh-Hant (zh-CN cannot tell Simplified from Traditional apart)',
    tooManyClosing: 'there are more closing braces than opening ones',
    unclosed: 'an opening brace is never closed',
    fileTag: '(filename)',
    parseTag: '(parsing)',
    parseFailed: (m) => `JSON parse failed: ${m}`,
    notAString: (t) => `the value is not a string (${t})`,
    keyFormat:
      'the key does not follow the convention — lower-case snake_case, dot-separated (e.g. home.cta.primary)',
    keyHasHangul: 'the key contains Hangul — do not use the translated text as the key',
    icuBrace: (why) => `ICU brace error: ${why}`,
    noOther: (kind, name) =>
      `${kind} "${name}" has no other category — without a fallback the value breaks when it is unexpected`,
    missingPlural: (lang, missing, need) =>
      `${lang} is missing plural categories: ${missing} (needs: ${need})`,
    extraPlural: (lang, extra, need) =>
      `${lang} has plural categories it does not need: ${extra} — ${lang} uses only ${need}`,
    concatenation:
      'traces of string concatenation — this breaks in a language with a different word order. Use ICU',
    quantityNoPlural:
      'a quantity with no plural — this breaks in a language whose plural rules differ',
    missingPlaceholder: (list) => `missing placeholders: ${list}`,
    extraPlaceholder: (list) => `placeholders not in the reference: ${list}`,
    identical: 'identical to the reference — it looks untranslated',
    budgetExceeded: (baseLen, len, ratio, budget) =>
      `over the length budget: reference ${baseLen} chars → ${len} chars (${ratio}%, budget ${budget}%)`,
    missingKey: 'present in the reference and absent here — a missing translation',
    baseUnreadable: (m) => `the reference file could not be read: ${m}`,
    head: (locale, count) => `${locale} — ${count} keys`,
    clean: (head) => `✓ ${head} · no violations`,
    dirty: (head, n) => `\n✗ ${head} · ${n} violation(s)`,
    reference: (p) => `\nReference: ${p}`,
    budgetWarn: (bl) =>
      `  ⚠ the length budget only holds when the reference is English (current reference: ${bl}).`,
    budgetWarn2:
      '    Take Korean or Chinese as the reference and, being short to begin with, everything else always trips it.',
    total: (n) => `\n${n} violation(s) in total`,
    help: `Localisation string linter

  node lint.mjs <file.json...> [--against <base.json>] [--strict] [--json] [--lang=ko]

  --against   compare against a reference file (placeholder agreement, missing translations, length budget)
  --strict    exit 1 if there are violations (for CI)
  --json      print the result as JSON
  --lang      output language: en (default) | ko

What it checks is listed in the "check script" section of README.md.
Plural categories are checked against CLDR, reading the language from the locale in the
filename — it catches a one put into Korean, or a category missing from Arabic.`,
  },
  ko: {
    underscoreLocale: (raw, fixed) =>
      `로케일에 밑줄이 있습니다: "${raw}" — BCP 47은 하이픈입니다 (${fixed})`,
    notALanguage: (lang, right) => `"${lang}"은 언어 코드가 아닙니다 — "${right}"를 쓰세요`,
    badLanguageLength: (lang) => `언어 코드가 2~3자가 아닙니다: "${lang}"`,
    zhNeedsScript:
      '중국어는 문자 서브태그를 권합니다 — zh-Hans / zh-Hant (zh-CN은 간체/번체를 구분하지 못합니다)',
    tooManyClosing: '닫는 중괄호가 더 많습니다',
    unclosed: '열린 중괄호가 닫히지 않았습니다',
    fileTag: '(파일명)',
    parseTag: '(파싱)',
    parseFailed: (m) => `JSON 파싱 실패: ${m}`,
    notAString: (t) => `값이 문자열이 아닙니다 (${t})`,
    keyFormat: '키가 규약 형식이 아닙니다 — 소문자 스네이크케이스 + 점 구분 (예: home.cta.primary)',
    keyHasHangul: '키에 한글이 있습니다 — 번역문을 키로 쓰지 마세요',
    icuBrace: (why) => `ICU 중괄호 오류: ${why}`,
    noOther: (kind, name) =>
      `${kind} "${name}"에 other 카테고리가 없습니다 — 폴백이 없으면 값이 예상 밖일 때 깨집니다`,
    missingPlural: (lang, missing, need) =>
      `${lang} 복수형 카테고리 누락: ${missing} (필요: ${need})`,
    extraPlural: (lang, extra, need) =>
      `${lang}에 불필요한 복수형 카테고리: ${extra} — ${lang}는 ${need}만 씁니다`,
    concatenation: '문자열 이어 붙이기 흔적이 있습니다 — 어순이 다른 언어에서 깨집니다. ICU를 쓰세요',
    quantityNoPlural: '수량 표현에 plural이 없습니다 — 복수형 규칙이 다른 언어에서 깨집니다',
    missingPlaceholder: (list) => `플레이스홀더 누락: ${list}`,
    extraPlaceholder: (list) => `기준에 없는 플레이스홀더: ${list}`,
    identical: '값이 기준과 동일합니다 — 미번역 상태로 보입니다',
    budgetExceeded: (baseLen, len, ratio, budget) =>
      `길이 예산 초과: 기준 ${baseLen}자 → ${len}자 (${ratio}%, 예산 ${budget}%)`,
    missingKey: '기준에 있으나 이 파일에 없습니다 — 번역 누락',
    baseUnreadable: (m) => `기준 파일을 읽을 수 없습니다: ${m}`,
    head: (locale, count) => `${locale} — 키 ${count}개`,
    clean: (head) => `✓ ${head} · 위반 없음`,
    dirty: (head, n) => `\n✗ ${head} · 위반 ${n}건`,
    reference: (p) => `\n기준: ${p}`,
    budgetWarn: (bl) => `  ⚠ 길이 예산은 기준이 영어일 때 유효합니다 (현재 기준: ${bl}).`,
    budgetWarn2: '    한국어·중국어를 기준으로 삼으면 원래 짧아서 항상 초과로 잡힙니다.',
    total: (n) => `\n총 위반 ${n}건`,
    help: `로컬라이제이션 문자열 검사기

  node lint.mjs <file.json...> [--against <base.json>] [--strict] [--json] [--lang=ko]

  --against   기준 파일과 비교 (플레이스홀더 일치·번역 누락·길이 예산)
  --strict    위반이 있으면 종료 코드 1 (CI용)
  --json      결과를 JSON으로 출력
  --lang      출력 언어: en (기본) | ko

검사 항목은 README.md의 "검사 스크립트" 절에 있습니다.
복수형 카테고리는 파일명의 로케일에서 언어를 읽어 CLDR 기준으로 검사합니다 —
한국어에 one을 넣었거나 아랍어에서 카테고리가 빠진 것을 잡습니다.`,
  },
});

// ---------------------------------------------------------------- CLDR 복수형

/**
 * 언어별 필요 복수형 카테고리.
 * 출처: CLDR plural rules. 여기서는 자주 쓰는 언어만 담았습니다 —
 * 목록에 없는 언어는 `other` 존재만 검사하고 나머지는 통과시킵니다.
 */
const PLURAL_CATEGORIES = {
  ko: ['other'], ja: ['other'], zh: ['other'], vi: ['other'], th: ['other'],
  id: ['other'], ms: ['other'],
  en: ['one', 'other'], de: ['one', 'other'], nl: ['one', 'other'],
  es: ['one', 'other'], it: ['one', 'other'], sv: ['one', 'other'],
  da: ['one', 'other'], nb: ['one', 'other'], fi: ['one', 'other'],
  tr: ['one', 'other'], hu: ['one', 'other'],
  fr: ['one', 'many', 'other'], pt: ['one', 'many', 'other'],
  ru: ['one', 'few', 'many', 'other'], uk: ['one', 'few', 'many', 'other'],
  pl: ['one', 'few', 'many', 'other'], cs: ['one', 'few', 'many', 'other'],
  ar: ['zero', 'one', 'two', 'few', 'many', 'other'],
  cy: ['zero', 'one', 'two', 'few', 'many', 'other'],
};

/**
 * 영어 원문 길이 → 허용 확장률(%). README의 표와 같습니다.
 *
 * 주의: 이 예산은 **기준이 영어일 때** 의미가 있습니다.
 * 한국어를 기준으로 영어를 검사하면 한국어가 원래 짧아서 항상 초과로 잡힙니다.
 * `--against`에는 영어 파일을 넣으세요.
 */
function expansionBudget(len) {
  if (len <= 10) return 300;
  if (len <= 20) return 180;
  if (len <= 30) return 160;
  if (len <= 50) return 140;
  return 130;
}

// ---------------------------------------------------------------- 로케일 파싱

const BAD_LOCALE = {
  kr: 'ko', cn: 'zh', jp: 'ja', gb: 'en',
};

/** 파일명에서 BCP 47 로케일을 읽고, 형식 문제를 함께 반환합니다. */
function parseLocale(file) {
  const raw = basename(file).replace(/\.(json|json5)$/i, '');
  const problems = [];

  if (raw.includes('_')) {
    problems.push(M.underscoreLocale(raw, raw.replace(/_/g, '-')));
  }
  const parts = raw.split(/[-_]/);
  const lang = parts[0].toLowerCase();

  // 잘못된 코드는 보고하되, 교정된 코드로 나머지 검사를 계속합니다 —
  // 파일명 하나 때문에 복수형 검사까지 건너뛰면 실제 문제를 놓칩니다.
  let effective = lang;
  if (BAD_LOCALE[lang]) {
    problems.push(M.notALanguage(lang, BAD_LOCALE[lang]));
    effective = BAD_LOCALE[lang];
  }
  if (lang.length !== 2 && lang.length !== 3) {
    problems.push(M.badLanguageLength(lang));
  }
  // 중국어는 문자 서브태그 권장
  if (lang === 'zh' && !parts.some(p => /^Han[st]$/i.test(p))) {
    problems.push(M.zhNeedsScript);
  }
  return { locale: raw, lang: effective, problems };
}

// ---------------------------------------------------------------- ICU 파싱

/** 최상위 `{...}` 블록을 찾습니다 (중첩 인식). */
function topLevelBraces(s) {
  const out = [];
  let depth = 0, start = -1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') { if (depth === 0) start = i; depth++; }
    else if (s[i] === '}') {
      depth--;
      if (depth === 0 && start >= 0) { out.push({ start, end: i, body: s.slice(start + 1, i) }); start = -1; }
      if (depth < 0) return { blocks: out, unbalanced: M.tooManyClosing };
    }
  }
  if (depth > 0) return { blocks: out, unbalanced: M.unclosed };
  return { blocks: out, unbalanced: null };
}

/** ICU 인자 이름과 plural/select 구조를 뽑습니다. */
function parseIcu(value) {
  const { blocks, unbalanced } = topLevelBraces(value);
  const args = [];
  const structures = [];

  for (const b of blocks) {
    // `name, plural, one {…} other {…}` 또는 단순 `name`
    const m = b.body.match(/^\s*([\w.]+)\s*(?:,\s*(plural|select|selectordinal|number|date|time)\s*(?:,([\s\S]*))?)?\s*$/);
    if (!m) { args.push(b.body.trim()); continue; }
    const [, name, kind, rest] = m;
    args.push(name);
    if (kind === 'plural' || kind === 'select' || kind === 'selectordinal') {
      const cats = [];
      // rest 안의 `카테고리 {…}` 를 훑습니다
      const { blocks: inner } = topLevelBraces(rest ?? '');
      let cursor = 0;
      for (const ib of inner) {
        const label = (rest ?? '').slice(cursor, ib.start).trim().replace(/^=/, '=');
        if (label) cats.push(label);
        cursor = ib.end + 1;
      }
      structures.push({ name, kind, categories: cats });
    }
  }
  return { args: [...new Set(args)], structures, unbalanced };
}

// ---------------------------------------------------------------- 검사

const KEY_RE = /^[a-z0-9]+(?:_[a-z0-9]+)*(?:\.[a-z0-9]+(?:_[a-z0-9]+)*)+$/;

function lintFile(file, base) {
  const problems = [];
  const add = (key, msg) => problems.push({ file, key, msg });

  const { locale, lang, problems: locProblems } = parseLocale(file);
  for (const p of locProblems) add(M.fileTag, p);

  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    add(M.parseTag, M.parseFailed(e.message));
    return { locale, problems, count: 0 };
  }

  const flat = {};
  (function walk(o, prefix = '') {
    for (const [k, v] of Object.entries(o)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, key);
      else flat[key] = v;
    }
  })(data);

  const need = PLURAL_CATEGORIES[lang] ?? null;

  for (const [key, value] of Object.entries(flat)) {
    if (typeof value !== 'string') { add(key, M.notAString(typeof value)); continue; }

    // 1) 키 명명
    if (!KEY_RE.test(key)) {
      add(key, M.keyFormat);
    }
    if (/[가-힣]/.test(key)) {
      add(key, M.keyHasHangul);
    }

    // 2) ICU 문법
    const { args, structures, unbalanced } = parseIcu(value);
    if (unbalanced) add(key, M.icuBrace(unbalanced));

    for (const st of structures) {
      if (!st.categories.includes('other')) {
        add(key, M.noOther(st.kind, st.name));
      }
      if (st.kind === 'plural' && need) {
        // `=0` 같은 정확값 지정은 카테고리와 별개로 허용
        const cats = st.categories.filter(c => !c.startsWith('='));
        const missing = need.filter(c => !cats.includes(c));
        if (missing.length) {
          add(key, M.missingPlural(lang, missing.join(', '), need.join(' · ')));
        }
        const extra = cats.filter(c => !need.includes(c));
        if (extra.length) {
          add(key, M.extraPlural(lang, extra.join(', '), need.join(' · ')));
        }
      }
    }

    // 3) 이어 붙이기 흔적
    if (/["'`]\s*\+\s*["'`]/.test(value)) {
      add(key, M.concatenation);
    }
    if (/\{\s*\w+\s*\}\s*(개|items?|results?)\b/i.test(value) && !structures.length) {
      add(key, M.quantityNoPlural);
    }

    // 4) 기준 파일 대비
    if (base && key in base) {
      const bArgs = parseIcu(base[key]).args;
      const missing = bArgs.filter(a => !args.includes(a));
      const extra = args.filter(a => !bArgs.includes(a));
      if (missing.length) add(key, M.missingPlaceholder(missing.map(a => `{${a}}`).join(' ')));
      if (extra.length) add(key, M.extraPlaceholder(extra.map(a => `{${a}}`).join(' ')));

      if (value === base[key] && value.trim() !== '') {
        add(key, M.identical);
      }
      const budget = expansionBudget(base[key].length);
      const ratio = Math.round((value.length / Math.max(1, base[key].length)) * 100);
      if (ratio > budget) {
        add(key, M.budgetExceeded(base[key].length, value.length, ratio, budget));
      }
    }
  }

  // 5) 번역 누락
  if (base) {
    for (const key of Object.keys(base)) {
      if (!(key in flat)) add(key, M.missingKey);
    }
  }

  return { locale, problems, count: Object.keys(flat).length };
}

// ---------------------------------------------------------------- CLI

function main(args) {
  if (!args.length || args.includes('-h') || args.includes('--help')) {
    console.log(M.help);
    return 0;
  }

  const againstIdx = args.indexOf('--against');
  const basePath = againstIdx >= 0 ? args[againstIdx + 1] : null;
  const strict = args.includes('--strict');
  const asJson = args.includes('--json');
  // --against 가 없으면 (againstIdx === -1) 어떤 인덱스도 제외하지 않습니다.
  const skipIdx = againstIdx >= 0 ? againstIdx + 1 : -1;
  const files = args.filter((a, i) => !a.startsWith('--') && i !== skipIdx);

  let base = null;
  if (basePath) {
    try {
      const raw = JSON.parse(readFileSync(basePath, 'utf8'));
      base = {};
      (function walk(o, p = '') {
        for (const [k, v] of Object.entries(o)) {
          const key = p ? `${p}.${k}` : k;
          if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, key);
          else if (typeof v === 'string') base[key] = v;
        }
      })(raw);
    } catch (e) {
      console.error(M.baseUnreadable(e.message));
      return 1;
    }
  }

  const results = files.map(f => lintFile(f, base));
  const total = results.reduce((n, r) => n + r.problems.length, 0);

  if (asJson) {
    console.log(JSON.stringify({ total, results }, null, 2));
  } else {
    for (const r of results) {
      const head = M.head(r.locale, r.count);
      if (!r.problems.length) { console.log(M.clean(head)); continue; }
      console.log(M.dirty(head, r.problems.length));
      for (const p of r.problems) console.log(`    ${p.key}\n      → ${p.msg}`);
    }
    if (basePath) {
    console.log(M.reference(basePath));
    const bl = parseLocale(basePath).lang;
    if (bl !== 'en') {
      console.log(M.budgetWarn(bl));
      console.log(M.budgetWarn2);
    }
  }
    console.log(M.total(total));
  }

  return strict && total ? 1 : 0;
}

process.exit(main(ARGV));
