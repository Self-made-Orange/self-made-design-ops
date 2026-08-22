<!-- lang-links -->
> [English](button.md) · **한국어**
<!-- /lang-links -->

# Button

**버튼 실측이 확보된 시스템은 77개입니다** (2026-08-18 재종합).
개별 값은 각 `systems/*.md`의 "컴포넌트 심화" 절에 있고, 이 문서는 **분포와 교차 결론**만 담습니다.
아래 표들은 초기 표본(프레임워크 계열 중심)으로 작성된 것이며, 77표본 기준 재검증은
"77표본 재종합" 절에 있습니다 — **둘이 어긋나면 재종합 절이 우선입니다.**

> 컴포넌트 사용 지침(어느 변형을 언제 쓰는가)은 각 시스템 문서 사이트에 있고
> 이 환경에서 차단돼 있습니다. 아래는 **토큰·소스 코드·실측 치수에서 확인된 것**뿐입니다.
>
> **프레임워크 계열 4개가 들어오며 이 문서의 근거가 크게 늘었습니다.**
> shadcn/ui는 컴포넌트 소스가 공개돼 있어 **변형·상태·치수·패딩을 전부 읽을 수 있습니다** —
> 표본에서 이 정도까지 확인된 유일한 시스템입니다.

## 높이 / 터치 타겟

| 시스템 | 값 | 출처 |
|--------|:---:|------|
| Material 3 | 48dp (최소 터치 타겟) | 문서 관행 |
| **Material 3 Expressive — 버튼 5단계** | **32 / 40 / 56 / 96 / 136dp** (기본 Small=40) | androidx 생성 토큰 |
| **Apple iOS — 상단 툴바** | **44pt** | Figma 실측 |
| **Apple iOS — 하단 툴바** | **48pt** | Figma 실측 |
| Apple iOS — 시트 툴바 | 44pt | Figma 실측 |
| Apple iOS — 텍스트 버튼 | 36pt | Figma 실측 |
| Apple iOS — 뒤로 버튼 | 36pt | Figma 실측 |
| visionOS — 드롭다운 | 44pt | Figma 실측 |
| Ant Design | 32px (`controlHeight` 시드) | 토큰 |
| Orbit | 16 / 24 / 32 / 44 / 52px (`size` 스케일) | 토큰 |
| **Mantine** | **30 / 36 / 42 / 50 / 60px** (`xs`~`xl`, 기본 `sm`=36) | CSS 변수 |
| **Radix Themes** | **24 / 32 / 40 / 48px** (size 1~4) | `--space-5`~`8` 참조 |
| **shadcn/ui** | **24 / 32 / 36 / 40px** (`xs`/`sm`/`default`/`lg`) | 소스 클래스 |
| **Cloudscape** | ≈32px (패딩 파생) — 라운드 **20px 알약**, 보더 2px | 컴포넌트 CSS |
| **Garden** | 32 / **40** / 48px | 클래식 CSS |
| **Atlassian** | **32** / 24(compact)px — 구버전은 `32/14em` | 빌드 산출물 |
| **Orbit (폼 공통)** | 32 / **44(기본)** / 52px | 토큰 dist |

### 프레임워크 3개의 높이 스케일 — 기준이 다릅니다

| 단계 | Mantine | Radix Themes | shadcn/ui |
|:---:|:---:|:---:|:---:|
| 1 | 30 | **24** | **24** |
| 2 | 36 | 32 | 32 |
| 3 | 42 | 40 | **36** |
| 4 | 50 | 48 | 40 |
| 5 | 60 | — | — |
| **기본값** | **36 (`sm`)** | 32 (size 2) | **36 (`default`)** |

- **Radix Themes만 8px 등차**입니다 (24/32/40/48). 스페이싱 토큰(`--space-5`~`8`)을
  그대로 높이로 쓰기 때문입니다
- **Mantine 증분은 +6/+6/+8/+10**으로 위로 갈수록 벌어집니다. 최대 60px으로 가장 큽니다
- **shadcn/ui는 3단계가 36px**로 앞뒤(32→36→40) 증분이 4px입니다.
  다른 둘보다 촘촘하고 최대가 40px로 가장 낮습니다
- **기본값이 Mantine·shadcn/ui 모두 36px**입니다. 서로 다른 단계 이름인데 값이 같습니다
  (`sm` vs `default`)
- **셋 다 44~48pt 터치 타겟을 기본값으로 충족하지 못합니다.**
  Mantine `lg`(50) · Radix size 4(48) · shadcn/ui는 어떤 단계로도 48에 못 미칩니다.
  **웹 데스크톱 전제입니다** — 반례가 **Orbit**입니다: 폼 공통 높이의
  기본값이 **44px**로, 웹 시스템 중 유일하게 기본값부터 터치 타겟을
  충족합니다 (여행 B2C 모바일 웹 전제, `systems/orbit.md`)

### 갈리는 지점

**Apple은 화면 위치에 따라 터치 타겟이 다릅니다.** 상단 44pt, 하단 48pt.
단일 최소값을 두는 Material 3(48dp)과 구조가 다릅니다.
킷에 이유는 적혀 있지 않습니다.

