---
name: Clarity Design System
org: VMware
coverage: partial
url: https://clarity.design
repo: https://github.com/vmware-clarity/core
license: MIT
tech: [Web Components, Angular, React]
figma_kit: false
tokens_format: [CSS]
a11y_target: "Confirmed to state none (2026-08-18 — the documentation says only 'WCAG-informed', with no version or level target)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @cds/core@6.17.0 → global.css, styles/theme.{dark,high-contrast,low-motion}.css"
---
<!-- lang-links -->
> **English** · [한국어](clarity.ko.md)
<!-- /lang-links -->

## In one line

VMware's system — it **ships reduced motion as a theme file** (`theme.low-motion.css`),
**switches to CSS system colours (`Canvas`, `CanvasText`) in the high-contrast theme**, and
its spacing and typography are all **`calc(n × an internal multiplier)`**.

## Accessibility — the themes are a three-way axis

```
styles/theme.dark.css          — dark
styles/theme.high-contrast.css — high contrast (plus forced-colors support)
styles/theme.low-motion.css    — reduced motion
```

- **The only sample that ships reduced motion as a separate theme file.**
  Most handle it inside a `prefers-reduced-motion` media query (Cloudscape zeroes its
  durations, Spindle disables its View Transition); Clarity puts it **at the same level as
  swapping a theme**
- **The high-contrast theme uses CSS system colours such as `Canvas`/`CanvasText`** —
  handing the values over to the OS's forced-colors mode.
  A choice to abandon the brand colours and follow the OS setting, unique in the sample
- Dark and high contrast override the same alias tokens
  (`--cds-alias-object-app-background`) with different values — the separate-theme-file camp

## Tokens — all `calc()` multiplications

```css
--cds-global-space-3:  calc(4 * var(--cds-internal-scale-2));   /* 4 units */
--cds-global-space-9?: … space-1(1) 2 4 6 8 12 16 24 32 36 48 64 72 96
--cds-global-typography-font-size-4: calc(14 * var(--cds-internal-scale-3));
```

- **Every dimension is a product with an internal multiplier variable** — one multiplier
  rescales the whole system. **The most thorough form** of the runtime-multiplier camp
  (Mantine, Radix, Vapor, Ring UI, Stacks), and using **different multiplier variables** for
  spacing and typography (`scale-2` / `scale-3`) is unique in the sample
- The spacing steps `1 · 2 · 4 · 6 · 8 · 12 · 16 · 24 · 32 · 36 · 48 · 64 · 72 · 96` —
  including 36, and respecting the core
- Font sizes **10 · 11 · 12 · 13 · 14 · 16 · 20 · 24 …** — including 13px (the same value as
  Stacks), with the lower range dense at 1px steps

## Components in depth — (2026-08-18)

Parsed from the per-component style modules of `@cds/core@6.17.0`
(`button/button.element.scss.js` · `input/input.element.scss.js` ·
`modal/modal.element.scss.js` · `internal-components/overlay/overlay.element.scss.js`)
plus the animation definitions in `internal/motion/`. Being Lit `css` template strings, the
CSS reads straight out of the build artefact (the same technique as the CSS-in-JS section of
HARVESTING.md).

> **A note on units.** The numbers below are the tokens' coefficients. The real values are
> all `coefficient × (1rem / --cds-global-base)`, and since base defaults to **20**,
> **the coefficient is the px value under a 20px (125%) root.**
> At the usual 16px root everything renders at ×0.8. A `[cds-base-font="16"]` attribute in
> global.css switches base to 16.

### Buttons (`cds-button`)

| | default | sm |
|---|:--:|:--:|
| **height (fixed)** | **36** | **25** (= space-9 24 + space-1 1) |
| padding | 12 − border (1) = 11 | 6 block / 12 inline |
| **min-width** | **64** (space-13) | — |
| radius / border | 4 / 1 | same |
| type | **12 · 600 · uppercase · tracking 0.12em** | same |

- **uppercase plus 0.12em tracking** — the same uppercase camp as MUI (uppercase, 0.02857em),
  but with more than four times the tracking. A composition that opens up 12px type with
  tracking so it reads.
