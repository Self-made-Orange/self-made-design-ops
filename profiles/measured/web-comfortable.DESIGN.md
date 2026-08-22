---
version: alpha
name: web-comfortable
description: >-
  A scaffold generated from the "implementation defaults" of the design-systems (self-made-design-ops)
  corpus (profile=web, density=comfortable). The values are a starting
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
  headline-lg:
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
  headline-md:
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
components:
  button-primary:
    height: "40px"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  button-secondary:
    height: "40px"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  input:
    height: "40px"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  modal:
    width: "512px"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card:
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
---
<!-- lang-links -->
> **English** · [한국어](web-comfortable.DESIGN.ko.md)
<!-- /lang-links -->

## Overview

The visual identity of web-comfortable. This file is a scaffold generated from the **design-systems (self-made-design-ops)**
corpus, so it is finished only once the brand-specific decisions (colour, typeface, tone)
are filled in.

- Profile: **desktop web** · density: **comfortable**
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

Based on a **16px** body — the Western web convention, where most of the sample sits.
**Body size parts by platform** (iOS 17 · automotive a minimum of 24) — do not unify it.

- Keep the token default and the value actually used in components from falling out of step
  (a common accident in the sample)
- Consider raising mobile input fields to 16px (preventing iOS Safari's auto-zoom — seven
  samples handle it in seven different ways)

## Layout

Start with the six spacing steps **4 · 8 · 12 · 16 · 24 · 32.**
In the sample 4, 8 and 16 are effectively required, and the absence of 12 is genuinely
inconvenient.

- Do not make 20 steps from the outset — it costs a judgement at every decision
- If you are reducing, **decide the minimum first**

## Shapes

Radii of **0 · 4 · 8 · 16** plus a circle (`full`). Add 12, 20 and 24 when the need arises.
If the brand tone is round, extend to 28 and 32.

## Components

| component | basis |
|---|---|
| button height | **40px** (the mode across 77 samples, though only about 23% — a density choice, not a "standard") |
| input height | the same as the button (control height alignment) |
| modal width | **512px** (the middle of the 450–520 modal band across 79 samples) · a fixed 24px padding |

- If you have button size steps, start with **four**, and an even 8px increment is the easiest
  to manage
- If you plan to support touch, put the top step at 48 or above

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
| a 16px body | **M** | `patterns/typography.md` — the web majority camp |
| the heading and label scale | **D** | derived from the body (×1.5 and ×2, line heights 1.2–1.6) — not a specific scale from the sample |
| buttons and inputs at 40px | **M** | `patterns/button.md` — the mode across 77 samples (about 23%) |
| a 512px modal with 24px padding | **M** | `patterns/modal.md` — the modal band across 79 samples |
| three motion steps | **M** | `patterns/motion.md` — the mode across 83 samples |
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
