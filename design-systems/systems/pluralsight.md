---
name: Pluralsight Design System
org: Pluralsight
coverage: partial
url: https://design-system.pluralsight.com
repo: https://github.com/pluralsight/design-system
license: Apache-2.0
tech: [React, CSS]
figma_kit: true
tokens_format: [CSS, TS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @pluralsight/ps-design-system-core@10.0.4 → src/css/{layers,layout,type}.css · npm button@24.1.2 · textinput@12.1.2 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](pluralsight.ko.md)
<!-- /lang-links -->

## In one line

Pluralsight's (education) system — it calls z-index **`layers` and enumerates them by
screen-region name** (`global-sidenav` 930 / `global-topnav` 950).
**An accessibility element (`skip-to-content-banner` 1600) sits at the top.**

## Tokens

### `layers` — z-index by region name, the seventh scheme

```css
--ps-layers-main: 0;
--ps-layers-global-sidenav: 930;
--ps-layers-global-topnav: 950;
--ps-layers-dropdown: 1000;
--ps-layers-skip-to-content-banner: 1600;
```

- **The seventh system to tokenise z-index, with the seventh scheme**
  (Chakra steps of 100 / Bootstrap the 1000s +5 / Open Props ordinals / Forma 36 10ⁿ /
  Vibes irregular / Solid steps of 100 / **Pluralsight fine placement in units of 10, like
  930 and 950**)
- **930 and 950 leave headroom below 1000** — a gap of 20 between the top nav and the side
  nav, so something can be slotted between them
- **`skip-to-content-banner` (1600) is at the top** — **exactly the same value** as Chakra's
  `skipNav` (1600). Either the two systems independently chose the same number or one
  referenced the other; the source says nothing. That makes two cases of giving a
  skip-to-content link its own layer
- The name is **`layers`** rather than `zIndex` — the same vocabulary as Open Props
  (`--layer-*`)

### Spacing — seven t-shirt steps

```
xxsmall 4 · xsmall 8 · small 12 · medium 16 · large 24 · xlarge 48 · xxLarge 64
```

- **There is no 32px** (24 → 48) — joining the list of 32 exceptions
- **Only `xxLarge` has a capital L** (`xxsmall` through `xlarge` are all lower case) — a
  casing inconsistency left in a token name

### Typography — twelve steps in hundreds, plus `base`

```
100:12 · 200:14 · 300:16 · 400:18 · 500:20 · 600:24 · 700:28 ·
800:34 · 900:40 · 1000:56 · 1100:72 · 1200:88
base: 16px
```

- **The numbers step in hundreds and bear no relation to the values** (`300` is 16px) — an
  ordinal × 100
- **A maximum of 88px** — behind Artsy (102)
- Includes unconventional intermediates like 34px
- `base` is a separate token (16px, the same as 300) — the same family as EUI's mid-scale
  base placement

The typeface is a bespoke `PS TT Commons Roman` with a `Gotham SSm` fallback, and the code
typeface is `DM Mono`.

## Component deep-dive — (2026-08-18)

Components are individual `@pluralsight/ps-design-system-<name>` packages, each distributed
in three layers: **plain CSS (`src/css/index.css`), React, and vars (a TS variant
enumeration)**. Measured from `button@24.1.2` · `textinput@12.1.2` · `dialog@15.0.12` plus
`core@10.0.4`. Each component has its own major version (24 vs 12 vs 15) — **independent
versioning**.

### Buttons — an 8px ladder, tracking inversely proportional to size

| | xSmall | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | **24px** | 32px | 40px | 48px |
| Type | 12px | 14px | 16px | 18px |
| Tracking | +0.025em | +0.025em | +0.01em | 0 |
| Padding | 4/8 | 6/12 | 10/16 | 12/20 |

