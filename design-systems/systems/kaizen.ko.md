---
name: Kaizen
org: Culture Amp
coverage: partial
url: https://cultureamp.design
repo: https://github.com/cultureamp/kaizen-design-system
license: MIT
tech: [React, SCSS]
figma_kit: true
tokens_format: [SCSS, CSS]
a11y_target: "명시 없음 확인 (2026-08-18 — 스토리북 문서 197개 엔트리에 접근성 문서 없음, WCAG 언급 0회)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @kaizen/design-tokens@11.0.17 → sass/{spacing,typography}.scss · npm @kaizen/components@3.3.12 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](kaizen.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Culture Amp의 시스템 — 스페이싱이 **6px 격자**(6·12·24·36·48·60·72)로,
**코어값 4·8·16·32를 전부 비켜 갑니다.** 표본에서 6px 격자는 Kaizen뿐입니다.

## 토큰

### 스페이싱 — 6px 격자, 코어 전면 이탈

```scss
$spacing-xs:   0.375rem  // 6px
$spacing-sm:   0.75rem   // 12px
$spacing-md:   1.5rem    // 24px
$spacing-lg:   2.25rem   // 36px
$spacing-xl:   3rem      // 48px
$spacing-xxl:  3.75rem   // 60px
$spacing-xxxl: 4.5rem    // 72px
```

**`4`·`8`·`16`·`32`가 하나도 없습니다** — 표본에서 코어 4값을 동시에
이탈한 것은 Kaizen과 Grommet(24 약수 격자: 3·6·12) 둘뿐이고,
**둘 다 6px 계열**입니다. 6px 격자는 12·24로 4·8 격자와 최소공배수를
공유하지만, 16을 표현할 수 없습니다.

7단계 T셔츠(xs~xxxl)이며 — 코어 이탈이 T셔츠 소단계 스케일에서 나온다는
`tokens/scales.md`의 경향에 부합합니다.

### 토큰 표기 — CSS 변수 폴백 + `-id` 쌍

```scss
$spacing-md:     var(--spacing-md, 1.5rem);   // 폴백 내장 참조
$spacing-md-id:  --spacing-md;                // 변수 이름 자체를 값으로
```

- **모든 SCSS 변수가 `var(--x, 폴백)` 형태입니다** — 런타임 교체 가능하고
  변수 미정의 시 정적값으로 떨어집니다
- **`-id` 접미 토큰이 변수 "이름"을 담습니다** — JS에서
  `style.setProperty(spacingMdId, …)`로 쓰기 위한 것으로,
  **토큰 이름을 값으로 배포한 표본 유일 사례**입니다
- 타이포에 `data-large` 같은 **데이터 표시 전용 역할**이 있고 크기가
  **5.25rem(84px)**입니다 — 대시보드 숫자 표시용. 행간이 크기와 같습니다(1:1)

## 컴포넌트 심화 — (2026-08-18)

컴포넌트는 `@kaizen/components@3.3.12`입니다 (`@kaizen/component-library`의 후신 —
frontmatter의 16.11.0은 구 패키지). `dist/styles.css` 한 파일에 `@layer tokens,
normalize, reset, kz-components` — **캐스케이드 레이어 4층**으로 토큰과 컴포넌트가
함께 배포됩니다. 값은 `src/*/​*.module.css`(신층)와 `*.module.scss`(구층)에서 실측했습니다.

### 토큰 층의 발견 — 6px 격자가 구층이 됐습니다

`@layer tokens`에 **스페이싱이 두 벌** 있습니다:

- **숫자 px 명명 신스케일** `--spacing-0…320` (0·1·2·4·6·8·12·16·20·24·32·40·48…) —
  Kaizen 명명 유일값이던 6px 격자가 아니라 **사실상 4px 격자**입니다
- 구 T셔츠 6px 격자는 `--spacing-xs…xxxxxl`(6·12·24·36·48·60·72·**84·96**) 별칭으로
  잔존 — 토큰 md에 없던 xxxxl(84)·xxxxxl(96)이 여기서 확인됩니다

**표본 유일이던 6px 격자가 자기 시스템 안에서 코어(4px 계열)로 회귀 중입니다.**
신층 Button은 숫자 스케일만, 구층 Input은 6px 격자 SCSS 변수만 씁니다 —
한 패키지 안에 두 세대가 병존합니다.

그 외: 라운드 **7px**(`--border-solid-border-radius` — 표본 희귀 홀수값) ·
보더 **2px** · 이징 6종(`bounce-in/out/in-out` 포함) · 지속시간 이름이
`instant/immediate/rapid/fast/slow/deliberate`(0/100/200/300/400/700ms).

