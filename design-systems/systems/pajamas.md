---
name: Pajamas
org: GitLab
coverage: partial
url: https://design.gitlab.com
repo: https://gitlab.com/gitlab-org/gitlab-ui
license: MIT
tech: [Vue, SCSS, Tailwind]
figma_kit: true
tokens_format: [JSON, CSS, SCSS, Tailwind]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @gitlab/ui@136.2.0 → src/tokens/build/json/tokens.json (re-verified and updated from 136.1.0)"
---
<!-- lang-links -->
> **English** · [한국어](pajamas.ko.md)
<!-- /lang-links -->

## In one line

GitLab's design system for its DevOps platform.
**The only case of putting `clamp()` fluid sizes into typography tokens.**

## Tokens

### Spacing — the index is not a constant multiple

The bottom is dense and the top is sparse.

| index | rem | px |
|:---:|:---:|:---:|
| `0` | 0 | 0 |
| `px` | — | **1** |
| `1` | 0.125 | 2 |
| `2` | 0.25 | 4 |
| `2-5` | 0.375 | **6** |
| `3` | 0.5 | 8 |
| `4` | 0.75 | 12 |
| `5` | 1 | 16 |
| `6` | 1.5 | 24 |
| `7` | 2 | 32 |
| `8` | 2.5 | 40 |
| `9` | 3 | 48 |
| `10` | 3.5 | 56 |
| `11` | 4 | 64 |
| `11-5` | 4.5 | **72** |
| `12` | 5 | 80 |
| `13` | 6 | 96 |

Up to here the index is roughly sequential. After that **it jumps.**

```
15 → 120    18 → 144    20 → 160    26 → 208    28 → 224
30 → 240    31 → 248    33 → 264    34 → 272    37 → 296
48 → 384    62 → 496    75 → 600    80 → 640    88 → 704
```

**The upper values (496 · 600 · 704px) are in the range of container sizes.** The source
draws no distinction between whitespace and layout width.
The same structure as Codex (Wikimedia) merging whitespace and width into one `size` scale,
and **GitLab carries that merged scale all the way to 704px.**

There are **fractional indices** like `2-5` and `11-5` (6px, 72px) — steps inserted later.

On the SCSS side, `$grid-size: 8px` is defined separately.

Source: `src/tokens/build/json/tokens.json` → `spacing-scale`

### Radius

| token | rem | px |
|------|:---:|:---:|
| `none` | — | 0 |
| **`xs`** | — | **1** |
| `sm` | 0.125 | 2 |
| `md` | 0.25 | 4 |
| `lg` | 0.5 | 8 |
| `xl` | 0.75 | 12 |
| `2xl` | 1 | 16 |
| `3xl` | 1.5 | 24 |
| `full` | — | 9999 |
| `default` | → `md` | 4 |

**`xs` is 1px** — the smallest radius step in the sample, and Pajamas is the only system to
make a 1px radius a token.

The `default` alias points at `md` (4px) — the same approach as Primer's
`borderWidth.default`.

### Typography — `clamp()` fluid sizes

**Heading sizes vary with the viewport.** The token value is itself a `clamp()`.

| heading | value | actual range |
|------|-----|-----------|
| `heading.1` | `clamp(1.5rem, 0.8333rem + 1.3889vw, 1.875rem)` | 24 → 30px |
| `heading.2` | `clamp(1.3125rem, 0.8681rem + 0.9259vw, 1.5625rem)` | 21 → 25px |
| `heading.3` | `clamp(1.125rem, 0.9028rem + 0.463vw, 1.25rem)` | 18 → 20px |
| `heading.4` | `1rem` | 16px (fixed) |
| `heading.5` | `0.875rem` | 14px (fixed) |
| `heading.6` | `0.8125rem` | 13px (fixed) |

**Only h1–h3 are fluid; h4–h6 are fixed.**

There is also a separate eight-step scale, `heading.scale.100` through `800`, and
**every step has a paired `-fixed` variant.**

