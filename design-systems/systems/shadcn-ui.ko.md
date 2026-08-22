---
name: shadcn/ui
org: shadcn (개인)
coverage: full
url: https://ui.shadcn.com
repo: https://github.com/shadcn-ui/ui
license: MIT
tech: [React]
figma_kit: false
tokens_format: [CSS]
a11y_target: null
platform: web
domain: framework
verified: 2026-08-18
source: "GitHub raw — apps/v4/app/globals.css, apps/v4/registry/new-york-v4/ui/*.tsx, apps/v4/registry/__index__.tsx · npm sonner@2.0.8 → dist/index.mjs·styles.css (토스트 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](shadcn-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**패키지가 아니라 소스 코드를 복사해 쓰는** 컴포넌트 모음.
Tailwind 토큰 위에 **시맨틱 컬러 계층과 컴포넌트 61종**을 올립니다.

## 배포 방식 — 표본에서 유일합니다

npm 의존성으로 설치하지 않습니다. CLI가 **컴포넌트 `.tsx` 파일을 프로젝트에 복사**합니다.

| 방식 | 시스템 |
|------|--------|
| npm 패키지 | 표본의 나머지 전부 |
| **소스 복사** | **shadcn/ui** |

**결과:** 버전 업그레이드가 없습니다. 복사된 코드는 프로젝트 소유이며 직접 수정합니다.
토큰도 프로젝트의 CSS 파일에 들어가므로, **원본 저장소의 값은 초기값일 뿐입니다.**

이 항목의 값은 공식 저장소(`apps/v4`)의 현재 상태이며,
실제 프로젝트의 값과 다를 수 있습니다.

## 토큰

### 컬러 — 전부 OKLCH

```css
--background: oklch(1 0 0);
--foreground: oklch(0% 0 0);
--destructive: oklch(0.577 0.245 27.325);
--border: oklch(1 0 0 / 10%);      /* .dark — 알파를 % 로 */
```

**표본에서 색을 OKLCH로만 정의하는 것은 shadcn/ui뿐입니다.**
나머지는 헥스 또는 `rgba()`입니다. Radix Themes가 `color-mix(in oklab, …)`을
그림자 계산에 쓰지만 색 정의 자체는 헥스·P3입니다.

### `-foreground` 짝 규칙

거의 모든 색 토큰이 **배경/전경 쌍**으로 존재합니다.

| 배경 | 전경 |
|------|------|
| `--background` | `--foreground` |
| `--card` | `--card-foreground` |
| `--popover` | `--popover-foreground` |
| `--primary` | `--primary-foreground` |
| `--secondary` | `--secondary-foreground` |
| `--muted` | `--muted-foreground` |
| `--accent` | `--accent-foreground` |
| `--destructive` | `--destructive-foreground` |
| `--sidebar` | `--sidebar-foreground` |
| `--surface` | `--surface-foreground` |
| `--code` | `--code-foreground` |
| `--selection` | `--selection-foreground` |

**Material 3의 `Primary` / `On Primary` 쌍과 같은 구조**입니다
(`patterns/color.md`). 이름만 `On X` → `X-foreground`로 다릅니다.

짝이 없는 단독 토큰: `--border` · `--input` · `--ring` · `--chart-1..5` ·
`--code-highlight` · `--code-number`.

### 용도별 계열

| 계열 | 토큰 |
|------|------|
| 표면 | `background` · `card` · `popover` · `surface` |
| 강조 | `primary` · `secondary` · `accent` · `muted` |
| 상태 | `destructive` |
| **사이드바 전용** | `sidebar` · `sidebar-primary` · `sidebar-accent` · `sidebar-border` · `sidebar-ring` **7개** |
| **코드 블록 전용** | `code` · `code-foreground` · `code-highlight` · `code-number` **4개** |
| 차트 | `chart-1` ~ `chart-5` |
| 선택 영역 | `selection` · `selection-foreground` |
| 폼·포커스 | `border` · `input` · `ring` |

**사이드바에 7개 토큰 계열을 따로 둡니다.** 표본에서 특정 레이아웃 영역에
전용 컬러 계열을 두는 것은 shadcn/ui뿐입니다.

