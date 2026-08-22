---
name: Orbit
org: Kiwi.com
coverage: full
url: https://orbit.kiwi
repo: https://github.com/kiwicom/orbit
license: MIT
tech: [React]
figma_kit: unverified
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @kiwicom/orbit-design-tokens@11.0.0 → dist/index.js · npm @kiwicom/orbit-components@27.7.0 (components, 2026-08-18 — pinned to the stable release, as the newer 27.7.1-alpha.0 is a pre-release)"
---
<!-- lang-links -->
> **English** · [한국어](orbit.ko.md)
<!-- /lang-links -->

## In one line

Kiwi.com's design system for its travel search and booking service.
**It keeps control sizes on a scale separate from spacing.**

## Tokens

### Spacing

| token | value |
|------|-----|
| `space.50` | 2px |
| `space.100` | 4px |
| `space.150` | 6px |
| `space.200` | 8px |
| `space.300` | 12px |
| `space.400` | 16px |
| `space.500` | 20px |
| `space.600` | 24px |
| `space.700` | 28px |
| `space.800` | 32px |
| `space.1000` | 40px |
| `space.1200` | 48px |
| `space.1300` | **52px** |
| `space.1600` | 64px |

The number in the name is **a multiple based on 4px** (`space.400` = 16px) — the same
approach as Polaris.

**There is a 52px.** It sits between 48 and 64, a multiple of 4 but not of 8.
Orbit, Gestalt and Paste are the three systems in the sample that have 52px.

### Control sizes — a separate scale

There is a `size` scale kept apart from spacing.

| token | value |
|------|-----|
| `size.small` | 16px |
| `size.medium` | 24px |
| `size.large` | 32px |
| `size.extraLarge` | **44px** |
| `size.extraExtraLarge` | **52px** |

**44px and 52px appear in a way the spacing scale does not provide** (44 is absent from
space; 52 is present). 44px is widely used as the recommended minimum touch target, but the
source records no rationale.

### Radius

| token | value |
|------|-----|
| `borderRadius.none` | 0 |
| `borderRadius.50` | 2px |
| `borderRadius.100` | 4px |
| `borderRadius.150` | 6px |
| `borderRadius.200` | 8px |
| `borderRadius.300` | 12px |
| `borderRadius.400` | 16px |
| `borderRadius.full` | 9999px |

**It uses the same numbering system as spacing** (`400` = 16px on both sides).
The result is the same as Polaris deriving both from one `size` map, except Orbit keeps them
as separate objects and matched the values.

### Typography / colour

Unverified. Colour has **a ten-step structure per hue** — `dark` / `darkActive` /
`darkHover` / `darker` / `light` / `lightActive` / `lightHover` / `normal` / `normalActive` /
`normalHover`. The hue families confirmed include blue · green · ink · cloud · bundle.

`elevations` · `boxShadow` · `breakpoint` · `fontSize` · `fontWeight` · `fontFamily`
objects ship alongside.

### A theme-generation API

It exports the functions `createTheme` · `createTokens` · `getTokens` · `getCssVars`,
along with colour-conversion utilities (`convertHexToRgba` · `convertRgbaToHex` · `isHex` ·
`isRgb`).

**The token package carries not just values but the theme-generation logic.**

## Components

~~Unverified~~ → **form control heights obtained (2026-08-17,
`@kiwicom/orbit-design-tokens@11.0.0` dist).**

```
formBoxSmallHeight  = size.large           = 32px
formBoxNormalHeight = size.extraLarge      = 44px   ← the default
formBoxLargeHeight  = size.extraExtraLarge = 52px
```