```
heading.scale.500         clamp(1.125rem, …, 1.25rem)   ← fluid
heading.scale.500-fixed   1.125rem                       ← fixed
```

**Fluid or fixed is a choice made at the token level.** Unique in the sample.

### Composite tokens — headings include their margins and colour

The `heading.*` tokens are objects rather than single values.

```js
heading.1 = {
  fontWeight: 600,
  fontSize: 'clamp(...)',
  lineHeight: 1.25,
  letterSpacing: '-0.01em',
  marginTop: '0px',
  marginBottom: '1rem',
  color: '#18171d',
}
```

**`marginTop`, `marginBottom` and `color` are all inside the typography token.**
Spacing tokens exist separately, and yet heading margins were put on the typography side.

Tracking is `-0.01em` for h1–h2 and `inherit` from h3 down.

### Colour / shadow / other

The top-level categories of `tokens.json`:

```
border · color · font · heading · line-height · opacity · shadow
spacing-scale · zindex
```

Per-component tokens live in the same file — `alert` · `avatar` · `badge` · `banner` ·
`breadcrumb` · `broadcast` · `button` · `card` · `chart` · `datepicker` · `drawer` and more.

**Light and dark are separate files** (`tokens.json` / `tokens.dark.json`).

### Build output — four formats

```
build/json/      tokens.json · tokens.dark.json
build/css/       tokens.css · tokens.dark.css
build/tailwind/  tokens.cjs · components.cjs
```

**The Tailwind config is generated from the tokens.** Pajamas is the only system in the
sample that ships a Tailwind output.

The token source carries a `com.figma.scopes` extension, so it links up with Figma variables.

## Components

Confirmed from the token categories: alert · avatar · badge · banner · breadcrumb ·
broadcast · button · card · chart · datepicker · drawer and many more.

## Components in depth — (2026-08-18)

`dist/index.css` (568KB, minified) of `@gitlab/ui@136.2.0` was split rule by rule and
measured. Being a system laid over Bootstrap(-Vue), **Bootstrap classes and gl classes
coexist in one selector**, as in `.gl-button.btn-sm`, and the modal animation is Bootstrap's
inheritance, used as-is.

### Buttons (`.gl-button`)

| | default | small |
|---|:--:|:--:|
| **min-height** | **2rem (32px)** | 1.5rem (24px) |
| **min-width** | **2rem (32px)** | 1.5rem (24px) |
| block padding | **0** | 0 |
| inline padding | 12px | 8px |
| radius | 8px | 8px |
| type | 14px / 16px | same |
| border | 1px | 1px |

- **Block padding is 0 and the height comes from `min-height`** — the permissive form that
  grows with the content (the Backpack family) — but by setting **`min-width` to the same
  value as `min-height`**, an icon button is automatically guaranteed to be square
  (32×32 / 24×24). There is no separate minimum width (of the MUI 64px kind).
- Two size steps (default and small) and **no large** — the opposite direction from
  Backpack's two (default and large). Both sizes share 14px type.
- The button text carries a `margin: -1px 0` + `padding: 1px 0` offset trick — correcting for
  ellipsis clipping.
- Variants: four families — default · confirm · danger · reset — × (default, secondary,
  tertiary), plus link and icon (measured from the CSS classes).

### Inputs (`.gl-form-input`)

- `height: auto` — a derived height of **32px** (16px line height plus 8px × 2 block
  padding), **aligning with the button's 32px.**
- Padding 8px / 12px, radius 8px, type 14px.
- **The border is an `inset box-shadow 1px` rather than a `border`** (`border-style: none`).
  Hover, focus and error are all expressed as combinations of box-shadow rings, and a real
  1px border is restored only under `@media (forced-colors: active)`.
- The label is a separate block (`.col-form-label`) — 14px / 16px / bold, 8px above the
  input.

### Modals (`.gl-modal`)

| step | width |
|------|-----|
| sm | 32rem (512px) |
| md | 48rem (768px) |
| lg | **61.875rem (990px)** |
| xl | 98% |

