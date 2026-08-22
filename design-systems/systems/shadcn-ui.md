---
name: shadcn/ui
org: shadcn (an individual)
coverage: full
url: https://ui.shadcn.com
repo: https://github.com/shadcn-ui/ui
license: MIT
tech: [React]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "GitHub raw — apps/v4/app/globals.css, apps/v4/registry/new-york-v4/ui/*.tsx, apps/v4/registry/__index__.tsx · npm sonner@2.0.8 → dist/index.mjs·styles.css (toast measurements, 2026-08-18)"
---
<!-- lang-links -->
> **English** · [한국어](shadcn-ui.ko.md)
<!-- /lang-links -->

## In one line

A component collection you use **by copying the source code, not by installing a package**.
On top of Tailwind's tokens it lays **a semantic colour layer and 61 components**.

## Distribution — unique in the sample

It is not installed as an npm dependency. The CLI **copies the component `.tsx` files into
your project.**

| method | systems |
|------|--------|
| an npm package | all the rest of the sample |
| **source copy** | **shadcn/ui** |

**The consequence:** there is no version upgrade. The copied code belongs to the project and
is edited directly. The tokens go into the project's own CSS file too, so **the values in
the upstream repository are only initial values.**

The values in this entry are the current state of the official repository (`apps/v4`) and
may differ from those in an actual project.

## Tokens

### Colour — all OKLCH

```css
--background: oklch(1 0 0);
--foreground: oklch(0% 0 0);
--destructive: oklch(0.577 0.245 27.325);
--border: oklch(1 0 0 / 10%);      /* .dark — alpha as a percentage */
```

**shadcn/ui is the only system in the sample to define colour purely in OKLCH.**
The rest use hex or `rgba()`. Radix Themes uses `color-mix(in oklab, …)` in its shadow
computation, but its colour definitions themselves are hex and P3.

### The `-foreground` pairing rule

Almost every colour token exists as **a background/foreground pair**.

| background | foreground |
|------|------|
| `--background` | `--foreground` |
| `--card` | `--card-foreground` |
| `--popover` | `--popover-foreground` |
| `--primary` | `--primary-foreground` |
| `--secondary` | `--secondary-foreground` |
| `--muted` | `--muted-foreground` |
| `--accent` | `--accent-foreground` |
| `--destructive` | `--destructive-foreground` |
| `--sidebar` | `--sidebar-foreground` |
| `--surface` | `--surface-foreground` |
| `--code` | `--code-foreground` |
| `--selection` | `--selection-foreground` |

**The same structure as Material 3's `Primary` / `On Primary` pairs**
(`patterns/color.md`). Only the naming differs, `On X` → `X-foreground`.

The unpaired tokens: `--border` · `--input` · `--ring` · `--chart-1..5` ·
`--code-highlight` · `--code-number`.

### Families by purpose

| family | tokens |
|------|------|
| surface | `background` · `card` · `popover` · `surface` |
| emphasis | `primary` · `secondary` · `accent` · `muted` |
| state | `destructive` |
| **sidebar-specific** | `sidebar` · `sidebar-primary` · `sidebar-accent` · `sidebar-border` · `sidebar-ring` — **7 tokens** |
| **code-block-specific** | `code` · `code-foreground` · `code-highlight` · `code-number` — **4 tokens** |
| chart | `chart-1` to `chart-5` |
| selection | `selection` · `selection-foreground` |
| form and focus | `border` · `input` · `ring` |

**The sidebar gets a family of seven tokens of its own.** shadcn/ui is the only system in
the sample to keep a colour family dedicated to a particular layout region.

**The chart colours are references into the Tailwind palette** —
`--chart-1: var(--color-blue-300)`. All five steps are `blue` at 300 · 500 · 600 · 700 ·
800. **A single-hue lightness ramp**, a different direction from Atlassian's 100 chart
tokens (hue separation included).

