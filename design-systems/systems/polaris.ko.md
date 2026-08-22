---
name: Polaris
org: Shopify
coverage: full
url: https://shopify.dev/docs/api/app-home/polaris-web-components
repo: https://github.com/Shopify/polaris-react-archive
license: 커스텀 (MIT 본문 + Shopify 연동 앱 한정 조건)
tech: [React]
figma_kit: true
tokens_format: [CSS, JS]
a11y_target: "WCAG 2.1 A+AA (구 문서 명시 — 현행 shopify.dev 문서에선 소실, Wayback 2025-01 확인)"
platform: web
domain: commerce
verified: 2026-08-18
source: "github Shopify/polaris-react-archive@main → polaris-tokens/src (아카이브 — 2026-08-05 동결) · npm @shopify/polaris-tokens@9.4.2 (동결판) → dist/cjs/src/{colors,size}.js · dist/cjs/src/themes/**"
---
<!-- lang-links -->
> [English](polaris.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Shopify 관리자(admin) 화면을 위한 디자인시스템. 커머스 백오피스가 주 무대입니다.

## 토큰

### 스페이싱

**숫자 기반 스케일**이며, 이름의 숫자가 px가 아니라 **4px 단위 배수**를 뜻합니다
(`space-100` = 4px). 스케일 이름과 실제 값을 반드시 구분해야 합니다.

| 토큰 | 값 |
|------|-----|
| `space-0` | 0px |
| `space-025` | 1px |
| `space-050` | 2px |
| `space-100` | 4px |
| `space-150` | 6px |
| `space-200` | 8px |
| `space-300` | 12px |
| `space-400` | 16px |
| `space-500` | 20px |
| `space-600` | 24px |
| `space-800` | 32px |
| `space-1000` | 40px |
| `space-1200` | 48px |
| `space-1600` | 64px |
| `space-2000` | 80px |
| `space-2400` | 96px |
| `space-2800` | 112px |
| `space-3200` | 128px |

출처: `polaris-tokens/src/themes/base/space.ts` + `polaris-tokens/src/size.ts`
(space.ts는 `size[400]` 형태로 참조만 하므로 size.ts에서 실값을 해석했습니다.)

### 시맨틱 스페이싱 별칭

원시 스케일 위에 **용도별 별칭**을 따로 둡니다. 이게 Polaris의 특징입니다.

| 별칭 | 참조 | 값 |
|------|------|-----|
| `space-button-group-gap` | `space-200` | 8px |
| `space-card-gap` | `space-400` | 16px |
| `space-card-padding` | `space-400` | 16px |
| `space-table-cell-padding` | `space-150` | 6px |

### 라운드

| 토큰 | 값 |
|------|-----|
| `border-radius-0` | 0px |
| `border-radius-050` | 2px |
| `border-radius-100` | 4px |
| `border-radius-150` | 6px |
| `border-radius-200` | 8px |
| `border-radius-300` | 12px |
| `border-radius-400` | 16px |
| `border-radius-500` | 20px |
| `border-radius-750` | 30px |
| `border-radius-full` | 9999px |

### 보더 두께

`border-width-025` = 1px, `border-width-050` = 2px, `border-width-100` = 4px.
특이하게 `border-width-0165` = **0.66px**가 있습니다 — 서브픽셀 값입니다.

출처: `polaris-tokens/src/themes/base/border.ts`

### 타이포그래피

~~미확인 — `font.ts` 확인 필요~~ → **해소 (2026-08-18,
`@shopify/polaris-tokens@9.4.2` 동결판 → `dist/cjs/src/themes/base/{font,text}.js`).**
npm 배포본에 `src/`가 없어 `dist/cjs/`의 컴파일 산출물에서 읽었습니다 —
구조·값은 `src/themes/base/*.ts`와 동일합니다.

**크기·행간이 스페이싱과 같은 `size` 맵을 공유합니다** — `font-size-350`도
`space-350`도 `size[350]` = 14px입니다. 타이포 전용 스케일이 없습니다.

| 토큰 | 값 | | 토큰 | 값 |
|------|-----|---|------|-----|
| `font-size-275` | 11px | | `font-line-height-300` | 12px |
| `font-size-300` | 12px | | `font-line-height-400` | 16px |
| `font-size-325` | 13px | | `font-line-height-500` | 20px |
| `font-size-350` | 14px | | `font-line-height-600` | 24px |
| `font-size-400` | 16px | | `font-line-height-700` | 28px |
| `font-size-450` | 18px | | `font-line-height-800` | 32px |
| `font-size-500` | 20px | | `font-line-height-1000` | 40px |
| `font-size-550` | 22px | | `font-line-height-1200` | 48px |
| `font-size-600` | 24px | | | |
| `font-size-750` | 30px | | | |
| `font-size-800` | 32px | | | |
| `font-size-900` | 36px | | | |
| `font-size-1000` | 40px | | | |

굵기 4단: `regular` **450** · `medium` **550** · `semibold` **650** · `bold` **700**.
**450·550·650은 100 단위가 아닙니다** — Inter 가변 서체의 중간 인스턴스입니다.

자간 4단(전부 0 이하): `densest` **-0.54px** · `denser` **-0.3px** ·
`dense` **-0.2px** · `normal` **0px**. **px 단위**입니다(em 아님).

#### 역할 스케일 — heading 7단 + body 4단

`text-{역할}-font-{속성}` 5속성(family · size · weight · letter-spacing ·
line-height) 조합으로 11역할 × 5 = 55토큰입니다.

| 역할 | 크기 | 행간 | 굵기 | 자간 |
|------|:---:|:---:|:---:|:---:|
| `heading-3xl` | 36px | 48px | 700 | -0.54px |
| `heading-2xl` | 30px | 40px | 700 | -0.3px |
| `heading-xl` | 24px | 32px | 700 | -0.2px |
| `heading-lg` | 20px | 24px | 650 | -0.2px |
| `heading-md` | 14px | 20px | 650 | 0 |
| `heading-sm` | 13px | 20px | 650 | 0 |
| `heading-xs` | 12px | 16px | 650 | 0 |
| `body-lg` | 14px | 20px | 450 | 0 |
| `body-md` | **13px** | 20px | 450 | 0 |
| `body-sm` | 12px | 16px | 450 | 0 |
| `body-xs` | 11px | 12px | 450 | 0 |

**기본 본문(`body-md`)이 13px입니다.** `heading-lg`(20px) → `heading-md`(14px)
사이에 6px 공백이 있습니다 — 제목 스케일이 위쪽에서 성기고 아래쪽에서 촘촘합니다.

**자간이 크기 축에 매핑됩니다** — 20px 이상에서만 음수 자간이 붙고, 그 이하는 0입니다.

#### 모바일 테마가 타이포를 키웁니다

`light-mobile` 테마가 `text-*` 토큰 **14개**를 덮어씁니다 (색은 1개,
스페이싱은 1개만 덮는 것과 대조).

| 역할 | 데스크톱 | 모바일 |
|------|:---:|:---:|
| `heading-2xl` | 30px | 32px |
| `heading-xl` | 24px / 32 | 22px / 28 |
| `heading-lg` | 20px | 18px |
| `heading-md` | 14px | 16px |
| `heading-sm` | 13px | 14px |
| `body-lg` | 14px / 20 | 18px / 28 |
| `body-md` | 13px / 20 | **16px / 24** |
| `body-sm` | 12px / 16 | 14px / 20 |
| `body-xs` | 11px / 12 | 12px / 16 |

**방향이 일정하지 않습니다** — 본문 계열은 전부 커지는데(`body-md` 13→16),
큰 제목 둘(`heading-xl` 24→22 · `heading-lg` 20→18)은 **작아집니다**.
소스에 이유는 적혀 있지 않습니다.

서체: `font-family-sans` = `'Inter', -apple-system, BlinkMacSystemFont,
'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`,
`font-family-mono` = `ui-monospace, SFMono-Regular, 'SF Mono', Consolas,
'Liberation Mono', Menlo, monospace`. 서체 토큰은 2개뿐입니다.

### 컬러

~~미확인 — `color.ts` 확인 필요~~ → **해소 (2026-08-18).**
전체 헥스 나열은 하지 않습니다 (`../SCHEMA.md`) — 구조만 적습니다.

**2계층입니다.**

| 계층 | 파일 | 규모 |
|------|------|:---:|
| 원시 램프 | `src/colors.ts` (`dist/cjs/src/colors.js`) | 14계열 × **16단** = 224 |
| 시맨틱 | `src/themes/base/color.ts` | **226** |

시맨틱 층은 원시 램프를 이름으로 참조합니다 (`color-bg` = `colors.gray[6]`).
**컴포넌트 층 토큰은 없습니다** — 226개가 곧 공개면입니다.

#### 원시 램프 — 14계열 × 16단 (1~16)

`azure` · `blue` · `green` · `lime` · `magenta` · `orange` · `purple` ·
`red` · `rose` · `teal` · `yellow` (유채색 11) + `gray` +
**`blackAlpha` · `whiteAlpha`** 2개 알파 계열 = 14계열. 전부 16단이고 **단계 번호가
1부터 1씩 증가**합니다 (Spectrum 100 간격 · Carbon 10 간격과 다름).

1이 가장 밝고 16이 가장 어둡습니다 (`azure-1` = `rgba(251,253,255,1)`,
`azure-16` = `rgba(0,33,51,1)`). 알파 계열은 `blackAlpha-1` = `rgba(0,0,0,0)`에서
시작합니다. **표기는 전부 `rgba()`** — 헥스가 아니고, 불투명 색도 알파 `1`을 명시합니다.

램프 224개 중 **110개만 시맨틱 층에서 직접 쓰입니다** — 절반이 미사용 예비입니다.

#### 시맨틱 226개 — 계열 분포

| 접두 | 개수 |
|------|:---:|
| `color-bg-*` | **96** |
| `color-text-*` | 49 |
| `color-border-*` | 22 |
| `color-icon-*` | 18 |
| `color-avatar-*` | 16 |
| `color-input-*` | 6 |
| `color-nav-*` | 5 |
| `color-video-*` | 3 |
| `color-tooltip-*` · `color-checkbox-*` · `color-radio-*` · `color-scrollbar-*` | 각 2 |
| `color-scheme` · `color-backdrop` · `color-button-*` | 각 1 |

**배경이 전체의 42%입니다.** 표면 계열(`bg-surface` · `bg-surface-secondary` ·
`bg-surface-tertiary` · `bg-fill` …)에 상태 접미(`-hover` · `-active` ·
`-selected` · `-disabled`)와 의미 접미(`-brand` · `-critical` · `-caution` ·
`-success` · `-info` · `-magic`)를 곱한 결과입니다.

**모든 시맨틱 토큰에 `description`이 붙어 있습니다** — 예:
`color-bg-fill-brand` "The background color of main actions, like primary buttons."
값과 용도 설명이 같은 파일에 있습니다.

#### 테마 4벌 — 다크가 40개 부분 오버라이드입니다

| 테마 | 색 오버라이드 | 비고 |
|------|:---:|------|
| `light` | (기준) | 226 전체 |
| `light-mobile` | **1** | `color-button-gradient-bg-fill: none` 뿐. 그림자 14 · 타이포 14를 덮습니다 |
| `light-high-contrast-experimental` | **8** | 텍스트·보더 대비만 올림. `experimental` 접미 |
| `dark-experimental` | **40** | `experimental` 접미 |

**다크가 226개 중 40개만 덮습니다.** 나머지 186개는 라이트 값을 그대로 씁니다 —
**완전한 다크 팔레트가 아닙니다.** 이름에도 `-experimental`이 붙어 있습니다.
덮은 40개는 배경·텍스트·아이콘·fill 계열이고, 의미색(critical · success ·
caution · magic)은 덮지 않았습니다.

**다크 오버라이드의 절반이 흰색 알파입니다** (`rgba(255,255,255,0.05)` ~ `0.22`).
불투명 회색 대신 알파로 표면 층을 쌓습니다.

고대비 테마는 8개만 덮습니다 — `color-text` 계열 3개를
`rgba(26,26,26,1)`로 통일하고 보더를 진하게(`rgba(227,227,227)` →
`rgba(138,138,138)`) 만드는 정도입니다.

## 컴포넌트

~~미확인~~ → **컴포넌트 CSS 심화 (2026-08-17, `@shopify/polaris@13.9.5`
`build/esm/styles.css` 499KB — 전 컴포넌트 CSS가 npm에 있습니다).**

### 버튼 — 데스크톱에서 작아집니다

| 크기 | 기본(모바일) | `min-width: 48em` 이상 |
|------|:---:|:---:|
| Micro | 28px (`height-700`) | **24px** (`height-600`) |
| Slim·Medium | 32px | 32px |
| Large | 36px | 36px |

**컨트롤 높이가 뷰포트에 반응하는 표본**입니다 — 모바일에서 터치 몫으로
키우고 데스크톱에서 줄입니다(Micro 28→24). 코퍼스 다수는 단일값이고,
GOV.UK는 반응형이 스페이싱에만 있는데 Polaris는 **높이 자체가 반응형**입니다.
`min-width`가 높이와 같은 값 — **정사각 최소 면적** 보장.

### 컴포넌트 전용 변수층 `--pc-*`

```css
--pc-button-bg_hover · --pc-button-bg_active · --pc-button-bg_pressed · _disabled
```

전역 `--p-*` 토큰과 별개로 **컴포넌트 스코프 변수층**(`pc` = Polaris
component)이 있고, 상태가 **`_hover` 언더스코어 접미**로 붙습니다.
기본값이 상위 상태를 참조(`_pressed: var(--pc-button-bg_active)`)하는
**상태 폴백 체인**이라, 변형은 바꾸고 싶은 상태만 재정의합니다 —
variant × state 조합 폭발을 변수 폴백으로 누른 구조입니다.

## 특징적 결정

- **스페이싱과 라운드가 하나의 `size` 맵을 공유합니다.** 별도 스케일을 두지 않고 같은 원시 값에서
  파생시킵니다. 여백과 모서리가 자연히 같은 리듬을 갖게 됩니다.
- **시맨틱 별칭 레이어가 있습니다.** `space-card-padding` 같은 토큰을 제공해서, 카드 패딩을
  전사적으로 바꿀 때 한 곳만 고치면 되게 했습니다. 원시 토큰만 노출하는 시스템과 갈리는 지점입니다.
- **이름의 숫자가 px가 아닙니다.** `space-400`이 16px입니다. Primer처럼 이름이 곧 px인 시스템과
  정반대라, 두 시스템을 같이 참조할 때 혼동 위험이 큽니다.
- **0.66px 보더가 있습니다.** 서브픽셀 hairline을 토큰으로 승격시킨 드문 사례입니다.

- **타이포 크기·행간도 같은 `size` 맵에서 나옵니다** (2026-08-18).
  스페이싱·라운드·폰트 크기·행간이 전부 `size[350]` 같은 한 눈금을 공유합니다 —
  스페이싱과 라운드만 공유하는 시스템은 여럿이지만 타이포까지 넣은 것은 드뭅니다.

- **다크 테마가 미완성인 채로 배포됩니다** (2026-08-18). 시맨틱 226개 중
  **40개만** 오버라이드하고 이름에 `-experimental`이 붙습니다.
  고대비도 8개뿐입니다. 테마 구조는 있으나 채워지지 않은 상태입니다.

- **모바일 테마가 색이 아니라 타이포·그림자를 바꿉니다.**
  `light-mobile`의 오버라이드는 타이포 14 · 그림자 14 · 색 1 · 스페이싱 1입니다.
  같은 색으로 **활자만 키우고 그림자를 걷어내는** 구성입니다.

## 접근성

~~미확인~~ → **현행 문서 부재 확정 (2026-08-18, 헤드리스 렌더 확인).**

`https://shopify.dev/docs/apps/design`을 렌더링하면 접근성 항목은
"Build with accessibility best practices so your app works for all merchants
and their customers." **한 문장뿐이고 WCAG 버전·등급이 없습니다.**
같은 페이지와 `https://shopify.dev/docs/api/app-home`,
`https://shopify.dev/docs/api/app-home/polaris-web-components`
세 페이지 모두 렌더 결과에 **`WCAG` 문자열이 0회**입니다.
`https://shopify.dev/docs/apps/design/accessibility`는 **404**입니다
(렌더 결과: "404 Page not found").

frontmatter의 `WCAG 2.1 A+AA`는 **Wayback 2025-01 스냅샷 근거**이며,
현행 shopify.dev 문서에는 대응 문장이 없다는 점이 이번 렌더로 확정됐습니다.

## 드리프트 기록 — 저장소 아카이브·후속 이관 (2026-08-18)

토큰 값 변경은 아니지만 **소스 자체의 지위가 바뀌었습니다**:

- `Shopify/polaris` 저장소가 **`Shopify/polaris-react-archive`로 개명 + 아카이브**
  (archived: true, 최종 커밋 2026-08-05). 구 URL은 301로 넘어갑니다.
- 문서 사이트 `polaris.shopify.com`도 전체가 `shopify.dev/docs/api/polaris`로
  301 리다이렉트 — **React 라이브러리는 deprecated**이고, 후속은
  **Polaris Web Components** (2025-10-01 출시,
  shopify.dev/docs/api/app-home/polaris-web-components)입니다.
- `polaris-tokens/src`는 2026-08-16 검증 이후 커밋 0건 — **이 항목의 수집 값
  자체는 유효**하나, 동결된 스냅샷입니다. 웹 컴포넌트판 토큰은 별도 수집 대상
  → 아래 "Web Components 세대" 절에서 수집 완료 (2026-08-18).

## Web Components 세대 — (2026-08-18)

후속 세대(2025-10 출시)의 토큰을 수집했습니다. 결론부터: **공개 토큰 레이어가
사라졌습니다.** 토큰 npm 패키지 없음, 공개 저장소 없음(전 Polaris 저장소 아카이브
확인). 값은 CDN 번들(`https://cdn.shopify.com/shopifycloud/polaris.js`,
무버전 — 빌드 해시 `5ff803d5…`, 2026-08-18 수집분 504KB) 안의 JS 맵으로만
존재하고, 공개 인터페이스는 **키워드 유니온**(`@shopify/polaris-types@1.0.7`의
`SizeKeyword`)입니다.

```
'small-500' … 'small-100' | 'small' | 'base' | 'large' | 'large-100' … 'large-500'
```

- 숫자 스케일(`space-400`) → **T셔츠 키워드**로 전면 개명. 숫자가 클수록
  base에서 멀어집니다(`small-500`이 최소, `large-500`이 최대).
- `small` = `small-100`, `large` = `large-100`의 별칭.
- `--p-*` 공개 CSS 변수 → **빌드 해시 접미 내부 변수**(`--s-*-26021`
  컴포넌트 / `--t-*-26021` 테마)로 대체. 해시가 붙으므로 외부에서 참조 불가 —
  토큰을 계약이 아니라 구현 세부로 강등시킨 구조입니다.

### 스페이싱 (padding·gap 공용 맵)

| 키워드 | 값 | React판 대응 |
|------|-----|------|
| `none` | 0px | `space-0` |
| `small-500` | 2px | `space-050` |
| `small-400` | 4px | `space-100` |
| `small-300` | 6px | `space-150` |
| `small-200` | 8px | `space-200` |
| `small-100`·`small` | 12px | `space-300` |
| `base` | 16px | `space-400` |
| `large`·`large-100` | 20px | `space-500` |
| `large-200` | 24px | `space-600` |
| `large-300` | 32px | `space-800` |
| `large-400` | 40px | `space-1000` |
| `large-500` | 48px | `space-1200` |

**실값은 React판과 동일, 스케일 범위만 잘렸습니다** — 1px(`space-025`)과
상단 64·80·96·112·128px가 탈락. 18단 → 12단. (`auto` 키워드는 0으로 해석.)

### 라운드

| 키워드 | 값 | 비고 |
|------|-----|------|
| `none` | 0px | |
| `small-200` | 4px | |
| `small-100`·`small` | 6px | |
| `base` | 8px | React `border-radius-200` |
| `large`·`large-100` | 12px | |
| `large-200` | 16px | |
| `max` | 9999px | 번들에 `624.9375rem`로 등장 |

React판 대비 **2px·20px·30px 탈락**. 기본 라운드는 8px.

### 보더 두께

| 키워드 | 값 |
|------|-----|
| `none` | 0px |
| `small-100`·`small` | **0.66px** (0.04125rem) |
| `base` | 1px |
| `large`·`large-100` | 2px |

React의 서브픽셀 hairline(`border-width-0165` 0.66px)이 **`small`로 승격**되어
살아남았습니다. 4px(`border-width-100`)는 탈락.

### 타이포그래피

패밀리는 React판과 동일한 Inter 스택(`'Inter', -apple-system, …`).
**웨이트가 한 단계씩 가벼워졌습니다**:

| 역할 | React (tokens 9.4.2) | WC |
|------|:---:|:---:|
| base/regular | 450 | 450 |
| medium | 550 | 550 |
| semibold | **650** | **600** |
| bold | **700** | **650** |

사이즈는 번들 CSS 관측 기준 11 · 12 · 13 · 14 · 16 · 18px만 사용 —
React 스케일의 20~40px 디스플레이 사이즈가 admin 번들에서 사라졌습니다.
최대치가 페이지 타이틀 18px/24px(w600)입니다.

**본문 텍스트가 반응형**입니다 (`s-text` 기본값):

| | font-size | line-height | letter-spacing |
|------|:---:|:---:|:---:|
| 모바일(기본) | 16px | 24px | -0.00833em |
| 데스크톱 | 13px | 20px | 0 |

`s-heading` 기본: 모바일 16px/20px → 데스크톱 13px/20px, w600.
미디어쿼리가 `@media (min-width:48rem),(pointer:fine)` — React의 `48em`
브레이크포인트에 **`pointer:fine` 조건이 추가**됐습니다(마우스면 뷰포트
무관하게 컴팩트).

### 컴포넌트 값 — 버튼 (min-block-size)

| 크기 | 모바일(기본) | 데스크톱 |
|------|:---:|:---:|
| small | 28px | 24px |
| base | **44px** | 28px |
| large | **44px** | 32px |

React판(Micro 28→24, Slim·Medium 32, Large 36)과 비교하면: 반응형 높이가
Micro 한 단에서 **전 크기로 확대**됐고, 모바일 base/large가 44px —
터치 타깃 44pt 기준을 그대로 박은 값입니다. 데스크톱은 오히려 전반 축소
(base 28px < React Medium 32px). 버튼 폰트도 14px/550 → 데스크톱 12px로 줄어듭니다.

기타: 체크박스·라디오 20px→16px(데스크톱), 입력 필드 min-height 32px·폰트 13px,
테이블 셀 padding 8×12px·min-height 32px, 테이블 폰트 14px→13px.

### 출처

- 키워드 유니온·컴포넌트 목록(59종 `s-*` 태그): npm `@shopify/polaris-types@1.0.7`
  (2026-04-29) `dist/polaris.d.ts` + `dist/custom-elements.json`
- 실값: `cdn.shopify.com/shopifycloud/polaris.js` 내 키워드→rem 맵과 컴포넌트 CSS
  (minified JS에서 추출, 1rem=16px 환산)
- **WC용 토큰 npm 패키지 없음 확인** — registry 검색 2026-08-18.
  `@shopify/polaris-tokens`는 9.4.2(2025-03-17)에서 동결(React 세대 값).

## 참고

- 저장소: https://github.com/Shopify/polaris-react-archive (구 Shopify/polaris — 아카이브)
- 후속: Polaris Web Components — https://shopify.dev/docs/api/app-home/polaris-web-components
- 토큰: `polaris-tokens/src/` (`size.ts`가 모든 수치의 단일 출처)
- WC 세대 토큰: CDN 번들 + `@shopify/polaris-types` (위 절 참조)
- **라이선스 해소 (2026-08-18):** `커스텀 (MIT 본문 + Shopify 연동 앱 한정 조건)` — 출처: github Shopify/polaris-react-archive → `LICENSE.md`. MIT 본문에 "applications that integrate or interoperate with Shopify software or services" 제한이 덧붙습니다 — **MIT로 적으면 틀립니다**
