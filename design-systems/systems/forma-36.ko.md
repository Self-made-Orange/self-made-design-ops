---
name: Forma 36
org: Contentful
coverage: partial
url: https://f36.contentful.com
repo: https://github.com/contentful/forma-36
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JSON, CSS, SCSS, JS]
a11y_target: "WCAG 2.1 AA (명시 — 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @contentful/f36-tokens@6.2.1 → dist/json/*.json · npm @contentful/f36-button@6.19.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](forma-36.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Contentful(헤드리스 CMS)의 시스템. **글자 크기에 밀도 변형(`-high`)이 있고**,
z-index가 **10의 거듭제곱**이며, `notification`이 `tooltip`보다 위에 있습니다.

## 토큰

### 타이포그래피 — 크기마다 `-high` 짝

```json
"font-size-l":       "1rem",       // 16px
"font-size-l-high":  "0.875rem",   // 14px
"font-size-m":       "0.875rem",   // 14px
"font-size-m-high":  "0.75rem",    // 12px
"font-size-xl":      "1.25rem",    // 20px
"font-size-xl-high": "1.125rem"    // 18px
```

**같은 단계 이름에 한 치수 작은 `-high` 변형이 붙습니다** (행간도 동일 구조).
Cloudscape가 밀도를 **여백** 값의 축으로 둔 것과 달리, F36은 **글자 크기**에 둡니다 —
표본에서 타이포 밀도 변형은 F36뿐입니다.

크기: 12 · 14 · 16 · 20 · 24 · 36 · 48 (+ `-high` 짝).
행간 비율 토큰은 `default` 1.5 · `condensed` 1.25 둘입니다.

굵기 3단계 — 400 / 500 / **600 (`demi-bold`)**. 700(bold)이 없습니다 —
Radix Themes(600 없음)와 반대 방향의 결손입니다.

서체 스택이 **Geist Sans / Geist Mono**입니다 — Vercel의 서체를 쓰는
비-Vercel 시스템입니다.

### z-index — 10의 거듭제곱

```json
"z-index-negative": -1,   "z-index-default": 1,
"z-index-workbench-header": 10,  "z-index-modal": 100,
"z-index-dropdown": 1000, "z-index-tooltip": 10000,
"z-index-notification": 100000
```

**-1 · 0 · 1 · 10 · 100 · 1000 · 10⁴ · 10⁵ — 로그 스케일입니다.**
표본 네 번째 z-index 체계입니다:

| 방식 | 시스템 |
|------|--------|
| 용도명 + 100 등차 (13단계) | Chakra UI |
| 1000대 + 배경/콘텐츠 인접(+5) | Bootstrap |
| 순번 1~5 | Open Props |
| **10ⁿ 로그** | **F36** |

**`modal`(100)이 `dropdown`(1000)보다 아래입니다** — Chakra(dropdown 1000 <
modal 1400)와 반대입니다. **`notification`(10⁵)이 `tooltip`(10⁴)보다 위**인 것도
Chakra(toast 1700 < tooltip 1800)와 반대입니다. **층위 서열 자체가 시스템마다
다르다는 실증**입니다.

`modal-content: 101`처럼 +1 인접쌍도 있습니다 (Bootstrap의 +5와 같은 발상).