**아이콘 버튼과 텍스트 버튼 높이가 다릅니다.** Apple iOS는 심볼 버튼 44pt,
텍스트 버튼 36pt입니다. 같은 툴바 안에서 8pt 차이가 납니다.

**Ant Design은 32px입니다.** 44~48 계열보다 낮습니다 —
데스크톱 엔터프라이즈 전제이며, `controlHeight` 시드에서 파생됩니다.

### 데스크톱↔터치 이중 크기 — 3가지 해법 (`full` 수집 2차 심화)

같은 문제("포인터는 작게, 손가락은 크게")를 세 시스템이 다르게 풉니다:

| 시스템 | 방식 | 값 |
|--------|------|-----|
| **Spectrum** | **스케일 통째 교체** (medium/large 토큰 파일 2벌) | 버튼 32 → 40px, 전 단계 ×1.25 |
| **Polaris** | 브레이크포인트 분기 (48em) | Micro 28(모바일) → 24px(데스크톱) |
| **Lightning** | 개별 터치 토큰 병기 | 행높이 30 → `-touch` 42.4px |

Spectrum의 ×1.25 일괄 배율이 가장 체계적이고, Polaris는 방향이 반대라는 점
(모바일이 기본, 데스크톱이 축소)이 특징입니다.

**`full` 수집 컴포넌트 CSS 심화(2026-08-17)에서 세 가지 새 축이 나왔습니다:**

- **Carbon**: 기본 48px에 **최소 폭 176px 토큰**(`$button-min-inline-size`) —
  높이는 컨텍스트 레이아웃 토큰(xs 24~2xl 80, 6단계)에서 상속 가능.
  ~~표본 유일~~ → **Fluent 2도 최소 폭 규격 보유**(small 64 / medium 96px)
  — 2표본, 값은 Carbon의 절반대.
- **Polaris**: **높이가 뷰포트 반응형** — Micro가 모바일 28px, 데스크톱(48em+)
  24px. 컨트롤 높이에 브레이크포인트를 넣은 표본 유일. `min-width`=높이로
  정사각 최소 면적 보장.
- **GOV.UK**: **높이 토큰이 없습니다** — 서체 19px+패딩 파생이며, 하단 2px
  그림자를 시각 높이 일부로 계산해 패딩에서 뺍니다. 누름이 `top: 2px`
  (제 그림자 위로 주저앉는 물리 은유, shadcn 1px 하강의 2배).

**M3 Expressive가 위쪽 극단을 새로 열었습니다** — Large 96 · XLarge **136dp**
(androidx 생성 토큰, 2026-08-17). 기존 표본 최대 60px(Mantine `xl`)의 2배가
넘습니다. 히어로 CTA를 버튼 컴포넌트 스케일 안으로 편입한 형태이며,
**누르면 라운드가 한 단계 조여지는 셰이프 모프**(`PressedContainerShape`)가
토큰으로 규격화돼 있습니다 — 상태가 색이 아니라 **모양**을 바꾸는 유일 표본
(`systems/material-3.md` 컴포넌트 치수 절).

## 라운드

| 시스템 | 값 | 비고 |
|--------|:---:|------|
| **Cloudscape** | **20px** | 컨테이너(16px)보다 큼 |
| Material 3 | 컴포넌트별 (토큰에 buttons 계열 있음) | |
| Ant Design | 6px (전역 단일) | |
| Lightning | 2 / 4 / 8px 중 선택 | 전역 스케일 |
| Helios | 3 / 5 / 6 / 8px 중 선택 | 전역 스케일 |
| Evergreen | 0 / 4 / 8px 중 선택 | 배열 인덱스 |
| Pajamas | `md` 4px 기본 | `default` 별칭 |
| **shadcn/ui** | **8px (`rounded-md`)** | 전 변형·전 크기 동일 |
| **Mantine** | 2 / 4 / 8 / 16 / 32 중 선택 | 전역 스케일 (기본 8) |
| **Radix Themes** | `--radius-*` × `--radius-factor` | 테마 축이 결정 |

### 갈리는 지점

**Cloudscape만 버튼을 컨테이너보다 둥글게 만듭니다** (버튼 20px, 컨테이너 16px).
대부분은 버튼이 컨테이너보다 작거나 같습니다.

**Ant Design은 버튼 전용 라운드가 없습니다.** 전역 `borderRadius: 6`을 그대로 씁니다.

**shadcn/ui는 크기가 달라도 라운드가 같습니다** — `xs`(24px 높이)와 `lg`(40px)가
모두 `rounded-md`(8px)입니다. 작은 버튼이 상대적으로 더 둥글어 보입니다.

**Radix Themes는 버튼 라운드를 테마 축에 맡깁니다.** `data-radius="none"`이면
`--radius-factor: 0`으로 전 컴포넌트 라운드가 0이 됩니다.
버튼 개별 값을 정하는 개념이 없습니다.

## 개수별 너비 — Apple만 토큰화

Apple iOS 심볼 버튼은 **개수마다 별도 변형**이 있습니다.

| 개수 | 상단 | 하단 |
|:---:|:---:|:---:|
| 1 | 44 | 48 |
| 2 | 104 | 110 |
| 3 | 160 | 164 |
| 4 | 216 | 218 |
| 5 | 272 | 272 |
| 6 | 328 | 326 |

