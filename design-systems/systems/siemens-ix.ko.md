---
name: Siemens Industrial Experience (iX)
org: Siemens
coverage: partial
url: https://ix.siemens.io
repo: https://github.com/siemens/ix
license: MIT
tech: [Web Components, React, Angular, Vue]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG AA (버전 미명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @siemens/ix@5.2.0 → dist/siemens-ix/{siemens-ix-standalone,theme/classic-*}.css"
---
<!-- lang-links -->
> [English](siemens-ix.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

지멘스 산업 UI 시스템 — 타이포 크기 이름이 **음수 지수를 포함한 모듈러
스케일**(`ms--2`~`ms-6`)이고, 텍스트 역할이 **CSS `font` 축약형 한 줄
토큰**이며, 기본 크기가 14px(산업 밀집 UI)입니다.

## 토큰 — 테마당 240개

### 타이포 — `ms` 지수 스케일

```
ms--2: 10px · ms--1: 12px · ms-0: 14px · ms-1: 16px · ms-2: 20px
ms-3: 24px · ms-4: 29px · ms-5: 35px · ms-6: 42px
```

- **이름이 모듈러 스케일 지수입니다** — `ms-0`이 기준(14px)이고 음수
  지수(`ms--1`, 이중 하이픈)가 아래 단계입니다. EUI가 base를 스케일 중간에
  둔 것을 **이름 체계로 명시한** 표본 유일 사례
- **기본 14px** — Ring UI·Blueprint와 함께 밀집 엔터프라이즈 14px 진영.
  상단 29/35/42는 4px 격자를 벗어난 비율 파생값입니다
- 행간은 무단위 비율 (1 · 1.091 · 1.2 · 1.3 · 1.43 · 1.5)

### 텍스트 역할이 `font` 축약형입니다

```css
--theme-h1: var(--weight-bold) var(--ms-4)/var(--line-height-sm) var(--font-sans);
--theme-body: var(--weight-normal) var(--ms-0)/var(--line-height-md) var(--font-sans);
```

**굵기·크기·행간·서체가 한 토큰의 CSS `font` 축약값으로 합성**돼 있어
`font: var(--theme-h1)` 한 줄로 스타일이 끝납니다 — 표본 유일.
Ring UI(duration+easing 합성)와 같은 축약형 진영의 타이포판입니다.
역할은 display(xxl~xs) · h1~h6 · body(lg~xs) · label · code까지 20종+.

### 테마 — classic-light / classic-dark 파일 쌍

`--theme-color-primary`가 라이트 `#006e93` → 다크 `#00bde3`으로,
**다크에서 더 밝은 청록으로 교체**됩니다 (TDS 램프 역전과 같은 방향을
시맨틱 층에서 처리). 차트 전용 색 17계열이 테마에 포함됩니다 —
Serendie와 함께 산업/데이터 도메인의 차트 토큰 진영입니다.

## 컴포넌트

Web Components(Stencil) + React/Angular/Vue 래퍼 동시 배포 —
**4프레임워크 동시 지원은 표본 유일**입니다 (다수는 React 단일).
→ 버튼·입력·모달은 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@siemens/ix@5.2.0`의 `dist/collection/components/*/**.css`(비압축 Stencil
수집본)와 `dist/siemens-ix/siemens-ix-core.css`(컴포넌트 변수층)를 실측했습니다.

### 버튼 — 한 사이즈뿐, 포커스가 1px

| 항목 | 값 |
|------|-----|
| **height** | **2rem (32px) 고정 — 크기 변형 없음** |
| 좌우 패딩 | 8px (`--ix-button-padding` 공개 변수) |
| 라운드 | **2px** (`--theme-btn--border-radius` → small 0.125rem) |
| 보더 | 1px — primary 포함 전 변형 상시 |
| 서체 | **14px / 700** / 1.429em (≈20px) |
| 포커스 | **outline 1px** + offset 2px (`#199fff`) |

- **크기 변형이 없습니다** — Tegel 4단·Kontur 3단과 대조되는 단일 32px.
  산업 밀집 UI가 밀도를 하나로 고정한 형태입니다.
- **버튼 서체가 14px에 굵기 700**입니다 — Backpack(16px·700)과 같은
  볼드 진영이되 밀집 크기입니다.
- **포커스 아웃라인이 1px** — 2px+가 다수인 표본에서 가장 가는 축입니다.
- 라운드 3단이 min(0) / small(**2px**) / default(4px)로, 버튼·입력이 2px,
  카드·모달이 4px를 씁니다. 8px대가 아예 없는 초저라운드 체계입니다.
- `--ix-button-border-radius-left/right`가 분리돼 있어 그룹(붙은 버튼)에서
  한쪽만 0으로 접습니다 — Backpack `--docked`와 같은 목적의 변수판.

### 입력 — 상태를 배경색으로 칠함

| 항목 | 값 |
|------|-----|
| min-height | **2rem (32px)** — 버튼과 동일 |
| 패딩 | 4px 8px |
| 라운드 | 2px · 보더 1px |
| 서체 | `--theme-ms-0`(14px) / 400 |

- **invalid/warning/info가 보더 색뿐 아니라 배경 자체를 바꿉니다** —
  `--theme-input--background--invalid: var(--theme-color-component-error)` 등
  상태별 배경 세트가 변수층에 있습니다. 보더만 바꾸는 다수 표본과 갈립니다.
- 포커스는 버튼과 같은 1px 아웃라인 + 보더 `--theme-color-dynamic`(#00eaff)
  교체 — 두 신호를 겹칩니다.

### 모달 — 클래스 이름이 px 실값, 모션은 JS가 CSS 변수를 읽음

| size 클래스 | 폭 |
|------|-----|
| `modal-size-360` | 22.5rem (360px) |
| `modal-size-480` | 30rem |
| `modal-size-600` | 37.5rem |
| `modal-size-720` | 45rem |
| `modal-size-840` | 52.5rem |
| + `full-width` 95% / `full-screen` | |

- **폭 단계 이름이 px 실값**입니다 (Tegel의 `element-16` 값-이름과 같은
  철학을 모달 API에). 5단 + 전체 2종, max-height **80vh**, 라운드 4px,
  스크림 `--theme-color-lightbox`(rgba(0,0,0,.549)).
- **진입 애니메이션이 CSS가 아니라 animejs(JS 라이브러리)입니다** —
  기본은 상단 정렬로 40px 슬라이드다운+페이드(300ms), `centered`면
  translateY −90%→−50%. 기본 위치가 세로 중앙이 아니라 상단입니다.
- **지속시간을 JS가 `getComputedStyle`로 CSS 변수에서 읽습니다**
  (`Animation` 유틸 — `--theme-short/default/medium/slow/x-slow-time`,
  폴백 0/150/300/500/1000ms). 테마 파일에 이 변수들이 없어 실효값은
  폴백입니다 — **short=0ms**로 "즉시"가 스케일의 1단입니다.
  `prefers-reduced-motion`이면 전 단계를 JS에서 0으로 — CSS 미디어쿼리가
  아니라 **JS 층에서 모션을 차단**하는 표본 유일 구조입니다.

### 특징적 결정 (심화분)

- **버튼 단일 사이즈(32px)** — 크기 축 자체를 제공하지 않음
- **1px 포커스 아웃라인** — 표본 최세(最細)
- **버튼·입력 라운드 2px** — 초저라운드 3단(0/2/4) 체계
- **입력 상태가 배경색** — 보더 신호 진영과 대극
- **모달 클래스명 = px 실값** · 기본 위치가 상단
- **모션 값의 소비가 JS** (CSS 변수 → getComputedStyle → animejs) —
  reduced-motion도 JS에서 처리

## 특징적 결정

- **`ms` 음수 지수 이름 체계** — 기준 중간 배치를 이름으로 명시, 표본 유일
- **텍스트 역할 = CSS `font` 축약형 단일 토큰** — 표본 유일
- 기본 14px — 산업 밀집 UI 진영
- Web Components + 3프레임워크 래퍼 — 배포 폭 표본 최대
- 다크에서 primary가 더 밝은 값으로 교체 + 차트 색 17계열

## 접근성

~~미확인.~~ → **WCAG AA (2026-08-18 해소 — 단, 버전 표기가 없습니다).**
출처: `ix.siemens.io/docs/guidelines/accessibility/overview` — "We strive to meet
WCAG AA standards". 개별 지침에는 성공 기준 번호(1.1·1.3·2.1·2.5 등)가 붙어 있고
**최소 타깃 24×24px**를 명시합니다.

## 참고

- **Figma 킷 (true) 근거:** Siemens AG Global Figma 계정의 "iX Design System" 라이브러리 — 사내 라이선스 전용, 게스트·classic은 요청 시, 2026-08-18 확인

- 토큰: `npm pack @siemens/ix@5.2.0` → `dist/siemens-ix/*.css`
- 컴포넌트 심화: 같은 패키지 `dist/collection/components/{button,input,modal}/*.css` ·
  `dist/collection/components/utils/animation.js` · `dist/siemens-ix/siemens-ix-core.css`
  (2026-08-18)
- **남은 확인 사항:** ~~스페이싱 체계~~ (2026-08-18 해소 — **스페이싱 토큰이
  없음을 확정**. core.css 전체에 `--theme-spacing*` 0건, 컴포넌트 CSS는
  0.25/0.5rem 리터럴), ~~브랜드 테마(siemens-brand) 유무~~ (2026-08-18 해소 —
  Figma 라이브러리에 **Brand dark · Brand light · Classic dark · Classic
  light 4종 테마**가 내장돼 있고, Siemens AG 애플리케이션은 **Corporate
  Brand Theme 사용이 규정**됩니다 — 출처
  <https://ix.siemens.io/docs/styles/theming/usage-designers>),
  ~~접근성 목표~~ (2026-08-18 해소 — 접근성 절 참조)
- **Figma 킷 해소 (2026-08-18):** `figma_kit: true` — 출처
  <https://ix.siemens.io/docs/home/overview>. "우리 **Figma 라이브러리는
  앱 디자인에 바로 쓸 수 있는 토큰·컴포넌트·블루프린트를 모두 담고
  있다**"고 명시합니다. 다만 **접근이 3단으로 게이트**돼 있습니다 —
  ① 주 라이브러리는 **Siemens AG Global Figma 계정**에서 관리되고,
  Figma 라이선스를 가진 **Siemens 임직원이 "iX Design System"으로 검색**해
  씁니다 ② **게스트 액세스와 classic(오픈소스) 라이브러리는 요청 시**
  개별 제공됩니다 ③ 라이브러리에는 **Siemens 브랜드 자산**이 포함됩니다.
  코드는 MIT 오픈소스인데 **디자인 킷은 사내 우선·요청 기반**이라는
  비대칭이 이 시스템의 특징입니다
