<!-- lang-links -->
> **English** · [한국어](event-taxonomy-selfcheck.ko.md)
<!-- /lang-links -->

# Self-check — `event-instrumentation.md` × `event-taxonomy/` (2026-08-18)

> **This is the first record of applying the `agents/event-instrumentation.md` procedure.**
> Unlike `design-review.md`, this guidance was unverified on the grounds that "there is no
> target product" (`TODO.md`, section D). In place of a target product, the procedure was run
> against **the corpus's own assets** (`event-taxonomy/`).
>
> **The converter output quoted below is Korean because that is what the tool printed at the
> time.** Since 2026-08-21 the CLI is English by default; these runs reproduce verbatim with
> `node convert.mjs … --lang=ko` (`tools/cli-i18n.mjs`).

## The limits of this record — read this first

**Because the target is the corpus's own assets rather than a product, the procedure's
mechanical consistency is verified while its product-context judgements are not.**

| verified | not verified |
|--------|---------------|
| whether the commands the guidance prescribes actually run | real event-design arguments (is this modal a view?) |
| whether the artefacts the guidance requires have a place in the tool and format | the domain judgement of how many categories to divide into |
| whether the convention document and the linter implementation agree | whether the measurement purpose is sound as a business matter |
| whether the linter actually catches convention violations | the Figma `get_metadata` route (there is no target file) |

Steps 1–2 (the screen inventory and deriving the categories) **could not be run for lack of
input** — the corpus has no screen source (`mockups/` are device mock-up documents, not
screens).
Steps 3–6 were applied by **treating `example.csv` as a submitted draft.**

## Conditions of the run

| item | value |
|------|-----|
| target | `event-taxonomy/` — `example.csv` · `template.csv` · `convert.mjs` · `README.md` |
| working directory | the repository root |
| runtime | `node v22.15.0` |
| probe files | created in the scratchpad (not committed to the repository — shared discipline 3) |

---

## Stage 1 — the results of running the procedure

### Step 6: `--lint-only` (the verification command the guidance specifies)

```
$ node event-taxonomy/convert.mjs event-taxonomy/example.csv --lint-only
규약 위반 2건:
  - search_submit (검색) · has_filter: 필수도 아니고 조건도 없습니다 — 언제 붙는지 알 수 없습니다
  - checkout_click (장바구니 > 결제) · payment_method: enum 값이 미확정입니다 (…)
exit=1
```

```
$ node event-taxonomy/convert.mjs event-taxonomy/template.csv --lint-only
위반 없음.
exit=0
```

**The corpus's own worked example does not pass the corpus's own linter.** Section 6 of the
guidance requires "a CSV that passes", so following the example as written cannot satisfy the
submission condition.

### Steps 3–5: the convention-compliance verdict (`example.csv`)

| step | requirement | verdict |
|------|------|------|
| §3 categories × `{_view, _click}` | start with two | onboarding ✓ · checkout ✓ · **search ✗** (`search_view` + `search_submit`, with no `_click`) |
| §3 record the reason for an exception in the note | state the reason for an extra action | **✗** — the note on the three `search_submit` rows is `필수` · `필수` · (blank) |
| §2 three to six categories | 3–6 | ✓ 3 (the floor) |
| principle 3, no PII | no raw names, emails or locations | **✓ zero violations** — `query_length` (a number) avoiding the raw search term is a model of derived-value handling |
| §5 state the condition on a conditional property | required | ✗ 1 (`has_filter`) |
| §5 leave `…` on an unsettled enum | keep it | ✓ 1 (`payment_method`) — **and yet the linter treats it as a violation** |
| principle 1, a measurement purpose per event | every event | **✗ 0/6** — there is no place for it in the sheet |
| principle 4, a "draft — needs review" marker | kept in the artefact | **✗** — zero occurrences in any conversion target |
| §4 a funnel section | a separate section when there is an ordered path | **✗** — onboarding is plainly a funnel (`welcome → permission → profile → complete` plus `step_index`), and the corpus has no funnel section |

### The converter's behaviour (what was confirmed working)

```
$ node event-taxonomy/convert.mjs event-taxonomy/example.csv --to md -o ex.md
ex.md — 이벤트 6개
```

- Grouping works — continuation rows for conditional properties are bundled into the event
  object
- Under `--strict` a violation correctly halts the conversion and exits 1
- In the Markdown table the pipes inside an enum are escaped as `\|` (`mdCell`)
- The Notion and TSV flattening works (blank cells filled from the value above, and `필수`
  correctly split into `TRUE`/`FALSE`)

---

## Stage 2 — defects in the procedure itself

### E1. Principle 4 and step 6 are mutually exclusive (the core finding)

Principle 4 says "leave `…` on an unsettled enum, per the convention", and step 6 says to
produce "a CSV that passes".
And yet the linter **reports `…` as a convention violation** (`convert.mjs:131-132`).
**No artefact satisfying both exists.**

`event-taxonomy/README.md` parts from itself within one document.

| location | sentence | meaning |
|------|------|------|
| "review items" | "is there a `…` marker where the enum values are undecided?" | it should be there |
| "the linter" | "does an undecided (`…`) marker remain?" | if it is there, it is flagged |
| `convert.mjs:132` | `enum 값이 미확정입니다 (…)` → pushed into `problems` | a violation |

`…` is **not a violation but a notice of remaining work.** The guidance should state that
character, and it should be taken out of the `--strict` gate.

### E2. Principle 1 (the measurement purpose) has nowhere to go

The guidance says to write it "in the note column or in a separate list". Both fail.

