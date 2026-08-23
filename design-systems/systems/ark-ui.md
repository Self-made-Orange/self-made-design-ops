---
name: Ark UI
org: The Chakra team (Segun Adebayo and others)
coverage: partial
url: https://ark-ui.com
repo: https://github.com/chakra-ui/ark
license: MIT
tech: [React, Vue, Solid, Svelte]
figma_kit: false
tokens_format: []
a11y_target: "WCAG (no version or level stated — confirmed 2026-08-18)"
platform: web
domain: framework
verified: 2026-08-23
source: "npm @ark-ui/react@5.39.0 → package/dist/components (74), package.json dependencies"
---
<!-- lang-links -->
> **English** · [한국어](ark-ui.ko.md)
<!-- /lang-links -->

## In one line

**A system with no tokens at all** — 68 unstyled headless primitives (`@zag-js/*` state
machines) wrapped and shipped as 74 components. `anatomy` (the definition of part names) is
effectively the only public contract.

## Why it is in the corpus

It is **the extreme case of "a design system may have no tokens."**
It adds a **fourth kind — no style layer whatsoever** — to the three kinds of missing
spacing in `platforms.md` (doesn't define it / inherits it / doesn't enumerate it).

- There is no token file, and no CSS is shipped either (0 `.css` files)
- It exposes **`anatomy`** — the definition of the part names a component is made of
  (`root`/`trigger`/`content` …), onto which a styling library attaches values.
  **Park UI (a Panda preset) and Chakra v3 sit on top of it**
- The state machines are **split across 68 `@zag-js/*` packages** — component behaviour
  (focus trapping, keyboard navigation, ARIA) implemented independently of any framework
- **Four frameworks supported — React, Vue, Solid, Svelte** — the widest distribution in the
  sample alongside Siemens iX (Web Components + 3 wrappers), reached here by sharing state
  machines

## The corpus's dependency relationships, laid out

```
Ark UI (behaviour, anatomy)
  ├── Park UI      = Ark UI + a Panda CSS preset + the Radix Colors palette
  └── Chakra UI v3 = rewritten on top of Ark UI (systems/chakra-ui.md)

Radix Primitives (behaviour)
  ├── shadcn/ui    = Radix Primitives + Tailwind tokens
  └── Radix Themes = Radix Primitives + its own style layer
```

**Two lineages separate behaviour from style** (Ark / Radix Primitives), and each carries
two styling systems on top — a structure confirmed within the corpus.

## Components

**74** (accordion · angle-slider · carousel · clipboard · collapsible · color-picker ·
combobox · date-picker · file-upload · pin-input · qr-code · signature-pad · toast · toc ·
tour · tree-view and more). It includes specialised components like `angle-slider`,
`signature-pad` and `tour`.

## Components in depth — (2026-08-18)

Because it is headless, the subject of the deep pass is not visual values but the
**contract structure**. Measured from `@ark-ui/react@5.38.2` plus the pinned
`@zag-js/*@1.43.1`.

### No visual values — confirmed

- 0 `.css` files, re-confirmed. The only style string in the package is the
  `margin:0; padding:0; box-sizing:border-box` reset the `frame` component injects into its
  iframe — **there is not a single dimension, colour or type value in the entire package**.
  "Measuring the values" of buttons, inputs and modals does not apply here; what follows
  takes that place as the structural contract.

### The style contract — a three-layer data-attribute grammar

`createAnatomy(name).parts(…).build()` from `@zag-js/anatomy` generates, for each part,
`attrs: { "data-scope": "dialog", "data-part": "content" }` and the selector
`[data-scope="dialog"][data-part="content"]` — a styling library attaches itself through
**attribute selectors, not classes**. The state vocabulary has three layers:

| layer | attribute | value |
|---|---|---|
| identity | `data-scope` / `data-part` | component/part name (kebab) |
| discrete state | `data-state` | `"open"` / `"closed"` etc. |
| boolean state | `data-disabled` `data-invalid` `data-readonly` `data-required` … | presence, no value |

### The modal's place — Dialog

- The anatomy has **7 parts**: trigger · backdrop · **positioner** · content · title ·
  description · closeTrigger. The positioner is a part of its own — a design that
  **pushes placement (centred, bottom-anchored) onto the style layer**, in structural
  contrast to systems where the CSS owns placement (Semi, Naive).
