<!-- lang-links -->
> **English** · [한국어](feedback.ko.md)
<!-- /lang-links -->

# Feedback

**Comparing the severity systems and dimensions of alerts, toasts and badges.**

> **Eighteen systems carry evidence** (updated 2026-08-18) — to Cloudscape ·
> shadcn/ui · Mantine · Radix Themes · Atlassian (motion) · Evergreen (intents) ·
> Tizen CircularUI, **eleven were added: Carbon · Vuetify · Ant Design · Chakra UI ·
> PrimeVue · Semi · Naive UI · EUI · Blueprint · Grommet · Sonner**.
>
> Cloudscape is at the centre of this document's earlier part — it keeps **five severity
> steps, four kinds and four context overrides** as tokens.
>
> **Three documentation-layer conclusions are overturned in the "re-synthesis across 18
> samples" section below** — the floor on toast duration, the default position and the
> simultaneous count cap. Where the earlier part and the re-synthesis disagree, **the
> re-synthesis takes precedence.**

## Severity systems — two different axes

The sample carries a **semantic** axis and a **severity** axis separately.

| axis | values | systems holding it |
|----|-----|-------------|
| **semantic** | `success` · `error` · `warning` · `info` | Cloudscape · Mantine · Evergreen · shadcn/ui (sonner) |
| **severity** | `critical` · `high` · `medium` · `low` · `neutral` | **Cloudscape alone** |

### Cloudscape — it ships both axes

**The semantic axis** (`flashbar`):

| token | light / dark |
|------|-----|
| `color-background-flashbar-success` | `#00802f` |
| `color-background-flashbar-error` | `#db0000` |
| `color-background-flashbar-info` | `#006ce0` |
| `color-background-flashbar-warning` | **`#ffe347`** |

**The light and dark values are identical.** For all four colours — the flashbar is the same
colour regardless of mode.

**Only `warning` is yellow (`#ffe347`), so the text colour parts.**

| token | value |
|------|-----|
| `color-text-notification-default` | `#f9f9fa` (white) |
| **`color-text-notification-yellow`** | **`#0f141a`** (black) |

**Black text is used on the yellow background alone.** The other three take white —
**contrast paired per background colour** (the same structure as the background/foreground
pairing rule in `color.md`).

**The severity axis** (`notification-severity`):

| severity | background | text |
|--------|-----|-----|
| `critical` | `#870303` (deep red) | white / **black in dark** |
| `high` | `#ce3311` (red) | white / black in dark |
| `medium` | **`#f89256`** (orange) | black |
| `low` | **`#f2cd54`** (yellow) | black |
| `neutral` | `#656871` (grey) | white |

**critical → high → medium → low is a hue ramp** — red → orange → yellow.
`neutral` sits outside the family, in grey.

**`medium` and `low` have the same background in light and dark, and black text in both.**
Only `critical` and `high` lighten their background in dark and switch to black text.

**Cloudscape is the only system in the sample to carry a semantic axis and a severity axis
at once.** It can express "an error, but of low severity".

### The breadth of state colours in the other systems

| system | state colours |
|--------|--------|
| **Cloudscape** | 4 semantic + 5 severity + 5 hues (`blue` · `green` · `grey` · `red` · `yellow`) |
| **Atlassian** | danger · warning · success · **discovery** · information (10 each, counting backgrounds) |
| Evergreen | success · warning · danger · **none** |
| Mantine | error · success (on input fields) |
| **shadcn/ui** | **a single `destructive`** |

**shadcn/ui is the narrowest.** Its Alert component has **two** variants —
`default` and `destructive`. There is no `success`, `warning` or `info` variant.

**sonner (the toast), however, has five icons.**

| state | icon |
|------|--------|
| `success` | `CircleCheckIcon` |
| `info` | `InfoIcon` |
| `warning` | `TriangleAlertIcon` |
| `error` | `OctagonXIcon` |
| `loading` | `Loader2Icon` (`animate-spin`) |

**Only the icons differ; the colours are all the same** — `--normal-bg: var(--popover)`.

```js
"--normal-bg": "var(--popover)",
"--normal-text": "var(--popover-foreground)",
"--normal-border": "var(--border)",
"--border-radius": "var(--radius)",
```

**State is distinguished by icon shape alone, not by colour.**
The exact opposite of Cloudscape's four background colours.

**The icon shapes are distinguishable independently of colour** —
a circle (success) / a circle (info) / a triangle (warning) / an octagon (error).
A structure robust to colour-vision deficiency, except that **`success` and `info` are both
circles, so shape alone does not separate them.**

## Alert dimensions

| system | padding | radius | border | type |
|--------|:---:|:---:|:---:|:---:|
| **shadcn/ui** | **16 / 12** (`px-4 py-3`) | **10px** (`rounded-lg`) | 1px | 14 |
| **Cloudscape** | vertical 8 / compact 4 | **12px** | **2px** (a token per side) | — |
| **Mantine** | **16 / 16** (`--mantine-spacing-md`, `Alert.css` 9.5.1) | `--mantine-radius-default` (8px) | `1px solid transparent` | 14 (`sm` for both title and body) |
| **Radix Themes** | **12 / 16 / 24** (size 1–3, `--space-3`–`5`) | **6 / 8 / 12px** (`--radius-3`–`5`, at factor 1) | none (background/shadow variants) | tied to size |

**Mantine Alert in detail** (measured in `Alert.css`): a 20×20 icon (a first-line correction
of `margin-top: 1px`, with a 16px right margin) · the title `sm` **bold** · a 10px
title-to-body gap (`--mantine-spacing-xs`) · an extra 16px of right padding on the title
when there is a close button.
The padding is an even 16px on all sides — a square inset, unlike shadcn/ui's
(horizontal > vertical).

**Cloudscape's alert border is 2px and each side is a token.**

| token | value |
|------|:---:|
| `border-width-alert` | 2px |
| `border-width-alert-block-start` | 2px |
| `border-width-alert-block-end` | 2px |
| `border-width-alert-inline-start` | 2px |
| `border-width-alert-inline-end` | 2px |

