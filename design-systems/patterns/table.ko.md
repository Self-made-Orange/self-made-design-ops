<!-- lang-links -->
> [English](table.md) · **한국어**
<!-- /lang-links -->

# Table

**셀 패딩·행 높이·밀도·경계선·고정 헤더를 비교합니다.**

> **근거가 있는 시스템은 16개입니다** (2026-08-18 2차 갱신) — shadcn/ui ·
> Radix Themes · Mantine · Cloudscape · Polaris · macOS에 **Carbon · Vuetify ·
> Ant Design · Chakra UI · PrimeVue · Semi · Naive UI · EUI · Blueprint ·
> Grommet 10개가 추가**됐습니다.
>
> 이 문서의 앞부분(밀도·셀 패딩·행 높이 표 등)은 **초기 6표본** 기준입니다.
> **16표본 기준 재검증은 "16표본 재종합" 절에 있고, 둘이 어긋나면 재종합 절이
> 우선입니다.**
>
> **"정렬 UI를 어떻게 표시하는가", "선택 방식을 체크박스로 할지 행 클릭으로 할지"는
> 문서 층에서 별도로 읽었습니다** — 아래 "판단 지침" 절(7개 시스템).

## 밀도 — 세 가지 방식

| 방식 | 시스템 | 단계 |
|------|--------|:---:|
| **토큰 값에 밀도 축** | **Cloudscape** | 2 (`comfortable` / `compact`) |
| **컴포넌트 size prop** | **Radix Themes** | 3 (size 1~3) |
| **CSS 변수 주입** | **Mantine** | 무제한 (`--table-vertical-spacing`) |
| **단일 값** | **shadcn/ui** | 1 |

### Cloudscape — 토큰 값 자체가 두 벌입니다

```json
"space-scaled-m":  { "$value": { "comfortable": "16px", "compact": "12px" } }
"size-vertical-input": { "$value": { "comfortable": "32px", "compact": "28px" } }
```

**43개 토큰에 `compact` 축이 있습니다.** 색 토큰이 `light`/`dark`를 갖는 것과
정확히 같은 구조입니다 — **밀도가 색과 동급의 축입니다.**

| 토큰 | comfortable | compact | 감소 |
|------|:---:|:---:|:---:|
| `space-scaled-xxxs` | 2px | **0px** | -2 |
| `space-scaled-xxs` | 4px | 2px | -2 |
| `space-scaled-xs` | 8px | 4px | **-4** |
| `space-scaled-s` | 12px | 8px | -4 |
| `space-scaled-m` | 16px | 12px | -4 |
| `space-scaled-l` | 20px | 16px | -4 |
| `space-scaled-xl` | 24px | 20px | -4 |
| `space-scaled-xxl` | 32px | 24px | **-8** |
| `space-scaled-xxxl` | 40px | 32px | -8 |

**감소량이 일정하지 않습니다** — 2 / 2 / 4 / 4 / 4 / 4 / 4 / 8 / 8.
비율이 아니라 **단계별로 정한 값**입니다.

**`xxxs`가 compact에서 0px이 됩니다** — 여백이 사라집니다.
런타임 배율 방식(Vapor UI · Mantine · Radix Themes)으로는 만들 수 없는 결과입니다.
배율은 0.75를 곱해 1.5px을 만들지, 0으로 죽이지 못합니다.

**세로만 줄이고 가로는 유지하는 토큰이 있습니다.**

| 토큰 | comfortable | compact |
|------|:---:|:---:|
| `space-field-vertical` | **5px** | **3px** |
| `space-field-horizontal` | 12px | **12px** (동일) |
| `space-button-vertical` | 4px | 2px |
| `space-button-horizontal` | 20px | 16px |
| `space-card-horizontal-default` | 20px | **20px** (동일) |
| `space-card-vertical-default` | 16px | 12px |
| `space-option-padding-horizontal` | 20px | **20px** (동일) |
| `space-container-horizontal` | 20px | **20px** (동일) |

**가로 여백이 유지되는 토큰이 4개 있습니다.** 밀도를 높일 때
**세로만 줄여 행 수를 늘리고 가독성(가로 여백)은 지킵니다.**

런타임 배율 방식은 가로·세로를 구분할 수 없습니다 — 이게 Cloudscape 방식의 실익입니다.

**`space-field-vertical`이 5px·3px로 홀수입니다.** 표본에서 홀수 여백은 드뭅니다.

### `compact-table` 컨텍스트 — 표 안에서만 밀도가 강제됩니다

Cloudscape 토큰 파일에는 `contexts`가 8개 있습니다.

| 컨텍스트 | 기본값과 다른 토큰 수 |
|----------|:---:|
| **`compact-table`** | **17** |
| `top-navigation` | 182 |
| `header` | 183 |
| `app-layout-toolbar` | — |
| `flashbar` · `flashbar-warning` | — |
| `alert` · `alert-header` | — |

`compact-table` 컨텍스트에서 **`comfortable` 값이 `compact` 값으로 덮어써집니다.**

```
기본:            space-scaled-m = { comfortable: 16px, compact: 12px }
compact-table:   space-scaled-m = { comfortable: 12px, compact: 12px }
```

**밀도 설정이 `comfortable`이어도 compact 표 안에서는 compact로 동작합니다.**
표 내부에 들어간 버튼·필드·카드가 자동으로 좁아집니다 (17개 토큰).

`top-navigation` · `header`는 같은 방식으로 **`light` 값을 `dark` 값으로 덮어씁니다** —
상단 영역이 항상 어두운 테마로 렌더됩니다 (182~183개 토큰).

**표본에서 컨텍스트별 토큰 오버라이드를 배포하는 것은 Cloudscape뿐입니다.**
컴포넌트 구현이 아니라 **토큰 레이어에서 영역별 예외를 흡수**합니다.

### Radix Themes — size prop 3단계

| size | 셀 패딩 | 최소 행 높이 | 글자 크기 | 라운드 |
|:---:|---|:---:|:---:|:---:|
| 1 | `--space-2` (8) | **36px** | `font-size-2` (14) | `--radius-3` (6) |
| 2 | `--space-3` (12) | **44px** | `font-size-2` (14) | `--radius-3` (6) |
| 3 | `--space-3 --space-4` (12 / 16) | **`--space-8`** (48) | `font-size-3` (16) | `--radius-4` (8) |

**size 3만 세로·가로 패딩이 다릅니다** (12 / 16). 1·2는 사방 동일합니다.

**최소 행 높이가 36 / 44 / 48px입니다.** 44px는 터치 타겟 최소값과 같습니다
(`button.md` — Apple 상단 툴바 44pt).

**size 3의 행 높이만 스페이싱 토큰(`--space-8`)을 참조합니다.**
1·2는 `calc(36px * var(--scaling))` · `calc(44px * var(--scaling))`로 리터럴입니다 —
**36·44가 스페이싱 스케일(4/8/12/16/24/32/40/48/64)에 없는 값이기 때문입니다.**

