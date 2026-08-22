<!-- lang-links -->
> **English** · [한국어](design-review.ko.md)
<!-- /lang-links -->

# Design review — precise, on corpus evidence

The procedure for **reviewing a mockup (Figma) or an implementation (code) against
the `design-systems/` corpus**. The goal is not "pretty" or "off"; it is
**"where does this stand relative to the samples, and if it deviates, is that
intent or mistake?"**

> **(2026-08-18 from the field test)** This instruction ran against a real product for the
> first time on a relocation-planner dashboard; the result is
> `agents/case-studies/frr-dashboard-review.md`. Where it got stuck has been fixed in
> the items marked "(2026-08-18 from the field test)" below.

> **(2026-08-18 from the field test)** An earlier version hard-coded "against 104 samples"
> into the body, which goes stale the moment the corpus grows. **Sample counts are
> not written here.** Each axis has its own count (68–83 as of the re-synthesis), so
> **read that axis's count from the top of the relevant `patterns/*.md` and carry it
> into the report.** For the overall size, see `design-systems/index.md`.

## The three verdicts

Every finding is classified as one of these three. A finding without this
classification does not get raised.

| Verdict | Meaning | Example |
|---------|---------|---------|
| **Convergence deviation** | departs from a value most samples agree on — worth asking why | 32px touch target (under Apple's 44pt and Material's 48dp) |
| **Accepted divergence** | an axis where the samples themselves split — a choice, not a deviation | 14px body (CJK convention) vs 16px (Western web convention) |
| **Internal inconsistency** | disagrees within the work itself, regardless of outside samples | buttons on an 8px grid but card padding at 10px |

**The third is the most valuable kind of finding.** You could find it without the
corpus, but with the corpus you have a basis for asking whether a value is a mistake
or a decision.

### A sub-type of internal inconsistency — contract mismatch (2026-08-18 from the field test)

There is often **more than one subject**: a design-system catalogue plus the real
implementation, a Figma library plus the code, a design-token file plus the
components. **A disagreement between the two is also an internal inconsistency**, and
it is usually the upstream cause of the rest.

- Before starting, decide **which one is the contract and which is the
  implementation**.
