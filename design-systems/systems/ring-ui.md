---
name: Ring UI
org: JetBrains
coverage: partial
url: https://jetbrains.github.io/ring-ui
repo: https://github.com/JetBrains/ring-ui
license: Apache-2.0
tech: [React, CSS]
figma_kit: true
tokens_format: [CSS]
a11y_target: "No WCAG level declared — its own minimum text contrast of 4.0:1 (below AA's 4.5:1), confirmed 2026-08-18"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @jetbrains/ring-ui-built@7.0.123 → components/style.css"
---
<!-- lang-links -->
> **English** · [한국어](ring-ui.ko.md)
<!-- /lang-links -->

## In one line

JetBrains' system (the IDE web UI) — **every colour token is a pair, an RGB channel triplet
and a finished colour**, dimensions are built by **multiplying the single `--ring-unit`
(8px) in calc() 437 times**, and duration and easing are **combined into one token**.

## Tokens

### Colour — a dual channel-triplet system

```css
--ring-main-components: 51,105,214;              /* the channels alone */
--ring-main-color: rgb(var(--ring-main-components));  /* the finished colour */
```

**Every colour token is a pair: `-components` (R,G,B listed) plus `-color` (a finished
rgb())** — a structure that lets any colour take an alpha through
`rgba(var(--ring-*-components), 0.5)`. The only sample applying channel separation
**across the whole palette** (solving the same problem as shadcn/ui's direct OKLCH entries,
by a different route).

State enters the colour names directly — it even enumerates **compound state combinations**
like `border-hover` · `border-disabled` · `border-selected-disabled` ·
`border-disabled-active` (the same judgement as the macOS kit's enumerated
`Value+Disabled` combinations).

### Dimensions — one unit × calc

```css
--ring-unit: 8px          /* used 437 times within style.css */
--ring-input-m: calc(var(--ring-unit)*30)   /* 240px */
```

There are no individual spacing tokens; **multiplying `--ring-unit` stands in for a scale** —
and unlike Tailwind (generated at build time), this is **runtime calc() multiplication.**
Change the unit and every component rescales immediately.

### Type — 14px, weights 500/600

```
font-size: 12 / 14 / 16px    line-height: 16 / 18 / 20 / 24px
font-weight: medium 500 · bold 600
```

- **A 14px base** — developer-tool density. The 14px camp of dense enterprise UI, with
  Blueprint (Palantir) and Siemens iX
- **`bold` is 600, not 700** — a name/value mismatch (belonging to the name-value inversions
  in `GLOSSARY.md`)

### Motion — a composite duration + easing token

```css
--ring-ease: 0.3s ease-out
--ring-fast-ease: 0.15s ease-out
```

**Duration and easing are one token** — the "shorthand token" camp, with Atlassian (fields of
a composite token) and Siemens iX (font shorthand). It is used by plugging straight in, as in
`transition: color var(--ring-ease)`.

### Radius — split left and right

Beyond the three steps `2 / 4 / 8px`, **`--ring-button-border-radius-left/right` are separate
tokens** — controlling the end radii of a button group by direction.

Dark mode is a `.ring-ui-theme-dark` class override, with no `prefers-color-scheme` branch.

## Components in depth — (2026-08-18)

Measured from `components/style.css` of `@jetbrains/ring-ui-built@7.0.123` (the CSS modules
are built into plain classes, of the form `ring-button-heightS`), plus
`_helpers/*.classes.js` and `global/configuration.js`. There are 86 component directories.

### Buttons (`button/`)

| | S | M (default) | L |
|---|:--:|:--:|:--:|
| **height** | **24px** (unit×3) | **28px** (unit×3.5) | **32px** (unit×4) |
| block padding | 4px | 4px | 6px |
| inline padding | 16px (unit×2) | 16px | 16px |
| icon-only padding | 6px | 6px | 8px |
| type | 12px / 16px | 14px / 20px | 14px / 20px |
| radius | 4px (separate left/right tokens) | same | same |

- **The height is aligned three ways** — a fixed `height`, a `line-height` and block padding
  are all stated, and the three agree arithmetically (20 + 4×2 = 28). **There is no minimum
  width.**
- **The border is an `inset box-shadow` of 1px rather than a border** — `border:0` with
  `box-shadow:inset 0 0 0 1px` doing the work. A border that does not enter the layout.
- **The default size is a React context, not a prop** — `ControlsHeightContext`, with a
  global default of M (28px). A structure for switching S/M/L wholesale per form or region.
- **Entering a state is instant; only the return animates** — the base rule sets
  `transition: color/background/box-shadow var(--ring-ease)` (0.3s ease-out) and
  `:hover`, `:active` and `:focus-visible` declare `transition:none`.
- Variants: primary · success · error · secondary · ghost · danger, plus inline (a text
  form). The flat family all derives by making the border variable transparent.

### Inputs (`input/`)

| | S | M | L |
|---|:--:|:--:|:--:|
| **derived height** | 24px | 28px | 32px |
| block padding | **1px** | **3px** | **5px** |
| inline padding | 8px (unit) | 8px | 8px |
| type | 14px / 20px throughout | | |
| radius | 4px | | |