`height: var(--table-cell-min-height)`로 지정하고 주석에 *"Works as min-height"*라고
적어 뒀습니다 — 테이블 셀에서 `height`는 최소값으로 동작합니다.

`.rt-TableRootTable { height: 0 }`도 있습니다. 주석: *"Makes `height: 100%` work on
content inside cells"* — 셀 안 요소를 전체 높이로 채우기 위한 트릭입니다.

### Mantine — CSS 변수로 주입

```css
padding: var(--table-vertical-spacing)
         var(--table-horizontal-spacing, var(--mantine-spacing-xs));
```

**세로 간격은 기본값이 없고 가로는 `xs`(10px)입니다.**
`verticalSpacing` prop이 필수적으로 주입돼야 합니다.

**단계가 정의돼 있지 않습니다** — 스페이싱 토큰 5개 중 아무것이나 넣을 수 있습니다.
Radix Themes의 3단계, Cloudscape의 2단계와 달리 **선택을 사용하는 쪽에 넘깁니다.**

### shadcn/ui — 단일 밀도

| 요소 | 값 |
|------|:---:|
| 헤더 셀 높이 | **40px** (`h-10`) |
| 셀 좌우 패딩 | **8px** (`px-2`) |
| 글자 크기 | 14px (`text-sm`) |
| 헤더 굵기 | 500 (`font-medium`) |

**밀도 변형이 없습니다.** 표에 `size` prop이 없습니다.

## 셀 패딩 — 표본 비교

| 시스템 | 가로 | 세로 |
|--------|:---:|:---:|
| **shadcn/ui** | **8px** | 명시 없음 (헤더 높이 40px로 제어) |
| Radix Themes size 1 | 8 | 8 |
| Radix Themes size 2 | 12 | 12 |
| Radix Themes size 3 | **16** | 12 |
| Mantine (기본) | **10px** (`spacing-xs`) | 미지정 |
| Cloudscape | (표 전용 토큰 없음) | — |
| **Polaris** (토큰) | **6px** (`space-table-cell-padding`) | **6px** |
| **Polaris** (배포 CSS·데스크톱) | **12px** | **8px** |

**6~16px 범위입니다.** Polaris 토큰의 6px이 가장 좁고, Radix Themes size 3의 16px이 가장 넓습니다.
프레임워크 계열만 보면 shadcn/ui의 8px이 하한입니다.

Polaris 원문 표기는 `padding 8×12px`입니다 — CSS 단축 표기 순서(세로 / 가로)로 읽었습니다.

**Mantine의 10px은 스페이싱 스케일이 `4`·`8`을 갖지 않는 결과입니다**
(`10/12/16/20/32` — `tokens/scales.md`). 다른 시스템이 8px을 쓰는 자리에 10px이 들어갑니다.

## 행 높이

| 시스템 | 값 |
|--------|-----|
| **shadcn/ui** | 헤더 40px, 본문 행은 콘텐츠 높이 |
| **Radix Themes** | **36 / 44 / 48px 최소값** |
| **Polaris** (데스크톱) | **`min-height: 32px`** |
| **macOS** (디자인 킷) | **행 20pt · 열 헤더 28pt** |
| Mantine · Cloudscape | 미확인 |

**shadcn/ui는 본문 행 높이를 고정하지 않습니다.** 헤더만 40px입니다 —
행마다 내용에 따라 높아집니다.

**Radix Themes는 최소값만 정합니다** (`height`가 `min-height`처럼 동작).
내용이 길면 늘어납니다.

**웹 표본은 고정 높이를 쓰지 않습니다** — shadcn/ui·Radix Themes·Polaris 모두
최소값이거나 콘텐츠 높이입니다. 가상 스크롤(virtual scrolling)에는 고정 높이가 필요한데,
웹 표본에서 그 값을 제공하는 시스템이 없습니다.

**macOS만 행 20pt를 단일값으로 열거합니다** — 다만 Figma 디자인 리소스의 컴포넌트
치수이고 가상 스크롤 지침이 아닙니다.

## 경계선 — 세 가지 표현

| 시스템 | 방식 |
|--------|------|
| **Radix Themes** | **`box-shadow: inset 0 -1px`** |
| **Mantine** | `border-bottom` (+ 고정 헤더에서는 `box-shadow`로 전환) |
| shadcn/ui | 미확인 (Table 소스에 경계선 클래스 없음) |

### Radix Themes — 행 구분을 `box-shadow`로

```css
--table-row-box-shadow: inset 0 -1px var(--gray-a5);
--table-row-box-shadow: none;            /* 마지막 행 */
```

**`border`가 아니라 `inset box-shadow`입니다.** 레이아웃 높이에 영향을 주지 않고,
`border-collapse`와 무관하게 동작합니다.

색이 `--gray-a5`(알파 5단계)입니다 — 회색 계열 알파를 쓰므로 배경색과 무관하게 동작합니다
(`color.md` — Radix Themes는 33색 전부에 알파 12단계가 있습니다).

`--table-row-background-color`도 `transparent` / `var(--gray-a2)` 두 값입니다.

### Mantine — 고정 헤더에서 `box-shadow`로 전환합니다

소스 주석에 이유가 적혀 있습니다.

> *"`border-collapse: collapse` drops borders on `position: sticky` cells —
> box-shadow on the (sticky) th. The tr's border-bottom is suppressed…"*

```css
[data-sticky] tr[data-with-row-border] th {
  box-shadow: inset 0 -1px 0 var(--table-border-color);
}
```

**`border-collapse: collapse`와 `position: sticky`가 충돌합니다** —
sticky 셀에서 보더가 사라집니다. Mantine은 그 경우에만 `box-shadow`로 바꿉니다.

**Radix Themes는 처음부터 `box-shadow`를 써서 이 문제를 피합니다.**

### 경계선 색 토큰

| 시스템 | 토큰 |
|--------|------|
| **Mantine** | `--table-border-color` (light `gray-3` / dark `dark-4`) |
| **Radix Themes** | `--gray-a5` (알파 참조) |

**Mantine은 모드별 불투명 색, Radix Themes는 알파입니다.**
알파 쪽이 배경이 여러 단계일 때 유리합니다 (`color.md`).

경계선 두께가 Mantine에서 `calc(0.0625rem * var(--mantine-scale))` = **1px × 배율**입니다.
배율 110%에서 1.1px이 됩니다 — **서브픽셀 보더가 생깁니다.**

## 고정 헤더 (sticky)

**초기 6표본에서는 Mantine만 구현이 확인됐습니다** (16표본 값은
아래 "16표본 재종합 — 고정 헤더 z-index" 절).

| 항목 | 값 |
|------|-----|
| `position` | `sticky` |
| `top` | `var(--table-sticky-header-offset, 0)` |
| `z-index` | **3** |

**오프셋이 변수입니다** — 페이지에 고정 상단바가 있으면 그 높이를 넣습니다.

