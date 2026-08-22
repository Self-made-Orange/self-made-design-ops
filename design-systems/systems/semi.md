---
name: Semi Design
org: ByteDance (Douyin FE)
coverage: partial
url: https://semi.design
repo: https://github.com/DouyinFE/semi-design
license: MIT
tech: [React]
figma_kit: unverified
tokens_format: [CSS, SCSS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @semi-bot/semi-theme-default@1.0.0 → semi.css (1,887 --semi-* tokens; tables, navigation and feedback measured 2026-08-18) · npm @douyinfe/semi-ui@2.102.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](semi.ko.md)
<!-- /lang-links -->

## In one line

ByteDance's (Douyin's) system — **the second Chinese-language sample** after Ant.
**70% of the tokens are colour** (1,319/1,887), sizes and whitespace have no tokens and are
pinned into the components, and **the dominant size in practice is 14px.**

## Tokens — 1,887 of them, skewed to colour

| family | count |
|------|:---:|
| `color` | **1,319 (70%)** |
| `border` | 145 |
| colour ramps (`grey` · `blue` · `green` · `red` · `orange` …) | 38–73 each |
| radius | 6 |
| shadow | 1 (`elevated`) |
| **spacing · font size** | **0** |

**There are no dimension tokens.** Semi's theme system is for swapping colour; sizes and
whitespace are literals in the component CSS — going further than Mantine's "per-component
variables" approach in that **the variables do not exist at all.**

### Sizes in practice — 14px dominant

The frequency of `font-size` literals in the component CSS:

```
14px ×92 · 12px ×43 · 16px ×19 · 20px ×7 · 18px ×6 · 24px ×4
```

**14px appears five times as often as 16px.** With Ant (a `fontSize: 14` seed),
**both Chinese-language samples have a 14px body** — the 14px camp in
`patterns/typography.md` is 2 of 2 in the Chinese-language region.

### Radius — including 3px, with circle and full both present

```
small 2 · extra-small 3 · medium 6 · large 12 · circle 50% · full 9999px
```

- **There is no 4 or 8; it doubles 3→6→12** — joining the odd-radius camp (Helios, Spectrum,
  SGDS)
- **It keeps both `circle` (50%) and `full` (9999px)** — the same duality as Thumbprint and
  Paste
- The name ordering is peculiar — `extra-small` (3) is **larger** than `small` (2).
  The second name/value mismatch after SGDS's `lg` < default inversion

## Components

`@douyinfe/semi-ui@2.102.0` (React). The list is unverified.
Themes ship as separate `@semi-bot/semi-theme-*` packages —
**a theme-marketplace structure** (user-made themes distributed through npm).

## Components in depth — (2026-08-18)

The theme package's `semi.css` holds not only variable declarations but
**20,602 lines of compiled CSS for every component** (`@semi-bot/semi-theme-default@1.0.0`
— the component implementations are in `@douyinfe/semi-ui@2.102.0`). What follows is measured
from that CSS.

### Buttons (`.semi-button`)

| | small | default | large |
|---|:--:|:--:|:--:|
| **height** | 24px | **32px** | 40px |
| block padding | 2px | 6px | 10px |
| inline padding | 12px | 12px | 16px |

- Type is **14px / 20px / 600** at every size — a weight of 600 sitting between Backpack's
  (700) and the majority's (500).
- The radius is `--semi-border-radius-small` = **2px**, shared by buttons and inputs.
  Modals use 12px — **2px on controls against 12px on overlays**, among the largest radius
  gaps within a single system in the sample.
- **There are no transitions** — `transition` appears just 30 times across all 20,602 lines,
  and zero times on buttons and inputs. Hover and active colours **swap instantly.**
  A "state change without motion", in contrast to Backpack, which does not tokenise its
  easings yet still uses literals 42 times.
- The variants are **two orthogonal axes**: five types (primary · secondary · tertiary ·
  warning · danger) × three themes (solid · light · borderless), forming a 15-cell matrix
  through class combinations like `.semi-button-primary.semi-button-light`.

### Inputs (`.semi-input`)

| | small | default | large |
|---|:--:|:--:|:--:|
| inner height | 22px | **30px** | 38px |
| including the wrapper's 1px border | 24px | 32px | 40px |
| type | 14px | 14px | 16px |

