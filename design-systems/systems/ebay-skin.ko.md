---
name: Skin (eBay Evo)
org: eBay
coverage: partial
url: https://ebay.github.io/skin
repo: https://github.com/eBay/skin
license: MIT
tech: [CSS, Marko, Web Components]
figma_kit: false
tokens_format: [CSS]
a11y_target: "WCAG 2.2 AA"
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @ebay/skin@19.32.0 → dist/tokens/evo-{core,light,dark,live-light,live-dark}.css"
---
<!-- lang-links -->
> [English](ebay-skin.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

eBay의 시스템 — **AI 기능 전용 컬러 42개**(`--color-ai-*`, 그라디언트 포함)를
두고, 브레이크포인트에 **iOS·Android OS별 계열**이 별도로 있으며,
보더 두께에 **0.5px**이 있습니다. 테마가 `light`/`dark` × `live` 4벌입니다.

## 토큰

### AI 전용 컬러 계열 — 코퍼스 첫 사례

```css
--color-ai-solid-blue-strong: #0968f6;   --color-ai-solid-blue-subtle: #f0f6fe;
--color-ai-solid-{green,purple,red,yellow}-{strong,subtle}
--color-ai-gradient-blue-strong · -green-strong · -purple-strong
--color-ai-gradient-full-spectrum
```

- **AI 기능 UI 전용 색 42개**입니다 — 표본에서 AI를 색 계열로 토큰화한
  첫 사례입니다. `solid`(단색)와 `gradient`(그라디언트) 두 종류이고,
  **`full-spectrum`**은 여러 색을 지나는 그라디언트입니다
- Intergalactic(Semrush)의 강조 테마가 "신기능·유료" 그라디언트였던 것과
  같은 자리 — **제품의 특정 기능군이 색 계열을 갖는 패턴**이 2건이 됐습니다.
  이쪽은 별도 테마 파일이 아니라 **일반 테마 안의 계열**입니다

### 브레이크포인트 — OS별 계열 병존

```css
--breakpoint-extra-small 320 · small 512 · medium 600 · large 800 ·
  extra-large 1100 · extra-large-2 1400 · extra-large-3 1920
--breakpoint-ios-compact 320 · ios-regular 600 · ios-expanded 800
--breakpoint-android-compact 320 · android-medium 600 · android-expanded 800
```

- **웹 7단계와 별도로 iOS·Android 계열을 둡니다** — 값은 같은데(320/600/800)
  **OS 문서의 어휘**(`compact`/`regular`/`expanded` = Apple size class,
  `compact`/`medium`/`expanded` = Material window size class)로 이름을 맞췄습니다.
  표본에서 OS 사이즈 클래스 어휘를 웹 토큰에 병기한 유일 사례입니다
- `extra-large-3`가 1920px — Artsy·Welcome UI와 같은 상단

### 치수 — `dimension` 번호 = px × 12.5

```
0 · 25:2 · 50:4 · 75:6 · 100:8 · 150:12 · 200:16 · 250:20 ·
300:24 · 400:32 · 500:40 · 600:48 · 800:64 · 1000:80
```

`100`이 8px이므로 **번호 = px × 12.5**입니다 — Vapor UI(rem×12.5)와 같은
비율이지만 기준이 px입니다. 16px을 부르는 방식 목록에 **`200`**이 추가됩니다.

### 보더 — 0.5px

```css
--border-width-thin: 0.5px · medium: 1px · thick: 2px
```

**서브픽셀 보더가 토큰입니다** — TDS의 밑줄 0.7px에 이어 두 번째 서브픽셀 값이며,
보더에서는 표본 유일입니다 (고해상도 화면 전제).

### 테마 4벌

`evo-light` · `evo-dark` · **`evo-live-light`** · **`evo-live-dark`** +
`evo-core`(공통) — `live` 계열에는 **AI 컬러가 없습니다**(diff로 확인).
`-class` 접미 사본도 함께 배포해 클래스 스코프 적용을 지원합니다.

## 컴포넌트 심화 — (2026-08-18)

같은 `@ebay/skin@19.32.0` 패키지에 **컴포넌트 91개가 `dist/<이름>/<이름>.css`로**
들어 있습니다 (루트의 `button.css` 등은 `@import` 한 줄 껍데기 — dist를 봐야 합니다.
토큰의 "루트 `tokens.css` 빈 파일"과 같은 함정 구조). 아래는
`dist/button` · `dist/textbox` · `dist/dialog` 실측입니다.

### 버튼 (`.btn` / `a.fake-btn`)

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| **min-height** | 32px | **40px** | 48px |
| 좌우 패딩 | 16px | 20px | 20px |
| 라운드 | 16px | 20px | 24px |
| 서체 | 14px | 14px | 16px (`--font-size-medium`) |

- **라운드가 정확히 높이 절반의 알약인데, 토큰이 아니라 크기별 리터럴 폴백**입니다 —
  `var(--btn-border-radius, 20px)` 식으로 세 크기에 16/20/24를 하드코딩.
  `--border-radius-100`(16)·`-150`(24)이 있는데도 쓰지 않았습니다 (20px은 토큰에 없음).
- min-width **88px** (기본 크기만). 높이는 `min-height`이고 `--fixed-height` 변형이
  따로 `height`를 고정합니다 — Backpack(min-height만)과 두 방식 병존.
- **상태가 Material식 state-layer입니다** — `:after` 오버레이에
  `--color-state-layer-hover`(검정 4%) / `-pressed`(8%) / `-focus`(4%)를 칠합니다.
  바닐라 CSS로 state-layer를 조립한 표본 (Vuetify는 같은 패턴을 `__overlay` 요소로).
- **`:active`에서 `transform: scale(0.97)`** — 눌림을 축소로 표현.
- 전환 `all 167ms cubic-bezier(0,0,0,1)`(`quick-enter`).
- primary만 굵기 700. 변형: primary · secondary · tertiary · destructive ·
  borderless · form · slim. 링크 위장 클래스 이름이 **`fake-btn`**입니다 —
  "가짜"를 클래스명에 박은 직설 작명.

### 입력 (`.textbox`)

- **래퍼가 보더를 소유하고, 내부 input 높이가 `calc(40px − 2px)`** —
  보더 2px를 자식 높이에서 차감해 총 40px(large 48px)을 맞춥니다.
  높이는 `:root`의 `--input-default-height: 40px` / `--input-large-height: 48px`.
- 라운드 8px(`--border-radius-50`), 보더 1px. 포커스에서 보더색 강조 +
  **같은 색 `box-shadow 0 0 0 1px`** — 레이아웃 시프트 없이 시각 2px 보더.
- 상태 셀렉터가 **`:has()` 기반**입니다 (`.textbox:has(> .textbox__control:focus)`) —
  JS 없이 자식 상태를 래퍼에 반영. readonly는 보더를 아예 제거합니다.
- placeholder **font-weight 200**. textarea min-height 200px.

### 다이얼로그 (`.dialog` — 네이티브 `<dialog>`)

| 폭 | 값 |
|------|-----|
| narrow | 480px |
| 기본 · lightbox | **616px** |
| wide | 896px |

- max-width 88% · max-height 90%. 라운드 **24px**(`--border-radius-150`).
- 스크림 `rgb(17 24 32 / 0.7)` — 순검정이 아니라 **네이비 틴트 잉크색**.
- **진입이 두 트랙 분리**입니다: scale 0.75→1은 **500ms** standard(0.3,0,0,1),
  불투명도는 **167ms** continuous — 형태는 느리게, 페이드는 빠르게.
  퇴장은 scale에 soft-exit`(0.3,0,1,1)`. `transition: display/overlay
  allow-discrete`까지 쓰는 최신 CSS 구현입니다.
- 내부 패딩 사방 16px(`--spacing-200`), 닫기 버튼 32px.

### 모션 토큰 — 지속시간이 60fps 프레임 격자

`evo-core.css`의 지속시간 10종이 전부 프레임 수입니다:
17/50/83/167/250/333/500/667/833/1000ms = **1/3/5/10/15/20/30/40/50/60프레임**.
`instant`가 17ms(정확히 1프레임)인 데서 의도가 드러납니다 — 지속시간을
ms가 아니라 **프레임 배수로 양자화한 표본 유일 사례**. 이징은 7종
(standard`(0.3,0,0,1)` · quick/soft × enter/exit · bounce`(0.3,0,0,1.25)` · continuous · linear).

### 타이포 스케일 (심화에서 확보)

10/12/14/16/18/20/24/30/36/46/64px 11단 — `--font-size-body`(14) 등 시맨틱 이름이
원본이고 `--font-size-14` 식 **숫자 별칭을 병행 배포**합니다 (18·64는 시맨틱 이름 없음).

### 특징적 결정 (심화분)

- **지속시간 10종 = 60fps 프레임 배수** — 표본 유일
- **알약 라운드를 크기별 리터럴 폴백으로** (토큰 우회)
- **state-layer 오버레이 + scale(0.97)** — Material 문법의 바닐라 CSS 이식
- 입력: 래퍼 보더 + 자식 높이 차감 / `:has()` 상태 반영
- 다이얼로그: scale 500ms·페이드 167ms 두 트랙 진입

## 특징적 결정

- **AI 기능 전용 컬러 42개**(solid/gradient/full-spectrum) — 코퍼스 첫 사례
- **iOS·Android 사이즈 클래스 어휘를 웹 브레이크포인트에 병기** — 표본 유일
- **보더 0.5px 서브픽셀 토큰** — 보더에서 표본 유일
- 치수 번호 = px × 12.5 (16px을 `200`으로 부름)
- 테마 4벌 + 클래스 스코프 사본

## 접근성

~~미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**

**WCAG 2.2 AA를 명시적 목표로 내겁니다** — 문서 홈이 "Accessibility First /
**WCAG 2.2 AA** aligned components built for everyone, on every device"라고 쓰고,
"Accessibility Considerations" 항목에 `WCAG 2.2 AA` · Semantic HTML ·
ARIA Roles, States & Properties · Keyboard Support · Screen Reader Support ·
Color Contrast를 나열합니다. 테스트도 "keyboard, screen readers, and automated
accessibility tools aligned with WCAG compliance"로 서술합니다.
출처: https://opensource.ebay.com/skin/ (= `ebay.github.io/skin` 리디렉트 도착지,
2026-08-18 헤드리스 렌더)

