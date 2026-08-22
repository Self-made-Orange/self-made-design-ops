---
name: Odyssey
org: Okta
coverage: partial
url: https://odyssey.okta.com
repo: https://github.com/okta/odyssey
license: Apache-2.0
tech: [React, MUI]
figma_kit: unverified
tokens_format: [SCSS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @okta/odyssey-design-tokens@1.66.1 → dist/index.scss (225 $ variables) · npm @okta/odyssey-react-mui@1.66.1 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](odyssey.ko.md)
<!-- /lang-links -->

## In one line

Okta's system — spacing runs in **sevenths, like `0.28571429rem`**.
It **presupposes a 14px root** (×14 = 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56px);
read at 16px it becomes 4.57px. The **third case** of a mismatched rem basis.

## Tokens — 225 of them

```scss
$spacing-1: 0.28571429rem;  // = 2/7 rem → 4px at a 14px root
$spacing-4: 1.14285714rem;  // = 16/14 rem → 16px
$spacing-9: 4rem;           // 56px
```

- **The denominator is 7** — 4/14 = 2/7. The target values are multiples of 4px while the
  rem notation is based on 14px, so they come out as repeating decimals. After Strapi
  (62.5% → a 10px root) and Stacks (a 13px root), this is the **third system with a
  different rem-root assumption**, and all three assume something different: 10, 13 and 14px
- The resulting scale is `4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56` — **the values themselves
  respect the core**. The names are ordinals, 0–9
- Tracking uses `em` (`letter-spacing-overline: .05em`) — proportional to size

**Recorded as the third case under "when you move a rem" in `GLOSSARY.md`.**
Copying the token values alone puts you 12% off (a 16px basis against 14px).

## Components in depth — (2026-08-18)

`@okta/odyssey-react-mui@1.66.1` — **confirmed to derive from MUI v5** (it depends on
`@mui/material ^5.18.0` and injects components/palette/shape/spacing/typography into
`createTheme()`). What follows records **only the differences from MUI's defaults**.
Token values were resolved from `@okta/odyssey-design-tokens@1.66.1`.

### The 14px root assumption — explicitly confirmed in code (backlog cleared)

- `CssBaseline` forces `html { font-size: calc((14/16)*100%) }` = **87.5%**, the theme's
  `pxToRem = px => px/14`, and the token `TypographySizeBase = 87.5%`.
  The token section's "14px root assumption" is not an inference but **an explicit
  specification in shipped code** — every px conversion below is a real value at a 14px root.
- MUI's `transitions` are **not injected** — enter and exit on Dialog and the rest keep
  MUI's defaults (Fade 225/195ms, `(0.4,0,0.2,1)`).
- `theme.spacing` is not MUI's "8px × multiplier" function but **a 10-element array**
  (Spacing0–9) — `spacing(3)` is 12px, not 24px (an ordinal index).

### Buttons (MuiButton override)

| | small | medium (default) | large | MUI default |
|---|:--:|:--:|:--:|---|
| **height** | **32px** (`Spacing6`) | **40px** (`Spacing7`) | 48px (`Spacing8`) | none (derived 30.75–42.25px) |
| padding block/inline | 8/12px | 12/16px | 16/16px | 6/16px etc. |
| min-width | **unset** | ← | ← | 64px |
| radius | 6px (`BorderRadiusMain`) | ← | ← | 4px |
| type | 14px (1rem)/500/1.2 · Aeonik | ← | ← | 14px/500/1.75 · uppercase |
| transition | **100ms linear** | ← | ← | 250ms `(0.4,0,0.2,1)` |

- **It throws away MUI's derived (fractional) heights and pins the height to spacing
  tokens** — with no height-specific tokens, `Spacing6/7/8` are used as heights directly.
- **The variant axis itself is replaced** — contained/outlined/text are dropped for
  `primary` (default) · secondary · danger · dangerSecondary · floating · floatingAction.
  Uppercase is removed, `disableElevation` is the default, and the `button` typography
  variant is deleted by setting it to `undefined`.
- The transition is **linear over 100ms** — a rare choice in the sample, leaving MUI's
  curve camp.
- Focus: a double ring, `0 0 0 2px white, 0 0 0 4px #546be7`.

### Inputs (MuiInputBase override) — the floating label is abolished

- **MUI's floating label is switched off** — `MuiInputLabel` gets `disableAnimation` plus
  `shrink:false` plus `transform:none/position:initial`, making it **a fixed block label
  above the field**. A case of removing the emblem of the Material lineage (the counterpart
  to the floating-label entry in the MUI document).
- Padding: `calc(Spacing3 − 1px)` = **11px** block / 12px inline — the border-subtracting
  formula (MUI uses a half-pixel 16.5px correction). Instead of the outlined variant's
  fieldset notch it uses **a plain border with a 6px radius**.
- `height:auto` — the derived height is about **40.8px** (14 × 1.2 line height = 16.8, plus
  22, plus 2). No size variants.
- Focus: the border colour plus an overlaid `0 0 0 1px` box-shadow. Transition 100ms.

