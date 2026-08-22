<!-- lang-links -->
> **English** · [한국어](i18n-selfcheck.ko.md)
<!-- /lang-links -->

# Self-check — `localization.md` × `i18n/` (2026-08-18)

> **This is the first record of applying the `agents/localization.md` procedure.**
> Unlike `design-review.md`, this guidance was unverified on the grounds that "there is no
> target product" (`TODO.md`, section D). In place of a target product, the procedure was run
> against **the corpus's own assets** (`i18n/`).
>
> **The linter output quoted below is Korean because that is what the tool printed at the
> time.** Since 2026-08-21 the CLI is English by default; these runs reproduce verbatim with
> `node lint.mjs … --lang=ko` (`tools/cli-i18n.mjs`).

## The limits of this record — read this first

**Because the target is the corpus's own assets rather than a product, the procedure's
mechanical consistency is verified while its product-context judgements are not.**

| verified | not verified |
|--------|---------------|
| whether the commands the guidance prescribes actually run | the quality and naturalness of the translations (the native-review axis) |
| whether the artefacts the guidance requires have a place in the tool and format | the process of settling a glossary (the user-confirmation loop) |
| whether the convention document and the linter implementation agree | computing `maxLength` from measured layouts |
| whether the linter actually catches convention violations | collecting Figma text nodes (there is no target file) |
| whether the corpus evidence cited actually exists | an actual RTL implementation switch (there is no target code) |

Step 1 (string extraction) **could not be run for lack of input** — the corpus has neither
product code nor a Figma file. Steps 2–5 were applied by treating `ko-KR.json`, `en-US.json`
and `kr.json` **as submitted artefacts.**

## Conditions of the run