**접근성 문서량이 표본 최상위입니다** — 별도 `Accessibility` 최상위 내비가 있고
그 아래가 **patterns · anti-patterns · techniques · misc(FAQ)** 4갈래입니다.
안티패턴만 `disabling-pinch-to-zoom` · `hand-cursor-on-buttons` · `javascript-href` ·
`layout-table` · `non-interactive-hover` · `open-new-window` ·
`setting-focus-on-page-load` · `tabindex-itis` · `title-tooltip` 9건으로,
**"하지 말 것"을 문서 계층으로 못박은 표본 유일 구조**입니다.
FAQ는 "버튼이냐 링크냐"를 브라우저 히스토리 변경 여부로 가르고
(`use links for anything that updates browser history state`),
버튼에 hand cursor 금지·포커스된 버튼을 live-region으로 쓰지 말 것을 명시합니다.
출처: https://opensource.ebay.com/evo-web/accessibility ·
https://opensource.ebay.com/evo-web/accessibility/misc/faq (2026-08-18 렌더)

## 참고

- 토큰: `npm pack @ebay/skin@19.32.0` → `dist/tokens/`
  (루트 `tokens.css`는 빈 파일이므로 `dist/tokens/`를 봐야 합니다)
- 컴포넌트 심화: 같은 패키지 `dist/button/button.css` ·
  `dist/textbox/textbox.css` · `dist/dialog/dialog.css` + `dist/tokens/evo-core.css`
  참조 해석 (2026-08-18)
