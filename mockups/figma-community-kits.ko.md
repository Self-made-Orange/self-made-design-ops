---
name: Figma Community 공식 계정 조사
source: figma.com/community
type: 부재 확인 (공식 하드웨어 목업 없음)
license: 계정별 상이
verified: 2026-08-18
---
<!-- lang-links -->
> [English](figma-community-kits.md) · **한국어**
<!-- /lang-links -->

# Figma Community 공식 계정 — 하드웨어 목업 유무

**결론: 제조사·플랫폼 공식 계정이 Figma에 발행한 하드웨어 목업 킷은 없습니다.**
Figma에서 인기 있는 기기 목업 킷([`apple-devices.md`](apple-devices.md)의
"Apple Products UI Kit" 포함)은 전부 서드파티 개인 계정 발행입니다.

공식 계정들을 하나씩 열어 리소스 목록을 확인한 결과입니다 (2026-08-18).

## 공식 계정별 확인 결과

| 계정 | 정체 | 하드웨어 목업 | 실제로 있는 것 |
|------|------|:---:|----------------|
| [@apple](https://www.figma.com/@apple) | Apple 공식 (2021~) | ✗ | Apple Design Resources — iOS/iPadOS 27, macOS 27, visionOS 26, watchOS 26, App Icon Template 등 UI 킷 |
| [@androiddesign](https://www.figma.com/@androiddesign) | Google Android Design 공식 | ✗ | Android UI Kit, M3 Wear OS Apps/Tiles Design Kit, Car App Templates, Watch Face Designer 등 |
| [@tv](https://www.figma.com/@tv) | Google TV 공식 | ✗ | TV Design Kit, TV App Icon Template, 샘플 앱 |
| [@microsoft](https://www.figma.com/@microsoft) | Microsoft Design 공식 (2020~) | ✗ | Windows UI Kit, Microsoft 365 UI Kit, Fluent 1 Web/iOS, Fluent emoji, 각종 플러그인 |
| [@meta](https://www.figma.com/@meta) | Meta 공식 (2020~) | ✗ | Meta Horizon OS UI Set, Astryx Library, Origami Pasteboard — Devices 킷은 Figma에 없음 |
| [@samsung](https://www.figma.com/@samsung) | Samsung 명의 (2021~) | ✗ | **리소스 0개** (빈 계정) |
| @google | — | — | **계정 자체가 없음** (404) — Google은 제품팀별 계정으로 분산 |

## 함정: "공식처럼 보이는" 서드파티

- **"Android UI Kit"** (community/file/1237551184114564748, 14k+ 저장) —
  발행자가 개인 계정 `ivyknight`입니다. 공식 아님. 공식 Android UI Kit은
  @androiddesign 계정의 "🧰 Android UI Kit"입니다.
- Pixel·Galaxy·Surface 목업으로 검색되는 파일들(BRIX Templates 등)도 전부
  서드파티 — 라이선스 개별 확인 필요.

## 공식 킷을 판별하는 법

1. 발행 계정 핸들이 위 표의 공식 계정인지 확인.
2. developer.android.com / developer.apple.com 등 공식 문서에서 해당 커뮤니티
   파일로 **직접 링크**하는지 확인 (예: Wear OS 디자인 킷은
   developer.android.com/design/ui/wear에서 링크됨).

## 참고 — Apple 기기 베젤

Apple은 Figma에는 UI 킷만 올리지만, **developer.apple.com/design/resources/**
쪽에 제품 베젤(bezel) 이미지를 별도 배포합니다. apple-devices.md의 서드파티
킷(iPhone 13에서 멈춤)보다 최신 기기가 필요하면 그쪽이 공식 경로입니다.
(이번 조사 범위 밖 — 상세 인벤토리는 미확인.)

## 출처

- 각 프로필 페이지를 브라우저로 직접 열어 리소스 목록 확인 (2026-08-18)
- Wear OS 킷 공식성 — developer.android.com/design/ui/wear/guides/get-started/design-kits