There are **no** `success`, `warning` or `info` tokens. The only state colour is
`destructive`.

### Radius — a single base × multipliers

```css
--radius: 0.625rem;                      /* 10px */
--radius-sm: calc(var(--radius) * 0.6);  /* 6px */
--radius-md: calc(var(--radius) * 0.8);  /* 8px */
--radius-lg: var(--radius);              /* 10px */
--radius-xl: calc(var(--radius) * 1.4);  /* 14px */
--radius-2xl: calc(var(--radius) * 1.8); /* 18px */
--radius-3xl: calc(var(--radius) * 2.2); /* 22px */
--radius-4xl: calc(var(--radius) * 2.6); /* 26px */
```

**It overrides Tailwind's default radius scale (2/4/6/8/12/16/24/32).**
Changing the single `--radius` moves all eight steps together.

The multipliers are `0.6 · 0.8 · 1 · 1.4 · 1.8 · 2.2 · 2.6`, so **above `lg` they step by
0.4** and from `sm` to `lg` by 0.2. At the base of 10px that gives 6/8/10/14/18/22/26 —
**integer steps.**

The same purpose as Vapor UI's `--vapor-radius-factor` and Radix Themes'
`--radius-factor`, except shadcn/ui makes **the base value itself the variable rather than
a multiplier.**

### Spacing · typography

**There are no tokens of its own.** It uses Tailwind v4's `--spacing` and `--text-*`
directly.

What it adds is two breakpoints and typeface slots.

| token | value |
|------|:---:|
| `--breakpoint-3xl` | 1600px |
| `--breakpoint-4xl` | 2000px |
| `--font-sans` · `--font-heading` · `--font-mono` | injected by the project |

**`3xl` and `4xl` are in px** — Tailwind's five defaults are in `rem`, so the unit parts
company here.

`--font-ar` and `--font-he` are wired to a `[data-lang]` selector — applying separate
typefaces for Arabic and Hebrew. **shadcn/ui is the only system in the sample to put a
per-language typeface switch at the token layer.**

### Style variants — 8 styles × 3 bases

`globals.css` takes 24 directories as its sources.

| axis | values |
|----|-----|
| style | `luma` · `lyra` · `maia` · `mira` · `nova` · `rhea` · `sera` · `vega` (8) |
| base | `base` · `aria` · `radix` (3) |

The eight styles are declared as CSS variants in the form
`@custom-variant style-vega (&:where(.style-vega *))`. The base is the primitive source —
`radix` is Radix Primitives (`radix-ui`), `aria` is React Aria
(`react-aria-components`) and `base` is Base UI (`@base-ui/react`).

**One system supports three primitive libraries in parallel.**
The two axes are orthogonal — **the style changes only the visual tokens and the base only
the behaviour layer.**

### What actually differs between the eight styles

The 24 directories under `apps/v4/styles/` are **build output and gitignored** (the
directories contain only a README). The sources are the eight files
`apps/v4/registry/styles/style-*.css` (about 74KB each, 417–423 rules). The tokens are not
in a separate file but embedded in classes using Tailwind's arbitrary-value syntax —
`[--card-spacing:--spacing(6)]` · `[--cell-radius:var(--radius-4xl)]`.

The official description (`styles.tsx`) against the measured values:

| style | official description | base radius | default button height | button type | card padding |
|--------|-----------|:---:|:---:|---|:---:|
| `vega` | Clean, neutral, and familiar | `md` | **36 (h-9)** | text-sm medium | 24/16 |
| `nova` | Reduced padding and margins | `lg` | 32 | text-sm medium | 12 |
| `maia` | Rounded, with generous spacing | **`4xl`** | 36 | text-sm medium | 24/16 |
| `lyra` | Boxy and sharp. For mono fonts | **`none`** | 32 | **text-xs** medium | 16/12 |
| `mira` | Made for compact interfaces | `md` | **28 (h-7)** | text-xs/relaxed | 16/12 |
| `luma` | Fluid, luminous, and soft | **`4xl`** | 36 | text-sm medium | 24/16 |
| `sera` | Editorial and typographic | **`none`** | **40 (h-10)** | **text-xs semibold tracking-widest** | 32/20 |
| `rhea` | Like Luma but compact | `2xl` | 32 | text-sm medium | 20/16 |

