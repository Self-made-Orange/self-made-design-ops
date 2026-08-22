---
name: Auro
org: Alaska Airlines (Alaska Air Group)
coverage: partial
url: https://auro.alaskaair.com
repo: https://github.com/AlaskaAirlines/AuroDesignTokens
license: Apache-2.0
tech: [Web Components, CSS]
figma_kit: false
tokens_format: [CSS, SCSS, JSON, JS]
a11y_target: "WCAG 2.0 AA — self-declared partially conformant (confirmed 2026-08-18)"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @aurodesignsystem/design-tokens@9.3.3 → dist/web/{alaska,hawaiian,atmos}.min.css, JSONVariablesNested--atmos.json · npm @aurodesignsystem/auro-button@12.3.2 · @aurodesignsystem/auro-input@4.3.4 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](auro.ko.md)
<!-- /lang-links -->

## In one line

Alaska Air Group's system. **Three airline brands** (alaska · hawaiian · atmos) run on
**the same 290 keys with only 162 values swapped** — a merger expressed as a token contract.

## Tokens — three brands, identical keys

| theme | character |
|------|------|
| `alaska` | the Alaska Airlines brand proper |
| **`hawaiian`** | **Hawaiian Airlines** (acquired in 2024) |
| `atmos` | the combined loyalty programme |

```
shared keys 290 / keys whose value differs 162 (56%)
```

**A multi-brand axis of the Paste (SendGrid multi-brand), Helios (per-product colour) and
Atlassian (rovo) family** — except Auro is the only case of **laying an acquired company's
brand onto the same token contract.** Leave the components alone, swap the CSS file, and the
airline changes.

**Even the focus colour is per-brand** — `state-focused` is `#463c8f` (purple) for alaska and
`#101d2c` (navy) for hawaiian. Where Radix Themes separates focus from the accent and fixes
it, in Auro focus follows the brand.

### Tiers — `basic` / `advanced`, two of them

```
basic.color    89   (basic semantics: texticon, surface and so on)
advanced.color 165  (header, dropdown, interactive — close to components)
basic.type     36
```

Rather than raw/semantic, this **divides the semantic layer in two by depth** — `advanced`
occupies a position close to Astro UXDS's component tier.

### Typography — a serif display

| family | typeface |
|------|------|
| display | **Teodor (a serif)** — falling back to Georgia |
| heading · body · accent | AS Circular (a bespoke sans) |

**Only display is a serif.** Carbon (IBM Plex Serif) and Auro are the two systems in the
sample with a serif as a token family, and Auro's is display-only.

A `brand-*` prefixed family (`brand-family-primary` and so on) exists alongside the ordinary
one — the same structure as Atlassian's Charlie (a separate brand typeface).

Tracking has two positive steps, **accent 0.05em / accent2 0.10em**.
Line heights **mix** ratios (1.3) and rem (1.625rem) — the unit differs by family.

## Components

The `@aurodesignsystem/auro-*` family of Web Components packages (Lit).
→ Buttons, inputs and dialogs are in the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

The embedded CSS of the dist bundles of `@aurodesignsystem/auro-button@12.3.2`,
`@aurodesignsystem/auro-input@4.3.4` and `auro-dialog@4.2.0` was parsed, with the button
cross-checked against its source SCSS (`AlaskaAirlines/auro-button`
`src/styles/{style,shapeSize}.scss`).

### Buttons — a shape × size matrix (`@aurodesignsystem/auro-button@12.3.2`)

Size is not a per-component value but **a generated `$sizeMap` × `$shapeConfig` matrix**
(six shapes — rounded, pill, pill-left, pill-right, circle, square — × five sizes = 30
classes).

| size | visual height | pill radius | inline space (contentWrapper) |
|---|:--:|:--:|:--:|
| xs | 24px | 12px | 12px |
| sm | 36px | 18px | 16px |
| **md (default)** | **48px** | 24px | **24px** |
| lg | 56px | 28px | 32px |
| xl | 72px | 36px | 40px |

