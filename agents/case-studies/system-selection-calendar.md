<!-- lang-links -->
> **English** · [한국어](system-selection-calendar.ko.md)
<!-- /lang-links -->

# Field record — reference-system selection: a family calendar (phone + wall display)

- **Instruction covered**: `system-selection.md` — except that **this record came
  first.** A consumer session performed the work without an instruction; the good
  behaviour was observed, extracted into a procedure, and the instruction was created
  from it (2026-08-18).
- **Character**: **field verification (first from the consumer side)** — the first
  record of the intended usage, with this repository sitting as a sibling and the
  product repository's agent consulting it.
- **Subject**: a family calendar product (Flutter, covering a phone at 30cm and a
  wall-mounted display at 3m from one token source). Product data is kept to an
  anonymised summary, per the minimisation rule.

## What was done

The user's request: "take Apple and Toss as the base, but pick the few most
appropriate design systems from this corpus", plus screenshots of a competing
product (a wall calendar).

The shape of the agent's conclusion — **a split by distance rather than a single
adoption**:

| Axis | Reference | Kind of evidence |
|------|-----------|------------------|
| Phone | Apple HIG + Material 3 | user preference + agreement with the largest phone-base camp at 14px (17 samples — counted as 13 at the time of this record) |
| Wall, 3m | Android TV + tvOS | **on the corpus's distance axis, the only 3m samples are TV** |
| Korean typography | TDS + Seed | first and second in the 1px-step typography camp (Hangul glyph density) |
| Web CSS structure | shadcn/ui | two layers + the background/foreground pairing rule |
| Mood | the competing product | kept separate as **"product grammar, not a system"** |

## Compliant and exemplary behaviour (what became the procedure)

1. Selective reading of the corpus — six candidate files plus their
   implementation-defaults sections only (all 116 were not read)
2. Committed the output to the product repository's
   `docs/research/design-systems.md` — the no-product-data rule was respected
3. Cited sample counts — "the only 3m samples are TV", "the largest 14px camp, 13"
4. **Cleared the licence gate unprompted** — on seeing TDS's `license: 미확인`
   record, stated "reference values and structure only; do not take the code"
5. Extracted practical assets — spotted the 1:1 correspondence between TDS's eight
   spring presets and Flutter's `SpringDescription`, and connected Seed's APCA (Lc)
   to a scoring basis for verifying legibility at 3m
6. **Stated what was being discarded** — ruled out the competitor's fixed white
   background on the evidence of night-time use
7. Tied the points of application to existing plan items in a table

## Gaps exposed → action taken

| Gap | Action |
|-----|--------|
| No instruction existed for this kind of work (selection) — outside the three that did (review, events, L10n) | **Created `system-selection.md`** — turned the behaviour above into a procedure |
| Referred to the corpus total as "117" (apparently adding the 1 internal sample to the public 116) | Kept the sample-count discipline in the instruction — for the public/internal split, see the README snapshot |

## What remains unverified

- Reproducing the selection procedure on **other product types** (enterprise web, a
  single platform) — this sample's special condition, spanning several distances,
  may have worked in its favour
- Whether the selection actually carries through to implementation quality
  (follow-up: that product's implementation and review stages)
