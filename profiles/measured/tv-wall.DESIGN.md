---
version: alpha
name: tv-wall
description: >-
  A scaffold generated from the "implementation defaults" of the design-systems (self-made-design-ops)
  corpus (profile=tv, density=comfortable). The values are a starting
  point drawn from the sample distribution, not a norm.
colors:
  # Left empty — this corpus has no recommended palette.
  # Colour is a brand decision, and the axis on which the sample parts most (patterns/color.md).
  # Check when filling it in: contrast ratios (4.5:1 for text), how dark mode is handled, the on-* pairing rule.
  # primary: "#______"
  # surface: "#______"
  # on-surface: "#______"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "9999px"
typography:
  # Left empty — the corpus has no tv typography measurements (systems/tvos.md, "remaining checks").
  # Fill it in after verifying on a real panel at 3m. Do not lift web or mobile values as they are.
components:
  focusable:
    padding: "{spacing.xl}"
    rounded: "{rounded.md}"
  card:
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
---
<!-- lang-links -->
> **English** · [한국어](tv-wall.DESIGN.ko.md)
<!-- /lang-links -->

## Overview

The visual identity of tv-wall. This file is a scaffold generated from the **design-systems (self-made-design-ops)**
corpus, so it is finished only once the brand-specific decisions (colour, typeface, tone)
are filled in.

- Profile: **wall / TV (a 3m viewing distance)**
- The evidence and sample size behind each value are in the "implementation defaults" sections
  of the corpus's `patterns/*.md`.

## Colors

**Unsettled.** The corpus provides no recommended palette — colour is the axis on which the
sample parts most, and it is a brand decision. Check when filling it in:

- text contrast of **4.5:1** (WCAG AA). Charts and secondary elements at 3:1 or above
- the `on-*` pairing rule (define the foreground colour over each background alongside it)
- pick **one** way of handling dark mode — the sample has six, and mixing them within one
  screen is an internal inconsistency (`patterns/color.md`)

## Typography

**Unsettled — the corpus has no tv typography measurements** ("remaining checks" in
`systems/tvos.md` and `android-tv.md`). The tv specifications captured are the safe area,
the focus spacing and the enumerated widths, and nothing else.

**Do not lift a web or mobile scale into it.** The viewing distance goes from 30cm to 3m, a
factor of ten, and the corpus has no basis for that conversion. How to fill it in:

1. Put candidate sizes on a real panel and check legibility **at 3m**
2. Take the smallest size that passes as the body and build the scale upward
3. Record the settled values **together with the verification conditions** (panel size,
   resolution, distance) — without them it cannot be reproduced

## Layout

**The safe area — overscan insets** (measured on tvOS)

```
top / bottom 60pt   left / right 80pt
```

Overscan on older panels clips the edges. **It is asymmetric — wider left and right than top
and bottom.**

**A minimum of 60pt between focus targets** (tvOS) — on tv the specification is the *distance
between* targets rather than their *size*, as it is for touch. The purpose is to prevent
D-pad mis-selection.

**Width is decided by "how many fit on screen"** — Android TV enumerates by count, from one
844dp card to five at 124dp, and tvOS enumerates two columns at 860pt and three at 560pt.
The two platforms arrived at the same structure independently.

Start with the six spacing steps **4 · 8 · 12 · 16 · 24 · 32.**
In the sample 4, 8 and 16 are effectively required, and the absence of 12 is genuinely
inconvenient.

- Do not make 20 steps from the outset — it costs a judgement at every decision
- If you are reducing, **decide the minimum first**

## Shapes

Radii of **0 · 4 · 8 · 16** plus a circle (`full`). Add 12, 20 and 24 when the need arises.
If the brand tone is round, extend to 28 and 32.

## Components

| item | basis |
|---|---|
| focus feedback | **enlarge 1.1×** (the Android TV specification) |
| distance between focus targets | **a minimum of 60pt** (tvOS) |
| control height | **unverified** — the corpus has no tv measurement. Derive it once the typography is settled |

- **Focus is the only state indicator** — there is no hover. A weak focus style loses "where
  am I" on screen
- Consider that the screen is shared — Android TV is the only sample in the corpus to put
  **shared-screen privacy** in writing (`systems/android-tv.md`)

## Motion

> The DESIGN.md alpha spec **has no slot for motion tokens**. Under the spec's "preserve
> sections you do not understand" clause it is kept as a body section (`INTEROP.md`, section
> 5).

Start with **three duration steps** (the mode across 83 samples). Grow to five when needed.

```
100   a fast exit
150   entry (small elements) · the default transition
250   entry (large areas · modals · panels)
```

- **Make the exit shorter than the entry** — a 50ms difference is the convention in the sample
- **Keep a `0ms` token** — the accessibility mode needs somewhere to point
- If you break the multiple of 5, leave the reason in the value

## Evidence grades

Per the discipline of `profiles/README.md`, this states **where this file's values came
from.**
M = measured in the corpus · D = derived from measurements · A = the author's judgement ·
U = a deliberate blank.

| item | grade | source / what to do |
|------|:---:|------|
| the six spacing steps | **M** | `tokens/scales.md` — 4, 8 and 16 are effectively required in the sample |
| the five radius steps | **M** | `tokens/scales.md` — 0 · 4 · 8 · 16 plus a circle |
| the 60/80pt safe area | **M** | `systems/tvos.md` — overscan insets |
| 60pt focus spacing | **M** | `systems/tvos.md` — a specification for target *distance* |
| 1.1× focus enlargement | **M** | `systems/android-tv.md` |
| widths enumerated by count | **M** | `systems/android-tv.md` 844 → 124dp · `systems/tvos.md` two columns at 860pt |
| **all typography** | **U** | **the corpus has no tv measurement** — fill it in after verifying at 3m |
| **control height** | **U** | derive it once the typography is settled |
| **all colour** | **U** | **the corpus has no recommended palette** — a slot for the brand to settle |
| the font family | **U** | unspecified — a slot for the product to settle |

**There is no A (author's judgement) in this file.** The moment colour and tone are filled in
an A appears, so add a row to this table then and record **the intent** with it
(`profiles/README.md`, rule 1).

## Do's and Don'ts

- ✅ Use these values as **a starting point** and change them to your product's density
- ✅ Record the reason alongside any value you change — it prevents the same argument six
  months later
- ❌ Do not cite the numbers in this file as "the industry standard" —
  the corpus's conclusion is **"there is no universal value"**
- ❌ Do not hand this to an agent with the colours left empty — the generated result comes out
  generic
