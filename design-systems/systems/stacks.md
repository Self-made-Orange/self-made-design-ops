---
name: Stacks
org: Stack Overflow
coverage: partial
url: https://stackoverflow.design
repo: https://github.com/StackExchange/Stacks
license: MIT
tech: [CSS, LESS]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @stackoverflow/stacks@2.9.0 → dist/css/stacks.css"
---
<!-- lang-links -->
> **English** · [한국어](stacks.ko.md)
<!-- /lang-links -->

## In one line

Stack Overflow's system — **body text at 13px, unique in the sample** — with derived sizes
exposed as **repeating decimals over 13** (1.46153846rem) and spacing structured as
**static raw values × a multiplier variable**.

## Tokens

### Type — 13px body

```
--fs-base: 13px · fine 11 · caption 12
subheading 1.46153846rem (=19px) · title 1.61538462rem (=21px)
```

- **A 13px base** — the only such value in the sample. The body-size axis now has six
  values: 13 (Stacks) · 14 (Ant, Semi, Ring UI and others) · 15 · 16 (the majority) ·
  17 (three CJK systems) · 18 (Grommet)
- **Repeating decimals like 1.46153846rem ship as-is** — the results of dividing 19 and 21
  by 13. The value carries the trace of forcing a ratio **against its own base (13px)**,
  rather than the rem root (16px), into rem notation
- **Twin `em` tokens with a `-relative` suffix** run alongside
  (`--fs-title-relative: 1.61538462em`) — a dual px/relative-unit distribution

### Spacing — static × a multiplier

```css
--su-static8: 8px;                                /* the raw px */
--su8: calc(var(--su-static8) * var(--su-base));  /* with the multiplier applied */
--su-base: 1;
```

- Every step is **a pair: a `static` (fixed px) value and a scaled one** — the same
  distinction Cloudscape draws by enumeration, built here with **calc multiplication**.
  It combines the runtime-multiplier camp (Mantine, Radix, Vapor, Ring UI) with the
  static/scaled split
- The steps: `1 2 4 6 8 12 16 24 32 48 64 96 128` — including 6 (the Semi and Helios
  family), and holding every core value

### Radius

`sm 4 · md 6 · lg 8 + circle 50%` — the **6px middle step** (mixing odd and even) and the
name `circle` (50%) put it in the true-circle camp under the pill/circle distinction in
`GLOSSARY.md`.

Dark mode uses **both** a `.theme-dark` class and `prefers-color-scheme` (556 branches in
total) — supporting a forced class and following the OS at the same time.

## Components

A CSS framework (class-based) plus Stimulus controllers. ~~List not surveyed.~~ →
see the deep pass below (2026-08-18). **47 CSS components** (`lib/components/`) plus
**9 Stimulus controllers** (banner · expandable · modal · navigation · popover · table ·
toast · tooltip · uploader).

## Components in depth — (2026-08-18)

Read from the LESS sources (`lib/components/*.less`) of `@stackoverflow/stacks@2.9.0` and
cross-checked against `dist/css/stacks.css`. One premise matters —
**`html, body { font-size: var(--fs-base) }` makes 1rem = 13px.**
Every rem-derived value below is resolved at a 13px base.

### Buttons (`.s-btn`)

No height is declared, and **the padding is in em rather than px** — absolute padding grows
in proportion to the font size, and the height derives from
`type × line height + padding + border`.

| | xs | sm | default | md |
|---|:--:|:--:|:--:|:--:|
| type | 11px (fine) | 12px (caption) | 13px (body1) | 17px (body3) |
| padding (all sides) | 0.6em (6.6px) | 0.8em (9.6px) | 0.8em (10.4px) | 0.7em (11.9px) |
| radius | 6px | 6px | 6px (`--br-md`) | **5px** (`calc(--br-sm + 1px)`) |
| **derived height** | **≈27.9px** | **≈35.0px** | **≈37.8px** | **≈45.4px** |

- **The button weight is 400** (`font-weight: normal`) — body weight to match its 13px body
  size. The polar opposite of Backpack (16px, 700), and nowhere near the 14px/500–600
  majority. **No minimum width**, a 1px border, line height `--lh-sm` = (13+2)/13 ≈ 1.1538
  (unitless — which drifts from the intended "+2px" at larger sizes).
- **The default size is an unnamed step outside the scale** — the size classes are only
  xs/sm/md, and the classless default (37.8px) wedges **between** sm (35.0) and md (45.4).
- **At md the radius shrinks, 6→5px** — an odd radius from `calc(4px + 1px)`. The opposite
  direction from Backpack (8→12px at large).
- Every dimension and colour goes through `--_bu-*` underscore-prefixed variables with a
  `--theme-button-*` fallback chain — the same "internal use" signal as Backpack's
  `--bpk-private-*`, given here by the `_` prefix.
- Variants: filled · outlined · link · unset, plus danger/featured/muted, plus
  **three social sign-in buttons (facebook · google · github) inside the system** — the
  Facebook brand colour is derived at compile time by LESS `darken()`.

### Inputs (`.s-input` / `.s-textarea`)