증분이 상단 56pt로 일정합니다 (44 + 56×(n-1)).
**하단은 증분이 54~56으로 일정하지 않습니다.**

다른 시스템은 버튼 그룹을 개수별로 토큰화하지 않습니다.

## 패딩 — shadcn/ui가 유일하게 전부 확인됩니다

| 크기 | 높이 | 좌우 패딩 | **아이콘 있을 때** | 비율 (패딩/높이) |
|------|:---:|:---:|:---:|:---:|
| `xs` | 24 | 8 | **6** | 0.33 |
| `sm` | 32 | 12 | **10** | 0.38 |
| `default` | 36 | 16 | **12** | 0.44 |
| `lg` | 40 | 24 | **16** | 0.60 |

**패딩이 높이보다 빠르게 커집니다.** 높이는 24→40 (1.67배)인데 패딩은 8→24 (3배)입니다.
큰 버튼이 더 가로로 길어집니다.

### 아이콘이 있으면 패딩이 줄어듭니다 — `:has()`로 구현

```css
/* Tailwind 클래스: has-[>svg]:px-3 */
.button:has(> svg) { padding-inline: 12px; }   /* default: 16 → 12 */
```

| 크기 | 기본 | 아이콘 포함 | 감소 |
|------|:---:|:---:|:---:|
| `xs` | 8 | 6 | -2 |
| `sm` | 12 | 10 | -2 |
| `default` | 16 | 12 | -4 |
| `lg` | 24 | 16 | **-8** |

**아이콘과 라벨 사이 간격(`gap`)이 그 자리를 대신합니다** — `default`는 8px(`gap-2`),
`xs`는 4px, `sm`은 6px입니다.

**표본에서 콘텐츠 유무로 패딩을 바꾸는 것은 shadcn/ui뿐입니다.**
CSS `:has()`가 있어야 가능한 구현이며, 토큰으로는 표현할 수 없습니다.

### 다른 시스템의 패딩

| 시스템 | 값 |
|--------|-----|
| Cloudscape | `space-button-horizontal` 20px · `-vertical` 4px |
| Ant Design | `paddingContentHorizontal` 계열 (시드 파생) |
| **Radix Themes** | **8 / 12 / 16 / 24px** (size 1~4, `--space-2`~`5`) — `button.css` 확인 (3.3.0) |
| **Mantine** | **14 / 18 / 22 / 26 / 32px** (`xs`~`xl`) · compact **7 / 8 / 10 / 12 / 14** — `styles/Button.css` 확인 (9.5.1) |

**Cloudscape의 20/4는 비율이 5:1**입니다. shadcn/ui `default`의 16/(36-2×?)와
직접 비교할 수 없지만, 세로 패딩을 4px로 못박은 것은 Cloudscape뿐입니다.

### 프레임워크 3개의 좌우 패딩 — 이제 전부 확인됩니다 (2026-08-18)

| 높이 | Mantine 9.5.1 | Radix Themes 3.3.0 | shadcn/ui |
|:---:|:---:|:---:|:---:|
| 24 | — | 8 | 8 |
| 30~32 | 14 (`xs`, 높이 30) | 12 | 12 |
| 36 | **18 (`sm`, 기본)** | — | **16 (`default`)** |
| 40~42 | 22 (`md`, 높이 42) | 16 | 24 (`lg`) |
| 48~50 | 26 (`lg`, 높이 50) | 24 | — |
| 60 | 32 (`xl`) | — | — |

- **Radix Themes는 패딩도 스페이싱 토큰 그대로**입니다 (`--space-2`~`5` =
  8/12/16/24). 높이(`--space-5`~`8`)와 같은 스케일을 씁니다 —
  size 2(높이 32/패딩 12)가 shadcn/ui `sm`(32/12)과 정확히 일치합니다
- **Mantine이 같은 높이에서 가장 넓습니다** — 기본 36px에서 18px
  (shadcn/ui 16). 반면 `compact` 변형은 절반 이하(7~14px)로 떨어집니다 —
  **같은 높이 스케일에 밀집 패딩 축을 따로 두는 유일 표본**
- **Mantine도 아이콘(섹션)이 있으면 그쪽 패딩을 줄입니다** —
  `padding-x ÷ 1.5` (18 → 12). shadcn/ui의 `:has(>svg)` 감산과 같은
  방향이며, Mantine은 나눗셈, shadcn/ui는 고정값 차감입니다
- **세로 패딩은 셋 다 없습니다** — 고정 높이 + 플렉스 중앙 정렬
  (Mantine `line-height: 1`). 세로 패딩을 두는 표본은 여전히
  Cloudscape(4px)뿐입니다
- Radix Themes `ghost` 변형은 자체 패딩(`--button-ghost-padding-*`)을
  **음수 마진으로 상쇄**해 텍스트 정렬 기준을 유지합니다 — 패딩이
  시각적으로만 존재하고 레이아웃에는 없는 구조 (`button.css`)

## 버튼 그룹 — shadcn/ui·Mantine 소스 확인 (2026-08-18)

두 시스템 모두 "중간 멤버의 라운드·보더 제거" 패턴인데 **보더 처리가 다릅니다**:

| | shadcn/ui `button-group` | Mantine `Button.Group` |
|---|---|---|
| 라운드 | 첫/끝만 유지 (`rounded-l-none` 등) | 같음 (논리 속성 `border-end-end-radius` 등) |
| 이중 보더 | **뒤 멤버의 보더를 제거** (`border-l-0`) | **양쪽을 절반씩** (`calc(var(--button-border-width) / 2)`) |
| 포커스 | `focus-visible:z-10` — 링이 이웃에 안 가림 | `:focus`에 `z-index: 1` — 같은 해법 |
| 방향 | horizontal / vertical 둘 다 | 같음 (`data-orientation`) |
| 부가 | `role="group"` · 중첩 그룹 간 `gap-2`(8px) · `ButtonGroupText`(라벨 셀, `px-4` bg-muted) · Separator 내장 | Button.Section도 같은 규칙에 포함 |

- **포커스링 z-index 처리가 두 표본에서 일치합니다** — 그룹에서 링이
  이웃 버튼 밑에 깔리는 문제를 둘 다 스택 순서로 풉니다
- 보더 절반 방식(Mantine)은 1px 보더에서 0.5px 렌더링이 생기므로
  고DPI 외 환경에선 shadcn/ui의 제거 방식이 안전합니다
- shadcn/ui는 그룹 안에 input·select까지 허용합니다 (`[&>input]:flex-1`) —
  검색창+버튼 조합을 같은 컴포넌트로 처리

## 로딩 스피너 — shadcn/ui `spinner.tsx` (2026-08-18)

컴포넌트 전체가 6줄입니다 — `Loader2Icon` + `size-4 animate-spin` +
`role="status"` `aria-label="Loading"`. **버튼과의 조합에 전용 장치가 없습니다**:
버튼의 일반 규칙(`[&_svg:not([class*='size-'])]:size-4` · `gap-2` ·
`has-[>svg]:px-3`)이 스피너에도 그대로 적용되고, 로딩 시각 상태는
`<Button disabled><Spinner/>…`처럼 **사용하는 쪽이 disabled를 직접 겁니다**.
Mantine이 `data-loading`으로 라벨을 `translateY(100%)` 슬라이드시키고
오버레이(`::before` blur 12px)를 까는 것과 대조적입니다 — 로딩을
컴포넌트 상태로 두는가(Mantine), 조합으로 두는가(shadcn/ui)의 축입니다.

## 아이콘 크기 — shadcn/ui만 버튼 크기에 연동합니다

| 버튼 크기 | 아이콘 |
|-----------|:---:|
| `xs` · `icon-xs` | **12px** (`size-3`) |
| `sm` · `default` · `lg` | 16px (`size-4`) |

`[&_svg:not([class*='size-'])]:size-4` — **클래스로 크기가 이미 지정된 SVG는 건드리지 않습니다.**
선택자 레벨에서 오버라이드를 허용합니다.

아이콘 전용 변형이 별도로 4종 있습니다 — `icon`(36) · `icon-xs`(24) ·
`icon-sm`(32) · `icon-lg`(40). **정사각형이며 패딩이 없습니다.**

Apple iOS가 심볼 버튼 44pt / 텍스트 버튼 36pt로 나눈 것과 같은 구분이며,
shadcn/ui는 **크기 단계마다 정사각 변형을 둡니다.**

## 상태 집합 — 입력 방식에 종속됩니다

| 시스템 | 확인된 상태 |
|--------|-------------|
| Apple iOS (텍스트 버튼) | Default · Selected · Tinted · Disabled |
| Apple iOS (시트 버튼) | Default · Preferred |
| **visionOS** | Idle (No Platter) · **Hover** · Selected · Disabled |
| Atlassian | (보더 두께로) selected · focused + **`motion.button.hovered/pressed`** |
| Material 3 | State Layer 147개 토큰 |
| **shadcn/ui** | default · hover · **focus-visible** · **active(모바일만)** · disabled · **aria-invalid** |
| **Mantine** | (색 토큰으로) `-filled-hover` · `-light-hover` · `-outline-hover` |
| **Radix Themes** | (커서 토큰으로) `--cursor-button` · `--cursor-disabled` |

### 갈리는 지점

**visionOS는 마우스가 없는데 `Hover`가 있습니다.** 시선(gaze)으로 대상을 가리키므로
탭 이전 단계가 생깁니다. iOS 킷에는 Hover가 없습니다.

**Apple은 `Tinted`와 `Selected`를 구분합니다.** 둘 다 "강조된" 상태인데 별개입니다.
시트에서는 `Preferred`라는 또 다른 이름을 씁니다 — 컨테이너마다 상태 이름이 다릅니다.

**Material 3은 상태를 색 레이어로 해결합니다.** 테마당 State Layer 147개가
전체 토큰의 75%입니다. 상태별 변형을 컴포넌트가 아니라 토큰에서 다룹니다.

**Atlassian은 보더 두께로 상태를 표현합니다.** `border.width.selected`와
`border.width.focused`가 값은 같지만(2px) 별도 토큰입니다.

**Atlassian은 상태 전환 시간까지 토큰화합니다.**

| 토큰 | 지속시간 | 전환 속성 |
|------|:---:|-----------|
| `motion.button.hovered` | 150ms | `background-color` · `border-color` |
| `motion.button.pressed` | 150ms | `background-color` · `border-color` |
| `motion.listitem.hovered` | **50ms** | + `color` · `text-decoration-color` |

