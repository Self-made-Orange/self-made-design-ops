---
name: Naive UI
org: Open source (out of TuSimple)
coverage: partial
url: https://www.naiveui.com
repo: https://github.com/tusen-ai/naive-ui
license: MIT
tech: [Vue, TS]
figma_kit: false
tokens_format: [JS]
a11y_target: "confirmed absent (2026-08-18 — no WCAG or accessibility target mentioned on any documentation page)"
platform: web
domain: framework
verified: 2026-08-18
source: "npm naive-ui@2.45.0 → es/_styles/common/{_common,light,dark}.mjs · es/{data-table,menu,tabs,breadcrumb,message,notification,alert,badge}/styles/ + es/layout/src/LayoutSider.mjs (tables, navigation and feedback measured, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](naive-ui.ko.md)
<!-- /lang-links -->

## In one line

The second Vue framework sample — it **does not enumerate neutrals, composing them at build
time from two colours (white and black) and a table of some twenty alphas**, its `strong`
weight is **500**, and its default primary is **green** (#18a058).

## Tokens

### The neutrals are a formula

```js
alphaBorder: "0.12", alphaDivider: "0.06", alphaPending: "0.05",
alphaDisabled: "0.5", alphaScrollbar: "0.25", …  // about twenty of them
neutral(alpha) → composite(white background, black × alpha)   // composed at build time
```

**There is no grey ramp** — every neutral is composed from `neutralBase` (#FFF),
`neutralInvertBase` (#000) and **a table of alpha constants**. Going further than Ring UI
(channel separation) and shadcn (alpha borders), it is the only sample **whose palette
itself is a formula**. Dark swaps only the bases against the same alpha table.

### Sizes and weights — several mismatches

```
fontSize: Mini 12 = Tiny 12 · Small 14 = Medium 14 · Large 15 · Huge 16
fontWeightStrong: 500 · borderRadius: 3px · lineHeight: 1.6
height: 16/22/28/34/40/46 (stepping by 6px)
```

- **Mini = Tiny, Small = Medium** — the second sample with duplicate scale values, after
  Vibe
- **`strong` is 500** — a weight name-value mismatch, after Ring UI (bold = 600). A choice
  to use 500 rather than 700 as "emphasis" in a CJK context
- **Large is 15px** — odd-numbered. The 14px default makes it the third Greater China
  sample (Ant, Semi, Naive)
- Control heights step by **6px** (medium 34px) — neither a multiple of 8 nor of 4
- Default radius 3px — the odd-number radius camp (Helios, Semi, Shoelace)

### The primary is green

`#18a058` — Naive is the only sample whose default primary is not blue. It brightens to
`#63e2b7` in dark (the same direction as Siemens iX).

## Component deep-dive — (2026-08-18)

Measured from `naive-ui@2.45.0`'s per-component style modules
(`es/*/styles/{_common,light}.mjs` — each component ships its own token object) and the
structural CSS-in-JS (`es/*/src/styles/index.cssr.mjs`).

### Buttons

| | tiny | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | **34px** | 40px |
| Horizontal padding | 6px | 10px | 14px | 18px |
| Type | 12px | 14px | 14px | 15px |

- Heights step by 6px and padding by 4px — **the two axes step differently**. The round
  variant adds 4px to each padding. The radius is 3px at every size.
- **The default button has no background** — it starts as `color: "#0000"` (transparent)
  plus a 1px grey border, and on hover the background still does not change: **only the
  text and border** take the primary hover colour. A rare sample whose default is
  effectively a ghost.
- The secondary/tertiary/quaternary variants are `rgba(46,51,56, .05/.09/.13)` — carving
  state out of **three steps of black alpha**. The shared tokens' alpha-formula philosophy
  holds all the way into the component layer.
- On click, a **box-shadow ripple**: a ring spreading `0 0 0.5px` → `0 0 0.5px 4.5px` over
  0.6s — not Material's internal ripple but **the Ant family's outward wave**.
- The button weight is 400 (the fontWeight default) — it does not even use 500 (strong).

### Inputs

| | tiny | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | 34px | 40px |
| Horizontal padding | 8px | 10px | 12px | 14px |

- **The four heights are exactly the button's** (22/28/34/40).
- The background is `neutral(alphaInput = 0)` = **fully transparent** — the input
  background is registered in the alpha table at alpha 0. Only a 1px border
  (rgb 224,224,230) draws the surface.
- Focus: a primaryHover (#36ad6a) border plus **a `0 0 0 2px` ring of primary at 20%** —
  the caret is primary too. The entire focus grammar is the brand colour (green).

### Modals — three tokens, presentation delegated

The Modal itself has **only three tokens** (color, textColor, boxShadow). Its actual
presentation **references other components' themes** through `peers: { Dialog, Card,
Scrollbar }` — a structure where the theme tree is a dependency graph between components.

| Dialog | Value |
|---|---|
| Width | **a single 446px** (max-width calc(100vw − 32px)) |
| Padding | **16px 28px 20px 28px** — vertically asymmetric |
| Title | 18px / **500** (fontWeightStrong) |
| Entry/exit | 0.2s, scale 0.9 ↔ 1 |

- **There is one width step** — 446px. The same 440s convergence as Semi's 448 and MUI's
  444, but with no scale at all.
- The title weight is 500 — the `strong = 500` mismatch running all the way into the
  heading hierarchy.
- The easing is **symmetric in duration and asymmetric in curve**: entry easeOut
  (0,0,.2,1) / exit easeIn (.4,0,1,1) — a textbook application of the Material convention,
  adjusting the opposite axis from MUI (225/195 — asymmetric in time).

### Tables (`data-table`) — three sizes, but medium and large are identical

`naive-ui@2.45.0` `es/data-table/styles/_common.mjs` and `light.mjs`.

| Item | small | medium | large |
|---|:--:|:--:|:--:|
| `thPadding` | **8px** | **12px** | **12px (identical)** |
| `tdPadding` | 8px | 12px | **12px (identical)** |

- **The cell padding is the same for medium and large.** The size axis is exposed as three
  steps while the actual values are only two — a case in the harvested sample of the size
  steps and the value steps disagreeing.
- The colour tokens are **`composite(cardColor, …)` formulas** — `tdColorHover`,
  `tdColorStriped` and `thColorSorting` are all made by compositing alpha over the card
  background. Inside a modal, `-Modal` suffixed tokens recompose against `modalColor`
  instead — **recalculation per container background, expressed in the token names**.
- **The sorted column has its own background** (`thColorSorting` · `tdColorSorting`) — not
  just the header but **the body cells** change colour. A case in the harvested sample of
  emphasising the entire sorted column, with wider reach than Carbon's
  (`table-sort--active` header background).
- Sort icons **15px** (`sorterSize`) and filters 15px — odd icon sizes.
- Column resizing: a **2px** indicator (`resizableSize`) inside an **8px** handle area
  (`resizableContainerSize`).
- Empty-state padding `48px 0`, 12px above the pagination, action-bar padding 8/12px.

### Navigation (`layout-sider` · `menu` · `tabs` · `breadcrumb`)

| Item | Value |
|---|---|
| Sider width | **272px** (`LayoutSider.props.width`) |
| Collapsed sider width | **48px** (`collapsedWidth`) |
| Collapse method | `collapseMode: 'transform'` by default |
| Menu item height | **42px** (`itemHeight`) |
| Menu indent | **32px** (`indent`) · root indent **24px** (`rootIndent`) |
| Tab (line) padding | small `6px 0` · medium `10px 0` · large `14px 0` |
| Tab gap | **36px** (`tabGap*Line` / `*Bar`) · 8px vertical |
| Tab (card) padding | 8/16 · 10/20 · 12/24px · 4px card gap |
| Tab type | 14 / 14 / **16px** |
| Breadcrumb active weight | **400** (`fontWeightActive`) |

- **The 272px sider is the widest expanded width in the harvested sample**
  (Ant 200 · Semi 240 · shadcn/ui, Carbon and Vuetify 256 · Cloudscape 280 next).
- **The indent differs between root (24) and children (32).** Most use a single value
  (Vuetify 16 · PrimeVue 16 · Cloudscape 20 · Carbon 32).
- The 36px tab gap is the largest in the harvested sample (Blueprint 20 · Semi 24 ·
  Ant 32).
- **It does not bold the active breadcrumb** (`fontWeightActive: 400`) — the current
  position is distinguished by colour alone rather than weight.

### Feedback (`message` · `notification` · `alert` · `badge`)

| Item | Value |
|---|---|
| **Message width** | **min 420px / max 720px** |
| Message padding | **10 / 20px** · 8px below between items |
| **Message default duration** | **3000ms** (`MessageProvider.props.duration`) |
| Message placement | **`'top'`** by default |
| Message icon and close | 20px / 20px (icon 16px) |
| **Notification width** | **365px** · padding **16px** |
| Notification type | title 16px · meta and body **12px** |
| **Alert padding** | **13px** · icon 24px (margin `11px 8px 0 12px`) |
| Alert close | 20px (icon 16px), margin `13px 14px 0 0` |
| **Badge** | count height and line height **18px** · dot **8px** · type 12px |

- **The alert padding is 13px** — an odd value off any multiple of 4 or 8, and the icon
  margin `11px 8px 0 12px` differs on all four sides. Optical alignment pinned as literals.
- **The 3000ms message default** is a code-layer sample of a sub-five-second duration (the
  same value as Tizen CircularUI's 3000ms).
- **Messages and notifications have different width specifications** — messages are fluid
  between min and max (420–720px), notifications fixed at 365px. Two toast-family
  components in the same system using different strategies.
- Messages sit **top-centre** while notifications take a `placement` prop — the same family
  as Semi (top-centre).

### Notable decisions (deep-dive)

- **Buttons and inputs sharing four heights (22/28/34/40)** — stepping by 6px
- **The default button is a ghost** — no background even on hover, only the colour changes
  (and the weight is 400)
- State fills as three steps of black alpha (.05/.09/.13) — the component edition of the
  alpha-formula philosophy
- A click wave (an outward ripple) — the Ant lineage
- A single 446px modal width plus the peers delegation structure
- Asymmetric entry/exit curves with symmetric durations

## Notable decisions

- **Neutrals = two colours plus an alpha table** — the only sample whose palette is a
  formula
- `strong` = 500 — the second weight mismatch
- The third Greater China 14px sample · line height 1.6 (loose, for CJK)
- Control heights stepping by 6px · a green default primary

## Accessibility

~~Unverified.~~ → **confirmed absent (2026-08-18, headless render).**

Even rendered, this system publishes no accessibility target. The documentation site was
opened headlessly to confirm — the left navigation's documentation entries are only
Introduction · Installation · Usage in SFC · UMD · Fonts · Import on Demand ·
**Supported Platforms** · Common Issues · Controlled & Uncontrolled · JSX/TSX · SSR ·
Nuxt.js · Vitepress · Vite SSG · Customizing Theme · i18n · Create Themed Component ·
Potential Style Conflict · Third-Party Libraries · Changelog, and **there is no
accessibility (无障碍 / 可访问性) document at all.** Even "Supported Platforms", which
covers scope of support, speaks only of browsers and Vue versions ("IE is not supported.
Modern browsers such as Edge, Firefox, Chrome, Safari are tested on the latest 2
versions"). Across every documentation page rendered, the string `WCAG` appears **zero
times**.
Sources: https://www.naiveui.com/en-US/os-theme/docs/introduction ·
https://www.naiveui.com/en-US/os-theme/docs/supported-platforms (rendered 2026-08-18)

A shape that recurs in framework-style open source (the shadcn and Ring UI family), where
adopting an accessibility target is pushed onto the product side.

## Notes

- Tokens: `npm pack naive-ui@2.45.0` → `es/_styles/common/`
- Component deep-dive: the same package's `es/{button,input,modal,dialog}/styles/` plus
  `src/styles/index.cssr.mjs` (2026-08-18)
- **Figma kit — confirmed absent (2026-08-18, headless render):** the design file offered
  by `Resources > Design Resources` at the top of the documentation site is **a single
  Sketch file** (`NaiveUI-Design-Library-en-US.sketch`, behind a download button). Across
  the full site render the string "Figma" appears **zero times** — there is no Figma kit.
  **A rare sample distributing its design kit in Sketch only.**
  Source: https://www.naiveui.com/en-US/os-theme (rendered 2026-08-18; the link target is
  `https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library-en-US.sketch`)
- **Still to confirm:** ~~the accessibility target~~ ~~the Figma kit~~ (2026-08-18 — both
  confirmed absent by rendering the documentation site), ~~the spacing scheme (absent from
  the shared tokens — per-component unexamined)~~ (partly resolved 2026-08-18 — there is no
  global scale, and it is confirmed as literals in each component's `_common.mjs`, such as
  the button's 4px-stepping padding), ~~the component list (reported as 90+ — unverified)~~
  (resolved 2026-08-18 — **105** component directories measured under `es/`, including
  helpers)
