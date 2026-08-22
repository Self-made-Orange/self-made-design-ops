---
name: Backpack
org: Skyscanner
coverage: partial
url: https://backpack.github.io
repo: https://github.com/Skyscanner/backpack
license: Apache-2.0
tech: [React, React Native]
figma_kit: true
tokens_format: [JSON, SCSS]
a11y_target: "WCAG 2.2 AA (stated — confirmed by headless render 2026-08-18)"
platform: [web, mobile]
domain: consumer
verified: 2026-08-18
source: "npm @skyscanner/bpk-foundations-web@24.7.0 → tokens/base.raw.json · npm @skyscanner/backpack-web@43.19.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](backpack.ko.md)
<!-- /lang-links -->

## In one line

Skyscanner's design system for its travel-search service, covering web and React Native
together.

## Tokens

### Spacing — rem-based t-shirt sizes

| token | rem | px |
|------|-----|-----|
| `SPACING_NONE` | 0 | 0 |
| `SPACING_XXS` | 0.0625 | 1 |
| `SPACING_XS` | 0.125 | 2 |
| `SPACING_SM` | 0.25 | 4 |
| `SPACING_MD` | 0.5 | 8 |
| `SPACING_BASE` | 1 | 16 |
| `SPACING_LG` | 1.5 | 24 |
| `SPACING_XL` | 2 | 32 |
| `SPACING_XXL` | 2.5 | 40 |
| `SPACING_XXXL` | 4 | 64 |
| `SPACING_XXXXL` | 6 | 96 |

**There is no 12px.** After 8 comes 16.

Source: `@skyscanner/bpk-foundations-web@24.7.0` → `tokens/base.raw.json`

### Role aliases

| token | value |
|------|-----|
| `SPACING_ICON_TEXT` | 0.5rem (8px) |
| `CALENDAR_DAY_SPACING` | 0.5rem (8px) |

### Tracking (letter-spacing)

Separately from spacing, **tracking tokens are provided.**

| token | value |
|------|-----|
| `LETTER_SPACING_TIGHT` | -0.02em |
| `LETTER_SPACING_HERO` | -0.04em |
| `LETTER_SPACING_DISPLAY` | -0.05em |

### Typography / colour

Unverified.

### Radius — five t-shirt steps plus aliases (obtained 2026-08-18)

| token | rem | px |
|------|-----|-----|
| `$bpk-border-radius-xs` | 0.25 | 4 |
| `$bpk-border-radius-sm` | 0.5 | 8 |
| `$bpk-border-radius-md` | 0.75 | 12 |
| `$bpk-border-radius-lg` | 1.5 | 24 |
| `$bpk-border-radius-xl` | 2.5 | 40 |
| `$bpk-border-radius-full` | — | 100% |

There are separate component aliases — `$bpk-button-border-radius: 0.5rem` ·
`$bpk-select-border-radius: 0.5rem` · `$bpk-border-radius-nav-tabs: 1.125rem` (18px) ·
`$bpk-flare-corner-radius: 1.3125rem` (21px). **From md (12) it doubles to lg (24).**

Source: `@skyscanner/bpk-foundations-web@24.7.0` → `tokens/base.default.scss`

## Components

~~Unverified — the documentation site was not reached.~~ → see the deep pass below
(2026-08-18).

## Components in depth — (2026-08-18)

The components have been consolidated from individual `bpk-component-*` packages into
**the single package `@skyscanner/backpack-web@43.19.0`** (the old unscoped
`bpk-component-*` packages are frozen). Every value below is measured from that package's
`bpk-component-*/src/*.module.css`.

### Buttons (`bpk-component-button`)

| | default | large |
|---|:--:|:--:|
| **min-height** | **2.25rem (36px)** | 3rem (48px) |
| block padding | 6px | 12px |
| inline padding | 16px | 16px |
| icon-only inline | 10px | 12px |
| radius | 8px (`--bpk-private-button-dimension-radius`) | 8px |
| type | 16px / 24px / **700** | same |

