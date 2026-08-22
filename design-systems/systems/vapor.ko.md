---
name: Vapor UI
org: goorm
coverage: partial
url: https://vapor-ui.goorm.io
repo: https://github.com/goorm-dev/vapor-ui
license: MIT
tech: [React]
figma_kit: true
tokens_format: [CSS]
a11y_target: "WCAG 2.2 AA (명시 — Base UI 기반, 2026-08-18 확인)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @vapor-ui/core@1.5.0 → dist/components/*.vanilla.css"
---
<!-- lang-links -->
> [English](vapor.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

goorm의 디자인시스템. 한국에서 만들어진 공개 시스템이며,
**전역 배율 변수로 모든 치수를 한 번에 조정**하는 구조가 특징입니다.

## 토큰

### 배율 변수

모든 치수 토큰이 `calc()`로 정의되며, 두 개의 배율 변수를 곱합니다.

```css
--vapor-size-dimension-200: calc(var(--vapor-scale-factor) * 16px);
--vapor-size-borderRadius-500: calc(var(--vapor-radius-factor) * 16px);
```

- `--vapor-scale-factor` — 치수 전체 배율
- `--vapor-radius-factor` — 라운드 전용 배율

**두 배율이 분리돼 있어, 여백은 그대로 두고 라운드만 조정하는 것이 가능합니다.**

### 치수 (배율 1 기준)

| 토큰 | 값 |
|------|-----|
| `dimension-025` | 2px |
| `dimension-050` | 4px |
| `dimension-075` | 6px |
| `dimension-100` | 8px |
| `dimension-150` | 12px |
| `dimension-175` | 14px |
| `dimension-200` | 16px |
| `dimension-225` | 18px |
| `dimension-250` | 20px |
| `dimension-300` | 24px |
| `dimension-400` | 32px |
| `dimension-500` | 40px |
| `dimension-600` | 48px |
| `dimension-700` | 56px |

10px 단계가 없습니다 — 8 다음이 12입니다. 14·18px은 있습니다.

### 라운드 (배율 1 기준)

| 토큰 | 값 |
|------|-----|
| `borderRadius-000` | 0px |
| `borderRadius-050` | 2px |
| `borderRadius-100` | 4px |
| `borderRadius-200` | 6px |
| `borderRadius-300` | 8px |
| `borderRadius-400` | 12px |
| `borderRadius-500` | 16px |
| `borderRadius-600` | 20px |
| `borderRadius-700` | 24px |
| `borderRadius-800` | 32px |
| `borderRadius-900` | 40px |

출처: `@vapor-ui/core@1.5.0` → `dist/components/*.css.ts.vanilla.css`

### 타이포그래피 / 컬러

~~미확인.~~ → 타이포는 2026-08-18 확보 (컬러 실값은 여전히 미확인 —
시맨틱 변수명만 확인):

| 축 | 값 (배율 1 기준) |
|----|------|
| fontSize (13단) | 10 · 12 · 14 · 16 · 18 · 20 · 24 · 32 · 38 · 48 · 64 · 80 · 120px |
| lineHeight | 14 · 18 · 22 · 24 · 26 · 30 · 36 · 48 · 56 · 62 · 84 · 104 · 156px |
| fontWeight | 400 · 500 · 700 · 800 (**600 없음**) |
| letterSpacing | 0 · −0.1 · −0.2 · −0.3 · −0.4px (**px 단위 음수**, 배율 곱산 포함) |

- **자간이 em이 아니라 px**이고, 그마저 `--vapor-scale-factor`를 곱합니다 —
  배율 변수가 자간까지 지배하는 표본 유일 사례.
- 굵기에서 600(semibold)을 건너뜁니다 — 500 다음이 700입니다.

출처: `@vapor-ui/core@1.5.0` → `dist/styles/themes.css.ts.vanilla.css`

## 컴포넌트

패키지 구조에서 확인: badge, callout, field, multi-select, dialog 외 44개
디렉터리. CSS가 컴포넌트별 파일로 분리돼 있습니다.
→ 버튼·입력·다이얼로그는 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

`@vapor-ui/core@1.5.0` → `dist/components/*/{*.css.ts.vanilla.css,*.css.vanilla.js}`
(vanilla-extract 빌드 산출물 — CSS와 변형 매핑 JS가 분리돼 있어 둘을 대조)에서
실측했습니다. 동작 프리미티브는 **`@base-ui/react`** 입니다 — Radix가 아니라
Base UI(MUI 계열 headless)를 쓰는 코퍼스 첫 표본입니다.

### 버튼 — 4단 8px 계단, 3단이 같은 서체

| | sm | md | lg | xl |
|---|:--:|:--:|:--:|:--:|
| **height** | 24px | **32px** | 40px | 48px |
| 좌우 패딩 | 8px | 12px | 16px | 24px |
| gap | 4px | 6px | 8px | 8px |
| 서체 | 14/22 · 500 | 동일 | 동일 | **16/24 · 500** |
| 라운드 | 8px | 8px | 8px | 8px |

- **sm·md·lg 세 단이 같은 14px 서체**를 쓰고 xl만 16px로 오릅니다 —
  서체 단과 치수 단을 분리한 형태 (Backpack은 2단 모두 16px).
- 높이 24~48px의 **8px 등간격 4단** — 컨트롤 최소가 24px로 표본 최저급.
- 색 6종(primary·secondary·success·warning·danger·contrast) × 변형 3종
  (fill·outline·ghost)이 **`--button-*` CSS 변수 간접층**으로 조립됩니다 —
  MUI v9의 `--variant-*` 조립과 같은 구조.
- **outline 변형의 보더가 보더가 아니라 인셋 box-shadow 1px**입니다.
- disabled는 `opacity: 0.32`.

### hover가 색 교체가 아니라 상태층(state layer)입니다

```css
.interactions::before { background: var(--vapor-color-gray-900); opacity: 0; }
hover  → opacity: 0.08
active → opacity: 0.16   /* ×2 */
```

- **M3의 state layer 방식** — 모든 변형·색이 회색 오버레이 하나로 hover/active를
  만듭니다. 변형별 hover 색 토큰이 없습니다 (Skeleton은 같은 목표를
  brightness 필터로). 전환 150ms, 비율이 `0.08 × n` 산식입니다.
- focus-visible은 outline 2px + offset 2px, 입력 계열은 인셋 섀도 색 교체.

### 입력 (TextInput) — 버튼과 같은 4단·같은 패딩

| | sm | md | lg | xl |
|---|:--:|:--:|:--:|:--:|
| **height** | 24px | **32px** | 40px | 48px |
| 서체 | 12px | 14px | 14px | 16px |
| 좌우 패딩 | 8px | 12px | 16px | 24px |

- 버튼과 높이·패딩이 완전 정합 — 다만 서체는 sm에서 12px로 한 단 낮습니다.
- 윤곽이 **인셋 box-shadow 1px** (보더 아님), focus에서 primary 색으로 교체.
  readonly는 배경 gray-200, invalid는 danger, disabled 0.32 — 상태 4종이
  전부 변수 교체입니다.

### 다이얼로그 — 스크림 불투명도 = disabled 불투명도

| | md | lg | xl |
|---|:--:|:--:|:--:|
| **width** | **500px** | 800px | 1140px |

- 상한 `calc(100vw − 64px)` · 80svh. 라운드 8px, 그림자 `0 1rem 2rem rgba(0,0,0,.2)`.
- **스크림이 `black` + opacity 0.32** — disabled와 같은 0.32를 씁니다.
  0.32가 시스템 전역의 "감쇠 상수"로 보이는 표본입니다.
- 진입 scale 0.9→1 + 페이드 **150ms `cubic-bezier(.45, 1.005, 0, 1.005)`** —
  제어점이 1을 넘는 **오버슈트 곡선**입니다 (Backpack·MUI의 표준 곡선 진영과
  다름). 상태는 Base UI의 `[data-starting-style]`/`[data-ending-style]`.
- 헤더가 패딩이 아니라 **고정 높이 56px**(dimension-700)입니다. 좌우 24px,
  제목 18px·700, 본문 14px·400.

### 라운드 사용 분포 — 스케일 11단, 실사용은 사실상 1값

컴포넌트 CSS 전수 grep: `borderRadius-300`(8px) **37회** vs 400(12px) 3회 ·
200(6px) 2회 · 100(4px) 1회. 버튼·입력·다이얼로그·메뉴가 전부 8px입니다 —
**11단 스케일을 배포하고 한 값만 쓰는** 토큰-사용 괴리 표본 (Shoelace의
"컨트롤 전부 4px"과 같은 패턴).

### 특징적 결정 (심화분)

- **Base UI 프리미티브** — Radix 독점 구도 이탈, 코퍼스 첫 표본
- **버튼·입력 24/32/40/48px 완전 정합** — 8px 등간격, 최소 24px
- **state layer hover (gray-900 α0.08/0.16)** — M3 방식의 무토큰 상태색
- **0.32 감쇠 상수** — disabled와 스크림이 같은 값
- **오버슈트 이징의 다이얼로그 진입** + 헤더 고정 높이 56px
- **라운드 실사용 8px 단일 수렴** — 스케일 11단과 괴리

## 특징적 결정

- **전역 배율 변수를 씁니다.** `--vapor-scale-factor` 하나로 UI 전체 밀도를 조정할 수 있습니다.
  Cloudscape가 `scaled`/`static` 두 벌의 토큰으로 밀도를 다룬 것과 달리,
  Vapor는 **런타임 CSS 변수로** 해결합니다.

  > **정정.** 처음 이 항목을 쓸 때 "수집한 시스템 중 이 방식은 Vapor가 유일합니다"라고
  > 적었습니다. **틀렸습니다.** 표본을 34개로 늘린 뒤 Mantine(`--mantine-scale`) ·
  > Radix Themes(`--scaling` · `--radius-factor`) · shadcn/ui(`--radius` 기준값)가
  > 같은 방식을 쓰는 것이 확인됐습니다. 프레임워크 계열에서는 **표준적인 방식**입니다.
  >
  > Vapor가 여전히 갈리는 지점은 **배율을 치수와 라운드로 분리한 것**인데,
  > 이것도 Radix Themes가 같습니다 (`--scaling` / `--radius-factor`).
  > 비교표는 `tokens/scales.md`의 "런타임 배율 — 4개 시스템으로 늘었습니다"에 있습니다.
- **라운드 배율이 분리돼 있습니다.** 브랜드 톤(각진 느낌 ↔ 둥근 느낌)을
  여백과 독립적으로 바꿀 수 있습니다.
- **토큰 이름이 `dimension`입니다.** `space`나 `size`가 아닙니다.
- **14px·18px이 스케일에 있습니다.** 짝수 2px 단위를 12~20 구간에서 유지합니다.
- **`calc()` 의존.** 모든 값이 런타임 계산이라, 토큰 파일만 읽어서는 최종 px을 알 수 없습니다.
  위 표는 배율 1을 가정한 값입니다.

## 접근성

~~미확인.~~ → **해소 (2026-08-18, 헤드리스 렌더).**

문서의 "Design Principles" 6개 원칙 중 **2번이 접근성**이고, 목표를 명시합니다 —
"Vapor UI는 **Base UI**를 기반으로 **WCAG 2.2 AA를 준수**합니다."

코퍼스에서 **2.2 AA를 목표로 잡은 두 번째 사례**입니다 (Backpack과 동급, 최신 기준).
구현 방식이 세 갈래로 문서화돼 있습니다:

| 축 | 내용 |
|------|------|
| Base UI 통합 | ARIA 속성 · 키보드 내비게이션 · 스크린리더를 **헤드리스 라이브러리에 위임** |
| 색상 대비 | 자체 개발 **Color Generator**가 **WCAG AA/AAA 대비 비율을 보장** |
| 토큰 | 수학적 비율로 생성한 토큰으로 시각적 위계 일관성 확보 |

**대비 준수를 문서 규칙이 아니라 색 생성기(코드)로 강제**하는 접근이 특징입니다.
`@vapor-ui/color-generator`가 별도 패키지로 배포되며,
npm 설명에 "WCAG-compliant color palette generator built on **Adobe Leonardo**"라고 적혀 있습니다.
포커스 표시와 키보드 내비게이션은 기본 지원으로 명시됩니다.

출처: https://vapor-ui.goorm.io/docs/getting-started/principles (렌더 확인, 2026-08-18)

## 참고

- 패키지: `@vapor-ui/core` · `@vapor-ui/hooks` · `@vapor-ui/icons` ·
  `@vapor-ui/codemod` · `@vapor-ui/color-generator` · `@vapor-ui/css-generator`
- ~~공식 문서 URL·저장소를 확인하지 못했습니다.~~ (2026-08-18 해소 —
  패키지 `package.json`에 저장소 **github.com/goorm-dev/vapor-ui** ·
  라이선스 **MIT** 명기) — frontmatter 반영 (2026-08-18)
- **문서 사이트 URL 해소 (2026-08-18, `url` frontmatter 반영):**
  **https://vapor-ui.goorm.io** — 저장소 README의 "Links → Documentation" 항목과
  로고 링크가 이 주소를 가리키며, `https://vapor-ui.goorm.io/sitemap.xml`이
  `/docs/getting-started/*` · `/docs/components/*` · `/theme/playground` 등
  전체 경로를 반환하는 것으로 실제 문서 사이트임을 확인했습니다.
  (npm `homepage` 필드는 문서가 아니라 저장소 URL을 가리켜, 그것만으로는 찾을 수 없었습니다.)
  출처: https://raw.githubusercontent.com/goorm-dev/vapor-ui/main/README.md
- **Figma 킷 (2026-08-18 해소 — `figma_kit: true`)**:
  **Figma Community에 공개**돼 있습니다 —
  https://www.figma.com/community/file/1508829832204351721/vapor-design-system
  저장소에도 `figma-plugin` · `figma-codegen-plugin` · `@repo/sync-figma`
  워크스페이스와 `sync-figma` · `sync-icons:basic` · `sync-icons:symbol`
  스크립트가 있어, **Figma ↔ 코드 아이콘/토큰 동기화를 파이프라인으로 운영**합니다.
  출처: https://vapor-ui.goorm.io/docs/getting-started/principles (렌더 확인) ·
  https://raw.githubusercontent.com/goorm-dev/vapor-ui/main/package.json (2026-08-18)
- 컴포넌트 심화: `@vapor-ui/core@1.5.0` → `dist/components/{button,text-input,dialog}/`
  + `dist/styles/mixins/interactions.css.ts.vanilla.css` (2026-08-18)
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github goorm-dev/vapor-ui → `LICENSE` (npm `@vapor-ui/core@1.5.0` 메타와 일치)