- **남은 확인 사항:** `live` 테마의 용도(라이브 커머스 추정 — 근거 없음),
  ~~타이포 스케일, 컴포넌트 목록~~ (2026-08-18 해소 — 심화 절: 11단 스케일,
  dist 91개), AI 색 사용 지침, ~~접근성 목표~~ ~~Figma 킷~~ (2026-08-18 해소)
- **문서 사이트 (2026-08-18 헤드리스 렌더):** `ebay.github.io/skin`은 SPA가 아니라
  **`opensource.ebay.com/skin/`으로 301 리디렉트**됩니다. 내부 링크가
  `/evo-web/...` 절대 경로여서 `ebay.github.io/skin/evo-web/...`로는 404가 납니다 —
  접근성 문서를 보려면 `opensource.ebay.com/evo-web/...`를 직접 열어야 합니다
- **Figma 킷 — 부재 확정 (2026-08-18):** 렌더링해도 이 시스템은 Figma 킷을
  공개하지 않습니다. 문서 홈·컴포넌트·접근성 문서 전체 렌더에서 "Figma" 문자열이
  **0회**입니다 (`https://opensource.ebay.com/skin/` 렌더 확인). 디자인 도구
  연동을 문서에 두지 않고 코드·토큰만 공개하는 유형입니다
