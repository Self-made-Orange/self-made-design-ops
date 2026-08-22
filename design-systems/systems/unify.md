---
name: Unify
org: Tokopedia (GoTo)
coverage: partial
url: https://unify.tokopedia.com
repo: null
license: MIT
tech: [React, Android]
figma_kit: unverified
tokens_format: [JS, XML]
a11y_target: unverified
platform: [web, mobile]
domain: commerce
verified: 2026-08-18
source: "npm unify-tokens@0.0.4 → build/{spacing,typography,color,grid}.{js,xml} · npm unify-react-desktop@0.24.2 · unify-react-mobile@3.40.13 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](unify.ko.md)
<!-- /lang-links -->

## In one line

Tokopedia's system — the **second Southeast Asian sample**. It ships the same tokens
**in two formats at once, JS and Android XML** (including the px ↔ dp conversion),
specifies typefaces **per platform across five slots** (iOS SF Pro / Android Roboto),
and separates spacing from layout with `sp` and `ly` prefixes.

## Tokens — a dual JS + Android XML format

```js
// build/spacing.js
spacing = { sp2: 2px, sp4, sp8, sp16, sp24, sp32, sp40, sp48 }
layout  = { ly8, ly24, ly32, ly40, ly48, ly64, ly96, ly128 }
```

```xml
<!-- build/spacing.xml — the same values as an Android resource -->
<dimen name="spacing.sp2" category="spacing">2dp</dimen>
```

- **The web JS and the Android XML come out of the same source together** — `px`
  becomes `dp`. Unify is the only sample that distributes Android resource XML (TDS and
  Yoga are RN packages, not native resources)
- **The `sp` (component) / `ly` (layout) prefix split** — the layout-spacing separation
  camp, after Tegel (element/layout) · Vanilla (strip) · Pharos (gutter). Both are
  symmetric at eight steps
- Names carry the value directly (`sp16` = 16px) — the Primer style
- **There is no 12 or 20 in the spacing** (2·4·8·16·24·32·40·48) — core-compliant

### Typography — five platform typefaces plus value-names

```js
fontType = { stackHeading: 'Nunito Sans', desktop: 'Open Sans',
             lite: 'Open Sans', ios: 'SF Pro Text', android: 'Roboto' }
fontSize = { fz10 … fz38 }   // 10·12·14·16·18·20·24·28·34·38
lineHeight = { lh16 … lh44 }
fontWeight = { regular 400, bold 700, extraBold 800 }
```

- **Typefaces are specified across five platform and purpose slots** — `ios` and
  `android` are each OS's system font, and `lite` is for the lightweight web
  (Tokopedia Lite, for low-spec devices). **A separate typeface slot for low-spec
  devices is unique in the sample**, and it is where the device-spec distribution of
  the Southeast Asian market surfaces in the tokens
- Sizes run **10–38px in ten steps**, with unconventional top values like 34 and 38
- The weights include **800 (extraBold)** and have no 500 or 600

### Colour — N0–N700 plus one-letter ramp prefixes

```js
Neutral = { N0: #FFFFFF, N50, N75, N100, N150, N200, …, N700 }
Red = { R100, R200, R300, … }
```

**Colour names are a one-letter prefix plus a number** (`N`eutral · `R`ed). The
neutrals have **inserted intermediate steps** like `N50`, `N75` and `N150`, so the ramp
is uneven.

### Grid — breakpoints paired with gutters

```xml
breakpoint.mobile 768dp · tablet 1024dp · desktop 1200dp
gutter.mobile 8dp · tablet 12dp · desktop 16dp
```

The same judgement as Yoga (bundling width, margin and gutter) — breakpoints and
gutters kept together.

## Notable decisions

- **The second Southeast Asian sample** (after Gojek's Asphalt; both are GoTo group)
- **Dual JS + Android XML distribution** (px ↔ dp) — unique in the sample
- **A typeface slot for low-spec devices (`lite`)** — unique in the sample
- An 8:8 `sp`/`ly` spacing split
- Weights 400/700/800 (no intermediate weights)
- One-letter colour prefixes plus an uneven neutral ramp

## Component deep-dive — (2026-08-18)

`unify-react-desktop@0.24.2` (59 build directories) · `unify-react-mobile@3.40.13`
(86) — react-emotion CSS-in-JS. Measurements come from the serialised styled strings
in `build/<Component>/style.js`.

**The tokens the components consume are not `unify-tokens` (0.0.4) but a separate,
singular-named package, `unify-token@3.0.0`** (the `build/v2/` scheme). Even the
typeface differs — desktop is **'Open Sauce One'** rather than Open Sans (0.0.4 looks
like an older snapshot). And `unify-token` ships **CSS for three kinds of colour
blindness** (separate files for deuteranopia, protanopia and tritanopia) — the first
sample to distribute colour-vision-deficiency palettes in the token layer. The size
scale is identical at ten steps from 10 to 38px (only the names changed, `fz16` → a
level form, `fontSizeLv4`).

### Buttons — four heights, a single weight of 800

| micro | small | default | large |
|:--:|:--:|:--:|:--:|
| 24px | 32px | **40px** | 48px |

- 8px radius · padding 0 16px · **font-weight 800 (extraBold) throughout** — the token's
  800 is the button default (not 700).
- Type 12/14/16px (small/medium/large), transition
  **300ms cubic-bezier(0.63,0.01,0.29,1)** (`durationDefault` · `easeDefault`).
- Mobile buttons use a `:before` radial-gradient **ripple** — an Android convention
  ported to the web. The variant vocabulary is two axes, main/transaction ×
  filled/ghost (plus the legacy primary and secondary aliases).

### Inputs (TextFieldV2) — a floating label

- The label **shrinks from 14px to 12px and rises** on value or focus — a
  Material-style floating label (300ms ease-in-out transition).
- The input itself has border 0 · padding 12px 0 · 14px Regular / 20px line height —
  the border is the wrapper's job.

### Modals — no width presets

- desktop `Modal`: width, height and minimums are all props — **zero presets** (the
  opposite pole from Backpack's two and Cloudscape's five). 8px radius, content padding
  24px 32px 32px, shadow 0 1px 4px rgba(#7C8597,.4), 32px close button.
- mobile `Dialog`: a centred card with slots for a 180px illustration or an 80px icon,
  padding (30|24)px 16px 16px.

### Focus — dotted purple

`:focus-visible` → **outline 2px dotted #9342ED (PN500), offset 3px** — a dotted focus
is rare in the sample, and the colour is from the brand purple family.

## Accessibility

~~Unverified.~~ → The token layer carries **palette CSS for three kinds of colour
blindness** (two red-green plus blue-yellow) (`unify-token@3.0.0` — see the deep-dive
above). Beyond that, no target is confirmed.

## Notes

- Tokens: `npm pack unify-tokens` (0.0.4) → `build/` — but **the tokens actually in use
  are `unify-token@3.0.0`** (see the deep-dive above, 2026-08-18)
- Components: `unify-react-desktop@0.24.2` · `unify-react-mobile@3.40.13` ·
  `unify-icons` (distributed separately) — ~~component list~~ → measured (see the
  deep-dive above)
- **Still to confirm:** the full colour ramps, ~~why the version is 0.0.4~~ → confirmed
  that `unify-tokens` is a secondary distribution, since the components consume
  `unify-token` (singular, v3). Radius and shadow tokens are absent from
  `unify-token@3.0.0`'s `build/v2/` as well (there are only colors, grids, motions,
  spacings and typographies) — the 8px radius is hard-coded in the components
