---
name: HeroUI (formerly NextUI)
org: HeroUI
coverage: partial
url: https://www.heroui.com
repo: https://github.com/heroui-inc/heroui
license: MIT
tech: [React, Tailwind]
figma_kit: true
tokens_format: [JS]
a11y_target: unverified
platform: web
domain: framework
verified: 2026-08-18
source: "npm @heroui/theme@2.4.26 → dist/default-layout.js"
---
<!-- lang-links -->
> **English** · [한국어](heroui.ko.md)
<!-- /lang-links -->

## In one line

A Tailwind plugin-style framework — it **adds an `inset` white edge to shadows in dark
mode**, and sets **hover opacity differently per mode, .8 in light and .9 in dark**. Its
radii are **8, 12 and 14px**, an odd-numbered top that does not sit on a 4px grid.

## Tokens — three layouts (default/light/dark)

```js
defaultLayout = {
  dividerWeight: '1px', disabledOpacity: '.5',
  fontSize:   { tiny .75rem · small .875 · medium 1 · large 1.125 },
  lineHeight: { tiny 1rem · small 1.25 · medium 1.5 · large 1.75 },
  radius:     { small 8px · medium 12px · large 14px },
  borderWidth:{ small 1 · medium 2 · large 3 },
  boxShadow:  { small · medium · large — three-layer combinations }
}
lightLayout = { hoverOpacity: '.8' }
darkLayout  = { hoverOpacity: '.9', boxShadow: { … with an inset white edge added } }
```

- **Dark shadows gain an `inset 0 0 1px rgb(255 255 255 / 0.15)`** — on a dark background
  a shadow alone does not reveal a surface's edge, so **an inner white hairline** is
  added. A different solution to the same problem as shadcn/ui (which switches borders to
  alpha in dark), and **putting a highlight inside the shadow is unique in the sample**
- **Hover opacity differs per mode** (light .8 / dark .9) — compensating for the same
  transparency reading stronger on a dark background. The only sample to tune the
  intensity of a state expression per mode
- **Radii 8/12/14px** — a top (14) off the 4px grid, with `small` already at 8px. Among
  the roundest of the recent frameworks' large-radius tendency (compared with Mantine and
  shadcn)
- Shadows are **three-layer combinations** (spread + shadow + a 1px outline) — one layer
  more than the Digital Agency's two
- Only four size names, `tiny` through `large` — the smallest family among the frameworks

## Component deep-dive — (2026-08-18)

Measured from the tailwind-variants (tv) definitions in the 46 files of
`@heroui/theme@2.4.26`'s `dist/components/*.js` — styles are distributed as **arrays of
Tailwind class strings** rather than CSS, and the values resolve through the layout
tokens (text-small = 14px, rounded-medium = 12px and so on).

### Buttons

| | sm | md | lg |
|---|:--:|:--:|:--:|
| **height** | 32px | **40px** | 48px |
| Horizontal padding | 12px | 16px | 24px |
| min-width | **64px** | 80px | 96px |
| Type | 12px | 14px | 16px |
| Radius | 8px | **12px** | 14px |

- **The radius grows with size, 8 → 12 → 14px** — the full generalisation of what
  Backpack does with inputs (8 → 12), where a size variant changes the radius too. With md
  already at 12px, its default button is among the roundest in the sample.
- **`scale(0.97)` on press** — `data-[pressed=true]:scale-[0.97]`, compressing the button
  by 3% through a GPU transform. A rare sample expressing press **geometrically** rather
  than by colour. Transitions are a uniform **250ms ease** with a `motion-reduce`
  exception.
- Seven variants (solid · bordered · light · flat · faded · shadow · ghost) crossed with
  six colours — tv compoundVariants expand this into a **42-cell matrix**.
- The 64px min-width matches MUI.
- Focus: on `data-focus-visible`, a 2px outline with a 2px offset, coloured by the `focus`
  token (blue-500) — React Aria's data-attribute state vocabulary used directly as
  selectors.

