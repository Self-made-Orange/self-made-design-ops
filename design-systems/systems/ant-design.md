---
name: Ant Design
org: Ant Group
coverage: full
url: https://ant.design
repo: https://github.com/ant-design/ant-design
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm antd@6.6.1 → lib/theme/themes/seed.js (re-verified against 6.6.0 — seed identical), lib/theme/themes/shared/genSizeMapToken.js · es/{table,menu,tabs,breadcrumb,layout,message,notification,alert,badge}/style/index.js (tables, navigation and feedback measured, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](ant-design.ko.md)
<!-- /lang-links -->

## In one line

Ant Group's design system for enterprise products. The most widely used system in the
Chinese-speaking world, and characterised by a structure that **derives every token
algorithmically from a handful of seed values**.

## Tokens

### Seed tokens

The entire system is computed from these.

| seed | value |
|------|-----|
| `sizeUnit` | 4 |
| `sizeStep` | 4 |
| `fontSize` | 14 |
| `borderRadius` | 6 |
| `lineWidth` | 1 |
| `controlHeight` | 32 |
| `sizePopupArrow` | 16 |

Source: `antd@6.6.1` → `lib/theme/themes/seed.js`

### Spacing — derived from the seed

```js
sizeXXS: sizeUnit * (sizeStep - 3)   // 4
sizeXS:  sizeUnit * (sizeStep - 2)   // 8
sizeSM:  sizeUnit * (sizeStep - 1)   // 12
size:    sizeUnit * sizeStep         // 16
sizeMS:  sizeUnit * sizeStep         // 16
sizeMD:  sizeUnit * (sizeStep + 1)   // 20
sizeLG:  sizeUnit * (sizeStep + 2)   // 24
sizeXL:  sizeUnit * (sizeStep + 4)   // 32
sizeXXL: sizeUnit * (sizeStep + 8)   // 48
```

The resulting values on the default seed: **4, 8, 12, 16, 20, 24, 32, 48**

Source: `lib/theme/themes/shared/genSizeMapToken.js`

### Padding and margin are not separate scales

Every `padding*` and `margin*` is an alias referring straight to `size*`.

```
paddingXXS → sizeXXS    marginXXS → sizeXXS
padding    → size       margin    → size
paddingLG  → sizeLG     marginLG  → sizeLG
```

The **content-padding family, however, is mapped one step out of alignment**.

| token | refers to | value |
|------|------|-----|
| `paddingContentHorizontal` | `sizeMS` | 16 |
| `paddingContentVertical` | `sizeSM` | 12 |
| `paddingContentHorizontalLG` | `sizeLG` | 24 |
| `paddingContentVerticalLG` | `sizeMS` | 16 |
| `paddingContentHorizontalSM` | `size` | 16 |
| `paddingContentVerticalSM` | `sizeXS` | 8 |

Horizontal padding is always one step larger than vertical.

Source: `lib/theme/util/alias.js`

### Radius

The seed is `borderRadius: 6`. **Not 4 and not 8, but 6.**

### Typography

The base is `fontSize: 14`. This parts ways with Western systems that default to 16px.

### Colour

Unverified — `themes/default/colorAlgorithm.js` holds the algorithmic palette generation.

## Components

Unverified — the documentation site is blocked.

## Components in depth — tables, navigation and feedback (2026-08-18)

Measured from the component token generators (`prepareComponentToken` in
`es/*/style/index.js`) of `antd@6.6.1`. Ant is CSS-in-JS, so there is no shipped CSS and
**component tokens exist only as expressions derived from the seed**.

### Tables (`es/table/style/index.js`) — horizontal shrinks more

| size | cell block padding | cell inline padding |
|---|:--:|:--:|
| default | `padding` = **16px** | `padding` = **16px** |
| middle | `paddingSM` = **12px** | `paddingXS` = **8px** |
| small | `paddingXS` = **8px** | `paddingXS` = **8px** |

- **At middle, horizontal shrinks more than vertical** (16→8 vs 16→12) — **the opposite
  direction** from Cloudscape and Semi, which shrink only the vertical and keep the
  horizontal. It is the only case in the collected sample where raising density cuts the
  horizontal harder.
- **The cell type stays at `fontSize` (14px) across all three sizes**
  (`cellFontSize` = `cellFontSizeMD` = `cellFontSizeSM`) — in contrast to Polaris, which
  drops 14→13px on desktop.
- Fixed columns and headers use `z-index: 2` (a `zIndexTableFixed` literal).
- The selection column's width is `controlHeight` (**32px**) — the button height, reused.
- Header radius is `borderRadiusLG` (8px); the scrollbar radius is **100px**.
- Sort state gets three colour tokens — `headerSortActiveBg` · `headerSortHoverBg` ·
  **`bodySortBg`**. As in Naive UI, the sort emphasis reaches **into the body cells**.

