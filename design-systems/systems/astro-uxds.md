---
name: Astro UXDS
org: Rocket Communications
coverage: partial
url: https://astrouxds.com
repo: https://github.com/RocketCommunicationsInc/astro
license: public domain (commissioned by the US government) + an unlimited royalty-free licence
tech: [Web Components, React, Angular, Vue]
figma_kit: true
tokens_format: [JSON, SCSS, CSS]
a11y_target: unverified
platform: web
domain: aerospace
verified: 2026-08-18
source: "npm @astrouxds/tokens@1.14.0 → dist/json/{base.reference,base.system,base.component,theme.light}.json · npm @astrouxds/astro-web-components@8.0.0 (components, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](astro-uxds.ko.md)
<!-- /lang-links -->

## In one line

A design system for **mission control**.
It **keeps security classification colours as tokens**, takes dark as the default, and its
tokens come in **three layers**.

> **`domain: aerospace` was added for this entry.** The existing values (enterprise ·
> consumer · commerce · os · public · health · data · framework) cannot hold it — most of
> this system's decisions come out of **the context of satellite and launch-vehicle
> operations.**

## Tokens — three layers

| file | tokens | layer |
|------|:---:|------|
| `base.reference.json` | **306** | raw (palette · type combinations) |
| `base.system.json` | **50** | semantic (background · text · status · **classification**) |
| `base.component.json` | **280** | per component |
| `theme.light.json` | **67** | light-theme overrides |

The order is **`reference` → `system` → `component`**.
Astro UXDS is the only system in the sample to carry tokens down to a component layer
(Cloudscape has context overrides, and Atlassian's per-component tokens are motion only).

It has the same number of layers as Seed Design's `scale` / `static` / `semantic`, but
**the third layer is of a different character** — Seed's is fixed values, Astro's is
components.

The distribution of the 280 `component` tokens:

| component | tokens |
|----------|:---:|
| `push-button` | **30** |
| `notification-banner` | 25 |
| **`status-symbol`** | **20** |
| `button-color` | 14 |
| `button-padding` | 12 |
| `select-color` · `radio-control` · `button-icon` | 8 · 7 · 7 |

**`status-symbol` gets 20** — dedicated to the status indicator icons of a control screen.

### Dark is the default

**There is only a `theme.light.json`** (67 tokens). There is no dark theme file —
the values in `base.system.json` are already dark.

```
color-background-base-default    = #101923   ← nearly black
color-background-surface-default = #1b2d3e
color-background-base-header     = #172635
```

Two systems in the sample take dark as the default: **visionOS** and Astro UXDS
(`patterns/color.md`). visionOS because it is a spatial UI, Astro because of **the darkened
control room** — though the latter's rationale is not written in the token files.

**The light theme is only 67 overrides.** It covers the 50 semantic tokens and some of the
component ones.

## Security classification colours — unique in the sample

| token | value | colour |
|------|:---:|------|
| `color-classification-unclassified` | `#007a33` | green |
| `color-classification-cui` | `#502b85` | purple |
| `color-classification-confidential` | `#0033a0` | blue |
| `color-classification-secret` | `#c8102e` | red |
| `color-classification-topsecret` | `#ff8c00` | orange |
| `color-classification-topsecretsci` | `#fce83a` | yellow |

**The US government's document classification marking standard, moved into tokens.**
`CUI` is Controlled Unclassified Information and `SCI` is Sensitive Compartmented
Information.

**The colour order is not a severity ramp** — green → purple → blue → red → orange →
yellow.
Regardless of Cloudscape's severity convention (red→orange→yellow) or the state-colour
convention (success green / danger red), **it uses the colours an external standard fixed.**

**This is a case of a domain constraint deciding the tokens.** The same kind of thing as
the automotive platform's 24sp minimum type and 64dp touch target (`platforms.md`) — an
**external requirement**, not a design judgement.

## State colours — six steps, in control-room vocabulary

| token | value |
|------|:---:|
| `color-status-critical` | `#ff3838` |
| `color-status-serious` | `#ffb302` |
| `color-status-caution` | `#fce83a` |
| `color-status-normal` | `#56f000` |
| **`color-status-standby`** | `#2dccff` |
| **`color-status-off`** | `#a4abb6` |

**`critical` → `serious` → `caution` → `normal` is the severity ramp** (red→orange→
yellow→green).
The same number of steps as Cloudscape's `critical/high/medium/low`, with **names drawn
from control-room vocabulary**.

**There are also `standby` and `off`.** They express equipment state, and no other system
in the sample has a state colour for "on standby" or "powered off".

| system | state-colour axes |
|--------|-----------|
| **Astro UXDS** | **4 severity + 2 equipment state** (`standby` · `off`) |
| Cloudscape | 4 meaning + 5 severity |
| Atlassian | danger · warning · success · discovery · information |
| shadcn/ui | a single `destructive` |

**`normal` is `#56f000`, a fluorescent green.** A value premised on contrast against a dark
background, far brighter than an ordinary web system's success colour (Cloudscape's
`#00802f`).

