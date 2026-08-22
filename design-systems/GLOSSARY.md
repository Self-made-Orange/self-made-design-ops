<!-- lang-links -->
> **English** · [한국어](GLOSSARY.ko.md)
<!-- /lang-links -->

# Glossary

Terms that trip readers up in the corpus documents, in three groups.

1. **Corpus shorthand** — phrases this repository coined, opaque on first sight
2. **Same concept, different names** — synonyms that vary by system
3. **Same name, different meanings** — easy to misread because the names match

Each item's source is the file named in brackets. No claims are made about values not
recorded there.

---

## 1. Corpus shorthand

### The seven Liquid Glass parameters

**Liquid Glass is the name of Apple's material introduced in iOS 26.** It is a surface that
refracts the background like translucent glass, and the official Figma kit exposes the
material as **optical physics parameters** in variables (`systems/apple-hig.md`).

The "seven" is **the number of parameter kinds**:

| Parameter | Meaning | iOS 26 value |
|-----------|---------|:---:|
| Light Angle | angle of the light source | −45 |
| Opacity | opacity | 60 |
| Refraction | refraction | 100 |
| Dispersion | dispersion (prismatic colour spread) | 0 |
| Frost | surface frosting | 7 / 12 / 14 (by size) |
| Depth | depth | 16 |
| Splay | splay | 6 |

Expanded with the size variants (Frost — Regular/Medium/Large and so on) and two shadow
blurs, that comes to **13 tokens** — "13 Liquid Glass materials" in `index.md` refers to
this token count.

**What changed:** before iOS 26, Apple's materials were **blur strength steps**
(ultraThin / thin / regular / thick — Materials in Apple's developer documentation, general
knowledge outside this corpus). Blur is a single axis of "how out of focus"; Liquid Glass
gives refraction, dispersion and light angle their own tokens — **the optical properties of
a lens**. Set against other systems: most samples stop at `shadow` and `elevation` for
surface treatment. Only the Apple kit tokenises optical parameters.

**Why it is cited so often:** the same variables in the macOS 26 kit hold **exactly the same
values** as iOS (`systems/macos.md`). Dimensions (24/36 vs 44/48pt) and state vocabulary
(`Clicked` vs `Selected`) split by platform while the material's physical values stay
invariant — it is used as evidence for what is platform-dependent and what is not.

### The half coordinate system

That macOS controls (24/36pt) are 45–55% of the same company's touch targets (44/48pt)
(`systems/macos.md`, evidence 5 in `platforms.md`). A mouse pointer is more precise than a
finger, so half the target suffices.

### The three expressions of spring

The three ways spring motion is distributed as tokens (`patterns/motion.md`):
Atlassian's one `linear()` with 65 stops / Open Props' `linear()` across 5 steps /
TDS's 8 presets of physics parameters (`stiffness`/`damping`/`mass`).
The CSS camp precomputes the curve and freezes it; TDS resolves it at runtime.

`linear()` is a CSS easing function that carries **overshoot (the stretch past 1 and back)**,
which `cubic-bezier()` cannot express, as a list of stops.

### The t-shirt scale

A scale using clothing-size names, `xs / s / m / l / xl`, as against numeric naming
(`space-400`). The observation that every counterexample to the spacing core values comes
from a t-shirt scale's smaller steps is in `tokens/scales.md`.

**There are five naming types across the samples** — t-shirt (most) · numeric (splitting
across six different bases) · **alphabetic** (PIE `a`–`j`, unique in the corpus) · prose
multipliers (Cedar `one-and-a-half-x`) · **grid multiples** (Braid — the value itself is a
count of units).

### Grid-multiple tokens

Where the value is **a count of grid units** rather than px. Braid's `space.medium: 6` is
not 6px but `grid: 4` × 6 = **24px**. Change the grid and the whole scale rescales — the
same effect as runtime scaling (Mantine and others), moved to build time.

### `lineGap`

Defining line height as **the empty space between lines**, rather than as a total height or
a ratio. Braid alone. The visual gap holds even when the typeface changes — Vanilla
(Canonical) solves the same problem with `nudge` correction values.

### Ramp

The lightness steps of one hue — `blue50 … blue900` and the like. "The ramp inverts" refers
to cases like the TDS dark theme where **the mapping between number and lightness reverses
by mode** (`systems/toss-tds.md`: `darkThemeBlue900` is sky blue).