**All four sides are 2px, and yet there are five tokens.** Room left to change one side
later — the same pattern as Atlassian's `border.width.selected`/`focused` holding the same
value in separate tokens.

**It uses logical property names (`block-start` · `inline-end`)** — they flip automatically
in RTL (`i18n/README.md`).

### The flashbar's left border is 0

| token | value |
|------|:---:|
| `border-width-alert-inline-start` | **2px** |
| **`border-width-flashbar-inline-start`** | **0px** |

**The alert has a left border and the flashbar does not.**
The flashbar's background colour itself signals the state, so it needs no border.

### Radius — alerts 12px, badges 4px

| token | value |
|------|:---:|
| `border-radius-alert` | **12px** |
| `border-radius-flashbar` | **12px** |
| `border-radius-badge` | **4px** |

**Alerts and flashbars are the same at 12px and badges are 4px** — a threefold difference.
The alert is smaller than Cloudscape's container radius (16px).

**shadcn/ui's alert is 10px** (`rounded-lg` = `--radius`), 2px smaller than Cloudscape's.

### Title weight — both 700

| token | value |
|------|:---:|
| `font-weight-alert-header` | **700** |
| `font-weight-flashbar-header` | **700** |

shadcn/ui uses `font-medium` (500) — **Cloudscape is 200 heavier.**

## shadcn/ui's alert — the grid changes with the presence of an icon

```
grid grid-cols-[0_1fr] gap-y-0.5
has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]
has-[>svg]:gap-x-3
```

| condition | grid columns |
|------|-----------|
| no icon | **`0 1fr`** (a zero-width first column) |
| an icon | **`16px 1fr`** plus a 12px column gap |

**The icon column is kept at 0px and switched on with `:has()`.** The title and description
are always at `col-start-2`, so **alignment holds even without an icon.**

The same pattern as the Button's `has-[>svg]:px-3` and the Table's
`[&:has([role=checkbox])]:pr-0` — **shadcn/ui uses `:has()` as its standard tool for
conditional layout.**

| element | value |
|------|-----|
| icon size | 16 (`size-4`) |
| icon vertical correction | **+2px** (`translate-y-0.5`) |
| icon colour | `text-current` (inheriting the title colour) |
| title | `font-medium tracking-tight`, **`line-clamp-1`**, `min-h-4` |
| description | 14px, `text-muted-foreground`, `[&_p]:leading-relaxed` |
| row gap | 2px (`gap-y-0.5`) |

**The title is clipped to one line** (`line-clamp-1`). A `min-h-4` (16px) minimum height
keeps the layout from collapsing when there is no title.

**The `destructive` variant does not change the background** — `bg-card` stays and only the
text becomes `text-destructive`, with the description at `text-destructive/90`.

**The exact opposite of Cloudscape expressing state through the background colour.**

| system | state expression |
|--------|-----------|
| **Cloudscape** | **the whole background colour** (`#db0000` and so on) |
| **shadcn/ui** | **the text colour alone** (the background stays `card`) |

## Mantine — alerts and notifications use different colours

| component | colour token |
|----------|---------|
| **Alert** | `--mantine-primary-color-light` (background) / `-light-color` (text) |
| **Notification** | `--mantine-primary-color-filled` |

**Alert takes the `light` family and Notification the `filled` family.**
For the same state, an inline alert gets a pale background and a toast a filled one.

Mantine's derived token system seen in `color.md` (`-filled` · `-light` · `-light-color`) is
consumed differently per component.

**The border is `1px solid transparent`** — the thickness is kept and only the colour is
transparent.
The same purpose as Pajamas's `border.color.transparent` (`color.md`) —
**the layout does not shift when the border comes on.**

### Notification measured (`Notification.css`)

