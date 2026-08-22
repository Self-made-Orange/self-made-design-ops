---
name: Welcome UI
org: Welcome to the Jungle (WTTJ)
coverage: partial
url: https://welcome-ui.com
repo: https://github.com/WTTJ/welcome-ui
license: MIT
tech: [React, CSS]
figma_kit: 미확인
tokens_format: [CSS, SCSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm welcome-ui@10.6.3 → dist/theme.css (변수 1,804개), dist/scss/breakpoints.scss"
---
<!-- lang-links -->
> [English](welcome-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

WTTJ(채용 플랫폼)의 시스템 — 완전 원형 라운드를 **`calc(infinity * 1px)`**로
표현합니다(표본 유일). 스페이싱이 **px 이름과 T셔츠 이름 두 벌 병존**이고,
브레이크포인트가 **1920px까지 8단계**입니다.

## 토큰 — 1,804개

### `calc(infinity * 1px)` — 알약 표현 세 번째 방식

```css
--border-radius-full: calc(infinity * 1px);
--avatar-border-radius: calc(infinity * 1px);
```

**CSS `infinity` 키워드(Values 4)로 알약 라운드를 만듭니다** —
표본 다수의 `9999px`(마법 상수)과 `50%`(정원)에 이은 **세 번째 표현**이며,
"충분히 큰 수"를 언어가 제공하는 무한값으로 바꾼 유일 사례입니다
(`GLOSSARY.md` 알약/정원 항목).

### 스페이싱 — 두 명명이 같은 값에 병존

```
px 이름:    --spacing-2(.125rem) · 4 · 12 · 16 · 24 · 32 · 48 · 192
T셔츠 이름: --spacing-2xs(.125rem) · … · 2xl(2rem) · 3xl(3rem) · 4xl · 5xl
```

- **`spacing-32`와 `spacing-2xl`이 둘 다 2rem입니다** — 숫자 체계와 T셔츠
  체계를 **동시에** 배포합니다. Artsy(`0.5`/`half` 2개)보다 넓은 전면 이중화이며,
  마이그레이션 중간 상태로 보이는 근거는 소스에 없습니다
- 상단이 `spacing-192`(12rem = 192px)까지 갑니다
- px 이름이지만 값은 rem — 이름-단위 불일치 (`spacing-12` = 0.75rem)

### 컴포넌트별 라운드 토큰

```
alert 8 · badge sm/md/lg (infinity/4/8) · button 8 · card 8 ·
calendar cell 8 / container 12 · checkbox 4
```

Mística(컴포넌트 시맨틱 13개)와 같은 진영이며, **badge만 크기별 3단계**를
두고 그중 `sm`이 알약입니다 — 작은 배지는 알약, 큰 배지는 8px 사각.

### 브레이크포인트 — 8단계, 1920px 상단

```
xs 0 · sm 480 · md 736 · lg 980 · xl 1280 · 2xl(=xxl) 1440 · 3xl 1620 · 4xl 1920
```

- **`2xl`과 `xxl`이 같은 값의 두 이름** — 스페이싱과 같은 이중 명명
- 736·980·1620 같은 비관행 수치 — 4·8의 배수가 아닙니다
- 상단 1920px은 Artsy와 같습니다 (표본 최대 계열)
- 주석에 **자동 생성 경고**가 있습니다 (`generate-theme.ts에서 생성 — 직접 편집 금지`)

## 컴포넌트 심화 — (2026-08-18)

`welcome-ui@10.6.3`의 `dist/*.css` — **CSS Modules + `@layer components`**로
컴포넌트 CSS 53개가 배포됩니다. 값은 `theme.css` 토큰을 참조 해석했습니다.

### 버튼 (`Button.css`)

| | sm | md | lg |
|---|:--:|:--:|:--:|
| **height** | 24px | 32px | **42px** |
| 좌우 패딩 | 8px | 12px | 16px |
| 서체 | 14px | 14px | 16px |
| 아이콘 | 16px | 16px | 24px |
| gap | 4px | 4px | 8px |

- **lg가 40이 아니라 42px입니다** — 입력도 같은 24/32/42 3단을 씁니다
  (버튼·입력 높이 정합은 Backpack과 같고, 42 값 자체는 관행 밖).
- 라운드 8px, 굵기 600, 행간 120%. 전환 `all .3s ease-in-out`.
  포커스는 **outline 4px `#ffe166`**(연노랑) — 브랜드 노랑이 포커스 링까지.
- primary가 **노랑 `#ffcd00` + 검정 글자** (WTTJ 브랜드), primary-neutral은
  검정 채움. secondary(1px 보더) · tertiary(투명) + danger 톤 조합.
- **primary-ai 변형: 무지개 conic-gradient 보더가 회전합니다** —
  `@property --gradient-angle`(타입 등록된 커스텀 프로퍼티)을 keyframes로
  −60°→300° 돌리고, 기본 `paused`, hover/focus에서 `running`. 11스톱
  (green→teal→blue→violet→pink→red-orange→역순) 그라디언트를 border-box에,
  본체 배경을 padding-box에 겹칩니다. eBay(AI 색 42개)에 이어 **AI 전용 시각
  언어 2번째 표본 — 이쪽은 색이 아니라 모션**입니다.
- **비활성이 회색조가 아니라 대각 빗금**입니다:
  `repeating-linear-gradient(-45deg, …, 2.5px, …, 5.25px)` 해칭 패턴 —
  표본 유일의 disabled 표현.
- 아이콘 단독이면 `:has(svg:only-child)`로 **width = height** 정사각 전환.
- 색·치수 전부 `--buttonBackground` 등 **camelCase 컴포넌트 변수**를 거칩니다 —
  hover/active/disabled가 속성 재선언이 아니라 **변수 재할당**입니다
  (`--buttonBackground: var(--buttonBackgroundHover)`).

### 입력 (`InputText.css`)

- 높이 24/32/42(sm/md/lg — 버튼과 공유), 라운드 8px, 보더 1px `#f3f3f3`.
- **기본 상태에 inset 그림자**: `0 0 6px rgba(0,0,0,.08)` inset,
  hover에서 `0 0 8px .16`으로 — 필드를 파인 면으로 그리는 질감 표현.
  보더보다 그림자가 상태를 나릅니다.
- 포커스 보더 `#ffe166`(연노랑 — 포커스 링과 같은 값) / 에러 `#e1003a` /
  성공 `#5a8034` / 경고 `#a6670a` — **4상태 보더색** 변형(variant-*)이 클래스로.
- placeholder `#989898`, 서체 14px/140%.

### 모달 (`Modal.css`)

| 폭 | 값 |
|------|-----|
| sm | 450px |
| md | 600px |
| lg | 800px |

- 라운드 12px + **1px 보더**(`#eae4de`) + 옅은 그림자(`0 6px 8px .12`) —
  그림자가 약한 만큼 보더가 윤곽을 잡는 조합입니다.
- 백드롭: `color-mix(in oklab, rgba(0,0,0,.26) 90%, transparent)` ≈ 검정 23% —
  **스크림 농도를 color-mix로 조립**하는 표본 유일 구문. Strapi(20%)와 함께
  옅은 스크림 축입니다.
- 진입: opacity + margin-top 슬라이드 `.25s ease-in-out`, 상태 훅은
  `[data-enter]` 속성 (Ariakit). fullscreen 변형 별도.

### 특징적 결정 (심화분)

- **버튼·입력 높이 24/32/42 공유** — 42px 비관행 상단
- **AI 버튼의 회전 그라디언트 보더** (`@property` 타입 등록) — AI 시각 언어의 모션 구현
- **비활성 = 대각 해칭 패턴** — 표본 유일
- 입력 상태를 inset 그림자로 — 보더 중심 관행과 갈림
- 상태 변화 = camelCase 컴포넌트 변수 재할당 (CSS Modules + @layer)

## 특징적 결정

- **`calc(infinity * 1px)` 알약** — 표본 유일, 알약 표현 세 번째 방식
- **숫자·T셔츠 명명 전면 이중화** (스페이싱·브레이크포인트 둘 다)
- 컴포넌트별 라운드 + badge 크기별 3단계
- 브레이크포인트 8단계, 736/980/1620 비관행 수치
- 토큰 1,804개 — 컴포넌트 토큰 비중이 큼

## 접근성

미확인.

## 참고

- 토큰: `npm pack welcome-ui@10.6.3` → `dist/theme.css`
- 컴포넌트 심화: 같은 패키지 `dist/Button.css` · `dist/InputText.css` ·
  `dist/Modal.css` + `theme.css` 참조 해석 (2026-08-18)
- **남은 확인 사항:** 컬러 팔레트, 타이포 스케일, 두 명명 체계의 관계
  (마이그레이션 여부), ~~컴포넌트 목록~~ (2026-08-18 해소 — dist CSS 53개)
