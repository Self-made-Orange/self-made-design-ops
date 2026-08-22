---
name: Carbon Design System
org: IBM
coverage: full
url: https://carbondesignsystem.com
repo: https://github.com/carbon-design-system/carbon
license: Apache-2.0
tech: [React, Web Components]
figma_kit: true
tokens_format: [SCSS, CSS, JS]
a11y_target: "WCAG AA (IBM Accessibility Checklist 기반 — 대비는 2.1 AA 명시, 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @carbon/layout@11.57.0, @carbon/type@11.65.0, @carbon/colors@11.56.0, @carbon/themes@11.79.0 · npm @carbon/styles@1.113.0 → scss/components/ (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](carbon.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

IBM의 엔터프라이즈 제품용 디자인시스템. 데이터 밀도가 높은 업무 화면을 전제로 설계됐습니다.

## 토큰

### 스페이싱

13단계, base 8이되 하단에 2·4px 미세 단위를 둡니다.

| 토큰 | rem | px |
|------|-----|-----|
| `$spacing-01` | 0.125 | 2 |
| `$spacing-02` | 0.25 | 4 |
| `$spacing-03` | 0.5 | 8 |
| `$spacing-04` | 0.75 | 12 |
| `$spacing-05` | 1 | 16 |
| `$spacing-06` | 1.5 | 24 |
| `$spacing-07` | 2 | 32 |
| `$spacing-08` | 2.5 | 40 |
| `$spacing-09` | 3 | 48 |
| `$spacing-10` | 4 | 64 |
| `$spacing-11` | 5 | 80 |
| `$spacing-12` | 6 | 96 |
| `$spacing-13` | 10 | 160 |

출처: `@carbon/layout@11.57.0` → `scss/generated/_spacing.scss`
(저장소에는 없는 빌드 산출물입니다. `../HARVESTING.md` 경로 2 참고.)

### 타이포그래피

서체는 **IBM Plex** (Sans / Mono / Serif). 크기 스케일은 값 목록이 아니라 **재귀 함수**로 정의됩니다.

```scss
@function get-type-size($step) {
  @if $step == 1 { @return 12px; }
  @return get-type-size($step - 1) + (math.floor(($step - 2) * 0.25) + 1) * 2;
}
```

증분이 4스텝마다 커지는 구조입니다 (+2 → +4 → +6 → +8 …).
23스텝까지 생성됩니다.

```
12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112, 122, 132, 144, 156
```

주의: 소스 주석은 공식 지원 범위를 **12~92px**(17스텝)로 명시합니다. 위 18스텝 이후 값은
함수가 생성하긴 하지만 지원 범위 밖입니다. 위 목록은 함수를 실행해 복원한 값입니다.

출처: `@carbon/type@11.65.0` → `scss/_scale.scss`, `scss/_font-family.scss`

#### 굵기 3단 · 서체 11벌 (2026-08-18 보강)

`$font-weights`: `light` **300** · `regular` **400** · `semibold` **600**.
**700(bold)이 없습니다.**

`$font-families` 11개 — `sans` · `sans-condensed` · `serif` · `mono` +
**언어별 7종**(`sans-arabic` · `sans-devanagari` · `sans-hebrew` · `sans-jp` ·
`sans-kr` · `sans-thai` · `sans-thai-looped`). 전부 IBM Plex 계열이고
폴백은 `system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular'`로 공통입니다.
**태국어만 looped/비looped 두 벌**을 둡니다.

#### 타입 스타일 34종 (2026-08-18 보강)

스케일과 별개로 **`font-size`·`font-weight`·`line-height`·`letter-spacing`을
묶은 스타일 토큰**이 `scss/_styles.scss`에 34개 있습니다.

