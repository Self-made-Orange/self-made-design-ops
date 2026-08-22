<!-- lang-links -->
> [English](feedback.md) · **한국어**
<!-- /lang-links -->

# Feedback

**얼럿·토스트·배지의 심각도 체계와 치수를 비교합니다.**

> **근거가 있는 시스템은 18개입니다** (2026-08-18 갱신) — Cloudscape ·
> shadcn/ui · Mantine · Radix Themes · Atlassian(모션) · Evergreen(intents) ·
> Tizen CircularUI에 **Carbon · Vuetify · Ant Design · Chakra UI · PrimeVue ·
> Semi · Naive UI · EUI · Blueprint · Grommet · Sonner 11개가 추가**됐습니다.
>
> Cloudscape가 이 문서 앞부분의 중심입니다 — **심각도 5단계 · 유형 4종 ·
> 컨텍스트 오버라이드 4개**를 토큰으로 둡니다.
>
> **아래 "18표본 재종합" 절에서 문서 층 결론 세 가지가 뒤집힙니다** —
> 토스트 지속시간 하한 · 기본 위치 · 동시 개수 상한. 앞부분과 재종합 절이
> 어긋나면 **재종합 절이 우선입니다.**

## 심각도 체계 — 두 개의 다른 축

표본에 **의미(semantic)** 축과 **심각도(severity)** 축이 따로 있습니다.

| 축 | 값 | 보유 시스템 |
|----|-----|-------------|
| **의미** | `success` · `error` · `warning` · `info` | Cloudscape · Mantine · Evergreen · shadcn/ui(sonner) |
| **심각도** | `critical` · `high` · `medium` · `low` · `neutral` | **Cloudscape만** |

### Cloudscape — 두 축을 함께 배포합니다

**의미 축** (`flashbar`):

| 토큰 | light / dark |
|------|-----|
| `color-background-flashbar-success` | `#00802f` |
| `color-background-flashbar-error` | `#db0000` |
| `color-background-flashbar-info` | `#006ce0` |
| `color-background-flashbar-warning` | **`#ffe347`** |

**라이트·다크 값이 같습니다.** 네 색 전부입니다 — 플래시바는 모드와 무관하게 같은 색입니다.

**`warning`만 노란색(`#ffe347`)이라 텍스트 색이 갈립니다.**

| 토큰 | 값 |
|------|-----|
| `color-text-notification-default` | `#f9f9fa` (흰색) |
| **`color-text-notification-yellow`** | **`#0f141a`** (검정) |

**노란 배경에만 검정 텍스트를 씁니다.** 나머지 세 색은 흰색입니다 —
**대비를 배경색별로 짝지어 둔 형태**입니다 (`color.md`의 배경/전경 짝 규칙과 같은 구조).

**심각도 축** (`notification-severity`):

| 심각도 | 배경 | 텍스트 |
|--------|-----|-----|
| `critical` | `#870303` (짙은 적) | 흰색 / **다크에서 검정** |
| `high` | `#ce3311` (적) | 흰색 / 다크에서 검정 |
| `medium` | **`#f89256`** (주황) | 검정 |
| `low` | **`#f2cd54`** (황) | 검정 |
| `neutral` | `#656871` (회) | 흰색 |

**critical → high → medium → low가 색상 램프입니다** — 적 → 주황 → 황.
`neutral`이 회색으로 계열 밖에 있습니다.

**`medium`·`low`는 라이트/다크 배경이 같고 텍스트도 검정으로 같습니다.**
`critical`·`high`만 다크에서 배경이 밝아지고 텍스트가 검정으로 바뀝니다.

**표본에서 의미 축과 심각도 축을 동시에 두는 것은 Cloudscape뿐입니다.**
"에러이지만 심각도는 낮음"을 표현할 수 있습니다.

### 나머지 시스템의 상태색 폭

| 시스템 | 상태색 |
|--------|--------|
| **Cloudscape** | 의미 4 + 심각도 5 + 색상 5(`blue`·`green`·`grey`·`red`·`yellow`) |
| **Atlassian** | danger · warning · success · **discovery** · information (배경 기준 각 10개) |
| Evergreen | success · warning · danger · **none** |
| Mantine | error · success (입력 필드 기준) |
| **shadcn/ui** | **`destructive` 하나** |

**shadcn/ui가 가장 좁습니다.** Alert 컴포넌트에 변형이 **2개**입니다 —
`default`와 `destructive`. `success`·`warning`·`info` 변형이 없습니다.

**다만 sonner(토스트)에는 5종 아이콘이 있습니다.**

| 상태 | 아이콘 |
|------|--------|
| `success` | `CircleCheckIcon` |
| `info` | `InfoIcon` |
| `warning` | `TriangleAlertIcon` |
| `error` | `OctagonXIcon` |
| `loading` | `Loader2Icon` (`animate-spin`) |

**아이콘만 다르고 색은 전부 같습니다** — `--normal-bg: var(--popover)`.

```js
"--normal-bg": "var(--popover)",
"--normal-text": "var(--popover-foreground)",
"--normal-border": "var(--border)",
"--border-radius": "var(--radius)",
```

**상태를 색이 아니라 아이콘 모양으로만 구분합니다.**
Cloudscape가 배경색 4종을 두는 것과 정반대입니다.

**아이콘 모양이 색과 독립적으로 구분됩니다** —
원(success) / 원(info) / 삼각(warning) / 팔각(error).
색각이상에 강한 구조이지만, **`success`와 `info`가 둘 다 원이라 모양만으로는 갈리지 않습니다.**

## 얼럿 치수

| 시스템 | 패딩 | 라운드 | 보더 | 글자 |
|--------|:---:|:---:|:---:|:---:|
| **shadcn/ui** | **16 / 12** (`px-4 py-3`) | **10px** (`rounded-lg`) | 1px | 14 |
| **Cloudscape** | 세로 8 / compact 4 | **12px** | **2px** (4면 각각 토큰) | — |
| **Mantine** | **16 / 16** (`--mantine-spacing-md`, `Alert.css` 9.5.1) | `--mantine-radius-default` (8px) | `1px solid transparent` | 14 (제목·본문 모두 `sm`) |
| **Radix Themes** | **12 / 16 / 24** (size 1~3, `--space-3`~`5`) | **6 / 8 / 12px** (`--radius-3`~`5`, 배율 1 기준) | 없음 (배경/그림자 변형) | size 연동 |

**Mantine Alert 상세** (`Alert.css` 실측): 아이콘 20×20(첫 줄 보정
`margin-top: 1px`, 우측 여백 16px) · 제목 `sm` **bold** · 제목↔본문 간격
10px(`--mantine-spacing-xs`) · 닫기 버튼 있으면 제목 우측 패딩 16px 추가.
패딩이 상하좌우 동일 16px로, shadcn/ui(가로>세로)와 달리 정사각 여백입니다.

**Cloudscape 얼럿 보더가 2px이고 네 면이 각각 토큰입니다.**

| 토큰 | 값 |
|------|:---:|
| `border-width-alert` | 2px |
| `border-width-alert-block-start` | 2px |
| `border-width-alert-block-end` | 2px |
| `border-width-alert-inline-start` | 2px |
| `border-width-alert-inline-end` | 2px |

**네 면이 다 2px인데 토큰이 5개입니다.** 나중에 한 면만 다르게 바꿀 여지를 남긴 형태이며,
`border.width.selected`/`focused`가 값은 같지만 별도 토큰인 Atlassian과 같은 패턴입니다.

