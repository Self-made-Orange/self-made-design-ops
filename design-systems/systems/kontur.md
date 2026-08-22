---
name: Kontur UI (react-ui)
org: SKB Kontur
coverage: partial
url: https://ui.kontur.ru
repo: https://github.com/skbkontur/retail-ui
license: MIT
tech: [React]
figma_kit: unverified
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @skbkontur/react-ui@6.3.0 → lib/theming/, internal/themes/"
---
<!-- lang-links -->
> **English** · [한국어](kontur.ko.md)
<!-- /lang-links -->

## In one line

The system of SKB Kontur (Russian enterprise SaaS) — **themes carry semantic versions and
every past version stays** (`LIGHT_THEME_6_0` through `6_3` ship together).
A theme is **a class inheritance chain**, and even the utility that parses the version
string is public API.

## Tokens — a chain of versioned theme classes

```js
LightTheme6_3 = createTheme({
  themeClass: class LightTheme6_3 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme6_2,           // the previous version as the prototype
  themeMarkers: [markThemeVersion('6.3')],
});
export var LIGHT_THEME = LIGHT_THEME_6_3;   // the newest as the default
```

- **Four theme versions ship simultaneously** (`6_0` · `6_1` · `6_2` · `6_3`, and the same
  for dark). A product can pin itself to the theme as of any moment — among the cases of
  migration coexistence (Mística's `-new`, Vibes' second generation, HSDS's newBrand),
  **the only one that numbers the versions explicitly**
- **Each version inherits the previous one as its `prototypeTheme`** — 6_3 contains only
  what differs from 6_2, which is why the files are around 1.4KB.
  **The only structure in the sample that composes themes as a class inheritance chain.**
- **The version parser is public** (`parseThemeVersion('1.0')` ·
  `parseVersionFromThemeName('LIGHT_THEME_1_0')`) — the theme version can be read and
  branched on at runtime. Shipping **version-management tooling** rather than tokens is
  unique in the sample
- `themeMarkers` stamps metadata onto a theme

## Values

`BasicTheme` is the origin of the values and each versioned theme holds only the
differences — the values themselves are scattered per component
(many per-component theme functions such as `getAutocompleteTheme`), so **there is no
global scale file**. The same cut as HSDS (per-component JSON), made here with **functions**.

## Components in depth — (2026-08-18)

`BasicTheme` was **actually loaded in node** (after installing peer dependencies such as
react and warning, then importing the ESM) to fix the values — flattening the prototype
chain yields **1,462 keys**. This is what the "no global scale file" cut really means: there
is no scale, only component keys like `btnHeightSmall`.

### Buttons — the size changes the type too

| | S | M | L |
|---|:--:|:--:|:--:|
| height | 32px | 40px | 48px |
| type | **14px** | **16px** | **18px** |
| line height | 20px | 22px | 24px |
| inline padding | 12px | 16px | 20px |
| radius | 8px | 8px | 8px |
| icon / gap | 16px / 4px | 20px / 6px | 24px / 8px |

- **The three sizes scale not just the height but the type, icons and gaps in proportion**
  (14/16/18px) — parting ways with the majority, which change only the height.
- The radius tokens are split per size, yet **all three hold 8px** — split but not yet
  differentiated (the same pattern as Intergalactic's durations).
- **Primary is achromatic** — `btnPrimaryBg = #3d3d3d` (`shape-bold-accent`). The default
  emphasis is an ink-coloured button, not a brand-coloured one.
- **The `use="pay"` variant is first-class API** — a payment-specific yellow button
  (`btnPayBg = #ffbe3d`). Payment sitting alongside success and danger is the only case in
  the sample of a domain (Russian SaaS payments) pinned into a component variant.

### Inputs — the same heights as buttons, a different radius

| | S | M | L |
|---|:--:|:--:|:--:|
| height | 32px | 40px | 48px — identical to buttons |
| type | 14px | 16px | 18px |
| inline padding | **7px** | **11px** | **15px** |
| radius | **2px** | 2px | 2px |

- **8px on buttons vs 2px on inputs** — round for pressing, square for writing. An explicit
  asymmetry that splits radius by kind of component (Siemens iX uses 2px for both, Backpack
  8px for both).
- **The padding is 8/12/16 minus the 1px border, giving the odd 7/11/15** — the same
  intention as MUI's outlined subtraction, except here it is **baked into the token value
  itself**.
- The focus tokens keep their formulas intact:
  `inputFocusShadow = "0 0 0 calc(2px - 1px) …"` and
  `inputOutlineWidth = calc(2px - 1px)` — **the design intent ("a 2px ring minus the 1px
  border") documented in the value**. From 6.x on, every colour follows the
  `var(--k-color-…, fallback)` scheme.

### Modals — the lightest scrim in the sample

| item | value |
|------|-----|
| radius | **16px** |
| padding | 24 top / 32 inline / **40px bottom** — asymmetric |
| scrim | **rgba(0,0,0, 0.24)** |
| width | no scale — a free `width` prop |

- **A scrim opacity of 0.24 is the lowest in the sample** (most sit around 0.5, Backpack at
  0.7). A position where almost everything behind the modal stays visible.
- The close button's **click area is a four-sided asymmetric token**
  (top 30 / right 28 / bottom 22 / left 24px) — a rare piece of data separating visual size
  from hit area and expanding it differently per direction.

### Theme version diff (backlog cleared)

`LightTheme6_0 → 6_1 → 6_2 → 6_3` compared key by key:

- **6_0 → 6_1: nine keys actually changed** — the backgrounds of modal, sidePage and
  textareaCounter move from `surface-high` to `surface-base`, `mobileMediaQuery` goes from
  576 to **767.98px**, and `mobilePopupContainerBorderRadius` from 16 to 8px
- **6_1 → 6_2 and 6_2 → 6_3: zero value changes** — **empty versions** where only the
  version marker moved. Evidence that the theme version is synchronised mechanically with
  the library's minor version, meaning a "versioned theme" is issued every release whether
  or not anything changed.

### Characteristic decisions (from the deep pass)

- **Size scales the type in proportion** (14/16/18) — three density steps mean three type
  steps
- **A `pay` button variant** — the domain pinned into the API, unique in the sample
- **Radius asymmetry: 8px on buttons, 2px on inputs**
- **calc formulas and border subtraction left in the token values** — intent documenting
  itself
- **A 0.24 scrim, the lightest in the sample** · a four-sided asymmetric hit area on the
  close button
- **Two empty theme versions** — version synchronisation takes precedence over value changes

## Characteristic decisions

- **Semantic versions on themes with four past versions shipped together** — unique in the
  sample
- **Themes as a class inheritance chain** (each version inheriting the previous) — unique in
  the sample
- **A theme-version parser shipped as public API** — unique in the sample
- No global scale — dispersed into per-component theme functions
- The first Russian sample (regional diversity)

## Accessibility

Unverified.

## References

- Tokens: `npm pack @skbkontur/react-ui@6.3.0` → `lib/theming/`, `internal/themes/`
- The repository is named `retail-ui` while the package is `@skbkontur/react-ui`
- Components in depth: `internal/themes/BasicTheme.js` evaluated in node
  (plus `@skbkontur/colors@2.1.9`) and `components/Modal/*` (2026-08-18)
- **Open questions:** ~~the actual `BasicTheme` values~~ ~~the differences between 6_0 and
  6_3~~ (resolved 2026-08-18 — the deep pass), the component list (around 60 directories
  confirmed — Autocomplete · CurrencyInput · FileUploader · Kebab · Paging · SidePage and
  others, not fully enumerated). The absence of global spacing and type scales is
  **structural** (all 1,462 keys are component keys)
