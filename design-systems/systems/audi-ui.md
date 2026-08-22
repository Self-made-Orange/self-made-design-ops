---
name: Audi UI
org: Audi
coverage: partial
url: https://styleguide.audi.com/hub/271
repo: null
license: Apache-2.0
tech: [SCSS, JS]
figma_kit: unverified
tokens_format: [SCSS variables]
a11y_target: unverified
platform: web
domain: automotive-brand
verified: 2026-08-18
source: "npm pack @audi/audi-ui@1.0.0-alpha.2 → src/_variables.scss plus the component SCSS"
---
<!-- lang-links -->
> **English** · [한국어](audi-ui.ko.md)
<!-- /lang-links -->

## In one line

Audi's brand web UI — the only sample in which **the modular scale's ratio grows with the
viewport class** (1.14→1.25), where the global easing is **a single curve**, and where colour
is effectively **an achromatic ramp plus the brand red**. Being a car maker's **brand web**
rather than an in-car HMI, it sits on a different axis from Android Automotive and CarPlay.

## Type — a modular-scale ratio per viewport

```scss
$aui-modular-scale: (
  default: ( base: 16px, ratio: 1.14 ),
  small:   (            ratio: 1.17 ),
  large:   ( base: 18px, ratio: 1.21 ),
  huge:    ( base: 20px, ratio: 1.25 ),
);
```

**The larger the screen, the larger both the base and the ratio** — from 16px/1.14 to
20px/1.25. The corpus's other modular-scale samples (Odyssey and the rest) fix the ratio;
in Audi **the ratio itself is responsive**. Hierarchical contrast widens on large screens.

## Motion — one global easing

```scss
$aui-easing: cubic-bezier(0.75, 0.02, 0.5, 1);
```

There is **only one** easing token (no differentiation by direction or intensity). With
x1 = 0.75 it starts late and rushes through the middle — far more dramatic than Material
Legacy's (0.4, 0, 0.2, 1). Field transitions take 0.25s.

## Colour — an achromatic brand

- Chromatic: **red `#bb0a30` (the brand) · yellow · green** — three colours in all, doubling
  as the state colours
- Achromatic: `gray10` to `gray95`, **11 steps**, plus black and white — the number
  corresponds to the lightness percentage (gray95 = `#f2f2f2`)
- The same German-car-brand axis as Porsche, but Porsche uses modern CSS like `light-dark()`
  while Audi is a 2019-era SCSS variable system (frozen at 1.0.0-alpha.2)

## Other figures

| item | value |
|------|-----|
| base unit | 4px (`$aui-base-unit`), rem root 16px |
| field height | `unit(10)` = 40px |
| icons | 24/48px plus a **"system" variant at 23/45px** (1.1px stroke) |
| grid | 12 columns, gutter unit(1), container offset **4.375%** |
| breakpoints | 7 steps (480–1584px) |
| z-index | header 100 · dropdown 1000 — only two |

- `$aui-circle-smoothing-factor: 2` — **a smoothing coefficient that draws circles at twice
  the size and scales them down, to work around Chrome's sub-pixel rendering**, exists as a
  variable. A rare case of a rendering-bug workaround rising into the token layer.
- 53 component directories, each with its own `*-themes.scss` — the theme split into a file
  per component.