### Core values / unbroken values

Spacing values every sample adopted without exception were called "unbroken".
**There are none at present** — 16px, the last one standing, broke at the 30th sample
(Garden), and what remains is a ranking by adoption rate (`tokens/scales.md`).

### Seed derivation

Generating values by formula **from a single base** rather than enumerating them
individually. Ant Design (the `fontSize: 14` seed) and Tailwind (`--spacing` base ×
`calc()`) work this way.

### Companion specifications

Tokenising, for each font size, the height of the icon that sits beside it, the badge
specification and the link underline thickness together. TDS alone among the samples
(`systems/toss-tds.md`).

### The remapping table

A table respecifying the px of 20 typographic roles at each of the nine accessibility text
scaling steps (iOS Dynamic Type). It moves work the OS was doing into the token layer, and
TDS alone among the samples does it.

---

## 2. Same concept, different names

### Spacing tokens

| Name | Systems |
|------|---------|
| `space` / `spacing` | Polaris · Atlassian · Fluent · Cloudscape · Mantine · Radix and many more |
| `size` | **Ant Design** (`size`/`sizeMS`) · Codex (`size-100`) |
| `dimension` | Vapor (`dimension-200`) |
| `base-size` | Canvas |
| **`$spacer`** | **Bootstrap · SGDS** (a 1rem base plus a multiplier map) |

**The numbers are worse than the names — the same 16px is called 16 · 50 · 100 · 200 ·
300 · 400 · 4 · 2 depending on the system** (actual px / units of 10 / rem × 100 /
rem × 12.5 / non-uniform / multiples of 4px / ordinal / **px × 25** (LeafyGreen) /
**multiples of 8px** (Solid, where 2 is 16px)). The full table is in `tokens/scales.md`,
under "Sixteen names for the same 16px".

### Stacking-order tokens

| Name | System | Scheme |
|------|--------|--------|
| `zIndex.*` by purpose | Chakra | `dropdown` 1000 → `tooltip` 1800, steps of 100 + `skipNav` |
| `$zindex-*` | Bootstrap | in the 1000s, backdrop/content +5 (`modal-backdrop` 1050 / `modal` 1055) |
| **`--layer-*`** | Open Props | **ordinals** 1–5 + `important` (max int) |
| `z-index-*` | Forma 36 | **powers of ten** (1 · 10 · 100 · 1000 · 10000) |
| `*ZIndex` | Vibes (freee) | irregular jumps (100 · 200 · 500 · 1000 · 1500 · 2000 · 3000 · 4000) |
| `$z1`–`$z4` | Solid (BuzzFeed) | ordinals in steps of 100 |
| **`--ps-layers-*`** | Pluralsight | screen-region names plus fine placement in units of 10 (sidenav 930 / topnav 950) |

Note — **seven systems, seven arithmetics**, and **the orderings themselves conflict**
(Forma 36, for one, puts `notification` above `tooltip`). You may borrow the names, but the
ordering does not cross-validate.

### Fully round (pill) radius

A pill and a circle are not the same result — 9999px gives semicircular ends on the shorter
side, while 50% is a circle only on a square. So several systems keep **both**.

| Meaning | Name and system |
|---------|-----------------|
| pill (`9999px`) | Semi `full` · Digital Agency `full` (written as `624.9375rem`) · **Thumbprint `sides`** · Paste `pill` · Shoelace `pill` · Yoga `circle` (9999!) |
| pill (**`calc(infinity * 1px)`**) | **Welcome UI** — the CSS `infinity` keyword, unique in the corpus |
| circle (`50%`) | Semi `circle` · Paste `circle` · **Thumbprint `full`** · Mística `avatar` |
| **`PILL` = `240px`** | **Lightning** — a large-enough fixed value |

**Careful: `full` is 9999px in Semi and Digital Agency, and 50% in Thumbprint.**
**Yoga's `circle` is 9999px** (not 50%), and **Welcome UI uses `infinity`**.
Copying values by name alone gets it wrong.

### Handling dark mode — six approaches (`patterns/color.md`)