**버튼 hover가 150ms, 목록 항목 hover가 50ms입니다** — 3배 차이입니다.
표본에서 컴포넌트별 상태 전환 시간을 토큰으로 나눈 것은 Atlassian뿐입니다.

**shadcn/ui는 `active`를 모바일에만 적용합니다.**

```
a:active, button:active { @apply opacity-60 md:opacity-100; }
```

`md`(768px) 이상에서 눌림 효과가 해제됩니다.
**표본에서 뷰포트에 따라 상태 스타일을 끄는 사례는 이것뿐입니다.**

**shadcn/ui는 에러 상태를 `aria-invalid` 속성으로 잡습니다.**
`error` prop이 아니라 ARIA 속성이 스타일 훅입니다 —
`aria-invalid:border-destructive aria-invalid:ring-destructive/20`.
접근성 속성과 시각 상태가 분리되지 않습니다.

**Mantine·Radix Themes는 상태를 컴포넌트가 아니라 토큰 레이어에서 다룹니다.**
Mantine은 색 토큰(`-filled-hover`)으로, Radix Themes는 커서 토큰까지 포함해서입니다.
Material 3의 State Layer 147개와 같은 방향입니다.

## 포커스링 — 두께가 갈립니다

| 시스템 | 두께 | offset | 구성 |
|--------|:---:|:---:|------|
| **shadcn/ui** | **3px** | **없음** | 테두리 색 변경 + 반투명 링 (`ring-ring/50`) |
| Atlassian | 2px | 미확인 | 보더 두께 토큰 (`border.width.focused`) |
| Cloudscape | 미확인 | 미확인 | 라운드만 확인 (`...focus-ring` 4px) |
| Spectrum | 미확인 | 2px | `accordion-focus-indicator-gap` |
| Radix Themes | 미확인 | 미확인 | `--focus-*` 색 계열만 확인 |

**shadcn/ui의 3px이 표본에서 가장 두껍습니다.** 2px 관행보다 1px 두껍고,
offset 없이 요소에 붙습니다.

**shadcn/ui 안에서도 일관되지 않습니다** — Dialog 닫기 버튼만
`focus:ring-2 focus:ring-offset-2`(2px + offset 2px)입니다. 나머지 컨트롤은 전부 3px/offset 0입니다.

**포커스링을 색이 아니라 보더 두께로 표현하는 것은 Atlassian뿐입니다.**
링을 덧그리지 않고 기존 보더를 굵히므로 레이아웃이 흔들리지 않습니다.

## 다크 모드에서 치수가 바뀌는 경우

| 시스템 | 컴포넌트 | 라이트 | 다크 |
|--------|----------|:---:|:---:|
| **Apple iOS** | 뒤로 버튼 | 78 × 36 | **80 × 36** |

**표본에서 다크 모드가 치수를 바꾸는 것은 이 한 건뿐입니다.** 2pt 넓습니다.
이유는 킷에 명시돼 있지 않습니다.

다른 시스템은 다크 모드에서 색만 바뀝니다.

## 77표본 재종합 — 컴포넌트 실측 (2026-08-18)

`partial` 수집 심화로 버튼 실측이 77개 시스템으로 늘어, 이 문서의 결론을 그 표본으로 재검증했습니다.

### 높이를 만드는 방식 — 3진영이 각각 3분의 1

| 방식 | 뜻 | 시스템 |
|------|-----|--------|
| **고정 `height`** | 값이 곧 높이 | Canvas · Chakra · EUI · Evergreen · HeroUI · HSDS · Kontur · KRDS · LeafyGreen · Naive UI · NYSDS · Odyssey · Orbit · Park UI · Pluralsight · Ring UI · Seed · Semi · Serendie · Vapor · Vibe · Charcoal · Clarity · Auro(min·max 동시 지정) |
| **`min-height`** | 내용이 넘치면 늘어남 | Backpack · Blueprint · Braid · Codex · 디지털청 · DSFR · eBay · Forma 36 · Gestalt · Helios · Kaizen · NHS · Nord · Origami · Pajamas · Shoelace · WMN |
| **파생** | 높이 선언 없이 행간+패딩(+보더) 합 | Asphalt · Astro · Audi · Base Web · bf-solid · Bolt · Bootstrap · Cedar · Grommet · Mística · MUI · Paste · Pharos · PIE · Porsche · Priceline · PrimeVue · Protocol · SGDS · Thumbprint · Vanilla · Skeleton |

**"버튼 높이"라는 값이 시스템마다 다른 층에 삽니다.** 파생 진영은 정수 높이를 포기합니다 —
MUI 36.5 · Bolt 41.5 · Braid 38.4 · Audi 51px. 반대로 Base Web은 파생인데도 결과가
sizing 토큰(28/36/48/56)과 정확히 일치하도록 역산해 둔 경우입니다.

### 기본 높이 — 40px이 최빈, 그러나 과반은 아닙니다