(The card padding is the two `--card-spacing` values, default and reduced, × 4px. The whole
button height scale shifts wholesale per style — `mira` 20/24/28/32, `sera` 28/36/40/44.)

**From the same component code, "the default button" ranges from 28px (`mira`) to 40px
(`sera`)** — the only case where the corpus's between-system distribution (28–48px) is
reproduced inside one system. The structures readable from it:

- **Three radius strategies**: pill (`luma` and `maia` at 4xl) / middle (`vega` and `mira`
  at md, `nova` lg, `rhea` 2xl) / square (`lyra` and `sera` at 0). `sera` sets the base
  itself to zero with `[--radius]:0` — all seven multipliers become 0.
- **A `min()`-clamped radius**: the small buttons of `vega` and `nova` use
  `rounded-[min(var(--radius-md),8px)]` — even if the user raises `--radius`, small
  components stop at 8px. A technique amounting to **a per-size radius ceiling.**
- **Styles that build identity out of type**: `sera` is 12px semibold with
  `tracking-widest` (0.1em) — the largest in size while the smallest in letters, an
  editorial-design grammar.
  `lyra` presumes a monospace face, going square with text-xs.
- **The pair relationships are made official**: `rhea`'s very description is "Like Luma but
  compact", and the measurements agree — 4px shorter and one radius step down from luma.
  `luma` and `maia` are nearly identical in figures, and only `luma` has the stacked drawer
  shadow (`--drawer-stacked-shadow`).
- The calendar cell goes the same way: `--cell-size` is 24 in `mira`, 28 in `lyra` and
  `nova` and 32 in the rest, and `--cell-radius` runs from 4xl (`luma`, `maia`) to 0
  (`sera`).
- The press feedback `active:translate-y-px` (a 1px drop) is shared by all eight styles —
  the styles diverge but **the state grammar is shared.**

## Components

**61** (`registry/new-york-v4/ui`):

accordion · alert · alert-dialog · aspect-ratio · attachment · avatar · badge ·
breadcrumb · bubble · button · button-group · calendar · card · carousel · chart ·
checkbox · collapsible · combobox · command · context-menu · dialog · direction ·
drawer · dropdown-menu · empty · field · form · hover-card · input · input-group ·
input-otp · item · kbd · label · marker · menubar · message · message-scroller ·
native-select · navigation-menu · pagination · popover · progress · radio-group ·
resizable · scroll-area · select · separator · sheet · sidebar · skeleton · slider ·
sonner · spinner · switch · table · tabs · textarea · toggle · toggle-group · tooltip

`message` · `message-scroller` · `bubble` · `attachment` · `marker` are for chat and AI
interfaces.

## Characteristic decisions

- **Distribution by source copy.** It is not an npm package. There is no notion of a version
  and no upgrade path.
- **Colour defined purely in OKLCH.** Unique in the sample.
- **The `-foreground` pairing rule.** Material 3's `On X` structure moved into CSS variable
  names.
- **A single `--radius` base plus seven multipliers.** The radius tone is tuned from one
  value.
- **Dedicated colour families for the sidebar and code blocks.** The only case in the sample
  of a colour family per layout region.
- **The only state colour is `destructive`.** There is no `success` or `warning`.
- **The focus ring is 3px.** The sample majority uses 2px (see below).
- **The error state is expressed through the `aria-invalid` attribute.** The style hook is
  an ARIA attribute rather than an `error` prop — every form control carries
  `aria-invalid:border-destructive`.
