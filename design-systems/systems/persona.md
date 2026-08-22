---
name: Persona
org: Privy (Indonesia)
coverage: partial
url: https://privy-open-source.github.io/design-system/
repo: https://github.com/privy-open-source/design-system
license: MIT
tech: [Vue 3, Nuxt, Tailwind preset]
figma_kit: false
tokens_format: [Tailwind preset JS]
a11y_target: null
platform: web
domain: digital-identity
verified: 2026-08-18
source: "npm @privyid/tailwind-preset@1.2.0 · @privyid/persona@1.2.2-rc.9 → basic.js + src/components"
---
<!-- lang-links -->
> **English** · [한국어](persona.ko.md)
<!-- /lang-links -->

## In one line

The Vue system of Indonesia's Privy (digital identity and e-signature) — the **second
Southeast Asian sample** (after Gojek's Asphalt). Its colour ramps have **a `milk` step
lighter than 0**, its tracking tokens are **in px rather than em**, and its radius scale
has unconventional values like **7px and 22px** wedged in. Domain-specific components
(signature, camera, cropper) show up directly in the namespace.

## Colour — the `milk` step

```
blue: milk #F5FAFF · 0 #E5F3FF · 10 #ADD9FF · … · 40 #008AFF (the base) · … · 100 #001526
gray: 21 steps from 0 to 100 in fives
```

- The chromatic ramps have **13 steps** (milk plus 0–100), and **`milk` is a floor step
  lighter than 0** — the corpus's only case of solving ramp extension through a name
  (other systems insert intermediate numbers like 25 or 50 — see the name-value
  inversion note in GLOSSARY)
- Grey alone has 21 steps, denser than the chromatics (13) — demand for fine adjustment
  of text and borders
- The base tone is 40 (differing from Tailwind's convention of 500)
- green.40 `#34C759` is **the same value as Apple's system green** (a trace of iOS
  borrowing)

## Typography — tracking in px

```js
letterSpacing: { tighter: '-0.4px', tight: '-0.2px', normal: 0,
                 wide: '0.2px', wider: '0.4px', widest: '0.8px' }
lineHeight:    { tightest: 1.33, tighter: 1.42, tight: 1.45, normal: 1.5 }
```

- **Tracking is a fixed px value** — unlike the relative em values most samples use, it
  stays constant as the type size changes. Buttons apply `tracking-wider` (+0.4px) by
  default.
- Line heights are **tuned to two decimal places** at 1.33/1.42/1.45 — fitted to the
  typeface (DM Sans)
- Typefaces: DM Sans / DM Mono (Google Fonts — no brand-specific typeface)

## Radii — unconventional values inserted

```
0 · 4(tn) · 6(xs) · 7(sm) · 8(default) · 12(md) · 14(lg) · 16(xl) · 20 · 22 · full
```

**7px and 22px** are formal steps — values departing from the multiple-of-4, even-number
convention (which most of the corpus follows) have entered the scale. The default is 8px.

## Components — the domain in the namespace

Among **89** of them, the domain-specific ones stand out:

```
signature-draw · signature-text   e-signature (Privy's core business)
camera · cropper                  identity capture and document cropping
strengthbar                       password strength
contextual-bar · tour · wizard    onboarding and guidance
```

Buttons are **padding-driven** rather than fixed-height (xs 2px vertical through lg 16px),
with `--p-button-*-padding-*` CSS variables opened as **per-component override hooks**.

## Notable decisions

- **The second Southeast Asian sample** — two from Indonesia, with Asphalt (Gojek)
- The `milk` ramp step — extension by name rather than number
- px tracking plus fractional line heights — fine typographic tuning
- 7 and 22px radii — unconventional values formally admitted
- Dark mode by `class`, distributed as a Nuxt module
- Borrowing Apple's system green verbatim

## Accessibility

~~Unverified~~ → **confirmed absent (2026-08-18, by headless render).**

Even rendered, Persona **publishes no accessibility documentation.** The VitePress
site's top navigation is Docs · Components · Foundation · Styleguide ·
Assets (Icon · Ilustration) · Ecosystem · Tools (PDF Coordinate Finder · PDF
Optimizer), and **there is no accessibility item anywhere in it.** The Docs section's
sidebar has only **four entries**: Documentation · Instalation · Editor Setup ·
Browser Support.

Render-confirmation paths (the strings `WCAG` and `accessib` appear zero times on each):

- https://privy-open-source.github.io/design-system/ — the landing page (full navigation)
- https://privy-open-source.github.io/design-system/docs/getting-started.html
  — with the Docs sidebar expanded
- https://privy-open-source.github.io/design-system/foundation/colors/
  — Foundation colour

**Classification C is confirmed.** Despite being in the e-signature and identity
verification domain, no accessibility target is declared in the documentation.

## Figma — style-name mapping exists, a public kit does not (2026-08-18)

This is the basis for `figma_kit: false`, and **a case where the evidence points both
ways.**

- **There is no public kit.** Nowhere on the documentation site is there a Figma kit
  link, download or Community file. The top navigation's Assets holds only Icon and
  Ilustration, and the single external link is the GitHub repository.
- **And yet every colour token carries a `figma-style-name` caption.** Rendering the
  Foundation colour page prints, beside each swatch's token name, a caption labelled
  `figma-style-name` — meaning **the mapping between an internal Figma style and the
  code token is exposed in the documentation.**
- So **the documentation retains circumstantial evidence that an internal Figma library
  exists, while no externally distributed kit is confirmed.** `figma_kit: false` is
  recorded here in the sense of "no public kit distributed".

## Notes

- ~~The spacing scale~~ → **confirmed inherited from the Tailwind default (2026-08-18).**
  `basic.js` has no spacing key at the top level of `theme` and no `extend` block
  (only seven keys are redefined: fontFamily, letterSpacing, lineHeight, fontWeight,
  colors, borderRadius, opacity), and `index.js` uses only `theme.extend` — so by
  Tailwind's merge rules **spacing is the default scale (0.25rem steps)**. If anything,
  `extend.minWidth` and others reference `theme('spacing')` and lean on the default scale.
- ⚠ Do not confuse: npm's `@persona/design-tokens` (Persona, the US identity
  verification company) is **a different system** — that one has its own spacing (0–9:
  0/4/8/…/56px).
- Documentation site: https://privy-open-source.github.io/design-system/
  (confirmed by headless render, 2026-08-18 — not blocked by the proxy)
- **Still to confirm:** real dark palette values; ~~the Figma kit~~ and ~~the
  accessibility target~~ (rendered 2026-08-18 — both confirmed absent, see the sections
  above)