- **The same three steps as the button, 24/32/40** — the input reaches them by adding the
  wrapper's 2px of border to its inner height. The same cross-component height alignment as
  Backpack (two shared steps, 36/48), here in three even 8px steps.
- **It is a filled form** — the wrapper takes a `fill-0` grey background with a
  **transparent 1px border**, and on focus only the border colours in; there is **no ring and
  no shadow.** Where it parts from Ant (an outline plus a ring).
- Inline padding 12px, identical to the button's.

### Modals (`.semi-modal`)

| | value |
|---|---|
| width | small **448** · medium **684** · large **920** · full-width calc(100vw−64px) |
| radius | 12px (radius-large) |
| padding | 24px inline in the content · 24px margins on the header and footer |
| scrim | rgba(22,22,26,.6) |
| enter | **120ms `cubic-bezier(0, 0, 0.26, 1.38)`** scale 0.7→1 |
| exit | 90ms ease |

- **The entrance easing overshoots (1.38)** — the modal springs slightly as it appears.
  The gap is characteristic: a system with no transitions using a bounce on the modal alone.
- Enter 120 / exit 90ms, asymmetric — the same direction as MUI (225/195), at under half the
  length.
- The header type is **14px/600** — even the modal title is at body size.
- The default width of 448px lands in the "modal defaults in the 440s" convergence with MUI's
  dialog xs (444) and HeroUI's md (448). 684 and 920 are multiples of 4 but not of 8.

### Dark mode and the ramps (clearing the backlog)

- The colour ramps are **ten steps (0–9) for every hue** — `--semi-blue-0..9` and so on.
  brand is an alias ramp holding the same values as blue.
- Dark is a `body[theme-mode=dark]` attribute selector, and **the `.semi-always-light` /
  `.semi-always-dark` classes force the mode on a subtree** — a rare sample designing local
  mode inversion into the selector layer.

### Tables (`.semi-table`) — three densities, shrinking only vertically

| density | cell block padding | cell inline padding |
|---|:--:|:--:|
| default | **16px** | 16px |
| middle | 12px | **16px (unchanged)** |
| small | 8px | **16px (unchanged)** |

- **Density changes only the block padding, leaving the inline 16px** — the "shrink the
  vertical, keep the horizontal" pattern derived from Cloudscape, confirmed again in an
  independent system's shipped CSS.
- Header cells are **16 inline / 8 block · weight 600 · `border-bottom: 2px`.**
  The body row rules are 1px — **only under the header is it twice as thick.**
- **Fixed headers and fixed columns use `z-index: 101`** — the highest in the collected sample
  (Vuetify 1–2 · Chakra 1 · Carbon 1 · Ant 2 · Mantine 3 · Cloudscape 798), and a literal
  unconnected to any other layer's values in the same system.
- **The fixed column's edge is a 1px border plus `box-shadow: ±3px 0 0`** — producing the
  scroll shadow as a flat 3px band, with no blur.
- Hover is a `--semi-color-fill-0` background, and **only the fixed column's cells repaint
  the same colour through a `::before` pseudo-element** (because fixed cells need an opaque
  background).
- Sort icons are 16×16px with a 4px left margin, turning `--semi-color-primary` when active.
  **The up and down arrows are two overlaid elements each with `height: 0`.**
- Column resizing (`react-resizable`) is included by default, and while dragging the edge
  becomes `2px solid primary`.
- **The striping rule could not be confirmed** (no `striped`/`zebra` selector in the shipped
  CSS).

### Navigation (`.semi-navigation` · `.semi-tabs` · `.semi-breadcrumb`)

| item | value |
|---|---|
| sidebar width | **240px** (including 8px inline padding) |
| collapsed width | **60px** |
| collapse transition | width 200ms `cubic-bezier(0.62, 0.05, 0.36, 0.95)` · padding 100ms ease-out |
| item height | **36px** · padding 8/12px · 8px between items |
| item radius | `border-radius-small` = **2px** (as on buttons) |
| hierarchy indent | level 1 32px (`-item-indent`) · level 3 text 44px |
| tab (line) padding | large **16/4/14px** · medium 12/4/10 · small 8/4/6 |
| tab gap | **24px** · active indicator **2px** at the bottom |
| breadcrumb | 4px between items · two type steps, loose 14px / compact **12px** |