```
40px  ~14개   Canvas · Chakra · DSFR · eBay · EUI · Forma 36 · Gestalt · HeroUI ·
              HSDS · Odyssey · Park UI · Shoelace · Vibe · Strapi
48px  ~8개    Auro · Base Web · Braid · Mística · NYSDS · Serendie · SGDS · Vitamin
36px  ~7개    Astro · Backpack · Grommet · LeafyGreen · Nord · Paste · Vanilla
32px   4개    Codex · Pajamas · Semi · Vapor
그 외         KRDS 56 · Thumbprint 52 · Audi 51 · Orbit 44 · Protocol 44 · smarthr 42 ·
              Bolt 41.5 · Bootstrap 38 · Cedar 38 · MUI 36.5 · Naive 34 · Ring UI 28 ·
              Intergalactic 28 · Origami 28 · Blueprint 30
```

> **정정 — 기존 "데스크톱 웹 기본 36px" 권고는 표본 편향이었습니다.**
> 그 값은 Mantine·shadcn/ui가 우연히 일치한 결과였고, **77표본에서 최빈값은 40px**이며
> 36px은 3위권입니다. 다만 **최빈값조차 약 23%**라 "업계 표준 높이"는 존재하지 않습니다 —
> 아래 "구현 시 기본값" 절을 이에 맞게 고쳤습니다.

### 최소 너비 — "자기 높이"가 여섯 시스템에 독립 수렴

| 규칙 | 시스템 |
|------|--------|
| **min-width = 자기 높이** (정사각 하한) | **Blueprint · Chakra · Evergreen · Kaizen · Pajamas · Park UI** |
| 절대 px 다단 | Canvas 72/88/104 · HeroUI 64/80/96 · 디지털청 72/80/96/136 · HSDS 90~200 |
| 산식 | EUI `base×6`·`×7`(96/96/112) · Spectrum 높이×2.25(문서 층) |
| 단일값 | MUI·Kontur 64 · Gestalt 60 · Mística 104/80 · Origami 60/80 · eBay 88 |
| **최대 너비로 대체** | **Codex 28rem(448px) · Forma 36 240px** |
| 명시적 제거 | Odyssey — MUI의 64px을 `unset` |

**여섯 시스템이 독립적으로 "정사각보다 좁아지지 않는다"에 도달했습니다.** 아이콘 전용
버튼을 별도 컴포넌트로 두지 않고 같은 버튼으로 처리할 때 나오는 규칙입니다.
그리고 **i18n 텍스트 확장은 최소 너비가 아니라 최대 너비로 푸는 사례**(Codex·Forma 36)가
관측됩니다 — 기존 문서가 최소 너비 쪽만 보던 것을 뒤집는 관점입니다.

### 형태 — 알약은 소수파가 아닙니다

- **전 크기 알약/pill (10+)**: Canvas(65rem) · Charcoal(999999px) · PIE(50rem) ·
  Serendie(full) · Gestalt(24px = 높이 절반) · eBay(높이 절반 리터럴 16/20/24) ·
  Grommet(파생 높이 절반) · Mística(스킨 5종) · Priceline(small·medium만) · Seed(xsmall만)
- **라운드 0 (각)**: Audi · DSFR · Protocol · WMN · Vanilla
- **다수**: 4~8px

**라운드를 크기에 연동시키는 진영이 확인됐습니다** — HeroUI 8/12/14 · KRDS 4/6/8 ·
디지털청 4/6/8/8 · Backpack 8→12(large) · Orbit 8→12(large) · Seed. 기존의
"shadcn/ui는 전 크기 동일" 서술은 사실이지만 **관행은 아닙니다**.

### 보더를 쓰지 않는 진영 — inset box-shadow

**Blueprint · Paste · Ring UI · Cedar · Astro · Vitamin · Vapor · Pajamas · Skeleton ·
Orbit · Braid**가 `border` 대신 inset box-shadow로 윤곽을 긋습니다.
**이유를 소스 주석에 남긴 것은 Blueprint**입니다 — 보더는 한 겹뿐이고, 그림자와 겹칠 수 없고,
요소 크기를 바꾸고, `box-sizing`을 요구한다. 실익은 **상태 전이에서 레이아웃이 안 밀리는 것**
(Vitamin이 hover 1px → focus 2px를 이 방식으로 처리).

### 보더 몫을 패딩에서 빼는 관행

**Helios · LeafyGreen · Codex · Kaizen · NYSDS · Mística · Clarity · MUI · Kontur ·
Origami · Grommet · Bolt**가 패딩을 `calc(값 − 보더)`로 둡니다. 근거를 문서화한 것은
Helios("Figma 값 − 보더"가 배포 CSS 주석에 잔존)와 LeafyGreen(`// 12px - 1px border`).
**Kontur는 토큰 값 자체가 `calc(2px - 1px)`**이고, Mística는 보더가 1.5px이라
전 패딩이 `calc(값 − 1.5px)`입니다.

### 프레스 피드백 — scale 축소가 관행화됐습니다

Braid · Auro 0.95 · eBay · HeroUI 0.97 · Pluralsight 0.98 · Seed 0.95~0.98(크기별 차등).
**Gestalt만 비율이 아니라 픽셀 고정** — `scale((최장변 − 4px)/최장변)`을 런타임 계산해
버튼 크기와 무관하게 4px만 줄입니다.

### 서체 굵기 — 500이 다수, 양극단이 갈립니다

