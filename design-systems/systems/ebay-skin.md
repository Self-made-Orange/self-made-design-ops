---
name: Skin (eBay Evo)
org: eBay
coverage: partial
url: https://ebay.github.io/skin
repo: https://github.com/eBay/skin
license: MIT
tech: [CSS, Marko, Web Components]
figma_kit: false
tokens_format: [CSS]
a11y_target: "WCAG 2.2 AA"
platform: web
domain: commerce
verified: 2026-08-23
source: "npm @ebay/skin@19.33.0 → dist/tokens/evo-{core,light,dark,live-light,live-dark}.css"
---
<!-- lang-links -->
> **English** · [한국어](ebay-skin.ko.md)
<!-- /lang-links -->

## In one line

eBay's system — it keeps **42 colours reserved for AI features** (`--color-ai-*`, gradients
included), its breakpoints carry **separate iOS and Android families**, and its border widths
include **0.5px**. The themes are `light`/`dark` × `live`, four in all.

## Tokens

### A colour family reserved for AI — the first case in the corpus

```css
--color-ai-solid-blue-strong: #0968f6;   --color-ai-solid-blue-subtle: #f0f6fe;
--color-ai-solid-{green,purple,red,yellow}-{strong,subtle}
--color-ai-gradient-blue-strong · -green-strong · -purple-strong
--color-ai-gradient-full-spectrum
```

- **42 colours reserved for AI-feature UI** — the first case in the sample of AI being
  tokenised as a colour family. There are two kinds, `solid` and `gradient`, and
  **`full-spectrum`** is a gradient passing through several hues
- The same position as Intergalactic's (Semrush's) highlight theme, whose gradients marked
  "new and paid" — **the pattern of a particular feature group owning a colour family** now
  has two cases. Here it is **a family inside the ordinary themes** rather than a separate
  theme file

### Breakpoints — OS families alongside

```css
--breakpoint-extra-small 320 · small 512 · medium 600 · large 800 ·
  extra-large 1100 · extra-large-2 1400 · extra-large-3 1920
--breakpoint-ios-compact 320 · ios-regular 600 · ios-expanded 800
--breakpoint-android-compact 320 · android-medium 600 · android-expanded 800
```

