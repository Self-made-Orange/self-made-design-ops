---
name: Intergalactic (Semcore)
org: Semrush
coverage: partial
url: https://developer.semrush.com/intergalactic
repo: https://github.com/semrush/intergalactic
license: MIT
tech: [React]
figma_kit: true
tokens_format: [CSS, JS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @semcore/core@17.3.0 → lib/theme/themes/{light,dark,auto,highlights-light,highlights-dark}.css · npm @semcore/button@17.2.1 · input@17.2.2 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](intergalactic.ko.md)
<!-- /lang-links -->

## In one line

Semrush's system — there is **a separate theme file dedicated to "feature highlights"** and
**every value in it is a gradient**. Durations are **enumerated per component**, and every
raw colour carries **a use-condition incantation in a comment** (773 of them).

## Tokens — five themes

```
light.css · dark.css · auto.css (raw) ·
highlights-light.css · highlights-dark.css   ← highlight-only
```

### The highlight theme — every value a gradient

```css
--intergalactic-control-primary-feature-highlight:
  linear-gradient(90deg, #ab6cfe, #008ff8);
--intergalactic-border-feature-highlight:
  linear-gradient(90deg, #c695ff, #2bb3ff);
```

- **The only sample that ships "emphasise new or paid features" as a theme file of its
  own.** All 17 tokens are purple-to-blue gradients, borders included (this is also the only
  place in the sample using a gradient on a border)
- It is **an axis orthogonal** to light/dark — the same structure as Tegel's `mode-variant`
  (surface hierarchy), applied here to **marketing emphasis**.
  The first data of a SaaS upsell UI appearing at the token layer

### Use conditions as comments on the raw colours

```css
/* Only suitable for backgrounds. Can be completely invisible to users with
   low-contrast monitor or poor vision. */
--gray-50: #f4f5f9;
/* Use only for light strokes and active backgrounds. */
--gray-100: #e0e1e9;
```

**There are 773 comments** — the second case, after Cloudscape (`$description` fields), of
shipping usage guidance alongside the tokens, and the only one to **name the risk to
low-vision users and low-contrast monitors explicitly**. Accessibility warnings live in the
token comments.

### Durations — enumerated per component

```
extra-fast 100 · fast 200 · medium 300 · slow 400 · extra-slow 500
accordion 200 · control 200 · counter 200 · modal 200 · popper 200 ·
switch 100
```

Above five semantic steps sit **separate durations for six components** — a miniature of
Atlassian's 68 per-component composite tokens, except the values are mostly the same 200
(only switch is 100). **Split apart, but not yet differentiated.**

Radius: `2 · 4 · 6 · 12 · 24` — mixing odd and even, including 6px, and irregular rather
than doubling.

## Components in depth — (2026-08-18)

Measured from the `*.shadow.css` files of the individual component packages
(`@semcore/button@17.2.1` · `input@17.2.2` · `modal@17.2.2`) — a house CSS dialect in which
component selectors like SButton are replaced by classes at build time. Every `var()` carries
**an inlined OKLCH fallback** — a dual distribution that works without the theme CSS.

### Buttons — 28px by default, and no inline padding

| | s | m (default) | l |
|---|:--:|:--:|:--:|
| height | 20px (**square, icon-only**) | **28px** | 40px |
| type | — | 14px / lh 142% | 16px / lh 150% |
| radius | 4px (`addon-rounded`) | 6px (`control-rounded`) | 6px |
| weight | 500 throughout | | |

- **The default m at 28px is among the shortest controls in the sample** — a step below the
  32px dense camp (Ring UI, Siemens iX), an ultra-dense position for a data tool.
  s (20px) is an icon-only size with its width fixed too.
- **The button itself has no inline padding** — the space is produced by the child `SText`'s
  margin (8px at m, 12px at l) and the `SAddon`'s. Icon spacing is `calc(8px - 1px)` with a
  **`/* -1px - for border width */` comment** — the border-subtracting intent recorded as a
  comment (Kontur puts it in the value; here it is in a comment).
- Variants form **a matrix of use (primary/secondary/tertiary) × theme (info/success/
  warning/danger/muted/invert)**, more than twelve in all — and yet
  **`primary-warning` holds exactly the same value as `primary-brand`**: the combination API
  opened first, the values not yet differentiated (the colour edition of the same pattern as
  the enumerated durations).
