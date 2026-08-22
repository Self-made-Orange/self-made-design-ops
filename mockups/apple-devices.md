---
name: Apple Products UI Kit
source: Figma Community
license: unverified (Figma Community distribution)
type: hardware-mockup
verified: 2026-08-16
---
<!-- lang-links -->
> **English** · [한국어](apple-devices.ko.md)
<!-- /lang-links -->

# Apple Products UI Kit — inventory

A kit of Apple hardware renders. **It contains no UI tokens** — device exteriors only.
Use it to show a comp inside a device.

Everything sits on a single `Apple Products` page, divided into frames per device. The list
below was confirmed by reading the file tree directly.

## iPhone

| Model | Colours | Views |
|-------|---------|-------|
| iPhone 13 Pro | Sierra Blue · Silver · Gold · Graphite · Alpine Green | Front · Back |
| iPhone 13 | Pink · Blue · Midnight · Starlight · (PRODUCT)RED™ · Green | Front · Back |
| iPhone 12 Pro | Pacific Blue · Gold · Silver · Graphite | Front · Back |
| iPhone 11 | Purple · Yellow · Green · (PRODUCT)RED™ · White · Space Gray | Front · Back |

**The newest model is the iPhone 13 Pro.** There is nothing after it — for a current device
you have to find another kit.

## iPad

| Model | Colours | Views |
|-------|---------|-------|
| iPad Pro | Space Gray · Silver | Front · Back · Side |
| iPad Air | Space Gray · Starlight · Pink · Purple · Blue | Front · Back |
| iPad Mini | Space Gray · Pink · Purple · Starlight | Front · Back |

Only the iPad Pro has a separate Side view (in two colours).

## Mac

| Model | Colours | Views |
|-------|---------|-------|
| iMac | Green · Yellow · Orange · Red · Purple · Blue · Silver (7 colours) | Front · Back · Side |
| MacBook Pro | Space Gray · Silver | Open · Close · Upper |
| MacBook Air | Space Gray · Silver · Rose Gold | Open · Close · Upper |
| Mac Studio | — | Upper · Front · Back |
| Studio Display | — | Front · Back · Side |

The Studio Display's Side view comes in **two versions, one per stand** — the tilt-adjustable
stand and the tilt- and height-adjustable stand.

Laptops have three views: `Open`, `Close` and `Upper` (the keyboard face seen from above).
Use `Open` to place a screen comp.

## Apple Watch

| Item | Kinds |
|------|-------|
| Series 7 body | Green · Blue · Stardust · (PRODUCT)RED™ · Midnight (Front · Back) |
| Solo Loop band | Cantaloupe · Deep Navy · Kumquat · Ginger · White · Tomales · Pink Citrus · Black · Cyprus Green / Clover |
| Sport Band | Deep Navy · Cyprus Green · White · Capri Blue · Mallard Green · Pink Sand · Black · (PRODUCT)RED™ · Midnight |
| Watch faces | Fitness App · Rings Closed · Mindfulness App · Pride 2020 · **[Replace screen]** |

Bands have **nine colours each in a Front view and a Side view**, kept separately.
The Solo Loop's ninth colour differs between them — Cyprus Green in Front, Clover in Side.

`[Replace screen]` is a slot left empty for your own comp.

## Audio / accessories

| Item | Variants |
|------|----------|
| AirPods (2nd gen) | AirPod Left · Right · Both |
| AirPods charging case | Closed · with AirPods · without AirPods |
| AirPods wireless charging case | Closed · with AirPods · without AirPods |
| AirPods Pro | Left · Right · Both |
| AirPods Pro wireless charging case | Closed · with AirPods Pro · without AirPods Pro |
| Apple Pencil 1st gen | Front · Back · Front [No cap] · Back [No cap] |
| Apple Pencil 2nd gen | Front · Back |
| AirTag | Front · Back · **Engraved** |
| Magic Keyboard | Black · White (Side view) |
| Apple TV 4K | — |
| Siri Remote | 1st gen · 2nd gen |

The AirTag's `Engraved` is the engraved version.
`[No cap]` on the first-generation Apple Pencil is with the cap removed.

## Notes on use

- **The device lineup stops at the iPhone 13 Pro / Apple Watch Series 7 generation.**
  If you need a mockup of a current device, this kit will not do.
- **It is not a UI kit.** There are no components, tokens or text styles.
  Screen UI has to come from a separate kit such as `iOS and iPadOS 26`.
- Each device is a Figma `symbol` (component), so colour and view are changed through variant
  properties.

## Source

Figma Community — "Apple Products UI Kit"

The licence could not be confirmed. **It needs checking before use in anything distributed
externally.** Images of Apple products are Apple's trademarks and copyrighted works, so
Apple's trademark usage guidelines have to be consulted alongside whatever the community
kit's licence says.
