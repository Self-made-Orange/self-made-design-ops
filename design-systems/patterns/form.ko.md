<!-- lang-links -->
> [English](form.md) · **한국어**
<!-- /lang-links -->

# Form

**입력 컨트롤(Input · Select · Checkbox · Radio)을 시스템 간 비교합니다.**

> **이 문서는 프레임워크 계열 3개(shadcn/ui · Mantine · Radix Themes)가
> 들어온 뒤에야 작성 가능해졌습니다.** 세 시스템은 컴포넌트 CSS·소스가 공개돼 있어
> **높이·패딩·라운드·상태색을 값으로 읽을 수 있습니다.**
>
> 그 전에는 근거가 Cloudscape의 `space-field-*` 몇 개뿐이었습니다
> (`README.md`의 "작성 대상 — 남은 것" 참고).
>
> **라벨 위치·필수 표시·에러 표시 시점 같은 지침은 여전히 문서 사이트에만 있습니다.**
> 아래는 토큰·소스에서 확인된 것뿐입니다.

## 입력 필드 높이

| 시스템 | 값 | 기본값 |
|--------|-----|:---:|
| **Mantine** | 30 / 36 / 42 / 50 / 60px | **36 (`sm`)** |
| **Radix Themes** | 24 / 32 / 40px | 32 (size 2) |
| **shadcn/ui** | **36px 단일** | 36 |
| Ant Design | 32px (`controlHeight` 시드) | 32 |
| **Cloudscape** | **`size-vertical-input` 32px / compact 28px** | 32 |
| **Apple iOS (검색 필드)** | **상단 44 / 하단 48pt** | — |

**Apple은 검색 필드 높이가 화면 위치로 갈립니다** — 상단 44pt, 하단 48pt.
버튼 터치 타겟이 상단 44 / 하단 48인 것과 정확히 같은 패턴입니다 (`button.md`).
**표본에서 입력 필드 높이를 화면 위치로 나눈 것은 Apple뿐입니다.**

검색 필드 폭은 두 위치 모두 190pt이며, 상태가 `Placeholder` / `Typing` / `Value` 3종입니다.
iPad 검색 액세서리는 820 × 44로 `Show Filters` True/False 변형이 있습니다.

### 버튼과 높이를 공유하는가

