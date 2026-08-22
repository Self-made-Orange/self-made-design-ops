<!-- lang-links -->
> [English](navigation.md) · **한국어**
<!-- /lang-links -->

# Navigation

**사이드바·탭·브레드크럼의 치수와 구조를 비교합니다.**

> **근거가 있는 시스템은 16개입니다** (2026-08-18 갱신) — shadcn/ui ·
> Radix Themes · Mantine · Cloudscape · Apple(툴바 실측) · CarPlay(개수 제한)에
> **Carbon · Vuetify · Ant Design · Chakra UI · PrimeVue · Semi · Naive UI ·
> EUI · Blueprint · Grommet 10개가 추가**됐습니다.
>
> shadcn/ui `sidebar.tsx`가 이 문서에서 가장 큰 단일 근거입니다 — **21KB 소스**에
> 폭·상태·키보드 단축키·영속화까지 들어 있습니다.
>
> 이 문서의 앞부분은 **초기 6표본** 기준입니다. **16표본 기준 재검증은
> "16표본 재종합" 절에 있고, 둘이 어긋나면 재종합 절이 우선입니다.**
>
> **"사이드바를 쓸까 상단 내비를 쓸까", "계층을 몇 단계까지 둘까"는
> 문서 사이트에만 있습니다.**

## 사이드바 폭

| 시스템 | 펼침 | 접힘(아이콘) | 모바일 |
|--------|:---:|:---:|:---:|
| **shadcn/ui** | **256px** (16rem) | **48px** (3rem) | **288px** (18rem) |
| **Cloudscape** | 미확인 | **52px** (`size-side-navigation-collapsed-width`) | — |
| Mantine | prop으로 주입 (`AppShell` `navbar.width`) | — | — |

**접힘 폭이 shadcn/ui 48px, Cloudscape 52px입니다** — 4px 차이입니다.
서로 무관한 시스템인데 거의 같은 값에 도달했습니다.

**shadcn/ui는 모바일 폭이 데스크톱보다 넓습니다** (288 vs 256px).
모바일에서는 사이드바가 화면을 덮는 시트로 열리므로 더 넓게 씁니다.

**Cloudscape의 접힘 폭만 밀도 축을 타지 않습니다.**

| 토큰 | comfortable | compact |
|------|:---:|:---:|
| `size-side-navigation-item-height` | 28px | **24px** |
| `size-side-navigation-item-collapsed` | 30px | **28px** |
| `size-side-navigation-collapsed-width` | 52px | **52px** (동일) |

**항목 높이는 줄어들고 폭은 유지됩니다** — `table.md`에서 본
"세로만 줄이고 가로는 유지" 패턴과 같습니다.

## 사이드바 항목 높이

| 시스템 | 값 |
|--------|-----|
| **shadcn/ui** | **28 / 32 / 48px** (`sm` / `default` / `lg`) |
| **Cloudscape** | **28px** / compact 24px |
| Radix Themes · Mantine | 미확인 |

**28px에서 둘이 만납니다** — shadcn/ui `sm`과 Cloudscape `comfortable`입니다.

shadcn/ui 사이드바 내부 요소:

| 요소 | 높이 | 글자 |
|------|:---:|:---:|
| 그룹 라벨 | 32 (`h-8`) | 12 (`text-xs`) |
| **메뉴 버튼 `default`** | **32 (`h-8`)** | 14 |
| 메뉴 버튼 `sm` | 28 (`h-7`) | 12 |
| 메뉴 버튼 `lg` | **48 (`h-12`)** | 14 |
| 하위 메뉴 항목 | 28 (`h-7`) | 12~14 |
| 배지 | 20 (`h-5`, `min-w-5`) | 12 |
| 스켈레톤 | 32 (`h-8`) | — |
| 검색 입력 | 32 (`h-8`) | — |

**메뉴 버튼 패딩이 8px 사방(`p-2`)이고 아이콘·라벨 간격이 8px(`gap-2`)입니다.**
아이콘은 16px(`size-4`) 고정입니다.

**접힘 상태에서 메뉴 버튼이 정사각형이 됩니다** —
`group-data-[collapsible=icon]:size-8!` (32×32). `!important`가 붙어 있습니다.

**`lg`만 접힘에서 패딩이 0이 됩니다** (`group-data-[collapsible=icon]:p-0!`) —
48px 버튼이 접힘 폭 48px과 같으므로 패딩 자리가 없습니다.

**배지가 `tabular-nums`입니다** — 숫자 폭이 고정돼 개수가 바뀌어도 흔들리지 않습니다
(`table.md`에서 Mantine이 표에 쓰는 것과 같은 속성).

## 사이드바 상태 — 영속화와 단축키

shadcn/ui만 있습니다.

| 항목 | 값 |
|------|-----|
| 쿠키 이름 | `sidebar_state` |
| 쿠키 수명 | **7일** (`60*60*24*7`) |
| 키보드 단축키 | **`Cmd/Ctrl + B`** |
| 방향 | `side=left` / `side=right` (보더가 따라 바뀜) |
| 접힘 모드 | `collapsible=icon` / `offcanvas` |

**펼침/접힘 상태를 쿠키에 저장합니다.** 서버 렌더링에서 첫 프레임부터 올바른 상태로
그려지므로 깜빡임이 없습니다 — `localStorage`로는 불가능합니다.

**`Cmd+B`가 하드코딩돼 있습니다.** 표본에서 컴포넌트가 전역 키보드 단축키를
등록하는 것은 shadcn/ui 사이드바뿐입니다.

**`side=right`에서 보더가 반대로 갑니다** —
`group-data-[side=left]:border-r group-data-[side=right]:border-l`.
아이콘도 `group-data-[side=right]:rotate-180`으로 뒤집힙니다.

### 접힘 폭 계산에 패딩이 더해집니다

```
group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]
group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]
```

