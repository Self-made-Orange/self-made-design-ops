---
name: Vitamin
org: Decathlon
coverage: partial
url: https://www.decathlon.design
repo: https://github.com/Decathlon/vitamin-web
license: Apache-2.0
tech: [CSS, Web Components, React, Vue]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @vtmn/css@3.0.2 → dist/index.css + dist/index-base10.css"
---
<!-- lang-links -->
> **English** · [한국어](vitamin.ko.md)
<!-- /lang-links -->

## In one line

Decathlon's system — it **solves the rem-basis problem by shipping two builds.**
`index.css` (16px root) and `index-base10.css` (10px root) are distributed with different
rem values so they produce **the same px results** — unique in the sample.

## Tokens

### Two rem bases shipped

| Token | `index.css` (16px root) | `index-base10.css` (10px root) | Result |
|-------|:---:|:---:|:---:|
| `--vtmn-spacing_1` | `0.25rem` | `0.4rem` | **4px either way** |

**A separate build for projects that redefine the root font size** (the 10px
convention). Where Strapi (baking a 62.5% premise into the values), Odyssey (a 14px
premise) and Stacks (a 13px basis) **ship one build and leave porting accidents behind**,
Vitamin ships two — **the only structural solution** to the rem trap in `GLOSSARY.md`.

### Scales

```
spacing: 0 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56 · 64 (in rem, ordinal names _0–_10)
radius:  100:4 · 200:8 · 300:12 · 400:16 · 500:20 · 600:24 · 700:32 · 800:48
```

- Spacing is core-compliant (4/8/16/24/32) — ~~nothing above 48~~
  **corrected 2026-08-18: `_8` (48), `_9` (56) and `_10` (64) exist** — re-extracting the
  full `dist/index.css` shows eleven steps (`_0`–`_10`). The original record was cut off
  at `_7`
- **Radii come in eight steps of 100** (including 20). ~~Denser than the spacing (seven
  steps)~~ — with spacing confirmed at eleven steps, that relationship does not hold
  (corrected 2026-08-18)
- Names use an **underscore separator** (`spacing_1`) — unlike the hyphens most of the
  sample uses

## Component deep-dive — (2026-08-18)

Measured from `dist/components.css` (plus `components-base10.css`) in the same
`@vtmn/css@3.0.2`. **The two-build rem approach runs all the way into the component
dimensions** — the same button is `block-size: 3rem` in the `index` build and `4.8rem` in
the `base10` build, recalculated so **both are 48px**.

### Buttons (`vtmn-btn`) — 32/48/64px, stepping evenly by 16px

| | small | medium (default) | large |
|---|:--:|:--:|:--:|
| **block-size** | **2rem (32px)** | **3rem (48px)** | 4rem (64px) |
| Vertical padding | 8px | 14px | 20px |
| Horizontal padding | 16px | 24px | 40px |
| Type | 14px / 700 | 16px / 700 | 20px / 700 |
| Tracking | +0.24px | +0.27px | +0.34px |
| Radius | 4px (`radius_100`) | 4px | 4px |

- **Heights step evenly by 16px, 32 → 48 → 64.** There is no 40px and the default is 48px
  — skipping the 40px convergence camp and taking a touch height as the default. Icon-only
  buttons are squares of the same values (32/48/64).
- **Tracking is a positive fractional value differing per size** (0.015/0.01687/0.02125rem)
  — the opposite direction from Backpack (which tokenises three negative values), and a
  rare place where value precision runs past four decimal places.
- **secondary's outline is an `inset box-shadow 2px` rather than a border** — the same
  "size-invariant outline" technique as USWDS's outline button.
- disabled is an **`opacity: 0.38` token** (`--vtmn-opacity_disabled-state`) rather than a
  colour swap — a Material legacy value that acquired a token name.
- Focus: a double ring `0 0 0 4px + 0 0 0 6px`, with the transition being
  **`--vtmn-transition_focus-visible: box-shadow 200ms ease-out`** — the entire transition
  declaration is a token.
- Seven variants: primary · primary-reversed · secondary · tertiary ·
  **conversion** (a purchase-conversion emphasis colour — the commerce domain in a variant
  name) · ghost · ghost-reversed.

### Inputs (`vtmn-text-input`) — every outline is a box-shadow

| | Value |
|---|-----|
| **min-block-size** | **3rem (48px)** — matching the default button |
| Padding | 12px vertical · 12px left · **36px right** (room for the icon) |
| Radius | 4px |
| Resting outline | `inset box-shadow 1px` (no border property) |
| focus | `inset box-shadow 2px` |
| hover | 1px kept plus an added **outer 3px halo** |

- **It does not use `border` at all** — the resting 1px, the 2px focus, and the 2px
  valid/error states are all inset box-shadows. The only sample to apply the
  don't-shift-dimensions-when-the-width-changes choice across an entire input.
- The label is a fixed block above (4px above the input) and the helper 4px below — no
  floating.
- The error icon is drawn with a **data-URI SVG `mask` plus `background-color`** — an
  improvement on Backpack's position (base64 background), keeping the colour as a token.

### Modals (`vtmn-modal`) — a single 600px width, no entry animation

| | Value |
|---|-----|
| Width | **a single 37.5rem (600px)** (max-block-size 90vh) |
| Radius | 8px (`radius_200`) |
| Padding | 32px |
| Scrim | the inverse background colour (hsl component variables) **at 80%** |
| Entry | **no transition** (shown immediately) |

- **There is only one width step** — the minimum end of the spectrum running through
  Backpack's two, PIE's three and Cloudscape's five. Title 26px/700, body 14px.
- **An 80% scrim is among the densest in the sample** (most run 40–60%). The inverse
  background colour is assembled from hsl component variables, so it inverts automatically
  in dark mode.
- The modal itself has no animation; the system's motion is distributed as
  **`--vtmn-animation_*` shorthand tokens** — an entire declaration like
  `fade-in 200ms ease-in-out forwards` is the token, and
  `--vtmn-animation_overlay` encodes **a fade-in of 0.5s, a 4.5s wait and a fade-out** in
  one token. **The only sample with auto-dismiss timing inside a token**
  (`--vtmn-animation_alert-duration: 7.5s` is separate).

### Notable decisions (deep-dive)

- **The two-build rem approach applied down to component dimensions** (3rem ↔ 4.8rem = the
  same 48px)
- **Buttons at 32/48/64, stepping evenly by 16px** — no 40px, a 48px default
- **Input outlines replaced wholesale by box-shadow** — unique in the sample
- **Animation shorthand tokens with auto-dismiss timing built in** (4.5s/7.5s)
- The `conversion` button variant — commerce vocabulary in a variant name
- disabled at `opacity 0.38` · positive tracking differing per size

## Notable decisions

- **Two builds, one per rem basis** — unique in the sample. The only structural solution to
  the rem porting problem
- ~~Radii (eight steps) denser than spacing (seven)~~ (corrected 2026-08-18 — spacing has
  eleven steps)
- Underscore-separated naming
- CSS-first distribution plus Web Components / React / Vue wrappers

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @vtmn/css@3.0.2` → `dist/index.css`, `dist/index-base10.css`
- Component deep-dive: the same package's `dist/components.css` ·
  `dist/components-base10.css` (2026-08-18)
- Typeface: Roboto (`--vtmn-typo_font-family`)
- **Still to confirm:** the colour palette, the full type scale, dark mode, and an
  exhaustive component list (buttons, inputs, modals, popovers, toasts and alerts were
  measured 2026-08-18)
