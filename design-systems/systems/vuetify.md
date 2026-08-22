---
name: Vuetify
org: Open source (Vuetify)
coverage: partial
url: https://vuetifyjs.com
repo: https://github.com/vuetifyjs/vuetify
license: MIT
tech: [Vue, SCSS]
figma_kit: true
tokens_format: [SCSS]
a11y_target: "Confirmed to state none (2026-08-18 — the accessibility documentation covers only WAI-ARIA implementation, with no WCAG version or level target)"
platform: web
domain: framework
verified: 2026-08-18
source: "npm vuetify@4.1.10 → lib/styles/settings/_variables.scss · lib/components/*/_variables.scss · dist/vuetify.min.css (tables, navigation and feedback measured, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](vuetify.ko.md)
<!-- /lang-links -->

## In one line

**The corpus's first Vue sample** — the recorded bias of "zero systems in the Vue and Svelte
families" is broken here. A framework of the Material lineage that builds its spacing from a
`$spacer: 4px` seed multiplied 0 through 16.

## Tokens — SCSS variables

```scss
$spacer: 4px !default;           // the same name as Bootstrap's ($spacer: 1rem), a different value
$font-size-root: 1rem !default;  // 16px
$border-radius-root: 4px !default;
$body-font-family: var(--v-font-body, 'Roboto', sans-serif) !default;
$grid-columns: 12 !default;
```

- **`$spacer` has the same name as Bootstrap's but a value of 4px rather than 16px** —
  the same idiom, a different seed. The utilities are enumerated `ma-0` through `ma-16`
  (×4px), generating every core value (4/8/16/24/32)
- A 16px body (root) and Roboto — the Material lineage carried straight into the typeface and
  radius
- `!default` throughout — the same "everything is overridable" contract as Bootstrap

## Components in depth — (2026-08-18)

`lib/components/` of `vuetify@4.1.10` — 102 components, each shipping a
`_variables.scss` (the formulas) paired with built CSS (the real values). Measured from
VBtn, VField/VInput, VDialog and `transitions/dialog-transition.js`.

### Buttons (VBtn) — the geometry is a ratio formula

| | x-small | small | default | large | x-large |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | 20px | 28px | **36px** | 44px | 52px |
| min-width | 36px | 50px | 64px | 78px | 92px |
| inline padding | 8px | 12px | 16px | 20px | 24px |
| type | 10px | 12px | 14px | 16px | 18px |

- **min-width = height × 16⁄9, padding = height ÷ 2.25** — with
  `$button-width-ratio: math.div(16, 9)` and `$button-padding-ratio: 2.25`, all five sizes
  derive from formulas (64 = 36×16/9). A **ratio-derived** approach, different from MUI's
  (line-height-derived heights).
- **Five sizes orthogonal to three densities** — density adds 0/−8/−12px to the height
  (and +12/0/−8 on icon buttons). A measured sample of the Material density system, keeping
  size and density as independent axes.
- The default variant is **elevated** (with a shadow), radius 4px, weight 500,
  tracking 0.0071em (= 0.1px/14px) — **exactly M3's label-large specification**, except that
  `$button-text-transform: none` **abandons the uppercase tradition.**
- State comes from a `.v-btn__overlay` element plus
  `calc(var(--v-hover-opacity) × var(--v-theme-overlay-multiplier))` —
  **the state layer's opacity is multiplied by a theme factor** (so a dark theme adjusts state
  intensity through one multiplier). The element-based implementation of the same pattern as
  eBay's (`:after` state layer).
- Transition `0.28s cubic-bezier(0.4, 0, 0.2, 1)`, disabled opacity 0.26.

### Inputs (VField) — no size axis, only density

- Heights 56/48/40px (default/comfortable/compact) — **the button has five sizes × three
  densities while the input has only the three densities.** Two components in the same system
  with different variant axes.
- outlined border 1px → 2px on focus, type 16px, radius 4px, filled overlay 4%.
- The label shrinks by scale 0.75 (floating, as in MUI) — except **the notch is assembled not
  from a fieldset but from the borders of three divs**, `__outline__start` (12px) / `__notch` /
  `__end`. The second implementation of the same Material notch.

### Dialogs (VDialog) — no width scale

- **There are no fixed width steps at all** — just `width: calc(100% − 48px)` with a 24px
  margin; max-width is the consumer's to specify. A third attitude, after MUI (reused
  breakpoints) and Cloudscape (five dedicated steps): **having no width scale.**
- Scrim `#000` at 0.32. Content radius 4px, and the shadow is **two composed layers**, key
  plus ambient (`--v-shadow-key-opacity` 0.3 / `-ambient-` 0.15) — M3's elevation grammar.