**`z-index: 3`입니다.** 리터럴이며 Mantine 자체 층위 토큰과 무관합니다 —
z-index를 토큰화한 시스템은 Chakra·Bootstrap·Open Props·Forma 36·Vibes·Solid·Pluralsight 7개입니다.

고정 열(sticky column)은 `data-with-column-border`와 `::before` 의사 요소로
경계선을 그립니다 — 같은 `border-collapse` 문제 회피입니다.

**Radix Themes · shadcn/ui는 고정 헤더 값이 확인되지 않았습니다.**
**Cloudscape는 `z-index: 798` + 고정 열 그림자 `4px 0 8px 1px` +
`clip-path: inset(0 -24px 0 0)`으로 확인됐습니다** (2026-08-18) —
아래 "16표본 재종합" 절.

## 줄무늬 (striped) · hover

| 시스템 | 줄무늬 | hover |
|--------|:---:|:---:|
| **Mantine** | `--table-striped-color` (light `gray-0` / dark `dark-6`) | `--table-hover-color` (light `gray-1` / dark `dark-5`) |
| **Radix Themes** | `--table-row-background-color: var(--gray-a2)` | 미확인 |
| **macOS** | **`Alternating Gray`** (킷 변형으로 열거) | 미확인 — 대신 `Selected` / **`Selected Inactive`** 축 |
| shadcn/ui | 미확인 | 미확인 |

**Mantine의 줄무늬(`gray-0`)가 hover(`gray-1`)보다 연합니다.**
hover가 줄무늬를 덮어써야 하므로 순서가 맞습니다.

### Mantine — 터치 기기에서 hover를 `:active`로 바꿉니다

```css
@media (hover: hover) { tr:hover[data-hover] { background: var(--tr-hover-bg) } }
@media (hover: none)  { tr:active[data-hover] { background: var(--tr-hover-bg) } }
```

**`@media (hover: none)`에서 `:hover`를 `:active`로 대체합니다.**
터치 기기에서 `:hover`는 탭 후 남아 있어 잘못된 행이 강조된 상태로 유지됩니다.

**표본에서 `@media (hover: …)`로 상태를 분기하는 것은 Mantine뿐입니다.**

`visionOS`의 시선 기반 hover(`patterns/button.md`)와 같은 문제의 다른 해법입니다 —
**"hover가 있는가"를 플랫폼이 아니라 미디어 쿼리로 판정합니다.**

## 숫자 정렬 — 옵션(Mantine)과 기본값(Chakra)

```css
/* Mantine — 속성으로 켜는 옵션 */
[data-tabular-nums] { font-variant-numeric: tabular-nums; }
```

```js
// Chakra UI — 표 root에 무조건
root: { fontVariantNumeric: "lining-nums tabular-nums", … }
```

**등폭 숫자는 표에서 숫자 열의 자릿수를 맞춥니다.**

> **정정 (2026-08-18).** "표본에서 `font-variant-numeric`을 노출하는 것은
> Mantine뿐"은 틀렸습니다. **Chakra UI는 표 `root`에 기본으로 겁니다**
> (옵션이 아닙니다). 같은 결론에 기본값이 다릅니다 —
> 아래 "16표본 재종합" 절.

## 캡션 위치

| 시스템 | 값 |
|--------|-----|
| **shadcn/ui** | `caption-bottom` (고정) |
| **Mantine** | `var(--table-caption-side, bottom)` (변경 가능) |

**둘 다 기본이 하단입니다.** HTML `<caption>`의 브라우저 기본값은 상단이므로
둘 다 명시적으로 바꿉니다.

shadcn/ui 캡션: `mt-4 text-sm text-muted-foreground` (상단 여백 16px).

## 체크박스가 든 셀 — shadcn/ui의 `:has()` 방식

```
[&:has([role=checkbox])]:pr-0
[&>[role=checkbox]]:translate-y-[2px]
```

**CSS `:has()`로 셀 내용에 따라 패딩을 바꿉니다.**

| 조건 | 처리 |
|------|------|
| 셀에 체크박스가 있음 | **우측 패딩 0** |
| 셀의 직계 자식이 체크박스 | **2px 아래로 이동** |

**체크박스를 2px 내립니다. 소스에 이유는 적혀 있지 않습니다.**

Button의 `has-[>svg]:px-3`(아이콘이 있으면 패딩 축소)과 같은 패턴입니다 (`button.md`) —
**shadcn/ui는 `:has()`를 조건부 스타일의 기본 도구로 씁니다.**

**체크박스 열을 다루는 다른 방식도 확인됩니다** (2026-08-18):
**Carbon**은 밀도 5단마다 `table-column-checkbox` 세로 패딩을 따로 열거하고
(xs에서 체크박스 라벨 높이를 `24px 행 − 1px 보더 = 23px`로 주석과 함께 고정),
**EUI**는 체크박스 열 폭을 `size.xl`(32px), **Cloudscape**는
`--size-table-selection-horizontal`(40px), **Ant**은
`selectionColumnWidth: controlHeight`(32px)로 **열 폭 토큰**을 둡니다.
`:has()`로 푸는 것은 shadcn/ui뿐이고, **나머지는 전용 토큰·셀렉터**입니다.

## 표 변형

| 시스템 | 변형 |
|--------|------|
| **Radix Themes** | `surface` (배경·보더 있음) · `ghost` (없음) |
| **Mantine** | `data-variant='vertical'` (**헤더가 왼쪽 열**) |
| shadcn/ui | 없음 |

**Mantine의 `vertical` 변형은 첫 열이 헤더입니다** —
`font-weight: medium` + 배경색(`gray-0` / `dark-6`)이 적용됩니다.
속성-값 목록 형태의 표입니다.

**Radix Themes `surface`는 `background-clip: padding-box`를 씁니다** —
라운드된 컨테이너 안에서 배경이 보더를 넘지 않게 합니다.

## 판단 지침 — 문서 층 실측 (2026-08-18)

7개 시스템의 표 지침을 읽었습니다. **M3에는 데이터 테이블 컴포넌트
자체가 없고**(컴포넌트 목록 확인), GOV.UK table에는 정렬·선택 지침이
없습니다 — 표 규정은 엔터프라이즈 시스템의 영역입니다.

### 정렬 UI — 규정한 곳은 Carbon·Cloudscape 둘

- **Carbon이 3상태를 명문화**: unsorted(양방향 화살표) → sorted-up →
  sorted-down. **아이콘은 hover 시와 정렬 활성 시에만 표시** — 미정렬
  컬럼의 화살표는 hover에서만 보입니다
- **Cloudscape는 정렬 정책까지**: 단일 컬럼 정렬이 기본(멀티는 분석
  화면만 — 번호 우선순위 배지 + 방향 화살표), 기본 정렬 컬럼은 사용자
  데이터 기반으로 선택, 헤더에 "Creation date unsorted" 식 대체 텍스트 필수
- Atlassian·Spectrum·Polaris 현행: 규정 없음(확인함)