**논리 속성 이름(`block-start` · `inline-end`)을 씁니다** — RTL에서 자동으로 뒤집힙니다
(`i18n/README.md`).

### 플래시바는 좌측 보더가 0입니다

| 토큰 | 값 |
|------|:---:|
| `border-width-alert-inline-start` | **2px** |
| **`border-width-flashbar-inline-start`** | **0px** |

**얼럿은 좌측 보더가 있고 플래시바는 없습니다.**
플래시바는 배경색 자체가 상태를 나타내므로 보더가 필요 없습니다.

### 라운드 — 얼럿 12px, 배지 4px

| 토큰 | 값 |
|------|:---:|
| `border-radius-alert` | **12px** |
| `border-radius-flashbar` | **12px** |
| `border-radius-badge` | **4px** |

**얼럿·플래시바가 12px로 같고 배지가 4px입니다** — 3배 차이입니다.
Cloudscape의 컨테이너 라운드(16px)보다 얼럿이 작습니다.

**shadcn/ui 얼럿은 10px**(`rounded-lg` = `--radius`)로 Cloudscape보다 2px 작습니다.

### 제목 굵기 — 둘 다 700

| 토큰 | 값 |
|------|:---:|
| `font-weight-alert-header` | **700** |
| `font-weight-flashbar-header` | **700** |

shadcn/ui는 `font-medium`(500)입니다 — **Cloudscape가 200 더 굵습니다.**

## shadcn/ui 얼럿 — 그리드가 아이콘 유무로 바뀝니다

```
grid grid-cols-[0_1fr] gap-y-0.5
has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]
has-[>svg]:gap-x-3
```

| 조건 | 그리드 열 |
|------|-----------|
| 아이콘 없음 | **`0 1fr`** (첫 열 폭 0) |
| 아이콘 있음 | **`16px 1fr`** + 열 간격 12px |

**아이콘 열을 0px로 두고 `:has()`로 켭니다.** 제목·설명은 항상
`col-start-2`에 있으므로 **아이콘이 없어도 정렬이 유지됩니다.**

Button의 `has-[>svg]:px-3`, Table의 `[&:has([role=checkbox])]:pr-0`과 같은 패턴입니다 —
**shadcn/ui는 `:has()`를 조건부 레이아웃의 기본 도구로 씁니다.**

| 요소 | 값 |
|------|-----|
| 아이콘 크기 | 16 (`size-4`) |
| 아이콘 수직 보정 | **+2px** (`translate-y-0.5`) |
| 아이콘 색 | `text-current` (제목 색 상속) |
| 제목 | `font-medium tracking-tight`, **`line-clamp-1`**, `min-h-4` |
| 설명 | 14px, `text-muted-foreground`, `[&_p]:leading-relaxed` |
| 행 간격 | 2px (`gap-y-0.5`) |

**제목이 1줄로 잘립니다** (`line-clamp-1`). `min-h-4`(16px)로 최소 높이를 잡아
제목이 없어도 레이아웃이 무너지지 않습니다.

**`destructive` 변형은 배경을 바꾸지 않습니다** — `bg-card`가 그대로이고
텍스트만 `text-destructive`, 설명은 `text-destructive/90`입니다.

**Cloudscape가 배경색으로 상태를 표현하는 것과 정반대입니다.**

| 시스템 | 상태 표현 |
|--------|-----------|
| **Cloudscape** | **배경색 전체** (`#db0000` 등) |
| **shadcn/ui** | **텍스트 색만** (배경은 `card` 유지) |

## Mantine — 얼럿과 알림이 다른 색을 씁니다

| 컴포넌트 | 색 토큰 |
|----------|---------|
| **Alert** | `--mantine-primary-color-light` (배경) / `-light-color` (텍스트) |
| **Notification** | `--mantine-primary-color-filled` |

**Alert는 `light` 계열, Notification은 `filled` 계열입니다.**
같은 상태라도 인라인 얼럿은 연한 배경, 토스트는 채운 배경입니다.

`color.md`에서 본 Mantine의 파생 토큰 체계(`-filled` · `-light` · `-light-color`)가
컴포넌트별로 다르게 소비됩니다.

**보더가 `1px solid transparent`입니다** — 두께를 유지하고 색만 투명입니다.
Pajamas의 `border.color.transparent`와 같은 목적입니다 (`color.md`) —
**보더가 켜질 때 레이아웃이 흔들리지 않습니다.**

### Notification 실측 (`Notification.css`)

| 요소 | 값 |
|------|-----|
| 좌측 색 바 | **6px 폭**, `::before` 의사 요소, 좌측에서 4px |
| 색 바 상하 인셋 | **`var(--notification-radius)`** — 라운드만큼 물러남 |
| 좌측 패딩 | 22px (색 바 자리 포함) |
| **상하·우측 패딩** | **10px** (`--mantine-spacing-xs`) — 고정 높이 없음 (내용 파생) |
| 아이콘 원 | 28×28px, `filled` 배경 (본문과 16px 간격) |
| 그림자 | `shadow-lg` |
| 제목 | text-sm medium, 본문과 2px 간격 |

- **아이콘이 있으면 색 바가 사라집니다** (`data-with-icon`에서 `::before` 제거)
  — 심각도 표시 수단이 바→아이콘으로 교대하는 규칙입니다.
- **색 바의 상하 여백이 컨테이너 라운드 값을 참조합니다** — 라운드를 키우면
  바가 짧아져 모서리 곡선을 침범하지 않습니다. 파생 규칙의 좋은 예.
- hover 배경이 `@media (hover: hover)`로 분기되고 터치에서는 `:active`가
  같은 색을 냅니다 — `table.md`에서 본 hover/터치 분기가 여기도 적용됩니다.

## Radix Themes Callout — 아이콘 높이를 행간에 맞춥니다

| 토큰 | 값 |
|------|-----|
| `--callout-icon-height` | `var(--line-height-2)` (20px) |
| `--callout-icon-height` | `var(--line-height-3)` (24px) |

**아이콘 높이가 글자 크기가 아니라 행간을 참조합니다.**
size 1·2는 `line-height-2`(20px), size 3은 `line-height-3`(24px)입니다.

**아이콘이 첫 줄과 정확히 같은 높이가 되어 baseline 보정이 필요 없습니다.**
shadcn/ui가 `translate-y-0.5`로 2px 내리는 자리를 구조로 해결한 형태입니다.

| 방식 | 시스템 |
|------|--------|
| 아이콘 높이 = 행간 | **Radix Themes** |
| 아이콘 크기 고정 + 이동 보정 | **shadcn/ui** (16px + 2px 내림) |

### Callout 치수 (`callout.css` 3.3.0 실측)

| size | 패딩 | 라운드 (배율 1 기준) | 아이콘↔텍스트 간격 |
|:---:|:---:|:---:|:---:|
| 1 | 12 (`--space-3`) | 6 (`--radius-3`) | 8 |
| 2 | 16 (`--space-4`) | 8 (`--radius-4`) | 12 |
| 3 | 24 (`--space-5`) | 12 (`--radius-5`) | 16 |

- **패딩·라운드·간격이 전부 size와 함께 한 단계씩** 올라갑니다 —
  Dialog(패딩+라운드 연동)와 같은 규칙이 Callout에도 적용됩니다
- 레이아웃이 flex가 아니라 **grid**입니다 — 아이콘이 `grid-column-start: -2`,
  나머지 요소는 전부 `-1`로 가서 **아이콘 없이도 텍스트 열이 유지**됩니다.
  shadcn/ui가 `:has()`로 아이콘 열을 켜는 것과 같은 문제의 grid 해법
