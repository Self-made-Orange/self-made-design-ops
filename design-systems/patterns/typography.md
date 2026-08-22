<!-- lang-links -->
> **English** · [한국어](typography.ko.md)
<!-- /lang-links -->

# Typography

**This covers only those of the 34 samples whose type scale was confirmed.**
The values are those confirmed in tokens; usage guidance (which style to use when) lives only
on the documentation sites.

**Type measurements down to the component layer are held for 68 systems** (re-synthesised
2026-08-18).
The individual values are in the "components in depth" section of each `systems/*.md`; this
document carries **only the distribution and the cross-system conclusions**.
The tables above were written from the initial sample (weighted towards the token layer), and
the re-verification against the 68 is in the "re-synthesis across 68 samples" section —
**where the two disagree, the re-synthesis takes precedence.**
In particular, **the token scale and the values actually used in controls disagree often**
(see the shadcn/ui section below).

## Default body size — it parts into six camps

| size | systems |
|:---:|--------|
| **24sp (a minimum)** | **Android Automotive** |
| **18px** | **Grommet** (derived as 24 × 0.75) |
| **17pt/px** | **Apple iOS** (Body) · **KRDS** (body.medium) · **the Digital Agency** (Japan, holding a scale) |
| 16px | Canvas · Paste · Material 3 (Body Large) · Codex · **Tailwind** · **Radix Themes** · **Mantine** · **Charcoal** (pixiv) · **Serendie** (expanded) · SmartHR (M) |
| **14px** | **Ant Design · Material 3 (Body Medium) · Helios · Evergreen · Seed (100) · Atlassian · shadcn/ui · Ring UI · Siemens iX (ms-0) · Serendie (compact) · Vibes (freee, used ×27) · Naive UI · PrimeVue** · **Primer** (`base.text.size.sm`) · **Cloudscape** (`body-m`) · **Carbon** (`body-short-01`) · **Spectrum** (`font-size-100`, desktop) |
| **13px** | Helios (`body-100`) · **Stacks** (`--fs-base`, unique in the sample as a default) · **Polaris** (`text-body-md`) |

**16px is a web convention, not a universal.** The two ends of the axis have spread to 13
(Stacks) and 18 (Grommet).

**→ Extended (2026-08-18, the token paths of the five large `full` systems resolved).**
Spectrum, Primer, Cloudscape and Carbon are **all 14px** and only Polaris is 13px —
**the enterprise dense-tool camp's convergence on 14px is confirmed in the large systems
too.**
Polaris joined the 13px camp, previously Stacks alone, making two samples.

**Spectrum's body default is two values** — `font-size-100` is
**14px** on the desktop and **17px** on mobile. It is the only sample that will not fit in a
single cell of this table, holding **both** Apple's and KRDS's 17 and the dense tools' 14
**in one token.**

- **Automotive is overwhelmingly the largest.** Android Automotive's **minimum** of 24sp is
  larger than any other system's **maximum** body. It corresponds to `Headline Small` (24px)
  in Material 3
- **Three systems at 17** — Apple (Body 17pt) · KRDS (body.medium 17px) ·
  Japan's Digital Agency (a scale exists, its purpose unsettled). **All three are CJK
  contexts.**
  KRDS's whole body scale is odd (13/15/17/19). No source gives a rationale
- **Two weights (400/700) covers all four CJK samples** — KRDS · the Digital Agency ·
  **Charcoal (pixiv) · Serendie (Mitsubishi Electric)**. It has widened from 2/2 government
  to 4/4 government plus private.
  **It is not "CJK-only", though** — Pharos (JSTOR, USA) also has only 400 and 700.
  That there is no exception in CJK and that it appears outside CJK both hold.
  The opposite extreme from the nine weights in hundreds (Tailwind, Chakra)
- **All three Greater China samples have a 14px body** — Ant (a seed of 14) · Semi (14px in
  actual use, 92 times) · Naive UI (fontSize 14).
  Japan parts — Serendie keeps both compact 14 and expanded 16, and Charcoal is 16.
  **The rest of the 14px camp is dense enterprise tooling**
  (Ring UI · Siemens iX · Atlassian · Helios):
  **Greater China 14 · Korea (government) 17 · Japan 14 and 16 in parallel · Western web 16
  and 14 · dense tools 13 and 14**
- **The 14px camp is the largest.** Thirteen systems are here.
  With two Japanese working tools (Serendie compact, Vibes) standing on the same 14 as
  Greater China, the assertion "Japan is 17" no longer holds — the Digital Agency's 17 is
  one value of a government scale

Material 3 keeps both `Body Large` (16) and `Body Medium` (14) and defers the choice.

### When the token default and the component's actual value differ

**shadcn/ui is such a case.** The Tailwind token default is `text-base` (16px), while the
components all use `text-sm` (14px).

| component | size |
|----------|:---:|
| Button (every variant except `xs`) | 14 (`text-sm`) |
| Select trigger and items | 14 |
| the whole Table | 14 |
| Dialog description | 14 |
| Badge · Button `xs` · Select label | 12 (`text-xs`) |
| **Input** | **16 → 14 from `md` up** |

**Only the Input parts by viewport** (`text-base md:text-sm`).
It relates to iOS Safari zooming automatically on input fields below 16px, but
**the source does not record the reason.**

**"The token default" and "what is actually on screen" have to be told apart.**
Reading the Tailwind documentation alone it looks like a 16px system, and a screen built
with shadcn/ui is 14px.

### Atlassian drives the default into the token name

```
font.body.[default] = 14px/20px
font.body.large     = 16px/24px
font.body.small     = 12px/16px
```

**`[default]` is in the name.** Against Material 3 placing `Body Large` and `Body Medium`
side by side and deferring the choice, the token states which is the default.

## Tracking — the direction is opposite between systems

### Sign patterns

| system | large text | middle | small text | pattern |
|--------|:---:|:---:|:---:|------|
| **Apple iOS** | +0.40 | -0.45 | +0.06 | **a U** |
| **Material 3** | -0.25 | 0 | +0.50 | **monotonically increasing** |
| **visionOS** | 0 | 0 | 0 | **all zero** |
| Backpack | -0.05em | — | -0.02em | negative only |
| Seed Design | — | -0.04em | -0.02em | negative only |
| **Evergreen** | -0.2px | 0 | **+0.6px** | both negative and positive |
| Pajamas | -0.01em (h1–h2) | inherit | inherit | large text only |

**Apple and Material 3 are head-on opposites.** On large text Apple opens it up (+0.40) and
Material tightens it (-0.25). They meet in the positive only on small text, where
**Material's (+0.50) is eight times Apple's (+0.06).**

**Unifying tracking on a single value across platforms puts both out.**
There is no way other than splitting by platform.

### A third curve — Radix Themes

| step | size | tracking |
|:---:|:---:|:---:|
| 1 | 12 | **+0.0025em** |
| 2 · 3 | 14 · 16 | 0 |
| 4 | 18 | -0.0025em |
| 5 | 20 | -0.005em |
| 6 | 24 | -0.00625em |
| 7 | 28 | -0.0075em |
| 8 | 35 | -0.01em |
| 9 | 60 | **-0.025em** |

**It decreases monotonically as the size grows.** The same direction as Material 3 (growing
positive as it shrinks), except that Material's values part by role while Radix Themes'
**are decided by size alone.**

There are now three kinds of curve.

