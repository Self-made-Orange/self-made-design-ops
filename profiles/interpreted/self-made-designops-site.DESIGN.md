---
version: alpha
name: self-made-designops-site
description: >-
  The build spec for this corpus's own site. Generated from docs/assets/site.css by
  site/design-spec.mjs, so the spec cannot drift from the page it describes. An
  interpreted profile: the palette is filled in, and every authored value says so.
colors:
  primary: "#ff5926"
  on-primary: "#ffffff"
  surface: "#ffffff"
  on-surface: "#1a1815"
  background: "#faf9f7"
  on-background: "#1a1815"
  outline: "#e6e4de"
  link: "#c2410c"
  warning: "#9a6700"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "72px"
rounded:
  none: "0px"
  full: "9999px"
typography:
  headline-lg:
    fontSize: "54px"
    fontWeight: 730
    lineHeight: 1.05
  headline-md:
    fontSize: "34px"
    fontWeight: 720
    lineHeight: 1.2
  body-lg:
    fontSize: "18.5px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  code-md:
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
components:
  button-primary:
    height: "46px"
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.3xl}"
  button-secondary:
    height: "46px"
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.3xl}"
  input:
    height: "34px"
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
  notice:
    backgroundColor: "{colors.background}"
    textColor: "{colors.warning}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
---
<!-- lang-links -->
> **English** · [한국어](self-made-designops-site.DESIGN.ko.md)
<!-- /lang-links -->

> **Generated.** `node site/design-spec.mjs` reads `docs/assets/site.css` and writes this
> file. Do not edit it by hand — change the stylesheet and regenerate, or the spec and the
> page stop agreeing, which is the failure this repository is about.

## Overview

The visual identity of **Self-Made DesignOps**, the corpus's own site. It is the first thing
this repository actually built, so it owes the artefact it asks of everyone else.

This is an **interpreted** profile (`profiles/README.md`): the skeleton comes from
`measured/web-comfortable`, and colour and tone are filled in on top. That means it carries
**A rows**, and the point of the table at the bottom is that they are visible rather than
dressed up as measurements.

- Surface: **desktop web**, a 248px rail beside the page, stacking below 940px
- Themes: **two**, light by default, dark by explicit choice
- Dependencies: **one typeface** (Pretendard Variable); no framework, no build step

## Colors

Filled in — that is what separates this file from `measured/`. Two complete palettes; the
neutrals in the dark set are **R=G=B**, so the only hue in either theme is the orange and two
status dots.

| role | light | dark |
|------|-------|------|
| background | `#faf9f7` | `#0c0c0c` |
| surface | `#ffffff` | `#161616` |
| text | `#1a1815` (16.84:1) | `#ededed` (16.71:1) |
| muted | `#5c574f` (6.81:1) | `#a1a1a1` (7.57:1) |
| dim | `#726c62` (4.94:1) | `#8a8a8a` (5.67:1) |
| link | `#c2410c` (4.92:1) | `#f97316` (6.98:1) |
| outline | `#e6e4de` | `#2a2a2a` |
| warning | `#9a6700` (4.63:1) | `#e3b341` (10.05:1) |

Every ratio above is computed by the generator, not copied from a note.

**The CTA is the exception, and it is stated rather than buried.** `#ff5926` with a
`#ffffff` label is **3.13:1** — under the 4.5:1 AA floor for
body-size text, and the label is 15px/600, which is not large text either. It is a
deliberate brand call by the owner and the **only** value on the page that does not clear AA.
`#e8481a` carries the button's boundary at 3.71:1 on the light canvas, because the
fill alone is 2.97:1 — under the 3:1 that WCAG 1.4.11 wants for a component edge.

## Typography

Pretendard Variable for text, ui-monospace for the monospaced column. Body is
**16px/1.6** — the web majority camp in `patterns/typography.md`.

Headings are fluid: `clamp(32px,5vw,54px)` and `clamp(24px,3.2vw,34px)`. The DESIGN.md
frontmatter records the **upper bound**, since the format has one slot per size and the
desktop value is the one a component library would be built against.

## Layout