**48px + 16px = 64px**, 보더가 있는 층은 **+2px = 66px**입니다.
`--sidebar-width-icon`(48px)은 **내용 폭**이고 실제 컨테이너는 64~66px입니다.

**Tailwind의 `--spacing(4)` 함수 문법을 씁니다** — `calc()` 안에서
스페이싱 base × 4를 계산합니다 (`systems/tailwind.md`).

## 탭

### 치수

| 시스템 | 리스트 높이 | 항목 패딩 | 글자 | 굵기 |
|--------|:---:|:---:|:---:|:---:|
| **shadcn/ui** | **36px** (`h-9`) | 8 / 4 (`px-2 py-1`) | 14 | 500 |
| **Radix Themes** | **32 / 40px** (`--space-6`/`7`) | 8 / 16 (size별) | — | — |
| **Cloudscape** | 미확인 | 세로 4px / compact 2px | **16px** | **700** |

**Cloudscape 탭이 본문(14px)보다 큽니다** — 16px / 굵기 700입니다.
`font-weight-tabs-disabled`도 700으로 같습니다 — **비활성 탭도 굵기가 그대로입니다.**

**Radix Themes 탭 높이가 스페이싱 토큰입니다** (`--space-6` 32 / `--space-7` 40) —
버튼 높이가 `--space-5`~`8`인 것과 같은 방식입니다 (`form.md`).

### Radix Themes — 활성 탭의 자간을 좁힙니다

| 토큰 | 값 |
|------|:---:|
| `--tab-inactive-letter-spacing` | **0em** |
| **`--tab-active-letter-spacing`** | **-0.01em** |
| `--tab-inactive-word-spacing` | 0em |
| `--tab-active-word-spacing` | 0em |

**활성 탭이 굵어지면 글자가 넓어져 탭 폭이 변합니다.**
자간을 -0.01em 좁혀 그 증가분을 상쇄합니다.

**표본에서 상태에 따라 자간을 바꾸는 것은 Radix Themes뿐입니다.**
`word-spacing` 토큰도 두었지만 양쪽 값이 0em으로 같습니다 — **자리만 만들어 둔 형태입니다.**

컴포넌트 CSS(`_internal/base-tab-list.css`)에서 **구조 쪽 장치**도 확인됐습니다:

- **투명 복제 라벨**: 각 탭이 라벨을 두 번 렌더링합니다 —
  `TriggerInnerHidden`이 `visibility: hidden` + **활성(굵은) 서체**로 폭을
  차지하고, 보이는 라벨은 `position: absolute`로 그 위에 얹힙니다.
  자간 보정(-0.01em)이 미세 조정이라면, 이쪽은 **폭 자체를 굵은 상태 기준으로
  예약**하는 근본 대책입니다. 두 장치를 겹쳐 씁니다.
- **Tabs(버튼)와 TabNav(링크)가 같은 베이스 CSS를 공유**합니다 —
  패널 전환과 페이지 이동이 시각적으로 동일한 탭입니다.
- 활성 표시는 `::before` 2px 하단 바(`--accent-indicator`),
  고대비 모드에서 `--accent-12`로 교체됩니다.
- 리스트가 `overflow-x: auto`인데 **스크롤바를 숨깁니다**
  (`scrollbar-width: none`) — 넘치면 스크롤은 되지만 표시는 없습니다.

### 활성 표시 방식 — 2가지

| 시스템 | 방식 |
|--------|------|
| **shadcn/ui `default`** | 알약 배경 + `shadow-sm` |
| **shadcn/ui `line`** | **밑줄** (`after:h-0.5`, `bottom-[-5px]`) |
| **Radix Themes** | `--tab-inner-border-radius` (내부 요소 라운드) |
| Cloudscape | `border-radius-tabs-focus-ring: 20px` (포커스링만 확인) |

**shadcn/ui는 두 변형을 한 컴포넌트에 둡니다** — `variant=default`(알약) /
`variant=line`(밑줄). `line`에서는 리스트 라운드가 0이 되고 그림자가 사라집니다.

**밑줄 두께가 2px, 위치가 `bottom-[-5px]`입니다** — 탭 아래 5px 밖에 그립니다.
리스트 컨테이너 경계선 위에 겹칩니다.

**세로 방향도 지원합니다.**

| 방향 | 표시 위치 | 크기 |
|------|-----------|:---:|
| 가로 | `inset-x-0 bottom-[-5px]` | 높이 2px |
| **세로** | **`inset-y-0 -right-1`** | **폭 2px** |

`group-data-[orientation=vertical]/tabs`로 분기합니다 —
**세로 탭에서는 밑줄이 오른쪽 세로선이 됩니다.**

전환은 `after:opacity` 페이드입니다 — 위치 이동 애니메이션이 아닙니다.

### Radix Themes `tab-nav.css` — 차이는 콘텐츠 패널뿐 (2026-08-18 확인)

`tab-nav.css`(3.3.0)를 열었습니다 — **전체가 5줄**입니다:
`base-tab-list.css` import + `.rt-TabNavItem { display: flex }`.
`tabs.css`도 같은 import에 `.rt-TabsContent`(포커스 시 `outline: 2px
var(--focus-8)`)만 더합니다. 즉 **두 컴포넌트의 시각 규격은 100% 공유**이고,
갈리는 것은 역할뿐입니다 — Tabs는 패널 전환(버튼 + 콘텐츠), TabNav는
페이지 이동(링크). 앞 절의 "같은 베이스 CSS 공유"가 소스 전문으로
확정됐습니다. 높이(32/40) · 자간 보정 · 투명 복제 라벨 · 2px 인디케이터
전부 `_internal/base-tab-list.css` 한 파일 소관입니다.

### Radix Themes 세그먼티드 컨트롤 — 인디케이터가 움직입니다

| 토큰 | 값 |
|------|-----|
| `--segmented-control-transition-duration` | **100ms** |
| `--segmented-control-indicator-background-color` | `--color-background` / `--gray-a3` |
| `--segmented-control-border-radius` | `max(--radius-2, --radius-full)` |

