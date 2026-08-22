---
name: Radix Themes
org: WorkOS
coverage: full
url: https://radix-ui.com/themes
repo: https://github.com/radix-ui/themes
license: MIT
tech: [React]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm @radix-ui/themes@3.3.0 → styles.css, src/components/*.css (50 components)"
---
<!-- lang-links -->
> **English** · [한국어](radix-themes.ko.md)
<!-- /lang-links -->

## In one line

A style layer laid over Radix Primitives.
**A theme is defined as a combination of five axes** (accent colour · gray · density ·
radius · panel background), and **even cursors and component heights are tokenised.**

## The theme axes — five `data-*` attributes

```html
<Theme accentColor="blue" grayColor="slate" scaling="100%" radius="medium" panelBackground="translucent">
```

| attribute | values | count |
|------|-----|:---:|
| `data-accent-color` | amber · blue · bronze · brown · crimson · cyan · gold · grass · gray · green · indigo · iris · jade · lime · mint · orange · pink · plum · purple · red · ruby · sky · teal · tomato · violet · yellow | **26** |
| `data-gray-color` | mauve · olive · sage · sand · slate (plus automatic matching) | **5** |
| `data-scaling` | 90% · 95% · 100% · 105% · 110% | **5** |
| `data-radius` | none · small · medium · large · full | **5** |
| `data-panel-background` | solid · translucent | **2** |

**That is 26 × 5 × 5 × 5 × 2 = 6,500 combinations.**
The opposite direction from Material 3 shipping 32 finished themes —
Radix Themes **ships the axes and combines them at runtime.**

**The grey family is chosen independently of the accent.** Radix Themes is the only system in
the sample that exposes the achromatic family as a user-selectable axis.

## Tokens

### Two multipliers — `--scaling` and `--radius-factor`

```css
--space-4:  calc(16px * var(--scaling));
--font-size-3: calc(16px * var(--scaling));
--radius-3: calc(6px * var(--scaling) * var(--radius-factor));
```

**Only radius is multiplied twice.** Spacing and type size take `--scaling` alone.

| `data-radius` | `--radius-factor` | `--radius-full` | `--radius-thumb` |
|---------------|:---:|:---:|:---:|
| `none` | 0 | 0px | 0.5px |
| `small` | 0.75 | 0px | 0.5px |
| `medium` | 1 | 0px | 9999px |
| `large` | 1.5 | 0px | 9999px |
| `full` | 1.5 | **9999px** | 9999px |

**`large` and `full` share a multiplier** (1.5). The only difference is `--radius-full` —
fully circular elements (pill buttons, avatars) activate only at `full`.

**`none` sets the multiplier to 0, taking every radius to 0.** It neutralises the tokens by
multiplication rather than deleting them.

`--radius-thumb` swings between 0.5px and 9999px — it is reserved for slider and progress
thumbs.

### Spacing — nine steps

| token | value (at 100%) |
|------|:---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 40px |
| `--space-8` | 48px |
| `--space-9` | 64px |

Increments: **+4 / +4 / +4 / +8 / +8 / +8 / +8 / +16.**
It includes all of `4/8/16/24/32` and has no 20px.

### Typography — nine steps, with step 8 at 35px

| token | size | body line height | heading line height | tracking |
|------|:---:|:---:|:---:|:---:|
| `1` | 12 | 16 | 16 | +0.0025em |
| `2` | 14 | 20 | 18 | 0em |
| `3` | 16 | 24 | 22 | 0em |
| `4` | 18 | 26 | 24 | -0.0025em |
| `5` | 20 | 28 | 26 | -0.005em |
| `6` | 24 | 30 | 30 | -0.00625em |
| `7` | 28 | 36 | 36 | -0.0075em |
| `8` | **35** | 40 | 40 | -0.01em |
| `9` | 60 | 60 | 60 | -0.025em |

**Step 8 is 35px.** After 12 · 14 · 16 · 18 · 20 · 24 · 28 comes neither 32 nor 36 but **35**.
Odd body sizes appear elsewhere in the sample — Apple iOS (17pt), Helios (13px),
Seed Design (11/13/15px) — but **an odd number as large as 35 belongs to Radix Themes
alone.**

**Body and heading line heights are separate.**

| step | body | heading | difference |
|:---:|:---:|:---:|:---:|
| 1 | 16 | 16 | 0 |
| 2 | 20 | 18 | **-2** |
| 3 | 24 | 22 | **-2** |
| 4 | 26 | 24 | **-2** |
| 5 | 28 | 26 | **-2** |
| 6–9 | 30 · 36 · 40 · 60 | 30 · 36 · 40 · 60 | 0 |

**Only at the small steps (2–5) is the heading line height 2px tighter.** From step 6 up they
are identical.

Tracking is **positive only at step 1** (+0.0025em), 0 at 2 and 3, and increasingly negative
from step 4. A third curve again, different from Material 3 (growing more positive as the
type gets smaller) and Apple (a U shape) (`patterns/typography.md`).

Four weights: `light` 300 · `regular` 400 · `medium` 500 · `bold` 700.
**There is no 600 (semibold).**

`--heading-font-size-adjust: 1` — a multiplier that corrects the size when a separate heading
typeface is specified.

### Colour — 24 steps per hue

One hue is **12 opaque steps, `1`–`12`, plus 12 alpha steps, `a1`–`a12` = 24.**

```
--blue-1 … --blue-12       opaque
--blue-a1 … --blue-a12     alpha
```

**The same approach as Seed Design precomputing an `-alpha-` family**
(`patterns/color.md`). Radix Themes applies it **to every hue without exception.**

`--accent-*` is an alias pointing at the chosen accent —
`--accent-9: var(--blue-9)`, with `--accent-a9` mapped the same way.

**There is P3 gamut support.** `styles.css` references `display-p3` **1,579 times**,
redefining the colours inside `@supports (color: color(display-p3 …))`.
Radix Themes is the only system in the sample to keep a P3 alternative palette at the token
level.

There are **2,973** colour literal declarations in total (light/dark × opaque/alpha ×
sRGB/P3).

### Shadow — computed with `color-mix()`

```css
--shadow-2: 0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%),
            0 0 0 0.5px var(--black-a1), 0 1px 1px 0 var(--gray-a2),
            0 2px 1px -1px var(--black-a1), 0 1px 3px 0 var(--black-a1);
```

Six steps (`--shadow-1` to `--shadow-6`), which **use the mixed value only in browsers that
support `color-mix(in oklab, …)`** and otherwise fall back to `--gray-a3` (an `@supports`
branch).

`--shadow-1` consists only of `inset` — it is for a pressed surface.

**The shadows reference the grey family tokens.** Change `data-gray-color` and the shadow's
tint follows.

### Cursors — the only tokenised ones in the sample

| token | default |
|------|--------|
| `--cursor-button` | `default` |
| `--cursor-link` | `pointer` |
| `--cursor-checkbox` | `default` |
| `--cursor-radio` | `default` |
| `--cursor-switch` | `default` |
| `--cursor-menu-item` | `default` |
| `--cursor-slider-thumb` | `default` |
| `--cursor-slider-thumb-active` | `default` |
| `--cursor-disabled` | `not-allowed` |

**Buttons are `default`; only links are `pointer`.**
No other system in the sample was found to expose cursors as tokens.

### Containers — four steps

| token | value |
|------|:---:|
| `--container-1` | 448px |
| `--container-2` | 688px |
| `--container-3` | 880px |
| `--container-4` | 1136px |

The increments are irregular, **+240 / +192 / +256**, and they do not take `--scaling`.

## Component heights — reusing the spacing tokens

```css
--base-button-height: var(--space-5);  /* size 1 → 24px */
--base-button-height: var(--space-6);  /* size 2 → 32px */
--base-button-height: var(--space-7);  /* size 3 → 40px */
--base-button-height: var(--space-8);  /* size 4 → 48px */
```

| `size` | height | token referenced |
|:---:|:---:|-----------|
| 1 | 24px | `--space-5` |
| 2 | 32px | `--space-6` |
| 3 | 40px | `--space-7` |
| 4 | 48px | `--space-8` |

**There is no separate height scale.** The spacing tokens become the heights directly.

| system | component heights |
|--------|---------------|
| Mantine | a dedicated scale (30/36/42/50/60) |
| shadcn/ui | Tailwind classes (24/32/36/40) |
| **Radix Themes** | **reused spacing tokens** (24/32/40/48) |

Only Radix Themes is **an even 8px progression.**

Some components compute their radius in `em`:

```css
border-radius: calc((0.5px + 0.2em) * var(--radius-factor));   /* line 8273 */
border-radius: calc(var(--radius-factor) * 0.35em);            /* line 10756 */
```

**A radius proportional to the type size**, in cases that do not use the `--radius-N` steps.

Progress and Slider pick the larger of the two approaches with `max()`:

```css
border-radius: max(calc(var(--radius-factor) * var(--progress-height) / 3),
                   calc(var(--radius-factor) * var(--radius-thumb)));