**차트 색이 Tailwind 팔레트 참조입니다** — `--chart-1: var(--color-blue-300)`.
5단계 전부 `blue`의 300 · 500 · 600 · 700 · 800입니다. **단색 명도 램프**이며,
Atlassian이 차트에 100개 토큰(색상 구분 포함)을 두는 것과 방향이 다릅니다.

`success` · `warning` · `info` 토큰이 **없습니다.** 상태색은 `destructive` 하나뿐입니다.

### 라운드 — 단일 base × 배율

```css
--radius: 0.625rem;                      /* 10px */
--radius-sm: calc(var(--radius) * 0.6);  /* 6px */
--radius-md: calc(var(--radius) * 0.8);  /* 8px */
--radius-lg: var(--radius);              /* 10px */
--radius-xl: calc(var(--radius) * 1.4);  /* 14px */
--radius-2xl: calc(var(--radius) * 1.8); /* 18px */
--radius-3xl: calc(var(--radius) * 2.2); /* 22px */
--radius-4xl: calc(var(--radius) * 2.6); /* 26px */
```

**Tailwind 기본 라운드 스케일(2/4/6/8/12/16/24/32)을 덮어씁니다.**
`--radius` 하나를 바꾸면 8단계가 함께 움직입니다.

배율이 `0.6 · 0.8 · 1 · 1.4 · 1.8 · 2.2 · 2.6`이므로 **`lg` 위쪽은 0.4 등차**이고
`sm`~`lg`는 0.2 등차입니다. 기준값 10px에서는 6/8/10/14/18/22/26 — **정수 단계입니다.**

Vapor UI의 `--vapor-radius-factor`, Radix Themes의 `--radius-factor`와 목적이 같지만,
shadcn/ui는 **배수가 아니라 기준값 자체를 변수로** 둡니다.

### 스페이싱 · 타이포그래피

**자체 토큰이 없습니다.** Tailwind v4의 `--spacing` · `--text-*`를 그대로 씁니다.

추가하는 것은 브레이크포인트 2단계와 서체 슬롯입니다.

| 토큰 | 값 |
|------|:---:|
| `--breakpoint-3xl` | 1600px |
| `--breakpoint-4xl` | 2000px |
| `--font-sans` · `--font-heading` · `--font-mono` | 프로젝트 주입 |

**`3xl`·`4xl`은 px입니다** — Tailwind 기본 5단계가 `rem`인데 여기서 단위가 갈립니다.

`--font-ar` · `--font-he`가 `[data-lang]` 선택자로 연결돼 있습니다 —
아랍어·히브리어에 별도 서체를 적용합니다. **표본에서 언어별 서체 스위치를
토큰 레이어에 둔 것은 shadcn/ui뿐입니다.**

### 스타일 변형 — 8종 × 3 베이스

`globals.css`가 24개 디렉터리를 소스로 잡습니다.

| 축 | 값 |
|----|-----|
| 스타일 | `luma` · `lyra` · `maia` · `mira` · `nova` · `rhea` · `sera` · `vega` (8) |
| 베이스 | `base` · `aria` · `radix` (3) |

`@custom-variant style-vega (&:where(.style-vega *))` 형태로 8개 스타일이
CSS 변형으로 선언됩니다. 베이스는 프리미티브 출처입니다 —
`radix`는 Radix Primitives(`radix-ui`), `aria`는 React Aria
(`react-aria-components`), `base`는 Base UI(`@base-ui/react`)입니다.

**한 시스템이 프리미티브 라이브러리 3종을 병렬로 지원합니다.**
두 축이 직교합니다 — **스타일은 시각 토큰만, 베이스는 동작 계층만** 바꿉니다.

### 8개 스타일의 실제 토큰 차이

`apps/v4/styles/`의 24개 디렉터리는 **빌드 산출물이고 gitignore 대상**입니다
(디렉터리에 README만 있음). 소스는 `apps/v4/registry/styles/style-*.css`
8개 파일(각 ~74KB, 규칙 417~423개)입니다. 토큰이 별도 파일이 아니라
Tailwind 임의값 문법으로 클래스 안에 박혀 있습니다 —
`[--card-spacing:--spacing(6)]` · `[--cell-radius:var(--radius-4xl)]`.