**인디케이터가 배경으로 슬라이드합니다** (`transform` 전환 100ms).
`transition: opacity calc(0.8 * var(--segmented-control-transition-duration))`도 있어
**불투명도는 80ms, 이동은 100ms**로 다릅니다.

`max(--radius-2, --radius-full)` 패턴은 입력 필드와 같습니다 (`form.md`) —
`data-radius="full"`이면 알약이 됩니다.

## 드롭다운형 상단 내비 — shadcn/ui 2종 (2026-08-18, main@8a7701e)

같은 "가로 막대 + 드롭다운"인데 **콘텐츠를 어디에 그리는지**가 다릅니다:

| | `navigation-menu.tsx` | `menubar.tsx` |
|---|---|---|
| 프리미티브 | Radix NavigationMenu | Radix Menubar |
| 트리거 | 높이 36(`h-9`) · 패딩 16/8 · 14px medium · 셰브론 12px(열림 시 180° 회전, 300ms) | 패딩 8/4(`px-2 py-1`) · 14px medium |
| 컨테이너 | 막대 자체엔 배경 없음 (`max-w-max`) | **높이 36 보더 박스** (`h-9 rounded-md border p-1`) |
| 드롭다운 | **공유 뷰포트 1개** — 모든 메뉴가 한 패널에 그려지고 크기가 `--radix-navigation-menu-viewport-width/height`로 전환 | 메뉴마다 독립 팝업 (`min-w-[12rem]`, `sideOffset=8`) |
| 전환 | 메뉴 간 이동 시 **좌우 슬라이드**(`from-start/from-end` 52 × 4px) + 뷰포트 크기 애니메이션 | 팝업 표준 zoom 0.95 + 방향별 8px 슬라이드 |
| 링크 항목 | `p-2` + 세로 배치(`flex-col gap-1`) — 제목+설명 카드형 | 메뉴 항목 `px-2 py-1.5` + 체크/라디오/서브메뉴 지원 |
| 포커스링 | 트리거 3px(`ring-[3px]`) | 없음 (`focus:bg-accent` 배경만) |

- **navigation-menu의 핵심은 공유 뷰포트입니다** — 드롭다운이 메뉴별
  팝업이 아니라 화면에 1개뿐인 패널이고, 트리거를 옮기면 패널이 닫히지 않고
  **내용이 좌우로 슬라이드**되며 크기가 런타임 변수로 보간됩니다.
  `viewport={false}`로 끄면 메뉴별 독립 팝업(menubar 방식)으로 강등됩니다
- 모바일(<768px)에서는 콘텐츠가 `w-full` + 비절대 배치로 풀립니다
  (`md:absolute md:w-auto`) — 데스크톱 전용 패턴임이 소스에 드러납니다
- menubar는 데스크톱 앱 메뉴바 이식입니다 — 단축키 표기 슬롯
  (`MenubarShortcut`, `ml-auto text-xs tracking-widest`) ·
  체크박스/라디오 항목 · 중첩 서브메뉴까지, 항목 패딩은
  드롭다운 메뉴(`dropdown-menu`)와 동일 규격입니다

## 페이지네이션 — shadcn/ui `pagination.tsx` (2026-08-18)

**전용 스타일이 없는 컴포넌트입니다** — 버튼 변형을 조립합니다:

- 페이지 링크 = `buttonVariants({ variant: isActive ? "outline" : "ghost", size: "icon" })`
  — **현재 페이지만 outline, 나머지는 ghost**. 36×36 정사각
- 활성 표시는 `aria-current="page"` + `data-active` — 상태가 ARIA 속성 기반
- 이전/다음 = `size="default"` + 셰브론 16px, 라벨은 `hidden sm:block`
  (모바일에서 아이콘만)
- 생략(`…`) = 36×36 칸에 16px 아이콘, `aria-hidden` + `sr-only` "More pages"
- 컨테이너 `<nav aria-label="pagination">` + `<ul>` 시맨틱, 항목 간 `gap-1`(4px)

버튼 스케일과 규격이 완전히 일치하므로 별도 치수 축이 없습니다 —
`button.md`의 `icon`(36) 변형이 그대로 페이지 칸이 됩니다.

## 브레드크럼

**shadcn/ui만 확인됩니다.**

| 항목 | 값 |
|------|-----|
| 항목 간격 | **6px** (`gap-1.5`) → **10px** (`sm:gap-2.5`) |
| 글자 | 14 (`text-sm`) |
| 색 | `text-muted-foreground` |
| 구분 아이콘 | **14px** (`size-3.5`) |
| 링크 내부 간격 | 6px (`gap-1.5`) |
| 생략 표시(`…`) | **36×36** (`size-9`) |
| 줄바꿈 | `flex-wrap` + `break-words` |

**모바일에서 간격이 좁습니다** (6px → 10px). 표본에서 브레드크럼 간격을
뷰포트로 나눈 것은 이것뿐입니다.

**생략 표시가 36px 정사각형입니다** — 버튼 `default` 높이와 같습니다.
텍스트 항목(14px)보다 훨씬 크며, 터치 타겟을 확보한 형태입니다.

**`flex-wrap`이 있습니다** — 경로가 길면 줄바꿈됩니다.
`i18n/README.md`의 "말줄임에 의존하지 마세요"와 같은 방향입니다.

Cloudscape는 색 토큰만 있습니다 — `color-text-breadcrumb-current`(현재 위치) ·
`color-text-breadcrumb-icon`(구분자). **현재 위치를 별도 색으로 둡니다.**

## 상단 내비 — Cloudscape의 컨텍스트 오버라이드

`top-navigation` 컨텍스트가 **182개 토큰**을 덮어씁니다.

```
color-background-button-normal-default : { light: #ffffff, dark: #161d26 }
                                       → { light: #161d26, dark: #161d26 }
```

