<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# interpreted/ — authored-interpretation profiles

**These are interpretations, not samples.** Nothing here is derived from the
corpus; the substance is **the author's judgement** (evidence grade **A**) about
how to build a product with a particular feel. If `measured/` is the skeleton,
this is the flesh.

> **Why a separate layer.** This repository's credibility comes from "only what was
> measured gets written down". Putting interpretations in the same place as corpus
> samples destroys that distinction. So they get **their own directory, an evidence
> grade on every file, and no place in any sample count.**

## Why this layer is needed

`measured/` alone makes agent output **generic** — the structure is right but it
has no expression. Colour, tone, curvature and the character of motion have no
right answer in the samples, and yet **if nobody decides them, the agent fills them
in arbitrarily.** Filling that gap with an explicit interpretation is this layer's
job.

## Rules for writing one

1. **State the character on the first line of the frontmatter** — the `description`
   must say "authored interpretation (A), not a corpus sample".
2. **Record intent for every A value.** Why this colour, why this curvature, in
   prose. A value you cannot write that for does not go in.
3. **Mark M/D values when you mix them in** — spacing and control heights usually
   come from `measured/`, and the Overview should say so.
4. **Do not imitate real brands.** A file that reproduces a specific company's look
   does not belong here. Quite apart from trademark and copyright, the thing this
   repository must avoid most is **values with no citable source coming to look
   like values that have one.** Reference the outside ecosystem below instead.
5. **Fill the colours, then check them** — `npx @google/design.md lint` computes
   WCAG contrast automatically.

## File format

Copying a `measured/` output is the fast start:

```bash
node design-systems/to-design-md.mjs --profile web --name "<look name>" \
  -o profiles/interpreted/<look>.DESIGN.md
# then fill in colors, and write the "authored interpretation" character and the
# intent behind it into the Overview
```

## The outside ecosystem — referenced, not absorbed

Assets of this same character already exist elsewhere (surveyed 2026-08-18; details
in `design-systems/INTEROP.md`):

| Source | Size | Character | How we treat it |
|--------|:---:|-----------|-----------------|
| `getdesign` (npm) | **76** templates | brand-look interpretations — its own README calls them *"inspiration files, not official design systems"* | **Not absorbed.** Same character as this layer, but it is **a third party's work** and we cannot cite where its values came from |
| `designmd` (npm · MCP) | user-uploaded registry | search, download, upload | Not absorbed. Something to pull from via the CLI when needed |

**That table is what "holding it as a different category" actually means** —
instead of copying someone else's interpretations in, we record **what exists
where and what character it has**, and write our own interpretations here under
our own name.

## Current state

**No files yet.** They get written when real product work needs an interpretation —
building looks nobody will use just piles up unverified A values.
(The selection output of `agents/system-selection.md` is this layer's input.)
