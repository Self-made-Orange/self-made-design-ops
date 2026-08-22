<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# data/ — the machine-readable extract

JSON for using the corpus directly from code, scripts or an LLM context.

| File | How it is produced | Contents |
|------|--------------------|----------|
| `systems.json` | **automatic** — `node design-systems/build-data.mjs` | the whole frontmatter of `systems/*.md` (65 fields: name · organisation · harvest depth · platform · domain · source pin · verification date) |
| `values.json` | **hand-curated** | the cross-comparison conclusions — spacing adoption rates · body-size camps · CJK weights · pill vs circle radius · the five z-index arithmetics · touch targets · springs · dark-mode approaches · Liquid Glass |

## Rules

- **Every entry in `values.json` has a `source` field** — the path of the document it rests
  on. The context around a value (counterexamples, caveats) lives in that document, so for
  entries that are easy to get wrong when lifted on their own, a `$comment` summarises the
  trap (for example, which systems make `full` 9999px and which make it 50%)
- After adding or editing a system entry, re-run `build-data.mjs` to refresh
  `systems.json`. `values.json` is reviewed whenever the cross-cutting documents
  (`patterns/` · `tokens/`) change
- A value that is not here is one the corpus could not verify — do not fill it in by
  guessing