| element | value |
|------|-----|
| left colour bar | **6px wide**, a `::before` pseudo-element, 4px from the left |
| the bar's vertical inset | **`var(--notification-radius)`** — it retreats by the radius |
| left padding | 22px (including the bar's space) |
| **vertical and right padding** | **10px** (`--mantine-spacing-xs`) — no fixed height (derived from content) |
| icon circle | 28×28px, a `filled` background (16px from the body) |
| shadow | `shadow-lg` |
| title | text-sm medium, 2px from the body |

- **When there is an icon the colour bar disappears** (the `::before` is removed under
  `data-with-icon`) — a rule in which the severity marker hands over from the bar to the
  icon.
- **The bar's vertical margin refers to the container's radius** — enlarging the radius
  shortens the bar so it does not intrude on the corner curve. A good example of a derived
  rule.
- The hover background branches on `@media (hover: hover)` and `:active` produces the same
  colour on touch — the hover/touch branch seen in `table.md` applies here too.

## Radix Themes' Callout — the icon height matches the line height

| token | value |
|------|-----|
| `--callout-icon-height` | `var(--line-height-2)` (20px) |
| `--callout-icon-height` | `var(--line-height-3)` (24px) |

**The icon height refers to the line height rather than the type size.**
Sizes 1 and 2 use `line-height-2` (20px) and size 3 `line-height-3` (24px).

**The icon becomes exactly as tall as the first line, so no baseline correction is needed.**
It solves structurally the place where shadcn/ui drops 2px with `translate-y-0.5`.

| method | systems |
|------|--------|
| icon height = line height | **Radix Themes** |
| a fixed icon size plus a positional correction | **shadcn/ui** (16px plus a 2px drop) |

### Callout dimensions (measured in `callout.css` 3.3.0)

| size | padding | radius (at factor 1) | icon-to-text gap |
|:---:|:---:|:---:|:---:|
| 1 | 12 (`--space-3`) | 6 (`--radius-3`) | 8 |
| 2 | 16 (`--space-4`) | 8 (`--radius-4`) | 12 |
| 3 | 24 (`--space-5`) | 12 (`--radius-5`) | 16 |

- **Padding, radius and gap all step up together with the size** — the same rule as Dialog
  (padding and radius tied together) applies to Callout
- The layout is **grid**, not flex — the icon goes to `grid-column-start: -2` and everything
  else to `-1`, so **the text column holds even without an icon.**
  A grid solution to the same problem shadcn/ui solves by switching on the icon column with
  `:has()`
- The variants are backgrounds and shadows rather than borders — soft (an `--accent-a3`
  background) · surface (an `a2` background plus a 1px `a6` inset shadow) · outline (a 1px
  `a7` inset shadow).
  A sample that draws alerts with zero real border

## Toast motion — Atlassian's dedicated `reposition` token

| token | duration | keyframes · properties |
|------|:---:|------|
| `motion.flag.enter` | **250ms** | `SlideIn50PercentLeft` + `FadeIn0to100` |
| `motion.flag.exit` | **200ms** | `SlideOut15PercentLeft` + `FadeOut100to0` |
| **`motion.flag.reposition`** | **250ms** | **`properties: ['transform']`** |

**`reposition` is the movement of the remaining toasts as one stacks or disappears.**
Atlassian is the only system in the sample to keep this axis as **a dedicated motion
token.**

> **Correction (2026-08-18).** The axis itself is not Atlassian's alone —
> **Blueprint** (a sibling selector, `transform` 100ms plus a 50ms delay) ·
> **Sonner and Chakra UI** (a `height 400ms` transition) solve the same problem
> differently.
> See "re-synthesis across 18 samples" below.

**The entry and exit travel differ** — 50% in, 15% out.
**It comes in from off-screen and leaves with a short movement** (`motion.md`).

The easings differ too.

| token | easing |
|------|------|
| `flag.enter` | `out.bold` — `cubic-bezier(0, 0.4, 0, 1)` |
| `flag.exit` | `in.practical` — `cubic-bezier(0.6, 0, 0.8, 0.6)` |
| `flag.reposition` | **`inout.bold`** — `cubic-bezier(0.4, 0, 0, 1)` |

**Only `reposition` is `inout`** — it decelerates at both ends.
Entry and exit decelerate at one end only.

That `flag.enter` uses `out.bold` puts it in the same family as the large-area components
(blanket · modal · panel · sidenav) — **the toast is treated as a large area rather than a
small element.**

## Context overrides — Cloudscape

Inside an alert or flashbar, other components' tokens change.

| context | overridden tokens |
|----------|:---:|
| `alert` | **28** |
| `flashbar` | **47** |
| `flashbar-warning` | **52** |
| `alert-header` | **182** |
| `app-layout-toolbar` | **1** (it re-declares 563 but only one value actually differs) |

`app-layout-toolbar` is the extreme case — the context carries all 563 tokens while the only
value differing from the root is `color-background-layout-main`
(`#ffffff→#fcfcfd` / dark `#161d26→#131920`). It is a context whose purpose is
**to sink the body background half a step so the toolbar lifts**, and the other 562 are
copies — evidence that the context mechanism works by "whole snapshot".

### It makes buttons on a coloured background transparent

```
color-background-button-normal-default : { light: #ffffff } → { light: transparent }
color-background-button-normal-hover   : { light: #f0fbff } → { light: rgba(0,7,22,0.15) }
color-background-button-primary-default: { light: #006ce0 } → { light: #f9f9fa }
```

**A button inside a flashbar becomes a transparent, backgroundless button, taking 15% black
alpha on hover.**
The primary button inverts from blue to white.

**The alpha values differ between `flashbar` and `flashbar-warning`.**

| context | hover alpha | active alpha | primary button |
|----------|:---:|:---:|-----|
| `flashbar` (a coloured background) | **0.15** | **0.2** | `#f9f9fa` (white) |
| `flashbar-warning` (a yellow background) | **0.05** | **0.1** | `#424650` (dark grey) |

**On the yellow background the alpha is a third** (0.15 → 0.05).
Fifteen per cent black is far too heavy on a light background.

**The primary button goes the other way too** — a white button on a dark background, a dark
grey one on yellow.

### The `alert` context parts between light and dark

```
color-background-button-normal-hover : { light: rgba(0,7,22,0.05), dark: rgba(255,255,255,0.1) }
```

**An alert has a pale background, so it uses black alpha in light and white alpha in dark.**
The flashbar's background is dark, so both use black alpha.

**`alert-header` is 182 tokens, the same scale as `top-navigation`** —
it overwrites the `light` values with the `dark` values to darken the header region.

**Cloudscape is the only system in the sample to adjust even a button's alpha by state
context.**
The component does not need to know "am I inside a flashbar?"

## Badges

| system | value |
|--------|-----|
| **shadcn/ui** | `rounded-full`, `px-2 py-0.5`, 12px, weight 500, a 12px icon |
| **Cloudscape** | radius **4px**, border **0px**, 5 colours + 5 severities |
| shadcn/ui (sidebar) | 20px tall · `min-w-5` · **`tabular-nums`** |

**The radii are opposites** — shadcn/ui is a full pill, Cloudscape 4px.

**Every Cloudscape badge border is `transparent`.**

```
color-border-badge · -badge-grey · -badge-green · -badge-blue · -badge-red
color-border-badge-severity-critical · -high · -medium · -low · -neutral
```

**All ten tokens are `transparent`.** `border-width-badge` is `0px` too —
**the slot for a border is made as a token and left empty.**

There is a separate `color-background-badge-icon` (`#db0000`) — the notification dot that
attaches to an icon. **In the `top-navigation` context that colour changes to a bright red
(`#ff7a7a`) even in light mode** — because it sits on a dark top bar.

## Empty state — shadcn/ui's `empty.tsx` (2026-08-18, main@8a7701e)

The only confirmed case in the sample of an empty state as a component. Measurements of its
six pieces (Empty / Header / Media / Title / Description / Content):

| element | value |
|------|-----|
| container | padding **24 / 48px from md** (`p-6 md:p-12`), radius 10 (`rounded-lg`), **a dashed border**, centred, `gap-6` (24px) between pieces |
| icon cell (`Media` icon variant) | **40×40** `bg-muted` at radius 10, a 24px icon, 8px below |
| title | **18px** (`text-lg`) medium |
| description | 14px `muted-foreground`, `relaxed` line height, links underlined with an offset of 4 |
| body width | both Header and Content limited to **`max-w-sm` (384px)** |

- **A dashed border (`border-dashed`) is the default** — the only visual device separating
  "nothing here yet" from a solid card
- The text uses `text-balance` to even out the wrapping — a short-notice premise
- The action area (`Content`) is a separate piece, so buttons and links sit 16px (`gap-4`)
  from the description. Unlike an alert it has no severity axis at all — a neutral component
  with no state colour

## Guidance at the documentation layer — measured (2026-08-18)

The documentation of eight systems (M3 · Atlassian · Spectrum · Polaris · Carbon · Primer ·
Cloudscape · GOV.UK) was read directly.

### Toast position — all four quadrants appear. No cross-system recommendation is possible

| position | systems |
|------|--------|
| top right | Carbon ("slide in and out from the top right") |
| **bottom left** | Atlassian Flag (consistent with the leftward slide of its motion tokens) |
| bottom centre | Spectrum (16px above the viewport bottom · changeable) |
| bottom | M3 snackbar (nudged above the FAB) · Polaris |
| the page's top region | Cloudscape Flashbar (the app layout's notifications region) |
| no component | **GOV.UK** (nothing toast-like among its 35 components — it does not have transient notifications at all) |
| **not recommended** | **Primer** ("significant accessibility concerns and are not recommended") — the component was removed from the documentation |

