---
name: Shoelace (→ Web Awesome)
org: Font Awesome (Cory LaViska)
coverage: partial
url: https://shoelace.style
repo: https://github.com/shoelace-style/shoelace
license: MIT
tech: [Web Components, Lit]
figma_kit: unverified
tokens_format: [CSS]
a11y_target: unverified
platform: web
domain: framework
verified: 2026-08-18
source: "npm @shoelace-style/shoelace@2.20.1 → dist/themes/light.css"
---
<!-- lang-links -->
> **English** · [한국어](shoelace.ko.md)
<!-- /lang-links -->

## In one line

A Web Components framework — its spacing has **neither 24 nor 32** (jumping 20 → 28 →
36), its radii start at 3px with `circle` and `pill` split apart, and its input heights
are **30/40/50px**.

## Tokens

```
spacing:   2 · 4 · 8 · 12 · 16 · 20 · 28 · 36 · 48 · 72   (no 24, 32 or 64)
font-size: 10 · 12 · 14 · 16 · 20 · 24 · 36 · 48 · 72
radius:    small 3px · medium 4 · large 8 · x-large 16 + circle 50% · pill 9999px
input-height: small 30 · medium 40 · large 50px
```

- **It removed 24 and 32 from the core at the same time** — ten t-shirt-named steps,
  with 28 following 20. It joins the core-departure list (Garden, Grommet, Mantine…)
  and is likewise a **name-based scale** (re-confirming the tendency noted in
  `tokens/scales.md`)
- The smallest radius is **3px** — the odd-number radius camp (Helios, Semi, Naive)
- `circle` and `pill` coexist — the pill/perfect-circle split (`GLOSSARY.md`)
- The 30px small input height matches Blueprint's default control
- Dark is a separate file, `dist/themes/dark.css`

## Component deep-dive — (2026-08-18)

Parsed from `dist/chunks/*.js` in the same `@shoelace-style/shoelace@2.20.1` (Lit `css`
tagged templates — styles serialised into the JS chunks), with variables resolved all
the way through `dist/themes/light.css`. 58 component directories confirmed.

### Buttons (`<sl-button>`) — they use the input height tokens directly

| | small | medium | large |
|---|:--:|:--:|:--:|
| **min-height** | **30px** (`--sl-input-height-small`) | 40px | 50px |
| Type | **12px** | 14px | 16px |
| Line height | `calc(height − 2px border)` = 28px | 38px | 48px |
| Label horizontal padding | 12px | 16px | 20px |
| Radius | 4px | 4px | 4px |

- **There are no button height tokens** — it uses `--sl-input-height-*` directly. The
  30/40/50px alignment between buttons and inputs is enforced by a single token
  (whereas Backpack writes the same values out in two places).
- **The line height is back-computed as height − 2px border** — the same technique as
  Garden. A single line of text is centred vertically by line height, so there is no
  vertical padding.
- **The button type (12/14/16) is one step smaller than the input type (14/16/20)** —
  `--sl-button-font-size-*` references `--sl-font-size-*` one notch down.
- **The weight token is named `semibold` but its value is 500** — in most systems 500 is
  medium and semibold is 600. A name-value mismatch sample.
- The radius is **4px at every size** — all three of
  `--sl-input-border-radius-small/medium/large` point at
  `--sl-border-radius-medium` (4px), a triple alias over one value. The token layer's
  3/4/8/16px scale goes unused on controls.
- The `pill` variant puts **the height token straight into the radius** (30/40/50px),
  and `circle` uses 50% with width = height. Transitions are **50ms**
  (`--sl-transition-x-fast`) — among the shortest in the sample.
- Variants: default · primary · success · neutral · warning · danger ×
  standard/outline, plus text. Hover shifts the step 600 → 500 and active returns to
  600. Disabled is opacity 0.5.

### Inputs (`<sl-input>`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **height (fixed)** | 30px | 40px | 50px |
| Type | 14px | 16px | 20px |
| Horizontal padding | 12px | 16px | 20px |
| Radius | 4px | 4px | 4px |

- Buttons use min-height while inputs use a fixed height — the same asymmetry as
  Backpack.
- The inner `input` element's height is separately set to
  `calc(height − 2px border)`.

### Dialogs and drawers — animation lives in a JS registry, not CSS

| | `<sl-dialog>` | `<sl-drawer>` |
|---|---|---|
| Width | `--width: 31rem` (496px) | `--size: 25rem` (400px) |
| Ceiling | `calc(100% − 36px)` | max 100% |
| Radius | 4px | — |
| Header/body/footer padding | 20px each (`--sl-spacing-large`) | same |
| Entry | scale 0.8→1 plus fade, **250ms ease** | a 100% translate slide from its edge, 250ms ease |
| z-index | 800 | 700 |

- **Every entry and exit is registered as keyframes in a `setDefaultAnimation()` JS
  registry** (the Web Animations API), and consumers can swap them per component and
  per direction with `setAnimation()`. A structure unique in the sample, diverging from
  the CSS-keyframes camp (Backpack, Radix). Even RTL-specific keyframes
  (`rtlKeyframes`) are in the registry.
- **Refuse-to-close feedback is built in** — `denyClose`: a scale 1→1.02→1 pulse over
  250ms. (The shake shown when an overlay click cannot close it is part of the default
  animation set.)
- Width and padding are exposed as **host custom properties** — `--width`, `--size`,
  `--header-spacing` and so on. An unprefixed consumer-override contract, the exact
  opposite signal from Backpack's `--bpk-private-*`.
- The scrim is **grey rather than black**: `hsl(240 3.8% 46.1% / 33%)`.

### Notable decisions (deep-dive)

- **Buttons borrow the input height tokens** — a single source for control heights
  (30/40/50px)
- **Vertical centring by back-computed line height** (height − 2px) — the Garden camp
- **A radius scale exists but every control is 4px** — three aliases converging on one
  value
- **A JS animation registry** plus a built-in denyClose pulse — unique in the sample
- **`semibold` = 500** — a name-value mismatch
- 50ms transitions — among the shortest control state transitions in the sample

## Notable decisions

- **24 and 32 absent together** — a core-departure combination unique in the sample
- Distributed as Web Components (Lit) — the same camp as Siemens iX, with no wrappers
- The tops of the font and spacing scales converge on the same values (36/48/72)
- Being reworked into Web Awesome following the Font Awesome acquisition (per the npm
  description)

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @shoelace-style/shoelace@2.20.1` → `dist/themes/light.css`
- Component deep-dive: the button, input, dialog and drawer style chunks in the same
  package's `dist/chunks/`, plus the `setDefaultAnimation` registrations (2026-08-18)
- **Still to confirm:** ~~the component list~~ (resolved 2026-08-18 — 58 directories),
  how the tokens change after Web Awesome, and the accessibility target