Eight spacing steps: **4px · 8px · 12px · 16px · 24px · 32px · 48px · 72px**. The first six are the
`measured/web-comfortable` set; 48px and 72px are added for page-level rhythm.

The shell is a 248px rail beside the page under a 58px header, stacking to one column
below 940px.

## Shapes

**`0px` on every control** — buttons, inputs, the theme toggle, Copy, Reset.
`tokens/scales.md` records a radius-0 camp, so the value is in the sample; choosing it is a
decision. Chips and coverage badges stay fully round, because they are drawn as one family
with the non-interactive badges and squaring only the interactive half would split it.

## Components

| component | value | note |
|---|---|---|
| primary / secondary button | 46px | above the 40px mode — a page with two CTAs, not a form |
| header control | 32px | secondary chrome |
| search input | 34px | |
| Copy button | 30px | sits in a heading row |
| filter chip | 26px | |

## Motion

> The DESIGN.md alpha spec **has no slot for motion tokens**. Under the spec's "preserve
> sections you do not understand" clause it is kept as a body section (`INTEROP.md`,
> section 5).

Interaction durations: **100 · 140 · 180ms**, all on `cubic-bezier(.2,.6,.2,1)`.
That is 3 steps, against the mode of three across 83 samples in
`patterns/motion.md`.

The hero carries one ambient loop: a 24px dot field drifting **24s linear**, one cell
per cycle. The 24px step is measured (a spacing step in 27 of 29 systems); the 24s is not —
the corpus records no ambient-loop duration, and the longest value it holds is Codex's 2000ms,
which is a different kind of animal.

`prefers-reduced-motion: reduce` stops it outright. Note the trap: the common recipe sets
`animation-duration: .01ms` alone, and for an **infinite** animation that is not stopped, it
is a spin — the iteration count has to be pinned as well.

## Evidence grades

M = measured in the corpus · D = derived from measurements · A = the author's judgement ·
U = a deliberate blank.

| item | grade | source / what to do |
|------|:---:|------|
| the first six spacing steps | **M** | `tokens/scales.md` — 4, 8 and 16 are effectively required in the sample |
| `16px` body | **M** | `patterns/typography.md` — the web majority camp |
| radius `0px` on controls | **M** | `tokens/scales.md` records a radius-0 camp — the value is in the sample, choosing it is a decision |
| the 24px dot grid | **M** | `tokens/scales.md` — a spacing step in 27 of 29 systems |
| input height = 34px beside a 46px button | **D** | control-height alignment from `patterns/form.md`, scaled to this page's chrome rather than matched exactly |
| the heading scale | **D** | fluid, built off the body size — not a specific scale from the sample |
| 48px and 72px spacing | **D** | extending the measured scale for page-level rhythm |
| **the whole palette** | **A** | the author's. The corpus has no recommended ramp — `patterns/color.md` is the axis the sample parts on most |
| **the CTA at `#ff5926`** | **A** | the owner's choice. 3.13:1 with its label — the one value here under AA, recorded rather than smoothed over |
| **Pretendard Variable** | **A** | the author's. The corpus records typefaces per system and recommends none |
| **248px rail · 58px header** | **A** | the author's. `patterns/navigation.md` is a thin-sample axis (16) and carries nothing to appeal to here |
| **the 24s hero drift** | **A** | the author's. No ambient-loop duration exists in the corpus |
| 3 interaction durations | **A** | the sample's mode is three (`patterns/motion.md`, 83 samples); this page uses 3, which is a deviation with a reason, not a measurement |
| the dark-theme neutrals | **A** | the author's, R=G=B by intent. The corpus has no base ramp |

**The A rows are the majority, and that is correct for an `interpreted/` profile.** A file in
`measured/` with this many A rows would be misfiled.

## Do's and Don'ts

- ✅ Change the stylesheet and **regenerate** — never edit this file
- ✅ When you add a value, add its grade row. An A with no recorded intent is the thing
  `profiles/README.md` rule 1 exists to prevent
- ❌ Do not read the palette here as a corpus recommendation. It is one site's answer
- ❌ Do not copy the CTA contrast. It is a recorded exception, not a pattern to follow