| Approach | Systems |
|----------|---------|
| separate theme files | Apple · Material 3 · Pajamas · Codex · Atlassian · Siemens iX · Strapi · Shoelace |
| CSS class override (`.dark {}`) | shadcn/ui · Radix Themes · Ring UI · Vibe |
| two values in one token | visionOS (`#FFFFFF, #545454`) |
| **the `light-dark()` CSS function** | **Porsche** (`light-dark(#fff, hsl(…))` on one line) |
| class and media query together | Stacks |
| **the mode pair encoded in the token name** | **DSFR** (French government) — `--grey-200-850` · `sun`/`moon` |
| recomposing an alpha table | **Naive UI** — change the base colour and every neutral recomputes |

The word for the concept splits too — theme (most) / mode / scheme / appearance (Apple's
documentation). The corpus calls it "how dark mode is handled" throughout.

### Token tiers (raw → purpose)

| Tier | Names by system |
|------|-----------------|
| raw (the value itself) | `primitive` (Digital Agency) · `global` · `base` · the colour ramp names as they are |
| purpose (meaning) | `semantic` (most) · `alias` · Cloudscape's built-in `$description` |
| in between | **Digital Agency's `key`** (13 core brand colours) · **Seed's `static`** |

The exact tier structure differs by system, so the number of tiers cannot be settled from
the names alone.

### State vocabulary

| Platform/system | While pressed | Pointer over | Others of its own |
|-----------------|---------------|--------------|-------------------|
| most web | `active` / `pressed` | `hover` | `focus-visible` |
| the iOS kit | — | none (touch) | `Selected` · `Tinted` |
| the visionOS kit | — | **`Hover` (gaze)** | — |
| **the macOS kit** | **`Clicked`** (broken out Up/Down · Field/Button) | yes + **`Hover + Key`** | `Focused` · `Selected=None` · the **`Active Window`** axis · `Selected Inactive` |

State names differ by platform even inside one company (Apple) (`platforms.md`).

### Density

| Name | Systems | Meaning |
|------|---------|---------|
| desktop / mobile **sets** | Spectrum | two sets of values, one per platform |
| `space-scaled-m` / `space-static-m` | Cloudscape | two families, one varying with density mode and one fixed |
| runtime scaling (`--mantine-scale` and kin) | Mantine · Radix · shadcn/ui · Vapor · Ring UI · Stacks · Clarity (two, one per axis) | scale everything by multiplying a root variable |
| two type scales | Serendie (expanded/compact) · Mística (desktop/mobile pairs) | two copies of the size scale itself |
| a CSS file per viewport | Spindle (desktop/tablet/mobile, three sets) | same token names, different values |

### Units

| Unit | Where | Note |
|------|-------|------|
| `px` | most web systems | |
| `rem` | Bootstrap · SGDS · Canvas · Codex and others | proportional to the user's font setting. Assumes 1rem = 16px |
| `pt` | the Apple kits | measured as 1pt = 1px in Figma |
| `dp` / `sp` | Android (Automotive 64dp · 24sp) | `sp` is dp scaled by the font setting |
| `em` | **Priceline breakpoints** | relative to the parent. Identical to rem at the root |
| **unitless** | Braid (grid multiples) · PIE (global values) | the consumer attaches the unit |

---

## 3. Same name, different meanings