| pattern | systems |
|------|--------|
| **a U** | Apple iOS |
| **monotonically increasing** (more positive as it shrinks) | Material 3 · **Radix Themes** |
| negative only | Backpack · Seed Design · Pajamas |
| all zero | visionOS |
| **independent of size** | **Tailwind** (six independent utilities) |
| **no token** | **Atlassian · Mantine · Primer · Spectrum** (one global `letter-spacing: 0em`, with 0.06em on the `detail` role alone) |

**Tailwind separates tracking from size** — `tracking-tight` (-0.025em) can be attached at
any size. Tracking is not built into the scale, so **it does not follow when the size
changes.**

**Atlassian and Mantine have no tracking token at all.** They use the typeface's default.
**Primer has none either, and Spectrum keeps a single global `0em`** (2026-08-18) —
Spectrum gives `0.06em` to the `detail` role alone.

### The tracking direction of the five large systems (2026-08-18)

| system | direction | values |
|--------|------|------|
| **Cloudscape** | **size ↑ → more negative** | `heading-xs` `normal` → `-0.005` → `-0.010` → `-0.015` → `-0.02` → `display` **-0.03em**. No tracking token on the body |
| **Polaris** | the same direction, **in px** | negative only from 20px up: `-0.2` → `-0.3` → **-0.54px**. Zero below that |
| **Carbon** | **the reverse — looser as it shrinks** | 12px `0.32px` → 14px `0.16px` → 0 from 16px up |
| Primer · Spectrum | no token / fixed at 0 | — |

**Only Carbon runs the other way.** It is in the "more positive as it shrinks" camp with
Material 3 and Radix Themes, while Cloudscape and Polaris are in the "more negative as it
grows" camp.
**The two are not exclusive** — Material 3 joins both directions into a U, while Carbon
stops at 0 and Cloudscape starts from `normal`.
**`em` vs `px` parts too** — Cloudscape uses `em` (proportional to the size) and Polaris and
Carbon `px` (an absolute amount independent of size).

### Weight and tracking tied together — M3's Emphasized (androidx, 2026-08-17)

The M3 type scale has an **Emphasized pair** for all 15 roles, and the rule is consistent:
**one step up in weight (Regular→Medium) plus tighter tracking** (BodyLarge 0.5→0.15sp).
The "tighten when it goes bold" correction (-0.01em) Radix Themes made on a single active
tab is raised here into **a system rule across the whole type scale** — two systems sharing
the recognition that a weight change alters the visual width
(cross-referenced with the tabs section of `patterns/navigation.md`).

### px tracking — two samples added in 2026-08

