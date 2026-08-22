---
name: Cedar
org: REI
coverage: partial
url: https://cedar.rei.com
repo: https://github.com/rei/rei-cedar
license: code: MIT, tokens: ISC
tech: [Vue]
figma_kit: true
tokens_format: [SCSS, CSS, JS, JSON, iOS, Android, Figma]
a11y_target: "WCAG 2.2 AA (stated — confirmed 2026-08-18)"
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @rei/cdr-tokens@14.0.2 → dist/{rei-dot-com,docsite}/scss/foundations/*.scss · npm @rei/cedar@17.1.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](cedar.ko.md)
<!-- /lang-links -->

## In one line

REI's system (outdoor retail). Spacing is named as **fractions and multiples of a base unit
`x`**, insets come in **`squish` and `stretch` variants**, and the tokens ship as
**two builds, one per site**.

## Tokens

### Spacing — fractions and multiples of `x`

```scss
$cdr-space-eighth-x:         0.2rem;
$cdr-space-half-x:           0.8rem;
$cdr-space-one-x:            1.6rem;   // the base unit
$cdr-space-one-and-a-half-x: 2.4rem;
$cdr-space-two-x:            3.2rem;
$cdr-space-three-x:          4.8rem;
$cdr-space-four-x:           6.4rem;
```

**The names are prose** — `one-and-a-half-x`. The only case in the sample of spelling
multiples out in English ordinals (where Polaris writes `space-150` and USWDS `"105"` for the
same 1.5×).

Because the values are of the `1.6rem` family, **a 10px root convention gives
2/8/16/24/32/48/64px** —
~~the token package declares no root, so **the px conversion is undetermined**. It may be the
second system after KRDS to use a 62.5% root, but that could not be confirmed from the
source.~~
→ **Resolved (2026-08-18):** `cdr-reset.css` in the component package `@rei/cedar@17.1.0`
declares `html{font-size:10px}` — a **literal 10px**, not 62.5%.
The px conversion is settled: one-x = 16px.

### inset — `squish` / `stretch` variants

```scss
$cdr-space-inset-eighth-x:         0.2rem;           // even on all sides
$cdr-space-inset-eighth-x-squish:  0 0.2rem;         // 0 vertically
$cdr-space-inset-eighth-x-stretch: 0.4rem 0.2rem;    // twice vertically
```

**Padding combinations are tokenised in three forms** — even / squish (vertically reduced) /
stretch (vertically expanded). Each form also has `-top-bottom` and `-left-right`
decomposition tokens.

The problem Cloudscape solves with per-component horizontal and vertical tokens
(`space-button-horizontal/vertical`), Cedar solves with **a general-purpose inset grammar** —
unique in the sample.

### Shadow — `prominence`, decomposed into parts

```scss
$cdr-prominence-elevated: 0 0.4rem 0.4rem 0 rgba(46,46,43,0.2);
$cdr-prominence-elevated-x / -y / -blur / -spread / -color   // per-part tokens
```

The names are of the `flat` / `raised` / `elevated` / `floating` family, and
**the composed value ships alongside x, y, blur, spread and colour part tokens.**
The same structure as Material 3's parallel composite and individual type tokens, applied to
shadow.
The shadow colour is identical at every step (`rgba(46,46,43,0.2)`) — a **warm grey**, not
pure black.

### Distribution — two sites × eight platforms

```
dist/rei-dot-com/   dist/docsite/     ← a build per site
  css scss js json ios android figma types
```

**`rei-dot-com` (production) and `docsite` (the documentation site) each get a full build.**
The per-component token JSON (`cdr-tab.json` and so on) exists on both sides, with identical
listings. Cedar is the only system in the sample that splits its token builds by consuming
site.

**iOS, Android and Figma builds ship together** — cross-platform tokens of the Paste,
Material 3 and Thumbprint family, and Atlassian (figma/*.json) and Cedar are the two that
include a Figma build.

## Components

Confirmed to exist through the per-component token JSON: tab · link · toggle-button ·
message · table and others.
~~Dimensions unverified.~~ → see the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Measured from `dist/style/cdr-{button,input,modal}.css` in `@rei/cedar@17.1.0` (the Vue
component package). The px conversions use `html{font-size:10px}` from the same package's
`cdr-reset.css`.

### Buttons (`cdr-button`)

| | small | medium (default) | large |
|---|:--:|:--:|:--:|
| padding | 6×12 | 8×16 | 12×24 |
| type | 14/18 | 16/22 | 16/22 |
| **derived height** | **30px** | **38px** | **46px** |

- No height is declared; it derives from line height plus padding to 30/38/46px — a constant
  difference of 8, but **none of them a multiple of 8**. Only the icon-only button lands on
  an integer grid, at 8+24+8 = **40px**. **There is no min-width.**
- Radius 4px (`$cdr-radius-softer`), weight 500, tracking −0.08px.
- **The border is an `inset box-shadow 0.1rem`** — `border:none`. The same technique as
  Ring UI (the second observation of it in the same day's deep pass).
- **The class names carry the package version as a suffix** — `.cdr-button--large_17-1-0`.
  Every class on every component bears a version stamp, so **two different versions can
  coexist on one page without their CSS colliding.**
- **The size prop accepts breakpoint combinations** — `small@xs`, `medium@md` and so on.
  All the classes for three sizes × four breakpoints (@xs/@sm/@md/@lg) are precompiled.
- Transition 0.2s `cubic-bezier(0.15, 0, 0.15, 0)` = `$cdr-timing-function-ease` plus
  `$cdr-duration-2-x` — the duration tokens too run `1-x`–`6-x` (100–600ms), the same
  **x naming** as spacing. There are only two easings (including
  `ease-out: cubic-bezier(0.32, 0.94, 0.60, 1)`).

### Inputs (`cdr-input`)

| | default | large |
|---|:--:|:--:|
| **height** | **a fixed 40px** | 48px |
| padding | 8px | 8px on the left |
| type | 16/22 · 500 | 18/32 |
| radius | 4px | 4px |

- **The button derives 38px while the input is fixed at 40px** — set the two default sizes
  side by side and they are 2px out (in contrast to Backpack's shared 36/48 alignment).
- The border is again an `inset box-shadow 0.1rem` — the same technique as the button.
- The background is `#f7f5f326` — **a sand tint with alpha** (unlike the white/transparent
  convention).
- The label is a separate block (`cdr-label-standalone`) — 14/18 · 400. Helper text in the
  same face and grey occupies two positions, above (2px under the label) and below (4px
  under the input).

### Modals (`cdr-modal`)

| item | value |
|------|-----|
| width | **a single max-width of 640px** (full-screen on mobile) |
| radius | 4px |
| shadow | `0 16px 16px rgba(46,46,43,0.2)` — warm grey |
| overlay | **a `#f7f5f3d9` light scrim plus a 16px backdrop blur** |
| animation | **a two-stage fade sequence** — overlay 0.15s → content 0.15s (with a 0.15s delay) |

- **The scrim is not black but a light sand colour** (#F7F5F3 at 85% alpha), overlaid with
  `backdrop-filter: blur(1.6rem)` — the opposite direction from this deep pass's other
  samples (Backpack `rgba(0,0,0,.7)` · Ring UI black at 0.4/0.7 · F36 navy at 0.75).
- **The entrance is staggered** — the overlay appears first and the content fades in 0.15s
  later. Closing reverses the order (content first), with visibility and z-index switching
  at the 0.3s mark.
- The title is set in **the Stuart serif** at 24/30 — a two-typeface composition against the
  Graphik sans body.
- Content padding 24px (16 on mobile), 16px below the header, z-index hardcoded to **9999**.

### Characteristic decisions (from the deep pass)

- **Version-stamped class names** (`_17-1-0`) — CSS isolation allowing versions to coexist
- **Breakpoint syntax in the size prop** (`small@md`) — responsive size variants precompiled
- **A light scrim plus blur** on the modal overlay — the reverse of the black-scrim
  convention
- A **two-stage staggered** modal fade (opening: overlay→content; closing: the reverse)
- Buttons derived at 30/38/46 vs inputs fixed at 40/48 — two layers that do not align
- A literal `html{font-size:10px}` root — the premise of the token layer's rem conversion
  living in the component package's reset

## Characteristic decisions

- **Prose multiple naming** (`one-and-a-half-x`) — unique in the sample
- **The three-form inset squish/stretch grammar** — padding combinations tokenised
  generically, unique in the sample
- **Shadows shipped decomposed into parts** (x/y/blur/spread/colour individually)
- **Two token builds, one per site** — unique in the sample
- A fixed warm-grey shadow colour — a case of brand tone entering the shadow
- The name `prominence` — a third vocabulary alongside `elevation` (the majority) and
  `shadow`

## Accessibility

~~Unverified.~~ → **WCAG 2.2 Level AA (resolved 2026-08-18).**
Source: `cedar.rei.com/guidelines/accessibility` — "Web Content Accessibility
Guidelines (WCAG) 2.2 Level AA".

## References

- Tokens: `npm pack @rei/cdr-tokens@14.0.2` → `dist/rei-dot-com/scss/foundations/`
- Components in depth: `npm pack @rei/cedar@17.1.0` → `dist/style/cdr-*.css` ·
  `dist/cdr-reset.css` (2026-08-18)
- Licence: `@rei/cedar`'s LICENSE and its `license` field both say **MIT** — reflected in the
  frontmatter (2026-08-18)
- **Open questions:** ~~the root font size (settling the px conversion)~~ (resolved
  2026-08-18 — the literal `html{font-size:10px}` in `cdr-reset.css`), the type and colour
  scales, whether a quarter-x exists, how the docsite build's values differ,
  ~~the licence~~ (MIT)

> Re-verified (2026-08-17): 14.0.1 → 14.0.2 diff — no token values changed (only the italic and strong-weight declarations moved, plus identical tokens added to figma.json).
- **Licence resolved (2026-08-18):** `code: MIT, tokens: ISC` — sources: github rei/rei-cedar → `LICENSE` (MIT) / github rei/rei-cedar-tokens → `LICENSE` (ISC). **The component and token repositories carry different licences.**
