# Remaining tasks

> **English** · [한국어](TODO.ko.md)

The list of outstanding work as of 2026-08-18. Of the 8/17 edition's A, B, C and D,
**A is entirely resolved** (the local session's open network — the note at the top of
`HARVESTING.md`), and the six representative B items, the twelve C network checks and the
D npm recheck have been handled.

## Current state, in snapshot

| Axis | State |
|------|-------|
| Corpus | **116** (113 public + 2 documentation-layer + a new code-layer entry — the make-up is at the top of `design-systems/index.md`) plus 1 internal sample |
| `full` harvest depth | 20/20 · **79 `partial` deepenings (the entire target set)** complete |
| patterns backlog | judgement guidance on all 9 axes + every source dig resolved · **re-synthesis complete on 9/9 axes** (16–83 samples) — the three weak axes (table 16 · navigation 16 · feedback 18) reinforced (2026-08-18) |
| unverified | **428 → 212** open marks · **109** frontmatter fields (a11y_target 57 · figma_kit 48 · license 4 · repo 0). **Recounted 2026-08-23** — the previous 308 came from a recount command that double-counted the `.ko.md` twins and missed capitalised `Unverified`; both are fixed in `design-systems/UNVERIFIED.md` |
| freshness | **185** checked · **19 outdated, all patch** (major 0 / minor 0) · 0 failed · 21 manual — **every minor re-harvested 2026-08-23**, 1 real drift (Ark UI). Patch is deliberately not chased; see section C |
| a11y_target | documentation layer checked for the 10 `full`-harvest systems (6 stated · 4 confirmed absent) |
| README | six language versions — **renamed to Self-Made DesignOps throughout** |
| language | **English-primary, migration complete (2026-08-21)** — 162 documents paired as `<slug>.md` + `<slug>.ko.md`, verified by `i18n.mjs --check` |

## A. ~~Blocked by environment constraints~~ → resolved (2026-08-18)

The documentation sites open from a local session, and every item was harvested:

