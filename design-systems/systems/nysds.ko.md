---
name: New York State Design System (NYSDS)
org: 뉴욕주 정부 (ITS-HCD)
coverage: partial
url: https://designsystem.ny.gov
repo: https://github.com/ITS-HCD/nysds
license: MIT
tech: [Web Components, DTCG JSON]
figma_kit: true
tokens_format: [DTCG JSON, CSS]
a11y_target: "WCAG 2.2 AA (명시 — 2026-08-18 확인)"
platform: web
domain: government
verified: 2026-08-18
source: "npm pack @nysds/tokens@1.20.0 → src/tokens.json · npm @nysds/components@1.20.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](nysds.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

뉴욕주 정부 — **정부 10번째 표본**(미국 연방 USWDS와 별개의 주정부 층).
스페이싱 단계 이름이 **8px을 100으로 놓는 백분율**이고, 라운드 `round` 값이
**`1776px`**("Ever upward!" — 독립선언 연도)로, 무한대 라운드 자리에
주 정체성을 박아 넣었습니다.

## 스페이싱 — 8px = 100 백분율 명명

```
50 = 4px   100 = 8px   150 = 12px   200 = 16px   250 = 20px   300 = 24px
400 = 32px 500 = 40px  600 = 48px   700 = 56px   800 = 64px   1200 = 96px
```

단계 숫자가 **`px값 ÷ 8 × 100`**입니다 — 이름에서 값이 역산되는 명명
(Braid의 격자배수, Italia의 `1x~24x`와 같은 계열이지만 기준이 8px 백분율).
값 자체는 4px 배수 12단계로 **정부 4px 진영**을 또 강화합니다.

## 라운드 — 1776px

```json
"round": { "$value": "1776px", "$description": "Ever upward!" }
```

알약형을 만드는 초과값 자리(코퍼스 표본: `9999px` · `999px` ·
`calc(infinity*1px)` — GLOSSARY 알약 절)에 **뉴욕주 모토와 독립선언
연도**를 넣었습니다. 기능적으론 9999px과 동일하지만, **문화 서명이 토큰
값에 들어간 유일 표본**입니다. 나머지는 1/2/4/8/12/16px 6단계.

## 그 외

- 토큰이 DTCG 문법(`$value`/`$type`/`$description`) — Italia와 함께
  정부 DTCG 2표본
- 서체 5계열: sans **Proxima Nova**(상용) · serif Noto Serif ·
  **alt Oswald** · mono · **agency** — 기관(agency)별 서체 슬롯이 따로 있음
- `form.width` sm/md/lg = 88/200/384px — 폼 폭을 토큰화 (Cloudscape 계열)
- 배포: Web Components(`@nysds/components`) + Angular + **MCP 서버**
  (`@nysds/mcp-server`) — **디자인시스템이 MCP 서버를 공식 배포하는 첫 표본**

## 컴포넌트 심화 — (2026-08-18)

`@nysds/components@1.20.0`을 실측했습니다 — Lit 웹컴포넌트로, 스타일이
`dist/nysds.es.js` 번들 안 CSS 문자열에 있습니다. `custom-elements.json`으로
**48개 태그를 전수 확인**했습니다 (`nys-skipnav` · `nys-processlist` ·
`nys-stepper` · `nys-unavheader` 등 정부 사이트 골격 컴포넌트 포함).

### 변수 아키텍처 — 비공개와 공개 훅을 동시에

모든 값이 `--_nys-button-*`(언더스코어 = 비공개 관행) ← `--nys-button-*`(공개
오버라이드 훅) ← `--nys-*`(전역 토큰) **3단 폴백 체인**입니다. Backpack이
`--bpk-private-*`로 오버라이드를 금지하는 것과 달리, **비공개층과 공개 훅을
한 컴포넌트에 함께 배포**합니다 — 금지 표기와 환영 표기의 동거.

### 버튼 (`nys-button`) — 40/48/56 고정 높이

| | sm | md(기본) | lg |
|---|:--:|:--:|:--:|
| **height** | **40px** | **48px** | **56px** |
| 패딩 | `calc(8−2)`/`calc(16−2)` | 12/20 −2px | 16/24 −2px |
| 라운드 | **12px** (`--nys-radius-xl`) | 동일 | 동일 |
| 서체 | 16px / 24px / **600** Proxima Nova | 동일 | 동일 |

