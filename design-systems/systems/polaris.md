---
name: Polaris
org: Shopify
coverage: full
url: https://shopify.dev/docs/api/app-home/polaris-web-components
repo: https://github.com/Shopify/polaris-react-archive
license: custom (the MIT text plus a condition limiting it to Shopify-integrating apps)
tech: [React]
figma_kit: true
tokens_format: [CSS, JS]
a11y_target: "WCAG 2.1 A+AA (stated in the old documentation — lost from the current shopify.dev docs, confirmed in the Wayback 2025-01 snapshot)"
platform: web
domain: commerce
verified: 2026-08-18
source: "github Shopify/polaris-react-archive@a651dac89f → polaris-tokens/src (archived — frozen 2026-08-05) · npm @shopify/polaris-tokens@9.4.2 (the frozen release) → dist/cjs/src/{colors,size}.js · dist/cjs/src/themes/**"
---
<!-- lang-links -->
> **English** · [한국어](polaris.ko.md)
<!-- /lang-links -->

## In one line

The design system for Shopify's admin, with the commerce back office as its main stage.

## Tokens

### Spacing

**A numeric scale** in which the number in the name is not px but **a multiple of 4px**
(`space-100` = 4px). The scale name and the actual value must be kept apart.

| token | value |
|------|-----|
| `space-0` | 0px |
| `space-025` | 1px |
| `space-050` | 2px |
| `space-100` | 4px |
| `space-150` | 6px |
| `space-200` | 8px |
| `space-300` | 12px |
| `space-400` | 16px |
| `space-500` | 20px |
| `space-600` | 24px |
| `space-800` | 32px |
| `space-1000` | 40px |
| `space-1200` | 48px |
| `space-1600` | 64px |
| `space-2000` | 80px |
| `space-2400` | 96px |
| `space-2800` | 112px |
| `space-3200` | 128px |

Source: `polaris-tokens/src/themes/base/space.ts` + `polaris-tokens/src/size.ts`
(space.ts only refers out in the form `size[400]`, so the real values were resolved from
size.ts.)

### Semantic spacing aliases

**Aliases by purpose** sit on top of the raw scale. This is Polaris's signature.

| alias | refers to | value |
|------|------|-----|
| `space-button-group-gap` | `space-200` | 8px |
| `space-card-gap` | `space-400` | 16px |
| `space-card-padding` | `space-400` | 16px |
| `space-table-cell-padding` | `space-150` | 6px |

### Radius

| token | value |
|------|-----|
| `border-radius-0` | 0px |
| `border-radius-050` | 2px |
| `border-radius-100` | 4px |
| `border-radius-150` | 6px |
| `border-radius-200` | 8px |
| `border-radius-300` | 12px |
| `border-radius-400` | 16px |
| `border-radius-500` | 20px |
| `border-radius-750` | 30px |
| `border-radius-full` | 9999px |

### Border width

`border-width-025` = 1px, `border-width-050` = 2px, `border-width-100` = 4px.
Unusually, there is a `border-width-0165` = **0.66px** — a sub-pixel value.

Source: `polaris-tokens/src/themes/base/border.ts`

### Typography

~~Unverified — `font.ts` needs checking~~ → **resolved (2026-08-18, the frozen
`@shopify/polaris-tokens@9.4.2` → `dist/cjs/src/themes/base/{font,text}.js`).**
The npm distribution has no `src/`, so this was read from the compiled output in
`dist/cjs/` — the structure and values are identical to `src/themes/base/*.ts`.

**Sizes and line heights share the same `size` map as spacing** — `font-size-350` and
`space-350` are both `size[350]` = 14px. There is no type-specific scale.

| token | value | | token | value |
|------|-----|---|------|-----|
| `font-size-275` | 11px | | `font-line-height-300` | 12px |
| `font-size-300` | 12px | | `font-line-height-400` | 16px |
| `font-size-325` | 13px | | `font-line-height-500` | 20px |
| `font-size-350` | 14px | | `font-line-height-600` | 24px |
| `font-size-400` | 16px | | `font-line-height-700` | 28px |
| `font-size-450` | 18px | | `font-line-height-800` | 32px |
| `font-size-500` | 20px | | `font-line-height-1000` | 40px |
| `font-size-550` | 22px | | `font-line-height-1200` | 48px |
| `font-size-600` | 24px | | | |
| `font-size-750` | 30px | | | |
| `font-size-800` | 32px | | | |
| `font-size-900` | 36px | | | |
| `font-size-1000` | 40px | | | |