### 버튼 — min-height와 min-width가 같은 변수

| | small | medium | large |
|---|:--:|:--:|:--:|
| **min-height = min-width** | **32px** | **40px** | **48px** |
| 패딩 | y `calc(8px−보더)` | y 8−2, x 20−2 | y 12−2, x 24−2 |
| 서체 | 12px/16px | 16px/24px/500 | 동일 |
| 라운드 | 7px | 7px | 7px |

- **`--button-min-x-y` 한 변수가 min-height와 min-width를 동시에 정합니다** —
  정사각 하한. 아이콘 버튼이 자동으로 원형 아닌 정사각 40×40이 됩니다.
- **패딩이 `calc(스페이싱 − 보더 2px)`입니다** — 보더 몫을 패딩에서 차감해
  총 치수를 지킵니다. MUI가 outlined만 1px 줄이는 것과 같은 의도를
  **전 변형에 calc로** 적용한 형태이고, primary도 배경색과 같은 색의 보더를
  깔아 변형 간 치수가 불변입니다.
- 상태가 `:hover`가 아니라 **`[data-hovered]`·`[data-pressed]`·`[data-pending]`
  속성**입니다 — react-aria 이행의 흔적. `pending`(로딩 중) 상태색이 토큰화된
  드문 사례입니다.
- 포커스: 2px 링(`blue-500`) + offset 1px. reversed 3종은 링이 `blue-300`으로 반전.

### 입력 (Input/TextField) — 48px, 버튼보다 높습니다

| 항목 | 값 |
|------|-----|
| **height** | **48px 고정** (`$input-height`) |
| 좌우 패딩 | 12px (`$spacing-sm` — 6px 격자) |
| 보더 · 라운드 | 2px · 7px |
| 서체 | 16px / 1.5 |

- **입력 48px vs 버튼 medium 40px** — 입력이 버튼 large와 같은 높이입니다.
  폼 안에서 버튼·입력 높이를 맞추는 다수 진영(Backpack 36/36)과 갈립니다.
- 상태에 `error`(red-500) 외에 **`caution`(yellow-600)이 별도**입니다 —
  경고와 오류를 필드 보더 색으로 구분하는 시스템은 표본에서 드뭅니다.
- 포커스가 링 + **배경 틴트**(gray-200) 동시 — disabled는 opacity 0.3.

### 모달 — bounce 진입, 그리고 201ms

| 항목 | 값 |
|------|-----|
| 폭 | min 300 / **max 600px** |
| 라운드 · 그림자 | 7px · `shadow-large` |
| 스크림 | #000 50% |
| 진입 | **fade + zoom(0.5→1), 300ms, `bounce-in`** `(0.485,0.155,0.24,1.245)` |
| 퇴장 | 200ms `bounce-out` |

- **오버슈트(bounce) 이징을 모달 진입에 실사용합니다.** ~~기본 모달에 쓰는 것은
  표본에서 Kaizen뿐~~ → **정정 (2026-08-18, `patterns/motion.md` 83표본 재종합):**
  최소 8곳입니다 (Blueprint 1.12 · HSDS `boop` 1.2 등). Kaizen은 그중 하나입니다.
- **스크림 페이드가 201ms입니다** — Chrome/Blink 102.x에서 200ms면 불투명도가
  1까지 애니메이션되는 버그를 피하려고 "rapid" 토큰(200ms) 대신 **1ms 더한
  리터럴**을 박았습니다 (소스 주석에 Jira KDS-523 명기). 브라우저 버그 회피가
  지속시간 값에 박제된 표본 유일 사례입니다.
- zoom 0.5→1은 표본 모달 스케일 진입 중 가장 깊은 축소입니다 (Backpack 0.9→1).

### 특징적 결정 (심화분)

- **6px 격자의 자기 회귀** — 신 숫자 스케일은 4px 계열, 구 T셔츠만 6px 잔존
- **라운드 7px** — 홀수 라운드, 전 컴포넌트 공통
- **버튼 min-width = min-height** — 한 변수의 정사각 하한
- **전 변형 `calc(패딩 − 보더)`** — 치수 불변을 calc로 보장
- **모달 bounce-in 진입 + 201ms 버그 회피값**
- **`caution` 필드 상태** — 오류 아닌 경고 보더색

## 특징적 결정

- **6px 격자** — 코어 4·8·16·32 전면 이탈, 표본 유일 격자.
  단, 컴포넌트 신층은 4px 계열 숫자 스케일로 이동 중입니다 (위 심화 절, 2026-08-18)