공식 설명(`styles.tsx`)과 실측값:

| 스타일 | 공식 설명 | 기본 라운드 | 버튼 default 높이 | 버튼 서체 | Card 패딩 |
|--------|-----------|:---:|:---:|---|:---:|
| `vega` | Clean, neutral, and familiar | `md` | **36 (h-9)** | text-sm medium | 24/16 |
| `nova` | Reduced padding and margins | `lg` | 32 | text-sm medium | 12 |
| `maia` | Rounded, with generous spacing | **`4xl`** | 36 | text-sm medium | 24/16 |
| `lyra` | Boxy and sharp. For mono fonts | **`none`** | 32 | **text-xs** medium | 16/12 |
| `mira` | Made for compact interfaces | `md` | **28 (h-7)** | text-xs/relaxed | 16/12 |
| `luma` | Fluid, luminous, and soft | **`4xl`** | 36 | text-sm medium | 24/16 |
| `sera` | Editorial and typographic | **`none`** | **40 (h-10)** | **text-xs semibold tracking-widest** | 32/20 |
| `rhea` | Like Luma but compact | `2xl` | 32 | text-sm medium | 20/16 |

(Card 패딩은 `--card-spacing` 기본/축소 두 값 × 4px. 버튼 높이 전체 스케일은
스타일별로 통째로 이동합니다 — `mira` 20/24/28/32, `sera` 28/36/40/44.)

**같은 컴포넌트 코드에서 "기본 버튼"이 28px(`mira`)부터 40px(`sera`)까지
갈라집니다** — 코퍼스의 시스템 간 분포(28~48px)가 한 시스템 안에 재현된
유일한 사례입니다. 읽어낼 수 있는 구조:

- **radius 전략이 3갈래**: 알약형(`luma`·`maia` 4xl) / 중간(`vega`·`mira` md,
  `nova` lg, `rhea` 2xl) / 직각(`lyra`·`sera` 0). `sera`는 `[--radius]:0`으로
  기준값 자체를 0으로 놓습니다 — 배율 7개가 전부 0이 됩니다.
- **`min()` 클램프 라운드**: `vega`·`nova`의 작은 버튼이
  `rounded-[min(var(--radius-md),8px)]` — 사용자가 `--radius`를 키워도
  소형 컴포넌트는 8px에서 멈춥니다. **크기별 라운드 상한**이라는 기법.
- **정체성을 서체로 만드는 스타일**: `sera`는 12px semibold + `tracking-widest`
  (자간 0.1em) — 크기가 가장 크면서 글자는 가장 작은 편집디자인 문법.
  `lyra`는 모노스페이스 전제로 직각 + text-xs.
- **쌍 관계가 공식화**돼 있습니다: `rhea`는 설명부터 "Like Luma but compact"
  이고 실측도 luma에서 높이 −4px·radius 한 단계 축소입니다. `luma`·`maia`는
  수치가 거의 같고 `luma`만 Drawer 중첩 그림자(`--drawer-stacked-shadow`)를
  가집니다.
- Calendar 셀도 같은 방향: `--cell-size`가 `mira` 24 / `lyra`·`nova` 28 /
  나머지 32, `--cell-radius`가 4xl(`luma`·`maia`)→0(`sera`).
- 누름 피드백 `active:translate-y-px`(1px 하강)는 8개 스타일 공통 —
  스타일이 갈라도 **상태 문법은 공유**합니다.

## 컴포넌트

**61종** (`registry/new-york-v4/ui`):

accordion · alert · alert-dialog · aspect-ratio · attachment · avatar · badge ·
breadcrumb · bubble · button · button-group · calendar · card · carousel · chart ·
checkbox · collapsible · combobox · command · context-menu · dialog · direction ·
drawer · dropdown-menu · empty · field · form · hover-card · input · input-group ·
input-otp · item · kbd · label · marker · menubar · message · message-scroller ·
native-select · navigation-menu · pagination · popover · progress · radio-group ·
resizable · scroll-area · select · separator · sheet · sidebar · skeleton · slider ·
sonner · spinner · switch · table · tabs · textarea · toggle · toggle-group · tooltip