## Data-visualisation colours — eight, all in the cool range

```
#00c7cb · #938bdb · #4dacff · #70dde0 · #c9c5ed · #92cbff · #a1e9eb · #b7dcff
```

**Only teals, pale blues and pale purples.** Red, orange, yellow and green are
**deliberately absent** — those colours are assigned to status and classification.

**Astro UXDS is the only system in the sample whose chart palette divides the hue space
with the state colours.**

| system | chart colour strategy |
|--------|-------------|
| Atlassian | hue separation (16 `categorical`) |
| Cloudscape | contrast-ratio steps (8 colours × 10) |
| shadcn/ui | a single-hue lightness ramp (5) |
| **Astro UXDS** | **8 cool colours — avoiding collision with the state colours** |

On a control screen, chart colours overlapping alarm colours would produce misreadings, so
they are separated — **though that rationale is not in the token files.**

## Typography — 144 composite tokens

The type tokens of the `reference` layer are composed by family.

| family | tokens |
|------|:---:|
| `font-heading-*` | **56** |
| `font-body-*` | **48** |
| `font-display-*` | 16 |
| **`font-control-*`** | **16** |
| `font-monospace-*` | 8 |

**The `font-control-*` family stands apart** — text dedicated to controls such as buttons
and inputs. Astro UXDS is the only system in the sample to separate a type family for
controls (the same idea as Helios separating `Code`, on a different target).

A single style is split into `font-family` · `font-size` · `font-weight` · `line-height` ·
`letter-spacing`, so the token count is large — and **the weight variants are separate
tokens too**, as in `font-body-1-font-family` and `font-body-1-bold-font-family`.

**Every typeface is a Roboto fallback stack** — five families, one typeface.
The same typeface as Material 3.

Ten size steps (`reference`):

| token | value | px |
|------|:---:|:---:|
| `xs` | 0.75rem | 12 |
| `sm` | 0.875rem | 14 |
| `base` | 1rem | 16 |
| `lg` | 1.125rem | 18 |
| `xl` | 1.25rem | 20 |
| `2xl` | 1.5rem | 24 |
| `3xl` | **1.75rem** | **28** |
| `4xl` | **2.125rem** | **34** |
| `5xl` | 3rem | 48 |
| `6xl` | 3.75rem | 60 |

**`4xl` is 2.125rem = 34px.** Neither 32 nor 36 — in the sample, 34px is the same value as
Apple's Large Title (34pt).

Line height is **a separate family of nine steps** — `2xs` 0.875rem (14) · `xs` 1rem (16) ·
`sm` 1.25 (20) · `base` 1.5 (24) · `lg` 1.75 (28) · `xl` 2 (32) · `2xl` 2.5 (40) ·
`3xl` 3.5 (56) · `4xl` **4.375rem (70)**.

**There are fewer line-height steps than size steps** (9 against 10) — as in Evergreen, the
size array and the line-height array are separate and the implementation decides the
pairing (`patterns/typography.md`).

## Elsewhere

| token | value |
|------|:---:|
| `opacity-disabled` | **40%** |
| `border-width-focus-default` | **1px** |
| `spacing-focus-default` | 0.125rem (2px) |
| `color-border-focus-default` | **`#da9ce7`** (pale purple) |
| `color-background-transparent` | `#00000000` (an eight-digit hex) |