- **`-id` 토큰(변수 이름을 값으로)** — 표본 유일
- 전 토큰이 `var(--x, fallback)` — 정적/런타임 동시 지원
- `data-large` 84px 행간 1:1 — 대시보드 수치 표시 전용 역할

## 접근성

~~미확인.~~ → **부재 확정 (2026-08-18, 헤드리스 렌더).**

렌더링해도 이 시스템은 접근성 목표를 공개하지 않습니다. 문서 사이트가
**스토리북 한 벌**이고, 문서 엔트리 **197개**(`index.json` 실측)를 훑어도
Accessibility·a11y 제목의 문서가 없습니다. 구성은 Introduction/Welcome ·
Guides(App starter · Layout and spacing · Tailwind 계열 · Tokens 계열) ·
Components(60여) · Pages · Releases 뿐입니다. 렌더한 페이지 전체에서 `WCAG`
문자열이 **0회**입니다.
출처: https://cultureamp.design/ · https://cultureamp.design/index.json
(2026-08-18 헤드리스 렌더)

Welcome 문서가 접근성을 목적어로 한 번 언급하긴 합니다 — 컴포넌트가
"a high level of quality, **accessibility** and consistency with the overall
platform"을 지향한다는 문장인데, **준수 기준도 검증 방법도 없습니다**
(출처: https://cultureamp.design/?path=/docs/introduction-welcome--docs).
스토리북에 `@storybook/addon-a11y`가 설치돼 있어(매니저 번들 `sb-addons/a11y-1`)
**개발 중 자동 점검은 하지만 목표 등급은 문서화하지 않은** 유형입니다.

## 참고

- 토큰: `npm pack @kaizen/design-tokens@11.0.17` → `sass/`
- 컴포넌트: ~~`@kaizen/component-library@16.11.0`~~ → **`@kaizen/components@3.3.12`**
  (현행 패키지 — 심화에 사용, 2026-08-18). `dist/styles.css` + `src/*/​*.module.css`
- 컬러: `dist/styles.css` `@layer tokens`에 전량 — 7색상×7단(100~700, purple만 800) +
  화이트/블랙. 서체 Inter 본문 / **Tiempos Headline**(display-0 serif) / IBM Plex Mono
- **Figma (2026-08-18, 헤드리스 렌더):** 공개 킷은 확인되지 않습니다. Welcome
  문서가 "We aim to have what's represented here in code **equally matching
  Figma**, to enable cross-functional teams to communicate with the same
  language"라고 써서 **사내 Figma 라이브러리의 존재는 시사**하지만, 스토리북
  197개 엔트리 어디에도 킷 페이지·다운로드·커뮤니티 링크가 없습니다
  (사이트 전체 렌더에서 "Figma" 언급은 이 한 문장뿐).
  → 당시 `figma_kit: 미확인`이었던 근거입니다: "없다"가 아니라 "공개돼 있지 않다".
  출처: https://cultureamp.design/?path=/docs/introduction-welcome--docs
- **Figma — `true`로 해소 (2026-08-23).** 위 문장이 시사만 하던 그 킷이 **저장소**에서
  직접 링크됩니다. 문서 사이트 렌더가 닿지 않던 자리입니다 — `CONTRIBUTING.md` 165행이
  아이콘 기여자를 "our figma file"로 보내며, 주소는
  `figma.com/file/eZKEE5kXbEMY3lx84oz8iN`, 파일 이름은 **💜 UI Kit: Heart**입니다.
  이 주소는 **302**를 반환합니다(파일을 주지 않고 리다이렉트). 따라서 확인되는 것은
  **킷의 존재**이지 공개 열람 가능 여부가 아닙니다 — 코퍼스가 Backpack에 적용한 것과 같은
  판독입니다. 파일 키를 여기 기록해 둡니다. 없으면 재확인이 불가능합니다.
  출처: github `cultureamp/kaizen-design-system`, `CONTRIBUTING.md`, `main@5b691f46c5`
- **남은 확인 사항:** ~~컬러·그림자·레이아웃 토큰~~ ~~컴포넌트 목록~~ (2026-08-18
  해소 — styles.css에 전량, 컴포넌트 60여 디렉터리), ~~접근성 목표~~ (2026-08-18
  부재 확정), 6px 격자의 근거 — **2026-08-18 헤드리스 렌더로 문서 사이트를 열람
  했으나(이전의 "프록시 차단" 기록은 무효) `Guides/Layout and spacing`을 포함해
  6px을 고른 이유를 밝힌 문서는 없습니다**, 공개 Figma 킷 여부