- 변형이 보더가 아니라 배경/그림자입니다 — soft(`--accent-a3` 배경) ·
  surface(`a2` 배경 + inset 그림자 1px `a6`) · outline(inset 그림자 1px `a7`).
  실보더 0으로 얼럿을 그리는 표본입니다

## 토스트 모션 — Atlassian의 `reposition` 전용 토큰

| 토큰 | 지속시간 | 키프레임 · 속성 |
|------|:---:|------|
| `motion.flag.enter` | **250ms** | `SlideIn50PercentLeft` + `FadeIn0to100` |
| `motion.flag.exit` | **200ms** | `SlideOut15PercentLeft` + `FadeOut100to0` |
| **`motion.flag.reposition`** | **250ms** | **`properties: ['transform']`** |

**`reposition`은 토스트가 쌓이거나 사라질 때 남은 것들이 밀리는 동작입니다.**
표본에서 이 축을 **전용 모션 토큰**으로 둔 것은 Atlassian뿐입니다.

> **정정 (2026-08-18).** 축 자체는 Atlassian만의 것이 아닙니다 —
> **Blueprint**(형제 셀렉터 `transform` 100ms + 지연 50ms) ·
> **Sonner·Chakra UI**(`height 400ms` 전환)가 같은 문제를 다르게 풉니다.
> 아래 "18표본 재종합" 절.

**진입·퇴장 이동량이 다릅니다** — 진입 50%, 퇴장 15%.
**들어올 때 화면 밖에서 오고 나갈 때는 짧게 빠집니다** (`motion.md`).

이징도 다릅니다.

| 토큰 | 이징 |
|------|------|
| `flag.enter` | `out.bold` — `cubic-bezier(0, 0.4, 0, 1)` |
| `flag.exit` | `in.practical` — `cubic-bezier(0.6, 0, 0.8, 0.6)` |
| `flag.reposition` | **`inout.bold`** — `cubic-bezier(0.4, 0, 0, 1)` |

**`reposition`만 `inout`입니다** — 시작과 끝 양쪽에서 감속합니다.
진입/퇴장은 한쪽만 감속합니다.

`flag.enter`가 `out.bold`를 쓰는 것은 큰 영역 컴포넌트(blanket · modal · panel · sidenav)와
같은 계열입니다 — **토스트를 작은 요소가 아니라 큰 영역으로 취급합니다.**

## 컨텍스트 오버라이드 — Cloudscape

얼럿·플래시바 내부에서 다른 컴포넌트의 토큰이 바뀝니다.

| 컨텍스트 | 오버라이드 토큰 수 |
|----------|:---:|
| `alert` | **28** |
| `flashbar` | **47** |
| `flashbar-warning` | **52** |
| `alert-header` | **182** |
| `app-layout-toolbar` | **1** (563개를 재선언하지만 실제 값이 다른 것은 1개) |

`app-layout-toolbar`는 극단 사례입니다 — 컨텍스트가 토큰 563개를 통째로
들고 있는데 루트와 다른 값은 `color-background-layout-main` 하나뿐입니다
(`#ffffff→#fcfcfd` / 다크 `#161d26→#131920`). **본문 배경을 반 단계만
가라앉혀 툴바를 띄우는** 목적의 컨텍스트이고, 나머지 562개는 복사본입니다 —
컨텍스트 기구가 "전체 스냅샷" 방식이라는 증거입니다.

### 색깔 배경 위의 버튼을 투명으로 만듭니다

```
color-background-button-normal-default : { light: #ffffff } → { light: transparent }
color-background-button-normal-hover   : { light: #f0fbff } → { light: rgba(0,7,22,0.15) }
color-background-button-primary-default: { light: #006ce0 } → { light: #f9f9fa }
```

**플래시바 안의 버튼이 배경 없는 투명 버튼이 되고, hover에서 검정 15% 알파가 됩니다.**
주 버튼은 파란색에서 흰색으로 반전됩니다.

**`flashbar`와 `flashbar-warning`의 알파 값이 다릅니다.**

| 컨텍스트 | hover 알파 | active 알파 | 주 버튼 |
|----------|:---:|:---:|-----|
| `flashbar` (색깔 배경) | **0.15** | **0.2** | `#f9f9fa` (흰색) |
| `flashbar-warning` (노란 배경) | **0.05** | **0.1** | `#424650` (짙은 회색) |

**노란 배경에서는 알파가 3분의 1입니다** (0.15 → 0.05).
밝은 배경에서 15% 검정은 너무 진해집니다.

**주 버튼도 반대로 갑니다** — 어두운 배경에서는 흰 버튼, 노란 배경에서는 짙은 회색 버튼입니다.

### `alert` 컨텍스트는 라이트/다크가 갈립니다

```
color-background-button-normal-hover : { light: rgba(0,7,22,0.05), dark: rgba(255,255,255,0.1) }
```

**얼럿은 배경이 연한 색이므로 라이트에서 검정 알파, 다크에서 흰색 알파를 씁니다.**
플래시바는 배경이 진해서 양쪽 다 검정 알파입니다.

**`alert-header`는 182개로 `top-navigation`과 같은 규모입니다** —
`light` 값을 `dark` 값으로 덮어써 헤더 영역을 어둡게 만듭니다.

**표본에서 상태별 컨텍스트에 따라 버튼 알파까지 조정하는 것은 Cloudscape뿐입니다.**
컴포넌트가 "내가 플래시바 안에 있는지"를 알 필요가 없습니다.

## 배지

| 시스템 | 값 |
|--------|-----|
| **shadcn/ui** | `rounded-full`, `px-2 py-0.5`, 12px, 굵기 500, 아이콘 12px |
| **Cloudscape** | 라운드 **4px**, 보더 **0px**, 색 5종 + 심각도 5종 |
| shadcn/ui (사이드바) | 20px 높이 · `min-w-5` · **`tabular-nums`** |

**라운드가 정반대입니다** — shadcn/ui는 완전 알약, Cloudscape는 4px입니다.

**Cloudscape 배지 보더가 전부 `transparent`입니다.**

```
color-border-badge · -badge-grey · -badge-green · -badge-blue · -badge-red
color-border-badge-severity-critical · -high · -medium · -low · -neutral
```

**10개 토큰이 전부 `transparent`입니다.** `border-width-badge`도 `0px`입니다 —
**보더 자리를 토큰으로 만들어 두고 값은 비워 뒀습니다.**

`color-background-badge-icon`(`#db0000`)이 따로 있습니다 —
아이콘 위에 붙는 알림 점입니다. **`top-navigation` 컨텍스트에서 이 색이
라이트에서도 밝은 적색(`#ff7a7a`)으로 바뀝니다** — 어두운 상단바 위에 놓이기 때문입니다.

## 빈 상태 — shadcn/ui `empty.tsx` (2026-08-18, main@8a7701e)

표본에서 빈 상태를 컴포넌트로 둔 유일한 확인 사례입니다. 6개 조각
(Empty / Header / Media / Title / Description / Content)의 실측:

| 요소 | 값 |
|------|-----|
| 컨테이너 | 패딩 **24 / md+ 48px** (`p-6 md:p-12`), 라운드 10(`rounded-lg`), **점선 보더**, 중앙 정렬, 조각 간 `gap-6`(24px) |
| 아이콘 칸(`Media` icon 변형) | **40×40** `bg-muted` 라운드 10, 아이콘 24px, 아래 8px |
| 제목 | **18px**(`text-lg`) medium |
| 설명 | 14px `muted-foreground`, 행간 `relaxed`, 링크는 밑줄+offset 4 |
| 본문 폭 | Header·Content 모두 **`max-w-sm`(384px)** 제한 |

