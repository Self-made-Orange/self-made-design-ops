---
name: Canvas
org: Workday
coverage: partial
url: https://canvas.workday.com
repo: https://github.com/Workday/canvas-tokens
license: Apache-2.0
tech: [React, CSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: "WCAG 2.1 A/AA (stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @workday/canvas-tokens-web@4.4.0 → css/base/_variables.css · npm @workday/canvas-kit-react@16.0.6 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](canvas.ko.md)
<!-- /lang-links -->

## In one line

Workday's design system for its HR and finance products.
Its distinguishing feature is a scale **exceptionally dense at 2px steps**.

## Tokens

### Size / spacing

| token | rem | px |
|------|-----|-----|
| `--cnvs-base-size-0` | 0 | 0 |
| `--cnvs-base-size-25` | 0.125 | 2 |
| `--cnvs-base-size-50` | 0.25 | 4 |
| `--cnvs-base-size-75` | 0.375 | 6 |
| `--cnvs-base-size-100` | 0.5 | 8 |
| `--cnvs-base-size-125` | 0.625 | 10 |
| `--cnvs-base-size-150` | 0.75 | 12 |
| `--cnvs-base-size-175` | 0.875 | 14 |
| `--cnvs-base-size-200` | 1 | 16 |
| `--cnvs-base-size-225` | 1.125 | 18 |
| `--cnvs-base-size-250` | 1.25 | 20 |
| `--cnvs-base-size-300` | 1.5 | 24 |
| `--cnvs-base-size-350` | 1.75 | 28 |
| `--cnvs-base-size-400` | 2 | 32 |
| `--cnvs-base-size-450` | 2.25 | 36 |
| `--cnvs-base-size-500` | 2.5 | 40 |
| `--cnvs-base-size-600` | 3 | 48 |
| `--cnvs-base-size-700` | 3.5 | 56 |
| `--cnvs-base-size-800` | 4 | 64 |

**The 2–20px range is filled in completely at 2px steps** (2 · 4 · 6 · 8 · 10 · 12 · 14 ·
16 · 18 · 20). After 20px it widens to 4px steps, and after 40px to 8px steps.

### Baseline multiples

The larger values are defined as multiples of the `--cnvs-base-baseline` variable.

```css
--cnvs-base-size-1600: calc(var(--cnvs-base-baseline) * 16.00)
--cnvs-base-size-3200: calc(var(--cnvs-base-baseline) * 32.00)
```

Change the one baseline and the large sizes move with it.

The base font size is `--cnvs-base-font-size: 1rem` (16px).

Source: `@workday/canvas-tokens-web@4.4.0` → `css/base/_variables.css`

### Radius / colour / type

~~Unverified.~~ → **radius resolved (the 2026-08-18 deep pass)** — the shape scale in
`css/legacy/system.css`: sm 4 / md 8 / lg 12 / xl 16 / xxl 24 / xxxl 32px /
**full 65rem (a pill)**.
For type, the deep pass confirmed only subtext.md (12/16), subtext.lg (14/20) and
body.sm (16/24). The full type scale and colour palette remain unverified.

## Components

~~Unverified.~~ → buttons, inputs and modals are in the deep pass below (2026-08-18).
The package also contains a separate `sana` theme.

## Components in depth — (2026-08-18)

Component values were measured from `@workday/canvas-kit-react@16.0.6`. That package ships
**the `.tsx` sources rather than a build artefact**, so the stencil (`createStencil`)
declarations can be read directly. Token references were resolved all the way through
`css/legacy/{system,base}.css` and `css/base/_variables.css` of
`@workday/canvas-tokens-web@4.4.0`.

**The namespace kit v16 consumes is `system.legacy.*`** — tokens v4 lays the old names
(`size-md`, `padding-lg` …) as an alias tier over a new scale
(`--cnvs-sys-space-x1`–`x20`, multiples of `--cnvs-base-unit: 0.25rem`), and the current
components use those aliases: **a generational changeover in progress.**

### Buttons (BaseButton) — four steps, pills, and absolute minimum widths

| | extraSmall | small | medium (default) | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 24px | 32px | **40px** | 48px |
| inline padding | 8px | 12px | 16px | 20px |
| **min-width** | auto | **72px** | **88px** | **104px** |
| type | 12/16 | 14/20 | 14/20 | 16/24 |

- **The radius is `shape.full` = 65rem (1040px) — every variant is a pill.**
  Primary, Secondary and Tertiary all set the same value explicitly.
  The same camp as Cloudscape (a 20px pill), parting from MUI (4px) and Backpack (8px).
- **There are three absolute px minimum widths by size (72/88/104).** The documentation-layer
  survey found zero samples with an absolute min-width (`patterns/button.md` — only
  Spectrum, with a height × 2.25 proportion); at the code layer this is the third after
  Fluent (64/96) and MUI (64), and **the widest.**
- **Padding is reduced one token step on the icon's side** — at medium with icon-start it is
  12px left and 16px right (nine start/end/only combinations declared as compound
  modifiers). icon-only gets zero padding plus `min-width = height` (a square).
- Weight 500, a 1px border (only the colour varies by variant), transition
  **120ms linear** (box-shadow, border, background, colour), **shortened to 40ms** on
  `hover:active`.
- Focus is a double ring: a 2px white inner ring plus a 4px brand outer box-shadow.

### Inputs (TextInput) — a single 40px, with a 280px min-width

| item | value |
|------|-----|
| height | **40px** (`size.md`) — **no size variants** |
| padding | 8px all round (`padding.xs`, commented "Compensate for border") |
| border / radius | 1px / **12px** (`shape.lg`) |
| **min-width** | **280px** (hardcoded `px2rem(280)`) |
| type | 14/20 (subtext.lg) |

- **The button has four steps while the input has a single 40px** — the stencil's modifiers
  are only grow and error.
- **min-width 280px** — `patterns/form.md` records that "a minimum input width exists in no
  system"; **Canvas is the first counterexample.** The label (below) also has a min-width of
  180px.
- The label is not floating but **a separate block** (FormField.Label) — 14px, weight 500,
  with a 4px label-to-input gap in the vertical arrangement and a 180px label min-width for
  the horizontal one. FormField itself carries a 24px bottom margin (`gap.lg`).
- Focus: the border turns brand-coloured plus **a 1px inset box-shadow**, giving the effect
  of 2px. Errors use a 2px inset, and there are **two error variants** (error/caution).

### Modals — a single 440px width, radius 32px

| item | value |
|------|-----|
| width | **only 440px** (`px2rem(440)`, no size prop) |
| margin / max height | 40px / `calc(100dvh − 40px)` (the default offset) |
| radius | **32px** (`shape.xxxl` — commented "modals and large containers") |
| padding | 24px (`padding.xl`, inherited from Popup.Card) |
| shadow | `depth-6` = 0 6px 24px 13% + 0 12px 48px 9% (oklch) |
| scrim | fading in over **300ms** (keyframes, no easing specified = ease) |
| card entrance | a translate toward 0 from the placement direction + **150ms ease-out** |

- **Modal is an extension of Popup.Card** — Dialog, Modal and Popup share one stencil
  lineage, and Modal overrides only the width, margin and radius. A single 440px with no
  width steps is exactly Mantine's default `md` = 440px (`patterns/modal.md`).
- Inner padding: title `8px 8px 4px` · body `4px 8px 8px` (inside the card's 24px).
- At ≤768px it **switches to a bottom sheet** (`alignItems: end` plus 16px margin and
  padding).
- **An escape hatch that disables animation through the global class `.wd-no-animation`** is
  built into the stencil — reduced motion offered as a class rather than a token.
- The code contains **a sub-pixel centring correction** that makes the container width even
  on odd viewports with `calc(100vw − 1px)` (with a comment about a Chrome flexbox issue).

### Characteristic decisions (from the deep pass)

- **Pills everywhere (65rem) plus three absolute minimum widths by size (72/88/104px)** —
  the combination of the two rules appears to be unique to Canvas in the corpus
- **Four button steps vs a single 40px input** — control-height policy asymmetric per
  component
- **A 280px input min-width and a 180px label min-width** — even form dimensions specified
  in absolutes
- **A single 440px modal width** — no width scale at all (the opposite pole from Cloudscape's
  five steps, and fewer even than Backpack's two)
- **Consuming `system.legacy.*`** — the current kit using an alias tier over a new token
  scale, a generational changeover in progress. Because the `.tsx` sources ship, the stencil
  declarations serve as the documentation

## Characteristic decisions

- **The lower range is dense at 2px steps.** There are ten steps between 2 and 20px —
  twice Ant Design's (4 · 8 · 12 · 16 · 20, five steps).
  Fine adjustment becomes possible, at the cost of having to decide "10px or 12px?" every
  time.
- **A single name, `size`, covers spacing and dimensions together.** There is no separate
  scale for whitespace. Similar to Polaris deriving space and radius from `size`, except
  Canvas derives nothing and uses just the one.
- **rem is the source unit**, as in Backpack.
- **The large values use baseline multiples.** Small values are fixed rem and large ones are
  variable multiples, so two systems are mixed within one scale.

## Accessibility

~~Unverified.~~ → **WCAG 2.1 A/AA (resolved 2026-08-18).**
Source: `canvas.workday.com/accessibility` — "guided by the Web Content Accessibility
Guidelines (WCAG) 2.1 A/AA". **Writing the level as A and AA together is a rare notation.**

Re-confirmed against the original by headless render 2026-08-18 —
https://canvas.workday.com/guidelines/accessibility/overview
("We are guided by the Web Content Accessibility Guidelines (WCAG) 2.1 A/AA").
The same page adopts POUR (Perceivable · Operable · Understandable · Robust) as its four
categories and splits the accessibility sub-documents into
**Overview / For Designers / For Developers tabs** — though for some, such as
`Accessible Forms`, **the For Designers tab is internal-only**.

## References

- Repository: https://github.com/Workday/canvas-tokens
- Packages: `@workday/canvas-tokens-web@4.4.0` (tokens) ·
  `@workday/canvas-kit-react@16.0.6` (components — used in the 2026-08-18 deep pass:
  `button/lib/BaseButton.tsx` · `text-input/lib/TextInput.tsx` ·
  `form-field/lib/FormFieldLabel.tsx` · `modal/lib/ModalCard.tsx` ·
  `popup/lib/PopupCard.tsx`)
- Licence: canvas-kit-react's `package.json` says **Apache-2.0** (matching the frontmatter)
- **Figma kit — confirmed absent (2026-08-18, `figma_kit: false`)**:
  even rendering the documentation site headlessly, **there is no public Figma kit.**
  The root navigation is only `Get Started → Introduction / For Developers / For
  Contributors`, and **`For Designers` is absent from the public navigation.**
  The Next.js route manifest does contain a `for-designers` node under `get-started`, but
  `https://canvas.workday.com/get-started/for-designers` is a **404**, and the
  `For Designers` tabs in the upgrade guide and accessibility documents are marked
  `"internal": true`.
  Across the whole site "figma" appears in exactly **one place — a search-tag string on the
  `for-developers/resources` page** — and there is not a single figma.com link.
  → **A system that gates its designer and Figma documentation internally** (classified C).
  Renders checked: https://canvas.workday.com/ ·
  https://canvas.workday.com/get-started/introduction ·
  https://canvas.workday.com/get-started/for-developers/resources (2026-08-18)
- **Open questions:** the full type scale and actual colour palette values, and how the
  `sana` theme differs
