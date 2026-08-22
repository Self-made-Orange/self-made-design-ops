---
name: Porsche Design System
org: Porsche
coverage: partial
url: https://designsystem.porsche.com
repo: https://github.com/porsche-design-system/porsche-design-system
license: code: Apache-2.0, assets: Porsche Design System Assets License Agreement
tech: [Web Components, React, Angular, Vue]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 2.2 AA"
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @porsche-design-system/components-js@4.5.0 → stylesheets/variables.css"
---
<!-- lang-links -->
> **English** · [한국어](porsche.ko.md)
<!-- /lang-links -->

## In one line

Porsche's brand web system. **The sample's first theme built on the `light-dark()` CSS
function**, with spacing in **fluid/static pairs** and a minimum motion unit of **250ms**,
the slowest in the sample.

## Tokens

### Dark mode — the `light-dark()` function, a fourth approach

```css
:root {
  color-scheme: light;
  --p-color-canvas: light-dark(#fff, hsl(225 66.7% 1.2%));
  --p-color-primary: light-dark(hsl(225 66.7% 1.2%), hsl(225 100% 99%));
}
```

**Every colour token is one line of `light-dark(light value, dark value)`.**
Change only the `color-scheme` property and the browser picks the value — no theme file, no
`.dark` class, no duplicated declarations.

| dark-mode approach | systems |
|----------------|--------|
| separate theme files | Apple · Material 3 · Atlassian · Pajamas · Codex |
| CSS class overrides | shadcn/ui · Radix Themes |
| two values in one token (comma-separated) | visionOS |
| **the `light-dark()` function** | **Porsche — unique in the sample** |

It **realises visionOS's "two values in one token" in standard CSS syntax** — the drawbacks
of the visionOS approach (parsing, tooling) resolved by browser support.

### `frosted` — a material colour family

```css
--p-color-frosted:        light-dark(hsl(240 5% 70% / .148), …);
--p-color-frosted-soft / -strong
--p-color-info-frosted / …a frosted variant on the state colours too
```

**A family reserved for translucent glass backgrounds.** The same axis as Apple iOS keeping
separate colours for elements over a material through `Labels - Vibrant`
(`patterns/color.md`), and **Porsche is the first web system with a material colour family.**
The state colours (`info` and the rest) take `-frosted` variants too.

### The contrast ramp — five alpha steps

```
contrast-higher .8 / high .7 / medium .6 / low .5 / lower .32
```

**Text and secondary-element contrast held as five semantic opacity steps.**
The same axis as Astro UXDS's `color-text` family and Apple's four Labels, except the names
are explicit comparatives (`higher` through `lower`).

### Spacing — fluid / static pairs

```css
--p-spacing-fluid-md:  clamp(16px, 1.25vw + 12px, 36px);
--p-spacing-static-md: 16px;
```

| step | static | fluid (min → max) |
|:---:|:---:|------|
| xs | 4 | 4 → 8 |
| sm | 8 | 8 → 16 |
| md | 16 | 16 → **36** |
| lg | 32 | 32 → **76** |
| xl | 48 | 48 → 96 |

**The fluid/fixed pairing Pajamas applies to typography, applied here to whitespace** —
every step has a static counterpart. Open Props's fluid spacing has no such pair
(`tokens/scales.md`).

**The fluid ceiling is 2 to 2.4 times the static** — `lg` stretches from 32 to 76px.

**The static scale is `4/8/16/32/48` — there is no 12 and no 24.**
The absence of 24 is the third case, after Mantine and Garden. Five t-shirt steps.

### Motion — a minimum of 250ms

| token | value |
|------|:---:|
| `--p-duration-sm` | **250ms** |
| `--p-duration-md` | 400ms |
| `--p-duration-lg` | 600ms |
| `--p-duration-xl` | **1200ms** |

**The fastest step is 250ms** — what most of the sample calls its "slow end"
(Atlassian's `long`, Cloudscape's `complex`) is Porsche's starting point. The 50–150ms range
is absent entirely (the opposite coordinate from `patterns/motion.md`'s recommendation of
"50ms for micro state transitions").

## Components

Built on Web Components (`components-js` plus React/Angular/Vue wrappers).
`stylesheets/cn/` — **a China-specific stylesheet ships separately** (with the font faces
split out). Porsche is the only system in the sample to ship a regional stylesheet.
→ Buttons, inputs and modals are in the deep pass below (2026-08-18).

## Components in depth — (2026-08-18)

**The npm package contains no component styles** — `components-js@4.5.0` is a CDN loader, and
the actual components ship only as Stencil chunks on `cdn.ui.porsche.com`
(`porsche-design-system.button.<hash>.js` and the rest, with JSS runtime styles).
The values below were measured by resolving the style objects of the v4.5.0 chunks the loader
points at.