`message` · `message-scroller` · `bubble` · `attachment` · `marker`는
채팅·AI 인터페이스용입니다.

## 특징적 결정

- **소스 복사 배포.** npm 패키지가 아닙니다. 버전 개념이 없고 업그레이드 경로도 없습니다.
- **컬러를 OKLCH로만 정의합니다.** 표본에서 유일합니다.
- **`-foreground` 짝 규칙.** Material 3의 `On X`와 같은 구조를 CSS 변수 이름으로 옮겼습니다.
- **`--radius` 기준값 하나 + 배율 7개.** 라운드 톤을 한 값으로 조정합니다.
- **사이드바·코드블록에 전용 컬러 계열.** 표본에서 레이아웃 영역별 색 계열을 두는 유일한 사례입니다.
- **상태색이 `destructive` 하나뿐입니다.** `success`·`warning`이 없습니다.
- **포커스링이 3px입니다.** 표본 다수는 2px입니다 (아래 참조).
- **`aria-invalid` 속성으로 에러 상태를 표현합니다.** `error` prop이 아니라 ARIA 속성이
  스타일 훅입니다 — 모든 폼 컨트롤에 `aria-invalid:border-destructive`가 들어 있습니다.
- **모든 컴포넌트에 `data-slot` 속성이 있습니다.** 외부에서 내부 요소를 선택자로 잡을 수 있습니다.
- **프리미티브 3종 병렬 지원** (Radix Primitives · React Aria · 자체 base).
- **언어별 서체 토큰** (`--font-ar` · `--font-he`).

## 컴포넌트 상세

값은 Tailwind 클래스에서 읽은 것이며, `--spacing: 0.25rem` 기준 px입니다.

### Button

| 변형 | 높이 | 좌우 패딩 | 텍스트 | 라운드 |
|------|:---:|:---:|:---:|:---:|
| `xs` | 24 (h-6) | 8 (px-2) | 12 (text-xs) | `md` |
| `sm` | 32 (h-8) | 12 (px-3) | 14 (text-sm) | `md` |
| **`default`** | **36 (h-9)** | **16 (px-4)** | 14 | `md` |
| `lg` | 40 (h-10) | 24 (px-6) | 14 | `md` |
| `icon` | 36 × 36 | — | — | `md` |
| `icon-xs` | 24 × 24 | — | — | `md` |
| `icon-sm` | 32 × 32 | — | — | `md` |
| `icon-lg` | 40 × 40 | — | — | `md` |

높이가 **24 / 32 / 36 / 40** — 8 등차가 아니라 `sm`→`default`가 4px입니다.

**아이콘이 있으면 패딩이 줄어듭니다:** `has-[>svg]:px-3` — `default`의 16px이 12px이 됩니다.
`xs`는 8→6, `sm`은 12→10, `lg`는 24→16. **CSS `:has()`로 조건부 패딩을 구현합니다.**

아이콘 크기: 기본 16 (`size-4`), `xs`·`icon-xs`만 12 (`size-3`).

시각 변형 6종: `default`(채움) · `destructive` · `outline` · `secondary` · `ghost` · `link`.

| 상태 | 처리 |
|------|------|
| hover | 배경 알파 90% (`bg-primary/90`), `ghost`는 `accent` 배경 |
| focus-visible | `border-ring` + `ring-[3px] ring-ring/50` |
| disabled | `pointer-events-none` + `opacity-50` |
| **active (모바일)** | `active:opacity-60 md:opacity-100` — **md 이상에서는 없음** |
| aria-invalid | `border-destructive` + `ring-destructive/20` (다크 40%) |

**`active` 상태가 모바일에만 적용됩니다.** `md` 브레이크포인트 이상에서 해제됩니다.
표본에서 뷰포트에 따라 상태 스타일을 끄는 사례는 이것뿐입니다.

### Input