| 시스템 | Button | Input | 일치 |
|--------|--------|-------|:---:|
| **Mantine** | 30/36/42/50/60 | 30/36/42/50/60 | **완전 일치** |
| Radix Themes | 24/32/40/**48** | 24/32/40 | 3단계까지 일치, **48 없음** |
| **shadcn/ui** | 24/32/36/40 | **36 단일** | 기본값만 일치 |

**Mantine만 완전히 일치합니다.** `--button-height-*`와 `--input-height-*`가
같은 값이며 `--section-height-*`도 같습니다. 폼에서 버튼과 입력을 나란히 놓을 때
같은 `size` prop으로 맞춰집니다.

**Radix Themes는 입력에 size 4(48px)가 없습니다.** 버튼은 4단계, 입력은 3단계입니다.
`<Button size="4">`와 `<TextField size="4">`를 나란히 두면 높이가 어긋납니다.

**shadcn/ui는 입력 크기 변형이 없습니다.** Button은 4단계인데 Input은 36px 하나뿐입니다.
Select 트리거만 `data-[size=sm]:h-8`로 32px 변형이 있습니다 — **컴포넌트마다 다릅니다.**

| shadcn/ui 컨트롤 | 크기 변형 |
|------------------|-----------|
| Button | 4 (24/32/36/40) |
| Select 트리거 | 2 (32/36) |
| **Input** | **1 (36)** |
| Checkbox | 1 (16) |

## 입력 패딩

| 시스템 | 좌우 | 상하 |
|--------|:---:|:---:|
| **shadcn/ui** | 12 (`px-3`) | 4 (`py-1`) |
| **Radix Themes** (size 1) | **5** (`calc(space-1 * 1.5 - 1px)`) | — |
| **Radix Themes** (size 2) | **7** (`calc(space-2 - 1px)`) | — |
| **Radix Themes** (size 3) | **11** (`calc(space-3 - 1px)`) | — |
| **Cloudscape** | **12px** (`space-field-horizontal`) | **5px** / compact **3px** (`space-field-vertical`) |

### Cloudscape — 세로만 밀도에 반응합니다

| 토큰 | comfortable | compact |
|------|:---:|:---:|
| `space-field-vertical` | **5px** | **3px** |
| `space-field-horizontal` | 12px | **12px** (동일) |
| `size-vertical-input` | 32px | 28px |

**가로 패딩은 밀도와 무관하게 12px입니다.** 세로만 5→3px로 줄고,
필드 높이가 32→28px이 됩니다.

**5px·3px는 홀수입니다** — 표본에서 드문 값입니다.
`32 - 5×2 - 보더 2 = 20px`이 텍스트 영역이 되고,
이는 Cloudscape 본문(14px)의 행간 20px과 일치합니다. **소스에 근거는 없습니다.**

**Cloudscape의 12px 가로 패딩이 shadcn/ui(12px)와 정확히 같습니다.**

### Radix Themes는 패딩에서 보더 두께를 뺍니다

```css
--text-field-padding: calc(var(--space-2) - var(--text-field-border-width));
/*                          8px          -  1px  = 7px */
```

**시각적 안쪽 여백을 8px로 유지하기 위해 보더 1px을 뺍니다.**
`--text-field-border-width`가 `0px`인 변형(`variant="soft"`)에서는 8px 그대로입니다.

**표본에서 패딩 계산에 보더 두께를 반영하는 것은 Radix Themes뿐입니다.**
다른 시스템은 `box-sizing: border-box`에 맡기고 패딩을 상수로 둡니다.

Mantine도 비슷한 역산을 합니다 — 다만 대상이 **행간**입니다.

```css
--input-line-height: calc(var(--input-height) - calc(0.125rem * var(--mantine-scale)));
/*                        36px               -  2px  = 34px */
```

**높이에서 상하 보더 1px씩을 뺀 값을 행간으로 씁니다.**
텍스트가 필드 안에서 수직 중앙에 오도록 `line-height`로 정렬합니다 (`padding` 대신).

### Radix Themes `text-field.css` — 좌측 여백이 패딩이 아니라 `text-indent`입니다

컴포넌트 CSS 전문에서 확인된 실무 대응 4가지:

- **`text-indent`**: 좌측 여백을 `padding-left`가 아니라 `text-indent`로
  줍니다 — 소스 주석대로 "커서가 끝에 있을 때 긴 값이 잘리지 않게" 하는
  선택입니다. 단 date/time 계열 입력은 Safari 버그 때문에 다시 padding으로
  돌아갑니다 — **브라우저별 예외가 소스에 명시**돼 있습니다.
- **포커스링이 입력이 아니라 Root(래퍼)에** 그려집니다 —
  `:has(.rt-TextFieldInput:focus)` (미지원 브라우저는 `:focus-within` 폴백,
  `@supports selector()`로 분기). 좌우 슬롯(아이콘·버튼)까지 링이 감쌉니다.
- **슬롯 배치가 DOM 순서 무관**입니다 — `order: -1`과 형제 선택자 조합으로,
  side 지정 없는 슬롯 2개를 자동으로 좌/우에 나눕니다.
- **0.5px 서브픽셀 보정**: size 2에만 `padding-bottom: 0.5px` —
  "Chrome이 @2x 화면에서 입력 텍스트 박스를 16.5px로 계산"하는 것에 맞춘
  1px 베이스라인 지터 방지입니다 (소스 주석에 관찰 시점 2023년 11월까지 명시).
- 내부 라운드가 `calc(외부 라운드 - 보더 두께)` — 패딩 역산과 같은 원리를
  라운드에도 적용합니다 (중첩 라운드 공식).

## 라운드

| 시스템 | 값 |
|--------|-----|
| **shadcn/ui** | 8px (`rounded-md`) — Button과 동일 |
| **Radix Themes** | **`max(var(--radius-2), var(--radius-full))`** |
| Mantine | 전역 스케일 (기본 `md` 8px) |
| Ant Design | 전역 단일 6px |

### Radix Themes의 `max()` — `full` 테마에서 알약이 됩니다

```css
--text-field-border-radius: max(var(--radius-2), var(--radius-full));
```

`data-radius="full"`이면 `--radius-full: 9999px`이므로 **입력 필드가 완전한 알약**이 되고,
그 외에는 `--radius-2`(4px × 배율)입니다.

**`max()`로 두 값 중 큰 쪽을 고르는 방식**이며, 조건 분기 없이 테마 축 하나로 처리합니다.
Progress·Slider도 같은 패턴입니다.

## 체크박스 크기

| 시스템 | 값 | 기본값 | 인디케이터 |
|--------|-----|:---:|:---:|
| **Mantine** | 16 / 20 / 24 / 30 / 36px | **20 (`sm`)** | 미확인 |
| **Radix Themes** | **14 / 16 / 20px** | 16 (size 2) | **9 / 10 / 12px** |
| **shadcn/ui** | **16px 단일** | 16 | 14 (`size-3.5`) |

**16px에서 셋이 만납니다.** Mantine `xs` · Radix size 2 · shadcn/ui 단일값이 전부 16px입니다.
Carbon도 16px입니다 (`@carbon/styles` 실측, 2026-08-17).

**단 GOV.UK가 40px로 이 수렴을 깹니다** — 시각 40px + 터치 타겟 44px(거터 4px),
small 변형도 24px. 체크 표시는 이미지가 아니라 CSS 보더로 그립니다
(23×12px, `border-width: 0 0 5px 5px`). 라디오는 포커스 링을 3px+1px로
**곡면 보정**까지 합니다. "16px 수렴"은 소비자·엔터프라이즈 웹의 수렴이고,
저시력·운동 제약 전제의 정부 서비스는 **컨트롤 크기 자체를 2.5배** 키웁니다
(`systems/govuk.md`).

### Radix Themes는 체크박스를 스페이싱 토큰에서 파생시킵니다

```css
--checkbox-size: calc(var(--space-4) * 0.875);   /* 16 × 0.875 = 14 */
--checkbox-size: var(--space-4);                 /* 16 */
--checkbox-size: calc(var(--space-4) * 1.25);    /* 16 × 1.25 = 20 */
```

**`--space-4`(16px) 하나를 기준으로 배율 0.875 / 1 / 1.25를 곱합니다.**
버튼 높이가 `--space-5`~`8`인 것과 같은 방식 — **컴포넌트 치수 전체가
스페이싱 토큰에서 나옵니다.**

라운드도 배율입니다 — `calc(var(--radius-1) * 0.875)` / `var(--radius-1)` /
`calc(var(--radius-1) * 1.25)`. **크기와 라운드가 같은 비율로 함께 커집니다.**

### shadcn/ui는 체크박스 라운드만 리터럴입니다

```
peer size-4 shrink-0 rounded-[4px] border border-input
```

**`rounded-[4px]`** — `--radius` 배율 체계를 타지 않는 유일한 자리입니다.
다른 컨트롤은 전부 `rounded-md`(8px)입니다. 16px 요소에 8px 라운드는 반원에 가까워지므로
값을 직접 박은 형태이지만, **소스에 이유는 적혀 있지 않습니다.**

인디케이터(체크 아이콘)가 14px로 컨테이너(16px)의 87.5%입니다 —
Radix Themes의 9/16 = 56%, 10/16 = 62.5%보다 훨씬 큽니다.

| 시스템 | 컨테이너 | 인디케이터 | 비율 |
|--------|:---:|:---:|:---:|
| **shadcn/ui** | 16 | **14** | **87.5%** |
| Radix Themes (size 2) | 16 | 10 | 62.5% |
| Radix Themes (size 1) | 14 | 9 | 64% |

**shadcn/ui의 체크 표시가 상대적으로 훨씬 큽니다.**

## Radio · Switch — Mantine 실측 (`Radio.css` · `Switch.css`)

체크박스와 같은 수열을 쓰는 이웃 컨트롤 2종의 실값입니다
(체크박스 인디케이터 자체는 여전히 미확인 — `CheckboxIndicator`는 SVG 주입식).

### Radio — 5단계 + 팝 애니메이션

| 축 | xs / sm / md / lg / xl |
|----|------|
| 컨테이너 | 16 / **20(기본)** / 24 / 30 / 36px |
| 도트 | 6 / 8 / 10 / 14 / 16px (컨테이너의 33~47%) |

체크 도트가 **`scale(0.2) + translateY` → `scale(1)`**로 들어옵니다 —
opacity 100ms / transform 200ms의 **이중 트랜지션**이라 커지면서 늦게까지
움직이는 팝 효과입니다. 상태 전환에 키프레임 없이 트랜지션만 쓴 사례.

`outline` 변형은 checked에서 배경을 채우지 않고 보더+도트만 색을 냅니다.

### Switch — 5축이 전부 5단계로 열거됩니다

| 축 | xs / sm / md / lg / xl |
|----|------|
| 높이 | 16 / **20(기본)** / 24 / 30 / 36px |
| 폭 | 32 / 38 / 46 / 56 / 72px |
| 썸 | 12 / 14 / 18 / 22 / 28px |
| 트랙 내 라벨 서체 | **5 / 6 / 7 / 9 / 11px** |
| 썸-트랙 간격 | 2 / 2.5 / 3 / 3 / 3.5px |

- 폭/높이 비율이 일정하지 않습니다 (xs 2.0 → xl 2.0이지만 md 1.92) —
  **각 크기를 따로 조율한 흔적**입니다.
- **트랙 안에 켜짐/꺼짐 라벨을 넣는 전제**라 5~11px 서체 토큰이 있습니다 —
  코퍼스에서 가장 작은 서체 값입니다.
- 썸 이동이 `inset-inline-start` 트랜지션(150ms ease)입니다 —
  `transform` 이동이 아니라 **논리 속성**이라 RTL이 공짜로 따라옵니다.
- 입력이 `opacity: 0`으로 전체 면적에 깔립니다 (클립 은닉이 아님) —
  주석에 "접근성 트리에서 제거하지 않고 시각만 숨긴다"고 명시.
- Radio 크기와 Switch 높이가 **같은 수열**(16/20/24/30/36)입니다 —
  폼 컨트롤 세로 리듬이 하나의 스케일로 통일돼 있습니다. 기본값도 둘 다
  `sm`(20px) — **Mantine은 기본 크기를 스케일 중간이 아니라 아래쪽에 둡니다.**

## Textarea — 세 시스템 실측 (2026-08-18)

| 시스템 | 최소 높이 | 자동 확장 | 상하 패딩 |
|--------|:---:|------|:---:|
| **Mantine** 9.5.1 | **입력 높이와 동일** (`min-height: var(--input-height)` — 기본 36px) | `autosize` prop (`minRows`/`maxRows` 기본값 없음) | multiline 전용 4.5 / **5.5** / 7 / 9.5 / 13px |
| **Radix Themes** 3.3.0 | **48 / 64 / 80px** (size 1~3) | 없음 (`resize` prop만) | `calc(space - 1px)` 보더 역산 (입력과 동일 원리) |
| **shadcn/ui** | **64px** (`min-h-16`) | **`field-sizing-content`** (CSS만으로 확장) | 8 (`py-2`) |

- **Mantine은 Textarea 최소 높이가 한 줄 입력과 같습니다** — `data-multiline`이
  `--input-size: auto`로 풀고 `min-height`만 남깁니다. 행간도 고정 행간
  (`--mantine-line-height`)으로 되돌립니다 (한 줄 입력은 `height - 2px` 행간)
- **Radix Themes는 크기 단계마다 최소 높이를 명시합니다** — size 1 `--space-8`(48),
  size 2 `--space-9`(64), size 3만 리터럴 80px. 스페이싱 토큰이 9에서 끝나
  마지막 단계는 토큰 밖으로 나간 형태입니다 (`text-area.css`)
- **shadcn/ui는 자동 확장을 JS 없이 CSS `field-sizing: content`로** 합니다 —
  표본 유일. 미지원 브라우저에서는 고정 64px로 동작합니다
- **행 수(rows) 규격은 세 시스템 모두 없습니다** — 최소 높이(px)로만 규정합니다

### 대조 — M3의 Switch는 핸들이 상태에 따라 커집니다

androidx 생성 토큰(2026-08-17): 트랙 52×32dp 고정에 **핸들이
미선택 16 → 선택 24 → 누름 28dp**로 변합니다. Mantine이 크기 축(5단계)을
가진 대신 상태 불변인 것과 정반대 —
**같은 컴포넌트에서 "크기 축"과 "상태 축" 중 무엇을 핸들 크기에 쓰는지**가
갈립니다. 또 Checkbox 18dp·Radio 20dp에 **StateLayer 40dp**를 겹쳐
시각 크기와 터치 타겟을 분리합니다 (`systems/material-3.md`).

## 에러·검증 상태 — 세 가지 방식

| 시스템 | 방식 | 훅 |
|--------|------|-----|
| **shadcn/ui** | **ARIA 속성** | `aria-invalid:border-destructive` |
| **Mantine** | **전용 색 토큰** | `--input-bd: var(--mantine-color-error)` |
| **Radix Themes** | **에러 셀렉터 없음 (확인)** — 사용자 코드 영역 | 3.3.0 전 CSS에서 `invalid`/`error` 셀렉터 0건 |
| Atlassian | 보더 두께 (선택/포커스만) | `border.width.focused` |

### shadcn/ui — `aria-invalid`가 스타일 훅입니다

```
aria-invalid:border-destructive
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
```

**`error` prop이 없습니다.** ARIA 속성을 붙이면 스타일이 따라옵니다.

| 장점 | 대가 |
|------|------|
| 접근성 속성과 시각 상태가 어긋날 수 없음 | 시각적 에러만 표시할 방법이 없음 |
| prop 하나가 줄어듦 | 스크린리더에 알리지 않는 경고 표현이 불가능 |

**표본에서 접근성 속성을 시각 상태의 유일한 소스로 삼은 것은 shadcn/ui뿐입니다.**
Button·Input·Select·Checkbox 전부에 같은 규칙이 적용됩니다.

다크 모드에서 링 알파가 20%→40%로 올라갑니다 — 어두운 배경에서 20%는 보이지 않습니다.

### Mantine — `error`와 `success` 둘 다 토큰입니다

```css
--input-bd: var(--mantine-color-error);
--input-bd: var(--mantine-color-success);
```

**`success` 상태를 토큰으로 두는 것은 Mantine뿐입니다.**
shadcn/ui는 상태색이 `destructive` 하나뿐이라 성공 상태를 표현할 토큰이 없습니다
(`color.md` 참고).

Mantine은 텍스트 색도 갈립니다 — `--input-color: var(--mantine-color-error)`.
**보더와 텍스트가 함께 바뀝니다.**

Mantine도 `error` prop이 있으면 `aria-invalid: true`를 자동으로 붙입니다
(`Input.tsx`, `withAria` 기본 true) — 시각 훅은 토큰이지만 접근성 속성은
shadcn/ui와 같은 결과가 됩니다.

### Radix Themes — 에러 상태가 아예 없습니다 (2026-08-18 확인)

`@radix-ui/themes@3.3.0` 전체 CSS(`src/` · `styles/`)를 검색한 결과
`data-invalid` · `:invalid` · `:user-invalid` · `error` 셀렉터가 **0건**입니다.
`--text-field-*`에 에러 색 변수가 없는 것이 우연이 아니라 —
**에러 표시 자체를 컴포넌트 밖(사용자 코드)에 맡기는 구조**입니다.
색만 쓰려면 `color="red"` prop으로 강조색을 바꾸는 우회가 있을 뿐,
검증 상태라는 개념이 스타일 층에 없습니다.

## 포커스 표시

| 시스템 | 방식 | 값 |
|--------|------|-----|
| **shadcn/ui** | 테두리 색 + **3px 링** | `border-ring` + `ring-[3px] ring-ring/50` |
| **Radix Themes** | **테두리 색만** | `--text-field-focus-color: var(--accent-8)` |
| **Mantine** | **테두리 색만** | `--input-bd-focus: var(--mantine-primary-color-filled)` |
| Atlassian | **보더 두께 2px** | `border.width.focused` |
| Cloudscape | 라운드만 확인 | `border-radius-control-default-focus-ring` 4px |

**Mantine·Radix Themes는 링을 그리지 않고 테두리 색만 바꿉니다.**
레이아웃이 흔들리지 않지만 **대비가 낮은 배경에서 눈에 덜 띕니다.**

**Radix Themes는 포커스 색을 세 가지로 분기합니다.**

| 변형 | 포커스 색 |
|------|-----------|
| 기본 | `--accent-8` (강조색) |
| `data-*` 조건 | `--focus-8` (**전용 포커스 색 계열**) |
| 회색 변형 | `--gray-8` |

**`--focus-*`가 강조색과 독립된 색 계열입니다.** 강조색을 노란색으로 바꿔도
포커스 표시가 노란색이 되지 않습니다 — 표본에서 포커스 전용 색 계열을 둔 것은
Radix Themes뿐입니다.

**Mantine은 반대로 주 색상을 그대로 씁니다** (`--mantine-primary-color-filled`).
브랜드 색이 곧 포커스 색입니다.

## 커서 — Radix Themes만 토큰입니다

| 토큰 | 값 |
|------|-----|
| `--cursor-checkbox` | `default` |
| `--cursor-radio` | `default` |
| `--cursor-switch` | `default` |
| `--cursor-disabled` | `not-allowed` |
| `--cursor-link` | `pointer` |

**체크박스·라디오·스위치가 전부 `default`입니다.** `pointer`가 아닙니다.
`pointer`는 링크에만 씁니다.

Mantine은 토큰은 아니지만 **입력 종류에 따라 커서를 나눕니다** —
`--input-cursor: text` (텍스트 입력) / `pointer` (Select 등 선택형).

| 시스템 | 폼 컨트롤 커서 |
|--------|----------------|
| **Radix Themes** | `default` (토큰) |
| **Mantine** | `text` / `pointer` (컴포넌트별) |
| shadcn/ui | `default` (`disabled:cursor-not-allowed`만 명시) |

**세 시스템이 다 다릅니다.** 비활성 상태만 `not-allowed`로 일치합니다.

## Select 드롭다운

**shadcn/ui만 값이 확인됩니다.**

| 항목 | 값 |
|------|:---:|
| 트리거 높이 | 36 (`default`) / 32 (`sm`) |
| 트리거 패딩 | 좌우 12 / 상하 8 |
| 콘텐츠 최소 너비 | 128 (`min-w-[8rem]`) |
| 콘텐츠 최대 높이 | `--radix-select-content-available-height` (런타임) |
| **항목 패딩** | **좌 8 / 우 32 / 상하 6** |
| 라벨 | 좌우 8 / 상하 6 / 12px 텍스트 |
| 체크 아이콘 | 14 (`size-3.5`), 우측 8 |
| 아이콘 | 16 (`size-4`) |

**항목의 우측 패딩(32)이 좌측(8)의 4배입니다** — 체크 표시 자리입니다.
체크 아이콘이 14px인데 32px을 비웁니다.

**최대 높이가 런타임 값입니다** — `--radix-select-content-available-height`는
Radix Primitives가 뷰포트를 측정해 주입합니다. 토큰으로 고정하지 않습니다.

방향별 진입 애니메이션 4종 — `data-[side=bottom]:slide-in-from-top-2` (8px 이동).
**Atlassian의 `motion.popup.enter.{top,bottom,left,right}`와 같은 구조**이며,
Atlassian은 지속시간(150ms)·이징까지 토큰으로 둡니다 (shadcn/ui는 클래스에 박혀 있음).

## 판단 지침 — 문서 층 실측 (2026-08-18)

문서 사이트가 열린 환경에서 8개 시스템(M3 · Atlassian · Spectrum · Polaris ·
Carbon · Primer · Cloudscape · GOV.UK)의 지침 페이지를 직접 읽었습니다.
"규정 없음"은 해당 페이지를 읽고 부재를 확인한 것입니다.

### 라벨 위치 — "위"가 6/8, 플로팅 기본은 M3뿐

| 진영 | 시스템 |
|------|--------|
| **위(above)** | Carbon("유일하게 제공하는 배치") · Atlassian(위+좌측정렬) · GOV.UK · Cloudscape · Primer(vertical 기본, horizontal은 체크박스 전용) · Spectrum(기본 — side는 세로 공간 부족 시) |
| 플로팅 | **M3만 기본** (선택 시 라벨이 중앙→상단 이동, 항상 표시) |
| 규정 없음 | Polaris 현행(web components) — visible/숨김 옵션만 |

**왼쪽 배치를 기본으로 두는 시스템은 0개입니다.** Spectrum만 옵션으로
허용하며 사유를 명시합니다("세로 공간이 제한될 때"). Carbon은 top-aligned가
"오류 최소화가 중요한 폼에 이상적"이라고 근거까지 적습니다.

### 필수 표시 — 세 진영으로 갈리고, 별표 금지·강제가 공존

| 진영 | 시스템 | 상세 |
|------|--------|------|
| **필수에 `*`** | Atlassian · M3 · Primer | Atlassian은 빨간 `*` + **폼 상단 레전드 문구까지 고정** ("Required fields are marked with an asterisk \*"). M3도 별표 의미 설명을 필수로 요구 |
| **선택만 표시** | GOV.UK · Cloudscape | GOV.UK는 **"Never mark mandatory fields with asterisks"** — 별표 명시 금지. Cloudscape는 "- optional" 접미 |
| **소수파만 표시** | Carbon · Spectrum | 폼에서 빈도가 적은 쪽만 표기 (85%가 선택이면 required만). Spectrum은 "`*`로 optional 표기 금지" |

**같은 질문에 정면충돌하는 규정입니다** — Atlassian은 별표를 강제하고
GOV.UK는 금지합니다. 교차 권고값이 없는 축이므로, 제품 도메인
(정부·공공 = GOV.UK 진영 / 엔터프라이즈 = 별표 진영)으로 고르세요.

### 에러 표시 시점 — blur 다수, GOV.UK만 제출 전용을 명문화

| 시점 | 시스템 |
|------|--------|
| **blur** | Carbon(클라이언트 검증 "필드가 포커스를 잃는 즉시") · Cloudscape(기본. + 에러 수정 중에는 키 입력마다 재검증) · Atlassian(접근성 가이드 "Validate field onBlur") |
| **제출 시** | **GOV.UK — "Do not validate when the user moves away from a field"** (blur·실시간 모두 금지, 에러 1건이라도 error summary 필수) · Primer(웹 기본 동작 존중, 에러 3개↑면 상단 Banner 요약) |
| 입력 중 | Polaris("as they type, not just after they submit") |
| 규정 없음 | M3 · Spectrum (확인함) |

- **"invalid 상태의 필드만 입력 중 재검증"**은 Cloudscape·Primer가
  독립적으로 같은 규칙입니다 — 에러 해제는 즉시, 에러 발생은 blur 후.
- 공통 금지: 첫 방문 시 검증(Cloudscape) · 제출 버튼 비활성화(Atlassian
  "Never disable a submit button", Cloudscape 동일, Carbon은 짧은 폼만 허용).

## 아직 못 채운 것

- ~~라벨 위치 / 필수 표시 방식 / 에러 표시 시점~~ → **해소 (2026-08-18)** —
  위 "판단 지침 — 문서 층 실측" 절. `aria-invalid`를 언제 붙이는지는
  여전히 사용자 코드 영역입니다 (shadcn/ui 소스에 없음)
- ~~헬프텍스트·에러 메시지 간격~~ → **해소 (2026-08-18)** —
  `--input-bottom-section-height: 28px`는 헬프텍스트가 **아닙니다**:
  Textarea 전용 `bottomSection` prop의 슬롯으로, 보더 **안쪽** 하단에
  absolute로 깔리는 영역입니다 (`Input.module.css` `.bottomSection`).
  실제 입력↔에러/설명 간격은 `--input-margin-top/bottom:
  calc(var(--mantine-spacing-xs) / 2)` = **5px** (wrapper 순서에 따라
  조건부 적용, `get-input-offsets.ts`). 에러·설명 서체는 `sm - 2px` = 12px,
  행간 1.2, 자체 마진 0 (`@mantine/core@9.5.1`)
- ~~Radio·Switch 치수~~ → **해소** — 위 "Radio · Switch — Mantine 실측" 절
  (9.5.1 `Radio.css`·`Switch.css` 재확인 일치: 컨테이너 16/20/24/30/36 등)
- ~~Radix Themes 에러 상태~~ → **해소 (2026-08-18) — 속성 셀렉터 부재 확정.**
  3.3.0 전 CSS에서 `invalid`/`error` 셀렉터 0건. 위 "Radix Themes —
  에러 상태가 아예 없습니다" 절
- ~~Textarea~~ → **해소 (2026-08-18)** — 위 "Textarea — 세 시스템 실측" 절.
  최소 높이 Mantine 36(입력과 동일) / Radix 48·64·80 / shadcn 64px.
  행 수 규격은 세 시스템 모두 부재 확인
- ~~입력 최소 너비 — 어느 시스템에도 없습니다~~ → **정정 (2026-08-18)**:
  13개 이상에서 확인됩니다 (Canvas 280 · Codex/Protocol 256 · Yoga 320 고정 ·
  NYSDS는 폭이 크기 축 · EUI는 max-width 400). 위 재종합 절 참조
- **다국어 대응** — shadcn/ui Input의 `text-base md:text-sm`(모바일 16 / 데스크톱 14)이
  유일한 반응형 처리입니다. CJK·RTL 관련 폼 규격은 어느 시스템에도 없습니다

## 78표본 재종합 — 컴포넌트 실측 (2026-08-18)

`partial` 수집 심화로 입력 실측이 78개 시스템으로 늘어, 이 문서의 결론을 그 표본으로 재검증했습니다.

### 버튼↔입력 높이 정합 — 다수가 맞춥니다 (권고의 근거가 확보됨)

| 관계 | 시스템 |
|------|--------|
| **완전 공유** (같은 사다리) | Asphalt · Astro · Bootstrap(구조) · Braid · DSFR · Evergreen · **Gestalt** · Helios · HeroUI · Kontur · LeafyGreen · Naive UI · Nord · Pajamas · Paste · Ring UI · Semi · SGDS · Shoelace · Siemens iX · Skeleton · SmartHR · Tegel · Thumbprint · Vanilla · Vapor · Vibe · Vibes · Vitamin · Welcome UI |
| 부분 공유 (한 단만 갈림) | Backpack · Base Web · bf-solid · Blueprint · Chakra(2xs만) · Charcoal · EUI · Intergalactic · NYSDS · Park UI(입력에 2xs 추가) · Pharos(입력=large 버튼) · Spindle · Strapi |
| **불일치** | Auro 58 단일 vs 버튼 5단 · Canvas 40 단일 vs 4단 · Cedar 40 vs 38 · HSDS 42 vs 40 · Kaizen 48 vs 40 · MUI 40/56 vs 36.5 · Orbit 44 단일 vs 3단 · **Origami 44 vs 28(16px 격차)** · Stacks 5단 vs 3단 · Vuetify 밀도만 vs 크기×밀도 |

**약 30개 시스템이 버튼과 입력 높이를 맞춥니다** — 기존 권고("버튼과 같은 스케일을
쓰세요")가 4표본 관찰에서 나온 것이었는데, 78표본에서 **다수 관행으로 확인**됐습니다.

정합을 만드는 방법은 세 가지로 갈립니다:

- **선언 공유**: **Gestalt**가 가장 강합니다 — 버튼과 입력이 *같은 CSS 클래스*
  (`layout.small/medium/large`)로 `min-height`를 선언합니다. 값이 같은 게 아니라
  선언이 하나입니다. **Shoelace**는 버튼 전용 높이 토큰을 아예 두지 않고
  `--sl-input-height-*`를 그대로 씁니다.
- **변수층 공유**: **Bootstrap·SGDS**의 `$input-btn-*` — 패딩·서체·행간·보더·포커스를
  한 변수군에서 파생시켜 값이 아니라 **구조로 정렬을 강제**합니다.
- **참조 강제**: **PrimeVue**는 버튼 치수 토큰이 전부 `{form.field.*}` 참조라
  정의상 어긋날 수 없습니다.

**Origami의 16px 격차가 실패 사례로 유용합니다** — 버튼이 구 타이포 스케일,
입력이 신 foundation을 참조해 **토큰 세대 단층이 배포본에 그대로 남았습니다**.

### 입력 최소·기본 너비 — "어느 시스템에도 없다"는 틀렸습니다

| 방식 | 시스템 |
|------|--------|
| **min-width** | Canvas 280 · Codex 256 · Protocol 256(콘텐츠 폭 토큰에서 역산) · Pluralsight 192 · Asphalt 160 · Braid — |
| **고정 기본 폭** | Yoga 320 · Mística 328 · Nord 240(옵트인 `expand`로 확장) · Vibes 폭 프리셋 4단 64/112/176/384 · NYSDS **폭이 크기 축**(88/200/384) · Ring UI 96/240/400 |
| **max-width** | EUI 400(`base×25`) · Serendie `min(100%, 300px)` |

> **정정.** 기존 "입력 최소 너비 — 어느 시스템에도 없습니다"는 **13개 이상 시스템에서
> 반증**됩니다. 특히 **NYSDS는 높이 변형이 없고 폭이 크기 축**이며, **Vibes는 컨트롤 폭을
> T셔츠 사이즈로 토큰화**합니다. i18n 텍스트 확장 대응이 최소 너비(Canvas 280)와
> 최대 너비(EUI 400) 양방향으로 갈린다는 것도 이번에 드러났습니다.

### 보더를 전담 레이어로 분리하는 진영

**HSDS(`BackdropUI`) · Intergalactic(`SOutline`) · Orbit(`fake-input`) ·
Thumbprint(`inputStyles`)** — 네 시스템이 독립적으로 **실제 `<input>`은 투명하게 두고
형제/부모 레이어가 보더·배경·포커스를 그리는** 구조에 도달했습니다.
아이콘·버튼을 필드 안에 끼워도 보더가 한 겹으로 유지되는 것이 공통 동기입니다.

`border` 대신 **inset box-shadow**를 쓰는 쪽은 더 넓습니다 — Pajamas · Paste · Skeleton ·
Vapor · Vitamin · Cedar · Astro · Blueprint · Braid · Seed · Kontur.
**Pajamas는 `forced-colors: active`에서만 실보더를 복원**합니다(그림자는 고대비 모드에서
사라지므로) — 이 진영이 놓치기 쉬운 지점을 처리한 유일 표본입니다.

### iOS 자동 확대 방지 — 같은 문제, 일곱 가지 해법

16px 미만이면 iOS Safari가 포커스 시 페이지를 확대하는 문제를 시스템마다 다르게 풉니다:

| 해법 | 시스템 |
|------|--------|
| 모바일에서 서체를 16px로 승급 | Bolt(전역 강제) · Nord(`≤480px` 미디어쿼리) · Strapi(반응형 토큰 16→14px) · Priceline(prop 기본값 `[2,null,1]`) |
| 입력 서체를 아예 본문보다 크게 | Orbit 16px(본문 15px) |
| `@supports`로 iOS만 분기 | Stacks(패딩까지 재보정) |
| **16px로 렌더 후 축소** | **Charcoal — `transform: scale(0.875)`로 시각 14px, 전 치수를 `calc(…/0.875)`로 역보정** |

**Charcoal의 해법이 유일하게 "CJK 14px 관행"과 "iOS 16px 규칙"을 동시에 만족시킵니다** —
나머지는 둘 중 하나를 포기합니다.

### 포커스 — 레이아웃 시프트 회피가 설계 축입니다

포커스 시 보더가 굵어지면 요소가 밀리는 문제를, 여섯 시스템이 각기 다르게 막습니다:

- **NYSDS**: 보더는 그대로 두고 `outline`을 덧그림
- **eBay·Park UI·Nord**: 보더색 + 같은 색 `box-shadow 0 0 0 1px`로 시각 2px
- **Seed**: `::after` 2px 보더를 미리 깔아두고 focus에서 **색만** 켬
- **Base Web**: 보더를 항상 2px로 두고 색만 교체
- **Kontur**: 토큰 값 자체가 `calc(2px - 1px)` — 링에서 보더 몫을 뺀다는 의도를 값에 박음

**반대로 KRDS는 보더 두께를 1→2px로 바꾸는 유일 표본**이고, **Intergalactic은 포커스
링 색이 상태에 종속**(valid 초록 / invalid 빨강)됩니다 — "포커스=파랑" 관행의 예외입니다.

### 라벨 — 코드 층도 "별도 블록"이 압도적

별도 블록 요소: Backpack · Base Web · Braid · Canvas · Cedar · Clarity · Codex ·
DSFR · EUI · Evergreen · Forma 36 · Gestalt · Grommet · Orbit · Origami · Pajamas ·
Pharos · Protocol · Ring UI · Stacks · Thumbprint · Vanilla · Vibe · Vitamin.
플로팅: **Audi · Auro · Bolt · Mística · MUI · Unify · Vuetify · Yoga**(8개).

**문서 층 결론(플로팅 기본은 M3뿐)과 코드 층이 일치합니다.** 다만 구현 방식이 갈립니다 —
`<fieldset>/<legend>` 노치(**Yoga·Vuetify**)와 절대배치 축소(**MUI·Mística·Unify**).
**Mística는 축소 배율이 상수 0.75가 아니라 `라벨크기 ÷ 값크기` 나눗셈**이라 스킨마다 달라집니다.
**Odyssey는 MUI를 쓰면서 플로팅 라벨을 코드로 꺼서** 상단 고정 블록으로 되돌립니다.

### 라운드 — 버튼과 입력을 일부러 다르게 두는 진영

| 시스템 | 버튼 | 입력 |
|--------|:---:|:---:|
| **Kontur** | 8px | **2px** |
| **Charcoal** | 999999px(알약) | **4px** |
| **PIE** | 50rem(알약) | **12px** |
| **Grommet** | 18px(높이 절반) | **4px** |
| Pluralsight | 3px | 2px |

**"누르는 것은 둥글게, 쓰는 것은 각지게"** — Kontur는 라운드 토큰을 크기별로 분리해
두고도 값은 셋 다 8px로 두어, 갈리는 축이 크기가 아니라 **컴포넌트 종류**임을 드러냅니다.

## 구현 시 기본값

**입력 높이 — 버튼과 같은 스케일을 쓰세요.**

```
데스크톱 웹    40  (78표본 최빈 — 버튼과 같은 값. 이전 판 36px에서 정정)
밀집 화면      32  (Codex·Pajamas·Semi·Vapor 기본 · Ant · Radix size 2)
터치           48  이상 (Braid는 터치 타깃 토큰 48px을 컨트롤 높이의 단일 원천으로 씀)
```

**버튼과 입력을 같은 값으로 두는 것이 다수 관행입니다** — 78표본에서 약 30개가
높이 사다리를 공유합니다 (위 재종합 절).

**Mantine처럼 Button·Input·Section이 같은 높이 변수를 공유하는 구조를 권합니다.**
Radix Themes는 Button에만 48px 단계가 있어 `size="4"`에서 어긋납니다 —
**단계 수를 컴포넌트마다 다르게 두면 조합에서 사고가 납니다.**

**입력에 크기 변형을 둘지 초기에 정하세요.** shadcn/ui는 Input을 36px 단일로 두고
Button만 4단계입니다. 같은 폼 안에서 크기를 맞출 수 없습니다.

**패딩**

```
좌우 12  상하 4~8   (높이 36 기준)
```

**보더 두께를 패딩에서 뺄지 정하세요.** Radix Themes는 뺍니다
(`calc(var(--space-2) - 1px)`). 시각적 여백이 일정해지지만 계산이 늘어납니다.
`box-sizing: border-box`로 두고 패딩을 상수로 쓰는 쪽이 단순합니다.

**텍스트 수직 정렬을 `line-height`로 할지 `padding`으로 할지 정하세요.**
Mantine은 `line-height: calc(height - 2px)`로 처리합니다 —
높이가 바뀔 때 자동으로 따라옵니다.

**체크박스**

```
16px  (인디케이터 10~14px)
```

**세 시스템이 16px에서 만납니다.** 크기 변형을 둘 거면
Radix Themes처럼 `--space-4`에 배율(0.875 / 1 / 1.25)을 곱하는 방식이
스페이싱 스케일과 어긋나지 않습니다.

**라운드를 크기에 비례시키세요.** 16px 요소에 8px 라운드는 반원에 가까워집니다.
shadcn/ui가 이 자리만 리터럴 `4px`을 쓰는 이유입니다 — **비례 규칙이 있으면
예외를 만들 필요가 없습니다** (Radix Themes 방식: `calc(var(--radius-1) * 0.875)`).

**에러 상태 — `aria-invalid`를 훅으로 쓰는 것을 권합니다** (shadcn/ui 방식).
접근성 속성과 시각 상태가 어긋날 수 없습니다.

**단, `success` 상태가 필요하면 별도 토큰을 두세요.** Mantine이
`--mantine-color-success`를 두는 유일한 사례이고, shadcn/ui에는 표현할 토큰이 없습니다.

**포커스 표시 — 링을 그리세요.**

```
2px 링 + 테두리 색 변경
```

Mantine·Radix Themes처럼 **테두리 색만 바꾸면 대비가 낮은 배경에서 눈에 덜 띕니다.**
shadcn/ui의 3px은 표본에서 가장 두꺼우며, 2px이 다수입니다.

**포커스 색을 강조색과 분리할지 정하세요.** Radix Themes만 `--focus-*` 계열을
독립적으로 둡니다 — 브랜드 색을 바꿀 때 포커스 가시성이 함께 흔들리지 않습니다.

**커서**

```
텍스트 입력   text
선택형        pointer  또는  default
비활성        not-allowed
```

**체크박스·스위치에 `pointer`를 쓸지는 갈립니다.** Radix Themes는 `default`,
Mantine은 선택형에 `pointer`입니다. **한 번 정하고 전 컨트롤에 같이 쓰세요.**

**Select 드롭다운**

```
최소 너비 128px
항목 패딩 좌 8 / 우 32 / 상하 6
최대 높이 런타임 측정 (뷰포트 기준)
```

**최대 높이를 상수로 두지 마세요.** 뷰포트 하단에 가까운 트리거에서 잘립니다.
Radix Primitives의 `--radix-select-content-available-height`처럼
런타임 측정값을 쓰는 방식이 표본에서 유일한 해법입니다.

**체크 표시 자리를 미리 비우세요.** 우측 패딩 32px입니다.
선택 상태에 따라 패딩이 바뀌면 항목이 좌우로 움직입니다.
