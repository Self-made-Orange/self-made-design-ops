---
name: Kaizen
org: Culture Amp
coverage: partial
url: https://cultureamp.design
repo: https://github.com/cultureamp/kaizen-design-system
license: MIT
tech: [React, SCSS]
figma_kit: true
tokens_format: [SCSS, CSS]
a11y_target: "Confirmed to state none (2026-08-18 — no accessibility document among the Storybook's 197 documentation entries, and zero mentions of WCAG)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @kaizen/design-tokens@11.0.17 → sass/{spacing,typography}.scss · npm @kaizen/components@3.3.12 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](kaizen.ko.md)
<!-- /lang-links -->

## In one line

Culture Amp's system — spacing runs on **a 6px grid** (6 · 12 · 24 · 36 · 48 · 60 · 72),
**missing the core values 4, 8, 16 and 32 entirely.** Kaizen is the only 6px grid in the
sample.

## Tokens

### Spacing — a 6px grid, leaving the core behind completely

```scss
$spacing-xs:   0.375rem  // 6px
$spacing-sm:   0.75rem   // 12px
$spacing-md:   1.5rem    // 24px
$spacing-lg:   2.25rem   // 36px
$spacing-xl:   3rem      // 48px
$spacing-xxl:  3.75rem   // 60px
$spacing-xxxl: 4.5rem    // 72px
```

**Not one of `4`, `8`, `16` or `32` is present** — only Kaizen and Grommet (a grid of
divisors of 24: 3 · 6 · 12) leave all four core values at once in the sample, and
**both are in the 6px family.** A 6px grid shares a least common multiple with the 4/8 grid
at 12 and 24, but it cannot express 16.

Seven t-shirt steps (xs–xxxl) — consistent with the tendency in `tokens/scales.md` that
core departures come from small-step t-shirt scales.

### Token notation — a CSS variable with a fallback, plus an `-id` pair

```scss
$spacing-md:     var(--spacing-md, 1.5rem);   // a reference with the fallback built in
$spacing-md-id:  --spacing-md;                // the variable's name as a value
```

- **Every SCSS variable is of the form `var(--x, fallback)`** — replaceable at runtime, and
  falling back to a static value when the variable is undefined
- **The `-id`-suffixed tokens hold the variable's "name"** — meant for
  `style.setProperty(spacingMdId, …)` in JS, and **the only sample to ship a token's name as
  a value**
- Typography has **roles reserved for data display**, such as `data-large`, at
  **5.25rem (84px)** — for dashboard figures, with a line height equal to the size (1:1)

## Components in depth — (2026-08-18)

