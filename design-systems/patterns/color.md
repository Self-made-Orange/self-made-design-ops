<!-- lang-links -->
> **English** · [한국어](color.ko.md)
<!-- /lang-links -->

# Color

**This compares palette structures.** The full hex values are in each system's own entry;
here we look at **how they are organised** — which is the information actually referred to.

**Colour measurements down to the component layer are held for 79 systems** (re-synthesised
2026-08-18).
The individual values are in the "components in depth" section of each `systems/*.md`; this
document carries **only the distribution and the cross-system conclusions**.
The tables below were written from the initial sample (weighted towards the token layer and
the framework family), and the re-verification against the 79 is in the "re-synthesis across
79 samples" section — **where the two disagree, the re-synthesis takes precedence.**

## Scale — token counts and theme counts

| system | tokens per theme | themes | total |
|--------|:---:|:---:|:---:|
| **Primer** | **959** | **14** | **~13,400** |
| **Material 3** | **197** | **32** | ~6,300 |
| **Atlassian** | **466** | **12** | **~5,600** |
| **Spectrum** | **633** (369 raw + 94 semantic + 170 aliases) | 3 (light · dark · **wireframe**) | ~1,900 |
| **Cloudscape** | **407** | 2 (light/dark) **× 8 colour contexts** | 814 plus contexts |
| **Carbon** | 235 (+ 247 raw · 78 component) | 4 (white · g10 · g90 · g100) | 940 |
| **Polaris** | 226 (+ 224 raw) | 4 (dark and high contrast are **partial**) | 226 plus 49 overrides |
| **Radix Themes** | 24 per colour × 33 colours | 2 (light/dark) × 2 (sRGB/P3) | **2,973 declarations** |
| Apple iOS | 79 | 4 | 316 |
| Seed Design | ~470 (the colour part) | 1 | ~470 |
| **Tailwind** | **288** | 1 (raw colours only) | 288 |
| **Mantine** | 270 | 1 | 270 |
| Nord | 60 | 4+ (high contrast included) | 240+ |
| **shadcn/ui** | **~50** | 2 (light/dark) | ~100 |
| Orbit | 10 steps per colour | unverified | |
| visionOS | 7 (confirmed) | unverified | |

**Material 3 and Atlassian part on how they reach scale.** Material 3 gets there through the
number of themes (32), Atlassian through tokens per theme (466).

**→ Correction (2026-08-18): Primer is above them on both axes.** 959 per theme × 14 sets =
about 13,400, twice Material 3's. Of those 959, though, the general role tokens
(`bgColor` · `fgColor` · `borderColor`) number only 83 and the rest are component- or
product-screen-specific — **which is why tokens-per-theme cannot be compared across systems
as-is** (see "the size of the semantic layer" below).

**shadcn/ui has the fewest** (~50). It keeps only semantic tokens and takes the raw palette
from Tailwind.

### Scale reveals the strategy

| strategy | systems | method |
|------|--------|------|
| **ship many finished themes** | Material 3 (32) · Atlassian (12) | pre-compute the combinations and export them |
| **ship axes and combine at runtime** | **Radix Themes** | 26 colours × 5 greys × 5 densities × 5 radii × 2 panels = **6,500** |
| **ship raw colours only** | **Tailwind** | no semantic layer. The user builds it |
| **ship semantics only** | **shadcn/ui** | the raw colours come from Tailwind |

**Tailwind and shadcn/ui fill each other's empty slot.**
Tailwind is 286 raw colours plus 0 semantic; shadcn/ui is 0 raw plus ~50 semantic.

**Only Radix Themes defers the combinatorics to runtime.** The opposite direction from
Material 3's 32 themes — a small distribution with far more possible outcomes.

## Layer structure

### Three layers — Seed Design

```
scale/     raw (color-gray-100 …)
static/    fixed (color-static-*)
semantic/  purpose (color-paper · color-ink · color-danger …)
```

Where a raw-plus-semantic pair of layers is common, this **adds a `static`.**

### One layer — Tailwind (there are no semantics)

```
--color-blue-500   a raw colour. That is all
```

**There are no purpose tokens such as `text-primary`, `surface` or `border`.**
It provides 286 raw colours and the user builds the purpose layer.