### Buttons (`p-button`) — two states as a single linear equation

```js
padding:        calc(28px   * (var(--_p-button-a) - 0.64285714) + 6px)   // block
                calc(33.6px * (var(--_p-button-a) - 0.64285714) + 16px)  // inline
gap (icon to text): calc(11.2px * (var(--_p-button-a) - 0.64285714) + 4px)
```

| | default (`s=1`) | compact (`s=0.64285714`) |
|---|:--:|:--:|
| block padding | **16px** | 6px |
| inline padding | 28px | 16px |
| gap | 8px | 4px |
| radius | **12px** (`--p-radius-xl`) | 8px (lg) |
| type | 1rem / **400** / `calc(6px + 2.125ex)` | same |

- **The default and compact states ship not as two declarations but as a single linear
  equation in one scale variable** — change only `s` (0.64285714 = 9/14, or 1) and the padding
  and gap interpolate together. A structure unique in the sample.
- There are no size variants — only a `compact` boolean. No height is declared either, so it
  is **derived from line height plus padding** (in contrast to the input's fixed 3.5rem below).
- **The button weight is 400 (normal)** — a regular button at body weight, parting from
  Backpack's 700 and MUI's 500.
- Every button root carries `backdrop-filter: blur(32px)` (`--p-blur-frosted`) — and since
  secondary's background is a translucent `frosted-strong`, **the button itself is a material
  (frosted) component.**
- Icon-only buttons take a radius of `--p-radius-full` = **`calc(infinity * 1px)`**.
- Every transition is of the form
  `var(--p-transition-duration, var(--p-duration-sm))` — **a kill switch is built in, so all
  motion can be switched off through the single global variables
  `--p-transition-duration` / `--p-animation-duration`.** Even hover takes 250ms.

### Inputs (`p-input-text`) — a fixed height of 3.5rem

| | default | compact |
|---|:--:|:--:|
| **height** | `calc(s × 3.5rem)` = **56px** | 36px |
| inline padding | 16px | 8px |
| border | 1px | same |
| radius | 12px | 8px |

- **56px is at the top of the sample** (the same coordinate as MUI medium's 56px) —
  compact corresponds to most systems' default (36px).
- **Focus is not an outline but a border-colour swap** (to the state colour on
  `:focus-within`) — an outline appears only in forced-colors mode.
  The button's focus is a 2px `--p-color-focus` (#1a44ea) outline — the focus grammar differs
  per component.
- The inner line height is `calc(var(--p-leading-normal) + 6px)` — see the ex-based line
  height below.

### Modals (`p-modal`) — no width steps

| item | value |
|------|-----|
| width | `var(--p-modal-width, auto)` — **no steps, the content's width** |
| min / max | 276px / **1535.5px** |
| block margin | `var(--p-modal-spacing-top/bottom, clamp(16px, 10vh, 192px))` |
| inline margin | `max(22px, 10.625vw - 12px)` |
| radius | **24px** (`--p-radius-3xl`) plus `clip-path: inset(0 round 24px)` |
| enter | `translate3d(0,25vh,0)`→0 plus a fade, **400ms** (md) / ease-in |
| exit | 250ms (sm) / ease-out — asymmetric |

- **There is no width scale at all** — a third answer again, beside Cloudscape's five steps
  and MUI's reused breakpoints. **Three public CSS variables**, `--p-modal-width` among them,
  are the only adjustment axis (a naming convention of `--p-*` public vs `--_p-*` internal).
- **It kills the native `::backdrop` with `display:none`** and turns the `<dialog>` itself
  into a 100dvw/dvh layer painted with `--p-color-backdrop`
  (hsl 240 5.3% 14.9% / .5) plus `blur(32px)` — **a frosted-glass scrim.** Closing hides it
  through a width/height 0px trick once the transition ends.
- Content padding: `--p-spacing-fluid-md` (16→36) on top, `calc(24px + fluid-md)` at the
  bottom — **adding the radius's share (24px) to the bottom padding** so the content does not
  burrow into the curve.

### Clearing the token backlog (variables.css re-measured)

| axis | values |
|----|-----|
| radius | 2 / 4 / 6 / 8 / 12 / 16 / 24 / 32 plus full = `calc(infinity*1px)` (8 steps + full) |
| type | 2xs 12 · xs 14 · sm 16 **static**, with md–5xl as `clamp()` **fluid** |
| easing | `ease-in-out (0.25,0.1,0.25,1)` · `ease-in (0,0,0.2,1)` · `ease-out (0.4,0,0.5,1)` |
| line height | `--p-leading-normal: calc(6px + 2.125ex)` |
| focus | `light-dark(#1a44ea, #1a44ea)` — the same value in light and dark |

- **The easing names are the reverse of convention** — `ease-in` is a decelerating curve
  (Material's easeOut shape) and `ease-out` an accelerating one. They should be read as
  named by use: "the curve you use on entry".
- **The line height derives from `ex` (x-height)** — `calc(6px + 2.125ex)`. The only structure
  in the sample where line height responds to the typeface's actual lowercase height.
  Together with the fluid spacing (responding to vw), a consistent preference for shipping
  derivation formulas instead of fixed values.

### Characteristic decisions (from the deep pass)

- **One scale variable and a linear equation interpolating default and compact** — no
  per-state declarations
- **A derived button height vs a fixed 3.5rem input** — two philosophies in one system
- **No modal width steps** plus public override variables (`--p-modal-*`)
- **The native backdrop switched off, with the dialog itself as a frosted scrim**
- **ex-based line height** · **an infinity radius** · **a global motion kill switch**
- **No component styles on npm** — distribution through versioned CDN chunks alone

## Characteristic decisions

- **A `light-dark()` function theme** — the fourth dark-mode approach, unique in the sample
- **The `frosted` material colour family** — the first material axis in a web system, with
  variants on the state colours too
- **Fluid/static spacing pairs** — Pajamas's typographic pattern applied to whitespace
- **No 12 and no 24 in the static scale** (4/8/16/32/48)
- **A 250ms motion minimum** — the slowest coordinate system in the sample
- **A five-step contrast ramp named in comparatives** (`contrast-higher` to `lower`)
- **A China-specific stylesheet (`cn/`) shipped separately** — the only case where
  localisation lives at the token layer. It connects directly to the typeface and region axes
  in `i18n/README.md`
- Every colour is **HSL** (another choice again, beside shadcn/ui's OKLCH and the majority's
  hex)

## Accessibility

Being `color-scheme`-based, it respects the OS dark setting automatically.
~~The contrast ramp is exposed semantically but the target figure is unverified.~~ →
**Resolved (2026-08-18, headless render).**

**The target is WCAG 2.2 AA** — it writes "meet the official WCAG 2.2 AA standards" directly.
It states that every design and development stage is checked for being "compliant with the
latest WCAG 2.2 standards" with snapshot tests running, and nails down **support for 200%
text zoom** as mandatory ("it is mandatory for web content to support text resizing
up to at least 200%").
Source: https://designsystem.porsche.com/v4/must-know/accessibility/introduction/
(headless render, 2026-08-18)

The accessibility statement confirms it again as "accessibility standards based on WCAG 2.2
AA", describing regular automated and manual testing plus continuous monitoring.
Source: https://designsystem.porsche.com/v4/accessibility-statement/ (rendered 2026-08-18)

## References

- Documentation: https://designsystem.porsche.com — **read successfully by headless render on
  2026-08-18** (the earlier "blocked by the proxy" note is void. Being an SPA, curl returns
  only an empty shell)
- Tokens: `npm pack @porsche-design-system/components-js@4.5.0` → `stylesheets/variables.css`
- Components in depth: `cdn.ui.porsche.com/porsche-design-system/components/`
  `porsche-design-system.{button,input-text,modal}.<hash>.js` — the chunks the v4.5.0 loader
  points at were fetched and their JSS style objects resolved (2026-08-18)
- Licence: the package's `LICENSE.md` states **Apache-2.0** — reflected in the frontmatter
  (2026-08-18)
- **Open questions:** ~~the type scale~~ ~~radius~~ ~~the easing curves~~ ~~the licence~~
  ~~the Figma kit~~ ~~the accessibility target~~
  (resolved 2026-08-18 — type, radius and easing were in the same variables.css; see the deep
  pass), and the `cn/` differences in detail
- **Figma kit resolved (2026-08-18, headless render):** **it exists.** "We regularly update
  the Design System Library in Figma, which includes all essential components and styles" —
  in-house designers receive the library already enabled in Porsche's Figma enterprise space,
  and there is a separate **"Public Library" link for external collaborators.**
  The source of truth is the code side — "The coded components serve as the single source of
  truth for both design and development. The Figma library is kept in sync but may
  occasionally diverge in minor details" (the root FAQ).
  Sources: https://designsystem.porsche.com/v4/designing/introduction/ ·
  https://designsystem.porsche.com/
- **Licence resolved (2026-08-18):** `code: Apache-2.0, assets: Porsche Design System Assets
  License Agreement` — source: github porsche-design-system/porsche-design-system →
  `LICENSE.md`. Brand assets such as fonts, icons and marks are under a separate agreement