- Radius **16px** (`--gl-modal-border-radius` → `radius-2xl`) — twice the button's 8px.
- Padding: header 16px (reduced to 8px at the bottom) · body 16 inline / 8 block
  (min-height 80px) · footer 16 (8 at the top). At 575.98px and below the footer buttons
  stack vertically.
- The entrance animation is **Bootstrap's inheritance intact**: `translateY(-50px)→0` over
  300ms ease-out plus a fade. The gl layer does not redefine it.

### Easings — one literal, 53 times

Across the whole dist CSS, **a single curve, `cubic-bezier(.22,.61,.36,1)`, appears 53
times** (button transitions of 200ms across five properties, and so on). There are zero
easing tokens (`--gl-easing-*`, `--gl-duration-*`).
The same tokenlessness as Backpack (no tokens plus three scattered curves), but the opposite
sample: **there is no drift.**
`prefers-reduced-motion` handling (`transition-duration: .01ms !important`) is built into the
component CSS.

### Characteristic decisions (from the deep pass)

- **The radius variables reference the spacing variables** —
  `--gl-border-radius-lg: var(--gl-spacing-scale-3)`, `2xl: var(--gl-spacing-scale-5)`.
  At the CSS output layer the two scales are one lineage.
- **Button min-width = min-height** — a square floor obtained without a separate rule
- **The input border as a box-shadow** with forced-colors restoration — state consolidated
  into one property
- **No easing tokens plus one literal used 53 times** — tokenless yet consistent
- Buttons at 32px and inputs at 32px aligned, with two steps and no large

## Characteristic decisions

- **It uses `clamp()` as a token value.** Heading sizes vary with the viewport.
  The same purpose as GOV.UK's per-breakpoint maps, solved by Pajamas with a single CSS
  function.
- **Fluid and fixed ship as a pair** — `heading.scale.500` / `-fixed`.
  The same idea as Cloudscape's `scaled`/`static` duality.
- **The `xs` radius is 1px** — unique in the sample.
- **The spacing indices are irregular.** Sequential to 13, then jumping through 15 · 18 · 20 ·
  26 · … · 88, with fractional indices like `2-5` and `11-5`.
- **Whitespace and layout width share one scale**, reaching 704px. The same structure as
  Codex.
- **The typography tokens are composite objects**, holding not just size, line height and
  tracking but margins and colour.
- **A Tailwind output ships** — four formats in all: JSON, CSS, SCSS and Tailwind.

## Accessibility

Unverified.

## References

- Documentation: https://design.gitlab.com
- Repository: https://gitlab.com/gitlab-org/gitlab-ui (**on GitLab, not GitHub**)
- Package: `@gitlab/ui` (components in depth: `@gitlab/ui@136.2.0` → `dist/index.css`,
  2026-08-18)
- Tokens: `src/tokens/build/json/tokens.json`
- Licence: the package's `package.json` states **MIT** — reflected in the frontmatter
  (2026-08-18)
- **Note:** `src/scss/tokens.scss` is a shell that imports `../tokens/build/css/tokens`.
  The real values are under `src/tokens/build/`.
- **Licence resolved (2026-08-18):** `MIT` — source: npm `@gitlab/ui@136.2.0` →
  `package.json`. The repository is on GitLab, so it is not subject to a GitHub API lookup
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `design.gitlab.com` →
  `figma.com/community/file/781156790581391771`

## Drift record — 136.1.0 → 136.2.0 (2026-08-17)

**Sixteen `nav.item` colours actually changed** in a single minor — the selected state moved
from a dark chip (background `#3a383f` with white text) to **a light chip (`#dcdcde` with
dark text)**, and the hover/active backgrounds moved from alpha
(`rgba(5,5,6,.06/.16)`) to **opaque greys**. A change of direction in how navigation selection
is expressed, and the reference structure changed too, from `action.neutral.*` to
`color.neutral.600`. The **third real change** caught by the freshness loop (after Base Web's
staleness and Mística's HC removal).
