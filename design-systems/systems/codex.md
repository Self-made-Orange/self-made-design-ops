---
name: Codex
org: Wikimedia
coverage: partial
url: https://doc.wikimedia.org/codex
repo: https://github.com/wikimedia/design-codex
license: GPL-2.0-or-later
tech: [Vue, CSS]
figma_kit: unverified
tokens_format: [JSON, CSS, SCSS]
a11y_target: "WCAG 2.1 AA (stated — github wikimedia/design-codex README.md, main@5a4ff8980f, confirmed 2026-08-23)"
platform: web
domain: public
verified: 2026-08-18
source: "npm @wikimedia/codex-design-tokens@2.6.x → theme-wikimedia-ui-mode-dark.json"
---
<!-- lang-links -->
> **English** · [한국어](codex.ko.md)
<!-- /lang-links -->

## In one line

The design system for Wikipedia and the other Wikimedia projects. A reading-centred
service that covers an extremely wide spectrum of languages and devices.

## Tokens

### Size — spacing and width on one scale

| Token | rem | px |
|-------|-----|-----|
| `size-0` | 0 | 0 |
| `size-6` | 0.0625 | 1 |
| `size-12` | 0.125 | 2 |
| `size-25` | 0.25 | 4 |
| `size-50` | 0.5 | 8 |
| `size-75` | 0.75 | 12 |
| `size-100` | 1 | 16 |
| `size-125` | 1.25 | 20 |
| `size-150` | 1.5 | 24 |
| `size-200` | 2 | 32 |
| `size-250` | 2.5 | 40 |
| `size-275` | 2.75 | 44 |
| `size-300` | 3 | 48 |
| `size-400` | 4 | 64 |
| `size-800` | 8 | 128 |
| `size-1200` | 12 | 192 |
| `size-1600` | 16 | 256 |
| `size-2400` | 24 | 384 |
| `size-2800` | 28 | 448 |
| `size-3200` | 32 | 512 |
| `size-4000` | 40 | 640 |
| `size-5600` | 56 | 896 |

**Small values for spacing (1–48px) and large values for layout widths (128–896px) sit on
one scale.** The number in the name is rem × 100 (`size-100` = 1rem).

### Viewport tokens

| Token | Value |
|-------|-------|
| `size-viewport-32` | 320px |
| `size-viewport-64` | 640px |
| `size-viewport-72` | 720px |
| `size-viewport-100` | 1000px |

Breakpoints live inside the size scale, and **only here are the values px rather than
rem**.

Source: `@wikimedia/codex-design-tokens` → `theme-wikimedia-ui-mode-*.json`

### Radii / colour / typography

~~Unverified.~~ Radii, typography (including the size modes) and transitions are confirmed
in the deep-dive (2026-08-18). The colour palette structure remains unverified.

## Components

~~Unverified.~~ → see the "Component deep-dive" section below (2026-08-18).

## Component deep-dive — (2026-08-18)

The compiled `dist/codex.style.css` of `@wikimedia/codex@2.6.0` was parsed and
cross-checked against the token JSON of `@wikimedia/codex-design-tokens@2.6.0`.

### Buttons (`.cdx-button`)

| | small | medium (default) | large |
|---|:--:|:--:|:--:|
| **min-height** | 1.5rem (24px) | **32px** | **44px** |
| Horizontal padding | 5px | 11px | 15px |
| Icon gap | 4px | 6px | 6px |
| icon-only min-width | 1.5rem | 32px | 44px |
| Radius | 2px | 2px | 2px |
| Type | 1rem / **700** | same | same |

- **The three heights align with the `min-size` tokens** — 32px is
  `min-size-interactive-pointer`, 44px is `min-size-interactive-touch`. **large *is* the
  touch-target height**, and the purpose of the token layer's 44px (`size-275`) is settled
  by the component layer.
- **The horizontal padding is border-subtracted** — 5 = 6−1 · 11 = 12−1 · 15 = 16−1
  (a 1px border, for totals of 6/12/16px). The same technique as MUI (outlined −1px) and
  Grommet (the 12−1 = 11px formula).
- **There is no minimum width and there is a maximum width** —
  `max-width: 28rem` (448px = `size-2800`). An i18n accommodation running the opposite way
  from MUI (64px) and Clarity (units of 64), which impose a min-width.
- Button type 1rem and 700 — the same "body size in bold" camp as Backpack (16px, 700).
- Transition 100ms (`transition-duration-base`) across four properties
  (`transition-property-base`).
- The height units are mixed — small alone is 1.5rem while medium and large are fixed px.

### Inputs (`.cdx-text-input`)