- **Separate iOS and Android families sit alongside the seven web steps** — the values are
  the same (320/600/800), but the names match **the OS documentation's vocabulary**
  (`compact`/`regular`/`expanded` = Apple's size classes,
  `compact`/`medium`/`expanded` = Material's window size classes). The only case in the
  sample of carrying OS size-class vocabulary into web tokens
- `extra-large-3` is 1920px — the same upper end as Artsy and Welcome UI

### Dimensions — the `dimension` number = px × 12.5

```
0 · 25:2 · 50:4 · 75:6 · 100:8 · 150:12 · 200:16 · 250:20 ·
300:24 · 400:32 · 500:40 · 600:48 · 800:64 · 1000:80
```

Since `100` is 8px, **the number = px × 12.5** — the same ratio as Vapor UI (rem × 12.5),
but based on px. **`200`** joins the list of ways to name 16px.

### Borders — 0.5px

```css
--border-width-thin: 0.5px · medium: 1px · thick: 2px
```

**A sub-pixel border is a token** — the second sub-pixel value after TDS's 0.7px underline,
and the only one on a border in the sample (presupposing a high-resolution display).

### Four themes

`evo-light` · `evo-dark` · **`evo-live-light`** · **`evo-live-dark`** plus
`evo-core` (shared) — the `live` family **has no AI colours** (confirmed by diff).
Copies with a `-class` suffix ship alongside, supporting class-scoped application.

## Components in depth — (2026-08-18)

The same `@ebay/skin@19.32.0` package contains **91 components as
`dist/<name>/<name>.css`** (the root's `button.css` and the rest are one-line `@import`
shells — you have to look at dist. The same trap structure as the tokens' "empty root
`tokens.css`"). What follows is measured from `dist/button`, `dist/textbox` and
`dist/dialog`.

### Buttons (`.btn` / `a.fake-btn`)

| | small | default | large |
|---|:--:|:--:|:--:|
| **min-height** | 32px | **40px** | 48px |
| inline padding | 16px | 20px | 20px |
| radius | 16px | 20px | 24px |
| type | 14px | 14px | 16px (`--font-size-medium`) |

- **The radius is exactly a pill at half the height, but as per-size literal fallbacks rather
  than a token** — 16/20/24 hardcoded across the three sizes in the form
  `var(--btn-border-radius, 20px)`. `--border-radius-100` (16) and `-150` (24) exist and go
  unused (20px is not in the tokens).
- min-width **88px** (default size only). The height is a `min-height`, and a
  `--fixed-height` variant separately fixes `height` — both approaches coexisting, unlike
  Backpack (min-height only).
- **States are a Material-style state layer** — an `:after` overlay painted with
  `--color-state-layer-hover` (black 4%) / `-pressed` (8%) / `-focus` (4%).
  A sample assembling a state layer in vanilla CSS (Vuetify does the same pattern with an
  `__overlay` element).
- **`transform: scale(0.97)` on `:active`** — the press expressed as a shrink.
- Transition `all 167ms cubic-bezier(0,0,0,1)` (`quick-enter`).
- Only primary is weight 700. Variants: primary · secondary · tertiary · destructive ·
  borderless · form · slim. The class that disguises a link is named **`fake-btn`** — "fake"
  written straight into the class name.

### Inputs (`.textbox`)

- **The wrapper owns the border, and the inner input's height is `calc(40px − 2px)`** —
  the 2px border is subtracted from the child's height to reach 40px in total (48px at
  large). The heights are `--input-default-height: 40px` and `--input-large-height: 48px` on
  `:root`.
- Radius 8px (`--border-radius-50`), border 1px. On focus the border colour intensifies plus
  **a `box-shadow 0 0 0 1px` in the same colour** — a visually 2px border with no layout
  shift.
- The state selectors are **`:has()`-based** (`.textbox:has(> .textbox__control:focus)`) —
  a child's state reflected on the wrapper without JS. readonly removes the border entirely.
- placeholder is **font-weight 200**. textarea min-height 200px.

### Dialogs (`.dialog` — the native `<dialog>`)

| width | value |
|------|-----|
| narrow | 480px |
| default · lightbox | **616px** |
| wide | 896px |

- max-width 88% · max-height 90%. Radius **24px** (`--border-radius-150`).
- Scrim `rgb(17 24 32 / 0.7)` — not pure black but **a navy-tinted ink**.
- **The entrance splits into two tracks**: scale 0.75→1 over **500ms** on standard
  (0.3,0,0,1), while opacity takes **167ms** on continuous — the shape slow, the fade fast.
  On exit the scale uses soft-exit `(0.3,0,1,1)`. It even uses
  `transition: display/overlay allow-discrete` — a current-generation CSS implementation.
- Inner padding 16px all round (`--spacing-200`), close button 32px.

### Motion tokens — durations on a 60fps frame grid

All ten durations in `evo-core.css` are frame counts:
17/50/83/167/250/333/500/667/833/1000ms = **1/3/5/10/15/20/30/40/50/60 frames**.
The intent is clear from `instant` being 17ms (exactly one frame) — the only case in the
sample of **quantising durations to multiples of a frame** rather than milliseconds. There
are seven easings (standard `(0.3,0,0,1)` · quick/soft × enter/exit ·
bounce `(0.3,0,0,1.25)` · continuous · linear).

### The type scale (obtained in the deep pass)

Eleven steps — 10/12/14/16/18/20/24/30/36/46/64px. The semantic names such as
`--font-size-body` (14) are the originals, with **numeric aliases like `--font-size-14`
shipped in parallel** (18 and 64 have no semantic name).

### Characteristic decisions (from the deep pass)

- **Ten durations = multiples of a 60fps frame** — unique in the sample
- **The pill radius as per-size literal fallbacks** (bypassing the tokens)
- **A state-layer overlay plus scale(0.97)** — Material's grammar ported into vanilla CSS
- Inputs: a wrapper border with the child's height subtracted, and `:has()` state reflection
- Dialogs: a two-track entrance, scale over 500ms and fade over 167ms

## Characteristic decisions

- **42 colours reserved for AI features** (solid/gradient/full-spectrum) — the first case in
  the corpus
- **iOS and Android size-class vocabulary carried into web breakpoints** — unique in the
  sample
- **A 0.5px sub-pixel border token** — unique on a border in the sample
- Dimension numbers = px × 12.5 (16px is called `200`)
- Four themes plus class-scoped copies

## Accessibility

~~Unverified.~~ → **Resolved (2026-08-18, headless render).**

**It states WCAG 2.2 AA as an explicit target** — the documentation home reads
"Accessibility First / **WCAG 2.2 AA** aligned components built for everyone, on every
device", and the "Accessibility Considerations" item lists `WCAG 2.2 AA` · Semantic HTML ·
ARIA Roles, States & Properties · Keyboard Support · Screen Reader Support ·
Color Contrast. Testing is described as using "keyboard, screen readers, and automated
accessibility tools aligned with WCAG compliance".
Source: https://opensource.ebay.com/skin/ (where `ebay.github.io/skin` redirects to;
headless render, 2026-08-18)