- **점선 보더(`border-dashed`)가 기본**입니다 — "여기 아직 아무것도 없음"을
  실선 카드와 구분하는 유일한 시각 장치
- 텍스트가 `text-balance`로 줄바꿈 균형을 잡습니다 — 짧은 안내문 전제
- 액션 영역(`Content`)이 별도 조각이라 버튼·링크가 설명과 16px(`gap-4`)로
  분리됩니다. 얼럿과 달리 심각도 축이 전혀 없습니다 — 상태색 없는 중립 컴포넌트

## 판단 지침 — 문서 층 실측 (2026-08-18)

8개 시스템(M3 · Atlassian · Spectrum · Polaris · Carbon · Primer ·
Cloudscape · GOV.UK) 문서를 직접 읽었습니다.

### 토스트 위치 — 4방위가 전부 나옵니다. 교차 권고 불가능

| 위치 | 시스템 |
|------|--------|
| 우상단 | Carbon ("slide in and out from the top right") |
| **좌하단** | Atlassian Flag (모션 토큰의 좌측 슬라이드와 정합) |
| 하단 중앙 | Spectrum (뷰포트 하단 16px 위 · 변경 허용) |
| 하단 | M3 스낵바 (FAB 위로 nudge) · Polaris |
| 페이지 상단 영역 | Cloudscape Flashbar (app layout의 notifications 영역) |
| 컴포넌트 없음 | **GOV.UK** (35개 컴포넌트에 토스트류 부재 — 일시 알림 자체를 두지 않음) |
| **비권장** | **Primer** ("significant accessibility concerns and are not recommended") — 문서에서 컴포넌트 제거됨 |

**표본이 4방위 + 부재 + 비권장으로 갈립니다** — 코퍼스에서 가장 수렴이
없는 축입니다. Primer·GOV.UK의 부재는 실수가 아니라 입장입니다
(일시적 메시지의 접근성 문제).

> **정정 (2026-08-18).** "어느 시스템도 우하단을 규정하지 않는다"는
> 문서 층에서만 참입니다. **코드 층에서는 Sonner(`position: 'bottom-right'`,
> shadcn/ui가 채택)와 EUI(`side: 'right'` + `bottom: 0`)가 우하단을
> 기본값으로 배포합니다.** 코드 층 최빈은 상단(6표본)입니다 —
> 아래 "18표본 재종합" 절.

### 토스트 지속시간 — 5초 하한 수렴 + 자동 소멸 반대 진영

| 규정 | 시스템 |
|------|--------|
| 기본 8초 (a11y 최소 8초) | Atlassian `autoDismissSeconds` |
| 기본 5000ms | Polaris 현행 Toast API |
| 자동 소멸 옵션, 켜면 **최소 5초** | Spectrum (기본은 수동 닫기) |
| 기본 지속, 옵션 시 5초 | Carbon |
| 4–10초 (액션 없는 스낵바만) | M3 |
| **자동 소멸 금지** | Cloudscape ("Don't auto-dismiss while the user remains on the same page") · Primer (WCAG 2.2.1 근거) |

- **수치를 규정한 5개 시스템 전부 5초 이상**입니다.
  > **정정 (2026-08-18).** "5초 미만을 허용하는 표본이 없다"는 틀렸습니다.
  > **코드 층 기본값 7개 중 5개가 5초 미만**입니다 (Naive UI·Ant message ·
  > Tizen 3000ms · Sonner 4000ms · Ant notification 4500ms).
  > 전부 "짧은 확인 메시지" 컴포넌트이고, 같은 시스템의 알림 컴포넌트는
  > 더 깁니다 — 아래 "18표본 재종합" 절.
- 공통 금지: **액션 있는/중요한 토스트의 자동 소멸** (Atlassian·Carbon·M3
  동일 규정, Spectrum은 포커스 시 일시정지 요구).

### 토스트 최대 개수 — "1개"와 "스택"이 갈립니다

- **동시 1개**: M3 ("Only one snackbar may be displayed at a time") ·
  Spectrum (8단계 우선순위 큐로 교체·대기)
- **스택 허용**: Carbon (수직 스택, 최신이 위) · Atlassian (최신이 위,
  dismissible/non- 혼합 금지) · Cloudscape (2개째부터 접힌 스택 강제)
- 숫자 상한(N개)을 둔 시스템은 문서 층에서 **0개**입니다.
  > **정정 (2026-08-18).** 코드 층에는 있습니다 — **Sonner
  > `VISIBLE_TOASTS_AMOUNT = 3`**(초과분은 삭제가 아니라 `opacity: 0`으로 숨김).
  > EUI의 3은 상한이 아니라 "모두 지우기" 버튼 노출 임계입니다.

### 얼럿·배너 배치 — 페이지 상단 진영 vs 섹션 인라인 진영

- **페이지 상단**: GOV.UK (h1 직전 · error summary는 main 최상단) ·
  Spectrum Alert banner (헤더 아래) · Atlassian Banner (최상단 · **동시 1개**)
- **관련 섹션 인근**: Primer ("관련 섹션 근처, 전역이면 헤드라인 위") ·
  Carbon ("관련 항목 근처") · Polaris (전역=섹션 밖 / 맥락=섹션 안) ·
  Atlassian Section message
- **폼 에러 요약은 위치가 정반대로 갈립니다**: GOV.UK·Primer는 폼/페이지
  상단, **Carbon·Cloudscape는 폼 하단(제출 버튼 바로 위)**. Cloudscape는
  "페이지 상단 일반 메시지 금지"까지 명문화 — 같은 문제에 상하 반대 규정.
- M3에는 배너 컴포넌트가 없습니다 (고중요도 = 다이얼로그 담당).

### 얼럿·배너 자동 닫힘 — 없음이 8/8 만장일치

**확인한 전 시스템에서 배너·얼럿·인라인 노티의 시간 기반 자동 소멸
규정이 없습니다** — 지속(persistent)이 관행이 아니라 **만장일치 규범**입니다.
유일한 자동 제거는 "페이지 이탈 시"(GOV.UK success 배너 · Cloudscape
flashbar)이고, Atlassian Banner는 닫기 버튼조차 없습니다(조건 해소 시에만 제거).
자동 소멸은 토스트의 속성이지 얼럿의 속성이 아닙니다.

## 18표본 재종합 — 컴포넌트 실측 (2026-08-18)

피드백 축에 신규 표본이 0건이던 문제를 풀기 위해, 토스트·얼럿·배지를 실제로
배포하는 11개를 새로 읽었습니다 (Carbon `@carbon/styles@1.113.0` ·
Vuetify `4.1.10` · Ant `antd@6.6.1` · Chakra `@chakra-ui/react@3.36.1` ·
PrimeVue `@primeuix/themes@3.0.0` · Semi `@semi-bot/semi-theme-default@1.0.0` ·
Naive UI `2.45.0` · EUI `@elastic/eui@119.0.0` ·
Blueprint `@blueprintjs/core@6.18.0` · Grommet `2.56.0` · **Sonner `2.0.8`**).

**Sonner는 shadcn/ui가 토스트로 채택한 별도 라이브러리입니다.**
shadcn/ui의 `sonner.tsx`는 색 변수만 매핑하는 래퍼이고 치수·동작은 전부
Sonner 소관이므로, 아래에서는 **Sonner로 귀속**합니다.

