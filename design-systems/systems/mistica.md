---
name: Mística
org: Telefónica
coverage: partial
url: https://mistica-web.vercel.app
repo: https://github.com/Telefonica/mistica
license: MIT
tech: [React]
figma_kit: false
tokens_format: [JS]
a11y_target: "confirmed absent (2026-08-18 — the 135 Storybook entries hold accessibility utilities only, with no WCAG target documented)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @telefonica/mistica@17.1.0 → dist-es/skins/*.js (re-verified against 16.44.1 — see the correction below)"
---
<!-- lang-links -->
> **English** · [한국어](mistica.ko.md)
<!-- /lang-links -->

## In one line

Telefónica's (a telecoms group) system — **eight brand skins** (movistar · o2 · vivo ·
vivo-evolution · blau · telefonica · esimflag) in one package, with radii that are
**component-semantic only**.
**The high-contrast (HC) primitive tokens present in 16.44.1 are gone in 17.1.0** — the
first time the corpus has caught a token change between versions.

## Tokens — distributed per skin

The `skins/` directory holds a full token set per brand (17.1.0):
`movistar` · `o2` · `vivo` · `vivo-evolution` · `blau` · `telefonica` · `esimflag`
(plus `defaults`). **The most multi-brand sample in the corpus**, beyond Auro's three.
16.44.1 had `movistar-new` / `o2-new` / `vivo-new` pairs — a new-and-old coexistence
during a rebranding transition, since tidied away.

### The high-contrast (HC) tokens disappeared in 17.1.0

> **A change between versions — the first the corpus actually caught.**
> In 16.44.1 the primitive palette carried `HC` (High Contrast) variants alongside:
> ```js
> movistarBlue: "#0B9CEA"  ·  movistarBlueHC: "#066FCB"  ·  movistarBlueHC55: "#055EAC"
> ```
> **17.1.0 has no `HC` token at all** (just `movistarBlue`). Keeping high contrast as a
> sibling value in the primitive ramp — a placement unique in the sample at the time —
> **was removed in the version bump**. Where it went cannot be determined from this
> package: whether it moved to the semantic layer or the capability was dropped is
> unsettled.
>
> **The skin list changed too** — the `-new` suffixed pairs (`movistar-new`, `o2-new`,
> `vivo-new`) are gone and `vivo-evolution` has appeared. The rebranding transition has
> finished. The `tag` radius also changed from 24px to **0px**.

The current (17.1.0) eight skins: `movistar` · `o2` · `vivo` · **`vivo-evolution`** ·
`blau` · `telefonica` · `esimflag` (plus `defaults`).

### Radii — entirely component-semantic

```js
avatar: "50%" · bar: "999px" · button: 4 · checkbox: 4 · input: 12
container: 16 · popup: 8 · sheet: 16 · chip: 24 · indicator: 24 · tag: 0  ← changed 24→0 in 17.1.0
```

**No size scale (s/m/l) at all — just thirteen component names.** Cloudscape's semantic
radii pushed to their conclusion. `avatar 50%` and `bar 999px` do the pill /
true-circle split (`GLOSSARY.md`) at the component layer.

### Text presets — per component, with viewport pairs

```js
chipLabel: { size: { desktop: 16, mobile: 14 }, lineHeight: { desktop: 24, mobile: 20 } }
```

**Each component's text carries a desktop/mobile value pair** — the same viewport
duplication as Spindle (three spacing files) and Spectrum (sets), applied to typography.
The direction, desktop 16 / mobile 14, matches Serendie (expanded 16 / compact 14).

## Component deep-dive — (2026-08-18)

The vanilla-extract output of `@telefonica/mistica@17.1.0` was measured —
`dist-es/*.css-mistica.js` (class and contract exports) plus `dist-es/style.css` (the
compiled CSS) plus `dist-es/skins/*.js` (the real values per skin). The hashed variables
were all resolved by tracing back through the semantic mapping in
`skins/skin-contract.css-mistica.js`.

### Buttons — the border is 1.5px

