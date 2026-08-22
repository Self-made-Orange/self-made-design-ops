---
name: Charcoal
org: pixiv
coverage: partial
url: https://charcoal-web.pixiv.design
repo: https://github.com/pixiv/charcoal
license: Apache-2.0
tech: [React, CSS]
figma_kit: unverified
tokens_format: [JSON, CSS, TS]
a11y_target: "Confirmed to state none (2026-08-18 — no accessibility document among the Storybook's 70 entries, and zero mentions of WCAG on the rendered pages)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @charcoal-ui/theme@6.0.1 → src/json/{base,pixiv-light,pixiv-dark}.json · npm @charcoal-ui/react@6.0.1 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](charcoal.ko.md)
<!-- /lang-links -->

## In one line

pixiv's system — **the only sample to tokenise paragraph width**, with **radii that reference
the spacing tokens**, and two weights, 400 and 700 —
**confirming that the CJK two-weight pattern extends beyond government into consumer
services.**

## Tokens — base plus two themes (pixiv-light / pixiv-dark)

### Paragraph width — unique in the sample

```
s: 320px   s-compact: 280px   s-cozy: 588px
m: 448px   m-compact: 392px   m-cozy: 616px
l: 672px   l-compact: 588px   l-cozy: 924px
```

**Charcoal is the only system in the sample to make the measure a token.**
Nine of them: three sizes × three densities (default/compact/cozy). For the first time there
is sampled evidence for setting a body container's width — a default m of 448px, and a
longest l-cozy of 924px.

### Spacing — 21 steps, with opaque names

```
name:  0  1 10 15 20 25 30 35 40 43 46 50 55 60 63 66  70  80  90 100 999
px:    0  2  4  6  8 12 16 20 24 28 32 40 48 64 80 96 104 168 272 440 999999
```

- Every core value (4 · 8 · 16 · 24 · 32) is present. The top jumps 104→168→272→440
- **The relationship between the name and the value is not a formula** (`43` = 28px,
  `63` = 80px) — the only numeric naming system in the sample whose correspondence rule
  cannot be inferred
- **`999` = `999999px`** — a pill-style infinity sitting in the spacing scale

### The radii reference the spacing

```
xs: {space.1}(2) · s: {space.10}(4) · m: {space.20}(8) · l: {space.25}(12)
xl: {space.30}(16) · xxl: {space.40}(24) · oval: 999999px
```

**The radius tokens have no values of their own; they are aliases of spacing tokens** —
unique in the sample. "Radius and whitespace come from the same scale" enforced as structure.

### Typography — 400/700, a 16px body

- 15 sizes: `11 12 14 16 18 20 22 25 28 32 36 40 45 50 60` (including the odd 25)
- **Only two weights, 400 and 700** — the same composition as KRDS and the Digital Agency.
  **That makes 3 of 3 CJK samples, promoting this from a government commonality to a
  candidate CJK commonality** (pixiv is a consumer service)
- Semantics: `body` = 16px with a 24 line height, `paragraph` = **the same 16px but a 28 line
  height** — a structure that **divides body from paragraph by leading rather than size.**
  It comes as a set with the paragraph-width tokens
- The typeface is `Sarasa UI J` — an open-source CJK-specific face designated as the system
  typeface

### Colour — negative steps in the dark ramp

```
light ramp: 5 10 20 … 90 (10 steps)
dark ramp: -10 -5 0 5 10 … 90 (13 steps)
```

**Only the dark ramp has `-10`, `-5` and `0` steps** — the only sample to expose a
"negative lightness", darker than the background, directly in the names.
The 152 semantic tokens switch by swapping `{color.light/…}` for `{color.dark/…}` references.

`brand-color` lists five products alongside (booth · comic · factory · pixiv · premium) —
one token file carrying the brand colours of a whole product family.

## Components in depth — (2026-08-18)

Measured from `dist/index.css` (static CSS with `charcoal-*` classes) of
`@charcoal-ui/react@6.0.1`. Twenty components. Because every colour is a
`--charcoal-color-*` variable reference, **there are no colour literals in the component
CSS**, and swapping the theme JSON (light/dark) is the dark-mode switch.
A **`@layer charcoal`-wrapped edition ships in parallel** as `layered.css`.

### Buttons (`.charcoal-button`) — pills throughout

| | M (default) | S |
|---|:--:|:--:|
| height | **40px** | 32px |
| inline padding | 24px | 16px |
| radius | **999999px** | same |
| type | **14px / 22px / bold** | same |

- **The radius is the token section's `oval` (999999px) as-is** — every button is a pill.
  The infinity value sitting in the spacing scale, demonstrated as a component default.
- The system's body is 16px, yet **the button label is 14px/22px** — one more CJK sample
  dropping the component label a step (→ crossing the i18n axis).
- State colours are assembled solely from **a default/hover/press semantic triple**
  (`container-primary-default/hover/press`). disabled is not a colour but **a blanket
  opacity of 0.32**.
- Five variants: Default (transparent) · Primary · **Overlay** (on-img) ·
  **Navigation** (hud) · Danger (negative) — **the screen context (over an image, over a HUD)
  is the variant name**, a naming that parts from the role-name majority
  (primary/secondary).
- focus-visible: a `0 0 0 4px rgba(0,150,250,.32)` alpha ring. Built on `width: min-content`
  plus inline-grid.