### 정정 1 — 토스트 기본 지속시간의 5초 하한은 코드 층에서 깨집니다

문서 층 종합은 "수치를 규정한 5개 시스템 전부 5초 이상, 5초 미만을 허용하는
표본이 없다"였습니다. **컴포넌트 코드의 기본값은 다릅니다.**

| 값 | 시스템 (코드 층 기본값) |
|:---:|--------|
| **3000ms** | **Naive UI** `MessageProvider.duration` · **Ant Design** message `DEFAULT_DURATION` · Tizen CircularUI |
| **4000ms** | **Sonner** `TOAST_LIFETIME` |
| **4500ms** | **Ant Design** notification `DEFAULT_DURATION` |
| 5000ms | **Blueprint** `Toast` `timeout` |
| 8000ms | **Grommet** `notification.toast.time` |

> **정정.** **7개 코드 층 값 중 5개가 5초 미만**입니다.
> 문서 층 규정(Atlassian 8초 · Polaris 5초 · Spectrum·Carbon 최소 5초)과
> 실제 라이브러리 기본값이 갈립니다.
>
> **다만 성격이 다릅니다** — 5초 미만을 쓰는 것은 전부 "짧은 확인 메시지"
> 컴포넌트(Ant `message` · Naive `message` · Sonner)이고, **같은 시스템의
> 알림(notification) 컴포넌트는 더 깁니다** (Ant message 3000 vs
> notification 4500). Grommet의 8000ms는 Atlassian 문서 규정과 같은 값입니다.
>
> **결론이 뒤집히는 것은 "5초 미만 표본이 없다"이지, "액션 있는 토스트를
> 자동 소멸시키지 말라"가 아닙니다.** 후자는 여전히 유효합니다.

### 정정 2 — 우하단을 기본값으로 배포하는 시스템이 있습니다

문서 층 종합의 유일한 공통점이 "어느 시스템도 우하단을 규정하지 않는다"였습니다.

| 기본 위치 | 시스템 (코드 층) |
|------|--------|
| **우하단** | **Sonner** (`position: 'bottom-right'`) · **EUI** (`side: 'right'` + `bottom: 0`) |
| 우상단 | Ant Design notification (`placement: 'topRight'`) |
| 상단 중앙 | Semi (`top: 0` + `text-align: center`) · Ant message · Naive UI message (`placement: 'top'`) |
| 상단 | Blueprint (`toast-container-top`, 가로 정렬은 center) · Grommet (`layer.position: 'top'`) |

> **정정.** **shadcn/ui가 실제로 배포하는 토스트(Sonner)의 기본 위치는
> 우하단입니다.** EUI도 우하단입니다. 문서 층에서 아무도 규정하지 않은
> 방위가 **코드 층에서는 2표본**입니다.
>
> **코드 층 최빈은 상단(6표본)**이고, 그중 상단 중앙이 3표본입니다 —
> 이 역시 문서 층(우상단 Carbon · 좌하단 Atlassian · 하단 중앙 Spectrum)과
> 겹치지 않습니다. **위치는 여전히 코퍼스에서 수렴이 가장 없는 축입니다.**

### 정정 3 — 숫자 상한을 두는 시스템이 있습니다

> **정정.** 문서 층 종합은 "숫자 상한(N개)을 둔 시스템은 0개"였습니다.
> **Sonner는 `VISIBLE_TOASTS_AMOUNT = 3`으로 동시 표시를 3개로 자릅니다** —
> 초과분은 삭제되지 않고 `data-visible=false` → `opacity: 0`으로 숨겨집니다.
>
> **EUI는 상한이 아니라 임계입니다** —
> `CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT = 3`으로 **3개째부터 "모두 지우기"
> 버튼이 나타납니다.** 개수를 자르지는 않습니다.
>
> Ant·Naive UI에는 `max`·`maxCount` prop이 있으나 **기본값이 없습니다**
> (무제한). 같은 숫자 3에 두 시스템이 다른 의미를 부여한 셈입니다.

### 정정 4 — 재배치(reposition)를 가진 것은 Atlassian뿐이 아닙니다

기존 문서가 "표본에서 이 축을 토큰으로 둔 것은 Atlassian뿐"이라고 적었습니다.
**구현 방식 세 가지가 확인됩니다.**

| 방식 | 시스템 | 값 |
|------|--------|-----|
| **전용 모션 토큰** | **Atlassian** | `motion.flag.reposition` 250ms, `transform`, `inout.bold` |
| **형제 셀렉터 전환** | **Blueprint** | `~ .bp6-toast`에 `transform` **100ms + 지연 50ms** |
| **`height` 전환** | **Sonner** · **Chakra UI** | 둘 다 `height 400ms` (진입·퇴장과 같은 길이) |

- **Blueprint만 지연(50ms)을 둡니다** — 사라지는 토스트가 빠진 뒤에
  나머지가 자리를 메웁니다. 지속시간도 진입·퇴장(300ms)의 3분의 1입니다.
- **Sonner·Chakra는 높이를 보간합니다** — 스택이 접혀 있을 때
  뒤 토스트가 앞 토스트의 높이(`--front-toast-height`)를 취하고,
  펼쳐지면 제 높이로 돌아갑니다.
- **"없으면 반드시 티가 나는 자리"라는 기존 판단은 유지됩니다** —
  4개 시스템이 서로 다른 방식으로 같은 문제를 풉니다.

### 토스트 폭 — 350~390px에 몰립니다

```
288 → 352   Carbon      (max 브레이크포인트에서 확대 — 반응형은 이 하나)
352         PrimeVue    (22rem)
356         Sonner      (TOAST_WIDTH)
365         Naive UI    notification
384         Ant Design notification · Grommet (size 'medium')
440         EUI         리스트 컨테이너 (소스 주석: "results in 360px toast width")
min/max     Vuetify 344~672 · Naive UI message 420~720 · Blueprint 300~500
없음        Semi (inline-flex) · Ant message (max-content)
```

**고정 폭을 두는 5표본이 352~384px 안에 들어옵니다**
(PrimeVue 352 · Sonner 356 · Naive UI 365 · Ant 384 · Grommet 384).
Carbon도 최대 브레이크포인트에서 352px이 됩니다 — 기본은 288px입니다.
확보한 피드백 축에서 가장 뚜렷한 수렴입니다.

- **Carbon만 반응형입니다** (288 → 352px). 나머지는 폭이 고정이고,
  모바일에서 `width: 100%`로 바뀝니다 (Sonner ≤600px · EUI ≤`m` 브레이크포인트).
- **Vuetify·Naive UI·Blueprint는 최소·최대 폭 쌍**을 씁니다 — 내용 길이에
  따라 폭이 변합니다.
- **Semi·Ant message는 폭 규격이 없습니다** — 짧은 확인 메시지 전제입니다.

### 토스트 패딩·라운드

```
패딩  10px      PrimeVue(overlay.popover.padding) · Naive UI message(10/20)
      12/8px    Semi
      16px      Sonner · Naive UI notification · Chakra(세로 16 / 좌 16 / 우 24)
      13px+     Carbon (좌측 강조 보더 6px과 합쳐 19px)
라운드 4px      Blueprint
       6px      Semi(radius-medium)
       8px      Sonner · Ant alert(borderRadiusLG)
       토큰     PrimeVue·Chakra·Vuetify(시스템 라운드 참조)
```

**Chakra만 좌우 패딩이 비대칭입니다** (좌 16 / 우 24px) — 닫기 버튼 자리입니다.

### 얼럿 패딩 — 12~16px이 다수, 양극단이 벌어집니다