Tailwind is the only system in the sample with no semantic layer.
**A structure in which adding a high-contrast theme later is next to impossible** (see "high
contrast" below).

### Semantics only — shadcn/ui

```
--primary: oklch(0% 0 0);            semantic
--color-blue-500                      inherited from Tailwind
--chart-1: var(--color-blue-300);     a semantic referring to a raw
```

**It fills Tailwind's empty layer exactly.** It does not rebuild the raw palette and defines
only semantic tokens.

### Two raw sets, opaque and alpha, × light/dark × sRGB/P3 — Radix Themes

```
--blue-1  … --blue-12      12 opaque steps
--blue-a1 … --blue-a12     12 alpha steps
```

Multiplied by light/dark × sRGB/P3, that makes **2,973 colour literal declarations.**
An alias layer of `--accent-*` pointing at the chosen accent colour sits on top.

### State layers as first-class — Material 3

| group | count | share |
|------|:---:|:---:|
| **State Layers** | **147** | **75%** |
| Schemes | 49 | 25% |
| Add-ons | 1 | — |

**Three quarters of the tokens are state expression.** Each colour role gets separate
opacity-layer tokens for hover, press and the rest.

`Schemes` repeats a **four-way structure** — `Primary` / `On Primary` / `Primary Container` /
`On Primary Container` — for every role.

### Four strength steps × three states — Atlassian

```
color.background.accent.blue.subtlest.[default]
                              subtler   hovered
                              subtle    pressed
                              bolder
```

**Four strength steps × three states = 12 per colour.** With 10 colours under `accent` that
is **120**.
Most of the 208 `color.background` tokens per theme are here.

**The names are comparatives.** `subtle` → `subtler` → `subtlest` weakens, while the strong
side has only `bolder` — **an asymmetric structure.**

The same structure as Orbit's three lightness steps × three states + `darker` = 10, with
Atlassian carrying one more strength step.

### Multiplying lightness steps by state — Orbit

One colour is ten steps.

```
normal · normalActive · normalHover
light  · lightActive  · lightHover
dark   · darkActive   · darkHover
darker
```

**Three lightness steps × three states + darker.** The same purpose as Material pulling
state out into separate layer tokens, except that Orbit **puts the state inside the colour
name.**

### Dividing by material layer — Apple iOS

| group | count |
|------|:---:|
| Labels | 4 |
| **Labels - Vibrant** | 4 |
| **Labels - Vibrant - Controls** | 3 |
| Fills | 4 |
| **Fills - Vibrant** | 3 |

**It divides the same concept into three layers** — ordinary / over a material (Liquid
Glass) / over a control.
Elements laid over a glass material get their own colours.

**Apple is the only system in the sample to make material an axis of the colour layers.**

### Alpha as a separate family — Seed Design · Radix Themes

```
scale-color-gray-*         opaque        (Seed Design)
scale-color-gray-alpha-*   with opacity applied

--blue-1  … --blue-12      opaque        (Radix Themes)
--blue-a1 … --blue-a12     alpha
```

Seed Design keeps an `-alpha-` family for five colours: `gray` · `carrot` · `blue` · `green`
· `red`.
**Radix Themes keeps one for all 33 colours without exception** — 24 per colour.

**The opacity is provided as pre-applied values rather than computed at runtime.**

| | colours with an alpha family | steps |
|---|---|:---:|
| Seed Design | 5 | unverified |
| **Radix Themes** | **all 33** | **12** |

### Using alpha as a literal — shadcn/ui · Mantine

Rather than pre-computing, **the alpha is attached at the point of use.**

```
bg-primary/90        Tailwind syntax. 90% alpha
ring-ring/50
oklch(1 0 0 / 10%)   alpha in the token value itself
```

**The token count does not grow, at the cost of the values not matching the design tool.**
There is no variable called `primary/90` in Figma.

Three approaches part.

| approach | systems | cost |
|------|--------|------|
| pre-computed and tokenised | Seed Design · **Radix Themes** | twice the tokens |
| computed at the point of use | **shadcn/ui** · **Mantine** | a mismatch with the design tool |
| state layer tokens | Material 3 | four times the tokens |

### Per-product brand colours — Helios · Atlassian

Helios has **a brand colour token per product** — Terraform, Vault, Consul and so on
(`--token-color-consul` and the rest).

**Atlassian keeps 11 `color.rovo.*` plus three `elevation.rovo.*`.**
`border` and `icon` carry four colours: `lime` · `saffron` · `blue` · `purple`.

| system | product family |
|--------|-----------|
| Helios | Terraform · Vault · Consul and others |
| **Atlassian** | **`rovo`** (14 tokens) |

A structure in which one system wraps several products.

### Colour families per layout region — shadcn/ui

| family | tokens |
|------|:---:|
| **`sidebar`** | **7** (`sidebar` · `-foreground` · `-primary` · `-primary-foreground` · `-accent` · `-accent-foreground` · `-border` · `-ring`) |
| **`code`** | **4** (`code` · `-foreground` · `-highlight` · `-number`) |
| `selection` | 2 |

**shadcn/ui is the only system in the sample to keep a colour family dedicated to a
particular layout region.**
`sidebar` has its own `background`, `primary`, `accent`, `border` and `ring`.

`::selection` is controlled by tokens too (`--selection` · `--selection-foreground`).

### The background/foreground pairing rule — Material 3 · shadcn/ui

| system | notation |
|--------|------|
| Material 3 | `Primary` / **`On Primary`** |
| **shadcn/ui** | `--primary` / **`--primary-foreground`** |

**The same structure with different names.** shadcn/ui has pairs for 12 colours —
`background` · `card` · `popover` · `primary` · `secondary` · `muted` · `accent` ·
`destructive` · `sidebar` · `surface` · `code` · `selection`.

The unpaired tokens: `border` · `input` · `ring` · `chart-1..5`.

**A way of enforcing "this foreground on this background" through the token names**,
guaranteeing the contrast ratio by pairing rather than by value.

### A colour alias layer — Mantine · Radix Themes

```css
--mantine-primary-color-6: var(--mantine-color-blue-6);   /* Mantine */
--accent-9: var(--blue-9);                                /* Radix Themes */
```

**The primary colour is swapped in one place.** Components refer only to the alias, so
changing the brand colour is a one-line token edit.

Mantine has aliases across `primary-color-0`–`9` plus the `-filled`, `-light` and `-outline`
families.
Radix Themes has `--accent-1`–`12` plus `--accent-a1`–`a12`.

**Radix Themes keeps the same aliasing for its greys** — `data-gray-color` chooses among
`mauve` · `olive` · `sage` · `sand` · `slate`.
Radix Themes is the only system in the sample to expose the neutral family as a user-choice
axis.

### The real values of Radix Themes' `--accent-9` — all 26 colours (2026-08-18)

The sRGB hex of step 9 (the solid slot) for the 26 colours selectable through
`data-accent-color`. The values come from `@radix-ui/colors@3.0.0` (a dependency of themes
3.3.0), and each file carries P3 values alongside behind an `@supports` branch. The hex of
every step is left to the sources (the SCHEMA rule) and **only step 9, the component solid
colour, is recorded here.**

| colour | `-9` | colour | `-9` | colour | `-9` |
|----|------|----|------|----|------|
| gray | `#8d8d8d` (dark `#6e6e6e`) | tomato | `#e54d2e` | indigo | `#3e63dd` |
| gold | `#978365` | red | `#e5484d` | blue | `#0090ff` |
| bronze | `#a18072` | ruby | `#e54666` | cyan | `#00a2c7` |
| brown | `#ad7f58` | crimson | `#e93d82` | teal | `#12a594` |
| yellow† | `#ffe629` | pink | `#d6409f` | jade | `#29a383` |
| amber† | `#ffc53d` | plum | `#ab4aba` | green | `#30a46c` |
| orange | `#f76b15` | purple | `#8e4ec6` | grass | `#46a758` |
| lime† | `#bdee63` | violet | `#6e56cf` | mint† | `#86ead4` |
| sky† | `#7ce2fe` | iris | `#5b5bd6` | | |

- **Step 9 holds the same value in light and dark — gray alone excepted** (`#8d8d8d` →
  `#6e6e6e`). The result of comparing all 26, and the design intent that "the solid brand
  colour is mode-invariant" shows up in the values. Steps 1–8 and 10–12 differ by mode
- **For the five marked † (yellow · amber · lime · mint · sky), `--*-contrast` (the text
  colour over step 9) is a dark grey rather than white** (`#21201c` (sand 12) ·
  `#1d211c` (olive 12) · `#1a211e` (sage 12) · `#1c2024` (slate 12)) —
  the contrast problem of a light accent solved with a per-colour contrast token.
  The other 21 are all `white`

### Intent as an independent family — Evergreen

```
colors.js    general colours
fills.js     background fills only
intents.js   success · warning · danger · none
```

**It separates the state colours into their own file and concept rather than keeping them
inside `color`.**

## Ramp step counts — they part into 10, 12 and 16 (2026-08-18)

With the token paths of the five large `full` systems (Spectrum · Polaris · Primer ·
Cloudscape · Carbon) resolved, **the step counts of the raw ramps** can be seen side by side.

| system | chromatic ramps | steps | numbering | greys |
|--------|:---:|:---:|------|------|
| **Spectrum** | **18 colours** (silver included) | **16** | 100–1600 (intervals of 100) | `gray` in 13 steps (with 25, 50 and 75 added at the bottom) |
| **Polaris** | 11 colours | **16** | **1–16 (intervals of 1)** | `gray` in 16 steps |
| **Radix Themes** | 26 colours | 12 (+ 12 alpha) | 1–12 | five greys, `gray` among them |
| **Tailwind** | 26 colours (greys included) | 11 | 50 · 100–900 · 950 | included among the 26 |
| **Carbon** | 9 colours | **10** | 10–100 (intervals of 10) | **three sets** (gray · cool-gray · warm-gray), 10 steps each |
| **Primer** | 8 colours | **10** | 0–9 | `neutral` in **14 steps** |
| **Mantine** | 14 colours (greys included) | 10 | 0–9 | `gray` and `dark`, 10 each |
| **Orbit** | — | 10 | 3 lightness × 3 state + darker | — |
| **Cloudscape** | **none** | — | — | **none** |

(The grey ramps are a separate column — Polaris adds two more families here, `blackAlpha`
and `whiteAlpha`, and Spectrum adds `transparent-black`, `transparent-white` and 11
`static-*` families.)

**There are three camps.**

| steps | systems | character |
|:---:|--------|------|
| **16** | Spectrum · Polaris | one ramp covers light, dark, borders and text |
| 11–12 | Radix Themes · Tailwind | each step is assigned a purpose |
| **10** | Carbon · Primer · Orbit · Mantine | the most common value |
| **0** | **Cloudscape** | there is no raw ramp at all |

- **Only Cloudscape has no raw ramp.** Of its 407 colours the only numbered ramp is the
  chart palette (155), and the 236 product UI colours all carry semantic names.
  **The same policy as having no general radius scale**, applied to colour.
- **The numbering intervals are all different** — Spectrum 100 · Carbon 10 · Polaris 1 ·
  Primer 0-based.
  `blue-500` is the fifth of 16 in Spectrum, the fifth of 10 in Carbon and the fifth of 11 in
  Tailwind — **three different positions.**
- **Two systems add steps to the greys alone** — Spectrum (`gray` in 13 steps, with 25, 50
  and 75 added at the bottom) · Primer (`neutral` in 14, against 10 for the chromatics). The
  greys get denser exactly where the surface layers need finer division.
- **Two systems keep several grey sets** — Carbon (neutral, cool and warm) ·
  Mantine (`gray` plus `dark`). Carbon's reason is a choice of tone, Mantine's a response to
  mode.

### Whether there is an alpha ramp

| present | absent |
|------|------|
| **Spectrum** (`transparent-black-*` and `transparent-white-*`, 13 steps each) · **Polaris** (`blackAlpha` and `whiteAlpha`, 16 steps each) · Radix Themes (12 alpha steps per colour) · Seed Design | **Primer** · **Carbon** (all opaque hex) · Tailwind |

**Carbon keeps no alpha in the raw palette and uses it only at the semantic layer**
(`overlay: rgba(0,0,0,0.6)`). Primer's base ramps are all opaque too.

### Theme-invariant families

The 40 tokens across Spectrum's 11 `static-*` families **hold the same value in light and
dark** — the same idea as Seed Design's `static/` layer.
`static-blue` has only two steps (900 and 1000), `static-red`, `static-indigo`,
`static-magenta` and `static-fuchsia` have five, and the rest have three (400/600/800) —
**the step count differs per family.**

## Semantic layer depth — from one layer to three (2026-08-18)

| system | layers | composition |
|--------|:---:|------|
| **Spectrum** | **3** | 369 raw → **94 semantic ramps** → 170 role aliases |
| **Primer** | **3** | base ramps (**not published**) → 959 functional → component |
| **Carbon** | **3** | `@carbon/colors` 247 → `@carbon/themes` 235×4 → 78 component |
| **Polaris** | 2 | 224 raw ramps → 226 semantic (no component layer) |
| **Cloudscape** | **1** | 407 semantic only (no raw) |
| Tailwind | 1 | raw only (no semantics) |

**Tailwind and Cloudscape meet at the two ends** — both are one layer, Tailwind's raw only
and Cloudscape's semantic only.

### Spectrum — it assigns a ramp to a meaning, not a colour

```
accent-color-100 … accent-color-1600   →  {blue-100} … {blue-1600}
negative-color-*  → red-*     positive-color-* → green-*
notice-color-*    → orange-*  informative-color-* → blue-*
```

**Five meanings × 16 steps = 80.** Where a semantic layer usually maps "one role → one
colour", Spectrum **aliases the whole ramp.** Change the brand colour and all 16 steps of the
`accent` ramp follow at once.

### Primer — it keeps the lower layer out of the distribution

There are **zero** `--base-color-*` variables in the public theme CSS; they exist only in
`dist/internalCss/`.
The preamble of `primitives.css` states the rule: **"never use raw values (hex, px). Semantic
tokens only."**

**The only sample to enforce its layer discipline through the distributed artefact rather
than through documentation.**
Other systems publish the raw ramps and merely advise against using them.

### The size of the semantic layer reveals the product's character

| system | semantic tokens | of which product-specific |
|--------|:---:|------|
| **Primer** | **959** | `diffBlob` 21 · `codeMirror` 19 · `contribution` 18 · `prettylights` 42 (code, editor, contribution graph) |
| **Carbon** | 235 | `syntax*` **88** (37%) · `ai*` 21 · `chat*` 21 |
| **Cloudscape** | 407 | `charts*` **155** (38%) |
| **Polaris** | 226 | `avatar*` 16 · `video*` 3 |
| Spectrum | 264 (94+170) | — (mostly per-colour aliases) |

**In all three of Primer, Carbon and Cloudscape more than a third of the total is dedicated
to a single kind of screen** — GitHub's code view, IBM's syntax highlighting and AI UI, and
AWS's charts.
The proportion of "general-purpose semantic tokens" is smaller than one would think.

## Group classification — Apple iOS is the most subdivided

| group | count |
|------|:---:|
| Miscellaneous | 23 |
| Accents | 12 |
| Grays | 8 |
| Backgrounds | 6 |
| **Backgrounds (Grouped)** | **6** |
| Fills | 4 |
| Labels | 4 |
| Labels - Vibrant | 4 |
| Fills - Vibrant | 3 |
| Labels - Vibrant - Controls | 3 |
| Separators | 3 |
| Overlays | 2 |

**`Backgrounds` and `Backgrounds (Grouped)` are separated at six each** — the background of a
grouped table (as in a settings screen) is a separate family.

## How dark mode is handled

| method | systems |
|------|--------|
| separate theme files | Apple (`light`/`dark`/`ic---light`/`ic---dark`) · Material 3 (32) · Pajamas (`tokens.json`/`tokens.dark.json`) · Codex (a JSON per mode) · **Atlassian** (12 sets) · Siemens iX · Strapi · Shoelace |
| **a CSS class override** | **shadcn/ui** (`.dark { … }`) · **Radix Themes** (`.dark` plus `data-*`) · Ring UI · Vibe |
| **two values in one token** | **visionOS** (`#FFFFFF, #545454`) |
| dark by default | visionOS (`Text/Primary` = white) |
| **switching to alpha in dark** | **shadcn/ui** (`--border: oklch(1 0 0 / 10%)`) |
| **the `light-dark()` CSS function** | **Porsche** (`light-dark(#fff, hsl(…))` in one line) |
| a class plus a media query | **Stacks** (`.theme-dark` plus `prefers-color-scheme`, 556 branches) |
| **the mode pair encoded in the token name** | **DSFR** (the French government) — `--grey-200-850` · `--blue-france-sun-113-625` |
| re-synthesis from an alpha table | **Naive UI** — swap the base colour and the whole neutral set is re-synthesised |
| **a token `sets` axis** | **Spectrum** — every colour token has `sets: {light, dark, wireframe}`. **The same mechanism** as spacing's `desktop`/`mobile`, reused for colour |
| **`$value: {light, dark}` in one JSON** | **Cloudscape** — 409 of 563 tokens hold two values. The same file also carries the `comfortable`/`compact` axis (43) and the `default`/`disabled` motion axis (15) |
| **four complete theme files** | **Carbon** — white · g10 · g90 · g100, 235 each, identically structured. **223 of the 235 differ** |
| **a partial override** | **Polaris** — dark overrides **only 40** of 226, and its name says `-experimental` |

**There are now six methods.** Two extremes are particularly interesting —
**DSFR drives both mode values into the name**, expressing the mode switch in a single token,
while **Naive UI stores no colours and recomputes from alpha constants.**
The former enumerates the values twice over; the latter keeps no palette at all.

**shadcn/ui switches its borders to alpha in dark mode.**

| token | light | dark |
|------|--------|------|
| `--border` | `oklch(0.922 0 0)` (opaque) | **`oklch(1 0 0 / 10%)`** |
| `--input` | `oklch(0.922 0 0)` | **`oklch(1 0 0 / 15%)`** |

Light is an opaque grey and dark is **white at 10–15% alpha.**
Where the surface colours come in several levels, the border follows each surface.
shadcn/ui is the only system in the sample to change how colour is expressed (opaque ↔ alpha)
by mode.

**Mantine keeps `dark` as a colour family** — `--mantine-color-dark-0`–`9`.
A ten-step ramp separate from `gray`, treating the dark-mode surface colours like a hue.

**Only visionOS joins two colours in one token with a comma.** What the two values mean
(a gradient / per mode / over and under a material) could not be confirmed from the kit.

**visionOS is dark by default** — `Text/Primary` is white.
Different from iOS keeping both light and dark themes.

## Accessibility — high-contrast themes

| system | what is provided |
|--------|-----------|
| **Material 3** | **four**: `light-medium-contrast` · `light-high-contrast` · `dark-medium-contrast` · `dark-high-contrast` |
| **Atlassian** | **two**: `light-increased-contrast` · `dark-increased-contrast` (466 tokens each) |
| **Nord** | high contrast for both the default and the veterinary theme |
| **Primer** | high contrast plus **colour-vision-deficiency** variants → **14 sets measured (2026-08-18)**: 2 light/dark × 3 colour vision (default · colorblind · tritanopia) × 2 contrast, plus two dark-only `dimmed` |
| Codex | a theme file per mode |
| **Polaris** | **one**, `light-high-contrast-experimental` — overriding **only 8** of 226 (3 text · 3 border · 1 icon · 1 surface) |
| **Carbon · Cloudscape · Spectrum** | **no high-contrast theme** (Carbon responds with `forced-colors` system colours in its component SCSS — `systems/carbon.md`) |
| **Tailwind · shadcn/ui · Mantine · Radix Themes** | **none** |

**Only Material 3 keeps a medium contrast.** Most provide high contrast alone.

**Only Primer provides a colour-vision-deficiency theme at the token level.**
→ **Corrected (2026-08-18): Unify is the second, and only Unify divides it into three
types.**
See "re-synthesis across 79 samples — high contrast and forced colours" below.

**Atlassian's high-contrast theme has the same token count as the ordinary themes** (466).
The structure is identical and only the values differ, so switching is a single file swap.

### None of the four frameworks has a high-contrast theme

This shows, in reverse, **the practical reason for having a semantic layer.**

| system | a semantic layer | difficulty of adding high contrast |
|--------|:---:|------|
| Atlassian · Material 3 | yes | swap the values |
| shadcn/ui · Radix Themes · Mantine | yes | **possible but not provided** |
| **Tailwind** | **✗** | **next to impossible** |

**Tailwind is structurally hard.** Raw colours such as `bg-gray-100` are driven directly into
the code, so there is no intermediate point at which to change them for a high-contrast mode.

**shadcn/ui, Radix Themes and Mantine have a semantic layer and still do not provide it.**
A question of scope, not of structure.

**Radix Themes exposes `--scaling` (density) as an axis and does not make contrast one.**
There is no accessibility axis among its five theme axes.

## Algorithmic generation

| system | method |
|--------|------|
| **Ant Design** | `colorAlgorithm.js` — a palette generated from a seed colour |
| **Material 3** | dynamic colour based on `material-color-utilities` (unverified) |
| Orbit | colour conversion utilities such as `convertHexToRgba` included in the token package |

**Ant Design computes its whole palette from a single seed colour.**
The same philosophy as deriving its spacing from `sizeUnit` and `sizeStep`.

## Special colour values

| value | systems | purpose |
|----|--------|------|
| `rgba(0,0,0,0)` | Pajamas | `border.color.transparent` — "a border exists but is not seen" |
| **`transparent`** | **Atlassian** | **`utility.UNSAFE.transparent`** — `UNSAFE` in the name |
| `#7676801f` | Apple | `Fills/Tertiary` — an eight-digit hex (alpha included) |
| **`oklch(0% 0 0)`** | **shadcn/ui** | black as an `oklch` lightness of 0% |
| **`color-mix(in oklab, …)`** | **Radix Themes** | shadow colours mixed at runtime |
| `0.02em` | Nord | `border-radius-sharp` (not a colour, but an extreme of the same kind) |

**Pajamas attaches an explanation to its transparent border** —
"when a border must exist but must not be visually perceived".
A case of tokenising a transparent border kept for layout.

**Atlassian puts `UNSAFE` in the token name** — `utility.UNSAFE.transparent`.
Where Pajamas warns through a description, Atlassian warns **through the name.**
Atlassian is the only system in the sample to mark usage risk in a token name.

**Radix Themes mixes its shadow colours at runtime.**

```css
--shadow-2: 0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%), … ;
```

It uses that value only inside `@supports (color: color-mix(in oklab, white, black))`, and
falls back to `var(--gray-a3)` where unsupported.
**Because the shadow refers to grey-family tokens, changing `data-gray-color` shifts the
shadow's tone with it.**

### Colour spaces — OKLCH and P3

| system | colour notation |
|--------|---------|
| most | hex (`#0052CC`) or `rgba()` |
| **shadcn/ui** | **`oklch()` exclusively** |
| **Radix Themes** | hex plus a **`display-p3` alternative palette** (1,579 occurrences) |
| Radix Themes (shadows) | `color-mix(in oklab, …)` |

**Only shadcn/ui has every colour token in `oklch()`.**
In the form `oklch(0.577 0.245 27.325)`, lightness, chroma and hue are separated, so
adjusting the lightness alone is a change to one figure.

**Only Radix Themes keeps a wide-gamut (P3) alternative palette at the token level.**
It redefines the colours inside `@supports (color: color(display-p3 …))`.

**Two systems use modern CSS colour features for different purposes** —
shadcn/ui for **ease of manipulation**, Radix Themes for **display support.**

### Chart colours — they part three ways

| system | count | method |
|--------|:---:|------|
| **Atlassian** | **100** | 16 `categorical` colours + 6 steps × 10 colours + 4 × 5 by state |
| **Cloudscape** | **90** | 8 colours × 10 steps, **the step name being the contrast ratio** |
| **shadcn/ui** | **5** | `blue` 300 · 500 · 600 · 700 · 800 — **a single-hue lightness ramp** |

**Atlassian and shadcn/ui are opposites.** Atlassian distinguishes categories by hue and
shadcn/ui by lightness.

| | advantage | cost |
|---|------|------|
| hue separation (Atlassian) | distinguishable even with many categories | confusable with colour-vision deficiency |
| a lightness ramp (shadcn/ui) | robust to colour-vision deficiency | hard to distinguish past five |
| **steps by contrast** (Cloudscape) | **the required contrast is picked from the value** | limited to eight hues |

**Atlassian's 16 `categorical` colours even fix the order in which categorical data uses
them.**

## Contrast ratios — only Cloudscape states them as values

The step numbers of Cloudscape's chart palette **are the contrast ratios.**

```json
"color-charts-red-300": {
  "$value": { "light": "#ea7158", "dark": "#d63f38" },
  "$description": "Color from the 'red' data visualization palette at a contrast ratio of 3:1"
}
```

| token step | contrast ratio |
|:---:|:---:|
| `300` | 3:1 |
| `400` | 4:1 |
| `500` | 5:1 |
| … | … |
| `1200` | 12:1 |

**The step number ÷ 100 = the contrast ratio.** Eight colours (`red` · `orange` · `yellow` ·
`green` · `teal` · `blue` · `purple` · `pink`) × 10 steps = **90 tokens**
(`blue` alone has 20, in two sets).

**Cloudscape is the only one to put the contrast ratio in its token names and
descriptions.**
"A red that meets WCAG AA (4.5:1)" is identified directly as `color-charts-red-500`.

**A different layer from Primer providing a colour-vision-deficiency theme and Material 3
keeping a medium-contrast theme** — those swap a whole theme, while Cloudscape
**lets the required contrast be picked one token at a time.**

Because the `$description` ships in the package, **tools can read it** — Style Dictionary and
Figma plugins surface the description as-is.

### Where the contrast ratios are not

**Even Cloudscape has them only in the chart palette.** The general UI colours
(`color-text-*` · `color-background-*`) carry no contrast-ratio notation.

**None of the other 33 systems has a contrast-ratio figure on any colour.**

## Re-synthesis across 79 samples — component measurements (2026-08-18)

The `partial` deep pass raised the colour measurements to 79 systems, and this document's
conclusions were re-verified against that sample.
**This section too lists no hex** (the `SCHEMA.md` rule) — it carries not values but
**how the colours are made and where they are used.** The real values are in each
`systems/*.md`.

### How state colours are made — six branches

| method | systems |
|------|--------|
| **enumeration** (hover and press colours listed as tokens) | **Charcoal** (default/hover/press variable triads) · **EUI** (7 colours × base/fill/empty × a dedicated token layer for default/hover/active) · Semi (literals, swapped instantly with no transition) · Shoelace (moving along the ramp, 600→500→600) · Atlassian (strength × state) · **LINE** (a `p`-suffixed pressed hex baked into the palette in advance — documentation layer) |
| **a build-time function** | **bf-solid** `darken($fill, 20%)`/`darken($fill, 35%)` · **SmartHR** `hoverColor = darken(0.05, value)` · Stacks (LESS `darken()`) · Fleet (`darken($yellow, 20)` — at the token layer) · **Origami** (generated by a two-argument function of colour and background context, with no enumeration) |
| **a runtime CSS function** | **PIE** (the hover background computed with `color-mix()`, with an hsl-component fallback) · **PrimeVue** (`color-mix(in srgb, {primary.color}, transparent 96%)`) · Tegel, Welcome UI and Skeleton (scrims) · Radix Themes (shadows) · **Blueprint** (the `oklch(from …)` relative-colour syntax) |
| **alpha composition and state layers** | Material 3 (a state layer — at the token layer) · **Vapor** (one gray-900 α0.08/0.16 overlay for every variant) · **Vuetify** (state-layer opacity × a theme multiplier) · Naive UI (black alpha at .05/.09/.13) · Serendie (an `::after` overlay) · Clarity (an `::after` at opacity .1) · **Yoga** (`hexToRgb(primary, .75)`) · shadcn/ui (`bg-primary/90`) · Radix Themes (12 alpha steps) |
| **a filter** | **Skeleton** — hover is `brightness(125%)` (75% in dark). **It has zero per-variant hover colour tokens.** |
| **a formula** | **LINE** — Pressed is defined by converting to HSV and adding or subtracting by lightness band (V ≤ 32% → +45 / 33–86% → −20 / ≥ 87% → −35). A documentation-layer sample |

> **Correction.** The state-handling table in the earlier "implementation defaults" had four
> methods (a state layer · strength × state · state in the name · alpha at the point of use),
> and **the two camps that derive colour by function (build-time Sass/LESS · runtime
> `color-mix()`/relative colour) and the filter camp were missing.**
> Across the 79 samples those three together number 15 or more — an axis, not a minority
> taste.
> The table in the "implementation defaults" section below has been corrected accordingly.

**The function camp's shared cost is the same** — because the hover and press colours do not
exist as tokens, **there is no corresponding variable in the design tool, and it is hard to
make an exception for one state.**
bf-solid and Skeleton are the two ends of that camp: the former's build output remains a
fixed hex, and the latter never has a colour at all, only a filter.

### Scrims — the density spreads from 0.1 to 0.9

```
~0.2 and below   shadcn/ui Drawer 0.1 (+ blur) · Origami 0.2 · Strapi 0.2 ·
                 Welcome UI ≈0.23 (assembled by color-mix) · Kontur 0.24
the 0.3s         Material 3 0.32 (token layer) · Vapor 0.32 · Vuetify 0.32 · Shoelace 0.33
0.4–0.5          Braid light 0.4 · Ring UI light 0.4 · Paste 0.4 · Yoga 0.48 ·
                 Astro · Base Web · Kaizen · SGDS · Stacks · Pluralsight · HeroUI ·
                 Orbit · Priceline (medium) 0.5 · Siemens iX 0.549 · PIE 0.55
the 0.6s         Semi 0.6 · LeafyGreen 0.6 · Braid dark 0.6 · DSFR 0.64
0.7              Blueprint · Backpack · EUI · Evergreen · eBay · NYSDS ·
                 Ring UI dark · Vibe · Priceline (dark) 0.75 · Skeleton 0.75
0.8 and above    Asphalt ≈0.8 · Gestalt 0.8 · Vitamin 0.8 · Vanilla 0.85 ·
                 Protocol 0.85 (0.9 on the inner panel)
```

**The mode is around 0.5, but the axis spreads across 0.1–0.9, so there is no "conventional
value".**
The two ends are different strategies — **shadcn/ui's Drawer at 0.1 and Park UI separate the
background with a blur instead of darkness**, while **Vitamin's 0.8 and Protocol's 0.85 use
the scrim as a means of removing the background.**
Blueprint's 0.7 pairs with a single dialog that has no width steps either.

**The camp that does not make the scrim pure black is large.** It is not an exception to a
neutral convention but nearly half — EUI (blue-grey) · Evergreen (blue-grey) · eBay (a navy
ink) · **Vibe** (a navy tint) · Paste (navy) · Forma 36 (navy) · NYSDS (based on an ink
colour rather than pure black) · Semi · DSFR · Stacks · Strapi · Shoelace (grey) · Priceline
(three steps off one base) · **Yoga** (a dark leaning plum).
**EUI and Evergreen converging independently on nearly the same blue-grey at 70% is the
strongest signal on this axis** — two data tools reaching the same value without reference to
each other.

**Inverted (light) scrims number five samples** — **bf-solid** white 0.9 ·
**Codex** white 0.65 in light (black 0.65 in dark) · **Cedar** sand 0.85 plus
`backdrop-filter: blur(16px)` ·
**Park UI** white alpha 10 plus blur(4px) in light · **Bolt** (navy 0.8 by default with a
`--overlay-light` white variant).
**Three of the four use a blur alongside** — apparently because a light scrim alone does not
separate the background, and Cedar and Park UI make that combination explicit.

**Three samples expose the density as an axis** — **Ring UI** (light 0.4 / dark 0.7) and
**Braid** (light 0.4 / dark 0.6) take **colour mode** as the axis, while **Priceline** keeps
**three semantic tokens** off the same base colour, dark 0.75 / medium 0.5 / light 0.25.
**Vapor binds the scrim opacity and the disabled opacity to the same 0.32 constant** —
a sample that unifies "damping" on one value.
The modal-side comparison is in `modal.md`.

### disabled — it is opacity, not colour

```
0.26   Vuetify (the lowest)
0.3    Audi 0.30 · bf-solid · Grommet · Kaizen · Spindle
0.32   Charcoal · Vapor
0.38   Vitamin (`--vtmn-opacity_disabled-state`) · Vibe — both the M3 coefficient
0.4    Astro (`opacity-disabled` 40%) · Atlassian (`opacity.disabled`)
0.5    shadcn/ui (`opacity-50`) · Shoelace · HeroUI (`disabledOpacity`) · Naive UI (`alphaDisabled`)
```

**Expressing disabled with a single opacity value rather than swapping colours is the
majority.**
`Charcoal` applies 0.32 **to all children at once** when the root is disabled, and `Vitamin`
even gives that value a token name.
**The axis spreads more than twofold** (0.26 to 0.5), so it must not be ported between
systems as-is.

**Three exceptions do not use opacity.**

- **Welcome UI** — disabled is **diagonal hatching** rather than a greying
- **Vibes** — a background swap (a light grey) plus `cursor: not-allowed`
- **the Digital Agency** — it avoids relying on colour change alone and lays a **4px double
  border in the background colour** on solid fills so the outline survives in forced-colour
  mode

**The known cost of the opacity approach** is that **the text contrast collapses along with
it**, and no system in the sample was confirmed to manage that as a value.

### Focus-ring colour — "the brand colour" is not the default

| policy | systems |
|------|--------|
| **the brand colour as-is** | Naive UI (green throughout its grammar) · Strapi · Odyssey · Unify (brand purple, **dashed**) · **Welcome UI** (its brand yellow reaching the focus ring) · Vibe (though of its 919 variables **only the focus colour is hardcoded**) |
| **a dedicated colour separated from the brand** | **Asphalt** (a blue `--interactive-focus`, separate from its brand green) · **Astro** (a pale purple colliding with neither its six classification nor its six status colours) · **Grommet** (a single fluorescent mint unrelated to its brand purple) · NYSDS (a separate colour for inverted mode) |
| **an achromatic double ring** | **Italia** (white inside, black outside, `$focus-outline-color-in/-out`) · **the Digital Agency** (yellow inside, **black outside**) · the GOV.UK family (yellow) · **WMN** (a white gap plus purple, one global rule) · Odyssey (white plus the brand) · Canvas (a white inner ring plus a brand outer) · SmartHR (an inset 4px white plus 2px blue) · **Vibes** (a **three-layer sandwich** of white, blue and white, shipped as a `FocusHighlight` component) |
| **state-dependent** | **Intergalactic** — a green ring when valid, red when invalid. **HSDS** likewise shares error/warning/success ring colour variants with the input |
| **theme-dependent** | Pluralsight (a blue step per theme) · **Auro** (per brand — alaska purple / hawaiian navy) · Kaizen (its three reversed themes take a ring one step lighter) |
| **expressed without colour** | **Thumbprint** — no ring, but `text-decoration: underline` plus a background change (`outline: none`) · **KRDS** — the border width from 1 to 2px · **Porsche** — inputs swap the border colour (the outline appears only under `forced-colors`) |

**"Focus = the brand colour" is not a convention but one of six policies.**
The most informative part is **why the dedicated-colour camp exists** — Astro because its
classification and status colours already occupy 12 hues, and Asphalt and Grommet
deliberately picked **a colour outside the palette** so the brand colour would not collide
with a state signal. The denser the colour system, the further out the focus colour goes.

**The motive of the achromatic and double-ring camp is background independence** — a white
gap is inserted so the ring does not disappear over any surface. **Vibes ships that structure
as a component**, so the same ring can be laid over any element.

**Intergalactic's and HSDS's state-dependent rings are a decision in the other direction** —
rather than having focus consume one more colour, they let the validation state be read from
the ring too.

### High contrast and forced colours — what parts is "the layer at which colour is given up"

Re-reading the earlier "accessibility — high-contrast themes" section across the 79 samples,
there are two further branches.

- **Handing over to CSS system colours** — **Clarity** switches to **OS forced-colour
  keywords** such as `Canvas` and `CanvasText` in its high-contrast theme.
  **Carbon** likewise puts `border: 1px solid ButtonBorder` directly in its component source.
  Rather than defining values, they delegate to the OS
- **Restoring what is lost under `forced-colors`** — the camp that draws borders with an
  inset box-shadow loses its outlines in forced-colour mode. **Pajamas** (restoring a real
  border under `forced-colors: active`) · **DSFR** (restoring the border) · **Stacks** (laying
  down a 2px transparent outline in advance) · **the Digital Agency** (a 4px double border in
  the background colour) · **Porsche** (showing the outline only in this mode) each handle the
  same problem by different means

The sample of high-contrast themes themselves has grown too — **KRDS's `mode-high-contrast`
has the same token count as its light theme, 190**, the same "identical structure, values
swapped" as Atlassian's (466 in both). A case in the other direction is **Mística**, where the
high-contrast (HC) tokens present inside the raw ramps in 16.44.1 were **removed in 17.1.0.**

> **Correction.** "Only Primer provides a colour-vision-deficiency theme at the token level"
> is **refuted by Unify.** `unify-token@3.0.0` ships **deuteranopia, protanopia and
> tritanopia as three separate CSS files** — Unify is the only system in the sample to divide
> colour-vision-deficiency support by type.

### Places where colour comes from outside the palette

- **Spindle** — it raises **third-party social brand colours into the official token layer,
  two per service** for facebook · twitter · **x** · instagram · apple · youtube ·
  amazon · rakuten · yahoo (`--color-third-party-*`). bf-solid likewise keeps brand fill
  colours such as `$fill-facebook` at the token layer
- **WMN** — a brand axis (purple, blue) **coexists in one button palette with an axis
  borrowed from GOV.UK** (green `start`, red `destructive`). Two colour lineages, visible in
  the values
- **Kontur** — primary is not the brand colour but **an ink colour**
  (`shape-bold-accent`), and beside success and danger sits **a payment-specific colour**
  (`btnPayBg`)
- **Park UI** — leave the colour unspecified and it is **grey** (`colorPalette: gray` by
  default).
  The accent applies by default to the `solid` variant alone; outline, ghost and subtle start
  from grey

**What they share is that the palette does not close around a single brand** —
social sign-in, inheriting a government standard and domain-specific actions (payment,
purchase conversion) each demand a colour outside the brand, and all four systems handled
that as **a token** rather than an exception.
Vitamin's `conversion` (an accent dedicated to purchase conversion) is the same slot.

## Implementation defaults

**Layers** — start with two.

```
scale/     raw colours (gray-100 … gray-900)
semantic/  purpose (text-primary · surface · border · danger …)
```

**Do not skip the semantic layer.** Tailwind is the only case of keeping raw colours alone,
and the cost is that **adding a high-contrast theme is next to impossible.**
Once `bg-gray-100` is driven into the code there is no intermediate point at which to change
it.

shadcn/ui's structure is the way to lay a semantic layer over Tailwind —
inserting one step, `--primary` → `--color-primary` → `bg-primary`.

Add Seed Design's third `static` layer when values genuinely appear that are neither raw nor
semantic.

**Use the background/foreground pairing rule.** Material 3 (`On Primary`) and shadcn/ui
(`-foreground`) share the structure. **It guarantees the contrast ratio by pairing rather
than by checking values**, and the token name makes the decision of "what text colour goes on
this background".

**Keep a primary-colour alias.** A layer swapped in one place, like Mantine's
`--mantine-primary-color-*` or Radix Themes' `--accent-*`.
Changing the brand colour becomes a one-line token edit.

**State handling** — pick one of **six methods** early (corrected 2026-08-18 — the earlier
edition had four). Changing it later is very expensive.

| method | example | pros and cons |
|------|-----|------|
| state layer tokens | Material 3 · **Vapor** · **Vuetify** | free to combine. Four times the tokens |
| **strength × state combinations** | **Atlassian** · **EUI** · **Charcoal** | explicit. 12 per colour (4 strengths × 3 states) |
| state in the colour name | Orbit · Mantine · **LINE** (a `p` suffix) | intuitive. Ten more with every colour added |
| **alpha at the point of use** | **shadcn/ui** (`bg-primary/90`) · **Yoga** | zero tokens. **A mismatch with the design tool** |
| **a build-time function** | **bf-solid** (`darken()`) · **SmartHR** · Stacks · Origami | zero tokens, with fixed results. **No per-state exceptions** |
| **a runtime CSS function** | **PIE** and **PrimeVue** (`color-mix()`) · **Blueprint** (`oklch(from …)`) | follows a theme swap automatically. **Needs a fallback** |

> **Correction (2026-08-18).** The earlier four-method table was **missing the camp that
> derives colour by function.** Across the 79 samples five build-time functions and six or
> more runtime CSS functions are confirmed. **Skeleton goes further still, defining no state
> colours at all and handling them with a `brightness()` filter** — zero per-variant hover
> colour tokens.

**The `bg-primary/90` approach is the cheapest, but there is no corresponding variable in
Figma.**
Where design-code parity matters, pre-compute the alpha into tokens as Radix Themes does
(24 per colour).

**The function camps (build-time, runtime, filter) all pay the same cost** — the hover and
press colours do not exist as tokens, so there is no value to carry into the design tool, and
"make hover different for this variant alone" is impossible. **Recommended only where there
is one brand and few variants.**

**The breadth of state colours** — the sample parts widely.

| system | state colours |
|--------|--------|
| **Atlassian** | danger · warning · success · **discovery** · information (10 each) |
| Evergreen | success · warning · danger · none |
| **shadcn/ui** | **a single `destructive`** |

**Choosing not to have `success` and `warning` genuinely exists** (shadcn/ui).
Adding them later is hard without a semantic layer, though.

**Start with a minimum of four (danger · warning · success · info)**, and if you have a slot
such as "announcing a new feature", look at Atlassian's `discovery`.
**The recommendation holds across the 79 samples too** — at the other end **PrimeVue has
nine** (primary · secondary · success · info · warn · **help** · danger · contrast and so on)
and **Vapor six**. Slots that take domain vocabulary, such as `help`, differ per system, so
**laying down four and adding domain colours afterwards** is the safe order.

**Note the cases where the domain changes the state-colour vocabulary.** **Astro**, being a
control-room domain, makes `standby` and `off` first-class state colours; **Vitamin**, being
commerce, puts `conversion` (dedicated to purchase conversion) into a variant name; and
**Kaizen** keeps a `caution` field state as a warning level short of an error plus a
`pending` colour for loading.
**There are real points at which the "success/warning/error" trichotomy becomes insufficient
for a domain.**

**Dark mode** — separate theme files or a CSS class override are recommended.

| method | systems | suited to |
|------|--------|-------------|
| separate theme files | Atlassian · Material 3 · Pajamas · **Clarity** · **Codex** | three themes or more |
| a CSS class (`.dark`) | shadcn/ui · Radix Themes · **Vibe** · **Ring UI** | two, light and dark |
| **a single `light-dark()`** | **Porsche** · **PrimeVue** | when you want the values in one place |

visionOS's "two values in one token" is awkward to parse and to integrate with tools.
**Grommet's per-colour `{dark, light}` object pairs are the same slot**, except that
application depends on the background context (a `Box`'s `dark` prop), which makes debugging
a different matter from the theme-swap camp (added 2026-08-18).

**Two of the 79 samples adopt `light-dark()`** — it halves the declaration count and needs no
class toggle, but **extracting the per-mode values with a tool requires parsing.**
PrimeVue mixes `color-mix()` into the same value on top of that, effectively giving up static
extraction.

**Consider switching borders to alpha in dark** (the shadcn/ui way).
Where the surface colours come in several levels the border follows each surface —
`oklch(1 0 0 / 10%)` works over any dark surface.

**High contrast** — it need not go in from the start, but **with a semantic layer it is easy
to add later and without one next to impossible.** That is the practical reason for having a
semantic layer.

Since none of the four frameworks provides high contrast, **building on a framework means
building high contrast yourself.** A structure like Atlassian's, with **a file of the same
token set carrying different values**, is easiest to manage —
**KRDS has the same structure** (`mode-high-contrast` at 190 = the same count as light, added
2026-08-18).

**Where fixing the values yourself is hard, there is the option of handing over to the OS**
(added 2026-08-18).
Clarity switches to **CSS system colour keywords** such as `Canvas` and `CanvasText` in its
high-contrast theme, and Carbon writes `ButtonBorder` directly in its component source.
You avoid building another palette, at the cost of giving up design control.

**If you draw borders with an inset box-shadow, add a `forced-colors` measure alongside.**
In forced-colour mode the shadow disappears and the element's outline goes with it.
Four means are confirmed — restoring a real border (**Pajamas** · **DSFR**) ·
laying down a transparent outline in advance (**Stacks**) · a double border in the background
colour (**the Digital Agency**) · showing the outline only in this mode (**Porsche**).

**Colour-vision deficiency is an axis separate from contrast.** Only two are confirmed at the
token layer (Primer's colorblind variants · **Unify**'s **three separate CSS files** for
deuteranopia, protanopia and tritanopia), and **only Unify divides by type.**
If you plan to implement it yourself, decide first whether to split red-green from blue-yellow
rather than building "one colourblind set".

**Colour space** — consider `oklch()`.

```css
--primary: oklch(0.577 0.245 27.325);   /* lightness chroma hue */
```

Adjusting the lightness alone is a change to one figure. With hex all three channels have to
be recomputed.
Only shadcn/ui uses it in the sample, and browser support is sufficient.

**Add a P3 alternative palette when you need it.** Radix Themes is the only case, and it
grows to 1,579 declarations. Wrapping it in `@supports` makes the fallback automatic.

**Scrims** — decide the colour and the density separately (added 2026-08-18).

```
density   start around 0.5        (the modal band across the 79 samples — though the axis spreads 0.1–0.9, with no standard)
colour    an ink or navy rather than pure black  (nearly half the sample uses a chromatic tint)
```

**Fixing only the density and leaving the colour black puts you out of step with the sample
majority.** EUI and Evergreen independently arrived at the same blue-grey at 70%, and eBay,
Vibe, Paste, NYSDS and Yoga each use their own ink.
**A dark value of the same family as the background surface** sits better than black.

**If you use a light scrim, add a blur with it.** Three of the five inverted samples
(Cedar · Park UI · shadcn/ui's Drawer) come with a `backdrop-filter` — a light scrim alone
does not separate the background.

**Decide early whether the density differs between light and dark.** Ring UI (0.4/0.7) and
Braid (0.4/0.6) go darker in dark. There is also the option of exposing three semantic steps
(Priceline's dark/medium/light). The modal-side value comparison is in `modal.md`.

**disabled** — a single opacity value rather than a colour is the majority practice
(added 2026-08-18).

```
start at 0.35–0.4   (Astro and Atlassian 0.4 · Vitamin and Vibe 0.38 — near the sample's centre)
```

**Across the 79 samples the axis spreads nearly twofold, from 0.26 (Vuetify) to 0.5
(shadcn/ui, Shoelace, HeroUI, Naive UI)** — do not port another system's value as-is.
**Binding it to the same value as the scrim opacity, as Vapor does**, makes the damping
constant a single value and simplifies management (0.32).

**Expressing disabled by opacity alone collapses the text contrast with it.**
No system in the sample was confirmed to manage that as a value, so **you have to check it
yourself.**
The cases that add an expression not dependent on colour are worth looking at —
Welcome UI (diagonal hatching) · Vibes (a background swap plus a `not-allowed` cursor).

**Focus-ring colour** — do not take the brand colour as the default; **check the palette for
collisions first** (added 2026-08-18).

```
a simple colour system   the brand colour as-is    (Naive UI · Strapi · Welcome UI)
many state colours       a dedicated colour outside the palette (Astro's pale purple · Grommet's fluorescent mint · Asphalt's blue)
varied backgrounds       an achromatic double ring (Italia · Canvas · Odyssey · WMN · Vibes' three layers)
```

**The more of the colour wheel a system's classification and status colours already occupy,
the further the focus colour goes outside the palette.** Astro picking a pale purple to avoid
its six classification and six status colours is the clearest case.

**If you plan to support both dark and light surfaces, a double ring with a white gap is
recommended.** A single ring colour will inevitably be buried on one of them. **Pulling the
ring out as a component, as Vibes does**, lets the same spec be applied to elements outside
buttons.

**Do not leave the focus colour outside the tokens** — Vibe keeps 919 CSS variables and still
has its focus-ring colour hardcoded, so it drops out of a theme swap.

**Chart colours** — decided by the number of categories.

| categories | method | example |
|:---:|------|-----|
| ~5 | a single-hue lightness ramp | shadcn/ui (`blue` 300–800) |
| 6 or more | hue separation plus a fixed order of use | Atlassian (16 `categorical`) |

**A lightness ramp is robust to colour-vision deficiency.** Where you do not plan to exceed
five, that side is recommended.
If you distinguish by hue, **fix the order of use in tokens too** — otherwise the colour order
differs from chart to chart.

**Layout-region colour families** — where a region's tone is clearly different, such as a
sidebar or a code block, consider a dedicated family as shadcn/ui does. It is more explicit
than overriding the semantic tokens.

## Not yet filled in

- **The full hex values** — deliberately not carried (the `SCHEMA.md` rule). Left to the
  source links
- ~~The WCAG AA/AAA conformance target~~ → **resolved at the documentation layer
  (2026-08-18).** The result of checking ten systems' accessibility documentation directly:

  | stated | target |
  |------|------|
  | Primer | **WCAG 2.2 AA** ("GitHub aims for…") |
  | GOV.UK | **WCAG 2.2 AA** (an accessibility statement of "fully compliant") |
  | Nord | **WCAG 2.1 AA** |
  | USWDS | **WCAG 2.1 AA** (exceeding the legal 2.0 AA — with a stated gradual aim at 2.2 and AAA) |
  | Carbon | **WCAG AA** (by way of the IBM Checklist · contrast stated as "2.1 AA") |
  | Polaris | 2.1 A+AA — **in the old documentation only** (the wording is gone from the current shopify.dev; confirmed in the Wayback Machine) |
  | M3 · Spectrum · Cloudscape | **confirmed unstated** (only general mentions of WCAG) |
  | Atlassian | not in the design-system documentation — only the company-wide standard of 2.1 AA (atlassian.com/trust) |

  **The tendency: the government and government-supplying family (GOV.UK · USWDS · Carbon)
  and recently updated systems (Primer at 2.2) state it, while the systems that provide a
  high-contrast theme (M3 · Atlassian · Spectrum) do not state a target level** — the
  implementation without the declaration. Systems that put a target level in their tokens
  still number zero, and Cloudscape is the only one to state contrast ratios (the "contrast
  ratios" section above).
- ~~Whether there are only four ways of generating state colours~~ → **resolved
  (2026-08-18)** — **six branches** are confirmed across the 79 samples. The "how state
  colours are made" section above
- ~~The distribution of scrim density and colour~~ → **resolved (2026-08-18)** — the "scrims"
  section above (0.1–0.9 · nearly half chromatic tints · five inverted samples)
- ~~How disabled is expressed~~ → **resolved (2026-08-18)** — the "disabled" section above
  (opacity 0.26–0.5 · three non-opacity exceptions)
- ~~Focus-ring colour policy~~ → **resolved (2026-08-18)** — the "focus-ring colour" section
  above (six policies)
- ~~**Spectrum · Polaris · Primer · Cloudscape · Carbon colour** — the token paths were
  unverified~~
  → **all resolved (2026-08-18)**. The paths were all inside the npm distributions:
  `@adobe/spectrum-tokens@15.0.0` `src/color-palette.json` · `semantic-color-palette.json` ·
  `color-aliases.json` / `@shopify/polaris-tokens@9.4.2` (frozen) `dist/cjs/src/colors.js` ·
  `themes/base/color.js` (read from `dist/cjs/`, since npm has no `src/`) /
  `@primer/primitives@11.10.0` `src/tokens/base/color/**` · `functional/color/*`
  plus **`dist/internalCss/`** (the raw ramps are only there) /
  `@cloudscape-design/design-tokens@3.0.107` **`index-visual-refresh.json`**
  (`index.scss` holds the light values only — dark is in the JSON) /
  `@carbon/colors@11.56.0` plus **`@carbon/themes@11.79.0`** (`index.scss` is a `@forward`
  shell; the real values are in `js/generated/themes/*.js`).
  The results are in the "ramp step counts" and "semantic layer depth" sections above and in
  each `systems/*.md`.
  (Atlassian was resolved earlier — `dist/cjs/artifacts/tokens-raw/atlassian-light.js`, 466
  tokens)
- ~~**shadcn/ui's eight style variants** (`luma`–`vega`) — the `styles/` directory was
  unverified~~ →
  **the path is resolved (2026-08-18)**: `apps/v4/styles/` is gitignored build output and the
  source was the eight files `apps/v4/registry/styles/style-*.css` (`systems/shadcn-ui.md`).
  **What was measured, though, is radius, height, type and padding; whether the eight styles
  differ in colour was not checked separately.**
- ~~The actual values of Radix Themes' 26 colours~~ → **resolved for step 9 (2026-08-18)** —
  the "the real values of `--accent-9` — all 26 colours" table above
  (`@radix-ui/colors@3.0.0`).
  Confirmed down to light and dark being identical (gray excepted) and the five contrast-colour
  exceptions.
  The remaining steps (1–8, 10–12) are still left to the sources
- **Mantine's dark-mode mapping rules** — which semantic slots the `dark-0`–`9` ramp goes
  into is unverified
- **Automotive colour specifications** — a day/night luminance switch seems likely to exist in
  Android Automotive but is unverified