- **Every component carries a `data-slot` attribute.** Inner elements can be selected from
  outside.
- **Three primitives supported in parallel** (Radix Primitives · React Aria · its own base).
- **Per-language typeface tokens** (`--font-ar` · `--font-he`).

## Components in detail

The values are read from the Tailwind classes, in px against `--spacing: 0.25rem`.

### Button

| variant | height | inline padding | text | radius |
|------|:---:|:---:|:---:|:---:|
| `xs` | 24 (h-6) | 8 (px-2) | 12 (text-xs) | `md` |
| `sm` | 32 (h-8) | 12 (px-3) | 14 (text-sm) | `md` |
| **`default`** | **36 (h-9)** | **16 (px-4)** | 14 | `md` |
| `lg` | 40 (h-10) | 24 (px-6) | 14 | `md` |
| `icon` | 36 × 36 | — | — | `md` |
| `icon-xs` | 24 × 24 | — | — | `md` |
| `icon-sm` | 32 × 32 | — | — | `md` |
| `icon-lg` | 40 × 40 | — | — | `md` |

The heights are **24 / 32 / 36 / 40** — not an even step of 8; `sm`→`default` is 4px.

**The padding shrinks when an icon is present:** `has-[>svg]:px-3` — `default`'s 16px
becomes 12px.
`xs` goes 8→6, `sm` 12→10 and `lg` 24→16. **Conditional padding implemented with CSS
`:has()`.**

Icon size: 16 by default (`size-4`), 12 (`size-3`) for `xs` and `icon-xs` alone.

Six visual variants: `default` (filled) · `destructive` · `outline` · `secondary` · `ghost`
· `link`.

| state | treatment |
|------|------|
| hover | background at 90% alpha (`bg-primary/90`); `ghost` takes an `accent` background |
| focus-visible | `border-ring` + `ring-[3px] ring-ring/50` |
| disabled | `pointer-events-none` + `opacity-50` |
| **active (mobile)** | `active:opacity-60 md:opacity-100` — **absent from `md` up** |
| aria-invalid | `border-destructive` + `ring-destructive/20` (40% in dark) |

**The `active` state applies on mobile only.** It is released from the `md` breakpoint up.
This is the only case in the sample of switching off a state style by viewport.

### Input

| item | value |
|------|:---:|
| height | 36 (`h-9`) |
| inline padding | 12 (`px-3`) |
| block padding | 4 (`py-1`) |
| radius | `md` (8px) |
| text | **16 (`text-base`) → 14 from `md` up (`md:text-sm`)** |
| shadow | `shadow-xs` |
| focus | `border-ring` + `ring-[3px] ring-ring/50` |

**16px body on mobile, 14px on the desktop.** iOS Safari zooms automatically on input fields
below 16px, so this branch relates to that behaviour — **though the source does not record
the reason.**

The `file:` selector styles the file input's button separately (`file:h-7` = 28px).

### Select

| item | value |
|------|:---:|
| trigger height (`default`) | 36 (`data-[size=default]:h-9`) |
| trigger height (`sm`) | 32 (`data-[size=sm]:h-8`) |
| trigger padding | 12 / 8 (`px-3 py-2`) |
| content min-width | 128 (`min-w-[8rem]`) |
| content max-height | `--radix-select-content-available-height` (runtime) |
| item padding | left 8 / right 32 / block 6 (`pl-2 pr-8 py-1.5`) |
| label | `px-2 py-1.5 text-xs` |
| check icon area | 14 (`size-3.5`), 8 from the right |

**An item's right padding (32) is four times its left (8)** — the space for the check mark.

Directional entrance animation: `data-[side=bottom]:slide-in-from-top-2` (an 8px move) and
so on, in four directions.

### Dialog

