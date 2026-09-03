# Self-Made DesignOps

![Design systems](https://img.shields.io/badge/design_systems-117-blue)
![Pattern axes](https://img.shields.io/badge/pattern_axes-9-8A2BE2)
![Platforms](https://img.shields.io/badge/platform_axes-7-teal)
![Machine readable](https://img.shields.io/badge/data-JSON-orange)
![Agent guides](https://img.shields.io/badge/agent_guides-4-green)
![Docs language](https://img.shields.io/badge/corpus_language-English%20%2B%20한국어-blue)

**English** · [한국어](README.ko.md) · [日本語](README.ja.md) · [简体中文](README.zh-Hans.md) · [Bahasa Indonesia](README.id.md) · [Español](README.es.md)

📖 **[Browse the corpus on the web](https://self-made-orange.github.io/self-made-design-ops/)** — searchable index of all 117 systems, filterable by platform / tier / domain.

A repository that turns the work repeated between design and development into **shared assets**: conventions, references, and tools reused across products. **No product-specific data lives here** — that belongs in each product's own repository.

`design-systems` `design-tokens` `ui-patterns` `event-taxonomy` `i18n` `l10n` `llm-agents` `figma`

## How to use it

**1. "Is this value weird, or is it just us?" — settle the argument.**
Instead of debating button height for twenty minutes, open `design-systems/patterns/button.md`.
It carries the measured distribution across 77 systems: **40px is the mode, but only ~23% of them**,
so the conclusion is that *no industry-standard height exists*. The argument moves from
*"which value is correct"* to *"which value fits our density"*.

**2. Starting something new — don't start from a blank page.**
The **"Implementation defaults"** section at the end of each `patterns/*.md` is the destination.
Don't invent a spacing, type or motion scale from scratch; start there and change only what you must.
([English rendering of those sections](design-systems/patterns/implementation-defaults.md).)

**3. Review grounds — argue from samples, not taste.**
Instead of "this doesn't feel right", you can write **"no counter-example in 79 systems"**.
`agents/design-review.md` is that procedure, and its three-way verdict
(*convergence deviation / accepted divergence / internal inconsistency*)
**separates matters of taste from actual defects.**

**4. As grounding for LLM agents.**
`design-systems/data/*.json` is machine-readable and `agents/` holds executable procedures.
Hand this corpus to an agent when you ask it to review a design, draft an event sheet, or audit localisation.

## What you get out of it

- **Decisions get faster** — no more re-searching "how does everyone else do this?" each time.
- **Decisions persist** — the reasoning is recorded **with its sample size**, so the same argument doesn't recur in six months.
- **Received wisdom gets filtered** — this corpus **overturned 24 of its own conclusions** as the sample grew
  (e.g. "web modal radius clusters at 8–12px" → that band turned out to be the *thinnest* cluster).
  How often a small-sample convention is simply wrong stays on the record.
- **Unknowns stay unknown** — unconfirmed values are marked `unverified` rather than filled in plausibly,
  so the next person can pick them up.

> **First time here?** Pick one axis in `design-systems/patterns/` and read **its final "Implementation defaults" section first**.
> Everything above it is the evidence for that conclusion.

## How is this different from awesome-design-systems?

[`alexpate/awesome-design-systems`](https://github.com/alexpate/awesome-design-systems) was this corpus's candidate pool — the two serve different purposes and complement each other:

| | awesome-design-systems | **Self-Made DesignOps** |
|---|---|---|
| What it is | Curated **link list** (~160 systems) | **Verified-values corpus** (117 systems) |
| Unit of content | Name + URL | Measured token values, source + version pinned per claim |
| Question it answers | *"What design systems exist?"* | *"What values do they actually use, and where do they converge or diverge?"* |
| Depth | Links out to each system's docs | Per-system entries + 9 cross-system pattern axes ending in **implementation defaults** |
| Verification | — | Unverifiable values marked as such; monthly freshness CI re-checks every pinned version |
| Machine-readable | — | `design-systems/data/*.json` |
| Consumers | People browsing | People deciding values — and **LLM agents** (`agents/` procedures) |

Use the awesome list to discover systems; use this corpus to decide your button height.


## Contents

| Directory | What it is | Status |
|-----------|------------|--------|
| [`design-systems/`](design-systems/) | Reference corpus of public design systems, verified against real token values | **117 systems** |
| [`agents/`](agents/) | Working procedures for LLM agents — design review, event sheets, localization | 4 guides + navigation |
| [`profiles/`](profiles/) | **Production instructions** — ready-to-use `DESIGN.md` profiles derived from the corpus, with an evidence grade on every value | 4 measured + interpreted layer |
| [`event-taxonomy/`](event-taxonomy/) | Conventions for analytics event sheets + converter/linter | conventions · converter |
| [`i18n/`](i18n/) | Localization conventions + linter | conventions · linter |
| [`mockups/`](mockups/) | Device mockup asset inventory | Apple · Google · Samsung · Meta · Microsoft · Figma official — **6 entries** |

> **Note:** the corpus documents are in English, with the Korean original kept beside each one at `<slug>.ko.md`. The token values, tables, and JSON extracts (`design-systems/data/`) are language-neutral.

## `design-systems/` — the corpus

When you face decisions like "how many width steps should a modal have" or "where do I cut the spacing scale", this corpus lets you check **what major systems actually did** — with sources and versions pinned on every claim, and `미확인` (unverified) marked where a value could not be confirmed.

- **`systems/`** — one file per system (117 entries), with YAML frontmatter (org, tier, platform, verified date, source)
- **`patterns/`** — cross-system comparison on **9 component axes**: typography · color · button · form · motion · modal · table · navigation · feedback. Each ends with an **"implementation defaults"** section — that section is the point of the corpus
- **`tokens/scales.md`** — spacing/radius/border cross-comparison. Headline: **no spacing value is universal**; adoption ranking is what remains (4/8/16 strongest, then 32, 24)
- **`platforms.md`** — 7 platform axes all sampled: web · mobile · desktop · spatial · automotive · wearable · tv. Different platform, different token structure
- **`data/`** — machine-readable JSON (all frontmatter + curated cross-system conclusions)
- **`GLOSSARY.md`** — terms that look alike but differ across systems (Liquid Glass parameters, pill vs circle, rem root assumptions…)
- **`HARVESTING.md`** — how values were collected, including proxy-bypass channels (Apple HIG DocC JSON, androidx sparse-clone, Figma adjacent-ID probing)
- **`UNVERIFIED.md`** — every `unverified` marker classified A/B/C: resolvable now · blocked on a condition · structurally impossible. The "impossible" ones are findings — a system that ships no license or declares no WCAG target is itself corpus data
- **`INTEROP.md`** — how this corpus meets the emerging **`DESIGN.md`** agent-handoff format (spec, linter, and `to-design-md.mjs`, which exports the corpus defaults as a scaffold)
- **`check-sources.mjs`** — freshness watch: compares each entry's pinned version against npm latest (monthly CI + git hook)

### Corpus by region

**Platform / OS vendors (10)** — Apple: iOS/iPadOS HIG, macOS 26, tvOS, visionOS, CarPlay · Google: Material 3, Android Automotive, Android TV, Wear OS · Samsung: Tizen CircularUI

**Open-source frameworks (19)** — Tailwind CSS, shadcn/ui, Mantine, Radix Themes, Chakra UI, Ark UI, Open Props, Bootstrap, MUI, HeroUI, Park UI, Naive UI, PrimeVue, Vuetify, Skeleton, Shoelace, Headless UI, Panda CSS, vanilla-extract

**North America (42)** — Carbon (IBM), Fluent 2 (Microsoft), Spectrum (Adobe), Lightning (Salesforce), Primer (GitHub), Polaris (Shopify), Cloudscape (AWS), Base Web (Uber), Gestalt (Pinterest), Canvas (Workday), Paste (Twilio), Garden (Zendesk), Blueprint (Palantir), Helios (HashiCorp), Pajamas (GitLab), EUI (Elastic), Evergreen (Segment), LeafyGreen (MongoDB), Clarity (VMware), Odyssey (Okta), Grommet (HPE), Protocol (Mozilla), Codex (Wikimedia), Stacks (Stack Overflow), Skin (eBay), Cedar (REI), Thumbprint (Thumbtack), Auro (Alaska Airlines), Priceline, Pluralsight, HSDS (Help Scout), Intergalactic (Semrush), Pharos (JSTOR), Palette (Artsy), Solid (BuzzFeed), Astro UXDS (aerospace), NASA WDS, USWDS (US federal), NYSDS (New York State), Bolt (Pega), Aurora (Canadian government, doc-layer sample), Fleet (City of Boston)

**Europe (22)** — GOV.UK, NHS, WMN (transit), Origami (Financial Times), Backpack (Skyscanner), Vanilla (Canonical), PIE (Just Eat Takeaway), DSFR (French state), Vitamin (Decathlon), Strapi, Welcome UI (WTTJ), Porsche, Audi UI, Siemens iX, Forma 36 (Contentful), Mística (Telefónica), Italia (Italian state), Tegel (Scania), Orbit (Kiwi.com), Ring UI (JetBrains), Nord (Nordhealth), Kontur UI (SKB Kontur)

**East Asia (14)** — Korea: KRDS (government), TDS (Toss), Seed Design (Karrot), Vapor UI (goorm) · Japan: LINE (LY Corp, doc-layer sample), ReX (Rakuten), Digital Agency, SmartHR UI, Charcoal (pixiv), Spindle (Ameba), Serendie (Mitsubishi Electric), Vibes (freee) · China: Ant Design (Ant Group), Semi Design (ByteDance)

**Southeast Asia (4)** — SGDS (Singapore government), Asphalt (Gojek), Unify (Tokopedia), Persona (Privy)

**Oceania (3)** — Atlassian, Braid (SEEK), Kaizen (Culture Amp)

**Latin America (1)** — Yoga (Wellhub) · **Middle East (1)** — Vibe (monday.com)

## `agents/` — LLM working procedures

Execution procedures for using this repository as an agent's tool, not just a human's reference. [`agents/README.md`](agents/README.md) carries the corpus navigation map (question type → file) and shared discipline (citation duty, no speculation, linters must pass). **To use from another project:** clone this repo next to yours (or add as a submodule) and add a pointer in your product's `CLAUDE.md` — the copy-paste snippet and the feedback loop are in [`agents/README.md`](agents/README.md) § "다른 프로젝트에서 쓰기". Four guides:

- **[`system-selection.md`](agents/system-selection.md)** — pick reference systems that match a product's coordinates (platform, viewing distance, script culture, domain) — split by axis instead of adopting one system wholesale, with a license gate before any code is borrowed
- **[`design-review.md`](agents/design-review.md)** — audit a design/implementation against the corpus with a three-way verdict: *convergence deviation* / *accepted divergence* / *internal inconsistency* — so "14px body text" never gets flagged against a "16px standard" that doesn't exist
- **[`event-instrumentation.md`](agents/event-instrumentation.md)** — read UX context from Figma or code and propose an analytics event sheet under `event-taxonomy/` conventions (state variants are properties, funnels are enum order, no PII, unresolved questions go back to the user)
- **[`localization.md`](agents/localization.md)** — extract strings and context, then localize under `i18n/` conventions (where strings hide, key naming shared with event sheets, tone observed not invented, CJK/RTL risks reported)

## `event-taxonomy/` — analytics event sheets

Sheet conventions for defining product analytics events: `{domain}_{action}` naming, screens as `screen_name` enums instead of per-screen events, conditional-property notation, review checklist. `convert.mjs` converts sheets to **JSON · Markdown · HTML · spreadsheet · Notion**; `--lint-only` (+ `--strict` for CI) checks convention violations.

## `i18n/` — localization

Conventions + templates + linter: BCP 47 locale identifiers, key naming, ICU MessageFormat (plural/select/number/date), CLDR plural categories per language (Korean 1 · English 2 · **Arabic 6**), text-expansion budgets, RTL. Connected to the corpus: body-size conventions differ by script culture (Ant Design 14px · Western web 16px · Apple 17pt) and that shapes multilingual layout. `lint.mjs` reads the locale from the filename and checks the plural categories that locale actually needs.

## `mockups/`

Records **where device mockups are and what they cover** — sources and inventory only; files themselves are not committed (license and size).

## Principles

- **Shared assets only.** Product-specific data gets moved out to its product repository.
- **No speculation.** Unverifiable values stay marked `unverified`. One plausible-but-wrong value poisons trust in the whole corpus.
- **Source and version on everything.** Reverification must be possible.
- **No verbatim copying** of external prose; summarize and link. Factual token values are quoted as-is.

## Known constraints

- **Design-system documentation sites are blocked** by the egress proxy (carbondesignsystem.com, m3.material.io, primer.style, …). GitHub and npm are open, so token collection works; component usage guidance mostly doesn't. Systems that ship source (shadcn/ui) or component CSS (Mantine, Radix Themes) fill much of that gap, and two bypass channels were found for Apple (HIG DocC JSON) and Google (developer.android.com, androidx) — see `design-systems/HARVESTING.md`.
- **Only Cloudscape states contrast ratios numerically** in its tokens (chart step number = contrast ratio). Across 117 systems, no other token package embeds contrast numbers or a WCAG target.
- **Freshness is watched automatically** — `check-sources.mjs` caught Base Web two majors stale on its first run, and a real token change in Mística 17 (high-contrast primitives removed upstream).

## Language

The documents are **English-primary**, with the Korean original kept beside each one as
`<slug>.ko.md`. `design-systems/i18n.mjs --check` enforces the pairing and runs in CI.

The command-line tools follow the same rule: **English by default, Korean available.**

```bash
node design-systems/i18n.mjs --check --lang=ko   # per command
DESIGNOPS_LANG=ko node site/build.mjs            # for a whole session
LANG=ko_KR.UTF-8 node i18n/lint.mjs ko-KR.json   # or just your shell locale
```

Precedence is `--lang` → `DESIGNOPS_LANG` → `LC_ALL`/`LC_MESSAGES`/`LANG` → English, and a
message missing from a locale falls back to English rather than printing a key
(`tools/cli-i18n.mjs`). Adding a language means adding its code there and a catalogue to each
tool.

Two things deliberately do **not** follow the locale:

- **Strings inside generated JSON** (`design-systems/data/`, `docs/data/`) and the generated
  `design-systems/freshness.md` — those are committed artefacts, so switching language would
  rewrite repository files.
- **The event sheet's CSV column names and its `필수` marker** — `event-taxonomy/convert.mjs`
  matches on those literally, so they are a data contract rather than a message. The prose it
  *renders* (the md and html labels) does follow the locale.

`design-systems/to-design-md.mjs` emits the whole DESIGN.md scaffold in the chosen language;
its frontmatter keys and values stay language-independent, because the spec fixes those names.

## License

**Code MIT · documentation and the corpus CC BY 4.0** — see [`LICENSE`](LICENSE).

The kit is meant to be cloned, so the tooling is MIT. The measurements are meant to be cited,
so they are CC BY 4.0: use them anywhere, including commercially, as long as the source is
credited.

Neither licence relicenses anything upstream. This repository describes 117 systems that
belong to other people; what is licensed here is **this repository's own work** — the
measurements, the analysis, the wording, the tooling. Token values are facts and carry no
copyright, no upstream prose is reproduced, and no third-party asset is stored. `LICENSE`
sets out the boundary in full.

## Prerequisites

| Item | Notes |
|------|-------|
| Node.js / Bun | runtime for the scripts (no dependencies) |
| `FIGMA_OAUTH_TOKEN` | Figma API token — set as env var, **never commit** |

MCP server config lives in `.claude/settings.local.json` (gitignored — may contain tokens).