- Typefaces `AudiTypeScreen` and `AudiTypeExtended` — a separate Extended face for display
  (the same type as Asphalt's Extended split).

## Components in depth — (2026-08-18)

**These are measurements of a snapshot frozen in 2017-11** — `@audi/audi-ui@1.0.0-alpha.2` is
the final npm release and the repository has been deleted, so the values below are a
historical sample, not the current Audi specification. The real values were verified against
the **compiled `dist/audi-ui.css` bundled alongside the SCSS source**.

### Buttons — backlog cleared: an effective height of 51px, and that height is responsive

The actual declarations in the compiled CSS:

```css
html { font-size: 16px; }                 /* ≥1264px: 18px · ≥1584px: 20px */
.aui-button {
  font-size: 0.9375rem;                   /* 15px at a 16px root */
  line-height: 1.5rem;                    /* 24px */
  padding: 0.8666666667em 0 0.8em;        /* 13px / 12px at 15px type */
  border: 1px solid transparent;
}
```

| viewport | root | button type | effective height (line height + padding + border) |
|--------|:---:|:---:|:---:|
| default | 16px | 15px | **51px** (24+13+12+2) |
| ≥1264px | 18px | 16.875px | **≈57.1px** |
| ≥1584px | 20px | 18.75px | **≈63.3px** |

- ~~em-based padding, so it depends on the font size~~ — settled: type and line height are in
  rem while the padding is in em, so **the button height itself grows with the root font
  (16→18→20px), 51→57→63px.** The per-viewport modular scale (the type section above) reaches
  right through to the component dimensions — a different layer entirely from the fixed-px
  height camp.
- **The block padding is asymmetric, 13/12px** — 1px more on top (the trace of an optical
  correction for the typeface).
- **The default variant is a text button** — transparent background, transparent border and
  **zero inline padding**. Only with `--primary` (a black fill) or `--secondary` (a border)
  does it gain 32px of inline padding (= root × 2, itself responsive at 36/40px). The
  opposite pole from the majority, where a filled button is the default.
- **Radius 0** — square. And the button colour is **black**, not the brand red.
- disabled is opacity 0.30 — lower than Astro's and Atlassian's 40%.

### Text fields — an underline with a floating label

| item | value |
|------|-----|
| form | **underline only** (`border-bottom` 1px rgba(0,0,0,.3)) — no background, no box |
| min-height | `unit(10)` = 2.5rem = **40px at a 16px root** (→ responsive 45/50px) |
| label | **floating** — rises and shrinks to 0.75rem (12px) |
| states | hover/focus/dirty all rgba(0,0,0,.8) — **an opacity ramp instead of colour** |
| transition | 0.25s, the global easing |

- An underline field with no border or background is contemporary with first-generation
  Material practice (2017) — the same form as MUI's `standard` variant, here as the default.
- State is expressed not by a change of hue but by **an alpha ramp of black** (.3→.8) — the
  achromatic brand principle applied to field states.

### Modals — not an overlay but a replacement surface

| item | value |
|------|-----|
| default form | **the dialog itself is 100vh of `#333333` (gray20), full-bleed** — not a scrim plus a card |
| body width | **62.5%** at ≥600px, max **1200px** |
| variants | fullpage / window (80%, a dark panel over a transparent background) / layer (entering with translateY 10px) |
| transition | a fade over **0.4s with a 0.4s delay** (delay 0 only on the morph variant) — the global easing |
| close button | **45px → 81px** (≥600px) — with a "sync with JS" comment |

- **The modal is a dark, full-bleed surface over a light page** — a brand gesture that
  replaces the whole screen, unlike the entire blur-the-background and scrim camp.
- The 0.4s delay is a two-part choreography that brings the content up once the background
  transition has finished — 0.8s in total, the slowest modal in the sample (slower even than
  Astro's 0.5s).
- Values shared with JS, such as the 45/81px close button, **are kept in sync by comment** —
  a hand-maintained contract from the pre-token generation, preserved intact.

### Characteristic decisions (from the deep pass)

- **A responsive effective button height** (51→57→63px) — a dual em/rem scale reaching into
  the dimensions
- **The default button is a text button with zero inline padding** — filled is the modifier
- **Radius 0 throughout** plus state as an alpha ramp — the achromatic, square-cornered
  extreme of the brand
- **The modal as a replacement surface** (a 100vh dark field) with a 0.4s + 0.4s
  two-part choreography
- Asymmetric block padding, 13/12 — a 1px optical correction

## Characteristic decisions

- **A modular-scale ratio per viewport** (1.14→1.25) — unique in the corpus
- One global easing — the extreme of minimalist motion
- An 11-step achromatic ramp plus the brand red — a monotone car brand
- Integer/non-integer icon pairs (24/23, 48/45) — traces of optical correction
- Development stopped at alpha (1.0.0-alpha.2, Apache-2.0)

## Accessibility

Unverified. (An `sr-only` component exists — a screen-reader-only utility.)

## References

- **URL corrected (confirmed 2026-08-18):** the old `github.com/audi/audi-ui` is an
  **HTTP 404** (the repository was deleted). `url` now points to the successor Frontify brand
  hub and `repo` is `null` — npm `@audi/audi-ui@1.0.0-alpha.2` is the only surviving source

- ~~Why development stopped, and whether a successor exists~~ → **timeline settled
  (2026-08-18).** npm `@audi/audi-ui`'s **last release was 1.0.0-alpha.2 in 2017-11**
  (with no deprecated flag) → GitHub `audi/audi-ui` was **archived 2024-11-25 and then
  deleted** (the API now returns 404; the archive banner is visible in the Wayback snapshot
  of 2025-01-08) → the React Storybook (react.ui.audi) has been offline since 2025-01-24.
  **The successor is not open source but a gated internal portal** — the old `audi.com/ci`
  redirects to a Frontify brand hub (styleguide.audi.com/hub/271), and a separate
  designsystem.audi.com (login required) is in operation. Only the fonts and icons survive
  publicly, in the `oneaudi` org (audi-type, audi-icon).
  **No official deprecation announcement was found** — the "why" remains unverified.
- **Open questions:** ~~measuring the button height (em-based padding makes it depend on the
  font size)~~ (resolved 2026-08-18 — the components deep pass: 51px at a 16px root,
  responsive 51→57→63px, verified against the compiled `dist/audi-ui.css`)