**`light` 값이 `dark` 값으로 덮어써집니다** — 라이트 모드에서도 상단 영역이
어두운 테마로 렌더됩니다. `header` 컨텍스트도 183개로 같은 방식입니다.

**컴포넌트마다 "다크 변형"을 만들지 않고 토큰 레이어에서 흡수합니다**
(`table.md`의 `compact-table`과 같은 구조).

`color-text-top-navigation-title`이 별도로 있어 제목만 예외 색을 갖습니다.

### `app-layout-toolbar` 컨텍스트

**차이가 1개뿐입니다** — `color-background-layout-main`이
`#ffffff` → `#fcfcfd` (라이트), `#161d26` → `#131920` (다크).

**메인 영역 배경을 미세하게 어둡게 합니다.** 툴바가 있을 때만 적용됩니다.

## 레이아웃 토글 버튼 — Cloudscape만 토큰이 있습니다

사이드바·패널을 여닫는 버튼입니다.

| 토큰 | light | dark |
|------|-----|-----|
| `color-background-layout-toggle-default` | `#424650` | `#424650` |
| `color-background-layout-toggle-hover` | `#656871` | `#656871` |
| `color-background-layout-toggle-selected-default` | `#006ce0` | `#42b4ff` |
| `color-text-layout-toggle` | `#ffffff` | `#ffffff` |

**기본·hover 색이 라이트/다크에서 같습니다.** 선택 상태만 갈립니다 —
**토글 버튼이 모드와 무관하게 어두운 회색입니다.**

## Mantine AppShell — 오프셋 변수 구조

| 변수 | 용도 |
|------|------|
| `--app-shell-header-offset` | 헤더 높이만큼 본문을 내림 |
| `--app-shell-navbar-offset` | 사이드바 폭만큼 본문을 밈 |
| `--app-shell-aside-offset` | 우측 패널 |
| `--app-shell-footer-offset` | 푸터 |
| `--app-shell-border-color` | light `gray-3` / dark `dark-4` |
| `--app-shell-transition-duration` | (전환 시간) |

**네 방향 오프셋을 변수로 두고 `0rem !important`로 끕니다.**
영역이 없으면 오프셋이 0이 되어 본문이 전체를 차지합니다.

**폭·높이 값이 소스에 없습니다** — prop으로 주입됩니다.
`table.md`의 `--table-vertical-spacing`과 같은 패턴 — **Mantine은 값을
사용하는 쪽에 넘깁니다.**

`--app-shell-transition-duration: 0ms !important`가 있습니다 —
어떤 조건에서 적용되는지 셀렉터를 확인하지 못했습니다.

## 플랫폼 축 — 차량과 모바일

| 플랫폼 | 제약 |
|--------|------|
| **CarPlay** | **Tab Bar 5개 이하** (API가 강제) |
| Android Automotive | 태스크 5화면 이하 |
| Apple iOS 상단 툴바 | 44pt |
| Apple iOS 하단 툴바 | **48pt** |

**CarPlay는 탭 개수가 API 제약입니다** — 6개를 넣을 수 없습니다
(`systems/carplay.md`). 웹 시스템에는 개수 제한 개념이 없습니다.

**Apple의 44 / 48pt는 툴바 안 버튼의 터치 타겟입니다.**
툴바 컨테이너 높이는 따로이며 값이 더 크게 갈립니다.

| 툴바 컨테이너 | 폭 | 기본 높이 | Large Title |
|------|:---:|:---:|:---:|
| Top — iPhone | 402 | **54** | 125 |
| Top — iPad | 820 | **54** | 131 |
| Top — Sheet | 402 | **70** | 136 |
| **Bottom — iPhone** | 402 | **84** | — |
| Bottom — iPad | 500 | **58** | — |

**iPhone 하단이 상단의 1.56배입니다** (84 vs 54). iPad는 58로 거의 같습니다.

**iPad 상단 툴바만 탭바 유무로 변형이 갈립니다** — `Tab Bar=True/False` 8종.
`Title 2 Line Left`가 탭바 있을 때 98, 없을 때 54로 **44pt 차이**가 납니다.

심볼 버튼 개수별 너비도 토큰화돼 있습니다 (`button.md`).

**페이지 컨트롤(점)도 개수별 심볼입니다** — 점 2~8개 × 선택 위치 조합으로
36개 변형이 있습니다. 점 하나는 8×8pt이고, 컨테이너 폭은
2점 72 · 3점 88 · 4점 104 · 5점 120 · 6점 136 · 7점 152 · 8점 이상 168pt입니다
(**16pt 등차**).

세그먼티드 컨트롤 버튼은 126 × 36pt이며 `Selected` True/False × Light/Dark 4종입니다.

## 판단 지침 — 문서 층 실측 (2026-08-18)

7개 시스템(M3 · Atlassian · Spectrum · Polaris · Carbon · Cloudscape ·
GOV.UK)의 내비 지침을 직접 읽었습니다.

### 사이드바 vs 상단 — "선택"이 아니라 "역할 분담"이 다수 입장