### 행 선택 — "액션이 있을 때만 + 체크박스 열"이 수렴점

- **공통 원칙(Spectrum·Cloudscape 동일 문구 수준)**: **"행에 액션을 취할
  수 있을 때만 선택을 제공"** — 선택 기능 자체의 존재 조건을 규정
- **방식은 체크박스 열이 유일한 규정**: Spectrum(왼쪽 체크박스) ·
  Carbon(멀티=체크박스+헤더 3상태 전체선택 / 싱글=라디오 첫 컬럼).
  **행 클릭 선택을 규정한 시스템은 0개** — Polaris 현행은 행 클릭을
  선택이 아니라 주 액션 연결(clickDelegate)로 쓰고 접근성 한계를 명시
- **Cloudscape의 방어 규정**: pagination·정렬·필터가 바뀌면 **선택을
  리셋**(모르는 새 선택된 항목에 액션 방지), 선택 수는 헤더 카운터
  (1/150), 라디오 선택 변경을 액션 트리거로 쓰지 말 것
- shadcn/ui `:has([role=checkbox])` 전제는 이 수렴(체크박스 열)과 정합

## 심화 반영 — 표 축은 2개 늘었습니다 (2026-08-18)

> 이 절은 **1차 심화(79표본) 시점의 기록**입니다. 같은 날 진행한 표 축 보강으로
> 근거 시스템이 16개가 됐습니다 — **아래 "16표본 재종합" 절이 최신입니다.**

`partial` 수집 심화(79개 시스템)에서 **표 컴포넌트 실측이 새로 확보된 것은 Polaris·macOS 둘입니다.**
근거 시스템이 4 → **6개**가 됐습니다.

> **이번 심화에서 표 축은 2개 시스템만 늘었습니다 — 표 컴포넌트는 심화 대상에서
> 상대적으로 후순위였습니다.** 심화는 버튼·입력·모달에 집중했습니다.
> 79개 시스템 문서를 표 키워드로 전수 검색했으나 셀 패딩·행 높이 같은 실측이
> 확인되는 것은 위 6개뿐이고, 나머지는 **컴포넌트 목록에 `table`이 있다는 사실만**
> 확인됩니다. 그래서 재종합 절을 따로 크게 쓰지 않고 확보된 값만 위 표들에 반영했습니다.

### Polaris — 표 전용 스페이싱 토큰을 이름으로 둡니다

| 층 | 값 |
|-----|-----|
| React 토큰 | `space-table-cell-padding` = `space-150` = **6px** |
| 웹컴포넌트 배포 CSS (데스크톱) | 셀 패딩 **8×12px** · **`min-height: 32px`** · 폰트 14 → **13px** |

**표 전용 스페이싱 토큰에 이름을 붙인 것은 확보된 6표본 중 Polaris뿐입니다.**
Cloudscape는 공용 `space-scaled-*`를 셀 패딩에 직접 쓰고, 나머지 넷은 컴포넌트 CSS에만
값이 있습니다.

**토큰(6px)과 배포 CSS(8/12px)가 어긋납니다.** Polaris는 React판과 웹컴포넌트판이
병존하는 시스템이고(`systems/polaris.md` — 버튼 높이도 두 판이 다릅니다),
표 셀 패딩에서도 같은 단층이 보입니다. **어느 쪽이 현행인지 확인하지 못했습니다.**

**표 폰트를 본문보다 1px 줄입니다** (14 → 13px). 같은 데스크톱 축소가 입력 필드
(폰트 13px · `min-height` 32px)와 버튼(14 → 12px)에도 걸려 있습니다 —
**표만의 결정이 아니라 데스크톱 전반의 밀도 축소입니다.**

### macOS — 행 20pt, 열 헤더 28pt

| 항목 | 값 |
|------|:---:|
| 행 높이 | **20pt** |
| 열 헤더 높이 | **28pt** |
| 행 배경 축 | `Selected` / **`Selected Inactive`** / **`Alternating Gray`** |
| 트리 들여쓰기 | Level 0~4 열거 |

**20pt는 확보된 6표본 중 가장 낮은 행 높이입니다** — Radix Themes 최소값(36px)의
절반 수준이고, 웹 표본에는 이만큼 낮은 값이 없습니다. 데스크톱 네이티브의 좌표입니다.
행 20 · 열 헤더 28은 macOS 컨트롤 5단계(16 · 20 · 24 · 28 · 36) 위의 값입니다 —
**표가 별도 치수 체계를 갖지 않고 공용 사다리를 씁니다.**

**`Alternating Gray`가 줄무늬입니다** — 색 토큰이 아니라 **킷의 상태 변형으로 열거**합니다.

**`Selected Inactive`는 창이 비활성일 때의 선택 행입니다.** 다중 창 데스크톱 전제이며,
`systems/macos.md`에 따르면 Push Button·Stepper·List 선택 행이 모두 `Active Window`
축을 갖습니다. **웹 표본에는 이 축이 없습니다.**

단, 이 값들은 **Figma 디자인 리소스의 컴포넌트 치수**이고 CSS·토큰 층 값이 아닙니다.

### 표 컴포넌트는 있으나 값이 확인되지 않은 시스템

| 시스템 | 확인된 것 |
|--------|-----------|
| **Blueprint** | **`@blueprintjs/table` 전용 패키지** — 데이터 그리드 중심 시스템의 방증 |
| **DSFR** | `table` 컴포넌트 + **정렬 화살표 `transform` 0.3s** (`button.css`의 유일한 transition) |
| **smarthr** | **표 열 배경색(`column`) 토큰** — readonly 입력의 보더·배경에 재사용 |
| **Cedar** | 컴포넌트 토큰 JSON에 `table` |
| **Grommet** | `DataTable` 컴포넌트 (약 95개 중) |
| bf-solid · Clarity · Forma 36 · Pharos · Stacks · Vanilla | 컴포넌트 목록에 `table` |

**DSFR의 정렬 화살표가 코드 층에서 확인된 유일한 정렬 UI 데이터입니다** —
위 "판단 지침" 절의 Carbon·Cloudscape 규정(문서 층)에 대응하는 구현 값이 표본에
사실상 없습니다.

**smarthr의 `column` 토큰은 표가 아니라 입력에서 관측됐습니다** — readonly 필드를
"표 열 색"으로 칠합니다. 표 자체 값은 확인하지 못했습니다.

### 기존 결론에 대한 영향

> **정정 — 셀 패딩 "8~16px 범위"의 하한이 6px로 내려갑니다.**
> Polaris `space-table-cell-padding`이 **6px**입니다. 다만 같은 시스템 배포 CSS가
> 8/12px이라 6px이 실제 렌더 값인지는 확인되지 않았습니다.
> **프레임워크 계열의 하한은 여전히 8px**(shadcn/ui · Radix Themes size 1)입니다.

