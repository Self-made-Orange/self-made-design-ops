# Implementation Defaults

This page collects the "implementation defaults" sections of the nine pattern documents in
this directory into one file.

**Regenerated 2026-08-18, after the re-synthesis.** All seven measurable axes were re-synthesised
against the component-level measurements now held for 68–83 systems — **Button 77 · Form 78 ·
Modal 79 · Motion 83 · Color 79 · Typography 68 · Table 6**. Everything below reflects that
re-synthesis rather than the earlier small-sample reading: desktop-web control height is **40px**,
not 36px; modal entry scale clusters at **0.8**, not 0.95; web modal radius is **not** concentrated
at 8–12px; centred modals **do** travel in most systems; three duration steps, not five, are the
sample mode; and colour state handling splits **six** ways, not four. Navigation and Feedback are
carried over unchanged — this round of deepening added no new samples on those two axes.

**This page is the conclusions, not the evidence.** The distributions, the per-system tables and
the corrections that produced these numbers live in the individual pattern documents, and each
section links to its source. Where the two disagree, the pattern document is authoritative.

## Contents

- [Typography](#typography)
- [Color](#color)
- [Button](#button)
- [Form](#form)
- [Motion](#motion)
- [Modal](#modal)
- [Table](#table)
- [Navigation](#navigation)
- [Feedback](#feedback)

## Typography

Source: [typography.md](typography.md)

**Body size — it splits by platform. It cannot be unified.**

```
Automotive  24  (Android Automotive minimum. Cannot go below this)
iOS         17  (Apple Body)
Web         16  (majority) or 14 (dense admin screens)
```

Set **16 as the web baseline, 14 where density is needed**, and keep iOS and automotive separate.

**The 14px camp is the largest in the sample — 13 systems** (corrected 2026-08-18; the previous
edition said 7). Ant Design · Material 3 (Body Medium) · Helios · Evergreen · Seed · Atlassian ·
shadcn/ui · Ring UI · Siemens iX · Serendie (compact) · Vibes · Naive UI · PrimeVue.
**It is the admin-screen and enterprise cluster with three more Greater China samples added**
(see the body-size section of `typography.md`).

**Distinguish the token default from the values components actually use.** shadcn/ui's token is
16px while its components are all 14px. If this mismatch goes undocumented, implementations drift.
**The 68-system sample strengthened the basis for this recommendation** — eight systems set control
type smaller than body (Bolt 12.8 · Evergreen 12 · Clarity 12 · Charcoal 14 …) and four set it
larger. **"Body = control" is not a convention.**

**Consider raising only input fields to 16px on mobile** (expanded 2026-08-18).
It blocks iOS Safari's automatic zoom, and **it is not a shadcn/ui idiosyncrasy but a problem seven
systems address in common** — Bolt (global enforcement) · Nord (`≤480px` promotion) ·
Strapi (responsive token) · Priceline (responsive array) · Orbit (input type larger than body, at
16px) · Stacks (`@supports` iOS branch) · **Charcoal** (renders at 16px, then counter-corrects with
`scale(0.875)`). The comparison of approaches is in `form.md`.

**Letter spacing — split it by platform.**

```
iOS       positive at large sizes / negative in the middle   (Apple curve)
Android   increasingly positive as sizes get smaller          (Material curve)
Web       0, or a slight negative only on large headings      (Pajamas -0.01em approach)
```

**A single unified value will be wrong on both iOS and Android.** This is fact, not taste.

`em` scales with size and `px` does not. **`em` is recommended** —
with fixed px, as in Evergreen, letter spacing becomes relatively tighter on large headings.

**Decide whether letter spacing lives in the size tokens or stands as an independent utility, as in Tailwind.**
Independent utilities compose freely, but **letter spacing does not follow when you change the size.**
Building it into the scale is consistent, but exceptions require overrides.

**Having no letter-spacing tokens at all is also an option** — Atlassian and Mantine do this.
It means trusting the typeface's default spacing, and it is not a fringe position in the sample.

**Number of steps**

```
Start with 6–8 steps
```

Protocol runs 8 heading steps, Evergreen and Radix Themes run 8–9.
Mantine is body 5 + heading 6.

**The 10–16px band needs only 3 steps: `12 · 14 · 16`.** All four frameworks do exactly that,
without exception, and none of them define 11, 13 or 15px.

To go in 1px increments like Seed Design (18 steps), you need a case **where glyph density is high
enough — Korean and CJK — that a 1px difference is actually visible.** Otherwise you are only
adding decision cost.

**Line height**

```
Ratio 1.25–1.5  (headings 1.25, body 1.5)
```

Pajamas unifies every heading at 1.25. It is easier to manage than fixed px per size.

**If you use ratios, reduce them as size grows.** Four of the five samples run in the decreasing
direction (only Mantine increases). Large type has enough absolute spacing even at a small ratio.

**Check how your controls get their height before you settle line height** (added 2026-08-18).
In systems that never declare a height, **line height is a layout value, not a typographic one** —
SGDS lets a body line height of 2.0 govern the entire button and input height ladder, and MUI's
unitless 1.75 lands button height on a fractional 36.5px.
The opposite extreme is **the camp that kills line height to 1 and relies on padding alone**
(Asphalt is 1.618 for body but 1 for buttons; Origami sets `line-height = font-size`).
**If you want control heights to stay integers, fix line height in px or derive it from the
height** — Shoelace, Vibes and Garden do it with `calc(height − border)`.

**If you use fixed px, consider aligning to a 4px grid** (the Atlassian approach).
The ratios wobble between 1.125 and 1.429, but the absolute value is always a multiple of 4,
which keeps layout math simple.

That said, **Apple and Material use fixed px per size, so when porting their specs, use the values
as given rather than converting to ratios** — the mismatch shows up at small sizes in particular
(Apple Caption 2 is 11px with a 13px line height = 1.18).

**Decide whether body and heading line heights are separate.** Radix Themes tightens headings by
2px only at the small steps (14–20px). At 24px and above the values are identical —
**the band where the split is needed is narrow.**

**Weight**

```
400 (body) · 500 (emphasis) · 600–700 (headings)
```

**Unifying heading weight to a single value is a common choice in the sample** (Pajamas 600 ·
Atlassian 653 · Mantine 700). But **the values have not converged** — your team has to pick.

**Start control weight at 500** (added 2026-08-18). 500 is the majority across the 68 systems,
with the extremes at 400 (10 systems) and 800 (PIE · Unify, 2 systems). **Bold controls (700) are
not a fringe position at 16 systems**, so do not assume "buttons are medium" —
**body size with bold laid on top** (16px/700) recurs in Backpack · Codex · Gestalt ·
Pharos · Thumbprint · 디지털청.

**Decide control weight together with the body hierarchy.** Stacks inverts the majority with
**buttons 400 · labels 700**, Paste is buttons 600 / inputs 500, and Grommet sets only the input
value to 600. **Once controls disagree on weight within a single system, weight stops working as a
hierarchy signal.**

**In a two-weight (400/700) system, which side the button lands on decides the impression.**
All four CJK samples (KRDS · 디지털청 · Charcoal · Serendie) are two-weight, and
**only Serendie puts buttons at 400.**

**Do not define all 9 steps (100–900).** Only Tailwind does, and unless the face is variable,
most of those steps have no actual font file behind them.

**If you use fluid type (`clamp()`), keep fixed variants alongside it.**
That is why Pajamas pairs every step with a `-fixed` counterpart — there are places, like tables
and code blocks, where size must not move.
**Porsche solves the same problem by size band** — 2xs–sm (12 · 14 · 16px) are static and only md
and above are fluid. **Keeping the body and control band out of the fluid range is easier to
manage** (added 2026-08-18).

**There are four ways to do fluid type** (added 2026-08-18).

| Approach | Example | Consequence |
|------|-----|------|
| `clamp()` | Pajamas · Seed Design · Porsche | Size alone is continuous |
| `calc()` linear interpolation + media-query bounds | **Fleet** | The pre-`clamp()` generation. Same result, longer expressions |
| **Responsive root font** | **Audi** (16→18→20px) | **Every component dimension moves with it** — buttons 51→57→63px |
| Breakpoint functions | Strapi · Priceline · Mística · DSFR · Nord | Stepped |

**If you pick a responsive root, know that it is a layout decision, not a typographic one.**
In Audi, the rem-type + em-padding combination means a root change pushes control heights up too.

**To support OS accessibility scaling, one option is to bound it inside `clamp()`** —
Seed Design wraps every typography token as `clamp(static × 0.8, computed × scale, static × 1.5)`.

**If you use a runtime scale factor (`calc(1rem * var(--scale))`), document the baseline factor.**
Mantine's and Radix Themes' values assume a 100% factor. Radix Themes moves between 90% and 110%,
so `--font-size-3` runs 14.4–17.6px.

**Multilingual support**

**Decide early whether to keep per-language font slots.** shadcn/ui keeps `--font-ar` and
`--font-he`. RTL is not only a direction problem — it is **a typeface problem.**

> **Correction (2026-08-18).** Both "no system in the sample keeps CJK font slots" and
> "shadcn/ui is the only one" are **disproved.**
> **LINE** makes language a **first-class axis of the token name** (`$ldsg-en-title-xxl-200` —
> language EN/JP/TC/TH × type × size × weight), and on the LDSM side the scale carries a
> **per-language typeface mapping** (iOS SF Pro · JP Hiragino · ZH PingFang · TH Thonburi ·
> KO Apple SD Gothic Neo).
> **Vibe** names Hebrew, Arabic and Japanese fonts in its default stack, and
> **Charcoal** designates a CJK-only open-source face (Sarasa UI J) as its system font.

**The question is which of three layers handles it** (organised 2026-08-18).

```
Token name axis   LINE (language × type × size × weight)          — total; token count multiplies by language
Font slot         shadcn/ui (--font-ar/-he) · Charcoal            — swap a single value
Font stack        Vibe · Vibes (Japanese names dual-listed)       — no tokens; handled by the fallback chain
Selector branch   Rakuten (:lang(en)/:lang(ja) line height)       — when only line height differs, not size
```

**If you handle CJK, check line height first.** It **breaks before size does** (14 vs 16 vs 17) —
Rakuten splits the same style into `:lang(en)` 1.444 / `:lang(ja)` 1.333, and Serendie divides by
role at labels 1.0 / body 1.6.

**If you deal with Japanese typesetting, consider putting `text-spacing-trim` in your reset** —
SmartHR sets `space-all` in its preflight base (avoiding Windows Yu Gothic's over-aggressive
punctuation compression). **SmartHR is the sample where a CJK typesetting property made it into
the system reset CSS.**

**For Arabic and RTL, still no rule beyond the font slot has been confirmed** —
every observed per-language line-height and letter-spacing rule comes from **CJK samples.**
Body size splits too — read `i18n/README.md` alongside this.

## Color

Source: [color.md](color.md)

**Layers** — start with 2 layers.

```
scale/     primitive colors (gray-100 … gray-900)
semantic/  purpose (text-primary · surface · border · danger …)
```

**Do not skip the semantic layer.** Tailwind is the only case with primitives alone, and the price
is that **adding a high-contrast theme becomes nearly impossible.**
Once `bg-gray-100` is hardcoded throughout the codebase, there is no midpoint left to change later.

shadcn/ui's structure is how you layer semantics on top of Tailwind —
it inserts one step: `--primary` → `--color-primary` → `bg-primary`.

Add a third layer like Seed Design's `static` only when values appear that are genuinely neither
primitive nor semantic.

**Use background/foreground pairing rules.** Material 3 (`On Primary`) and shadcn/ui
(`-foreground`) share the same structure. It **guarantees contrast by pairing rather than by
checking ratio values**, and the token name answers "which text color goes on this background"
for you.

**Keep a primary-color alias.** Like Mantine's `--mantine-primary-color-*` and
Radix Themes' `--accent-*`, it is a layer you can swap in one place.
Changing the brand color becomes a one-line token edit.

**State handling** — pick one of **six approaches** early (corrected 2026-08-18; the previous
edition listed four). Changing later is very expensive.

| Approach | Example | Trade-off |
|------|-----|------|
| State layer tokens | Material 3 · **Vapor** · **Vuetify** | Free composition. 4x the token count |
| **Intensity × state combinations** | **Atlassian** · **EUI** · **Charcoal** | Explicit. 12 per color (4 intensities × 3 states) |
| State baked into color names | Orbit · Mantine · **LINE** (`p` suffix) | Intuitive. Each new color adds 10 more |
| **Alpha at the point of use** | **shadcn/ui** (`bg-primary/90`) · **Yoga** | Zero tokens. **Mismatch with design tools** |
| **Build-time functions** | **bf-solid** (`darken()`) · **SmartHR** · Stacks · Origami | Zero tokens, fixed results. **No per-state exceptions possible** |
| **Runtime CSS functions** | **PIE** · **PrimeVue** (`color-mix()`) · **Blueprint** (`oklch(from …)`) | Follows theme swaps automatically. **Needs a fallback** |

> **Correction (2026-08-18).** The old four-approach table **left out the camp that derives colors
> through functions.** Across 79 systems, 5 build-time function cases and 6 or more runtime CSS
> function cases are confirmed. **Skeleton goes further still, defining no state colors at all and
> handling them with a `brightness()` filter** — it has zero per-variant hover color tokens.

**The `bg-primary/90` approach is the cheapest, but Figma has no corresponding variable.**
If design-code parity matters, precompute the alphas into tokens like Radix Themes
(that comes to 24 per color).

**Every function camp — build-time, runtime and filter — pays the same price:** hover and press
colors do not exist as tokens, so there is nothing to carry into a design tool, and
"give this one variant a different hover" is impossible.
**Recommended only when you have a single brand and few variants.**

**Status color range** — the sample splits widely.

| System | Status colors |
|--------|--------|
| **Atlassian** | danger · warning · success · **discovery** · information (10 each) |
| Evergreen | success · warning · danger · none |
| **shadcn/ui** | **`destructive` only** |

**Not having `success` and `warning` is a real choice that exists in practice** (shadcn/ui).
But adding them later is hard without a semantic layer.

**Start with at least 4 (danger · warning · success · info)**, and if you have a slot like
"new feature announcements", look at Atlassian's `discovery`.
**The 79-system sample keeps this recommendation intact** — at the far end,
**PrimeVue ships 9** (primary · secondary · success · info · warn · **help** · danger · contrast
and so on) and **Vapor ships 6**. Slots that carry domain vocabulary, like `help`, differ by
system, so **laying down the 4 first and adding domain colors afterwards is the safe order.**

**Note the cases where the domain rewrites the status vocabulary.** **Astro** works in the
operations domain, so `standby` and `off` are first-class status colors; **Vitamin** is commerce,
so `conversion` (purchase conversion only) appears in variant names; and **Kaizen** keeps a
`caution` field state as a warning tier short of error, plus a separate `pending` color for
loading. **There are real points where the success/warning/error trichotomy runs out for a domain.**

**Dark mode** — separate theme files or a CSS class override are recommended.

| Approach | Systems | Fits when |
|------|--------|-------------|
| Separate theme files | Atlassian · Material 3 · Pajamas · **Clarity** · **Codex** | 3 or more themes |
| CSS class (`.dark`) | shadcn/ui · Radix Themes · **Vibe** · **Ring UI** | Just light/dark |
| **`light-dark()` in one line** | **Porsche** · **PrimeVue** | When you want both values in one place |

The visionOS-style "two values in one token" is awkward to parse and to integrate with tooling.
**Grommet's per-color `{dark, light}` object pairs sit in the same slot**, but application depends
on background context (a `Box`'s `dark` prop), which makes debugging a different proposition from
the theme-swap camp (added 2026-08-18).

**Two of the 79 systems adopted `light-dark()`** — it halves the declaration count and needs no
class toggle, but **extracting per-mode values with tooling requires parsing.**
PrimeVue mixes `color-mix()` into the same value on top of that, effectively giving up on static
extraction.

**Consider switching borders to alpha in dark mode** (the shadcn/ui approach).
When surfaces come in multiple steps, borders adapt to each surface —
`oklch(1 0 0 / 10%)` works on any dark surface.

**High contrast** — you do not need it from day one, but **with a semantic layer it is easy to add
later, and without one it is nearly impossible.** This is the practical reason the semantic layer
exists.

None of the four frameworks provide high contrast, so **if you build on a framework, you must
build high contrast yourself.** The structure that is easiest to maintain is Atlassian's — a file
with **the same token set as the regular theme, differing only in values**.
**KRDS uses the same structure** (`mode-high-contrast`, 190 tokens = the same count as light;
added 2026-08-18).

**If setting the values yourself is hard, you can hand the job to the OS** (added 2026-08-18).
Clarity switches to **CSS system color keywords** like `Canvas` and `CanvasText` in its
high-contrast theme, and Carbon writes `ButtonBorder` directly into component source.
You avoid building another full palette, but you give up design control.

**If you draw borders with inset box-shadow, add a `forced-colors` countermeasure alongside.**
In forced-color modes the shadow vanishes and the element's outline disappears entirely.
Four means are confirmed — restoring a real border (**Pajamas** · **DSFR**) ·
pre-laying a transparent outline (**Stacks**) · a double border in the background color
(**디지털청**) · showing an outline only in this mode (**Porsche**).

**Color vision deficiency is a separate axis from high contrast.** Only two cases are confirmed at
the token layer (Primer's colorblind variant · **Unify**'s three separate
deuteranopia/protanopia/tritanopia **CSS files**), and **Unify is the only one that splits by
type.** If you plan to build it yourself, decide **whether to separate red-green from blue-yellow**
before assuming "one colorblind set."

**Color space** — consider `oklch()`.

```css
--primary: oklch(0.577 0.245 27.325);   /* lightness chroma hue */
```

Adjusting only lightness becomes a one-digit edit. With hex you must recompute all 3 channels.
Only shadcn/ui uses it in the sample, but browser support is sufficient.

**Add a P3 fallback palette only when needed.** Radix Themes is the only case, and it grows to
1,579 declarations. Wrapped in `@supports`, the fallback is automatic.

**Scrim** — decide the color and the opacity separately (added 2026-08-18).

```
Opacity   start near 0.5          (the modal band across 79 systems — but the axis spans 0.1–0.9, so there is no standard value)
Color     ink or navy, not pure black   (nearly half the sample uses a chromatic tint)
```

**Setting only the opacity and leaving the color black puts you at odds with the sample majority.**
EUI and Evergreen arrived independently at the same blue-gray at 70%, and eBay · Vibe · Paste ·
NYSDS · Yoga each use their own ink. **A dark value from the same family as the background surface**
sits better than black.

**If you use a light scrim, add blur with it.** Three of the five inverted samples
(Cedar · Park UI · shadcn/ui Drawer) pair it with `backdrop-filter` —
a light scrim alone does not separate the background.

**Decide early whether opacity differs between light and dark.** Ring UI (0.4/0.7) and
Braid (0.4/0.6) go heavier in dark. You can also expose it as three semantic steps
(Priceline dark/medium/light). The modal-side value comparison is in `modal.md`.

**disabled** — the majority convention is a single opacity value rather than a color
(added 2026-08-18).

```
Start at 0.35–0.4   (Astro · Atlassian 0.4 · Vitamin · Vibe 0.38 — near the sample median)
```

**Across the 79 systems the axis spans 0.26 (Vuetify) to 0.5 (shadcn/ui · Shoelace · HeroUI ·
Naive UI), close to a factor of two** — do not port another system's value directly.
**Tying it to the scrim opacity as Vapor does** collapses the attenuation constant to one value
and simplifies maintenance (0.32).

**Expressing disabled through opacity alone also destroys text contrast.**
No system in the sample manages this as a value, so **you must check it yourself.**
Cases that pair it with a non-color cue are worth referencing —
Welcome UI (diagonal hatching) · Vibes (background swap + `not-allowed` cursor).

**Focus ring color** — do not default to the brand color; **check for palette collisions first**
(added 2026-08-18).

```
Simple color system     brand color as-is       (Naive UI · Strapi · Welcome UI)
Many status colors      a dedicated color outside the palette   (Astro pale purple · Grommet neon mint · Asphalt blue)
Varied backgrounds      an achromatic double ring   (Italia · Canvas · Odyssey · WMN · Vibes 3 layers)
```

**The more of the color wheel a system's grade and status colors already occupy, the further the
focus color moves outside the palette.** Astro picking a pale purple to dodge 6 grades plus
6 status colors is the clearest case.

**If you plan to support both dark and light surfaces, use a double ring with a white gap.**
A single ring color will always disappear on one side. **Extracting the ring as a component, as
Vibes does,** lets you apply the same spec to elements beyond buttons.

**Do not leave the focus color outside the token layer** — Vibe defines 919 CSS variables and still
hardcodes the focus ring color as a literal, so it drops out of theme swaps.

**Chart colors** — decide by category count.

| Categories | Approach | Example |
|:---:|------|-----|
| ~5 | Single-hue lightness ramp | shadcn/ui (`blue` 300–800) |
| 6+ | Hue differentiation + prescribed usage order | Atlassian (`categorical` 16) |

**Lightness ramps hold up better for color vision deficiency.** If you never plan to exceed 5,
this side is recommended. If you differentiate by hue, **tokenize the usage order too** —
otherwise every chart will order its colors differently.

**Dedicated series for layout regions** — if you have regions with a clearly distinct tone, like a
sidebar or code blocks, consider a dedicated series as shadcn/ui does. It is more explicit than
overriding semantic tokens.

## Button

Source: [button.md](button.md)

**Height** — it splits by platform. It cannot be unified into one value.

```
Mobile/touch       48    (Material 48dp · Apple 48pt · 2nd most common across 77 systems, ~8)
Desktop web        40    (most common across 77 systems, ~14)
Desktop dense      32    (Codex · Pajamas · Semi · Vapor defaults · Ant · Orbit · Radix size 2)
Text button        36    (Apple baseline)
```

**Start desktop web at 40px** (corrected 2026-08-18). The previous edition recommended 36px, but
that was a value on which two frameworks — Mantine and shadcn/ui — happened to agree.
**Across 77 systems the mode is 40px** and 36px ranks third. Even the mode covers only about 23%,
so **do not take it as a "standard height"; pick to match your density requirement.**

Only the iOS top toolbar allows 44pt; **for touch environments, use 48** — the value where both
OSes meet.

**Start with 4 size steps.** Of the three frameworks, two have 4 steps and one has 5.
An 8px arithmetic increment (Radix Themes) is the easiest to manage — it reuses the spacing tokens
directly.

**If you plan to support touch, put the largest step at 48 or above.**
shadcn/ui tops out at 40px, so no step of it can produce 48.

**Border radius** — set it equal to or smaller than the container's radius.
Making buttons rounder than their container, as Cloudscape does, must be a deliberate choice.

**Decide whether radius changes per size.** shadcn/ui uses the same 8px at every size, so small
buttons look relatively rounder. To scale with size, one approach is `em`-based, as in
Radix Themes (`calc(0.35em * var(--radius-factor))`).

**Padding** — the shadcn/ui ratio is the reference.

```
height 24 → horizontal  8
height 32 → horizontal 12
height 36 → horizontal 16
height 40 → horizontal 24
```

**It grows faster than height** (height 1.67x / padding 3x).
If you want separate vertical padding, Cloudscape's 4px is the only confirmed case.

**When an icon is present, reduce horizontal padding by 2–8px and set an icon-label `gap` of
4–8px.** CSS `:has()` can automate this, but it cannot be expressed as tokens, so it belongs in
the component implementation.

**Provide a square icon-only variant at every size step.** shadcn/ui has one at all 4 steps.
Use the height as the width (`size-9` = 36×36).

**States** — the minimum set is this.

```
default · hover(web/spatial) · pressed · selected · disabled · focus-visible
```

**If you plan to support spatial UI (visionOS), do not drop `hover`.**
Built touch-only, the gaze-input stage ends up empty.

**Hook the error state on `aria-invalid`** (the shadcn/ui approach).
A separate `error` prop lets the accessibility attribute and the visual state drift apart.

**Name your emphasis states up front.** Apple alone uses three — `Selected`, `Tinted`,
`Preferred` — differently depending on the container. If names diverge within one system,
implementations drift.

**Focus ring**

```
2px, offset 0–2px
```

The sample majority is 2px. shadcn/ui's 3px is the only thick value in the sample, and it is not
even consistent within its own system (only the Dialog close button gets 2px).
**Pick a thickness and offset once and use them across all components.**

Expressing focus through border width (Atlassian) has the advantage of not shifting layout, but
it cannot be used on borderless variants (`ghost`, `link`).

**State transition durations** — Atlassian is the only evidence.

```
button hover/pressed   150ms
list item hover         50ms
```

**List items are 3x faster than buttons.** Even within the same `listitem`, hover (50ms) differs
from pressed/selected (100ms).

The number of transitioned properties differs too — `listitem` has 4 (background, border, text
color, underline color), `button` has 2 (background, border).

The full cross-system motion comparison is in `motion.md`.

## Form

Source: [form.md](form.md)

**Input height — use the same scale as buttons.**

```
Desktop web    40  (most common across 78 systems — the same value as buttons. Corrected from 36px in the previous edition)
Dense screens  32  (Codex · Pajamas · Semi · Vapor defaults · Ant · Radix size 2)
Touch          48  or more (Braid uses its 48px touch-target token as the single source of control height)
```

**Giving buttons and inputs the same value is the majority convention** — about 30 of the
78 systems share a height ladder (see the re-synthesis section of `form.md`).

**A structure where Button, Input, and Section share the same height variable, as in Mantine, is
recommended.** Radix Themes has a 48px step only on Button, so things break at `size="4"` —
**giving components different step counts causes accidents in composition.**

**Decide early whether inputs get size variants.** shadcn/ui keeps Input at a single 36px while
Button has 4 steps. Sizes cannot be matched within the same form.

**Padding**

```
horizontal 12  vertical 4–8   (at height 36)
```

**Decide whether border width is subtracted from padding.** Radix Themes subtracts it
(`calc(var(--space-2) - 1px)`). Visual spacing becomes uniform but the math multiplies.
Keeping `box-sizing: border-box` with constant padding is simpler.

**Decide whether vertical text alignment is done with `line-height` or `padding`.**
Mantine handles it with `line-height: calc(height - 2px)` —
it follows automatically when the height changes.

**Checkbox**

```
16px  (indicator 10–14px)
```

**Three systems meet at 16px.** If you add size variants, the Radix Themes approach —
multiplying `--space-4` by a factor (0.875 / 1 / 1.25) — stays aligned with the spacing scale.

**Make the radius proportional to the size.** An 8px radius on a 16px element approaches a
semicircle. This is why shadcn/ui uses a literal `4px` in this one spot — **with a proportional
rule, no exception is needed** (the Radix Themes way: `calc(var(--radius-1) * 0.875)`).

**Error state — use `aria-invalid` as the hook** (the shadcn/ui approach).
The accessibility attribute and the visual state cannot drift apart.

**But if you need a `success` state, define a separate token.** Mantine is the only case with
`--mantine-color-success`, and shadcn/ui has no token to express it.

**Focus indication — draw a ring.**

```
2px ring + border color change
```

**Changing only the border color, as Mantine and Radix Themes do, is less visible against
low-contrast backgrounds.** shadcn/ui's 3px is the thickest in the sample; 2px is the majority.

**Decide whether the focus color is decoupled from the accent color.** Only Radix Themes keeps an
independent `--focus-*` family — changing the brand color does not shake focus visibility along
with it.

**Cursor**

```
text input     text
selectables    pointer  or  default
disabled       not-allowed
```

**Whether checkboxes and switches get `pointer` is split.** Radix Themes uses `default`,
Mantine uses `pointer` on selectables. **Decide once and apply it to every control.**

**Select dropdown**

```
min width 128px
item padding: left 8 / right 32 / vertical 6
max height measured at runtime (relative to viewport)
```

**Do not make the max height a constant.** It clips when the trigger sits near the bottom of the
viewport. Using a runtime measurement, like Radix Primitives'
`--radix-select-content-available-height`, is the only solution in the sample.

**Reserve space for the check mark up front.** That is the 32px right padding.
If padding changes with selection state, items shift horizontally.

## Motion

Source: [motion.md](motion.md)

**Durations — start with 5 steps.**

```
0     instant (accessibility mode)
50    micro state transitions (list item hover)
100   fast exit
150   entrance (small elements) · default transition
250   entrance (large regions · modals · panels)
```

**Three steps are also enough** (corrected 2026-08-18). The previous edition recommended 5, but
**the mode across 83 systems is 3 steps** (Orbit · Backpack · Nord · Pharos · Forma 36 · Strapi).
Grow to 5 after your component count grows — even Atlassian (8 steps) and Clarity (9 steps) end up
concentrating real usage in two or three values.

The sample majority uses multiples of 50ms. **But "Cloudscape is the only exception" is wrong**
(corrected 2026-08-18) — eBay (frame grid) · MUI 225/195 · Evergreen 80/240 ·
Braid 125/175 · Strapi 120/320 · Thumbprint 75 · Kaizen 201 all sit outside it too.
**If you break the multiple of 5, leave the reason in the value** — eBay based its values on frame
counts, and Kaizen embedded a browser-bug workaround rationale as a Jira number in a source
comment.

**Do not build 20 steps in a 50ms arithmetic series like Canvas.** Unlike spacing, motion has few
steps humans can distinguish — 150 vs 200ms is distinguishable, but there is rarely a reason to
put a value between 150 and 200.

**Define a `0ms` token.** Accessibility mode needs something to reference.
Six of the 83 systems have one — Atlassian · Cloudscape · Kaizen · Tegel · Clarity · Siemens iX.
**Putting `0ms` at step 1 of the scale (`short`) as Siemens iX does makes "instant" a design
option** — a different usage from keeping it purely as an accessibility value.

**Make exits shorter than entrances.**

```
entrance 250 → exit 200
entrance 150 → exit 100
```

**9 of Atlassian's 10 pairs differ by exactly 50ms.** The single exception is `panel.content`,
and even that has a clear intent — "content disappears before its container."

**But `-50ms` is Atlassian's internal rule, not the sample's** (qualified 2026-08-18).
Across 83 systems the asymmetry ratio spans 1.15x (MUI 225/195) to **3.3x (Material Web 500/150)**,
and **12 systems are symmetric** (see the re-synthesis section of `modal.md`).
**Cap the ratio at 2:1** — Park UI fossilised that value in its animation token names
(`dialog-in` 400 / `dialog-out` 200).

**Split entrance durations by element size.**

| Element | Entrance |
|------|:---:|
| Small and incidental (avatar · chip · popover) | **150ms** |
| Covers the screen or a large region (modal · panel · side nav · overlay) | **250ms** |

**Easing — start with 4.**

```
entrance      ease-out family   cubic-bezier(0.4, 1, 0.6, 1)    enters decelerating
exit          ease-in family    cubic-bezier(0.6, 0, 0.8, 0.6)  leaves accelerating
large regions inout             cubic-bezier(0.4, 0, 0, 1)
looping       linear
```

**`out` for entrance, `in` for exit is the sample's baseline pattern.**
Atlassian holds this rule across 39 component tokens with only 2 exceptions (panels).

**Pick one naming axis.** The sample yielded six (expanded 2026-08-18).

| Axis | Example | Fits when |
|----|-----|-------------|
| Direction × intensity | Atlassian (`out.practical`) | Many components with clear entrance/exit |
| Purpose × character | Canvas (`quick.deceleration`) | You already use a primitive-semantic 2-layer setup |
| Expression | Cloudscape (`responsive` · `expressive`) | Designers pick tokens directly |
| **Actor** | **Codex (`system` · `user`)** | **When input responsiveness matters** |
| **Onomatopoeia** | **HSDS (`boop` · `bounce` · `elastic`)** | Consumer products where character matters more than the value |
| **Brand name** | **Tegel (`easing-scania`)** | When the signature curve is settled as a single one |

**Codex's `system`/`user` split builds a practical axis with the fewest tokens** — just 2.

**Do not name a value as its opposite.** In Porsche, `ease-in` is the **decelerating** curve and
`ease-out` is the **accelerating** one — the result of naming them "the curve used on entrance" —
and because that is the exact inverse of the CSS keywords, readers will get it wrong every time.

**Do not ship 26 easings** (added 2026-08-18). The bigger the catalogue, the lower the real usage
rate — **2 of Strapi's 26 are used** (and a copy-paste error leaves all 7 `InOut` values identical
to `Out` in the dist), **3 of Stacks' 8** (the `back` family is used 0 times).
**4–6 is the practical ceiling.**

**Decide carefully whether to build `spring` out of `linear()`.**
Atlassian defines 65 stops and uses them in **one place** (`avatar.hovered`).
Unless you have several call sites, the cost is high.
**If you render in JS, shipping the physics parameters directly is better** —
TDS (8 stiffness/damping presets) and Paste (`{ mass, tension, friction }`) do exactly that.

**If you use overshoot, decide where it goes first.** Across 83 systems, confirmed usage splits
across five places — modal entrance (8 systems) · button press (Braid) · checkbox (Bolt) ·
toggle and tooltip (Helios) · avatar hover (Atlassian). **Do not put it in the global easing set
and use it anywhere** — overshoot is a signal that says "this matters," so it only works when the
slots are few.

**Declare transition properties explicitly.**

```
❌ transition: all 150ms
✅ transition: background-color 150ms, border-color 150ms
```

`all` animates layout properties too.
**Tokenize the property lists like Codex**, or make them a field of a composite token like
Atlassian, or at minimum spell them out in classes like shadcn/ui.

Using only `transform` and `opacity` is the cheapest — no repaints.

**Keyframe travel distances**

```
popover · tooltip   8px  + scale 0.95
modal               scale 0.95 only (no travel)
panel · side nav    100% (full width)
flag (toast)        entrance 50% / exit 15%
```

**Consider different travel distances for entrance and exit.**
Atlassian uses entrance 50% / exit 15% — things come in from farther away.
**Priceline applies the same rule to modals** — entrance `y 64→0`, exit `y 0→32`, so it drops away
over half the distance it arrived from.

**The 8px for popovers and tooltips holds** (Atlassian · shadcn/ui; only Radix Themes uses 4px).
**Modals are an order of magnitude away** (corrected 2026-08-18) — across 83 systems modal travel
spans `-10px` (Nord) to `25vh` (Porsche), and **`-50px` (the Bootstrap lineage) and `64px`
(Park UI · Priceline) are the common values.** Apply 8px to a modal and the movement is invisible.

**Accessibility — handle it at the token level.**

The Cloudscape approach is the safest — **keep a `disabled: 0ms` value alongside each duration
token and switch by mode.** You avoid repeating the media query in every component.

```json
"duration-short": { "default": "150ms", "disabled": "0ms" }
```

**Leave easings and keyframes untouched; only zero out the duration.** Cloudscape does exactly
that — at `0ms` every easing produces the same result, so there is no need to maintain two sets.

**But loop animations cannot be zeroed** (added 2026-08-18).
Set a spinner to 0ms and it does not disappear — it jitters frames endlessly.
**Handle it in two tracks the way Clarity does** — transitions (quickest–primary) go to 0, and
loops (slow–slowest) are **stretched to a uniform 2s.** Clarity is the only one of the 83 systems
that makes this distinction.

**Decide which side the default sits on, too.** The 83 systems contain both extremes —
**Strapi** puts its entire transition declaration **inside** a `prefers-reduced-motion` guard, so
its default is no motion, and **Mantine** requires a double opt-in
(`data-respect-reduced-motion` + `data-reduce-motion`, off by default), so it
**ignores the OS setting in its default state**.
**Do not follow Mantine here** — it overrides a setting the user explicitly stated with a library
default.

**A single global kill switch is also valid** — Porsche's two variables,
`--p-transition-duration` and `--p-animation-duration`, turn off all motion.
Canvas does the same job with a `.wd-no-animation` global class.

**Decide whether to split by platform or viewport** (expanded 2026-08-18). Two systems lengthen
duration — Nord (mobile 0.4s = double desktop) and Braid (drawer mobile 300 / tablet 175ms) —
and **three change the presence or kind of motion instead** —
Orbit (entrance motion on mobile only) · Thumbprint (desktop `transition: none`) ·
HeroUI (mobile slide / desktop scale).
**What they share is moving more on mobile** — desktop is scale or no motion, mobile is a
full-height slide-up.

**Keep looping animations in a separate family from transitions.**
Codex separates `transition-duration-*` (100 · 250ms) from `animation-duration-*` (1000–2000ms) —
mixed into one scale, 8 steps become 20.

**When multiple elements must run in sequence, as in a spinner, use negative `animation-delay`**
(the Codex approach). Set them to integer fractions of the duration and the phases offset evenly.

## Modal

Source: [modal.md](modal.md)

**Width — start with 3 steps.**

```
sm   400  (confirmation dialogs · short forms)
md   512  (default. shadcn/ui's value)
lg   640  (content · tables)
```

**512px is a safe default** (reconfirmed 2026-08-18). Across 79 systems the **modal band for
default width is 450–520px (about 14 systems)**, 512 sits in the middle of it, and four systems
use exactly that value (shadcn/ui · Backpack · Chakra · Codex).

**The 440s and the 500s are two convergence points.** Confirmation dialogs land in the 440s
(Canvas · Mantine · Charcoal 440 · Naive UI 446 · Astro · Semi · HeroUI 448) and form modals in
the 500s. **It is fine to leave the middle empty** — that is why Mantine's increment jumps from
+60 to +180 between `md` and `lg`.

**Having no width steps at all is also a majority choice** — across 79 systems, 22 have a single
width and 12 have no steps. **If you do add steps, 3–5 is the convention**, and 10 steps (HeroUI)
only appears when inherited from a utility scale.

**Padding**

```
24px  (fixed, regardless of modal size)
```

shadcn/ui uses a fixed 24px, and Radix Themes size 3 is the same value.

**If you tie it to size, reference the spacing tokens** (the Radix Themes approach) —
`--space-3`–`6` (12/16/24/32). Radius can be grouped two steps at a time.

**Border radius — pick from among three clusters** (corrected 2026-08-18).

```
0–4px     ~20  dense work · operations · government (Clarity · EUI · MUI · Siemens iX · Tegel · Vuetify · DSFR · Astro)
5–8px     ~20  general-purpose default (Bootstrap · Helios · NYSDS · Paste · Ring UI · Stacks · Vapor · Cloudscape)
10–14px   ~10  framework family (shadcn/ui 10 · Radix Themes 8·12 · Semi · KRDS · HeroUI)
16–32px   ~19  consumer services · mobile grammar (Orbit · PIE · Pajamas · Braid · eBay · LeafyGreen · Canvas 32)
```

**The previous edition wrote "web systems cluster at 8–12px," but that was an observation over
6 samples.** Across 79 systems the **8–12px band is in fact the thinnest cluster**, with 0–4px and
16–32px each about twice its size. **There is no "industry-standard modal radius"** — choose by
product character.

**Apple's sheets (34/58px) are not an order of magnitude away from the web either**
(corrected 2026-08-18). **Canvas's modal is 32px**, 2px away from the top of an Apple sheet (34px).
What **remains Apple-only is differing top and bottom radii**, so do not port asymmetric radii.

**Decide first whether this differs from buttons and inputs.** The sample splits between a camp
that separates by role (NYSDS button 12 / modal 8 / input 4 · Semi controls 2 vs modal 12 ·
LeafyGreen controls 6 vs modal 24) and a camp that unifies everything (Pharos · Codex 2px).

**If you have a fullscreen mode, force the radius to 0** (Mantine uses `!important`).
Rounded corners left at the screen edge look like clipping. Clarity, PIE and Bolt also return the
radius to 0 on the fullscreen switch.

**Screen margins — decide mobile first.**

```
horizontal  keep a 16px margin (max-width: calc(100% - 32px))
vertical    5dvh  or 32px
```

**Use `dvh`, not `vh`** (the Mantine approach). When the mobile browser's address bar hides and
reappears, `vh` does not update and the modal gets clipped.

**Consider setting the bottom margin as `max(32px, 6vh)`** (the Radix Themes approach).
On large screens the modal does not stick to the bottom.

**Keep two scroll layers.**

```
outer (overlay area)   when the modal is taller than the screen
inner (content)        when the content is taller than the modal
```

Radix Themes puts `overflow: auto` on both `BaseDialogScroll` and `BaseDialogContent`.
With only one layer, long modals either scroll their header and footer along or get clipped
outright.

**Overlay**

```
black family at 50%   (the mode across 79 systems)
```

**The whole span from 0.2 to 0.9 is populated — there is no "standard opacity."** Start at 0.5,
and lower it when the context behind the modal must stay legible (Kontur 0.24 · Origami · Strapi 0.2).

**Using a brand ink instead of pure black is closer to the majority** —
eBay `rgb(17 24 32)` · Paste navy · Vibe navy · Yoga plum · EUI · Evergreen blue-gray.
**Tint it in the same family as the background and the scrim reads as "a screen covered" rather
than "a screen switched off."**

**Decide whether opacity splits by color mode.** Braid .4/.6 · Ring UI .4/.7 · PrimeVue .4/.6 all
go **heavier in dark**. A black scrim on a dark background simply is not visible if left alone.

**If you allow nested modals, lighten the inner scrim automatically** (the Intergalactic approach).
Two layers of the same opacity are effectively opaque.

**Animation**

```
entrance   200ms   scale 0.8–0.95 → 1 + fade
exit       100ms   scale 1 → 0.97 + fade
overlay    entrance 200ms / exit 160ms
```

**Make the exit half the entrance** (reconfirmed 2026-08-18). Across 79 systems,
**entrance > exit is the majority at 18 systems** — Radix Themes 200/100 · Chakra 200/100 ·
Seed 200/100 · Vibe 150/100. But **12 systems are symmetric**, so it is not a whole-sample rule.
**Keep the ratio to 2:1 at most** — Material Web's 3.3x (500/150) is an order of magnitude away
from the web sample.

**Scale 0.8 is the mode across 79 systems** (corrected 2026-08-18). The previous edition recorded
95% as "the sample majority," but that was **the value of the 5 systems using Material-family
curves.** Eight systems use 0.8 (Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi ·
Vibe). **The smaller the confirmation dialog, the deeper it can scale from** — Blueprint and Kaizen
come in from 0.5.

**Whether to add travel is a majority convention, not a matter of taste** (corrected 2026-08-18).
The previous edition's "screen-centered modals do not travel" was an observation over 2 samples
(Atlassian · shadcn/ui); across 79 systems **more of them do travel than not.** The values split —
−50px from above (the Bootstrap lineage) · +64px from below (Park UI · Priceline) · `25vh`
(Porsche). **If you add it, shrink the travel along with the scale** (Priceline: entrance 64px /
exit 32px — it drops away over half the distance it arrived from).

**Putting no motion on the modal body at all is also a valid choice** — 10 of the 79 systems do it.
Gestalt, Pharos and Thumbprint arrived independently at **"fade the curtain (scrim) only, show the
body instantly."** It loads the entire perceptual cost onto the scrim.

**Consider a dismissal-refused feedback.** For a modal that does not close on backdrop click,
Bootstrap and Shoelace arrived independently at the same value — **a `scale(1.02)` pulse.**

**Let the content disappear before the overlay** (Radix Themes: 100ms vs 160ms).
If the backdrop lifts first, there is a frame where the modal floats in mid-air.

**To synchronize unmount timing, consider a `no-op` animation.**
Radix Themes puts an `opacity: 1 → 1` animation on the overlay,
keeping it in the DOM until its children finish exiting.

**Accessibility — wrap animations in `prefers-reduced-motion`.**

```css
@media (prefers-reduced-motion: no-preference) { /* keyframes and all usage */ }
```

This is the Radix Themes approach. Zeroing durations like Cloudscape also works, but
**if any code depends on animation-complete events, 0ms is safer** —
the events still fire.

**Close button**

```
top-right 16 / 16
icon 16px
focus ring same as every other control
```

**shadcn/ui giving only the close button a different focus ring is a consistency problem**
(`ring-2 ring-offset-2` vs `ring-[3px]` everywhere else). Do not copy it.

**A default opacity of 0.7 needs scrutiny.** It lowers contrast, so it is safer to set the icon
color to `muted-foreground` and keep opacity at 1.

**Footer — decide the mobile arrangement explicitly.**

```
< 640px   vertical, reversed (primary action on top)
≥ 640px   horizontal, right-aligned (primary action on the right)
```

This is shadcn/ui's `flex-col-reverse` → `sm:flex-row`.
**Keep the DOM order `[secondary][primary]` and both arrangements fall out automatically** —
primary on the right on desktop, on top on mobile.

**Decide the breakpoint where the modal becomes a bottom sheet** (corrected 2026-08-18).
The previous edition wrote "nothing in the sample prescribes one," but **at least 20 systems
prescribe it as a value** — though they scatter across 481 · 570 · 575.98 · 576 · 600 · 640 ·
768px.

**The cleanest solution is to set the switch point to the modal's default width** —
Backpack (width 32rem = fullscreen at 32rem) and Clarity (width 576 = fullscreen at 576px) do this.
One number serves two roles, so they cannot drift, and "the moment the modal grows wider than the
screen" becomes the switch point by definition.

**The switch mechanism splits three ways.**

```
Shape change in CSS alone   Asphalt · Canvas · Orbit · Auro · DSFR · HeroUI
Fullscreen switch           Backpack · Bolt · Clarity · EUI · Pharos · Thumbprint · PIE
Component swap              Gestalt (SheetMobile) · Seed · shadcn/ui (dialog↔drawer/sheet)
```

**Having the same component change shape by viewport is the majority.** Split the components
(shadcn/ui) and the switch decision moves to the caller — and in practice shadcn/ui
**picks its primitive by whether touch gestures are needed** (vaul vs Radix), so its criterion is
input modality, not viewport width.

**Decide whether to drop the overlay when going fullscreen.** Only Bolt removes it explicitly —
once the screen is fully covered the scrim is invisible, so only the paint cost remains.

## Table

Source: [table.md](table.md)

**Density — start with 2 steps.**

```
comfortable  vertical 12px  horizontal 12px
compact      vertical  8px  horizontal 12px
```

**Reduce only the vertical; keep the horizontal.** Cloudscape keeps 4 tokens —
`space-field-horizontal`, `space-card-horizontal-default`, `space-container-horizontal`,
`space-option-padding-horizontal` — independent of density.
Shrinking the horizontal hurts readability, not density.

**A runtime scale factor (`calc(var(--scale) * N)`) cannot do this** —
it cannot distinguish horizontal from vertical, and it cannot produce 0px.
**If you plan to support density modes, put the axis in the token values as Cloudscape does**
(see the "runtime scale factor" section of `tokens/scales.md`).

**If you go to 3 steps, the Radix Themes values are the reference.**

```
size 1   padding  8      min height 36
size 2   padding 12      min height 44
size 3   padding 12/16   min height 48
```

**For touch environments, use a minimum row height of 44px or more** — that is the Radix Themes
size 2 value and equals Apple's touch target minimum.

**Cell padding**

```
horizontal 8–16px  (default 12)
vertical 8–12px
```

**8px is the framework-family floor — the value of shadcn/ui and Radix Themes size 1.**
The only tighter value is the 6px in Polaris's tokens, and that same system's distributed CSS is
8/12px. Unless data density is the goal, 12px is a safe choice.

**Polaris's desktop distributed values (vertical 8 / horizontal 12) match the compact combination
above** — the point where "reduce only the vertical," derived from Cloudscape, meets an independent
system's shipped values.

**Row height — set only a minimum, but it splits by platform** (corrected 2026-08-18).

```
Touch             44 or more   (Radix Themes size 2 · Apple touch target)
Desktop web       32–36        (Polaris 32 · Radix Themes size 1 36)
Desktop native    20–28        (macOS row 20 · column header 28)
```

**The previous edition recommended 44px as the single default, but that is the touch value.**
It is excessive for a dense desktop table — the desktop values in the confirmed sample run 20–36px.

The web samples do not use fixed heights. In table cells `height` behaves like `min-height`, so
specifying it as `height` also works (the Radix Themes approach).

**Virtual scrolling requires fixed heights, and the sample has no value to reference.**
You must decide it yourself.

**Borders — use `box-shadow: inset`.**

```css
box-shadow: inset 0 -1px var(--gray-a5);
```

**`border` disappears under `border-collapse: collapse` + `position: sticky`.**
That is why Mantine switches to `box-shadow` only for sticky headers, while
Radix Themes uses `box-shadow` from the start — **the latter is simpler.**

**Use alpha tokens for the color** (`--gray-a5`). Opaque grays clash against striped and hover
backgrounds.

**Do not multiply border widths by a runtime scale factor.** Mantine sets
`calc(0.0625rem * var(--mantine-scale))`, which becomes 1.1px at 110% —
subpixel rendering blurs the line.

**hover — branch on touch devices.**

```css
@media (hover: hover) { tr:hover  { … } }
@media (hover: none)  { tr:active { … } }
```

This is the Mantine approach. **On touch, `:hover` lingers after a tap** —
the wrong row stays visibly highlighted.

**Keep stripes lighter than hover.** Mantine uses `gray-0` (stripes) / `gray-1` (hover).

**Use `font-variant-numeric: tabular-nums` on numeric columns.**

Only Mantine exposes it as an option in the sample, but in data tables it is effectively
mandatory — proportional digits misalign place values and make column comparison hard.

**Put captions at the bottom.** Both systems explicitly override the browser default (top).

**Checkbox column**

```
right padding 0
vertical alignment matched to the text
```

It can be automated with `:has([role=checkbox])` (the shadcn/ui approach).
It cannot be expressed as tokens, so it goes in the component implementation.

**Sticky header**

```
position: sticky
top: var(--sticky-header-offset, 0)
z-index: 3
```

**Make the offset a variable** — if the page has a fixed top bar, the header must come down by
that height. Hardcode 0 and the header hides behind the top bar.

**Consider automatically compacting components inside tables.**
Cloudscape's `compact-table` context overrides 17 tokens to make buttons, fields, and cards
inside a table compact. Compared to threading a prop through every component,
**absorbing it at the token layer leaves no omissions.**

## Navigation

Source: [navigation.md](navigation.md)

**Sidebar width**

```
expanded   256px  (16rem)
collapsed   48px  (icons only) + 16px horizontal padding = 64px container
mobile     288px  (opens as a sheet)
```

**Collapsed width is 48–52px.** shadcn/ui 48, Cloudscape 52 — a 16–20px icon plus padding.

**Make the mobile width wider than desktop.** It becomes a sheet covering the screen, so there is
no reason to keep it narrow.

**Item height**

```
28–32px  (default 32)
```

The two systems meet at 28px. Dense screens can go down to 24px (Cloudscape compact).

**Make items square in the collapsed state** — equal width and height centers the icon.

**Persist the state in a cookie.** `localStorage` cannot be read during server rendering, so the
first frame paints in the wrong state. shadcn/ui uses a cookie with a 7-day lifetime.

**If you attach a keyboard shortcut, `Cmd/Ctrl+B` is the only precedent in the sample.**

**Tabs**

```
list height    36px
item padding   horizontal 8 / vertical 4
text           14px / weight 500
active marker  2px underline  or  pill background + shadow
```

**Pick one of the two active markers.** shadcn/ui ships both `default` (pill) and `line`
(underline) in one component — **do not mix them.**

**If the active tab gets bolder, consider tightening its letter spacing** (Radix Themes -0.01em).
The weight change alone alters the tab's width and pushes its neighbors.

**The alternative is equal active/inactive weights** — Cloudscape sets both
`font-weight-tabs` and `font-weight-tabs-disabled` to 700.

**If you support vertical tabs, the indicator's direction must change too** —
an underline (2px tall) horizontally, a right-side vertical line (2px wide) vertically.

**Slide the indicator on segmented controls** (100ms `transform`).
Keep opacity shorter (80ms) and the movement reads more clearly.

**Breadcrumbs**

```
item gap          6px → 10px (mobile → desktop)
separator icon    14px
ellipsis control  36×36 (touch target)
wrapping          allowed (flex-wrap)
```

**Give the current location its own color** (Cloudscape `color-text-breadcrumb-current`).
If links and the current location share a color, clickability is indistinguishable.

**Do not rely on truncation; allow wrapping** —
path lengths vary wildly across languages (`i18n/README.md`).

**If the top nav is pinned to dark, handle it at the token layer.**
Cloudscape's `top-navigation` context overrides the `light` values of 182 tokens with their
`dark` values — **fewer omissions than building a dark variant per component.**

**Make layout offsets variables** (Mantine `--app-shell-*-offset`, all 4 directions).
Zero them when the header, sidebar, or footer is absent and the content fills in automatically.

**If you support automotive or mobile, check the count limits first.**
CarPlay caps tabs at 5 as an API constraint — it must be decided at the design stage.

## Feedback

Source: [feedback.md](feedback.md)

**Severity scheme — pick one axis.**

```
semantic axis   success · error · warning · info          (4. Enough for most cases)
severity axis   critical · high · medium · low · neutral  (ops/monitoring screens)
```

**Only Cloudscape keeps both at once, and that is because its domain is an operations console.**
For a general product, start with the 4-value semantic axis.

**Keeping only `destructive`, as shadcn/ui does, is also a real option** —
but adding more later requires a semantic layer (`color.md`).

**Look at Atlassian's `discovery`** — slots like "new feature announcements" that fit none of
success/error/warning/info do come up in practice.

**Status presentation — choose between background color and text color.**

| Approach | Example | Fits when |
|------|-----|-------------|
| **Full background color** | Cloudscape flashbar | Top-of-screen notifications. Unmistakably visible |
| **Text color only** | shadcn/ui alert | Inline alerts. Does not disturb the page's tone |
| Light background + dark text | Mantine Alert (`-light` family) | In between |

**If you use background colors, pair a text color with each background.**
Cloudscape uses black text only on the yellow background (`#ffe347`) —
that is why `color-text-notification-yellow` is a separate token.

**Do not distinguish status by color alone.** shadcn/ui distinguishes by icon shape
(circle / triangle / octagon). But **if `success` and `info` are both circles, shape alone cannot
separate them** — use at least two of color, icon, and text.

**Alert dimensions**

```
padding  16 / 12  (horizontal / vertical)
radius   10–12px
border   1–2px
title    weight 500–700
body     14px, secondary color
```

**Cloudscape is the strongest at radius 12px / border 2px / weight 700,
and shadcn/ui the mildest at 10px / 1px / 500.**

**Decide on per-side border-width tokens only when you need them.**
Cloudscape keeps 5 tokens — 4 sides plus overall — all valued at 2px.
It is a slot for later variants like an accent left border (`border-left: 4px`).

**Use logical property names** (`inline-start` / `block-end`).
They flip automatically in RTL (`i18n/README.md`).

**Icon alignment — reference the line height.**

```
icon height = first line's line height (Radix Themes)
```

Fixing the size and correcting with `translate-y` (shadcn/ui, +2px) must be retuned whenever the
font size changes.

**Keep the icon column at 0px and switch it on with `:has()`** (the shadcn/ui approach).
Title and body alignment holds even without an icon.

**Clamp the title to 1 line and set a minimum height** (`line-clamp-1` + `min-h-4`).
The layout holds even in alerts without a title.

**Toast motion**

```
entrance    250ms  slide from 50% offscreen + fade
exit        200ms  travel only 15% + fade
reposition  250ms  transform, inout easing
```

**Do not skip `reposition`.** When toasts stack or one disappears, the rest teleporting is
visually jarring. **Atlassian is the only system in the sample with this axis, but its absence
always shows.**

**Use `inout` easing for reposition** — unlike entrance/exit, decelerating on both ends makes it
feel like "settling into place" rather than "being shoved."

**Badge**

```
radius   full pill  or  4px
padding  horizontal 8 / vertical 2
text     12px / weight 500
numbers  tabular-nums
```

**Use `tabular-nums` on numeric badges.** The width jitters when a count goes from 9 to 10.
shadcn/ui's sidebar badge uses it together with `min-w-5` (20px).

**Handle buttons on colored backgrounds via contexts.**

Cloudscape's `flashbar`, `flashbar-warning`, and `alert` contexts override button background,
hover alpha, and the primary button color.
**The component never needs to know "what am I inside of."**

```
on dark backgrounds    hover black 15% · primary button white
on light backgrounds   hover black  5% · primary button dark gray
on tinted backgrounds  black 5% in light mode / white 10% in dark mode
```

**Cut the alpha to a third on light backgrounds.** Black at 15% on a yellow background is far
too heavy.
