---
name: Seed Design
org: Danggeun (Karrot)
coverage: partial
url: https://seed-design.io
repo: https://github.com/daangn/seed-design
license: Apache-2.0
tech: [React, CSS]
figma_kit: false
tokens_format: [CSS, JS]
a11y_target: "WCAG not adopted — it adopts APCA (Lc) instead: body Lc 75+, other text Lc 60+, placeholder and disabled Lc 30+ (confirmed 2026-08-18)"
platform: [web, mobile]
domain: commerce
verified: 2026-08-18
source: "npm @seed-design/stylesheet@1.1.2 (global.css) · @seed-design/design-token@1.0.5 · npm @seed-design/css@2.5.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](seed-design.ko.md)
<!-- /lang-links -->

## In one line

Karrot's design system for its local-community and secondhand-trading service.
One of the **publicly available systems built in Korea** that ships tokens.

## Tokens

### Typography — 18 steps, in 0.0625rem (1px) increments

| token | rem | px |
|------|-----|-----|
| `font-size-10` | 0.625 | 10 |
| `font-size-25` | 0.6875 | 11 |
| `font-size-50` | 0.75 | 12 |
| `font-size-75` | 0.8125 | 13 |
| `font-size-100` | 0.875 | 14 |
| `font-size-150` | 0.9375 | 15 |
| `font-size-200` | 1 | 16 |
| `font-size-300` | 1.125 | 18 |
| `font-size-400` | 1.25 | 20 |
| `font-size-500` | 1.5 | 24 |
| `font-size-600` | 1.625 | 26 |
| `font-size-700` | 2 | 32 |
| `font-size-800` | 2.125 | 34 |
| `font-size-900` | 2.625 | 42 |
| `font-size-1000` | 3 | 48 |
| `font-size-1100` | 3.375 | 54 |
| `font-size-1200` | 3.75 | 60 |
| `font-size-1300` | 4.5 | 72 |

**The 10–16px range is filled completely at 1px steps** (10 · 11 · 12 · 13 · 14 · 15 · 16).
Seven steps inside a 6px span.

**The densest type scale in the sample**, against Carbon (12 · 14 · 16 · 18 · 20 — five
steps) and Material 3 (11 · 12 · 14 · 16 — four).

### Tracking — three negative steps

| token | value |
|------|-----|
| `letter-spacing-none` | 0em |
| `letter-spacing-narrow-200` | **-0.02em** |
| `letter-spacing-narrow-300` | **-0.03em** |
| `letter-spacing-narrow-400` | **-0.04em** |

**There is `narrow` and no `wide`** — three steps in the tightening direction only.

Backpack tokenises tracking too, at different values (−0.02 / −0.04 / −0.05em).
**Both systems provide negatives only.**

### Colour

Defined by hue family in `@seed-design/stylesheet`'s `global.css`.

The families confirmed: `gray` · `carrot` (the brand) · `blue` · `green` · `red` · `pink` ·
`purple`, each with a separate `-alpha-` variant (`gray-alpha-*` and so on).

**The alpha variants are a token family of their own** — providing values with the
transparency already applied to the colour.

### The token tiers

`@seed-design/design-token` divides into three tiers.

```
scale/      raw values (dimension · color · letterSpacing)
static/     fixed values (color · fontWeight · lineHeight)
semantic/   by role (color · typography)
```

The JS exports are wrappers referencing the CSS variables.

```js
export const fontSize100 = "var(--seed-scale-dimension-font-size-100)";
```

A structure where **the real values are in CSS and the JS holds only references.**

### Spacing / radius — absent (as of the v1 stylesheet)

**The tokens do not exist.** This is the result of checking all 744 variables in
`global.css`.
**That verdict is limited to `stylesheet@1.1.2` (v1)** — the newer
`@seed-design/css@2.5.0` has spacing, radius and motion in full
(the deep pass below, 2026-08-18).

The distribution by category:

| tier | category | variables |
|------|----------|:---:|
| semantic | typography-* (label · body · title · subtitle · h · caption) | 342 |
| scale | color-* (7 hues plus alpha variants) | 256 |
| scale | letter-spacing | 84 |
| scale | dimension-font-size | 56 |
| static | line-height | 41 |
| static | font-weight | 40 |
| semantic | color-* | the remainder |

**The `dimension` category contains only `font-size`.** No variable corresponding to spacing
or radius exists in any tier.

Seed Design, in other words, is **a system that tokenises only colour and typography.**
Whitespace and corners live directly in the components (`@seed-design/react`).

Among the 34 samples, four have this structure: Apple HIG and Material 3 (mobile operating
systems), Seed Design and Evergreen.
**But Seed is `platform: [web, mobile]`, so this cannot be read as a mobile-OS trait.**

## Components

~~Unverified. `@seed-design/react@2.3.0` ships separately.~~ → the deep pass below
(2026-08-18). The component CSS is not in stylesheet but in **`@seed-design/css`**.

## Components in depth — (2026-08-18)

