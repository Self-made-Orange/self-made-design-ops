<!-- lang-links -->
> **English** · [한국어](scales.ko.md)
<!-- /lang-links -->

# Cross-system scale comparison

Placing several systems' scales side by side to see **where they converge and where they
part.** When settling a new project's scale, start from this document's "implementation
defaults".

> **Current harvest: 112 systems** (the list of 100 + 5 platform extras + 5 regional and
> government additions + 3 framework extras: Headless UI · Panda CSS · vanilla-extract).
> Carbon (IBM) · Polaris (Shopify) · Primer (GitHub) · Fluent 2 (Microsoft) · GOV.UK (the UK
> government) ·
> Ant Design (Ant Group) · Cloudscape (AWS) · Backpack (Skyscanner) · Spectrum (Adobe) ·
> Material 3 (Google) · Canvas (Workday) · Paste (Twilio) · Codex (Wikimedia) · Vapor UI
> (goorm) ·
> Atlassian · Gestalt (Pinterest) · Helios (HashiCorp) · Protocol (Mozilla) ·
> Base Web (Uber) · Nord (Nordhealth) · Apple HIG (iOS 26) · visionOS (Apple) ·
> Lightning (Salesforce) · EUI (Elastic) · Orbit (Kiwi.com) · Seed Design (Karrot) ·
> Pajamas (GitLab) · Evergreen (Segment) · Android Automotive (Google) · CarPlay (Apple) ·
> **Tailwind CSS · shadcn/ui · Mantine · Radix Themes ·
> Chakra UI · Open Props · Bootstrap · USWDS · KRDS · Garden (Zendesk) · Blueprint · Porsche ·
> Thumbprint · Forma 36 · Cedar · Auro · SGDS · Semi · the Digital Agency (Japan) · TDS (Toss)
> · macOS 26 ·
> SmartHR (Japan) · Charcoal (pixiv) · Spindle (Ameba) · Serendie (Mitsubishi Electric) ·
> Grommet (HPE) · Vibe (monday) · Ring UI (JetBrains) · Stacks (Stack Overflow) ·
> Mística (Telefónica) · Siemens iX · Vanilla (Canonical) · Strapi · Vibes (freee) ·
> Vuetify · Naive UI · PrimeVue · Skeleton · Shoelace · NASA WDS · DSFR (the French
> government) ·
> Odyssey (Okta) · PIE (Just Eat) · Vitamin (Decathlon) · Braid (SEEK) · Kaizen (Culture Amp)
> ·
> Clarity (VMware) · LeafyGreen (MongoDB) · Solid (BuzzFeed) · Pharos (JSTOR) ·
> Palette (Artsy) · Tegel (Scania) · Priceline · Yoga (Wellhub) · Welcome UI (WTTJ) ·
> Intergalactic (Semrush) ·
> NHS (UK health) · Asphalt (Gojek) · Unify (Tokopedia) · Pluralsight · Skin (eBay) ·
> Origami (FT) · Bolt ·
> HSDS (Help Scout) · MUI · HeroUI · Park UI · Ark UI · Kontur UI ·
> **Audi UI · Persona (Privy) · Italia (the Italian government) · NYSDS (New York State) ·
> WMN (transport)** (2026-08-17, +5)**
>
> Platform distribution: `web` 100 · `automotive` 2 · `wearable` 2 · `tv` 2 · `mobile` 1 ·
> `spatial` 1 · `desktop` 1
> (by the first value of the `platform` array).
>
> **A spacing scale is confirmed for 63** (Italia and NYSDS added) (2026-08-17, +25:
> Charcoal · Spindle · Serendie · SmartHR · Grommet · Vanilla · Stacks · Strapi · Vibe ·
> Vibes ·
> Vuetify · Shoelace · Odyssey · PIE · Vitamin · Braid · Kaizen ·
> Clarity · LeafyGreen · Solid · Pharos · Artsy · Tegel · Priceline · Yoga).
> **No scale exists** in 5 — Apple HIG · Material 3 · Seed Design · Evergreen · shadcn/ui.
> **Not enumerated** in 3 — Tailwind (base × calc) · **Ring UI** (`--ring-unit` × calc, 437
> occurrences) · **MUI** (a `theme.spacing(n)` function).
> **No style layer at all** in 3 — **Ark UI** (anatomy only) · **Headless UI** (0 bytes of
> CSS, behaviour only) · **vanilla-extract** (a valueless token-contract tool).
> **Panda CSS** **redistributes Tailwind's values as an enumeration** and adds half steps
> (4.5, 5.5) and a 2xs — completing the three forms of generation (Tailwind) ↔ inheritance
> (shadcn) ↔ enumeration (Panda).
> **Inheritance** in 3 — shadcn/ui · **Skeleton** (Tailwind's `--spacing`) · **NASA WDS**
> (USWDS).
> **Unverified** in 11 — Helios · visionOS · Android Automotive · CarPlay ·
> TDS (**resolved 2026-08-17**: the tds-mobile build has no central spacing object — the
> literal distribution is 8 > 24 > 4 > 16, `systems/toss-tds.md`) · macOS (the page was not
> measured) ·
> Mística (**resolved 2026-08-17**: the source tokens are not a scale but per-component slots
> with dual mobile/desktop values, `systems/mistica.md`) ·
> Siemens iX · Naive UI · PrimeVue (no global scale found, the components not investigated) ·
> DSFR (not in the CSS variables; the SCSS not investigated).
> The five added 2026-08-17: **Italia and NYSDS enumerate multiples of 4px** (taking spacing
> confirmations to 63), Audi UI uses a 4px base unit (a functional `unit()`),
> Persona has no spacing override in its preset (do not assume it inherits the Tailwind
> default — unverified), and WMN was measured from its min.css alone.
> Tailwind **generates from a single base rather than enumerating a scale**, so it is handled
> separately in the value comparison table.

## Spacing

| px | Carbon | Polaris | Primer | Fluent | GOV.UK | Ant | Cloud | Backpk | Spectr | Canvas | Paste | Codex | Vapor |
|----|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0 | | O | | O | O | | | O | | O | O | O | |
| 1 | | O | | | | | | O | O | | | O | |
| 2 | O | O | O | O | | | O | O | O | O | O | O | O |
| 4 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 5 | | | | | O | | | | | | | | |
| 6 | | O | O | O | | | | | O | O | | | O |
| 8 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 10 | | | | O | O | | | | | O | | | |
| 12 | O | O | O | O | | O | O | | O | O | O | O | O |
| 14 | | | | | | | | | | O | | | O |
| 15 | | | | | O | | | | | | | | |
| 16 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 18 | | | | | | | | | | O | | | O |
| 20 | | O | O | O | O | O | O | | O | O | O | O | O |
| 24 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 28 | | | O | | | | | | | O | O | | |
| 30 | | | | | O | | | | | | | | |
| 32 | O | O | O | O | | O | O | O | O | O | O | O | O |
| 36 | | | O | | | | | | | O | O | | |
| 40 | O | O | O | | O | | O | O | O | O | O | O | O |
| 44 | | | O | | | | | | | | O | O | |
| 48 | O | O | O | | | O | | | O | O | O | O | O |
| 56 | | | | | | | | | | O | O | | O |
| 64 | O | O | O | | | | | O | O | O | O | O | |
| 80 | O | O | O | | | | | | O | | O | | |
| 96 | O | O | O | | | | | O | O | | O | | |
| 128 | | O | O | | | | | | | | | O | |
| 160 | O | | | | | | | | | | | | |

### The scales of systems not in the table

Systems that add to the 13 columns above.

| system | scale |
|--------|--------|
| Atlassian | 0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 (+ negatives, -2 to -32) |
| Gestalt | 0 · 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 52 · 56 · 60 · 64 (a complete 4px series) |
| Protocol | 4 · 8 · 16 · 24 · 32 · 48 (six steps) |
| Base Web | 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28 · 32 · 36 · 40 · 48 · 56 · 64 · 96 · 128 · 192 |
| Nord | 4 · 8 · 16 · 24 · 36 · 72 (six steps, irregular multiples) |
| Lightning | 0 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 (+ separate horizontal and vertical axes) |
| EUI | 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 (`base` = 16, placed mid-scale) |
| Orbit | 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · **52** · 64 (+ a separate control size scale) |
| Pajamas | 0 · 1 · 2 · 4 · 6 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80 · 96 → 120 · 144 · 160 · … · 704 (irregular indices) |
| **Radix Themes** | **4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64** (nine steps) |
| **Mantine** | **10 · 12 · 16 · 20 · 32** (five steps) |
| **Chakra UI** | 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · … · 384 (**34 steps**) |
| **Open Props** | 4 · 8 · 16 · 20 · 24 · 28 · 32 · 48 · 64 · 80 · 120 · 160 · 240 · 320 · 480 (+ **-4**) |
| **Bootstrap** | **0 · 4 · 8 · 16 · 24 · 48** (six steps) |
| **USWDS** | 1 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80 · 120 (+ **negatives to -120** + layout 160–1400) |
| **KRDS** | 1 · 2 · 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 56 · 64 · 72 · 80 · 96 (22 steps, **a 10px root**) |
| **Garden** | **4 · 8 · 12 · 20 · 32 · 40 · 48** (multipliers 1 · 2 · 3 · 5 · 8 · 10 · 12 — **no 16 or 24**) |
| **Porsche** | **4 · 8 · 16 · 32 · 48** static (+ a fluid `clamp()` pair at every step — **no 12 or 24**) |
| **Blueprint** | a 10px grid · derived values as `4px×N` with fractional multipliers (no enumerated scale) |
| **Thumbprint** | 4 · 8 · 16 · 24 · 32 · **64 · 128 · 256** (pure doubling past 32 — the largest of the enumerating kind) |
| **Forma 36** | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 (nine steps, conventional) |
| **Cedar** | prose naming in fractions and multiples of `x` — eighth-x (x/8) to four-x. In rem, with the root unsettled |
| **Pharos** (JSTOR) | **the same prose system as Cedar** — one-eighth-x (2px) to 10-x (160px). **The base x = 1rem, settled** |
| **Clarity** (VMware) | 1 · 2 · 4 · 6 · 8 · 12 · 16 · 24 · 32 · 36 · 48 · 64 · 72 · 96 — all `calc(n × an internal factor)` |
| **LeafyGreen** | 0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 (the number = px × 25, ending at 24) |
| **Solid** (BuzzFeed) | 4 · 8 · 16 · 24 · 32 · 48 · 72 (**number 1 = 8px**; 4px is `05`) |
| **Palette** (Artsy) | **5 · 10 · 20 · 40 · 60 · 120** (a 10px unit — **no 4, 8 or 16 at all**) |
| **Tegel** (Scania) | element 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 / layout 8 · 16 · 24 · 32 · 48 · 64 · 72 · 96 · 128 · 160 (**a 10:10 split**) |
| **Priceline** | **0 · 4 · 8 · 16 · 32 · 64 · 128** (geometric doubling throughout) |
| **Yoga** (Wellhub) | 0 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 80 (12 steps, `huge`/`xhuge`) |
| **NHS** | 0 · 4 · 8 · 16 · 24 · 32 · 40 · 48 · 56 · 64 (**a GDS fork, but swapped to 4px** + a responsive map) |
| **Asphalt** (Gojek) | 2 · 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 (12 steps, `3XS`–`6XL`) |
| **Unify** (Tokopedia) | sp 2 · 4 · 8 · 16 · 24 · 32 · 40 · 48 / ly 8 · 24 · 32 · 40 · 48 · 64 · 96 · 128 (an 8:8 split) |
| **Pluralsight** | 4 · 8 · 12 · 16 · 24 · 48 · 64 (seven steps, **no 32**) |
| **Skin** (eBay) | 0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 (the number = px × 12.5) |
| **Bolt** | **no grid** — a per-axis base, x 1.55 / y 1.35, × multipliers (medium = 24.8 / 21.6px) |
| **SGDS** | 0 · 4 · 8 · 16 · 24 · 32 · 40 · 48 · 56 (a Bootstrap fork — **restoring a 32 the original lacked**) |
| Semi · the Digital Agency (Japan) | **no dimensional tokens** (Semi: component literals / the Digital Agency: colour and typography only) |
| Evergreen | **none** (radius and typography only) |
| **shadcn/ui** | **none** — it uses Tailwind's `--spacing` as-is |
| **Tailwind CSS** | **not enumerated** — generated by `calc()` multiplication from a single `--spacing: 0.25rem` |

#### For Tailwind the object of comparison is not a scale but a base

```css
--spacing: 0.25rem;   /* 4px. There is no list of steps */
```

`p-3` = `calc(var(--spacing) * 3)` = 12px. **Not only integer multiples but `p-1.5` (6px) and
`p-2.5` (10px) are valid**, so it is in effect an infinite scale in 2px units.

| method | systems |
|------|--------|
| enumerating the steps | 23 |
| derived from a seed and **exported as a finite list** | Ant Design |
| **one base plus runtime multiplication. No list** | **Tailwind v4** |

**It differs from Ant Design.** Ant exports the result computed from `sizeUnit` and
`sizeStep` as a token list. Tailwind never makes the list —
**there is nothing to carry into a design tool.**

### The core — the value without exceptions has disappeared (30 samples)

**Garden (Zendesk) has no 16px.** Its multipliers `1 · 2 · 3 · 5 · 8 · 10 · 12` skip ×4 and
×6 — `16`, intact until the last, broke at the 30th sample.

Against **61** systems, excluding GOV.UK (5px), Blueprint (no enumeration), Cedar (an
unsettled root), the non-enumerating Tailwind and Ring UI, and those with an unverified scale
(Mística, Siemens iX and others)
(2026-08-17, reflecting 5 Japanese + 18 Western + 2 South-East Asian + NHS + the framework
expansion):

| value | adoption | systems missing it |
|----|:----:|------|
| **8** | **57 / 61** | Mantine · Grommet · Kaizen · Artsy |
| **16** | **57 / 61** | Garden · Grommet · Kaizen · Artsy |
| 4 | 56 / 61 | Mantine · Grommet · Kaizen · Braid (a minimum of 8px) · Artsy |
| **24** | **56 / 61** | Mantine · Garden · Porsche · Shoelace · Priceline (a 4→128 geometric series) |
| 32 | 52 / 61 | Nord · Bootstrap · Spindle · Grommet · Vanilla · Shoelace · Kaizen · LeafyGreen (ending at 24) · Artsy |

> **Correction (within the same batch).** The previous count recorded Braid as lacking `16`
> and Vitamin as lacking `24` — **both were wrong.** Braid's grid multiples make
> `small: 4` = **16px**, and Vitamin's `spacing_5` = 1.5rem = **24px**. The error was reading
> the numbers without converting grid multiples and rem notation to px.

| 12 | 25 / 29 | Backpack · Protocol · Nord · Open Props |
| 48 | 23 / 29 | Fluent · Cloudscape · Backpack · Nord · Mantine · KRDS (has it) and others |
| 40 | 22 / 29 | Fluent · Ant · Protocol · Nord · Mantine · Bootstrap · Open Props (has it) and others |
| 20 | 22 / 29 | Carbon · Backpack · Protocol · Nord · EUI · Radix Themes · Bootstrap |
| 2 | 20 / 29 | Ant · Gestalt · Protocol · Nord · Mantine · Radix Themes · Open Props · Bootstrap · Garden |
| 6 | 11 / 29 | |

> The rows from `12` down are the counts as of the 29-sample point — only the top five values
> were recounted against 61.

**There is no longer a "value every system has".** `8` and `16` are strongest at 57/61 and
`4` and `24` at 56/61, and the systems missing them differ (Mantine for 4 and 8, Garden for
16).
**24 is collapsing fastest** — its three counterexamples (Mantine, Garden, Porsche) are all
recent samples, and all three are five- to seven-step t-shirt scales.

**Every counterexample is a name-based (t-shirt) scale with few steps** —
Mantine (5) · Garden (7) · Nord (6) · **Porsche (5)** ·
**Kaizen (7)** · **Shoelace (10)**.
They are cases of skipping the middle while grouping the steps under names, and the
numeric-key and multiple-key systems (Tailwind · Chakra · Polaris · USWDS …) all keep the
core.
**Core values start dropping out when a scale is reduced to names** —
up to 50 samples there is no exception to that tendency (Grommet and Braid are a separate
kind, t-shirt scales whose grid is itself not a multiple of 4).

#### Systems whose grid is not 4px — eight samples

| system | grid | departures from the core |
|--------|------|-----------|
| GOV.UK | **5px** | 4, 8, 16, 24 and 32, all of them |
| Blueprint | **10px** | no enumeration |
| **Kaizen** | **6px** | **4 · 8 · 16 · 32** |
| **Palette** (Artsy) | **10px** (+ a half of 5px) | **4 · 8 · 16** |
| **Bolt** | **no grid at all** (only the ratios x 1.55 / y 1.35) | **all** |
| **Grommet** | divisors of 24 (3 · 6 · 12) | 4 · 8 · 16 |
| **Braid** | multiples of 4px as **unitless values** (a minimum of 2 units = 8) | 4 |
| KRDS | a 10px root plus a 4 family | none (it complies once converted to px) |

**A 4px grid is a convention, not a norm.** Grids of 5, 6 and 10px genuinely exist, and among
them GOV.UK, Kaizen and Artsy are effectively incompatible with a 4px grid
(a 6px grid meets it only at 12 and 24; a 10px grid only at 20 and 40).
**Four of the eight depart from 4, 8 and 16 simultaneously** — Kaizen (6px) · Artsy (10px) ·
Grommet (divisors of 24) · **Bolt (no grid — no value is an integer px)**.

**The eight rows are not all of one kind.** Braid's grid is itself a multiple of 4px and only
the notation is unitless (a minimum of 2 units = 8px), and KRDS's root is 10px but converting
to px keeps the 4 family. Those two are **"a different notation"** and are not counted as
core departures — the ones that genuinely diverge from a 4px grid are the other six, four of
which are the simultaneous departures above.

#### The counterexamples came from the `framework` domain

Mantine and Radix Themes are **frameworks rather than design systems for a company's
products** (`domain: framework`). Excluding that domain, the core is 21/21 without exception.

**That is not a reason to remove Mantine from the sample.** By frequency of practical
reference the framework side is higher, and the fact that the judgement of treating
`4/8/16/24` as "values that must be kept" collapses in one widely used system is exactly what
this corpus has to confirm.

The corrected conclusions:

- **16px has no exception** (23/23). Put it in the scale without fail
- **`4/8/24` are very strong at 22/23 but not absolute**
- **`32` is 22/23 too** (Nord is missing)
- **The choice of reducing to five steps while discarding 4 and 8**, as Mantine does,
  genuinely exists.
  Its minimum is `10` — a form that gives up 2px and 4px fine adjustment

Radix Themes goes the other way — its nine steps `4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64`
**include all five core values (4/8/16/24/32)** and drop only 20px.

> **The history of sample expansion.**
>
> | sample | result |
> |------|------|
> | 4 | judged a core of seven (`2/4/8/12/16/24/32`) |
> | 8 | **overturned.** Reduced to a core of five (`4/8/16/24/32`) |
> | 13 | **held** |
> | 16 | **held** |
> | 18 | **partly revised.** Nord has no 32px, so the core shrank to four, `4/8/16/24` |
> | **24** | **breached again.** Mantine has no 4, 8 or 24, so **the only value without exceptions became `16`** |
| **27** | **`16` holds.** But the exceptions to `32` became two with Bootstrap, and those to `12` became four |
| 29 | `16` holds (both USWDS and KRDS have the core) |
| **30** | **wiped out.** Garden has no 16 or 24, so **the values without exceptions became zero** |
| **42** | **the departure width was updated.** Grommet (a grid of 24's divisors, 3 · 6 · 12) departs from 4, 8 and 16 **at once** — the largest for a single system. The exceptions to 32 became five (Spindle and Vanilla added) |
| **54** | **the strongest value changed.** Kaizen (**a 6px grid**) departs from 4, 8, 16 and 32 alike, setting a new maximum departure width, and Braid (grid multiples, a minimum of 8px) drops 4 — so the strongest value moved from `4` to **`8` and `16` (51/54 each)** |
>
> After the large reversal from 4 to 8, one value (32px) dropped out from 8 to 18,
> and from 18 to 24 the framework family (Mantine) came in and breached the other three.
>
> **It was breached one batch after "16 could be breached too" was recorded.**
> Four of the nine expansions changed the conclusion. What this table says is plain —
> **"a universal value" is a claim that necessarily dies as the sample grows. What remains is
> a ranking by adoption.**
> The practical recommendation is unchanged: starting from `4/8/16` (28/29 each) is still the
> safest. What changed is that the word "must" can no longer be used.

### Protocol and Mantine — two minimal scales give opposite answers

The two systems reduced to the fewest steps.

| system | steps | scale |
|--------|:---:|--------|
| Mozilla Protocol | 6 | `4 · 8 · 16 · 24 · 32 · 48` |
| **Mantine** | **5** | **`10 · 12 · 16 · 20 · 32`** |

**They overlap on only two values, `16` and `32`.**

Protocol's first five match the five core values (`4/8/16/24/32`) exactly.
Mantine keeps only `16` and `32` of the core and discards `4`, `8` and `24`.

**The reading that "reducing to a minimum leaves the core" holds only for Protocol.**
That reading was used before Mantine came in; it no longer holds, and is withdrawn.

The point where the two part is **the minimum.**

| | minimum | the gap between the two smallest steps |
|---|:---:|:---:|
| Protocol | 4px | +4 |
| Mantine | **10px** | **+2** |

Protocol keeps 4px fine adjustment and extends the top to 48px.
Mantine discards 4 and 8px, giving up fine adjustment, and instead puts **a 2px gap in the
10–12px band.** Mantine's top is 32px.

### GOV.UK's 5px — ten public-sector samples, and a decisive refutation

**The public domain has grown to ten, and the 5px base is GOV.UK's alone.**

| system | government/body | base |
|--------|------|:---:|
| **GOV.UK** | the UK | **5px** (5 · 15 · 25 · 30 · 50 · 60) |
| Codex | Wikimedia | multiples of 4px |
| **USWDS** | the USA | **8px** (`spacing-multiple()`) |
| **KRDS** | Korea | the 4px family (dense, in 2px units) |
| **SGDS** | Singapore | multiples of a 16px `$spacer` (a Bootstrap fork) |
| **the Digital Agency** | Japan | **no spacing tokens** |
| **DSFR** | France | no spacing in the CSS variables (the SCSS not investigated) |
| **NHS** | the UK (health) | **4px** — **a fork of the GDS code with the values changed** |
| **Italia** | Italy | **4px** multiples in 12 steps, named by multiple (`1x`–`24x`) — added 2026-08-17 |
| **NYSDS** | New York State, USA | **4px** multiples in 12 steps, named as a percentage of 8px = 100 — added 2026-08-17 |

**NHS closed the question.** The comment in `nhsuk-frontend`'s spacing file states
`"Original code taken from GDS (Government Digital Service)"`, and yet
`$nhsuk-spacing-points` is `4 · 8 · 16 · 24 · 32 · 40 · 48 · 56 · 64` —
**it took the same code and replaced only the multiples of 5px with multiples of 4px.**
It inherited **the mechanism** (the responsive spacing map, the ordinal keys, the mixins) and
discarded the values — direct evidence that the 5px is not inherited (`systems/nhs.md`).

**What the eight public systems share is not a base but an accessibility structure** —
GOV.UK (responsiveness built in) · USWDS (a Section 508 context) · KRDS (shipping 190
high-contrast-mode tokens, the same count as light) ·
**NHS (sharing GOV.UK's focus yellow plus `pt` size tokens for print)** each put accessibility
into the token structure in a different form.

### The core re-confirmed — `16` intact at 29 too

Both USWDS and KRDS have all of `4/8/16/24/32`. No change to the exception list —
`16` at 29/29, `4/8/24` missing only in Mantine, and `32` missing only in Nord and Bootstrap.

### Scales differ greatly in density

| system | steps in the 2–20px band |
|--------|:---:|
| **Base Web (Uber)** | **10** (2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20) — continuing in 2px units to 24px |
| Canvas (Workday) | 10 (2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20) |
| Vapor UI | 8 |
| Primer · Spectrum | 7 |
| Polaris · Fluent | 7 |
| Paste · Codex | 6 |
| Carbon | 5 |
| Ant Design | 5 |
| Backpack | 4 |
| **Chakra UI** | **10** (2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20) |
| **Mantine** | **4** (10 · 12 · 16 · 20) |
| **Bootstrap** | **3** (4 · 8 · 16) |
| **Open Props** | **4** (4 · 8 · 16 · 20) |
| **Radix Themes** | **4** (4 · 8 · 12 · 16) |
| Nord | 3 (4 · 8 · 16) |
| **Tailwind** | **infinite** (fractional multiples in 2px units are allowed) |

**Base Web and Canvas are more than three times as dense as Nord.** Density allows fine
adjustment but means deciding "10px or 12px?" every time. Sparseness makes the decision faster
at the cost of places where nothing fits.

### The top end — a fivefold difference

| system | maximum |
|--------|:---:|
| Base Web | 192px |
| Carbon | 160px |
| Polaris · Primer · Codex | 128px |
| Paste | 116px |
| Backpack · Spectrum | 96px |
| GOV.UK | 60px |
| Vapor | 56px |
| Ant | 48px |
| **Open Props** | **480px** |
| **Chakra UI** | **384px** |
| **Radix Themes** | **64px** |
| **Bootstrap** | **48px** |
| Cloudscape | 40px |
| Fluent | 32px |
| **Mantine** | **32px** |

Nord is in the middle at 72px.
**Mantine is at the bottom with Fluent (32px)** — to be read together with its having only
five steps.
Tailwind has no top — `p-96` (384px) is valid.

The low end — Fluent 32px · Cloudscape 40px · Ant 48px — is too short a range to hold layout
spacing. How those systems handle layout spacing could not be confirmed.
**The top of the range is decided only once you settle "does the spacing token cover layout
too?"**

Codex (Wikimedia) goes the other way entirely, unifying spacing and layout widths into
**a single `size` scale** reaching 896px.

## How the scale is defined

| method | systems | contents |
|------|--------|------|
| a list of values | most | a value specified per step |
| **derived from a seed** | Ant Design | everything computed from two, `sizeUnit` and `sizeStep` |
| **a recursive function** | Carbon (typography) | a formula whose increment grows every four steps |
| **a runtime factor** | Vapor UI · **Mantine** · **Radix Themes** | every token is `calc(var(--scale) * Npx)` |
| **a base-value variable** | **shadcn/ui** (radius) | one `--radius` multiplied by seven factors |
| **base multiplication, no list** | **Tailwind v4** | one `--spacing`. The steps are not enumerated |
| **baseline multiples** | Canvas | only the large values are `calc(baseline * N)` |
| **two token sets** | Cloudscape | shipping both `scaled` and `static` |

### The runtime factor — grown to four systems

When it was Vapor UI alone this was recorded as "the only such method"; **widening the sample
showed the same method in standard use across the framework family.**

| system | factor variable | count | scope |
|--------|-----------|:---:|-----------|
| Vapor UI | `--vapor-scale-factor` · `--vapor-radius-factor` | 2 | dimensions / radius |
| **Mantine** | `--mantine-scale` | **1** | spacing · radius · type size, **all of it** |
| **Radix Themes** | `--scaling` · `--radius-factor` | 2 | dimensions and type / radius |
| **shadcn/ui** | `--radius` (a base value) | 1 | radius only |

**They part on two axes.**

1. **Whether the factor is single or the radius is separated** — Mantine has one, Vapor and
   Radix separate them.
   Separating the radius lets the brand tone (square ↔ round) change independently of the
   spacing
2. **Whether the variable is the multiplier or the base value** — Vapor, Mantine and Radix use
   the multiplier (`* var(--f)`), and shadcn/ui multiplies a base value (`--radius: 10px`) by
   constant factors

Radix Themes even fixes the exposed values — `--scaling` is `90% · 95% · 100% · 105% · 110%`
and `--radius-factor` is `0 · 0.75 · 1 · 1.5`. **`0` can kill every radius.**

It contrasts with Cloudscape solving the same purpose with **two token sets**
(`scaled`/`static`) — twice the distribution, with no runtime `calc()` dependency.

**The cost of the `calc()` approach:** reading the token file alone does not give the final
px.
The Vapor, Mantine and Radix tables in this corpus all **assume a factor of 1 (100%).**

## Naming schemes

| system | scheme | what it calls 16px |
|--------|------|------------------|
| Carbon | ordinal | `spacing-05` |
| GOV.UK | ordinal | `govuk-spacing(4)` |
| Polaris | a number in 4px multiples | `space-400` |
| Spectrum | an uneven number | `spacing-300` |
| Paste | a number in tens | `space-50` |
| Canvas | a number, rem × 200 | `base-size-200` |
| Codex | a number, rem × 100 | `size-100` |
| Vapor | a number, rem × 12.5 | `dimension-200` |
| Primer | the real px | the key `16` |
| Fluent 2 | t-shirt plus an axis | `spacingHorizontalL` |
| Ant Design | t-shirt | `size` / `sizeMS` |
| Cloudscape | t-shirt × two families | `space-scaled-m` / `space-static-m` |
| Backpack | t-shirt | `SPACING_BASE` |
| Atlassian | a number in 8px multiples | `space.200` |
| **Mantine** | **t-shirt** | **`--mantine-spacing-md`** |
| **Radix Themes** | **ordinal** | **`--space-4`** |
| **Tailwind** | **the multiplier itself** | **`p-4` (= base × 4)** |
| **shadcn/ui** | inherited from Tailwind | `p-4` |

**The same 16px is called 16 different things.** The numeric schemes alone come to six, on
entirely different bases.

| system | 16px's number | what the number means |
|--------|:---:|------|
| Primer | 16 | px as-is |
| Paste | 50 | arbitrary tens |
| Codex | 100 | rem × 100 |
| Vapor | 200 | rem × 12.5 |
| Canvas | 200 | rem × 200 |
| Spectrum | 300 | uneven |
| Polaris | 400 | multiples of a 4px unit |
| Atlassian | 200 | multiples of an 8px unit |
| **Radix Themes** | **4** | **an ordinal (from 1)** |
| **Tailwind** | **4** | **the multiplier of the base (4px)** |

**This is where accidents are likeliest when referring to several systems at once.**
`400` is 16px in Polaris, 32px in Vapor and 32px in Atlassian.

**`4` has two meanings.** Radix Themes' `--space-4` is **the fourth step** (16px) and
Tailwind's `p-4` is **base × 4** (16px). They coincide by accident, but
`--space-5` is 24px while `p-5` is 20px.

| token | Radix Themes | Tailwind |
|------|:---:|:---:|
| `4` | 16px | 16px |
| `5` | **24px** | **20px** |
| `6` | **32px** | **24px** |
| `7` | **40px** | **28px** |

**They diverge from the fifth step.** An easy place to slip in a project using both.

## Radius

| px | Polaris | Fluent | Ant | Cloud | Spectr | M3 | Paste | Vapor | Atlas | Gestalt | Helios | **Tailw** | **shadcn** | **Mant** | **Radix** |
|----|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0 | O | O | | | O | O | O | O | | O | | | | | O |
| 2 | O | O | | | | | O | O | O | | | O | | O | |
| 3 | | | | O | O | | | | | | **O** | | | | **O** |
| 4 | O | O | | O | O | O | O | O | O | O | | O | | O | O |
| 5 | | | | | O | | | | | | **O** | | | | |
| 6 | O | O | **O** | | O | | | O | O | | O | O | O | | O |
| 7 | | | | | O | | | | | | | | | | |
| 8 | O | O | | O | O | O | O | O | O | O | O | O | O | O | O |
| 9 | | | | | O | | | | | | | | | | |
| 10 | | | | | O | | | | | | | | **O** | | |
| 12 | O | O | | O | | O | O | O | O | O | | O | | | O |
| 14 | | | | | | | | | | | | | **O** | | |
| 16 | O | O | | O | O | O | O | O | O | O | | O | | O | O |
| 18 | | | | | | | | | | | | | **O** | | |
| 20 | O | | | O | | O | O | O | | O | | | | | |
| 22 | | | | | | | | | | | | | **O** | | |
| 24 | | O | | | | | O | O | | O | | O | | | |
| 26 | | | | | | | | | | | | | **O** | | |
| 28 | | | | | | O | O | | | O | | | | | |
| 30 | O | | | | | | | | | | | | | | |
| 32 | | O | | | | O | O | O | | O | | O | | O | |
| 40 | | O | | | | | | O | | | | | | | |
| 48 | | | | | | O | | | | | | | | | |

Carbon · Primer · GOV.UK · Backpack · Codex · Canvas are unverified.

- **4 / 8 / 16 are effectively universal.** Of the four new systems, **Tailwind, Mantine and
  Radix Themes all have them**, and only shadcn/ui does not (its factors off a 10px base give
  6/8/10/14/18/22/26, so 4 and 16 drop out)
- **8px is in all 15** (excluding Ant). The strongest value in radius
- **Radix Themes has a 3px.** With Helios, Cloudscape and Spectrum that makes four.
  Its `--radius-1` is `calc(3px * …)`
- **Only shadcn/ui has 14, 18, 22 and 26px.** The result of a 10px base × factors of 1.4, 1.8,
  2.2 and 2.6.
  Where other systems follow a 4px grid with 12, 16, 20 and 24, **a 2px odd grid** goes in
- **Mantine is a pure doubling, 2 · 4 · 8 · 16 · 32.** Unique in the sample.
  It has no 6, 12, 20 or 24 at all
- **Helios (HashiCorp) has only four steps, 3, 5, 6 and 8px**, all of them 8px or below.
  A rare case of odd radii along with Spectrum, and with no large radius at all
- **Gestalt gives spacing and radius the same 4px rhythm** (0 · 4 · 8 · 12 · 16 · 20 · 24 ·
  28 · 32)
- **Ant Design's radius is a single value (6px).** There is no scale at all
- **Spectrum provides 3–10px in 1px units.** The most finely divided
- **Material 3 goes large** — 28, 32 and 48px. The opposite axis from Carbon (which aims at a
  radius of 0)
- **Cloudscape exposes per-component values with no general scale**
- **Tailwind fits a 4px grid exactly** — 2 · 4 · 6 · 8 · 12 · 16 · 24 · 32.
  shadcn/ui overrides it and breaks the grid

### The eight radius steps — Tailwind and shadcn/ui use different values for the same step names

**The only case in the sample of two naming systems overlapping in one project.**
shadcn/ui sits on top of Tailwind and redefines `--radius-*`.

| step | Tailwind | shadcn/ui | difference |
|------|:---:|:---:|:---:|
| `xs` | 2 | — | removed |
| `sm` | 4 | **6** | +2 |
| `md` | 6 | **8** | +2 |
| `lg` | 8 | **10** | +2 |
| `xl` | 12 | **14** | +2 |
| `2xl` | 16 | **18** | +2 |
| `3xl` | 24 | **22** | **-2** |
| `4xl` | 32 | **26** | **-6** |

**`rounded-lg` is 8px in a Tailwind project and 10px in a shadcn/ui project.**
The class name is the same, so the code alone does not tell them apart.

The sign flips at `3xl` and `4xl` — shadcn/ui's factors are linear and cannot keep up with
Tailwind's accelerating scale (16→24→32).

### How "a complete circle" is expressed — four ways

| method | systems | value |
|------|--------|-----|
| a large constant | Polaris · Atlassian | `9999px` |
| a large constant | Nord (`pill`) | `999px` |
| a large constant | Fluent 2 | `10000px` |
| a ratio | Spectrum | `0.5` |
| a ratio | Paste (`circle`) · Gestalt · Nord | `50%` |
| a fixed px | Paste (`pill`) | `100px` |
| **a fixed px (small)** | **Lightning (`PILL`)** | **`15rem` = 240px** |
| **a container-query unit** | **Material 3** (web) | **`50cqmin`** |
| a large constant | **Material 3** (Figma) | **`1000px`** |
| **a partial ratio** | **Atlassian (`radius.tile`)** | **`25%`** |

**Lightning's 240px is the smallest in the sample.** An element larger than 240px will not
become a complete pill. It gives a materially different result from the 9999px family.

**Material 3's value differs by source** — the Figma kit says `1000px` and the web package
`50cqmin`. The same concept expressed as a large constant by the design tool and as a
container-query unit by the implementation.
The other nine radius steps match exactly between the two sources.

`50cqmin` is the only use of a modern CSS unit.
Only Paste **distinguishes `pill` from `circle` as separate tokens.**

Atlassian's `radius.tile: 25%` is **a partial ratio radius** rather than a circle. Unique in
the sample.

Nord holds the unique case at the other extreme — **there is no radius of exactly 0**, and its
squarest value is `0.02em`. A minute radius proportional to the type size, so the corners
round very slightly as the text grows.

## Border width

| system | values | naming |
|--------|-----|------|
| Primer | 1 / 2 / 4px | by size (`thin` · `thick` · `thicker`) |
| Polaris | **0.66** / 1 / 2 / 4px | numeric |
| Spectrum | 1 / 2 / 4px | numeric |
| Ant Design | 1px (a seed) | — |
| **Atlassian** | 1 / 2px | **by state** (`width` · `width.selected` · `width.focused`) |

**1 / 2 / 4px are universal.** Polaris's 0.66px is a sub-pixel hairline, and unique.

**Only Atlassian names border widths by state.** `selected` and `focused` hold the same value
(2px) in separate tokens, so the two states can be changed apart later.
In contrast to Primer naming by size (`thin`/`thick`).

## Typography — the full scales of the two mobile operating systems

The full scales of Apple's HIG and Material 3 have been obtained. They are **the only two
systems in the sample with every step confirmed.**

| Apple (SF Pro) | size | tracking | | Material 3 (Roboto) | size | tracking |
|---|:---:|:---:|---|---|:---:|:---:|
| Large Title | 34 | +0.40 | | Display Large | 57 | -0.25 |
| Title 1 | 28 | +0.38 | | Display Medium | 45 | 0 |
| Title 2 | 22 | -0.26 | | Display Small | 36 | 0 |
| Title 3 | 20 | -0.45 | | Headline Large | 32 | 0 |
| Headline | 17 | -0.43 | | Headline Medium | 28 | 0 |
| Body | 17 | -0.43 | | Headline Small | 24 | 0 |
| Callout | 16 | -0.31 | | Title Large | 22 | 0 |
| Subheadline | 15 | -0.23 | | Title Medium | 16 | +0.15 |
| Footnote | 13 | -0.08 | | Body Large | 16 | +0.50 |
| Caption 1 | 12 | 0 | | Body Medium | 14 | +0.25 |
| Caption 2 | 11 | +0.06 | | Label Small | 11 | +0.50 |

### The tracking traces opposite curves

| | large text | middle | small text |
|---|:---:|:---:|:---:|
| **Apple** | **positive** (+0.40) | negative (-0.45) | **positive** (+0.06) |
| **Material 3** | negative / 0 (-0.25) | 0 | **positive** (+0.50) |

**Apple's is a U and Material 3's monotonically increasing.**
On large text Apple opens it up and Material tightens it — head-on opposites.
They meet in the positive only on small text, where Material's (+0.50) is eight times
Apple's (+0.06).

**Unifying tracking on a single value across platforms puts both out.**
There is no way other than splitting by platform.

### Material 3 decides tracking by role rather than by size

The same 14px differs by family — Title 0.10 · Body 0.25 · Label 0.10.
In Apple, the same size means the same tracking (Headline and Body are both 17px / -0.43).

### Line height — only Apple provides variants

Apple keeps **Tight / default / Loose** at each size.
Loose is **the default +2px** across every style, without exception.
Apple is the only system in the sample to keep line-height variants as tokens.

### Emphasis weight — only Material 3 keeps pairs

Every style has a `Weight` and a `Weight-emphasized`, raising it one step:
Regular→Medium, Medium→SemiBold.

Apple defines the Regular / Emphasized / Italic / Emphasized Italic combinations as
**separate styles** (102 in all).

## Default body size

| system | body default |
|--------|:---:|
| **Apple HIG** (Body) | **17px** |
| Canvas · Paste · Material 3 (Body Large) · **Tailwind** (`text-base`) · **Radix Themes** (`font-size-3`) · **Mantine** (`md`) | 16px |
| **Ant Design · Material 3 (Body Medium) · Helios · Atlassian · shadcn/ui** | **14px** |

**The four new systems part into two camps.** Tailwind, Radix Themes and Mantine have a 16px
default token, while
**shadcn/ui uses `text-sm` (14px) in its components** — Button, Input, Select and Table alike.
The token default (16) and the value actually used in the components (14) differ.

**Atlassian's `font.body.[default]` is 14px** — `[default]` is driven into the token name, so
that 14 is the default is explicit.

Only shadcn/ui's Input is an exception, at **16 on mobile and 14 on the desktop**
(`text-base md:text-sm`).

**Only Apple uses 17px.** Neither 16 nor 14, and out of step with web convention.
That is why a body size must not be carried straight across when porting an iOS mock-up to the
web.

Material 3 keeps both `Body Large` (16) and `Body Medium` (14), leaving which is the default
to the consumer.

## Special axes

Concepts only some systems have, beyond the raw scales.
**What matters is knowing that such an axis exists when you need it.**

| axis | systems holding it | contents |
|----|------------|------|
| **a platform branch** | **Spectrum** | separate desktop/mobile values per token (`sets`) |
| responsive spacing | GOV.UK | per-breakpoint values embedded in the token |
| **fluid typography (`clamp()`)** | **Pajamas** | heading sizes varying with the viewport. A `-fixed` variant pair |
| composite type tokens | Pajamas | margin and colour in one token, not only size and line height |
| unnamed array tokens | Evergreen | `radii[0]`, `radii[1]` — referred to by index alone |
| Tailwind output | Pajamas | a Tailwind config generated from the tokens |
| density response (token duplication) | Cloudscape | `scaled` (shrinking) vs `static` (fixed) |
| density response (a runtime factor) | Vapor UI | everything adjusted by a single `--vapor-scale-factor` |
| axis separation | Fluent 2 · **Lightning** | separate horizontal and vertical spacing tokens |
| **a separate control size scale** | **Orbit** | a five-step `size` scale apart from spacing (16–52px) |
| ten colour steps by state | Orbit | `normal`/`Active`/`Hover` × lightness, per colour |
| a separate alpha colour family | Seed Design | `gray` / `gray-alpha-*` |
| negative spacing | Primer · **Atlassian** | Primer -2 to -48px · Atlassian -2 to -32px |
| semantic aliases | Polaris · Cloudscape · Backpack · **Gestalt** | `space-card-padding` and the like |
| **multi-value radii** | **Gestalt** | tokenising four-corner combinations such as `0 50% 50% 0` |
| **border width by state** | **Atlassian** | `width.selected` · `width.focused` |
| an opacity scale | Gestalt | `--opacity-0` to `-500` |
| tracking tokens | Backpack | letter-spacing as independent tokens |
| multi-brand | Paste | per-brand themes such as SendGrid |
| cross-platform tokens | Paste · Material 3 | iOS and Android tokens shipped together |
| the viewport inside the scale | Codex | breakpoints as `size-viewport-*` |
| **cursor tokens** | **Radix Themes** | nine, `--cursor-button`, `--cursor-link` and the rest |
| **component motion tokens** | **Atlassian** | 68 composite objects such as `motion.modal.enter` |
| **perspective tokens** | **Tailwind** | five steps, `dramatic` 100 to `distant` 1200px |
| **theme axis combinations** | **Radix Themes** | 26 accents × 5 greys × 5 densities × 5 radii × 2 panels |
| **height = a spacing token** | **Radix Themes** | button heights are `--space-5`–`8` |
| **per-language typeface tokens** | **shadcn/ui** | `--font-ar` · `--font-he` |
| **100 chart-specific tokens** | **Atlassian** | 16 `categorical` colours + 6 per colour + 4 per state |
| **a P3 alternative palette** | **Radix Themes** | wide-gamut colours redefined behind `@supports` (1,579 occurrences) |
| **12 alpha steps on every colour** | **Radix Themes** | 12 opaque + 12 alpha = 24 per colour |
| **OKLCH-only colour** | **shadcn/ui** | every colour token in `oklch()` |
| **an `UNSAFE`-prefixed token** | **Atlassian** | `utility.UNSAFE.transparent` |

**Density support is solved two ways.**
Cloudscape makes two sets of tokens and has the choice made at design time, while
Vapor UI, Mantine and Radix Themes adjust at runtime with a factor variable.
The former is explicit about which spacing may shrink; the latter shrinks everything
uniformly.

**The runtime factor is the more common in the sample** (four against one). For the detailed
comparison see "the runtime factor — grown to four systems" above.

## Mobile — touch targets

The only mobile operating systems in the sample are **Material 3** and **Apple HIG (iOS
26).**

| system | value | note |
|--------|:---:|------|
| Material 3 | 48dp | a single minimum |
| **Apple — the top toolbar** | **44pt** | |
| **Apple — the bottom toolbar** | **48pt** | the thumb's reach |

**Apple sets a different touch target by position on screen.**
The same symbol button is 44pt at the top and 48pt at the bottom.
This is where it parts from Material's single minimum, and Apple is the only system in the
sample to split by position.

**Automotive is overwhelmingly larger** — Android Automotive's 64dp is 1.33× mobile's (48dp).
CarPlay, also automotive, is 44pt, **a 1.45× difference between the two automotive
platforms.**

**At the bottom the two mobile operating systems agree on 48.** For a cross-platform app it is
safe to take 48 as the basis and allow 44 only in the iOS top toolbar.

### Tracking — the two operating systems are opposites

| system | large headings | body level |
|--------|:---:|:---:|
| Apple HIG | Large Title 34px → **+0.40** | Headline 17px → **-0.43** |
| Material 3 | Headline 24 and 32px → **0** | Body Medium 14px → **+0.25** |

**Apple opens up large text and tightens small text. Material 3 does the reverse.**
They answered the same problem (legibility by size) in exactly opposite ways.

Unifying tracking on a single value across platforms **puts both out.**
Either split by platform, or adopt one convention and document the reason.

### Even within Apple the values differ by platform

iOS 26 and visionOS use the same SF Pro and the same style names.

| style | iOS 26 | visionOS |
|--------|:---:|:---:|
| Title 2 | 22 / 28 · tracking **-0.26** | 22 / 28 · tracking **0** |
| Title 3 | **20** / 25 · tracking **-0.45** | **19** / 24 · tracking **0** |
| default weight | Regular (400) | **Bold (700)** |

**"The Apple design system" cannot be treated as one thing.**
visionOS sets every tracking to 0 and even differs by 1px in size at Title 3.

### The state set depends on the input method

| platform | Hover | grounds |
|--------|:---:|---|
| `web` | yes | a mouse |
| `mobile` | ✗ | touch has no hover stage |
| **`spatial`** | **yes** | **gaze** |

**visionOS has a Hover state despite having no mouse.** Because gaze points at the target,
a pre-tap stage exists. Porting a touch-only component across leaves that state empty.

visionOS even names its default state `Idle (No Platter)` — the platter is the glass panel
laid behind a control, meaning **the background is optional.**

### Systems with no spacing tokens — now four

| system | platform | what it has |
|--------|--------|---------|
| Apple HIG | `mobile` | typography, colour, materials, sheet radii |
| Material 3 | `[web, mobile]` | typography, colour, radius |
| Seed Design | `[web, mobile]` | typography and colour only |
| **Evergreen** | **`web`** | typography, colour, radius |

| **shadcn/ui** | **`web`** | colour and radius (the spacing comes from Tailwind) |

**Evergreen is purely `web` and still has no spacing.**
The initial reading that it is "a property of mobile operating systems" does not hold.

**shadcn/ui's absence is of a different character** — it is not that it declines to have
spacing but that **it does not redefine what it takes from Tailwind.**
Not "there is no scale", as in Evergreen, but "it is inherited".

### Neither mobile operating system tokenises spacing

The result of checking the whole variable export.

| system | spacing tokens |
|--------|---|
| Apple HIG | **none** — specified directly on the component frames |
| Material 3 | **none** — the 4dp grid is a documentation concept only |

Twenty-seven of the 30 web systems keep spacing as tokens —
the exceptions are Evergreen (none) · shadcn/ui (inherited from Tailwind) · Seed Design
(none).
An empirical case of `platform` dividing the token structure — see `../platforms.md` for
details.

One reading is that on mobile the component specs (touch targets, toolbar heights) decide the
spacing, so an independent scale is unnecessary, but **neither source gives that rationale.**

In practice it comes to this — **do not expect a spacing scale from an iOS or Android
mock-up.**
Take the measured component dimensions as the basis instead.

### Constraint axes that exist only on automotive platforms

Adding Android Automotive and CarPlay brings out **a kind of specification absent from the
other 32 systems.**

| axis | Android Automotive | CarPlay |
|----|---|---|
| minimum type | **24sp** | unverified |
| gap between targets | **24dp** (a spec) | unverified |
| response time | buttons 2s · execution/loading 10s | unverified |
| task steps | **five screens or fewer** | enforced by the templates |
| information per screen | 5 map annotations · 3 legend entries | Grid 8 · POI 12 · Tab 5 |
| blocking while driving | **blocked by the platform at runtime** | unverified |

**A 24sp minimum type is larger than other systems' maximum body size.**
Apple iOS's Body is 17pt and most web systems 14–16px, and automotive cannot go below that.

**Only automotive standardises time and task steps.** In other systems time is the province of
motion tokens, and "how fast must it be?" is not in any spec.

**CarPlay is template-based.** The developer does not compose a layout but puts content into
one of 11 templates Apple has fixed. The count limits are enforced by the API.
The only system in the sample to provide finished screen templates.

**Neither automotive system has tokens of its own** — they inherit Material 3 and iOS and add
only specifications.

### Materials — an axis only Apple has

iOS 26's `Liquid Glass` keeps **seven optical parameters** as tokens: refraction 100 ·
dispersion 0 · lighting angle -45 · frost 7 · depth 16 · splay 6 · opacity 60.

Other systems handle that slot with `shadow` or `elevation` at most.
**It is a concept at a different layer and cannot go into a comparison table.**
Worth referring to when trying to imitate the iOS native feel on the web.

## Implementation defaults

Recommendations against **a spacing sample of 24.**

**Spacing** — there is only one value without exceptions, but the practical default still
starts from the core.
```
4, 8, 12, 16, 24, 32
```

| value | adoption | judgement |
|----|:---:|------|
| **16px** | **28/29** | only Garden lacks it. Effectively required |
| 4 and 8px | 28/29 | only Mantine lacks them. Effectively required |
| 24px | 27/29 | Mantine · Garden |
| 32px | 27/29 | Nord · Bootstrap |
| 12px | 20/23 | between 8 and 16. Genuinely inconvenient without it |
| 48px | 18/23 | when layout spacing is handled by the spacing scale |
| 40px | 18/23 | as above |
| 2px | 17/23 | adjustment next to icons and borders |
| 20px | 17/23 | between 16 and 24 |
| 6px | 9/23 | under half. Only when genuinely needed |

**Starting with the six steps `4, 8, 12, 16, 24, 32` is recommended.**

Do not make 20 steps from the outset. Going dense in 2px units, as Canvas and Base Web do,
costs a judgement at every decision. Reducing to five steps as Mantine does, conversely,
removes the fine-adjustment slots such as `4` and `8` — **if you are reducing, decide the
minimum first.**

**Two answers to reducing the step count:**

| | minimum | scale | what was given up |
|---|:---:|--------|-----------|
| Protocol | 4px | `4 · 8 · 16 · 24 · 32 · 48` | the middle values in the 10–20px band |
| Mantine | 10px | `10 · 12 · 16 · 20 · 32` | 4 and 8px fine adjustment |

**If you use the Tailwind approach (one base plus multiplication), know the cost.** The scale
becomes infinite, so the judgement of "which value" does not disappear and
**there is no list to carry into a design tool.**
To export to Figma Variables you have to pick and enumerate the steps you use.

**Radius**
```
0, 4, 8, 16
```
plus one expression of a circle. Add 12, 20 and 24 when the need arises. (A sample of 15.)
If the brand tone is round, extend to 28 and 32 as Material 3 does.

**8px is the strongest in radius** — present in all 15 but Ant.

**Multiplying a single `--radius` by factors (shadcn/ui) breaks the grid.**
A 10px base gives 6/8/10/14/18/22/26, which leaves the 4px grid.
To keep spacing and radius on the same grid, enumerate the values directly.

**Mantine's pure doubling (2/4/8/16/32) has no 12, 20 or 24.**
The gap between 8 and 16 around `rounded-lg` is genuinely inconvenient.

**Borders**
```
1, 2, 4
```

**The focus ring** — 2px is the majority in the sample and **only shadcn/ui is 3px.**
Atlassian keeps `border.width.focused` as a separate 2px token.
Decide at the same time whether the ring sits against the element (shadcn/ui) or takes an
offset.

**Naming** — settle it by the team's situation.
- For a team that talks in px, **the real px value** (Primer). The least misunderstood
- If a rescale or rebrand is planned, **ordinals** (Carbon · GOV.UK · Radix Themes) or
  **derivation from a seed** (Ant Design)
- If the steps stay at eight or fewer, **t-shirt sizes** (Fluent · Backpack · Mantine)
- **If you use a numeric scheme, state the basis in the documentation.** Six different bases
  appeared in the sample alone
- **Do not mix `--space-4` (an ordinal) with `p-4` (a multiplier).** They coincide by accident
  to the fourth step and part from the fifth (Radix 24 vs Tailwind 20)

Once settled it is very expensive to reverse. Fix it **before** starting token work.

**If you plan to support density modes**, decide the method early.
- To make the shrinking differ per spacing → the Cloudscape way (duplicated tokens)
- If everything may shrink uniformly → the Vapor way (a runtime factor). Far simpler

Introducing it later means reclassifying every existing token.

**If you handle mobile too**, look at Spectrum's `sets` structure (a desktop and a mobile
value per token).
It absorbs the platform branch in the tokens rather than in the component implementation.
