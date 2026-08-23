---
name: Codex
org: Wikimedia
coverage: partial
url: https://doc.wikimedia.org/codex
repo: https://github.com/wikimedia/design-codex
license: GPL-2.0-or-later
tech: [Vue, CSS]
figma_kit: 미확인
tokens_format: [JSON, CSS, SCSS]
a11y_target: "WCAG 2.1 AA (명시 — github wikimedia/design-codex README.md, main@5a4ff8980f, 2026-08-23 확인)"
platform: web
domain: public
verified: 2026-08-18
source: "npm @wikimedia/codex-design-tokens@2.6.x → theme-wikimedia-ui-mode-dark.json"
---
<!-- lang-links -->
> [English](codex.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Wikipedia를 비롯한 Wikimedia 프로젝트를 위한 디자인시스템.
콘텐츠 읽기 중심 서비스이고, 극도로 넓은 언어·기기 스펙트럼을 다룹니다.

## 토큰

### 사이즈 — 여백과 폭을 하나의 스케일로

| 토큰 | rem | px |
|------|-----|-----|
| `size-0` | 0 | 0 |
| `size-6` | 0.0625 | 1 |
| `size-12` | 0.125 | 2 |
| `size-25` | 0.25 | 4 |
| `size-50` | 0.5 | 8 |
| `size-75` | 0.75 | 12 |
| `size-100` | 1 | 16 |
| `size-125` | 1.25 | 20 |
| `size-150` | 1.5 | 24 |
| `size-200` | 2 | 32 |
| `size-250` | 2.5 | 40 |
| `size-275` | 2.75 | 44 |
| `size-300` | 3 | 48 |
| `size-400` | 4 | 64 |
| `size-800` | 8 | 128 |
| `size-1200` | 12 | 192 |
| `size-1600` | 16 | 256 |
| `size-2400` | 24 | 384 |
| `size-2800` | 28 | 448 |
| `size-3200` | 32 | 512 |
| `size-4000` | 40 | 640 |
| `size-5600` | 56 | 896 |

**여백용 소형 값(1~48px)과 레이아웃 폭용 대형 값(128~896px)이 한 스케일에 있습니다.**
이름의 숫자는 rem × 100입니다 (`size-100` = 1rem).

### 뷰포트 토큰

| 토큰 | 값 |
|------|-----|
| `size-viewport-32` | 320px |
| `size-viewport-64` | 640px |
| `size-viewport-72` | 720px |
| `size-viewport-100` | 1000px |

브레이크포인트를 사이즈 스케일 안에 두고, **여기만 rem이 아니라 px**입니다.

출처: `@wikimedia/codex-design-tokens` → `theme-wikimedia-ui-mode-*.json`

### 라운드 / 컬러 / 타이포

~~미확인.~~ 라운드·타이포(크기 모드 포함)·전환은 심화 절에서 확인 (2026-08-18).
컬러 팔레트 구조는 여전히 미확인.

## 컴포넌트

~~미확인.~~ → 아래 "컴포넌트 심화" 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@wikimedia/codex@2.6.0`의 컴파일된 `dist/codex.style.css`를 파싱하고,
`@wikimedia/codex-design-tokens@2.6.0`의 토큰 JSON과 교차 확인했습니다.

### 버튼 (`.cdx-button`)

| | small | medium(기본) | large |
|---|:--:|:--:|:--:|
| **min-height** | 1.5rem (24px) | **32px** | **44px** |
| 좌우 패딩 | 5px | 11px | 15px |
| 아이콘 간격(gap) | 4px | 6px | 6px |
| icon-only min-width | 1.5rem | 32px | 44px |
| 라운드 | 2px | 2px | 2px |
| 서체 | 1rem / **700** | 동일 | 동일 |

- **높이 3단이 `min-size` 토큰과 정합합니다** — 32px = `min-size-interactive-pointer`,
  44px = `min-size-interactive-touch`. **large가 곧 터치 타겟 높이**이며,
  토큰층 44px(`size-275`)의 용도가 컴포넌트층에서 확정됩니다.
- **좌우 패딩이 보더 차감값입니다** — 5=6−1 · 11=12−1 · 15=16−1 (보더 1px,
  총 좌우 6/12/16px). MUI(outlined −1px)·Grommet(12−1=11px 산식)과 같은 수법.
- **최소 너비가 없고 최대 너비가 있습니다** — `max-width: 28rem`(448px = `size-2800`).
  min-width를 두는 MUI(64px)·Clarity(64단위)와 반대 방향의 i18n 대응.
- 버튼 서체 1rem·700 — Backpack(16px·700)과 같은 "본문 크기에 볼드" 진영.
- 전환 100ms (`transition-duration-base`) · 대상 4종(`transition-property-base`).
- 높이 단위가 섞여 있습니다 — small만 1.5rem, medium·large는 px 고정.

### 입력 (`.cdx-text-input`)

| | 값 |
|---|---|
| 높이 | min-height **32px** + max-height 2rem — 사실상 고정, **크기 변형 없음** |
| 패딩 | 4px 8px (보더 1px) |
| 라운드 | 2px |
| **min-width** | **256px** (`size-1600`) — 입력 래퍼 자체에 최소 너비 |
| 서체 | 1rem / 행간 1.375rem(22px) |

- 라벨(`.cdx-label`)은 별도 블록 — 1rem·**700**·아래 여백 4px. 플로팅 아님.
- 상태 전환이 **250ms** — 버튼(100ms)과 다른 쪽 토큰. 지속시간 토큰이
  100/250ms 2개뿐이고 컴포넌트별로 나눠 씁니다.
- 버튼은 max-width, 입력은 min-width — 폭 제약의 방향이 컴포넌트별로 다릅니다.

### 다이얼로그 (`.cdx-dialog`)

| | 값 |
|---|---|
| 폭 | max-width **32rem**(512px) **단일 단계** · width calc(100vw − 2rem) |
| 라운드 / 보더 | 2px / 1px |
| 패딩 | 헤더 `16 24 8` · 본문 `8 24` · 푸터 `16 24 24` (좌우 24px 통일) |
| 진입/퇴장 | **fade만, 250ms ease** |
| 백드롭 | **rgba(255,255,255,.65) — 흰색** (다크 모드 rgba(0,0,0,.65)) |

- **라이트 모드 스크림이 흰색 65%입니다** (`background-color-backdrop-light`).
  `patterns/modal.md` 오버레이 대조표의 표본은 전부 검정 계열(가장 옅은 것이
  shadcn/ui 검정 10%+블러) — 흰 스크림은 이 표본이 처음입니다.
- 슬라이드·스케일 없이 페이드만 — 진입·퇴장 대칭 250ms.
- 제목 1.25rem·700, 부제 1rem — 다이얼로그 타이포도 토큰 폴백 체인으로 조립.

### 타이포 크기 모드 — 다크모드와 같은 층위

`theme-wikimedia-ui-mode-{small,large,x-large}.css`가 **폰트·행간 토큰만** 덮습니다.
`font-size-medium` 기준 **14 / 16(기본) / 18 / 20px** 4단.
다크 모드가 색을 덮듯 **글자 크기 선호를 모드 파일로 배포**하는 구조입니다
(Wikipedia 2022 Vector 스킨의 텍스트 크기 설정과 대응).

라운드 토큰도 확정: `border-radius` base **2px** · sharp 0 · pill 9999px · circle 50%.

### 특징적 결정 (심화분)

- **버튼 3단 24/32/44px = 인터랙션 최소 크기 토큰이 곧 버튼 높이** —
  포인터/터치 타겟 규격이 크기 변형으로 직결
- **라운드 2px 전면 통일** — 버튼·입력·다이얼로그가 전부 `border-radius-base` 2px
- **버튼에 min-width 대신 max-width(448px)** — 폭 제약의 역방향
- **흰색 스크림** — 표본 첫 사례
- **글자 크기 모드 파일** — 폰트 토큰만 덮는 mode-small/large/x-large

## 특징적 결정

- **여백과 레이아웃 폭을 한 스케일로 통합했습니다.** 1px부터 896px까지 하나의 `size` 스케일입니다.
  대부분의 시스템은 스페이싱(~160px)과 레이아웃 폭을 분리하는데, Codex는 합쳤습니다.
  토큰 개수가 줄어드는 대신, `size-2400`이 여백인지 폭인지는 이름으로 알 수 없습니다.
- **44px(`size-275`)이 스케일에 있습니다.** 8의 배수도 4의 배수 리듬에서도 벗어난 값인데,
  **44px은 터치 타겟 최소 권장 크기로 널리 쓰이는 값**입니다.
  ~~다만 소스에 그 근거가 적혀 있지는 않습니다.~~
  (2026-08-18 해소 — `min-size-interactive-touch: 44px` 토큰이 존재하고
  large 버튼 높이가 이 값입니다. 심화 절 참조.)
- **뷰포트만 px입니다.** 나머지가 전부 rem인 가운데 브레이크포인트만 px로 고정했습니다.
- **테마 파일이 모드별로 분리돼 있습니다.** `theme-wikimedia-ui-mode-dark` 등
  테마 × 모드 조합마다 별도 JSON을 배포합니다.
- **rem 기반입니다.** 사용자 폰트 확대 시 여백이 함께 커집니다.

## 접근성

rem 기반 스케일이며 44px 단계가 존재합니다.

**준수 목표가 명시돼 있습니다 (2026-08-23 해소).** 저장소 README가 Codex 컴포넌트의 목적을
열거하면서 *"Web accessibility compliant (Web Content Accessibility Guidelines 2.1 level AA)"*
라고 적습니다 — github `wikimedia/design-codex`, `README.md`, `main@5a4ff8980f`.
README에 적힌 지향이며, 컴포넌트별 준수 기록은 아닙니다.

## 참고

- 저장소: https://github.com/wikimedia/design-codex
- 패키지: `@wikimedia/codex-design-tokens` (토큰) ·
  `@wikimedia/codex@2.6.0` `dist/codex.style.css` (컴포넌트 심화 — 2026-08-18)
- **라이선스 해소 (2026-08-18):** `GPL-2.0-or-later` — 출처: github wikimedia/design-codex → `LICENSE` (npm `@wikimedia/codex-design-tokens@2.6.2` 메타는 `GPL-2.0+`). **표본에서 카피레프트는 Codex·Protocol·Helios뿐입니다**
