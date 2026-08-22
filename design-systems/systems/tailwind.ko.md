---
name: Tailwind CSS
org: Tailwind Labs
coverage: full
url: https://tailwindcss.com
repo: https://github.com/tailwindlabs/tailwindcss
license: MIT
tech: [CSS]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "npm tailwindcss@4.3.3 → theme.css (459줄, CSS 변수 전체)"
---
<!-- lang-links -->
> [English](tailwind.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

유틸리티 클래스 CSS 프레임워크. v4부터 **테마 전체가 CSS 변수 한 파일**(`theme.css`)이며,
컴포넌트를 제공하지 않고 **토큰 레이어만** 제공합니다.

> **분류 메모.** 이 코퍼스의 다른 항목은 회사가 자기 제품을 위해 만든 디자인시스템입니다.
> Tailwind는 제품이 없는 **프레임워크**이므로 `domain: framework`로 표기합니다
> (`SCHEMA.md` 참조). 아래 shadcn/ui · Mantine · Radix Themes도 같습니다.

## 토큰

### 스페이싱 — 표본에서 유일하게 스케일을 열거하지 않습니다

```css
--spacing: 0.25rem;   /* 4px. 이것뿐입니다 */
```

**단계가 없습니다.** `p-3`은 `calc(var(--spacing) * 3)` = 12px로 **곱셈으로 생성**됩니다.
정수 배수뿐 아니라 `p-1.5`(6px) · `p-2.5`(10px)처럼 소수도 유효합니다.

| 방식 | 시스템 |
|------|--------|
| 단계를 열거 | 표본의 나머지 전부 |
| **base 하나 + 곱셈** | **Tailwind v4** |

Ant Design이 `sizeUnit`·`sizeStep`에서 스케일을 **파생**시키는 것과 다릅니다 —
Ant은 파생 결과를 유한한 토큰 목록으로 내보내고, Tailwind는 **목록 자체를 만들지 않습니다.**

**실무 영향:** 디자인 도구에 스케일을 옮길 대상이 없습니다. Figma Variables로
내보내려면 쓸 단계를 직접 골라 열거해야 합니다.

### 타이포그래피

크기와 행간이 **쌍으로 묶여** 있습니다 (`--text-*` + `--text-*--line-height`).

| 토큰 | 크기 | 행간 정의 | 계산값 |
|------|:---:|-----------|:---:|
| `xs` | 0.75rem (12) | `calc(1 / 0.75)` | 1.333 (16px) |
| `sm` | 0.875rem (14) | `calc(1.25 / 0.875)` | 1.429 (20px) |
| `base` | 1rem (16) | `calc(1.5 / 1)` | 1.5 (24px) |
| `lg` | 1.125rem (18) | `calc(1.75 / 1.125)` | 1.556 (28px) |
| `xl` | 1.25rem (20) | `calc(1.75 / 1.25)` | 1.4 (28px) |
| `2xl` | 1.5rem (24) | `calc(2 / 1.5)` | 1.333 (32px) |
| `3xl` | 1.875rem (30) | `calc(2.25 / 1.875)` | 1.2 (36px) |
| `4xl` | 2.25rem (36) | `calc(2.5 / 2.25)` | 1.111 (40px) |
| `5xl` | 3rem (48) | `1` | 1 |
| `6xl` | 3.75rem (60) | `1` | 1 |
| `7xl` | 4.5rem (72) | `1` | 1 |
| `8xl` | 6rem (96) | `1` | 1 |
| `9xl` | 8rem (128) | `1` | 1 |

**행간을 비율로 적었지만 원본 의도는 px 값입니다.** `calc(1.25 / 0.875)`의
분자 `1.25rem`이 20px입니다 — **px 행간을 비율로 환산해 넣은 형태**입니다.
`5xl` 이상은 전부 `1`입니다.

행간 자체를 독립적으로 지정하는 토큰도 별도로 있습니다.

| 토큰 | 값 |
|------|:---:|
| `--leading-tight` | 1.25 |
| `--leading-snug` | 1.375 |
| `--leading-normal` | 1.5 |
| `--leading-relaxed` | 1.625 |
| `--leading-loose` | 2 |

자간 — `em` 단위, 0 기준 양쪽 3단계:

| 토큰 | 값 |
|------|:---:|
| `tighter` | -0.05em |
| `tight` | -0.025em |
| `normal` | 0em |
| `wide` | 0.025em |
| `wider` | 0.05em |
| `widest` | 0.1em |

**0 양쪽으로 대칭 3단계입니다.** Backpack·Seed Design이 음수만 두는 것과 다릅니다
(`patterns/typography.md`).

굵기 9단계: 100 · 200 · 300 · 400 · 500 · 600 · 700 · 800 · 900.
`--font-weight-thin`부터 `--font-weight-black`까지 100 단위 전부입니다.

### 컬러 — 286개, 26색 × 11단계

| 계열 | |
|------|--|
| 무채 | `gray` · `slate` · `zinc` · `neutral` · `stone` · **`mauve`** · **`mist`** · **`olive`** · **`taupe`** |
| 유채 | `red` · `orange` · `amber` · `yellow` · `lime` · `green` · `emerald` · `teal` · `cyan` · `sky` · `blue` · `indigo` · `violet` · `purple` · `fuchsia` · `pink` · `rose` |

단계는 `50 · 100 · 200 … 900 · 950` **11단계**이며 26색 전부 동일합니다.
여기에 `--color-black` · `--color-white`가 더해져 총 288개입니다.

**`mauve` · `mist` · `olive` · `taupe`가 무채 계열에 있습니다.** 표본의 다른 시스템은
회색 계열을 1~2종만 둡니다. Tailwind는 9종입니다.

**시맨틱 계층이 없습니다.** `text-primary` · `surface` 같은 용도 토큰이 없고 원시 색만
제공합니다. 용도 계층은 사용자가 만들어야 합니다 — shadcn/ui가 하는 일이 정확히 이것입니다.

### 라운드

| 토큰 | 값 |
|------|:---:|
| `xs` | 0.125rem (2) |
| `sm` | 0.25rem (4) |
| `md` | 0.375rem (6) |
| `lg` | 0.5rem (8) |
| `xl` | 0.75rem (12) |
| `2xl` | 1rem (16) |
| `3xl` | 1.5rem (24) |
| `4xl` | 2rem (32) |

`--radius: 0.25rem`(4px)이 접미사 없는 기본값으로 별도로 있습니다.

### 브레이크포인트 · 컨테이너

브레이크포인트 5단계, **`rem` 단위**입니다.

| 토큰 | 값 | px (16px 기준) |
|------|:---:|:---:|
| `sm` | 40rem | 640 |
| `md` | 48rem | 768 |
| `lg` | 64rem | 1024 |
| `xl` | 80rem | 1280 |
| `2xl` | 96rem | 1536 |

컨테이너 최대폭 13단계 — `3xs` 16rem부터 `7xl` 80rem까지.
`3xs · 2xs · xs · sm · md · lg · xl · 2xl · 3xl · 4xl · 5xl · 6xl · 7xl`.

**브레이크포인트와 컨테이너가 별도 계열입니다.** `xl` 브레이크포인트(80rem)와
`7xl` 컨테이너(80rem)가 같은 값이지만 다른 이름입니다.

### 그 외 토큰 계열

| 계열 | 단계 | 값 |
|------|:---:|------|
| `--blur-*` | 7 | 4 · 8 · 12 · 16 · 24 · 40 · 64px |
| `--shadow-*` | 9 | 미기재 (복합 값) |
| `--ease-*` | 3 | `in` · `out` · `in-out` (cubic-bezier) |
| `--animate-*` | 4 | `spin` · `ping` · `pulse` · `bounce` |
| **`--perspective-*`** | **5** | `dramatic` 100 · `near` 300 · `normal` 500 · `midrange` 800 · `distant` 1200px |
| `--text-shadow-*` | 5 | `2xs` ~ `lg` |
| `--default-transition-duration` | 1 | 150ms |

**`--perspective-*`가 토큰입니다.** 3D 원근 거리를 이름 붙은 단계로 두는 것은
표본에서 Tailwind뿐입니다.

전역 전환 기본값이 토큰입니다 — `150ms` / `cubic-bezier(0.4, 0, 0.2, 1)`.

## 컴포넌트

**없습니다.** 유틸리티 클래스와 토큰만 제공합니다.

## 특징적 결정

- **스페이싱을 열거하지 않습니다.** `--spacing: 0.25rem` 하나에서 곱셈으로 생성합니다.
  표본 34개 중 유일합니다.
- **시맨틱 컬러 계층이 없습니다.** 원시 색 286개만 있습니다. 다른 시스템이
  `scale/` + `semantic/` 2계층을 두는 자리에 Tailwind는 1계층만 둡니다.
- **무채 계열이 9종입니다.** `mauve` · `mist` · `olive` · `taupe`가 여기 포함됩니다.
- **행간을 크기 토큰에 붙입니다.** `--text-sm--line-height` — 이중 하이픈으로
  토큰의 하위 속성을 표현합니다. 표본에서 이 표기는 Tailwind뿐입니다.
- **`rem` 브레이크포인트.** 대부분은 px입니다. 사용자 글자 크기 설정에 브레이크포인트가
  반응합니다.
- **`--perspective-*` · `--text-shadow-*` 같은 계열이 토큰입니다.** 토큰화 범위가
  다른 시스템보다 넓습니다.
- **런타임 배율 변수는 없습니다.** Mantine·Radix Themes·Vapor UI가 쓰는
  `calc(var(--scale) * N)` 방식이 아닙니다. 대신 `--spacing` 자체를 바꾸면
  스페이싱 전체가 따라 움직이므로, 결과적으로 같은 조정이 가능합니다.

## 접근성

토큰·CSS 레벨의 접근성 목표는 파일에 없습니다. 컴포넌트가 없으므로
ARIA·포커스 관리는 범위 밖입니다.

## 참고

- **Figma 킷 (false) 근거:** 공식 정책상 미제작 — "Figma·Sketch·Adobe XD 파일은 포함되지 않는다" 명문, 2026-08-18 확인

- 문서: https://tailwindcss.com
- 토큰 전문: `npm pack tailwindcss@4.3.3` → `package/theme.css`
- 저장소: https://github.com/tailwindlabs/tailwindcss
- **수집 방법:** `theme.css` 한 파일에 전체 테마가 들어 있습니다.
  문서 사이트를 열지 않고 토큰 전체를 확인할 수 있는 몇 안 되는 경우입니다.
- **Figma 킷 부재 확정 (2026-08-18):** `figma_kit: false` — 출처
  <https://tailwindcss.com/plus> FAQ의 Compatibility 항목. 질문과 답이
  그대로 실려 있습니다 — "**Figma, Sketch, Adobe XD 파일이 포함되나요?**
  아니요. Figma·Sketch·Adobe XD 같은 도구용 디자인 자산은 포함되지
  않습니다. **우리는 우리 자신의 디자인·개발 과정에서 고품질 디자인
  산출물을 만들지 않기 때문에**, 이런 부가 리소스를 만들면 새 컴포넌트와
  템플릿을 만드는 데 쓸 시간이 줄어듭니다."
  즉 **"아직 없다"가 아니라 만들지 않겠다는 정책 선언**이며, 표본에서
  Figma 킷 부재를 이렇게 명문으로 밝힌 유일 사례입니다. 유료 상품
  `Tailwind Plus`가 파는 것은 **코드**(UI Blocks · Templates · Catalyst
  React UI 킷)뿐입니다
- **정적 사이트 확인 (2026-08-18):** `tailwindcss.com`은 SSR HTML에 본문이
  모두 들어 있어 헤드리스 렌더가 필요 없습니다 (`/plus` 210KB · `/plus/
  ui-blocks` 256KB, 스크립트 제거 후 본문 정상 추출)
