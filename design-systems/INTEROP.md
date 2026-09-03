<!-- lang-links -->
> **English** · [한국어](INTEROP.ko.md)
<!-- /lang-links -->

# Interoperability — the DESIGN.md format ecosystem

**Surveyed 2026-08-18.** A record of the **agent-facing design-system exchange format**
(`DESIGN.md`) growing outside this corpus. It is **complementary** to this repository
rather than competing with it, and this document sets out how a consuming project uses
both together.

> **Note on how this was harvested.** The three sites (`designmd.app` · `getdesign.kr` ·
> `designmd.ai`) are **blocked by this environment's egress proxy** (`EGRESS_BLOCKED`).
> Everything below was read from the **npm builds** — no claim that exists only in a site's
> body text is included. Whether the sites and the npm packages are run by the same people
> is **unverified** (the package READMEs point at `designmd.ai` and `getdesign.md`, while
> the addresses the user supplied are `.app` and `.kr` — different domains).

## 1. `DESIGN.md` — the format specification (Google Labs)

- Source: `npm pack @google/design.md@0.4.0` → `dist/spec-config.yaml`
  (a file comment states it is the specification's single source of truth), repository
  `github.com/google-labs-code/design.md`, **Apache-2.0** headers
- Self-description: *"a format specification for describing visual identity to coding
  agents"*

### Structure — two layers

```
--- (YAML frontmatter)   machine-readable tokens = normative values
---
## Markdown body          human-readable rationale and how to apply it
```

A two-part structure in which **the tokens fix the values and the prose carries the
reasons**. It is **the same idea** as this repository's `systems/*.md` being frontmatter
plus body; the difference is purpose — ours is *a record of observations*, DESIGN.md is
*a build instruction*.

### The token schema (version: alpha)

| Key | Contents |
|-----|----------|
| `colors` | `<name>: <Color>` — any CSS colour string (hex · named · rgb · hsl · **oklch/oklab/lch/lab** · `color-mix()`), converted internally to sRGB for the WCAG contrast check |
| `typography` | `fontFamily · fontSize · fontWeight · lineHeight · letterSpacing · fontFeature · fontVariation` |
| `rounded` · `spacing` | `<step>: <Dimension>` — the units are **px, em and rem only** |
| `components` | eight sub-tokens per component: `backgroundColor · textColor · typography · rounded · padding · size · height · width` |

- **Token reference syntax `{colors.primary}`** — capped at 20 levels of nesting and 10 of
  reference
- **Recommended token names**: colours `primary/secondary/tertiary/neutral/surface/on-surface/error`,
  typography `headline-display/headline-lg/headline-md/body-lg/body-md/body-sm/label-*`,
  radius `none/sm/md/lg/xl/full`
- **Variants (hover, active) are expressed as separate component entries**
  (`button-primary-hover`)

### Section order (whatever is present, in this order)

`Overview` (alias Brand & Style) → `Colors` → `Typography` →
`Layout` (alias Layout & Spacing) → `Elevation & Depth` → `Shapes` →
`Components` → `Do's and Don'ts`

**Unknown sections are preserved and are not errors.** A **duplicate heading is** an error.

### What the linter catches (`npx @google/design.md lint`)

`broken-ref` · `contrast-ratio` (WCAG computed automatically) · `missing-primary` ·
`missing-sections` · `missing-typography` · `orphaned-tokens` · `section-order` ·
`unknown-key` · `levenshtein` (guessing typos) · `token-summary` · `token-like-ignored`.
JSON output with exit code 1/0. **A `diff` command reports token changes and prose
regressions between two versions.**

## 2. Two branches of distribution

| | `designmd` (CLI · MCP) | `getdesign` (CLI) |
|---|---|---|
| npm | `designmd@0.2.1` · `designmd-mcp@0.2.1` (MIT) | `getdesign@0.6.24` |
| Model | **a registry** — search, view, download and **upload**, tags and trending, API key required | **a template bundle** — **76 `templates/*.md` shipped inside the package**, no network needed |
| Self-description | a user-upload marketplace | the README states these are *"not official design systems but **inspiration files**"* |
| Distinctive | *"MCP eats tokens every conversation, while a CLI only costs when it actually runs"* — **context cost used as a selling point** | the release manifest records **`templateHash` (sha256) + `sourceCommit` + `sourceUpdatedAt`** |

The `getdesign` templates are named after brands (airbnb · apple · claude · bmw …) and the
files themselves use the same frontmatter as the specification above — that is, the
arrangement of **Google writing the spec and third parties distributing** is already in
place.

## 3. Relation to this repository — complements

| | The DESIGN.md ecosystem | **This repository** |
|---|---|---|
| Unit | one file, **one product's visual identity** | **observed samples of 116 systems** |
| Character of the values | normative (build it this way) | descriptive (this is what they all did) plus the sample count |
| Provenance | authored, or an interpretation of a brand | **source and version pinned**; unverified stays unverified |
| Colour | hands you a settled palette | **no recommended palette** — the position being that colour is a brand decision |
| When it is used | build instruction | **grounds for a decision and a review standard** |

**Using them together is the natural fit** — decide what to reference with this corpus
(`agents/system-selection.md`), then fix that conclusion into the product's `DESIGN.md` and
hand it to the agent.

## 4. Practical guidance

- **If a product has a `DESIGN.md`, run the linter first when reviewing** —
  `npx @google/design.md lint DESIGN.md`. Contrast ratios, broken references and orphaned
  tokens are caught by machine. The person (or agent) then concentrates on the judgement
  that follows (`agents/design-review.md`).
- **If you need a draft, one can be generated from this repository** —
  `node design-systems/to-design-md.mjs > DESIGN.md` exports the corpus's "implementation
  defaults" as a scaffold in the specification's format. **Colours are left empty**
  (keeping the position that the corpus has no recommended palette).
  **The output was validated with the official linter** (2026-08-18):
  `@google/design.md@0.4.0 lint` → **0 errors · 0 warnings**, with one info item (the token
  summary). Note that **an empty `colors` block was not caught** — the `missing-primary`
  rule is observed not to fire when the `colors` key itself is empty. In other words,
  **passing lint is not the same as being finished.** Whether the colours were filled in has
  to be checked by a person.
- **Version changes can be observed with `diff`** — the same job our `check-sources.mjs`
  does for drift in external systems, done inside a product.

## 5. Gaps observed in the specification (as of the 2026-08-18 alpha)

**There is no slot for motion tokens.** The token schema has no `motion`, `duration` or
`easing`, and neither does the section list — the `getdesign` templates write motion in prose
only. Our `to-design-md.mjs` appends a `## Motion` section on the strength of the spec's
"unknown sections are preserved" clause, and places it **in the body rather than the
frontmatter** (a placement that avoids violating the spec).

Other axes with no slot in the specification: density · platform branching · touch targets ·
z-index · breakpoints. A product that needs those axes is not covered by DESIGN.md alone, so
**the corpus documents have to be used alongside it.**

## 6. A second `design.md` — Vercel (surveyed 2026-09-03)

**The same filename carries a different contract.** Vercel publishes `vercel.com/design.md`
so that agents working outside its codebase can produce on-brand pages. It shares the name
with the Google Labs specification in §1 and **conforms to none of it**.

| | Google Labs `DESIGN.md` (§1) | **Vercel `design.md`** |
|---|---|---|
| Frontmatter | the token schema — `colors` · `typography` · `spacing` · `components` | **`name` + `description` only** — the frontmatter of an agent skill file |
| Where the values live | in the frontmatter, normative | **in a separate stylesheet**, `vercel.com/geist/vercel-brand.css` |
| What the body carries | the rationale behind the tokens | **judgement** — page composition, copywriting, anti-patterns |
| Numbers in the file | the point of the file | **almost none** — 369 lines, two percentages |
| Validation | `npx @google/design.md lint` | none published |
| Scope | one product's visual identity | **report websites only**, per its own `description` |

**The split is deliberate and the reason is stated.** The announcement says the stylesheet
loads in the browser at render time, which keeps its code out of the model's context
window. So the division is not prose-versus-tokens as a matter of taste — **it is a context
budget.** The prose an agent must reason about is fetched; the 108KB of values it only has
to name are not.

### What is in it

- **Four passes** — frame the reader's job → choose the composition → apply the visual
  system → inspect and revise privately.
- **A named list of anti-patterns.** Roughly eighteen recognisable generated-design
  defaults are called out to be rejected — decorative gradients and glows, centred hero copy
  above a card grid, cards nested inside cards, badges for ordinary metadata, dark rounded
  rectangles around charts, legends that replace direct labels, authoring-process
  narration. It then warns against over-correcting into a sterile anti-design template.
- **A published CSS API** — 133 `.vbg-` classes in three groups (shell and layout, type and
  evidence, calculators). Agents are instructed to use the exact child names and not to
  invent synonyms; the file gives `vbg-stat-note` for `vbg-stat-detail` as the example.
- **Accessibility stated as a target**: WCAG AA with no version, colour never load-bearing
  alone, source order as reading order.

### What it means for this corpus

- **`DESIGN.md` is not yet one format.** Two of the largest publishers of agent-facing
  design instructions chose the same filename for different jobs — one a linted token
  schema, one an agent skill. A consuming project cannot assume which it has been handed;
  **read the frontmatter before running any linter.** `npx @google/design.md lint` against
  Vercel's file would be checking a schema the file never claimed.
- **It is evidence for a gap already recorded in §5.** The Google Labs schema has no slot
  for composition, evidence layout, measure, or anti-patterns. Vercel needed all four and
  had to write prose outside the schema to get them. Our `to-design-md.mjs` appending a
  `## Motion` section is the same manoeuvre from a different direction.
- **The context-budget argument applies to our exports too.** `to-design-md.mjs` emits
  values inline. For a corpus of this size that is the right default, but Vercel's split is
  a working demonstration that **an agent-facing file and a value file need not be the same
  file.**
- The system itself is recorded at `systems/geist.md` (harvested 2026-09-03). The token
  values quoted above come from `vercel-brand.css`, which is scoped to brand report pages
  and **is not** Geist's full product token set.

## References

- `npm pack @google/design.md@0.4.0` — `dist/spec-config.yaml` · `dist/linter/linter/rules/`
- `npm pack designmd@0.2.1` · `designmd-mcp@0.2.1` — READMEs
- `npm pack getdesign@0.6.24` — README · `templates/` (76) · `releases/0.6.24.json`
- The three sites are blocked by the proxy (`EGRESS_BLOCKED`) — recheckable from a local
  session
- `vercel.com/design.md` · `vercel.com/geist/vercel-brand.css` · `vercel.com/geist/{introduction,colors,typography,grid}` — fetched 2026-09-03 from a local session
- https://vercel.com/blog/how-our-agents-build-on-brand-pages-with-design-md