- **The height sets min-height and max-height at once — completely fixed.** The CSS is
  content-box, so the classes record `height − 2×border` (md rounded = 44px + 2px×2).
  min and max are recomputed for each border variant (default 2px / thin 1px / simple 0) to
  **keep the visual height invariant.**
- **The inline space is not padding** — `.auro-button`'s `padding` is erased with
  `padding-inline:unset` and the per-size space comes from the inner `.contentWrapper`'s
  `margin-inline`.
- Radius: rounded **6px** (4px only at xs) · pill = height/2 · circle 50%. The default shape
  is rounded.
- Type: a type class mapped per size — sm `body-sm` (14) / **md `body-default`
  (16px/24px)** / lg and xl `body-lg` (18). The weight across the body family is **450**.
  Icon-only switches to the heading family.
- **No min-width** (only circle and square set min/max-width = height + border).
- active is `transform: scale(0.95)` — the press expressed as a shrink.
- Focus is not an outline but **an inset box-shadow**, whose thickness is specified
  individually through a variant × shape × size map — lg circle primary even reaches a
  fractional **3.33px**.
- Colours all run a `--ds-auro-button-*` → `--ds-advanced-color-button-*` fallback chain —
  confirming that the token section's **`advanced` tier is the real source of component
  colour.**
- Variants: primary (default) · secondary · tertiary · ghost · flat, plus `ondark` and
  `appearance=inverse`.

### Inputs (`@aurodesignsystem/auro-input@4.3.4`) — a built-in floating label