**The sample splits across four quadrants plus absence plus non-recommendation** — the axis
with the least convergence in the corpus. Primer's and GOV.UK's absences are a position, not
an oversight (the accessibility problems of transient messages).

> **Correction (2026-08-18).** "No system prescribes the bottom right" is true only at the
> documentation layer. **At the code layer Sonner (`position: 'bottom-right'`, adopted by
> shadcn/ui) and EUI (`side: 'right'` + `bottom: 0`) ship the bottom right as their
> default.** The code-layer mode is the top (six samples) —
> see "re-synthesis across 18 samples" below.

### Toast duration — convergence on a five-second floor, plus a camp against auto-dismissal

| rule | systems |
|------|--------|
| 8 seconds by default (an a11y minimum of 8 seconds) | Atlassian's `autoDismissSeconds` |
| 5000ms by default | Polaris's current Toast API |
| auto-dismissal optional, **a minimum of 5 seconds** when on | Spectrum (manual dismissal by default) |
| persistent by default, 5 seconds when optional | Carbon |
| 4–10 seconds (for snackbars without an action only) | M3 |
| **auto-dismissal forbidden** | Cloudscape ("Don't auto-dismiss while the user remains on the same page") · Primer (on WCAG 2.2.1 grounds) |

- **All five systems that state a figure are at five seconds or more.**
  > **Correction (2026-08-18).** "There is no sample allowing under five seconds" is wrong.
  > **Five of seven code-layer defaults are under five seconds** (Naive UI and Ant message ·
  > Tizen 3000ms · Sonner 4000ms · Ant notification 4500ms).
  > All are "short confirmation message" components, and the same systems' notification
  > components are longer — see "re-synthesis across 18 samples" below.
- A shared prohibition: **auto-dismissing a toast that carries an action or matters**
  (Atlassian, Carbon and M3 all say so; Spectrum requires pausing on focus).

### Maximum number of toasts — "one" parts from "a stack"

- **One at a time**: M3 ("Only one snackbar may be displayed at a time") ·
  Spectrum (replacing and queueing through an eight-level priority queue)
- **Stacking allowed**: Carbon (a vertical stack, newest on top) · Atlassian (newest on top,
  mixing dismissible and non-dismissible forbidden) · Cloudscape (a collapsed stack enforced
  from the second)
- Systems with a numeric cap (N) at the documentation layer: **zero.**
  > **Correction (2026-08-18).** There is one at the code layer — **Sonner's
  > `VISIBLE_TOASTS_AMOUNT = 3`** (the excess are hidden with `opacity: 0` rather than
  > deleted).
  > EUI's 3 is not a cap but the threshold at which a "clear all" button appears.

### Alert and banner placement — the top-of-page camp vs the section-inline camp

- **Top of page**: GOV.UK (immediately before the h1 · the error summary at the very top of
  main) · Spectrum's Alert banner (below the header) · Atlassian's Banner (at the very top ·
  **one at a time**)
- **Near the relevant section**: Primer ("near the relevant section; above the headline when
  global") · Carbon ("near the relevant item") · Polaris (global = outside the section /
  contextual = inside it) · Atlassian's Section message
- **Form error summaries part in exactly opposite directions**: GOV.UK and Primer put them
  at the top of the form or page, **Carbon and Cloudscape at the bottom of the form
  (immediately above the submit button)**. Cloudscape even codifies "no general message at
  the top of the page" — opposite rules, top and bottom, on the same problem.
- M3 has no banner component (high importance is the dialog's business).

### Alert and banner auto-dismissal — absent, unanimously 8/8

**Not one of the systems checked has a rule for time-based auto-dismissal of banners, alerts
or inline notifications** — persistence is not a convention but **a unanimous norm.**
The only automatic removal is "on leaving the page" (GOV.UK's success banner · Cloudscape's
flashbar), and Atlassian's Banner has no close button at all (it is removed only when the
condition clears).
Auto-dismissal is a property of the toast, not of the alert.

## Re-synthesis across 18 samples — component measurements (2026-08-18)

To resolve the feedback axis having zero new samples, eleven systems that actually ship
toasts, alerts and badges were newly read (Carbon `@carbon/styles@1.113.0` ·
Vuetify `4.1.10` · Ant `antd@6.6.1` · Chakra `@chakra-ui/react@3.36.1` ·
PrimeVue `@primeuix/themes@3.0.0` · Semi `@semi-bot/semi-theme-default@1.0.0` ·
Naive UI `2.45.0` · EUI `@elastic/eui@119.0.0` ·
Blueprint `@blueprintjs/core@6.18.0` · Grommet `2.56.0` · **Sonner `2.0.8`**).