- Heights 24/32/40/48 — a clean 8px ladder (the opposite pole from HSDS's 5px mixture).
  Radius 3px, weight 500.
- **The tracking is inversely proportional to the size** — the smaller the button, the
  `looser` (+0.025em), with large at 0. The only sample to map its tracking tokens (five
  steps from tighter to looser, plus all-caps) onto the size axis.
- **Pressing shrinks it with `scale(0.98)`** — transform press feedback. Two transition
  speeds: background 200ms / transform **100ms**.
- Four appearances: primary / secondary / stroke (a 2px border) / flat.
- **Every component's CSS carries both `psds-theme--dark` and `--light` classes** — the
  theme is **a dual class distribution** rather than a CSS-variable swap, and dark is the
  default side (a dark UI for an education platform). Focus rings differ by theme too, at
  different blue steps (dark: blue-4 / light: blue-8, `box-shadow 0 0 0 2px`).

### Inputs (textinput) — a 2px radius, and `NaNpx` in the distribution

- Height **40px** (medium) / 32px (small), min-width **192px**, border 1px, radius **2px** —
  **a different radius from the button's (3px)**. Type 14px, with the label as a block
  above at 12px/500.
- The error icon attaches **outside the field to the right** (absolute, `right: −32px`) — a
  placement diverging from the many systems that put icons inside the field.
- **The distributed CSS still contains `padding: 0 NaNpx ...`** (in two places, combining
  small with icon alignment) — a measured trace of a calc formula failing at build time and
  shipping anyway. On small, the icon padding becomes an invalid value.

### Dialogs — a tooltip tail and a modal scrim in one component

- **One component, two roles**: given a `tailPosition` (six directions) it becomes a pointer
  dialog with a **14px rotated square tail**; given `modal` it becomes a centred modal with
  an `rgba(0,0,0,.5)` scrim. The only sample distributing popover and modal as one body.
- **There is no width scale** — `inline-flex` content sizing, with only a modal ceiling of
  `100% − 48px`. The same no-scale camp as Asphalt (fit-content).
- Radius 2px, shadow `0 1px 2px rgba(0,0,0,.5)` — tight and dark.
- Entry: **a fade plus translateY(8px→0) over 200ms ease-out** (keyframes). The close button
  is 32px with an `rgba(0,116,171,.5)` 3px halo on hover.
- Content padding 24px, type 14px/500.

### Motion and typography tokens (obtained in the deep-dive)

- **Five motion steps at ×100 intervals**: xfast 100 / fast 200 / normal 300 / slow 400 /
  xslow 500ms. **There are no easing tokens** — ease-out and the rest are literals.
- The line-height tokens are **four named fixed px**: tight 20 / standard 24 / extra 32 /
  huge 40. A separate axis from the hundreds-based type scale above.
- **The weight token names carry the value itself** —
  `--ps-type-font-weight-500: 500` (500–900) coexisting with two semantic names (default
  400, strong 600). A compromise holding numeric and semantic names in one dictionary.

### Notable decisions (deep-dive)

- **Tracking mapped inversely to button size** — unique in the sample
- **The theme as a dual class distribution** (`psds-theme--dark` / `--light`) — not a
  variable swap
- **A dialog serving as both popover and modal** (a 14px tail ↔ a scrim)
- Button 3px / input and dialog 2px — radii not shared
- A `scale(0.98)` press, five motion steps at ×100 (with no easing tokens)
- **`NaNpx`** in the distributed CSS — a shipping defect caught by measuring the build output

## Notable decisions

- **z-index as `layers`, enumerated by screen region** — the seventh scheme
- **`skip-to-content-banner` at 1600, the same value as Chakra's `skipNav`**
- Fine placement at 930/950, leaving headroom between
- No 32px in the spacing, plus the `xxLarge` casing inconsistency
- Twelve type steps in hundreds plus a separate `base`

## Accessibility

- A dedicated (topmost) z-index layer for the skip link
- Otherwise unverified

## Notes

- Tokens: `npm pack @pluralsight/ps-design-system-core@10.0.4` → `src/css/`
  (`motion.css` and `type.css` were additionally confirmed in the 2026-08-18 deep-dive)
- Components: `@pluralsight/ps-design-system-button@24.1.2` · `-textinput@12.1.2` ·
  `-dialog@15.0.12` → `src/css/index.css` (used in the 2026-08-18 deep-dive)
- **Still to confirm:** the colour palette (`colors.css` unexamined), breakpoints,
  ~~the licence~~ (resolved 2026-08-18 — both the component packages' LICENSE and
  package.json say **Apache-2.0** — reflected in the frontmatter 2026-08-18), and the
  component list
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github pluralsight/design-system
  → redirecting to pluralsight/classic-design-system → `LICENSE` (matching the npm
  `@pluralsight/ps-design-system-core@10.0.4` metadata)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `design-system.pluralsight.com`
  → `figma.com/design/ZmH4XsZS5WnKeo28ylM5x1/Pando-UI-kit-(Web)`
