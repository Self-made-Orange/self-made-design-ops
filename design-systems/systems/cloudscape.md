---
name: Cloudscape Design System
org: AWS
coverage: full
url: https://cloudscape.design
repo: https://github.com/cloudscape-design/components
license: Apache-2.0
tech: [React]
figma_kit: true
tokens_format: [SCSS, CSS, JSON]
a11y_target: "confirmed unstated (re-checked with a headless render 2026-08-18 — the accessibility documentation never mentions WCAG at all, only ARIA and semantic-markup guidance)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @cloudscape-design/design-tokens@3.0.107 → index.scss · index-visual-refresh.json · npm @cloudscape-design/components@3.0.1348 → table/·side-navigation/ styles.scoped.css + app-layout (table and navigation measurements, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](cloudscape.ko.md)
<!-- /lang-links -->

## In one line

The design system behind the AWS console, premised on the high-density screens peculiar to
a cloud management console.

## Tokens

### Spacing — a double scale, scaled / static

**The same scale ships twice.**

| token | value |
|------|-----|
| `xxxs` | 2px |
| `xxs` | 4px |
| `xs` | 8px |
| `s` | 12px |
| `m` | 16px |
| `l` | 20px |
| `xl` | 24px |
| `xxl` | 32px |
| `xxxl` | 40px |

The `$space-scaled-*` and `$space-static-*` families hold those values identically.
The difference is **how they behave in density modes** — `scaled` shrinks in compact mode,
`static` stays fixed.

### Per-component semantic spacing

Apart from the raw scale, **a large set of component-specific tokens** ships too — and
values appear there that are not in the scale above.

| token | value | in the scale? |
|------|-----|:---:|
| `space-button-horizontal` | 20px | yes |
| `space-button-vertical` | 4px | yes |
| `space-field-horizontal` | 12px | yes |
| `space-field-vertical` | **5px** | ✗ |
| `space-card-vertical-default` | 16px | yes |
| `space-card-vertical-embedded` | **10px** | ✗ |
| `space-card-horizontal-embedded` | 12px | yes |
| `space-container-horizontal` | 20px | yes |
| `space-tree-view-indentation` | 24px | yes |
| `space-alert-vertical` | 8px | yes |

**5px and 10px appear nowhere in the public scale.**

### Radius — there is no scale

Instead of a general radius scale there are **only per-component tokens**.

| token | value |
|------|-----|
| `border-radius-badge` | 4px |
| `border-radius-chat-bubble` | 8px |
| `border-radius-alert` | 12px |
| `border-radius-card-default` | 16px |
| `border-radius-card-embedded` | 8px |
| `border-radius-container` | 16px |
| `border-radius-action-card-default` | 16px |
| `border-radius-action-card-embedded` | 8px |
| `border-radius-button` | **20px** |
| `border-radius-control-default-focus-ring` | 4px |
| `border-radius-calendar-day-focus-ring` | 3px |

Source: `@cloudscape-design/design-tokens@3.0.107` → `index.scss`

### Typography

~~Unverified~~ → **resolved (2026-08-18, `@cloudscape-design/design-tokens@3.0.107`
→ `index.scss`: 30 `$font-*`, 10 `$line-height-*`, 7 `$letter-spacing-*`).**

**There is no size scale — only role tokens.** There is no numbered scale such as
`font-size-100`; the role names `body` · `heading` · `display` are themselves the tokens.

| role | size | line height | weight | tracking |
|------|:---:|:---:|:---:|:---:|
| `display-xl` | 64px | 72px | **400** | -0.03em |
| `display-l` | 42px | 48px | 700 | -0.03em |
| `heading-xl` | 24px | 30px | 700 | -0.02em |
| `heading-l` | 20px | 24px | 700 | -0.015em |
| `heading-m` | 18px | 22px | 700 | -0.010em |
| `heading-s` | 16px | 20px | 700 | -0.005em |
| `heading-xs` | **14px** | 18px | 700 | `normal` |
| `body-m` | **14px** | 20px | (`normal` 400) | — |
| `body-s` | 12px | 16px | (`normal` 400) | — |
| `tabs` | 16px | 20px | 700 | — |

