---
name: Paste
org: Twilio
coverage: partial
url: https://github.com/twilio-labs/paste
repo: https://github.com/twilio-labs/paste
license: MIT
tech: [React]
figma_kit: unverified
tokens_format: [CSS, JSON, JS]
a11y_target: unverified
platform: [web, mobile]
domain: enterprise
verified: 2026-08-18
source: "npm @twilio-paste/design-tokens@10.15.0 → dist/tokens.custom-properties.css · npm @twilio-paste/button@15.0.2 · @twilio-paste/modal@17.0.1 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](paste.ko.md)
<!-- /lang-links -->

## In one line

Twilio's design system for its communications products. What sets it apart from other
systems is that **its scales are linear arithmetic sequences**.

## Tokens

### Spacing — an arithmetic sequence of 4px

| Token | rem | px |
|-------|-----|-----|
| `--space-0` | 0 | 0 |
| `--space-10` | 0.125 | 2 |
| `--space-20` | 0.25 | 4 |
| `--space-30` | 0.5 | 8 |
| `--space-40` | 0.75 | 12 |
| `--space-50` | 1 | 16 |
| `--space-60` | 1.25 | 20 |
| `--space-70` | 1.5 | 24 |
| `--space-80` | 1.75 | 28 |
| `--space-90` | 2 | 32 |
| `--space-100` | 2.25 | 36 |
| `--space-110` | 2.5 | 40 |
| `--space-120` | 2.75 | 44 |
| `--space-130` | 3 | 48 |

After `space-30` (8px) it **increases by exactly 4px per step**, continuing at the same
interval all the way to `space-300` (7.25rem / 116px).

### Radii

| Token | Value |
|-------|-------|
| `--border-radius-0` | 0 |
| `--border-radius-10` | 2px |
| `--border-radius-20` | 4px |
| `--border-radius-30` | 8px |
| `--border-radius-40` | 12px |
| `--border-radius-50` | 16px |
| `--border-radius-60` | 20px |
| `--border-radius-70` | 24px |
| `--border-radius-80` | 28px |
| `--border-radius-90` | 32px |
| `--border-radius-pill` | 100px |
| `--border-radius-circle` | 50% |

### Typography

| Token | rem | px |
|-------|-----|-----|
| `--font-size-10` | 0.625 | 10 |
| `--font-size-20` | 0.75 | 12 |
| `--font-size-30` | 0.875 | 14 |
| `--font-size-40` | 1 | 16 |
| `--font-size-50` | 1.125 | 18 |
| `--font-size-60` | 1.25 | 20 |
| `--font-size-70` | 1.5 | 24 |
| `--font-size-80` | 1.75 | 28 |
| `--font-size-90` | 2 | 32 |
| `--font-size-100` | 2.5 | 40 |
| `--font-size-110` | 3 | 48 |

A separate display scale: `--font-size-display-10` 2rem · `-20` 3rem · `-30` 4rem

The base is `--font-size-base: 100%`

### Multi-brand

The package holds **per-brand themes in separate directories**, such as `twilio-dark` and
`sendgrid`. iOS tokens (`tokens.ios.json`) ship alongside.

Source: `@twilio-paste/design-tokens@10.15.0`

## Components

~~Unverified.~~ → buttons, inputs and modals are in the deep-dive below (2026-08-18).

## Component deep-dive — (2026-08-18)

Components are individual `@twilio-paste/*` packages. The dist JS of `button@15.0.2` ·
`input@10.0.2` · `input-box@11.0.2` · `modal@17.0.1` (where the style objects are pinned
to token names) was parsed, and everything was converted to px through
`design-tokens@10.15.0`.

### Buttons (`@twilio-paste/button`)

| | default | small |
|---|:--:|:--:|
| Derived height | **36px** | 28px |
| Vertical padding | 8px (`space30`) | 4px (`space20`) |
| Horizontal padding | 12px (`space40`) | 8px (`space30`) |
| Radius | 8px (`borderRadius30`) | 8px |
| Type | 14px / 20px / **600** | same |

- **There is no `border` — every outline is a `box-shadow`.** The variant and state styles
  reference `shadowBorder*` 44 times and declare `border` zero times. It uses a **1px
  spread shadow as the border token**, as in `--shadow-border: 0 0 0 1px #8B93AA`. Since
  that does not participate in layout, the height calculation has no border term
  (20 + 8×2 = an integer 36) and state transitions unify into a single `box-shadow`
  transition (`transition: … box-shadow 100ms ease-in`).