**The default form height is 44px** — where most desktop web systems cluster at 30–36px,
Orbit **meets Apple's touch target (44pt) from the default value onward.** A sample in which
the weight of mobile web in travel B2C is reflected straight into the values (crossing
`patterns/button.md` — in contrast to the three frameworks that "all fail to meet 44–48 by
default"). The size scale (16/24/32/44/52) doubles as the control-height scale.

→ Buttons, inputs and modals are measured in the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Measured from the lib build of `@kiwicom/orbit-components@27.7.0`, the dist of
`@kiwicom/orbit-design-tokens@11.0.0`, and `@kiwicom/orbit-tailwind-preset@7.4.0`.

**v27 is Tailwind classes, not styled-components** — HARVESTING.md's note about the
"emotion/styled-components family" refers to the earlier generation; the current build is
utility strings of the form `h-form-box-normal px-button-padding-md`.
The values are injected from the token package by the preset (`orbit-tailwind-preset`).
That said, older helpers that read `theme.orbit.*` (`getSizeToken.js` and others)
**coexist** in the same build — the two layers' values were confirmed to agree.

### Buttons (`Button` / `ButtonPrimitive`)

| | small | normal | large |
|---|:--:|:--:|:--:|
| **height** | 32px | **44px** | 52px |
| type | 13px | 15px | 16px |
| inline padding (text only) | 12px | 16px | 28px |
| padding on the icon side | 8px | 12px | 16px |
| radius | 8px | 8px | **12px** |

- The height = `formBox*Height` = the size scale (32/44/52) directly. It is a fixed `height`
  (unlike Backpack's min-height). **No minimum width** (`min-width` appears zero times).
- The weight is a fixed **500** (`font-medium`) at every size, with `leading-none`.
- **Only the side with an icon loses a step of padding** — with a leading icon, only
  `ps` (the start) shrinks. Icon-only buttons have zero padding and **a width equal to the
  height**, a square.
- **Only large grows its radius, 8→12px** — the same decision Backpack makes on large inputs
  (8→12), Orbit makes on buttons.
- Nine variants: primary · secondary · critical · white plus primarySubtle · criticalSubtle
  plus **bundleBasic · bundleMedium · bundleTop** — the last three being gradient buttons for
  Kiwi.com's bundle product tiers. A sample of a domain's product hierarchy entering the
  button variants directly (a layer Backpack does not have).

### Inputs (`InputField`)

| | one size |
|---|:--:|
| **height** | **44px** (`h-form-box-normal`) |
| inline padding | 12px (`formElementNormalPadding` = `0 space300`) |
| type | **16px** (`formElementLargeFontSize` = fontSize.large) |
| radius | 8px |
| border | none — **an inset box-shadow `0 0 0 1px` in cloud.dark** |

- **There are no size variants** — the button has three steps while the input is a single
  44px. The token `formBoxSmallHeight` (32) exists, but InputField has no size prop at all.
- **The input type is 16px** — larger than the body (15px). A value consistent with iOS
  Safari auto-zooming on inputs below 16px (in keeping with the weight of mobile web).
- The visual box is drawn not by the input but by **an absolutely positioned `fake-input`
  overlay div** (shadow, radius and transitions all). The input itself is transparent — a
  structure that lets hover and error state transitions be handled by adjacent-sibling
  selectors.
- The label is a separate block (`FormLabel`): 15px / 500, with 4px below (`mb-100`).
  Not floating — the same camp as Backpack, the opposite pole from MUI.
- Focus: a blue 2px outline (`peer-focus:outline-blue-normal`).

### Modals (`Modal`)

| step | extraSmall | small | normal | large | extraLarge |
|------|:--:|:--:|:--:|:--:|:--:|
| max-width | 360px | 540px | **740px** | 900px | 1280px |

- **The third sample in the five-step-px camp** (crossing `patterns/modal.md` —
  Mantine 320–780 · Cloudscape 320–1280). The 1280 ceiling matches Cloudscape's, and the
  default of 740 is far wider than Mantine's (440) or shadcn's (512).
- Radius **16px** (`modalBorderRadius` — the same value as borderRadius.400).
- **On mobile (<576px, `lm`) it is a bottom sheet**: a `top-full → top-800` (32px) slide,
  `duration-normal` (300ms) with `ease-in-out`, and a `black/50` scrim.
  On desktop it is centred and **has no slide animation** — an asymmetry that gives the
  entrance motion to mobile alone.
- Section padding: `24px/16px` on mobile (py-600 px-400) → **32px** on desktop (p-800).
  The footer scales the same way, 16→32px.

### Easings — confirmed to have no tokens (clearing the patterns/motion.md backlog)

- Across the whole dist of `@kiwicom/orbit-design-tokens@11.0.0`, `easing` and `cubic-bezier`
  appear **zero times**. The only motion tokens are three durations
  (`durationFast/Normal/Slow` = 0.15/0.3/0.4s).
- `orbit-tailwind-preset@7.4.0` overrides only `transitionDuration` with tokens and
  **leaves `transitionTimingFunction` alone** — Tailwind's defaults remain.
- The literal distribution at the component layer (27.7.0 lib): **`ease-in-out` 52 times ·
  `ease-linear` once · `ease-in`/`ease-out`/arbitrary values zero.** Effectively a single
  curve — and Tailwind's `ease-in-out` = `cubic-bezier(0.4, 0, 0.2, 1)`, **the same value as
  the Material standard curve.**
- The contrast with Backpack is sharp: neither tokenises its easings, but Backpack has
  Material curves **drifting in by hand** (three mixed), while Orbit has **converged on a
  single curve** through the framework's default — the two possible endings for a system that
  never tokenised its easings.

### Characteristic decisions (from the deep pass)

- **Three button steps vs a single 44px input** — the size choice removed from the input
- **Input type at 16px > body at 15px** — matching the iOS auto-zoom threshold
- **Bundle product tiers as button variants** (bundleBasic/Medium/Top) — a sample of the
  domain penetrating the API
- **Five modal steps, 360–1280, defaulting to 740** — the largest default in the multi-step-px
  camp
- **Entrance motion on mobile only** — the desktop modal has no animation
- **A styled-components → Tailwind transition period** — the older theme helpers and utility
  classes coexisting in one build

## Characteristic decisions

- **Control sizes are separated from spacing.** A five-step `size` scale exists in its own
  right; most systems take control heights from the spacing scale.
- **It uses 52px**, present in both spacing and control sizes.
- **Colour runs ten steps per hue.** Around a `normal` base it keeps `Active` and `Hover`
  variants at each lightness step — resolving per-state colour in the tokens, the same
  purpose as Material 3's State Layer by a different implementation.
- **Radius uses the same numbering as spacing.** `400` is 16px in both.
- **The theme-generation functions live in the token package** — values and logic ship
  together.
- **The tokens are JS objects.** There is no `.json` or `.css`, so a static scanner will not
  find them.

## Accessibility

Unverified.

## References

- Repository: https://github.com/kiwicom/orbit
- Package: `@kiwicom/orbit-design-tokens`
- **Note:** the tokens exist only as JS objects in `dist/index.js` (`var space = {...}`).
  The same form as Base Web, so the file has to be opened directly.
- Components in depth (2026-08-18): `@kiwicom/orbit-components@27.7.0` →
  `lib/primitives/ButtonPrimitive/sizes.js` · `lib/InputField/index.js` ·
  `lib/Modal/index.js` · `lib/tailwind.css`, plus
  `@kiwicom/orbit-tailwind-preset@7.4.0` → `dist/index.cjs` (the class→token mapping) and
  `@kiwicom/orbit-design-tokens@11.0.0` → `dist/index.js` (the real values)
- **Licence resolved (2026-08-18):** `MIT` — source: github kiwicom/orbit → `LICENSE`
  (matching the npm metadata for `@kiwicom/orbit-design-tokens@11.0.0`)
