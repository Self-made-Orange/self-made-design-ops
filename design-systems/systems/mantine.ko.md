---
name: Mantine
org: Mantine (오픈소스)
coverage: partial
url: https://mantine.dev
repo: https://github.com/mantinedev/mantine
license: MIT
tech: [React]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm @mantine/core@9.5.1 → styles.css, styles/*.css (101개 컴포넌트 스타일 파일)"
---
<!-- lang-links -->
> [English](mantine.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

React 컴포넌트 라이브러리. **`--mantine-scale` 배율 변수**로 UI 전체 밀도를 조정하고,
**컴포넌트 치수를 크기 이름(xs~xl)에 묶어** 관리합니다.

## 토큰

### 배율 변수 — 모든 치수가 `calc()`

```css
--mantine-scale: 1;
--mantine-spacing-md: calc(1rem * var(--mantine-scale));
--mantine-radius-md: calc(0.5rem * var(--mantine-scale));
--mantine-font-size-md: calc(1rem * var(--mantine-scale));
```

**스페이싱·라운드·글자 크기가 모두 같은 배율을 곱합니다.**
Vapor UI가 치수와 라운드 배율을 분리한 것과 달리, Mantine은 **배율이 하나**입니다.

같은 방식을 쓰는 시스템:

| 시스템 | 배율 변수 | 개수 |
|--------|-----------|:---:|
| Vapor UI | `--vapor-scale-factor` · `--vapor-radius-factor` | 2 |
| **Mantine** | **`--mantine-scale`** | **1** |
| Radix Themes | `--scaling` · `--radius-factor` | 2 |
| shadcn/ui | `--radius` (기준값 방식) | 1 (라운드만) |

### 스페이싱 — 5단계, 이름 기반

| 토큰 | rem | px (배율 1) |
|------|:---:|:---:|
| `xs` | 0.625rem | **10** |
| `sm` | 0.75rem | 12 |
| `md` | 1rem | 16 |
| `lg` | 1.25rem | 20 |
| `xl` | 2rem | 32 |

**단계가 5개뿐입니다.** 표본 다수가 8~14단계입니다 (`tokens/scales.md`).

**4·8px이 없습니다.** `xs`가 10px에서 시작합니다 — 코퍼스에서 `4/8/16/24`를
보편으로 확인했는데(17/17), Mantine은 4와 8을 둘 다 건너뜁니다.
`24`도 없습니다 — 20 다음이 32입니다.

증분: **+2 / +4 / +4 / +12.** 마지막 구간이 크게 벌어집니다.

### 라운드 — 순수 배가

| 토큰 | rem | px |
|------|:---:|:---:|
| `xs` | 0.125rem | 2 |
| `sm` | 0.25rem | 4 |
| `md` | 0.5rem | 8 |
| `lg` | 1rem | 16 |
| `xl` | 2rem | 32 |

**2 → 4 → 8 → 16 → 32. 정확히 2배씩입니다.**
`--mantine-radius-default`가 `md`(8px)를 가리킵니다.

표본에서 라운드가 순수 등비인 것은 Mantine뿐입니다 — 나머지는
2/4/6/8/12/16처럼 중간값을 채웁니다.

### 타이포그래피

본문 크기 5단계:

| 토큰 | rem | px | 행간 |
|------|:---:|:---:|:---:|
| `xs` | 0.75rem | 12 | 1.4 |
| `sm` | 0.875rem | 14 | 1.45 |
| `md` | 1rem | 16 | 1.55 |
| `lg` | 1.125rem | 18 | 1.6 |
| `xl` | 1.25rem | 20 | 1.65 |

**행간이 크기마다 다릅니다** — 작을수록 좁고(1.4), 클수록 넓습니다(1.65).

**방향이 관행과 반대입니다.** Apple·Material 3은 큰 글자에서 행간 비율이 작아집니다
(Apple Large Title 34→41 = 1.21, Caption 2 11→13 = 1.18이지만 Body 17→22 = 1.29).
Mantine은 큰 글자에서 비율이 커집니다. `--mantine-line-height` 기본값은 `md`와 같은 1.55입니다.

제목 6단계 — **굵기가 전부 700**입니다:

| 토큰 | rem | px | 행간 | 굵기 |
|------|:---:|:---:|:---:|:---:|
| `h1` | 2.125rem | 34 | 1.3 | 700 |
| `h2` | 1.625rem | 26 | 1.35 | 700 |
| `h3` | 1.375rem | 22 | 1.4 | 700 |
| `h4` | 1.125rem | 18 | 1.45 | 700 |
| `h5` | 1rem | 16 | 1.5 | 700 |
| `h6` | 0.875rem | 14 | 1.5 | 700 |

**제목 행간도 작을수록 좁습니다** (1.3 → 1.5). 본문과 같은 방향입니다.

크기 증분: 34 → 26 → 22 → 18 → 16 → 14. **-8 / -4 / -4 / -2 / -2**로 좁혀집니다.

`h4`(18) · `h5`(16) · `h6`(14)가 본문 `lg` · `md` · `sm`과 값이 같습니다 —
굵기와 행간만 다릅니다. Atlassian의 `font.heading.xsmall`(14px)이
`font.body.[default]`(14px)와 크기를 공유하는 것과 같은 구조입니다.

자간 토큰은 없습니다.

### 컬러 — 14색 × 10단계

```
blue · cyan · dark · grape · gray · green · indigo
lime · orange · pink · red · teal · violet · yellow
```

단계는 `0` ~ `9` **10단계**입니다 (Tailwind·Radix는 11~12단계).
원시 색 140개 + 파생 토큰을 합쳐 **총 270개**입니다.

**`dark`가 색상 계열입니다.** `gray`와 별도로 `--mantine-color-dark-0..9`가 있습니다 —
다크 모드 표면색을 색상 램프로 둡니다.

파생 토큰 — 색상마다 상태·용도 변형이 있습니다:

| 접미사 | 용도 |
|--------|------|
| `-filled` | 채움 배경 |
| `-filled-hover` | 채움 hover |
| `-light` | 연한 배경 |
| `-light-hover` | 연한 배경 hover |
| `-light-color` | 연한 배경 위 텍스트 |
| `-outline` · `-outline-hover` | 테두리 변형 |

**Orbit이 색 이름 안에 상태를 넣는 방식**(`normalHover` 등)과 같은 계열입니다
(`patterns/color.md`). Mantine은 여기에 **변형(filled / light / outline)까지** 붙입니다.

`--mantine-primary-color-*`가 별칭 계열로 존재하며 기본값이 `blue`를 가리킵니다 —
`--mantine-primary-color-6: var(--mantine-color-blue-6)`. **주 색상을 한 곳에서 갈아끼웁니다.**

### 브레이크포인트 — `em` 단위

| 토큰 | 값 | px (16px 기준) |
|------|:---:|:---:|
| `xs` | 36em | 576 |
| `sm` | 48em | 768 |
| `md` | 62em | 992 |
| `lg` | 75em | 1200 |
| `xl` | 88em | 1408 |

**`em`입니다.** Tailwind는 `rem`, 나머지 다수는 px입니다.
미디어 쿼리에서 `em`과 `rem`은 루트 글자 크기 기준으로 동일하게 동작하지만,
토큰 값으로 읽을 때 단위가 다릅니다.

`62em`(992) · `75em`(1200) · `88em`(1408) — **소수 없이 정수 px로 떨어집니다.**

### 그림자

`xs` · `sm` · `md` · `lg` · `xl` 5단계. 복합 값이며 스케일 배율을 타지 않습니다.

## 컴포넌트 치수 — 크기 이름이 높이를 결정합니다

Button · Input · Section이 **같은 높이 스케일**을 공유합니다.

| 크기 | 높이 |
|------|:---:|
| `xs` | 30px |
| **`sm`** | **36px** |
| `md` | 42px |
| `lg` | 50px |
| `xl` | 60px |

**기본값이 `sm`(36px)입니다** — `md`가 아닙니다.
`--button-height: var(--button-height-sm)`.

증분: **+6 / +6 / +8 / +10.** 위로 갈수록 벌어집니다.

**Button과 Input의 높이 스케일이 완전히 동일합니다.** 폼에서 두 요소를 나란히 놓을 때
같은 `size` 값으로 맞춰집니다.

Input의 행간이 높이에서 계산됩니다:

```css
--input-line-height: calc(var(--input-height) - calc(0.125rem * var(--mantine-scale)));
```

**높이에서 2px을 뺀 값을 행간으로 씁니다** — 상하 1px씩 테두리 몫입니다.

## 컴포넌트

스타일 파일 기준 **101종**. `styles/` 아래 컴포넌트별 CSS로 분리돼 있습니다
(`Button.css` · `NumberInput.css` · `Cascader.css` · `EmptyState.layer.css` 등).

`.layer.css` 접미사가 붙은 파일은 CSS `@layer`에 들어갑니다.

## 특징적 결정

- **배율 변수 하나로 스페이싱·라운드·글자 크기를 함께 조정합니다.**
  Vapor UI·Radix Themes가 라운드를 분리한 것과 다릅니다.
- **스페이싱이 5단계뿐이고 4·8·24px이 없습니다.** `10/12/16/20/32`입니다.
  코퍼스에서 보편으로 확인한 `4/8/16/24` 중 16만 있습니다.
- **라운드가 순수 2배 등비입니다** (2/4/8/16/32). 표본에서 유일합니다.
- **행간이 글자 크기에 따라 커집니다** (1.4 → 1.65). Apple·Material과 방향이 반대입니다.
- **제목 6단계 전부 굵기 700입니다.** Pajamas가 전부 600인 것과 같은 구조,
  다른 값입니다.
- **`dark`를 색상 계열로 둡니다.** `gray`와 별도의 10단계 램프입니다.
- **컴포넌트 기본 크기가 `sm`입니다.** `md`가 중간값인데 기본값이 아닙니다.
- **Button·Input이 높이 스케일을 공유합니다** (30/36/42/50/60).
- **브레이크포인트가 `em`입니다.**
- **Input 행간을 높이에서 역산합니다** (`height - 2px`).

## 접근성

명시된 WCAG 목표는 토큰·CSS에서 확인되지 않았습니다.
`-light-color` 토큰이 연한 배경 위 텍스트 색을 별도로 두는 형태이며,
대비 비율 목표는 소스에 적혀 있지 않습니다.

## 참고

- 문서: https://mantine.dev
- 저장소: https://github.com/mantinedev/mantine
- 토큰: `npm pack @mantine/core@9.5.1` → `package/styles.css`
- 컴포넌트 스타일: `package/styles/*.css`
- **남은 확인 사항:** 다크 모드 토큰 매핑 규칙, 그림자 실값,
  `@mantine/hooks` 외 서브패키지의 추가 토큰
- **Figma 킷 확인 (2026-08-18):** `figma_kit: false` — **공식 킷이 없음을 명시합니다** — `mantine.dev/getting-started`: "Design is not a
  part of the development process – there are no official Figma or Sketch design files."
  커뮤니티 킷은 여럿 있으나 팀이 유지보수하지 않는다고 못박습니다. **표본에서 부재를
  명문화한 유일한 사례입니다.**