| 항목 | 값 |
|------|:---:|
| 높이 | 36 (`h-9`) |
| 좌우 패딩 | 12 (`px-3`) |
| 상하 패딩 | 4 (`py-1`) |
| 라운드 | `md` (8px) |
| 텍스트 | **16 (`text-base`) → `md` 이상 14 (`md:text-sm`)** |
| 그림자 | `shadow-xs` |
| 포커스 | `border-ring` + `ring-[3px] ring-ring/50` |

**모바일에서 본문 16px, 데스크톱에서 14px입니다.** iOS Safari는 16px 미만 입력 필드에서
자동 확대가 발생하므로, 이 분기가 그 동작과 관련됩니다 —
다만 **소스에 그 이유는 적혀 있지 않습니다.**

`file:` 셀렉터로 파일 입력 버튼을 별도 스타일링합니다 (`file:h-7` = 28px).

### Select

| 항목 | 값 |
|------|:---:|
| 트리거 높이 (`default`) | 36 (`data-[size=default]:h-9`) |
| 트리거 높이 (`sm`) | 32 (`data-[size=sm]:h-8`) |
| 트리거 패딩 | 12 / 8 (`px-3 py-2`) |
| 콘텐츠 최소 너비 | 128 (`min-w-[8rem]`) |
| 콘텐츠 최대 높이 | `--radix-select-content-available-height` (런타임) |
| 항목 패딩 | 좌 8 / 우 32 / 상하 6 (`pl-2 pr-8 py-1.5`) |
| 라벨 | `px-2 py-1.5 text-xs` |
| 체크 아이콘 영역 | 14 (`size-3.5`), 우측 8 |

**항목의 우측 패딩(32)이 좌측(8)의 4배입니다** — 체크 표시 자리입니다.

방향별 진입 애니메이션: `data-[side=bottom]:slide-in-from-top-2` (8px 이동) 등 4방향.

### Dialog

| 항목 | 값 |
|------|:---:|
| 위치 | `fixed top-[50%] left-[50%]` + `translate-[-50%]` |
| 너비 | `w-full max-w-[calc(100%-2rem)]` → `sm:max-w-lg` (512) |
| 내부 패딩 | 24 (`p-6`) |
| 요소 간격 | 16 (`gap-4`) |
| 라운드 | `lg` (10px) |
| 그림자 | `shadow-lg` |
| 애니메이션 | fade 0↔100 + zoom 95↔100, `duration-200` |
| 닫기 버튼 | 우상단 16/16 (`top-4 right-4`), 아이콘 16 |

**모바일에서 좌우 16px씩 여백을 남깁니다** (`max-w-[calc(100%-2rem)]`).
`sm`(640px) 이상에서 512px 고정으로 전환됩니다.

푸터가 **모바일에서 역순 세로 배치**입니다 — `flex-col-reverse` → `sm:flex-row sm:justify-end`.
주요 액션이 모바일에서 위로 올라갑니다.

**닫기 버튼의 포커스링만 다릅니다** — `focus:ring-2 focus:ring-offset-2`.
다른 컨트롤은 `ring-[3px]`에 offset이 없습니다.

### Table

| 요소 | 값 |
|------|:---:|
| 텍스트 | 14 (`text-sm`) |
| 헤더 셀 높이 | 40 (`h-10`) |
| 셀 좌우 패딩 | 8 (`px-2`) |
| 헤더 굵기 | 500 (`font-medium`) |
| 캡션 | `text-sm text-muted-foreground`, 상단 여백 16 |
| 캡션 위치 | `caption-bottom` |

**체크박스가 든 셀은 우측 패딩을 없애고 체크박스를 2px 내립니다** —
`[&:has([role=checkbox])]:pr-0` + `[&>[role=checkbox]]:translate-y-[2px]`.
`:has()`로 셀 내용에 따라 패딩을 바꿉니다.

### Checkbox · Badge

| 컴포넌트 | 크기 | 라운드 | 기타 |
|----------|:---:|:---:|------|
| Checkbox | 16 (`size-4`) | **`rounded-[4px]`** | 체크 아이콘 14 (`size-3.5`) |
| Badge | 높이 자동 | `rounded-full` | `px-2 py-0.5`, `text-xs`, 아이콘 12 |