**Sonner is a separate library shadcn/ui adopted as its toast.**
shadcn/ui's `sonner.tsx` is a wrapper mapping colour variables only, and the dimensions and
behaviour are entirely Sonner's business, so below **they are attributed to Sonner.**

### Correction 1 — the five-second floor on default toast duration breaks at the code layer

The documentation-layer synthesis was that "all five systems stating a figure are at five
seconds or more, and there is no sample allowing under five seconds." **The defaults in
component code differ.**

| value | systems (code-layer defaults) |
|:---:|--------|
| **3000ms** | **Naive UI** `MessageProvider.duration` · **Ant Design** message `DEFAULT_DURATION` · Tizen CircularUI |
| **4000ms** | **Sonner** `TOAST_LIFETIME` |
| **4500ms** | **Ant Design** notification `DEFAULT_DURATION` |
| 5000ms | **Blueprint** `Toast` `timeout` |
| 8000ms | **Grommet** `notification.toast.time` |

> **Correction.** **Five of seven code-layer values are under five seconds.**
> The documented rules (Atlassian 8 seconds · Polaris 5 · Spectrum and Carbon a minimum of
> 5) part from the actual library defaults.
>
> **The character differs, though** — everything under five seconds is a "short confirmation
> message" component (Ant's `message` · Naive's `message` · Sonner), and **the same systems'
> notification components are longer** (Ant message 3000 vs notification 4500). Grommet's
> 8000ms matches Atlassian's documented rule exactly.
>
> **What is overturned is "there is no sample under five seconds", not "do not auto-dismiss
> a toast carrying an action".** The latter still holds.

### Correction 2 — some systems ship the bottom right as their default

The one thing the documentation-layer synthesis had in common was that "no system prescribes
the bottom right".

| default position | systems (code layer) |
|------|--------|
| **bottom right** | **Sonner** (`position: 'bottom-right'`) · **EUI** (`side: 'right'` + `bottom: 0`) |
| top right | Ant Design notification (`placement: 'topRight'`) |
| top centre | Semi (`top: 0` + `text-align: center`) · Ant message · Naive UI message (`placement: 'top'`) |
| top | Blueprint (`toast-container-top`, centred horizontally) · Grommet (`layer.position: 'top'`) |

> **Correction.** **The default position of the toast shadcn/ui actually ships (Sonner) is
> the bottom right.** EUI is the bottom right too. A quadrant no one prescribed at the
> documentation layer has **two samples at the code layer.**
>
> **The code-layer mode is the top (six samples)**, three of them top centre —
> which likewise does not overlap the documentation layer (Carbon top right · Atlassian
> bottom left · Spectrum bottom centre). **Position is still the least convergent axis in
> the corpus.**

### Correction 3 — some systems do set a numeric cap

> **Correction.** The documentation-layer synthesis was that "zero systems set a numeric cap
> (N)".
> **Sonner cuts the simultaneous display to three with `VISIBLE_TOASTS_AMOUNT = 3`** —
> the excess are not deleted but hidden via `data-visible=false` → `opacity: 0`.
>
> **EUI's is a threshold, not a cap** —
> `CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT = 3` makes **a "clear all" button appear from the
> third.** It does not cut the count.
>
> Ant and Naive UI have `max` and `maxCount` props but **no defaults** (unlimited). Two
> systems have given the same number, 3, different meanings.

### Correction 4 — Atlassian is not alone in having a reposition

The earlier document recorded that "Atlassian is the only system in the sample to keep this
axis as a token."
**Three implementations are confirmed.**

| method | systems | values |
|------|--------|-----|
| **a dedicated motion token** | **Atlassian** | `motion.flag.reposition` 250ms, `transform`, `inout.bold` |
| **a sibling-selector transition** | **Blueprint** | `transform` on `~ .bp6-toast`, **100ms plus a 50ms delay** |
| **a `height` transition** | **Sonner** · **Chakra UI** | both `height 400ms` (the same length as entry and exit) |

- **Only Blueprint has a delay (50ms)** — the rest close the gap after the departing toast
  has gone. Its duration is also a third of the entry and exit (300ms).
- **Sonner and Chakra interpolate the height** — while the stack is folded, a toast behind
  takes the height of the one in front (`--front-toast-height`) and returns to its own when
  expanded.
- **The earlier judgement that "its absence is always noticeable" holds** — four systems
  solve the same problem in different ways.

### Toast width — they cluster at 350–390px

```
288 → 352   Carbon      (widening at the max breakpoint — the only responsive one)
352         PrimeVue    (22rem)
356         Sonner      (TOAST_WIDTH)
365         Naive UI    notification
384         Ant Design notification · Grommet (size 'medium')
440         EUI         the list container (a source comment: "results in 360px toast width")
min/max     Vuetify 344–672 · Naive UI message 420–720 · Blueprint 300–500
none        Semi (inline-flex) · Ant message (max-content)
```

**The five samples with a fixed width all fall within 352–384px**
(PrimeVue 352 · Sonner 356 · Naive UI 365 · Ant 384 · Grommet 384).
Carbon reaches 352px at its largest breakpoint too — its default is 288px.
The clearest convergence on the feedback axis held.

- **Only Carbon is responsive** (288 → 352px). The rest are fixed, switching to
  `width: 100%` on mobile (Sonner ≤600px · EUI at the `m` breakpoint and below).
- **Vuetify, Naive UI and Blueprint use a minimum/maximum pair** — the width varies with the
  content length.
- **Semi and Ant's message have no width spec** — a short-confirmation premise.

### Toast padding and radius

```
padding  10px      PrimeVue (overlay.popover.padding) · Naive UI message (10/20)
         12/8px    Semi
         16px      Sonner · Naive UI notification · Chakra (vertical 16 / left 16 / right 24)
         13px+     Carbon (19px together with the 6px left accent border)
radius    4px      Blueprint
          6px      Semi (radius-medium)
          8px      Sonner · Ant alert (borderRadiusLG)
          token    PrimeVue, Chakra, Vuetify (referring to the system radius)
```

**Only Chakra's horizontal padding is asymmetric** (left 16 / right 24px) — the space for
the close button.