| | default | small |
|---|:--:|:--:|
| **min-width** | **104px** | 80px |
| Border | **1.5px** solid | same |
| Vertical padding | `calc(12px − 1.5px)` = **10.5px** | `calc(6px − 1.5px)` = 4.5px |
| Horizontal padding | the skin slot − 1.5px (movistar: 16 − 1.5 = 14.5px) | the same formula |
| Type | Text3: mobile **16/24** · desktop 18/24 | 14/20 |
| **Derived height** | **48px** (24 + 10.5×2 + 1.5×2) | 32px |

- **A 1.5px border width — the only fractional border in the sample.** And every padding
  subtracts the border as `calc(value − 1.5px)` (the same principle as MUI's −1px and
  Helios's −1px, carried to a fraction).
- **Only the radius differs by brand**: on identical 48px geometry, movistar and blau take
  **4px** while o2, vivo, vivo-evolution, telefonica and esimflag take **32px**
  (effectively a pill) — the difference in button character across the eight skins comes
  from the radius alone.
- min-width 104/80px — the explicit minimum-width camp (MUI 64px), at much larger values.
- The loading state is a **vertical swap between text and spinner**: two layers crossing by
  `translateY(±2rem)` over 300ms `cubic-bezier(.77, 0, .175, 1)` — a dedicated curve,
  distinct from the colour transition (100ms ease-in-out).

### Inputs (TextField) — no height, everything from padding formulas

| | Value |
|---|---|
| Default width | **328px** (`DEFAULT_WIDTH`) |
| Value type | 16px / 22px (`inputValue` — identical on mobile and desktop) |
| Label | desktop 14px / mobile 12px — the shrink factor is **`calc(label ÷ value)`** = desktop 0.875 / mobile 0.75 |
| Horizontal padding | left **11px** / right **15px** (asymmetric literals) |
| Vertical padding | `label line height + calc(inputPadding − 1px)` — a dual value, mobile 9px / desktop 3px |
| Radius | the skin's `input` slot − 1px (movistar 12px → 11px inside) |

- The floating label's shrink factor is not a constant (the conventional 0.75) but
  **a division, label size ÷ value size**, computed per skin.
- `inputPadding` splits mobile 9 / desktop 3, so **a larger touch target on mobile** is
  produced in the token layer (the point where the token section's per-slot dual values
  actually get used).
- The container declares no fixed height — it derives from label, padding and line height.

### Dialogs — a single 680px desktop width

| | Default | Large screen |
|---|---|---|
| Width | `calc(100vw − 48px)` | **a fixed 680px** |
| Padding | 24px (with a separate area for the icon button) | **40px** |
| Radius | the `container` slot (movistar 16px · blau 8 · telefonica 4) | same |

- **There are no width steps** — a single 680px plus fluid. The opposite pole from
  Cloudscape's five and Helios's three.
- The large-screen branch is **`min-width: 1024px` AND `min-height: 550px`** — a media
  query rare in the sample for gating on **height as well as width**.
- Entry: the overlay fades while the content goes `scale(0.8)→1`, over
  **200ms ease-in-out** (`ANIMATION_DURATION_MS = 200` — the duration is exported as a JS
  constant too).
- The dialog radius has no dedicated value and **reuses the `container` slot** — the same
  radius as a card.

### Notable decisions (deep-dive)

- **A 1.5px border with −1.5px subtracted from every padding** — the only fractional border
  in the sample
- **Brand divergence confined to the radius and padding slots** — the geometry (48px) is
  common to all eight skins, and a button radius of 4 versus 32px sets the character
- The floating label's factor derived by division (0.875) — not a constant
- A single 680px dialog width — the fewest steps in the sample
- A dedicated easing for the loading swap, `(.77, 0, .175, 1)` — a separate curve from the
  colour transition

## Notable decisions

- **Eight brand skins in one package** — the most multi-brand sample
- **High contrast (HC) lived inside the primitive ramp in 16.44.1 and was removed in
  17.1.0** — the first token change between versions the corpus has caught
- **Radii are only thirteen component semantics** — no size scale
- Desktop/mobile value pairs on component text
- The `-new` skin pairs tidied away in 17.1.0 and replaced by `vivo-evolution` — the
  transition is complete
- Ramp steps at 15 and 55 — an uneven combination unique in the sample (as of 16.44.1)

## Accessibility

- **16.44.1**: high-contrast values built into the primitive palette (the HC family)
- **17.1.0**: no HC tokens — ~~where high-contrast support went is unverified~~ →
  **confirmed absent from the documentation site as well (2026-08-18, headless render)**

**It does not publish a compliance target (a WCAG version or level).** The documentation
site is a single Storybook, and its **135 entries** (measured from `index.json`) contain no
accessibility document. Across every page rendered, the string `WCAG` appears **zero
times** and there are **zero** documents about high contrast — so where the HC tokens
removed in 17.1.0 went **cannot be determined from the documentation site any more than
from the source repository** (classification C confirmed).

What it does provide is **accessibility utilities as components** — Storybook has
`Utilities/Accesibility/FocusTrap` and `Utilities/Accesibility/ScreenReaderOnly` (the
directory is spelled `Accesibility` with one s, a Spanish influence) plus
`Components/SkipLink`. The ScreenReaderOnly story is confirmed by a working example
reading "There is a hidden message in this screen that's only accessible to screen
readers".
Sources: https://mistica-web.vercel.app/ ·
https://mistica-web.vercel.app/?path=/story/utilities-accesibility-screenreaderonly--default
(headless render, 2026-08-18)

## Notes

- Tokens: `npm pack @telefonica/mistica@17.1.0` → `dist-es/skins/*.js`
  (`check-sources.mjs` reported a 16.44.1 → 17.1.0 major drift, prompting a re-harvest,
  which confirmed the HC token removal and the skin-list change)
- ~~Where the HC tokens moved~~ → **confirmed gone at the source too (2026-08-17).**
  Opening the design tokens' source repository (`Telefonica/mistica-design`
  `tokens/*.json`, at the 2026-08-15 commit) shows **no `contrast` family key at all** —
  this is **removal upstream**, not an npm packaging issue.