### Inputs (`.charcoal-text-field`) — a border-less filled surface, plus an iOS scale hack

- The container: **40px tall (shared with button M)**, radius 4px (the opposite pole from the
  button's pill), and **no border — the surface is made from an alpha background**
  (`container-secondary-default-a`).
  focus-within is a blue 4px alpha ring; invalid is a red `rgba(255,43,0,.32)` ring —
  every state expressed as a box-shadow ring.
- **An iOS zoom-prevention scale hack** (stated in a source comment): the input renders at
  16px and is then scaled with `transform: scale(0.875)` to a visual 14px, with width, height,
  font-size and radius all back-corrected through `calc(…/0.875)` — avoiding iOS Safari's
  auto-zoom on inputs below 16px while keeping a 14px body density. **A technique unique in
  the sample** (→ crossing the i18n and mobile axes: an engineering resolution of the point
  where the CJK 14px camp collides with iOS's 16px rule).
- When the root is disabled, **the whole thing goes to opacity 0.32** — the same blanket
  policy as the button.

### Modals (`.charcoal-modal`) — an easeOutQuart slide-up

| S | M (default) | L |
|:--:|:--:|:--:|
| 336px | **440px** | 648px |

- Radius **24px**, a fixed 64px header, and a 16px/24px bold title.
- The entrance is not a fade but **a translateY(100%) → 0 slide-up over 400ms
  `cubic-bezier(0.25,1,0.5,1)`** — a source comment names the curve (easeOutQuart) and notes
  that "the duration must match the JS constant". There is even a defensive comment about
  setting `pointer-events: none` while exiting so clicks pass through.
- **The modal's footer buttons stack vertically** (a grid row with an 8px gap) — mobile-app
  grammar, parting from the horizontal-arrangement majority. A bottom-sheet variant
  (`data-bottom-sheet`) is built in by default.
- The scrim is the `background-overlay` variable, and background scrolling is controlled by
  overflow.

### Characteristic decisions (from the deep pass)

- **A pill button (999999px) against a 4px input** — the round/square contrast assigned by
  kind of component
- **The iOS zoom-prevention `scale(0.875)` back-correction** — unique in the sample
  (crossing i18n and mobile)
- **A 400ms easeOutQuart slide-up plus vertically stacked buttons** — mobile grammar carried
  through on desktop
- **disabled = a blanket opacity of 0.32** — one opacity value, with no colour variant
- Variant names drawn from screen context (on-img · hud) — the opposite pole from the
  role-name majority

## Characteristic decisions

- **Nine paragraph-width tokens** — unique in the sample, and the first data on body
  container widths
- **Radii as aliases of spacing** — a structure unique in the sample
- **Weights 400/700** — the third CJK sample, and the first outside government
- **Negative steps in the dark ramp** (-10/-5) — unique in the sample
- Body and paragraph distinguished by leading (24 vs 28), not size
- The only case where the spacing name-to-value correspondence is opaque, plus
  `999` = 999999px
- Themes prefixed `pixiv-*` — a multi-brand theme structure (brand-color across five
  products)

## Accessibility

~~Unverified.~~ → **Confirmed absent (2026-08-18, headless render).**

Even when rendered, this system publishes no accessibility target. All **70** documentation
entries of the site (**「Charcoal ドキュメント」**, a single Storybook) were checked through
`index.json` and there is no accessibility document. The structure is only
README · `foundation/README` · `theme/*` · `styled/*` · `tailwind-config/*` ·
`tailwind-diff/*` · `icons/*` · `react/*` (the components) and version notes (v4, v5, v6),
and across every rendered page the string `WCAG` appears **zero times**.
Sources: https://charcoal-web.pixiv.design/ ·
https://charcoal-web.pixiv.design/index.json (headless render, 2026-08-18)

The one accessibility-related artefact is that **the focus ring is exposed as a token and a
component** — the two documents `react/FocusRing` and `tailwind-config/FocusRing`.
It is **the "systematise focus visibility without a target level" form**, recorded here
alongside pixiv, a CJK consumer service, using two weights (400/700).

## References

- Tokens: `npm pack @charcoal-ui/theme@6.0.1` → `src/json/*.json`
- Components in depth: `npm pack @charcoal-ui/react@6.0.1` → `dist/index.css` (2026-08-18)
- **Rendering the documentation site (2026-08-18):** being an SPA (Storybook), curl returns
  only an empty shell, but a headless render does read the manager screen and the document
  list. However, **MDX document bodies are drawn only inside an iframe and do not appear in
  `--dump-dom`** — `foundation-readme--docs` was attempted three times (twice against the
  iframe directly, once through the manager) without obtaining the body. The absence verdict
  above is therefore **based on the document list and the rendered pages**, and whether the
  MDX bodies mention it remains open
- **Figma kit:** left as `unverified`. There is no Figma-related entry among the 70
  documentation entries and zero mentions of "Figma" on the rendered pages, but because of
  the MDX limitation above **it is not set to `false`**
  (2026-08-18, https://charcoal-web.pixiv.design/ render confirmed)
- **Open questions:** ~~the accessibility target~~ (confirmed absent 2026-08-18),
  ~~the components (`@charcoal-ui/react`)~~ (resolved 2026-08-18 — the deep pass),
  the Figma kit, and whether themes exist beyond pixiv's
