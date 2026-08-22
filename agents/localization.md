<!-- lang-links -->
> **English** · [한국어](localization.ko.md)
<!-- /lang-links -->

# Localisation — read the context, then move it

The procedure for **reading strings and their context** out of code and Figma and
localising them to the `i18n/` conventions.

Prerequisite: read `i18n/README.md` first (BCP 47, key naming, ICU, length budgets,
RTL). This document does not repeat the conventions; it covers only **how to read
context and in what order to judge**.

> **(2026-08-18 from the self-check)** This instruction was run against the corpus's own
> asset (`i18n/`); the result is `agents/case-studies/i18n-selfcheck.md`. Where it
> got stuck has been fixed in the items marked "(2026-08-18 from the self-check)" below.
> **Product-context judgement (extracting strings, `maxLength` from measured
> layouts, the glossary sign-off loop, RTL code conversion) had no subject and so
> remains unverified** — record it again the first time step 1 is run against a real
> product.

## Principles

1. **Translation is layout and grammar work, not string replacement** (the opening
   of the i18n README). Do not swap the strings and stop — report the length, plural
   and direction risks with them.
2. **Machine-translated output is a proposal.** State in the deliverable that native
   review is assumed.
3. **Fix the terminology first.** Build the list of product nouns and feature names
   (a glossary) and the `doNotTranslate` list, and **get the user to confirm it**
   before starting the real translation. If terms move, everything has to be redone.

## Procedure

### 1. Extracting strings — where to look

**In code**, the places hard-coded strings hide (looking only at JSX text misses
half of them):

```
JSX/template text          placeholder= / label= / title=
aria-label / alt           error messages (throw, toast, validation)
empty and loading copy     confirm() and dialog bodies
hand-formatted dates       string concatenation (`${count}개`) — convert to ICU
```

**In Figma:** collect text nodes per screen, but look into state variants too so you
do not miss **strings that exist only in a component variant** (helper text in the
error state, say).

### 2. Key design — the context lives in the key

`<screen>.<element>.<purpose>` (the convention). Take the screen name from the route
or frame and **use the same normalisation as the event sheet's `screen_name`**, so
the two deliverables do not call one screen by two names
(`agents/event-instrumentation.md`).

**Split keys when the grammatical role differs even if the wording matches** —
`close` (an action) versus `closed` (a state) is the convention's own example.
Recording the **part of speech and role** (button action, state display, title,
sentence) for each string during extraction makes this judgement mechanical.

**Cross-screen strings go in `common.<element>.<purpose>`** (2026-08-18 from the self-check).
This was a dead end: there was no rule for when there is no actual screen to put in
the `<screen>` slot. Promote to `common` **only what has an identical grammatical
role across screens**, like the button label "닫기"; if the context differs at all,
keep them per screen (see the "common misjudgements" table). A key promoted to
`common` loses its screen information, so **context metadata is mandatory** for it (§3).

**Three segments is the convention and the linter passes anything from two**
(2026-08-18 from the self-check, `i18n/lint.mjs:134`). Cases where element and purpose
genuinely collapse into one do occur, like `checkout.total`, so two segments is not
automatically a violation — but **passing the linter is not evidence that the
three-segment convention was followed.** Check it yourself.

### 3. Build context metadata alongside

Metadata is what stops a translator — human or model — from mistranslating on the
strength of the source string alone:

```json
{
  "home.cta.primary": { "context": "button label, starts onboarding", "maxLength": 8 },
  "chart.legend.cycle": { "context": "chart legend, a noun", "doNotTranslate": ["Acme"] }
}
```

- `maxLength` comes from **measuring the layout** — measure the button width and tab
  label area in Figma and apply the length-budget table in the i18n README (short
  strings expand 200–300%).
- Put every button and tab label on the risk list — that is where things break most.

**The linter does not read the metadata** (2026-08-18 from the self-check).
`i18n/lint.mjs` has no metadata path, so a declared `maxLength` is never checked, and
the corpus has neither a template nor a real example. **Use the format above as-is,
and keep it as a single `meta.json` rather than `<locale>.meta.json`** — context does
not vary by locale, and a file caught by a `*.json` glob lint would have its name
read as a language code by the locale parser, producing false positives (§5).

**`doNotTranslate` belongs in a per-key array** (2026-08-18 from the self-check). The
"what not to translate" section of `i18n/README.md` reads as a file-level list, but
the translator needs to know which string a brand name sits in, so **attach it per
key.** If a product-wide list is also needed, put it at the top level of the metadata
file as a `_global` entry.

**Without metadata, some keys cannot be told apart from the reference file alone.**
In the corpus's `en-US.json`, `common.action.close` and `common.state.closed` are
**both `"Close"`** (a deliberate sample, as the README says). The linter does not
check for duplicate values within the reference file, so **only metadata prevents
that mistranslation.**

### 4. Judgements per language

- **Korean:** consistency of verb endings comes first. **Observe the tone**
  (해요체/합쇼체/nominal) in the existing strings and follow it; where there are no
  existing strings, ask the user — do not decide arbitrarily. Prefer restructuring
  the sentence to avoid variable insertion that takes a particle (을/를, 이/가), and
  where that is unavoidable, note it in the metadata `context` (the string JSON has
  no notes field — 2026-08-18 from the self-check).

  **There are three things to observe** (2026-08-18 from the self-check) — the politeness
  level, **sentence-final punctuation**, and set greetings. The corpus's own
  `ko-KR.json` has "{userName}님 안녕하세요" (해요체, no full stop) coexisting with
  "카드가 거절되었습니다." (합쇼체, full stop). **Exempt idioms like greetings and
  interjections from ending consistency** (the idiomatic form is the natural one).
  Instead, **make sentence-final punctuation consistent per sentence type and record
  that decision in the risk report** — the linter has no tone or punctuation check,
  so anything missed here is missed by everyone.