- Do not scatter a contract mismatch across individual findings — **bundle it into
  one** and state the cause ("token declarations exist in two copies, so drift is
  structurally guaranteed").
- The contract side really does turn out to be the wrong one sometimes. Judge which
  is right on evidence.

## Procedure

### 0. Locate the subject first

Classify the subject on the axes in `design-systems/platforms.md` — platform
(mobile/desktop/TV/watch/automotive), viewing distance, input method
(touch/pointer/remote/crown and bezel). **A different platform changes the reference
numbers wholesale** (focus gaps on TV, safe areas on a watch). If it is not a web or
mobile app, read that file first, always.

**Check first whether one subject spans two axes** (2026-08-18 from the field test) —
responsive web is pointer at the desktop breakpoint and touch at the mobile one.
**Judge touch targets and type sizes only at the mobile breakpoint**, and state in
the report where you judged them.

### 0-a. Pin the subject's revision (2026-08-18 from the field test)

Write the **commit hash / file version / mockup version** at the top of the report.
Telling people to check the corpus's `verified` date while leaving the subject's own
version out makes the report irreproducible.

### 0-b. Check whether the corpus already has a sample of this subject (2026-08-18 from the field test)

```bash
ls design-systems/systems/ | grep -i <subject>
```

**If there is one, it is the primary evidence.** Read it before comparing against
outside samples — it records the token structure, derivation relationships, already
known mismatches and the "still to confirm" list, which saves you rediscovering the
same things.

**And if the sample and the subject's revision differ, the sample may be wrong.**
When your measurements disagree with the sample, give the report its own
**"corpus sample correction"** section and write it down there. Updating the sample
is not part of a review, but without the record the next person falls into the same
trap.

### 0-c. If the subject has a `DESIGN.md`, run the linter first (2026-08-18 from the survey)

If the product root has a `DESIGN.md` (the agent-facing visual identity file),
**make it pass the machine check before a human looks at it.**

```bash
npx @google/design.md lint DESIGN.md    # JSON output, exit 1 on error
```

What the linter catches: contrast ratios (computed to WCAG), broken token
references, orphan tokens, section order, unknown keys, duplicate headings.
**Do not check these by hand.**

**But "lint passes" is not "finished"** — empty `colors` was observed to go uncaught
(`design-systems/INTEROP.md`). Carry out the three-verdict review as normal after
the linter passes. The format also has **no slot for motion, density, platform
branching or touch targets**, so those axes have to be reviewed against the corpus
documents.

### 1. Per-axis checks — which file, and against what

**Skip axes the subject does not have** (2026-08-18 from the field test). The table below
is an index, not a checklist. Do not fill in the modal axis as "unverified" for a
product that has no modals — **not applicable** goes as one line under "what could
not be checked", and you move on.

**When you open each document, read the "Re-synthesis across N samples" section first**
(2026-08-18 from the field test). Seven axes — `button` · `form` · `modal` · `motion` ·
`color` · `typography` · `table` — have a 2026-08-18 re-synthesis section, and
**where it disagrees with the conclusions earlier in the document, the re-synthesis
wins** (each document says so at the top). The "key basis" column below is
post-re-synthesis too.

**Axes without a re-synthesis section rest on a different sample base**
(2026-08-18 from the field test) — `tokens/scales.md` stands on roughly 60 confirmed
spacing scales, but its implementation-defaults section is a recommendation based on
24 samples, and `navigation.md` and `feedback.md` were not part of the re-synthesis.
**Write that axis's real sample count in the report.** Never use the corpus's total
size as if it were an axis's sample count.

| Axis | Evidence file | Key basis |
|------|---------------|-----------|
| Spacing | `tokens/scales.md` | core `4·8·12·16·24·32` recommended. **16, plus 4 and 8, are effectively mandatory.** A 4px grid is convention, not a rule (5, 6 and 10px grids exist). **Not declaring a grid is a bigger finding than departing from one** |
| Typography | `patterns/typography.md` (68-sample re-synthesis) | body 14 (CJK, dense) / 16 (Western web) / 17 (iOS) — accepted divergence. Control type runs **smaller, equal and larger camps, all present**. Weight has samples across 400–800 (700 in 16 of them — bold is not a minority) |
| Button | `patterns/button.md` (77-sample re-synthesis) | default height spans **28–56px**, mode 40px but **even the mode covers only ~23%** — there is no "standard height". Three camps for how height is produced (fixed `height`, `min-height`, derived), a third each. **Buttons of the same rank differing in height on one screen is an internal inconsistency** |
| Forms | `patterns/form.md` (78-sample re-synthesis) | **about 30 systems match input height to button height** — flag a mismatch (noting the sample count, since a non-matching camp of 10 also exists). Checkbox converges on 16px (GOV.UK breaks it at 40px). Three approaches to error display |
| Touch target | `platforms.md` | Apple 44pt · Material 48dp. A small visual size can be compensated by the hit area — **check the hit area before judging**. If you cannot check it, do not judge; put it under "what could not be checked" |
| Focus | `patterns/button.md` · `form.md` · `tokens/scales.md` | a 2px ring in most, 3px in shadcn. **No focus style at all is always a finding.** `outline:none` plus a replacement ring (box-shadow) is valid — check for the replacement before judging. Mixing `:focus` and `:focus-visible` puts a ring on mouse clicks too |
| State sets | each `patterns/` document | are hover/focus-visible/active/disabled filled in? On touch-only, active instead of hover (samples branching on `@media (hover:none)`: Mantine, shadcn) |
| Colour and contrast | `patterns/color.md` (79-sample re-synthesis) | text 4.5:1 (AA) · non-text and charts 3:1. **Judge by computing — see §1-a.** Chart colours have contrast-graded palettes in some systems, as in Cloudscape |
| Dark mode | `patterns/color.md` | six approaches — the approach itself is accepted divergence. **Mixing approaches on one screen is an internal inconsistency** |
| Motion | `patterns/motion.md` (83-sample re-synthesis) | is there a duration scale, and is `prefers-reduced-motion` handled (six layers, up to an opt-in inversion that makes no-motion the default). **`scroll-behavior: smooth` and `scrollIntoView` are motion too** — easy to miss in a product with few transitions |
| Radii | `tokens/scales.md` · `patterns/modal.md` · `GLOSSARY.md` | is it a multiple-of-base system, and does it need a per-size ceiling (`min()` clamp — shadcn)? **A literal mode sitting outside the tokens is a token-literal drift finding** |
| z-index | `systems/chakra-ui.md` | seven schemes exist — any scheme is fine, but **arbitrary numbers with no scheme is a finding**. **However this axis has no cross-comparison document, so no sample count can be cited** (2026-08-18 from the field test) — putting it under "what was not judged" and passing it on as a question is more accurate than judging it |

### 1-a. Contrast is computed (2026-08-18 from the field test)

The earlier version said only "no eyeballing" and gave no method, which is where a
real review got stuck. **Compute it with the WCAG relative-luminance formula.** Do
not list the colours and move on.

```python
def lin(c):
    c = c / 255
    return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
def L(hex):
    h = hex.lstrip('#'); r,g,b = (int(h[i:i+2],16) for i in (0,2,4))
    return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)
def ratio(fg, bg):
    a, b = sorted((L(fg), L(bg)), reverse=True)
    return round((a+0.05)/(b+0.05), 2)
```

- **Put the real background in.** The same text colour passing on white and failing
  on `surface-2` / `bg` is common — it only shows up if you run it per token pairing.
- **Do not apply the large-text exception loosely** — that is 18.66px bold, or 24px
  and above. Badges and captions (11–13px) are held to 4.5:1 at any weight.
- **For charts, check series-to-series contrast on top of the 3:1 (WCAG 1.4.11).**
  Passing against the background but being indistinguishable between series means the
  data is separated by colour alone.
- Compute the state colours (hover, active) too. **Cases where only the resting state
  fails do occur.**

### 2. When the subject is a Figma mockup

> **Skip this section when it is not a mockup.** (2026-08-18 from the field test)

- Read real values over MCP (`get_design_context` · `get_variable_defs`). Do not
  judge numbers by eye from a screenshot — **numbers are always measured.**
- Distinguish what is defined as a variable (token) from what is a literal. Even with
  correct values, a scattering of literals is a maintainability finding.
- Check whether the component's state variants (hover, disabled, etc.) exist in the
  mockup — the gaps an implementer ends up filling arbitrarily are the most common
  source of quality loss.

### 3. When the subject is code

- Find the token/variable definition file first, and see whether components
  reference it or hard-code literals. **If there is more than one definition file,
  write that down before anything else** (2026-08-18 from the field test) — several static
  HTML pages with no build, each declaring its own `:root`, really does happen.
- Counting the **frequency of literals** for spacing, colour and radii with grep
  exposes internal inconsistency mechanically.

  ```bash
  grep -oE 'border-radius: ?[0-9]+px' f.html | grep -oE '[0-9]+px' | sort -n | uniq -c | sort -rn
  grep -oiE '#[0-9a-f]{6}\b' f.html | tr 'A-Z' 'a-z' | sort | uniq -c | sort -rn
  ```

  **Look for "almost the same value" in the hex frequency table**
  (2026-08-18 from the field test) — a colour a digit or two off from the token sometimes
  lives separately in a script or a chart palette. The eye will never catch it; only
  the frequency table shows it.
- Accessibility hooks: is `:focus-visible` present, are `aria-invalid` / `disabled`
  handled, `prefers-reduced-motion`, and are logical properties
  (`margin-inline-*`) used.

### 3-a. Measure the render — do it where you can, and say so where you cannot (2026-08-18 from the field test)

**Reading the CSS declarations alone misses derived heights.** A button with only
`font: inherit` plus padding inherits the root 16px and comes out larger than its
siblings. For static HTML, measure it headlessly.

```bash
# inject a measuring script into a copy of the page and dump the DOM
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox --user-data-dir=/tmp/probe \
  --window-size=1440,900 --virtual-time-budget=5000 \
  --dump-dom "file://$PWD/copy.html"
```

What to measure: a histogram of `getBoundingClientRect().height` (how many distinct
heights the same rank of control has), and `getComputedStyle`'s `fontSize`,
`fontWeight`, `borderRadius`, `color`, `backgroundColor`. **Run it again at the
mobile breakpoint** — if the headless minimum window width constrains you, record the
width you actually measured at.

**Always clean up the processes afterwards (2026-08-18 from the field test).** Even with
`--virtual-time-budget`, headless instances sometimes linger holding a GPU helper —
on the first real application **17 were left as zombies holding about 1.5GB** (at 0%
CPU). Give the profile directory a probe-specific name and use it to select what to
kill; never touch the browser the user is actually using.

```bash
# terminate only the probe profile (leaves normal Chrome alone)
PIDS=$(ps aux | grep "[G]oogle Chrome" | grep "cdp-probe" | awk '{print $2}')
kill $PIDS; sleep 2
kill -9 $(ps aux | grep "[G]oogle Chrome" | grep "cdp-probe" | awk '{print $2}') 2>/dev/null
rm -rf /tmp/cdp-probe*
```

`kill` (TERM) does not always take, so **be ready to go to `-9` after checking what
survived**.

**When measuring the render is impossible** (auth gates, API dependencies, DOM
generated at runtime):

- **Measured declarations plus box-model derivation** is as far as the evidence goes.
  Mark derived values `derived` in the report.
- **Do not write "measured".** A derived value can differ from the rendered result.
- Inject scripts only into a copy, and **treat the subject repository as read-only.**

## Report format

```markdown
## Review report — <subject> (<date>)

| Item | Value |
|------|-------|
| Subject revision | <commit/version> |
| Coordinates | <platform · input method · breakpoint judged at> |
| Existing corpus sample | <systems/*.md, or none> |
| Measurement method | <rendered / declared + derived / real values over MCP> |

### Verdict summary
| Verdict | Count |
|---------|:---:|
| Convergence deviation | N |
| Accepted divergence | N |
| Internal inconsistency | N |

### <grouped by verdict>

| # | Item | Observed | Corpus evidence (sample count) | Recommendation |
|---|------|----------|-------------------------------|----------------|
| E1 | button height | 34px | `button.md` 77-sample re-synthesis — range 28–56, mode 40 | 32 or 36 |

### What was not judged
- … (axes with no citable sample count, etc.)

### Questions (items that could not be judged)
- …

### What could not be checked
- … (with the reason)

### Corpus sample corrections (where a sample existed)
- …
```

- **Group by verdict** (2026-08-18 from the field test). Mixed into one table, "how many
  deviations are there" becomes invisible. The verdict summary at the top is
  mandatory.
- **Put the sample count in the evidence column** (2026-08-18 from the field test). The
  shared discipline in `agents/README.md` ("state the sample count alongside") had
  nowhere to land in the earlier table.
- **If it cannot be judged, pass it on as a question.** Do not force a verdict.
- Severity order: accessibility (focus, contrast, targets) → internal inconsistency →
  convergence deviation → taste. **Taste does not go in the report.**
- Do not pad the count — zero findings means the conclusion is "nothing notable
  against the corpus".

### Where the output goes (2026-08-18 from the field test)

This is where it is easiest to collide with shared discipline 3 in
`agents/README.md` (no product data comes in).

- **The report itself goes to that product's repository.**
- **What stays in the corpus is only the procedure-verification record**, in
  `agents/case-studies/`. Quote **only the values a verdict rested on** — do not
  carry over token tables, full palettes or strings.
- If the product already has an internal sample in `design-systems/systems/`, put the
  sample corrections in the report and hand the sample-file update on as separate
  work.

## When the corpus disagrees with itself (2026-08-18 from the field test)

It really happens — the heading, table and body of one section stating different
sample counts, for instance.

- **Do not just pick a side.** Write the disagreement as-is under "incidental
  findings" in the report, and either hold back the verdicts that depend on that
  value or make them weakly, with the sample count stated.
- Where the front of a document and the re-synthesis section differ, **the
  re-synthesis wins** (there is a rule for this one).
- **Within a re-synthesis section, the table and the summary sentence can also
  diverge — the table is authoritative** (2026-08-19 from a correction). There was a real case
  where the 14px camp in `typography.md` was 17 samples in the table while the
  implementation-defaults summary 200 lines below still said 13. **Additions land in
  the table while the summary sentence is left untouched** — that path has been
  confirmed repeatedly. Count the axis's table once before citing a number.

## Forbidden

- Citing a number the corpus does not have as an "industry standard" (no evidence
  file means unverified)
- Judging numbers by eye from a screenshot
- A contrast verdict you did not compute (2026-08-18 from the field test)
- Calling a value derived from declarations "measured" (2026-08-18 from the field test)
- Writing up an accepted divergence as a violation ("16px is the standard and this
  uses 14px" — a wrong finding)
- Citing a stale conclusion from the front of a document without reading the
  re-synthesis section (2026-08-18 from the field test)
- Modifying the subject repository during a review — work on a copy
  (2026-08-18 from the field test)
- The phrasings forbidden by `design-systems/SCHEMA.md`
