<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# profiles/ — the build-spec layer

Where `design-systems/` is **descriptive** ("this is what everyone did"), this
layer is **normative** ("build it this way"). The output is the `DESIGN.md` format
agents read directly; the format itself is documented in
`design-systems/INTEROP.md`.

## Why the layers are separated

The corpus's core discipline is **no guessing, sources pinned**. A build spec, by
its nature, has to carry **decisions** — it must pick one option on axes where the
samples disagree, and fill in axes like colour where the samples hold no answer at
all.

Mixing those two characters in one file **contaminates the observations**. So the
layers are split, and **every value carries an evidence grade.**

## Evidence grades — four of them

| Grade | Meaning | Example |
|:---:|------|-----|
| **M** (measured) | a measured sample exists in the corpus | spacing 4·8·16 (61 samples) |
| **D** (derived) | derived or interpolated from measurements | a heading scale built from 16px body |
| **A** (authored) | **the author's judgement** — no sample backs it | brand colour, tone, curvature taste |
| **U** (unverified) | **a deliberate blank** — a slot still to be filled | tv typography (no measurement in the corpus) |

**Not hiding A and U is the whole point of this layer.** If a spec pretends
everything in it is evidenced, the corpus's credibility goes down with it.

## Two sub-layers

| | `measured/` | `interpreted/` |
|---|---|---|
| Character | **derived from the corpus** — mostly M and D, no A | **the author's reading** — mostly A |
| Axes | platform and density (web · touch · tv) | style and tone (mood) |
| Generation | regenerable with `design-systems/to-design-md.mjs` | written by hand |
| Colour | **left empty** (U) — the corpus has no recommended palette | **filled in** (A) — that is why it exists |
| Use | the skeleton | the flesh |

**Layering the two is the intended use** — take the structure from `measured/`,
then override colour and tone from `interpreted/` (or the product's own brand).

## `measured/` — four so far

| File | Profile | Key evidence |
|------|---------|--------------|
| `web-comfortable.DESIGN.md` | desktop web | 40px button (mode of 77 samples) · 16px body |
| `web-compact.DESIGN.md` | dense admin screens | 14px body (a camp of 17 samples) |
| `touch-mobile.DESIGN.md` | touch | 48px button (Material 48dp ∩ Apple 48pt) |
| `tv-wall.DESIGN.md` | wall / TV (3m) | 60/80pt overscan · 60pt focus gap · **typography is U** |

Regenerate:

```bash
node design-systems/to-design-md.mjs --profile tv --name "<product>" -o DESIGN.md
npx @google/design.md lint DESIGN.md     # all four: 0 errors, 0 warnings (2026-08-18)
```

## `interpreted/` — one so far

| File | What it is | Key authored values |
|------|------------|---------------------|
| `self-made-designops-site.DESIGN.md` | **this corpus's own site** | the whole palette (two themes) · Pretendard · the 248px rail · the CTA |

The site is the first thing this repository actually built, so it owes the artefact the
repository asks of everyone else. It sits here rather than in `measured/` for the reason the
table above gives: **its colour is filled in**, and most of its rows are A.

It is **generated, not written** — `site/design-spec.mjs` reads `docs/assets/site.css` and
emits the spec, so the two cannot drift. A hand-written spec beside a hand-written stylesheet
is two sources of truth, which is the failure this repository exists to catch. The generator
also **computes** every contrast ratio it prints, so the numbers in the document cannot
disagree with the colours in the document. If a declaration it expects is missing it fails
rather than emitting a plausible number.

```bash
node site/design-spec.mjs                # English primary
node site/design-spec.mjs --lang=ko      # Korean version
npx @google/design.md lint profiles/interpreted/self-made-designops-site.DESIGN.md
# 0 errors, 1 warning (2026-08-22)
```

**The one warning is the point, not a defect.** `contrast-ratio` fires on the CTA —
`#ffffff` on `#ff5926` is 3.13:1, under AA. It is a deliberate brand call by the owner, it is
written down as an A row in the spec, and the linter reaching the same conclusion
independently is the layer working: an authored value that costs something announces the cost
instead of hiding inside a palette.

`.github/workflows/site.yml` regenerates both language versions on every PR that touches
`site/`, `docs/` or `profiles/interpreted/`, and fails if the committed files differ.

**`tv-wall` shows this layer's character best** — safe areas and focus gaps are
measured (M) so they carry values, while typography is absent from the corpus (U)
and is therefore **left empty with only the verification procedure written in**.
It does not get patched over with a plausible-looking number.

## Rules

1. **An A value records intent instead of evidence.** If you cannot write down why
   this value, do not put it in the spec.
2. **A U is handed on empty.** Write the procedure for filling it — what to check,
   and how.
3. **Where an M or D value disagrees with the corpus, the corpus wins.** When the
   corpus is updated, `measured/` is due for regeneration.
4. **Product-specific values do not live here.** They go in that product's own
   `DESIGN.md` (no product data comes in).
5. **Pass the linter before committing** — `npx @google/design.md lint`. But
   **passing is not the same as finished**: the linter does not flag empty colours
   (`INTEROP.md`).
