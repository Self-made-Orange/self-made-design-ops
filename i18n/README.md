<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# Localisation conventions

The **shared conventions** for defining and managing multilingual strings.
A specific product's actual translation strings do not live here — they belong in that
product's repository.

It has the same structure as `event-taxonomy/` — **conventions + templates + a check
script.**

## Why conventions are needed

Translation is not a matter of swapping strings; it is **a matter of changing layout and
grammar**. Three things actually break.

1. **Length changes.** German is longer than English; Korean and Chinese are shorter
2. **Plural rules differ by language.** Korean has one form, English two, Arabic six
3. **Body text size conventions differ.** This is a fact confirmed by this repository's
   corpus

## Locale identifiers — BCP 47

```
ko-KR          language-region
zh-Hans-CN     language-script-region  (Simplified)
zh-Hant-TW     language-script-region  (Traditional)
en             language alone, where no regional distinction is needed
```

**Chinese must always carry the script subtag.** `zh-CN` and `zh-TW` make the script an
inference from the region, which cannot handle cases such as Hong Kong Traditional
(`zh-Hant-HK`).

**Do not invent codes.** `kr` (does not exist; Korean is `ko`) · `cn` (does not exist;
Chinese is `zh`) · `en_US` (BCP 47 uses a hyphen) are the common mistakes.

## Key naming

```
<screen>.<element>.<purpose>

home.cta.primary
settings.notification.toggle_label
checkout.error.card_declined
```

- **Lower-case snake_case, dot-separated**
- **Narrow from screen → element → purpose**
- **Do not use the translated text as the key.** With `"결제하기": "Pay"` the key breaks
  every time the original changes, and the same word in different contexts cannot be told
  apart

This is the same principle as `{domain}_{action}` in `event-taxonomy/` — **put the
structure in the name.**

### Split the key when the same word has different contexts

```
common.action.close        Close (the action)
common.state.closed        Closed (the state)
```

In English both are close to "Close", but they become different words in Korean and German.
**Reusing one key in several places leaves the translator without the context.**

## Plurals — ICU MessageFormat

Do not concatenate strings; use **ICU MessageFormat**.

```
{count, plural,
  one {# item}
  other {# items}}
```

### Plural categories by language (CLDR)

| Language | Categories | Count |
|----------|------------|:---:|
| Korean · Japanese · Chinese · Vietnamese · Thai | `other` | **1** |
| English · German · Dutch · Spanish · Italian | `one` · `other` | 2 |
| French · Portuguese (BR) | `one` · `many` · `other` | 3 |
| Russian · Ukrainian · Polish | `one` · `few` · `many` · `other` | 4 |
| Arabic · Welsh | `zero` · `one` · `two` · `few` · `many` · `other` | **6** |

**Korean has no plural.** `other` alone suffices.
Conversely **Arabic needs all six filled in**, and if even one is missing the sentence
breaks at that quantity.

**Never do this:**

```
❌ count === 1 ? '1 item' : `${count} items`        // hard-coding the English rule
❌ `${count}` + t('items')                          // concatenating strings
✅ {count, plural, other {# items}}                 // ICU
```

Concatenation always breaks in a language with a different word order.

### Gender and select

```
{gender, select,
  male {he}
  female {she}
  other {they}}
```

**Always** include `other`. It is the fallback when the value is unexpected.

### Numbers, dates and currency

Do not bake the format into the string; use ICU arguments.

```
{value, number}              1,234  /  1.234  (separators by locale)
{ratio, number, percent}     12%
{when, date, medium}
{price, number, ::currency/KRW}
```

**Thousands separators and decimal points differ by locale.**
German writes `1.234,56`, English `1,234.56`. Formatting by hand gets it wrong.

## Text expansion — the length budget

How translated length changes relative to English. These are **rules of thumb in common
industry use**, not exact figures.

| English source length | Allowance |
|:---:|:---:|
| 1–10 chars | **200–300%** |
| 11–20 chars | 180% |
| 21–30 chars | 160% |
| 31–50 chars | 140% |
| 51+ chars | 130% |

**Short strings expand the most.** Button labels are the risk — "OK" (2 characters) can
become several times as long in German.

| Direction | Languages |
|-----------|-----------|
| expands a lot | German · Finnish · Russian · Polish |
| about the same | French · Spanish |
| **contracts** | **Korean · Chinese · Japanese** (50–70% of English) |

### Design rules

- **Do not give buttons and tab labels a fixed width.** Use a minimum width plus automatic
  expansion
- **CJK being short is a problem too.** Put German into a layout laid out around Korean and
  it overflows. **Design against the longest language**, or allow wrapping
