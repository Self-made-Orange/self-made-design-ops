<!-- lang-links -->
> **English** · [한국어](event-instrumentation.ko.md)
<!-- /lang-links -->

# Proposing event sheets — deriving events from UX context

The procedure for **reading UX context (screens, paths, actions)** out of a Figma
file or a codebase and **proposing** an event sheet that fits the `event-taxonomy/`
conventions.

Prerequisite: read `event-taxonomy/README.md` first. This document does not repeat
those conventions; it covers only **how to read context and fill the sheet in**.

> **(2026-08-18 from the self-check)** This instruction was run against the corpus's own
> asset (`event-taxonomy/`); the result is
> `agents/case-studies/event-taxonomy-selfcheck.md`. Where it got stuck has been
> fixed in the items marked "(2026-08-18 from the self-check)" below.
> **Product-context judgement (screen inventory, deriving categories, normalising
> enums) had no subject and so remains unverified** — record it again the first time
> steps 1–2 are run against a real product.

## Principles

1. **Events come from questions.** Not "there is a button on this screen, so attach
   an event" but "what do we want to know" first. Attach **one line of measurement
   purpose** to every event you propose. An event you cannot write a purpose for
   does not get proposed.

   **The purpose goes in a separate list outside the CSV** (2026-08-18 from the self-check).
   An earlier version said "the notes column or a separate list", but **the notes
   column cannot be used**: `convert.mjs` strips that marking only when the note is
   exactly `필수` (a whole-string match, `convert.mjs:92`), so writing
   `필수 · purpose: …` leaves `필수` sitting in the condition column and printing to
   the md, html and Notion targets alike. **Adding an eighth column does not work
   either** — the column count is fixed at seven (`convert.mjs:19`), so the linter
   passes it and the converter silently drops it.

   ```
   Event purpose list (submit alongside the sheet)
   onboarding_view  — pinpoint the step where people drop out
   checkout_click   — payment-method distribution and coupon usage rate
   ```
2. **Do not invent business meaning.** Anything unreadable from the screen
   (conversion goals, headline metrics, plan tiers) goes to the user as a **question
   list**.
3. **Never propose PII as a property.** Names, emails, phone numbers, precise
   locations and raw health figures are forbidden. Where one is needed, propose a
   derived value instead (a bucket, a boolean).
4. **It is only a proposal.** Leave `…` on undecided enums, as the conventions say.

   **The "draft — needs review" marking goes on the delivery document, not the CSV**
   (2026-08-18 from the self-check). The CSV has no draft column and the md and html
   renderers in `convert.mjs` do not print draft status, so writing it inside the
   sheet means it disappears on conversion. **Put it at the top of the delivery
   document** that carries the purpose list, the question list and the coverage
   statement (the output bundle in §6).

## Procedure

### 1. Screen inventory

**From Figma:** enumerate pages and top-level frames with `get_metadata`. Frame
names are the screen candidates, but do not take them at face value — state variants
of one screen (error / empty / loading) are usually drawn as separate frames.
**A state variant is not a screen; it is a property candidate**
(`state: error | empty | loading`).

**From code:** the route definitions (router config, a file-based routing directory)
are the screen list. Modals and bottom sheets are **view candidates even without a
route, if the user perceives them as an entry** (the test being that they cover the
screen and are dwelt in). Tooltips and toasts are not views.

### 2. Derive categories (three to six)

Group the screen inventory into functional areas. The navigation structure (tab bar,
sidebar items) is the first candidate. The basis is **the domain, not the screen
count** — this is where the conventions' "do not create an event per screen"
principle gets decided.

### 3. The event skeleton — category × {`_view`, `_click`}

Start each category with those two, and put screens and buttons in as `screen_name` /
`button_name` enums.

- **Normalising enum values:** do not carry a Figma frame name like
  "3-2. 기기 연결 완료 ✅" through as-is → `device_connected`. Lower-case snake_case,
  numbering, emoji and particles removed, matching the route name where code exists.
- Add an event beyond `_view`/`_click` only for actions those cannot express (result
  events like submit, complete, cancel), and write down why you added it. **That
  reason also goes in the purpose list rather than the notes column**
  (2026-08-18 from the self-check — the same reason as principle 1). `search_submit` in
  `example.csv` was added with no reason given and **the linter does not catch it.**
  Do not treat the example as evidence.

