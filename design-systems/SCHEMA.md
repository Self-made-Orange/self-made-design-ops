<!-- lang-links -->
> **English** · [한국어](SCHEMA.ko.md)
<!-- /lang-links -->

# Corpus schema

This document defines the fixed format that the documents under `systems/`, `patterns/`
and `tokens/` must follow. **The format has to be fixed for the 100 to be comparable with
one another.** Read this before adding a new entry.

## Principles

1. **Facts first.** Verifiable information — token values, scales, component lists,
   dimensions — comes above all else. Evaluative words such as "beautiful" or "intuitive"
   do not go in.
2. **Do not copy the original text.** Summarise or restate guideline prose and link the
   source. Factual information such as token values and scales may be quoted as-is.
3. **No speculation — this applies to the reasons as much as to the values.**

   Leave values you could not confirm empty and mark them `unverified`. Filling in a
   plausible value destroys the credibility of the whole corpus.

   **The rule is broken more often on the "why".** It is tempting to attach a plausible
   reason to something you observed, but if the source does not say it, you made it up.
   Record the observation and leave the reason out.

   | Do not write | Write |
   |--------------|-------|
   | The bottom touch target is 48pt, apparently enlarged because it is in the thumb's reach | 44pt at the top, 48pt at the bottom. The kit gives no reason |
   | The large radius appears to reflect a card-centric UI | The maximum radius is 32px |
   | Accessibility requirements appear to be reflected in the scale | There is a 44px step. The source states no rationale |

   Banned phrasing: "appears to be" · "presumably" · "because of" · "with the intent of" ·
   "a natural choice" · "aiming for the effect of" — not to be used unless the source says
   so explicitly.

   **Comparison and contrast are not speculation.** Placing observations side by side —
   "Ant Design uses 14px, Canvas 16px" — is a statement of fact. It becomes speculation the
   moment you add why.

   Where the source does state a reason, record it **together with the fact that it does**.
   For example: "The source comments state that the responsive map should be preferred."
4. **A verification date is mandatory.** Design systems keep changing. An entry without a
   `verified` date cannot be trusted.

## Harvest depth (`coverage`)

This records **how far this corpus went with that system**. It is **not** a ranking of the
system's quality, maturity or importance.

| Value | Depth captured | Length | Additional requirement |
|-------|----------------|--------|------------------------|
| `full` | down to the component level — variants, states, dimensions | 250–400 lines | a `## Components in depth` table |
| `partial` | down to tokens. Components as a list only | 100–200 lines | — |
| `minimal` | documentation-layer notes | ~60 lines | — |
| `internal` | an in-house product sample. **Excluded from the public data** | — | filtered out by `build-data.mjs` |

> **This used to be `tier: A | B | C`.** The name read as a ranking, so it was changed —
> the corpus includes entries such as national government design systems **where being
> misread as a relative grade would be a problem**, and what actually separated A from B
> was never quality but **how much we were able to harvest**. If upstream publishes down to
> component dimensions it becomes `full`; if it publishes only tokens it becomes `partial`.
> In other words the value is **upstream's disclosure × our harvest**, not whether the
> system is good or bad.

## Language versions

Documents keep **English as the primary version** and preserve the Korean original
alongside it.

| File | Language | Character |
|------|----------|-----------|
| `<slug>.md` | English | **The primary version.** What the generators, the site and the agents read |
| `<slug>.ko.md` | Korean | The original the author actually wrote while researching |

- Why English is the one **without** a suffix: the root `README.md` (English) plus
  `README.ko.md` already follows the same convention, and site and agent consumption is
  English-first. Inverting it for corpus documents alone would split the convention in two.
- Each version carries a **language switcher** at its head. Do not write it by hand;
  generate it with `node design-systems/i18n.mjs --links`.
- The generators read **only the suffix-less version**. Otherwise the same system would be
  counted once per language (`LANG_SUFFIX` in `build-data.mjs`).
- To add a language, place it as `<slug>.ja.md` and add its name to `LANG_NAME` in
  `i18n.mjs`.

**The migration proceeds document by document.** A document not yet moved stays in Korean
at `<slug>.md` and the generators read it as-is — which is why the site does not break
mid-migration. Verify with `node design-systems/i18n.mjs --check` (wired into CI).

## `systems/<slug>.md`

The slug is lower-case kebab-case, based on the product name (`carbon`, `material-3`,
`apple-hig`). Use the system's name, not the company's — Carbon, not IBM.

### Frontmatter (required on every entry)