- **The tab's block padding is asymmetric** (16 above, 14 below). The active underline takes
  the bottom 2px, so the optical centre is corrected — the only case in the collected sample
  to make this correction.
- **Hover draws an underline too** (`fill-0`, 2px) — the same thickness as active (primary)
  and pressed (fill-1), so state transitions do not shift the layout.
- The sidebar takes its collapsed width of 60px (= 36 + 8 + 8 + margins) from
  **a 36px square logo.**
- The breadcrumb has **two type steps, loose and compact (14/12px).**

### Feedback (`.semi-toast` · `.semi-banner` · `.semi-badge`)

| item | value |
|---|---|
| **Toast** position | **fixed top centre** (`top: 0`, `text-align: center`), z-index **1010** |
| Toast padding / margin | **12px 8px** · 12px margin · radius medium (6px) |
| Toast width | **none** — `display: inline-flex`, sized to its content |
| Toast type | 14px / **weight 600** |
| Toast shadow | two layers, `0 0 1px rgba(0,0,0,.3), 0 4px 14px rgba(0,0,0,.1)` |
| **Banner** padding | **12px 12px** · the container form takes radius small (2px) |
| Banner close | 24×24px · 12px left margin |
| **Badge** count | height **18px** / min-width 18px / radius **9px** (= half the height) |
| Badge padding / type | 0 4px · 12px / 16px line height |
| Badge dot | 8×8px |

- **The toast has no width specification** — the only case in the collected sample not to set
  one (Sonner 356 · PrimeVue 352 · Ant 384 · Naive 365 · Grommet 384 · Carbon 288/352).
  Its width varies with the content length.
- **Only the `light` variant expresses state through the border** — `semi-toast-light` takes a
  `-light-default` background with a 1px state-coloured border, while the default variant is a
  flat `bg-3` with **only the icon** carrying the state. A middle position between
  shadcn/ui's (sonner) "icon shape only" and Cloudscape's "the whole background".
- The badge's 9px radius is exactly half its height (18px) — a pill written as the literal
  half value rather than `9999px`.

### Characteristic decisions (from the deep pass)

- **Buttons and inputs sharing heights of 24/32/40** — three even 8px steps
- **A 2px control radius against a 12px modal** — among the largest radius gaps
- **No transitions** — state colours swap instantly, with only the modal overshooting (1.38)
- A **two-axis, 15-cell variant matrix** of type × theme
- A filled input with a coloured focus border (no ring)
- `.semi-always-*` forcing the mode on a subtree

## Characteristic decisions

- **70% of the tokens are colour** — the theme system is effectively colour-only
- **Zero dimension tokens** — every size and space is a component literal
- **14px dominant in practice** — the Chinese-language 14px pattern at 2 of 2 (Ant, Semi)
- Radius doubling 3→6→12, with `circle` and `full` both present
- `extra-small` (3) > `small` (2) — a name/value inversion
- Themes distributed as bot-generated packages (`@semi-bot/*`) — a theme-marketplace structure

## Accessibility

Unverified.

## References

- Theme: `npm pack @semi-bot/semi-theme-default@1.0.0` → `semi.css`
- Components: `@douyinfe/semi-ui@2.102.0` — the deep pass measures the compiled component CSS
  inside `semi.css` (2026-08-18)
- Licence: the theme package's package.json states **MIT**, and the main repository's
  (DouyinFE/semi-design) `LICENSE` is **MIT** too — reflected in the frontmatter (2026-08-18)
- **Open questions:** ~~the number of ramp steps and how dark mode works~~ (resolved
  2026-08-18 — the deep pass: ten-step ramps, `body[theme-mode=dark]`), the component list
  (around 80 class prefixes measured in the theme CSS — unverified against semi-ui's own
  list), and the structure of Semi DSM (the theme builder)
- **Licence resolved (2026-08-18):** `MIT` — source: github DouyinFE/semi-design → `LICENSE`
  (matching the npm metadata for `@douyinfe/semi-ui@2.102.0`)