- **min-width 64** — the same number as MUI. (The "zero samples with an absolute min-width"
  in patterns/button.md refers to documentation-layer guidance — at the code layer MUI,
  Clarity and Fluent all set absolutes.)
- The sm height of 25 = 24+1 — an odd height built from the sum of two space tokens.
- The background sits not on the element but on **an `::after` pseudo-element (inset −1,
  z-index:−1)**, and hover and focus on outline/inverse are handled by that layer's
  `opacity: .1`.
- The padding's border subtraction (12−1) is in the code as a `calc()` — the same technique
  as MUI, Codex and Grommet.

### Inputs (`cds-input`) — an underline by default

| | value |
|---|---|
| form | **border 0 plus a 1 border-bottom, radius 0** |
| height | the input element's height = line-height = **24** (+ the 1 underline = 25) |
| padding | `2 6 0 6` |
| type | **13** (font-size-3) |
| focus | a gradient **`background-size` sweep, 0%→100%, 0.2s ease** (`duration-quick`) |

- **Not a box but an underline of the Material lineage.** On focus the blue underline fills
  not by spreading from the centre but **by sweeping horizontally** — drawn as a
  `background-size` transition on a `linear-gradient` (the same technique as Backpack's
  background-size underline, applied to input focus rather than links).
- **An input height of 25 = the sm button's height of 25** — an odd height aligning across
  components.
- The label is a separate block — **13 · 400** — and the default layout is horizontal (the
  label to the left), with the label's max width = the control's default width = **192**
  (= layout-space-xxxl 64 × 3).

### Modals (`cds-modal`) — every width step a multiple of one space token

| size | width | formula |
|---|:--:|---|
| sm | 288 | **4 × space-14 (72)** |
| default | 576 | **8 × 72** |
| lg | 864 | **12 × 72** |
| xl | 1152 | **16 × 72** |

- **The width scale derives from the single `--cds-global-space-14` (72) at 4, 8, 12 and 16
  times.** Neither the dedicated-width-token camp (Cloudscape) nor the reused-breakpoint camp
  (MUI) but **multiples of a spacing token.**