### Inputs

| | sm | md | lg |
|---|:--:|:--:|:--:|
| **height** | 32px | **40px** | 48px |
| Radius | 8px | 12px | 14px |

- **The height and radius progressions match the button's** (32/40/48 plus 8/12/14).
- The default variant is **flat** — filled with `bg-default-100`, **no border**. Hover
  goes to 200 and focus back to 100 — a minimalism where focus is signalled only by a
  background differential.
- The bordered variant's focus border is **default-foreground (an achromatic foreground)**
  rather than primary. A departure from the focus-equals-brand-colour convention (Naive,
  Prime and others).
- The underlined variant is a Material underline animation, with an `after` pseudo-element
  growing from **width 0 to 100%** from the centre.
- It has **ten slots** (base · label · mainWrapper · inputWrapper · innerWrapper · input ·
  clearButton · helperWrapper · description · errorMessage) — tv's slot system
  distributing classes across one component's entire DOM.

### Modals

| | Value |
|---|---|
| Width | xs 320 to 5xl 1024 plus full — **ten steps** (default md **448px**) |
| Radius | default lg = **14px** |
| Padding | header/footer 24/16px · body 24/8px |
| Scrim | default `bg-overlay/50` (black 50%) · a **blur variant** = backdrop-blur plus /30 |
| Motion variables | mobile slide-exit **80px** / desktop **scale-exit 103%** |

- **The widths are Tailwind's `max-w-*` scale as-is, in ten steps** — it inherits the
  utility scale rather than having a dedicated width scale (the Tailwind edition of MUI's
  "reuse the breakpoints", in contrast with Cloudscape's five steps and Semi's three).
  The default 448px sits in the same 440s convergence band as Semi's 448 and MUI's 444.
- **The default placement, auto, means bottom-aligned on mobile** (items-end) and centred
  from sm — the same component transforms between **a bottom sheet and a centre modal**
  depending on viewport. On exit, mobile slides 80px down while desktop **grows to 103%**
  as it disappears — the opposite direction from the shrinking exits of most samples
  (Semi 0.7, Naive 0.9, Prime 0.93).
- Three backdrops, transparent / opaque / **blur** — a rare sample where a blurred scrim
  is a first-class variant.

### Notable decisions (deep-dive)

- **Heights 32/40/48 plus radii 8/12/14, with buttons and inputs progressing identically**
  — the radius is size-dependent
- **`scale(0.97)` on press** — geometric press feedback
- Input focus as an achromatic border (bordered) or a background differential (flat) — a
  departure from brand-colour focus
- Ten Tailwind-inherited modal widths plus **automatic mobile bottom-sheet conversion**
- **An exit that grows (103%)** — the reverse of most samples' shrinking exits
- A blur backdrop as a first-class variant

## Notable decisions

- **An inset white highlight in dark shadows** — unique in the sample
- **Hover opacity separated per mode** (.8/.9) — unique in the sample
- Radii 8/12/14 — off-grid, large
- Three-layer shadow combinations
- Distributed as a Tailwind plugin (`plugin.js`) — the same inheritance camp as shadcn and
  Skeleton

## Accessibility

Unverified.

## Notes

- Tokens: `npm pack @heroui/theme@2.4.26` → `dist/default-layout.js`
- Component deep-dive: the same package's `dist/components/{button,input,modal}.js` plus
  `dist/plugin.js` (focus and overlay colours) (2026-08-18)
- **Still to confirm:** the colour palette (partly confirmed — focus = blue-500,
  overlay = #000; the full ramps are unexamined), spacing (presumed inherited from
  Tailwind — unverified), ~~the component list~~ (resolved 2026-08-18 — **46** tv modules
  measured in `dist/components`), and when the rename from NextUI happened
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `heroui.com` →
  `figma.com/community/file/1546526812159103429`