- **The body has only two steps, 14 and 12px.** There is no 16px body.
- **`heading-xs` (14px) is the same size as the body** and is distinguished by weight alone.
- **Tracking goes more negative as the size grows** — `normal` → -0.005 → -0.010 → -0.015 →
  -0.02 → -0.03em. The body has no tracking token.
- **Only `display-xl` is at weight 400** (64px). Every other heading is 700.
- There are only **three weight values**, 300 / 400 / 700 (`lighter` 300 · `normal` 400 ·
  `bold` and `heavy` 700), and the per-component weight tokens
  (`font-weight-button` · `font-weight-tabs` · `font-weight-alert-header` ·
  `font-weight-flashbar-header`) all point at 700.
- **Component-specific size tokens** such as `$font-size-tabs` (16px) exist in the same way
  as they do for spacing and radius.

Four families — `base`, `display` and `heading` **hold identical values**
(`'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif`) and only `monospace`
(`Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace`) differs.

### Colour

~~Unverified~~ → **resolved (2026-08-18).**
The full hex listing is omitted (`../SCHEMA.md`) — only the structure is recorded.

**There is no raw ramp — a single semantic layer.** Of the **407** colour tokens, the only
numbered ramp is **the chart palette**; the product UI colours have no notion of lightness
steps. The same structure as the absent radius scale.

| family | count |
|------|:---:|
| `color-charts-*` | **155** |
| `color-text-*` | 94 |
| `color-background-*` | 92 |
| `color-border-*` | 50 |
| `color-dropzone-*` | 6 |
| `color-foreground-*` | 3 |
| `color-drag-*` · `color-board-*` | 2 each |
| `color-tree-*` · `color-shadow-*` · `color-item-*` | 1 each |

#### The chart palette — the step number is the contrast ratio

Eight colours (red · orange · yellow · green · teal · blue · purple · pink) × 10 steps
(300–1200), and because **`blue` alone comes in two sets, `blue-1` and `blue-2`**, that is
90 + 10 = 100. On top of that, 50 `palette-categorical-1`–`50`, 7 state, 4 threshold, and 4
axis/grid/tick tokens = **155** in all.

The step number ÷ 100 is the contrast ratio (`color-charts-red-500` = 5:1).
The `$description` field says "at a contrast ratio of 5:1" in so many words.
(The cross-system write-up is in the "contrast ratio" section of `../patterns/color.md`.)

#### Light/dark — two values in one token

`index-visual-refresh.json` holds **563** tokens in `$value: {light, dark}` form.
Of the 407 colours, **65 are identical in light and dark and 342 differ.**

```json
"color-text-body-default": { "$value": { "light": "#0f141a", "dark": "#c6c6cd" } }
"color-background-container-content": { "$value": { "light": "#ffffff", "dark": "#161d26" } }
```

The same file carries **four mode axes**:

| axis | tokens | example |
|------|:---:|------|
| `light` / `dark` | 409 | every colour |
| `comfortable` / `compact` | **43** | `space-scaled-*` · `size-vertical-input` |
| `default` / `disabled` | **15** | `motion-duration-*` · `motion-easing-*` · `motion-keyframes-*` |
| single value | 96 | families, weights, `space-static-*` and so on |

**The second value on the motion tokens is the "reduced motion (disabled)" state** — the
`prefers-reduced-motion` response put in as a token value axis.

#### Eight colour contexts — local themes

The `contexts` key holds **eight contexts**, each re-declaring all 563 tokens and giving
different values to only a subset.