**Writing it in the note pollutes the condition column.** From a probe run:

```csv
온보딩,onboarding_view,온보딩 > [screen_name],온보딩 화면 진입,screen_name,"welcome | complete",필수 · 목적: 단계별 이탈 관측
```

```json
"required": true,
"condition": "필수 · 목적: 단계별 이탈 관측"
```

The `r.note.replace(/^필수$/, '')` at `convert.mjs:92` clears it **only when the note is
exactly `필수`.** Append a purpose and the `필수` remains in the condition column and is
printed to every target — md, html and Notion — as "condition: 필수 · 목적: …".

**Adding an eighth column gets it silently deleted.** `COLS` is fixed at seven
(`convert.mjs:19`), so the linter reports `위반 없음` and zero purpose strings survive into the
JSON output.

### E3. The "draft — needs review" marker disappears in conversion

There is no column in the CSV to hold the marker principle 4 requires, and neither
`toMarkdown` nor `toHtml` renders a draft state (zero occurrences in each output).
**Drafts circulate in a form indistinguishable from finished versions.**

### E4. Step 4's funnel section has nowhere to live

The guidance requires a funnel section in the notation
`sdk_view(scan_qr) → sdk_view(device_found)`, but neither the CSV columns nor the converter
has any notion of a funnel (zero occurrences of "퍼널" in the output).
Since the guidance says to keep it "separate from the sheet" this is not a formal
contradiction, but **the format of that separate document is defined nowhere, so an ad-hoc
judgement was required.**

### E5. The linter does not check three of the convention's required items

The seven review items of `README.md` were compared against the implementation.

| review item | implemented | evidence |
|-----------|------|------|
| the event name `{domain}_{action}` | ✓ | `convert.mjs:115` |
| the category matching the prefix | **△ weakened** | detected only when different domains are mixed in one category. **Identity is not checked** — `온보딩`/`onboarding` passes |
| not splitting events per screen | **✗ not implemented** | no checking code |
| a condition stated on conditional properties | ✓ | `convert.mjs:127` |
| `필수` marked on required properties | △ | merged into the item above |
| `…` on an undecided enum | **✗ inverted** | E1 |
| product-specific data mixed in | ✗ | not machine-checkable — a human judgement |
| (from the column table) the screen location is **required** | **✗ not implemented** | in a probe, a blank `화면 위치` passed as `위반 없음` |

**There is no reverse category check.** From a probe run:

```csv
온보딩,onboarding_view,온보딩,진입,screen_name,"welcome",필수
설정,onboarding_view,설정,진입,screen_name,"pref",필수
```
```
위반 없음.
exit=0
```

Exactly the shape the README pins down with "if the domains differ, separate the events" — two
categories sharing one event name — passes as-is.

### E6. Categories are silently lost (a converter bug)

When the same event name continues **in a different category with no screen location**, the
`isNew` condition in `normalize` (`convert.mjs:69-70`) becomes false and the row is merged
into the preceding event as a property. In a probe run the `설정` category's row became a
second `screen_name` property of `온보딩`/`onboarding_view` entirely, and the `카테고리` and
`트리거` values were blocked by the `&& !current.category` guard at `convert.mjs:82-84` and
**discarded. No warning, exit code 0.**

Since §3 tells you to push screens and buttons into enums, editing that leaves the screen
location blank is common — an easy place to step on in practice.

### E7. The Markdown table at line 90 is broken

```
| 뒤로가기·닫기 무시 | 퍼널 이탈 관측에 필요하면 `button_name: back | close`로 포함 |
```

Three cells in a two-column table. A pipe inside a code span still splits the table cell.
**`convert.mjs`'s own `mdCell()` (lines 143–144) escapes pipes for exactly this reason** —
the guidance document broke what its tool knows.

### E8. The exit-code contract is not in the guidance

`convert.mjs --lint-only` exits 1 on a violation even without `--strict`
(`convert.mjs:368`).
`i18n/lint.mjs`, by contrast, exits **0** without `--strict` even with 12 violations
(`lint.mjs:300`; see L2 in `i18n-selfcheck.md`). **The two tools' conventions are opposite and
neither guidance document records it.** If CI or an agent judges by exit code, one of them
passes silently.

---

## Items that ended with zero violations

Recorded so as not to manufacture problems.

- **PII properties (principle 3)** — all 11 properties in `example.csv` are non-PII.
  `query_length` using the length instead of the raw search term is a model of derived-value
  handling
- **`template.csv`** — passes the linter, and `--to json` works (`{"events": []}`)
- **Grouping and flattening** — conditional continuation rows → the event object → all five
  render targets work
- **The `--strict` gate** — a violation correctly halts the conversion and exits 1

## What could not be checked

- **The Figma route (§1)** — the procedure of enumerating frames with `get_metadata`. Not run,
  as the corpus has no Figma file. The state-variant → property-promotion rule is unverified
  too
- **Enum value normalisation (§3)** — the conversion "3-2. 기기 연결 완료 ✅" →
  `device_connected`. Not run for lack of input
- **Deriving the categories (§2)** — the judgement of drawing three to six from a navigation
  structure. There is no screen source
- **The coverage declaration and question list (§6)** — the format is not defined in the
  corpus, so there was nothing to produce

## An incidental finding — one minor tool defect

`toMarkdown`'s summary table header reads `| 카테고리 | 이벤트 | 프로퍼티 수 |` while the
second column's values are the **number of events** (`convert.mjs:154-156`). `이벤트 수` is
correct.
