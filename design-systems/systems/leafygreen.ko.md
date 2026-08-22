---
name: LeafyGreen
org: MongoDB
coverage: partial
url: https://www.mongodb.design
repo: https://github.com/mongodb/design
license: Apache-2.0
tech: [React, Emotion]
figma_kit: true
tokens_format: [JS]
a11y_target: "WCAG 2.1 + Section 508 (레벨 미명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @leafygreen-ui/tokens@4.2.2 → dist/esm/index.js · npm @leafygreen-ui/button@25.2.1 · @leafygreen-ui/modal@22.0.1 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](leafygreen.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

MongoDB의 시스템 — 컬러 토큰이 **속성 × 역할 × 상태 3차원 구조**
(`background.primary.hover`)이고, 스페이싱 번호가 **px × 25**
(`spacing[100]` = 4px)입니다.

## 토큰

### 컬러가 3차원입니다

```js
Property: Background · Border · Icon · Text
Variant:  Primary · Secondary · Tertiary · InversePrimary · Info · Warning ·
          Error · Success · Link · OnInfo · OnError · OnSuccess … (17종)
InteractionState: Default · Hover · Focus
→ color[theme][property][variant][state]
```

**4속성 × 17역할 × 3상태를 열거된 축으로 두는 표본 유일 구조입니다.**
다수는 시맨틱 이름 하나에 상태를 접미로 붙이는데(`border-hover`),
LeafyGreen은 **상태를 별도 차원으로 분리**해 조회식으로 씁니다.
Ring UI가 복합 상태를 이름으로 열거한 것과 같은 문제의 반대 해법입니다.

### 스페이싱 — 번호가 px × 25

```js
spacing = { 0:0, 25:1, 50:2, 100:4, 150:6, 200:8, 300:12, 400:16, 500:20, 600:24,
            800:32, 900:36, 1000:40, 1200:48, 1400:56, 1600:64, 1800:72 }
            (+ 레거시 키 1~7 = 4/8/16/24/32/64/88 병존)
```

`100`이 4px이므로 **번호 = px × 25**입니다 — `tokens/scales.md`의
"같은 16px을 16가지로 부릅니다" 표에 **일곱 번째 숫자 기준**이 추가됩니다
(px 실값 / 10단위 / rem×100 / rem×12.5 / rem×200 / 4px배수 / 8px배수 /
순번 / **px×25**).

~~상단이 24px에서 끝납니다 — 그 이상 여백은 토큰 없이 처리합니다.~~
(2026-08-18 정정 — 같은 tokens@4.2.2 재실측 결과 **1800(72px)까지 이어집니다**.
초기 기록은 `borderRadius` 맵(0~600, 아래 심화 절)을 스페이싱으로 오독한 것.
구세대 순번 키 1~7이 같은 객체에 병존하는 **이중 명명 과도기** 상태입니다.)

### 브레이크포인트

`Mobile 320 · Tablet 768 · Desktop 1024 · XLDesktop 1440` — 4단계.
USWDS처럼 스페이싱에서 파생하지 않고 독립값입니다.

## 컴포넌트 심화 — (2026-08-18)

컴포넌트가 패키지 다수로 분할돼 있습니다. `@leafygreen-ui/button@25.2.1` ·
`text-input@16.2.3`(스타일은 의존 패키지 `form-field@4.0.9`에 위임) ·
`modal@22.0.1`의 emotion 스타일 JS를 파싱했습니다. 공통 토큰은 `tokens@4.2.2`.

### 버튼 (`@leafygreen-ui/button@25.2.1`)

| | xsmall | small | default | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | **36px** | 48px |
| 좌우 패딩 | 7px | 11px | 11px | 15px |
| 서체 | **12px uppercase** | 13/16px | 13px 또는 16px | 18px |

- **패딩 주석이 보더 차감을 명시합니다** — 코드에 `padding: 0 11px; // 12px - 1px border`.
  MUI가 outlined에서만 하던 1px 차감을 전 변형에 적용 (보더가 상시 `1px solid transparent`).
- 라운드 **6px**, 내부 상태 오버레이는 **5px = 6−1** — 보더 안쪽 라운드까지 보정.
- **xsmall(22px)만 uppercase + letter-spacing 0.4px + semiBold** — 크기 변형이
  타이포 스타일까지 바꾸는 드문 사례.
