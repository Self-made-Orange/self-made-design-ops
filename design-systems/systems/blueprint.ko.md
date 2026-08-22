---
name: Blueprint
org: Palantir
coverage: partial
url: https://blueprintjs.com
repo: https://github.com/palantir/blueprint
license: Apache-2.0
tech: [React, Sass]
figma_kit: false
tokens_format: [Sass]
a11y_target: "WCAG 2.0 (색 대비) + WCAG 2.2 focus appearance (포커스 표시, 최소 3:1) — 2026-08-18 확인"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @blueprintjs/core@6.18.0 → lib/scss/variables.scss · lib/css/blueprint.css · npm @blueprintjs/table@6.2.4 → lib/css/table.css + lib/esm (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](blueprint.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Palantir의 밀집 데이터 UI용 시스템. **그리드가 10px**(단, v6부터 레거시 —
현행 1차 단위는 4px, 아래 "정정" 절)이고 행간이 **1.28581**(소수 다섯 자리) —
값 선택이 표본 관행과 전방위로 어긋납니다.

## 토큰

### 그리드 — 10px

```scss
$pt-grid-size: 10px !default;
```

**표본에서 10px 그리드는 Blueprint뿐입니다.** KRDS의 10px은 rem 루트(표기 단위)이고
스케일 자체는 4px 계열인 반면, Blueprint는 **레이아웃 그리드가 10px**입니다.
GOV.UK(5px)와 함께 4의 배수 바깥에 있는 둘째 시스템입니다.

### 치수 — `4px × N` 표기, 소수 곱수

```scss
$pt-font-size:          4px * 3.5;   // 14px
$pt-button-height:      4px * 7.5;   // 30px
$pt-button-height-large: 4px * 10;   // 40px
$pt-navbar-height:      4px * 12.5;  // 50px
```

**그리드는 10px인데 파생 값 표기는 `4px × N`입니다.** 곱수에 3.5 · 7.5 · 12.5
같은 소수가 흔합니다 — 사실상 2px 단위 값을 4px 곱으로 적은 형태입니다.

| 항목 | 값 |
|------|:---:|
| 폰트 | 12 · **14** · 16 |
| 버튼 높이 | 20 · 24 · **30** · 40 |
| 입력 높이 | 24 · **30** · 40 |
| 내비바 | **50** |
| 라운드 | 4px 단일 |

**버튼·입력 기본 높이가 30px입니다** — 표본 최저입니다
(Ant 32 · Radix size 2 32 · Mantine `xs` 30이 최저였음 — Blueprint는 30이 **기본값**).
밀집 데스크톱 앱 전제이며, 44~48pt 터치 타겟과는 완전히 다른 좌표계입니다.

**버튼과 입력이 높이를 공유합니다** (30/40, small 24) — Mantine과 같은 판단입니다
(`patterns/form.md`).

### 행간 — 1.28581

```scss
$pt-line-height: 1.28581 !default;
```

**소수 다섯 자리입니다.** 14px × 1.28581 ≈ 18px — 정수 px을 역산한 비율로 보이는
자리이지만 소스에 근거는 없습니다. 표본에서 다섯 자리 정밀도 행간은 유일합니다
(Cloudscape의 115ms처럼 "깔끔한 수" 관행을 벗어난 값).

### 엘리베이션 — 0~4 다섯 단계

`$pt-elevation-shadow-0`~`4`. 표본 다수(3~6단계)와 같은 범위이며
**0단계(그림자 없음)를 명시적으로 둡니다.**

## 컴포넌트

`@blueprintjs/*` 패키지군. ~~목록 미확인~~ → **해소 (2026-08-18, 문서 사이드바
렌더 — https://blueprintjs.com/docs/).** 문서가 **패키지마다 버전을 병기**합니다:
`core 6.18.0` · `datetime 6.2.4` · `icons 6.13.0` · `select 6.3.4` ·
`table 6.2.4` · **`labs 6.4.4`**. 패키지별 버전이 제각각(6.2.x~6.18.x)이며,
`labs`가 정식 문서에 목차로 들어가 있습니다(`Box`·`Flex` 레이아웃 프리미티브,
둘 다 `new` 배지).
**`table` 전용 패키지가 있습니다** — 데이터 그리드 중심 시스템의 방증입니다.

## 컴포넌트 심화 — (2026-08-18)

출처: `@blueprintjs/core@6.18.0` → `src/components/**/*.scss` +
`src/common/_variables.scss` + `lib/css/blueprint.css`(컴파일 산출물로 교차 확인).

### 정정 — 10px 그리드는 레거시입니다

v6 소스 주석이 명시합니다: `$pt-grid-size: 10px`은
"Legacy, kept for backward compatibility"이고, **현행 1차 단위는
`$pt-spacing: 4px`입니다** ("multiply by 2.5 to convert").
위 토큰 절의 "10px 그리드 표본 유일" 판정은 v5 이하 기준이며,
**`4px × 7.5` 같은 소수 곱수의 수수께끼도 풀립니다** — 10px 시대의 값(30px)을
4px 베이스로 재표기한 이행기 표기입니다.

v6는 별도 CSS 변수 토큰층도 실었습니다 — `lib/css/blueprint-design-tokens.css`의
`--bp-*` (`--bp-surface-spacing: 4px` · `--bp-surface-border-radius: 4px` ·
타이포 `--bp-typography-size-body-medium: 14px` 등). **컴파일 CSS에 `oklch`
상대 색상 문법(`from`)이 그대로 나갑니다**
(`oklch(from var(--bp-palette-black) l c h/0.2)`) — 정적 `oklch()`는
shadcn/ui가 쓰지만(`patterns/color.md`), **런타임 상대 색상 파생은 표본에서
Blueprint가 처음입니다** (Radix Themes의 `color-mix()`와 같은 "계산으로 파생"
진영의 다른 문법).

### 버튼 — height가 아니라 min-height입니다

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| **min-height** | 24 | **30** | 40px |
| min-width | 24 | 30 | 40px |
| 패딩(상하 좌우) | 0 · 8 | 4 · 8 | 4 · 16px |
| 서체 | 14 | 14 | 16px |
| 라운드 | 4 | 4 | 4px |

- **높이가 고정이 아니라 `min-height`입니다** — 내용이 넘치면 늘어납니다.
  `min-width`가 같은 값이라 최소가 정사각입니다 (Chakra `minW: h`와 같은 판단).
- SCSS에는 `$pt-button-height-smaller: 20px`도 있습니다 — 4단계째 최소 크기.
- **보더가 없습니다** — `inset 0 0 0 1px` box-shadow로 대체합니다.
  소스 주석이 이유를 명시합니다: 보더는 하나뿐이고, 그림자와 겹칠 수 없고,
  요소 크기를 바꾸고, box-sizing을 요구한다. **보더 회피를 문서화한 유일 표본**입니다.
- 커서 `pointer` (Chakra 진영).

### 입력 — 같은 값을 `height`로 씁니다

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| **height** | 24 | **30** | 40px |
| 좌우 패딩 | 8 | 8 | 12px |

- 버튼과 값(24/30/40)은 공유하되 **버튼은 `min-height`, 입력은 `height` 고정**입니다.
  `line-height`를 높이와 같게 두어 수직 중앙을 잡습니다.
- 라운드 4px, 보더 역시 inset box-shadow입니다.

### 다이얼로그 — 폭 단계가 없습니다, 500px 하나

| 항목 | 값 |
|------|-----|
| **폭** | **500px 고정** (`$pt-spacing × 125`) |
| 상하 여백 | 32px |
| 라운드 | 4px |
| body·footer | 16px (**패딩이 아니라 margin** — 하위호환 TODO 주석) |
| header | 패딩 4px + 왼쪽 16px, min-height 38px (버튼 30 + 4×2) |
| 배경막 | `rgba($black, 0.7)` |

- **폭 단계가 없습니다** — Cloudscape 5단계 · Bootstrap 4단계 · Chakra 5단계와 달리
  500px 하나입니다 (전 표본 유일 여부는 대조하지 않았습니다).
  값 자체는 Bootstrap 기본(500px)과 수렴합니다.
- **배경막 0.7이 확인된 표본 중 가장 진합니다**
  (Bootstrap 0.5 · Chakra 0.36 · shadcn/ui Drawer 0.1 — `patterns/modal.md`).

애니메이션:

| | 값 |
|---|-----|
| 콘텐츠 | **`scale(0.5)` → 1** + fade, **300ms**, `cubic-bezier(0.54, 1.12, 0.38, 1.11)` |
| 배경막 | fade, 200ms |

- **이징 제어점 y가 1.12 — 오버슈트 바운스입니다** (`$pt-transition-ease-bounce`).
  `patterns/motion.md`의 베지어 오버슈트 진영(Spindle 2.05 · TDS 1.56)에 들며,
  ~~모달 진입에 오버슈트를 실제 적용한 것이 확인된 사례는 Blueprint뿐~~ →
  **정정 (2026-08-18, patterns/motion.md 83표본 재종합):** 최소 8곳입니다
  (Kaizen·HSDS 등). Blueprint는 그중 하나이며 유일하지 않습니다.
- **scale 0.5 출발은 확인된 표본 중 최대 진입 스케일 변화**입니다
  (Chakra 0.95 · Radix Themes 0.97 — `patterns/modal.md`).
- 기본 전환 단위 `$pt-transition-duration: 100ms`의 **×3(콘텐츠)/×2(배경막) 배수
  체계**입니다. 기본 이징은 `cubic-bezier(0.4, 1, 0.75, 0.9)` — 이것도 y₁=1로
  표준 ease 계열이 아닙니다.

### 표 (`@blueprintjs/table@6.2.4`) — 가상 스크롤 전제의 고정 행 높이

전용 패키지가 별도로 배포되고, 데이터 그리드(4사분면 렌더러)입니다.

| 항목 | 값 |
|------|-----|
| **기본 행 높이** | **20px** (`Table.defaultProps.defaultRowHeight`) |
| 기본 열 너비 | **150px** (`defaultColumnWidth`) |
| 셀 서체·행간 | 12px / 20px · 패딩 **0 8px** |
| `large` 셀 | 서체 14px, 높이·행간 **30px** |
| 열 헤더 최소 높이 | **30px** (`Grid.MIN_COLUMN_HEADER_HEIGHT`) |
| 행 헤더 최소 폭 | 30px (`MIN_ROW_HEADER_WIDTH`) |
| 유령 셀 상한 | 열 50 · 행 200 (`DEFAULT_MAX_COLUMNS/ROWS`) |
| 줄무늬 | `ledger-even` `#ffffff` / `ledger-odd` `#fafbfc` |

- **행 높이가 JS 상수(20px)로 고정돼 있습니다.** 확보 표본 대부분이 최소 높이나
  콘텐츠 높이를 쓰는 것과 달리, 가상 스크롤에 필요한 **정수 고정 행 높이를
  실제로 제공하는 사례**입니다. 값은 macOS 디자인 킷의 행 20pt와 같습니다.
- **경계선을 전부 `box-shadow`로 긋습니다** — 셀은
  `inset 0 -1px, inset -1px 0`, 헤더는 `0 1px 0`. 사분면 경계(고정 행·열의
  마지막 칸)만 **inset ±3px**로 굵어져 고정 영역의 끝을 표시합니다.
  버튼·입력에서 쓰는 inset box-shadow 윤곽 방식이 표에도 그대로 적용됩니다.
- **z-index가 용도별로 13단**입니다 — 셀 0~3, 사분면·리사이즈 가이드 10~13,
  선택 영역 20, 인터랙티브 셀 21. 표 하나 안에서 층위를 나눠 씁니다.
- 셀 `intent` 4종(primary·success·warning·danger)이 **배경 10% 알파 + 텍스트 색**
  조합입니다 — 셀 단위 상태색을 규격화한 표본입니다.
- 줄무늬 색이 `#ffffff` / `#fafbfc`로 **명도차 약 1%**입니다.

### 내비게이션 (`.bp6-navbar` · `.bp6-tab` · `.bp6-breadcrumbs`)

| 항목 | 값 |
|------|-----|
| Navbar 높이 | **50px** (그룹도 50px) · 좌우 패딩 16px · z-index 10 |
| Navbar 제목 | 16px · 우측 여백 16px |
| 탭 행간(높이) | **30px** · 서체 14px · 탭 간 `column-gap` **20px** |
| 탭 인디케이터 | **3px** 하단 바 (`$pt-intent-primary`) |
| 인디케이터 전환 | **200ms** `cubic-bezier(0.4, 1, 0.75, 0.9)`, `height·transform·width` |
| 세로 탭 | 항목 라운드 4px · 패딩 0 8px · **알약 배경**(primary 20% 알파) |
| 브레드크럼 | 컨테이너 **30px** · 항목 서체 **16px** · 구분자 16px SVG |

- **탭 인디케이터가 3px입니다** — 확보 표본에서 가장 두껍습니다
  (PrimeVue 1 · Vuetify·Carbon·Semi·EUI·Chakra 2). 고대비 모드에서는
  `background: highlight`로 시스템 색으로 교체됩니다.
- **인디케이터가 별도 래퍼 요소로 움직입니다** (`.bp6-tab-indicator-wrapper`) —
  `transform`으로 탭 사이를 미끄러지고, `.bp6-no-animation` 클래스로 끌 수 있습니다.
  Radix Themes 세그먼티드 컨트롤(100ms)과 같은 방식이며 지속시간은 2배입니다.
- **가로 탭은 밑줄, 세로 탭은 알약**입니다 — 한 컴포넌트가 방향에 따라
  활성 표시 방식을 바꿉니다 (shadcn/ui는 방향과 무관하게 변형으로 고릅니다).
- **브레드크럼 항목이 본문(14px)보다 큰 16px**입니다. 확보 표본에서
  브레드크럼을 본문보다 크게 두는 유일 사례입니다.
- Navbar 높이 50px은 이 시스템의 10px 그리드 잔재입니다
  (위 "10px 그리드는 레거시입니다" 절).

### 피드백 (`.bp6-toast` · `.bp6-callout` · `.bp6-tag`)

| 항목 | 값 |
|------|-----|
| **Toast** 폭 | `min(500px, 100%)` 최대 / `min(300px, 100%)` 최소 |
| Toast 라운드·간격 | 4px · 토스트 간 마진 **20px** |
| Toast 컨테이너 | 패딩 `0 20px 20px` · z-index **40** · 위치 top/bottom × left/center/right |
| **기본 지속시간** | **5000ms** (`Toast` `timeout` 기본값, 0 이하면 비활성 — "권장하지 않음"이 문서 인용) |
| 진입 | **300ms** `translateY(-40px)` → 0, `cubic-bezier(0.54, 1.12, 0.38, 1.11)` (오버슈트) |
| 퇴장 | **300ms** opacity 1→0 + **`filter: blur(0 → 8px)`** |
| 재배치 | **100ms**, **지연 50ms**, `cubic-bezier(0.4, 1, 0.75, 0.9)` |
| **Callout** | 패딩 16px · 라운드 4px · 아이콘 16px(left 16 / top **18**) |
| **Tag** | min-height·min-width **20px** · 패딩 2px 6px · 라운드 4px · 12/16px |
| Tag large | min-height 30px · 서체 14px / 행간 18px |

- **퇴장에 블러를 쓰는 것은 확보 표본에서 Blueprint뿐입니다** —
  사라지는 토스트가 흐려지며 빠집니다 (`filter: blur(8px)`).
- **재배치(reposition) 축을 코드로 갖습니다** — 형제 토스트에
  `~ .bp6-toast` 셀렉터로 `transform` 전환을 겁니다. 진입·퇴장(300ms)보다
  훨씬 짧은 100ms이고 **50ms 지연**이 붙어 있어, 사라진 뒤 자리를 메웁니다.
  Atlassian(250ms, 지연 없음)과 다른 해법입니다.
- **기본 지속시간 5000ms**는 문서 층에서 관측된 "5초 하한"과 일치하는
  코드 층 값입니다.
- Callout 아이콘이 `left: 16px; top: 18px`으로 **좌우가 다릅니다** —
  패딩 16px에 첫 줄 baseline 보정 2px을 더한 값입니다
  (shadcn/ui의 `translate-y-0.5`와 같은 2px 보정).
- Tag가 `--bp-surface-spacing`(4px) 배수 산식입니다 —
  min 20 = 4×5, 패딩 2/6 = 4×0.5 / 4×1.5, large 30 = 4×7.5.

## 특징적 결정

- **10px 그리드** — 표본 유일. GOV.UK 5px과 함께 4배수 바깥 진영
- **기본 컨트롤 높이 30px** — 표본 최저 기본값. 밀집 데스크톱 전제
- **소수 곱수 표기** (`4px * 7.5`) — 그리드(10px)와 표기 베이스(4px)가 불일치
- **행간 1.28581** — 다섯 자리 정밀도, 표본 유일
- **폰트 3단계(12/14/16)** — 표본 최소 단계 수, 본문 14px 진영
- 라운드가 4px 단일 (Ant 6px 단일과 같은 "스케일 없음" 계열)

## 접근성

~~미확인~~ → **해소 (2026-08-18, 헤드리스 렌더 확인).**

출처: https://blueprintjs.com/docs/#core/accessibility
(curl로는 빈 셸이지만 헤드리스 렌더로 본문이 읽힙니다.)

- **WCAG 버전이 항목마다 다릅니다** — 표본에서 드문 구성입니다.
  - 색 대비: "Our colors ... adhere to **WCAG 2.0** standards"
  - 포커스 표시: "Focus indication states generally adhere to
    **WCAG 2.2 focus appearance**"
- **포커스 대비 요구치를 배경 토큰 이름으로 못 박습니다.**
  기본 포커스 표시는 라이트 테마에서 `$light-gray1`까지,
  다크 테마에서 `$dark-gray5`까지의 배경색에 대해 **최소 3:1**을 보장합니다.
- **인텐트 아웃라인은 예외가 명시돼 있습니다.** `InputGroup` ·
  `EditableText` · `NumericInput` 계열에서 라이트 테마는 `warning`만
  `$light-gray4`까지, 다크 테마는 `warning`만 `$dark-gray5`까지
  (나머지 인텐트는 `$dark-gray4`까지) 3:1을 지킵니다.
  **"어디까지 보장되는지"를 토큰 경계로 공개**하는 방식입니다.
- **포커스 스타일을 런타임 싱글턴으로 관리합니다.** `FocusStyleManager`
  (`isActive()` / `onlyShowFocusOnTabs()` / `alwaysShowFocus()`) —
  마우스 조작 중에는 포커스 링을 감추고 Tab을 누르면 되살립니다.
  앱에서 **명시적으로 켜야** 동작합니다.
  텍스트 입력의 포커스 스타일(굵은 색 테두리)은 이 유틸리티가 제거하지 않습니다.
- 예외 통로: 컨테이너에 `Classes.FOCUS_STYLE_MANAGER_IGNORE`를 붙이면
  해당 하위는 항상 포커스 링을 표시합니다(트리 등).

## Figma 킷 — 부재 확정 (2026-08-18)

`figma_kit: false`의 근거입니다. **문서 사이트 전체 렌더 결과에
`figma` 문자열이 0회**입니다 — 사이드바 전 항목(Accessibility · Classes ·
Colors · Typography · Internationalization · Dark theme · Variables ·
Grids & dimensions · Components 전체)이 포함된 덤프 기준입니다.
Blueprint는 **Sass 변수와 React 구현만 배포하고 디자인 툴 자산은 내지 않습니다.**

## 컴포넌트 목록 — 문서 사이드바 실측 (2026-08-18)

출처: https://blueprintjs.com/docs/ 헤드리스 렌더(사이드바 전개 상태).
**분류가 6군 + 패키지별 절**로 갈립니다.

- **Components** — Breadcrumbs · Buttons · Button group · Callout · Card ·
  Card List · Control card(Switch/Checkbox/Radio card) · Collapse · Divider ·
  Editable text · Entity Title · HTML elements · HTML table · HotkeysTarget ·
  Icon · Link(new) · Menu · Navbar · Non-ideal state · Overflow list ·
  Panel stack · Progress bar · Resize sensor · Section · Section card ·
  Skeleton · Spinner · Tabs · Tag · Compound Tag · Text · Tree
- **Form Controls** — Form group · Control group · Label · Checkbox · Radio ·
  RadioGroup · HTML select · Segmented control · Slider(Range/Multi slider) · Switch
- **Form Inputs** — Input group · Search input · Text area · File input ·
  Numeric input · Tag input
- **Overlays** — Overlay(deprecated) · Overlay2 · Portal · Alert ·
  Context Menu · Context Menu Popover · Dialog(+Multistep dialog) · Drawer ·
  Popover(deprecated) · PopoverNext(new) · Toast(OverlayToaster) · Tooltip
- **Context** — BlueprintProvider · HotkeysProvider · OverlaysProvider ·
  PortalProvider
- **Hooks** — `useHotkeys` · `useOverlayStack`
- **별도 패키지 절** — Datetime 6.2.4(DatePicker · DateInput ·
  DateRangePicker · DateRangeInput · Time picker · Timezone select) ·
  Icons 6.13.0

**같은 컴포넌트의 구·신 버전을 사이드바에 동시 노출합니다** —
`Overlay`(deprecated)와 `Overlay2`, `Popover`(deprecated)와 `PopoverNext`(new)가
나란히 있습니다. SLDS의 `slds`/`sds` 폴백 공존과 같은 문제의식이지만,
Blueprint는 **문서 목차 층위에서** 이행을 드러냅니다.

## 참고

- 문서: https://blueprintjs.com (curl은 빈 셸 — 헤드리스 렌더로 해소, 2026-08-18)
- 토큰: `npm pack @blueprintjs/core@6.18.0` → `lib/scss/variables.scss`
- 컴포넌트 심화: `package/src/components/button/_common.scss` · `_button.scss` ·
  `forms/_common.scss` · `_input.scss` · `dialog/_dialog.scss` ·
  `overlay/_overlay.scss` · `common/_variables.scss` ·
  `lib/css/blueprint.css` (2026-08-18, @blueprintjs/core@6.18.0)
- **남은 확인 사항:** 컬러(`$pt-intent-*` 계열), 다크 테마(v6 접두사는 `.bp6-`),
  ~~컴포넌트 목록~~(2026-08-18 렌더로 사이드바 확인 — 아래 절),
  스페이싱 유틸리티의 실제 단계, ~~라이선스~~(Apache-2.0 확정),
  ~~Figma 킷~~(부재 확정 — 위 절), ~~접근성 목표~~(해소 — 위 절)
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github palantir/blueprint → `LICENSE` (npm `@blueprintjs/core@6.18.0` 메타와 일치)