- The `neighborLocation` prop (left/right/both) joins groups — buttons and inputs share the
  same API, and the overlapping border is handled with `margin-left:-1px` plus a
  pseudo-element rule.
- The shipped CSS still contains **`/* disable-tokens-validator */` comments** — the only
  data in the sample showing both that a linter enforces tokens over literals and that its
  escape hatch is visible in the shipped artefact.

### Inputs — the border is a separate sibling element

| | m | l |
|---|:--:|:--:|
| height | 28px (`form-control-m`) | 40px — the same token as the button |
| type | 14px | 16px |
| value padding | 0 8px | 0 12px |
| radius | 6px | 6px |

- **The border and background belong not to the input but to a sibling `SOutline`**
  (absolute, z-index −1, a 1px border). The `SInput` container reserves the border's space
  with `padding: 1px`, and states (normal/valid/invalid) swap SOutline's border colour.
- **Even the focus ring takes the state colour** — green when valid
  (`keyboard-focus-valid`), red when invalid. This parts from the sample's majority
  convention that focus is blue. The ring is 3px (of the
  `0 0 0 3px rgba(0,143,248,.5)` family).

### Modals — nested scrims damp themselves, and a fallback drift caught in the act

| item | value |
|------|-----|
| radius | fallback **14px** vs theme file **12px** |
| padding | 40px (`spacing-10x`) — a 12px mobile wrapper |
| title | 24px / 600 |
| width | no scale (only a 60% min-width on mobile) |
| duration | `--intergalactic-duration-modal: 200` (unitless) |

- **The component's inline fallback (14px) disagrees with the theme value (12px)** — a
  sample where drift between a dual distribution (fallback plus theme) is actually
  observable. The radius depends on which one loads.
- **The scrim of a modal over a modal thins automatically** — an `SOverlay` inside an
  `SOverlay` receives `overlay-secondary` (a lower alpha). The only structure in the sample
  where the styling is aware of nesting depth.
- **The duration token is the unitless `"200"`** — JS (`cssVariableEnhance`) reads it with
  `parseInt` and injects it into the React animation. The same "CSS variable → JS
  consumption" direction as Siemens iX, and the unit is dropped precisely for that parsing.
- The modal package bundles **JSON translations of its aria labels in 15 languages** —
  i18n shipped per component.

### Characteristic decisions (from the deep pass)

- **A 28px default control** — among the densest in the sample
- **Child margins instead of padding**, with the border subtraction documented in a comment
- **A separated SOutline border** · a focus ring that takes the state colour
- **Nested modal scrims damping automatically** — unique in the sample
- **The 14px fallback vs 12px theme drift** — a failure case of dual distribution
- **A unitless duration parsed by JS** · `primary-warning` still an alias of brand

## Characteristic decisions

- **A highlight-only theme file where every token is a gradient** — unique in the sample
- Gradient borders — unique in the sample
- **Low-vision warnings in the raw-colour comments** — unique in the sample (773 comments)
- Durations enumerated per component (mostly holding identical values)
- A five-theme structure (light/dark × ordinary/highlight, plus raw)

## Accessibility

- The raw-colour comments name the risks of low contrast and low vision
- Figures and targets are unverified

## References

- Tokens: `npm pack @semcore/core@17.3.0` → `lib/theme/themes/`
- Components ship split across many `@semcore/*` packages
- Components in depth: `lib/esm/**/*.shadow.css` and `Modal.mjs` from
  `@semcore/button@17.2.1` · `@semcore/input@17.2.2` · `@semcore/modal@17.2.2`, plus
  `lib/themes/light.css` from `@semcore/utils@4.49.0` (2026-08-18)
- **Open questions:** ~~the spacing system~~ ~~typography~~ (resolved 2026-08-18 — obtained
  from the utils theme: spacing `05x`–`24x` = 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 ·
  80 · 96px, named in multiples of 4; type `fs-50`–`800` = 10 · 12 · 14 · 16 · 20 · 24 · 32 ·
  36 · 48px plus `lh-100`–`800` percentage line heights), the component list, and the rules
  governing when the highlight theme applies
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — "Figma libraries" in the global
  navigation of `developer.semrush.com/intergalactic` → `figma.com/@semrush`