### Alert padding — 12–16px in the majority, with the extremes spreading

```
 6/10   PrimeVue Message      (an inline-message premise, the minimum)
 8      Cloudscape (vertical) · Ant default (a literal vertical 8 / horizontal 12)
12      Chakra sm · Radix 1 · Semi Banner (12/12) · EUI CallOut s (12/16)
13      Naive UI              (off any multiple of 4 or 8)
16      shadcn/ui (16/12) · Mantine · Vuetify · Blueprint · Chakra md and lg · EUI CallOut m · Radix 2
20/24   Ant descriptive       (paddingMD / paddingContentHorizontalLG, the maximum)
24      Radix 3
```

**16px is the mode at seven samples.** It does not contradict the earlier edition's "16 / 12"
recommendation.

- **Naive UI's 13px** is off any multiple of 4 or 8, and its icon margin is
  `11px 8px 0 12px` — all four sides different, optical alignment driven in as literals.
- **Only Ant's horizontal padding is a literal 12px**, pinned by a source comment reading
  `// Fixed value here.` An exception in a system where everything else derives from the
  seed.
- **Ant, Chakra, EUI and Radix have a size axis on the alert** (by the presence of a
  description, or s/m/lg).

### The left accent border — 2–8px, with a case tied to background lightness

```
8px   Vuetify   ($alert-border-thin-width, currentColor at 0.38 opacity)
6px   Carbon    (toast and inline) · Mantine Notification's colour bar (6px, inset vertically by the radius)
3px   Carbon's low-contrast variant · EUI CallOut (border.thin + border.thick)
2px   Cloudscape alert
0px   Cloudscape flashbar (unnecessary, since the background colour signals the state)
```

**Carbon ties it to background lightness** — 6px by default, halving **to 3px** in the
`low-contrast` variant (a pale background). The only case in the sample held of changing the
accent line's thickness by variant.

**EUI draws the accent line with a `::before` and makes it overflow the container by 1px
above and below** (`block-size: calc(100% + 2px)`) so that **it meets the rounded corners.**
The same problem as Mantine referring to the radius for the bar's vertical inset, solved the
opposite way.

### Icon alignment — the type-relative camp has grown to two

| method | systems |
|------|--------|
| **relative to type or line height** | **Radix Themes** (height = `--line-height-2/3`) · **Chakra UI** (`width: 1em; height: 1em`) |
| **a fixed px plus a positional correction** | shadcn/ui (16px + `translate-y-0.5`) · **PrimeVue** (1rem + `margin: 1px 0 0 0`) · **Mantine** (20px + `margin-top: 1px`) · **Naive UI** (24px + `margin: 11px 8px 0 12px`) |
| a fixed px, correction unverified | Vuetify 28px · EUI · Blueprint (16px, absolutely positioned at `top: 18px`) |

**The type-relative camp has grown from Radix Themes alone to two.**
Chakra uses `1em` (the type size) rather than the line height — the same idea on a different
baseline.

**The corrections cluster at 1–2px** (PrimeVue 1 · Mantine 1 · shadcn/ui 2).
Naive UI's 11px is a consequence of its icon being a large 24px.

### Badges — 20px is the modal height, and the weight parts from 400 to 700

```
height 16   Chakra xs
       18   Semi · Naive UI · Carbon tag xs and sm · PrimeVue sm · EUI (an 18 line height + 2 border = 20)
       20   Ant · PrimeVue default · Vuetify · Chakra sm (the default) · shadcn/ui sidebar
       24   Chakra md · Carbon tag md (the default) · PrimeVue lg
       28   Chakra lg · PrimeVue xl
       32   Carbon tag lg
dot     6   Ant (fontSizeSM / 2)
        8   Semi · Naive UI · PrimeVue
        9   Vuetify
```

- **Five samples gather at 20px.** 18px is next.
- **Three systems have a size axis** — Chakra four steps (16/20/24/28) ·
  PrimeVue four (18/20/24/28) · Carbon three (18/24/32).
  **Chakra's and PrimeVue's scales almost coincide, offset by one rung.**
- **Type weight**: Ant **`normal` (400)** · Chakra, Vuetify and EUI **medium (500)** ·
  **PrimeVue 700**. Ant's 400 is unique in the sample held.
- **Type size**: PrimeVue **10px** (the minimum) · mostly 12px elsewhere.
- **Radius**: the pill side (shadcn/ui `rounded-full` · EUI `size.l` = 24px ·
  Carbon 16px · Ant · Naive UI · **Semi 9px = exactly half its height**) vs
  the square side (Cloudscape 4px · Vuetify 10px · Chakra `l2` · PrimeVue `radius.md`).
  **The pill is the majority at six samples** — the earlier edition's "the radii are
  opposites" (shadcn a pill / Cloudscape 4px) resolves into **Cloudscape being the
  minority.**
- **Tabular figures**: shadcn/ui's sidebar badge · **built into Chakra's badge recipe by
  default** (`fontVariantNumeric: "tabular-nums"`).