| item | value |
|------|:---:|
| position | `fixed top-[50%] left-[50%]` + `translate-[-50%]` |
| width | `w-full max-w-[calc(100%-2rem)]` → `sm:max-w-lg` (512) |
| inner padding | 24 (`p-6`) |
| element gap | 16 (`gap-4`) |
| radius | `lg` (10px) |
| shadow | `shadow-lg` |
| animation | fade 0↔100 + zoom 95↔100, `duration-200` |
| close button | top right 16/16 (`top-4 right-4`), icon 16 |

**On mobile it leaves 16px of margin on each side** (`max-w-[calc(100%-2rem)]`).
From `sm` (640px) up it switches to a fixed 512px.

The footer is **reversed and vertical on mobile** — `flex-col-reverse` →
`sm:flex-row sm:justify-end`. The primary action moves to the top on mobile.

**Only the close button's focus ring differs** — `focus:ring-2 focus:ring-offset-2`.
Every other control uses `ring-[3px]` with no offset.

### Table

| element | value |
|------|:---:|
| text | 14 (`text-sm`) |
| header cell height | 40 (`h-10`) |
| cell inline padding | 8 (`px-2`) |
| header weight | 500 (`font-medium`) |
| caption | `text-sm text-muted-foreground`, 16 top margin |
| caption position | `caption-bottom` |

**A cell containing a checkbox drops its right padding and lowers the checkbox by 2px** —
`[&:has([role=checkbox])]:pr-0` + `[&>[role=checkbox]]:translate-y-[2px]`.
`:has()` changes the padding according to the cell's contents.

### Checkbox · Badge

| component | size | radius | other |
|----------|:---:|:---:|------|
| Checkbox | 16 (`size-4`) | **`rounded-[4px]`** | check icon 14 (`size-3.5`) |
| Badge | height auto | `rounded-full` | `px-2 py-0.5`, `text-xs`, icon 12 |

**Only the checkbox uses a literal `4px` radius rather than a token.** It does not ride the
`--radius` multipliers.

### Sheet · Drawer — two edge panels (the v4 style CSS, on `vega`)

| | Sheet | Drawer (vaul) |
|---|---|---|
| width (left/right) | `w-3/4` with **an `sm:max-w-sm` (384px) ceiling** | varies by side |
| radius | none | **only on the side away from the edge** — `rounded-t-xl` and so on, conditional on direction |
| overlay | (shared with the Dialog family) | **`bg-black/10` + `backdrop-blur-xs`** |
| handle | none | **100×6px** `rounded-full` (`h-1.5 w-[100px]`) |
| transition | 200ms ease-in-out | delegated to the vaul library |

Taking 75% of the screen on mobile and stopping at 384px on the desktop is Sheet's
**ratio-plus-ceiling** responsive strategy. The Drawer overlay at 10% black is the lightest
in the sample, with the blur standing in for darkness (the overlay section of
`patterns/modal.md`).

### NavigationMenu · Menubar · Empty · Pagination

- **NavigationMenu**: the content transition is **direction-aware** —
  `data-[motion=from-start]:slide-in-from-left-52` and so on, eight rules over four
  directions × enter/exit.
  The slide direction changes with the direction of movement between menus. The viewport
  uses `zoom-in-90` over 100ms, and the boundary is `ring-foreground/10` rather than a
  border.
- **Menubar**: a 36px (`h-9`) container with `p-1` — desktop application menu-bar grammar.
  Items are `px-2 py-1.5 rounded-sm`, submenus `min-w-36`, the icon-slot indent is
  `data-inset:pl-8` (32px), and a destructive variant is built in.
- **Empty**: `p-12` (48px) plus a **dashed border** (`border-dashed`) — the convention of
  drawing an empty state as "a region not yet filled". The title is `text-lg tracking-tight`.
- **Pagination**: its own styling is just `gap-1` — it is assembled **by reusing the Button
  component.**

### Toast — Sonner measured (`sonner@2.0.8`, 2026-08-18)