- 기본 서체가 prop(`baseFontSize`)으로 13/16px 이원 — 토큰 절의 body1(13)/body2(16)
  이중 기준이 컴포넌트 API로 올라온 형태.
- 전환 `all 150ms ease-in-out`(`transitionDuration.default`). **min-width 없음.**
- 변형 6종: default · primary · primaryOutline · danger · dangerOutline · baseGreen.

### 입력 (`text-input@16.2.3` → `form-field@4.0.9`)

| | xsmall | small | default | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | **36px** | 48px |
| 좌우 패딩 | 8px | 8px | 12px | 12px |

- **버튼과 입력이 22/28/36/48 4단 높이를 완전 공유합니다** — Backpack(36/48 2단 공유)보다
  넓은 정합. 보더 1px · 라운드 6px도 버튼과 동일.
- 라벨은 플로팅이 아니라 **별도 블록 요소**(`typography` 패키지의 `Label`).
- 포커스·호버가 보더색이 아니라 **box-shadow 링 토큰**(`focusRing`/`hoverRing`) —
  `transition-property: border-color, box-shadow`.

### 모달 (`@leafygreen-ui/modal@22.0.1`) — 네이티브 `<dialog>` + @starting-style

| size | 폭 |
|---|---|
| small | 400px |
| **default** | **600px** |
| large | 720px → **960px** (>1025px에서) |

- **large만 반응형 2단**(720/960) — 폭 단계에 브레이크포인트가 개입.
- 패딩 **40px 36px**(`spacing[1000]`/`spacing[900]`) — 상하가 좌우보다 큰 드문 배치.
- 라운드 **24px**(`borderRadius[600]`) — 버튼·입력(6px)의 4배. **`borderRadius`가
  스페이싱과 같은 px×25 번호의 9단 스케일**(0~600=24px)로 존재합니다 —
  라운드를 풀 스케일로 토큰화한 표본 소수파.
- 전환: `opacity 150ms ease-in-out` + **`overlay`/`display 150ms allow-discrete`** —
  `@starting-style`과 함께 2024+ CSS로 `<dialog>` 표시 전환을 처리한 표본 첫 사례.
  스크림은 `transparentize(0.4, black)` = rgba(0,0,0,0.6), 동일 150ms.
- 닫기 버튼 위치가 토큰이 아니라 리터럴 **18px**.

### 특징적 결정 (심화분)

- **버튼·입력 4단 높이(22/28/36/48) 완전 공유** — 표본 최다 단수 정합
- **보더 차감 패딩을 주석으로 명문화** + 내부 라운드 5=6−1 보정
- **라운드가 px×25 번호의 독립 9단 스케일** — 스페이싱과 명명 통일
- **`<dialog>` + @starting-style + allow-discrete** — 최신 CSS 채택 선두
- 단일 전환 지속시간(150ms)이 버튼·입력·모달·스크림 전부를 관통

## 특징적 결정

- **컬러 3차원(속성×역할×상태)** — 표본 유일
- 스페이싱 번호 = px × 25 — 숫자 기준 일곱 번째
- ~~스케일 상단 24px에서 종료~~ (2026-08-18 정정 — 1800=72px까지. 토큰 절 참조)
- 역할에 `On*` 계열(OnInfo·OnError…) — M3 어휘 차용

## 접근성

~~미확인.~~ → **WCAG 2.1 + Section 508 (2026-08-18 해소 — 레벨 표기는 없습니다).**
출처: `mongodb.design/foundations/accessibility` — "accessibility requirements
outlined in Section 508 of the WCAG 2.1". **원문 표현이 두 규격을 뒤섞고 있습니다**
(Section 508은 WCAG의 하위 절이 아닙니다) — 그대로 옮겨 적습니다.

## 참고

- 토큰: `npm pack @leafygreen-ui/tokens@4.2.2` → `dist/esm/index.js`
- 팔레트는 별도 패키지 `@leafygreen-ui/palette@5.0.2`
- 컴포넌트 심화: `@leafygreen-ui/button@25.2.1` · `text-input@16.2.3` ·
  `form-field@4.0.9` · `modal@22.0.1` (dist/esm emotion 스타일 파싱, 2026-08-18)
- **남은 확인 사항:** 팔레트 실값, 타이포 스케일 전체(body1 13/20 · body2 16/28만 확인),
  컴포넌트 목록(패키지 다수 분할 — 목록 전수는 미조사)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `mongodb.design` → `figma.com/design/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System`