| item | value |
|------|-----|
| target | `i18n/` — `ko-KR.json` (7 keys) · `en-US.json` (7) · `kr.json` (5, a deliberately violating fixture) · `template.json` (0) · `lint.mjs` · `README.md` |
| working directory | the `i18n/` directory (the guidance's root-relative command fails — see L1) |
| runtime | `node v22.15.0` |
| probe files | created in the scratchpad (not committed to the repository — shared discipline 3) |

---

## Stage 1 — the results of running the procedure

### Step 5: the verification command the guidance specifies (verbatim)

```
$ node i18n/lint.mjs ko-KR.json --against en-US.json      # at the repository root
기준 파일을 읽을 수 없습니다: ENOENT: no such file or directory, open 'en-US.json'
exit=1
```

**The guidance's command does not run.** The `i18n/` prefix was attached to the script path
and not to the data path. Run inside `i18n/`, it passes.

```
$ node lint.mjs ko-KR.json --against en-US.json           # inside i18n/
✓ ko-KR — 키 7개 · 위반 없음

기준: en-US.json

총 위반 0건
exit=0
```

**`ko-KR.json` has zero violations. That is the conclusion.**

### The deliberately violating fixture — `kr.json`

```
$ node lint.mjs kr.json --against en-US.json
✗ kr — 키 5개 · 위반 12건
    (파일명)      → "kr"은 언어 코드가 아닙니다 — "ko"를 쓰세요
    home.item_count → ko에 불필요한 복수형 카테고리: one — ko는 other만 씁니다
    Home.CTA      → 키가 규약 형식이 아닙니다 — 소문자 스네이크케이스 + 점 구분
    닫기          → 키가 규약 형식이 아닙니다 / 키에 한글이 있습니다
    home.greeting → 플레이스홀더 누락: {userName}
    home.broken   → ICU 중괄호 오류: 열린 중괄호가 닫히지 않았습니다
    (외 번역 누락 5건)

총 위반 12건
exit=0
```

It **detects all five kinds of violation** the README says were planted. But it **exits 0** —
see L2.

### The README's CI example

```
$ node lint.mjs *.json --strict
✓ en-US — 키 7개 · 위반 없음
✓ ko-KR — 키 7개 · 위반 없음
✗ kr — 키 5개 · 위반 6건
✗ template — 키 0개 · 위반 1건
    (파일명)      → 언어 코드가 2~3자가 아닙니다: "template"

총 위반 7건
exit=1
```

**The corpus's own empty template breaks the corpus's own CI example** — see L7.

### Steps 2–4: the convention-compliance verdict (`ko-KR.json`)

| step | requirement | verdict |
|------|------|------|
| §2 keys as `<screen>.<element>.<purpose>` | three segments | **△** — `home.item_count` and `checkout.total` have two. The linter passes anything with two or more (L9) |
| §2 split keys when the grammatical role differs | `close`/`closed` | **✓** — `common.action.close` (닫기) and `common.state.closed` (마감됨) confirmed separate |
| §2 the same normalisation as `screen_name` | screen names matching the event sheet | **△** — `checkout.*` matches `checkout_view`/`checkout_click` in `event-taxonomy/example.csv`. But `common.*` is not a screen and is not in the guidance's schema (L8) |
| §3 a context metadata file | produced as a separate file | **✗** — zero actual files in the corpus (L3) |
| §4 unified Korean sentence endings | observe the tone, then unify | **△** — the noun forms (시작하기 · 닫기 · 마감됨) are unified. The sentences mix the 해요 register ("{userName}님 안녕하세요") with the 합쇼 register ("카드가 거절되었습니다."), and the full stops part too (L10) |
| §4 avoid inserting particles | prefer restructuring the sentence | **✓ zero violations** — `{userName}님` avoids a particle, and `{#}개 항목` has no particle after the variable |
| §4 CLDR plurals | ko has only `other` | **✓** — `home.item_count` uses `other` alone |
| §4 the CJK contraction risk | report it as a risk | **✗ not measured by the tool** — the linter reports zero, yet the measured contraction rate is outside the band (L4) |
| §5 `--against` takes the English file | required | **✓ behaviour confirmed** — below |
| ICU numbers and currency | do not bake the format into the string | **✓** — `{price, number, ::currency/KRW}` |

**Measured contraction** (the README's CJK band is 50–70% of English):

| key | en | ko | ratio |
|----|---:|---:|---:|
| `home.cta.primary` | 11 | 4 | **36%** |
| `common.action.close` | 5 | 2 | **40%** |
| `checkout.error.card_declined` | 23 | 12 | 52% |
| `common.state.closed` | 5 | 3 | 60% |
| `home.item_count` | 45 | 30 | 67% |
| `checkout.total` | 37 | 33 | 89% |
| `home.greeting` | 17 | 17 | 100% |

Two button labels fall below the band (36% and 40%). **The linter measures only the upper
bound, so it passes them with zero violations.**

### The non-English baseline warning (the usage §5 of the guidance forbids)

```
$ node lint.mjs en-US.json --against ko-KR.json
✗ en-US — 키 7개 · 위반 1건
    checkout.error.card_declined
      → 길이 예산 초과: 기준 12자 → 23자 (192%, 예산 180%)

기준: ko-KR.json
  ⚠ 길이 예산은 기준이 영어일 때 유효합니다 (현재 기준: ko).
    한국어·중국어를 기준으로 삼으면 원래 짧아서 항상 초과로 잡힙니다.
```

**The warning works exactly, and the false positive it predicts reproduces as described.** A
place where the guidance and the tool agree.

### The Arabic CLDR route (a probe)

With no RTL or multi-category locale file in the corpus, an `ar-SA.json` was created in the
scratchpad to check it.

```
✗ ar-SA — 키 7개 · 위반 1건
    home.item_count
      → ar 복수형 카테고리 누락: zero, two, few, many (필요: zero · one · two · few · many · other)
```

**§4's "Arabic has six — the linter catches empty categories" is confirmed true.**

---

## Stage 2 — defects in the procedure itself

### L1. §5's command does not run

```bash
node i18n/lint.mjs ko-KR.json --against en-US.json   # ENOENT
```

Only the script got the `i18n/` prefix; the data files did not. `i18n/README.md` is consistent
in running from inside the directory (`node lint.mjs …`) and has no problem, so
**the guidance fixed only half of it when transposing to root-relative paths.**
§6 of `event-instrumentation.md` avoided the same trap (its input is a user file, so no prefix
is needed).

### L2. Without `--strict` it exits 0 even with 12 violations

`lint.mjs:300` — `return strict && total ? 1 : 0`.
Neither §5 of the guidance nor the checking-script section of `i18n/README.md`
**ever shows an example using `--strict` and `--against` together.** The README's three
examples are `a single file`, `--against` and `*.json --strict`, and the last has no
`--against`, so **the checks for missing translations, placeholder agreement and the length
budget drop out entirely.**

**`event-taxonomy/convert.mjs --lint-only`, conversely, exits 1 even without `--strict`**
(`convert.mjs:368`). The two tools' exit-code conventions are opposite and neither guidance
document records it. If an agent or CI judges by exit code, the i18n side passes silently.

The combination actually needed in practice is this one, and it is written down nowhere.

```bash
node lint.mjs ko-KR.json --against en-US.json --strict
```

### L3. §3's context metadata has no template, no check and no actual file

The guidance says in §3 to create a metadata file and lists it among the §5 artefacts. And
yet

- there are **zero** metadata files in the corpus (`template.json` is a string template)
- `lint.mjs` has no path that reads metadata — a declared `maxLength` is not checked
- **`doNotTranslate` sits in a different place in the two documents.** §3 of the guidance has
  a per-key array (`"chart.legend.cycle": { "doNotTranslate": ["Acme"] }`), while the
  "what is not translated" section of `i18n/README.md` says "keep a `doNotTranslate` list in
  the file" (a file-level list)

This defect meshes with the following observation: in `en-US.json`, `common.action.close` and
`common.state.closed` are **both `"Close"`.** Since `i18n/README.md` states that "in English
both come out close to Close", it is **a deliberate sample** and not a defect.
But **the linter does not check for duplicate values within the baseline file**, and a
translator given only the English file has no means of telling the two keys apart — with no
actual metadata file, the mistranslation §3 was meant to prevent happens anyway.

### L4. The tool does not measure §4's CJK contraction risk at all

§4 of the guidance requires that "CJK ↔ Western languages: the lengths differ in both
directions … report as a risk whether the layout was set from a single reference language".
`expansionBudget` (`lint.mjs:44-50`) defines **only an upper bound**, and the check runs in
one direction only, `ratio > budget` (`lint.mjs:216`).

In measurement `home.cta.primary` at 36% and `common.action.close` at 40% fall below the
README's 50–70% band, and the linter reports zero violations. **That §5's risk report lists
only "keys at risk of overrunning" and has no contraction item is the same omission.**

### L5. §4's citation of typography.md is out of date after the 2026-08-18 re-synthesis

§4 of the guidance cites `design-systems/patterns/typography.md` summarised as
**"(14px CJK / 16px Western web / 17pt iOS)"**. That document's current state differs.

| the guidance's summary | what `patterns/typography.md` actually says |
|-------------|------------------------------|
| three classes | **"default body size — it parts into six camps"** (13 · 14 · 16 · 17 · 18 · 24) |
| 17pt = iOS | line 17: "**Apple iOS** (Body) · **KRDS** (body.medium) · **the Digital Agency** (Japan)" · lines 36–37: "**all three are CJK contexts**" |
| 16px = Western web | the 16px camp contains **Charcoal (pixiv) · Serendie (Mitsubishi Electric, expanded) · SmartHR (M)** — three Japanese samples |
| — | line 5: "type measurements down to the component layer are held for **68 systems** (re-synthesised 2026-08-18)" · lines 7–8: "**where the two disagree, the re-synthesis takes precedence**" |

The "body type size — facts confirmed in the corpus" table of `i18n/README.md` carries the
same three classes, so **the same staleness is in the convention document too** (recorded here
only, being outside this report's scope).

`agents/design-review.md` was revised for the same problem, adding "read that axis's sample
size from the top of each `patterns/*.md`" and "the re-synthesis takes precedence".
**That revision has not been carried into `localization.md`.**

### L6. The evidence for Radix Themes' logical properties is not in the corpus

§4's RTL section: "corpus samples: shadcn/ui keeps per-language typeface tokens
`--font-ar` and `--font-he`, and **Mantine and Radix Themes use logical properties.**"

| claim | confirmation |
|------|------|
| shadcn/ui's `--font-ar` and `--font-he` | **✓** `patterns/typography.md:464`, `:491-492` |
| Mantine's logical properties | **✓** `patterns/button.md:230` (`border-end-end-radius`) · `patterns/form.md:235` (the `inset-inline-start` transition) |
| **Radix Themes' logical properties** | **✗ no evidence** — `systems/radix-themes.md` has zero occurrences of `inline-start`, `inline-end`, "logical property" or `RTL`. Across the whole corpus, `Radix` and `inline` never appear on the same line |

Besides Mantine, the corpus's logical-property sample is **Cloudscape** (the "alert
dimensions" section, the `border-width-alert-inline-start` token at
`patterns/feedback.md:126-132`).
Not recording the evidence file is itself a violation of shared discipline 2 of
`agents/README.md` (the citation obligation: state the file and the section).

### L7. The corpus's empty template breaks the corpus's CI example

`parseLocale` (`lint.mjs:59-84`) reads the whole filename as a locale, so `template.json` is
caught with "the language code is not two or three characters". The README lists
`template.json` as "an empty template" while presenting `node lint.mjs *.json --strict` as its
CI example, so **following the convention makes CI red from day one.**

### L8. The `common.*` namespace is not in §2's schema

§2 gives `<screen>.<element>.<purpose>`, and the "common misjudgements" table says "reusing
one key across screens → split it when the context differs". And yet the corpus example's
`common.action.close` is **deliberately cross-screen** and the linter passes it. The guidance
has no rule for when a cross-screen namespace is permitted, so **an ad-hoc judgement was
required.**

### L9. The number of key segments is three by convention and two in the linter

`KEY_RE` (`lint.mjs:134`) passes **two or more** dot-separated segments.
`home.item_count` and `checkout.total` (two segments) get zero violations. The convention is
three (`<screen>.<element>.<purpose>`), and the documentation reaches no conclusion on whether
to enforce three or permit two.

### L10. §4's ending unification has no rule for fixed greetings or punctuation

"Observing" `ko-KR.json`'s tone as §4 directs gives this.

| value | form |
|----|------|
| 시작하기 · 닫기 · 마감됨 | noun forms |
| {userName}님 안녕하세요 | the 해요 register, **no** full stop |
| 카드가 거절되었습니다. | the 합쇼 register, **with** a full stop |

The two sentences part in register and punctuation. But "안녕하세요" is **a fixed greeting**,
so whether to treat it as subject to ending unification is a matter of judgement, and
**the guidance has no policy for fixed greetings, idioms or punctuation, so an ad-hoc
judgement was required.** The linter has no tone or punctuation check either (reasonably, by
design).

---

## Items that ended with zero violations

Recorded so as not to manufacture problems.

- **The `ko-KR.json` lint — zero violations.** Key naming, ICU syntax, plural categories,
  placeholder agreement, the length budget, missing translations and untranslated leftovers
  all pass
- **Particle insertion (§4)** — zero. Both `{userName}님` and `{#}개 항목` avoid a particle
  after the variable
- **The `close`/`closed` split (§2)** — the keys are split per the convention and are genuinely
  different words in Korean
- **ICU numbers and currency** — `::currency/KRW` is used, with zero formats baked into
  strings
- **The non-English baseline warning** — the behaviour and false positive the guidance predicts
  reproduce as described
- **The Arabic six-category CLDR check** — confirmed working in a probe

## What could not be checked

- **Step 1, string extraction** — there is no code or Figma target. The effectiveness of the
  list of "places strings hide", such as `aria-label`, toasts and `confirm()`, is unverified
- **§3's `maxLength` computation** — it presumes measured layouts, and there is no screen to
  measure
- **An actual RTL switch** — checking directional icons and logical-property code was not run
  for want of target code.
  The `ar-SA` probe verified **the plural route only**
- **The glossary and `doNotTranslate` user-confirmation loop (principle 3)** — cannot be
  verified with no interlocutor
- **The native-review premise (principle 2)** — an artefact-quality axis, not subject to
  machine verification