The components are `@kaizen/components@3.3.12` (the successor to
`@kaizen/component-library` — the frontmatter's 16.11.0 refers to the old package).
A single `dist/styles.css` carries `@layer tokens, normalize, reset, kz-components` —
**four cascade layers** shipping tokens and components together. Values were measured from
`src/*/*.module.css` (the new tier) and `*.module.scss` (the old one).

### A discovery at the token layer — the 6px grid has become the old tier

`@layer tokens` contains **two sets of spacing**:

- **A new scale named by px number**, `--spacing-0…320` (0 · 1 · 2 · 4 · 6 · 8 · 12 · 16 ·
  20 · 24 · 32 · 40 · 48 …) — **effectively a 4px grid**, not the 6px grid that was Kaizen's
  unique value in the naming
- The old t-shirt 6px grid survives as aliases, `--spacing-xs…xxxxxl` (6 · 12 · 24 · 36 · 48 ·
  60 · 72 · **84 · 96**) — the xxxxl (84) and xxxxxl (96) absent from the token md turn up
  here

**The 6px grid that was unique in the sample is regressing toward the core (the 4px family)
inside its own system.** The new-tier Button uses only the numeric scale while the old-tier
Input uses only the 6px-grid SCSS variables — two generations coexisting in one package.

Also: radius **7px** (`--border-solid-border-radius` — a rare odd value in the sample) ·
border **2px** · six easings (including `bounce-in/out/in-out`) · durations named
`instant/immediate/rapid/fast/slow/deliberate` (0/100/200/300/400/700ms).

### Buttons — min-height and min-width from the same variable

| | small | medium | large |
|---|:--:|:--:|:--:|
| **min-height = min-width** | **32px** | **40px** | **48px** |
| padding | y `calc(8px − border)` | y 8−2, x 20−2 | y 12−2, x 24−2 |
| type | 12px/16px | 16px/24px/500 | same |
| radius | 7px | 7px | 7px |

- **A single variable, `--button-min-x-y`, sets min-height and min-width at once** — a square
  floor. An icon button automatically becomes a 40×40 square rather than a circle.
- **The padding is `calc(spacing − the 2px border)`** — the border's share is subtracted from
  the padding to preserve the overall dimensions. The same intention as MUI reducing only
  outlined by 1px, applied **to every variant through calc**, and primary lays down a border
  in the same colour as its background so dimensions never change between variants.
- States are not `:hover` but **the attributes `[data-hovered]`, `[data-pressed]` and
  `[data-pending]`** — traces of a migration to react-aria. A rare case of tokenising the
  colour of a `pending` (loading) state.
- Focus: a 2px ring (`blue-500`) with a 1px offset. The three reversed variants invert the
  ring to `blue-300`.

### Inputs (Input/TextField) — 48px, taller than the button

| item | value |
|------|-----|
| **height** | **a fixed 48px** (`$input-height`) |
| inline padding | 12px (`$spacing-sm` — the 6px grid) |
| border · radius | 2px · 7px |
| type | 16px / 1.5 |

- **The input at 48px vs the medium button at 40px** — the input matches the button's large.
  This parts from the majority, who align button and input heights within a form
  (Backpack 36/36).
- Alongside `error` (red-500) there is a separate **`caution` (yellow-600)** state — few
  systems in the sample distinguish warning from error in the field's border colour.
- Focus applies a ring **and a background tint** (gray-200) at once; disabled is opacity 0.3.

### Modals — a bounce entrance, and 201ms

| item | value |
|------|-----|
| width | min 300 / **max 600px** |
| radius · shadow | 7px · `shadow-large` |
| scrim | #000 at 50% |
| enter | **fade + zoom (0.5→1), 300ms, `bounce-in`** `(0.485,0.155,0.24,1.245)` |
| exit | 200ms `bounce-out` |

- **An overshooting (bounce) easing is actually used on the modal entrance.** ~~Kaizen is the
  only sample using it on a default modal~~ → **corrected (2026-08-18, the 83-sample
  re-synthesis in `patterns/motion.md`):** there are at least eight (Blueprint 1.12 · HSDS's
  `boop` 1.2 and others). Kaizen is one of them.
- **The scrim fade is 201ms** — to avoid a bug in Chrome/Blink 102.x where 200ms animates the
  opacity all the way to 1, a **literal one millisecond higher** was pinned in place of the
  "rapid" token (200ms), with Jira KDS-523 cited in a source comment. The only sample where
  a browser-bug workaround is embalmed in a duration value.
- The 0.5→1 zoom is the deepest contraction among the sample's modal scale entrances
  (Backpack is 0.9→1).

### Characteristic decisions (from the deep pass)

- **The 6px grid regressing on itself** — the new numeric scale is in the 4px family, and
  only the old t-shirt scale keeps 6px
- **A 7px radius** — an odd radius, shared by every component
- **Button min-width = min-height** — a square floor from one variable
- **`calc(padding − border)` on every variant** — dimensional invariance guaranteed by calc
- **A bounce-in modal entrance plus the 201ms bug-workaround value**
- **A `caution` field state** — a warning border colour that is not an error

## Characteristic decisions

- **A 6px grid** — leaving the core 4, 8, 16 and 32 entirely, the only such grid in the
  sample. Though the components' new tier is moving to a 4px-family numeric scale (the deep
  pass above, 2026-08-18)