**Start with the generation.** `@seed-design/stylesheet@1.1.2` contains no component CSS
(a single `global.css` — exactly as the token section's exhaustive check found).
The component layer is in **the newer `@seed-design/css@2.5.0`**:
`all.css` (13,000 lines) plus **92** `recipes/*.css` files. `@seed-design/react@2.3.0`
holds behaviour only (with a peer dep on `@seed-design/css ^2.5.0`) and takes its classes
from the css package's recipes. The primitives are per-component `@seed-design/react-*`
packages plus Radix utilities.

### In v2 the token system was turned over — spacing, radius and motion appeared

The section above's verdict that "only colour and typography are tokenised" **stands for v1
(stylesheet 1.1.2)**, while v2 (css 2.5.0) ships every axis:

| axis | scale |
|----|--------|
| dimension | `x0_5`–`x16` = 2–64px (**multiples of 4 under an `x` naming**, including half-steps such as x2_5 = 10px) |
| radius | `r0_5`–`r6` = 2–24px plus full |
| duration | `d1`–`d6` = 50–300ms (even 50ms steps) |
| easing | linear · easing (.35,0,.35,1) · enter (0,0,.15,1) · exit (.35,0,1,1) plus **an expressive pair** |
| semantic spacing | `spacing-x-global-gutter` (16px) · `spacing-y-screen-bottom` (56px) and others, by role |

- Typography was **reorganised onto a t-scale** too, `t1`–`t14` (11–48px), and
  **every size is wrapped in `clamp(static×0.8, computed×multiplier, static×1.5)`** —
  the only structure in the sample where support for the OS font-size setting
  (`--seed-font-size-multiplier`) is built into the token definitions themselves.
  iOS Dynamic Type carried over into web tokens.

### Buttons (ActionButton) — the press is a scale, not a colour

| | xsmall | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 32px | 36px | 40px | **52px** |
| radius | **full (a pill)** | 8px | 8px | 12px |
| type | 13px | 14px | 14px | 18px |
| inline padding | 14px | 14px | 16px | 20px |
| **press scale** | **0.95** | 0.97 | 0.97 | **0.98** |

- **active is a `scale` contraction** (`--seed-scale-s95/s97/s98`, with a 150ms easing of
  its own). **The contraction differs by size** — the smaller the button, the more it shrinks,
  equalising the visual change. Even the redefinition of all three variables to 1 under
  `prefers-reduced-motion` is handled at the token layer.
- **Only xsmall is a pill (full); the rest are 8/12px** — the size step changes the shape too
  (more radical than Backpack enlarging the radius on large inputs).
- large skips 44 and 48 for **52px** — apparently the height of a primary mobile CTA.
- Variants: brandSolid (weight 700), neutralSolid, neutralWeak, critical* and others, with
  bold applied alongside on the brand-coloured family.

### Inputs (TextInput) — a "responsive" size switching density by breakpoint

| | large | medium | responsive |
|---|:--:|:--:|:--:|
| **min-height** | **52px** | 40px | <1280px: 52 → ≥1280px: 40 |
| radius | 12px | 8px | 12 → 8px |
| type | 16px | 14px | 16 → 14px |
| inline padding | 16px | 14px | follows |

- **`size="responsive"` is a first-class size variant** — with 1280px as the single boundary,
  dimensions, radius and type all shift together from mobile = large to desktop = medium.
  A way of resolving density switching neither through two token sets (Cloudscape) nor
  through a multiplier (Vapor) but **through a media query inside a component's size
  variant** — unique in the sample.
- The outline is a 1px inset box-shadow with **a 2px `::after` pseudo-element border**
  layered over it, coloured in only on focus — so there is no layout shift from a change of
  thickness. There are two variants, outline and underline.

### Dialogs — a 272px mobile alert with a contracting entrance

- Content **max-width 272px**, 32px inline margins, radius 20px (r5) — the narrowest in the
  sample (an order apart from Backpack's 512 and Vapor's 500px, and effectively the same
  value as iOS's UIAlertController at 270pt).
- **The entrance is scale 1.3→1** — arriving by shrinking from an enlarged state, a
  **contracting entrance** (enter-expressive, 200ms). The only reversed direction in a sample
  otherwise uniformly expanding (0.8–0.9→1). Exit and backdrop take 100ms.
- The title is 20px/700 and the body 16px/400. The bottom sheet takes a 24px (r6) radius on
  the top only, plus a 28px handle and `--seed-safe-area-bottom` padding — the mobile-webview
  premise showing through in the CSS.

### Characteristic decisions (from the deep pass)

- **Every typography token wrapped in clamp() with an OS multiplier variable** — accessibility
  scaling, tokenised
- **The press as a size-graded scale contraction** (0.95–0.98) plus reduced-motion handled in
  the tokens
- **`size="responsive"`** — a size variant switching density on a single breakpoint (1280px)
- **A 272px dialog with a scale 1.3 contracting entrance** — an iOS convention ported to the
  web
- **From two token axes in v1 to every axis in v2** — the "colour and typography only"
  verdict is generation-specific

## Characteristic decisions

- **The type scale runs in 1px steps.** Seven steps between 10 and 16px.
  The densest in the sample, possibly related to the narrow range over which Korean body text
  can be adjusted, though the source gives no rationale.
- **Tracking exists only in the tightening direction.** Three `narrow` steps, no `wide`.
- **Alpha colours form a separate family.** `gray` and `gray-alpha-*` sit side by side.
- **The tokens are divided into three tiers, scale / static / semantic.**
  Where a two-tier raw/semantic split is common, `static` is an addition.
- **The JS is a wrapper referencing CSS variables.** The single source of truth is the CSS.
- **The packages are split by purpose** — `design-token` · `stylesheet` · `css` · `react`.
- **Only colour and typography are tokenised.** There is no spacing and no radius.
  Excluding the mobile operating systems (Apple, Material), it is unique in the sample.
  (**v1 only** — v2's `@seed-design/css` moves to tokenising every axis; see the deep pass)

## Accessibility

~~Unverified.~~ → **Resolved (2026-08-18, headless render).**

Seed is **the only case in the corpus that never mentions WCAG.**
The string "WCAG" does not appear anywhere in `/foundations/inclusive-design`, and the
contrast criteria are written in **Lc values from APCA (the Advanced Perceptual Contrast
Algorithm).**

### Contrast — Lc, not a ratio (4.5:1)

| target | criterion |
|------|------|
| readable text (body of two lines or more · screen titles · headlines · input fields · tooltips) | **at least Lc 75**, recommended **Lc 90** |
| other text | **at least Lc 60** (bold if under 16px) |
| placeholder and disabled text | **at least Lc 30** |

Using APCA's `Lc 75`, `Lc 60` and `Lc 30` in place of WCAG's `4.5:1` and `3:1` is a choice to
**replace the contrast model itself** — the only such case in the corpus.

### Target size and interaction

- A touch area of **44×44px or more is ideal**, with **at least 24×24px guaranteed** where
  constrained (numerically the same as WCAG 2.2's 24×24 minimum, though WCAG is not cited as
  the grounds)
- Complex gestures (pinch-zoom, drag) must **offer a simple-touch alternative**
- Every interaction must be reachable through **VoiceOver and TalkBack**
- Errors give visual feedback plus **`aria-live`** notification to assistive technology
- **No flashing more than three times a second**, and audio auto-playing for more than three
  seconds must offer stop and volume control

### The source documents (not WCAG)

The "Related Documents" at the foot of the page cite just four:
**the ARIA Authoring Practices Guide (APG)** · **Apple HIG (Accessibility)** ·
**Android Accessibility Best Practices** · **the APCA Readability Criterion.**
**Rather than declaring conformance to a standard, it composes its criteria from platform
guides plus APCA.**

Source: https://seed-design.io/foundations/inclusive-design (render confirmed, 2026-08-18)

## References

- Documentation: https://seed-design.io (**access confirmed by headless render 2026-08-18** —
  the earlier note that it was "blocked in this environment" referred to curl; a browser
  render works normally)
- Packages: `@seed-design/design-token` · `@seed-design/stylesheet` ·
  `@seed-design/css` · `@seed-design/react`
- **Package names that do not exist:** `@daangn/seed-design` · `@seed-design/token` ·
  `@seed-design/token-web` · `@daangn/seed-design-token`
- Repository structure: `packages/{design-token,stylesheet,react-theming,icon,machines}` —
  the single source of values is `packages/stylesheet/global.css` (**as of v1** — in v2 the
  source is `base.css` in `@seed-design/css`)
- Components in depth: `@seed-design/css@2.5.0` → `base.css` (tokens) ·
  `recipes/{action-button,text-input,dialog,bottom-sheet}.css`, with
  `@seed-design/react@2.3.0`'s dependency structure confirmed (2026-08-18)
- **Figma kit — confirmed absent (2026-08-18, `figma_kit: false`)**:
  Seed uses Figma **as an input for code generation, not as a design distribution channel.**
  Nowhere on the documentation site is **a UI kit or library file distributed**, and every
  Figma-related document sits under `AI & Tools` in the tooling family —
  the `@seed-design/mcp` **Figma MCP server** (a REST API + PAT route and a WebSocket +
  plugin route), a Figma Community **codegen plugin**
  (https://www.figma.com/community/plugin/1496384010980477154), and
  `react/developer-tools/figma-integration/codegen`.
  As the PAT scope list shows (`library_assets:read`, `team_library_content:read` and so on),
  **the team library presupposes Karrot's internal files** and is not published.
  → **No public Figma kit; only Figma→code automation is public** (classified C).
  Renders checked: https://seed-design.io/get-started ·
  https://seed-design.io/ai-integration/figma-mcp (2026-08-18)
- **Open questions:** the actual colour values, ~~the component list~~ (resolved 2026-08-18 —
  92 recipes: accordion · action-button · app-bar · bottom-sheet · callout · chip · dialog ·
  fab · manner-temp (a Karrot-specific domain concept) · pull-to-refresh · snackbar ·
  wheel-picker and others), and v2's semantic colour system (only the names are confirmed,
  such as `--seed-color-bg-brand-solid`)
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github daangn/seed-design →
  `LICENSE` (matching the npm metadata for `@seed-design/stylesheet@1.1.2`)