Again no fixed height and em padding. There are **five sizes, more than the button's three**.

| | default | sm | md | lg | xl |
|---|:--:|:--:|:--:|:--:|:--:|
| type | 13px | 12px | 17px | 21px (title) | 27px (headline1) |
| block padding | 0.6em (7.8px) | 0.6em (7.2px) | 0.5em (8.5px) | 0.45em (9.45px) | 0.4em (10.8px) |
| inline padding | 0.7em (9.1px) | 0.7em | 0.7em (11.9px) | 0.6em (12.6px) | 0.5em (13.5px) |

- **The em coefficient shrinks as the size grows** (0.6→0.4em) — damping em padding's
  runaway proportionality with the coefficient. Border 1px, radius 6px (5px at md and lg,
  6px at xl).
- **An iOS Safari-specific branch lives in the component CSS** — inside
  `@supports (-webkit-overflow-scrolling: touch)` it **forces the type to 16px** (to stop
  the page zooming on focus) and re-tunes the padding to 0.55/0.36em. An accessibility/UX
  correction pinned at the component layer rather than in the tokens.
- The label (`.s-label`) is **a separate block** with no floating — 15px (body2) · **700** ·
  `padding: 0 2px` (with a comment noting it is for optical alignment with the input). The
  label is 700 while the button is 400 — the weight hierarchy is inverted relative to most
  of the sample.

### Modals (`.s-modal`)

| | value |
|---|---|
| width | max-width **600px, a single step** (+ `__full` = 100% − 48px) |
| radius | 8px (`--br-lg`) |
| padding | 24px on all sides (64px top on the celebration variant) |
| scrim | `hsla(210, 8%, 5%, 0.5)` (black-600 at 50% — compiled from LESS `fade()`) |
| enter | opacity and transform over **100ms with a 10ms delay**, `--te-smooth` |
| exit | **opacity 200ms** · transform 100ms |

- **The exit opacity (200ms) is twice the enter (100ms)** — **the reverse** of every sample
  in `patterns/modal.md` (Radix 200/160 · Atlassian 250/200 · MUI 225/195 · shadcn 200/200),
  where enter ≥ exit.
- The dialog's enter transform is `translateY(30%) + scale(0.6)` → 1 — far more movement
  than the sample's modal scales (0.95–0.97, `patterns/modal.md`).
- A single 600px width puts it in the one-width camp with shadcn (512px).

### Easings — the Penner constants, tokenised

All eight `--te-*` tokens **match the Penner easings (the easings.net constants)**:

| token | value | Penner equivalent | uses |
|------|-----|------|:---:|
| `--te-smooth` | (0.165, 0.84, 0.44, 1) | easeOutQuart | **11** |
| `--te-smooth-slow` | (0.25, 0.46, 0.45, 0.94) | easeOutQuad | 2 |
| `--te-ease-in` | (0.47, 0, 0.745, 0.715) | easeInSine | 1 |
| `--te-smooth-quick` | (0.19, 1, 0.22, 1) | easeOutExpo | 0 |
| `--te-ease-out` / `--te-ease-in-out` | the Sine family | easeOut/InOutSine | 0 |
| `--te-back-out` / `--te-back-in-out` | (…1.275) / (…1.55) | easeOut/InOutBack | 0 |

- **Three of the eight are actually used** — the back family (overshoot) ships but is used
  zero times. A different lineage from the Material-curve camp (MUI, Backpack's newer
  components), and in practice a single curve: easeOutQuart.
- High contrast is handled by **a `body.theme-highcontrast` class** rather than a media
  query (the `forced-colors` query appears in exactly one place in the whole CSS, on a
  checkbox). Focus rings lay down a **2px transparent outline** so the shape survives in
  Windows forced-colour mode.

### Characteristic decisions (from the deep pass)

- **Heights derived from em padding** — neither the fixed-height camp nor MUI's px-derived
  one, but a proportional em layer
- **Buttons at 400, labels at 700** — an inverted weight hierarchy
- **The default button size sits outside the size scale** (between sm and md)
- **Eight Penner easings tokenised, three actually used**
- **Modal exit longer than enter** — the reverse of the sample
- An iOS Safari 16px branch built into the component CSS

## Characteristic decisions

- **13px body text** — the only such value in the sample
- **Repeating rem decimals over 13** — the trace of a base mismatch exposed in the values
- static/scaled spacing pairs — Cloudscape's distinction implemented with calc
- Twin px/em type tokens
- Dark handled by class and media query together (556 branches)

## Accessibility

Unverified.

## References

- Tokens: `npm pack @stackoverflow/stacks@2.9.0` → `dist/css/stacks.css`
- Components in depth: `lib/components/{button,input_textarea,label,modal}/*.less` from the
  same package plus `lib/exports/mixins.less` (size-styles, focus-styles,
  highcontrast-mode), cross-checked against `dist/css/stacks.css` (2026-08-18)
- **Open questions:** the colour palette structure, ~~the component list~~
  ~~high-contrast support~~ ~~the Stimulus controller list~~ (resolved 2026-08-18 — the deep
  pass)
