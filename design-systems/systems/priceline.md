---
name: Priceline Design System
org: Priceline
coverage: partial
url: https://priceline.github.io/design-system
repo: https://github.com/priceline/design-system
license: MIT
tech: [React, styled-system]
figma_kit: unverified
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: commerce
verified: 2026-08-18
source: "npm pcln-design-system@6.29.0 → dist/esm/theme/theme.js"
---
<!-- lang-links -->
> **English** · [한국어](priceline.ko.md)
<!-- /lang-links -->

## In one line

Priceline's system — spacing is **seven steps of pure doubling** (0·4·8·16·32·64·128),
there are only **three radii (0·2·6)**, and the **breakpoints are in `em`**.

## Tokens — unnamed arrays (the styled-system convention)

```js
space      = [0, 4, 8, 16, 32, 64, 128]          // px
fontSizes  = [12, 14, 16, 20, 24, 32, 40, 56, 72]
radii      = [0, 2, 6]
lineHeights = { standard: 1.4, display: 1.25 }
breakpoints = [32, 40, 48, 64, 80].map(n => n + 'em')
```

- **Spacing doubles purely from 4 onward** — 12, 20, 24, 40 and 48 are all absent. It
  begins doubling earlier (at 4) than Thumbprint (after 32) or Mantine (five steps), and
  **doubling across the whole range is unique in the sample**. Intermediate values have
  to be composed
- **Three radii (0/2/6)** — the fewest in the sample. There is no 4px; it goes 2 → 6
- **The breakpoints are in `em`** — 32em (512px) to 80em (1280px). The third unit after
  px (most) and rem (some), and it makes breakpoints respond along with the user's font
  scaling (`em` is parent-relative, so at the root it equals rem)
- Referenced by array index — the **third member of the unnamed-array camp**, with
  Evergreen and Strapi
- Two line heights, `standard` (1.4) and `display` (1.25) — the minimal form of the same
  judgement as Radix Themes separating body from headings
- Separate `duration-100/200` millisecond tokens

## Component deep-dive — (2026-08-18)

Measured from `lib/{Button,Input,Dialog}/*.js` in the same `pcln-design-system@6.29.0`
(the styled-components templates ship as source).

### Buttons — small buttons are pills, large ones are 12px

| | small | medium | large | extraLarge |
|---|:--:|:--:|:--:|:--:|
| Type | 12px | 14px | 16px | 16px |
| Vertical padding | 7px | **9.5px** | 12px | 16px |
| Horizontal padding | 12px | 18px | 22px | 22px |
| Radius | `action-sm` = **9999px** | `action-md` = **9999px** | `action-lg` = 12px | 12px |
| **Derived height** | 32px | **40px** | 48px | 56px |

- **There is an `action-*` semantic alias layer on the radii** (`action-sm/md` = 9999px,
  `action-lg/xl` = 12px) — separate from the raw three steps (0/2/6), a structure that
  **encodes into the token name the decision that shape flips between pill and corner
  depending on size.** So small and medium are pills, large and extraLarge are 12px.
- **The medium vertical padding is a half pixel, 9.5px** — with a line height of 1.5,
  14 × 1.5 = 21px is odd, and this compensates to make the total an integer 40px (the
  same technique as MUI's 8.5/16.5px inputs, here on a button).
- Type is referenced by unnamed array index (`fontSizes.0/1/2`) — the token section's
  array convention runs all the way into the component layer. Weight bold (700), line
  height 1.5.
- `border-width: 0` — the outline variant uses an `inset box-shadow 2px` rather than a
  border.
- **Four sizes** (small–extraLarge) — 32/40/48/56, stepping evenly by 8px.

### Inputs — the vertical padding is asymmetric by 1px

| | sm | md | lg (default) | xl |
|---|:--:|:--:|:--:|:--:|
| Padding (top / bottom) | 6 / **7** | 10 / **11** | 14 / 14 | 18 / **19** |
| Horizontal padding | 12px | 12px | 12px | 12px |

- **The bottom is 1px larger than the top** (only lg is symmetric) — it looks like
  optical compensation, but there is no comment giving a reason. Unlike Helios (with its
  "Figma −1px" comment), this asymmetry is unstated.
- The default type is a **responsive array, `fontSize: [2, null, 1]`** = **16px on
  mobile → 14px on desktop** — iOS auto-zoom prevention built into a prop default (the
  same purpose as Nord's media-query promotion, implemented in the opposite direction).
- Default radius `lg` = 12px (matching the large button), border 1px.

### Dialogs (Radix + motion) — widths reuse the breakpoint family

| size | Width |
|------|-------|
| sm | calc(min(400px, 100vw) − 32px) |
| md (default) | calc(min(**640px**, 100vw) − 32px) |
| lg | calc(min(960px, 100vw) − 32px) |
| xl | calc(min(**1280px**, 100vw) − 32px) plus a fixed height |
| full | 100% × 100% |

- **640 = 40em and 1280 = 80em** — the px conversions of the `em` breakpoints reappear
  as dialog widths (the same reuse as MUI's "width = breakpoint", though only partial).
- Default radius **`2xl` = 24px** — among the more rounded modals in the sample.
- **The scrim is a three-step token**: the same `#001833` base at dark 0.75 / medium 0.5
  / light 0.25 — one of the few samples to expose scrim density as a semantic scale.
- Asymmetric entry and exit: **enter 250ms easeOut** (`scale 0.9→1` plus `y 64→0`) /
  **exit 150ms easeIn** (`y 0→32` — descending only half the distance it came in).
  Implemented with `@radix-ui/react-dialog` plus `motion` (framer-motion's successor)
  12.x.
- The sheet variant is a prop on the same component (`sheet`) — the bottom-sheet entry
  is `y 40%→0`.

### Notable decisions (deep-dive)

- **The `action-*` radius alias layer** — encoding a size→shape policy (pill vs 12px)
  into the token name
- **A 9.5px half-pixel compensation on medium buttons** (rounding the height to 40px)
  versus **a +1px bottom asymmetry on inputs**
- The input's default type as a responsive array (16 mobile / 14 desktop) — iOS zoom
  prevention built in
- Dialog widths reusing the px conversions of the em breakpoints, plus a three-step
  scrim token
- Asymmetric 250ms enter / 150ms exit, with the exit travelling half the distance

## Notable decisions

- **Spacing doubling across its whole range** (4 → 128) — unique in the sample
- **Three radii** — the fewest in the sample
- **`em` breakpoints** — the only sample to use that unit
- Unnamed array tokens (the styled-system convention) — the third instance
- Two line heights (body and display)

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack pcln-design-system@6.29.0` → `dist/esm/theme/theme.js`
- Component deep-dive: the same package's `lib/{Button,Input,Dialog}/*.js` (2026-08-18).
  Of the 84 directories under `lib/`, excluding utilities (theme, utils, stories and so
  on), **about 79 components** were confirmed (Accordion through Tooltip, including the
  Chat* family)
- **Still to confirm:** the colour palette, dark mode, and the reasoning behind choosing
  `em` breakpoints. ~~The component list~~ → resolved by enumerating the directories
  (above)
