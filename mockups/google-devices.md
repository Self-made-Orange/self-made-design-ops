---
name: Google official device art
source: developer.android.com
license: officially provided — but not permitted on Google Play Store listings
type: hardware-mockup (web tool)
verified: 2026-08-18
---
<!-- lang-links -->
> **English** · [한국어](google-devices.ko.md)
<!-- /lang-links -->

# Google official device art — inventory

The one device frame resource Google provides officially is the **Device Art Generator**.
It is **a web tool**, not a distribution of PSD/Sketch/Figma files — drag in a PNG screenshot
and it produces an image with a device frame around it.

- URL: <https://developer.android.com/distribute/marketing-tools/device-art-generator>
- The tool is live (the page's last-updated stamp reads 2025-07-21)
- Options: Shadow · Screen Glare · Rotate
- Input: a PNG screenshot matching the device's screen ratio

## Supported devices (extracted directly from the tool's JS)

### Main list

| Device | Note |
|--------|------|
| Pixel 6 / Pixel 6 Pro | **the newest — it stops here** |
| Pixel 5 | |
| Pixelbook Go | laptop |
| 7.6" Foldable (main screen) | a generic foldable, manufacturer unstated |
| 10.1" WXGA Tablet | a generic tablet |
| Wear OS by Google (Square / Round) | generic watch frames |

### "Older devices" (archive)

Nexus 5X · Nexus 6P · Nexus 9 · Pixel / Pixel XL · Pixel 2 / 2 XL ·
Pixel 3 / 3 XL · Pixel 3a / 3a XL · Pixel 4 / 4 XL · Pixel 4a · Pixelbook

(The Nexus 6 and the older Wear OS frames are in the code but hidden.)

## Terms of use

- Use on websites and in promotional material is described as an official use.
- **Do not put frames on screenshots or feature graphics for the Google Play Store** — the
  page states this prohibition explicitly.

## Absent / unverified

- **No downloadable mockup files (PSD, Figma)** — Google does not distribute Pixel hardware
  renders as files. The official Figma accounts (@androiddesign, @tv) have no hardware
  mockups either (see [`figma-community-kits.md`](figma-community-kits.md)).
- **No Android TV / Google TV frames** — the Device Art Generator has no TV devices.
- Pixel marketing imagery is presumed to sit in the Google Partner Marketing Hub
  (partners only) but is **unverified** — it requires an approved login.

## Notes on use

- The device lineup **stops at the Pixel 6 generation (2021)**. If you need a mockup of a
  current Pixel, the official source will not do.
- The output is a single composited PNG produced by the tool, so touching the layers or
  changing the angle is impossible.

## Source

- Device Art Generator — developer.android.com/distribute/marketing-tools/device-art-generator
- The device list was confirmed by reading the tool's `device-art-generator.js` directly
  (2026-08-18)