> **정정 — 행 높이 44px은 "기본"이 아니라 터치 기준값입니다.**
> 확보된 6표본에서 데스크톱 표의 행 높이는 **macOS 20pt · Polaris 32px ·
> Radix Themes size 1 36px**이고, 44px은 Radix Themes size 2 이상에서만 나옵니다.
> 아래 "구현 시 기본값"의 행 높이 항목을 플랫폼별로 갈랐습니다.

**밀도 권고는 어긋나지 않습니다 — 오히려 보강됩니다.** 아래에서 권하는 compact 조합
(세로 8 / 가로 12)이 **Polaris 데스크톱 배포값과 일치**합니다. Cloudscape의
"세로만 줄이고 가로는 유지"에서 도출한 값인데 독립된 시스템의 배포값과 만났습니다.

**경계선·hover·줄무늬·캡션·고정 헤더·숫자 정렬 권고는 새 데이터와 어긋나지 않습니다** —
Polaris·macOS 둘 다 해당 값이 확인되지 않아 반증도 보강도 없습니다.

## 16표본 재종합 — 컴포넌트 실측 (2026-08-18)

표 축이 얇다는 문제를 풀기 위해 **표를 실제로 배포하는 10개 시스템**의
컴포넌트 CSS·토큰·소스를 새로 읽었습니다
(Carbon `@carbon/styles@1.113.0` · Vuetify `4.1.10` · Ant `antd@6.6.1` ·
Chakra `@chakra-ui/react@3.36.1` · PrimeVue `@primeuix/themes@3.0.0` ·
Semi `@semi-bot/semi-theme-default@1.0.0` · Naive UI `2.45.0` ·
EUI `@elastic/eui@119.0.0` · Blueprint `@blueprintjs/table@6.2.4` ·
Grommet `2.56.0`). Cloudscape는 `@cloudscape-design/components@3.0.1348`
배포 CSS를 추가로 읽어 기존 서술을 정정했습니다.

### 밀도 — 단계를 두는 것이 다수, 단계 수는 1~5로 흩어집니다

| 단계 수 | 시스템 |
|:---:|--------|
| **5** | **Carbon** (xs 24 / sm 32 / md 40 / **lg 48 기본** / xl 64px) |
| **3** | Vuetify(default/comfortable/compact) · Chakra(sm/md/lg) · PrimeVue(sm/기본/lg) · Semi(default/middle/small) · Ant(기본/middle/small) · Radix Themes(size 1~3) · Naive UI(3단 노출, **값은 2단**) |
| **2** | Cloudscape(comfortable/compact) · EUI(기본/compressed) · Blueprint(기본/large) |
| **1 또는 없음** | shadcn/ui · Grommet · Polaris · macOS |
| **무제한** | Mantine (CSS 변수 주입) |

**16표본 중 12개가 밀도·크기 축을 갖습니다.** "밀도 변형은 엔터프라이즈만"이라는
인상과 달리, 소비자향 프레임워크(Vuetify·Chakra·Naive)도 대부분 둡니다.

**Naive UI는 3단을 노출하면서 medium과 large의 셀 패딩이 같습니다**(둘 다 12px) —
단계 이름과 실제 값 단계가 어긋나는 사례입니다.

### 셀 패딩 — 하한이 세로 2px까지 내려갑니다

```
세로 0     Vuetify · Blueprint          (높이를 height로 잡아 세로 패딩이 없음)
세로 2     PrimeVue sm · Carbon xs
세로 4     EUI compressed
세로 6     Polaris 토큰
세로 7     Carbon sm·md (7/6 비대칭)
세로 8     Chakra sm · Semi small · Ant small · Radix 1 · Cloudscape · Naive small · Polaris 배포
세로 12    Chakra md·lg · Radix 2·3 · Semi middle · Ant middle · Naive medium·large
세로 16    Carbon lg·xl · Semi 기본 · Ant 기본
```

```
가로 6     PrimeVue sm
가로 8     shadcn/ui · Radix 1 · Blueprint · EUI · Chakra sm · Ant middle·small · Polaris
가로 10    Mantine (스케일에 8이 없음)
가로 12    Chakra md · Radix 2
가로 14    PrimeVue 기본
가로 16    Carbon 전 단계 · Semi 전 단계 · Ant 기본 · Chakra lg · Vuetify · Radix 3
가로 19    Cloudscape (20 − 보더 1)
```

> **정정 — 셀 패딩 하한이 6px에서 2px로 내려갑니다.**
> 기존 판의 하한은 Polaris 토큰 6px이었습니다. **PrimeVue `sm`이 세로 2 / 가로 6px,
> Carbon `xs`가 세로 2px**입니다. 다만 둘 다 **최소 밀도 단계**의 값이고,
> 기본 단계의 하한은 여전히 8px(Chakra sm·Radix 1·shadcn/ui)입니다.

### 밀도를 줄일 때 세로만 줄이는가 — 다수는 그렇지만 반례가 있습니다

| 태도 | 시스템 |
|------|--------|
| **세로만 줄이고 가로 유지** | **Cloudscape · Semi(16 고정) · Carbon(16 고정) · Polaris** |
| 가로·세로 함께 줄임 | Chakra(12/12 → 8/8) · PrimeVue(세로 8→2 / 가로 14→6) · Radix Themes · Naive UI |
| **가로를 더 줄임** | **Ant Design** (기본 16/16 → middle 세로 12 / **가로 8**) |

**Ant만 방향이 반대입니다.** middle에서 가로를 절반(16→8)으로 줄이고 세로는
16→12로만 줄입니다. 기존 문서가 Cloudscape에서 도출한 "가로를 줄이면
가독성이 떨어진다"는 권고에 대한 유일한 반례이며, **이유는 소스에 없습니다.**

### 행 높이 — 고정값을 실제로 배포하는 시스템이 나왔습니다

| 방식 | 시스템 · 값 |
|------|-------------|
| **고정 `height`** | **Carbon** 24/32/40/**48**/64 · **Vuetify** 헤더 56/48/40 · 행 52/44/36 · **Blueprint** 20(large 30) |
| **최소 높이** | Radix Themes 36/44/48 · Polaris 32 · EUI basic table 24 |
| **콘텐츠 파생** | shadcn/ui · Semi · Ant · Chakra · PrimeVue · Naive UI · Mantine · Cloudscape · Grommet |
| 킷 치수 | macOS 20pt (열 헤더 28pt) |

> **정정 — "웹 표본은 고정 행 높이를 쓰지 않는다"는 틀렸습니다.**
> **Carbon(5단 전부 `block-size` 고정) · Vuetify(`--v-table-row-height` 고정) ·
> Blueprint(JS 상수 20px)** 세 웹 시스템이 고정 행 높이를 배포합니다.
> 다만 **여전히 다수는 파생(9표본)이고, 최소 높이 3 · 고정 3**입니다.