| | value |
|---|---|
| **height** | min and max fixed at **58px** (`--ds-size-700` (56px) + `--ds-size-25` (2px)) |
| padding | 32px top (the label's share) / 4px bottom / 0 inline |
| default form | **1px borders top and bottom** (an underline form) — with the `bordered` attribute, a 1px border all round plus a 6px radius (`--ds-border-radius: 0.375rem`) |
| label | absolute floating — centred → rising to 2px from the top and shrinking to 12px, `all 300ms cubic-bezier(0.215, 0.61, 0.355, 1)` |

- There are no size variants — a single 58px, in contrast to the button's five-step matrix.
- **It uses a size token (`--ds-size-200`, 1rem) for font-size** — a rare notation, using a
  dimension token for type size rather than a typography token.
- **The component CSS's fallbacks reveal the `--ds-size-*` numbering** — 50 = 4px ·
  100 = 8px · 150 = 12px · 200 = 16px · 300 = 24px … **the number = rem × 200** (the Helios
  and KRDS family). The component layer fills the gap the token section left as
  "spacing not exposed".

### Dialogs (`auro-dialog@4.2.0`) — a desktop dialog and a mobile bottom sheet

| size | <768px (max-height) | ≥768px (max-width) | ≥1024px (max-width) |
|---|:--:|:--:|:--:|
| sm | 30% | 40% | **740px** |
| md | 50% | 70% | **986px** |
| default | 90% | 80% | **986px** |

- **On mobile it is a bottom sheet rather than a dialog** — a `bottom:-100% → 0` slide-up,
  with `opacity/visibility/bottom 300ms ease-in-out`. The size attribute changes the width on
  desktop and **the height** (30/50/90%) on mobile.
- The desktop width ceiling is 986px (shared by md and the default), so there are really only
  two steps (740/986). A separate `lg` attribute is not a width but **a height modifier**
  that raises sm and md's max-height back to 80–90%.
- Padding: `0 64px 64px` on desktop (`--ds-size-800`) / 48px for sm / `0 32px 32px` on mobile.
  The header's padding-top is 64px. **No radius is declared (0)** — a square-cornered modal.
- The overlay transitions use `cubic-bezier(.4, 0, .2, 0)` and `(.4, 0, .5, 0)` — **non-standard
  curves with y2 = 0** (differing from Material's `(.4,0,.2,1)` only in the last coordinate;
  whether that is intentional or a typo is unverified).

### Characteristic decisions (from the deep pass)

- **A generated shape × size matrix with height recomputed per border thickness** — the
  principle of an invariant visual height
- **Space from an inner margin-inline rather than padding** — rare in the sample
- **Focus ring thickness as a three-axis variant × shape × size map** (including a
  fractional 3.33px)
- **Mobile = a bottom-sheet switch** — the same component changing pattern by viewport
- A button weight of 450 — between the bold camp (Backpack, Thumbprint at 700) and the
  medium camp

## Characteristic decisions

- **An acquired brand integrated into the same token contract** — 290 keys fixed, 56% of the
  values swapped. Unique in the sample
- **The focus colour follows the brand**
- **A two-tier `basic`/`advanced` semantic layer** — a different axis from raw/semantic
  separation
- **A serif display** (Teodor) plus a bespoke sans (AS Circular)
- Line-height units mixed by family (ratios / rem)

## Accessibility

~~Unverified.~~ → **Resolved (2026-08-18, headless render).**
There are per-brand `state-focused` tokens, but still no contrast figures.

Auro is one of the rare corpus entries with **a standalone accessibility statement page** —
`/a11y-statement`, written 2020-12-03 with the **W3C Accessibility Statement Generator Tool**.

| item | content |
|------|------|
| conformance target | **WCAG 2.0 Level AA** |
| conformance status | **partially conformant** — "some parts of the content do not fully conform" |
| evaluation method | **Self-evaluation** — no external audit |
| technologies relied upon | HTML · WAI-ARIA · CSS · JavaScript |
| feedback | GitHub issues, targeting **a response within 48 hours** |

Two things stand out. First, **it is 2.0, not 2.1 or 2.2** — the lowest version target in the
corpus (against Backpack's 2.2 AA and Canvas's 2.1 A/AA). Second, **it states "partially
conformant" in writing.** Where most systems record a target and say nothing about whether
they meet it, this one puts the shortfall in the statement.

Source: https://auro.alaskaair.com/a11y-statement (render confirmed, 2026-08-18)

## References

- Tokens: `npm pack @aurodesignsystem/design-tokens@9.3.3` → `dist/web/`
- Components in depth: `@aurodesignsystem/auro-button@12.3.2` ·
  `@aurodesignsystem/auro-input@4.3.4` · `auro-dialog@4.2.0` (the dist bundles' CSS
  cross-checked against the GitHub SCSS sources, 2026-08-18)
- Licence: the component packages' package.json states **Apache-2.0** — reflected in the
  frontmatter (2026-08-18)
- **Open questions:** ~~spacing and radius (not exposed in the variables)~~ (partly resolved
  2026-08-18 — the component CSS fallbacks confirm the `--ds-size-*` = rem × 200 system and a
  6px `--ds-border-radius`. The design-tokens package's own full size scale remains
  unverified), what the atmos theme is for in detail, ~~the licence~~ (Apache-2.0 —
  2026-08-18), ~~figma_kit and a11y_target~~ (resolved / confirmed absent 2026-08-18)
- **Figma kit — confirmed absent (2026-08-18, `figma_kit: false`)**:
  even rendered, the documentation site has **not a single Figma kit or link.**
  The left navigation is `Welcome / Design philosophy / Status / Releases / Support /
  Getting started (Engineering · Developer support · Design tokens · WCSS) /
  Contributing / CSS guidelines / Color / Typography / Icons / Voice and tone /
  Components / CSS / Dev resources` — **an engineering axis throughout**, with no designer
  section and no kit distribution notice.
  Zero `figma.com` links in the entire site DOM.
  → The type that publishes tokens and web components on npm but **does not publish the
  design source** (classified C).
  Renders checked: https://auro.alaskaair.com/ ·
  https://auro.alaskaair.com/design-philosophy ·
  https://auro.alaskaair.com/a11y-statement (2026-08-18)
- **The documentation site exposes a three-brand theme switcher** (rendered 2026-08-18) —
  a `Site Theme: Alaska / Hawaiian / Atmos` selector in the header, so the three-way structure
  observed in the tokens surfaces in the documentation UI as well.
- **Licence resolved (2026-08-18):** `Apache-2.0` — source: github
  AlaskaAirlines/AuroDesignTokens → `LICENSE` (matching the npm metadata for
  `@aurodesignsystem/design-tokens@9.3.3`)
