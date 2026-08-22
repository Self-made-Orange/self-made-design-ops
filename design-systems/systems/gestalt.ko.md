---
name: Gestalt
org: Pinterest
coverage: partial
url: https://gestalt.pinterest.systems
repo: https://github.com/pinterest/gestalt
license: Apache-2.0
tech: [React]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm gestalt@177.0.12 → dist/gestalt.css · npm gestalt-design-tokens@177.0.12 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](gestalt.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Pinterest의 소비자 서비스용 디자인시스템.
이미지 그리드 중심 서비스라 라운드가 크고 세분화돼 있습니다.

## 토큰

### 스페이싱 — 4px 등차수열

| 토큰 | 값 |
|------|-----|
| `--space-0` | 0px |
| `--space-100` | 4px |
| `--space-200` | 8px |
| `--space-300` | 12px |
| `--space-400` | 16px |
| `--space-500` | 20px |
| `--space-600` | 24px |
| `--space-700` | 28px |
| `--space-1000` | 40px |
| `--space-1100` | 44px |
| `--space-1200` | 48px |
| `--space-1300` | 52px |
| `--space-1400` | 56px |
| `--space-1500` | 60px |
| `--space-1600` | 64px |

**4px 등차로 64px까지 이어집니다.** 이름의 숫자는 px × 25입니다 (`space-400` = 16px).

Paste(Twilio)와 같은 등차수열 방식이며, 두 시스템 모두 상단으로 갈수록 간격을 넓히지 않습니다.

### 라운드

| 토큰 | 값 |
|------|-----|
| `--rounding-0` | 0px |
| `--rounding-100` | 4px |
| `--rounding-200` | 8px |
| `--rounding-300` | 12px |
| `--rounding-400` | 16px |
| `--rounding-500` | 20px |
| `--rounding-600` | 24px |
| `--rounding-700` | 28px |
| `--rounding-800` | 32px |
| `--rounding-circle` | 50% |

### 컴포넌트별 라운드 조합

원시 라운드 위에 **컴포넌트 전용 조합 토큰**을 둡니다.

```css
--rounding-datepicker-container: var(--rounding-400);
--rounding-datepicker-days: var(--rounding-circle);
--rounding-datepicker-range-end:
    var(--rounding-0) var(--rounding-circle) var(--rounding-circle) var(--rounding-0);
--rounding-datepicker-range-middle: var(--rounding-0);
```

**네 모서리를 각각 다르게 지정한 값 자체를 토큰으로 만듭니다.**

출처: `gestalt@177.0.12` → `dist/gestalt.css`

### 타이포그래피 / 컬러

~~미확인.~~ → 크기 스케일만 확인 (2026-08-18 심화):
`--font-size-100~600` = **12 / 14 / 16 / 20 / 28 / 36px**. 컬러는 미확인 유지.
별도 `--opacity-*` 스케일(0~500 = 0 / 0.04 / 0.2 / 0.4 / 0.8 / 0.9)이 존재합니다.

## 컴포넌트

~~미확인. 토큰 이름에서 datepicker가 확인됩니다.~~ → 버튼·입력·모달은
아래 심화 절 (2026-08-18). datepicker 조합 토큰은 위 라운드 절 참조.

## 컴포넌트 심화 — (2026-08-18)

`gestalt@177.0.12`의 `dist/gestalt.css`는 클래스명이 해시라 단독으로는 못 읽습니다.
**`dist/gestalt.es.js`의 CSS 모듈 매핑 객체(원래 이름→해시)와
`dist/gestalt.es.js.map`의 `sourcesContent`(컴포넌트 `.tsx` 원본 동봉)를 교차**해
실측했습니다. 원본 CSS는 GitHub 태그 `v177.0.12`로 재검증했습니다.

### 버튼 — min-height 3단 · 고정 24px 라운드

| | sm | md (기본) | lg |
|---|:--:|:--:|:--:|
| **min-height** | **32px** | **40px** | **48px** |
| 좌우 패딩 | 12px | 12px | 16px |
| 상하 패딩 | 4px | 8px | 12px |
| 서체 | 14px **bold** | 16px bold | 16px bold |

- **라운드가 전 크기 고정 24px**(`--rounding-600`)입니다. 별도 알약 토큰
  (`--rounding-pill: 999px`)이 있는데 버튼은 쓰지 않습니다 — 다만 높이가
  최대 48px이라 24px 라운드가 **사실상 전 크기 알약으로 렌더**됩니다.
- 높이가 `height`가 아니라 **min-height**입니다 (Backpack과 같은 선택).
  최소 너비는 **60px** 단일값 — Canvas(크기별 3단)와 갈립니다.
- **버튼 서체가 16px bold입니다** — Backpack(16px·700)과 함께 "본문 크기에
  볼드" 진영. 보더 0, 색 변형 9종(gray 기본·red·blue·투명 계열·명도 계열).
- **누름 피드백이 픽셀 고정 축소입니다** — `useTapFeedback`이 요소 실측치로
  `scale((최장변 − 4px) / 최장변)`을 런타임 계산해 **어느 크기든 정확히 4px
  줄어들게** 만들고, transform 85ms ease-out로 전환합니다. 기존 press 표본
  (Atlassian 150ms 색 전환, M3 셰이프 모프, Radix `scale(0.97)` 비율 고정 —
  `patterns/motion.md`·`button.md`)과 갈리는 **감소량 고정** 방식입니다.
- **VR 테마(실험 차세대)가 병존합니다**: min-height 24/32/44px로 낮아지고
  라운드가 8/12/16px(`--sema-rounding-*`)로 내려가 알약이 풀립니다.
  패딩 4×8 / 6×12 / 8×16. `--sema-space-150`(6px) 같은 중간 스텝도 등장 —
  본 테마 4px 등차에 없던 값입니다 (`gestalt-design-tokens@177.0.12` vr-theme).

### 입력 (TextField) — 버튼과 높이 클래스를 물리적으로 공유

| | sm | md (기본) | lg |
|---|:--:|:--:|:--:|
| **min-height** | 32px | 40px | 48px |
| 패딩 | 4px 8px | 8px 12px | 12px 16px |
| **라운드** | **8px** | **12px** | **16px** |
| 서체 | 14px | 16px | 16px |

- **버튼과 같은 CSS 클래스(`layout.small/medium/large`)로 min-height를
  공유합니다** — 값이 같은 수준이 아니라 **같은 선언을 재사용**합니다.
  Backpack의 36/48px 정합(값 공유)보다 한 단계 강한 결합입니다.
- **라운드가 크기에 연동됩니다(8→12→16px)** — Backpack은 large에서만
  8→12px인데, Gestalt는 3단 전부 다릅니다. 서체도 sm만 14px.
- **보더가 2px입니다** (`--color-border-container`). 1px 다수 진영과 갈립니다.
  포커스는 **outline 4px solid, offset 0** — 굵은 외곽선 진영.
- 라벨은 별도 블록(FormLabel) — **12px 고정**, 아래 여백 4px(lg만 8px).
- 뒤 아이콘 버튼이 있으면 padding-end를 32px(`--space-800`)로 넓힙니다.
- 태그 입력 모드에서 input을 absolute로 띄우고 **보이지 않는 spacer div가
  내용을 미러링**해 flex 줄바꿈을 구현합니다 (input은 wrap 불가라서).

### 모달 — 540 / 720 / 900px + 임의 px

| 항목 | 값 |
|------|-----|
| 폭 | sm **540** / md **720** / lg **900px** + **숫자 prop으로 임의 폭** |
| 라운드 | 16px (`--rounding-400`) |
| 마진 / 최대 높이 | 좌우 16px / `calc(100vh − 32px)` |
| 헤더·본문 패딩 | 24px (Box `padding={6}` = 6×4px) |
| 스크림 | **`rgba(0,0,0,.8)`** |
| 애니메이션 | 스크림 페이드 **400ms linear** (in/out 대칭) — 패널 자체는 무모션 |

- **폭 단계가 넓은 쪽으로 치우쳐 있습니다** — 최소가 540px로, Mantine
  기본(440)·Canvas(440)·Backpack(512)보다 큽니다. 900px + 임의 숫자까지
  허용해 콘텐츠(핀 그리드) 모달 지향입니다.
- **스크림이 검정 80%로 표본 최암 수준입니다** (Backpack 70%). 페이드가
  400ms **linear** — 이징 없는 선형 스크림도 드뭅니다.
- **패널 진입 모션이 없습니다.** 스크림만 페이드하고 패널은 즉시 놓입니다
  (Canvas 150ms translate, Backpack scale 0.9→1과 대극).
- `closeOnOutsideClick`이면 **스크림 커서가 `zoom-out`**으로 바뀝니다 —
  "바깥 클릭 = 닫기"를 커서로 예고하는 장치. `patterns/modal.md`의 기존
  표본에는 대응 사례가 기록돼 있지 않습니다.
- 모바일에서는 모달이 아니라 **SheetMobile(전체 화면)로 컴포넌트가 교체**됩니다.

### 특징적 결정 (심화분)

- **버튼·입력이 높이 클래스를 물리적으로 재사용** — 32/40/48 min-height 3단
- **press 모션이 "4px 고정 축소" 런타임 계산** — 비율 아닌 절대량 압축
- **입력 라운드·서체가 크기 연동** (8/12/16px · 14/16/16px)
- **모달: 넓은 폭 3단 + 임의 px + 스크림 0.8 + 패널 무모션 + zoom-out 커서**
- **VR 테마 병존** — `--sema-*` 2층 토큰으로 차세대(낮은 높이·작은 라운드)를
  같은 패키지에서 플래그 전환

## 특징적 결정

- **라운드가 스페이싱과 같은 리듬을 갖습니다.** 둘 다 4px 등차이고 단계 수도 비슷합니다.
  Polaris가 하나의 `size` 맵에서 파생시킨 것과 결과적으로 유사하지만,
  Gestalt는 별도 스케일로 우연히(혹은 의도적으로) 맞춘 형태입니다.
- **모서리별 라운드 조합을 토큰화했습니다.** `rounding-datepicker-range-end`는
  단일 값이 아니라 `0 50% 50% 0` 같은 4값 조합입니다.
  날짜 범위 선택처럼 "왼쪽은 각지고 오른쪽은 둥근" 형태를 토큰으로 고정했습니다.
  **수집한 시스템 중 다중 값 라운드 토큰은 이것뿐입니다.**
- **`circle`을 50%로 표현합니다.** Spectrum(0.5)·Paste(50%)와 같은 비율 방식입니다.
- **라운드 최대가 32px입니다.** Material 3(48px) 다음으로 큽니다.
  (2026-08-18 보충: 숫자 스케일 밖에 `--rounding-pill: 999px`이 별도로
  존재합니다 — 등차 스케일 최대는 32px 그대로, 알약은 전용 토큰.)
- **투명도 스케일이 별도로 있습니다.** `--opacity-0` ~ `--opacity-500`.
  투명도를 토큰화한 시스템은 표본에서 드뭅니다.

## 접근성

미확인.

## 참고

- 저장소: https://github.com/pinterest/gestalt
- 패키지: `gestalt@177.0.12` (컴포넌트와 토큰이 같은 패키지) ·
  `gestalt-design-tokens@177.0.12` (VR 테마 `--sema-*` 실값 — 2026-08-18 심화에 사용)
- 심화 방법: `dist/gestalt.es.js`의 CSS 모듈 매핑 + `dist/gestalt.es.js.map`
  `sourcesContent`의 `.tsx` 원본 교차, GitHub 태그 `v177.0.12` 원본 CSS로 재검증
- 라이선스: `package.json`에 **Apache-2.0** 명기 — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** 타이포 스케일 전체(심화에서 `--font-size-100~600` =
  12/14/16/20/28/36px만 확인), 컬러 팔레트 실값, figma_kit·a11y_target
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github pinterest/gestalt → `LICENSE` (npm `gestalt@177.0.12` 메타와 일치)