Four weights: `regular` **450** · `medium` **550** · `semibold` **650** · `bold` **700**.
**450, 550 and 650 are not multiples of 100** — they are intermediate instances of the
Inter variable typeface.

Four tracking steps (all at or below 0): `densest` **-0.54px** · `denser` **-0.3px** ·
`dense` **-0.2px** · `normal` **0px**. The unit is **px**, not em.

#### The role scale — 7 heading steps + 4 body steps

`text-{role}-font-{property}` over five properties (family · size · weight ·
letter-spacing · line-height) gives 11 roles × 5 = 55 tokens.

| role | size | line height | weight | tracking |
|------|:---:|:---:|:---:|:---:|
| `heading-3xl` | 36px | 48px | 700 | -0.54px |
| `heading-2xl` | 30px | 40px | 700 | -0.3px |
| `heading-xl` | 24px | 32px | 700 | -0.2px |
| `heading-lg` | 20px | 24px | 650 | -0.2px |
| `heading-md` | 14px | 20px | 650 | 0 |
| `heading-sm` | 13px | 20px | 650 | 0 |
| `heading-xs` | 12px | 16px | 650 | 0 |
| `body-lg` | 14px | 20px | 450 | 0 |
| `body-md` | **13px** | 20px | 450 | 0 |
| `body-sm` | 12px | 16px | 450 | 0 |
| `body-xs` | 11px | 12px | 450 | 0 |

**The default body (`body-md`) is 13px.** There is a 6px gap between `heading-lg` (20px)
and `heading-md` (14px) — the heading scale is sparse at the top and dense at the bottom.

**Tracking is mapped to the size axis** — negative tracking appears only from 20px up, and
everything below is 0.

#### The mobile theme enlarges the type

The `light-mobile` theme overrides **14** `text-*` tokens (against just one colour and one
spacing token).

| role | desktop | mobile |
|------|:---:|:---:|
| `heading-2xl` | 30px | 32px |
| `heading-xl` | 24px / 32 | 22px / 28 |
| `heading-lg` | 20px | 18px |
| `heading-md` | 14px | 16px |
| `heading-sm` | 13px | 14px |
| `body-lg` | 14px / 20 | 18px / 28 |
| `body-md` | 13px / 20 | **16px / 24** |
| `body-sm` | 12px / 16 | 14px / 20 |
| `body-xs` | 11px / 12 | 12px / 16 |

**The direction is not consistent** — the body family all grows (`body-md` 13→16) while the
two large headings (`heading-xl` 24→22 · `heading-lg` 20→18) **shrink**.
The source records no reason.

Typefaces: `font-family-sans` = `'Inter', -apple-system, BlinkMacSystemFont,
'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`,
`font-family-mono` = `ui-monospace, SFMono-Regular, 'SF Mono', Consolas,
'Liberation Mono', Menlo, monospace`. There are only two family tokens.

### Colour

~~Unverified — `color.ts` needs checking~~ → **resolved (2026-08-18).**
The full hex listing is omitted (`../SCHEMA.md`) — only the structure is recorded.

**There are two layers.**

| layer | file | size |
|------|------|:---:|
| raw ramps | `src/colors.ts` (`dist/cjs/src/colors.js`) | 14 families × **16 steps** = 224 |
| semantic | `src/themes/base/color.ts` | **226** |

The semantic layer refers to the raw ramps by name (`color-bg` = `colors.gray[6]`).
**There is no component layer** — the 226 are the public surface.

#### The raw ramps — 14 families × 16 steps (1–16)