### Dialogs (MuiDialog override) — the width is measured in characters

- **It does not use width steps** — the paper's `maxWidth: calc(55ch + 64px)`
  (`TypographyLineLengthMax 55ch` plus `Spacing6` × 2). MUI's five steps (xs–xl, i.e. the
  breakpoints) are replaced by **a single ceiling derived from the maximum line length** —
  the only case in the sample of setting modal width in `ch`.
- Radius **12px** (`BorderRadiusOuter` — an outer value twice the 6px inner one), dropping
  to 0 in the compact query.
- Instead of `box-shadow` it uses **three stacked `drop-shadow` filters**.
- Padding: 32px inline in the body (`Spacing6`) · 24px block on the actions (`Spacing5`) ·
  the title renders `h5` (18px) into an `h1` element. Enter and exit inherit MUI's defaults
  of 225/195ms (see above).

### Characteristic decisions (from the deep pass)

- **CssBaseline forces the 14px root** — the rem mismatch is design, not accident
- **Button height = spacing tokens** (32/40/48) — MUI's derived-height policy rejected
- **The floating label removed** — a MUI derivative selectively abolishing Material grammar
- **Dialog width = 55ch** — a width set by typography, unique in the sample
- **A single 100ms linear transition** against MUI's curves and asymmetric durations

## Characteristic decisions

- **A 14px root assumption** — the third mismatched rem basis, with values as repeating
  sevenths
- Converted to px, the core values are respected exactly (4–56)
- Built on MUI (`odyssey-react-mui`) — a corporate system laid over a framework

## Accessibility

Unverified — **the documentation site sits behind a login and cannot be opened even by a
headless render (confirmed 2026-08-18).**

Opening `https://odyssey.okta.com/` headlessly yields not documentation but **an Okta SSO
login screen** (asking you to sign in to your account to access "Supernova SAML" — Okta
FastPass or a username). The documentation is **internal-only, hosted on Supernova**; the
alternative candidate `https://odyssey.okta.design/` shows the same login screen, and
`https://okta.github.io/odyssey/` is a GitHub Pages 404.
Recorded as **the sample where the documentation site itself is behind authentication** —
this is an access-permission problem rather than an SPA-rendering one, so this system's
accessibility target and Figma kit can only be narrowed down from public material (the npm
packages).
URLs checked: https://odyssey.okta.com/ · https://odyssey.okta.design/ ·
https://okta.github.io/odyssey/ (headless render, 2026-08-18)

## References

- Tokens: `npm pack @okta/odyssey-design-tokens@1.66.1` → `dist/index.scss`
- Components in depth: `@okta/odyssey-react-mui@1.66.1` →
  `dist/cjs/theme/{components/{Button,Input,Dialog,CssBaseline},typography,spacing,shape,pxToRem}.cjs`
  plus an execution-time read of `@okta/odyssey-design-tokens@1.66.1` `dist/index.cjs`
  (2026-08-18)
- Documentation site: **authentication required** (Okta SSO / hosted on Supernova) —
  confirmed by headless render 2026-08-18. `figma_kit` and `a11y_target` cannot be resolved
  through the documentation site; the only remaining routes are the npm packages and the
  repository (README, `@okta/odyssey-react-mui` sources)
- ~~The full colour and type sets~~ → **fully resolved (2026-08-18,
  `@okta/odyssey-design-tokens@1.66.1` — 206 tokens in all: Hue 91 · Typography 40 ·
  Palette 36 · Border 15 · Spacing 10 · Focus 7 · Depth 3 · Shadow 2 · Transition 2).**
  - A **13-step** type scale (Scale0–12, 12–51px at a 14px root), 10 text-colour roles, and
    Overline at `0.7142857143rem` (= 10/14 — confirming again how to read the repeating
    decimals)
  - **A single global transition pair, `100ms linear`** — the same minimalist camp as Audi
    (one easing), but more extreme for being linear
  - **`BorderWidthHeavy: 1.5px`** — a non-integer border-width token, unique in the sample
  - `BorderRadiusRound: 1.5em` — an em radius (proportional to type) is also rare
  - **Three Depth steps coexist with two ShadowScale steps** — the values are nearly
    identical, so it reads as a migration in progress (the same type as Atlassian's
    coexisting radius fallbacks)
- ~~The full component list~~ → **confirmed (2026-08-18, measured from
  `@okta/odyssey-react-mui@1.66.1` dist/esm, ≈95)** — Accordion · Autocomplete · Badge ·
  Banner · Breadcrumbs · Callout · Card · DataTable · DatePickers · Dialog · Drawer ·
  EmptyState · the Field family … plus labs (UserProfile and others). The MUI wrapping
  structure is confirmed again.
- **Open questions:**
  the accessibility target and the Figma kit (the documentation site is behind SSO —
  confirmed unresolvable through the npm route),
  ~~whether the 14px root is stated~~ (resolved 2026-08-18 — stated in code as
  CssBaseline `font-size: 87.5%` plus `pxToRem = px/14`; see the deep pass)