- Body max-height **70vh** (55vh in landscape tablet) · full-screen with radius 0 at
  ≤**576px** — the default modal width (576) and the full-screen breakpoint (576px) are the
  same number (the same pattern as Backpack's "modal width = the 32rem breakpoint").
- Radius 4 / border 1 / backdrop rgba(0,0,0,0.6).
- Animation (WAAPI — not CSS transitions; the `internal/motion` runner reads its options from
  CSS custom properties): enter = the backdrop fading over **0.5s** (`duration-slow`) plus the
  dialog fading and sliding (translateY −15rem→0) over **0.4s** (`duration-primary`); exit
  **0.3s** (`duration-secondary`) — enter > exit, joining the majority pattern in
  patterns/modal.md. The fallback when undefined is 300ms linear.
- The easing `easing-primary` = **cubic-bezier(0, 0.99, 0, 0.99)** — an extreme deceleration
  curve that effectively arrives instantly and then settles.
  `easing-secondary` = cubic-bezier(0, 1.5, **0.5, 1**) — an overshooting curve with y = 1.5
  (the same axis as TDS's `back` and Seed's overshoot family).

### The internal multipliers and motion tokens — clearing the backlog

- **What the internal multiplier actually is**:
  `--cds-internal-scale-N = (1rem / base) × the user multiplier`.
  base defaults to **20**, and the user multiplier (`--cds-global-scale-*`) defaults to **1**.
- There are **three** multiplier axes, not two — `scale-1` (layout-space) ·
  `scale-2` (space) · `scale-3` (typography). The token section's observation of "two" stands,
  but there is one more, for layout.
- Nine duration tokens: instant 0 / quickest 0.1 / quicker 0.15 / quick 0.2 /
  secondary 0.3 / primary 0.4 / slow 0.5 / slower 0.7 / slowest 0.8s.
- **What the low-motion theme actually does**: the fast durations (quickest–primary) go to
  **0**, and the slow ones (slow–slowest) are **stretched wholesale to 2s** — transitions are
  switched off, while loops (spinners and the like) are **slowed down** rather than stopped.
  A two-way treatment.

### Characteristic decisions (from the deep pass)

- **Modal width = a space token (72) × 4/8/12/16** — a third way of deriving a width scale
- **Buttons uppercase with 0.12em tracking** — the widest tracking in the uppercase camp
- **An underline input with a background-size sweep focus**
- **The sm button and the input aligned at an odd height of 25**
- **low-motion splitting "off" from "slower"**
- Asymmetric 0.4s enter / 0.3s exit plus an extreme deceleration easing (0,.99,0,.99)

## Characteristic decisions

- **A reduced-motion theme file** — unique in the sample
- **CSS system colours in high contrast (forced-colors)** — unique in the sample
- Two multiplier variables per dimension axis (`scale-2`/`scale-3`) — unique in the sample
- Every token a `calc()` product — the widest application of runtime multipliers
- Font sizes 10–13 in 1px steps

## Accessibility

- A high-contrast theme plus forced-colors system-colour support
- A reduced-motion theme
- ~~The WCAG target figure is unverified~~ → **confirmed absent (2026-08-18, headless render).**

### The WCAG target is absent — confirmed by render (2026-08-18)

Even when rendered, Clarity **does not publish a WCAG target (version or level).**

- https://clarity.design/ — the accessibility card reads only
  "Follow our **WCAG-informed** accessibility guidelines to ensure your
  application is inclusive and usable for all."
  **"WCAG-informed" (referenced), not "conformant".**
- https://clarity.design/pages/accessibility — the body is not a target declaration but
  **two pieces of practical guidance for the application side.**
  - **ARIA Live Region:** "Clarity components will not make any announcements
    out of the box." — it states flatly that live-region announcements must be coordinated by
    **the application, not the components**, through a single `aria-live` region, and
    recommends `@angular/cdk`'s `LiveAnnouncer`. The one exception is `clr-accordion`
    announcing error states, described as something "to be fixed in a future version".
  - **The autocomplete attribute:** because `clr-date-container`, `clr-password-container`,
    `clr-input-container` and the rest receive their `input` element **by projection from
    outside**, setting `autocomplete` is the application's responsibility.
  - The external links cited are W3C's `aria-live`, MDN, WHATWG and **W3C WCAG21 technique
    H98** — links to technique documents, not a conformance declaration.
- The opening sentence narrows the scope itself: "Clarity tries to cover as many best
  practices for accessibility out of the box. However, some things are too
  application-specific for Clarity to provide."

**Classified C, confirmed** — the *implementation* is there (high-contrast and reduced-motion
themes), but the system does not publish a *target figure.*

### Figma kit absent — confirmed by render (2026-08-18)

This is the basis for `figma_kit: false`. Rendering the documentation site yields
**the string `figma` zero times** (across the root, `/pages/accessibility` and
`/pages/designing`). What the designer-asset page
(https://clarity.design/pages/designing) offers is just two things —
**the Metropolis font files** and **a zip of icon SVGs.**
The substance behind "Clarity provides assets that help designers get started" is
**fonts and icon sources**, not a component library.

## References

- Tokens: `npm pack @cds/core@6.17.0` → `global.css`, `styles/theme.*.css`
- Components in depth: `*/**.element.scss.js` plus `internal/motion/` from the same package
  (2026-08-18)
- **Open questions:** ~~the internal multipliers' defaults~~ ~~the component list~~ (resolved
  2026-08-18 — base 20, multiplier 1 and the three axes are in the deep pass; the components
  are the roughly 35 elements at the package's top level: accordion · alert · badge ·
  breadcrumb · five buttons (action/expand/handle/inline/sort) · card · checkbox · datalist ·
  date · divider · dropdown · file · forms · grid · icon · input · list · modal · navigation ·
  pagination · password · progress-circle · radio · range · search · select ·
  selection-panels · signpost · table · tag · textarea · time · toggle · tree-view),
  the full colour palette values (`construction` is confirmed as a blue-grey neutral family —
  100 `#e3eaed` · 600 `#4f6169` · 900 `#21333b` and so on), and the accessibility target
  figure
