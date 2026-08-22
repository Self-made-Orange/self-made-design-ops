<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# agents/ — the agent working-instruction layer

Instructions for when **an agent (LLM) uses this repository as a working tool**.
Where the human-facing documents are things to read and understand, these are
**execution procedures**: do this, in this order.

| Document | What it does |
|----------|--------------|
| `system-selection.md` | Picks reference systems to fit the product's coordinates (platform, distance, language culture, domain) |
| `design-review.md` | Reviews a mockup or an implementation against corpus evidence and issues a report |
| `event-instrumentation.md` | Reads UX context out of Figma and code, and proposes an event sheet |
| `localization.md` | Reads strings and their context out of code and Figma, and localises them |
| `case-studies/` | Records of actually running the above — the evidence behind each revision |

## Case-study index

**To change an instruction, run it first and leave the record here.** Revised items
are marked `(<date> from the field test)` or `(<date> from the self-check)` so a revision can be
traced back to the record it came from.

| Record | Instruction | Subject | Character |
|--------|-------------|---------|-----------|
| `frr-dashboard-review.md` | `design-review.md` | a relocation-planner dashboard (external product, `74fab8e`) | **Field-verified** — product-context judgement was exercised too |
| `system-selection-calendar.md` | `system-selection.md` | a family calendar (phone + wall, external product) | **Field-verified (first from the consumer side)** — the instruction was reverse-extracted from this record |
| `event-taxonomy-selfcheck.md` | `event-instrumentation.md` | `event-taxonomy/` (the corpus's own asset) | **Self-check** — procedure and tooling consistency only. Product-context judgement unverified |
| `i18n-selfcheck.md` | `localization.md` | `i18n/` (the corpus's own asset) | **Self-check** — procedure and tooling consistency only. Product-context judgement unverified |

**Keep self-checks and field verification apart.** A self-check runs against the
corpus's own assets, so it only verifies that the commands actually run, that the
required outputs have somewhere to go, and that the conventions and the tooling
agree. **Product-context judgement — screen inventory, deriving categories,
extracting strings, measuring layouts — remains unverified**, and each record states
that scope in a table at the top.

## Using it from another project — connecting a consumer

The main way to use this repository is to **keep it beside another product project
and have that project's agent consult it**. To connect them:

### 1. Place the repository — either way

```bash
# Option A — sibling clone (simple, always current)
cd <parent-directory-of-the-product-project>
git clone https://github.com/keepYaoung/self-made-design-ops.git

# Option B — submodule (reproducible, pinned to a commit)
cd <product-project>
git submodule add https://github.com/keepYaoung/self-made-design-ops.git self-made-design-ops
```

- If currency of the values matters most, use **A plus a periodic `git pull`** (a
  freshness CI re-verifies the corpus monthly, so pulling keeps you level)
- If everyone on the team working from an identical baseline matters most, use
  **B pinned to a commit**, and update deliberately

### 2. Add a pointer to the product repository's CLAUDE.md (copy-paste)

**This is the crucial part** — without these lines the agent will not discover the
repository sitting next to it. In the product repository's `CLAUDE.md`:

```markdown
## Rules for design, event and localisation work

For choosing reference systems, deciding UI values (spacing, sizing, colour,
motion), design review, writing analytics event sheets, and internationalisation,
always read `../self-made-design-ops/agents/README.md` first and follow the
procedure there. (With a submodule: `./self-made-design-ops/agents/README.md`)

- Choosing reference systems (when starting a product or feature):
  `agents/system-selection.md` — split per axis rather than adopting one system,
  and clear the licence gate before porting any code.
- Deciding values: start from the "implementation defaults" section of
  `self-made-design-ops/design-systems/patterns/<component>.md`. Never cite an
  "industry standard" without evidence.
- Review: the three verdicts in `agents/design-review.md` (convergence deviation /
  accepted divergence / internal inconsistency).
- Event sheets: `agents/event-instrumentation.md` plus the `event-taxonomy/`
  conventions. Before submitting, run
  `node self-made-design-ops/event-taxonomy/convert.mjs <sheet> --lint-only`.
- Localisation: `agents/localization.md` plus the `i18n/` conventions. Before
  submitting, run
  `node self-made-design-ops/i18n/lint.mjs <file> --against en-US.json`.
- If this project has a `DESIGN.md`: read it before UI work, and after editing make
  `npx @google/design.md lint DESIGN.md` pass. If there is no draft, copy one that
  fits the platform from `self-made-design-ops/profiles/measured/`, or generate it
  with `node self-made-design-ops/design-systems/to-design-md.mjs`.
  **When you change a value, change that file's evidence-grade table too** (an A
  value records its intent).
- Outputs (sheets, translations, reports) are committed to this product repository.
  Never commit them to self-made-design-ops.
```

### 3. Saving context — do not read the whole thing

The corpus has 116 entries; reading it whole wastes context. Enter in this order:

1. The navigation map in this file (`agents/README.md`)
2. The one relevant instruction (`design-review.md`, etc.)
3. **Only the "implementation defaults" section** of the pattern document you need —
   the body only when you need the evidence
4. `systems/<name>.md` only when you need the detail of a specific system
5. `design-systems/data/*.json` when consuming from a script

### 4. The feedback loop — this usage *is* the field verification

When running this on a real project turns up a problem, the handling depends on what
kind of problem it is:

| What you found | Handling |
|----------------|----------|
| **The instruction is wrong** (a step is missing, the order is off, an output has nowhere to go) | Commit an **instruction revision** to self-made-design-ops plus a record in `agents/case-studies/`. Mark the revised item `(<date> from the field test)` — see the precedent in `frr-dashboard-review.md` (12 defects → 24 revisions) |
| **A corpus value looks wrong** (differs from measurement, version is stale) | Re-harvest via the `HARVESTING.md` procedure → if it really changed, add a **correction block** to that `systems/*.md` (the Mística and Pajamas precedents) |
| **A product-specific judgement** (this product decided to do it differently) | Leave self-made-design-ops alone and **record the decision in the product repository** — the corpus is a sample, not a law |

**Case studies carry product data anonymised and minimised** — only as much as the
procedure verification needs. Pulling in identifying information or real data
wholesale violates the no-product-data rule.

## Shared discipline — this outranks every instruction

1. **No assertion without evidence.** This repository's factual discipline
   (`design-systems/SCHEMA.md`) applies to agent output too — do not dress an
   unconfirmed value as fact with phrasing like "it appears to be", "probably" or
   "generally, systems do". Write what you could not confirm as **`unverified`**,
   and where it matters, hand the user **a list of questions**.
2. **Cite.** When you use the corpus as evidence, name the file and the section —
   "the core table in `tokens/scales.md`", "the height distribution in
   `patterns/button.md`". A claim you cannot cite comes out of the report.
3. **No product data comes in.** A specific product's event definitions, translated
   strings and mockups do not get committed here. Outputs go to that product's
   repository.
4. **Pass the checking scripts before handing over.** Event sheets through
   `event-taxonomy/convert.mjs --lint-only`, string files through
   `i18n/lint.mjs --against en-US.json`. Do not eyeball an output that has a linter.

## Corpus navigation — question type → file

`design-systems/` is a corpus of system samples. An agent should not read it whole;
enter by question type.

> **(2026-08-18 from the self-check)** An earlier version hard-coded "104 system samples",
> which the growing corpus had already made stale (the `systems` array in
> `design-systems/data/systems.json` holds 116). **Read the overall size from
> `design-systems/index.md`, and per-axis sample counts from the top of each
> `patterns/*.md`** — `design-review.md` was revised first for the same reason.

| What you want to know | File to open |
|-----------------------|--------------|
| Spacing scales, which values are standard | `design-systems/tokens/scales.md` |
| A component's dimensions, states and conventions | `design-systems/patterns/{button,form,modal,table,navigation,feedback,motion,typography,color}.md` |
| Everything about one system | `design-systems/systems/<name>.md` (frontmatter carries org, coverage, platform, verified, source) |
| Differences per platform (mobile, TV, watch, automotive) | `design-systems/platforms.md` |
| A confusing term (Liquid Glass, pill, the rem premise…) | `design-systems/GLOSSARY.md` |
| Machine-readable (consuming from a script) | `design-systems/data/systems.json` · `values.json` |
| How a value was harvested, and how to re-harvest it | `design-systems/HARVESTING.md` |
| Whether a value is still current | `design-systems/freshness.md` + `check-sources.mjs` |
| Handing it to a product's `DESIGN.md` (format, linter, export) | `design-systems/INTEROP.md` + `design-systems/to-design-md.mjs` |
| **A build spec ready to use** (web, touch, TV profiles) | `profiles/README.md` → `profiles/measured/*.DESIGN.md` |

**Every `patterns/` document ends with an implementation-defaults section.** When
you need a fast decision, that section alone is enough — the rest is the evidence
behind its conclusions.

## Rules for interpreting the corpus as evidence

- **Distinguish convergence from divergence.** Where most samples agree (spacing
  8 and 16, say) a deviation needs a reason; where the samples split (14 vs 16px
  body — a difference between writing cultures) neither side is a "violation". Do
  not declare one side of a divergent axis to be the standard.
- **State the sample count alongside.** "7 systems tokenise z-index (in 7 different
  ways)" and "57 of 61 samples include 8 and 16" carry different confidence.
- **`unverified` is data.** An agent does not fill in an axis the corpus recorded as
  unverified.
- **Look at the verified date.** If the frontmatter's `verified` is old, re-verify
  via the `freshness.md` procedure, or state the verification date in the report.