### 스페이싱 — 9단계

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80
```

코어 `4/8/16/24/32` 전부 보유. 20이 없고 상단이 48/64/80입니다. 관행적 구성입니다.

### 콘텐츠 폭

```json
"content-width-default": "1280px",  "content-width-text": "768px"
```

**본문 폭(768px)을 px로 토큰화합니다** — Open Props(`45ch`)·USWDS(`64ex`)가
글자 상대 단위인 것과 달리 **절대값**입니다. 행폭 토큰 세 번째 사례, 세 번째 단위.

## 컴포넌트

`@contentful/f36-components`(메타 패키지)가 ~~목록 미확인~~ →
**`@contentful/f36-*` 서브패키지 40개**를 재수출합니다 (accordion · autocomplete ·
button · card · datepicker · forms · menu · modal · notification · pill ·
progress-stepper · table · tooltip 등, 6.19.0 기준). → 버튼·입력·모달은 아래 심화 절.

## 컴포넌트 심화 — (2026-08-18)

`@contentful/f36-button@6.19.0` · `f36-forms@6.19.0` · `f36-modal@6.19.0`의
dist JS(emotion 객체 스타일)를 파싱하고, 토큰 참조는 `@contentful/f36-tokens@6.2.1`로
해석했습니다. 이 과정에서 라운드 2단(`small` 4px · `medium` 6px), 지속시간 3단
(0.1/0.2/0.3s), 이징 2종(`ease-in-out` · `cubic-bezier(0.13, 0.62, 0.11, 0.99)`)도
확정됐습니다.

### 버튼 — 밀도가 치수까지 내려옵니다

| | tiny | small | medium (기본) | large |
|---|:--:|:--:|:--:|:--:|
| **min-height** | 24px | 32px | **40px** | 48px |
| high 밀도 | 24px | **24px** | **32px** | — |
| 패딩 | 4×12 | 4×12 (high 4×8) | 8×16 (high 8×12) | 8×16 |
| 서체 | 12px | 14px | 14px | **20px / 32px** |

- **4단 높이 24/32/40/48 — 8px 등차.** tiny·small은 spacing 토큰(`spacingL`=24 ·
  `spacingXl`=32)을 **높이로 재사용**하고, 40·48은 스페이싱 스케일에 없어
  **리터럴 `"40px"`·`"48px"`**로 박혀 있습니다.
- **`density="high"`가 각 크기를 한 단 아래로 접습니다** — small→24, medium→32.
  패딩·서체(`-high` 짝)·라운드(6→4px)까지 함께 줄어듭니다. 토큰층의 타이포 밀도
  변형(`-high`)이 **컴포넌트 치수로 실현**된 형태이며, 밀도는 prop이 아니라
  `useDensity()` **React 컨텍스트**에서 옵니다 (Ring UI `ControlsHeightContext`와
  같은 트리 단위 전환).
- **최소 너비 대신 최대 너비**를 겁니다 — **max-width 240px** (full-width 제외).
- 라운드 6px(`borderRadiusMedium`), 굵기 500, 보더 1px +
  그림자 `0 1px 0 rgba(25,37,50,.08)`.
- large만 서체가 20px/32px로 뜁니다 — 나머지 3단은 12~14px에 행간비 1.25.
- 전환: background **0.1s ease-in-out** (`transitionDurationShort`).

### 입력 (TextInput) — 고정 높이를 min=max 쌍으로

| | small | medium (기본) |
|---|:--:|:--:|
| **min-height = max-height** | 32px (high 24) | **40px** (high 32) |
| 패딩 | 8px | **10px** × 12px (high 8px) |
| 서체 | 14px / 20px (high 12/16) | 동일 |
| 라운드 | 6px (high 4px) | 동일 |

- **min-height와 max-height에 같은 값을 선언**합니다 — 고정 높이의 min/max 쌍 표기.
- **세로 패딩이 10px 리터럴**입니다 — 4px 격자(스페이싱 토큰) 밖의 손값.
- 라벨은 별도 블록(FormLabel) — 14px·**500**, 아래 여백 8px. 필수 표시가
  400 회색 "(required)"로 뒤에 붙습니다. 밀도 high에서 라벨도 12px로 축소.
- 보더 1px `gray300`, 포커스는 `blue600` 보더 + `glowPrimary` 그림자 토큰.

### 모달 — 3단 + 임의 폭 허용

| size | 폭 |
|------|-----|
| small | 400px |
| medium (기본) | **520px** |
| large | 700px |
| fullWidth / zen / fullscreen | 100vw |

- **width prop에 임의 값을 그대로 허용**합니다 (`width: map[size] || size`) —
  단계는 강제가 아니라 기본값 제공입니다.
- 진입: **scale(0.85)→1 + 오버레이 페이드, 0.2s ease-in-out**
  (`transitionDurationDefault` · `transitionEasingDefault`) —
  react-modal의 afterOpen/beforeClose 클래스 전환 방식입니다.
- 라운드 6px, 오버레이 `rgba(12,20,28,0.75)` + 뷰포트 여백 48px(`spacing2Xl`).
- 패딩: 헤더 `16 16 16 24` + 1px 하단 보더 · 본문 16×24 · 푸터 12×16.
- 최대 치수가 `calc(100vw − 1rem×(100/16))` — `fontBaseDefault`(16)로 나누는
  **rem 환산 보정식**이 코드에 들어 있습니다.
- z-index 100(modal) · 101(modal-content) — 토큰층 로그 스케일 그대로.

### 특징적 결정 (심화분)

- **밀도 축의 전층 관통** — 토큰(`-high` 짝) → 서체 → 패딩 → min-height → 라운드,
  전달은 React 컨텍스트(`useDensity`)
- **버튼 max-width 240px** — min-width 진영(MUI 64px 등)과 반대 방향의 제약
- **spacing 토큰의 높이 재사용** + 스케일 밖 값(40/48)은 리터럴
- **모달 폭 임의 값 허용** — 3단은 기본값일 뿐
- 입력 고정 높이를 min=max 쌍으로 표기

## 특징적 결정

- **타이포 밀도 변형** (`-high` 짝) — 표본 유일. 밀도 축의 세 번째 적용 지점
  (Cloudscape 여백 · Radix `--scaling` 전역 · **F36 글자 크기**)
- **z-index 로그 스케일** + 층위 서열이 Chakra와 곳곳에서 반대
- **굵기에 700이 없습니다** (400/500/600)
- **행폭 토큰이 px** (768px) — `ch`/`ex`와 다른 세 번째 단위
- Geist 서체 스택 — 타사(Vercel) 서체 채택

## 접근성

~~미확인.~~ → **WCAG 2.1 Level AA (2026-08-18 해소).**
출처: `f36.contentful.com/guidelines/accessibility` — "Contentful aims to meet
WCAG 2.1 Level AA standards". 자동 테스트 병행을 함께 명시합니다.

## 참고

- 토큰: `npm pack @contentful/f36-tokens@6.2.1` → `dist/json/`
  (border-radius · box-shadows · colors · spacing · transitions · typography · z-index)
- 컴포넌트 심화: `@contentful/f36-{button,forms,modal}@6.19.0` → `dist/index.js`
  (emotion 객체 스타일) + f36-tokens 참조 해석 (2026-08-18)
- 라이선스: 패키지 `license` 필드·LICENSE.md 모두 **MIT** — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** 컬러 구조, ~~라운드 · 트랜지션 값 · 컴포넌트 목록~~
  (2026-08-18 해소 — 심화 절·컴포넌트 절)
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github contentful/forma-36 → `LICENSE.md` (npm `@contentful/f36-tokens@6.2.1` 메타와 일치)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `f36.contentful.com` — Figma Community 페이지에서 Components · Tokens · Assets
  **라이브러리 3벌**을 복사해 팀 라이브러리로 등록하는 방식