**`opacity-disabled` is 40%, the same as Atlassian's 0.4** (`systems/atlassian.md`).

**The focus border is 1px** — the thinnest in the sample
(the majority use 2px, shadcn/ui 3px — `patterns/button.md`).
In its place there is a 2px `spacing-focus-default` offset.

**The focus colour is a pale purple (`#da9ce7`)** — a colour chosen not to collide with the
six classification colours or the six status colours. The same judgement as Radix Themes
keeping `--focus-*` independent of the accent colour (`patterns/form.md`).

**There is no spacing scale in the `system` layer.** There is only
`spacing-focus-default`; spacing lives per component in the `component` layer (the 12
`button-padding` tokens and so on).

## Components

Distributed as `@astrouxds/astro-web-components@8.0.0` (Web Components).
React, Angular and Vue wrappers ship separately.

Confirmed from the `component` layer tokens: `push-button` · `notification-banner` ·
`status-symbol` · `select` · `radio-control` · `button-icon`.
~~The full list was not checked.~~ → **all 45 confirmed** (the deep pass below, 2026-08-18).

## Components in depth — (2026-08-18)

Measured from `dist/collection/components/*/​*.css` in
`@astrouxds/astro-web-components@8.0.0` (a Stencil build — the per-component CSS survives in
plain text). Of the 45 directories, besides buttons, forms and dialogs, many are
**control-room-specific components** such as `rux-clock` · `rux-log` ·
`rux-monitoring-icon` · `rux-timeline` · `rux-global-status-bar`.

### Buttons (`rux-button`) — the height derives, the inline padding is fixed

| | small | default | large |
|---|:--:|:--:|:--:|
| block padding | 4px | 8px | 12px |
| inline padding | **16px** | **16px** | **16px** |
| type | 16px / 20px / **400** | the same | the same |
| **derived height** | **28px** | **36px** | **44px** |

- No height is declared; it **derives from the 20px line height plus the block padding**.
  There is no min-width either.
- **The size variants change only the vertical padding** — 16px inline is shared by all
  three. A rare form of using the size axis in one direction only.
- **The type stays at 16px and weight 400** — no bold is laid on the control
  (it consumes `font-control-body-1`). The exact opposite judgement to Backpack's 16px at
  700.
- Radius **3px** (`--radius-base`) — the token file's value confirmed in real use by the
  component.
- The secondary variant's border is not a `border` but
  **`box-shadow: … 0 0 0 1px inset`**.
- Every value is a `var(--token, fallback)` pair — the three-layer tokens' `component`
  layer is actually distributed as this fallback chain.

### Inputs (`rux-input`) — the same three-step derivation as the button

| | small | medium | large |
|---|:--:|:--:|:--:|
| padding | 4px / 8px | 8px | 12px / 8px |
| **derived height** | **28px** | **36px** | **44px** |

- The inner `<input>` is **fixed at 20px high** (`--line-height-sm`) and the wrapper's
  padding makes the size — exactly the same 28/36/44 system as the button.
- The border is again an **inset box-shadow of 1px** (`#2b659b` muted), as on the secondary
  button — on hover only the colour changes, to `#92cbff`. The whole system draws its
  borders with shadows.
- Focus is the token value as-is, **a 1px outline with a 2px offset** (`#da9ce7`) — the same
  as the button.
- Radius 3px, and the background is the base colour (`#101923`) — sunk darker than the
  surface.

### Dialogs (`rux-dialog`) — a single 448px, radius 0

