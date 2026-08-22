---
name: TDS (Toss Design System)
org: Toss (Viva Republica)
coverage: full
url: https://tossmini-docs.toss.im
repo: null
license: Not stated (no license field or LICENSE file in the main packages — only tds-react-native is Apache-2.0, confirmed 2026-08-18)
tech: [React, React Native]
figma_kit: unverified
tokens_format: [JS, CSS]
a11y_target: Unverified (iOS Dynamic Type support is built in — see below)
platform: [web, mobile]
domain: consumer
verified: 2026-08-17
source: "npm @toss/tds-colors@0.1.0 + @toss/tds-typography@0.0.3 + @toss/tds-easings@0.0.1 + @toss/tds-mobile@2.5.1. @toss/tds-mobile-ait for mini apps is separate"
---
<!-- lang-links -->
> **English** · [한국어](toss-tds.ko.md)
<!-- /lang-links -->

## In one line

Toss's design system — **published to npm in split packages alongside the mini-app
(Apps-in-Toss) SDK**.
It **tokenises springs as physical parameters**, embeds **a table remapping sizes per
accessibility font scale**, and its type runs **32 continuous 1px steps from 11 to 42px**.

> **A correction to the record.** This corpus twice recorded "Toss has no npm token package"
> (from probing the single name `@toss/tds`). **That was wrong** — it ships **split across
> packages**: `@toss/tds-colors` · `-typography` · `-easings` · `-spring-easing` · `-mobile` ·
> `-react-native` and **`-mobile-ait`** (for Apps-in-Toss).
> A limitation of single-name probing, recorded as a lesson in `HARVESTING.md`.

## Tokens

### Motion — springs as physical parameters

```js
spring: {
  basic:  { stiffness: 200,  damping: 30, mass: 1 },
  small:  { stiffness: 480,  damping: 50, mass: 1 },
  quick:  { stiffness: 800,  damping: 55, mass: 1 },
  medium: { stiffness: 270,  damping: 25, mass: 1 },
  large:  { stiffness: 100,  damping: 15, mass: 1 },
  slow:   { stiffness: 70,   damping: 20, mass: 1 },
  rapid:  { stiffness: 1000, damping: 55, mass: 1 },
  bounce: { stiffness: 300,  damping: 15, mass: 1 },
}
```

**The third spring representation in the sample, and the only physics-based one.**

| approach | system | character |
|------|--------|------|
| one `linear()` with 65 stops | Atlassian | the curve approximation precomputed |
| `linear()` in 5 steps | Open Props | 〃 |
| **8 presets of physical parameters** | **TDS** | **computed at runtime** (a `getSpringEasing` function ships alongside) |

**Stiffness 70–1000 and damping 15–55 — the eight presets cover the stiffness/damping
space.** `bounce` (300/15) has low damping and oscillates several times, while `rapid`
(1000/55) settles immediately.
Having presets by element size (`small`/`medium`/`large`) is the same judgement as
Atlassian's per-component durations, made in spring space.

There are five beziers too — `expo` at `(0.16, 1, 0.3, 1)` is **the same curve as Radix
Themes' dialog easing**, and `back` (0.34, 1.56, 0.64, 1) has a 1.56 overshoot.

### Typography — 11–42px continuous in 1px, with four companions at each size

```js
fixedTypographySizeMap["17"] = {
  text:  { fontSize: 17, lineHeight: 25.5 },
  icon:  { height: 19 },
  badge: { fontSize: 10, padding: [3,7], borderRadius: 9 },
  link:  { verticalPadding: 0, horizontalPadding: 4,
           borderRadius: 4, lightThickness: 0.7, boldThickness: 1 },
}
```

- **The sizes run continuously from `11` to `42`, 32 steps** — the densest 1px scale in the
  sample (well beyond Seed Design's 18 steps and USWDS's 12–18 stretch).
  The two Korean systems (Seed and TDS) are first and second in the 1px-step camp