- **It reaches the same 24/28/32 ladder as the button by a different route** — the button
  uses a fixed height plus a box-shadow border, the input **a real 1px border with a derived
  height** (20 + 2×padding + 2×1). The odd paddings (1/3/5) absorb the border's share.
- Width is a separate axis — sizeS 96px (unit×12) · M 240px (×30) · L 400px (×50) · FULL.
- The label is a separate block (`control-label`) — 14px/20px, with 4px below.
  A secondary label (12px/16px, grey) is built into the same component.

### Dialogs (`dialog/`) — one width, no animation

| item | value |
|------|-----|
| width | **a single 464px (unit×58)** |
| min-height | 120px (unit×15) |
| radius | 8px (`--ring-border-radius-large` = unit) |
| scrim | rgba(0,0,0,**0.4**) — **0.7** in the dark theme |
| animation | **none** — zero dialog-related keyframes or transitions |

- **There are no width steps** — one 464px (plus a viewport ceiling of `100dvw−64px`).
  An extreme opposite to MUI (reusing five breakpoints) and Backpack (two steps).
- The container reuses island (the card) — a 24px/28px header type with 32px of top padding,
  and a footer (panel) padding of `16 32 32`. A dense variant folds the top to 16px.
- **The overlay's z-index is 5** (`--ring-overlay-z-index`) — a single digit, the opposite
  extreme from F36's 10⁴–10⁵ logarithmic scale.
- **The scrim's opacity is a theme axis** — 0.4 in light, 0.7 in dark.

### Characteristic decisions (from the deep pass)

- **A three-way aligned button height** (height = line-height + 2×padding) — with the input
  reaching the same ladder through a real border, a dual implementation
- **The border as an inset box-shadow** — the same technique as Cedar (rediscovered in the
  same day's deep pass)
- **Size variants as a React context** (`ControlsHeightContext`) — the same
  "density/size per tree" camp as F36's `useDensity()`
- **Instant on entering a state, 0.3s only on return** — by putting `transition:none` on the
  state selectors
- **One dialog width plus no animation plus a z-index of 5**

## Characteristic decisions

- **Channel triplets paired with finished colours across the whole palette** — unique in the
  sample
- **A single unit multiplied 437 times in calc** — a runtime multiplication scale with no
  enumeration
- **A composite duration + easing token** — unique in the sample
- `bold` = 600 — a name/value mismatch
- Compound states (`selected-disabled` and the rest) enumerated as colour names
- Separate left/right button radius tokens

## Accessibility

~~Unverified.~~ → **It declares no WCAG conformance level. Instead it sets its own minimum
text contrast of 4.0:1 (resolved 2026-08-18).**

The Storybook (`jetbrains.github.io/ring-ui`) has no accessibility documentation — rendered
headlessly, the sidebar contents are just four items: `Getting Started · Contributing ·
Changelog · License` (the a11y addon `sb-addons/a11y-2` is installed). The separate design
guidelines site <https://www.jetbrains.com/help/ring-ui/welcome.html> has no Accessibility
entry either, and `/help/ring-ui/accessibility.html` is a 404.

Accessibility-related text is gathered in **one place, the colour page**
(<https://www.jetbrains.com/help/ring-ui/color.html>, last modified 2023-03-16).

- **A minimum text contrast of 4.0:1** — it states flatly that "the minimum contrast
  requirement for text in RingUI is **4.0:1**". **A house standard below WCAG AA's 4.5:1**,
  and the only sample that deliberately lowers a WCAG figure and writes it down.
  It names WebAIM's Contrast Checker and a Figma contrast plugin as verification tools
- **Two exemptions** — ① text that is incidental or decorative and serves no essential
  purpose (though it adds that "such elements are better removed altogether") ② **text in
  disabled components** (on the logic that a disabled state has no essential purpose)
- **No conveying meaning by colour alone** — where colour carries information, an additional
  cue such as text or an icon must accompany it; this is the one place WCAG (Use of Color) is
  linked as a reference
- **Fixed meanings for red, yellow and green** — red = critical (error, failure, danger),
  yellow = warning (caution, action needed), green = success (confirmation, availability).
  The rationale given is that using them otherwise reduces the salience of genuinely critical
  situations

In short there is **no conformance target, only rules at the level of "best practice".**

## References

- Tokens: `npm pack @jetbrains/ring-ui-built@7.0.123` → `components/style.css`
- Components in depth: `components/style.css` from the same package plus
  `_helpers/button.classes.js` and `global/configuration.js` (2026-08-18)
- **Open questions:** the dark palette's values (only the 0.7 overlay is confirmed),
  ~~the component list~~ (resolved 2026-08-18 — 86 directories, with buttons, inputs and
  dialogs in the deep pass), the relationship to the IDE products (YouTrack and others),
  ~~the accessibility target~~ (resolved 2026-08-18 — confirmed to declare no WCAG level,
  with its own 4.0:1 contrast)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — github JetBrains/ring-ui →
  `README.md` → `figma.com/design/j7UivSrGze5xCDKrqzR7Fa/RingUI--Community`