- No height is declared; it is **derived from line height plus padding** (the same layer as
  MUI, except that it lands on an integer). **There is no min-width either.**
- Two sizes (default, small) — the same two-size camp as Backpack, but going downward
  (36/28).
- Transition 100ms `ease-in` (buttons) / 150ms for toggle buttons only.
- The variants place `rounded_small` (pill), icon and circle forms on the size axis — size
  and shape are one prop.

### Inputs (`@twilio-paste/input` + `input-box`)

| | Value |
|---|---|
| Derived height | **36px** (matching the default button) |
| Padding | 8px / 12px (the same `space30` / `space40` as the button) |
| Type | 14px / 20px / **500** |
| Border | `shadowBorder` on the wrapper (`InputBox`) — again a box-shadow |
| Radius | wrapper 8px, **inner input 4px** (`borderRadius20`) |

- **Buttons and inputs use the same values right down to the padding tokens** — the 36px
  alignment is not a coincidence but the same recipe.
- The border, background and states (hover/focus/error) all live on the `InputBox` wrapper
  while the inner `<input>` is transparent and border-free. A double radius, 4px nested
  inside the wrapper's 8px.
- Button 600 vs input 500 — only the weight differs.

### Modals (`@twilio-paste/modal`) — spring physics, no duration

| | default | wide |
|---|:--:|:--:|
| max-width | **38rem (608px)** (`size60`) | 51rem (816px) (`size80`) |
| Radius | 8px | same |
| min-height | 170px (a literal) | same |
| Inner padding | header and footer 32px (`space90`) · body 32px horizontal / 2px vertical | same |

- **Entry and exit are react-spring** (`@twilio-paste/animation-library` =
  `@react-spring/web@9.7.5`): `scale(0.675)→1` plus a fade, with
  `{ mass: 0.5, tension: 370, friction: 26 }`. **Physics-based, with duration and easing
  tokens playing no part at all** — the only sample defining modal entry through spring
  settings.
- Widths come from the same arithmetic `size` scale as the spacing — general-purpose size
  tokens (`size60` / `size80`) reused rather than dedicated modal-width tokens.
- Scrim `rgba(6, 3, 58, 0.4)` (`color-background-overlay`) — a navy family rather than
  black.
- A semantic minimum height of 170px as a literal — one value hiding outside the tokens.

### Notable decisions (deep-dive)

- **Borders replaced wholesale by box-shadow** — a shared architecture for buttons and
  inputs, removing the border term from the height derivation
- **Buttons and inputs aligned at 36px through the same padding tokens**
- **Modal entry as spring physics (mass/tension/friction)** — no concept of duration,
  unique in the sample
- Shape variants (pill, circle) placed on the size axis
- The arithmetic tokens (`space`, `size`) used unchanged in the component layer — no
  dedicated component token layer

## Notable decisions

- **The spacing is an arithmetic sequence.** After 8px it increases evenly by 4px, all the
  way to 116px. Most systems widen the interval toward the top (Carbon 96→160, Polaris
  96→112→128); Paste holds a 4px interval to the end.
  **That makes the options very numerous, so the burden of deciding "which value" is
  heavy.**
- **It distinguishes `pill` from `circle`.** `pill` is a fixed 100px, `circle` a 50% ratio.
  It splits into two concepts what other systems lump into one.
- **Display typography is a separate scale.** Values overlap with the body scale
  (`font-size-90` 32px vs `font-size-display-10` 32px) but they are separated by purpose.
- **It is designed on the premise of multiple brands.** Separate brand themes such as
  SendGrid ship alongside.
- **It ships iOS tokens alongside.** A rare case among mostly web-only systems.

## Accessibility

Unverified.

## Notes

- **Documentation site retired (confirmed 2026-08-18):** `paste.twilio.design` 301s to the
  repository — the dedicated documentation site is gone

- Repository: https://github.com/twilio-labs/paste
- Package: `@twilio-paste/design-tokens`
- Component deep-dive: `@twilio-paste/button@15.0.2` · `input@10.0.2` ·
  `input-box@11.0.2` · `modal@17.0.1` → each `dist/index.debug.es.js`, converted through
  `design-tokens@10.15.0` (2026-08-18)
- Licence: the component packages' package.json states **MIT** — reflected in the
  frontmatter (2026-08-18)
- **Licence resolved (2026-08-18):** `MIT` — source: github twilio-labs/paste → `LICENSE`
  (matching the npm `@twilio-paste/design-tokens@10.15.0` metadata)