| | Value |
|---|---|
| Height | min-height **32px** plus max-height 2rem — effectively fixed, **no size variants** |
| Padding | 4px 8px (1px border) |
| Radius | 2px |
| **min-width** | **256px** (`size-1600`) — a minimum width on the input wrapper itself |
| Type | 1rem / line height 1.375rem (22px) |

- The label (`.cdx-label`) is a separate block — 1rem, **700**, 4px below. Not floating.
- State transitions are **250ms** — a different token from the button's 100ms. There are
  only two duration tokens, 100 and 250ms, divided between components.
- Buttons take a max-width and inputs a min-width — the direction of the width constraint
  differs per component.

### Dialogs (`.cdx-dialog`)

| | Value |
|---|---|
| Width | max-width **32rem** (512px), **a single step** · width calc(100vw − 2rem) |
| Radius / border | 2px / 1px |
| Padding | header `16 24 8` · body `8 24` · footer `16 24 24` (24px horizontal throughout) |
| Entry/exit | **fade only, 250ms ease** |
| Backdrop | **rgba(255,255,255,.65) — white** (rgba(0,0,0,.65) in dark mode) |

- **The light-mode scrim is white at 65%** (`background-color-backdrop-light`). Every
  sample in the overlay comparison table of `patterns/modal.md` is in the black family
  (the lightest being shadcn/ui's black 10% plus blur) — this is the first white scrim.
- A fade only, with no slide or scale — symmetric 250ms entry and exit.
- Title 1.25rem/700, subtitle 1rem — the dialog typography is likewise assembled through
  token fallback chains.

### Typography size modes — at the same layer as dark mode

`theme-wikimedia-ui-mode-{small,large,x-large}.css` override **only the font and
line-height tokens**. Based on `font-size-medium`, that gives four steps:
**14 / 16 (default) / 18 / 20px**. Just as dark mode overrides colour, this structure
**distributes a text-size preference as a mode file** (corresponding to the text-size
setting in Wikipedia's 2022 Vector skin).

The radius tokens are settled too: `border-radius` base **2px** · sharp 0 · pill 9999px ·
circle 50%.

### Notable decisions (deep-dive)

- **Three button heights 24/32/44px = the interactive minimum-size tokens *are* the button
  heights** — pointer and touch target specifications tied directly to size variants
- **A 2px radius throughout** — buttons, inputs and dialogs all use `border-radius-base` 2px
- **A max-width (448px) on buttons instead of a min-width** — the reverse direction of
  width constraint
- **A white scrim** — the first in the sample
- **Text-size mode files** — mode-small/large/x-large overriding only the font tokens

## Notable decisions

- **Spacing and layout widths are unified on one scale.** A single `size` scale runs from
  1px to 896px. Most systems separate spacing (up to ~160px) from layout widths; Codex
  merged them. The token count drops, at the cost of `size-2400` giving no clue from its
  name whether it is a margin or a width.
- **44px (`size-275`) is on the scale.** A value off both the multiple-of-8 and the
  multiple-of-4 rhythm — but **44px is widely used as the minimum recommended touch
  target**.
  ~~The source does not, however, state that reason.~~
  (Resolved 2026-08-18 — a `min-size-interactive-touch: 44px` token exists and the large
  button's height is that value. See the deep-dive.)
- **Only the viewport values are px.** With everything else in rem, the breakpoints alone
  are pinned in px.
- **Theme files are separated per mode.** A separate JSON ships for each theme × mode
  combination, such as `theme-wikimedia-ui-mode-dark`.
- **It is rem-based.** Spacing grows with the user's font scaling.

## Accessibility

The scale is rem-based and a 44px step exists.

**A compliance target is stated (resolved 2026-08-23).** The repository README lists, among
what Codex's components are for: *"Web accessibility compliant (Web Content Accessibility
Guidelines 2.1 level AA)"* — github `wikimedia/design-codex`, `README.md`, `main@5a4ff8980f`.
It is a statement of intent in the README, not a per-component conformance record.

## Notes

- Repository: https://github.com/wikimedia/design-codex
- Packages: `@wikimedia/codex-design-tokens` (tokens) ·
  `@wikimedia/codex@2.6.0` `dist/codex.style.css` (component deep-dive — 2026-08-18)
- **Licence resolved (2026-08-18):** `GPL-2.0-or-later` — source: github
  wikimedia/design-codex → `LICENSE` (the npm `@wikimedia/codex-design-tokens@2.6.2`
  metadata says `GPL-2.0+`). **Codex, Protocol and Helios are the only copyleft samples in
  the corpus**