**Checkbox만 라운드를 토큰이 아닌 리터럴 `4px`로 씁니다.** `--radius` 배율을 타지 않습니다.

### Sheet · Drawer — 가장자리 패널 2종 (v4 스타일 CSS, `vega` 기준)

| | Sheet | Drawer (vaul) |
|---|---|---|
| 폭 (좌·우) | `w-3/4` + **`sm:max-w-sm`(384px) 상한** | 방향별 가변 |
| 라운드 | 없음 | **붙은 변 반대쪽만** `rounded-t-xl` 등 방향 조건부 |
| 오버레이 | (Dialog 계열 공유) | **`bg-black/10` + `backdrop-blur-xs`** |
| 핸들 | 없음 | **100×6px** `rounded-full` (`h-1.5 w-[100px]`) |
| 전환 | 200ms ease-in-out | vaul 라이브러리 위임 |

모바일에서 화면의 75%를 쓰고 데스크톱에서 384px에 멈추는 **비율+상한 조합**이
Sheet의 반응형 전략입니다. Drawer 오버레이는 검정 10%로 표본에서 가장 옅고,
블러가 어둡기를 대신합니다 (`patterns/modal.md` 오버레이 절).

### NavigationMenu · Menubar · Empty · Pagination

- **NavigationMenu**: 콘텐츠 전환이 **방향 인지형**입니다 —
  `data-[motion=from-start]:slide-in-from-left-52` 등 4방향×진입/퇴장 8규칙.
  메뉴 간 이동 방향에 따라 슬라이드 방향이 바뀝니다. 뷰포트는
  `zoom-in-90` + 100ms, 경계는 border 대신 `ring-foreground/10`.
- **Menubar**: 컨테이너 36px(`h-9`) `p-1` — 데스크톱 앱 메뉴 바 문법.
  항목은 `px-2 py-1.5 rounded-sm`, 서브메뉴 `min-w-36`, 아이콘 자리
  들여쓰기 `data-inset:pl-8`(32px), destructive 변형 내장.
- **Empty**: `p-12`(48px) + **점선 테두리**(`border-dashed`) — 빈 상태를
  "아직 채워지지 않은 영역"으로 그리는 관례. 제목 `text-lg tracking-tight`.
- **Pagination**: 자체 스타일이 `gap-1`뿐 — **Button 컴포넌트 재사용**으로
  구성되는 조립형입니다.

### Toast — Sonner 실측 (`sonner@2.0.8`, 2026-08-18)

shadcn/ui의 `sonner.tsx`는 색 변수만 매핑하는 얇은 래퍼이고,
**치수·동작은 전부 `sonner` 패키지 소관**입니다. 아래는 그 패키지 실측이며,
귀속은 shadcn/ui가 아니라 **Sonner**입니다.

| 항목 | 값 (상수) |
|------|-----|
| **폭** | **356px** (`TOAST_WIDTH`) |
| **기본 위치** | **`'bottom-right'`** (`Toaster.props.position`) |
| **기본 지속시간** | **4000ms** (`TOAST_LIFETIME`) |
| **동시 표시 상한** | **3개** (`VISIBLE_TOASTS_AMOUNT`) — 초과분은 `data-visible=false`로 `opacity: 0` |
| 토스트 간 간격 | **14px** (`GAP`) |
| 화면 여백 | **24px** (`VIEWPORT_OFFSET`) · 모바일 **16px** |
| 패딩·라운드 | **16px** · **8px** · 서체 13px |
| 그림자 | `0 4px 12px rgba(0,0,0,.1)` |
| 아이콘·간격 | 16px · `gap: 6px` · 제목/본문 간격 2px |
| 액션 버튼 | 높이 24px · 좌우 8px · 12px / 500 · 라운드 4px |
| 닫기 버튼 | 20px 원형, `translate(-35%, -35%)`로 모서리에 반쯤 걸침 |
| 스와이프 임계 | **45px** 또는 속도 0.11 (`SWIPE_THRESHOLD`) |
| 언마운트 지연 | 200ms (`TIME_BEFORE_UNMOUNT`) |
| z-index | **999999999** |