- **A bonus from the source tokens:** spacing is not a scale but **per component slot**
  (`buttonDefaultPadding` · `cardDefaultPadding`…) with **dual mobile/desktop values** —
  `inputPadding`'s vertical splitting mobile 9 / desktop 3, for instance. The radii are
  likewise enumerated by role (button and checkbox 4 / popup 8 / input 12 / container and
  sheet 16 / chip and indicator 24 / tag 0 / bar 999), which is where the values seen on
  npm come from.
- Component deep-dive: the same package's
  `dist-es/{button,text-field-base,dialog}.css-mistica.js` plus `dist-es/style.css` plus
  `skins/*.js` (2026-08-18)
- **Figma kit — confirmed absent (2026-08-18, headless render):** even rendered, this
  system publishes no Figma kit. Across the full Storybook render the string "Figma"
  appears **zero times**, and the design tool the Welcome document points to is
  **Playroom** — "For quick prototyping using Mística components, use the Mística
  Playroom … you can simultaneously design across a variety of themes and screen sizes,
  powered by JSX and Mística components library". **An arrangement where a code-based
  playroom takes the design tool's place.** The only external links are
  `github.com/Telefonica/mistica` (the design tokens' source) and
  `mistica-web#getting-started`.
  Source: https://mistica-web.vercel.app/?path=/story/welcome--welcome (rendered
  2026-08-18)
- **Still to confirm:** ~~the accessibility target~~ ~~the Figma kit~~ (2026-08-18 — both
  confirmed absent by rendering the documentation site), an exhaustive component list,
  dark-mode detail, and the RN package (`mistica-react-native`). ~~The licence~~ →
  **MIT** confirmed in package.json — reflected in the frontmatter (2026-08-18)
- **Licence resolved (2026-08-18):** `MIT` — source: github Telefonica/mistica-web →
  `LICENSE` (matching the npm `@telefonica/mistica@17.1.0` metadata). The frontmatter's
  `repo` (Telefonica/mistica) has no LICENSE file
