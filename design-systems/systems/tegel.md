---
name: Tegel
org: Scania
coverage: partial
url: https://tegel.scania.com
repo: https://github.com/scania-digital-design-system/tegel
license: MIT
tech: [Web Components, Stencil, React, Angular]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 2.1 AA (stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-23
source: "npm @scania/tegel@1.62.0 → dist/collection/**/*.css"
---
<!-- lang-links -->
> **English** · [한국어](tegel.ko.md)
<!-- /lang-links -->

## In one line

Scania's system (commercial vehicles) — spacing is **completely split into two families,
`element` (2–48px) and `layout` (8–160px)**, and every component carries a
**`mode-variant` primary/secondary axis**. A **second surface axis orthogonal** to
light/dark.

## Tokens

### Spacing — element / layout split in two

```
element: 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48        (10 steps)
layout:  8 · 16 · 24 · 32 · 48 · 64 · 72 · 96 · 128 · 160    (10 steps)
```

- **Whitespace inside components and whitespace in layout are two separate families of equal
  size** — even in the overlapping range (8–48) the names differ. Unlike Vanilla (three
  `strip` steps), Pharos and Braid (a single `gutter` alias), which give layout whitespace
  only a few entries, **the symmetric 10:10 split belongs to Tegel alone**
- The names are the px values (`element-16`) — Primer's value-as-name approach
- Both hold the core values (4/8/16/24/32). element starts at 2px; layout reaches 160px

### `mode-variant` — an axis orthogonal to light/dark

```css
.tds-mode-variant-primary   tds-accordion { --tds-accordion-background: …primary-default }
.tds-mode-variant-secondary tds-accordion { --tds-accordion-background: …secondary-default }
```

**Every component has a `primary`/`secondary` mode variant** — an axis for choosing
**surface hierarchy within the same theme**, independent of dark mode (for situations such as
a card laid over a card). Tegel is the only system in the sample that gives every component a
second surface axis orthogonal to light/dark.
It raises to **a component API axis** the same layering that TDS (Toss) does with
`BackgroundLevel01/02` and Mantine with its `dark` ramp, at the level of values.

Colour references run three tiers deep — `--tds-<component>-<property>` →
`--component-<component>-<property>-<variant>-<state>` → `--color-<meaning>`.
Keeping a component-specific tier is the same problem Cloudscape solves with contexts, by a
different route.

### A prefix collision to watch

**`--tds-*` is the same prefix as Toss's TDS** (Tegel Design System / Toss Design System).
Using both systems' tokens in one project collides — recorded in `GLOSSARY.md`.

## Components in depth — (2026-08-18)

Measured from `dist/collection/components/{button,text-field,modal}/*.css` plus
`dist/tegel/tegel.css` (the token source) in `@scania/tegel@1.61.0`. The biggest finding:
**alongside the `mode-variant` axis, a `.scania` / `.traton` brand axis coexists in the same
file** (`:root` is Scania by default, with the TRATON commercial-vehicle group brand switched
in by class).

### The tokens are unitless numbers; the consumer multiplies in the unit

```css
--scania-unit-4: 4;            /* unitless */
border-radius: calc(var(--component-button-border-radius-default) * 1px);
background: color-mix(in srgb,
  var(--component-overlay-background-default)
  calc(var(--component-overlay-opacity-default) * 1%), transparent);
```

Lengths get `× 1px` and opacities `× 1%` — **giving the value its dimension is the
consumer's calc**. Being plain numbers, a brand theme can reinterpret them in any dimension.

### Buttons — 56px by default, and square or pill depending on the brand

| | xs | sm | md | lg (default) |
|---|:--:|:--:|:--:|:--:|
| height | 24px | 40px | 48px | **56px** |
| padding | 4/8px | 12px | 16px | 20px |
| type | 12px | `detail-02` 14px/16px | same | same |

- **The default size is lg (56px)** — the tallest default button in the sample. It reads as a
  position for industrial equipment and vehicles (gloved hands).
- **The radius is on the brand axis** — `--component-button-border-radius-default` is
  `4` (px) for Scania and **`56` for TRATON (a full pill equal to the height)**. One brand
  class turns the same component from a square button into a pill. The only sample where
  multi-brand coexistence (as in HSDS's newBrand) **extends into the dimension of shape**.
- The typeface is on the brand axis too: Scania Sans Semi Condensed (tracking −0.14px) vs
  TRATON Type Text (tracking 0). Both are weight normal — not a bold button.
- Focus is doubled: `:focus` 1px, `:focus-visible` **a 2px outline plus a 1px shadow ring**
  (offset 1px) — mouse and keyboard distinguished by thickness.

### Inputs (`tds-text-field`) — all four border sides are separate tokens

| | sm | md | lg (default) |
|---|:--:|:--:|:--:|
| height | 40px | 48px | **56px** — the same three steps as the button |

- **Which sides have a border is a brand token** — width top/right/bottom/left and all four
  radius corners are individual variables. Scania has **only a 1px bottom border with a 0
  bottom radius** (an underline/filled field), while TRATON has **1px on all four sides with
  4px on all four corners** (a boxed field). The only structure in the sample where the
  anatomy of an input itself is switched by theme.
- Labels have two modes, inside and outside (inside is absolutely positioned, not floating).
- Transition: the literal `border-color 200ms ease` — there are motion tokens
  (`--tds-motion-*`), and in places the components do not use them (the button does use
  `fast-02 (150ms) + easing-scania` — a mixed state).

### Modals — Carbon's breakpoints and viewport-percentage widths

| viewport | xs | sm | md | lg |
|------|:--:|:--:|:--:|:--:|
| ≥672px | 50% | 62.5% | 75% | 100% |
| ≥1056px | 31.25% | 43.75% | 62.5% | 75% |
| ≥1584px | 25% | 37.5% | 50% | 75% |

- **The widths are viewport percentages, not px**, and the values are sixteenths of a grid
  (25 = 4/16, 31.25 = 5/16, 62.5 = 10/16 …). The breakpoints are
  **320/672/1056/1312/1584 — all five identical to Carbon's (IBM)**. A trace of the grid
  system being borrowed from Carbon.
- max-height **85vh**, radius 4 (× 1px), a sticky header, and an action area with
  `24px 16px 16px` padding plus a 16px gap.
- The scrim uses the `color-mix` expression above — colour and opacity are separate tokens, so
  a brand adjusts them independently. There is no CSS entrance animation.

### Motion tokens (newly obtained)

```
duration: instant 0 · fast 100/150 · moderate 200/300 · slow 400/500
easing:   scania (0.4,0,0,1) · enter (0.1,0.9,0.2,1) · exit (0.7,0,1,0.5)
          · easy (0.33,0,0.67,1) · linear
```

**The easing carries the brand name** (`--tds-motion-easing-scania`) — the only case in the
sample of naming a signature curve after the brand. The curve itself is of the M3 emphasized
family, (0.4,0,0,1).

### Characteristic decisions (from the deep pass)

- **Unitless numeric tokens with `calc(×1px/×1%)` at the point of use** — dimension separated
  from value
- **The brand axis reaching shape itself** — button radius 4 vs 56 (a pill), inputs underline
  vs boxed
- **A 56px default button and input** — the densest default in the sample, in the largest
  sense
- **Modals = Carbon's breakpoints plus sixteenth-based percentage widths** — the opposite pole
  from the px-width camp
- **A brand-named easing** (`easing-scania`) · a doubled 1px/2px focus

## Characteristic decisions

- **A symmetric 10:10 element/layout spacing split** — unique in the sample
- **A `mode-variant` axis on every component** (orthogonal to light/dark) — unique in the
  sample
- Three-tier colour references (with a component-specific tier)
- The `--tds-` prefix collides with Toss's TDS
- Web Components (Stencil) plus React and Angular wrappers — the same camp as Siemens iX

## Accessibility

~~Unverified.~~ → **WCAG 2.1 Level AA (resolved 2026-08-18).**
Source: `tegel.scania.com/accessibility` — "We follow the WCAG 2.1 Level AA standard".
It states this as the minimum target regardless of whether the European Accessibility Act
applies.

## References

- **Basis for the Figma kit (true):** an internal-only Figma UI Library — distributed by
  default to every Figma user at Scania, not published externally, confirmed 2026-08-18

- Tokens: `npm pack @scania/tegel@1.61.0` → `dist/collection/**/*.css`
- Components in depth: `dist/collection/components/{button,text-field,modal}/` plus
  `dist/tegel/tegel.css` from the same package (2026-08-18)
- **Open questions:** ~~how dark mode works~~ (resolved 2026-08-18 — class overrides
  `.tds-mode-light`/`.tds-mode-dark`, combining orthogonally with the `.scania`/`.traton`
  brand classes), the full type scale (partly obtained — `detail-02` 14px/16px and others,
  in the deep pass), the raw colour values (a `--tds-grey-*` ramp is confirmed to exist but
  not recorded in full), and the rationale behind `mode-variant`
  (~~the documentation site was blocked by the proxy~~ → access succeeded 2026-08-18)
- **Figma kit resolved (2026-08-18):** `figma_kit: true` — source
  <https://tegel.scania.com/faq-design/getting-started-design>.
  It states that **"every Figma user at Scania has access to the Tegel UI Library by
  default"** — find it in Figma's `Assets` tab at the top left and use it directly.
  The library's components, styles and icons **update frequently, and updates reach every
  designer automatically without a request**. Using it requires **the latest Scania Sans
  fonts installed**. So the official kit exists but **circulates only inside Scania's
  organisation account and is not published externally** — even the Figma-related
  documentation is operational guidance for in-house designers, such as toggling grids
  (`Menu › View › Layout Grids`, `Ctrl+G` / `Ctrl+Shift+4`)
- **A note on rendering the documentation site (2026-08-18):** `tegel.scania.com` sits behind
  CloudFront, which **blocks headless Chrome's default UA with a 403** (`Request blocked`).
  Attach an ordinary browser UA and the Next.js SSR HTML comes through, so the body can be
  read without rendering

## Drift record — 1.61.0 → 1.62.0 (2026-08-23)

Six files differ under `dist/collection/`, **all of them tabs** — a component layer this entry
does not record, so **no recorded value changed**. Noted as a reference point for whenever tabs
are harvested:

- **`navigation-tabs` gap 16px → 24px** — the one real value move
- `inline-tabs` drops its `gap: 16px` and gains
  `border-bottom: 1px solid var(--tds-inline-tabs-horizontal-divider-background)`
- **Cross-component token leakage fixed** — `inline-tabs` and `navigation-tabs` were reading
  `--tds-folder-tabs-scroll-btn-*`; each now reads its own prefix. This is the same
  `tds-` prefix hazard the "A prefix collision to watch" section above describes, showing up
  inside the package itself
- `top/bottom/left/right: 3px` → `inset: 3px` — shorthand, same value
