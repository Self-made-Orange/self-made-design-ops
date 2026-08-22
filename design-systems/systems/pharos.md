---
name: Pharos
org: ITHAKA (JSTOR)
coverage: partial
url: https://pharos.jstor.org
repo: https://github.com/ithaka/pharos
license: MIT
tech: [Web Components, Lit]
figma_kit: false
tokens_format: [CSS]
a11y_target: "Confirmed to state no organisation-wide target (2026-08-18 — there are per-component Accessibility sections but no WCAG version or level goal)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @ithaka/pharos@14.25.0 → lib/styles/variables.css"
---
<!-- lang-links -->
> **English** · [한국어](pharos.ko.md)
<!-- /lang-links -->

## In one line

JSTOR's system — the spacing names are **fractions and multiples spelled out in prose**
(`one-eighth-x` · `one-and-a-half-x` · `three-and-a-half-x`). **The same scheme as Cedar
(REI)**, which turns a naming approach recorded as "unique in the sample" into a
**two-sample pattern**.

## Tokens

### Spacing — fractions and multiples of `x`, based on 1rem

```
one-eighth-x    0.125rem (2px)     1-x   1rem  (16px)
one-quarter-x   0.25rem  (4px)     2-x   2rem  (32px)
one-half-x      0.5rem   (8px)     3-x   3rem  (48px)
three-quarters-x 0.75rem (12px)    3.5-x 3.5rem(56px)
one-and-a-half-x 1.5rem  (24px)    5-x · 7-x · 10-x (80·112·160px)
gutter = 3-x
```

- **The base `x` = 1rem = 16px.** Cedar left its root undetermined, so Pharos, stating the
  base within the same scheme, gives the **prose-multiple naming camp its first confirmed
  base value** (`tokens/scales.md`)
- Converted to px: `2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 56 · 80 · 112 · 160` — the core
  values are respected
- **`gutter` exists as an alias** — layout whitespace pinned by name inside the scale
  (the same call as Vanilla's `strip` and Braid's `space.gutter`)

### Type — 14 ordinal steps plus role aliases

```
type-scale-1 0.75rem … type-scale-3 1rem(base) … type-scale-14 4.25rem
font-size-base = type-scale-3 · micro = 1 · small = 2 · large = 5 · xlarge = 6
```

- **The ordinal scale and the role aliases are separated** — EUI's structure (base placed
  mid-scale) made explicit as two layers
- Weights are **only 400 and 700** — the same composition as the four CJK samples, arriving
  here **in a Western system**. A counterexample to the "shared CJK practice" hypothesis:
  two weights is not a CJK-only trait
- The base radius is `0.125rem` (2px) — in the smallest-radius group in the sample

## Components in depth — (2026-08-18)

Measured from `lib/components/*/pharos-*.css.js` (the CSS Lit generates) in the same
`@ithaka/pharos@14.25.0` package. Tokens and components live in one package — the same
integrated distribution as Backpack.

### Buttons (`pharos-button`)

| | default | `large` |
|---|:--:|:--:|
| **derived height** | **34px** (24 line height + 4×2 + 1×2) | 42px (8px block padding) |
| padding | 4px 12px (`one-quarter-x` / `three-quarters-x`) | 8px 12px |
| border | 1px | 1px |
| radius | **2px** (`--pharos-radius-base-standard`) | 2px |
| type | **16px / 24px / 700** + −2% tracking | same |

- **No declared height, derived at 34px**, and **no min-width** — among the shortest in the
  sample.
- **On hover and active the border thickens from 1 to 2px and the padding compensates by
  −1px each** (`calc(var(--pharos-spacing-one-quarter-x) - 1px)`), leaving the overall
  dimensions unchanged. Where the border-subtracting family (MUI, LeafyGreen, Odyssey) does
  this statically, Pharos does it **as a state transition**.
- Tracking is not a literal but **the proportional `calc(font-size × −0.02)`** — shared by
  every component.
- Transition `border-color/background/color 250ms ease-in-out`
  (`--pharos-transition-duration-default`). Three duration tokens: 100/250/500ms.
- Variants: primary (default) · secondary · subtle · overlay, plus `on-background` and
  `icon` attributes.
- **16px, 700 button type** — the "bold at body size" camp, alongside Backpack and
  Thumbprint.

### Inputs (`pharos-text-input`)

| | value |
|---|---|
| **derived height** | **42px** (24 line height + 8×2 + 1×2) — **matching the large button** |
| padding | 8px 12px |
| border · radius | 1px · 2px |
| type | 16px / 24px / 400 + −2% tracking |

- No size variants — a single 42px. It aligns not with the default button (34px) but
  **with the large one**.
- The label is a separate block — **14px (`type-scale-2`) / 700 /
  `text-transform: uppercase`**, with a 4px bottom margin. Forcing labels to uppercase is a
  rare choice in the sample.
