/**
 * CLI output language — the convention and the resolver in one place.
 *
 * The documents in this repository are English-primary with the Korean original
 * beside them (`design-systems/i18n.mjs`). The command-line tools follow the same
 * rule: **English is the default**, Korean is available, and a message missing from
 * a locale falls back to English rather than printing a key.
 *
 * Choosing the language, in order of precedence:
 *   1. `--lang=ko` (or `--lang ko`) on the command line
 *   2. `DESIGNOPS_LANG=ko`
 *   3. `LC_ALL` / `LC_MESSAGES` / `LANG` — the leading language subtag
 *   4. English
 *
 * Why an env var *and* a flag: CI wants one setting for every tool at once, while a
 * person reproducing a transcript wants it per command. `agents/case-studies/*.md`
 * quote Korean output, so those runs are reproducible with `--lang=ko`.
 *
 * Adding a language: add its code to `SUPPORTED` here, then add the catalogue to each
 * tool. Every tool declares its own messages — there is no central message file, so a
 * tool stays readable on its own.
 *
 * Usage:
 *   import { ARGV, LOCALE, messages } from '../tools/cli-i18n.mjs';
 *   const M = messages({ en: { hi: (n) => `hi ${n}` }, ko: { hi: (n) => `안녕 ${n}` } });
 *   console.log(M.hi('carbon'));
 */

/** Locales with a catalogue. Anything else resolves to English. */
export const SUPPORTED = ['en', 'ko'];

const FALLBACK = 'en';

/** `--lang=ko` / `--lang ko`, and the argv with those tokens removed. */
function readFlag(argv) {
  const rest = [];
  let lang = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--lang' && argv[i + 1]) {
      lang = argv[++i];
      continue;
    }
    if (a.startsWith('--lang=')) {
      lang = a.slice('--lang='.length);
      continue;
    }
    rest.push(a);
  }
  return { lang, rest };
}

/** `ko_KR.UTF-8` → `ko`. Empty and `C`/`POSIX` mean "no preference". */
function fromEnvValue(v) {
  if (!v || v === 'C' || v === 'POSIX') return null;
  const tag = String(v).split(/[.@]/)[0].replace('_', '-');
  return tag.split('-')[0].toLowerCase() || null;
}

const flag = readFlag(process.argv.slice(2));

/** The tool's arguments with any `--lang` removed — use this instead of process.argv. */
export const ARGV = flag.rest;

function resolve() {
  const candidates = [
    flag.lang,
    process.env.DESIGNOPS_LANG,
    process.env.LC_ALL,
    process.env.LC_MESSAGES,
    process.env.LANG,
  ];
  for (const c of candidates) {
    const code = fromEnvValue(c);
    if (code && SUPPORTED.includes(code)) return code;
  }
  return FALLBACK;
}

/** The resolved locale. */
export const LOCALE = resolve();

/**
 * Merge a catalogue down to one object: the chosen locale over English.
 * A key present only in English still resolves, so a half-translated catalogue
 * degrades to English instead of breaking.
 */
export function messages(catalog) {
  return { ...(catalog[FALLBACK] ?? {}), ...(catalog[LOCALE] ?? {}) };
}