- **CJK ↔ Western languages:** length differs in both directions (Korean runs 50–70%
  of English; German goes the other way). Report as a risk **whether the layout was
  built against a single reference language**.

  **The linter does not measure the shrinking direction** (2026-08-18 from the self-check).
  The length budget in `lint.mjs` checks **only the upper bound**
  (`expansionBudget` + `ratio > budget`), so Korean shrinking to 36% of English is
  zero violations — which is exactly what `home.cta.primary` (36%) and
  `common.action.close` (40%) do in the corpus's `ko-KR.json`. **Compute the
  shrinkage of button and tab labels by hand and put any key under 50% on the risk
  report** (that is where excess whitespace and broken alignment show up).

  Body text size conventions differ too — read the **"Default body size" section and the
  68-sample re-synthesis under it** in `design-systems/patterns/typography.md`
  (2026-08-18 from the self-check). **An earlier version summarised this as three groups,
  "14px CJK / 16px Western web / 17pt iOS"; the re-synthesis split into six camps and
  that three-way summary does not hold** — the 17px camp is Apple, KRDS (Korea) and
  the Digital Agency (Japan), **all three CJK contexts**, while the 16px camp
  contains Japanese samples like Charcoal (pixiv), Serendie (Mitsubishi Electric) and
  SmartHR. **Do not copy the numbers here; cite that document's re-synthesis
  section** (the same discipline as `agents/design-review.md`).
- **When RTL is in scope:** work appears outside the strings — check in the code
  whether directional icons and logical properties (`margin-inline-start`) are
  converted, and report it as its own section. What must not be mirrored (play
  buttons, numerals, logos) follows the RTL section of the i18n README. Corpus
  samples (2026-08-18 from the self-check — corrected after checking the files and lines):

  | Sample | What | Evidence |
  |--------|------|----------|
  | shadcn/ui | `--font-ar` / `--font-he` per-language typeface tokens (the only one in the corpus) | the "Family separation" table in `patterns/typography.md` |
  | Mantine | `border-end-end-radius` (button groups) · `inset-inline-start` transition (Switch) | the "Button groups" section of `patterns/button.md` · the "Switch" section of `patterns/form.md` |
  | Cloudscape | `border-width-alert-inline-*` — the token **name** is a logical property | the "Alert dimensions" section of `patterns/feedback.md` |

  **An earlier version's claim that "Radix Themes uses logical properties" was
  removed as unevidenced** — `systems/radix-themes.md` mentions neither logical
  properties nor RTL.
- **Plurals:** fill the CLDR category count for the target locale (the README table).
  Korean has one, `other`; Arabic has six. The linter catches empty categories.

### 5. Verify, then hand over

```bash
node i18n/lint.mjs i18n/ko-KR.json --against i18n/en-US.json --strict
```

**Both the paths and `--strict` are required** (2026-08-18 from the self-check). An earlier
version read `node i18n/lint.mjs ko-KR.json --against en-US.json`, where only the
script carried the prefix, so it fails with `ENOENT` from the repository root.
**Put the same prefix on the target and reference files, or run from `i18n/`.**

**Without `--strict` it exits 0 even with violations** (`lint.mjs:300`).
`event-taxonomy/convert.mjs --lint-only` does the opposite, exiting 1 without
`--strict` (`agents/event-instrumentation.md` §6), so **know that the two tools
follow different conventions before putting them in the same script.** If you judge
a pass by exit code, `--strict` is mandatory.

**Do not omit `--against`.** The README's CI example
(`node lint.mjs *.json --strict`) has no reference comparison, so **missing
translations, placeholder agreement, length budgets and leftover untranslated text —
four checks — drop out wholesale.** The `*.json` glob also picks up `template.json`,
whose name the locale parser reads as a language code, producing false positives —
**pass the locale files explicitly.**

The reference (`--against`) is **the English file** (the length budget is relative to
English — README). If the reference is not English the script warns, and false
positives really do occur.

**Check by hand what the linter does not catch** (2026-08-18 from the self-check).

| Axis | Linter | What a person must check |
|------|:------:|--------------------------|
| Length **shrinkage** (CJK) | ✗ | upper bound only — §4 |
| Tone, endings, sentence-final punctuation | ✗ | §4 |
| Three key segments | △ | passes from two — §2 |
| Duplicate values within the reference file | ✗ | resolved with context metadata — §3 |
| `maxLength` compliance | ✗ | the metadata is never read — §3 |
| RTL code conversion | ✗ | work outside the strings — §4 |

What the deliverable consists of:

- JSON per locale (flat keys + ICU)
- The context metadata file (`meta.json`)
- **A risk report** — keys at risk of overflow, **label keys under 50% shrinkage**,
  keys with particle insertion, remaining RTL work, and the basis for the tone and
  punctuation decisions (observed, or answered by the user)
- **A question list** — unsettled glossary entries, tone, and regional formatting
  policy (currency, units)

## Common misjudgements (do not do these)

| Misjudgement | The right handling |
|--------------|--------------------|
| Using the translated text as the key | A structural key (`home.cta.primary`) |
| Hard-coding `count === 1 ?` | ICU plural |
| Reusing one key across several screens | Split it when the context differs |
| Formatting dates and currency into the string | ICU arguments (`{when, date, medium}`) |
| Different endings per string | Observe the existing tone → unify; ask when there is none |
| `kr` / `cn` locale codes | BCP 47 (`ko`, `zh-Hans`) — the linter catches these, but do not create them either |
| Adding politeness or explanation absent from the source | Preserve the source's information content; put suggestions in the notes |