- **역할 분담 진영**: Atlassian(상단=액션·유틸리티 / 사이드=제품 구조) ·
  Cloudscape(side=IA / top=유틸리티·글로벌 검색 — **"계정·설정·로그아웃을
  side nav에 넣지 말 것, 사용자는 top에서 기대한다"**) · Carbon(Header가
  최상위, left panel은 보조 — **"보조 항목 5개 초과 또는 잦은 전환이면
  left panel"** 수치 기준)
- **브레이크포인트로 규정**: M3 — Compact=하단 bar, Medium=공간 우선순위로
  bar/rail 선택, Expanded↑=rail. **"데스크톱에 navigation bar 금지"** 명문.
  5개 초과 목적지면 모달 확장 rail
- **강제**: Polaris — admin에선 사이드바, 모바일에선 헤더 (선택권 없음)
- **내비 최소주의**: GOV.UK — 반복 사용·다중 작업·비선형일 때만 상단
  내비. **"선형 여정이면 내비 링크 자체를 쓰지 말고 task list"** —
  "먼저 여정을 단순화하라"
- Cloudscape의 3구성 기준표가 실무에 바로 쓰입니다: 계층+유틸리티=둘 다 /
  유틸리티 불필요=side+브레드크럼 / 원페이지=top만

### 계층 깊이 — 명시 상한은 2~3단계

| 상한 | 시스템 |
|------|--------|
| **3단계** | Spectrum ("초과 시 들여쓰기 구분 불가 — 중대한 사용성 문제") |
| **2단계** | Carbon ("left panel은 3단계를 지원하지 않는다 — 그 아래는 페이지 내 탭으로") |
| 수치 없음 | Atlassian("최소로 + 중첩 시 go back 필수") · M3(2단계↑면 drawer 권장) · Cloudscape("링크 2개짜리 섹션 금지" 등 구성 규칙만) · GOV.UK("내비는 사이트맵이 아니다") |

개수 제한은 따로 갑니다: M3 bar 3~5 · rail 3~7, Polaris 7개 초과 시
View more로 절단, Cloudscape 접이식은 10개 미만일 때.
shadcn/ui `SidebarMenuSub`가 1단계뿐인 것은 Carbon 상한과 정합합니다.

### 현재 위치 — 부모 강조를 규정한 곳은 GOV.UK뿐

- **GOV.UK가 유일하게 2상태를 규정**: `current`(지금 이 페이지) vs
  `active`(이 페이지 **그룹** 안 — 부모/섹션 강조). current 우선,
  구현은 `aria-current` + `<strong>`
- **M3는 정반대**: "항상 하나의 destination만 active" — 인디케이터 동시
  2개 금지가 Do/Don't로 명문화. 활성 아이콘은 filled 버전
- Cloudscape는 강조 대신 **확장**: 그룹 내 페이지로 이동하면 그룹이 자동으로
  펼쳐지고, 활성 항목만 볼드
- Atlassian·Spectrum·Carbon·Polaris: 부모 강조 규정 없음(확인함)

## 16표본 재종합 — 컴포넌트 실측 (2026-08-18)

내비 축에 신규 표본이 0건이던 문제를 풀기 위해, 사이드바·탭·브레드크럼을
실제로 배포하는 10개 시스템을 새로 읽었습니다
(Carbon `@carbon/styles@1.113.0` `ui-shell` · Vuetify `4.1.10` ·
Ant `antd@6.6.1` · Chakra `@chakra-ui/react@3.36.1` ·
PrimeVue `@primeuix/themes@3.0.0` · Semi `@semi-bot/semi-theme-default@1.0.0` ·
Naive UI `2.45.0` · EUI `@elastic/eui@119.0.0` ·
Blueprint `@blueprintjs/core@6.18.0` · Grommet `2.56.0`).
Cloudscape는 `@cloudscape-design/components@3.0.1348`로 미확인 값을 채웠습니다.

### 사이드바 펼침 폭 — 200~280px, 256이 최빈

```
280   Cloudscape         (AppLayout navigationWidth 기본값 — 기존 "미확인" 해소)
272   Naive UI           (LayoutSider width)
256   shadcn/ui · Carbon(mini-units(32)) · Vuetify   ← 3표본 일치
240   Semi
200   Ant Design         (Sider width)
없음  Grommet(Box 폭에 위임) · Mantine(prop 주입)
```

**256px에 서로 무관한 세 시스템이 모입니다.** 전체 폭은 200~280px 안에 다
들어오며, **80px 폭의 구간에 8표본이 갇혀 있습니다** — 확보한 내비 축 중
수렴이 가장 뚜렷한 값입니다.

### 접힘(레일) 폭 — 48~60px, 예외는 Ant 하나

```
48   shadcn/ui · Carbon(mini-units(6)) · Naive UI      ← 3표본 일치
52   Cloudscape (토큰) / 54 (AppLayout 기본값)
56   Vuetify (railWidth)
60   Semi
80   Ant Design (Menu collapsedWidth = controlHeightLG × 2)
```

**기존 판의 "접힘 폭은 48~52px"은 유지되되 상한이 늘어납니다** —
48~60px이 8표본 중 7개이고, **Ant의 80px만 크게 벗어납니다**
(아이콘 16px 기준 좌우 32px씩).

**Cloudscape는 토큰(52px)과 컴포넌트 기본값(54px)이 2px 다릅니다.**
어느 쪽이 실제 렌더 값인지 확인하지 못했습니다.

### 사이드바 항목 높이 — 28~42px

```
24    Cloudscape compact
28    shadcn/ui sm · Cloudscape comfortable
32    Carbon(mini-units(4)) · shadcn/ui default · Vuetify compact
36    Semi · Vuetify comfortable
40    Ant Design(controlHeightLG) · Vuetify default
42    Naive UI(itemHeight)
48    Carbon large · shadcn/ui lg · Vuetify 1줄 default
파생  PrimeVue (패딩 4/10px + 행간)
```

기존 판의 권고(28~32px, 기본 32)는 **밀집 콘솔 쪽 값**입니다.
16표본 전체로는 **32~40px에 더 많이 모입니다.** 밀도 축을 가진 시스템
(Cloudscape · Vuetify)은 24~32px까지 내려갑니다.

### 계층 들여쓰기 — 16 / 20 / 32의 세 진영

| 값 | 시스템 |
|:---:|--------|
| **16px** | **Vuetify**(`$list-indent-size`, 단계마다 누적) · **PrimeVue**(`panelmenu.submenu.indent`) |
| **20px** | **Cloudscape**(`space-l`) |
| **32px** | **Carbon**(`mini-units(4)`) · **Semi**(`item-indent`) · **Naive UI**(`indent`) |

- **Carbon은 아이콘이 있는 2단계에서 72px**(`mini-units(9)`)로 뜁니다 —
  아이콘 열 폭을 들여쓰기에 합산합니다.
- **Naive UI만 루트와 하위 들여쓰기가 다릅니다** (루트 24 / 하위 32px).
- Semi는 3단계 텍스트가 44px입니다.
- **32px 진영이 3표본으로 최다**인데, 이는 앞선 문서 층 종합의
  "계층 상한 2~3단계"와 정합합니다 — 32px씩 3단이면 96px로 사이드바 폭의
  3분의 1을 넘어갑니다.

### 활성 표시 — 밑줄이 다수, 두께는 2px가 압도적

| 두께 | 시스템 |
|:---:|--------|
| **1px** | **PrimeVue** (`activeBar.height` — 탭 리스트 하단 보더와 같은 두께라 색만 바뀜) |
| **2px** | **Vuetify · Carbon · Semi · EUI · Chakra · Radix Themes · shadcn/ui(line) · Grommet** |
| **3px** | **Blueprint**(탭) · **Carbon**(사이드 내비 좌측 세로 바) |
| 4px | EUI 고대비 모드 (2px × 2) |

**2px가 8표본으로 압도적입니다.** 양극단이 PrimeVue 1px과 Blueprint 3px입니다.

**표시 위치는 네 가지입니다:**

| 방식 | 시스템 |
|------|--------|
| 하단 밑줄 | PrimeVue · Vuetify · Carbon · Semi · EUI · Blueprint(가로) · Chakra(`line`) · shadcn/ui(`line`) · Grommet |
| 알약 배경 | shadcn/ui(`default`) · Chakra(`subtle`·`enclosed`) · Blueprint(**세로 탭**) · Vuetify(`inset`) |
| **좌측 세로 바** | **Carbon 사이드 내비** (3px `::before`) |
| 세로 우측선 | shadcn/ui 세로 탭 · Vuetify 세로 탭 (둘 다 2px) |

- **Blueprint는 가로 탭에서 밑줄, 세로 탭에서 알약**으로 **방향에 따라 방식을
  바꿉니다.** shadcn/ui·Vuetify는 방향이 바뀌어도 같은 방식(선)을 유지하고
  축만 돌립니다.
- **Chakra가 활성 표시 변형을 4종으로 가장 많이 둡니다**
  (`line` · `subtle` · `enclosed` · `outline`).

### 비활성 상태에도 같은 두께의 선을 두는 진영

**Carbon**(`$tab-underline-color: 2px solid $border-subtle`) ·
**Semi**(hover 2px `fill-0`, active 2px `fill-1`) ·
**PrimeVue**(리스트 하단 1px = 활성 바 1px)가
**활성 전이에서 선의 두께가 변하지 않게** 만듭니다.

기존 문서가 "활성 탭이 굵어지면 자간을 좁혀 폭 변화를 상쇄"(Radix Themes)를
다뤘는데, **선 두께 쪽에도 같은 문제와 같은 해법이 있습니다.**

### 탭 높이 — 32~48px, 36·40이 최빈

```
30      Blueprint (행간으로 만듦)
32/40   Radix Themes(--space-6/7) · EUI(line-height xl/xxl) · Ant card SM/기본
36      shadcn/ui · Chakra sm · Vuetify compact
40      Chakra md(기본) · Ant card 기본 · EUI m
44/48   Chakra lg 44 · Vuetify default 48 · Ant card LG 48
사다리  Carbon (layout.size 24~80 상속)
파생    Semi(16/4/14 패딩) · PrimeVue(14/16 패딩) · Naive UI(6/10/14 패딩)
```

**Carbon은 탭이 자체 높이를 갖지 않고 `layout.use('size', …)`로 문맥에서
상속합니다** — 표와 같은 기구입니다.

**Semi는 탭 상하 패딩이 비대칭입니다** (위 16 / 아래 14) — 아래 2px을
활성 밑줄이 차지하므로 시각 중심을 맞춘 보정입니다. 확보 표본에서
이 보정을 한 유일 사례입니다.

### 탭 간 간격 — 20~36px

```
20   Blueprint (column-gap)
24   Semi
32   Ant Design (horizontalItemGutter)
36   Naive UI (tabGap*Line / *Bar / *Card 전부 동일)
 4   Naive UI card 변형만
```

카드형 탭은 간격이 4px로 급감합니다 (Naive UI) — 탭이 붙은 카드가 되기 때문입니다.

### 인디케이터 이동 — 슬라이드를 구현한 3표본

| 시스템 | 지속시간 | 방식 |
|--------|:---:|------|
| **Radix Themes** 세그먼티드 | **100ms** | `transform` 슬라이드 (불투명도는 80ms) |
| **Blueprint** 탭 | **200ms** | 별도 래퍼(`.bp6-tab-indicator-wrapper`)를 `transform`으로 이동, `height·width` 동시 보간 |
| Chakra | 미확인 | `--tabs-indicator-bg` · `-shadow`(`shadows.xs`) 토큰만 확인 |

**Blueprint는 `.bp6-no-animation` 클래스로 슬라이드를 끌 수 있습니다** —
초기 렌더에서 인디케이터가 날아오지 않게 하는 자리입니다.

### 브레드크럼 — 간격 4~10px, 굵기는 갈립니다

```
 4   EUI(size.xs) · Semi
 6→10 shadcn/ui (모바일 → 데스크톱)
 8   Carbon(spacing-03) · Ant(marginXS) · PrimeVue · Vuetify(구분자 0 8px)
```

- **Blueprint만 브레드크럼 서체가 본문(14px)보다 큰 16px**이고
  컨테이너 높이가 30px입니다.
- **Naive UI는 현재 위치를 굵게 하지 않습니다** (`fontWeightActive: 400`) —
  색으로만 구분합니다. Cloudscape가 `color-text-breadcrumb-current`를 별도
  토큰으로 두는 것과 같은 방향입니다.
- **Vuetify 브레드크럼에 밀도 3단(`0/-1/-2`)이 있습니다** — 확보 표본에서
  브레드크럼에 밀도 축을 둔 유일 사례입니다.

### 상단 영역을 어둡게 고정하는 두 가지 구현

| 방식 | 시스템 |
|------|--------|
| **토큰 컨텍스트 오버라이드** | **Cloudscape** — `top-navigation` 컨텍스트가 182개 토큰의 `light` 값을 `dark` 값으로 덮어씀 |
| **컴포넌트 토큰에 색 리터럴** | **Ant Design** — `siderBg: '#001529'` · `triggerBg: '#002140'` · `headerBg: '#001529'` (시드·알리아스를 거치지 않음) |

**같은 목적, 정반대 구현입니다.** Ant은 라이트 테마에서도 사이더가 어둡고,
흰 사이더를 쓰려면 별도 `lightSiderBg` 토큰으로 갈아끼워야 합니다.

### z-index 토큰화 — 8개 시스템으로 늘었습니다

> **정정 — "z-index를 토큰화하는 것은 7개 시스템"은 갱신됩니다.**
> **EUI**가 `global_styling/variables/levels.js`에 용도명 9단을 배포합니다:
>
> ```
> toast 9000 · modal 8000 · mask 6000 · navigation 6000
> menu 2000 · header 1000 · flyout 1000 · maskBelowHeader 1000 · content 0
> ```
>
> **`toast`가 `modal`보다 위**이고, `navigation`이 `mask`와 같은 6000입니다.
> `maskBelowHeader`(1000)를 따로 둬서 **헤더를 덮지 않는 마스크**를
> 별도 층위로 표현합니다. 기존 7개(Chakra · Bootstrap · Open Props ·
> Forma 36 · Vibes · Solid · Pluralsight)에 이어 **8번째 산법**이며,
> 층위 순서가 시스템 간에 여전히 모순되어 교차 권고값은 없습니다.

### 그 밖의 단일 관측

- **Grommet은 사이드바 폭 값이 없습니다** — 확보한 내비 표본 중 유일합니다
  (`gap: 'large'` 48px · `pad: 'small'` 12px만 있고 폭은 `Box`에 위임).
  탭 hover 색만 `{dark: 'white', light: 'black'}`으로 모드별 명시.
- **Carbon 사이드 내비 활성 표시가 좌측 3px 세로 바**입니다 —
  밑줄·알약·배경이 아닌 네 번째 방식입니다.
- **Semi 사이드바 접힘 폭 60px은 로고 36px 정사각에서 역산**된 값입니다.
- **PrimeVue는 내비 항목 전환을 `0s`로 끕니다**
  (`navigation.item.transitionDuration`) — 표와 같은 태도입니다.
- **Ant 탭 카드 패딩이 높이에서 역산됩니다** —
  `(cardHeight − fontHeight) / 2 − lineWidth`. 값이 아니라 식으로 배포됩니다.
- **Blueprint navbar 50px**은 이 시스템의 10px 그리드 잔재입니다
  (`systems/blueprint.md`).

## 아직 못 채운 것

- ~~사이드바 vs 상단 선택 기준 / 계층 깊이 제한 / 현재 위치 표시~~ →
  **해소 (2026-08-18)** — 위 "판단 지침" 절
- ~~Cloudscape 사이드바 펼침 폭~~ → **해소 (2026-08-18)** —
  `AppLayout` `navigationWidth` 기본값 **280px**(도구 패널 290px).
  접힘 폭은 토큰 52px / 컴포넌트 기본값 54px로 **2px 어긋납니다** — 현행 미확인
- **Mantine AppShell 기본 폭·높이** — prop 기본값을 확인하지 못했습니다
- ~~Radix Themes `tab-nav` 컴포넌트~~ → **해소 (2026-08-18)** — 전체 5줄,
  시각 규격은 tabs와 100% 공유(`base-tab-list.css`), 차이는 역할(링크 vs 패널)뿐.
  위 "`tab-nav.css` — 차이는 콘텐츠 패널뿐" 절
- ~~shadcn/ui `navigation-menu`~~ → **해소 (2026-08-18)** — 공유 뷰포트 1개 +
  메뉴 간 슬라이드 전환 구조. 위 "드롭다운형 상단 내비" 절
- ~~`menubar`~~ → **해소 (2026-08-18)** — 같은 절 (메뉴별 독립 팝업,
  데스크톱 앱 메뉴바 이식)
- **모바일 하단 탭바** — 16표본 어디에도 웹용 하단 탭바 컴포넌트가 없습니다.
  Apple 하단 툴바 48pt가 유일한 근거입니다 (Vuetify에 `VBottomNavigation`
  컴포넌트가 있으나 치수를 읽지 못했습니다)
- **Chakra·PrimeVue·Grommet의 탭 간 간격** — 확인하지 못했습니다
- **Ant 사이드 메뉴 계층 들여쓰기** — 항목 높이(40px)·접힘 폭(80px)은 확인했으나
  들여쓰기 값을 읽지 못했습니다
- **z-index 스케일** — 초기 "어느 시스템도 토큰화하지 않는다"는 **틀렸습니다**.
  Chakra(용도명 13단계, `dropdown` 1000~`tooltip` 1800 100 등차) · Bootstrap ·
  Open Props · Forma 36 · Vibes(freee) · Solid(BuzzFeed) · Pluralsight(`layers`, 영역 이름) ·
  **EUI**(`levels.js` 용도명 9단, `toast` 9000 > `modal` 8000)가
  토큰화합니다 — **8개 시스템이 8가지 산법**. **건너뛰기 링크 전용 층위 1600은
  Chakra `skipNav`와 Pluralsight `skip-to-content-banner`가 같은 값**입니다.
  단 층위 순서는 시스템 간 모순이라 교차 권고값은 없습니다 (`systems/chakra-ui.md` · `systems/eui.md`)

## 구현 시 기본값

**사이드바 폭**

```
펼침    256px  (16rem)
접힘     48px  (아이콘만) + 좌우 패딩 16px = 64px 컨테이너
모바일  288px  (시트로 열림)
```

**16표본에서 펼침 폭은 200~280px에 전부 들어오고, 256px에 3표본
(shadcn/ui · Carbon · Vuetify)이 일치합니다** (2026-08-18 갱신).

**접힘 폭은 48~60px입니다** (2026-08-18 상한 갱신). 48이 3표본
(shadcn/ui · Carbon · Naive UI)으로 최빈이고, **Ant의 80px만 크게
벗어납니다.** 아이콘 16~24px + 좌우 패딩으로 결정됩니다.

**모바일 폭을 데스크톱보다 넓게 두세요.** 화면을 덮는 시트가 되므로
좁힐 이유가 없습니다.

**항목 높이**

```
밀집 콘솔    28~32px
일반         32~40px  (기본 36)
```

**16표본에서는 32~40px에 더 많이 모입니다** (2026-08-18 갱신) —
Carbon 32 · Semi 36 · Vuetify 40 · Ant 40 · Naive UI 42.
28px은 Cloudscape·shadcn/ui `sm`의 밀집 콘솔 값이고,
밀도 축이 있으면 24px까지 내려갑니다 (Cloudscape compact).

**접힘 상태에서 항목을 정사각형으로 만드세요** — 폭과 높이를 같게 두면
아이콘이 중앙에 옵니다.

**상태를 쿠키에 저장하세요.** `localStorage`는 서버 렌더링에서 읽을 수 없어
첫 프레임이 잘못된 상태로 그려집니다. shadcn/ui가 7일 수명 쿠키를 씁니다.

**키보드 단축키를 붙일 거면 `Cmd/Ctrl+B`가 표본의 유일한 선례입니다.**

**계층 들여쓰기 — 단계당 16~32px** (2026-08-18 추가).

```
좁게    16px  (Vuetify · PrimeVue)
중간    20px  (Cloudscape)
넓게    32px  (Carbon · Semi · Naive UI)
```

**32px씩 3단이면 96px로 사이드바 폭의 3분의 1을 넘습니다** —
앞서 문서 층에서 확인한 "계층 상한 2~3단계"(Spectrum 3 · Carbon 2)와
숫자가 맞아떨어집니다. 3단 이상을 지원할 계획이면 16~20px 쪽을 고르세요.

**탭**

```
리스트 높이   36~40px
항목 패딩     좌우 8~16 / 상하 4~8
글자          14px / 굵기 500~600
활성 표시     밑줄 2px  또는  알약 배경 + 그림자
```

**밑줄 두께는 2px에서 확실히 수렴합니다** — 16표본 중 8개가 2px입니다
(양극단은 PrimeVue 1px · Blueprint 3px). 고민할 값이 아닙니다.

**활성 표시를 두 방식 중 하나로 고르세요.** shadcn/ui가 한 컴포넌트에
`default`(알약)와 `line`(밑줄)을 둡니다 — **섞지 마세요.**

**활성 탭이 굵어지면 자간을 좁히는 것을 검토하세요** (Radix Themes -0.01em).
굵기 변경만으로 탭 폭이 달라져 옆 탭이 밀립니다.

**대안은 활성/비활성 굵기를 같게 두는 것입니다** — Cloudscape가
`font-weight-tabs`와 `font-weight-tabs-disabled`를 둘 다 700으로 둡니다.

**같은 문제가 선 두께에도 있습니다. 비활성 탭에도 같은 두께의 선을 두세요**
(2026-08-18 추가) — Carbon(`$tab-underline-color: 2px solid $border-subtle`) ·
Semi(hover·active도 2px) · PrimeVue(리스트 보더 1px = 활성 바 1px)가
**색만 바뀌고 두께는 안 바뀌게** 만듭니다. 활성에서만 선을 그리면
탭 높이가 2px 흔들립니다.

**활성 표시가 여러 방향(가로/세로)을 지원해야 하면 방식을 통일할지 정하세요.**
Blueprint는 가로 탭에서 밑줄, 세로 탭에서 알약으로 **방식 자체를 바꿉니다.**
shadcn/ui·Vuetify는 같은 선을 축만 돌립니다 — 후자가 예측 가능합니다.

**세로 탭을 지원할 거면 표시선의 방향도 바꿔야 합니다** —
가로에서 밑줄(높이 2px), 세로에서 오른쪽 세로선(폭 2px)입니다.

**세그먼티드 컨트롤은 인디케이터를 슬라이드시키세요** (100ms `transform`).
불투명도는 그보다 짧게(80ms) 두면 이동이 더 분명해집니다.

**브레드크럼**

```
항목 간격     6px → 10px (모바일 → 데스크톱)
구분 아이콘   14px
생략 표시     36×36 (터치 타겟)
줄바꿈        허용 (flex-wrap)
```

**현재 위치를 별도 색으로 두세요** (Cloudscape `color-text-breadcrumb-current`).
링크와 현재 위치가 같은 색이면 클릭 가능 여부가 구분되지 않습니다.

**말줄임에 의존하지 말고 줄바꿈을 허용하세요** —
다국어에서 경로 길이가 크게 변합니다 (`i18n/README.md`).

**상단 내비를 다크로 고정할 거면 토큰 레이어에서 처리하세요.**
Cloudscape가 `top-navigation` 컨텍스트로 182개 토큰의 `light` 값을
`dark` 값으로 덮어씁니다 — **컴포넌트마다 다크 변형을 만드는 것보다 누락이 없습니다.**

**레이아웃 오프셋을 변수로 두세요** (Mantine `--app-shell-*-offset` 4방향).
헤더·사이드바·푸터가 없을 때 0으로 만들면 본문이 자동으로 채웁니다.

**차량·모바일을 지원하면 개수 제한을 먼저 확인하세요.**
CarPlay는 탭 5개가 API 제약입니다 — 디자인 단계에서 정해야 합니다.