```
 6/10   PrimeVue Message      (인라인 메시지 전제, 최소)
 8      Cloudscape (세로) · Ant 기본(세로 8 / 가로 12 리터럴)
12      Chakra sm · Radix 1 · Semi Banner(12/12) · EUI CallOut s(12/16)
13      Naive UI              (4·8 배수 밖)
16      shadcn/ui(16/12) · Mantine · Vuetify · Blueprint · Chakra md·lg · EUI CallOut m · Radix 2
20/24   Ant 설명형            (paddingMD / paddingContentHorizontalLG, 최대)
24      Radix 3
```

**16px이 7표본으로 최빈입니다.** 기존 판의 "16 / 12" 권고와 어긋나지 않습니다.

- **Naive UI의 13px**은 4·8 배수 밖이고, 아이콘 마진도 `11px 8px 0 12px`으로
  사방이 전부 다릅니다 — 광학 정렬을 리터럴로 박은 형태입니다.
- **Ant은 가로 패딩만 12px 리터럴**이고 소스 주석이 `// Fixed value here.`로
  못 박아 두었습니다. 전부 시드 파생인 시스템의 예외입니다.
- **Ant·Chakra·EUI·Radix는 얼럿에 크기 축이 있습니다** (설명 유무 또는 s/m/lg).

### 좌측 강조 보더 — 2~8px, 배경 밝기에 연동하는 사례

```
8px   Vuetify   ($alert-border-thin-width, currentColor 불투명도 0.38)
6px   Carbon    (toast·inline) · Mantine Notification 색 바(6px, 라운드만큼 상하 인셋)
3px   Carbon low-contrast 변형 · EUI CallOut (border.thin + border.thick)
2px   Cloudscape alert
0px   Cloudscape flashbar (배경색이 상태를 나타내므로 불필요)
```

**Carbon이 배경 밝기에 연동합니다** — 기본 6px, `low-contrast`(연한 배경)
변형에서 **3px로 절반**이 됩니다. 확보 표본에서 강조선 두께를 변형에 따라
바꾸는 유일 사례입니다.

**EUI는 강조선을 `::before`로 그리고 컨테이너 위아래로 1px씩 넘치게**
(`block-size: calc(100% + 2px)`) 만들어 **라운드 모서리와 맞춥니다.**
Mantine이 색 바의 상하 인셋을 라운드 값으로 참조하는 것과 같은 문제,
반대 해법입니다.

### 아이콘 정렬 — 서체 상대 진영이 2표본으로 늘었습니다

| 방식 | 시스템 |
|------|--------|
| **서체·행간 상대** | **Radix Themes**(높이 = `--line-height-2/3`) · **Chakra UI**(`width: 1em; height: 1em`) |
| **px 고정 + 이동 보정** | shadcn/ui(16px + `translate-y-0.5`) · **PrimeVue**(1rem + `margin: 1px 0 0 0`) · **Mantine**(20px + `margin-top: 1px`) · **Naive UI**(24px + `margin: 11px 8px 0 12px`) |
| px 고정, 보정 미확인 | Vuetify 28px · EUI · Blueprint(16px, `top: 18px` 절대 배치) |

**서체 상대 진영이 Radix Themes 하나에서 둘로 늘었습니다.**
Chakra는 행간이 아니라 `1em`(글자 크기)을 씁니다 — 같은 발상의 다른 기준선입니다.

**보정값이 1~2px에 몰립니다** (PrimeVue 1 · Mantine 1 · shadcn/ui 2).
Naive UI의 11px은 아이콘이 24px로 커서 생긴 값입니다.

### 배지 — 높이 20px이 최빈, 굵기는 400~700으로 갈립니다

```
높이  16   Chakra xs
      18   Semi · Naive UI · Carbon tag xs·sm · PrimeVue sm · EUI(행간 18 + 보더 2 = 20)
      20   Ant · PrimeVue 기본 · Vuetify · Chakra sm(기본) · shadcn/ui 사이드바
      24   Chakra md · Carbon tag md(기본) · PrimeVue lg
      28   Chakra lg · PrimeVue xl
      32   Carbon tag lg
dot    6   Ant (fontSizeSM / 2)
       8   Semi · Naive UI · PrimeVue
       9   Vuetify
```

- **20px에 5표본이 모입니다.** 18px이 그다음입니다.
- **크기 축을 두는 진영이 셋**입니다 — Chakra 4단(16/20/24/28) ·
  PrimeVue 4단(18/20/24/28) · Carbon 3단(18/24/32).
  **Chakra와 PrimeVue의 스케일이 한 칸 어긋난 채로 거의 겹칩니다.**
- **서체 굵기**: Ant **`normal`(400)** · Chakra·Vuetify·EUI **medium(500)** ·
  **PrimeVue 700**. Ant의 400은 확보 표본에서 유일합니다.
- **서체 크기**: PrimeVue **10px** (최소) · 나머지 대부분 12px.
- **라운드**: 알약(shadcn/ui `rounded-full` · EUI `size.l`=24px ·
  Carbon 16px · Ant · Naive UI · **Semi 9px = 높이의 정확히 절반**) vs
  각진 쪽(Cloudscape 4px · Vuetify 10px · Chakra `l2` · PrimeVue `radius.md`).
  **알약이 6표본으로 다수**입니다 — 기존 판의 "라운드가 정반대"(shadcn 알약 /
  Cloudscape 4px)는 **Cloudscape가 소수파**인 쪽으로 정리됩니다.
- **등폭 숫자**: shadcn/ui 사이드바 배지 · **Chakra 배지 레시피에 기본 내장**
  (`fontVariantNumeric: "tabular-nums"`).