- ✅ Modal backdrop click, ESC and nesting (`patterns/modal.md`) — 4 forbid nesting : 2 allow it conditionally
- ✅ Number of primary buttons, variant purposes, loading, minimum width (`patterns/button.md`) — "one per screen" converges across 6 samples
- ✅ When errors appear, label position, required marking (`patterns/form.md`) — most on blur vs GOV.UK on submit only
- ✅ Toast position, duration and count + alert placement and auto-dismiss (`patterns/feedback.md`) — banners never auto-dismiss, unanimous at 8/8
- ✅ When to animate at all (`patterns/motion.md`) — judgement rules from 5 systems
- ✅ Sidebar vs top nav, depth limits, parent emphasis (`patterns/navigation.md`)
- ✅ Sorting UI and row selection (`patterns/table.md`)
- ✅ Type style usage guidance (`patterns/typography.md`)
- ✅ Whether a WCAG target is stated, across 10 systems (`patterns/color.md` plus each frontmatter's `a11y_target`)

**The principle going forward:** any further documentation-layer harvesting happens in a
local session. In a container session only the workarounds (DocC JSON, sparse-clone, build
output) are viable.

## B. Per-entry checks still open — small, when the chance arises

All six representative items from the 8/17 edition are resolved (M3 shadows → the elevation
structure confirmed · shadcn's normalisation point · four TDS items · the Audi timeline ·
Persona spacing · the Italia tier structure). What remains is scattered through the
"remaining checks" sections of `systems/*.md` and can be filled in when the system in
question is actually used.

```bash
grep -rn "Remaining checks" design-systems/systems/   # read them all
```

Source digs left on the patterns side:

- [x] ~~Mantine `ModalBase.css` and `Button.css` padding, Radio and Switch dimensions~~ —
  **resolved (2026-08-18, `@mantine/core@9.5.1` on npm)**: button padding 14–32 plus a
  compact axis, modal padding fixed at 16, Radio/Switch rechecked and consistent. As a
  bonus, Notification and Alert dimensions, the Textarea minimum height, the 0ms selector
  and the help-text gap (5px) (`button.md` · `form.md` · `modal.md` · `feedback.md` ·
  `motion.md`)
- [x] ~~Radix Themes' 26 colours, the actual `--accent-9`, `tab-nav.css`~~ —
  **resolved (2026-08-18, `@radix-ui/themes@3.3.0` + `@radix-ui/colors@3.0.0`)**:
  the 26-colour table (`color.md`) — step 9 is identical in light and dark except for gray.
  tab-nav shares 100% of its specification with tabs (`navigation.md`). Plus the
  button/callout/text-area dimensions and confirmation that there is no error selector
  (`button.md` · `form.md` · `feedback.md`)
- [x] ~~shadcn `button-group` · `empty` · `pagination` · `navigation-menu` · `menubar` source~~ —
  **resolved (2026-08-18, GitHub main@8a7701e)**: button-group and spinner →
  `button.md`, empty → `feedback.md`, pagination, navigation-menu and menubar →
  `navigation.md`
- [x] ~~Spectrum, Polaris, Primer, Cloudscape and Carbon colour and type token paths (`color.md` · `typography.md`)~~
  — **resolved (2026-08-18)**: all five harvested. `@adobe/spectrum-tokens@15.0.0` ·
  `@shopify/polaris-tokens@9.4.2` (frozen) · `@primer/primitives@11.10.0` ·
  `@cloudscape-design/design-tokens@3.0.107` · `@carbon/colors@11.56.0` +
  `@carbon/themes@11.79.0` + `@carbon/type@11.65.0`.
  Every one was in the npm build, and **the path was not absent, it was never opened**
  (lesson 6 reconfirmed). The three new traps are lessons 11–13 in `HARVESTING.md`.
  Cross-cutting conclusions: `patterns/color.md` ("how many ramp steps" · "how deep the
  semantic tier goes") · `patterns/typography.md` ("shorthand property tokens" · "the weight
  ceiling" · "the tracking direction of the five large sizes" · "Spectrum's CJK scale").
  **This exhausts the source digs in section B**
- [x] ~~Primer's component token tier~~ — **resolved (2026-08-18, container session)**:
  27 files, 364 tokens (354 of them colour — effectively colour-only, with dimensions left
  to functional). Dark overrides inline (`org.primer.overrides`), embedded Figma Variables
  sync metadata (unique in the corpus), the `$type: border` composite type, and the
  `headerSerach` typo frozen in place (the component token tier section of
  `systems/primer.md`)
- [x] ~~Orbit easing~~ — **resolved as confirmed absent (2026-08-18)**: it converges on
  Tailwind's default bezier alone (52 uses). This exhausts the easing backlog in motion.md
- [x] ~~Audi UI button height~~ — **resolved (2026-08-18)**: effectively 51px, going
  51 → 57 → 63px with the responsive root (the deep-dive section of `audi-ui.md`). Closed
  with the discontinuation announcement not found

## B-2. ~~patterns re-synthesis~~ → complete (2026-08-18)

The problem where measurements captured by the deepening lived only in `systems/*.md` while
the cross-comparison documents kept conclusions drawn from a few samples — **re-synthesis is
complete on all seven axes**.

| Axis | Samples | Conclusions overturned |
|------|:---:|:---:|
| button | 77 | 1 (default height 36 → 40px) |
| form | 78 | 1 (minimum input width 'none' → 13+) |
| modal | 79 | **6** |
| motion | 83 | **7** |
| color | 79 | 3 |
| typography | 68 | 4 |
| table | 6 | 2 (noting that the table axis was low priority in the deepening) |

- The navigation and feedback axes were **not in scope** — the deepening brought them no new
  samples.
- A side result: two cross-document contradictions were corrected, where entries unaware of
  each other each claimed to be "the only sample" (Blueprint and Kaizen each claiming to be
  alone on modal overshoot).
- The preamble of the English edition (`implementation-defaults.md`) now states that it is a
  snapshot of conclusions and that the source document takes precedence. **At the next
  re-synthesis, update the English body along with it.**
- Per-axis digests preserved at
  `/private/tmp/claude-501/-Users-sey-yeah-311kakao-com-Downloads-0000-git-repository/digest-shared/`
  (a path outside the session — it may vanish on reboot, so regenerate if needed)

## B-3. ~~Rendering the B-1 documentation sites~~ → complete (2026-08-18)

All 37 systems were checked with headless Chrome (four teams in parallel).
**27 resolved · 37 confirmed absent (C) · 0 render failures.**

**The most important result is that the classification was an overcount** — B-1 meant "an SPA,
so rendering is required", but in reality **most were static or SSR and needed no rendering at
all**, and Odyssey was **not an SPA but behind Okta SSO**. The details and the practical
rendering notes are in the "B-1 render result" section of `design-systems/UNVERIFIED.md`.

Two incidental corrections:
- **Spectrum `figma_kit: true` → `false`** — the UI kit page says "XD files" explicitly and
  the CMS's `patterns_figma_url` is null. The old value had gone in without a source.
- **13 `figma_kit` type contaminations normalised** — an explanation had been appended to the
  value, breaking the boolean into a string. Value (`true`/`false`/`unverified`) and evidence
  (the body) were separated.

**What remains (where the next person picks up):**
- [ ] `a11y_target` unverified, **57 items** · `figma_kit`, **49** — the largest block left.
  Many are likely already C (no declaration), but **until checked they are unverified**
  - ✅ **The repository channel is exhausted (2026-08-23)** — all 44 entries that carry a
    github `repo` were swept for a stated WCAG level (README, docs/README, ACCESSIBILITY.md,
    on `main` then `master`). **One hit**: Codex, now resolved to WCAG 2.1 AA from its README
    at `main@5a4ff8980f`. 39 repositories say nothing, 3 had no readable README, and 14 of the
    57 have no github repo at all. Recorded in `UNVERIFIED.md`.
    **This does not make the other 43 into C** — stating the target on the documentation site
    and not in the README is the ordinary case, and the `figma_kit` overcount was this same
    mistake in the other direction. **The remaining route is the documentation-site channel
    (B-1), system by system** — that is what the next pass costs
- [x] ~~Odyssey~~ — **resolved via npm (2026-08-18)**: 206 tokens in total
  (13 type steps · one global transition pair at 100ms linear · a non-integer 1.5px border ·
  Depth and Shadow coexisting), roughly 95 components measured. Only the documentation layer
  (accessibility target, Figma kit) stays behind SSO — via npm it is closed
- [x] ~~**Backpack's `url` is effectively a dead address**~~ — **replaced (2026-08-23).**
  Rechecked live from this session: `backpack.github.io/` **200**, `backpack.github.io/components/`
  **404**, `www.skyscanner.design/latest` **200** — the 2026-08-18 finding reproduces. `url:` now
  carries the Supernova address in both `backpack.md` and `backpack.ko.md`, and the reference note
  records the swap. `verified:` was left alone (it pins the token harvest; no token was re-measured).
  `systems.json` and `corpus.json` regenerated.
  **The general lesson: a wrong value is worse than an `unverified` one** — the automatic
  classification only watches `unverified`, so a value that is simply incorrect has no watcher at
  all. This was the only such case known in the corpus
- [x] ~~`license` unverified, 9 items · `repo`, 1~~ — **handled (2026-08-18, container)**:
  the 3 Android ones = documentation CC BY 2.5, code Apache 2.0 (confirmed at
  developer.android.com/license) · KRDS = the ISC declared on npm · the 5 Apple ones = the
  attempt recorded and left unverified (the resources page is JS-rendered — a job for a local
  session) · Nord repo = nordhealth/design-system confirmed as declared (access requires
  authentication)

## C. Routine operations — what the automation catches

- [ ] **Handling the monthly freshness CI** results (the procedure is in `freshness.md` —
  four real cases: Base Web · Mística · Pajamas + **the Polaris repository being archived**
  (2026-08-18, a drift in status rather than in values))
  - ✅ **The 10 minor re-harvested (2026-08-23) — `minor 0` for the first time.** Each was
    diffed against the exact files its `source:` names. **Nine changed no recorded value**:
    atlaskit-tokens, braid, ebay/skin and porsche were byte-identical; odyssey's token file
    differed only in its generation timestamp and every theme override it records was
    identical; f36-button differed only in `package.json`; forma-36 and @gitlab/ui were purely
    additive (a new `colors-input.json`; a new `application-chrome.background.color`); tegel's
    six changed files were all tabs, a layer the entry does not record. **Ark UI is the one
    real drift** — components 73 → 74 (`toc`) and dependencies 67 → 69, both numbers the entry
    states. Drift records were written into forma-36, pajamas, odyssey, tegel, ark-ui and
    vanilla; `source:` and `verified:` bumped on all ten.
    **Regenerating the report also showed the committed `freshness.md` was itself days stale**
    — two further minors (Ark UI, Vanilla) had arrived that the snapshot did not list. Both are
    included above. Remaining: **19 patch, 0 minor, 0 major**
  - 🔻 **The 24 triaged (2026-08-23) — only 10 are work.** The breakdown is
    **major 0 / minor 10 / patch 14**, and the patch 14 are **not to be re-harvested**.
    The reason is on this very list: the three drifts handled on 2026-08-18 (one minor, two
    patch) **changed no recorded value**, and a bump that moves no value costs a `source:`
    string edit and buys nothing. Re-harvest the **10 minor** ones, section by recorded
    section. Revisit the patch ones only when a major appears or one of them is opened for
    another reason.
    **The Orbit row is not a drift at all** — `@kiwicom/orbit-components` publishes
    `27.7.1-alpha.0` under the `latest` dist-tag upstream, so the checker reads a prerelease
    as newest. Already recorded as intentional; it wants an exception marker in the report,
    not a re-harvest
  - ✅ **3 drifts handled (2026-08-18)** — USWDS 3.13.0 → **3.14.0** (minor) ·
    Grommet 2.56.0 → **2.56.1** · Vibe `@vibe/core` 4.5.8 → **4.5.9**.
    **None of the three changed a recorded value.** The reasoning:
    for USWDS, a `diff -rq` across the whole token directory showed only two differing files,
    and `font/stacks.scss` was **a formatting change, line breaks only**; the one real change
    was in colour — a tier we have not harvested — remapping `"ink"` (`base-darkest` →
    `base-ink`), which is a reference point for when colour is harvested.
    For Grommet, the five token sections we recorded (`dataTable` · `sidebar` · `tab` ·
    `menu` · `notification`) were compared section by section and were all identical; the
    changes were a new `dateTimeInput` plus inserted SPDX headers.
    For Vibe, **the token source `monday-ui-style` is still current at 0.26.2** and only the
    component package moved — no re-harvest needed.
    **Lesson: even on a minor bump, the real change can be buried in formatting noise, so
    compare by "the sections we recorded" rather than by file.**
- [ ] **15 manual checks** — the five Figma kits (Apple HIG · macOS · visionOS · Atlassian ·
  KRDS, via the community files' Change Log pages) are the core. **macOS was confirmed via
  MCP on 2026-08-18** (the Menu Bar and Dock page structure matches what was measured — no
  change). The other four cannot be checked over MCP because **their file keys are not
  recorded in the corpus** — when checking them in the next local session, record the file
  key in `source:` as well. The 10 github and web ones were all confirmed over the network on
  2026-08-18 (no changes anywhere) — do the next check the same way from a local session
- [x] ~~Installing `hooks/install.sh` on a fresh clone~~ — installed on this clone
  (`core.hooksPath=hooks`)
- [x] ~~Harvesting Polaris Web Components tokens~~ — **complete (2026-08-18, with the policy
  of reworking the existing entry settled, then harvested)**: the "Web Components generation"
  section of polaris.md. The public token layer is gone (no npm, hashed variables) — the
  values were measured from the CDN bundle. The spacing values are identical but the range is
  cut, weights drop one step, and the button's mobile 44px goes fully responsive.
  **The CDN bundle is unversioned, so freshness cannot watch it automatically** —
  re-verification is manual (comparing the bundle hash)

## D. Optional expansion — when it becomes necessary

- [ ] **Systems put on hold for absence from npm** — policy settled (2026-08-18):
  **after a pilot, admit them as a "documentation-layer sample" if the density of numbers is
  sufficient.**
  - ✅ **LINE admitted** (`systems/line.md`, the 113th and the first documentation-layer
    sample)
  - ❌ **Kakao and Naver confirmed inadmissible** (the 2026-08-18 pilot) — their official
    publications are login-button guidance plus brand CI (about 12 real values for Kakao and
    10 for Naver, with no spacing, type or palette scale whatsoever). An internal DS is
    suggested but not public.
    Both show the brand-colour / button-colour split (#FAE100/#FEE500 · #03C75A/#03A94D), but
    the entry density falls short — **the reason for inadmissibility is density, not
    licensing.** For reference, Naver's brandGuide forbids "redistribution, templates,
    datasets and provision as generative-AI training material", but **its subject is the logo
    resources (zips and images)** — numbers such as hex values are factual data and recording
    them in a .md is fine (the same as the HARVESTING recording rules). Only bundling and
    redistributing the logo assets is disallowed. Condition for reconsideration: a public DS
    document or token distribution appearing
  - ✅ **The pilots are all closed (2026-08-18)**: Rakuten ReX (admitted at the code layer
    via npm — the documentation went internal, 36 MIT npm packages survive) · Aurora (the
    second documentation-layer sample, with the 2019 freeze stated) · Fleet (measured from
    public CSS, code CC0) admitted → **corpus 116**. Grab is not possible —
    design.grab.com says "Coming Soon" (the real thing is the internal Duxton). **On the
    watch list**: re-evaluate if design.grab.com opens. **Rechecked 2026-08-23** — it answers
    200, but the page is still the 4,552-byte `<title>Grab Design - Coming Soon</title>`
    placeholder. The condition is not met; it stays on the list
- [ ] **The watchOS and tvOS Figma kits** — **rechecked 2026-08-23, and they have parted
  ways.** `developer.apple.com/design/resources/` answers 200 from this session.
  - **watchOS: the condition this item set has been met.** An official kit is published —
    `figma.com/community/file/1540060090060216489/watchos-26`, linked from that page. The URL
    answers 403 unauthenticated, which is Figma's normal community response and not evidence
    against it; the link on Apple's own page is the evidence. **The corpus has no watchOS
    entry at all** (only Wear OS and Tizen Wearable on the wearable axis), so this is a new
    entry to harvest rather than a field to fill — bigger than a recheck, and the reason it is
    left open here.
  - ✅ **tvOS: still none, and now with dated evidence.** The tvOS downloads on that page are
    `tvOS-18-Design-Templates-Sketch.dmg` and the two Production template `.dmg`s — Sketch and
    Photoshop only. The same page links Figma community files for visionOS, watchOS 26 and ten
    feature kits, so the absence is specific to tvOS. Recorded in `systems/tvos.md`;
    `figma_kit: false` stands
- [x] ~~Translating the corpus body~~ — **complete (2026-08-21).** Stage 1 was
  `patterns/implementation-defaults.md` (977 lines consolidating all nine sections) on
  2026-08-18; the rest followed — all 116 `systems/` entries, the nine pattern axes,
  `tokens/scales.md`, the root prose (`index` · `HARVESTING` · `SCHEMA` · `GLOSSARY` ·
  `UNVERIFIED` · `platforms` · `INTEROP` · `freshness` · `data/README`), `agents/`, the
  measured profiles, `i18n/`, `event-taxonomy/`, `mockups/`, `site/README.md` and this file.
  **162 documents are paired** as `<slug>.md` (English, primary) + `<slug>.ko.md`, and
  `i18n.mjs --check` is wired into CI. What deliberately stays in Korean: quoted CLI output
  and Korean example strings in the case studies, the literal CSV headers and the `필수`
  marker the event-taxonomy converter matches on, and `systems/frr-dashboard.md`
  (`coverage: internal`, excluded from the public data)
- [x] ~~Deepening the `partial` harvest~~ — **the entire target set is complete (2026-08-18,
  79 in total).** Four batches (20) + wave 1 (30: Thumbprint through Intergalactic) + wave 2
  (29: Pajamas through Serendie, plus a component-layer check on four token-only systems).
  The main corrections: Blueprint's 10px grid legacy · Grommet's mobile overrides ·
  Serendie's compact/expanded direction · the bf-solid "no components" assumption ·
  the Asphalt "tokens only" guess.
  **The remaining 14 are out of scope for deepening**: 7 platform-documentation systems
  (Android TV · CarPlay · macOS · tvOS · visionOS · Wear OS · Tizen) · 2 palette/utility-only
  (Artsy · Open Props) · 4 documentation-layer or newly admitted (LINE · Aurora · Fleet ·
  ReX — their measurements are in the entry body) · Mantine (its deepening data was already
  in `patterns/*.md`)
- [ ] **Field-testing the `agents/` guidance** — **design-review is 1 of 3 done
  (2026-08-18)**: the procedure was applied to the relocation planner dashboard →
  `agents/case-studies/frr-dashboard-review.md` (6 deviations · 4 divergences · 8
  inconsistencies). Twelve flaws in the procedure itself surfaced, and the guidance was
  revised in 24 places — pinning the revision, the contrast calculation procedure, headless
  rendering rules, and a new section on where output goes.
  **Remaining: `event-instrumentation` and `localization`** — each needs a subject with a
  real event sheet and real multilingual strings (choosing the subject comes first, because
  of the rule against bringing product data in)
- [x] ~~Expanding the mockups inventory~~ — **complete (2026-08-18)**: 1 entry → 6
  (Google · Samsung · Meta · the Figma official accounts · Microsoft — including three
  confirmed absences). Further expansion when a new official source appears

## E. The build-instruction tier (added 2026-08-18)

`profiles/` is the normative tier, separated from the corpus (which is descriptive). What
remains:

- [x] ~~`profiles/interpreted/` is **empty**~~ — **the claim was stale (corrected 2026-08-23).**
  The layer has held `self-made-designops-site.DESIGN.md` (+ its Korean twin) since 2026-08-19,
  generated by `site/design-spec.mjs` out of `docs/assets/site.css`. The site was the first
  product this corpus built, so it was the first thing to need an interpretation — exactly the
  trigger this item described. The standing rule is unchanged: **the layer grows only when real
  product work needs it**, never in advance
- [ ] `tv-wall` typography is **U** — it needs verification at 3m in the real world. Once
  verified, update both the corpus (`systems/tvos.md`, "remaining checks") and the profile
- [x] ~~Checking whether a corpus update requires **regenerating** `profiles/measured/`~~ —
  **done (2026-08-19).** The hardcoded values in `to-design-md.mjs` were compared against the
  patterns re-synthesis sections: the 40px button (the mode across button.md's 77 samples) ·
  the 512px modal and the 450–520 band (modal.md's 79 samples) · the six spacing steps and
  radii 0 · 4 · 8 · 16 (scales.md) all **match**. **Only the sample count for the 14px body
  camp was stale** (13 → **17**) — see "What was fixed this pass" below. All four were
  regenerated and rechecked at 0 lint errors and 0 warnings

## What we decided not to do (recorded)

- ~~Attempting to work around the documentation-site blocks~~ — kept for container sessions
  only. A local session has no block at all, so no workaround is needed (the top of
  `HARVESTING.md`)
- Harvesting the owner's Figma product libraries (two of them, unnamed here) — the rule against
  bringing product data in
- Committing a specific product's event definitions or translation strings — those belong to
  that product's repository

## What was fixed this pass (2026-08-19)

**Three internal inconsistencies** in the corpus were resolved. These were not new harvests
but **values we already had disagreeing with each other**, and all three had the same shape:
"a table reinforced on the day was never reflected in the summary sentence below it".

| Where | The disagreement | What was done |
|-------|------------------|---------------|
| `patterns/typography.md` | the 14px row of the "default body size" table is **17 samples**, while "implementation defaults" 200 lines further down summarised it as **13** (missing the 4 samples added when the five large `full`-harvest systems were reinforced) | corrected to 17, noted that Spectrum's is desktop-only, and added the rule that the table is authoritative |
| `tokens/scales.md` | in the "systems whose grid is not 4px" section, **the heading said 6 samples, the table had 8 rows and the body said 8** — three different numbers | the heading was set to 8, with a note that **the 8 rows are not all the same type** (Braid and KRDS differ only in notation → the real departures are 6) |
| `to-design-md.mjs` · `profiles/README.md` · `case-studies/system-selection-calendar.md` | quoted the 13 samples above verbatim | propagated as 17 · the four `profiles/measured/` files regenerated |
| `data/values.json` | the machine-readable extract was stale at 1 sample for the 13px camp, 13 for the 14px camp, and "6 samples" / "3 of 7" for the non-4px grid | corrected to 2 · 17 · "6 real departures among 8 rows, 4 of them", plus a comment stating that `sample_size: 100` is not the axis's sample count |

**The lesson (a worked example of something `agents/design-review.md` already made a rule):**
even inside one document, **the tables and re-synthesis sections are newer than the summary
sentences**. The path where reinforcement lands in the table while the summary sentence is
left untouched has now been observed repeatedly. When quoting a summary, count that axis's
table once.

**The FRR-sample follow-ups cannot be handled here.** The hardcoded chart colours, the
catalogue-to-dashboard drift and the `--yellow` contrast shortfall are all the business of
a private repository (address withheld), and this container session has no route to
it (cross-harvest depth refused by `add_repo` · clone authentication failed ·
outside the github MCP scope — all three routes checked). The rule against bringing product
data in also means no fix belongs in this repository.

## F. The public site (added 2026-08-19)

`site/build.mjs` → `docs/` builds a single GitHub Pages page (its structure, update procedure
and evidence grades are in `site/README.md`). What remains:

- [x] ~~**Turning Pages on in the repository settings (owner only)**~~ — **done; the site is
  live (confirmed 2026-08-23).** `https://keepyaoung.github.io/self-made-design-ops/` returns
  **200** with the right `<title>`, and `data/corpus.json` served from it reports
  **116 systems**, matching the local build. `pages.yml` is handling deployment as designed.
  Kept below as the record of why it could not be automated:
  Settings → Pages → Build and deployment → Source: **GitHub Actions**.
  **All three automation routes were blocked** (confirmed 2026-08-20):
  ① the github MCP has no Pages tool ② the workflow's `configure-pages`
  `enablement: true` → `Resource not accessible by integration`
  (even with `pages: write`, *creating* the site is not permitted, run 32322753388)
  ③ calling the REST API directly → blocked by this session's egress proxy
- [x] ~~Reflecting the repository rename~~ — `design-ops-kit` → **`self-made-design-ops`**.
  GitHub redirects the repository URL, but **the Pages address does not redirect** (it
  follows the current name). Links were updated across the six READMEs, the site and the
  agent guidance
- [x] ~~The language of the site copy~~ — **switched to English (2026-08-19).** Since the
  corpus migration finished (2026-08-21) the page no longer says the documents it links to
  are Korean; it says English-primary with the Korean original alongside. Korean values
  coming from the data would get an English label only where the `TOKEN_LABEL_EN` table has
  one, with the original kept as a tooltip — **as of 2026-08-21 no Korean value reaches
  `corpus.json` at all**, so the table is a fallback rather than something in use
- [x] ~~`tokens_format` values not registered in `TOKEN_LABEL_EN` pass through verbatim~~ —
  **dropped as a task (2026-08-23).** The translation migration finished on 2026-08-21 and
  **no Korean value reaches `corpus.json` at all**, so the table is a fallback that nothing
  currently exercises. Writing a checker for a condition that does not occur is work against a
  hypothetical. Reopen it the day a sample is genuinely harvested in Korean — that is when the
  label and the check are both cheap and grounded
- [x] ~~The nine one-line axis conclusions in `docs/index.html` have no automatic check~~ —
  **`site/check-headlines.mjs` written and wired into CI (2026-08-23).** It recomputes the
  numbers a headline states from the document's own table and confirms the values it quotes
  are still in the text; `--strict` fails the PR. It does not judge prose — a claim with
  nothing mechanisable is reported **unchecked** rather than passed, which currently applies
  to `table.md` and `navigation.md`, whose conclusions only describe what the axis covers.
  **Writing it found the drift it was meant to catch**: `motion.md`'s reduced-motion table had
  grown to **nine layers across 17 systems** while three sentences in the same document still
  said "six layers … at least 13 systems", and the site headline, `agents/design-review.md`
  and the FRR case study all quoted the stale figure. All corrected. **That is the third
  instance of this exact failure**, after typography 13 → 17 and `scales.md` 6 → 8

## G. Tidying the site visually (2026-08-20)

- [x] ~~**Switched to dark-only**~~ — **this entry no longer describes the site
  (corrected 2026-08-23).** All three things it says were removed are present in
  `docs/assets/site.css` and `docs/index.html`: a light `:root` with `color-scheme: light`,
  a `[data-theme="dark"]` block, the toggle button and the pre-paint FOUC script. The accent
  is not `#1f6feb` either — it is orange (`--accent:#f97316` for fills, `--btn:#ff5926`).
  Both themes were rendered and checked on 2026-08-23. Whatever reverted the dark-only pass
  was not recorded here; **the stylesheet is the authority, not this line**
- [x] **Fixed the bug where the background dots were invisible** — `body::before` with
  `z-index:-1` was pushed behind the opaque `html` background and disappeared on the real
  page. Fixed by painting them directly with `body`'s `background-image`
  (`attachment: fixed`). A local render confirmed, at a zoomed crop, that the dots actually
  draw
- [x] ~~**Looking at the live page remains the owner's job**~~ — **the block is gone
  (2026-08-23).** `keepyaoung.github.io` was reachable from this session: the page returns
  **200** with the expected `<title>`, and the `data/corpus.json` it serves reports the same
  **116 systems** as the local build, so the deployed artefact matches the source. What is
  still the owner's eye is the **visual** judgement — HTTP and JSON say the right bytes
  arrived, not that the page looks right. The egress claim above was true of the 2026-08-20
  session and is not a standing property of every session; **recheck rather than inherit it**

## H. Open questions from the translation pass (2026-08-21)

Two bugs the CLI-localisation pass surfaced, both now fixed:

- **`check-sources.mjs` was checking every system twice.** It scanned all of `systems/*.md`,
  including the `.ko.md` twins, so 185 real entries were reported as 370. It now skips
  language suffixes, the rule `build-data.mjs` already had. With the double counting gone the
  report showed **24 outdated sources, not the 1** the committed snapshot claimed —
  `freshness.md` was regenerated, and re-harvesting those 24 is section C work.
- **`to-design-md.mjs` had drifted from the profiles it generates.** The generator still
  emitted Korean while `profiles/measured/*.DESIGN.md` had been hand-translated to English, so
  the files were no longer reproducible from it. The generator now emits either language and
  all four profiles were regenerated from it in both — which also caught a stale "13 samples"
  in the Korean web-compact profile that should have said 17. All four validate at 0 errors
  and 0 warnings against `@google/design.md@0.4.0 lint`.

- [x] ~~**The tools still speak Korean on stdout.**~~ — **resolved by making them
  multilingual (2026-08-21).** `tools/cli-i18n.mjs` resolves the locale (`--lang` →
  `DESIGNOPS_LANG` → `LC_ALL`/`LC_MESSAGES`/`LANG` → English) and merges each tool's
  catalogue over English, so a missing key degrades instead of printing an id. All seven
  tools carry an English and a Korean catalogue, English being the default. The case-study
  transcripts stay valid: they now say the Korean output was what the tool printed at the
  time, and each run reproduces verbatim with `--lang=ko`. Not locale-dependent, on purpose:
  strings inside generated JSON, the generated `freshness.md`, and the event sheet's CSV
  column names and `필수` marker (the converter matches on those literally). The convention is
  documented under "Language" in `README.md`.
- [x] ~~**`systems/frr-dashboard.md` is left in Korean on purpose**~~ — **resolved
  (2026-08-21).** The owner chose redact-and-translate: the repository address is out of
  `org`, `repo` and `source`, and out of `TODO.md` and the case study as well; the entry is
  now English with `frr-dashboard.ko.md` beside it. Commit hashes were kept — they let the
  owner re-verify and identify nothing on their own. It stays `coverage: internal`, so it is
  still filtered out of the public data.
- [x] ~~**Satoshi has not been render-verified with the real typeface**~~ — **the item was
  moot (closed 2026-08-23).** The site does not use Satoshi. It ran on it for part of
  2026-08-21 and was reverted the same day at the owner's request, which `site/README.md`
  already records; `docs/assets/site.css` sets `--sans` to **Pretendard Variable** and the word
  Satoshi appears nowhere in `docs/`. There was no render left to verify.
  **What was genuinely unverified was Pretendard, and it now is.** The same note claimed
  jsDelivr was proxy-blocked and that verification had been done on a local copy. jsDelivr
  answers from this session (stylesheet 55,760 B / 92 `@font-face`; a subset woff2 at
  34,568 B), and on the deployed page `document.fonts.status` is `loaded`,
  `document.fonts.check('16px "Pretendard Variable"')` is **true**, and the loaded face
  reports the variable range **45 920**. Recorded in `site/README.md`.