| item | value |
|------|-----|
| width | **a fixed 28rem (448px)** — no size variants |
| radius | **none (0)** |
| scrim | rgba(0,0,0,.5) |
| entrance | **a 0.5s fadeIn** (fade only) |
| header | `font-heading-2` 24px, background `#172635` (separate from the body's `#1b2d3e`) |
| content padding | 16px |

- **One width step and square corners** — the minimal composition, at the opposite pole from
  Backpack's two steps and MUI's five. The header is separated as **a band** of a different
  background colour from the body.
- The 0.5s fade is among the slowest modals in the sample (Backpack 200ms · MUI 225ms).

### Characteristic decision 1 — `rux-classification-marking`

The six classification tokens have **a dedicated component as their consumer**.

- The banner variant: `min-height: 24px`, `position: sticky`, **forced uppercase**, weight
  700. The classification band pinned to the top or bottom of the screen.
- The tag variant: 14px/700, padding 4/12px, radius 3px — an inline classification mark.
- On the `top-secret` (orange) and `top-secret-sci` (yellow) backgrounds
  **the text inverts to black** — contrast provision for the light classification colours,
  hardcoded into the component layer.

### Characteristic decision 2 — there are no easing tokens

The button CSS declares no `transition` (hover switches instantly) and the dialog uses a
literal `fadeIn 0.5s`. That is consistent with there being zero motion tokens among the 636
across the three layers — a form that **effectively places motion outside the system**
(readable as excluding decorative motion from a control UI, though no supporting document
was confirmed).

### Characteristic decisions (from the deep pass)

- **Buttons and inputs share derived heights of 28/36/44px** — 20px of content plus 4/8/12
  of padding
- **The size variants change the vertical only** — 16px inline padding shared by all three
- **No bold on control type (400)** — what `font-control-*` actually separates is line
  height, not weight
- **Borders unified as inset box-shadows** (inputs and secondary buttons)
- **A single 448px dialog with radius 0 and a 0.5s fade**
- **The classification marking as a dedicated component** — with the black-text inversion on
  the light classification colours built in

## Characteristic decisions

- **Six security classification colours kept as tokens** (`unclassified` to `topsecretsci`).
  Unique in the sample, and a case of **an external standard fixing the colours**
- **`domain: aerospace`** — added because the existing domain values cannot hold it
- **Dark is the default.** There is only a `theme.light.json` and no dark file.
  One of just two, with visionOS
- **The tokens are three-layered and the third is a component layer** (280 tokens).
  Different in character from Seed Design's three layers (`scale`/`static`/`semantic`)
- **The chart colours are eight cool hues, dividing the hue space with the state colours.**
  Red, orange, yellow and green are not used in charts
- **The state colours include `standby` and `off`** — expressing equipment state.
  No other system in the sample has them
- **A separate `font-control-*` family** — typography dedicated to controls
- **144 type tokens** — the count is large because even the weight variants are separate
  tokens
- **A 1px focus border, the thinnest in the sample** (plus a 2px offset)
- **A focus colour in pale purple, colliding with neither the classification nor the status
  colours**
- **There is no spacing scale in the semantic layer** — spacing lives in the component layer
- **The `status-symbol` component uses 20 tokens** — the core element of a control screen

## Accessibility

- `opacity-disabled: 40%`
- A 1px focus border + a 2px offset + a dedicated colour
- **The classification and status colours are distinguished by colour alone** — no rule
  requiring an accompanying icon or text could be confirmed at the token level. The
  `status-symbol` component may play that role, but the tokens alone cannot settle it
- No explicit WCAG target was confirmed from the package

## References

- Documentation: https://astrouxds.com
- Repository: https://github.com/RocketCommunicationsInc/astro
- Tokens: `npm pack @astrouxds/tokens@1.14.0` → `package/dist/json/*.json`
- Components in depth: `npm pack @astrouxds/astro-web-components@8.0.0` →
  `dist/collection/components/*/​*.css` (2026-08-18)
- **There is a separate `@astrouxds/design-tokens@2.0.0-beta.18`** — it looks like the next
  version and was not checked
- Licence: `package.json` says **MIT** while the bundled `LICENSE` is Rocket
  Communications' own notice (stating development under a US government contract) — the two
  disagree.
  **The frontmatter follows the LICENSE text (2026-08-18)**
- **Open questions:** ~~the licence~~ ~~the component list~~ (resolved 2026-08-18 — the deep
  pass), the spacing system (the component layer in full), the scope of the 67
  `theme.light.json` overrides, and the means of distinguishing classification other than
  colour (the banner component is confirmed to carry accompanying text)
- **Licence resolved (2026-08-18):** `public domain (commissioned by the US government) + an unlimited royalty-free licence` — source: github RocketCommunicationsInc/astro → `LICENSE` — a work commissioned by the US government, therefore public domain within the United States, plus a royalty-free worldwide licence conditioned on retaining the copyright notice
