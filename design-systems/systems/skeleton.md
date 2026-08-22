---
name: Skeleton
org: Skeleton Labs
coverage: partial
url: https://www.skeleton.dev
repo: https://github.com/skeletonlabs/skeleton
license: MIT
tech: [Svelte, Tailwind]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: framework
verified: 2026-08-18
source: "npm @skeletonlabs/skeleton@5.0.0 → src/themes/*.css (24 of them)"
---
<!-- lang-links -->
> **English** · [한국어](skeleton.ko.md)
<!-- /lang-links -->

## In one line

**The corpus's first sample from the Svelte ecosystem.** Its 24 themes each carry
different **structural values — type scaling and radii — not just colour**, and
**community colour schemes like Dracula and Catppuccin ship as official themes**.

## Tokens — 24 themes, structural values included

```css
/* cerberus */  --text-scaling: 1;     --radius-base: 0.5rem;  --radius-container: 0.5rem;
/* wintry   */  --text-scaling: 1.067; --radius-base: 0.375rem; --radius-container: 0.75rem;
```

- **A theme changes `--text-scaling` (a global type multiplier) and the radii, not just
  the colours** — the only sample where the theme axis reaches into structure, and at
  this scale (24 of them). It is the runtime-scaling camp (Mantine and others) with the
  multiplier set by the theme
- **Radii are two semantic layers, `base` and `container`** — element versus container
  (a coarser two-step than Mística's per-component semantics)
- `--spacing: 0.25rem` — inherited from the Tailwind base (**the third member of the
  don't-enumerate camp**)
- **Dracula · Catppuccin · Rosé Pine are in the official theme list** — the only sample
  where developer-community colour schemes entered a design system's official
  distribution (Vibe's hacker and Grommet's hacktoberfest are single easter eggs; here
  they are part of the scheme)

## Component deep-dive — (2026-08-18)

Measured from `src/utilities/*.css` in the same `@skeletonlabs/skeleton@5.0.0`. This
package's components are **entirely Tailwind v4 `@utility` classes** (24 files
including `btn`, `input` and `dialog`). Behaviour (JS) lives in separate
`skeleton-svelte` / `skeleton-react` packages, and the visual layer is this one CSS
file regardless of framework.

### Buttons (`btn`) — every dimension derived from one variable

```css
--btn-size: var(--text-base);            /* size = a typography token */
line-height: var(--btn-size);
padding-block:  calc((var(--btn-size) - 2px) / 2);
padding-inline: calc((var(--btn-size) - 2px) / 2 + 4px);
```

- **There is one size parameter, `--btn-size`, and its value is a font-size token.**
  Height and padding are all derived by formula: **height = 2 × font − 2px** (base 16px
  → 30px, sm 14px → 26px). There is no border.
- **There are 13 size variants (xs–9xl), one-to-one with the entire Tailwind type
  scale.** Even `btn-9xl` (font 8rem, height 254px) exists syntactically — the only
  sample to delegate its size axis wholesale to the typography axis.
- `btn-icon` is a square at `2 × font − 2px` — the derivation formula made visible.
- **Hover is a filter rather than a colour**: `brightness(125%)` (75% in dark). There
  are zero per-variant hover colour tokens — the same "no hover tokens" camp as Vapor's
  grey overlay, by different means (a filter versus a state layer).
- Colour comes from separate `preset-*` utility combinations, as in
  `preset-filled-primary-500`. There are **more than 140 light-dark pair tokens** like
  `--color-primary-50-950` (50 and 950 swapping in dark), each with its own
  `-contrast-` counterpart.
- The radius is `--radius-base` — each of the 24 themes sets its own (see the token
  section).

### Inputs (`input`)

- **Exactly the same formula as the button** (`--field-size`, height = 2 × font − 2px) —
  buttons and inputs align at 30px in the base. The same 13 size variants (`field-*`).
- **No border** — the outline is drawn with a Tailwind ring (an inset 1px `box-shadow`),
  and focus changes only the ring colour to `primary-500`.
- The label is a separate block, `label-text` (xs, medium weight) — not floating.

### Dialogs (`dialog`) — a native `<dialog>` plus `@starting-style`

| | Value |
|---|---|
| max-width | **640px** |
| Padding / inner gap | 16px / 16px |
| Radius | `--radius-container` (owned by the theme) |
| Scrim | `color-mix(… surface-50-950 75%, transparent)` |
| Entry/exit | fade only, **250ms**, `@starting-style` + `transition … allow-discrete` |

- **A modal transition with no JS** — the current-CSS route of transitioning
  `<dialog>`'s display through `allow-discrete`. A generation beyond Backpack V2
  (`<dialog>` plus keyframes).
- The inner structure is selected through **semantic elements** (`header` / `article` /
  `footer`) rather than classes.
- The fullscreen variant (`dialog-fullscreen`) is implemented purely by redefining
  variables.

### Notable decisions (deep-dive)

- **One dimension parameter, a font token** — height = 2 × font − 2px by formula
- **13 size variants = the entire type scale** — btn-9xl exists
- **No hover tokens (a brightness filter)** — no state colour is defined at all
- **More than 140 light-dark pair tokens** (`primary-50-950`) — dark mode built into the
  token names
- **A native `<dialog>` plus `@starting-style`** — a modal transition with no JS
- `--corner-shape-base/container` variables — a preparatory layer for squircles
  (`corner-shape`)

## Notable decisions

- **The first Svelte sample** — opening the non-React axis alongside Vue (Vuetify,
  Naive, PrimeVue)
- Themes own structural values (type scaling, radii) — unique in the sample at this
  scale
- Inherits Tailwind's `--spacing` — the same layered relationship as shadcn/ui
- Community colour schemes taken in officially

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @skeletonlabs/skeleton@5.0.0` → `src/themes/`
- Component deep-dive: the same package's
  `src/utilities/{buttons,form-inputs,form-core,dialogs,presets}.css` (2026-08-18)
- **Still to confirm:** ~~components (the Svelte-side package)~~ ~~the dark-mode
  approach~~ (resolved 2026-08-18 — the visual layer is entirely this package's CSS
  utilities with the Svelte and React packages handling only behaviour, and dark is the
  light-dark pair tokens plus `@variant dark`), and an exhaustive listing of values per
  theme
