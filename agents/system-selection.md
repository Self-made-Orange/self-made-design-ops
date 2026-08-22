<!-- lang-links -->
> **English** · [한국어](system-selection.ko.md)
<!-- /lang-links -->

# Choosing reference systems — picking the samples that fit your product

The procedure for deciding, **on corpus evidence, which public design systems to
treat as references** when starting a new product or feature. This is the front
door to the repository's original goal ("useful for building UI just by referring
to it"), and it was extracted into a procedure from behaviour that proved out in a
real consumer session (`case-studies/system-selection-calendar.md`).

## Principles

1. **Splitting per axis is the default, not adopting a single system.** When a
   product spans several coordinates (platform, viewing distance, language culture,
   domain) the best sample differs per coordinate. "Adopt this one system whole"
   only holds when the product sits at a single coordinate.
2. **A user's preference is the starting point, not the conclusion.** Given a
   directive like "Apple and Toss as the base", take that as the default camp and
   layer other samples in **only where an axis diverges**. Overturning a preference
   requires evidence — a sample count.
3. **Separate "systems" from "product grammar".** A competitor's screenshots are
   not a design system. What you take from them is not values but **grammar**
   (conventions like assigning colours per participant, or showing the current
   time), and it must be labelled that way.
4. **The licence gate decides how a sample may be adopted.** Check the `license`
   field in the frontmatter — if it is unverified, state explicitly that **only
   values and structure may be referenced, with no code ported**. Factual data
   (numbers) can be referenced regardless of licence.
5. **What you discard is also a decision.** Write down what you are *not* taking
   from a reference (say, dropping a fixed white background) along with why, or the
   next person will reopen it.

## Procedure

### 1. Locate the product — on the axes in `platforms.md`

| Axis | What to ask |
|------|-------------|
| Platform | web / mobile / desktop / spatial / automotive / wearable / tv — which? **If more than one, a per-axis split is settled.** |
| Viewing distance | 20cm (watch) to 3m (TV). If one app covers two distances, the references diverge by distance |
| Input | touch / pointer / remote / crown and bezel |
| Density premise | consumer, generous whitespace — or enterprise, dense |

### 2. Find samples for each coordinate

- Filter on the frontmatter in `data/systems.json` (platform · domain · org), then
  read only the matching `systems/*.md`
- State how many samples the coordinate has — **a statement of sample count** like
  "only two TV-family samples at 3m" is what makes the selection trustworthy
- Where a coordinate has zero samples, write that down (the unverified discipline —
  do not stand up a plausible substitute and present it as a sample)

### 3. The language and culture axis

For Korean, Japanese or Chinese products, layer that culture's samples onto the
typography axis. Body size and letter-spacing conventions differ by writing culture,
which is a corpus conclusion (`patterns/typography.md`) — skip this axis and you
will be wrong.

### 4. Domain-adjacent samples

Use the `domain` field to find samples in adjacent domains (commerce · health ·
transit · government …) and reinforce the **judgement guidance** (pattern
conventions) with them. Values usually come from the platform axis; conventions
usually come from the domain axis.

### 5. The licence gate

For each selected sample, settle how it may be adopted, as a table:

| Method | Condition |
|--------|-----------|
| Port the code | only when the licence is stated (MIT, Apache …) and compatible |
| Reference structure and values | possible even when the licence is unverified (numbers are factual data) |
| Reference the grammar | competitor products and screenshots — always this and only this |

### 6. Output — a research document in the product repository

`docs/research/design-systems.md` is the shape to aim for. It must contain:

- An **axis | reference | key evidence** table, with sample counts in the evidence
- For each reference, the **practical assets to take** (tokens, formulas,
  techniques) and what is **being discarded**
- Links to existing plan and work items (which task consumes which reference)
- Licence notes (including the "values only" marking for unverified samples)

The output is committed **to the product repository** — never to this one.

### 6-1. Freezing the selection into a `DESIGN.md` (optional)

If the product hands its visual identity to a coding agent, putting a **`DESIGN.md`**
(the agent-facing exchange format) alongside the research document makes the
application concrete.

```bash
node self-made-design-ops/design-systems/to-design-md.mjs --name "<product>" -o DESIGN.md
npx @google/design.md lint DESIGN.md      # checks contrast, broken references, section order
```

The scaffold comes from the corpus's implementation defaults, so **the actual work
is overwriting it with the values you decided to take from your chosen references**.
Format details and cautions (no slot for motion, the linter does not catch empty
colours) are in `design-systems/INTEROP.md`.

## Common misjudgements (do not do these)

| Misjudgement | The right handling |
|--------------|--------------------|
| "Adopt the single most famous one" | Split per axis, with sample counts as evidence |
| Citing competitor screenshots as if they were a system | Separate them out, labelled "product grammar" |
| Porting code from a sample whose licence is unverified | Restrict to referencing values and structure |
| A plausible substitute sample for a coordinate that has none | Write "no samples" and plan a real-world check |
| Overturning the user's preference with no basis | To overturn it, produce sample evidence |
| Selecting, with no point of application | Tie it to plan items in a table |
