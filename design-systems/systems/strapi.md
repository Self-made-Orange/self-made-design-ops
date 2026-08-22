---
name: Strapi Design System
org: Strapi
coverage: partial
url: https://design-system.strapi.io
repo: https://github.com/strapi/design-system
license: MIT
tech: [React, styled-components]
figma_kit: false
tokens_format: [JS]
a11y_target: null
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @strapi/design-system@2.2.4 → dist (spaces · fontSizes · themes)"
---
<!-- lang-links -->
> **English** · [한국어](strapi.ko.md)
<!-- /lang-links -->

## In one line

The admin-UI system of the headless CMS Strapi — font sizes ship on a **10px-rem
assumption** (`1.4rem` = 14px), and spacing is **an unnamed array** (the Evergreen family).

## Tokens

### Type — the 62.5% trick baked into the token values

```js
fontSizes: ["1.1rem","1.2rem","1.4rem","1.6rem","1.8rem","2rem","2.8rem","3.2rem"]
```

**These are values that assume `html { font-size: 62.5% }` (1rem = 10px)** — the real sizes
are 11/12/14/16/18/20/28/32px. Read at the browser default (16px), the rem values break into
17.6px and the like. **The only sample where a root-redefinition assumption is pinned into
the token values themselves**, and, alongside Stacks (rem in thirteenths), a demonstration
of the "mismatched rem basis" hazard.

### Spacing — an unnamed 12-step array

```js
spaces: ['0px','4px','8px','12px','16px','20px','24px','32px','40px','48px','56px','64px']
```

An array token referenced by index — **the same unnamed-array camp as Evergreen**.
Steps of 4px, then steps of 8px from 32 up; every core value is present.

### Themes

A `lightTheme` / `darkTheme` object pair (the separate-theme-file approach) plus an
`extendTheme` extension function. Button variants use **variant × tone combination names**
like `success-light` and `danger-light`, and there are four sizes: `XS/S/M/L`.

## Components in depth — (2026-08-18)

Parsed from the `dist/index.mjs` bundle of `@strapi/design-system@2.2.4` (the
styled-components template literals survive as plain text). 46 components.
**Every rem below assumes 10px** — the token section's 62.5% trick runs right through the
component dimensions.

### Buttons — the height is a function of the breakpoint

`theme.sizes.button` is not a value but **a responsive map**:

| size | default (mobile) | ≥768px |
|------|:--:|:--:|
| S | 4rem (40px) | 3.2rem (32px) |
| M | 4.4rem (44px) | 3.6rem (36px) |
| L | 4.8rem (48px) | 4rem (40px) |

- **Mobile is 8px larger and desktop shrinks** — touch-first, in an admin UI. A structure in
  which the component-height token itself produces a media query is seen here for the first
  time in the sample.
- Four sizes XS/S/M/L (S by default), a single 4px radius, inline padding `spaces[4]` = 16px,
  gap `spaces[2]` = 8px.
