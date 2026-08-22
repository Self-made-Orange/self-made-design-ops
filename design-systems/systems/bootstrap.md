---
name: Bootstrap
org: Bootstrap (open source)
coverage: partial
url: https://getbootstrap.com
repo: https://github.com/twbs/bootstrap
license: MIT
tech: [CSS, Sass]
figma_kit: unverified
tokens_format: [Sass, CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm bootstrap@5.3.8 → scss/_variables.scss, _variables-dark.scss, mixins/_transition.scss"
---
<!-- lang-links -->
> **English** · [한국어](bootstrap.ko.md)
<!-- /lang-links -->

## In one line

The oldest CSS framework. Its tokens are **Sass variables**, and
**17 `$enable-*` build flags** switch features on and off entirely — an axis unique in the
sample.

## Tokens — Sass variables plus `--bs-` CSS variables

```scss
$prefix: bs- !default;   // the CSS variable prefix
```

At build time it generates `--bs-*` CSS custom properties from the Sass variables.
**The `!default` flag means redefining them before the `@import` overrides them** —
a **build-time override** rather than a runtime multiplier (Mantine, Radix Themes).

### Spacing — six steps, with no 32px

```scss
$spacer: 1rem !default;
$spacers: (
  0: 0,
  1: $spacer * .25,   // 4px
  2: $spacer * .5,    // 8px
  3: $spacer,         // 16px
  4: $spacer * 1.5,   // 24px
  5: $spacer * 3,     // 48px
);
```

| key | value |
|:---:|:---:|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | **16px** |
| 4 | 24px |
| 5 | **48px** |

**The core `4/8/16/24` are all present and `32` is missing.** After 24 it jumps to 48 —
the second case in `tokens/scales.md` of a missing 32px (after Nord).

**`12` and `20` are absent too.** With Protocol (six steps) and Mantine (five), it has one
of the sparsest scales in the sample.

**Everything derives by multiplication from the single `$spacer`** — the same approach as
Tailwind's `--spacing`, except **the results are emitted as a finite map** (Tailwind never
produces the list).

`$enable-negative-margins` defaults to **`false`** — negative whitespace is opt-in,
unlike Primer and Atlassian, which provide negative spacing by default.

### Radius — `pill` is 50rem

| token | value | px |
|------|:---:|:---:|
| `$border-radius-sm` | .25rem | 4 |
| **`$border-radius`** | **.375rem** | **6** |
| `$border-radius-lg` | .5rem | 8 |
| `$border-radius-xl` | 1rem | 16 |
| `$border-radius-xxl` | 2rem | 32 |
| **`$border-radius-pill`** | **50rem** | **800** |

**The default is 6px** — the same as Ant Design's.
With no `12`, `20` or `24`, 8 is followed by 16.

**`pill` is 50rem = 800px** — the eighth form of expressing a full circle
(`tokens/scales.md`).

| approach | value | systems |
|------|:---:|--------|
| a large constant | 9999px | Polaris · Atlassian |
| | 10000px | Fluent 2 |
| | 999px | Nord |
| | **`1e5px`** | **Open Props** |
| | **50rem (800px)** | **Bootstrap** |
| fixed px | 100px | Paste |
| | **15rem (240px)** | **Lightning** |
| ratio | 50% · 0.5 | Paste · Gestalt · Nord · Spectrum |
| container query | 50cqmin | Material 3 |