```yaml
---
name: Carbon Design System     # exactly as officially written
org: IBM
coverage: full                 # full | partial | minimal | internal
url: https://carbondesignsystem.com
repo: https://github.com/carbon-design-system/carbon   # null if none
license: Apache-2.0            # documentation/code licence; if they differ, "code: X, docs: Y"
tech: [React, Web Components, Angular, Vue]            # officially provided implementations only
figma_kit: true                # whether an official Figma library is provided
tokens_format: [JSON, SCSS, CSS]   # token distribution formats, [] if none
a11y_target: WCAG 2.1 AA       # the stated target, null if none
platform: web                  # web | mobile | desktop | spatial | wearable | tv | automotive
                               # an array for several platforms: [web, mobile]
domain: enterprise             # enterprise | consumer | commerce | os | public | health | data |
                               # framework | aerospace
verified: 2026-08-16           # the date this document was actually checked
---
```

`domain` is used when grouping in the `patterns/` cross-cuts — "enterprise does it this
way, commerce that way". When the value is ambiguous, pick a single one by primary use.

**`framework` is for the case where there is no audience.** Tailwind CSS · shadcn/ui ·
Mantine · Radix Themes are **tools other people build products with, not a company's own
product**. The value was added because they cannot be classified by audience.

**`aerospace` is for the case where an external specification sets the tokens.** Astro UXDS
(space mission control) keeps six security classification colours as tokens
(`unclassified` … `topsecretsci`), and that is not a design judgement but the US
government's document classification standard. It is the same kind of constraint as the
24sp minimum font on automotive platforms (`platforms.md`).

The distinction actually changed a conclusion — the sole counterexample to the common
spacing core `4/8/16/24` (Mantine) came from the `framework` domain
(`tokens/scales.md`).

**When to mint a new domain value:** only when putting the system under an existing value
**would erase why it decided as it did**. Filing Astro UXDS under `enterprise` makes the
classification colours look like a merely unusual palette and deletes the mission-control
context. **Without splitting by domain, all that survives is "one sample broke the rule",
and what kind of system it was disappears.**

**Do not confuse `platform` with `domain`.** `platform` is the runtime environment,
`domain` the audience. Material 3 is `platform: [web, mobile]` and `domain: os`.

Different platforms have different token structures outright — every web system tokenises
spacing, and no mobile OS does. See `platforms.md` for the evidence.

### Body sections (fixed order)

Do not delete an empty section; leave it marked `unverified` — a gap and a not-yet-checked
have to be distinguishable.

```markdown
## In one line
One sentence on what the system is for. If its character does not come through here, there
is no reason to read on.

## Tokens
### Spacing
List the actual scale values and state the base. For example: `2/4/8/12/16/24/32/40/48 (base 8)`
### Typography
The size scale plus the typefaces. Include the line-height rule if there is one.
### Colour
How the palette is built (number of steps, whether there is a semantic layer). Do not list
every hex value — link the source instead.
### Radius / elevation
The radius scale and the shadow steps.

## Components
The list of components provided. Record the count alongside.

## Characteristic decisions
★ The core section of this corpus.
Where it parts from other systems, and on what evidence. For example: "holds radius at 0 —
an industrial tone". Facts common to everyone, such as "it has a button", do not go here.
Only the differences.

## Accessibility
The stated compliance target, in-house verification tooling, areas given particular
attention.

## References
A list of source links. Direct links to token files are especially useful.
```

### Additional section for a `full` harvest

Place it after `## Characteristic decisions`.

```markdown
## Components in depth
### Button
| Variant | Use | Height |
|---------|-----|--------|
| primary | one main action per screen | 48px |

States: default / hover / focus / active / disabled / loading
Focus ring: 2px inset + 1px outset

### Modal
(same format)
```

At minimum, cover these components: Button, Modal/Dialog, Form (Input/Select), Table,
Navigation. `patterns/` is cross-cut along those five axes.

## `patterns/<component>.md`

Compares one component across many systems. **This is the document you actually open while
building UI.**

```markdown
# Modal

## <decision axis 1>
| System | <option A> | <option B> |
|--------|------------|------------|

→ A line or two on where they converge and diverge. A table with no reading of it is worth
half as much.

## <decision axis 2>
...

## Implementation defaults
The agreed points written up as actionable defaults. This section is the document's purpose.
```

Choose axes that are **decisions systems actually differ on**. Something everyone does the
same way cannot be an axis. For a modal: how it closes, width steps, focus trapping, how it
transforms on mobile, and so on.

## `tokens/scales.md`

Compares spacing, type and radius scales across systems. The format is the same as
`patterns/`.

## Verification rules

- Open the frontmatter `url` before writing it down. A dead link means the whole entry is
  suspect.
- `license` follows the repository's LICENSE file. Documentation and code licences
  frequently differ.
- Record token values only from official documentation or token files. Do not back-infer
  them from example code.
