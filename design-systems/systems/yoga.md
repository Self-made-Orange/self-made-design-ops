---
name: Yoga
org: Wellhub (formerly Gympass)
coverage: partial
url: https://gympass.github.io/yoga
repo: https://github.com/gympass/yoga
license: MIT
tech: [React, React Native, styled-components]
figma_kit: false
tokens_format: [JS]
a11y_target: null
platform: [web, mobile]
domain: consumer
verified: 2026-08-18
source: "npm @gympass/yoga-tokens@3.9.0 → esm/global/*.js"
---
<!-- lang-links -->
> **English** · [한국어](yoga.ko.md)
<!-- /lang-links -->

## In one line

Wellhub's system (fitness subscriptions) — **a breakpoint is a bundle of three values:
width, margin and gutter**, elevation splits into **platform-specific files**
(`.ios`/`.android`), and the size names run to `huge` and `xhuge` across
**12 t-shirt steps**.

## Tokens

### Breakpoints as bundles of three layout values

```js
xxs: { width: 0,    margin: 20, gutter: 16 }
lg:  { width: 1024, margin: 71, gutter: 24 }
xxxl:{ width: 1600, margin: 71, gutter: 24 }
```

- **Each breakpoint defines its margin and gutter alongside** — most of the sample makes a
  breakpoint a single width, whereas Yoga **ships the layout whitespace to use at that width
  bundled with it**. The same coupling as USWDS (breakpoints derived from spacing), made from
  the opposite direction
- **`margin: 71px`** — not a multiple of 8 or 4 (throughout lg and above).
  71 is a kind of number unique in the sample, and the source gives no rationale
- Eight steps, xxs–xxxl (0 · 360 · 480 · 768 · 1024 · 1200 · 1366 · 1600) — including 1366,
  a real laptop width

### Scales — 12 steps, with a `huge` suffix

```
spacing:  0 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 80
fontSize: 10 · 12 · 14 · 16 · 20 · 24 · 32 · 40 · 48 · 60
lineHeight: 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 60 (fixed px)
radii: sharp 0 · xsmall 4 · small 8 · regular 16 · circle 9999
```

- **The t-shirt names extend into `huge` and `xhuge`** — past xxxlarge it moves to a new word
  rather than repeating the x prefix. Twelve t-shirt steps is the most in the sample
  (a real-world response to the limits of t-shirt extension noted in `GLOSSARY.md`)
- **Line height is a separate scale with the same number of steps as size** (both ten, in
  fixed px) — the consumer decides the pairing
- The largest square radius step is named **`regular`** (16) — a scale that ends at regular
  rather than large (the name-ordering family in `GLOSSARY.md`)
- Weights start at `light 300` — few systems include 300

### Elevation in platform-specific files

```
elevations.js · elevations.ios.js · elevations.android.js
```

**Shadows ship across three files, for web, iOS and Android** — inevitable in a system that
supports RN, but Yoga is the only one in the sample that branches elevation by platform
(TDS keeps a separate RN package but does not branch its shadows).
They are generated from a colour by an `elevate()` function.

## Components in depth — (2026-08-18)

Components were measured from `@gympass/yoga@7.144.4` (web and RN together,
styled-components). Each component's `*.theme.js` defines its dimensions as token references,
so they were resolved through to the real values in `yoga-tokens@3.9.0`.
There are 39 component directories (including Theme), with web and native implementations
coexisting under `web/` and `native/`.

### Buttons — pills throughout, with states as alpha arithmetic

| | default | small |
|---|:--:|:--:|
| **height** | **48px** | 32px |
| inline padding | 24px | 16px |
| radius | **9999 (`radii.circle`)** | same |
| type | 16px / 24px / **500** | 14px / 16px |
| icon | 24px (8px gap) | 16px |

