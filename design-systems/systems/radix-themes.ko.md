---
name: Radix Themes
org: WorkOS
coverage: full
url: https://radix-ui.com/themes
repo: https://github.com/radix-ui/themes
license: MIT
tech: [React]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm @radix-ui/themes@3.3.0 → styles.css, src/components/*.css (50개 컴포넌트)"
---
<!-- lang-links -->
> [English](radix-themes.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Radix Primitives 위에 얹힌 스타일 레이어.
**테마를 5개 축의 조합**(강조색 · 회색 · 밀도 · 라운드 · 패널 배경)으로 정의하며,
**커서와 컴포넌트 높이까지 토큰화**합니다.

## 테마 축 — `data-*` 속성 5개

```html
<Theme accentColor="blue" grayColor="slate" scaling="100%" radius="medium" panelBackground="translucent">
```

| 속성 | 값 | 개수 |
|------|-----|:---:|
| `data-accent-color` | amber · blue · bronze · brown · crimson · cyan · gold · grass · gray · green · indigo · iris · jade · lime · mint · orange · pink · plum · purple · red · ruby · sky · teal · tomato · violet · yellow | **26** |
| `data-gray-color` | mauve · olive · sage · sand · slate (+ 자동 매칭) | **5** |
| `data-scaling` | 90% · 95% · 100% · 105% · 110% | **5** |
| `data-radius` | none · small · medium · large · full | **5** |
| `data-panel-background` | solid · translucent | **2** |

**조합 수가 26 × 5 × 5 × 5 × 2 = 6,500입니다.**
Material 3이 완성된 테마 32개를 배포하는 것과 방향이 정반대입니다 —
Radix Themes는 **축을 배포하고 조합은 런타임에 합니다.**

**회색 계열을 강조색과 독립적으로 고릅니다.** 표본에서 무채 계열을
사용자 선택 축으로 노출하는 것은 Radix Themes뿐입니다.

## 토큰

### 배율 두 개 — `--scaling` · `--radius-factor`

```css
--space-4:  calc(16px * var(--scaling));
--font-size-3: calc(16px * var(--scaling));
--radius-3: calc(6px * var(--scaling) * var(--radius-factor));
```

**라운드만 배율 두 개를 곱합니다.** 스페이싱·글자 크기는 `--scaling` 하나입니다.

| `data-radius` | `--radius-factor` | `--radius-full` | `--radius-thumb` |
|---------------|:---:|:---:|:---:|
| `none` | 0 | 0px | 0.5px |
| `small` | 0.75 | 0px | 0.5px |
| `medium` | 1 | 0px | 9999px |
| `large` | 1.5 | 0px | 9999px |
| `full` | 1.5 | **9999px** | 9999px |

**`large`와 `full`의 배율이 같습니다** (1.5). 차이는 `--radius-full`뿐입니다 —
`full`에서만 완전 원형 요소(pill 버튼·아바타)가 활성화됩니다.

**`none`은 배율 0으로 모든 라운드를 0으로 만듭니다.** 토큰을 지우지 않고
곱셈으로 무력화합니다.

`--radius-thumb`가 0.5px ↔ 9999px로 갈립니다 — 슬라이더·프로그레스 손잡이 전용입니다.

### 스페이싱 — 9단계

| 토큰 | 값 (배율 100%) |
|------|:---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 40px |
| `--space-8` | 48px |
| `--space-9` | 64px |

증분: **+4 / +4 / +4 / +8 / +8 / +8 / +8 / +16.**
`4/8/16/24/32`를 모두 포함하며 20px이 없습니다.

### 타이포그래피 — 9단계, 8번이 35px

| 토큰 | 크기 | 본문 행간 | 제목 행간 | 자간 |
|------|:---:|:---:|:---:|:---:|
| `1` | 12 | 16 | 16 | +0.0025em |
| `2` | 14 | 20 | 18 | 0em |
| `3` | 16 | 24 | 22 | 0em |
| `4` | 18 | 26 | 24 | -0.0025em |
| `5` | 20 | 28 | 26 | -0.005em |
| `6` | 24 | 30 | 30 | -0.00625em |
| `7` | 28 | 36 | 36 | -0.0075em |
| `8` | **35** | 40 | 40 | -0.01em |
| `9` | 60 | 60 | 60 | -0.025em |

**8단계가 35px입니다.** 12·14·16·18·20·24·28 다음이 32도 36도 아닌 **35**입니다.
표본에서 홀수 본문 크기는 Apple iOS(17pt) · Helios(13px) · Seed Design(11/13/15px)에도
있지만, **35처럼 큰 값이 홀수인 경우는 Radix Themes뿐입니다.**

**본문 행간과 제목 행간이 따로 있습니다.**

| 단계 | 본문 | 제목 | 차이 |
|:---:|:---:|:---:|:---:|
| 1 | 16 | 16 | 0 |
| 2 | 20 | 18 | **-2** |
| 3 | 24 | 22 | **-2** |
| 4 | 26 | 24 | **-2** |
| 5 | 28 | 26 | **-2** |
| 6~9 | 30 · 36 · 40 · 60 | 30 · 36 · 40 · 60 | 0 |

**작은 단계(2~5)에서만 제목 행간이 2px 좁습니다.** 6단계 이상은 동일합니다.

자간은 **1단계에서만 양수**(+0.0025em)이고 2·3은 0, 4단계부터 음수로 커집니다.
Material 3(작을수록 양수로 증가) · Apple(U자)과 또 다른 세 번째 곡선입니다
(`patterns/typography.md`).

굵기 4단계: `light` 300 · `regular` 400 · `medium` 500 · `bold` 700.
**600(semibold)이 없습니다.**

`--heading-font-size-adjust: 1` — 제목 서체를 별도로 지정할 때
크기를 보정하는 배율입니다.

### 컬러 — 색상당 24단계

색상 하나가 **`1`~`12` 불투명 12단계 + `a1`~`a12` 알파 12단계 = 24개**입니다.

```
--blue-1 … --blue-12       불투명
--blue-a1 … --blue-a12     알파
```

**Seed Design이 `-alpha-` 계열을 미리 계산해 두는 것과 같은 방식**입니다
(`patterns/color.md`). Radix Themes는 **모든 색상에 예외 없이** 적용합니다.

`--accent-*`가 선택된 강조색을 가리키는 별칭입니다 —
`--accent-9: var(--blue-9)`. `--accent-a9`도 같은 방식으로 매핑됩니다.

**P3 색역 대응이 있습니다.** `styles.css`에 `display-p3` 참조가 **1,579회** 나옵니다 —
`@supports (color: color(display-p3 …))` 안에서 색을 다시 정의합니다.
표본에서 P3 대체 팔레트를 토큰 레벨에 두는 것은 Radix Themes뿐입니다.

색 리터럴 선언은 총 **2,973개**입니다 (라이트/다크 × 불투명/알파 × sRGB/P3).

### 그림자 — `color-mix()` 계산

```css
--shadow-2: 0 0 0 1px color-mix(in oklab, var(--gray-a3), var(--gray-3) 25%),
            0 0 0 0.5px var(--black-a1), 0 1px 1px 0 var(--gray-a2),
            0 2px 1px -1px var(--black-a1), 0 1px 3px 0 var(--black-a1);
```

6단계(`--shadow-1` ~ `--shadow-6`)이며, **`color-mix(in oklab, …)`을 지원하는 브라우저에서만
혼합 값을 쓰고** 아니면 `--gray-a3`를 그대로 씁니다 (`@supports` 분기).

`--shadow-1`은 `inset`만으로 구성됩니다 — 눌린 표면용입니다.

**그림자가 회색 계열 토큰을 참조합니다.** `data-gray-color`를 바꾸면 그림자 색조도 따라옵니다.

### 커서 — 표본에서 유일하게 토큰입니다

| 토큰 | 기본값 |
|------|--------|
| `--cursor-button` | `default` |
| `--cursor-link` | `pointer` |
| `--cursor-checkbox` | `default` |
| `--cursor-radio` | `default` |
| `--cursor-switch` | `default` |
| `--cursor-menu-item` | `default` |
| `--cursor-slider-thumb` | `default` |
| `--cursor-slider-thumb-active` | `default` |
| `--cursor-disabled` | `not-allowed` |

**버튼이 `default`, 링크만 `pointer`입니다.**
표본의 다른 시스템에서 커서를 토큰으로 노출하는 사례를 확인하지 못했습니다.

### 컨테이너 — 4단계

| 토큰 | 값 |
|------|:---:|
| `--container-1` | 448px |
| `--container-2` | 688px |
| `--container-3` | 880px |
| `--container-4` | 1136px |

증분 **+240 / +192 / +256**으로 불규칙합니다. `--scaling`을 타지 않습니다.

## 컴포넌트 높이 — 스페이싱 토큰을 재사용합니다

```css
--base-button-height: var(--space-5);  /* size 1 → 24px */
--base-button-height: var(--space-6);  /* size 2 → 32px */
--base-button-height: var(--space-7);  /* size 3 → 40px */
--base-button-height: var(--space-8);  /* size 4 → 48px */
```

| `size` | 높이 | 참조 토큰 |
|:---:|:---:|-----------|
| 1 | 24px | `--space-5` |
| 2 | 32px | `--space-6` |
| 3 | 40px | `--space-7` |
| 4 | 48px | `--space-8` |

**높이 스케일이 따로 없습니다.** 스페이싱 토큰이 그대로 높이가 됩니다.

| 시스템 | 컴포넌트 높이 |
|--------|---------------|
| Mantine | 전용 스케일 (30/36/42/50/60) |
| shadcn/ui | Tailwind 클래스 (24/32/36/40) |
| **Radix Themes** | **스페이싱 토큰 재사용** (24/32/40/48) |

Radix Themes만 **8px 등차**입니다.

일부 컴포넌트는 라운드를 `em`으로 계산합니다:

```css
border-radius: calc((0.5px + 0.2em) * var(--radius-factor));   /* 8273행 */
border-radius: calc(var(--radius-factor) * 0.35em);            /* 10756행 */
```

**글자 크기에 비례하는 라운드**입니다. `--radius-N` 단계를 쓰지 않는 경우입니다.

Progress·Slider는 `max()`로 두 방식 중 큰 값을 고릅니다:

```css
border-radius: max(calc(var(--radius-factor) * var(--progress-height) / 3),
                   calc(var(--radius-factor) * var(--radius-thumb)));