전환:

```
기본      transform .4s, opacity .4s, height .4s, box-shadow .2s
스택 접힘 --scale: var(--toasts-before) * 0.05 + 1   (뒤 토스트마다 5%씩 축소)
제거      transform .5s, opacity .2s
스와이프  animation .2s ease-out (4방향 keyframes)
컨테이너  transform .4s ease
```

- **기본 위치가 우하단입니다.** `patterns/feedback.md`의 문서 층 종합은
  "어느 시스템도 우하단을 규정하지 않는다"였는데, **코드 층에서는 Sonner와
  EUI(`side: 'right'` + `bottom: 0`)가 우하단을 기본값으로 배포합니다.**
- **기본 4000ms로 5초 미만입니다** — 문서 층의 "5초 하한 수렴"과 어긋납니다.
- **동시 표시 3개 상한이 코드에 있습니다** — 문서 층 종합의 "숫자 상한을 둔
  시스템 0개"에 대한 반례입니다. 초과분은 삭제되지 않고 숨겨집니다.
- **재배치(reposition)를 `height` 전환으로 처리합니다** — 스택이 줄어들 때
  각 토스트의 높이가 400ms로 보간됩니다. Chakra v3 토스트도 같은 방식
  (`height 400ms`)이고, Atlassian은 `transform` 전용 토큰(250ms)입니다.
- 상태색은 `richColors`를 켤 때만 나옵니다 — 기본은 `--normal-bg` 한 벌이고
  아이콘 모양으로만 구분합니다 (이 문서 기존 서술과 정합).
- **`@media (hover: none) and (pointer: coarse)`에서 `data-lifted` 변환을 끕니다** —
  터치에서 스택 펼침 효과를 무력화합니다.

## 포커스링 — 3px는 표본에서 가장 두껍습니다

```
focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
```

**테두리 색 변경 + 3px 반투명 링**의 2단 구성입니다.
Atlassian의 `border.width.focused = 2px`, Carbon·Polaris의 2px 관행보다 두껍습니다.

`ring-offset`이 없습니다 — 링이 요소에 붙습니다. Dialog 닫기 버튼만 예외로
`ring-2 ring-offset-2`입니다.

## 접근성

명시된 WCAG 목표는 없습니다. 구현 레벨에서 확인되는 것:

- **`aria-invalid` 기반 에러 스타일** — 모든 폼 컨트롤
- `focus-visible` 사용 (마우스 클릭 시 링 없음)
- 프리미티브(Radix / React Aria)가 키보드·스크린리더 동작을 담당
- `outline-hidden` + 커스텀 링 — 링을 직접 제공하므로 아웃라인 제거가 접근성 손실로 이어지지 않습니다
- `disabled:pointer-events-none` — 비활성 요소의 이벤트 차단

`::selection`을 전역 토큰(`--selection`)으로 제어합니다.

## 참고

- **Figma 킷 (false) 근거:** 공식 킷 없음 — 문서가 "Figma 파일은 커뮤니티 기여"라 명시, 무료·유료 서드파티 킷만 나열, 2026-08-18 확인

- 문서: https://ui.shadcn.com
- 저장소: https://github.com/shadcn-ui/ui
- 토큰: `apps/v4/app/globals.css`
- 컴포넌트: `apps/v4/registry/new-york-v4/ui/*.tsx`
- 레지스트리 인덱스: `apps/v4/registry/__index__.tsx`
- **수집 방법:** `raw.githubusercontent.com`이 프록시에서 열려 있어 소스를 직접 읽었습니다.
  `ui.shadcn.com`의 `/r/registry.json`은 프록시가 CONNECT를 403으로 차단합니다.
- ~~남은 확인 사항: 8개 스타일 변형의 실제 토큰 차이~~ → **해소.**
  `apps/v4/styles/`는 빌드 산출물(gitignore)이라 비어 있고, 소스는
  `apps/v4/registry/styles/style-*.css`였습니다. sparse-checkout으로
  `apps/v4/registry`를 받아 분석 — 위 "8개 스타일의 실제 토큰 차이" 절.