> **정정 — "가상 스크롤용 고정 행 높이 참고값이 표본에 없다"도 해소됩니다.**
> 가상 스크롤 그리드를 배포하는 두 시스템의 기본 행 높이는
> **Blueprint `@blueprintjs/table` 20px · EUI `EuiDataGrid` 34px**입니다.
> Blueprint의 20px은 macOS 디자인 킷 행 높이와 같은 값이고,
> **EUI는 한 시스템 안에 문서형 표(콘텐츠 높이)와 그리드(34px 고정)를 따로 둡니다.**

기본 단계만 모으면 **48px(Carbon) · 52px(Vuetify) · 32~36px(Polaris·Radix 1) ·
20px(Blueprint·macOS)**로, **하나의 최빈값이 없습니다.**

### 경계선 — border가 다수, box-shadow는 소수·목적형

| 방식 | 시스템 |
|------|--------|
| **`border-bottom` / `border-block-end`** | Carbon · Semi · Ant · Chakra(`line`) · Naive UI · PrimeVue · EUI · Vuetify(gridlines 변형) |
| **`box-shadow` 전면** | **Radix Themes · Blueprint** |
| **필요할 때만 box-shadow** | Mantine(고정 헤더) · Vuetify(고정 헤더) · Chakra(`outline` 변형은 링) |

**전면 box-shadow는 여전히 소수(2/16)입니다.** 다만 `border-collapse` +
`position: sticky` 충돌을 아는 시스템은 **고정 헤더에서만 전환**합니다
(Mantine·Vuetify 둘 다 `inset 0 -1px`).

**보더가 위아래 둘 다 있는 진영이 있습니다** — Carbon·Cloudscape가
`border-block-start`를 배경색/투명으로 두고 `border-block-end`만 실선으로 씁니다.
**hover·선택에서 위 보더에 색이 들어가도 행 높이가 변하지 않습니다.**
경계선 두께를 상태에 따라 바꾸는 대신 **색만 바꾸는 자리를 미리 만들어 둔 형태**입니다.

**헤더 아래만 두껍게 하는 시스템**: Semi(본문 1px / 헤더 아래 **2px**).

### 고정 헤더 z-index — 값이 세 자릿수까지 흩어집니다

```
798   Cloudscape        (앱 레이아웃 층위 체계 안의 값)
101   Semi              (리터럴, 다른 층위와 무관)
  3   Mantine
  2   Ant Design        (zIndexTableFixed 상수)
  1   Carbon · Chakra · Vuetify   (Vuetify는 고정 행∩열 교차 셀만 2)
0~21  Blueprint         (표 내부에서 13단으로 세분)
```

**교차 권고값이 없습니다.** 다만 **오프셋을 변수로 두는 관행은 수렴**합니다 —
Chakra `--table-sticky-offset` · Mantine `--table-sticky-header-offset` ·
shadcn/ui 동형. 서로 무관한 세 시스템이 이름까지 거의 같습니다.

**Blueprint만 표 하나 안에서 z-index를 층위로 나눕니다** (셀 0~3 · 사분면 10~13 ·
선택 영역 20 · 인터랙티브 셀 21) — 4사분면 가상 스크롤 그리드의 요구입니다.

### 줄무늬 · hover — 줄무늬는 옵션, hover는 기본이 아닐 수도 있습니다

- **줄무늬 구현**: `nth-child(odd)` 배경(Carbon · Chakra · Blueprint) ·
  `nth-child(even)`/`(odd)` 두 변형(**Vuetify**, `background-image: linear-gradient`) ·
  토큰 한 개(PrimeVue `row.stripedBackground` · Naive `tdColorStriped` · Mantine)
- **Vuetify만 배경색이 아니라 그라디언트 이미지**입니다 — `background-color`를
  비워 두어 선택·hover 배경과 겹칠 수 있게 합니다
- Blueprint 줄무늬 색차가 `#ffffff` / `#fafbfc`로 **명도차 약 1%**
- **Chakra는 hover가 기본이 아닙니다** — `interactive` 변형을 켜야 생깁니다.
  확보 표본에서 행 hover를 옵트인으로 둔 사례입니다
- **Vuetify는 hover도 `td::after` 오버레이**입니다 (버튼의 상태층과 같은 기구)
- 고정 열이 있는 시스템은 hover 색을 **두 번 칠합니다** — Semi가 고정 셀에
  `::before`로 같은 색을 다시 넣습니다(고정 셀이 불투명 배경을 가지므로)

### 정렬 UI — 코드 층에서 "미정렬은 hover에만"이 수렴합니다

| 시스템 | 아이콘 크기 | 미정렬 상태 |
|--------|:---:|------|
| **Carbon** | **20px** | **`opacity: 0`** → 정렬 활성 시 1, 내림차순 `rotate(180deg)` + 전환 |
| **Vuetify** | 16px (순번 배지 20px) | **`opacity: 0`** → hover·focus **0.5** |
| Semi | 16px | 상시 표시, 활성 시 `primary` 색 |
| Naive UI | 15px | 미확인 |
| PrimeVue | **12px** | 미확인 |
| DSFR | 미확인 | 화살표 `transform` 0.3s |

> 기존 판은 "정렬 UI의 구현 값이 DSFR의 0.3s 하나뿐"이라고 적었습니다.
> **Carbon·Vuetify 두 시스템이 "미정렬 화살표는 hover에서만 보인다"를 독립적으로
> 구현합니다** — Carbon 문서 규정(3상태)의 코드 층 대응이 확인됐고,
> Vuetify가 같은 규칙에 0.5 불투명도로 도달했습니다.

**정렬 강조 범위가 갈립니다.** Carbon·Semi는 헤더 셀만, **Naive UI·Ant은 본문
셀까지** 색이 바뀝니다 (`tdColorSorting` · `bodySortBg`).

### 표 전용 토큰 이름 — 16표본 중 6개가 둡니다

| 시스템 | 토큰 |
|--------|------|
| **Cloudscape** | `--space-table-horizontal`(20px) · `--space-table-content-bottom`(4px) · `--space-table-header-tools-bottom`(0) · `--size-table-selection-horizontal`(40px) |
| Polaris | `space-table-cell-padding`(6px) |
| PrimeVue | `datatable.*` 슬롯 토큰 전체 (header/bodyCell/row/sortIcon …) |
| Naive UI | `thPadding{Small,Medium,Large}` · `tdPadding*` · `sorterSize` |
| Ant Design | `cellPaddingBlock/Inline{,MD,SM}` · `zIndexTableFixed` |
| Mantine | `--table-*` CSS 변수군 |
| **공용 토큰 재사용** | **Carbon**(`layout.size('height')` 사다리 + `$spacing-05`) · Chakra · Vuetify · Semi · EUI · Grommet |

> **정정 — "Cloudscape에는 `space-table-*` 전용 토큰이 없다"는 틀렸습니다.**
> 디자인 토큰 패키지(`@cloudscape-design/design-tokens`)에는 없지만,
> **컴포넌트 패키지 배포 CSS에 위 4개가 표 전용 이름으로 있습니다.**

