---
name: Nord
org: Nordhealth
coverage: partial
url: https://nordhealth.design
repo: "github.com/nordhealth/design-system — declared in the package.json of @nordhealth/css and icons, but access prompts for authentication (private or deleted), confirmed 2026-08-18"
license: Proprietary (Nordhealth internal use only — redistribution prohibited)
tech: [Web Components, Vue, React]
figma_kit: unverified
tokens_format: [JSON, CSS]
a11y_target: "WCAG 2.1 AA (stated — accessibility statement, confirmed 2026-08-18)"
platform: web
domain: health
verified: 2026-08-18
source: "npm @nordhealth/tokens@9.0.4 → lib/tokens.json · npm @nordhealth/components@5.3.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](nord.ko.md)
<!-- /lang-links -->

## In one line

Nordhealth's design system for medical software.
**The only healthcare-domain system in the collection.**

## Tokens

### Spacing — six steps, on an irregular multiplier

| token | value | vs. the previous step |
|------|-----|:---:|
| `n_space_xs` | 4px | — |
| `n_space_s` | 8px | ×2 |
| `n_space_m` | 16px | ×2 |
| `n_space_l` | 24px | ×1.5 |
| `n_space_xl` | 36px | ×1.5 |
| `n_space_xxl` | 72px | ×2 |

The multiplier rises and falls: **×2 → ×2 → ×1.5 → ×1.5 → ×2**.
36px and 72px are multiples of 4 but not of 8, and both are rare values elsewhere.

### Icon sizes — a separate scale

| token | value |
|------|-----|
| `n_size_icon_xxs` | 8px |
| `n_size_icon_xs` | 10px |
| `n_size_icon_s` | 12px |
| `n_size_icon_m` | 16px |
| `n_size_icon_l` | 24px |
| `n_size_icon_xl` | 36px |
| `n_size_icon_xxl` | 72px |

It shares its top four steps with spacing (16 · 24 · 36 · 72) and adds 8, 10 and 12px of
its own at the bottom.

### Radius

| token | value |
|------|-----|
| `n_border_radius_sharp` | **0.02em** |
| `n_border_radius_s` | 3px |
| `n_border_radius` | 5px |
| `n_border_radius_pill` | 999px |
| `n_border_radius_circle` | 50% |

**`sharp` is not 0 but `0.02em`** — a minuscule radius proportional to the font size.

### Other

Layout constants such as `n_size_top_bar: 52px`, 12 `n_index_*` (z-index) tokens, six
`n_line_*`, three `n_transition_*`, 16 `n_font_*` and 60 colours ship alongside.

High-contrast themes exist as separate files (`color-nord-high-contrast.json`,
`color-vet-dark-high-contrast.raw.json`).

Source: `@nordhealth/tokens@9.0.4` → `lib/tokens.json`

## Components

~~Unverified.~~ → Buttons, inputs and modals are in the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Measured from `@nordhealth/components@5.3.0` (Lit web components — the CSS is embedded in
the JS) and converted through `@nordhealth/tokens@9.0.4`. The token values needed:
`--n-font-size-s/m/l` = 12/14/16px · `--n-line-height-form` = **a fixed 20px** ·
`--n-transition-quickly` = **0.05s ease** · `--n-font-weight` = 400.

### Buttons (`nord-button`) — the height is arithmetic on spacing tokens

| | s | default (m) | l |
|---|:--:|:--:|:--:|
| **min-block-size** | `calc(l + xs)` = **28px** | `space-xl` = **36px** | `calc(xxl − l)` = **48px** |
| block padding | `calc(xs − 1px)` = 3px | `calc(s / 1.6)` = **5px** | (derived) |
| inline padding | `calc(s + 1px)` = 9px | `calc(m / 1.2)` = **13.33px** | `calc(l / 1.3)` = **18.46px** |
| radius | 3px | 3px | **5px** |
| type | 12px | 14px / 20px / **400** | 16px / **500** |

- **There are no dedicated component dimension tokens; the sizes are computed out of the
  six-step spacing scale** — the 48px height is `72 − 24`, 28px is `24 + 4`, and the
  paddings are **fractional divisions** like `16/1.2`. Keeping the token count at six is
  paid for by calc(), and it is unique in the sample.
- **The default weight is 400** — the lowest in the sample, against the 500–700 convention.
  Only large goes to 500.
- The transition is **50ms** (`transition-quickly`) — the fastest in the sample, a quarter
  to a fifth of Backpack's 200ms or MUI's 250ms.
- Every property is double-layered as `--_n-button-*: var(--n-button-*, var(--n-token))` —
  **a public override hook (`--n-button-*`) laid under every property**, the exact opposite
  signal from Backpack's `--bpk-private-*` (a declaration that overrides are forbidden).