- **The entrance animation is WAAPI (JS), not CSS** — the framework provides a
  **container-transform (hero) transition** by default, flying from the trigger element's
  (`target`) box to the dialog's final position by translate and scale.
  A 225ms decelerating enter and a 125ms accelerating exit, asymmetric, and **the duration
  stretches by 1 to 1.5× with the distance travelled**
  (`speed = min(1.5, (distance ratio − 0.12) × 10 + 1)`) — the only sample where duration is a
  function of distance. Under reduced-motion it falls back to a 125/85ms fade.

### Tables (VTable · VDataTable) — density compressed into two CSS variables

Measured from `lib/components/VTable/_variables.scss` and `dist/vuetify.min.css` of
`vuetify@4.1.10`.

| density | header height | row height |
|---|:--:|:--:|
| default | **56px** | **52px** |
| comfortable | 48px | 44px |
| compact | **40px** | **36px** |

- **Density is just two variables, `--v-table-header-height` and
  `--v-table-row-height`.** The cell padding (`0 16px`) and type are fixed regardless of
  density — the minimal implementation, the exact opposite of Cloudscape putting a density
  axis on 43 tokens.
- The density coefficients are `('default': 0, 'comfortable': -2, 'compact': -4)`, producing
  56→48→40 and 52→44→36 — **an even −8px per step.**
- **The cell padding is 0 vertical / 16px horizontal** — since the height is set directly with
  `height`, no vertical padding is needed. The only case in the collected sample with zero
  vertical padding.
- **The fixed header is `box-shadow: inset 0 -1px` with `z-index: 1`**
  (the same solution as Radix Themes and Mantine for avoiding `border-collapse`, at the lowest
  z of them all). Fixed columns take `z-index: 1`, and only the cell where a fixed column
  meets the fixed header rises to **2**.
- **The stripe is not a background colour but a `background-image: linear-gradient()`**
  (two variants, `striped-even` / `striped-odd`). Leaving the background colour empty lets it
  layer with the selection and hover backgrounds.
- **Hover is likewise not a background colour but a `td::after` overlay** — the same
  state-layer approach as the button's `.v-btn__overlay`, applied to the table.
- **The sort icon is `opacity: 0` when unsorted and `0.5` on hover or focus**
  (`$data-table-header-sort-icon-default-opacity` / `-hover-opacity`).
  It agrees at the code layer with Carbon's rule that the unsorted arrow appears only on
  hover. The sort-order badge is 20px (`$data-table-header-sort-badge-size`).
- The rules are alpha compositions of `--v-border-color` × `--v-border-opacity`, in three
  variants: `gridlines-vertical` / `-horizontal` / `-all`.

### Navigation (VNavigationDrawer · VTabs · VList · VBreadcrumbs)