- **The line height is exactly ×1.5 at every step** (11→16.5, 17→25.5), with fractional
  values left as they are — the opposite choice from a 4px grid (Atlassian)
- **Each size carries an icon height, badge spec and even a link underline with it** —
  the only sample to tokenise **the spec of accompanying elements**, as in "the icon beside
  text at this size is 19px"
- **The link underline thickness is a token** — `lightThickness: 0.7` /
  `boldThickness: 1`. A 0.7px sub-pixel underline. Unique in the sample

The role tier is `t1`–`t7` plus `st1`–`st13`, **20 steps**, mapped onto the fixed sizes
through a CSS-variable fallback chain
(`var(--tds-t-t1-text-fontSize, --tds-t-f30-text-fontSize)`).

### Accessibility font scaling — a remapping table built in

```js
iosFontScales: { Large: 100, xLarge: 110, xxLarge: 120, xxxLarge: 135,
                 A11y_Medium: 160, … A11y_xxxLarge: 310 }
iosTypographyRules: {
  Large:  [30,29,28,…,11],   // the base
  xLarge: [32,31,30,…,13],   // every step +2
  …
}
```

**A table remapping the px of 20 roles at each of iOS Dynamic Type's nine scale steps**
ships as a token — up to 310%.

The only sample to move what Apple does at the OS level **into a web/RN token layer**.
It is also the first data in which "accessibility support" appears not as a high-contrast
theme (Atlassian, KRDS) or reduced motion (Cloudscape) but as **font-size remapping**.

### Colour — the ramp inverts in dark

```
--blue50:  #e8f3ff  →  --darkThemeBlue50:  #202c4d   (light → dark)
--blue900: #194aa6  →  --darkThemeBlue900: #c8e7ff   (dark → light)
```

**Light's 50–900 lightness direction reverses exactly in the dark theme** —
`darkThemeBlue900` is sky blue. The only sample that exposes, unmediated, a structure in
which "a bigger number means darker" flips with the mode (most absorb it in a semantic tier).

Backgrounds use **a level system** — `darkThemeBackgroundLevel01/02/B01` ·
`FloatBackground` · `LayeredBackground`. Dark surfaces are managed by storey
(a third approach again, alongside Mantine's `dark` ramp and Cloudscape's contexts).

## Distribution — one body with the mini-app SDK

| package | purpose |
|--------|------|
| `@toss/tds-mobile` (5MB) | mobile web components |
| **`@toss/tds-mobile-ait`** | **a build specific to Apps-in-Toss (mini apps)** |
| `@toss/tds-react-native` | RN |
| `@apps-in-toss/framework` · `@granite-js/react-native` | the mini-app framework (Granite) |

**Opening the mini-app ecosystem is what drove the design system's publication** — a third
party building an app inside Toss needs TDS, so it went to npm.
The description of `@toss/tds-migration` shows the old scope (`@toss-design-system/*`) —
the migration from an internal scope to a public one is legible in the packages.

## Components — 107 exports (measured from the 2.5.1 dist, 2026-08-18)

`dist/esm/index.js` has 107 capitalised exports. Beyond the general-purpose components,
what stands out is **how directly the domain surfaces in the namespace**:

- **Finance and authentication specifics**: `AlphabetKeypad` · `NumberKeypad` ·
  `FullSecureKeypad` (three secure keypads) · `CodeAuthModule` · `AgreementModule`
  (terms consent, in BottomSheet/FloatButton/FullPage/Gradient variants with V3/V4
  generations coexisting)
- **A finely divided CTA hierarchy**: `BottomCTA` · `FixedBottomCTA` · `CTAButton` ·
  `PointCTAOverlay` — the bottom conversion button specified across four positions
- **Charts built in**: `BarChart` · `Doughnut(Chart/Label)` — a rare case in the corpus of
  including charts in the core