**The volume of accessibility documentation is at the top of the sample** — there is a
top-level `Accessibility` navigation entry branching into **patterns · anti-patterns ·
techniques · misc (FAQ)**. The anti-patterns alone number nine —
`disabling-pinch-to-zoom` · `hand-cursor-on-buttons` · `javascript-href` · `layout-table` ·
`non-interactive-hover` · `open-new-window` · `setting-focus-on-page-load` · `tabindex-itis` ·
`title-tooltip` — **the only structure in the sample that pins "what not to do" into the
documentation hierarchy.**
The FAQ settles "button or link?" on whether browser history changes
(`use links for anything that updates browser history state`), and explicitly forbids a hand
cursor on buttons and using a focused button as a live region.
Sources: https://opensource.ebay.com/evo-web/accessibility ·
https://opensource.ebay.com/evo-web/accessibility/misc/faq (rendered 2026-08-18)

## References

- Tokens: `npm pack @ebay/skin@19.32.0` → `dist/tokens/`
  (the root `tokens.css` is an empty file, so you must look at `dist/tokens/`)
- Components in depth: `dist/button/button.css` · `dist/textbox/textbox.css` ·
  `dist/dialog/dialog.css` from the same package, resolved against
  `dist/tokens/evo-core.css` (2026-08-18)
- **Open questions:** what the `live` theme is for (presumed live commerce — no evidence),
  ~~the type scale and the component list~~ (resolved 2026-08-18 — the deep pass: an
  11-step scale, 91 items in dist), guidance on using the AI colours,
  ~~the accessibility target~~ ~~the Figma kit~~ (both resolved 2026-08-18)
- **The documentation site (headless render, 2026-08-18):** `ebay.github.io/skin` is not an
  SPA but **a 301 redirect to `opensource.ebay.com/skin/`**. Its internal links are absolute
  paths of the form `/evo-web/...`, so `ebay.github.io/skin/evo-web/...` returns 404 — to
  read the accessibility documents you must open `opensource.ebay.com/evo-web/...` directly
- **Figma kit — confirmed absent (2026-08-18):** even when rendered, this system publishes no
  Figma kit. Rendering the documentation home, the components and the whole accessibility
  section yields the string "Figma" **zero times** (confirmed by rendering
  `https://opensource.ebay.com/skin/`). It is the type that leaves design-tool integration
  out of the documentation and publishes only code and tokens