shadcn/ui's `sonner.tsx` is a thin wrapper mapping colour variables only;
**the dimensions and behaviour are entirely the `sonner` package's business.** What follows
is measured from that package, and attribution belongs to **Sonner**, not shadcn/ui.

| item | value (constant) |
|------|-----|
| **width** | **356px** (`TOAST_WIDTH`) |
| **default position** | **`'bottom-right'`** (`Toaster.props.position`) |
| **default duration** | **4000ms** (`TOAST_LIFETIME`) |
| **simultaneous cap** | **3** (`VISIBLE_TOASTS_AMOUNT`) — the excess go to `opacity: 0` via `data-visible=false` |
| gap between toasts | **14px** (`GAP`) |
| screen margin | **24px** (`VIEWPORT_OFFSET`) · **16px** on mobile |
| padding · radius | **16px** · **8px** · type 13px |
| shadow | `0 4px 12px rgba(0,0,0,.1)` |
| icon and gaps | 16px · `gap: 6px` · 2px between title and body |
| action button | height 24px · inline 8px · 12px / 500 · radius 4px |
| close button | a 20px circle, half-hung off the corner with `translate(-35%, -35%)` |
| swipe threshold | **45px** or a velocity of 0.11 (`SWIPE_THRESHOLD`) |
| unmount delay | 200ms (`TIME_BEFORE_UNMOUNT`) |
| z-index | **999999999** |

Transitions:

```
default      transform .4s, opacity .4s, height .4s, box-shadow .2s
stack fold   --scale: var(--toasts-before) * 0.05 + 1   (each toast behind shrinks 5%)
removal      transform .5s, opacity .2s
swipe        animation .2s ease-out (keyframes in four directions)
container    transform .4s ease
```

- **The default position is the bottom right.** The documentation-layer synthesis in
  `patterns/feedback.md` was that "no system prescribes the bottom right", yet **at the code
  layer Sonner and EUI (`side: 'right'` + `bottom: 0`) both ship the bottom right as their
  default.**
- **The 4000ms default is under five seconds** — at odds with the documentation layer's
  "convergence on a five-second floor".
- **A cap of three simultaneous toasts exists in code** — a counterexample to the
  documentation-layer synthesis that "no system sets a numeric cap". The excess are hidden
  rather than deleted.
- **Repositioning is handled as a `height` transition** — as the stack shrinks, each toast's
  height is interpolated over 400ms. Chakra v3's toast does the same (`height 400ms`), while
  Atlassian has a `transform`-only token (250ms).
- The state colours only appear with `richColors` on — by default there is a single
  `--normal-bg` and the distinction is the icon shape alone (consistent with this document's
  existing description).
- **Under `@media (hover: none) and (pointer: coarse)` the `data-lifted` transform is turned
  off** — disabling the stack-expansion effect on touch.

## The focus ring — 3px is the thickest in the sample

```
focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
```

A two-part composition of **a border colour change plus a 3px translucent ring**.
Thicker than Atlassian's `border.width.focused = 2px` and the 2px convention of Carbon and
Polaris.

There is no `ring-offset` — the ring sits against the element. The Dialog close button is
the sole exception, at `ring-2 ring-offset-2`.

## Accessibility

There is no stated WCAG target. What is confirmable at the implementation level:

- **`aria-invalid`-based error styling** — on every form control
- Use of `focus-visible` (no ring on a mouse click)
- The primitives (Radix / React Aria) handle keyboard and screen-reader behaviour
- `outline-hidden` plus a custom ring — because it provides the ring itself, removing the
  outline does not become an accessibility loss
- `disabled:pointer-events-none` — blocking events on disabled elements

`::selection` is controlled by a global token (`--selection`).

## References

- **Grounds for the Figma kit (false):** there is no official kit — the documentation states that "the Figma files are community contributions" and lists only free and paid third-party kits, confirmed 2026-08-18