- **Accessibility utilities as first-class**: `FontScaleLimit` · `ColorSchemeArea` ·
  `GlobalConfigProvider` — the component counterpart of the scale remapping detailed above
- The standard set: Button · TextField · Modal · Toast · Tooltip · Tab · Switch · Checkbox ·
  List (Row/Header/Footer) · TopNavigation (+ three buttons) · Wheel (DatePicker/DateSheet)
  and others

The RN edition's documentation (`tds-react-native`) covers 40+ components including Button,
Dialog, Dropdown, Carousel and Navbar: https://tossmini-docs.toss.im/tds-react-native/

## Characteristic decisions

- **Eight spring presets as physical parameters** — the sample's only runtime spring
- **A size-remapping table per accessibility scale** (9 steps × 20 roles, up to 310%) —
  unique in the sample
- **32 continuous 1px steps from 11 to 42px** — the densest in the sample, with a ×1.5 line
  height at every step
- **Companion-element specs** (icon / badge / link underline) bound to the font size —
  unique in the sample
- **A 0.7px underline-thickness token** — unique in the sample
- **The number-to-lightness inversion of the dark colour ramp exposed as it is**
- The mini-app SDK (`-ait`) as the driver of public distribution — the first large Korean
  consumer-app sample

## Accessibility

- iOS Dynamic Type remapping across nine steps is built in (detailed above)
- High contrast and contrast figures are unverified in these packages

## References

- Mini-app documentation: https://tossmini-docs.toss.im (blocked by the proxy)
- Tokens: `npm pack @toss/tds-colors @toss/tds-typography @toss/tds-easings`
- ~~The spacing and radius systems — the inside of tds-mobile was not surveyed~~ →
  **surveyed (the 2.5.1 build).**
  In the 2.5MB dist of `@toss/tds-mobile` 2.5.1, **no central spacing token object is
  detected** — padding and gaps are all inline literals, distributed
  **8 (28 occurrences) > 24 (15) > 4 (12) > 16 (11)**. The corpus's strongest values, 8 and
  16, with 24 wedged in between. The radii appear as **almost continuous values** from 4 to
  16 (4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · 12 · 13 · 14 · 16), with no trace of a multiplied
  scale — it reads as per-component tuning. Being a build artefact, the possibility that
  source-side tokens were inlined cannot be ruled out (even then, the value distribution
  itself is measured).
- ~~The component list~~ → **resolved (2026-08-18)** — the "Components — 107 exports"
  section above.
- ~~Whether a web package exists~~ → **confirmed: no general-purpose web package
  (2026-08-18).**
  `@toss/tds-web`, `@toss/tds`, `@toss/tds-desktop` and `@toss/tds-react` all 404 on npm.
  That said, `@toss/tds-mobile` **is effectively the React DOM (web) package** — the official
  install command requires `react-dom` (its purpose being limited to WebViews inside the Toss
  app). The bundle's `LEGACY_TDS_WEB_BUTTON_CLASS_NAME` export is a trace of a "tds-web"
  predecessor. The old internal scope `@toss-design-system/web` also 404s on npm (kept
  private).
- ~~The licence~~ → **confirmed unstated for the main packages (2026-08-18).**
  `tds-mobile` (plus -ait, colors, typography, easings, css-utils) all lack a license field
  and a LICENSE file. **The exception: only `@toss/tds-react-native` 2.0.5 is Apache-2.0.**
- ~~How it couples with Granite~~ → **confirmed as peerDependencies (2026-08-18).**
  `@toss/tds-react-native`'s peerDeps are `@granite-js/native` and `@granite-js/react-native`
  — **the RN edition of TDS runs only on Granite** (Toss's RN microservice framework,
  Apache-2.0, github.com/toss/granite).
  The mini-app two-track structure: WebView = tds-mobile (+ -ait) / RN = Granite +
  tds-react-native. The config file is migrating from `granite.config.ts` to
  `apps-in-toss.config.ts`.