- ~~베이스 3종 간 차이~~ → **확인 (2026-08-17, `registry/bases/`).**
  - **컴포넌트 세트가 살짝 다릅니다** — base 63 / radix 62 / aria 60.
    aria에는 `menubar`·`navigation-menu`·`toast`가 없고, radix에는 `toast`만
    없습니다. 프리미티브가 제공 안 하는 것은 베이스별로 빠지는 구조.
  - **스타일 CSS는 정규화된 상태 어휘로 작성됩니다** — `data-open` 61회 vs
    `data-popup-open`(Base UI 고유) 3회. 프리미티브별 상태 표기(Radix
    `data-state=open` 등)를 베이스 래퍼가 흡수해 스타일이 베이스 무관하게
    성립하는 게 24변형 직교성의 메커니즘입니다.
  - aria판은 같은 컴포넌트에서 **className 배선이 4배**(button 기준 8 vs 2) —
    React Aria의 render-prop 구조 비용이 코드에 그대로 보입니다.
  - ~~정규화가 일어나는 정확한 지점(래퍼인지 빌드인지)~~ → **해소 (2026-08-18,
    `registry/README.md` + `bases/radix/ui/dialog.tsx` 실측).** 정규화는
    **손으로 작성한 래퍼 층**에서 일어납니다 — `bases/<base>/ui/*.tsx`가
    프리미티브를 그대로 감싸며 `data-slot` 속성 + `cn-*` 시맨틱 클래스만
    붙이고(시각 스타일 0), 표현은 `styles/style-*.css`가 `.style-nova
    { .cn-dialog-overlay { @apply … } }` 형태로 전부 외부화합니다.
    사용자가 받는 스타일별 컴포넌트는 이 둘을 곱한 **빌드 산출물**
    (`build-registry.mts`, 조합 레지스트리는 빌드 중 생성 후 삭제).
    `new-york-v4/`만 예외 — 생성물이 아니라 직접 작성된 레거시 소스입니다.

## Figma 킷 — 공식 없음, 커뮤니티 목록만 (2026-08-18)

`figma_kit: 미확인` → **`false` 확정**. 출처 <https://ui.shadcn.com/docs/figma>.

문서에 **전용 Figma 페이지가 사이드바 최상위에 있는데도**, 그 페이지가 하는
일은 서드파티 킷을 모아 보여주는 것입니다. 페이지 상단 주석이 성격을
못 박습니다.

> **Note: Figma 파일들은 커뮤니티가 기여한 것입니다.** 질문이나 피드백이
> 있으면 각 Figma 파일 관리자에게 연락하세요.

목록은 **Free / Paid 두 절**로 나뉘며, 각 항목이 "**by 〈제작자〉**" 형태로
개인·팀 크레딧을 답니다 — 예: `shadcn/ui components`(Sitsiilia Bergmann),
`shadcn/ui design system`(Pietro Schirano) 등이 무료 절에, `shadcn/ui kit`
(Matt Wierzbicki) · `shadcncraft`(8개 스타일 전부 + Pro 블록, 대응 React
코드 생성) · `shadcn/studio UI Kit`(550+ 블록·20+ 테마) · `Shadcnblocks.com`
(500+ 블록, 테마 변수, Figma MCP 지원) · `Obra shadcn/ui Pro` 등이 유료
절에 있습니다.

**즉 유지보수 주체가 프로젝트 자신이 아닙니다.** 코드는 "복사해서 네
저장소에 넣는" 모델인데 디자인 자산도 같은 논리로 **외주화**돼 있는 셈이며,
USWDS가 공식 킷을 내면서 서드파티 링크를 **걷어낸** 것과 정확히 반대
방향입니다.

**정적 사이트 확인:** `ui.shadcn.com`은 SSR HTML에 본문이 모두 들어 있어
헤드리스 렌더가 필요 없습니다 (`/docs/figma` 493KB, 스크립트 제거 후 본문
정상 추출).
