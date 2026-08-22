<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# Event taxonomy conventions

The **shared authoring conventions** for defining product analytics events.
A specific product's event definitions do not live here — they belong in that product's
repository.

These conventions generalise the format actually used on a real product's MVP event sheet,
with the product-specific data removed. **The product is not named here** — naming it would
leak the thing this section says does not belong in the repository.

> **The sheet itself is written in Korean.** The CSV headers and the `필수` (required)
> marker are literal strings the converter and the linter match on, so they are quoted here
> exactly as they appear in the files.

## Sheet columns

| Column (literal CSV header) | Contents | Required |
|-----------------------------|----------|:----:|
| Category — `카테고리` | The functional area. Matches the event prefix | yes |
| Event name — `이벤트명` | `{domain}_{action}` | yes |
| Screen location — `화면 위치` | The user's path, written as `Home > Manual entry` | yes |
| Trigger — `트리거` | One sentence on the condition under which the event fires | yes |
| Property key — `프로퍼티 키` | The name of a property sent with the event | |
| Property value / type — `프로퍼티 값 / 타입` | The values, if an enum; otherwise the type name | |
| Condition / notes — `조건 / 비고` | Whether it is required, and the rule for conditional sending | |

`template.csv` holds an empty sheet with only the headers; `example.csv` holds a worked
example.

## Naming rules

### Event names are `{domain}_{action}`

```
sdk_view      sdk_click
chart_view    chart_click
```

For the action, use `view` (entering a screen) and `click` (tapping an element) by default.
Add a new action only when those two will not do, and when you add one, record it in these
conventions.

Match the domain to the category column. Sort the sheet by category and the events group
with it.

### Do not create an event per screen

Even with 13 screens, keep one event, `sdk_view`, and distinguish the screens with a
`screen_name` property.

```
event name   property key    value
sdk_view     screen_name     scan_qr | device_found | analyzing | ...
```

Why:
- If the number of events grows with the number of screens, the dashboard becomes unwieldy
- When a screen is added, the event spec does not change — only the enum gains a value
- For funnel analysis, the steps can be compared within a single event

Conversely, **split events when the domain differs.** Do not merge home and chart into one
`app_view`.

### List enums with pipes

```
menstrual | pre_fertile | fertile | ovulation | post_fertile | luteal
```

If the values are not settled, add an ellipsis — `ovulation | …` — to show they are
provisional. Leaving it blank makes an omission indistinguishable from an open question.

## Conditional properties

Not every property is always attached. In that case, **write the properties on rows
following the event's row** and leave category, event name, screen location and trigger
empty.

```csv
SDK,sdk_view,기기 연결 > [screen_name],화면 진입,screen_name,"scan_qr | device_found | ...",필수
SDK,sdk_view,,,is_new_device,boolean,device_found 화면에서만
SDK,sdk_view,,,device_id,string,device_found 이후 화면에서만
```

- Properties that are always attached get `필수` (required) in the condition column
- For conditional ones, **state in the condition column when they attach**. "Sometimes" or a
  blank leaves the implementer with nothing to go on
- Repeat the event name on every row, so sorting and filtering do not break

## Variables in the screen location

You can reference a property in brackets, as in `기기 연결 > [screen_name]`. When the same
event fires on several screens, this expresses it in one row rather than one row per screen.

## Authoring order

1. **Divide into categories first.** By functional area, usually three to six
2. Start each category with two events, `_view` and `_click`
3. Do not add events for screens and buttons — put them in the `screen_name` /
   `button_name` enums
4. Attach the properties, and always write the condition for conditional ones
5. Where enum values are undecided, mark them `…` and leave them

## Review checklist

Check before handing the sheet over.

- [ ] Is every event in `{domain}_{action}` form?
- [ ] Do the category and the event prefix match?
- [ ] Have events been split per screen?
- [ ] Do conditional properties say **when they attach**?
- [ ] Do required properties carry the `필수` marker?
- [ ] Are undecided enum values marked `…`?
- [ ] Has any product-specific data leaked into this repository?

## The conversion script

`convert.mjs` — converts the sheet into the formats the team uses. No dependencies,
Node 18+ / Bun.

```bash
node convert.mjs sheet.csv --to html -o taxonomy.html
node convert.mjs sheet.csv --lint-only
```

| Target | Output | Use |
|--------|--------|-----|
| `json` | structured JSON | reading from the app, handing to other tools |
| `md` | Markdown | repository documentation, PR review |
| `html` | standalone HTML (search, dark mode) | sharing, printing |
| `tsv` | tab-separated | pasting into Google Sheets or Excel |
| `notion` | CSV | importing into a Notion database |

### The grouping is the point

This is not a plain format conversion. By convention, conditional properties are written on
**rows that continue below the event name with empty cells**, and carrying that over
verbatim leaves any format full of blanks. The script groups by event first and renders
afterwards.

```
CSV (the shape that is good to edit by hand)   →  event objects  →  each format
category  event      screen  trigger  key            value  condition
SDK       sdk_view   …       …        screen_name    …      필수
          (blank)    (blank) (blank)  is_new_device  …      only on device_found
```

### Notion and spreadsheets get flattened

Neither tool understands hierarchy. Blanks break filtering, sorting and grouping, so for
those two targets alone the script emits **a fully flat table with the blanks filled from
the row above**. The required column is also split out as `TRUE`/`FALSE` so it is picked up
as a checkbox property.

### The linter

`--lint-only` checks convention violations alone. It is the checklist above, in code.

- Is the event name in `{domain}_{action}` form?
- Do the category and the event prefix match?
- Are the trigger and properties non-empty?
- Do conditional properties say **when they attach**?
- Are there undecided (`…`) markers left in an enum?

Add `--strict` and it exits without converting on a violation, so it can be wired into CI.

## Out of scope

**A specific product's event definitions do not live in this repository.** They go to that
product's repository. What stays here is the conventions and the empty template.

That product's MVP event sheet used to be in this repository and was removed as
product-specific data.

> **Removing a file does not remove it.** The sheet was merged into `main` before it was
> deleted, so the blob stayed reachable in this repository's history until the history was
> rewritten. Deleting a file and writing "we removed the product data" is not a redaction —
> it is a note next to the data. Anything genuinely sensitive has to be kept out of the first
> commit, or purged from history afterwards.