`azure` · `blue` · `green` · `lime` · `magenta` · `orange` · `purple` ·
`red` · `rose` · `teal` · `yellow` (11 chromatic) + `gray` +
the two alpha families **`blackAlpha` and `whiteAlpha`** = 14 families. All run 16 steps,
and **the step numbers increase by 1 from 1** (unlike Spectrum's intervals of 100 or
Carbon's of 10).

1 is the lightest and 16 the darkest (`azure-1` = `rgba(251,253,255,1)`,
`azure-16` = `rgba(0,33,51,1)`). The alpha families start at
`blackAlpha-1` = `rgba(0,0,0,0)`. **Everything is written as `rgba()`** — not hex, and even
opaque colours state an alpha of `1`.

Of the 224 ramp values, **only 110 are used directly by the semantic layer** — half are
unused reserve.

#### The 226 semantic tokens — distribution by family

| prefix | count |
|------|:---:|
| `color-bg-*` | **96** |
| `color-text-*` | 49 |
| `color-border-*` | 22 |
| `color-icon-*` | 18 |
| `color-avatar-*` | 16 |
| `color-input-*` | 6 |
| `color-nav-*` | 5 |
| `color-video-*` | 3 |
| `color-tooltip-*` · `color-checkbox-*` · `color-radio-*` · `color-scrollbar-*` | 2 each |
| `color-scheme` · `color-backdrop` · `color-button-*` | 1 each |

**Backgrounds are 42% of the whole.** The result of multiplying the surface family
(`bg-surface` · `bg-surface-secondary` · `bg-surface-tertiary` · `bg-fill` …) by state
suffixes (`-hover` · `-active` · `-selected` · `-disabled`) and meaning suffixes
(`-brand` · `-critical` · `-caution` · `-success` · `-info` · `-magic`).

**Every semantic token carries a `description`** — for instance
`color-bg-fill-brand`, "The background color of main actions, like primary buttons."
The value and the usage note live in the same file.

#### Four themes — dark is a 40-token partial override

| theme | colour overrides | note |
|------|:---:|------|
| `light` | (the baseline) | all 226 |
| `light-mobile` | **1** | only `color-button-gradient-bg-fill: none`. It overrides 14 shadow and 14 type tokens |
| `light-high-contrast-experimental` | **8** | raises text and border contrast only. Suffixed `experimental` |
| `dark-experimental` | **40** | suffixed `experimental` |

**Dark overrides only 40 of the 226.** The other 186 keep the light values —
**it is not a complete dark palette.** The name says `-experimental` too.
The 40 that are overridden are backgrounds, text, icons and fills; the meaning colours
(critical · success · caution · magic) are not.

**Half of the dark overrides are white alphas** (`rgba(255,255,255,0.05)` to `0.22`).
Surface layers are stacked with alpha rather than opaque greys.

The high-contrast theme overrides only 8 — enough to unify three `color-text` tokens on
`rgba(26,26,26,1)` and darken the borders (`rgba(227,227,227)` → `rgba(138,138,138)`).

## Components

~~Unverified~~ → **component CSS deep pass (2026-08-17, `@shopify/polaris@13.9.5`
`build/esm/styles.css`, 499KB — the CSS for every component ships on npm).**

### Buttons — they shrink on the desktop

| size | default (mobile) | at `min-width: 48em` and up |
|------|:---:|:---:|
| Micro | 28px (`height-700`) | **24px** (`height-600`) |
| Slim/Medium | 32px | 32px |
| Large | 36px | 36px |

**A sample where the control height responds to the viewport** — enlarged for touch on
mobile and reduced on the desktop (Micro 28→24). The corpus majority uses a single value,
and GOV.UK's responsiveness is in the spacing only; in Polaris **the height itself is
responsive**.
`min-width` matches the height — guaranteeing **a square minimum area**.

### The component-scoped variable layer `--pc-*`

```css
--pc-button-bg_hover · --pc-button-bg_active · --pc-button-bg_pressed · _disabled
```

Separately from the global `--p-*` tokens there is **a component-scoped variable layer**
(`pc` = Polaris component) on which states are attached as **an underscore suffix,
`_hover`**.
Because the defaults refer to a higher state (`_pressed: var(--pc-button-bg_active)`), it
forms **a state fallback chain**, so a variant redefines only the states it wants to
change — the variant × state combinatorial explosion held down by variable fallbacks.

## Characteristic decisions

- **Spacing and radius share a single `size` map.** Rather than keeping separate scales they
  derive from the same raw values, so margins and corners naturally take the same rhythm.
- **There is a semantic alias layer.** Providing a token like `space-card-padding` means
  that changing card padding company-wide is a single-place edit. This is where it parts
  company with systems that expose raw tokens alone.
- **The number in the name is not px.** `space-400` is 16px. The exact opposite of a system
  like Primer, where the name is the px value — so referring to both at once carries a real
  risk of confusion.
- **There is a 0.66px border.** A rare case of promoting a sub-pixel hairline into a token.

- **Type sizes and line heights come out of the same `size` map** (2026-08-18).
  Spacing, radius, font size and line height all share one graduation such as `size[350]` —
  plenty of systems share spacing and radius, but few bring typography in as well.

- **The dark theme ships unfinished** (2026-08-18). It overrides **only 40** of the 226
  semantic tokens and its name is suffixed `-experimental`.
  High contrast is only 8. The theme structure exists but has not been filled in.

- **The mobile theme changes typography and shadows rather than colour.**
  `light-mobile`'s overrides are 14 type, 14 shadow, 1 colour and 1 spacing —
  a composition that **enlarges the type and strips the shadows** while keeping the colours.

## Accessibility

~~Unverified~~ → **absence from the current documentation confirmed (2026-08-18, headless
render).**

Rendering `https://shopify.dev/docs/apps/design` gives one accessibility line —
"Build with accessibility best practices so your app works for all merchants
and their customers." **A single sentence, with no WCAG version or level.**
That page and `https://shopify.dev/docs/api/app-home` and
`https://shopify.dev/docs/api/app-home/polaris-web-components` all render with **zero
occurrences of the string `WCAG`**.
`https://shopify.dev/docs/apps/design/accessibility` is a **404**
(the render reads "404 Page not found").

The frontmatter's `WCAG 2.1 A+AA` **rests on the Wayback 2025-01 snapshot**, and this
render settles that the current shopify.dev documentation has no corresponding sentence.

## Drift record — the repository archived and the successor moved (2026-08-18)

Not a change in token values, but **the status of the source itself changed**:

- The `Shopify/polaris` repository was **renamed to `Shopify/polaris-react-archive` and
  archived** (archived: true, final commit 2026-08-05). The old URL 301s across.
- The documentation site `polaris.shopify.com` also 301-redirects wholesale to
  `shopify.dev/docs/api/polaris` — **the React library is deprecated** and the successor is
  **Polaris Web Components** (released 2025-10-01,
  shopify.dev/docs/api/app-home/polaris-web-components).
- `polaris-tokens/src` has had no commits since the 2026-08-16 verification — **the values
  harvested for this entry remain valid**, but they are a frozen snapshot. The web-component
  generation's tokens were a separate harvesting target → completed in the
  "Web Components generation" section below (2026-08-18).

## The Web Components generation — (2026-08-18)

The tokens of the successor generation (released 2025-10) were harvested. The conclusion
first: **the public token layer is gone.** No token npm package, no public repository (the
former Polaris repository is confirmed archived). The values exist only as JS maps inside
the CDN bundle (`https://cdn.shopify.com/shopifycloud/polaris.js`, unversioned — build hash
`5ff803d5…`, 504KB as harvested 2026-08-18), and the public interface is
**a keyword union** (`SizeKeyword` in `@shopify/polaris-types@1.0.7`).

```
'small-500' … 'small-100' | 'small' | 'base' | 'large' | 'large-100' … 'large-500'
```

- The numeric scale (`space-400`) was renamed wholesale to **t-shirt keywords**. The larger
  the number, the further from base (`small-500` is the smallest, `large-500` the largest).
- `small` is an alias of `small-100`, `large` of `large-100`.
- The public `--p-*` CSS variables were replaced by **internal variables suffixed with the
  build hash** (`--s-*-26021` for components / `--t-*-26021` for the theme). Because the
  hash is attached they cannot be referenced from outside — a structure that demotes the
  tokens from a contract to an implementation detail.

### Spacing (a shared map for padding and gap)

| keyword | value | React equivalent |
|------|-----|------|
| `none` | 0px | `space-0` |
| `small-500` | 2px | `space-050` |
| `small-400` | 4px | `space-100` |
| `small-300` | 6px | `space-150` |
| `small-200` | 8px | `space-200` |
| `small-100`·`small` | 12px | `space-300` |
| `base` | 16px | `space-400` |
| `large`·`large-100` | 20px | `space-500` |
| `large-200` | 24px | `space-600` |
| `large-300` | 32px | `space-800` |
| `large-400` | 40px | `space-1000` |
| `large-500` | 48px | `space-1200` |

**The real values are identical to the React generation; only the range was cut** — 1px
(`space-025`) and the top end at 64, 80, 96, 112 and 128px dropped out. Eighteen steps
became twelve. (The `auto` keyword resolves to 0.)

### Radius

| keyword | value | note |
|------|-----|------|
| `none` | 0px | |
| `small-200` | 4px | |
| `small-100`·`small` | 6px | |
| `base` | 8px | React's `border-radius-200` |
| `large`·`large-100` | 12px | |
| `large-200` | 16px | |
| `max` | 9999px | appears in the bundle as `624.9375rem` |

**2px, 20px and 30px dropped** relative to the React generation. The default radius is 8px.

### Border width

| keyword | value |
|------|-----|
| `none` | 0px |
| `small-100`·`small` | **0.66px** (0.04125rem) |
| `base` | 1px |
| `large`·`large-100` | 2px |

React's sub-pixel hairline (`border-width-0165`, 0.66px) survived, **promoted to `small`**.
4px (`border-width-100`) dropped.

### Typography

The family is the same Inter stack as the React generation (`'Inter', -apple-system, …`).
**The weights each got one step lighter**:

| role | React (tokens 9.4.2) | WC |
|------|:---:|:---:|
| base/regular | 450 | 450 |
| medium | 550 | 550 |
| semibold | **650** | **600** |
| bold | **700** | **650** |

By observation of the bundle CSS the sizes used are only 11 · 12 · 13 · 14 · 16 · 18px —
the 20–40px display sizes of the React scale have disappeared from the admin bundle.
The maximum is the page title at 18px/24px (w600).

**The body text is responsive** (the `s-text` default):

| | font-size | line-height | letter-spacing |
|------|:---:|:---:|:---:|
| mobile (default) | 16px | 24px | -0.00833em |
| desktop | 13px | 20px | 0 |

The `s-heading` default: mobile 16px/20px → desktop 13px/20px, w600.
The media query is `@media (min-width:48rem),(pointer:fine)` — React's `48em` breakpoint
**with a `pointer:fine` condition added** (with a mouse it goes compact regardless of
viewport).

### Component values — buttons (min-block-size)

| size | mobile (default) | desktop |
|------|:---:|:---:|
| small | 28px | 24px |
| base | **44px** | 28px |
| large | **44px** | 32px |

Compared with the React generation (Micro 28→24, Slim/Medium 32, Large 36): responsive
height widened **from the single Micro step to every size**, and mobile base/large are 44px
— the 44pt touch-target standard driven straight in. The desktop, conversely, shrank across
the board (base 28px < React's Medium 32px). The button type also drops from 14px/550 to
12px on the desktop.

Elsewhere: checkbox and radio 20px → 16px (desktop), input field min-height 32px with 13px
type, table cell padding 8×12px with a 32px min-height, table type 14px → 13px.

### Sources

- The keyword union and component list (59 `s-*` tags): npm `@shopify/polaris-types@1.0.7`
  (2026-04-29) `dist/polaris.d.ts` + `dist/custom-elements.json`
- The real values: the keyword→rem maps and component CSS inside
  `cdn.shopify.com/shopifycloud/polaris.js` (extracted from minified JS, converted at
  1rem = 16px)
- **Confirmed that there is no npm token package for the WC generation** — registry search
  2026-08-18. `@shopify/polaris-tokens` is frozen at 9.4.2 (2025-03-17, the React
  generation's values).

## References

- Repository: https://github.com/Shopify/polaris-react-archive (formerly Shopify/polaris —
  archived)
- Successor: Polaris Web Components —
  https://shopify.dev/docs/api/app-home/polaris-web-components
- Tokens: `polaris-tokens/src/` (`size.ts` is the single source of every figure)
- WC-generation tokens: the CDN bundle + `@shopify/polaris-types` (see the section above)
- **Licence resolved (2026-08-18):** `custom (the MIT text plus a condition limiting it to Shopify-integrating apps)` — source: github Shopify/polaris-react-archive → `LICENSE.md`. The MIT text has a restriction to "applications that integrate or interoperate with Shopify software or services" appended — **recording it as MIT would be wrong**
