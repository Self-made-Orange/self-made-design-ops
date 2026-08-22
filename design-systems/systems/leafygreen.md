---
name: LeafyGreen
org: MongoDB
coverage: partial
url: https://www.mongodb.design
repo: https://github.com/mongodb/design
license: Apache-2.0
tech: [React, Emotion]
figma_kit: true
tokens_format: [JS]
a11y_target: "WCAG 2.1 + Section 508 (no level stated — confirmed 2026-08-18)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @leafygreen-ui/tokens@4.2.2 → dist/esm/index.js · npm @leafygreen-ui/button@25.2.1 · @leafygreen-ui/modal@22.0.1 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](leafygreen.ko.md)
<!-- /lang-links -->

## In one line

MongoDB's system — the colour tokens are a **three-dimensional property × role × state
structure** (`background.primary.hover`), and the spacing numbers are **px × 25**
(`spacing[100]` = 4px).

## Tokens

### Colour is three-dimensional

```js
Property: Background · Border · Icon · Text
Variant:  Primary · Secondary · Tertiary · InversePrimary · Info · Warning ·
          Error · Success · Link · OnInfo · OnError · OnSuccess … (17 of them)
InteractionState: Default · Hover · Focus
→ color[theme][property][variant][state]
```

**A structure unique in the sample, holding 4 properties × 17 roles × 3 states as
enumerated axes.** Most systems attach the state as a suffix to a single semantic name
(`border-hover`); LeafyGreen **separates state into its own dimension** and reads it as
a lookup. The opposite solution to the same problem Ring UI solved by enumerating
compound states in the name.

### Spacing — the number is px × 25

```js
spacing = { 0:0, 25:1, 50:2, 100:4, 150:6, 200:8, 300:12, 400:16, 500:20, 600:24,
            800:32, 900:36, 1000:40, 1200:48, 1400:56, 1600:64, 1800:72 }
            (+ legacy keys 1–7 = 4/8/16/24/32/64/88 coexisting)
```

Since `100` is 4px, **the number is px × 25** — adding a **seventh numeric basis** to
the "sixteen ways to say the same 16px" table in `tokens/scales.md` (real px / tens /
rem×100 / rem×12.5 / rem×200 / multiples of 4 / multiples of 8 / ordinals / **px×25**).

~~The scale ends at 24px — anything larger is handled without tokens.~~
(Corrected 2026-08-18 — re-measuring the same tokens@4.2.2 shows it **continues to
1800 (72px)**. The original record misread the `borderRadius` map (0–600, see the
deep-dive below) as spacing. The legacy ordinal keys 1–7 coexisting in the same object
puts it in **a dual-naming transition** state.)

### Breakpoints

`Mobile 320 · Tablet 768 · Desktop 1024 · XLDesktop 1440` — four steps. Unlike USWDS
these are independent values rather than derived from the spacing.

## Component deep-dive — (2026-08-18)

Components are split across many packages. The emotion style JS of
`@leafygreen-ui/button@25.2.1` · `text-input@16.2.3` (whose styling is delegated to its
dependency `form-field@4.0.9`) · `modal@22.0.1` was parsed. The shared tokens are
`tokens@4.2.2`.

### Buttons (`@leafygreen-ui/button@25.2.1`)

| | xsmall | small | default | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | **36px** | 48px |
| Horizontal padding | 7px | 11px | 11px | 15px |
| Type | **12px uppercase** | 13/16px | 13px or 16px | 18px |

- **The padding comment states the border subtraction** — the code reads
  `padding: 0 11px; // 12px - 1px border`. The 1px subtraction MUI applies only to
  outlined is applied to every variant here (the border is always
  `1px solid transparent`).
- Radius **6px**, with the inner state overlay at **5px = 6−1** — even the radius inside
  the border is compensated.
- **Only xsmall (22px) is uppercase, with 0.4px letter-spacing and semiBold** — a rare
  case of a size variant changing the typographic style as well.