- **The height is `min-height`, not `height`** — it grows when the content overflows.
  **There is no minimum width** (`min-width` appears zero times).
- **The button type is 16px at weight 700** — body size with bold laid over it, parting from
  the 14px/500–600 majority.
- There are **only two size steps** (default and large). There is no small.
- Every colour and dimension goes through `--bpk-private-button-*` CSS variables with a
  fallback chain — an internal theme-injection layer that marks itself as not for consumer
  overrides by **putting `private` in the name**. The opposite signal from the
  "overrides welcome" family (SLDS hooks, Cloudscape's `--awsui-style-*`).
- Variants: primary · secondary · destructive · featured · link · link-underlined, plus
  on-dark/on-light. **link-underlined draws and erases its underline with a
  `background-size` transition (200ms ease)** — not `text-decoration`.

### Inputs (`bpk-component-input`)

| | default | large |
|---|:--:|:--:|
| **height** | **2.25rem (36px)** | 3rem (48px) |
| padding | 8px | 16px inline |
| radius | 8px | **12px** |
| border | 1px `#c1c7cf` | same |

- The same two steps as the button, 36/48px — but **the button uses min-height while the
  input uses a fixed height.**
- **At large the radius grows 8→12px** — a rare case of a size variant changing the radius.
- The label is not floating but **a separate block element** (`bpk-component-label`) —
  12px / 16px / 700, placed above the input.
- The valid/invalid icons are **base64 SVGs inlined as a `background`** — not DOM elements.
- A `--docked` variant folds the first, middle and last radii to build **a search-bar
  assembly** (the flight-search form).

### Modals (`bpk-component-modal`) — three generations coexisting, V1, V2 and V3

| | V1 | V2 (`<dialog>`) |
|---|---|---|
| width | max-width **32rem (512px)** | width 32rem |
| wide variant | 64rem (1024px) | 64rem |
| radius | 8px (`--bpk-radius-sm`) | **12px** (`--bpk-radius-md`) |
| enter | scale(0.9)→1 plus fade, **200ms ease-in-out** | the same (keyframes) |
| content padding | 16px | 16px |

- **There are only two width steps, 512 and 1024px** (plus full-screen on mobile) — the
  opposite pole from Cloudscape's five.
- At viewports of `32rem` and below it goes full-screen automatically — **the modal width and
  the breakpoint are the same value.**
- Scrim `rgba(0,0,0,.7)`, fading over 200ms. V2 uses the native `<dialog>` plus `::backdrop`.
- V3 uses 400ms `cubic-bezier(0.5, 0, 0, 1)` — see the easing section below.

### Easings — confirmed to have no tokens (backlog cleared)

Across every file of `bpk-foundations-web@24.7.0` (raw.json, scss, js), `easing` and
`cubic-bezier` appear **zero times**. The only motion tokens are three durations
(`$bpk-duration-xs/sm/base` = 50/200/400ms).

The distribution of easing use at the component layer (measured across all of
backpack-web 43.19.0's CSS):

| easing | uses | where |
|------|:---:|------|
| the `ease-in-out` literal | 42 (200ms) + 13 (400ms) | modals, cards, forms — most things |
| the `ease` literal | 13 | link underlines and the like |
| `cubic-bezier(0.4, 0, 0.2, 1)` | 8 | chatbot-input · chat-thought-bubble |
| `cubic-bezier(0.5, 0, 0, 1)` | 5 | **ModalV3** |
| `cubic-bezier(0.2, 0, 0, 1)` | 2 | chat-bubble |

- **The mainline is the `ease-in-out` literal plus a duration token**
  (`transition: opacity $bpk-duration-sm ease-in-out`).
- **Material's curves are drifting in by hand through the newer components (chat, ModalV3)**
  — `(0.4,0,0.2,1)` is Material standard and `(0.2,0,0,1)` matches M3 standard.
  Three different curves are scattered across five files with no tokens — a sample of drift
  beginning in a system that never tokenised its easings.

### Characteristic decisions (from the deep pass)

- **Buttons and inputs share two steps, 36/48px** — no small, with height alignment across
  components
- **A 16px, 700 button type** — bold at body size
- **The `--bpk-private-*` variable layer** — declaring "do not override" in the name
- **No easing tokens, a literal mainline, and Material curves drifting in through newer
  components**
- **Modal width = the breakpoint (32rem)** — one value, two roles

## Characteristic decisions

- **The gap between 8px and 16px is empty.** There is no 12px.
  Backpack and Protocol are the only systems in the sample without a 12px.
- **Spacing is defined in rem.** The source unit is rem, not px.
  Whitespace responds to the user's font-size setting, which helps accessibility but is hard
  to reconcile with a fixed pixel grid.
- **The bottom reaches 1px.** `SPACING_XXS` is 0.0625rem (1px) — a rare case of including a
  border-thickness value in a spacing scale.
- **Tracking is tokenised.** Most systems bury tracking inside a type style; Backpack exposes
  it as independent tokens. All three are negative.
- **It uses the name `BASE`.** In the middle of the t-shirt scale sits `BASE` rather than
  `MD`, with `MD` (8px) below it. The name alone gives you little sense of the size.

## Accessibility

rem-based spacing helps accessibility in that it responds to the user's font settings.

~~The explicit conformance target is unverified.~~ → **Resolved (2026-08-18, headless
render).** The documentation site states the target — "We aim for all components to meet the
Web Content Accessibility Guidelines (**WCAG 2.2 AA**) and all design decisions to be
inclusive."

A rare case in the corpus of targeting **2.2 rather than 2.1**. The contrast criteria stated
alongside: body text **4.5:1**, large text (large and bold) **3:1**, UI components **3:1**
(with decorative text and disabled states excepted). In the Product Design swatch palette the
colours are marked with an `AA` symbol, and **colours without the symbol are not intended for
use with text.**

Another distinguishing feature is that the accessibility documentation **branches four ways by
role** (Product Designers · Engineers · Content Designers · Product Owners).

Source: https://www.skyscanner.design/latest/accessibility/for-product-designers-q334fp0Q
(the role branching is at
https://www.skyscanner.design/latest/accessibility/overview-8grGx1o6)

## References

- Repository: https://github.com/Skyscanner/backpack
- Packages: `@skyscanner/bpk-foundations-web` (tokens) ·
  `@skyscanner/backpack-web@43.19.0` (the consolidated components — used in the 2026-08-18
  deep pass)
- Licence: the component CSS headers state **Apache-2.0** — reflected in the frontmatter
  (2026-08-18)
- **Figma kit (resolved 2026-08-18 — `figma_kit: true`)**: the documentation has a
  "Backpack in Figma" section of its own, stating that **foundations, components and patterns
  ship as Figma Libraries**. Ownership is documented too — design belongs to the Backpack
  Designers, and the code to Web = Clover Squad and Apps = Donburi Squad, with patterns owned
  by the individual product designers and squads.
  The page links the file `figma.com/file/yN0hFyZlKL0Jwbpi0rEKYT/Backpack-Beta`
  (internal access required — the kit's existence is confirmed; whether it can be viewed
  publicly is a separate matter).
  Source: https://www.skyscanner.design/latest/getting-started/backpack-in-figma/foundations-components-and-patterns-4b5yBAjl
- **The documentation site's real host (2026-08-18)**: the frontmatter's
  `https://backpack.github.io` responds only at the root and returns 404 for every sub-path.
  The actual documentation is served from **https://www.skyscanner.design/latest**
  (hosted on Supernova), and `backpack.github.io/` returns the same shell as that site
  (an identical 64,804B DOM). Every 2026-08-18 render cited here is from
  `www.skyscanner.design`.
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github Skyscanner/backpack →
  `LICENSE` (matching the npm metadata for `@skyscanner/bpk-foundations-web@24.7.0`)