### 4. State the funnels

Identify **ordered paths** — onboarding, checkout, the core task — from the screen
flow (Figma prototype links, navigation calls in code), and give them a funnel
section separate from the sheet:

```
Signup funnel: sdk_view(scan_qr) → sdk_view(device_found) → sdk_view(analyzing) → sdk_view(done)
Drop-off: measured by comparing view counts per step (no separate event needed)
```

**Funnel steps are expressed as the ordered enum values of one event** — funnel
analysis is the whole point of the convention, so do not propose splitting steps into
separate events.

**The funnel section lives in the delivery document** (2026-08-18 from the self-check).
Neither the CSV columns nor `convert.mjs` has a concept of a funnel, so there is
nowhere in the sheet to write it — put the code block above into the delivery
document verbatim. **An ordered path with no funnel section is an omission**
(onboarding in `example.csv` is plainly a funnel —
`welcome → permission → profile → complete` plus `step_index` — and has no funnel
section).

### 5. Properties and conditions

- Take the **branching states** inside a screen (new/returning, success/failure,
  counts) as property candidates.
- For a conditional property, the condition column must say **when it is attached**.
- Where the screen does not reveal the full value list, mark it undecided as
  `value1 | value2 | …`.

### 6. Verify, then hand over

```bash
node event-taxonomy/convert.mjs draft.csv --lint-only
```

**The exit-code contract** (2026-08-18 from the self-check) — `--lint-only` exits **1** on
any violation even without `--strict` (`convert.mjs:368`). `i18n/lint.mjs` does the
opposite, exiting 0 on violations unless `--strict` is passed, so **know that the two
tools follow different conventions before putting them in the same CI script**
(`agents/localization.md` §5).

**A violation that is only a `…` counts as a pass** (2026-08-18 from the self-check).
Principle 4 says to leave `…` on undecided enums and the linter counts exactly that
as a violation — **no sheet can satisfy both at once.** A `…` is not a violation but
**a reminder of remaining work**. How to handle it:

- Raise `…` items **on the question list** and leave them in the sheet
- What to confirm before handing over is **whether there are zero violations other
  than `…`**
- If you put `--strict` in CI, tell the team that `…` will block the gate, or hold
  off on `--strict` until the values are settled
- The corpus's own `example.csv` reports two violations for this reason — **the
  example is not a passing standard**

**Check by eye what the linter does not catch** (2026-08-18 from the self-check). These
review items from the conventions are not implemented.

| Convention item | Linter | What a person must check |
|-----------------|:------:|--------------------------|
| Screen location (**required** in the column table) | ✗ | passes while blank |
| Events not split per screen | ✗ | compare against the §3 principle yourself |
| Category ↔ prefix **agreement** | △ | only catches a different domain mixed into one category. `온보딩`/`onboarding` passes despite differing notation, and **two categories sharing one event name passes too** |
| Product-specific data mixed in | ✗ | shared discipline 3 |

**Do not use the same event name in different categories** — beyond violating the
convention, if a later row's screen location is blank, `normalize` merges it into the
preceding event and **discards its category and trigger without warning**
(`convert.mjs:69-84`). Check that the event count after conversion matches what you
expected.

Hand over the passing CSV plus the lists below **as one delivery bundle** ("draft —
needs review" at the top, principle 4):

- **Purpose list** — one line of measurement purpose per event (principle 1)
- **Funnel section** — the ordered paths (§4)
- **Question list** — what you could not judge (is this modal a view, is this metric
  needed…) plus the enums left undecided as `…`
- **Coverage statement** — which screens or areas you did not put in the sheet and
  why (the settings screen was out of scope, say). Nothing gets left out silently.

## Common misjudgements (do not do these)

| Misjudgement | The right handling |
|--------------|--------------------|
| A `_view` event per frame | Screens are a `screen_name` enum |
| Adding an error screen to `screen_name` | If it is a state of the same screen, use a `state` / `error_code` property |
| An event per button | `button_name` enum |
| Ignoring back and close | Include them as `button_name: back \| close` if funnel drop-off needs them |
| Adding a property "in case we need it later" | No measurement purpose, no proposal |
| Imagining screens that are not in Figma | Question list |