| 스타일 | 크기 | 굵기 | 행간(배수) | 자간 |
|--------|:---:|:---:|:---:|:---:|
| `label-01` · `legal-01` · `caption-01` · `helper-text-01` | 12px | 400 | 1.33333 | 0.32px |
| `label-02` · `legal-02` · `helper-text-02` | 14px | 400 | 1.28572 | 0.16px |
| `body-short-01` | 14px | 400 | 1.28572 | 0.16px |
| `body-long-01` | 14px | 400 | **1.42857** | 0.16px |
| `body-short-02` | 16px | 400 | 1.375 | 0 |
| `body-long-02` | 16px | 400 | **1.5** | 0 |
| `code-01` | 12px (mono) | 400 | 1.33333 | 0.32px |
| `code-02` | 14px (mono) | 400 | 1.42857 | 0.32px |
| `heading-01` | 14px | **600** | 1.42857 | 0.16px |
| `productive-heading-01` | 14px | 600 | 1.28572 | 0.16px |
| `heading-02` | 16px | 600 | 1.5 | 0 |
| `productive-heading-02` | 16px | 600 | 1.375 | 0 |
| `productive-heading-03` | 20px | 400 | 1.4 | 0 |
| `productive-heading-04` | 28px | 400 | 1.28572 | 0 |
| `productive-heading-05` | 32px | 400 | 1.25 | 0 |
| `productive-heading-06` | 42px | **300** | 1.199 | 0 |
| `productive-heading-07` | 54px | 300 | 1.19 | 0 |

- **`short`/`long` 쌍이 같은 크기에서 행간만 다릅니다** (14px: 1.28572 vs
  1.42857 / 16px: 1.375 vs 1.5). 한 줄짜리와 문단을 크기가 아니라 행간으로 나눕니다.
- **`productive` / `expressive` 두 계열**이 있습니다. `expressive-heading-03`~`06` ·
  `quotation-01/02` · `display-01`~`04` 10개는 **브레이크포인트별 값을 토큰에
  내장**합니다 (`breakpoints: (md: (…), lg: (…), xlg: (…), max: (…))`).
  예: `display-04`는 42 → md 68 → lg 92 → xlg 122 → max 156px.
- 자간이 12px에서 0.32px, 14px에서 0.16px, 16px 이상에서 0입니다 —
  **작을수록 자간을 벌립니다** (Cloudscape·Polaris의 반대 방향).