**Carbon이 반대편 극단입니다** — 표 전용 치수 토큰을 두지 않고
`layout.use('size', …)`로 **문맥에서 크기를 상속**합니다. 표를 감싼 영역의
밀도 설정이 표 크기를 결정합니다.

### 등폭 숫자 — 기본으로 켜는 시스템이 나왔습니다

> **정정 — "`font-variant-numeric`을 노출하는 것은 Mantine뿐"은 틀렸습니다.**
> **Chakra UI가 표 `root`에 `fontVariantNumeric: "lining-nums tabular-nums"`를
> 옵션 없이 기본으로 겁니다.** 배지 레시피에도 같은 속성이 들어 있습니다.
> Mantine은 `data-tabular-nums` 속성으로 켜야 하는 옵션입니다 —
> **같은 결론에 다른 기본값**입니다.

### 보더 몫을 패딩에서 빼는 관행이 표에도 있습니다

**Cloudscape**가 셀 가로 패딩을 `calc(20px − 1px)`, 세로를
`calc(8px − 1px + 2px)` + `margin-block: -2px`로 둡니다(포커스 링이 셀 경계에서
잘리지 않게 2px을 벌었다 회수). `patterns/button.md`에서 12개 시스템에 걸쳐
관측된 보더 차감 관행이 표 셀에서도 확인됩니다.

### 그 밖의 단일 관측

- **EUI는 모바일에서 `thead`·`tfoot`을 `display: none`**으로 지웁니다 —
  셀을 세로 카드로 재배치합니다. 확보 표본에서 표의 모바일 레이아웃을
  CSS로 규정한 사례입니다
- **Grommet은 셀 패딩·행 높이 토큰이 아예 없습니다** — `Box` pad 규칙에 위임하고,
  고정 헤더를 색이 아니라 **`opacity: 'strong'`**으로 처리합니다
- **Cloudscape 고정 열 그림자에 `clip-path: inset(0 -24px 0 0)`**이 붙어
  그림자가 한쪽으로만 새어 나갑니다. 고정 셀의 패딩 전환은 90ms
- **Blueprint는 셀에 `intent` 4종**(배경 10% 알파 + 텍스트 색)을 둡니다 —
  셀 단위 상태색을 규격화한 사례
- **PrimeVue는 표 전환을 명시적으로 끕니다** (`root.transitionDuration: "0s"`)

## 아직 못 채운 것

- ~~정렬 UI / 선택 방식~~ → **해소 (2026-08-18)** — 위 "판단 지침" 절
- **열 크기 조정(resize)** — shadcn/ui에 `resizable` 컴포넌트가 별도로 있으나
  표와의 조합은 미확인
- **빈 상태** — shadcn/ui에 `empty` 컴포넌트가 있습니다. 소스 미확인
- **페이지네이션** — shadcn/ui에 `pagination` 컴포넌트가 있습니다. 소스 미확인
- ~~가상 스크롤용 고정 행 높이~~ → **해소 (2026-08-18)** —
  Blueprint `@blueprintjs/table` **20px**(`defaultRowHeight`, 열 너비 150px) ·
  EUI `EuiDataGrid` **34px**(`DEFAULT_ROW_HEIGHT`). 위 "16표본 재종합" 절
- ~~Cloudscape 표 전용 토큰~~ → **해소 (2026-08-18, 정정)** — 디자인 토큰
  패키지에는 없지만 **컴포넌트 배포 CSS에 `--space-table-horizontal`(20px) ·
  `--space-table-content-bottom`(4px) · `--space-table-header-tools-bottom`(0) ·
  `--size-table-selection-horizontal`(40px)** 4개가 있습니다
- **shadcn/ui 경계선** — Table 소스에 보더 클래스가 없습니다.
  전역 `* { @apply border-border }`가 있으나 표에 적용되는지 확인하지 못했습니다
- **Radix Themes hover·줄무늬** — `--table-row-background-color`가 두 값인데
  어느 쪽이 hover이고 어느 쪽이 줄무늬인지 셀렉터를 확인하지 못했습니다
- **z-index 스케일** — Mantine의 고정 헤더 `3`이 리터럴인지 자체 스케일인지 미확인.
  16표본에서 고정 헤더 z가 1~798로 흩어져 교차 권고값이 없습니다.
  z-index 토큰 자체는 Chakra 등 8개 시스템에 있습니다
  (EUI `levels.js` 추가 — `systems/eui.md`)
- **Polaris 셀 패딩의 두 값** — 토큰 6px과 배포 CSS 8/12px 중 어느 쪽이 현행인지
  확인하지 못했습니다. React판 / 웹컴포넌트판 병존 문제입니다 (`systems/polaris.md`)
- **표 컴포넌트를 가진 나머지 시스템** — ~~Blueprint~~ · ~~Grommet~~ →
  **해소 (2026-08-18)**. DSFR · Cedar · Clarity · Pharos · Stacks · Vanilla ·
  bf-solid · Forma 36 · smarthr는 여전히 컴포넌트 존재만 확인됩니다
- **줄무늬 유무** — Semi · Ant · EUI 배포물에서 줄무늬 셀렉터·토큰을
  찾지 못했습니다. 없는 것인지 다른 이름인지 확인하지 못했습니다
- ~~정렬 UI의 코드 층~~ → **해소 (2026-08-18)** — Carbon(20px, 미정렬
  `opacity: 0` + 내림차순 180° 회전) · Vuetify(16px, 미정렬 0 → hover 0.5) ·
  Semi(16px) · Naive UI(15px) · PrimeVue(12px). 위 "16표본 재종합" 절
- **macOS 행 배경색 값** — `Alternating Gray` / `Selected Inactive`가 킷에 변형으로
  열거돼 있으나 실제 색값은 읽지 못했습니다

## 구현 시 기본값

**밀도 — 2단계로 시작합니다** (16표본에서 12개가 밀도·크기 축을 가집니다).

```
comfortable  세로 12px  가로 12px
compact      세로  8px  가로 12px
```

**단계를 더 늘리려면 Carbon의 5단(24 / 32 / 40 / 48 / 64px 행 높이)이
확보 표본의 최대 폭입니다.** 3단이 최빈(7개 시스템)이고, 2단이 그다음입니다.

**세로만 줄이고 가로는 유지하세요.** Cloudscape가 `space-field-horizontal`·
`space-card-horizontal-default`·`space-container-horizontal`·
`space-option-padding-horizontal` 4개를 밀도와 무관하게 둡니다.
가로를 줄이면 밀도가 아니라 가독성이 떨어집니다.

**16표본에서 이 태도가 4개(Cloudscape · Semi · Carbon · Polaris)로 확인되고,
반대 방향은 Ant Design 하나뿐입니다** (middle에서 가로를 16→8로 절반,
세로는 16→12). Semi·Carbon은 밀도 전 단계에서 가로 16px을 고정합니다 —
**독립된 세 시스템이 같은 규칙에 도달했습니다.**