Persona (Privy) uses `±0.2–0.8px` and Italia `-1 to -2px` — **fixed px rather than em**
tracking (three samples with Evergreen). Since px tracking does not grow with the type size,
it is a choice that holds only for large headings (Italia's compression) or where the size is
fixed (Persona's buttons).

### The unit parts too

| unit | systems |
|------|--------|
| px (fractional) | Apple · Material 3 |
| **px (fixed)** | **Evergreen** |
| em | Backpack · Seed Design · Pajamas · **Tailwind** · **Radix Themes** |

**Only Evergreen is fixed px.** The tracking does not scale as the type grows.
The three using `em` do.

### When it is decided by role rather than size

**Only Material 3 does this.** The same size differs by family.

| size | Title | Body | Label |
|:---:|:---:|:---:|:---:|
| 16 | +0.15 | +0.50 | — |
| 14 | +0.10 | +0.25 | +0.10 |
| 12 | — | +0.40 | +0.50 |

In Apple, the same size means the same tracking — Headline and Body are both 17pt / -0.43.

### Systems with a `wide` (positive) value

Evergreen (`+0.6px`) · Radix Themes (`+0.0025em`, at 12px only) ·
**Tailwind** (`wide` +0.025 / `wider` +0.05 / `widest` +0.1em).
Backpack and Seed Design keep only three `narrow` steps.

**Only Tailwind is symmetric around 0 in three steps each way** — two negative
(`tighter`, `tight`) plus 0 plus three positive (`wide`, `wider`, `widest`).

## How the scale is defined — five ways

| method | systems | contents |
|------|--------|------|
| a list of values | most | specified per step |
| **a recursive function** | **Carbon** | a formula whose increment grows every four steps |
| **a fluid `clamp()`** | **Pajamas** | varying with the viewport, plus a `-fixed` pair |
| **an unnamed array** | **Evergreen** | `fontSizes[0]`, `[1]` — accessed by index |
| derived from a seed | Ant Design | derived from the `fontSize: 14` seed |
| **a runtime factor** | **Mantine · Radix Themes** | `calc(1rem * var(--scale))` |
| **a CSS shorthand string** | **Atlassian** | `"normal 653 24px/28px …"` as one value |
| **two platform `sets`** | **Spectrum** (2026-08-18) | all 18 steps as `{desktop, mobile}` |
| **sharing the spacing map** | **Polaris** (2026-08-18) | `font-size-350` = `space-350` = `size[350]` = 14px |
| **no size scale — roles only** | **Cloudscape** (2026-08-18) | `body-m` and `heading-l` are themselves the tokens. There is no numbered scale |
| **shorthand plus individual properties** | **Primer** (2026-08-18) | the `*-shorthand` is a `var()` composition, so **both are usable** |

### Shorthand tokens — Atlassian and Primer part (2026-08-18)

Both keep the CSS `font` shorthand as a token, and they are opposites on decomposability.

| | value | individual properties |
|---|------|:---:|
| **Atlassian** | a literal string, `"normal 653 24px/28px \"Atlassian Sans\""` | **not possible** |
| **Primer** | `var(--text-body-weight) var(--text-body-size-medium) / var(--text-body-lineHeight-medium) var(--fontStack-sansSerif)` | **possible** — every referenced token is public |

Primer keeps a `*-shorthand` for all 11 roles while exposing the size, weight and line-height
tokens alongside. **The shorthand is a convenience and the individual properties are the
contract.**
The same camp as Material 3's variable-reference composition (`static/*` → `M3/*`), and only
Atlassian is in the undecomposable camp (see the "composite tokens" section below).

### Spectrum — it applies its two platform sets to typography too (2026-08-18)

It uses the spacing's `sets: {desktop, mobile}` structure across **all 18 size steps and all
18 line-height steps.**

| | desktop | mobile |
|---|:---:|:---:|
| `font-size-25` (the minimum) | 10px | 12px |
| `font-size-100` (the body) | 14px | **17px** |
| `font-size-1500` (the maximum) | 73px | 88px |

The mobile values are about 1.2× the desktop's. **There is no factor constant in the source,
only the enumerated values** — unlike Spectrum's component height scale, which is exactly
×1.25.

**It is a different approach from fluid typography (`clamp()`)** — not continuous
interpolation against the viewport but **two sets of token values from which the platform
picks.** It belongs to none of the four fluid methods catalogued earlier (`clamp()` ·
`calc()` linear interpolation · a responsive root · breakpoint functions) and is **a
fifth.**

### Atlassian — size, weight, line height and family in one token

```
font.heading.large = "normal 653 24px/28px \"Atlassian Sans\", …"
                      style weight size/line-height family
```

**The CSS `font` shorthand syntax as-is.** There are no individual property tokens, so
**the size cannot be used on its own.**

| advantage | cost |
|------|------|
| one token settles the whole typography | size and line height cannot be used separately |
| applied in a single CSS `font:` line | the individual values require parsing |

Material 3 keeps composite tokens too, but **exposes both the individual property tokens and
the composite ones.** Atlassian has only the composite.

### The runtime factor — always state that the values assume a factor of 1

```css
--mantine-font-size-md: calc(1rem * var(--mantine-scale));
--font-size-3: calc(16px * var(--scaling));    /* Radix Themes */
```

Radix Themes exposes `--scaling` as `90% · 95% · 100% · 105% · 110%`.
**The same `--font-size-3` moves between 14.4px and 17.6px.**

Every Mantine and Radix Themes value in this document is **at a factor of 100%.**

### Carbon — defined as a function

```scss
@function get-type-size($step) {
  @if $step == 1 { @return 12px; }
  @return get-type-size($step - 1) + (math.floor(($step - 2) * 0.25) + 1) * 2;
}
```

Twenty-three steps: `12·14·16·18·20·24·28·32·36·42·48·54·60·68·76·84·92·102·112·122·132·144·156`

**No arbitrary judgement enters when the scale is extended.** A source comment does limit
official support to 12–92px.

### Pajamas — fluid/fixed pairs

```
heading.scale.500         clamp(1.125rem, 0.9028rem + 0.463vw, 1.25rem)   18→20px
heading.scale.500-fixed   1.125rem                                        18px
```

**Only h1–h3 are fluid; h4–h6 are fixed.** The fluid/fixed choice is made at the token layer.

## Step count and density

| system | steps | in the 10–16px band |
|--------|:---:|:---:|
| **TDS (Toss)** | **32 (fixed) + 20 (roles)** | 6 (all of 11–16) — **a continuous 1px from 11 to 42px** |
| **Seed Design** | 18 | **7** (10 · 11 · 12 · 13 · 14 · 15 · 16) |
| Material 3 | 15 | 4 |
| Apple iOS | 11 | 4 |
| Paste | 11 | 4 |
| Evergreen | 8 | 3 |
| Protocol (headings) | 8 | 1 |
| Carbon | 23 (17 supported) | 3 |
| **Tailwind** | **13** | 3 (12 · 14 · 16) |
| **Radix Themes** | **9** | 3 (12 · 14 · 16) |
| **Atlassian** | 10 (3 body + 7 heading) | 3 (12 · 14 · 16) |
| **Mantine** | 5 (+ 6 heading) | 3 (12 · 14 · 16) |

**TDS took over the density maximum by filling 11–42px with 32 continuous 1px steps.**
With Seed Design (10–16 in 1px), **the first and second places in the 1px camp are both
Korean systems** — adding KRDS's odd-numbered body (13/15/17/19), all three Korean samples
show a 1px or odd-number sensitivity. No source gives a rationale.

**All four frameworks have exactly three steps in the 10–16px band, `12 · 14 · 16`.**
None keeps 11, 13 or 15px — without exception.

**Tailwind has the most steps at 13, but its top end is spread** —
from `5xl` (48) up it runs 48 · 60 · 72 · 96 · 128px, five steps.
The body band (12–20px) has only five, `xs · sm · base · lg · xl`.

**Radix Themes' eighth step is 35px** — after 12 · 14 · 16 · 18 · 20 · 24 · 28 comes
neither 32 nor 36. It is the only odd body size above 20px in the sample.

## Line height

### Systems offering variants — Apple alone

| | Large Title | Body | Caption 2 |
|---|:---:|:---:|:---:|
| Tight | 39 | — | — |
| default | 41 | 22 | 13 |
| Loose | 43 | 24 | 15 |

**Loose is the default +2px across all 11 styles, without exception.**

### Line-height ratios

| system | method |
|--------|------|
| Apple iOS | fixed px per size (34→41, 17→22, 11→13) |
| Material 3 | fixed px per size (57→64, 14→20, 11→16) |
| **Atlassian** | fixed px per size, **all multiples of 4** (32→36, 14→20, 12→16) |
| **Radix Themes** | fixed px per size, **two sets, body and heading** |
| Evergreen | **a separate array**, `[16,18,20,24,28,32,40]` |
| Pajamas | **a ratio**, `1.25` (every heading) · `1.125` (scale.800) |
| **Mantine** | **a ratio, differing by size** (1.4 → 1.65) |
| **Tailwind** | **written as a ratio, but originally px** (`calc(1.25 / 0.875)`) |
| Codex · Seed | a separate `static/line-height` family |

**Only Pajamas unifies on a ratio (1.25).** The rest use fixed px per size.

Evergreen's size array and line-height array are **separate**, so the implementation decides
the pairing.

### The direction of the line-height ratio parts

| system | small text | large text | direction |
|--------|:---:|:---:|------|
| Apple iOS | Caption 2 11→13 = **1.18** | Large Title 34→41 = **1.21** | almost flat |
| Atlassian | body.small 12→16 = **1.333** | heading.xxlarge 32→36 = **1.125** | **decreasing** |
| Radix Themes | step 1 12→16 = **1.333** | step 9 60→60 = **1.0** | **decreasing** |
| **Mantine** | `xs` 12 → **1.4** | `xl` 20 → **1.65** | **increasing** |
| Tailwind | `xs` 12→16 = **1.333** | `5xl` and up = **1.0** | **decreasing** |

**Only Mantine runs the other way.** The line-height ratio grows on large text.
Its headings (`h1`–`h6`) go 1.3 → 1.5 as well, so smaller headings are looser — the same
direction as its body.

**All the rest decrease.** Large text has ample absolute spacing even at a small ratio.

### Atlassian — the line height is always a multiple of 4

| size | line height | ratio |
|:---:|:---:|:---:|
| 12 | 16 | 1.333 |
| 14 | 20 | 1.429 |
| 16 | 20 | 1.25 |
| 20 | 24 | 1.2 |
| 24 | 28 | 1.167 |
| 28 | 32 | 1.143 |
| 32 | 36 | 1.125 |

**The ratio wanders from 1.125 to 1.429 while the absolute value is a multiple of 4 without
exception.** Instead of matching the ratio it matches a 4px grid.

**14px and 16px share a 20px line height** — the ratios part widely, 1.429 and 1.25.

### Radix Themes — body and heading line heights are separate families

| step | body | heading | difference |
|:---:|:---:|:---:|:---:|
| 1 | 16 | 16 | 0 |
| 2 | 20 | **18** | -2 |
| 3 | 24 | **22** | -2 |
| 4 | 26 | **24** | -2 |
| 5 | 28 | **26** | -2 |
| 6–9 | 30 · 36 · 40 · 60 | the same | 0 |

**Only at the small steps (2–5) is the heading line height 2px tighter.** From step 6 (24px)
up they are identical.
Radix Themes is the only system in the sample to keep body and heading line heights as
separate token families.

## Emphasis

| system | method |
|--------|------|
| **Material 3** | a `Weight-emphasized` pair on every style (Regular→Medium, Medium→SemiBold) |
| **Apple iOS** | Regular / Emphasized / Italic / Emphasized Italic as **separate styles** (102 in all) |
| Apple (Headline vs Body) | identical size, line height and tracking; **only the weight** differs (**590** vs 400) |
| visionOS | the default is **Bold (700)** |
| Pajamas | every heading at `fontWeight: 600` |

**Material has a rule of raising the weight one step**, while **Apple keeps a separate style
per combination.**

### The weight ceiling — some systems stop at 600 (2026-08-18)

| system | weight tokens | ceiling |
|--------|------|:---:|
| **Primer** | light 300 · normal 400 · medium 500 · semibold 600 | **600** |
| **Carbon** | light 300 · regular 400 · semibold 600 | **600** |
| **Cloudscape** | lighter 300 · normal 400 · bold/heavy 700 | 700 |
| **Polaris** | regular **450** · medium **550** · semibold **650** · bold 700 | 700 |
| **Spectrum** | light · regular · medium · bold · extra-bold · black (**names**) | — |
| Tailwind · Chakra | nine steps, 100–900 | 900 |

- **Primer and Carbon have no 700 (bold).** Their weight axis is four or three steps from 300
  to 600. The opposite extreme from Tailwind's and Chakra's nine, and different again from
  the CJK samples' two steps of 400/700 (holding **the middle** rather than the ends).
- **Polaris's values are not multiples of 100** — 450 · 550 · 650. Intermediate instances of
  the Inter variable typeface, of the same family as Apple's 590 and Atlassian's 653.
  **Polaris is the only one to use variable-typeface intermediates at all four steps.**
- **Spectrum's weight values are names rather than numbers** (`extra-bold` · `black`).
  It uses the instance names of the `Adobe Clean Spectrum VF` variable typeface as the values,
  and the numeric mapping is not in the token file. **The only sample to keep weight as a
  non-numeric token.**
- **Cloudscape's heading weight is a single 700 throughout** — only the size differs. The
  exception is `display-xl` (64px), which returns to 400.

## Family separation

| system | families |
|--------|------|
| Material 3 | Display · Headline · Title · Body · Label (five families × L/M/S) |
| **Helios** | Display · Body · **Code** — Body and Code share sizes (13/14/16) |
| **Evergreen** | **separate Display / UI / Mono typefaces** |
| Paste | a body scale plus **a separate display** (32/48/64) |
| Protocol | **a separate scale for headings alone** (16→64, an even 8px step) |
| Carbon | IBM Plex Sans / Serif / Mono |
| **Atlassian** | heading · body · code · **metric** + **a separate brand typeface (Charlie)** |
| **Mantine** | five body steps plus separate `h1`–`h6` headings |
| **Radix Themes** | body and heading share sizes, with **separate line heights only** |
| **shadcn/ui** | `--font-sans` · `--font-heading` · `--font-mono` + **`--font-ar` · `--font-he`** |

### Atlassian — there is a separate `metric` family

| token | size/line height | the heading of the same value |
|------|:---:|------|
| `font.metric.large` | 28/32 | `heading.xlarge` |
| `font.metric.medium` | 24/28 | `heading.large` |
| `font.metric.small` | 16/20 | `heading.small` |

**The values are exactly those of the headings, and the names are separated.**
A family for numeric metrics (the large figures on a dashboard), leaving room to diverge from
the headings later.
The same pattern as Atlassian's `border.width.selected`/`focused` holding the same value in
separate tokens.

### Systems that separate a brand typeface — two

| system | product UI | brand |
|--------|---------|--------|
| **Atlassian** | Atlassian Sans | **Charlie Display / Charlie Text** |
| Evergreen | SF UI Text | SF UI Display |

**In Atlassian the typeface itself differs** (Atlassian Sans ↔ Charlie).
Evergreen only parts Display from Text within the same SF family.

### Per-language typefaces — shadcn/ui alone

```css
[data-lang="ar"] { font-family: var(--font-ar); }
[data-lang="he"] { font-family: var(--font-he); }
```

**It keeps separate typeface slots for Arabic and Hebrew.**
shadcn/ui is the only system in the sample to put a per-language typeface switch at the token
layer.
→ **Corrected (2026-08-18): LINE makes language a first-class axis of its token names
(EN/JP/TC/TH) and carries per-language typeface mappings alongside the scale.** See the
"language axis" section of "re-synthesis across 68 samples" below.

It bears directly on the RTL item of `i18n/README.md` —
the only case of acknowledging in the token structure that **RTL is not merely a question of
flipping direction but one of changing the typeface too.**

There are **no** CJK (Korean, Japanese, Chinese) typeface slots.
→ **Corrected (2026-08-18): Charcoal designates a CJK-specific typeface (Sarasa UI J) as its
system typeface, and LINE carries per-language typeface mappings (JP Hiragino · ZH PingFang ·
TH Thonburi · KO Apple SD Gothic Neo) alongside the scale. Vibe and Vibes handle it at the
typeface-stack layer.**

**In Helios the body and code use the same sizes** — meaning that in an infrastructure
product a code block carries the same weight as body text.

**Evergreen separates its Display and UI typefaces** — different faces for headings and for
the interface.

## Typefaces

| system | typeface |
|--------|------|
| Apple iOS · visionOS | SF Pro |
| Material 3 | Roboto |
| Carbon | IBM Plex (Sans/Serif/Mono) |
| Evergreen | SF UI Display / SF UI Text / SF Mono → the system stack |

## Composite tokens

**Only Pajamas puts margins and colour into its type tokens.**

```js
heading.1 = {
  fontWeight: 600, fontSize: 'clamp(…)', lineHeight: 1.25,
  letterSpacing: '-0.01em',
  marginTop: '0px', marginBottom: '1rem',   // ← margin
  color: '#18171d',                          // ← colour
}
```

It has separate spacing tokens and still puts the heading margins on the typography side.

Material 3 keeps composite tokens too, but **its structure is two-layered.**

```
M3/headline/large = Font(
  family:        "Static/Headline Large/Font",     ← a variable reference
  style:         Static/Headline Large/Weight,     ← a variable reference
  size:          Static/Headline Large/Size,       ← a variable reference
  lineHeight:    Static/Headline Large/Line Height,
  letterSpacing: Static/Headline Large/Tracking,
)
```

**Every sub-property is a variable reference rather than a literal.**
The order is the `static/*` variable layer → the `M3/*` style layer.

Atlassian, conversely, drives the values into a string
(`"normal 653 24px/28px \"Atlassian Sans\""`) — **the individual properties cannot be used
separately.**

| system | composition method | access to individual properties |
|--------|-----------|:---:|
| **Material 3** | a variable-reference composition (`static/*` → `M3/*`) | **possible** |
| **Atlassian** | a literal string | **not possible** |
| Pajamas | an object (including margins and colour) | possible |

Material 3 does not include margins or colour in its type tokens (unlike Pajamas).

### Material 3 uses a variable-font axis

```
fontVariationSettings: '"wdth" 100'
```

It sets Roboto's **width (wdth) axis** to 100.
Material 3 is the only system in the sample where `font-variation-settings` is confirmed.

Unlike other systems, which use weight (`wght`) alone, **it has two axes** —
a different layer from Apple (590) and Atlassian (653) using an intermediate value of the
weight axis.

The colour role variables are namespaced under `schemes/*` and the typography under
`static/*` (`schemes/on-surface` · `schemes/outline-variant` · `static/headline-large/size`).

## Re-synthesis across 68 samples — component measurements (2026-08-18)

The `partial` deep pass raised the type measurements to 68 systems, and this document's
conclusions were re-verified against that sample.
It looks not at the type scale but at **what that scale actually becomes in a control.**

### Control type weight — 500 is the majority, with 400 and 800 at the extremes

```
400   Astro · Bootstrap · Naive UI · Nord (500 on large only) · Porsche · Serendie ·
      SGDS · Stacks · Tegel · Vibe                                          (10)
450   EUI · Auro                                                             (2)
500   Base Web · Canvas · Cedar · Chakra · DSFR · Forma 36 · HSDS ·
      Intergalactic · MUI · Orbit · Pluralsight · Shoelace (`semibold` = 500) ·
      Vuetify …                                                            (the majority)
600   Asphalt · Bolt · Braid · Clarity · Italia · NYSDS · Park UI · Paste ·
      Semi · Welcome UI                                                     (10)
700   Backpack · Charcoal · Codex · the Digital Agency · Gestalt · NASA WDS · Pharos ·
      Priceline · Protocol · Seed (brandSolid) · Siemens iX · SmartHR ·
      Thumbprint · Vitamin · WMN · eBay (the primary variant only)          (16)
800   PIE · Unify                                                            (2)
```

**`button.md` recorded the 700 camp at nine; across the 68 samples it has grown to 16**
(corrected 2026-08-18). **A bold button is not a minority.**

**The 400 camp keeps "no bold on a control" as an explicit choice** —
Astro keeps control-specific type tokens (`font-control-*`) and still leaves the weight at
400 (what parts is line height, not weight), Naive UI does not even use `strong` (500), and
**Stacks inverts the sample majority's weight hierarchy with a 400 button and a 700 label.**

**Two systems split the weight between buttons and inputs** —
**Paste** (buttons 600 / inputs 500) · **Grommet** (input values at semibold 600, where most
sit at 400).
**SmartHR gives its tertiary button alone a normal weight plus the link colour**, expressing
the judgement "a tertiary button is a link" through weight.

**All four CJK samples (KRDS · the Digital Agency · Charcoal · Serendie) have two weights
(400/700), and of them only Serendie assigns the button to the regular side** —
SmartHR, Vibes, Charcoal and Spindle are all bold.
**In a two-weight system, which side the button stands on becomes the system's impression.**

### Control type size — there are camps both smaller and larger than the body

| relationship | systems |
|------|--------|
| **control < body** | **Bolt** (a 12.8px default button against a 16 body) · **Evergreen** (12px up to the medium button against a 14 body — only large is 14) · **Charcoal** (14px against a 16 body) · **Clarity** (12px against 13) · **Serendie** (an expanded label of 13px against a 16 body) · **Shoelace** (buttons 12/14/16, **one step below** inputs at 14/16/20) · Vapor (input sm alone at 12px) · HSDS (11–14) |
| **control = body + bold** | **Backpack** 16/700 · **Codex** 1rem/700 · **Gestalt** 16 bold · **Pharos** 16/700 · **Thumbprint** 16/700 · **Braid** 16/600 · **the Digital Agency** 16/700 · **Siemens iX** 14/700 · NASA WDS 17/700 · **Grommet** (no button-specific type; the body scale's 18px as-is) |
| **control > body** | **PIE** 20px/800 · **Origami** (inputs 18px against a 16 body — "a newspaper-typesetting sensibility") · **Orbit** (inputs 16px against a 15 body) · **KRDS** (an xlarge input at 19px plus the heading typeface plus bold = the main search field) |

`button.md`'s observation that **the former is dense working UI and the latter consumer and
marketing** holds across the 68 samples. **Two motives are mixed on the larger side**,
though — PIE's is brand expression, while **Orbit's and Origami's is iOS Safari's 16px
auto-zoom threshold.**

**A camp that separates the size steps from the type steps** is confirmed too — **Vapor**'s
sm, md and lg all use the same 14px with only xl rising to 16, and **Vibe** has four of five
steps at 14px. Conversely **Kontur changes the type proportionally across its three size
steps** (14/16/18) — three density steps are three type steps.

### The line height decides the control height — three techniques

In systems that do not declare a height, the line height is not a typographic value but
**a layout value.**

| technique | systems |
|------|--------|
| **back-computing the line height from the height** | **Shoelace** (`calc(height − a 2px border)`) · **Vibes** (`calc(height − 2px)`) · Garden · **MUI** (a unitless line height of 1.75 → 13 × 1.75 = a fractional height of 22.75px) |
| **killing the line height to 1 and using padding alone** | **Asphalt** (the body is the golden ratio 1.618 while **the button alone is forced to 1**) · **Origami** (`line-height = font-size`, discarding the tuple scale's 16 and 20px line heights on the button) · the Digital Agency (`oln-16B-100` = a line height of 1) |
| **the body line height governing the height directly** | **SGDS** (a body line height of **2.0** — the sample maximum. Buttons, inputs and body share the same Bootstrap variables, so **deciding the reading line height is deciding the control height**) · Bootstrap 1.5 · Protocol 1.5 |

The conclusion on this axis is that **a fair number of systems change their button height
when the line height is adjusted.**
SGDS is the extreme, and its 2.0 line height even has the side effect of stretching the height
ladder into an arithmetic series.

**The basis for vertical centring parts** — mostly the line height, but
**Braid uses cap height**, setting its block padding as `(min-height − cap height)/2`, and
**Porsche's line height is itself `calc(6px + 2.125ex)`** — responding to the font's actual
x-height.
**An `ex`-derived line height is unique in the sample.**

### The camp that maps tracking onto the size axis

| method | systems |
|------|--------|
| **inversely proportional to size** (looser as it shrinks) | **Pluralsight** — 12px `+0.025em` / 14px `+0.025em` / 16px `+0.01em` / 18px `0`. Five tracking tokens mapped onto the button size axis |
| **proportional to size** (fractional positives) | **Vitamin** — 14px `+0.24px` / 16px `+0.27px` / 20px `+0.34px` |
| **a proportional calc** | **Pharos** — `calc(font-size × −0.02)` running through buttons, inputs and modal body alike |
| uppercase plus wide tracking | **Clarity** 12px `0.12em` uppercase · **MUI** `0.02857em` uppercase · Odyssey (dialog labels) · Pharos (labels) · LeafyGreen (12px uppercase) |
| a sub-pixel literal | **NYSDS** `0.044px` |
| a brand axis | **Tegel** — Scania Sans Semi Condensed (`−0.14px`) ↔ TRATON Type Text (`0`); the theme changes the tracking |

**Pluralsight's inverse and Vitamin's proportional are exact opposites.** The conclusion of
the "tracking — the direction is opposite between systems" section above (Apple's U, Material's
monotonic increase) **is reproduced in the same shape at the control layer** — the direction
of tracking has never been agreed.

### The language axis — rules are observed only in the CJK samples

- **The 14px body convention**: all three Greater China samples (Ant · Semi · Naive UI) and
  the Japanese working tools (Serendie compact · **Vibes**' form default of `0.875rem/1.5`),
  plus **Charcoal's 14px controls.** Only Korea (government) is on a 17px axis
- **CJK typesetting properties in the reset CSS**: **SmartHR** puts
  **`text-spacing-trim: space-all`** in its preflight base — avoiding Windows Yu Gothic's
  over-tightening of punctuation.
  The same system takes **its spacing unit from the character (1文字 = 16px)** and derives
  its body font on a harmonic series (6/7 = 13.71px), which makes **the button height a
  fractional 31.7px**
- **A language branch at the selector layer**: **Rakuten ReX** ships a
  **line-height branch in CSS**, `:lang(en)` 1.444 / `:lang(ja)` 1.333. **LINE** makes
  language a first-class axis of its token names (EN/JP/TC/TH)
- **Handled in the typeface stack**: **Vibes** **lists Japanese typeface names twice**
  (accommodating older browsers' and OSes' differing font-name resolution), and **Vibe**
  names Hebrew, Arabic and Japanese fonts explicitly in its default stack
- **Splitting the line height by role**: **Serendie** divides label 1.0 from body 1.6
- **The collision of CJK 14px with iOS 16px**: **Charcoal** renders at 16px, makes a visual
  14px with `transform: scale(0.875)` and back-corrects every dimension with
  `calc(… / 0.875)`.
  **The only solution satisfying both rules at once**; the rest give one up
  (cross-referenced with the "preventing iOS auto-zoom" section of `form.md`)

> **Correction.** "No system was confirmed to have a CJK or Arabic line-height rule" is
> **refuted** — Rakuten (`:lang()` line heights) · SmartHR (`text-spacing-trim` and
> character-unit spacing) · Serendie (line height by role) · Charcoal (a scale
> back-correction) · Vibes and Vibe (the typeface stack) each keep a rule at a different
> layer. **All of them are CJK samples, though** — no Arabic or RTL line-height rule has been
> confirmed beyond shadcn/ui's `--font-ar` and `--font-he` typeface slots.

#### Spectrum — it keeps a whole extra CJK scale (2026-08-18)

Where the six samples above keep a rule at **one layer** (typeface stack / line height /
reset CSS / a selector branch), Spectrum keeps **size, line height, weight and typeface all
on a separate axis.**
Every typographic role (`heading` · `title` · `body` · `detail` · `code`) has a `-cjk-` pair.

| | Latin | CJK |
|---|:---:|:---:|
| `body-size-m` | 16px | **14px** |
| `body-size-l` | 18px | 16px |
| `heading-size-l` | 28px | **25px** |
| `heading-size-xl` | 36px | 32px |
| `body-line-height` | 1.5 | **1.7** |
| `heading-line-height` | 1.3 | **1.5** |
| typeface | Adobe Clean Spectrum VF | **Adobe Clean Han** |

**The rule is consistent in two directions — the size comes down one step and the line height
goes up.**
The CJK sizes match the step immediately below on the Latin scale
(`body-cjk-size-m` 14px = `body-size-s` = `font-size-100`).

- **Spectrum expresses the "CJK is 14px" convention (Ant · Semi · Naive UI · Serendie
  compact · Vibes · Charcoal) in its token structure** — the body default is Latin 16 / CJK
  14.
- **It is the same problem Charcoal solves with a `scale(0.875)` back-correction**, solved by
  keeping two scales. Settled in values, with no render trick.
- Tracking has a separate `cjk-letter-spacing` token too, though its value, `0em`, matches
  Latin.
- **The only sample whose CJK support extends past swapping the typeface to the whole
  scale.** A different layer from Serendie (line height by role) and Rakuten (line height by
  language), which handle the line-height axis alone.

Carbon has a language axis too, but at **the typeface-slot layer** — seven of its 11
`$font-families` are per-language (`sans-arabic` · `sans-devanagari` · `sans-hebrew` ·
`sans-jp` · `sans-kr` · `sans-thai` · `sans-thai-looped`), and **only Thai comes in two sets,
looped and not.** There is no size or line-height branch.
**The second sample with an Arabic slot** (after shadcn/ui's `--font-ar`), and still
**no line-height or tracking rule is confirmed for Arabic or RTL.**

### Fluid typography — four methods

| method | systems |
|------|--------|
| **`clamp()`** | **Pajamas** (headings h1–h3, with a `-fixed` pair) · **Seed Design** (every type token as `clamp(static × 0.8, the computed value × the OS factor, static × 1.5)`) · **Porsche** (2xs–sm static / md–5xl fluid) · Asphalt, Nord and Bolt (on the dimensional side) |
| **`calc()` linear interpolation** | **Fleet** — `calc(minimum + increment × ((100vw − start vp) / vp width))` plus media-query bounds. **The archetype of the generation before `clamp()` was standardised**, with the formula still intact |
| **a responsive root font** | **Audi** — the root rises 16 → 18 → 20px, and since the type and line height are in rem and the padding in em, **the button height itself grows with it, 51 → 57 → 63px** |
| **breakpoint functions** | **Strapi** (input type 16 → 14px, line height 24 → 22px) · **Priceline** (a responsive array, `fontSize: [2, null, 1]` = mobile 16 / desktop 14) · **Mística** (Text3 mobile 16 / desktop 18) · **DSFR** (headings 22/28 → 24/32 above 768px) · **Nord** (an automatic promotion from m to l at ≤480px) · **Carbon** (ten `expressive-*` and `display-*` styles embedding `breakpoints: (md/lg/xlg/max)` inside the token — `display-04` 42 → 68 → 92 → 122 → 156px) |
| **two platform scales** (added 2026-08-18) | **Spectrum** — all 18 steps as `sets: {desktop, mobile}`. Not viewport interpolation but **two sets of token values** from which the platform picks · **Polaris** — the `light-mobile` theme overrides 14 `text-*` tokens |

**A fifth method was added (2026-08-18).** Spectrum and Polaris belong to none of the four
above — **they swap the whole scale on a theme or set axis.**
Spectrum applies to typography the same technique by which it swaps component heights between
its medium and large scales (`systems/spectrum.md`).

**Polaris's direction is not consistent** — the body family grows on mobile
(`body-md` 13 → 16px) while the two large headings **shrink** (`heading-xl` 24 → 22 ·
`heading-lg` 20 → 18). Every other sample goes one way.
The source gives no reason.

**Carbon puts the breakpoints inside the token value as a nested map.**
Unlike Strapi and Nord branching with a CSS media query, the value itself has the structure
`(md: (...), lg: (...))`, so **the side reading the token interprets the branch.**
**Even the weight changes at a breakpoint** (`expressive-heading-05` 32px/400 → md 36px/300).

**What separates the four is "what is continuous".** With `clamp()` and `calc()` the size is
continuous; with a responsive root **the whole system** is continuous; with breakpoint
functions it is stepwise.

**Audi has the widest reach** — one typographic decision pushes every component dimension,
placing it on a different layer from the fixed-px-height camp. **Seed Design, conversely,
puts the OS accessibility factor inside `clamp()`**, binding the user's setting between
bounds at the token layer.

### Cases that delegate the size axis wholesale to typography

- **Skeleton** — the size parameter is a single `--btn-size` and **that value is the font-size
  token.**
  The height derives from the formula `2 × the font − 2px`, and **its 13 size variants map
  1:1 onto Tailwind's whole type scale**
  (`btn-9xl` = an 8rem font and a 254px height exists syntactically). The input uses the same
  formula (`--field-size`)
- **Forma 36** — the density axis (the `-high` pair) runs through type → padding → min-height
  → radius
- **Kontur** — three size steps change the type, icons and gaps proportionally
- **Serendie** — density (compact/expanded) changes not only the typography but **the touch
  target size**

**In four systems the "size variant" is really a typographic variant.**
Skeleton is the extreme, and in that structure **changing the type scale changes every
component dimension.**

## Implementation defaults

**Body size — it parts by platform. It cannot be unified.**

```
automotive  24  (Android Automotive's minimum. It cannot go below this)
iOS         17  (Apple's Body)
web         16  (the majority) or 14 (dense administrative screens)
```

**Take 16 for the web, 14 where density is needed**, and keep iOS and automotive separate.

**The 14px camp is the largest in the sample — 17 systems** (recounted 2026-08-19; 13 at the
first correction of 2026-08-18, 7 in the edition before that).
Ant Design · Material 3 (Body Medium) · Helios · Evergreen · Seed · Atlassian ·
shadcn/ui · Ring UI · Siemens iX · Serendie (compact) · Vibes · Naive UI · PrimeVue ·
**Primer** (`base.text.size.sm`) · **Cloudscape** (`body-m`) · **Carbon** (`body-short-01`) ·
**Spectrum** (`font-size-100` — **on the desktop only**; mobile is 17px).
**Excluding Spectrum it is an unconditional 16**, against a 16px camp of 10.

> The table in the "default body size" section above gained four samples the same day, when
> the token paths of the five large `full` systems (Spectrum · Primer · Cloudscape · Carbon ·
> Polaris) were resolved, and this section's numbers had not caught up. **Where the table and
> this section disagree, the table governs.**
It is **administrative screens and enterprise plus the three Greater China samples** (see the
"default body size" section above).

**Decide the token default and the component's actual value separately.** shadcn/ui's token
is 16px while its components are all 14px. If that discrepancy is undocumented the
implementation wobbles.
**Across the 68 samples the grounds for this recommendation have grown** — eight systems have
control type smaller than the body (Bolt 12.8 · Evergreen 12 · Clarity 12 · Charcoal 14 …)
and four larger.
**"Body = control" is not a convention.**

**Consider raising the input field alone to 16px on mobile** (extended 2026-08-18).
It blocks iOS Safari's auto-zoom, and **it is not shadcn/ui's own way but a problem shared by
seven systems** — Bolt (forced globally) · Nord (a promotion at `≤480px`) · Strapi (a
responsive token) · Priceline (a responsive array) · Orbit (input type larger than the body,
at 16px) · Stacks (an `@supports` iOS branch) ·
**Charcoal** (rendering at 16px then back-correcting with `scale(0.875)`). The comparison of
methods is in `form.md`.

**Tracking — split it by platform.**

```
iOS       positive on large text / negative in the middle   (the Apple curve)
Android   growing positive as it shrinks                    (the Material curve)
web       0, or a weak negative on large headings only      (the Pajamas -0.01em way)
```

**Unifying on one value puts both iOS and Android out.** That is a fact, not a taste.

`em` scales with the size and `px` does not. **`em` is recommended** —
with fixed px, as in Evergreen, the tracking becomes relatively tight on large headings.

**Decide whether tracking goes into the size token or, as in Tailwind, into an independent
utility.**
Independent is free to combine but **the tracking does not follow when the size changes.**
Built into the scale it is consistent, but exceptions need an override.

**Keeping no tracking token at all is an option too** — Atlassian and Mantine do exactly
that. It trusts the typeface's default tracking, and it is not a minority in the sample.

**Step count**

```
start with 6–8 steps
```

Protocol runs eight heading steps and Evergreen and Radix Themes eight or nine.
Mantine has five body plus six heading.

**Three steps, `12 · 14 · 16`, are enough in the 10–16px band.** All four frameworks do so
without exception, and none keeps 11, 13 or 15px.

To go in 1px units as Seed Design does (18 steps), it has to be **a case where the glyph
density is high enough, as in Hangul and CJK, for a 1px difference to be genuinely visible**
— otherwise it only adds to the burden of choosing.

**Line height**

```
a ratio of 1.25–1.5  (headings 1.25, body 1.5)
```

Pajamas unifies every heading on 1.25. Easier to manage than fixed px per size.

**If you use a ratio, reduce it as the size grows.** Four of the five samples decrease
(Mantine alone increases). Large text has ample absolute spacing even at a small ratio.

**Before settling the line height, check how the control heights are made** (added
2026-08-18).
In systems that do not declare a height, **the line height is a layout value, not a
typographic one** — SGDS's body line height of 2.0 governs the button and input height ladder
directly, and MUI's unitless 1.75 drops its button height onto a fractional 36.5px.
The opposite extreme is **the camp that kills the line height to 1 and uses padding alone**
(Asphalt's body is 1.618 and its button 1; Origami's `line-height = font-size`).
**To keep control heights integral, either fix the line height in px or back-compute it from
the height** — Shoelace, Vibes and Garden do so with `calc(height − the border)`.

**If you use fixed px, consider matching a 4px grid** (the Atlassian way).
The ratio wanders from 1.125 to 1.429 while the absolute value is always a multiple of 4,
which simplifies layout arithmetic.

Since **Apple's and Material's are fixed px per size, do not convert their mock-ups into
ratios — use the values as they are** — the discrepancy is worst at small sizes (Apple's
Caption 2 is 11px on a 13px line height = 1.18).

**Decide whether to split the body and heading line heights.** Radix Themes tightens headings
by 2px only at the small steps (14–20px). From 24px up they are identical — **the band that
needs splitting is narrow.**

**Weight**

```
400 (body) · 500 (emphasis) · 600–700 (headings)
```

**Unifying the heading weight on one value is a common choice in the sample** (Pajamas 600 ·
Atlassian 653 · Mantine 700). **The value has not converged**, though — the team has to
decide.

**Start control weight at 500** (added 2026-08-18). Across the 68 samples 500 is the
majority, with the extremes at 400 (10) and 800 (PIE, Unify — 2). **Since bold controls (700)
number 16 and are not a minority**, do not take "buttons are medium" as given —
**the combination of keeping the body size and adding bold** (16px/700) recurs in Backpack ·
Codex · Gestalt · Pharos · Thumbprint · the Digital Agency.

**Decide the control weight together with the body hierarchy.** Stacks inverts the majority
with a **400 button and a 700 label**, Paste has buttons at 600 and inputs at 500, and Grommet
puts only its input values at 600.
**When controls part in weight inside one system, weight stops working as a hierarchy
signal.**

**In a two-weight (400/700) system, which side the button stands on decides the impression.**
All four CJK samples (KRDS · the Digital Agency · Charcoal · Serendie) are two-weight, and
**only Serendie put the button at 400.**

**Do not keep all nine steps (100–900).** Only Tailwind does, and unless the face is variable
most of those steps have no actual font file.

**If you use fluid typography (`clamp()`), keep a fixed variant alongside.**
That is why Pajamas keeps a `-fixed` pair at every step — there are places, such as tables and
code blocks, where the size must not wobble.
**Porsche solves the same problem by size band** — 2xs–sm (12, 14 and 16px) are static and
only md and up are fluid. **Keeping the body and control bands out of the fluid range is
easier to manage** (added 2026-08-18).

**There are four methods of fluid typography** (added 2026-08-18).

| method | example | reach |
|------|-----|------|
| `clamp()` | Pajamas · Seed Design · Porsche | the size alone is continuous |
| `calc()` linear interpolation plus media-query bounds | **Fleet** | the generation before `clamp()`. The result is the same and the formula longer |
| **a responsive root font** | **Audi** (16→18→20px) | **every component dimension moves with it** — the button goes 51→57→63px |
| breakpoint functions | Strapi · Priceline · Mística · DSFR · Nord | stepwise |

**When choosing a responsive root, know that it is a layout decision rather than a
typographic one.**
In Audi the rem type plus em padding combination means a change of root pushes the control
heights up too.

**To support the OS accessibility factor there is the method of binding it between bounds
inside `clamp()`** —
Seed Design wraps every type token as `clamp(static × 0.8, the computed value × the factor,
static × 1.5)`.

**If you use a runtime factor (`calc(1rem * var(--scale))`), state the reference factor in
the documentation.**
Mantine's and Radix Themes' values assume a factor of 100%. Radix Themes moves between 90 and
110%, so `--font-size-3` is 14.4–17.6px.

**Multilingual support**

**Decide early whether to keep per-language typeface slots.** shadcn/ui keeps `--font-ar` and
`--font-he`. RTL is not only a question of direction but **a question of typeface.**

> **Correction (2026-08-18).** "No system in the sample keeps a CJK typeface slot" and
> "shadcn/ui is the only one" are **both refuted.**
> **LINE** makes language **a first-class axis of its token names** (`$ldsg-en-title-xxl-200`
> — language EN/JP/TC/TH × type × size × weight), and on the LDSM side the scale carries
> **per-language typeface mappings** (iOS SF Pro · JP Hiragino · ZH PingFang · TH Thonburi ·
> KO Apple SD Gothic Neo).
> **Vibe** names Hebrew, Arabic and Japanese fonts in its default typeface stack, and
> **Charcoal** designates a CJK-specific open-source typeface (Sarasa UI J) as its system
> typeface.

**It is a question of which of three layers handles it** (summarised 2026-08-18).

```
a token-name axis   LINE (language × type × size × weight)     — comprehensive; the token count multiplies by language
a typeface slot     shadcn/ui (--font-ar/-he) · Charcoal        — one value swapped
a typeface stack    Vibe · Vibes (Japanese names listed twice)  — handled by the fallback chain, without tokens
a selector branch   Rakuten (:lang(en)/:lang(ja) line heights)  — when only the line height differs, not the size
```

**If you deal with CJK, check the line height first.** **It goes out of step before the
size** (14 vs 16 vs 17) — Rakuten splits the same style into `:lang(en)` 1.444 and
`:lang(ja)` 1.333, and Serendie divides by role, label 1.0 and body 1.6.

**If you deal with Japanese typesetting, consider putting `text-spacing-trim` in the reset** —
SmartHR puts `space-all` in its preflight base (avoiding Windows Yu Gothic's over-tightening
of punctuation).
**SmartHR is the sample with a CJK typesetting property in its system reset CSS.**

**For Arabic and RTL, still no rule beyond the typeface slot has been confirmed** —
every per-language line-height and tracking rule observed is **from a CJK sample.**
The body size parts too — read `i18n/README.md` alongside this.

## Guidance — style usage rules, measured (2026-08-18)

The typographic usage guidance of seven systems was read directly. The shared skeleton of
placement:
**"choose a heading by hierarchy, not by appearance" (codified by Cloudscape) + one h1 per
page (Atlassian and Cloudscape agree) + no skipping levels.**

- **Cloudscape is the most specific by position**: Heading XL = the page title (h1) →
  L = a container → M = a card section or key/value column → S = a paragraph heading →
  XS = a division within a paragraph.
  Body S = form descriptions, constraints and errors. Display large = a home title or
  dashboard figure.
  monospace only for code, figures, timestamps, IPs and IDs. **Nothing below 12px**
- **M3's role rules**: Display = "for short, important text or numbers only, on large
  screens" · no decorative typefaces in long-form Body · **"buttons use label large"**. Line
  height rules: 1.2× for large styles / 1.5× for body, with tabular numbers where values
  change and in tables
- **Atlassian states size-component pairs**: Heading M ↔ a modal (paired with Body M) ·
  S and XS ↔ the flag family · XXS ↔ fine print (paired with Body S). **"Use a heading style
  rather than bolding or changing the size"**
- **Carbon has two set axes**: productive (-01, on a 14px base) = dense product UI /
  expressive (-02, 16px) = web pages. label-01 is "for field labels, errors and captions;
  not for body". body-compact = four lines or fewer / body = more than four —
  **the only sample to split styles by paragraph length**
- **Spectrum is distinctive for its formatting prohibitions**: italic only in placeholders
  and captions · **underline only on links (never as emphasis)** · custom sizes only from the
  defined list · a body measure of 50–120 characters (ideally 70)
- **GOV.UK**: a fixed 19px body ("keep the standard 19px in most cases") · a 24px lead
  paragraph **once per page** · caption-* to show membership of a parent section ·
  long pages raise the heading scale one step (h1 = xl)
- Polaris current: style-placement rules greatly reduced — what remains is the structural rule
  that Heading **assigns h2/h3/h4 automatically by section nesting depth** (it cannot be set
  manually)

## Not yet filled in

- ~~Style usage guidance~~ → **resolved (2026-08-18)** — the "guidance" section above
- ~~CarPlay typography~~ → **confirmed to have no values (2026-08-18)** — the full text of
  the HIG CarPlay page (DocC JSON, 7.4KB) contains zero font or size figures. CarPlay is a
  structure in which the system renders the templates, so there is no typographic spec for
  app developers at all
  (consistent with the "template-based" structure in `systems/carplay.md`)
- ~~The distribution of control (button, input) type sizes and weights~~ → **resolved
  (2026-08-18)** —
  the "re-synthesis across 68 samples" section above. Weights 400 (10) / 450 (2) / 500 (the
  majority) / 600 (10) / 700 (16) / 800 (2), with eight systems whose controls are smaller
  than the body and four larger
- ~~The methods of fluid typography~~ → **resolved (2026-08-18)** — four (`clamp()` ·
  `calc()` linear interpolation · a responsive root · breakpoint functions). The re-synthesis
  section above
- **Multilingual specifications** — ~~no system was confirmed to have a CJK or Arabic
  line-height rule~~
  → **resolved for CJK (2026-08-18)**, with counterexamples grown to six:
  Rakuten ReX (a `:lang(en)` 1.444 / `:lang(ja)` 1.333 line-height branch) ·
  LINE (a language axis in the token names, EN/JP/TC/TH, plus per-language typeface
  mappings) ·
  SmartHR (a `text-spacing-trim: space-all` reset plus character-count spacing) ·
  Serendie (line height by role, label 1.0 / body 1.6) ·
  Charcoal (satisfying CJK 14px and iOS 16px at once with a `scale(0.875)` back-correction) ·
  Vibes and Vibe (handled at the typeface-stack layer). The "multilingual support" section
  above.
  **That every observed rule is from a CJK sample stands unchanged** —
  **for Arabic and RTL, no line-height or tracking rule is still confirmed beyond the
  typeface slots (shadcn/ui's `--font-ar` and `--font-he`, Vibe's default stack)**
- ~~**Spectrum · Polaris · Primer · Cloudscape typography** — the token paths were
  unverified~~
  → **all resolved (2026-08-18)**, with Carbon extended. The paths were all inside the npm
  distributions:
  `@adobe/spectrum-tokens@15.0.0` `src/typography.json` plus the per-role
  `src/{heading,title,body,detail,code}.json` (CJK pairs included) /
  `@shopify/polaris-tokens@9.4.2` `dist/cjs/src/themes/base/{font,text}.js`
  (**read from the compiled output, since npm has no `src/`**) /
  `@primer/primitives@11.10.0` `src/tokens/base/typography/typography.json5` plus
  `dist/css/functional/typography/typography.css` /
  the `$font-*`, `$line-height-*` and `$letter-spacing-*` in
  `@cloudscape-design/design-tokens@3.0.107` `index.scss` /
  `@carbon/type@11.65.0` `scss/_styles.scss` (34 type styles) and `scss/_font-family.scss`.
  The results are in the "shorthand tokens", "Spectrum's two platform sets", "the weight
  ceiling", "the tracking direction of the five large systems" and "Spectrum's CJK scale"
  sections above and in each `systems/*.md`.
  (Atlassian was resolved earlier — `dist/cjs/artifacts/tokens-raw/atlassian-typography.js`)
- **Mantine's heading tracking and typeface** — only size, weight and line height are exposed
  as CSS variables
- ~~**The typographic differences of shadcn/ui's eight style variants** (`luma`–`vega`) — the
  `styles/` directory was unverified~~
  → **resolved (2026-08-18)** — `apps/v4/styles/` was gitignored build output and the source
  is the eight files `apps/v4/registry/styles/style-*.css`. The button type parts into
  `text-sm medium` (five) / `text-xs medium` (`lyra`, `mira`) /
  **`text-xs semibold tracking-widest`** (`sera` — an editorial-design grammar at 0.1em
  tracking)
  (`systems/shadcn-ui.md`). **The style with the largest size has the smallest letters.**