```

## Components

**Fifty** (by `*.props.tsx`):

alert-dialog · aspect-ratio · avatar · badge · blockquote · box · button · callout ·
card · checkbox · checkbox-cards · checkbox-group · code · container · context-menu ·
data-list · dialog · dropdown-menu · em · flex · grid · heading · hover-card ·
icon-button · inset · kbd · link · popover · progress · quote · radio · radio-cards ·
radio-group · scroll-area · section · segmented-control · select · separator ·
skeleton · slider · spinner · strong · switch · tab-nav · table · tabs · text ·
text-area · text-field · tooltip

`em` · `strong` · `quote` · `blockquote` · `code` · `kbd` are components —
**inline text elements provided as components.**

`checkbox-cards` and `radio-cards` exist separately from `checkbox` and `radio`.

`theme-panel` is included in the source — a development panel for adjusting the five theme
axes in the browser.

## Characteristic decisions

- **A theme is defined as a combination of five axes** (26 × 5 × 5 × 5 × 2 = 6,500).
  The opposite approach from Material 3's "ship 32 finished themes".
- **The grey family is a user-selectable axis** (mauve · olive · sage · sand · slate).
- **Cursors are tokenised** — nine of them. Buttons are `default`; only links are `pointer`.
- **Component heights are spacing tokens** — there is no dedicated height scale.
- **Twelve alpha steps are precomputed for every hue** (24 per hue).
- **A P3 alternative palette lives at the token level** (`display-p3` 1,579 times).
- **Shadows are computed with `color-mix(in oklab, …)` and fall back through `@supports`.**
- **Body and heading line heights are separated, but differ by 2px only at the small steps
  (2–5).**
- **Type step 8 is 35px.**
- **There is no 600 among the weights** (300/400/500/700).
- **Radius `none` is handled as a multiplier of 0** — the tokens are not deleted.
- **Some components use `em`-based radii** — proportional to the type size.
- **Inline text elements are components** (`em` · `strong` · `code` · `kbd` · `quote`).

## Accessibility

No stated WCAG target was found in the CSS or the tokens.

Keyboard, focus and ARIA behaviour is handled by **Radix Primitives** — Radix Themes is the
style layer above it.

What can be confirmed at the token level:

- Twelve alpha steps on every hue mean **translucent state colours work regardless of the
  background**
- `--cursor-disabled: not-allowed` — the disabled state is expressed through the cursor too
- A separate `--focus-*` colour family exists (independent of the accent)
- The P3 alternative palette handles colour rendition on wide-gamut displays

**There is no contrast-ratio specification in the source.**

## References

- **Basis for the Figma kit (false):** no official kit — the documentation introduces only one
  community-made "Unofficial" library, confirmed 2026-08-18

- Documentation: https://radix-ui.com/themes
- Repository: https://github.com/radix-ui/themes
- Tokens: `npm pack @radix-ui/themes@3.3.0` → `package/styles.css`
- Components: `package/src/components/*.css` · `*.props.tsx`
- The primitives (a separate package): https://radix-ui.com/primitives
- **Open questions:** the contrast ratios of the 26 accents' actual hex values,
  the rule determining the `--focus-*` family's colours, and how the dark-mode alpha tokens
  are computed
- **Figma kit confirmed absent (2026-08-18):** `figma_kit: false` — source
  <https://www.radix-ui.com/themes/docs/overview/resources>. The documentation's Resources
  page introduces exactly **two** external assets, the first being "**Figma library —
  Unofficial Radix Themes components for Figma, by Victor Allegret**".
  The project itself attached the word `Unofficial`, and the component source names this
  entry's React component `ThemesUnofficialFigmaLibrary` (the second is
  `ThemesUnofficialTailwindPlugin` — Viktor Bonino's Tailwind preset). The page closes with
  "if you build something great with Radix Themes, reach out on Twitter or Discord",
  revealing it as **a collection point for community work.** Across the whole documentation
  (`/themes/docs/overview/{getting-started,styling,releases}`) there are zero other mentions
  of Figma, and `/themes/docs/resources/figma` is a 404
- **Confirmed static site (2026-08-18):** `radix-ui.com` puts the whole body in the SSR HTML,
  so no headless render is needed (the Resources page is 85KB, with the body extracting
  cleanly once scripts are stripped)
