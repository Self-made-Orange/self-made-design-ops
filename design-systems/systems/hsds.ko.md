---
name: HSDS (Help Scout Design System)
org: Help Scout
coverage: partial
url: https://hsds.helpscout.design
repo: https://github.com/helpscout/hsds-react
license: MIT
tech: [React]
figma_kit: 미확인
tokens_format: [JSON]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @hsds/tokens@2.8.0 → src/json/{default,newBrand}/*.json (컴포넌트별 52파일 × 2테마)"
---
<!-- lang-links -->
> [English](hsds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Help Scout의 시스템 — 토큰이 **컴포넌트별 JSON 파일 52개**로 쪼개져 있고,
**같은 52개 구조를 `default`/`newBrand` 두 테마로 완전 중복 배포**합니다.
전역 스케일이 아니라 **컴포넌트가 토큰의 1차 단위**입니다.

## 토큰 — 컴포넌트가 최상위 단위

```
src/json/default/    accordion · attachment · avatar · badge · button ·
                     card · datePicker · dropList · modal · stepper … (52개)
src/json/newBrand/   같은 52개 파일 (브랜드 개편판)
```

```json
// default/button.json
{ "color": { "blue": { "main": "#1292EE", "hover": "#0077CC",
    "shortcut": { "background": "#005CA4", "backgroundHover": "#034077" },
    "outline": { "background": "#ffffff", "border": "#1292EE",
      "textSeamlessHover": "#034077", "shortcut": {…} } } } }
```

- **전역 스페이싱·타이포 스케일 파일이 없습니다** — `color.json` ·
  `cssVarsTokens.json` 외에는 전부 컴포넌트 이름입니다.
  Semi(치수 토큰 0) · Spindle(색 없음)처럼 **절단면이 특이한** 세 번째 유형이며,
  이쪽은 **축이 아니라 컴포넌트로 자른** 형태입니다
- 값이 **컴포넌트 안에서 색×변형×상태로 3~4단 중첩**됩니다
  (`button.color.blue.outline.shortcut.backgroundHover`).
  LeafyGreen(속성×역할×상태 3차원)과 비슷한 깊이인데 **컴포넌트별로 따로** 있습니다
- **`shortcut`·`textSeamlessHover` 같은 제품 고유 상태**가 색 이름에 있습니다 —
  키보드 단축키 배지, 이음새 없는(seamless) 버튼 등 Help Scout UI의 개념입니다
- 알파를 8자리 헥스로 씁니다 (`#ffffffff`) — Apple 킷과 같은 표기

### 브랜드 개편이 디렉터리로 병존

`default`와 `newBrand`가 **같은 52개 파일 구조**입니다 —
Mística(`-new` 스킨) · Vibes(2세대 팔레트) · Spindle(서체 version-1/2)에 이은
**마이그레이션 병존 네 번째**이고, 규모가 가장 큽니다(전 컴포넌트 2벌).

## 컴포넌트 심화 — (2026-08-18)

컴포넌트도 토큰처럼 **개별 패키지로 쪼개져** 있습니다 — 구
`@helpscout/hsds-react`(v3, 단일)가 **`@hsds/*` 스코프 v9 분할 배포**로
이행했습니다 (`@hsds/hsds@9.6.0`이 메타 패키지). `button@9.4.2` ·
`input@9.3.2` · `modal@9.2.3`의 styled-components 소스를 실측했습니다.
스타일 문자열 안에서 `getToken('button.color.blue.main')`을 **런타임에
호출**합니다 — 컴포넌트별 토큰 JSON(위 절)이 이렇게 소비됩니다.

### 버튼 — 7단 크기, 전환 없음

| | xxs | xs | sm | md | lg(기본) | xl | xxl |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **height** | 20 | 24 | 30 | **35** | **40** | 44 | 50 |
| 서체 | 11 | 13 | 13 | 14 | 14 | 14 | 14 |
| min-width | — | — | 90 | 90 | 110 | 120 | 200 |

- **크기 7단은 표본 최다**입니다 (Asphalt·Pluralsight 4단, Backpack 2단).
  높이가 8배수가 아니라 **20/24/30/35/40/44/50 — 5px 간격 섞임**이고
  md가 35px 홀수입니다.
- **`--hsds-button-transition: none`** — hover 색 전환에 애니메이션을
  의도적으로 끕니다. 모달은 250ms로 움직이므로(아래) **컴포넌트별로
  모션 유무를 갈랐습니다**.
- min-width가 크기마다 계단식(90→200px)입니다 — Fluent(96px 단일)와 달리
  크기 연동형.
- 색 6종(blue 기본·green·red·grey·yellow·brand) × 스타일 3종
  (filled/outlined/link) — 토큰 JSON의 3~4단 중첩이 그대로 클래스 격자가
  됩니다. 라운드 3px(lg 이상 4px), 굵기 500, `is-rounded`는 100px 필.
- **`shortcut` 토큰의 정체 확인** — 버튼 안에 붙는 **키보드 단축키 배지**
  (24px 정방형, 라운드 3px, 시스템 폰트 스택)였습니다. 토큰 절에서
  "제품 고유 상태"로 추정한 것이 컴포넌트에서 실증됩니다.
- 포커스가 **::before 의사요소 링**입니다 — inner/outer 2색 토큰
  (`color.focusRing.*`), 기본 offset −2px를 버튼은 **−3px(안쪽)**로
  오버라이드. error/warning/success 링 색 변형이 입력과 공유됩니다.

### 입력 — 보더를 그리는 별도 "Backdrop" 레이어

| | xs | sm | — | md(기본) | lg |
|---|:--:|:--:|:--:|:--:|:--:|
| **height** | 24 | 28 | 32 | **42** | 48 |

- **입력 필드가 보더를 직접 갖지 않습니다** — 절대배치 `BackdropUI` div가
  보더·배경·포커스 섀도를 전담하고, 실제 `<input>`은 투명입니다.
  내부 높이가 `calc(높이 − 2px×2 − 1px×2)` — **보더 2px + 오프셋 1px**을
  차감하는 산식이 주석으로 남아 있습니다.
- 기본 높이 **42px** — 버튼 기본(40px)과 **2px 어긋납니다**. 같은 시스템에서
  버튼·입력 기준 높이가 다른 드문 사례 (Backpack·Asphalt는 공유).
- 좌우 패딩 16px, 라운드 3px, 전환 `box-shadow·background·border 100ms ease`
  — 버튼(none)과 달리 입력은 100ms를 씁니다.
- textarea는 min-height 22~46px 5단 + `will-change: height` 자동 리사이즈.

### 모달 — 이름 붙은 이징 어휘, 'boop'로 진입

- v2 기본 **680px** 고정폭 · min-height 400px, alert 변형 **440px** ·
  min-height 180px. 래퍼 상한 폭 75% · 높이 98%.
- v2 본문 패딩 **`40px 90px 50px`** — 좌우 90px는 표본 최대의 모달 내부
  여백입니다 (다이얼로그를 문서처럼 조판).
- 진입: **fade + scale(0.8→1), 250ms, easing `boop`** =
  `cubic-bezier(0.175, 0.885, 0.325, 1.2)` 오버슈트. 오버레이는 fade 250ms
  ease-in-out.
- **이징이 이름 어휘 사전입니다** — `@hsds/utils-animation`에 Penner 전 세트
  (easeInQuad~easeInOutBack) + 자체 3종:

  | 이름 | 값 |
  |------|-----|
  | `bounce` | (0.680, −0.650, 0.265, 1.650) |
  | **`boop`** | **(0.175, 0.885, 0.325, 1.2)** |
  | `elastic` | (0.680, −1.500, 0.265, 2.500) |

  컴포넌트가 `easing="boop"` 문자열로 커브를 고릅니다 — 수치가 아니라
  **의성어 이름으로 모션을 배포**하는 표본 유일 사례입니다.

### 특징적 결정 (심화분)

- **버튼 7단 크기(20~50px, 홀수 35 포함)** — 표본 최다 단계
- **버튼 전환 none vs 입력 100ms vs 모달 250ms** — 컴포넌트별 모션 차등
- **Backdrop 분리형 입력** — 보더·포커스를 별도 레이어가 전담
- 버튼 40 / 입력 42 — 기준 높이 비공유
- **`boop`·`bounce`·`elastic` 의성어 이징 어휘** + Penner 전 세트 내장
- 모달 본문 좌우 패딩 90px — 문서형 조판
- 구 단일 패키지 → `@hsds/*` v9 분할 — 토큰과 같은 절단면(컴포넌트 단위)

## 특징적 결정

- **컴포넌트별 JSON 52개가 토큰의 1차 단위** — 전역 스케일 없음
- **`default`/`newBrand` 52파일 2벌 완전 중복** — 마이그레이션 병존 최대 규모
- 제품 고유 상태(`shortcut`·`seamless`)가 색 이름에
- 8자리 헥스 알파 표기
- npm 라이선스가 `None` — 공개 배포이나 라이선스 미부여

## 접근성

미확인.

## 참고

- 토큰: `npm pack @hsds/tokens@2.8.0` → `src/json/`
- 컴포넌트: ~~`@helpscout/hsds-react@3.58.0`~~ → **`@hsds/*` v9 분할 배포**가
  현행 — `@hsds/button@9.4.2` · `@hsds/input@9.3.2` · `@hsds/modal@9.2.3` ·
  `@hsds/animate@9.0.2` · `@hsds/utils-animation@9.0.2` ·
  `@hsds/utils-mixins@9.3.0` (2026-08-18 심화에 사용), 색 유틸
  `@helpscout/colorway`
- **남은 확인 사항:** `color.json`·`cssVarsTokens.json` 전역 값,
  default/newBrand 차이 전수, 라이선스
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github helpscout/hsds-react → `LICENSE`. npm `@hsds/tokens@2.8.0` package.json에는 `license` 필드가 없습니다
