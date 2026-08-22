---
name: Apple Products UI Kit
source: Figma Community
type: hardware-mockup
license: 미확인 (Figma Community 배포)
verified: 2026-08-16
---
<!-- lang-links -->
> [English](apple-devices.md) · **한국어**
<!-- /lang-links -->

# Apple Products UI Kit — 인벤토리

Apple 하드웨어 렌더링 킷입니다. **UI 토큰은 없습니다** — 기기 외형만 들어 있습니다.
시안을 기기 안에 넣어 보여줄 때 씁니다.

전체를 `Apple Products` 페이지 하나에 담고 있으며, 기기별 프레임으로 나뉩니다.
아래는 파일 트리를 직접 읽어 확인한 목록입니다.

## iPhone

| 모델 | 색상 | 뷰 |
|------|------|-----|
| iPhone 13 Pro | Sierra Blue · Silver · Gold · Graphite · Alpine Green | Front · Back |
| iPhone 13 | Pink · Blue · Midnight · Starlight · (PRODUCT)RED™ · Green | Front · Back |
| iPhone 12 Pro | Pacific Blue · Gold · Silver · Graphite | Front · Back |
| iPhone 11 | Purple · Yellow · Green · (PRODUCT)RED™ · White · Space Gray | Front · Back |

**최신 모델이 iPhone 13 Pro입니다.** 그 이후 기기는 없습니다 —
최신 기기가 필요하면 다른 킷을 찾아야 합니다.

## iPad

| 모델 | 색상 | 뷰 |
|------|------|-----|
| iPad Pro | Space Gray · Silver | Front · Back · Side |
| iPad Air | Space Gray · Starlight · Pink · Purple · Blue | Front · Back |
| iPad Mini | Space Gray · Pink · Purple · Starlight | Front · Back |

iPad Pro만 Side 뷰가 별도로 있습니다 (색상 2종).

## Mac

| 모델 | 색상 | 뷰 |
|------|------|-----|
| iMac | Green · Yellow · Orange · Red · Purple · Blue · Silver (7색) | Front · Back · Side |
| MacBook Pro | Space Gray · Silver | Open · Close · Upper |
| MacBook Air | Space Gray · Silver · Rose Gold | Open · Close · Upper |
| Mac Studio | — | Upper · Front · Back |
| Studio Display | — | Front · Back · Side |

Studio Display의 Side 뷰는 **스탠드 종류별로 두 가지**입니다 —
기울기 조절 스탠드, 기울기·높이 조절 스탠드.

노트북은 `Open`(펼침) / `Close`(덮음) / `Upper`(위에서 본 키보드면) 세 가지입니다.
화면 시안을 넣으려면 `Open`을 씁니다.

## Apple Watch

| 항목 | 종류 |
|------|------|
| Series 7 본체 | Green · Blue · Stardust · (PRODUCT)RED™ · Midnight (Front · Back) |
| Solo Loop 밴드 | Cantaloupe · Deep Navy · Kumquat · Ginger · White · Tomales · Pink Citrus · Black · Cyprus Green / Clover |
| Sport Band 밴드 | Deep Navy · Cyprus Green · White · Capri Blue · Mallard Green · Pink Sand · Black · (PRODUCT)RED™ · Midnight |
| 워치 화면 | Fitness App · Rings Closed · Mindfulness App · Pride 2020 · **[Replace screen]** |

밴드는 **Front 뷰와 Side 뷰가 각각 9색**씩 따로 있습니다.
Solo Loop의 9번째 색이 Front에서는 Cyprus Green, Side에서는 Clover로 다릅니다.

`[Replace screen]`은 자기 시안을 넣으라고 비워둔 슬롯입니다.

## 오디오 / 액세서리

| 항목 | 변형 |
|------|------|
| AirPods (2세대) | AirPod Left · Right · Both |
| AirPods 충전 케이스 | Closed · with AirPods · without AirPods |
| AirPods 무선 충전 케이스 | Closed · with AirPods · without AirPods |
| AirPods Pro | Left · Right · Both |
| AirPods Pro 무선 충전 케이스 | Closed · with AirPods Pro · without AirPods Pro |
| Apple Pencil 1세대 | Front · Back · Front [No cap] · Back [No cap] |
| Apple Pencil 2세대 | Front · Back |
| AirTag | Front · Back · **Engraved** |
| Magic Keyboard | Black · White (Side 뷰) |
| Apple TV 4K | — |
| Siri Remote | 1세대 · 2세대 |

AirTag의 `Engraved`는 각인 있는 버전입니다.
Apple Pencil 1세대의 `[No cap]`은 뚜껑 뺀 상태입니다.

## 쓸 때 주의

- **기기 라인업이 iPhone 13 Pro / Apple Watch Series 7 세대에서 멈춰 있습니다.**
  최신 기기 목업이 필요하면 이 킷으로는 안 됩니다.
- **UI 킷이 아닙니다.** 컴포넌트·토큰·텍스트 스타일이 없습니다.
  화면 UI는 `iOS and iPadOS 26` 같은 별도 킷에서 가져와야 합니다.
- 각 기기는 Figma `symbol`(컴포넌트)로 되어 있어, variant 속성으로 색상·뷰를 바꿉니다.

## 출처

Figma Community — "Apple Products UI Kit"

라이선스는 확인하지 못했습니다. **대외 배포물에 쓰기 전에 확인이 필요합니다.**
Apple 제품 이미지는 Apple의 상표·저작물이므로, 커뮤니티 킷 라이선스와 별개로
Apple의 상표 사용 지침도 함께 봐야 합니다.