### Navigation (`layout` · `menu` · `tabs` · `breadcrumb`)

| item | value |
|---|---|
| Sider width | **200px** (`Sider.props.width`) |
| Sider collapsed width | **80px** (`collapsedWidth`) |
| Sider background | **hardcoded `#001529`** (`siderBg`) · trigger `#002140` |
| Header height | `controlHeight × 2` = **64px** · inline padding `controlHeightLG × 1.25` = **50px** |
| Trigger height | `controlHeightLG + marginXXS × 2` = **48px** |
| Menu item height | `controlHeightLG` = **40px** · item spacing `marginXXS` (4px) |
| Menu collapsed width | `controlHeightLG × 2` = **80px** · icon 14 → 16px when collapsed |
| Menu dropdown width | **160px** |
| Tabs card height | SM `controlHeight` (32) · default `controlHeightLG` (40) · LG **48px** |
| Tabs item gap | **32px** (`horizontalItemGutter`) · padding `paddingSM` (12px) / 0 |
| Breadcrumb separator space | `marginXS` = **8px** |

- **The 80px collapsed width is the widest in the collected sample** (shadcn/ui, Carbon and
  Naive at 48 · Cloudscape 52–54 · Vuetify 56 · Semi 60). With a 16px icon that leaves 32px
  on each side.
- **The sider background is the literal `#001529`** — a colour pinned into the component
  token without passing through the seed or alias layers. The sider stays dark even in the
  light theme (a separate `lightSiderBg` is required to make it white). The **same goal,
  the opposite implementation** from Cloudscape, which reaches the same result by
  overriding 182 tokens in a `top-navigation` context.
- Tab card padding is **solved backwards from the height** —
  `(cardHeight − fontHeight) / 2 − lineWidth`. The value is not written down; the formula is.
- There is no XL for `controlHeightLG`, so **the LG card height is written directly as
  `controlHeightLG + 8`** (a source comment explains why).

### Feedback (`message` · `notification` · `alert` · `badge`)

| item | value |
|---|---|
| **Message duration** | **3 seconds** (`DEFAULT_DURATION`) · 8px top offset |
| Message width | **`max-content`** (no fixed width) |
| Message padding | `(controlHeightLG − fontSize × lineHeight) / 2` / `paddingSM` (12px) |
| **Notification width** | **384px** |
| **Notification duration** | **4.5 seconds** · default position **`topRight`** |
| Notification padding | `paddingMD` (20px) / `paddingContentHorizontalLG` (24px) |
| Notification progress bar | **2px** tall, `linear-gradient(90deg, …)` |
| Notification screen margin | `marginLG` = 24px |
| **Alert padding** | default `paddingContentVerticalSM` / **a fixed 12px** · with description 20 / 24px |
| Alert radius | `borderRadiusLG` = 8px · description icon `fontSizeHeading3` |
| **Badge** | height `round(fontSize × lineHeight) − 2 × lineWidth` = **20px** · dot 6px |
| Badge type | **12px / weight `normal`** · inline padding `paddingXS` (8px) |

- **Only the alert's horizontal padding is a 12px literal** — a source comment nails it down
  with `// Fixed value here.` It is the exception in a system where everything else derives
  from the seed.
- **The badge's font weight is `normal` (400)** — the only such case in the collected sample
  (Chakra and Vuetify use medium/500, PrimeVue 700, EUI medium).
- **Duration differs per component** — message 3 seconds, notification 4.5. Both are under
  five seconds, which conflicts at the code layer with the "five-second floor" observed in
  the documentation layer.
- Notifications include **a progress bar (a 2px gradient)** as a spec — a sample that makes
  visualising the remaining time a tokenised axis.

## Characteristic decisions

- **The scale is a function, not data.** Change just `sizeUnit` and `sizeStep` and the whole
  spacing scale recomputes. What Carbon applies only to typography, Ant Design applies
  system-wide. Theme customisation becomes powerful, at the cost of making individual steps
  of the scale hard to adjust.
- **The base font size is 14px**, unlike the Western systems that default to 16px. The same
  value as Material 3's Body Medium (14px) and Helios (13–14px).
  **In multilingual work this difference propagates through the whole layout.**
- **The radius is 6px.** Not the common 4px (Fluent medium) or 8px. The radius is
  deliberately decoupled from the spacing scale (multiples of 4).
- **Horizontal and vertical content padding are asymmetric.** Horizontal is always one step
  larger.
- **`size` and `sizeMS` hold the same value (16).** They are aliases, and in practice it is
  a source of confusion about which to use.

## Accessibility

Unverified.

## References

- Repository: https://github.com/ant-design/ant-design
- Package: `antd`
- Token logic: `lib/theme/themes/seed.js`, `lib/theme/themes/shared/genSizeMapToken.js`
