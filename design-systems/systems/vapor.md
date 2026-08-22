---
name: Vapor UI
org: goorm
coverage: partial
url: https://vapor-ui.goorm.io
repo: https://github.com/goorm-dev/vapor-ui
license: MIT
tech: [React]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 2.2 AA (stated — built on Base UI, confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @vapor-ui/core@1.5.0 → dist/components/*.vanilla.css"
---
<!-- lang-links -->
> **English** · [한국어](vapor.ko.md)
<!-- /lang-links -->

## In one line

goorm's design system. A public system built in Korea, characterised by a structure that
**adjusts every dimension at once through global scale variables.**

## Tokens

### Scale variables

Every dimension token is defined in `calc()`, multiplied by two scale variables.

```css
--vapor-size-dimension-200: calc(var(--vapor-scale-factor) * 16px);
--vapor-size-borderRadius-500: calc(var(--vapor-radius-factor) * 16px);
```

- `--vapor-scale-factor` — the overall dimension multiplier
- `--vapor-radius-factor` — a multiplier for radius alone

**Because the two are separate, radius can be adjusted while whitespace stays put.**

### Dimensions (at a multiplier of 1)

| token | value |
|------|-----|
| `dimension-025` | 2px |
| `dimension-050` | 4px |
| `dimension-075` | 6px |
| `dimension-100` | 8px |
| `dimension-150` | 12px |
| `dimension-175` | 14px |
| `dimension-200` | 16px |
| `dimension-225` | 18px |
| `dimension-250` | 20px |
| `dimension-300` | 24px |
| `dimension-400` | 32px |
| `dimension-500` | 40px |
| `dimension-600` | 48px |
| `dimension-700` | 56px |

There is no 10px step — after 8 comes 12. 14 and 18px are present.

### Radius (at a multiplier of 1)

| token | value |
|------|-----|
| `borderRadius-000` | 0px |
| `borderRadius-050` | 2px |
| `borderRadius-100` | 4px |
| `borderRadius-200` | 6px |
| `borderRadius-300` | 8px |
| `borderRadius-400` | 12px |
| `borderRadius-500` | 16px |
| `borderRadius-600` | 20px |
| `borderRadius-700` | 24px |
| `borderRadius-800` | 32px |
| `borderRadius-900` | 40px |

Source: `@vapor-ui/core@1.5.0` → `dist/components/*.css.ts.vanilla.css`

### Typography / colour

~~Unverified.~~ → typography obtained 2026-08-18 (the actual colour values remain
unverified — only the semantic variable names are confirmed):

| axis | values (at a multiplier of 1) |
|----|------|
| fontSize (13 steps) | 10 · 12 · 14 · 16 · 18 · 20 · 24 · 32 · 38 · 48 · 64 · 80 · 120px |
| lineHeight | 14 · 18 · 22 · 24 · 26 · 30 · 36 · 48 · 56 · 62 · 84 · 104 · 156px |
| fontWeight | 400 · 500 · 700 · 800 (**no 600**) |
| letterSpacing | 0 · −0.1 · −0.2 · −0.3 · −0.4px (**negative, in px**, multiplied by the scale factor) |

- **Tracking is in px rather than em**, and even that is multiplied by
  `--vapor-scale-factor` — the only sample where a scale variable governs tracking too.
- The weights skip 600 (semibold) — 500 is followed by 700.

Source: `@vapor-ui/core@1.5.0` → `dist/styles/themes.css.ts.vanilla.css`

## Components

Confirmed from the package structure: badge, callout, field, multi-select, dialog and 44
more directories. The CSS is split into a file per component.
→ Buttons, inputs and dialogs are in the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

Measured from `@vapor-ui/core@1.5.0` →
`dist/components/*/{*.css.ts.vanilla.css,*.css.vanilla.js}` (vanilla-extract build output —
the CSS and the variant-mapping JS are separate, so the two were cross-checked).
The behavioural primitives are **`@base-ui/react`** — the corpus's first sample using
Base UI (MUI's headless family) rather than Radix.

### Buttons — four steps on an 8px staircase, three sharing a type size

| | sm | md | lg | xl |
|---|:--:|:--:|:--:|:--:|
| **height** | 24px | **32px** | 40px | 48px |
| inline padding | 8px | 12px | 16px | 24px |
| gap | 4px | 6px | 8px | 8px |
| type | 14/22 · 500 | same | same | **16/24 · 500** |
| radius | 8px | 8px | 8px | 8px |

- **sm, md and lg share the same 14px type** and only xl rises to 16px — the type steps
  separated from the dimension steps (Backpack uses 16px at both of its two steps).
- Heights from 24 to 48px in **four evenly spaced 8px steps** — a 24px minimum control, among
  the lowest in the sample.
- Six colours (primary · secondary · success · warning · danger · contrast) × three variants
  (fill · outline · ghost) are assembled through **an indirection layer of `--button-*` CSS
  variables** — the same structure as MUI v9's `--variant-*` assembly.
- **The outline variant's border is not a border but a 1px inset box-shadow.**
- disabled is `opacity: 0.32`.

### Hover is a state layer, not a colour swap

```css
.interactions::before { background: var(--vapor-color-gray-900); opacity: 0; }
hover  → opacity: 0.08
active → opacity: 0.16   /* ×2 */
```

- **M3's state-layer approach** — every variant and colour builds hover and active from a
  single grey overlay. There are no per-variant hover colour tokens (Skeleton reaches the
  same goal with a brightness filter). A 150ms transition, with the ratio following the
  formula `0.08 × n`.
- focus-visible is a 2px outline with a 2px offset; the input family swaps the inset shadow
  colour instead.

### Inputs (TextInput) — the same four steps and padding as the button

| | sm | md | lg | xl |
|---|:--:|:--:|:--:|:--:|
| **height** | 24px | **32px** | 40px | 48px |
| type | 12px | 14px | 14px | 16px |
| inline padding | 8px | 12px | 16px | 24px |

- Heights and padding align exactly with the button — only the type drops a step, to 12px at
  sm.
- The outline is **a 1px inset box-shadow** (not a border), swapped to the primary colour on
  focus. readonly takes a gray-200 background, invalid takes danger, disabled 0.32 — all four
  states are variable swaps.

### Dialogs — the scrim opacity equals the disabled opacity

| | md | lg | xl |
|---|:--:|:--:|:--:|
| **width** | **500px** | 800px | 1140px |

- Ceiling `calc(100vw − 64px)` · 80svh. Radius 8px, shadow `0 1rem 2rem rgba(0,0,0,.2)`.
- **The scrim is `black` at opacity 0.32** — the same 0.32 as disabled. A sample where 0.32
  looks like the system's global "attenuation constant".
- Enter is scale 0.9→1 plus a fade over **150ms `cubic-bezier(.45, 1.005, 0, 1.005)`** — an
  **overshooting curve**, with control points above 1 (unlike the standard-curve camp of
  Backpack and MUI). The states come from Base UI's `[data-starting-style]` /
  `[data-ending-style]`.
- The header is not padding but **a fixed 56px height** (dimension-700), with 24px inline, a
  18px/700 title and 14px/400 body.

### Radius usage — an 11-step scale, effectively one value in practice

Grepping all the component CSS: `borderRadius-300` (8px) **37 times** against 400 (12px) 3 ·
200 (6px) 2 · 100 (4px) 1. Buttons, inputs, dialogs and menus are all 8px — a sample of the
gap between tokens and use, **shipping an 11-step scale and using one value** (the same
pattern as Shoelace's "4px on every control").

### Characteristic decisions (from the deep pass)

- **Base UI primitives** — leaving the Radix monopoly, the corpus's first sample
- **Buttons and inputs aligned exactly at 24/32/40/48px** — even 8px steps, with a 24px
  minimum
- **State-layer hover (gray-900 at α 0.08/0.16)** — M3's approach with no state-colour tokens
- **A 0.32 attenuation constant** — disabled and the scrim share the value
- **An overshooting easing on the dialog entrance** plus a fixed 56px header
- **Radius converging on a single 8px in practice** — at odds with the 11-step scale

## Characteristic decisions

- **It uses global scale variables.** A single `--vapor-scale-factor` adjusts the density of
  the entire UI. Where Cloudscape handles density with two sets of tokens (`scaled`/`static`),
  Vapor solves it **with runtime CSS variables.**

  > **Correction.** When this entry was first written it said "Vapor is the only system
  > collected that does this". **That was wrong.** After expanding the sample to 34, Mantine
  > (`--mantine-scale`), Radix Themes (`--scaling` · `--radius-factor`) and shadcn/ui (the
  > `--radius` base value) were all confirmed to use the same approach. In the framework
  > family it is **the standard approach.**
  >
  > Where Vapor still differs is in **separating the multipliers for dimension and radius** —
  > and Radix Themes does that too (`--scaling` / `--radius-factor`).
  > The comparison table is in "Runtime multipliers — now four systems" in
  > `tokens/scales.md`.
- **The radius multiplier is separate.** Brand tone (square vs round) can be changed
  independently of whitespace.
- **The token is named `dimension`**, not `space` or `size`.
- **14px and 18px are in the scale.** It keeps even 2px steps through the 12–20 range.
- **Everything depends on `calc()`.** Every value is computed at runtime, so reading the
  token file alone will not tell you the final px. The tables above assume a multiplier of 1.

## Accessibility

~~Unverified.~~ → **Resolved (2026-08-18, headless render).**

The second of the documentation's six "Design Principles" **is accessibility**, and it states
the target — "Vapor UI **conforms to WCAG 2.2 AA**, built on **Base UI**."

**The second case in the corpus of targeting 2.2 AA** (on a par with Backpack, the most
recent criterion). The implementation is documented along three axes:

| axis | content |
|------|------|
| Base UI integration | ARIA attributes, keyboard navigation and screen readers **delegated to the headless library** |
| Colour contrast | its own **Color Generator** **guarantees WCAG AA/AAA contrast ratios** |
| Tokens | tokens generated from mathematical ratios, for consistent visual hierarchy |

The distinguishing approach is **enforcing contrast conformance through a colour generator
(code) rather than a documentation rule.**
`@vapor-ui/color-generator` ships as a separate package, described on npm as a
"WCAG-compliant color palette generator built on **Adobe Leonardo**".
Focus indication and keyboard navigation are stated as supported by default.

Source: https://vapor-ui.goorm.io/docs/getting-started/principles (render confirmed,
2026-08-18)

## References

- Packages: `@vapor-ui/core` · `@vapor-ui/hooks` · `@vapor-ui/icons` ·
  `@vapor-ui/codemod` · `@vapor-ui/color-generator` · `@vapor-ui/css-generator`
- ~~The official documentation URL and repository could not be confirmed.~~ (resolved
  2026-08-18 — the package's `package.json` states the repository
  **github.com/goorm-dev/vapor-ui** and the licence **MIT**) — reflected in the frontmatter
  (2026-08-18)
- **Documentation site URL resolved (2026-08-18, reflected in the `url` frontmatter):**
  **https://vapor-ui.goorm.io** — the repository README's "Links → Documentation" entry and
  its logo link point here, and `https://vapor-ui.goorm.io/sitemap.xml` returns the full set
  of paths (`/docs/getting-started/*` · `/docs/components/*` · `/theme/playground` and
  others), confirming it is the real documentation site.
  (The npm `homepage` field points at the repository rather than the documentation, so it
  alone would not have found it.)
  Source: https://raw.githubusercontent.com/goorm-dev/vapor-ui/main/README.md
- **Figma kit (resolved 2026-08-18 — `figma_kit: true`)**:
  **published on Figma Community** —
  https://www.figma.com/community/file/1508829832204351721/vapor-design-system
  The repository also contains `figma-plugin`, `figma-codegen-plugin` and `@repo/sync-figma`
  workspaces plus `sync-figma`, `sync-icons:basic` and `sync-icons:symbol` scripts, so
  **Figma ↔ code icon and token synchronisation is operated as a pipeline.**
  Sources: https://vapor-ui.goorm.io/docs/getting-started/principles (render confirmed) ·
  https://raw.githubusercontent.com/goorm-dev/vapor-ui/main/package.json (2026-08-18)
- Components in depth: `@vapor-ui/core@1.5.0` → `dist/components/{button,text-input,dialog}/`
  plus `dist/styles/mixins/interactions.css.ts.vanilla.css` (2026-08-18)
- **Licence resolved (2026-08-18):** `MIT` — source: github goorm-dev/vapor-ui → `LICENSE`
  (matching the npm metadata for `@vapor-ui/core@1.5.0`)