- `caption-01/02`는 `@deprecated` 표시가 붙어 있습니다.
- 브레이크포인트 스타일 10개에서 **굵기가 크기와 함께 바뀝니다**
  (`expressive-heading-05`: 32px/400 → md 36px/**300**).

출처: `@carbon/type@11.65.0` → `scss/_styles.scss`, `scss/_font-family.scss`

### 컬러

~~미확인 — 이 환경에서 팔레트 파일을 아직 확인하지 못했습니다~~ →
**해소 (2026-08-18, `@carbon/colors@11.56.0` + `@carbon/themes@11.79.0`).**
전체 헥스 나열은 하지 않습니다 (`../SCHEMA.md`) — 구조만 적습니다.

**3계층입니다.**

| 계층 | 패키지 | 규모 |
|------|--------|:---:|
| 원시 팔레트 | `@carbon/colors` → `index.scss` | **247 변수** |
| 시맨틱 테마 | `@carbon/themes` → `js/generated/themes/*.js` | **235 × 4테마** |
| 컴포넌트 토큰 | `@carbon/themes` → `js/generated/component-tokens/*.js` | **78 (5그룹)** |

`@carbon/themes/index.scss`는 `@forward`만 있는 껍데기입니다
(`scss/config` · `scss/theme` · `scss/tokens` · `scss/component-tokens`).

#### 원시 팔레트 — 13계열 × 10단 + **hover 쌍**

`blue` · `cyan` · `gray` · `cool-gray` · `warm-gray` · `green` · `magenta` ·
`orange` · `purple` · `red` · `teal` · `yellow` (12) 각 **10단(10~100, 10 간격)**.
**회색이 3벌**입니다 — 중립(`gray`) · 한색(`cool-gray`) · 난색(`warm-gray`).
`black`(`black-100`) · `white`(`white-0`) 별도.

**모든 스와치에 `-hover` 쌍둥이가 있습니다.**

```scss
$blue-60:       #0f62fe;
$blue-60-hover: #0050e6;
$white:         #ffffff;
$white-hover:   #e8e8e8;
```

비-hover 124개(120 + `black-100` · `white-0` · `black` · `white`) +
hover 122개 + `$colors` 맵 = 247 변수입니다.
**상호작용 상태를 시맨틱 층이 아니라 원시 팔레트에 넣은 것은 코퍼스에서 Carbon뿐**입니다.
`-70-hover`가 `-60`보다 밝은 구간(`blue-70-hover: #0053ff`)이 있어
단순 명도 이동이 아닙니다.

**알파 계열이 없습니다** — 전부 불투명 6자리 헥스입니다.

#### 시맨틱 테마 4벌 — white / g10 / g90 / g100

네 테마 모두 **정확히 235개** 토큰으로 구조가 같습니다.
`white`와 `g100` 사이에 **223/235개가 다릅니다.** 값이 같은 12개는
`backgroundBrand`(`#0f62fe`) · `textOnColor`/`iconOnColor`(흰색) ·
`overlay`(`rgba(0,0,0,0.6)`) · 경고 3색(`supportWarning` ·
`supportCautionMinor` `#f1c21b` · `supportCautionMajor` `#ff832b`) ·
`aiAuraStart` 계열 2개 · `borderStrong02` · `backgroundSelectedHover`입니다 —
**브랜드색·경고색·오버레이는 모드와 무관하게 고정**입니다.

| 계열 | 개수 |
|------|:---:|
| `syntax*` | **88** |
| `layer*` (`layer01/02/03` 포함) | 29 |
| `ai*` | 21 |
| `chat*` | 21 |
| `border*` | 16 |
| `support*` | 11 |
| `text*` | 9 |
| `link*` · `background*` | 각 8 |
| `icon*` | 7 |
| `field*` | 6 |
| `focus*` | 3 |
| `skeleton*` | 2 |
| `interactive` · `highlight` · `overlay` · `shadow` · `toggle` · `color` | 각 1 |

- **`layer01/02/03` 3단 레이어 모델**이 색 토큰의 축입니다
  (`layer01` white `#f4f4f4` / g100 `#262626`). 스페이싱의 컨텍스트 레이아웃
  토큰과 같은 "문맥이 값을 정한다" 계열이 색에도 있습니다.
- **구문 강조 88개**가 전체의 37%입니다 — `syntaxAngleBracket` ·
  `syntaxBitwiseOperator` 수준까지 쪼갭니다.
- **`ai*` 21개 · `chat*` 21개**가 있습니다 (`aiAuraStart` · `aiBorderStrong` ·
  `aiPopoverShadowOuter01` 등). 생성형 AI UI 전용 색 계열을 토큰으로 둡니다.
- **다크가 부분 오버라이드가 아니라 완전한 4벌**입니다 — Polaris(40/226)와 대비됩니다.

#### 컴포넌트 토큰 5그룹

`tag` **40** · `button` 15 · `notification` 10 · `status` 10 ·
`content-switcher` 3 = 78개. `tag`가 절반입니다
(`tagBackgroundBlue` … 10색 × 배경·보더·호버·텍스트).

### 라운드 / 엘리베이션

미확인 — `@carbon/layout`의 `_border-radius.scss`는 generated로 forward하며, 해당 파일을
아직 열지 못했습니다.

## 컴포넌트

~~미확인~~ → **컴포넌트 SCSS 심화 (2026-08-17, `@carbon/styles@1.113.0`
`scss/components/` — 60여 컴포넌트 소스가 npm에 있습니다).**

### 컨텍스트 레이아웃 토큰 — 크기를 문맥에서 상속합니다

```scss
$layout-tokens: (
  size:    ( height: ( xs 24 · sm 32 · md 40 · lg 48 · xl 64 · 2xl 80 ) ),
  density: ( padding-inline: ( condensed $spacing-03 · normal $spacing-05 ) ),
);
@include layout.use('size', $default: 'md', $min: 'sm', $max: 'lg');
```

컴포넌트가 **자기가 지원하는 크기 범위(min/max)를 선언**하고, 실제 크기는
바깥 레이아웃 컨텍스트에서 내려받습니다 — 텍스트 입력의 높이가
`layout.size('height')` 참조 하나입니다. Cloudscape의 밀도 모드와 같은
"문맥이 값을 정한다" 계열이지만, **크기 6단계 전체가 문맥 축**인 것은
Carbon이 유일합니다.

### 버튼 실측

| 항목 | 값 |
|------|-----|
| 기본 높이 | **48px** (3rem) — 코퍼스 분포의 위쪽 |
| **최소 폭** | **176px** (`$button-min-inline-size`) — 버튼 최소 폭 토큰은 표본 유일 |
| 라운드 / 보더 | **0** / 2px |
| 패딩 | `calc(0.875rem − 3px)` — 보더+아웃라인 몫을 역산 (Radix 계열 산식) |
| 서체 | 14px / 400 |

### 그 외

- **모달 폭이 px이 아니라 뷰포트 %입니다** — 크기·브레이크포인트별
  48% / 60% / 84% (px 고정 진영인 shadcn 512px·Mantine 440px과 대비,
  `patterns/modal.md` 교차)
- 체크박스 **16px** (수렴값), 체크 표시 9×5px, 터치 타겟 개념 없음 —
  GOV.UK 40px과 정반대 극 (데스크톱 엔터프라이즈 전제)
- 고대비 대응이 컴포넌트 소스에 직접: `border: 1px solid ButtonBorder`
  (forced-colors 시스템 색 키워드)

## 컴포넌트 심화 — 표·내비·피드백 (2026-08-18)

`@carbon/styles@1.113.0` `scss/components/` SCSS 실측입니다
(`$spacing-01`~`13` = 2/4/8/12/16/24/32/40/48/64/80/96/160px 기준).

### 표 (`data-table`) — 밀도 5단이 레이아웃 토큰 사다리 그대로입니다

| 크기 | 행 높이 | 셀 세로 패딩 |
|:---:|:--:|:--:|
| xs | **24px** | 2 / 2px |
| sm | 32px | 7 / 6px |
| md | 40px | 7 / 6px |
| **lg (기본)** | **48px** (`$spacing-09`) | `$spacing-05` = 16 / 16px |
| xl | **64px** | 16 / 16px |

- **밀도가 5단으로 확보 표본 최대**입니다 (Vuetify·Chakra·PrimeVue·Semi·Naive 3단 ·
  Cloudscape 2단). 값이 `utilities/_layout.scss`의 `size.height` 사다리
  (xs 24 / sm 32 / md 40 / lg 48 / xl 64 / 2xl 80)와 **정확히 일치**합니다 —
  표가 자체 치수 체계를 갖지 않고 공용 컨텍스트 레이아웃 토큰을 씁니다.
- **셀 세로 패딩이 7 / 6px 비대칭**입니다 (sm·md). 위아래 합 13px + 행간으로
  32·40px을 맞춘 결과이며, 4배수 밖의 값입니다.
- 셀 가로 패딩은 **전 단계 `$spacing-05`(16px) 고정** — 밀도가 세로만 줄이는
  Cloudscape·Semi 진영입니다.
- **경계선이 위아래 둘 다 1px**인데 위는 `$layer`(배경색)입니다 —
  hover·선택에서 위 보더만 색이 바뀌므로 **레이아웃이 밀리지 않습니다.**
- 고정 헤더는 `display: flex` 전환 + `position: sticky` + **`z-index: 1`** +
  `will-change: transform`.
- **정렬 아이콘 20px, 미정렬 상태 `opacity: 0`**, 정렬 활성 시 1.
  내림차순은 `transform: rotate(180deg)` + 전환 — 문서 층의 3상태 규정
  (unsorted → up → down)에 대응하는 코드 층 구현입니다.
  정렬 활성 열은 헤더 배경이 `$data-table-column-hover`로 바뀝니다.
- 줄무늬(`--zebra`)가 `nth-child(odd)`이고, 선택·hover와의 조합이
  별도 셀렉터 8종으로 열거돼 있습니다.

### 내비게이션 (`ui-shell/side-nav` · `tabs` · `breadcrumb`)

UI Shell은 `mini-units(n) = 0.5rem × n` 산식을 씁니다.

| 항목 | 값 |
|---|---|
| 사이드 내비 폭 | `mini-units(32)` = **256px** |
| 레일(아이콘) 폭 | `mini-units(6)` = **48px** |
| 항목 최소 높이 | `mini-units(4)` = **32px** · large `mini-units(6)` = 48px |
| 항목 좌우 패딩 | `mini-units(2)` = 16px |
| 항목 서체 | 14px / 행간 20px / 자간 0.1px · 활성 굵기 **600** |
| 계층 들여쓰기 | `mini-units(4)` = **32px** · 아이콘 있는 2단계 `mini-units(9)` = 72px |
| **활성 표시** | 좌측 **3px** 바 (`::before`, `$border-interactive`) |
| 헤더 높이 | **48px** (`calc(100% - 48px)`로 역산) |
| 탭 높이 | `layout.size('height')` — xs 24 ~ 2xl 80 사다리 |
| 탭 활성 밑줄 | **2px** (`$border-interactive`) · 비활성 `$tab-underline-color` 2px `$border-subtle` |
| 탭 좌우 패딩 | `layout.density('padding-inline')` — condensed 8 / normal 16px |
| 브레드크럼 구분자 여백 | `$spacing-03` = **8px** · 항목 여백 8px |

- **펼침 256 / 접힘 48**이 shadcn/ui와 완전히 같습니다. 서로 무관한 두 시스템이
  같은 값 쌍에 도달했습니다.
- **활성 표시가 좌측 3px 세로 바**입니다 — 밑줄·알약·배경이 아닌 네 번째 방식이고,
  확보 표본에서 사이드 내비에 세로 인디케이터를 쓴 사례입니다.
- **비활성 탭에도 2px 밑줄이 있습니다** (색만 `$border-subtle`) —
  활성 전이에서 굵기가 변하지 않습니다. Semi가 hover 밑줄을 같은 두께로 두는 것과
  같은 발상입니다.
- 탭·태그가 **`layout.use('size', …)`로 컨텍스트에서 크기를 상속**합니다
  (위 "컨텍스트 레이아웃 토큰" 절) — 표와 같은 기구입니다.

### 피드백 (`notification` · `tag`)

| 항목 | 값 |
|---|---|
| **Toast 폭** | **288px** → `max` 브레이크포인트에서 **352px** |
| Toast 좌측 패딩 | **13px** (좌측 강조 보더 6px과 합쳐 19px) |
| **좌측 강조 보더** | **6px** (toast·inline) · low-contrast 변형 **3px** |
| 인라인 알림 최소 높이 | **48px** · 최소 폭 288px |
| 인라인 알림 최대 폭 | **288 → 608 → 736 → 832px** (브레이크포인트 4단) |
| 닫기 버튼 | **48×48px** (min-block/inline-size) |
| **Tag 높이** | xs·sm **18px** / **md 24px(기본)** / lg 32px |
| Tag 라운드·패딩 | **16px(알약)** · 좌우 `$spacing-03`(8px) |
| Tag 폭 제한 | 최대 **208px** · 최소 32px |

- **토스트 폭이 반응형입니다** (288 → 352px). 확보 표본에서 토스트 폭을
  브레이크포인트로 바꾸는 유일 사례입니다 — 나머지는 고정 폭
  (Sonner 356 · PrimeVue 352 · Ant·Grommet 384 · Naive 365)이거나 폭 없음(Semi).
- **좌측 강조 보더 6px**은 확보 표본에서 Vuetify(8px) 다음으로 두껍습니다
  (EUI 3 · Cloudscape 2). **low-contrast 변형에서만 3px로 절반**이 됩니다 —
  배경이 연해지면 강조선도 얇게 가져갑니다.
- **닫기 버튼이 48×48px**입니다 — 터치 타겟 규격을 알림 닫기에 적용한 사례이고,
  토스트 폭(288px)의 6분의 1을 차지합니다.
- Tag가 `layout.redefine-tokens`로 **공용 높이 사다리를 18/18/24/32로 덮어씁니다** —
  같은 이름의 단계가 컴포넌트마다 다른 값을 갖는 구조입니다.

## 특징적 결정

- **스페이싱 하단에 2·4px 미세 단위를 둡니다.** base 8 시스템이면서도 `$spacing-01/02`로
  2px·4px를 제공합니다.
- **타이포 스케일이 함수입니다.** 값을 손으로 고르지 않고 증분 규칙으로 생성합니다.
  스케일을 확장할 때 임의 판단이 개입하지 않는다는 장점이 있습니다.
- **스페이싱 최상단이 160px로 크게 뜁니다.** 96 → 160은 다른 단계(1.3~1.5배)보다 큰 도약입니다.

- **hover 색을 원시 팔레트에 쌍으로 둡니다** (2026-08-18). 스와치 122개마다
  `-hover` 쌍둥이가 있습니다(`$blue-60` / `$blue-60-hover`).
  상호작용 상태를 시맨틱 층에서 만드는 것이 코퍼스 다수인데, Carbon은
  **원시 층에서 이미 상태를 갖고 시작**합니다.

- **회색 램프가 3벌입니다** — 중립 `gray` · 한색 `cool-gray` · 난색 `warm-gray`.
  각 10단이라 회색만 30개입니다.

- **색에도 레이어 축이 있습니다.** `layer01/02/03`을 포함한 `layer*` 29개가
  스페이싱의 컨텍스트 레이아웃 토큰과 같은 방식으로 "문맥이 표면 색을 정하는"
  구조를 만듭니다.

- **생성형 AI 전용 색 계열이 있습니다** — `ai*` 21개(오라·보더·팝오버 그림자),
  `chat*` 21개. 표본에서 AI UI 색을 토큰 계열로 세운 것은 Carbon입니다.

- **굵기 상한이 600입니다** (`light` 300 · `regular` 400 · `semibold` 600).
  700이 없습니다 — Primer와 같습니다.

- **자간을 작은 글자에서 벌립니다** (12px 0.32px → 16px 이상 0).
  크기가 커질수록 음수로 좁히는 Cloudscape·Polaris와 방향이 반대입니다.

## 접근성

~~미확인 — 문서 사이트 접근 필요~~ → **해소 (2026-08-18, 헤드리스 렌더 확인).**

출처: https://carbondesignsystem.com/guidelines/accessibility/overview/

- **준거 기준:** "Carbon components follow the IBM Accessibility Checklist
  which is based on WCAG AA, Section 508, and European standards."
  → 자체 WCAG 등급을 직접 선언하는 대신 **IBM Accessibility Checklist를
  경유**하고, 그 체크리스트가 WCAG AA · Section 508 · 유럽 규격을 근거로 삼습니다.
- **대비만 버전이 명시됩니다:** "Carbon color themes strive to comply with
  the WCAG 2.1 AA guidelines for contrast."
- 지향점 3줄: 모든 사용자에게 동일한 품질의 경험 · 사용자와 상황에 맞춘 적응 ·
  인지 가능(perceivable)·조작 가능(operable)·이해 가능(understandable) 패턴.
- **권장 도구를 문서에 열거합니다:** IBM Equal Access Toolkit ·
  High Contrast Chrome plugin · Stark Figma plugin · Color contrast tool.
  (Figma용 대비 검사 플러그인을 공식 권장하는 드문 사례입니다.)

## 참고

- 저장소: https://github.com/carbon-design-system/carbon
- 토큰 패키지: `@carbon/layout`, `@carbon/type`, `@carbon/colors`