| context | tokens differing from the default |
|----------|:---:|
| `header` | **183** |
| `alert-header` | 182 |
| `top-navigation` | 182 |
| `flashbar-warning` | 52 |
| `flashbar` | 47 |
| `alert` | 28 |
| `compact-table` | **17** (all spacing and size) |
| `app-layout-toolbar` | **1** (`color-background-layout-main`) |

**Only `compact-table` changes spacing rather than colour** — the other seven are colour
contexts. The structure swaps button, link and icon colours wholesale over a dark
background (the header and top navigation), and it is **an axis separate from dark mode**
(each context carries its own light and dark values).

## Components

~~Unverified~~ → **component CSS deep pass (2026-08-17,
`@cloudscape-design/components@3.0.1348` — the per-component `styles.scoped.css`).**

### Measurements

| component | value |
|----------|-----|
| button | height derived at ≈32px (4px padding + 20 line height + 2px border), inline padding 20px, **radius 20px (a pill)**, border 2px |
| input | a **`--size-vertical-input: 32px`** height token, block padding 5px, radius 8px |
| modal | **five max-widths: 320 / 600 / 820 / 1024 / 1280px** + a mobile `100vw−24px` + the `--awsui-modal-custom-width` custom hook |
| table | `--space-scaled-*` (density-responsive spacing) wired straight into the cell padding |

### Structure — isolation and hooks

- **Every component embeds a full CSS reset** — the first rule in each scoped CSS returns
  some 30 properties to their initial values. A drastic measure to isolate the components
  from the host page's styles (a console product is embedded in all sorts of host pages).
- **Every selector is suffixed with `:not(#\9)`** — a hack for raising specificity without
  `!important`, systematised into the build.
- **A `--awsui-style-*` runtime override layer**: every colour and border is a double chain,
  `var(--awsui-style-…, var(--color-token, fallback))` — the third sample in the
  "variable layer reserved for consumer overrides" family, after SLDS hooks and Spectrum's
  `--mod-*`.
- The classes carry a double hash (`awsui_button_vjswe_13k2n_157`) — collision protection
  between versions.

Components confirmed from the token names: alert, button, card, action-card, container,
field, tabs, tree-view, side-navigation, chat-bubble, badge, calendar, option, token.

### Tables — there are table-specific spacing tokens (measured 2026-08-18)

`table/styles.scoped.css` · `table/body-cell/` · `table/header-cell/`.

| token | value |
|------|:---:|
| `--space-table-horizontal` | **20px** |
| `--space-table-content-bottom` | **4px** |
| `--space-table-header-tools-bottom` | **0px** |
| `--size-table-selection-horizontal` | **40px** |

> **Correction.** This document and `patterns/table.md` had recorded that "there are no
> table-specific tokens such as `space-table-*`", but **they are merely absent from the
> design-token package — the component package's shipped CSS has them.** The four above
> carry table-specific names.

- The cell block padding is `calc(space-scaled-xs(8px) − 1px border + 2px)` and is
  **taken back with `margin-block: -2px`** — 2px is borrowed and then reclaimed as margin so
  the focus ring is not clipped at the cell boundary.
- **The cell inline padding subtracts the border too, at `20px − 1px`**
  (the border-subtraction habit from `patterns/button.md`, in a table).
- **The body cell's top border is 1px transparent and its bottom 1px solid** — the row
  height does not change when the top border takes a colour in the selected state (the same
  solution as Carbon).