- Documentation: https://ui.shadcn.com
- Repository: https://github.com/shadcn-ui/ui
- Tokens: `apps/v4/app/globals.css`
- Components: `apps/v4/registry/new-york-v4/ui/*.tsx`
- Registry index: `apps/v4/registry/__index__.tsx`
- **Harvesting note:** `raw.githubusercontent.com` is open through the proxy, so the source
  was read directly.
  `ui.shadcn.com`'s `/r/registry.json` is blocked — the proxy refuses CONNECT with a 403.
- ~~Open question: what actually differs between the eight style variants~~ → **resolved.**
  `apps/v4/styles/` is build output (gitignored) and therefore empty; the source was
  `apps/v4/registry/styles/style-*.css`. Analysed by sparse-checking out
  `apps/v4/registry` — see "what actually differs between the eight styles" above.
- ~~The differences between the three bases~~ → **confirmed (2026-08-17,
  `registry/bases/`).**
  - **The component sets differ slightly** — base 63 / radix 62 / aria 60.
    `aria` lacks `menubar`, `navigation-menu` and `toast`; `radix` lacks only `toast`.
    Whatever a primitive does not provide drops out for that base.
  - **The style CSS is written in a normalised state vocabulary** — 61 occurrences of
    `data-open` against 3 of `data-popup-open` (specific to Base UI). The base wrapper
    absorbs each primitive's state notation (Radix's `data-state=open` and so on) so that
    the styles hold regardless of base — that is the mechanism behind the orthogonality of
    the 24 variants.
  - In the aria edition the same component has **four times the className wiring** (8
    against 2 for the button) — the cost of React Aria's render-prop structure, visible
    directly in the code.
  - ~~The exact point where the normalisation happens (the wrapper or the build)~~ →
    **resolved (2026-08-18, `registry/README.md` + `bases/radix/ui/dialog.tsx` measured).**
    Normalisation happens **in a hand-written wrapper layer** — `bases/<base>/ui/*.tsx`
    wraps the primitive as-is and attaches only `data-slot` attributes and `cn-*` semantic
    classes (zero visual styling), while the presentation is entirely externalised into
    `styles/style-*.css` in the form
    `.style-nova { .cn-dialog-overlay { @apply … } }`.
    The per-style component a user receives is the **build output** of multiplying the two
    (`build-registry.mts`; the combination registry is generated during the build and then
    deleted).
    `new-york-v4/` is the exception — legacy source written by hand rather than generated.

## The Figma kit — none official, only a community list (2026-08-18)

`figma_kit: unverified` → **settled as `false`**. Source <https://ui.shadcn.com/docs/figma>.

**Even though the documentation has a dedicated Figma page at the top level of the
sidebar**, what that page does is gather and display third-party kits. A note at the top of
the page pins down its character.

> **Note: The Figma files are contributed by the community.** If you have questions or
> feedback, contact the maintainer of each Figma file.

The list splits into **a Free and a Paid section**, and each entry carries an individual or
team credit in the form "**by ⟨maker⟩**" — for instance `shadcn/ui components` (Sitsiilia
Bergmann) and `shadcn/ui design system` (Pietro Schirano) in the free section, and
`shadcn/ui kit` (Matt Wierzbicki) · `shadcncraft` (all eight styles plus Pro blocks, with
matching React code generation) · `shadcn/studio UI Kit` (550+ blocks, 20+ themes) ·
`Shadcnblocks.com` (500+ blocks, theme variables, Figma MCP support) ·
`Obra shadcn/ui Pro` in the paid section.

**In other words the maintenance is not the project's own.** The code follows a "copy it
into your own repository" model, and by the same logic the design assets are
**outsourced** — the exact opposite direction from USWDS, which **removed** its third-party
links when it shipped an official kit.

**Static-site note:** `ui.shadcn.com` carries its whole body in the SSR HTML, so no headless
render is needed (`/docs/figma` is 493KB, and the body extracts cleanly once the scripts are
stripped).
