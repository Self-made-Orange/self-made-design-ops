---
name: Protocol
org: Mozilla
coverage: partial
url: https://protocol.mozilla.org
repo: https://github.com/mozilla/protocol
license: MPL-2.0
tech: [CSS/SCSS]
figma_kit: 미확인
tokens_format: [SCSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @mozilla-protocol/core@22.0.0 → protocol/css/includes/"
---
<!-- lang-links -->
> [English](protocol.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Mozilla의 웹 자산(mozilla.org, Firefox 관련 사이트)을 위한 디자인시스템.
마케팅·콘텐츠 페이지가 주 무대입니다.

## 토큰

### 스페이싱 — 6단계뿐

| 토큰 | 값 |
|------|-----|
| `$spacing-xs` | 4px |
| `$spacing-sm` | 8px |
| `$spacing-md` | 16px |
| `$spacing-lg` | 24px |
| `$spacing-xl` | 32px |
| `$spacing-2xl` | 48px |

**수집한 시스템 중 가장 적은 단계입니다.** 12px과 20px이 없고, 48px에서 끝납니다.

정확히 `4, 8, 16, 24, 32, 48`인데, 이 중 앞의 다섯은 13개 시스템 공통 코어
(`4/8/16/24/32`)와 **완전히 일치합니다.** Protocol은 사실상 공통 코어만 채택한 셈입니다.

### 타이포그래피

| 토큰 | 값 |
|------|-----|
| `$title-3xs-size` | 16px |
| `$title-2xs-size` | 20px |
| `$title-xs-size` | 24px |
| `$title-sm-size` | 32px |
| `$title-md-size` | 40px |
| `$title-lg-size` | 48px |
| `$title-xl-size` | 56px |
| `$title-2xl-size` | 64px |

제목 전용 스케일이며 8px 등차입니다 (16→64px).
40px 이후 48·56·64로 이어지는 구간이 특히 균등합니다.

### 라운드 / 컬러

미확인.

출처: `@mozilla-protocol/core@22.0.0` → `protocol/css/includes/_themes-sass.scss`

## 컴포넌트

~~미확인.~~ (2026-08-18 해소) `protocol/css/components/`에 **25개** + forms + logos:
article · billboard · breadcrumb · button · callout · card · feature-card · footer ·
menu · modal · navigation · newsletter-form · notification-bar · picto · split ·
sticky-promo · video · zap 등. **다운로드 버튼(+프라이버시 링크)이 독립 컴포넌트**인
구성 — 마케팅 사이트 도메인이 목록에서 그대로 읽힙니다.

## 컴포넌트 심화 — (2026-08-18)

`@mozilla-protocol/core@22.0.0`의 `protocol/css/components/` scss와
컴파일 산출물 `protocol-components.css`를 함께 실측했습니다.

### 버튼 (`.mzp-c-button`) — 높이 비고정, 4단

높이 선언이 없고 **서체 × 행간 1.5 + 패딩 + 보더 4px**로 파생됩니다.

| | sm | md | lg (기본) | xl |
|---|:--:|:--:|:--:|:--:|
| 서체 | 12px | 14px | 16px | 16px |
| 패딩 | 1px 8px | 4px 8px | 8px 16px | 10px 24px |
| **파생 높이** | 24px | **33px** | 44px | 48px |

- **보더가 2px입니다** — 1px 다수 진영의 두 배. hover가 배경·글자색 반전(아웃라인↔채움)으로
  동작하는 마케팅형 버튼이라 보더가 형태의 일부입니다.
- **버튼 라운드가 0입니다** — radius 토큰(2/4/8/16px)이 있는데 버튼에는 안 씁니다.
  폼 필드만 4px(`$field-border-radius: $border-radius-sm`). 각-둥긂이 컴포넌트 축으로 갈립니다.
- md 파생 높이가 **33px 홀수** — 정수 보정 없음(MUI의 반픽셀 보정과 대극인 방임).
- 서체 굵기 **700**, 전환 100ms(이징 미지정 = `ease`).
- 아이콘 간격이 **`0.5ch`** — px·rem이 아니라 문자 폭 단위입니다.
- 변형: primary(기본) · secondary · product(Firefox 파랑) · neutral × dark 테마.

### 입력 (forms `form-input`)

- 패딩 **8px 사방**, 보더 2px, 라운드 4px, 서체 16px / 행간 1.25 → 파생 높이 **40px**.
- `min-width: 256px` — `$content-xs(304) − $layout-xs(24)×2` 산식. 콘텐츠 폭 토큰에서
  입력 최소 너비를 역산하는 드문 경로입니다.
- `margin-bottom: 24px` 동반 (`$field-v-spacing`).
- 라벨은 별도 블록 — 14px / bold / 아래 8px.
- 포커스 링 `0 0 0 2px rgba(blue-40, .5)` + 에러용 빨강 링 별도.

### 모달 (`.mzp-c-modal`) — 다이얼로그가 아니라 시어터입니다

- **검정 위 검정**: 전면 스크림 `rgba(0,0,0,.85)` + 내부 패널 `rgba(0,0,0,.9)`, 흰 글자.
  흰 다이얼로그 카드가 아예 없습니다 — 영상·이미지용 라이트박스입니다.
- 폭 단계 없이 `max-width: 1200px` 단일, 패딩 32px, 라운드 0.
- 진입 fade-in **300ms ease-in** (keyframes, `both`). 닫기 버튼 42×42px 흰 아이콘.
- `z-index: 9999999`, `height: 101%` — 모바일 스크롤 이탈 보정 주석까지 마케팅 사이트 실전용.

### 특징적 결정 (심화분)

- **버튼 라운드 0 vs 필드 4px** — radius 토큰 보유와 무관하게 버튼은 각
- **2px 보더 + 반전 hover** — 아웃라인이 형태 언어인 마케팅 버튼
- **모달이 시어터(라이트박스)** — 제품 UI 다이얼로그 문법(폭 단계·카드·푸터)이 없음
- 파생 높이 방임(33px 홀수) — 높이 정합보다 서체 스케일 우선
- 아이콘 간격 `ch` 단위

## 특징적 결정

- **스페이싱이 6단계뿐입니다.** Canvas(19단계)의 3분의 1이 안 됩니다.
  선택지가 적어 판단이 빠르고 일관성이 유지되지만, 미세 조정이 불가능합니다.
- **채택한 값이 공통 코어와 정확히 일치합니다.** `4/8/16/24/32`(+48).
  13개 시스템에서 도출한 코어를 검증하는 사례로 볼 수 있습니다 —
  **최소한으로 줄였을 때 남는 값이 코어와 같았습니다.**
- **12px과 20px이 없습니다.** 공통 코어 바로 다음 층(각 11/12, 10/12 채택)인데
  Protocol은 제외했습니다. 8→16 사이가 비는 것은 Backpack과 같습니다.
- **제목 스케일이 8px 등차입니다.** 16부터 64까지 균등하게 올라갑니다.
  본문 스케일과 분리해 제목만 별도로 두는 방식은 Paste(display 계열)와 유사합니다.
- **T셔츠 명명에 `2xl`을 씁니다.** `xxl`이 아니라 숫자 접두 방식입니다.
  Material 3의 `xxl`, Fluent의 `XXXL`과 표기가 다릅니다.

## 접근성

미확인.

## 참고

- 저장소: https://github.com/mozilla/protocol
- 패키지: `@mozilla-protocol/core` (컴포넌트 심화: `@mozilla-protocol/core@22.0.0` →
  `protocol/css/components/` + `includes/forms/`, 2026-08-18)
- 라이선스: 패키지 `package.json`에 **MPL-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **라이선스 해소 (2026-08-18):** `MPL-2.0` — 출처: github mozilla/protocol → `LICENSE` (npm `@mozilla-protocol/core@22.0.0` 메타와 일치)