**Bootstrap is the only one to use `rem`** — the value grows as the root font size does.
At 800px it stops being a pill on anything larger (the same limit as Lightning's 240px).

`$enable-rounded` is **`true`**; setting it to `false` removes the radius from every
component.

### Borders — 1 to 5px

| token | value |
|------|:---:|
| `$border-widths` 1–5 | 1 · 2 · 3 · 4 · 5px |
| `$border-width` (the default) | 1px |
| `$border-color-translucent` | `rgba($black, .175)` |

**Five even 1px steps** — denser than the sample's majority (1/2/4), and including 3 and 5px.

**`$border-color-translucent` is an alpha border** — working regardless of the surface
colour in dark mode. The same purpose as shadcn/ui switching to alpha only in dark
(`patterns/color.md`).

### Typography — headings derived by multiplication

```scss
$font-size-base: 1rem !default;      // 16px
$h1-font-size: $font-size-base * 2.5;    // 40px
$h2-font-size: $font-size-base * 2;      // 32px
$h3-font-size: $font-size-base * 1.75;   // 28px
$h4-font-size: $font-size-base * 1.5;    // 24px
$h5-font-size: $font-size-base * 1.25;   // 20px
$h6-font-size: $font-size-base;          // 16px
```

| step | multiplier | px |
|:---:|:---:|:---:|
| h1 | 2.5 | 40 |
| h2 | 2 | 32 |
| h3 | 1.75 | 28 |
| h4 | 1.5 | 24 |
| h5 | 1.25 | 20 |
| h6 | 1 | **16** |

**`h6` equals the body.** Mantine has the same structure, with `h6` (14px) matching the body
`sm` (`patterns/typography.md`).

**The multiplier gaps narrow** — 0.5 / 0.25 / 0.25 / 0.25 / 0.25.
Only `h1` opens up by a large margin.

**The body is 16px and there is no 14px step.**

Three line heights — `base` 1.5 · `sm` 1.25 · `lg` **2**.
Headings take a separate `$headings-line-height: 1.2`, **tighter than the body's minimum
(1.25).**

`$headings-font-weight: 500` — the fourth case of unifying heading weight, and
**the smallest value.**

| system | heading weight |
|--------|:---:|
| **Bootstrap** | **500** |
| Pajamas | 600 |
| Atlassian | 653 |
| Mantine | 700 |

**All four values differ** (`patterns/typography.md`).

`$enable-rfs` (Responsive Font Sizes) is **`true`** — sizes vary with the viewport.
The same purpose as Pajamas's `clamp()`, **implemented as a Sass mixin.**

### Breakpoints and containers — a 12-column grid

| breakpoint | value | container max width |
|:---:|:---:|:---:|
| `xs` | **0** | — |
| `sm` | 576px | 540px |
| `md` | 768px | 720px |
| `lg` | 992px | 960px |
| `xl` | 1200px | 1140px |
| `xxl` | 1400px | 1320px |

**`xs` is explicitly 0** — the mobile-first reference point, verified at build time by
`_assert-starts-at-zero`.

**The container is always narrower than the breakpoint** (−36 / −48 / −32 / −60 / −80px),
and the difference is not constant.

| item | value |
|------|:---:|
| `$grid-columns` | **12** |
| `$grid-gutter-width` | 1.5rem (24px) |
| `$grid-row-columns` | 6 |

**Bootstrap is the only system to make the column count a token.**
Chakra UI puts twelfths-based fractions in `sizes`, but the column count itself is not a
token.

`768px`, `992px` and `1200px` are exactly the same px as Mantine's `48em`, `62em` and `75em`
(`systems/mantine.md`).

### z-index — nine steps

| token | value |
|------|:---:|
| `$zindex-dropdown` | 1000 |
| `$zindex-sticky` | 1020 |
| `$zindex-fixed` | 1030 |
| **`$zindex-offcanvas-backdrop`** | 1040 |
| `$zindex-offcanvas` | **1045** |
| `$zindex-modal-backdrop` | 1050 |
| `$zindex-modal` | **1055** |
| `$zindex-popover` | 1070 |
| `$zindex-tooltip` | 1080 |

**It starts at `dropdown` 1000** — as Chakra UI and Open Props do.

**The increments are 10–20, and the overlays are 5.** `offcanvas-backdrop` (1040) and
`offcanvas` (1045), and `modal-backdrop` (1050) and `modal` (1055), differ by 5 —
**the backdrop and its content are pinned adjacent so nothing can slip between them.**

In contrast to Chakra UI's 13 steps in hundreds.

| system | steps | range | backdrop/content separation |
|--------|:---:|:---:|:---:|
| **Chakra UI** | 13 | −1 to int32 max | none |
| **Bootstrap** | 9 | 1000–1080 | **yes (+5)** |
| Open Props | 5 + 1 | 1–5, int32 max | none |

### Shadow — four steps, off by default

| token | value |
|------|-----|
| `$box-shadow-sm` | `0 .125rem .25rem rgba(black, .075)` |
| `$box-shadow` | `0 .5rem 1rem rgba(black, .15)` |
| `$box-shadow-lg` | `0 1rem 3rem rgba(black, .175)` |
| `$box-shadow-inset` | `inset 0 1px 2px rgba(black, .075)` |

**`$enable-shadows` defaults to `false`.** The shadows are defined but not applied to the
components.

The alpha grows 0.075 → 0.15 → 0.175, and **the blur triples each step**, 4px → 16px → 48px.

### Motion — transitions by purpose

| token | value |
|------|-----|
| `$transition-base` | `all .2s ease-in-out` |
| `$transition-fade` | `opacity .15s linear` |
| **`$transition-collapse`** | **`height .35s ease`** |
| **`$transition-collapse-width`** | **`width .35s ease`** |

**Property, duration and easing are bound into one value** — the same structure as Nord's
(`0.2s ease`).

**`collapse` is the longest at 0.35s.** Height and width animations get their own tokens with
the transitioned property named — the same judgement as Codex and Atlassian in avoiding `all`
(`patterns/motion.md`).

Only `$transition-base` uses `all`.

## The 17 `$enable-*` build flags — an axis unique in the sample

These are not tokens but **feature switches**: at build time the CSS output itself changes.

| flag | default | what it covers |
|--------|:---:|------|
| `$enable-rounded` | `true` | radius everywhere |
| **`$enable-shadows`** | **`false`** | shadows everywhere |
| **`$enable-gradients`** | **`false`** | gradients |
| `$enable-transitions` | `true` | transitions |
| **`$enable-reduced-motion`** | **`true`** | **`prefers-reduced-motion` support** |
| `$enable-smooth-scroll` | `true` | `scroll-behavior` |
| **`$enable-button-pointers`** | **`true`** | **`cursor: pointer` on buttons** |
| `$enable-rfs` | `true` | responsive font sizes |
| **`$enable-negative-margins`** | **`false`** | negative whitespace |
| `$enable-dark-mode` | `true` | dark mode |
| `$enable-grid-classes` | `true` | grid utilities |
| **`$enable-cssgrid`** | **`false`** | CSS Grid (experimental) |
| `$enable-container-classes` | `true` | containers |
| `$enable-caret` | `true` | the dropdown caret |
| `$enable-validation-icons` | `true` | form validation icons |
| `$enable-important-utilities` | `true` | `!important` utilities |
| `$enable-deprecation-messages` | `true` | build warnings |

**`$enable-button-pointers` turns the Chakra UI ↔ Radix Themes disagreement into a setting.**

| system | button cursor |
|--------|:---:|
| Chakra UI | `pointer` (fixed in the token) |
| Radix Themes | `default` (fixed in the token) |
| **Bootstrap** | **`pointer` (switchable off by flag)** |

**A third answer** — it does not settle the value but hands over the choice.

**`$enable-reduced-motion` is a flag.** `mixins/_transition.scss` wraps
`@media (prefers-reduced-motion: reduce)` around the transitions.

| how reduced motion is handled | systems |
|------------------|--------|
| `disabled: 0ms` in the token values | Cloudscape |
| animation blocks wrapped in `no-preference` | Radix Themes |
| **a build flag plus a mixin** | **Bootstrap** |

**Three different approaches** (`patterns/motion.md` · `patterns/modal.md`).

**`shadows` and `gradients` are off by default.** The values are defined and applying them is
opt-in — **the only case where "the token exists" and "the token is used" are separated.**

## Components

Confirmed from the Sass files — `_spinners.scss` · `_progress.scss` ·
`_offcanvas.scss` · `_modal.scss` and others. The total was not counted.

## Components in depth — (2026-08-18)

Source: `bootstrap@5.3.8` → `scss/_variables.scss` · `_buttons.scss` · `_modal.scss`.

### Buttons and inputs — the dimensions branch from the same variables

**There is a shared `$input-btn-*` variable tier.** `$btn-padding-y: $input-btn-padding-y`
and `$input-padding-y: $input-btn-padding-y` — buttons' and inputs' padding, type, line
height, border and focus all derive from one variable group. Where Blueprint and Mantine
share height **values**, Bootstrap **enforces the alignment through the variable structure**
(a third approach in the `patterns/form.md` family).

**There is no height token** — the height derives from
`padding×2 + type×line height + border×2`.

| | sm | default | lg |
|---|:--:|:--:|:--:|
| height (derived) | 31 | **38** | 48px |
| block padding | 4 | 6 | 8px |
| inline padding | 8 | 12 | 16px |
| type | 14 | 16 | 20px |
| radius | 4 | 6 | 8px |

- A fixed line height of 1.5 — the height computation is
  `16×1.5 + 6×2 + 1×2 = 38px` by default.
  **That default of 38px is 2px off the sample's 40px majority**, and it is a result of
  arithmetic rather than a declaration. The input follows the same formula, so `$input-height`
  exists only as an `add()` expression (`add($input-line-height * 1em, …)`).
- **There is no minimum width** — parting from Chakra (minW = height) and Blueprint
  (min-width = height).
- **The button weight is 400** (`$font-weight-normal`) — lighter than the 500–600 majority.
- Transition: `color, background-color, border-color, box-shadow`, each at `.15s ease-in-out`
  — **four properties enumerated**, avoiding `all`.
- From 5.3 on, `.btn` **redeclares 15 `--bs-btn-*` CSS variables** — a runtime CSS-variable
  tier over the build-time Sass one.
- The cursor rides the `$enable-button-pointers` flag directly
  (`cursor: if($enable-button-pointers, pointer, null)`).

### Modals — four widths, with transform and opacity on different time axes

| size | width |
|:---:|:---:|
| `$modal-sm` | 300px |
| **default (`md`)** | **500px** |
| `$modal-lg` | 800px |
| `$modal-xl` | 1140px |

- **A default width of 500px** — the same value as Blueprint's single 500px.
  The `xl` at 1140px is identical to its own `xl` container max width.
- Padding `$modal-inner-padding: $spacer` = **16px** (header and body).
  **Only the footer is `16px − gap(8px)×0.5 = 12px`** — a correction subtracting half the
  button gap from the padding, written as a `calc()` (`_modal.scss` line 166).
- Radius `lg` (8px), with **the inner radius computed as `subtract(outer, border)`** — the
  correction reducing the inner radius by the border's thickness is done at the variable tier.
- 8px of block margin, rising to 28px (`1.75rem`) from the `sm` breakpoint.
- The backdrop is `$black` at **0.5** opacity.

The animation:

| property | value |
|------|-----|
| entrance transform | `translate(0, -50px)` → `none`, **`.3s ease-out`** |
| opacity (`.fade`) | `.15s linear` |
| the static-backdrop refusal motion | `scale(1.02)` |

- **transform (300ms) and opacity (150ms) run on separate time axes** — the drop-in takes
  twice as long as the fade. The opposite of Nord's approach of binding them into one
  transition token.
- **A −50px drop-in from above** — the movement family, parting from scale entrances
  (Chakra 0.95, Blueprint 0.5).
- **The static backdrop's "refuse to close" motion is a variable**
  (`$modal-scale-transform: scale(1.02)`) — the feedback of a modal that grows slightly and
  returns when a blocked background click occurs. The first case in the sample of a refusal
  motion held as a variable.

## Characteristic decisions

- **17 `$enable-*` build flags.** Feature switches rather than tokens, unique in the sample
- **`shadows`, `gradients`, `cssgrid` and `negative-margins` are off by default.**
  Defining a value and applying it are separated
- **The button cursor is a flag** — a third answer to the Chakra (`pointer`) vs
  Radix Themes (`default`) opposition
- **`prefers-reduced-motion` handled through a build flag plus a Sass mixin**
- **Six spacing steps with no 32px** (0/4/8/16/24/48). The second case after Nord
- **Negative whitespace is opt-in** — Primer and Atlassian provide it by default
- **`pill` is 50rem (800px).** Bootstrap is the only one to express a circle in `rem`
- **Heading weight 500** — the smallest of the four unified cases (Pajamas 600 ·
  Atlassian 653 · Mantine 700)
- **`h6` is the same size as the body** (16px)
- **The heading line height (1.2) is tighter than the body's minimum (1.25)**
- **In z-index, backdrop and content are pinned +5 apart** (`modal-backdrop` 1050 /
  `modal` 1055)
- **`$grid-columns: 12`** — the only case of making the column count a token
- **Five even 1px border steps** (including 3 and 5px)
- **The transition tokens are composites of property, duration and easing**
  (`height .35s ease`), with `collapse` the longest at 0.35s
- **`!default`-based build-time overrides** — not runtime CSS-variable multipliers

## Accessibility

- **`$enable-reduced-motion`** — `mixins/_transition.scss` wraps
  `prefers-reduced-motion: reduce` support. The same media query appears in
  `_spinners.scss`, `_progress.scss` and `_reboot.scss` too
- `$enable-validation-icons` — form validation uses an icon alongside colour
  (state is not conveyed by colour alone)
- `$enable-smooth-scroll` — `scroll-behavior` is released under reduced-motion too
- ~~No explicit WCAG target was found in the variable files~~ →
  **confirmed to declare no conformance target (2026-08-18 — the frontmatter's `null`).**
  Source: `getbootstrap.com/docs/5.3/getting-started/accessibility/` — "it should be
  perfectly possible to create websites and applications with Bootstrap that fulfill
  WCAG 2.2 (A/AA/AAA), Section 508". **It says only that it is achievable and does not
  declare its own conformance.** It even warns that its default palette may fall short of
  WCAG 2.2's contrast requirements (4.5:1 for body, 3:1 for non-text) — the only case in the
  sample of stating its own shortfall.

## References

- Documentation: https://getbootstrap.com
- Repository: https://github.com/twbs/bootstrap
- Tokens: `npm pack bootstrap@5.3.8` → `package/scss/_variables.scss`
- Dark mode: `package/scss/_variables-dark.scss`
- The reduced-motion mixin: `package/scss/mixins/_transition.scss`
- Components in depth: `package/scss/_buttons.scss` · `_modal.scss` ·
  `_variables.scss` lines 786–931 (input-btn, btn, form-input) and 1500–1541 (modal)
  (2026-08-18, bootstrap@5.3.8)
- **Open questions:** the colour palette's steps, the total component count,
  the scope of `_variables-dark.scss`'s overrides, and the RFS mixin's actual formula