| item | value |
|---|---|
| drawer width | **256px** (the `width` prop's default) |
| rail (collapsed) width | **56px** (the `railWidth` default) |
| drawer transition | 0.2s, scrim opacity 0.2 |
| tab list height | **48 / 44 / 36px** (default/comfortable/compact) |
| tab min and max width | 90px / 360px |
| tab indicator | **2px** (`$tab-slider-size`), at the bottom when horizontal / the right when vertical |
| list item min-height | **40 / 36 / 32px** (three densities) · the one-line variant 48 / 44 / 40 |
| list item padding | 4px / 16px |
| hierarchy indent | **16px** (`$list-indent-size`, cumulative per level) |
| breadcrumb separator padding | 0 8px · item padding 0 4px · container 16/12px |

- **The 56px rail is the widest in the collected sample** (shadcn/ui and Carbon 48 ·
  Cloudscape 52–54 · Semi 60 · Ant 80), presupposing a 24px icon plus 16px on each side.
- **The tab indicator swaps its height and width when vertical** — horizontal tabs get
  `height: 2px; bottom: 0`, vertical ones `width: 2px; top: 0`.
  The same structure as shadcn/ui's horizontal-2px / vertical-2px branch.
- **In the `inset` variant the indicator becomes a background pill rather than a line**
  (`inset: 0; z-index: -1; border-radius: $tab-inset-radius`) — underline and pill handled by
  the same element.
- The breadcrumb has three densities too (`0/-1/-2`) — the only case in the sample of putting
  a density axis on a breadcrumb.

### Feedback (VAlert · VSnackbar · VBadge)

| component | value |
|---|---|
| **Alert** padding | **16px all round** · three densities (`0/-1/-2`) |
| Alert border | 0 by default; **8px** when the `border` prop is set (`$alert-border-thin-width`) |
| Alert icon | **1.75rem (28px)**, 16px to its right |
| Alert title | the `headline-small` specification, line height 1.75rem |
| **Snackbar** width | **min 344px / max 672px**, min-height 48px |
| Snackbar padding | **14px 16px** · 8px wrapper margin |
| Snackbar enter | scale **0.8** → 1, elevation 2, z-index **10000** |
| **Badge** height | **1.25rem (20px)**, min-width 20px, radius 10px |
| Badge padding / type | 4px 6px · 12px / weight 500 |
| Badge dot | 9×9px, 1.5px border |

- **The alert's emphasis border is 8px** — the thickest in the collected sample
  (Carbon 6px · EUI 3px · Cloudscape 2px · Mantine 1px). The colour is `currentColor` at
  opacity 0.38.
- **The badge's border is 2px plus `scale(1.05)`** — the border is scaled up so the badge
  separates from an avatar or icon when laid over one. The only case in the collected sample
  with a scale correction on a badge.
- The snackbar has **both a minimum (344px) and a maximum width (672px).**
  Most other samples have a single fixed width (Sonner 356 · PrimeVue 352 · Ant 384).

### Characteristic decisions (from the deep pass)

- **Button min-width 16:9 and padding ÷2.25** — ratio formulas rather than a list of
  dimensions
- **Size orthogonal to density** (15 button combinations) while the input has density only —
  an axis asymmetry
- **A hero dialog transition with a distance-dependent duration** — implemented in WAAPI
- The state layer's opacity = the token multiplied by a theme factor
- Following M3's label-large figures while abandoning uppercase — a selective departure from
  the Material lineage

## Characteristic decisions

- **The first Vue framework sample** — the first break in the React skew (7 of 7 frameworks)
- Reusing the `$spacer` name with a changed value — the name/value trap family in
  `GLOSSARY.md`
- Material-lineage defaults (Roboto, radius 4)

## Accessibility

~~Unverified.~~ → **Confirmed absent (2026-08-18, headless render).**

There is a dedicated accessibility document (`/en/features/accessibility/`), and yet
**it declares no WCAG version or level target.** The documentation is entirely about
"what has been implemented":

- **The activator slot passes a11y attributes down.** Pass `props` through the
  `activator` slot scope of `v-menu`, `v-dialog` and the rest, and the rendered `v-btn`
  automatically receives `aria-expanded`, `aria-haspopup` and `role="button"`.
- **`v-list-item` switches automatically to `role="menuitem"` inside a `v-menu`.**
- Keyboard interaction covers every mouse action, and `v-menu` supports ↑/↓ movement.

In place of a conformance criterion it links out under "Additional Resources"
(W3C WAI · WAI-ARIA Authoring Practices · The A11Y Project).

The type that **documents techniques (implementation) without a target (declaration)** —
the same family as Base Web, except that Base Web provides an axe-core runtime validator
while Vuetify handles it through **automatic ARIA injection at the component API level**
(classified C — conformance target not published).

Source: https://vuetifyjs.com/en/features/accessibility/ (render confirmed, 2026-08-18)

## References

- Tokens: `npm pack vuetify@4.1.9` → `lib/styles/settings/`
- Components in depth: `vuetify@4.1.10` → `lib/components/{VBtn,VField,VInput,VDialog,
  VOverlay}/` plus `lib/components/transitions/dialog-transition.js` (2026-08-18)
- **Open questions:** ~~the component list~~ (102), ~~the theme structure~~
  (`--v-theme-*` rgb triplets plus state opacities such as `--v-hover-opacity` and the
  `--v-theme-overlay-multiplier` factor — the deep pass), whether it targets Material 3
  (M3 grammar is confirmed — typographic role names like `label-large`, two-layer shadows —
  but no official M3 conformance declaration was found),
  ~~figma_kit and a11y_target~~ (resolved / confirmed absent 2026-08-18)
- **Figma kit (resolved 2026-08-18 — `figma_kit: true`)**: **it is free.**
  There is a dedicated documentation page, `/en/resources/ui-kits/`, with three distribution
  routes — ① **a Figma plugin** (recommended), ② **a Figma Community file**
  (https://www.figma.com/community/file/1266515419060480209), and
  ③ **a direct download from the Vuetify Store**
  (https://store.vuetifyjs.com/products/vuetify-ui-kit-figma → importing
  `vuetify3-ui-light-kit.fig` from inside `vuetify-figma-ui-kit.zip`).
  As the `-light-` in the filename suggests, **only a light theme ships.**
  Source: https://vuetifyjs.com/en/resources/ui-kits/ (render confirmed, 2026-08-18)

4.1.10 re-verified — no token values changed (2026-08-18)
