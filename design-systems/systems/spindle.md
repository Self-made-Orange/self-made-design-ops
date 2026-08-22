---
name: Spindle
org: CyberAgent (Ameba)
coverage: partial
url: https://spindle.ameba.design
repo: https://github.com/openameba/spindle
license: MIT
tech: [CSS, React]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: "Its own guidelines, based on WCAG 2.1 (Ameba Accessibility Guidelines — confirmed 2026-08-18)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @openameba/spindle-tokens@1.10.0 → dist/css/*.css · npm @openameba/spindle-ui@3.3.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](spindle.ko.md)
<!-- /lang-links -->

## In one line

Ameba's (CyberAgent's) system — **the same spacing token holds different values across
three viewport-specific CSS files**, it is **the only sample to tokenise the View
Transitions API**, and the font-stack names carry **version numbers**.

## Tokens

### Spacing — 20 steps × 3 viewports × 2 families

Three files, `spacing-{desktop,tablet,mobile}.css`, put **different values under the same
variable names**:

| | desktop | mobile |
|---|:---:|:---:|
| `absolute-spacing-lv1` | **4px** | **2px** |
| `absolute-spacing-lv3` | 8px | 6px |
| `absolute-spacing-lv20` | 96px | (reduced) |

- **Spacing split by viewport** — the same call as Spectrum's desktop/mobile sets,
  implemented by swapping CSS files
- Two parallel families, `relative-*` (rem) and `absolute-*` (px) — the same distinction as
  Cloudscape's scaled/static
- Desktop absolute: `4 6 8 12 14 16 20 24 28 36 40 44 48 56 64 72 80 84 88 96` — even
  numbers throughout, including 14. Fine 4px steps like 84 and 88 appear at the top too

### Motion — verb semantics plus View Transitions

Above four raw easings and four durations sits **a layer of verb semantics**:

```
move · appear-in · disappear · in-view · out-of-view ·
content-change · scale-up · scale-down (+ -pop / -fast variants)
```

