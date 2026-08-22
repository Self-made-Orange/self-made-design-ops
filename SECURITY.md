# Security and disclosure

## Reporting

Found something in this repository that should not be public — a key, a private
address, someone's data? Open an issue with no detail in it and ask for a private
channel, or email the address on the owner's GitHub profile. Do not put the finding
itself in a public issue.

## What this repository holds

Measurements of 116 public design systems, the tooling that took them, and one
internal sample kept for comparison. No credentials, no product data, no personal
data. `.env`, `.env.*` and `.claude/settings.local.json` are gitignored because MCP
configuration can carry tokens; nothing of that shape has ever been committed.

## 2026-08-22 — a disclosure audit, and what it taught

An audit of the full tree and of git history found no credentials. It found four
other things, all now fixed in the tree and purged from history:

1. **Two Figma `fileKey`s labelled as community files were duplicates in the
   owner's account.** Figma's oEmbed endpoint answers **without authentication**
   and returns a file's title, thumbnail and **the name of the team folder it sits
   in** — so a key in a public `source:` field leaks an internal folder name.
   `design-systems/HARVESTING.md` now carries the mechanism and the rule.
2. **An unreleased product's name** in eight places, including a line saying the
   event-taxonomy conventions were derived from that product's MVP sheet.
3. **The internal sample described its subject matter** in enough detail to
   identify the owner's circumstances.
4. **No licence at all**, while the footer said "Open source". Fixed — see
   `LICENSE`.

### The audit itself leaked, and that is the sharpest lesson here

While verifying whether a removed blob was still served, the check was run through
`.github/workflows/peek-url.yml` — a workflow that fetched a URL and printed the
response into the job log. **Action logs on a public repository are public.** So the
verification put the full contents of the removed file, plus its object SHA in the
request URL, into a publicly readable log. Until that moment the blob was protected
only by nobody knowing its 40-character SHA; the check published the SHA.

The logs were deleted the same day and confirmed gone (404). Nothing here says the
data was accessed — only that a path existed that should not have.

Two things follow, and the second is the one that generalises:

1. **`peek-url.yml` is removed.** Its purpose — reading pages this environment's
   egress proxy blocks — was real, but a tool that echoes fetched bytes into a
   public log is a footgun aimed at exactly the material an audit handles. The
   other workflows were checked and none of them print fetched content:
   `check-sources` prints a report built from this repository's own data,
   `check-avatars` reports only failing handles, `fetch-hero` commits an image
   without echoing it.
2. **Verifying a leak is itself a handling step.** Reading, fetching or echoing the
   sensitive thing to prove it is exposed can widen the exposure. Check with the
   narrowest signal that answers the question — a status code, a byte count, a
   presence test — never the payload, and never through a channel whose output is
   more public than the thing being checked.

### The lesson worth keeping

`event-taxonomy/README.md` had said, in effect, *"the product's event sheet used to
be here and was removed as product-specific data"*, and pointed at the branch that
held it. Both statements were true and neither was a redaction:

- The sheet had been **merged into `main`** before deletion, so the blob stayed
  reachable from `main`'s history regardless of the branch.
- **Deleting a file adds a commit; it does not remove the old one.** A note saying
  "we removed the product data", sitting next to the still-reachable product data,
  is a signpost pointing at it.

**And rewriting history does not evict it from a hosting provider.** After
`git filter-repo` and a force push, a fresh clone was clean — but GitHub still
served the removed blob by its SHA, unauthenticated, through the REST API. Orphaned
objects survive until the provider garbage-collects, and GitHub's documented remedy
is to **contact Support and ask for the unreachable objects to be purged**; forks
keep their own copies regardless.

So the only reliable rule is the boring one:

> **Anything that must not be public must not reach the first commit.** Redaction
> afterwards is damage control with a long tail, not a delete.

Practically, for this repository:

- Product-specific data — tokens, event sheets, translated strings — stays in that
  product's own repository. This is already rule 4 of `profiles/README.md` and the
  scope rule in `design-systems/HARVESTING.md`; the audit is what made it concrete.
- Identifiers that look harmless are worth a second look. A Figma `fileKey` is not
  a credential, and it still hands out an internal folder name to anyone who asks.
- Record the *shape* of a private thing, never its address. Commit hashes are fine
  — they let the owner re-verify and identify nothing on their own.