```

## 컴포넌트

**50종** (`*.props.tsx` 기준):

alert-dialog · aspect-ratio · avatar · badge · blockquote · box · button · callout ·
card · checkbox · checkbox-cards · checkbox-group · code · container · context-menu ·
data-list · dialog · dropdown-menu · em · flex · grid · heading · hover-card ·
icon-button · inset · kbd · link · popover · progress · quote · radio · radio-cards ·
radio-group · scroll-area · section · segmented-control · select · separator ·
skeleton · slider · spinner · strong · switch · tab-nav · table · tabs · text ·
text-area · text-field · tooltip

`em` · `strong` · `quote` · `blockquote` · `code` · `kbd`가 컴포넌트입니다 —
**인라인 텍스트 요소를 컴포넌트로 제공**합니다.

`checkbox-cards` · `radio-cards`가 `checkbox` · `radio`와 별도로 있습니다.

`theme-panel`이 소스에 포함돼 있습니다 — 5개 테마 축을 브라우저에서 조정하는 개발용 패널입니다.

## 특징적 결정

- **테마를 5개 축의 조합으로 정의합니다** (26 × 5 × 5 × 5 × 2 = 6,500).
  Material 3의 "완성 테마 32개 배포"와 정반대 접근입니다.
- **회색 계열이 사용자 선택 축입니다** (mauve · olive · sage · sand · slate).
- **커서를 토큰화합니다.** 9개. 버튼은 `default`, 링크만 `pointer`입니다.
- **컴포넌트 높이가 스페이싱 토큰입니다** — 전용 높이 스케일이 없습니다.
- **모든 색상에 알파 12단계가 미리 계산돼 있습니다** (색상당 24개).
- **P3 색역 대체 팔레트를 토큰 레벨에 둡니다** (`display-p3` 1,579회).
- **그림자를 `color-mix(in oklab, …)`으로 계산하고 `@supports`로 폴백합니다.**
- **본문·제목 행간을 분리하되 작은 단계(2~5)에서만 2px 차이를 둡니다.**
- **글자 크기 8단계가 35px입니다.**
- **굵기에 600이 없습니다** (300/400/500/700).
- **라운드 `none`을 배율 0으로 처리합니다** — 토큰을 지우지 않습니다.
- **`em` 기반 라운드가 일부 컴포넌트에 있습니다** — 글자 크기에 비례합니다.
- **인라인 텍스트 요소가 컴포넌트입니다** (`em` · `strong` · `code` · `kbd` · `quote`).

## 접근성

명시된 WCAG 목표는 CSS·토큰에서 확인되지 않았습니다.

키보드·포커스·ARIA 동작은 **Radix Primitives**가 담당합니다 —
Radix Themes는 그 위의 스타일 레이어입니다.

토큰 레벨에서 확인되는 것:

- 알파 12단계가 모든 색상에 있어 **반투명 상태색이 배경과 무관하게 동작**합니다
- `--cursor-disabled: not-allowed` — 비활성 상태가 커서로도 표현됩니다
- `--focus-*` 색 계열이 별도로 있습니다 (강조색과 독립)
- P3 대체 팔레트가 광색역 디스플레이에서의 색 표현을 다룹니다

**대비 비율 규격은 소스에 없습니다.**

## 참고

- **Figma 킷 (false) 근거:** 공식 킷 없음 — 문서가 커뮤니티 제작 "Unofficial" 라이브러리 1건만 소개, 2026-08-18 확인

- 문서: https://radix-ui.com/themes
- 저장소: https://github.com/radix-ui/themes
- 토큰: `npm pack @radix-ui/themes@3.3.0` → `package/styles.css`
- 컴포넌트: `package/src/components/*.css` · `*.props.tsx`
- 프리미티브(별도 패키지): https://radix-ui.com/primitives
- **남은 확인 사항:** 26개 강조색의 실제 헥스값 대비 비율,
  `--focus-*` 계열의 색 결정 규칙, 다크 모드 알파 토큰의 계산 방식
- **Figma 킷 부재 확정 (2026-08-18):** `figma_kit: false` — 출처
  <https://www.radix-ui.com/themes/docs/overview/resources>. 문서의 Resources
  페이지가 외부 자산 **딱 둘**을 소개하는데, 첫 항목이 "**Figma library —
  Unofficial Radix Themes components for Figma, by Victor Allegret**"입니다.
  `Unofficial`이라는 단어를 프로젝트가 직접 붙여 놓았고, 컴포넌트 소스에도
  이 항목의 리액트 컴포넌트 이름이 `ThemesUnofficialFigmaLibrary`로
  박혀 있습니다(둘째 항목은 `ThemesUnofficialTailwindPlugin` — Viktor
  Bonino의 Tailwind 프리셋). 페이지는 "Radix Themes로 멋진 걸 만들었으면
  Twitter나 Discord로 연락 달라"로 끝나 **커뮤니티 수집 창구**임을
  드러냅니다. 문서 전 구역(`/themes/docs/overview/{getting-started,styling,
  releases}`)에서 그 밖의 Figma 언급은 0건이고,
  `/themes/docs/resources/figma`는 404입니다
- **정적 사이트 확인 (2026-08-18):** `radix-ui.com`은 SSR HTML에 본문이
  모두 들어 있어 헤드리스 렌더가 필요 없습니다 (Resources 페이지 85KB,
  스크립트 제거 후 본문 정상 추출)