- **The sticky header and sticky columns sit at `z-index: 798`.** By far the largest value
  in the sample collected (Semi's 101 is next), and a value inside the app layout's own
  stacking scheme.
- The sticky column shadow is `4px 0 8px 1px rgba(0,7,22,.1)` plus
  **`clip-path: inset(0 -24px 0 0)`** — the shadow is clipped so it leaks in one direction
  only. In RTL the direction flips.
- **A sticky cell's padding transitions over 90ms**
  (`motion-duration-transition-show-quick`) — the padding animates as scrolling pins it.
- **The tree (expansion) indent is `space-m(16) + space-xs(8)` = 24px per level.**
- Only the header group cell has its own padding, `2px / 8px`.

### Navigation — the expanded width is now confirmed

| item | value | source |
|------|:---:|------|
| **side navigation, expanded** | **280px** | the `AppLayout` `navigationWidth` default |
| **collapsed** | **54px** | the `AppLayout` `navigationCollapsedWidth` default |
| collapsed (token) | 52px | `size-side-navigation-collapsed-width` |
| tools panel width | 290px | the `toolsWidth` default |
| root list left padding | `space-panel-nav-left(28) − 8` = **20px** | side-navigation CSS |
| sub-group indent | **+20px** (`space-l`) | the same file |
| header type | 18px / 22px line height | `font-panel-header-*` |

> These are the values this document and `patterns/navigation.md` had left as
> "expanded width unverified".
> **The collapsed width differs by 2px between the token (52px) and the component default
> (54px)** — which one is the actual rendered value could not be confirmed.

## Characteristic decisions

- **Density-responsive spacing is separated at the token layer.**
  `scaled` and `static` hold the same values but behave differently in compact mode.
  A design that makes "may this space shrink with density?" a question answered by token
  choice rather than by implementation. Unique among the systems collected so far.
- **There is no general radius scale.** Other systems give a raw scale and let components
  pick from it; Cloudscape exposes only per-component values. That blocks arbitrary
  combinations, but leaves no raw value to refer to when building a new component.
- **The button radius is 20px.** Larger than the container's (16px). A choice that pushes
  the button towards a pill — the exact opposite of Carbon's near-rectangle.
- **Values outside the scale are mixed into the semantic tokens.**
  `space-field-vertical: 5px` and `space-card-vertical-embedded: 10px` are not in the public
  scale. They look like traces of pixel-level adjustment needed in a high-density console,
  but they conflict with any claim of a consistent scale.
- **The focus-ring radius is a separate token** (3px, 4px). An accessibility element managed
  at the token level.

- **There is no raw scale for colour either** (2026-08-18). The same policy as the radius —
  the only numbered ramp is the chart palette, and all 236 UI colours carry semantic names.
  **"No raw scale" is confirmed as a system-wide policy rather than a quirk of one axis.**

- **Typography has no numbered scale either.** Only role names such as `body-m` and
  `heading-l`; the size token is the role. The same structure as radius and colour.

- **Eight colour contexts live at the token layer.** In `header`, `top-navigation`, `alert`,
  `flashbar` and the rest, up to 183 tokens take different values.
  It is **an axis orthogonal to dark mode** — each context carries its own light and dark
  values.

- **The motion tokens' second value is the "reduced motion" state.**
  Fifteen `$value: {default, disabled}` tokens — an accessibility setting expressed as a
  token value axis rather than as a theme.

## Accessibility

The focus-ring radius is separated into per-component tokens and managed there.

~~A specific conformance target is unverified.~~ → **its absence reconfirmed (2026-08-18,
headless render).**
Rendering the body of the `Foundation / Key principles: Accessibility` page (published
2022-05-04) **does not produce the string WCAG even once.** The content is entirely
practical guidance — "provide semantic markup and appropriate ARIA attributes", "follow the
accessibility guidelines in each component's usage tab (alternative text, ARIA regions)",
"define ARIA labels appropriate to the application's language context", "do not add
unnecessary markup for roles and landmarks".
There is **only effort language and no declaration of conformance**, as in
"We **strive to** build Cloudscape components with accessibility in mind".

The child pages are only two — `Focus management principles` and
`Building accessible experiences` — and neither carries a level target.
→ The frontmatter `a11y_target: confirmed unstated` reconfirmed by render (grade C settled).

Source: https://cloudscape.design/foundation/core-principles/accessibility/ (render
confirmed, 2026-08-18)

## References

- Repository: https://github.com/cloudscape-design/components
- Package: `@cloudscape-design/design-tokens`