- The base type is a prop (`baseFontSize`) toggling 13/16px — the token section's dual
  body1 (13) / body2 (16) basis surfacing as a component API.
- Transition `all 150ms ease-in-out` (`transitionDuration.default`). **No min-width.**
- Six variants: default · primary · primaryOutline · danger · dangerOutline · baseGreen.

### Inputs (`text-input@16.2.3` → `form-field@4.0.9`)

| | xsmall | small | default | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | **36px** | 48px |
| Horizontal padding | 8px | 8px | 12px | 12px |

- **Buttons and inputs share all four heights, 22/28/36/48** — a wider alignment than
  Backpack (which shares two, 36/48). The 1px border and 6px radius match the button too.
- The label is a **separate block element** rather than floating (`Label` from the
  `typography` package).
- Focus and hover are **box-shadow ring tokens** (`focusRing` / `hoverRing`) rather than
  a border colour — `transition-property: border-color, box-shadow`.

### Modals (`@leafygreen-ui/modal@22.0.1`) — a native `<dialog>` plus @starting-style

| size | Width |
|---|---|
| small | 400px |
| **default** | **600px** |
| large | 720px → **960px** (above 1025px) |

- **Only large is responsive across two steps** (720/960) — a breakpoint intervening in
  a width step.
- Padding **40px 36px** (`spacing[1000]` / `spacing[900]`) — a rare arrangement with
  more vertical than horizontal.
- Radius **24px** (`borderRadius[600]`) — four times the button and input (6px).
  **`borderRadius` exists as its own nine-step scale on the same px×25 numbering as the
  spacing** (0–600 = 24px) — one of the few samples to tokenise radii as a full scale.
- Transitions: `opacity 150ms ease-in-out` plus
  **`overlay` / `display 150ms allow-discrete`** — the first sample to handle `<dialog>`
  display transitions with 2024-and-later CSS, together with `@starting-style`. The
  scrim is `transparentize(0.4, black)` = rgba(0,0,0,0.6), also 150ms.
- The close button's position is a literal **18px** rather than a token.

### Notable decisions (deep-dive)

- **Buttons and inputs share all four heights (22/28/36/48)** — the most steps aligned
  in the sample
- **Border-subtracted padding written into a comment**, plus the inner radius
  compensated at 5 = 6−1
- **Radii as an independent nine-step scale on px×25 numbering** — naming unified with
  the spacing
- **`<dialog>` + @starting-style + allow-discrete** — at the front of adopting current
  CSS
- A single transition duration (150ms) running through buttons, inputs, modals and the
  scrim alike

## Notable decisions

- **Three-dimensional colour (property × role × state)** — unique in the sample
- Spacing number = px × 25 — the seventh numeric basis
- ~~The scale ends at 24px~~ (corrected 2026-08-18 — it runs to 1800 = 72px; see the
  token section)
- An `On*` family in the roles (OnInfo, OnError…) — vocabulary borrowed from M3

## Accessibility

~~Unverified.~~ → **WCAG 2.1 + Section 508 (resolved 2026-08-18 — no level is stated).**
Source: `mongodb.design/foundations/accessibility` — "accessibility requirements
outlined in Section 508 of the WCAG 2.1". **The original wording conflates the two
standards** (Section 508 is not a sub-clause of WCAG) — it is transcribed as written.

## Notes

- Tokens: `npm pack @leafygreen-ui/tokens@4.2.2` → `dist/esm/index.js`
- The palette is a separate package, `@leafygreen-ui/palette@5.0.2`
- Component deep-dive: `@leafygreen-ui/button@25.2.1` · `text-input@16.2.3` ·
  `form-field@4.0.9` · `modal@22.0.1` (parsed from the dist/esm emotion styles,
  2026-08-18)
- **Still to confirm:** real palette values, the full type scale (only body1 13/20 and
  body2 16/28 confirmed), and the component list (split across many packages — no
  exhaustive listing yet)
- **Figma kit confirmed (2026-08-18):** `figma_kit: true` — `mongodb.design` →
  `figma.com/design/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System`