- The state machine has **two states, open/closed**. Behavioural options: trapFocus ·
  preventScroll · restoreFocus · closeOnEscape · closeOnInteractOutside. A `role` prop
  switches between dialog and alertdialog, and aria-modal, aria-labelledby and
  aria-describedby are wired in.
- Enter and exit are handled by the **Presence** utility: `data-state` plus
  `unmountOnExit` · `lazyMount` · `skipAnimationOnMount` — it ships no animation values,
  only **the timing hook that waits for the CSS animation to finish before unmounting**.

### The button's and input's place — no Button, and Field

- **There is no button component** — evidence of the principle that elements needing no
  state machine do not get built (button is absent from all 61 directories, while toggle
  and download-trigger are present).
- Inputs are wrapped by **Field** — **8 parts**: root · **input · textarea · select**
  (one anatomy covering all three form elements) · label · helperText · errorText ·
  requiredIndicator. State is four booleans (data-disabled/invalid/readonly/required), with
  invalid double-marked alongside aria-invalid.

### The scale, re-measured

- **67 dependencies = 66 `@zag-js/*` + 1 `@internationalized/date`** — all of them state
  machines, zero general-purpose utilities.
- The 73 entries in `dist/components` break down as **61 component directories + 12 barrel
  files** (anatomy, factory and index in four formats each). Of the 61, **51 expose an
  anatomy**; the other 10 are behavioural utilities — portal · presence · focus-trap ·
  client-only · format · frame and so on.

### Characteristic decisions (from the deep pass)

- **Zero visual values, confirmed** — the only CSS string is frame's iframe reset
- The style contract is **data-scope/part/state attribute selectors** (not classes)
- **A positioner part** — even placement is outsourced to the style layer
- **No button** — elements without a state machine do not get built
- Presence — unmount timing without animation values
- Field covers input, textarea and select under one anatomy

## Characteristic decisions

- **0 tokens · 0 CSS** — the only sample with no style layer at all
- `anatomy` (part names) as the contract with a styling library
- State machines split across 68 packages (`@zag-js/*`)
- Four frameworks supported — in the widest-distribution group
- The shared foundation under Park UI and Chakra v3

## Accessibility

~~Keyboard and ARIA behaviour is implemented in the state machines, but **the target level
and the verification method are unverified**.~~
→ **Claims WCAG compliance (resolved 2026-08-18 — with no version or level given).**
Source: github chakra-ui/ark → `README.md` — "WCAG compliant components tested with
real assistive technologies out of the box". It says only that verification uses real
assistive technology; the tools and reports are not published.

## References

- Package: `npm pack @ark-ui/react@5.38.2` (+ `@zag-js/dialog@1.43.1` ·
  `@zag-js/anatomy@1.43.1` — used in the 2026-08-18 deep pass)
- **Open questions:** ~~the part structure of all 73 components~~ (partly resolved
  2026-08-18 — the deep pass confirms 51 expose an anatomy and measures Dialog's 7 parts
  and Field's 8; the remaining 49 were not enumerated), the accessibility verification
  method, how much code is shared with Chakra v3

> Re-verified (2026-08-17): 5.38.1 → 5.38.2 patch — this entry ships anatomy without tokens or CSS, so no values are affected. Pin updated only.

## Drift record — 5.38.2 → 5.39.0 (2026-08-23)

**The first minor in this freshness pass that moved a recorded number.** Re-measured:

| | 5.38.2 | 5.39.0 |
|---|:---:|:---:|
| `dist/components` entries | 73 | **74** |
| — component directories | 61 | **62** |
| — barrel files | 12 | 12 |
| dependencies | 67 | **69** |
| — `@zag-js/*` | 66 | **68** |
| — other | `@internationalized/date` | ← |
| pinned `@zag-js/*` | 1.43.1 | **1.43.3** |

One component was added: **`toc`**, a directory that re-exports its anatomy from
`@zag-js/toc` (`toc.anatomy.js` is two lines), with the parts nav · list · item · link ·
content · indicator · title · root. Counting it, the anatomy-exposing directories go 51 → 52;
nothing else under `dist/components` changed.

**Two `@zag-js/*` packages were added but only one component** — `@zag-js/hotkeys` has **no
component directory**. The "zero general-purpose utilities" observation in the deep pass above
was measured at 5.38.2 and this entry does not extend it to 5.39.0; what is measured here is
that the dependency exists and no wrapper for it ships.

The deep-pass section above stays pinned to `@ark-ui/react@5.38.2` + `@zag-js/*@1.43.1`, the
versions its part-structure measurements were taken from.