- **Do not rely on ellipsis (`…`).** It truncates the essential information

## Body text size — a fact confirmed by the corpus

Values measured under `design-systems/`.

| System | Body default | Script environment |
|--------|:---:|--------------------|
| Ant Design | **14px** | Greater China |
| Material 3 (Body Medium) | 14px | cross-platform |
| Helios | 13–14px | — |
| Canvas · Paste · Codex | 16px | Western web |
| Apple iOS (Body) | **17pt** | — |

**16px is a Western web convention, not a universal.**
14px is common in CJK, where glyph density is high.

**When going multilingual this difference affects the whole layout.** Drop a Western 16px
value straight into a screen laid out around 14px and the line count changes.

Letter spacing splits too — it is written up in
`design-systems/patterns/typography.md`. **Apple and Material 3 go in opposite directions
on tracking**, so a single value cannot be unified across platforms.

## RTL — right to left

Arabic · Hebrew · Persian · Urdu.

### What flips

- Text alignment and reading order
- Layout direction (sidebar position, icon and label order)
- **Directional icons** — back/forward arrows, progress indicators
- Start and end spacing (`margin-left` → `margin-inline-start`)

### What does not flip

- **Clocks and playback controls** — the play button always points right
- **Numbers and phone numbers** — left to right even inside an Arabic sentence
- Logos and brand assets
- Maps and charts that represent a real direction

### Implementation

```css
/* ❌ */  margin-left: 16px;   padding-right: 8px;
/* ✅ */  margin-inline-start: 16px;   padding-inline-end: 8px;
```

**Logical properties handle RTL automatically.**
Use `left`/`right` and you have to maintain per-locale overrides separately.

## What is not translated

Keep a `doNotTranslate` list in a file.

- Brand and product names
- Code, identifiers, URLs
- Unit symbols (`px`, `MB`) — though **date, currency and number formats do change by
  locale**
- The placeholders themselves (`{count}` · `{userName}`)

## File format

**JSON plus ICU MessageFormat** is recommended.

```
i18n/
  ko-KR.json
  en-US.json
  ja-JP.json
```

```json
{
  "home.cta.primary": "Get started",
  "home.item_count": "{count, plural, one {# item} other {# items}}",
  "checkout.error.card_declined": "Your card was declined."
}
```

Use **flat, dot-separated keys**. Nested objects are awkward for tooling and for diffs.

Example files:

| File | Purpose |
|------|---------|
| `template.json` | an empty template |
| `en-US.json` · `ko-KR.json` | worked examples (the same key set) |
| `kr.json` | **a deliberately non-conforming example** — for checking the linter |

The violations planted in `kr.json`: a wrong locale code (`kr`), an upper-case key
(`Home.CTA`), a Korean-language key (`닫기`), a `one` category Korean does not need, and an
unclosed brace.

### Put metadata in a separate file if you need it

Context notes for translators should be kept apart from the string files rather than mixed
into them.

```json
{
  "common.action.close": {
    "context": "Button label. The action (close), not the state (closed)",
    "maxLength": 6
  }
}
```

## The check script

`lint.mjs` — checks for convention violations and missing translations. No dependencies,
Node 18+ / Bun.

```bash
node lint.mjs ko-KR.json                        # a single file
node lint.mjs ko-KR.json --against en-US.json   # compared against a reference
node lint.mjs *.json --strict                   # for CI
```

**Pass the English file to `--against`.** The length budget table is stated relative to
English source text — take Korean as the reference and, since Korean is short to begin with,
every other language always trips the limit. The script warns when the reference is not
English.

What it checks:

- **Key naming** — lower-case snake_case, dot-separated
- **Locale codes** — is the filename BCP 47 (detects `kr` · `cn` · `en_US`)
- **ICU syntax** — balanced braces, `other` present in `plural`/`select`
- **Plural categories** — are all the categories that locale requires present
  (Korean needs only `other`, Arabic six)
- **Placeholder agreement** — is the `{...}` set the same as the reference file's
- **Traces of string concatenation** — `" + "`, hard-coded plural branches
- **Length budget** — is the expansion against the reference in the danger zone
- **Missing translations** — keys present in the reference and absent in the target
- **Untranslated leftovers** — keys whose value is identical to the reference (copied only)

With `--strict` it exits non-zero on a violation, so it can be wired into CI.

## Out of scope

**A specific product's translation strings do not live in this repository.**
What stays here is the conventions, the templates and the check script.

The translation pipeline (TMS integration, machine-translation pre-processing) is out of
scope too — if it becomes necessary it will be split out as its own module.