- **EUI's badge subtracts the border from its padding and line height** — a source comment
  records why
  (*"Account for the (usually transparent) border so that the visual padding is of size
  s"*). The border-subtraction habit of `patterns/button.md` is confirmed in badges too.

### State expression — the three camps hold, and the middle attitude has grown

| method | systems |
|------|--------|
| **the whole background colour** | Cloudscape's flashbar · **Chakra's toast** (only warning, success and error use `*.solid`; **info takes the neutral panel colour**) |
| **the text and icon colour alone** | shadcn/ui's alert · **Sonner's default** (`richColors` off) · **Semi's default variant** |
| **a pale background plus a state border** | Mantine's Alert · **PrimeVue** (a `color-mix(… transparent 5%)` background + a state border + **a per-state shadow**) · **Semi's `light` variant** · **Sonner's `richColors`** |

- **PrimeVue takes state into the shadow too** —
  `0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`.
  The only case in the sample held of pushing state colour as far as the shadow.
- **Semi keeps two attitudes inside one component** — the default is icon colour alone, and
  the `light` variant a pale background plus a 1px state border.
- **Only Chakra's `info` has no background specified** — it keeps the neutral panel colour.
- **Chakra's alert has a `neutral` state** — a case of a neutral state outside the four
  semantic ones (the same "filling an empty slot" as Atlassian's `discovery`).

### Toast entry and exit — a positional move plus a shrink is the convention

| system | entry | exit |
|--------|------|------|
| **Blueprint** | `translateY(-40px)` → 0, **300ms** `cubic-bezier(0.54, 1.12, 0.38, 1.11)` (an overshoot) | 300ms opacity plus **`filter: blur(0 → 8px)`** |
| **Sonner** | `translateY(±100%)` → 0, **400ms** | 400ms (`opacity` 200ms) · swipe removal 200ms |
| **Chakra** | translate, scale and opacity over **400ms** `cubic-bezier(0.21, 1.02, 0.73, 1)` | 400ms (`opacity` 200ms) `cubic-bezier(0.06, 0.71, 0.55, 1)` |
| **EUI** | `translateY(24px) scale(.9)` → 0/1, `animation.normal` + `resistance` | **250ms** (`TOAST_FADE_OUT_MS`) |
| **Vuetify** | `scale(0.8)` → 1 | unverified |
| **PrimeVue** | 0.3s plus a **`blur: 10px`** token | 0.3s |
| Atlassian | a 250ms 50% leftward slide plus a fade | 200ms at 15% travel |

- **Only Blueprint uses a blur on exit** (`filter: blur(8px)`).
  PrimeVue's `blur: 10px` is a different thing — a backdrop-blur token.
- **Blueprint's and Chakra's entry easings both overshoot**
  (y₁ = 1.12 / 1.02).
- **Two systems keep opacity shorter on exit** —
  both Sonner and Chakra move over 400ms while opacity takes 200ms.
  The same idea as Radix Themes' segmented control (movement 100 / opacity 80ms).
- **Sonner sets the stack shrink as `--scale: var(--toasts-before) * 0.05 + 1`** —
  each toast behind is 5% smaller.
- **Sonner switches the stack-expansion transform off under
  `@media (hover: none) and (pointer: coarse)`** — the hover/touch branch seen in
  `table.md` and `systems/mantine.md` applies to toasts too.

### Progress indication — only Ant has a spec

**Ant Design's notification** has a remaining-time progress bar —
**2px** tall, `linear-gradient(90deg, {colorPrimaryBorderHover}, {colorPrimary})`.
The only case in the sample held of visualising a toast's remaining time.

### Other single observations

- **Carbon's notification close button is 48×48px** — a sixth of the toast's width (288px),
  a case of applying a touch-target spec to dismissing a notification.
- **Carbon's inline notification max-width has four breakpoints**
  (288 → 608 → 736 → 832px).
- **Grommet's inline, global and toast kinds share a content structure and branch only on
  the container** — the global banner fills the screen width with **radius 0 and 48px
  inline padding.**
- **Vuetify's badge border is 2px plus `scale(1.05)`** — the border is enlarged to separate
  it from the background.
- **Sonner's close button hangs half off the corner with `translate(-35%, -35%)`.**
  The swipe threshold is 45px or a velocity of 0.11.
- **EUI's toast z-index is `levels.toast` 9000, above `modal`'s 8000**
  (`systems/eui.md`).

## Not yet filled in

- ~~Toast duration / position / maximum count / alert placement / auto-dismissal~~ →
  **resolved (2026-08-18)** — the "guidance at the documentation layer" section above
- ~~Mantine Notification and Alert dimensions~~ → **resolved (2026-08-18)** —
  measured in `@mantine/core@9.5.1`'s `Notification.css` and `Alert.css`. Alert padding
  fixed at 16 · Notification left 22 / the rest 10px (the "alert dimensions" and
  "Notification measured" sections above).
  Confirmed that neither has a fixed height (both derive from content)
- ~~Radix Themes Callout dimensions~~ → **resolved (2026-08-18)** — `callout.css` 3.3.0:
  padding 12/16/24, radius `--radius-3`–`5`, fixed grid columns. The "Callout dimensions"
  section above
- ~~shadcn/ui's `empty` component~~ → **resolved (2026-08-18)** — the "empty state" section
  above (`empty.tsx`, main@8a7701e)
- **Progress state colours** — only that Cloudscape's
  `color-background-progress-bar-value-default` changes by context is confirmed.
  The only remaining-time progress bar on a toast is Ant Design's (a 2px gradient)
- **Screen-reader announcement** (`aria-live` regions) — only that shadcn/ui's Alert has
  `role="alert"` is confirmed. The toasts' `aria-live` setting is unverified
  (Sonner is confirmed to have `containerAriaLabel: 'Notifications'` and a `customAriaLabel`
  prop, but the `aria-live` value could not be read)
- **Vuetify's and Semi's toast exit animations** — only the entry (scale 0.8 / none) is
  confirmed
- **Whether the code layer counters alert auto-dismissal** — none of the 18 samples was
  confirmed to have a time-based auto-dismiss default on an alert or banner. That does not
  contradict the documentation layer's unanimous 8/8, but not every component was swept

## Implementation defaults

**Severity system — choose one axis.**

```
semantic axis   success · error · warning · info         (four. Enough in most cases)
severity axis   critical · high · medium · low · neutral  (operations and monitoring screens)
```

**Cloudscape is the only one carrying both, and that is because of its domain — an
operations console.**
For an ordinary product, start with the four semantic values.

**Keeping a single `destructive`, as shadcn/ui does, is a real option too** —
though a semantic layer has to exist for later additions (`color.md`).

**Look at Atlassian's `discovery`** — a slot that fits none of success, error, warning or
info, such as "announcing a new feature", genuinely does arise.

**State expression — choose between the background colour and the text colour.**

| method | example | suited to |
|------|-----|-------------|
| **the whole background colour** | Cloudscape's flashbar | a notification at the top of the screen. Unmissable |
| **the text colour alone** | shadcn/ui's alert | an inline alert. It does not disturb the page's tone |
| a pale background plus dark text | Mantine's Alert (the `-light` family) | in between |

**If you use a background colour, pair the text colour to each background.**
Cloudscape uses black text on the yellow background (`#ffe347`) alone — which is why
`color-text-notification-yellow` is its own token.

**Do not distinguish state by colour alone.** shadcn/ui distinguishes by icon shape
(circle / triangle / octagon). But **if `success` and `info` are both circles, shape alone
does not separate them** — use at least two of colour, icon and text.

**Alert dimensions**

```
padding  16 / 12  (horizontal / vertical)
radius   10–12px
border   1–2px
title    weight 500–700
body     14px, a secondary colour
```

**This recommendation holds, since 16px alert padding is the mode across the 18 samples
(seven)** (re-verified 2026-08-18). For an inline message beside a form field it can come
down to PrimeVue's 6/10px, and a large alert carrying a description goes up to Ant's
20/24px.

**Cloudscape is the strongest at radius 12px / border 2px / weight 700, and
shadcn/ui the lightest at 10px / 1px / 500.**

**Decide whether to split the border width into per-side tokens when you need to.**
Cloudscape keeps five tokens (four sides plus the whole) all holding 2px — the slot for
adding a variant like a left accent border (`border-left: 4px`) later.

**Use logical property names** (`inline-start` / `block-end`).
They flip automatically in RTL (`i18n/README.md`).

**Icon alignment — refer to the type metrics.**

```
icon height = the first line's line height   (Radix Themes)
icon = 1em                                   (Chakra UI)
```

**The type-relative camp is now two samples** (2026-08-18). Fixing the size and adding a
correction (shadcn/ui +2px · PrimeVue +1px · Mantine +1px · Naive UI +11px) is still the
majority at four, but **the correction has to be re-tuned whenever the type size changes.**

**Keep the icon column at 0px and switch it on with `:has()`** (the shadcn/ui way).
The title and description stay aligned even without an icon.

**Clip the title to one line and set a minimum height** (`line-clamp-1` + `min-h-4`).
The layout then holds for an alert with no title.

**Toast width — choose within 352–384px** (added 2026-08-18).

```
fixed width  352–384  (PrimeVue 352 · Sonner 356 · Naive 365 · Ant and Grommet 384)
mobile       100%     (with 16px of inline margin)
```

**All five samples with a fixed width fall in that 32px band**
(and Carbon reaches 352px at its largest breakpoint) — the clearest convergence on the
feedback axis held. Where the content length varies greatly, a minimum/maximum pair
(Vuetify 344–672 · Blueprint 300–500) is a real option too.

**Toast motion**

```
entry       250–400ms  a slide from off-screen (+ scale 0.8–0.95) plus a fade
exit        200–400ms  a short move plus a fade (opacity shorter, at 200ms)
reposition  100–400ms  a transform or height transition
```

**Do not leave out `reposition`.** When toasts stack or one disappears, the remaining ones
teleporting is jarring. **There are three implementations** (updated 2026-08-18):

```
a dedicated motion token   Atlassian  transform 250ms inout
a sibling selector         Blueprint  transform 100ms plus a 50ms delay
a height transition        Sonner · Chakra UI  height 400ms
```

**Keep opacity shorter on exit** — Sonner and Chakra both move over 400ms with opacity at
200ms. The element appears to vanish before it leaves its place.

**Use an `inout` easing for repositioning** — unlike entry and exit, decelerating at both
ends makes it feel like "settling into place" rather than "being shoved".

**Badges**

```
height   20px       (the mode across the 18 samples — 18px next)
radius   a full pill (the majority at six samples. The square side, such as Cloudscape's 4px, is the minority)
padding  inline 6–8 / block 0–2
type     12px / weight 500
figures  tabular-nums
```

**Start at a height of 20px** (added 2026-08-18) — Ant · PrimeVue's default ·
Vuetify · Chakra `sm` · shadcn/ui's sidebar are all 20px.
For a size axis, **16 / 20 / 24 / 28** (Chakra) or **18 / 20 / 24 / 28** (PrimeVue) are the
references — the two systems' scales coincide, offset by one rung.

**The pill is the majority.** The earlier edition recorded that "the radii split into
opposites, a pill and 4px"; across the 18 samples it is **six pills to four square**, with
the pill ahead.
If you use a literal for the pill, **half the height** is safe (Semi's 18px → 9px).

**Use `tabular-nums` on numeric badges.** The width wobbles when the count goes from 9 to
10.
shadcn/ui's sidebar badge uses it together with `min-w-5` (20px), and
**Chakra builds it into the badge recipe by default.**

**Toast duration, position and count** (added 2026-08-18)

```
short confirmations   3–4s   (Ant and Naive message 3000 · Sonner 4000)
ordinary notifications 4.5–8s (Ant notification 4500 · Blueprint 5000 · Grommet 8000)
anything with an action  no auto-dismissal  (unanimous at the documentation layer — this one does not flip)
```

**The documented rule (five seconds and up) parts from the library defaults (3–4 seconds).**
The actual practice in the sample held is **to split the components** — 3–4 seconds for a
read-and-done confirmation, five seconds or more for a notification the user has to judge.
Ant splits them inside one system, message at 3 seconds and notification at 4.5.

**Fix the position once and do not change it.** Across the 18 samples it splits into the top
(6) · bottom right (2) · top right (1), and it does not overlap the documented rules
(top right, bottom left, bottom centre) either.
**This is an axis with no cross-system recommended value.**

**Consider a cap on the simultaneous count.** Sonner cuts at three (hiding the excess).
Without a cap the screen fills with toasts.
Instead of cutting, there is also EUI's approach of **showing a "clear all" button from the
third.**

**Handle buttons on a coloured background through a context.**

Cloudscape overrides the button background, hover alpha and primary button colour through
its `flashbar`, `flashbar-warning` and `alert` contexts.
**The component need not know where it is.**

```
on a dark background   hover 15% black · a white primary button
on a light background  hover  5% black · a dark grey primary button
on a pale background   5% black in light / 10% white in dark
```

**Reduce the alpha to a third on a light background.** Fifteen per cent black on yellow is
far too heavy.
