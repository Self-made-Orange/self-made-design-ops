<!-- lang-links -->
> **English** · [한국어](README.ko.md)
<!-- /lang-links -->

# Mockup resources

An **inventory of device mockup assets** for design comps, store screenshots and proposals.

It is a different kind of thing from the design system corpus (`design-systems/`). What is
here is not tokens or component specifications but **where to get which device mockup**.

## Why it lives here

Every time a comp is made, someone asks "where was that iPhone 13 Pro mockup again?" or
"which Apple Watch band colours are there?". The point is to remove that search.

The files themselves are not committed — there are licence problems and they are large.
Only **what exists where** is recorded.

## The list

| File | Contents | Inventory |
|------|----------|-----------|
| Apple Products UI Kit (Figma Community) | Apple hardware renders (third party, up to the iPhone 13 generation) | [`apple-devices.md`](apple-devices.md) |
| Google Device Art Generator | the official web tool — Pixel and Wear OS frames (up to Pixel 6) | [`google-devices.md`](google-devices.md) |
| Samsung Galaxy Emulator Skin | official emulator skins (up to current devices) — confirmed to have no design mockups | [`samsung-devices.md`](samsung-devices.md) |
| Devices (Design at Meta) | formerly Facebook Devices — 101 devices across 12 brands, still maintained after the move | [`meta-devices.md`](meta-devices.md) |
| Figma Community official accounts | **confirmed: no hardware mockups** published by official accounts (with how to tell) | [`figma-community-kits.md`](figma-community-kits.md) |
| Microsoft Surface | **confirmed: no official mockups** + alternatives | [`microsoft-devices.md`](microsoft-devices.md) |

A confirmed absence ("none / discontinued") is inventory information too — it is recorded so
the same search is not repeated.

## Recording rules

The same as `design-systems/`.

- **Record only what was actually checked.** Only results from opening the file and reading
  its tree.
- **Leave a verification date.** Kits are updated whenever the device lineup changes.
- **Do not commit the files.** Only the source and the inventory.
