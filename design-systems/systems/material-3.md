---
name: Material Design 3
org: Google
coverage: full
url: https://m3.material.io
repo: https://github.com/material-components/material-web
license: Apache-2.0
tech: [Web Components, Android, Flutter]
figma_kit: true
tokens_format: [CSS, Figma Variables (DTCG export)]
a11y_target: "Confirmed to state none (2026-08-18 — the accessibility documents mention WCAG only in general terms, with no version or level target)"
platform: [web, mobile]
domain: os
verified: 2026-08-16
source: "A full variable export of the Material 3 Design Kit (DTCG JSON) plus npm @material/web@2.5.0"
---
<!-- lang-links -->
> **English** · [한국어](material-3.ko.md)
<!-- /lang-links -->

## In one line

Google's cross-platform design system. It spans Android, the web and Flutter, and ships
**32 theme variants** on the same token structure.

## Tokens

### Typography — Roboto, 15 steps

A structure of five families × Large/Medium/Small.

| family | step | size | line height | tracking | default weight |
|------|------|:---:|:---:|:---:|:---:|
| **Display** | Large | 57 | 64 | **-0.25** | Regular |
| | Medium | 45 | 52 | 0 | Regular |
| | Small | 36 | 44 | 0 | Regular |
| **Headline** | Large | 32 | 40 | 0 | Regular |
| | Medium | 28 | 36 | 0 | Regular |
| | Small | 24 | 32 | 0 | Regular |
| **Title** | Large | 22 | 28 | 0 | Regular |
| | Medium | 16 | 24 | +0.15 | **Medium** |
| | Small | 14 | 20 | +0.10 | **Medium** |
| **Body** | Large | 16 | 24 | +0.50 | Regular |
| | Medium | 14 | 20 | +0.25 | Regular |
| | Small | 12 | 16 | +0.40 | Regular |
| **Label** | Large | 14 | 20 | +0.10 | **Medium** |
| | Medium | 12 | 16 | +0.50 | **Medium** |
| | Small | 11 | 16 | +0.50 | **Medium** |

**Tracking varies inversely with size.** At 57px it is −0.25, above that 0, and from 22px
downward it grows +0.10 → +0.25 → +0.50. **The smaller it gets, the wider it is set.**

Every style has a separate `Weight-emphasized` — the Regular family goes up to Medium, and
the Medium family to SemiBold, one step each.

**The same size takes different tracking in different families.**

| size | Title | Body | Label |
|:---:|:---:|:---:|:---:|
| 16 | +0.15 | +0.50 | — |
| 14 | +0.10 | +0.25 | +0.10 |
| 12 | — | +0.40 | +0.50 |

At 14px alone it splits into Title 0.10 · Body 0.25 · Label 0.10.
**Tracking is decided by role, not by size.**

Source: `tokens/shared/typescale.json`

### Radius (shape corner)

| token | value |
|------|-----|
| None | 0px |
| Extra-small | 4px |
| Small | 8px |
| Medium | 12px |
| Large | 16px |
| Large-increased | 20px |
| Extra-large | 28px |
| Extra-large-increased | 32px |
| Extra-extra-large | 48px |
| **Full** | **1000px** |

Source: `tokens/shared/shape.json`

**The sources disagree.** The Figma kit gives `Full = 1000px`, while
`--md-sys-shape-corner-full` in npm `@material/web@2.5.0` is **`50cqmin`**.
The design tool expresses the same concept as a large constant and the web implementation as
a container-query unit. The other nine steps match exactly across both sources.

### Colour — 197 per theme

| group | count |
|------|:---:|
| State Layers | **147** |
| Schemes | 49 |
| Add-ons | 1 |

**State Layers outnumber Schemes three to one.** Each colour role gets separate tokens for
its per-state transparency layers.

`Schemes` repeats a four-way structure — `Primary` / `On Primary` / `Primary Container` /
`On Primary Container` — for each colour role.

### Themes — 32

```
16 hues × light/dark:
  blue · chartreuse · cyan · green · indigo · monochrome · orange
  pink · purple · red · rose · teal · yellow  (+ -lt / -dt)

base:             light · dark
contrast variants: light-medium-contrast · light-high-contrast
                   dark-medium-contrast · dark-high-contrast
```

**Every theme has the same 197-token structure.** Only the colours are swapped.

There are two separate font themes, `baseline` and `wireframe`.

### Spacing

**None.** The whole variable export (`typescale` · `shape` · `shadows` · `typography` ·
`m3` · `font-theme`) was checked and there is no spacing collection. Nor is there one in the
npm package.

Material 3's 4dp grid is a concept in the documentation and **is shipped as a token in
neither source.**

## Components

Unverified — the component pages could not be reached in the duplicate.

## Characteristic decisions

- **It does not tokenise spacing**, as with Apple HIG. That both mobile operating systems
  leave whitespace out of their variables is where they part from the web systems.
- **Tracking is decided by role.** The same 14px is 0.10 in Title and 0.25 in Body — unlike
  systems that determine tracking from size alone.
- **Every style has a paired emphasis weight** — `Weight` / `Weight-emphasized`, raising
  Regular→Medium and Medium→SemiBold one step each.
- **State Layers are first-class tokens** — 147 per theme, 75% of the total. Hover, press and
  the rest are resolved in the tokens rather than in the implementation.
- **It ships 32 themes** — 16 hues × 2 modes plus 4 contrast variants. The most themes in the
  sample.
- **It has `increased` variants** — `Large-increased` (20) between `Large` (16) and
  `Extra-large` (28), and `Extra-large-increased` (32) after it. A different solution to the
  same problem as Fluent's `Nudge`.
- **The radii are large.** `Extra-extra-large` at 48px is the largest among the systems
  collected — the opposite axis from Carbon (aiming at 0) and Helios (maximum 8px).