- **EUI 배지가 보더 몫을 패딩·행간에서 뺍니다** — 소스 주석이 이유를 남깁니다
  (*"Account for the (usually transparent) border so that the visual padding is
  of size s"*). `patterns/button.md`의 보더 차감 관행이 배지에서도 확인됩니다.

### 상태 표현 — 3진영이 유지되고 중간 태도가 늘었습니다

| 방식 | 시스템 |
|------|--------|
| **배경색 전체** | Cloudscape 플래시바 · **Chakra 토스트**(warning·success·error만 `*.solid`, **info는 중립 패널색**) |
| **텍스트·아이콘 색만** | shadcn/ui 얼럿 · **Sonner 기본**(`richColors` 꺼짐) · **Semi 기본 변형** |
| **연한 배경 + 상태 보더** | Mantine Alert · **PrimeVue**(`color-mix(… transparent 5%)` 배경 + 상태 보더 + **상태별 그림자**) · **Semi `light` 변형** · **Sonner `richColors`** |

- **PrimeVue는 그림자까지 상태별입니다** —
  `0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)`.
  확보 표본에서 상태색을 그림자에까지 밀어 넣은 유일 사례입니다.
- **Semi는 한 컴포넌트 안에 두 태도를 둡니다** — 기본은 아이콘 색만,
  `light` 변형은 연한 배경 + 1px 상태 보더.
- **Chakra `info`에만 배경 지정이 없습니다** — 중립 패널색 그대로입니다.
- **Chakra 얼럿에 `neutral` 상태가 있습니다** — 의미 축 4종 밖의
  중립 상태를 둔 사례입니다 (Atlassian `discovery`와 같은 "빈자리 메우기").

### 토스트 진입·퇴장 — 위치 이동 + 축소가 관행

| 시스템 | 진입 | 퇴장 |
|--------|------|------|
| **Blueprint** | `translateY(-40px)` → 0, **300ms** `cubic-bezier(0.54, 1.12, 0.38, 1.11)`(오버슈트) | 300ms opacity + **`filter: blur(0 → 8px)`** |
| **Sonner** | `translateY(±100%)` → 0, **400ms** | 400ms(`opacity` 200ms) · 스와이프 제거는 200ms |
| **Chakra** | translate·scale·opacity **400ms** `cubic-bezier(0.21, 1.02, 0.73, 1)` | 400ms(`opacity` 200ms) `cubic-bezier(0.06, 0.71, 0.55, 1)` |
| **EUI** | `translateY(24px) scale(.9)` → 0/1, `animation.normal` + `resistance` | **250ms** (`TOAST_FADE_OUT_MS`) |
| **Vuetify** | `scale(0.8)` → 1 | 미확인 |
| **PrimeVue** | 0.3s + **`blur: 10px`** 토큰 | 0.3s |
| Atlassian | 250ms 좌측 50% 슬라이드 + 페이드 | 200ms 15% 이동 |

- **퇴장에 블러를 쓰는 것은 Blueprint뿐입니다** (`filter: blur(8px)`).
  PrimeVue의 `blur: 10px`는 성격이 다릅니다 — 배경 흐림 토큰입니다.
- **Blueprint·Chakra의 진입 이징이 둘 다 오버슈트**입니다
  (y₁ = 1.12 / 1.02).
- **퇴장에서 불투명도만 짧게 가져가는 진영**이 둘입니다 —
  Sonner·Chakra 모두 이동은 400ms, 불투명도는 200ms입니다.
  Radix Themes 세그먼티드(이동 100 / 불투명도 80ms)와 같은 발상입니다.
- **Sonner는 스택 축소를 `--scale: var(--toasts-before) * 0.05 + 1`**로 둡니다 —
  뒤 토스트마다 5%씩 작아집니다.
- **Sonner는 `@media (hover: none) and (pointer: coarse)`에서 스택 펼침 변환을
  끕니다** — `table.md`·`systems/mantine.md`에서 본 hover/터치 분기가
  토스트에도 적용됩니다.

### 진행 표시 — Ant만 규격이 있습니다

**Ant Design notification**에 남은 시간 진행 바가 있습니다 —
높이 **2px**, `linear-gradient(90deg, {colorPrimaryBorderHover}, {colorPrimary})`.
확보 표본에서 토스트 잔여 시간을 시각화한 유일 사례입니다.

### 그 밖의 단일 관측

- **Carbon 알림 닫기 버튼이 48×48px**입니다 — 토스트 폭(288px)의 6분의 1이며,
  터치 타겟 규격을 알림 닫기에 적용한 사례입니다.
- **Carbon 인라인 알림 최대 폭이 브레이크포인트 4단**입니다
  (288 → 608 → 736 → 832px).
- **Grommet은 인라인·글로벌·토스트 3종이 내용 구조를 공유하고 컨테이너만
  분기합니다** — 글로벌 배너는 **라운드 0 + 좌우 48px**로 화면 폭을 채웁니다.
- **Vuetify 배지 보더가 2px + `scale(1.05)`** — 배경 위에서 분리하려고
  보더를 확대합니다.
- **Sonner 닫기 버튼이 `translate(-35%, -35%)`**로 모서리에 반쯤 걸칩니다.
  스와이프 임계는 45px 또는 속도 0.11.
- **EUI 토스트 z-index가 `levels.toast` 9000으로 `modal` 8000보다 위**입니다
  (`systems/eui.md`).

## 아직 못 채운 것

- ~~토스트 지속시간 / 위치 / 최대 개수 / 얼럿 배치 / 자동 닫힘~~ →
  **해소 (2026-08-18)** — 위 "판단 지침 — 문서 층 실측" 절
- ~~Mantine Notification·Alert 치수~~ → **해소 (2026-08-18)** —
  `@mantine/core@9.5.1` `Notification.css`·`Alert.css` 실측. Alert 패딩 16 고정 ·
  Notification 좌 22/나머지 10px (위 "얼럿 치수" · "Notification 실측" 절).
  둘 다 고정 높이 없음(내용 파생) 확인
- ~~Radix Themes Callout 치수~~ → **해소 (2026-08-18)** — `callout.css` 3.3.0:
  패딩 12/16/24, 라운드 `--radius-3`~`5`, grid 열 고정. 위 "Callout 치수" 절
- ~~shadcn/ui `empty` 컴포넌트~~ → **해소 (2026-08-18)** — 위 "빈 상태" 절
  (`empty.tsx`, main@8a7701e)
- **진행 표시(progress) 상태색** — Cloudscape에
  `color-background-progress-bar-value-default`가 컨텍스트별로 바뀌는 것만 확인했습니다.
  토스트 잔여 시간 진행 바는 Ant Design(2px 그라디언트) 하나뿐입니다
- **스크린리더 알림** (`aria-live` 영역) — shadcn/ui Alert에 `role="alert"`가 있는 것만
  확인했습니다. 토스트의 `aria-live` 설정은 미확인
  (Sonner에 `containerAriaLabel: 'Notifications'` · `customAriaLabel` prop이
  있는 것은 확인했으나 `aria-live` 값은 읽지 못했습니다)
- **Vuetify·Semi 토스트 퇴장 애니메이션** — 진입(scale 0.8 / 없음)만 확인했습니다
- **얼럿 자동 닫힘 코드 층 반례 여부** — 18표본 중 얼럿·배너에 시간 기반
  자동 소멸 기본값을 둔 것은 확인되지 않았습니다. 문서 층의 만장일치(8/8)와
  어긋나지 않지만, 전 컴포넌트를 훑은 것은 아닙니다

## 구현 시 기본값

**심각도 체계 — 축을 하나 고르세요.**

```
의미 축     success · error · warning · info      (4개. 대부분의 경우 충분)
심각도 축   critical · high · medium · low · neutral  (운영·모니터링 화면)
```

**둘을 동시에 두는 것은 Cloudscape뿐이고, 운영 콘솔이라는 도메인 때문입니다.**
일반 제품이면 의미 축 4개로 시작하세요.

**shadcn/ui처럼 `destructive` 하나만 두는 것도 실제 선택지입니다** —
다만 나중에 추가할 때 시맨틱 계층이 있어야 합니다 (`color.md`).

**Atlassian의 `discovery`를 참고하세요** — "새 기능 안내"처럼
success/error/warning/info 어디에도 안 맞는 자리가 실제로 생깁니다.

**상태 표현 — 배경색과 텍스트색 중 하나를 고르세요.**

| 방식 | 예 | 적합한 경우 |
|------|-----|-------------|
| **배경색 전체** | Cloudscape 플래시바 | 화면 상단 알림. 눈에 확실히 띔 |
| **텍스트 색만** | shadcn/ui 얼럿 | 인라인 얼럿. 페이지 톤을 흔들지 않음 |
| 연한 배경 + 진한 텍스트 | Mantine Alert (`-light` 계열) | 중간 |

**배경색을 쓸 거면 텍스트 색을 배경별로 짝지으세요.**
Cloudscape가 노란 배경(`#ffe347`)에만 검정 텍스트를 씁니다 —
`color-text-notification-yellow`가 별도 토큰인 이유입니다.

**색만으로 상태를 구분하지 마세요.** shadcn/ui가 아이콘 모양으로 구분합니다
(원 / 삼각 / 팔각). 다만 **`success`와 `info`가 둘 다 원이면 모양만으로는 안 갈립니다** —
색·아이콘·텍스트 셋 중 둘 이상을 쓰세요.

**얼럿 치수**

```
패딩    16 / 12  (좌우 / 상하)
라운드  10~12px
보더    1~2px
제목    굵기 500~700
설명    14px, 보조 색
```

**18표본에서 얼럿 패딩 16px이 최빈(7표본)이라 이 권고는 유지됩니다**
(2026-08-18 재검증). 인라인 메시지를 폼 필드 옆에 붙일 거면
PrimeVue의 6/10px까지 내려갈 수 있고, 설명이 붙는 큰 얼럿은
Ant의 20/24px까지 올라갑니다.

**Cloudscape가 라운드 12px / 보더 2px / 굵기 700으로 가장 강하고,
shadcn/ui가 10px / 1px / 500으로 가장 약합니다.**

**보더 두께를 면별 토큰으로 나눌지는 필요할 때 정하세요.**
Cloudscape가 4면 + 전체 5개 토큰을 두는데 값은 전부 2px입니다 —
좌측 강조 보더(`border-left: 4px`) 같은 변형을 나중에 넣을 자리입니다.

**논리 속성 이름을 쓰세요** (`inline-start` / `block-end`).
RTL에서 자동으로 뒤집힙니다 (`i18n/README.md`).

**아이콘 정렬 — 서체 지표를 참조하세요.**

```
아이콘 높이 = 첫 줄 행간   (Radix Themes)
아이콘 = 1em              (Chakra UI)
```

**서체 상대 진영이 2표본이 됐습니다** (2026-08-18). 크기를 고정하고
보정값을 더하는 방식(shadcn/ui +2px · PrimeVue +1px · Mantine +1px ·
Naive UI +11px)은 4표본으로 여전히 다수이지만, **글자 크기가 바뀔 때
보정값을 다시 맞춰야 합니다.**

**아이콘 열을 0px로 두고 `:has()`로 켜세요** (shadcn/ui 방식).
아이콘이 없어도 제목·설명 정렬이 유지됩니다.

**제목은 1줄로 자르고 최소 높이를 잡으세요** (`line-clamp-1` + `min-h-4`).
제목이 없는 얼럿에서도 레이아웃이 유지됩니다.

**토스트 폭 — 352~384px에서 고르세요** (2026-08-18 추가).

```
고정 폭  352~384  (PrimeVue 352 · Sonner 356 · Naive 365 · Ant·Grommet 384)
모바일   100%     (좌우 여백 16px)
```

**고정 폭을 두는 5표본이 전부 이 32px 구간에 들어옵니다**
(Carbon도 최대 브레이크포인트에서 352px) — 확보한 피드백 축에서
가장 뚜렷한 수렴입니다. 내용 길이가 크게 변하면
최소·최대 쌍(Vuetify 344~672 · Blueprint 300~500)도 실제 선택지입니다.

**토스트 모션**

```
진입   250~400ms  화면 밖에서 슬라이드(+scale 0.8~0.95) + 페이드
퇴장   200~400ms  짧게 이동 + 페이드 (불투명도만 200ms로 더 짧게)
재배치 100~400ms  transform 또는 height 전환
```

**`reposition`을 빼먹지 마세요.** 토스트가 쌓이거나 하나가 사라질 때
남은 것들이 순간이동하면 눈에 걸립니다. **구현이 세 가지입니다**
(2026-08-18 갱신):

```
전용 모션 토큰    Atlassian  transform 250ms inout
형제 셀렉터       Blueprint  transform 100ms + 지연 50ms
height 전환       Sonner · Chakra UI  height 400ms
```

**퇴장에서 불투명도만 짧게 가져가세요** — Sonner·Chakra 둘 다 이동 400ms /
불투명도 200ms입니다. 요소가 자리를 뜨기 전에 먼저 사라져 보입니다.

**재배치는 `inout` 이징을 쓰세요** — 진입/퇴장과 달리 양쪽에서 감속해야
"밀려나는" 느낌이 아니라 "자리를 잡는" 느낌이 됩니다.

**배지**

```
높이     20px      (18표본 최빈 — 18px이 그다음)
라운드   완전 알약  (6표본 다수. 각진 쪽은 Cloudscape 4px 등 소수)
패딩     좌우 6~8 / 상하 0~2
글자     12px / 굵기 500
숫자     tabular-nums
```

**높이 20px에서 시작하세요** (2026-08-18 추가) — Ant · PrimeVue 기본 ·
Vuetify · Chakra `sm` · shadcn/ui 사이드바가 20px입니다.
크기 축을 둘 거면 **16 / 20 / 24 / 28**(Chakra) 또는 **18 / 20 / 24 / 28**
(PrimeVue)이 참고 기준입니다 — 두 시스템의 스케일이 한 칸 어긋난 채 겹칩니다.

**알약이 다수입니다.** 기존 판은 "알약과 4px이 정반대로 갈린다"고 적었는데,
18표본에서는 **알약 6표본 / 각진 쪽 4표본**으로 알약이 우세합니다.
알약을 리터럴로 쓸 거면 **높이의 절반**이 안전합니다 (Semi 18px → 9px).

**숫자 배지에 `tabular-nums`를 쓰세요.** 개수가 9→10으로 바뀔 때 폭이 흔들립니다.
shadcn/ui 사이드바 배지가 `min-w-5`(20px)와 함께 쓰고,
**Chakra는 배지 레시피에 기본으로 내장**합니다.

**토스트 지속시간·위치·개수** (2026-08-18 추가)

```
짧은 확인 메시지   3~4초   (Ant·Naive message 3000 · Sonner 4000)
일반 알림          4.5~8초 (Ant notification 4500 · Blueprint 5000 · Grommet 8000)
액션이 있는 것     자동 소멸 금지  (문서 층 만장일치 — 이건 안 뒤집힙니다)
```

**문서 층 규정(5초 이상)과 라이브러리 기본값(3~4초)이 갈립니다.**
"읽고 끝"인 확인 메시지는 3~4초, 사용자가 판단해야 하는 알림은 5초 이상으로
**컴포넌트를 나누는 것**이 확보 표본의 실제 관행입니다 — Ant이 message 3초 /
notification 4.5초로 같은 시스템 안에서 나눕니다.

**위치는 한 번 정하고 바꾸지 마세요.** 18표본에서 상단(6) · 우하단(2) ·
우상단(1)로 갈리고, 문서 층 규정(우상단·좌하단·하단 중앙)과도 겹치지 않습니다.
**교차 권고값이 없는 축입니다.**

**동시 표시 개수에 상한을 두는 것을 검토하세요.** Sonner가 3개로 자릅니다
(초과분은 숨김). 상한이 없으면 화면이 토스트로 덮입니다.
자르는 대신 EUI처럼 **3개째부터 "모두 지우기" 버튼**을 띄우는 방법도 있습니다.

**색깔 배경 위의 버튼을 컨텍스트로 처리하세요.**

Cloudscape가 `flashbar` · `flashbar-warning` · `alert` 컨텍스트로
버튼 배경·hover 알파·주 버튼 색을 덮어씁니다.
**컴포넌트가 "내가 어디 안에 있는지" 몰라도 됩니다.**

```
어두운 배경 위   hover 검정 15% · 주 버튼 흰색
밝은 배경 위     hover 검정  5% · 주 버튼 짙은 회색
연한 배경 위     라이트에서 검정 5% / 다크에서 흰색 10%
```

**밝은 배경에서 알파를 3분의 1로 줄이세요.** 노란 배경에 검정 15%는 너무 진합니다.