| Term | Meaning A | Meaning B |
|------|-----------|-----------|
| **`size`** | the spacing scale (Ant `sizeMS`, Codex `size-100`) | component dimensions (Primer and many others) |
| **`base`** | the base multiplier (Backpack `SPACING_BASE`, Tailwind's base) | layer 0 (Chakra `zIndex.base: 0`) |
| **`static`** | spacing fixed regardless of density (Cloudscape `space-static`) | colour fixed regardless of mode (Seed's `static` family) |
| **`scale`** | the density set (Spectrum) | the type scale steps |
| **`elevation`** | shadow presets (Digital Agency `--elevation-1`–`8` = two stacked shadows) | the general layering concept (z-order) / **an opacity scale** (Serendie `elevation-opacity-scale` 0–1) — one word pointing at three things |
| **`Medium`** | macOS's **default (small)** size — two steps, Medium 24 / XL 36 | "the middle" size in most systems |
| **`key`** | Digital Agency's core brand colour family (13) | a different tier from the usual "key colour" — a separate tier between raw and semantic |
| **`modal`** | a dialog (nearly every sample) | **a mode of transport** — WMN's colour classification axis, `colors.modal` = bus · metro · railway … (`systems/wmn.md`) |

### Name–value inversions (where trusting the name is wrong)

- **Semi**: `extra-small` (3px) > `small` (2px) — the radius name ordering is inverted
- **SGDS**: the `lg` radius is smaller than the default
- Both have their actual values in their entries (`systems/semi.md` · `systems/sgds.md`)

### Colour ramp step numbers — three kinds of scale (2026-08-17)

The same "blue.40" means different things by system:

| Scheme | Sample | What `40` means |
|--------|--------|-----------------|
| uniform steps | most (100–900 and so on) | "about the fourth" — an ordinal |
| **measured lightness** | **Italia** | in the 40% lightness range — the step numbers differ per ramp |
| a designated base tone | Persona (base = 40), Tailwind (base = 500) | which step is the brand's base colour varies by convention |

How ramps are extended splits too — inserting intermediate numbers (most) vs **inserting a
name** (Persona's `milk`, a floor step lighter than 0) vs a suffix (the `-tint` family).

### A variable tier meant for consumer overrides — one structure under four names (2026-08-17)

Separate from a component's internal tokens, four systems were confirmed to keep **a tier of
variables left empty for consumers to override**. All are `var(hook, var(internal token,
fallback))` chains:

| System | Prefix | Distinctive |
|--------|--------|-------------|
| Lightning | `--slds-c-*` → `--sds-c-*` | falls back across the new and old namespaces too (three levels) |
| Spectrum | `--mod-*` | states "modifier" in the prefix |
| Cloudscape | `--awsui-style-*` | for runtime theme injection |
| Polaris | `--pc-*` | combined with a state fallback chain (`_pressed` → `_active`) |

The same invention exists under four names — read them as one concept when comparing
documents.

### Cultural signatures embedded in values

- **NYSDS**: the pill radius is not `9999px` but **`1776px`** — the `$description` reads
  "Ever upward!" (the New York State motto). The function is the same; the value is state
  identity.
- Samples of over-large pill values: `9999px` · `999px` (Mística bar) · `1000px` (Mantine
  switch) · `calc(infinity*1px)` (Welcome UI) · `1776px` (NYSDS) — **five notations.**

### When porting rem — the base may not be 16px

The assumption differs by system, and **copying only the values throws you off by exactly
that much.**

| System | Root assumption | Symptom |
|--------|:---:|---------|
| **Strapi** | **10px** (62.5%) | `1.4rem` means 14px but is 22.4px on a 16px root |
| **Stacks** | **13px** | `1.46153846rem`, a repeating decimal = 19/13 |
| **Odyssey** (Okta) | **14px** | `0.28571429rem` (2/7) means 4px, and is 4.57px at 16px |
| **Vitamin** (Decathlon) | **both** | `index.css` (16px) / `index-base10.css` (10px), **two builds** |

The same phenomenon shows up **in em too** (2026-08-17): Garden's button horizontal padding
`1.07143em` (= 15/14), the old Atlassian button height `2.28571em` (= 32/14) — **the
intended px divided by the font size, as a repeating decimal**, frozen into the output.
When you see a repeating decimal, read it as "the intent was px".

**Vitamin is the corpus's only structural fix** — it emits separate rem values, one per root
assumption, that produce the same px result. Everything else ships a single set, so porting
requires a check.

### Measure (line length / paragraph width)

The maximum width of a line of body text. Three samples handle it in three different ways —
**Charcoal** with nine fixed tokens (`paragraph-width` 320–924px, including three
densities), **Grommet** with a formula (`font size × 24` ≈ 50 characters, with a link to the
rationale in the source comments), and **USWDS** with measure in `ex` units. No other sample
has it.

### The three kinds of "no spacing" (`platforms.md`)

| Kind | Systems | Meaning |
|------|---------|---------|
| does not define them | Apple HIG · Material 3 · Seed · Evergreen | spacing sits directly on components |
| inherits them | shadcn/ui | uses Tailwind's `--spacing` without redefining it |
| does not enumerate them | Tailwind | one base plus `calc()` generation |

One sentence, "it has no tokens", can point at three different designs, so they are kept
apart.

---

## Requests

If a term you needed is missing, add an entry here — the bar is "a phrase that stops you
while reading a corpus document".