- **`-id` tokens (a variable's name as a value)** — unique in the sample
- Every token as `var(--x, fallback)` — supporting static and runtime at once
- `data-large` at 84px with a 1:1 line height — a role reserved for dashboard figures

## Accessibility

~~Unverified.~~ → **Confirmed absent (2026-08-18, headless render).**

Even when rendered, this system publishes no accessibility target. The documentation site is
**a single Storybook**, and going through its **197** documentation entries (measured from
`index.json`) turns up no document titled Accessibility or a11y. The structure is only
Introduction/Welcome · Guides (App starter · Layout and spacing · the Tailwind family ·
the Tokens family) · Components (about 60) · Pages · Releases. Across every rendered page the
string `WCAG` appears **zero times**.
Sources: https://cultureamp.design/ · https://cultureamp.design/index.json
(headless render, 2026-08-18)

The Welcome document does mention accessibility once, as an object — a sentence saying the
components aim at "a high level of quality, **accessibility** and consistency with the overall
platform" — but **there is no conformance criterion and no verification method**
(source: https://cultureamp.design/?path=/docs/introduction-welcome--docs).
`@storybook/addon-a11y` is installed in the Storybook (the manager bundle `sb-addons/a11y-1`),
so this is the type that **checks automatically during development but does not document a
target level.**

## References

- Tokens: `npm pack @kaizen/design-tokens@11.0.17` → `sass/`
- Components: ~~`@kaizen/component-library@16.11.0`~~ → **`@kaizen/components@3.3.12`**
  (the current package — used in the deep pass, 2026-08-18). `dist/styles.css` plus
  `src/*/*.module.css`
- Colour: entirely in `@layer tokens` of `dist/styles.css` — 7 hues × 7 steps (100–700, with
  800 only for purple) plus white and black. Typefaces: Inter for body /
  **Tiempos Headline** (the display-0 serif) / IBM Plex Mono
- **Figma (2026-08-18, headless render):** no public kit is confirmed. The Welcome document
  writes "We aim to have what's represented here in code **equally matching Figma**, to
  enable cross-functional teams to communicate with the same language", which **implies an
  internal Figma library exists**, but nowhere in the 197 Storybook entries is there a kit
  page, a download or a community link (that one sentence is the only mention of "Figma" in
  the whole rendered site).
  → at the time this read `figma_kit: unverified`: not "there is none" but "it is not
  published".
  Source: https://cultureamp.design/?path=/docs/introduction-welcome--docs
- **Figma — resolved to `true` (2026-08-23).** The kit the sentence above only implied is
  linked directly from the **repository**, which the documentation-site render never covered:
  `CONTRIBUTING.md` line 165 sends icon contributors to "our figma file",
  `figma.com/file/eZKEE5kXbEMY3lx84oz8iN` — the file is named **💜 UI Kit: Heart**.
  The address answers **302** (it redirects rather than serving the file), so this confirms
  **the kit exists**, not that it can be opened publicly — the same reading the corpus applies
  to Backpack. File key recorded here on purpose: without it the kit cannot be rechecked.
  Source: github `cultureamp/kaizen-design-system`, `CONTRIBUTING.md`, `main@5b691f46c5`
- **Open questions:** ~~the colour, shadow and layout tokens~~ ~~the component list~~
  (resolved 2026-08-18 — all in styles.css, with around 60 component directories),
  ~~the accessibility target~~ (confirmed absent 2026-08-18), the rationale for the 6px grid
  — **the documentation site was read by headless render on 2026-08-18 (invalidating the
  earlier "blocked by the proxy" note), and no document, including
  `Guides/Layout and spacing`, explains why 6px was chosen** — and whether a public Figma kit
  exists