- **Every button is a pill** — it skips the square radius scale (4 · 8 · 16) and goes
  straight to `radii.circle` (9999). Unlike the majority, where buttons and inputs share a
  radius (Backpack's 8px and so on), **only the button's shape differs** here (the input is
  8px).
- **Hover does not change the background** — it turns on a glow, `box-shadow: 0 4px 8px` in
  **45% alpha of the button's own background colour**. The same family as Bolt
  (lift plus glow), except Yoga does the shadow without the movement.
- **Pressed is 75% alpha of the same colour** — `hexToRgb(primary, 0.75)`.
  Rather than keeping a state palette, it **generates state colours by alpha arithmetic**
  (a minimal form of the SmartHR state-colour-function family).
- Two size steps (48/32) — the same two-step camp as Backpack (36/48), with a larger base.
- The transition is the literal `transition: all 0.2s` — it does not use the motion tokens
  (below).

### Inputs — a Material notch floating label, with the width fixed too (320px)

| item | value |
|---|---|
| **width** | **a fixed 320px** |
| height | 52px |
| padding | 16px all round |
| border · radius | 1px · 8px (`radii.small`) |
| type | 14px / 400 / 20px line height |

- **The default width is a fixed 320px** — most of the sample follows the parent's width or
  sets only a min-width (Asphalt 160, Pluralsight 192). A rare case of pinning a finished
  dimension.
- The label shrinks 14→12px and rises by **translateY(−24px)** (derived by the formula
  `height/2 − 2`), and the `<legend>`'s `max-width` switches from 0 to `max-content` to
  **cut a notch in the border** — a floating label of the same Material lineage as MUI's,
  implemented with fieldset/legend.
- The label transition is **500ms `cubic-bezier(0, 0.75, 0.1, 1)`** — 2.5× the button's
  200ms, making the label float the longest transition in the system.

### Dialogs — one width (580px), and a purple-tinged scrim

- A **single 580px width** (no variants) · min-height 160px · radius 16px
  (`radii.regular` — **the largest square step, used as-is**).
- Padding: 40px on top (24px when there is a close button), 32px inline and at the bottom.
- **The scrim is `rgba(35, 27, 34, 0.48)`** — not pure black but **48% of #231B22, a
  purple-tinged dark**. It parts from the achromatic-scrim majority.
- **There is no entrance animation** — zero keyframes and zero transitions.
  It does only FocusLock, a portal and moving the initial focus.
- The close button is a 40px container (spacing.xxlarge) holding a 20px icon
  (spacing.medium).

### Motion tokens as unnamed arrays

```js
duration: [200, 500]
timing: [[0, 0.75, 0.1, 1]]
```

Consumption is **by index**, `transition.duration[1]` and `transition.timing[0]` — the only
unnamed-array form among the samples that tokenise motion, and the source says nothing about
what each slot is for (observed use: 500ms for the floating label; the button uses a literal
0.2s rather than the token). Tokenising the easing and yet keeping literals alongside is the
same drift as Backpack (no tokens plus literals), by a different route.

### Characteristic decisions (from the deep pass)

- **Every button a pill (9999)** with a self-coloured hover glow and **pressed at 75% alpha**
  — state colours from alpha arithmetic rather than a palette
- **A fixed 320px default input width** — rare in the sample
- **A fieldset/legend notch floating label**, with a 500ms curve of its own
- A dialog scrim of `rgba(35,27,34,.48)` — a purple-tinged brand scrim
- **Motion tokens as unnamed arrays** (consumed as `duration[1]`) — unique in the sample

## Characteristic decisions

- **Breakpoint = width + margin + gutter bundled** — unique in the sample
- `margin: 71px` — an off-grid value
- **Twelve t-shirt steps** (`huge`/`xhuge`) — the most steps in the sample
- Elevation in three platform-specific files — unique in the sample
- The largest square radius step is named `regular`
- Both platforms, `[web, mobile]` (RN supported alongside)

## Accessibility

~~Unverified~~ → **Confirmed absent (2026-08-18, headless render).**

Even when rendered, Yoga **publishes no accessibility documentation.**
The documentation site's top level is **just three items** — Guidelines · Components ·
System — and within Guidelines the sidebar is **a single Design Tokens group**:
Borders · Breakpoints · Colors · Elevations · Font-Sizes · Font-Weights ·
Fonts · Line-Heights · Shapes · Spacing · Typography.
There is no accessibility entry at all.

Render paths checked (the strings `WCAG` and `accessib` appear zero times on each):

- https://gympass.github.io/yoga/ — the landing page, introducing only the three sections
- https://gympass.github.io/yoga/guidelines/tokens/borders — the Guidelines sidebar expanded
- https://gympass.github.io/yoga/system/getting-started/ — the System section

The landing page describes Guidelines as "Design principles, practical patterns and high
quality design resources", while what is actually beneath it is **a token reference and
nothing else** — a case of the claim and the contents diverging. **Classified C, confirmed.**

### Figma kit absent — confirmed by render (2026-08-18)

This is the basis for `figma_kit: false`. Rendering the three pages above yields
**the string `figma` zero times**. There is no download or link on the documentation site
corresponding to the "high quality design resources" the landing page promises.

## References

- Tokens: `npm pack @gympass/yoga-tokens@3.9.0` → `esm/global/`
- Components: `@gympass/yoga@7.144.4` → `esm/{Button,Input,Dialog}/`
  `*.theme.js` plus `web/*.js` (used in the 2026-08-18 deep pass)
- Documentation site: https://gympass.github.io/yoga (headless render, 2026-08-18 —
  Guidelines is a token reference only)
- **Open questions:** the colour palette, ~~the component list~~ (resolved 2026-08-18 —
  39 directories, the deep pass), ~~the Figma kit~~ and ~~the accessibility target~~
  (rendered 2026-08-18 — both confirmed absent, sections above), the rationale for the `71px`
  margin, and dark mode