- 높이가 `--nys-size-500/600/700` **사이즈 토큰 직결 고정**입니다 — 파생이 아닙니다.
- 보더 2px 상시 + **패딩에서 보더 차감**(`calc(space − border)`) — Kaizen과 같은
  치수 보존 계산이 정부 시스템에도 나타납니다.
- 변형 5종: `filled / outline / ghost / text` + **`strong`**.
- 포커스: 2px `#004dd1`(`--nys-color-focus`) + offset 2px.

### 입력 (`nys-textinput`) — 크기축이 높이가 아니라 폭

| 항목 | 값 |
|------|-----|
| **height** | **40px 단일** (`--nys-size-500`) |
| 폭 변형 | **sm 88 / md 200 / lg 384px / full** (`--nys-form-width-*`) |
| 라운드 | **4px** (`--nys-radius-md`) |
| 보더 | 1px `#909395` |
| 패딩 · 서체 | 8px · 16px/24px/400, 자간 **0.044px** |

- **높이 변형이 없고 폭 변형만 있습니다** — 토큰 절의 `form.width`(88/200/384)가
  이 컴포넌트의 크기축이었습니다. 입력 40px는 버튼 sm과만 정렬됩니다
  (버튼 기본 48px와 어긋남).
- hover가 **outline 1px(검정)을 덧그려** 보더가 굵어진 것처럼 보이게 합니다 —
  보더 두께를 바꾸지 않아 레이아웃 시프트가 없습니다.
- 자간 토큰 `0.044px` — 서브픽셀 자간을 토큰화한 드문 사례.
- `inverted` 모드의 포커스 색이 `#7aa5e7`로 별도입니다.

### 모달 (`nys-modal`) — 439px

| 항목 | 값 |
|------|-----|
| 폭 | **439px** (min 320px) |
| 라운드 · 보더 | 8px (`--nys-radius-lg`) · 1px |
| 패딩 · 간격 | 24px · 16px |
| 스크림 | **rgba(27,27,27,.7)** — 순검정이 아니라 잉크색(#1b1b1b) 기반 |
| 애니메이션 | **없음** (transition·keyframe 0건) |

- **폭이 439px입니다** — 4px 그리드에서 1px 어긋난 값이 하드코딩돼 있습니다
  (토큰 아님, `--_nys-modal-width: 439px` 리터럴). 출처 불명의 정밀값.
- 푸터 버튼이 모바일에서 `column-reverse`(주 액션이 위) → 480px부터 `row`.
- 진입 모션이 아예 없는 것은 표본 모달 중 NYSDS뿐입니다 (Astro도 페이드는 있음).

### 특징적 결정 (심화분)

- **라운드가 역할별 3단** — 버튼 12 / 모달 8 / 입력 4px. 컨트롤일수록 둥글게
- **입력 크기축 = 폭** (88/200/384) — 높이 단일 40px
- **비공개(`--_`) + 공개 훅 이중 변수층** — 금지·환영 동거
- **모달 439px 리터럴 + 무애니메이션**
- **hover를 outline 덧그리기로** — 레이아웃 불변 강조

## 특징적 결정

- 8px=100 백분율 스페이싱 명명 — 명명 유형 목록에 추가
- `1776px` — 토큰 값의 문화 서명
- 정부 시스템의 MCP 서버 공식 배포 (에이전트 소비 전제)
- 미국 연방(USWDS)-주(NYSDS) 2층 표본 구성

## 접근성

~~미확인.~~ → **WCAG 2.2 AA (2026-08-18 해소).**
출처: `designsystem.ny.gov/foundations/accessibility/` — "Our standard is WCAG 2.2 AA".
**법정 기한이 함께 적힌 드문 사례입니다** — 2027-01 뉴욕주 기술법(STL §103-d)이
WCAG 2.2 AA를, 2027-04-26 미 법무부 규칙이 WCAG 2.1 AA를 요구한다고 적습니다.

## 참고

- 컴포넌트 심화: `npm pack @nysds/components@1.20.0` → `dist/nysds.es.js` +
  `custom-elements.json` (2026-08-18)
- **남은 확인 사항:** 색 팔레트 상세, ~~컴포넌트 목록~~ (2026-08-18 해소 —
  48태그 전수, 심화 절), USWDS와의 관계(독립 구현인지 파생인지), MCP 서버 내용,
  모달 439px의 출처
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `designsystem.ny.gov` → `figma.com/community/file/1574803287825265318/new-york-state-design-system`
  (팀 파일은 `figma.com/design/U2QpuSUXRTxbgG64Fzi9bu`)