**런타임 배율(`calc(var(--scale) * N)`)로는 이걸 못 합니다** —
가로·세로를 구분할 수 없고, 0px을 만들 수 없습니다.
**밀도 모드를 지원할 계획이면 Cloudscape처럼 토큰 값에 축을 두세요**
(`tokens/scales.md`의 "런타임 배율" 절 참고).

**단계를 3개까지 두려면 Radix Themes 값이 참고 기준입니다.**

```
size 1   패딩  8    최소 높이 36
size 2   패딩 12    최소 높이 44
size 3   패딩 12/16 최소 높이 48
```

**터치 환경이면 최소 행 높이 44px 이상을 쓰세요** — Radix Themes size 2 값이고
Apple 터치 타겟 최소값과 같습니다.

**셀 패딩**

```
가로 8~16px  (기본 12)
세로 8~12px
```

**기본 단계의 하한은 8px입니다** (shadcn/ui · Radix Themes size 1 · Chakra sm ·
Cloudscape). **최소 밀도 단계까지 내려가면 세로 2px · 가로 6px**까지 갑니다
(PrimeVue `sm` · Carbon `xs`, 2026-08-18 정정) — 다만 이 값은
로그·모니터링처럼 스캔이 목적인 화면 전용으로 보는 편이 안전합니다.
데이터 밀도가 목적이 아니면 12px이 무난합니다.

**가로 16px 고정을 기본 축으로 삼는 것도 실제 선택지입니다** —
Carbon·Semi가 밀도 전 단계에서 가로 16px을 바꾸지 않습니다.

**Polaris 데스크톱 배포값(세로 8 / 가로 12)이 위 compact 조합과 일치합니다** —
Cloudscape에서 도출한 "세로만 줄인다"가 독립 시스템의 배포값과 만난 지점입니다.

**행 높이 — 플랫폼과 목적으로 갈립니다** (2026-08-18 2차 정정).

```
터치               44 이상   (Radix Themes size 2 · Apple 터치 타깃)
데스크톱 웹 여유   48~52     (Carbon lg 48 · Vuetify 기본 52)
데스크톱 웹 밀집   32~36     (Polaris 32 · Radix 1 36 · Carbon sm 32 · Vuetify compact 36)
가상 스크롤 그리드 20~34     (Blueprint 20 · EUI DataGrid 34)
데스크톱 네이티브  20~28     (macOS 행 20 · 열 헤더 28)
```

**이전 판은 44px을 단일 기본으로 권했는데, 그것은 터치 기준값입니다.**
데스크톱 밀집 표에서는 과합니다.

**"웹 표본은 고정 높이를 쓰지 않는다"도 정정합니다** — Carbon·Vuetify·Blueprint
세 웹 시스템이 고정 행 높이를 배포합니다. 다만 **파생이 9표본으로 여전히
다수**이므로, 특별한 이유(가상 스크롤·정렬된 행 그리드)가 없으면
최소값만 정하는 쪽이 무난합니다. 테이블 셀에서는 `height`가 `min-height`처럼
동작하므로 `height`로 지정해도 됩니다 (Radix Themes 방식).

**가상 스크롤을 쓸 거면 Blueprint 20px · EUI 34px이 참고 기준입니다**
(기존 판의 "표본에 참고할 값이 없다"를 대체합니다). Blueprint는 서체 12px /
행간 20px, EUI는 34px로 서체 14px 기준입니다.

**경계선 — `box-shadow: inset`을 쓰세요.**

```css
box-shadow: inset 0 -1px var(--gray-a5);
```

**`border`는 `border-collapse: collapse` + `position: sticky`에서 사라집니다.**
Mantine이 고정 헤더에서만 `box-shadow`로 전환하는 이유이고,
Radix Themes는 처음부터 `box-shadow`를 씁니다 — **후자가 단순합니다.**

**색은 알파 토큰을 쓰세요** (`--gray-a5`). 불투명 회색은 줄무늬·hover 배경 위에서
어긋납니다.

**보더 두께에 런타임 배율을 곱하지 마세요.** Mantine이
`calc(0.0625rem * var(--mantine-scale))`로 두어 배율 110%에서 1.1px이 됩니다 —
서브픽셀 렌더링으로 선이 흐려집니다.

**hover — 터치 기기를 분기하세요.**

```css
@media (hover: hover) { tr:hover  { … } }
@media (hover: none)  { tr:active { … } }
```

Mantine 방식입니다. **터치에서 `:hover`는 탭 후 남습니다** —
잘못된 행이 계속 강조돼 보입니다.

**줄무늬는 hover보다 연하게 두세요.** Mantine이 `gray-0`(줄무늬) / `gray-1`(hover)입니다.

**숫자 열에 `font-variant-numeric: tabular-nums`를 쓰세요 — 표 루트에 기본으로
거는 것을 권합니다** (2026-08-18 갱신).

**Chakra UI가 표 `root`에 `lining-nums tabular-nums`를 옵션 없이 겁니다.**
Mantine은 속성으로 켜야 하는 옵션입니다 — 같은 결론에 기본값이 다릅니다.
비례 숫자는 자릿수가 어긋나 열 비교가 어려워지므로 **켜는 쪽이 기본이어야 합니다.**

**캡션은 하단에 두세요.** 두 시스템 모두 브라우저 기본값(상단)을 명시적으로 바꿉니다.

**체크박스 열**

```
우측 패딩 0
수직 정렬을 텍스트와 맞춤
```

`:has([role=checkbox])`로 자동화할 수 있습니다 (shadcn/ui 방식).
토큰으로는 표현되지 않으므로 컴포넌트 구현에 넣습니다.

**고정 헤더**

```
position: sticky
top: var(--sticky-header-offset, 0)
z-index: 1~3  (앱 층위 체계가 있으면 그 안에서)
```

**오프셋을 변수로 두세요** — 페이지에 고정 상단바가 있으면 그 높이만큼 내려야 합니다.
값을 0으로 박으면 상단바 뒤로 헤더가 숨습니다.
**서로 무관한 세 시스템(Chakra `--table-sticky-offset` ·
Mantine `--table-sticky-header-offset` · shadcn/ui)이 같은 이름에 도달했습니다.**

**z-index 값은 교차 권고가 불가능합니다** — 16표본에서 1(Carbon·Chakra·Vuetify) ·
2(Ant) · 3(Mantine) · 101(Semi) · 798(Cloudscape)로 흩어집니다.
**앱 전역 층위 토큰이 있으면 그 안의 값을 쓰고, 없으면 1~3으로 두세요.**
큰 값은 모달·토스트와 충돌합니다.

**표 안의 컴포넌트를 자동으로 좁히는 것을 검토하세요.**
Cloudscape의 `compact-table` 컨텍스트가 17개 토큰을 덮어써서
표 내부 버튼·필드·카드를 compact로 만듭니다. 컴포넌트마다 prop을 내리는 것보다
**토큰 레이어에서 흡수하는 편이 누락이 없습니다.**