- The background carries `linear-gradient(to bottom, #0000 50%, rgba(0,0,0,.013) 100%)` —
  a 1.3%-opacity micro-gradient by default.

### Inputs (`nord-input`)

| | s | default (m) | l |
|---|:--:|:--:|:--:|
| block-size | (derived, 28px) | **36px** (`space-xl`) | 48px (`calc(xxl − l)`) |
| block padding | 3px | `calc(h/2 − 20/2 − 1px)` = **7px** | the same formula |
| inline padding | `xs×1.6` = 6.4px | `s×1.6` = **12.8px** | 12.8px |
| type | 12px | 14px / 20px | 16px |

- **The default width is a fixed 240px** (`--n-input-inline-size: 240px`) — unlike the
  `width:100%` convention, it grows only when you opt in with `expand`.
- The block padding is not a value but **the height solved backwards**:
  `height/2 − line-height/2 − 1px border`. Buttons and inputs share the same 36/48, but the
  button gets there by dividing constants and the input by back-calculation.
- **At viewports ≤480px the type is promoted automatically from m (14) to l (16)** — iOS's
  auto-zoom prevention built into the component as a media query.
- Focus changes the border colour and adds `box-shadow: 0 0 0 1px` in the same colour — a
  2px ring composed from a border plus a shadow.

### Modals (`nord-modal`)

| size | max-inline-size |
|------|-----|
| s | 440px |
| default (m) | **620px** |
| l | 940px |
| xl | none (full width) |

- Radius 5px, entering with `translateY(-10px) scale(0.97)` plus a fade over **0.2s ease**
  (`transition-slowly`).
- The backdrop's top padding is `clamp(24px, min(10vh, 10vw) − 1em, 80px)` — **the modal is
  clamped toward the top rather than centred vertically**.
- The header gets a 1px bottom border and its own background (`--n-color-header`); body
  padding is asymmetric, 24px top and 36px bottom.
- The close button is 36×36px (reusing `space-xl`) with `::after { inset: -8px }` to
  **expand only the hit area to 52×52** — separating visual size from touch target.
- The responsive breakpoint is **`min-width: 489px`** — neither 480 nor 488 but an odd
  boundary (and different from the input's 480px breakpoint).

### Characteristic decisions (from the deep pass)

- **Dimensions = arithmetic on spacing tokens** (`calc(xxl − l)`, `/1.2 /1.6 /1.3`) — zero
  dedicated dimension tokens
- **A 50ms transition** — the fastest in the sample
- **Button default weight 400** · a fixed 240px default input width
- **A public override hook on every property** (the `--n-button-*` family) — the polar
  opposite of Backpack's private layer
- Automatic type promotion on mobile (≤480px) · the modal clamped toward the top

## Characteristic decisions

- **There is no true 0 radius.** The sharpest value is `0.02em`.
  At 16px that is about 0.32px, effectively zero — but the difference is that it is
  **proportional to the font size**. As the text grows, the corners round very slightly.
  It is the only approach of its kind in the sample.
- **The radii are 3px and 5px.** Like Helios (HashiCorp), it uses odd numbers.
  The default is 5px, off the 4px/8px convention.
- **The spacing multiplier is irregular.** It mixes ×2 and ×1.5.
  Most systems keep a constant multiplier or a constant difference; Nord varies it by
  interval.
- **It uses 36px and 72px** instead of 32px and 64px.
  36 is a multiple of 12 and 72 is twice 36, so both are multiples of 4 but neither fits an
  8px grid.
- **High-contrast themes are shipped as first-class**, one for each of the default and
  veterinary themes.
- **Every token carries the `n_` prefix.**

## Accessibility

High-contrast themes are provided at the theme level (for the default and veterinary themes
alike). An explicit conformance target is unverified.

## References

- Package: `@nordhealth/tokens` (the tokens live here, not in `@nordhealth/themes`)
- Related: `@nordhealth/css`
- Components in depth: `@nordhealth/components@5.3.0` → `lib/{Button,Input,Modal}.js` plus
  the shared `TextField-*.js` chunk (CSS embedded in Lit); values converted through
  `@nordhealth/tokens@9.0.4` (2026-08-18)
- Licence: the components package carries **Nordhealth's own licence**
  (`SEE LICENSE IN LICENSE.md` — not an open-source licence) — reflected in the frontmatter
  (2026-08-18)
- **Licence resolved (2026-08-18):** `Proprietary (Nordhealth internal use only —
  redistribution prohibited)` — source: npm `@nordhealth/tokens@9.0.4` → `LICENSE.md`.
  "solely for the purpose of performing your duties for and on behalf of Nordhealth" —
  **it is on public npm but it is not open source**