```
400   Porsche · Naive UI · Nord · Bootstrap · Astro · Stacks · Serendie · Audi
450   EUI
500   다수 (Canvas · Chakra · Orbit · MUI · Kontur · Pluralsight · HSDS · Mística …)
600   Braid · Park UI · Bolt · Semi · Clarity · Italia · Asphalt · Grommet(입력)
700   Backpack · Thumbprint · Codex · Protocol · Pharos · WMN · 디지털청 · Gestalt · Charcoal
800   PIE · Unify
```

**버튼 서체를 본문보다 작게 두는 진영**(Bolt 12.8px · Evergreen 12px · Charcoal 14px ·
Serendie 13px)과 **본문 크기 그대로 볼드만 얹는 진영**(Backpack 16/700 · Braid 16/600)이
갈립니다 — 전자는 밀집 업무 UI, 후자는 소비자 서비스 쪽입니다.

## 구현 시 기본값

**높이** — 플랫폼으로 갈립니다. 하나로 통일할 수 없습니다.

```
모바일·터치      48    (Material 48dp · Apple 48pt · 77표본 기본값 2위 ~8개)
데스크톱 웹      40    (77표본 최빈 ~14개)
데스크톱 밀집    32    (Codex·Pajamas·Semi·Vapor 기본 · Ant·Orbit·Radix size 2)
텍스트 버튼      36    (Apple 기준)
```

**데스크톱 웹은 40px에서 시작하세요** (2026-08-18 정정). 이전 판은 36px을 권했는데,
그것은 Mantine·shadcn/ui 두 프레임워크가 우연히 일치한 값이었습니다. **77표본에서
최빈값은 40px**이고 36px은 3위권입니다 — 다만 최빈값도 약 23%에 불과하므로
**"표준 높이"로 받아들이지 말고 밀도 요구에 맞춰 고르세요.**

iOS 상단 툴바만 44pt를 허용하고, **터치 환경이면 48로 잡으세요** — 두 OS가 만나는 값입니다.

**단계 수는 4개로 시작합니다.** 프레임워크 3개 중 둘이 4단계, 하나가 5단계입니다.
증분은 8px 등차(Radix Themes)가 관리가 가장 쉽습니다 — 스페이싱 토큰을 그대로 씁니다.

**터치 환경을 지원할 계획이면 최대 단계를 48 이상으로 두세요.**
shadcn/ui는 최대가 40px이라 어떤 단계로도 48을 못 만듭니다.

**라운드** — 컨테이너 라운드와 같거나 작게 잡습니다.
Cloudscape처럼 버튼을 더 둥글게 하려면 의도적 선택이어야 합니다.

**크기마다 라운드를 바꿀지 정하세요.** shadcn/ui는 전 크기 동일(8px)이고,
작은 버튼이 상대적으로 더 둥글어 보입니다. 크기에 비례시키려면
Radix Themes처럼 `em` 기반(`calc(0.35em * var(--radius-factor))`)으로 두는 방법이 있습니다.

**패딩** — shadcn/ui 비율이 참고 기준입니다.

```
높이 24 → 좌우  8
높이 32 → 좌우 12
높이 36 → 좌우 16
높이 40 → 좌우 24
```

**높이보다 빠르게 키웁니다** (높이 1.67배 / 패딩 3배).
세로 패딩을 따로 두려면 Cloudscape의 4px이 유일한 확인 사례입니다.

**아이콘이 들어가면 좌우 패딩을 2~8px 줄이고, 아이콘-라벨 간격(`gap`)을 4~8px 둡니다.**
CSS `:has()`로 자동화할 수 있지만, 토큰으로는 표현되지 않으므로 컴포넌트 구현에 넣어야 합니다.

**아이콘 전용 정사각 변형을 크기 단계마다 두세요.** shadcn/ui가 4단계 전부에 둡니다.
높이와 같은 값을 너비로 쓰면 됩니다 (`size-9` = 36×36).

**상태** — 최소 집합은 이렇습니다.

```
default · hover(웹·공간) · pressed · selected · disabled · focus-visible
```

**공간 UI(visionOS)를 지원할 계획이면 `hover`를 빼지 마세요.**
터치 전용으로 만들면 시선 입력 단계가 비어버립니다.

**에러 상태는 `aria-invalid`로 잡는 것을 권합니다** (shadcn/ui 방식).
`error` prop을 별도로 두면 접근성 속성과 시각 상태가 어긋날 수 있습니다.

**강조 상태 이름을 미리 정하세요.** Apple만 해도 `Selected` · `Tinted` · `Preferred` 셋을
컨테이너에 따라 다르게 씁니다. 한 시스템 안에서 이름이 갈리면 구현이 흔들립니다.

**포커스링**

```
2px, offset 0~2px
```

표본 다수가 2px입니다. shadcn/ui의 3px은 표본에서 유일하게 두꺼운 값이며,
같은 시스템 안에서도 일관되지 않습니다 (Dialog 닫기 버튼만 2px).
**두께와 offset을 한 번 정하고 전 컴포넌트에 같이 쓰세요.**

보더 두께로 표현하는 방식(Atlassian)은 레이아웃이 흔들리지 않는 장점이 있지만,
보더가 없는 변형(`ghost`·`link`)에서 쓸 수 없습니다.

**상태 전환 시간** — Atlassian이 유일한 근거입니다.