- `ease-out-bounce: cubic-bezier(0.55, 2.05, 0.65, 0.75)` — **an overshoot of 2.05**, the
  largest bezier in the sample (beating TDS's `back` at 1.56)
- **`view-transition.css` tokenises MPA page transitions** — unique in the sample.
  It sets `@view-transition { navigation: auto }`, hangs fade-plus-slide combination
  variables on `::view-transition-old/new(root)`, and disables the whole thing under
  `prefers-reduced-motion`. The first sample in which "page transition" falls under the
  jurisdiction of design tokens

### Shadow — filter and box-shadow kept separate

```
--drop-shadow-lv2-normal: 0 3.25px 3.875px 0 #08121a1f
--box-shadow-lv2-normal:  0 3.25px 7.75px 0 #08121a1f
```

- **Two families, `drop-shadow` (for filter) and `box-shadow`** — at the same level the
  blur differs (3.875 vs 7.75). The only case in the sample of compensating for the
  rendering difference between filter and box-shadow in the values themselves
- **The blurs are fractional px** (3.25 / 3.875 / 4.75 / 7.125) — sub-pixel shadows
- Nine combinations, lv2/4/6 × weak/normal/strong, in three alpha steps of `#08121a`

### Type — version numbers in the stack

```
--font-font-family-basic-version-1: Meiryo, 'Yu Gothic Medium', system-ui, …
--font-font-family-basic-version-2: 'Helvetica Neue', …, 'Hiragino Sans', …
```

**`version-1` and `version-2` coexist in the font-stack tokens** — a case of a migration
state surfacing in a token name (the same kind of signal as TDS's old-scope traces).

### What is missing

This package has **no colour and no font-size tokens** — it ships only spacing, shadow,
motion and font stacks. The exact opposite cut from Semi (which ships colour only).
→ **The colours turned out to be bundled in the `spindle-ui` package** (confirmed
2026-08-18, the deep pass). Font sizes are absent from the UI package too; there are only
em literals in the components.

## Components in depth — (2026-08-18)

Measured from `@openameba/spindle-ui@3.3.0` (per-component CSS plus a combined `index.css`,
with a `spui-` class prefix). **The colours missing from the token package were here** —
the other half of the "partial distribution cut" is bundled into the `:root` of the UI
package's `index.css`, in two tiers, raw and semantic.

### Colour (bundled in the UI package) — the cut explained

- Raw: 11 steps of `primary-green` (5–100) · **a dual solid/alpha ramp** of gray (11 steps
  each) · focus-blue · highlight-yellow · seven expressive hues.
- **Third-party social brand colours are tokens** — facebook · twitter · **x** · instagram ·
  apple · youtube · amazon · rakuten · yahoo, two colours each
  (`--color-third-party-*`). The only case in the sample of raising other companies' brand
  colours, for social sign-in and share buttons, into the official token layer.
- **Two focus semantics**: `--color-focus-clarity` (#0091ff, opaque) and
  `--color-focus-ambiguous` (30% alpha) — focus indication split into a clear and a subtle
  step.

### Buttons (`.spui-Button`) — a pill radius by em arithmetic

| | small | medium | large |
|---|:--:|:--:|:--:|
| min-height | 32px | 40px | 48px |
| type | .8125em (13px) | .875em (14px) | 1em (16px) |
| padding | 6×10px | 8×16px | 8×16px |
| radius | **2.46154em** | **2.85714em** | **3em** |

- **The radius is em arithmetic** — 2.46154×13 = 32, 2.85714×14 = 40, 3×16 = 48: at each
  size it yields exactly the same px as the min-height, **a pill implemented in em**.
  The same goal as Charcoal's (999999px) by different means.
- outlined and danger take a **2px border**, and only at small is the block padding reduced
  6→5px to account for it (the same intention as MUI and Vibes, applied partially).
- **Every hover sits inside an `@media (hover: hover)` guard** — touch first. The only
  sample that manages `-webkit-tap-highlight-color` as a token.
- Disabled opacity .3. A `height: 1px` hack for IE high-contrast mode is still present.
- Five variants: contained · outlined · **lighted** (a pale green fill) · neutral · danger.
  Focus is a 2px clarity outline with a 1px offset, released by
  `:focus:not(:focus-visible)` — except **inside a modal, where it is replaced by a
  box-shadow ring** (avoiding interference with the backdrop).

### Inputs (`.spui-TextField`)

- Two heights, 48/40px (the button's 32px step is absent), radius 8px, a 1px
  medium-emphasis border, padding 0 16px, type 1em.
- Focus = a darker border plus **a 3px `focus-ambiguous` alpha ring** — the other focus
  token from the button's (a clarity outline). The two-way split does real work.
- It uses the **`:user-invalid` pseudo-class** — the newest form-validation selector in the
  sample. Under `prefers-reduced-motion` the transition shrinks to 0.1ms.

### Dialogs and modals — a native `<dialog>` plus @starting-style

- **`<dialog>` + `@starting-style` + `transition: display allow-discrete`** — the only
  sample implementing enter and exit with the 2024 CSS trio. There is no JS transition
  library, and background scroll is locked with `html:has(:modal)`.
- Dialog (a confirmation): **352px wide, 328px at ≥768px** — **an inversion where desktop
  is narrower than mobile**. Radius 20px, backdrop `rgba(0,0,0,.8)`, asymmetric .35s enter
  / .15s exit, `cubic-bezier(0,0,0,1)`.
- SemiModal: two forms, popup and sheet, × widths small 480 / medium 840 / large 1024px.
  The sheet slides up with translateY(100%). AppealModal (promotional) is slower at .5s —
  duration graded by purpose.
- Shadow `0 11px 28px rgba(8,18,26,.12)` — matching the `#08121a` shadow colour from the
  token section.

### Characteristic decisions (from the deep pass)

- **A native `<dialog>` plus @starting-style and allow-discrete** — unique in the sample
- **Colours bundled in the UI package** — the answer to the token package's cut was where it
  ships
- **A pill radius by em arithmetic** (radius = min-height)
- **Two focus tokens (clarity/ambiguous) dividing the work** — a button outline vs an input
  ring
- **Social brand-colour tokens** plus a blanket `@media (hover:hover)` guard on hover
- Inverted dialog widths (mobile 352 > desktop 328px)

## Characteristic decisions

- **Three viewport-specific CSS files** — the same token names, different values (mobile
  lv1 = 2px, desktop 4px)
- **The View Transitions API tokenised** — unique in the sample, and the first token data on
  page transitions
- **Separate drop-shadow/box-shadow families plus fractional-px blur** — unique in the sample
- A 2.05 overshoot bezier — the largest in the sample
- Version numbers in the font stack — a migration surfacing in token names
- Verb-form motion semantics (move/appear/disappear/in-view …)
- No colour and no sizes — a partial-distribution cut

## Accessibility

- The whole View Transition is disabled under `prefers-reduced-motion` (built into the token
  file)
- ~~Otherwise unverified~~ → **Its own guidelines, based on WCAG 2.1 (resolved 2026-08-18).**
  Source: `spindle.ameba.design/principles/accessibility/` — "WCAG2.1の内容を簡略化し、
  Amebaのサービスでよくある事例を追加したガイドラインを独自で作成" (the Ameba Accessibility
  Guidelines). **The same structure as SmartHR** — rather than adopting WCAG as the stated
  target, it translates it into guidelines of its own.

## References

- Tokens: `npm pack @openameba/spindle-tokens@1.10.0`
- Components in depth: `npm pack @openameba/spindle-ui@3.3.0` →
  `index.css` plus `<component>/*.css` (2026-08-18)
- **Open questions:** ~~colour (presumed inside `spindle-ui` — not surveyed)~~ (resolved
  2026-08-18 — bundled in the UI package's `index.css`, the deep pass), type size tokens
  (still absent — only em literals in the components), the Figma kit,
  `spindle-mcp-server` (the only sample that ships an MCP server — not surveyed)