- Eight variants, as variant × tone combinations: default (primary) · secondary · tertiary ·
  ghost · danger · success plus **success-light · danger-light** (a 600 fill against a 100
  background with 700 text).
  The primary fill is `buttonPrimary600` (#4945ff) — **the same value as the palette's
  `primary600`, shipped a second time under a button-specific alias**.
- Transitions: background and text over 120ms easeOutQuad, border over 200ms — and **the
  entire transition declaration sits inside
  `@media (prefers-reduced-motion: no-preference)`**. A guard that puts reduced motion on
  the default side.

### Inputs (TextInput/Field) — the type is responsive too

- Type 1.6rem (16px) → 1.4rem (14px) at ≥768px, line height 2.4rem → 2.2rem —
  **16px on mobile is the iOS focus-zoom convention**, tokenised.
- Derived heights (line height + padding + 1px border × 2): M is **40px on desktop / 50px on
  mobile**, S 32px / 42px. It converges on the same 40/36/32 family as the button.
- The wrapper (`Field`) owns the 1px `neutral200` border and the 4px radius.
  Focus: a `primary600` (#4945ff) border plus **`box-shadow 0 0 0 2px` in the same colour**.
  Errors set both properties to `danger600`.

### Modals — the lightest scrim in the sample

| | Modal | Dialog |
|---|:--:|:--:|
| max-width | **83rem (830px)** | 42rem (420px) |
| radius | 4px | 4px |

- Enter is `modalPopIn`, scale 0.8→1 over **200ms `authenticMotion`** (= Material's
  `(0.4,0,0.2,1)`, shipped under that name); exit is **120ms easeOutQuad** — asymmetric
  enter/exit (the same camp as MUI's 225/195ms).
- **The scrim is `neutral800` (#32324d) at 20%** — built in JS by appending an alpha byte to
  the hex string (`Math.floor(0.2×255).toString(16)`). Against eBay's 0.7 and Vuetify's
  0.32, it is at the lightest end of the sample.
- z-index is a seven-step semantic token set: navigation 100 · overlay 300 · modal 310 ·
  dialog 320 · popover 500 · notification 700 · tooltip 1000.

### 26 easings — a gap between the catalogue and the usage

The whole Penner family (Sine through Back × In/Out/InOut) ships as cubic-beziers, but
**the seven InOut entries (Sine · Quad · Cubic · Quart · Quint · Expo · Circ) hold the same
values as their Out counterparts** (only Back has a true InOut value) — a copy-paste trace
left intact in dist. In practice only easeOutQuad and authenticMotion are used, and there
are just three duration tokens: 120/200/320ms.

### Characteristic decisions (from the deep pass)

- **Button height and input type as functions of the breakpoint** — component dimensions
  tokenised responsively
- **A `neutral800` 20% scrim** — the lightest end of the sample
- 26 easings shipped with seven duplicated InOut values — a sample of an unverified catalogue
- Transitions declared only inside a reduced-motion guard
- The 62.5% rem assumption reaching all the way into the modal width (83rem) — misread, that
  is 1328px

## Characteristic decisions

- **The 10px-rem (62.5%) assumption baked into the token values** — unique in the sample, and
  a hazard when porting
- Unnamed-array spacing — the second in the Evergreen family
- A light/dark theme object pair plus `extendTheme`
- An admin (back-office) domain — the Strapi CMS admin UI

## Accessibility

~~Unverified~~ → **Resolved (2026-08-18, confirmed by headless render).**
**But the target level is confirmed absent.**

Source: https://design-system.strapi.io/iframe.html?id=foundations-accessibility--docs&viewMode=docs
(Storybook docs render inside an iframe, so the body is only readable by opening
`iframe.html?id=…&viewMode=docs` directly.)

- **It never mentions WCAG once.** The rendered page contains the string `WCAG` zero times —
  no version, no level, no contrast figures. **Classified C, confirmed.**
- **It declares an aspiration rather than an achievement** — a rare stance in the sample.
  In its own words: "Its not completely true for now, but it's an objective we're
  aiming for." (the `## An inclusive usability` section)
  Where other systems write "we conform to AA", Strapi writes **"not yet"**.
- It enumerates only the categories of disability addressed — vision · hearing · cognitive ·
  mobility.
- **The only concrete implementation guidance is one line about alternative text**
  (`## Coding standards`): attach alt text to assets that prompt an action or convey
  information, such as links, dropdowns and CTAs.
- **It reduces accessibility to using the components** ("Using our components is a way to
  improve accessibility and consistency") — **offering library adoption as the means**,
  rather than conformance to a specification.
- The closing section asks for error reports: "If we've made any mistakes in this style
  guide, please reach out by creating a GitHub issue."
- For reference, the package does contain accessibility-specific utilities — the Storybook
  index's `utilities-accessible-icon--docs` (AccessibleIcon), plus `FocusTrap`,
  `VisuallyHidden` and `LiveRegions`.

### Figma kit absent — confirmed by render (2026-08-18)

This is the basis for `figma_kit: false`. The Storybook index
(https://design-system.strapi.io/index.json, 285 entries) has no Figma-related entry, and
rendering the Welcome document
(`iframe.html?id=getting-started-welcome--docs&viewMode=docs`) yields the string `figma`
zero times. The sidebar's top level is six groups — Getting Started · Foundations ·
Utilities · Primitives · Inputs · Components — with no design-asset entry.

## References

- Tokens: `npm pack @strapi/design-system@2.2.4`
- Components in depth: parsed from the `dist/index.mjs` bundle of the same package
  (2026-08-18)
- **Open questions:** ~~the colour palette~~ (light-theme values confirmed — primary600
  `#4945ff` · danger600 `#d02b20` · 12 neutral steps from 0 to 1000 plus the
  `buttonPrimary*` aliases), ~~the component list~~ (46), ~~the line-height system~~ (a
  unitless array `[1.14, 1.22, 1.25, 1.33, 1.43, 1.45, 1.5]` — weights are 400/500/600, with
  semiBold = 500), ~~the Figma kit~~ (2026-08-18 render — confirmed absent, section above),
  ~~the accessibility target~~ (confirmed absent, section above)
- Documentation site: https://design-system.strapi.io (Storybook — curl returns an empty
  shell; resolved by headless render. The body is reached via
  `iframe.html?id=…&viewMode=docs`)