- The transition uses `--pharos-transition-base` =
  `250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)` — separate from the duration tokens, there
  is **one composite token that includes the curve** (an approximately linear S-curve).

### Modals (`pharos-modal`)

| size | width |
|---|---|
| small | 28rem (448px) |
| **medium (default)** | **39rem (624px)** |
| large | 48rem (768px) |

- **The modal itself has no entrance animation** — only a `visibility` toggle; just the
  overlay (`rgba(0,0,0,.5)`) fades over 250ms ease-in-out. The "only the curtain moves"
  camp, alongside Thumbprint on desktop.
- Below 570px it goes full-screen and slides on `top 500ms`
  (`transition-duration-long`) — **a literal 570px breakpoint** (not a token).
- Padding: **32px** on the header and footer (`--pharos-modal-spacing-base` = `spacing-2-x`),
  32px inline in the body. Footer buttons are spaced by a 16px left margin (`1-x`).
- Radius **2px** — a single minimum radius applied system-wide, from buttons through modals.
- max-height `calc(100vh − 32px)`, shadow `--pharos-elevation-level-5`.

### Characteristic decisions (from the deep pass)

- **Border growth on hover (1→2px) with a −1px padding compensation as a state
  transition** — unique in the sample in this form
- **The −2% tracking calc runs through buttons, inputs and modal body alike**
- **A single 2px radius applied across the board** — even modals stay near-square
- The input (42px) aligns with the large button, not the default — form row height first
- Labels forced to uppercase — a typographic choice fitting an archive (JSTOR)

## Characteristic decisions

- **Prose fraction-and-multiple naming** — the same scheme as Cedar, with the base
  confirmed at x = 1rem
- **Weights 400/700** — a two-weight case in a Western system (disproving the CJK-only
  hypothesis)
- 14 ordinal type steps plus role aliases, in two layers
- A `gutter` alias included in the scale
- Web Components (Lit) — the same camp as Shoelace, PIE and Siemens iX

## Accessibility

~~Unverified.~~ → **Partly resolved (2026-08-18, headless render).**

**It does not publish an organisation-wide conformance target (a WCAG version or level).**
The site navigation consists only of Getting started · Help · FAQs · Documentation ·
Development / Logos, Typography, Color … / components / design tokens, and **there is no
dedicated accessibility document** (confirmed by rendering the root, getting-started, faqs
and help).

Instead, **each component's documentation carries an `Accessibility` section.** On Button it
splits into "What's built in" and cautions for use —
"Ensures component uses the correct semantic element",
"Provides built-in focus styles that **meet WCAG contrast and visibility requirements**",
keyboard operation (Enter/Space), and adding ARIA attributes where needed.
The cautions forbid vague labels like "Click here" and **warn against overusing the
`disabled` state** (it drops out of the focus order and increases cognitive load — the
advice is to keep the control active and signal availability with an inline message), and
require a label annotation on icon-only buttons.
The API also carries **an attribute family prefixed `a11y-`**, such as `a11y-label`
(aria-label) and `a11y-expanded` (aria-expanded).
Source: https://pharos.jstor.org/components/button (headless render, 2026-08-18)

In other words it is the **"no target level, only per-component guarantees" type** — WCAG
is cited only as the grounds for contrast and focus visibility.

## References

- Tokens: `npm pack @ithaka/pharos@14.25.0` → `lib/styles/variables.css`
- Components in depth: `lib/components/{button,text-input,modal}/pharos-*.css.js` plus
  `base/form-element.css.js` from the same package (2026-08-18)
- Licence: **MIT** stated in package.json — reflected in the frontmatter (2026-08-18)
- **Figma kit — confirmed absent (2026-08-18, headless render):** even when rendered, this
  system publishes no Figma kit. Rendering the root, getting-started, faqs, help and the
  component docs yields **zero** occurrences of the string "Figma", and there is no
  design-tool navigation entry. In place of design artefacts it foregrounds
  **Web Components storybooks** (`/storybooks/wc/` · `/storybooks/react/`).
  Sources: https://pharos.jstor.org/ · https://pharos.jstor.org/getting-started
  (rendered 2026-08-18)
- **Open questions:** ~~the accessibility target~~ ~~the Figma kit~~ (2026-08-18 — partly
  resolved and confirmed absent respectively, by rendering the documentation site), the
  colour palette, ~~the component list~~ (confirmed 2026-08-18 — around 40 in
  `lib/components/`: alert · breadcrumb · coach-mark · combobox · image-card ·
  multiselect-dropdown · sheet · sidenav · table · toast and others),
  ~~the licence~~ (MIT — 2026-08-18), dark mode
- **Licence resolved (2026-08-18):** `MIT` — source: github ithaka/pharos → `LICENSE`
  (matching the npm metadata for `@ithaka/pharos@14.25.0`)