```
버튼 hover/pressed   150ms
목록 항목 hover       50ms
```

**목록 항목이 버튼보다 3배 빠릅니다.** 같은 `listitem`에서도 hover(50ms)와
pressed·selected(100ms)가 다릅니다.

전환 속성 수도 다릅니다 — `listitem`은 4개(배경·보더·텍스트 색·밑줄 색),
`button`은 2개(배경·보더)입니다.

모션 전체 교차 비교는 `motion.md`에 있습니다.

## 판단 지침 — 문서 층 실측 (2026-08-18)

8개 시스템(M3 · Atlassian · Spectrum · Polaris · Carbon · Primer ·
Cloudscape · GOV.UK)의 버튼 지침을 직접 읽었습니다.

### primary 개수 — "화면당 1개"가 6개 시스템 수렴

| 규정 | 시스템 |
|------|--------|
| **페이지/영역당 1개** | Atlassian("Only include one primary button or CTA in a page or area" — 모든 화면에 primary가 필요한 건 아님) · Carbon(**헤더·모달·사이드패널은 카운트 제외** 단서) · Primer(그룹당 1개 + 페이지당 통상 1개) · Cloudscape("The Highlander, there can be only one") · M3 filled("ideally for only one action on a page") · GOV.UK("Avoid multiple default buttons on a single page") |
| **최고 강조 뷰당 3개** | **Spectrum** — 단 Spectrum의 최고 강조는 primary가 아니라 **accent**입니다. 'primary' 변형은 중간 강조 (이름-역할 역전 — GLOSSARY 감) |
| sparingly만 | Polaris 현행 |

**Spectrum과 비교할 때 이름에 속지 마세요** — Spectrum의 "primary"는
다른 시스템의 secondary 자리입니다.

### 변형 어휘 — 강조 사다리는 같고 칸 수와 이름이 다름

- **M3** (강조 순): Elevated(분리가 필요할 때만) → **Filled**(플로우 완결:
  Save·Confirm) → Tonal(온보딩 Next급) → Outlined(filled와 페어) →
  Text(다이얼로그·카드·스낵바 내부)
- **Atlassian**: Default가 기본이고 **Primary는 폼 제출·최고 중요**에만.
  Warning(중대 변경)과 Danger(파괴적 최종 확인)를 분리. Discovery(새 기능) ·
  Rovo(AI)가 있는 유일 표본
- **Carbon**: **Secondary를 "primary와 짝지은 부정 액션(Cancel·Back)
  전용"으로 못박습니다** — 단독·긍정 사용 금지. 이 규정은 Carbon 고유
- **Cloudscape**: Link 변형이 "모달의 Cancel" 자리 — Carbon secondary와
  같은 역할을 다른 변형이 담당
- **GOV.UK**: Warning(빨강)은 "되돌릴 수 없는 심각한 파괴 액션의 최종
  확인 전용, **대부분의 서비스엔 불필요**" — danger 남용을 막는 문구가 규정에 내장
- Primer: Invisible(복합 컴포넌트 내부) + **Inactive 상태**(disabled의
  접근성 대안 — 포커스 유지)

### 로딩 상태 — "라벨을 스피너로 대체"가 다수, 접근성 세부는 Primer만

- **라벨 대체 + 클릭 차단**: Atlassian(+비활성화) · Spectrum(Pending —
  **1초 지연 후 표시**, 5초 이하 작업 한정, 초과 시 버튼 밖 progress) ·
  Polaris · Carbon(inline loading + 비활성)
- **Primer가 반대 방향의 접근성 규정**: 로딩 중 `disabled` 부여·DOM 제거
  **금지**(포커스 유지), `aria-disabled` + `aria-live="polite"` 리전으로
  상태 문구 안내. Cloudscape도 같은 축(클릭 차단하되 포커스 가능 +
  `loadingText`)
- M3 · GOV.UK: 로딩 상태 규정 없음(확인함). GOV.UK는 대신
  `preventDoubleClick`(중복 제출 방지)이라는 다른 해법

### 최소 너비 — 유일한 규정은 Spectrum의 비례식

**"최소 너비 = 높이 × 2.25"** (Spectrum — 작은 버튼의 식별 가능한 형태
유지 목적. 좌우 패딩은 높이의 절반). 나머지 7개 시스템은 규정 없음을
확인했습니다. 절대값(px) 최소 너비를 두는 표본은 0 — i18n 텍스트 확장
문제는 결국 비례식이나 컨테이너 규칙으로 풀어야 합니다.

## 아직 못 채운 것

- ~~변형 종류와 용도 / 로딩 상태 / 최소 너비~~ → **해소 (2026-08-18)** —
  위 "판단 지침 — 문서 층 실측" 절
- ~~Mantine·Radix Themes의 패딩~~ → **해소 (2026-08-18)** — `@mantine/core@9.5.1`
  `styles/Button.css` · `@radix-ui/themes@3.3.0` `src/components/button.css` 실측.
  위 "프레임워크 3개의 좌우 패딩" 절 (Mantine 14~32 + compact 축, Radix 8/12/16/24)
- ~~버튼 그룹~~ → **해소 (2026-08-18)** — shadcn/ui `button-group.tsx`
  (main@8a7701e) + Mantine `Button.Group` 대조. 위 "버튼 그룹" 절
