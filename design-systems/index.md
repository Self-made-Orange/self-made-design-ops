<!-- lang-links -->
> **English** · [한국어](index.ko.md)
<!-- /lang-links -->

# 100 Design Systems — Index

> **Status labels**
> - **done** — token values verified and an entry written under `systems/`
> - **candidate** — listed only. **URL, existence and licence are all unverified.**
>
> If a term trips you up, see `GLOSSARY.md` — it collects the corpus's shorthand
> ("the seven Liquid Glass parameters", etc.) along with synonyms and false
> friends across systems.
>
> **To see what kind of `unverified` a table cell means, read `UNVERIFIED.md`** —
> every open item is sorted into **A (resolvable now) · B (conditional) ·
> C (structurally impossible)**. C items are findings, not gaps ("this system
> does not publish X").
>
> The candidate pool was taken from `alexpate/awesome-design-systems` and
> restructured; **the ✓npm marks were confirmed against the registry by probe**
> (2026-08-17). ✓gh and candidate marks remain unverified — verify them with the
> `HARVESTING.md` procedure before writing an entry.

**Progress: 100 / 100 done** 🎉 (+ 5 platform extras + 5 added on 2026-08-17
(Audi · Persona · Italia · NYSDS · WMN) + 3 framework extras (Headless UI · Panda ·
vanilla-extract) + **2 documentation-layer samples (LINE · Aurora)** +
**2 added on 2026-08-18 (Rakuten ReX · Fleet)** +
**1 added on 2026-09-03 (Geist)** = **117 in total**)

> **The breakdown above does not sum, noted 2026-08-23 · recounted 2026-09-03.**
> 100 + 5 + 5 + 3 + 2 + 2 + 1 = **118**, against a total of **117**. The total is the
> trustworthy half: `data/systems.json` is generated from the entry files and reports
> `count: 117`, and there are 118 non-`.ko` files in `systems/` because one of them is
> `frr-dashboard.md`, `coverage: internal`, excluded from the public data.
> **Adding Geist moved both numbers by one and left the gap exactly where it was** — the
> off-by-one predates it and is untouched by it. Which line item is off by one is **not
> recorded anywhere and is not guessed here**. Two readings fit: the base is 99 rather
> than 100, or Fleet is already inside the
> 113 public (100 + 5 + 5 + 3) that `TODO.md` counts and is listed twice. Settle it against
> the entry files before quoting the breakdown; quote **117** in the meantime.

## Platform coverage

An axis separating **runtime environment**, independent of `domain` (audience).
Different platforms have different token structures outright — the evidence is
in `platforms.md`.

| Platform | Samples | Systems |
|----------|:---:|---------|
| `web` | **95** | Carbon · Polaris · Primer · Fluent · GOV.UK · Ant · Cloudscape · Backpack · Spectrum · Canvas · Paste · Codex · Vapor · Atlassian · Gestalt · Helios · Protocol · Base Web · Nord · Lightning · EUI · Orbit · Seed · Pajamas · Evergreen · Material 3 · Tailwind · shadcn/ui · Mantine · Radix Themes · Chakra UI · Open Props · Bootstrap · **USWDS · KRDS · Garden · Blueprint · Porsche · Thumbprint · Forma 36 · Cedar · Auro · Astro UXDS · SGDS · Semi · Digital Agency · TDS (Toss) · SmartHR · Charcoal · Spindle · Serendie · Grommet · Vibe · Ring UI · Stacks · Mística · Siemens iX · Vanilla · Strapi · Vibes (freee) · Vuetify · Naive UI · PrimeVue · Skeleton · Shoelace · NASA WDS · DSFR · Odyssey · PIE · Vitamin · Braid · Kaizen · Clarity · LeafyGreen · Solid (BuzzFeed) · Pharos · Artsy Palette · Tegel (Scania) · Priceline · Welcome UI · Intergalactic · NHS · Asphalt (Gojek) · Unify (Tokopedia) · Pluralsight · eBay Skin · Origami (FT) · Bolt · HSDS · MUI · HeroUI · Park UI · Ark UI · Kontur** |
| `mobile` | 1 | Apple HIG (iOS 26) — Yoga, TDS and the like are `[web, mobile]` and count under web |
| `spatial` | **1** | visionOS |
| **`desktop`** | **1** | **macOS 26** |
| **`wearable`** | **2** | **Wear OS** (Google) · **Tizen CircularUI** (Samsung) |
| **`tv`** | **2** | **Android TV** (Google) · **tvOS** (Apple) |
| **`automotive`** | **2** | **Android Automotive · CarPlay** |

**Counts follow the first value of the `platform` array** (the primary platform).
Seven entries carry more than one value — Fluent 2 `[web, desktop, mobile]` ·
Material 3 · Lightning · Paste · Backpack · Seed · TDS · Yoga · Unify `[web, mobile]`.
**The `desktop` axis opened with macOS 26** — its controls at 24/36pt are half the
coordinate system of the same company's mobile platform (44/48pt), and its state
vocabulary says `Clicked` (`systems/macos.md`).

**The automotive axis is filled.** Android Automotive (64dp touch targets · 24sp
minimum font · a five-screen task limit · a two-second response requirement) and
CarPlay (template-based, with counts enforced by the API). The two platforms differ
by a factor of **1.45× on touch target size**.

**All seven platform axes now have samples, and wearable and tv have been compared
across vendors** — wearable holds Google (percentage margins) against Samsung
(an inscribed square), tv holds Google (844dp) against Apple (860pt, converged
independently), two samples each. Only the watchOS kit is on hold, for lack of a
public link. **Tesla OS has no public design system** — screenshots exist, but no
tokens or specifications are published.

## `full` harvest — deep (20)

Frequently referenced, with documentation and tokens detailed enough to record
per-component variants, states and dimensions.

| # | System | Organisation | Status | Notes |
|---|--------|--------------|--------|-------|
| 1 | Carbon | IBM | **done** | Spacing and type confirmed. Colour and radius unverified |
| 2 | Polaris | Shopify | **done** | Spacing, radius and border confirmed. Type and colour unverified |
| 3 | Primer | GitHub | **done** | Sizes and borders confirmed. Type, colour and radius unverified |
| 4 | Fluent 2 | Microsoft | **done** | Spacing and radius confirmed. Type and colour unverified |
| 5 | Ant Design | Ant Group | **done** | Seed-derived spacing, radius and base font confirmed. Colour unverified |
| 6 | Human Interface Guidelines (iOS 26) | Apple | **done** | Full variable export. 11 type steps · 3 line-height sets · 13 Liquid Glass materials · 79 colours. **Confirmed to have no spacing scale** |
| 7 | Spectrum | Adobe | **done** | Spacing, radius and border confirmed. Desktop/mobile set structure |
| 8 | Atlassian Design System | Atlassian | **done** | Spacing, negatives, radius, border, **type, 466 colours and 68 motion tokens** confirmed. Components unverified |
| 9 | Cloudscape | AWS | **done** | Dual scale and semantic radius confirmed. Type and colour unverified |
| 10 | Lightning Design System | Salesforce | **done** | Axis-split spacing · three radius steps · iOS tokens. PILL = 240px |
| 11 | Base Web | Uber | **done** | Written at `partial` depth. 22 steps in 2px units. Tokens live inside `baseui` |
| 12 | Material Design 3 | Google | **done** | Full variable export. 15 type steps · 10 radius steps · 32 themes. **Confirmed to have no spacing scale** |
| 13 | Paste | Twilio | **done** | Spacing, radius and type confirmed. Arithmetic scale |
| 14 | Canvas | Workday | **done** | Written at `partial` depth. Dense scale in 2px units |
| 15 | Garden | Zendesk | **done** | **No 16 or 24 in spacing** — multipliers 1·2·3·5·8·10·12. The system that broke the last unbroken value |
| 16 | Gestalt | Pinterest | **done** | Written at `partial` depth. 4px arithmetic, multi-value radius |
| 17 | Orbit | Kiwi.com | **done** | Separate scales for spacing, radius and control size |
| 18 | Backpack | Skyscanner | **done** | Written at `partial` depth. Spacing and letter-spacing confirmed |
| 19 | GOV.UK Design System | UK Government | **done** | 5px base and responsive spacing confirmed. The rest unverified |
| 20 | USWDS | US Government | **done** | 8px base. Breakpoints derived from spacing. Negative −120px. `ex` measure |

Backpack (18) belongs to the `full` harvest but is currently written only at
`partial` depth. It has no per-component table, so it needs an upgrade to grade A
once the documentation site becomes reachable.

### `full` harvest — framework line (extra)

The list of 100 was drawn up around **design systems a company built for its own
product**. The entries below are **frameworks and component libraries** with no
product behind them, and are marked `domain: framework` (`SCHEMA.md`). They sit
outside the numbering.

**By reference frequency these outrank the 20 above.** Building UI in practice,
people open Tailwind or shadcn/ui long before Carbon or Spectrum — so their absence
was the corpus's largest blind spot.

| System | Organisation | Depth | Status |
|--------|--------------|:---:|--------|
| **Tailwind CSS** | Tailwind Labs | A | **done** — the only case that does not enumerate spacing. 286 colours |
| **shadcn/ui** | shadcn | A | **done** — distributed as copied source. OKLCH throughout. 61 components + dimension tables |
| **Radix Themes** | WorkOS | A | **done** — five theme axes, 6,500 combinations. Cursor tokens. 50 components |
| **Mantine** | open source | B | **done** — radius doubles cleanly. 101 components |
| **Chakra UI** | open source | B | **done** — 18 token families. 13 z-index steps · cursors · golden ratio |
| **Open Props** | Adam Argyle | B | **done** — 603 CSS variables. 113 easings · fluid spacing · a `ch` family |
| **Bootstrap** | open source | B | **done** — 17 `$enable-*` build flags. No 32px |
| **Vuetify** | open source | B | **done** — **the first Vue sample**. `$spacer` is 4px (same name as Bootstrap's, different value) |
| **Naive UI** | open source | B | **done** — neutrals composed from an alpha table. strong = 500. Green primary |
| **PrimeVue** | PrimeTek | B | **done** — DTCG alias strings resolved into JS values. Preset themes |
| **Skeleton** | Skeleton Labs | B | **done** — **the first Svelte sample**. 24 themes own the structural values |
| **Shoelace** | Font Awesome | B | **done** — spacing missing 24 and 32 at once. Web Components |

**There are dependencies here.** shadcn/ui layers a semantic tier over Tailwind's
tokens and uses Radix Primitives underneath. Radix Themes is an independent style
layer over the same primitives — so **Radix Themes and shadcn/ui are siblings**,
not one on top of the other.

Remaining candidates: MUI (Material UI) · Ark UI · Park UI · Headless UI · HeroUI ·
Panda CSS · Vanilla Extract. **The Vue/Svelte gap is closed** (Vuetify · Naive UI ·
PrimeVue · Skeleton are done).

## `partial` harvest — medium (80)

Token values, component lists, distinctive decisions and accessibility. Per-component
detail tables are omitted.

> **The candidate pool was rebuilt (2026-08-17).** The previous list was drawn from
> background knowledge and was unverified. The current list comes from
> `alexpate/awesome-design-systems` (161 parsed, 113 with a GitHub source column) and
> **records an actual probe of npm for existence**.
>
> | Mark | Meaning |
> |------|---------|
> | **done** | an entry is written under `systems/` |
> | **✓npm** | package existence confirmed against the registry — harvestable now |
> | ✓gh | GitHub repository only — possibly harvestable from raw |
> | candidate | URL only. Unverified |
>
> **Cultural priority: Anglosphere → Korea → Southeast Asia and Greater China →
> Japan** (as a harvesting order). The kit aims for what is common across all of
> them first, and each culture's specifics after.

### Anglosphere and Europe — enterprise / SaaS (21–40)

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 21 | Pajamas | GitLab | **done** — fluid type via `clamp()`. Fluid/fixed pairs |
| 22 | EUI | Elastic | **done** — `base` placed mid-scale. JSDoc in `.d.ts` is the source |
| 23 | Helios | HashiCorp | **done** — radius 3·5·6·8px |
| 24 | Evergreen | Segment | **done** — unnamed array tokens. No spacing |
| 25 | Codex | Wikimedia | **done** — one scale for spacing and widths together |
| 26 | Protocol | Mozilla | **done** — a minimal six-step scale |
| 27 | Nord | Nordhealth | **done** — the only healthcare domain |
| 28 | Blueprint | Palantir | **done** — 10px grid. Default control 30px. Line height 1.28581 |
| 29 | Grommet | HPE | **done** — everything derived from a single seed (24). The largest body size in the corpus at 18px. Measure = size × 24 |
| 30 | Vibe | monday.com | **done** — duplicate values in the scale (10 = 20 = 14px). Multi-script font stack. A hacker theme |
| 31 | Forma 36 | Contentful | **done** — typographic density variants (`-high`). Logarithmic z-index at 10ⁿ |
| 32 | Strapi Design System | Strapi | **done** — assumes a 62.5% rem baseline internally. Nameless spacing array |
| 33 | Ring UI | JetBrains | **done** — triplet pairs across every colour channel. 437 `unit × calc` uses. duration + easing composed |
| 34 | Stacks | Stack Overflow | **done** — the only 13px body sample. Repeating rem decimals from thirteenths |
| 35 | Clarity | VMware | **done** — **a reduced-motion theme file** and a high-contrast forced-colors system palette. Both unique in the corpus |
| 36 | Odyssey | Okta | **done** — spacing in sevenths of a rem (assuming a 14px root). The third rem-baseline mismatch |
| 37 | Intergalactic (Semcore) | Semrush | **done** — an emphasis-only theme (every token a gradient). 773 low-vision warnings in the raw colour comments |
| 38 | Pluralsight DS | Pluralsight | **done** — z-index enumerated as named regions under `layers` (the seventh scheme). Its `skip-to-content` at 1600 matches Chakra's `skipNav` |
| 39 | MongoDB Design (LeafyGreen) | MongoDB | **done** — colour in three dimensions (property × role × state). Spacing numbers = px × 25 |
| 40 | Kontur UI | SKB Kontur | **done** — semantic versions in the theme, with four past versions shipped alongside. Class inheritance chains. The first sample from the Russian sphere |

### Anglosphere and Europe — commerce / consumer (41–54)

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 41 | Vapor UI | goorm | **done** — runtime scaling (Korean, but kept in its original position) |
| 42 | Seed Design | Karrot | **done** — 18 type steps in 1px increments |
| 43 | Skin (eBay Evo) | eBay | **done** — **42 colours reserved for AI features** (a corpus first). iOS/Android size-class vocabulary carried alongside. 0.5px borders |
| 44 | Thumbprint | Thumbtack | **done** — doubling after 32 up to 256. Two ways to say circle (50% / 9999px) |
| 45 | Cedar | REI | **done** — multipliers spelled out in prose, `one-and-a-half-x`. inset squish/stretch |
| 46 | Auro | Alaska Airlines | **done** — three brands over the same 290 keys (the Hawaiian acquisition folded in) |
| 47 | Mística | Telefónica | **done** — 8+ brand skins, the most in the corpus. High contrast built into the ramp. Semantic radius per component |
| 48 | Priceline DS | Priceline | **done** — geometric doubling across the whole spacing range (unique in the corpus). Three radius steps. `em` breakpoints |
| 49 | PIE | Just Eat Takeaway | **done** — alphabetic naming (a–j), unique in the corpus. `a-small` inserted as an exception |
| 50 | Vitamin | Decathlon | **done** — two builds by rem baseline (16px / 10px) — the only real answer to the rem trap |
| 51 | Braid | SEEK | **done** — token values as grid multiples (grid 4). A `lineGap` line-height model. Both unique in the corpus |
| 52 | Kaizen | Culture Amp | **done** — **a 6px grid** (a full departure from the 4·8·16·32 core). `-id` tokens |
| 53 | Welcome UI | WTTJ | **done** — `calc(infinity * 1px)` for pills (unique in the corpus). Numeric and t-shirt naming in parallel |
| 54 | Yoga | Wellhub (Gympass) | **done** — breakpoints bundle width, margin and gutter. 12 t-shirt steps. Three elevation sets, one per platform |

### Anglosphere and Europe — media / content (55–59)

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 55 | Origami | Financial Times | **done** — a scale of size/line-height tuples with negative integer indices. **The line-height model differs per brand** |
| 56 | Photon | Mozilla Firefox | ✓gh `FirefoxUX/photon` |
| 57 | Solid | BuzzFeed | **done** — ordinal 1 = 8px with an inserted `05`. The sixth z-index scheme (and the sixth arithmetic) |
| 58 | Pharos | JSTOR (Ithaka) | **done** — the same prose-multiplier naming as Cedar (with the base fixed at x = 1rem). Weights 400/700 |
| 59 | Palette | Artsy | **done** — five spacing steps in 10px units (no 4, 8 or 16). Type up to 102px |

### Automotive / industrial (60–63)

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 60 | Porsche Design System | Porsche | **done** — `light-dark()` theming. Fluid/static spacing pairs. Motion floor of 250ms |
| 61 | Siemens iX | Siemens | **done** — a negative-exponent scale in ms. Shorthand `font` tokens. Shipped for four frameworks |
| 62 | Audi UI | Audi | **done** — a modular scale whose ratio changes by viewport (1.14 → 1.25). One global easing. Alpha quantised |
| 63 | Scania Digital Design (Tegel) | Scania | **done** — element/layout split 10:10. A `mode-variant` axis (orthogonal to light/dark) |

### Public sector — Anglosphere and Europe (64–72)

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 64 | NASA Web Design System | NASA | **done** — a settings overlay on USWDS. The second aerospace sample, but not comparable to Astro (web vs mission control) |
| 65 | DSFR | Government of France | **done** — the mode pair sits in the token name (`--grey-200-850`). sun/moon vocabulary. The seventh government sample |
| 66 | Italia Design System | Government of Italy | **done** — DTCG format (the only government one). Colour step numbers are measured lightness. The ninth government sample |
| 67 | Aurora | Government of Canada | **done** — **the second documentation-layer sample** (2026-08-18). Measured from the static HTML of design.gccollab.ca — six swatch families, a type scale in pt. The repository is explicitly frozen at 2019-06 (`systems/aurora-gc.md`) |
| 68 | NYSDS | New York State | **done** — percentage spacing names where 8px = 100. A `1776px` radius. An officially published MCP server (the first sample). The tenth government sample |
| 69 | Fleet | City of Boston | **done** (2026-08-18) — measured from the public CSS at patterns.boston.gov (184KB). Fluid type via `calc()` expressions · the radius-0 camp · code under CC0 (`systems/fleet-boston.md`) |
| 70 | WMN Design System | West Midlands Network | **done** — mode of transport as a colour axis (`modal` = bus · metro …). Shipped as task patterns. The first transport-domain sample |
| 71 | Vanilla | Canonical (Ubuntu) | **done** — nudge tokens correcting the baseline. Line heights forced to integer multiples of 8px |
| 72 | NHS design system | NHS (UK) | **done** — **a fork of the GDS code with spacing swapped to 4px** (direct evidence that the 5px base was a standalone choice). Print tokens in pt |

### Korea (73–76) — priority 2

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 73 | **KRDS** | **Government of Korea (NIA)** | **done** — 17px body (the second after Apple). Spacing named after content relationships (`h1-h2`). 10px root |
| 74 | **TDS** | **Toss** | **done** — eight spring-physics presets. An accessibility-scaling remap table. Continuous 11–42px. **Published via the mini-app SDK (`-ait`)** |
| 75 | Kakao Design | Kakao | candidate — no npm package (**rechecked via the search API 2026-08-17**: only SDKs exist) |
| 76 | Naver Design | Naver | candidate — no npm package (**rechecked via the search API 2026-08-17**: egjs is a front-end utility, not a DS) |

> **Correction (2026-08-17).** "Toss has no npm package" was wrong — the probe only
> tried the single name `@toss/tds` and recorded absence, when in fact it ships
> **split across packages**: `@toss/tds-colors` · `-typography` · `-easings` ·
> `-mobile` · `-mobile-ait`. Opening the mini-app (App-in-Toss) SDK is what drove
> publication. Kakao, Naver and LINE need the same recheck (split names, search API).

### Southeast Asia and Greater China (77–81) — priority 3

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 77 | **SGDS** | **Government of Singapore** | **done** — proof of Bootstrap fork lineage. The upstream's 32px hole repaired |
| 78 | **Semi Design** | **ByteDance (Douyin)** | **done** — 70% of tokens are colour. Zero dimension tokens. 14px dominates in practice |
| 79 | Persona | Privy (Indonesia) | **done** — a `milk` ramp step. Letter-spacing in px. Radius 7 and 22px. The second Southeast Asian sample |
| 80 | Asphalt | Gojek | **done** — **the first Southeast Asian sample**. emboss/deboss raised and sunken shadows. A display-only Extended typeface (**correction: an npm package does exist**) |
| 81 | Grab Design | Grab | candidate |

### Japan (82–89) — priority 4

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 82 | **Digital Agency Design System** | **Government of Japan (デジタル庁)** | **done** — eight line heights in pure ratios (the most in the corpus). Weights 400/700. Carries a 17px step |
| 83 | **SmartHR UI** | SmartHR | **done** — spacing in character units. Font sizes generated by a harmonic sequence. Status colours as functions |
| 84 | **Charcoal** | pixiv | **done** — the only paragraph-width token in the corpus. Radius aliased to spacing. Negative steps in the dark ramp |
| 85 | **Spindle** | CyberAgent (Ameba) | **done** — three spacing sets by viewport. The only sample to tokenise View Transitions (`@openameba/spindle-tokens@1.10.0`) |
| 86 | **Vibes** | freee | **done** — two palette generations coexisting. rem encoded in names. The fifth z-index scheme. Version 100 |
| 87 | **Serendie** | Mitsubishi Electric | **done** — two type scales (expanded/compact). elevation = opacity. 240+ chart colours |
| 88 | LINE Design System | LY Corporation | **done** — **a documentation-layer sample** (2026-08-18, the first of its kind in the corpus). Still no npm package (only the typeface), but measured from the official documentation's page-data JSON — ~170 colour hexes · HSV state formulas · 15 spacing steps (`systems/line.md`) |
| 89 | ReX | Rakuten | **done** (2026-08-18) — the documentation site went internal (403, zero Wayback captures), but **36 npm packages (MIT) survive as a source**. Captured its `:lang(en/ja)` line-height branch |

**Priority and source availability run opposite to each other.** Japan is priority 4,
yet it has **six verified npm packages, the most in Asia** (Korea 1 · Southeast Asia
and Greater China 2). **CJK typography specifications** in particular (body size,
line height, letter spacing) are most likely to be captured from Japanese systems
first — which bears directly on the gap noted in `patterns/typography.md`, that no
sample yet has a CJK font slot.

### Other · low priority (90–100)

| # | System | Organisation | Status |
|---|--------|--------------|--------|
| 90 | VTEX Styleguide | VTEX (Brazil) | ✓gh |
| 91 | BLiP | Take (Brazil) | ✓gh |
| 92 | Bold | Bridge/UFSC (Brazil) | ✓gh |
| 93 | Bento | buildo (Italy) | ✓gh |
| 94 | SAP Fundamental | SAP | ✓gh `SAP/fundamental` |
| 95 | Foundation | ZURB | ✓gh `foundation/foundation-sites` |
| 96 | Cloudflare cf-ui | Cloudflare | ✓gh — possibly unmaintained |
| 97 | Pivotal UI | Pivotal | ✓gh — possibly unmaintained |
| 98 | HSDS | Help Scout | **done** — 52 per-component JSON files as the primary token unit. default/newBrand fully duplicated |
| 99 | Rendition | balena | ✓gh |
| 100 | Bolt | Bolt DS (Pega) | **done** — **a non-integer base per axis** (x 1.55 / y 1.35). Entirely unrelated to a 4px grid, unique in the corpus |

### Framework candidates (extra — outside the list of 100)

Shoelace · Vuetify · Naive UI · PrimeVue · Skeleton — **all done** (see the framework
extras table). MUI · Ark UI · Park UI · HeroUI are **done**. ~~Remaining candidates~~
→ **Headless UI · Panda CSS · vanilla-extract done (2026-08-17)** — filling in the
three types: no style layer, enumerated, and contract-based.

### Platform fill-in (extra)

Entries added to fill the platform axis, separate from the list of 100 in `index.md`.

| System | Organisation | Platform | Status |
|--------|--------------|----------|--------|
| visionOS Design Resources | Apple | `spatial` | **done** — two type families, colours and Hover states confirmed |
| **Wear OS** | **Google** | **`wearable`** | **done** — margins specified as percentages · Arc typography · a 20sp scaling ceiling |
| watchOS 26 | Apple | `wearable` | candidate — for cross-comparison with Wear OS |
| **Tizen CircularUI** | **Samsung** | **`wearable`** | **done** — an inscribed-square safe area (against Wear OS's percentages). Bezel rotation input. **The first 3000ms toast in the corpus** |
| **macOS 26** | **Apple** | **`desktop`** | **done** — measured from the Toolbars/Titlebars pages. Controls 24/36 · `Clicked` · Liquid Glass identical to iOS |
| **Android TV** | **Google** | **`tv`** | **done** — a 3m viewing distance · Focused enlarged 1.1× · card widths enumerated by count |
| **tvOS** | **Apple** | **`tv`** | **done** — HIG DocC JSON. Insets 60/80pt. Enumerated grid widths (860pt) converging independently on Android TV's 844dp |
| **Android Automotive OS** | Google | `automotive` | **done** — 64dp · 24sp · time and step limits |
| **Apple CarPlay** | Apple | `automotive` | **done** — 11 templates. No unique numbers verified |

Khan Academy was replaced by Codex (Wikimedia). Vapor UI was not on the original list
but was added as a publicly available Korean system, for sample diversity.

## Sample bias notes

Across the 34 done at the time, the domain distribution was
**enterprise 15 · `framework` 7 · consumer 5 · OS 5 · public sector 2 · commerce 2 ·
healthcare 1**. The platform distribution was `web` 33 · `automotive` 2 · `mobile` 1 ·
`spatial` 1 (by the first value of the `platform` array).

### Four `framework` entries changed the conclusions

Until the framework line went in (Tailwind · shadcn/ui · Mantine · Radix Themes), the
corpus was looking **only at design systems built for a company's own product**.
Adding them overturned three things.

| Previous conclusion | Revision |
|---------------------|----------|
| The spacing core `4/8/16/24` holds **without exception** across 18 samples | **Mantine has no 4, 8 or 24.** The only value without an exception is `16` |
| Runtime scaling (`calc(var(--scale) * N)`) is **Vapor UI alone** | **Four systems** (Mantine · Radix Themes · shadcn/ui added) |
| A semantic tier makes adding a high-contrast theme easy | The three frameworks with a semantic tier **all ship none** |

**By reference frequency these outrank the 20 above.** Building UI in practice, people
open Tailwind or shadcn/ui before Carbon or Spectrum — yet not one of them was in the
corpus by the time it reached 30 entries. **That was the largest bias.**

### The axes frameworks opened up

In an environment where documentation sites are blocked, **a system with published
source carries more information than its tokens do.**

| Axis | Previous evidence | Now |
|------|-------------------|-----|
| Button padding | 2 values from Cloudscape · family names from Ant | **All four shadcn/ui steps plus conditional icon padding** |
| Input field specs | only the `space-field-*` names from Cloudscape | **Height, padding, radius and state colours from 3 systems** |
| Focus ring | 2 radius values | **Thickness, offset and composition across 5 systems** |
| Error state | none | **`aria-invalid` · `--mantine-color-error`** |
| Motion | none | **68 Atlassian tokens** (per component) |

Six documents under `patterns/` (`form` · `motion` · `modal` · `table` · `navigation` ·
`feedback`) became writable because of this — **filled in without any access to a
documentation site.**

The biggest reason is **published component source**. shadcn/ui's `sidebar.tsx` alone
is 21KB and carries width, item height, state persistence (a 7-day cookie) and the
keyboard shortcut (`Cmd+B`). **Comments in the Mantine and Radix Themes source were
evidence too** — the reason for the `border-collapse` × `position: sticky` conflict,
and for the overlay unmount timing trick, is written down in them.

**Reopening Cloudscape yielded something as well.**

| Finding | Detail |
|---------|--------|
| **Contrast ratios as a specification** | The step numbers on its 90 chart colours *are* contrast ratios (`red-500` = 5:1). Unique in the corpus |
| **43 density-axis tokens** | Just as colours have `light`/`dark`, spacing has `comfortable`/`compact` |
| **8 context overrides** | Per-region token exceptions such as `compact-table` (17) and `top-navigation` (182) |
| `space-field-vertical` | 5px / compact 3px — a value that was unverified in `form.md` |

**The conclusion that "none of the 34 specifies a contrast ratio" has been retired.**
Cloudscape does.

### History of sample expansion

| Samples | Result |
|---------|--------|
| 4 | Judged to have a common core of 7 (`2/4/8/12/16/24/32`) |
| 8 | **Overturned.** The core shrank to 5 (`4/8/16/24/32`). GOV.UK killed "common to all" |
| 13 | **Held** |
| 16 | **Held.** Protocol back-verified the core with a minimal scale |
| 18 | **Partly revised.** Nord has no 32px, shrinking the core to `4/8/16/24` |
| **24** | **Broken again.** Mantine has no 4, 8 or 24, leaving **`16` as the only value without an exception** |

(Counted over systems whose spacing scale has been confirmed, which is not the same as
the number of completed entries.)

**Three of six expansions changed a conclusion.**
Only `16px` is without exception; `4/8/24/32` stand at 22 or 23 of the samples.
**Filling the remaining 66 could break `16` too — do not treat the current conclusion
as settled.**

The reading at 16 samples, that "Protocol back-verifies the core with a minimal scale",
has been **retired.** Mantine cut further, to five steps, and of the core kept only `16`
and `32` — so "reduce to the minimum and the core survives" does not hold.

**Systems with no spacing tokens** — there are two kinds, and then a third.

| Kind | Systems |
|------|---------|
| Does not define them | Apple HIG · Material 3 · Seed Design · Evergreen |
| **Inherits them** | **shadcn/ui** (Tailwind's `--spacing`) |
| **Does not enumerate them** | **Tailwind** (one base plus `calc()` multiplication) |

With only the first two present this looked like a trait of mobile operating systems,
a reading retired once Evergreen — a `web` system — appeared. The arrival of the
frameworks then revealed that **"none" has three kinds**.

### Remaining bias

- **Two mobile entries done** (Material 3, Apple HIG). The touch-target, typography and
  material axes are open. **Both are confirmed to have no spacing scale at all** (absent,
  not unverified). Safe areas have not been looked at yet.
- **Enterprise-heavy** (15 of 34). Consumer stands at five: Backpack · Gestalt · Protocol ·
  Base Web · Orbit.
- **One healthcare entry** (Nord). Regulated industries need more samples.
- **Three Asian entries** at the start (Ant Design, Vapor UI, Seed Design), since
  reinforced by TDS · Semi · Digital Agency · four Japanese systems and others. Kakao,
  Naver and LINE still show no token package even after the search-API recheck
  (2026-08-18) — but **LINE was admitted as a documentation-layer sample** (the first of
  its kind in the corpus, `systems/line.md`). **Kakao and Naver are confirmed inadmissible
  after a documentation-layer pilot** (2026-08-18) — their official publications amount to
  login-button guidance and brand CI, too thin to qualify, and their internal design
  systems are not public (details in section D of `TODO.md`).
- **All four frameworks are React-based.** The Vue and Svelte line (Vuetify · Naive UI ·
  PrimeVue · Skeleton) stands at zero. Only Tailwind is framework-independent.
- **Design-tool integration is thinly documented.** Whether a system officially ships a
  Figma kit (the `figma_kit` field) is `unverified` for many of the 34. That is especially
  true of the four frameworks — community kits exist, but official status could not be
  confirmed.
- **Component detail exists for shadcn/ui only.** Of the 20 in the `full` harvest, the one
  with a `## Component detail` section is shadcn/ui. The rest need a documentation site.

### Harvest next

1. **Start with the ✓npm-confirmed candidates.** The probe is done, so a single `npm pack`
   gets each one started. In cultural-priority order:
   - **Anglosphere**: Blueprint · Grommet · Vibe · Forma 36 · Ring UI · Stacks ·
     Thumbprint · Cedar · Auro · Mística · Porsche · Siemens iX · Vanilla · USWDS · Garden
   - **Korea**: **KRDS** (`krds-uiux@1.1.0`) — a third public-sector sample, which decides
     whether GOV.UK's 5px base is a public-sector tendency or a standalone choice, and the
     first Korean government sample at the same time
   - **Southeast Asia and Greater China**: SGDS · Semi Design
   - **Japan**: Digital Agency · SmartHR · Charcoal · Spindle · Vibes · Serendie — **the
     group most likely to fill the CJK typography gap**
2. **Platform gaps** — `wearable` and `tv` at zero (`desktop` is filled by macOS 26). The
   remaining macOS pages (Sidebar · Menu · Table — node URLs needed); watchOS 26 confirmed
   to exist via the community; **Tizen CircularUI** (✓gh) is the first non-Apple wearable
   candidate. tvOS has no kit
3. **Re-harvest Base Web** — `check-sources.mjs` reports it stale at baseui 16.1.1 → 18.2.0
   (two majors). The 22-step 2px scale quoted in `tokens/scales.md` needs rechecking
4. **A second `aerospace` sample** — NASA WDS (✓gh). It decides whether Astro UXDS's status
   colours and mission-control vocabulary are a domain tendency or a one-off
5. **shadcn/ui's 24 style variants** — `styles/{base,aria,radix}-{luma…vega}/` unopened
6. **Radix Themes' 26 colours, actual values** — for verifying contrast ratios (the only
   explicit specification is Cloudscape's charts)