## Motion — obtained from the androidx source (2026-08-17)

The motion tokens, unverified while `m3.material.io` was blocked, were obtained from
**the generated code in the androidx repository** (`MotionTokens.kt` v0_103,
`ExpressiveMotionTokens.kt` and `StandardMotionTokens.kt` v0_14_0):

- Easings: **three families — Emphasized/Standard/Legacy — × base, accelerate and
  decelerate**. The full values are in the "Material 3 — 10 easings plus 2 spring sets"
  section of `patterns/motion.md`
- Durations: **four families, Short–ExtraLong, × four steps = 16 tokens** (50–1000ms) —
  the most in the corpus
- The newest Expressive scheme uses **springs (damping/stiffness)** rather than beziers, and
  separates `Spatial` (position, allowed to overshoot) from `Effects` (colour and opacity,
  damping 1.0, no oscillation)

## Component dimensions — androidx generated tokens (the Expressive generation, 2026-08-17)

Component dimensions were obtained through the same channel as the motion (`tokens/*.kt`).

### Buttons, five steps (v0_11_0)

| | XSmall | Small (default) | Medium | Large | XLarge |
|---|:---:|:---:|:---:|:---:|:---:|
| height | 32 | **40** | 56 | **96** | **136dp** |
| icon | 20 | 20 | 24 | 32 | 40 |
| inline padding | 16 | 16 | 24 | 48 | 64 |

- **XLarge at 136dp is the tallest button in the corpus** (the existing distribution runs
  28–48px). The Expressive generation pulls hero CTAs inside the button scale.
- **The shape changes with state** — alongside the two families
  `ContainerShapeRound` (full) and `Square` (medium–XL), there is a separate
  **`PressedContainerShape` one step tighter**. The only sample where a **shape morph** on
  press is specified at the token layer.

### Other measurements

| component | value |
|----------|-----|
| Checkbox | 18dp, **StateLayer 40dp** (visual 18 separated from a 40 touch layer) |
| RadioButton | 20dp, StateLayer 40dp |
| Switch | track 52×32, **a handle that resizes by state**: unselected 16 → selected 24 → pressed 28dp |
| Slider | a **4×44dp** vertical bar handle (Expressive), track 16dp |
| FAB | Small 40 / Medium 80 / Large 96dp |
| Badge (dot) | 6dp |
| AppBar Small · NavigationBar | 64dp |
| state-layer alpha | hover 0.08 · focus/pressed 0.10 · dragged 0.16 |

- **M3 is the only system whose switch handle grows with state** — Mantine has a five-step
  size axis but it is state-invariant (crossing `patterns/form.md`).
- The shape scale's actual values (4/8/12/16/20/28/32/48 plus Increased 20/32) were
  re-confirmed in the code — **matching what was collected from the Figma kit** (an
  independent-channel cross-check).

## Elevation and scrim — androidx generated tokens (2026-08-18)

The origin corresponding to `shadows.json` (the shadows collection in the Figma variable
export) was identified as androidx `ElevationTokens.kt` (v0_103):

```
Level0  0dp   Level1  1dp   Level2  3dp
Level3  6dp   Level4  8dp   Level5 12dp
```

- **There is no `ShadowTokens.kt`** (zero hits when measuring the `tokens/` directory) —
  M3 tokenises shadow not as colour and blur values but **only as six elevation steps in
  dp**, delegating the actual shadow rendering to the platform (the Android elevation API).
  Where it parts from the web systems that ship shadows as lists of box-shadow values.
- Scrim: `ScrimTokens.kt` (v0_117) — the colour role `Scrim` plus **a fixed opacity of
  0.32**. It matches the scrim target (0.32) in `@material/web`'s dialog animation
  (an independent-channel cross-check — `patterns/motion.md`).
- Typeface origin: `TypefaceTokens.kt` (v0_103) — both Brand and Plain are `SansSerif`, with
  three weights, Regular/Medium/Bold. **That the typeface is specified as an abstract
  family** is characteristic of the generated-code layer, which does not hardcode Roboto.

## Accessibility

Four variants — `light-medium-contrast` · `light-high-contrast` · `dark-medium-contrast` ·
`dark-high-contrast` — are provided at the theme level. **Confirmed to state no explicit
conformance target** (2026-08-18 — the accessibility documents mention WCAG only in general
terms, with no version or level). At the implementation layer:
**a 40dp StateLayer on 18–20dp visual controls** — a structure that guarantees the touch
target through the size of the state layer, present in the generated tokens.

## References

- Repository: https://github.com/material-components/material-web
- Package: `@material/web` (contains **only the shape tokens**)
- Figma: Material 3 Design Kit (Community) — the variable export is the most complete source
- ~~The component list and dimensions~~ → **resolved (2026-08-17)** — extracted from the 120
  files in androidx `tokens/`. See "Component dimensions" above.
- ~~The actual TypeScale values~~ → **resolved.** 15 roles × Emphasized pairs = 30.
  Display 57/45/36 · Headline 32/28/24 · Title 22/16/14 · Body 16/14/12 ·
  Label 14/12/11sp, with line heights of size + 8 (+7 at the large end).
  **The rule for the Emphasized variants is "weight up, tracking down"** — BodyLarge goes
  from Regular / tracking 0.5 to Medium / tracking 0.15. The same principle as Radix Themes'
  tracking correction on an active tab (−0.01em), **systematised across the whole type
  scale** (crossing `patterns/typography.md` and `navigation.md`).
- ~~The contents of `shadows.json`~~ → **resolved (2026-08-18)** — see "Elevation and scrim"
  above. M3's shadows are six elevation tokens (0/1/3/6/8/12dp), and there is no separate
  shadow-value file.
