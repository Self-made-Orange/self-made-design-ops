<!-- lang-links -->
> [English](modal.md) · **한국어**
<!-- /lang-links -->

# Modal / Dialog

**모달 실측이 확보된 시스템은 79개입니다** (2026-08-18 재종합).
개별 값은 각 `systems/*.md`의 "컴포넌트 심화" 절에 있고, 이 문서는 **분포와 교차 결론**만 담습니다.
아래 표들은 초기 표본 6개(shadcn/ui · Radix Themes · Mantine · Atlassian(모션) ·
Cloudscape(색·라운드) · Apple(시트 라운드))로 작성된 것이며, 79표본 기준 재검증은
"79표본 재종합" 절에 있습니다 — **둘이 어긋나면 재종합 절이 우선입니다.**

> 세 프레임워크는 컴포넌트 CSS·소스에서 값을 읽었습니다.
> **"배경 클릭으로 닫히는가" 같은 동작 규정은 여전히 문서 사이트에만 있습니다** —
> 프리미티브(Radix Primitives)의 기본값이지 디자인시스템의 결정으로 확인되지 않았습니다.
>
> **모달은 코퍼스에서 유일하게 79개 전부가 입장을 가진 축입니다** —
> 값이 있거나(76개), 컴포넌트 자체를 배포하지 않음을 확인했거나(NHS · WMN),
> 값 없이 동작·타이밍 훅만 배포합니다(ark-ui).

## 너비 — 단계 수가 갈립니다

| 시스템 | 단계 | 값 | 기본값 |
|--------|:---:|-----|:---:|
| **Mantine** | **5** | 320 · 380 · **440** · 620 · 780px | **440 (`md`)** |
| **shadcn/ui** | **1** | **512px** (`sm:max-w-lg`) | 512 |
| Radix Themes | 미확인 | 컴포넌트 CSS에 없음 (`max-width`를 노출하지 않음) | — |
| **Carbon** | 크기×브레이크포인트 | **48% / 60% / 84% 뷰포트 비율** | — |
| **Cloudscape** | **5** | **320 · 600 · 820 · 1024 · 1280px** (+ `--awsui-modal-custom-width`) | — |

**Carbon만 px이 아니라 뷰포트 %입니다** (`@carbon/styles` 실측, 2026-08-17) —
모달 폭이 화면과 함께 자랍니다. px 고정 진영(Mantine·shadcn)과
비율 진영이 갈리는 새 축입니다.

**Cloudscape가 px 5단계 진영의 두 번째 표본**입니다 (2026-08-17) —
Mantine(320~780)보다 위가 훨씬 넓은 320~1280px 범위이고, 모바일에서는
`100vw − 24px`로 전환하며, **커스텀 폭 CSS 변수 훅**을 따로 뚫어놨습니다 —
콘솔 제품의 데이터 밀집 모달(위저드·테이블 포함) 전제입니다.

**Mantine과 shadcn/ui가 크게 다릅니다.** Mantine 기본값 440px은
shadcn/ui(512px)보다 72px 좁고, Mantine의 `lg`(620)·`xl`(780)이 512를 넘습니다.

| Mantine | 값 | shadcn/ui 대비 |
|---------|:---:|:---:|
| `xs` | 320 | -192 |
| `sm` | 380 | -132 |
| **`md`** | **440** | **-72** |
| `lg` | 620 | +108 |
| `xl` | 780 | +268 |

**shadcn/ui의 512px은 Mantine `md`와 `lg` 사이에 있습니다.**

증분: 320 → 380 → 440 → 620 → 780. **+60 / +60 / +180 / +160**으로
`md`~`lg` 사이가 크게 벌어집니다 — 폼 모달(≤440)과 콘텐츠 모달(≥620)이 갈리는 지점입니다.

## 패딩 — 크기에 연동하는지가 갈립니다

| 시스템 | 값 |
|--------|-----|
| **shadcn/ui** | **24px 고정** (`p-6`) |
| **Radix Themes** | **12 / 16 / 24 / 32px** (size 1~4, `--space-3`~`6`) |
| Mantine | `--mb-padding` 기본 `--mantine-spacing-md`(16px) — `ModalBase.css`에서 확보 |

### Radix Themes — 패딩과 라운드가 함께 커집니다

| size | 패딩 | 라운드 |
|:---:|:---:|:---:|
| 1 | `--space-3` (12) | `--radius-4` (8) |
| 2 | `--space-4` (16) | `--radius-4` (8) |
| 3 | `--space-5` (24) | `--radius-5` (12) |
| 4 | `--space-6` (32) | `--radius-5` (12) |

**라운드는 2단계씩 묶여 있습니다** — size 1·2가 8px, 3·4가 12px입니다.
패딩은 4단계 전부 다릅니다.

**패딩이 스페이싱 토큰을 그대로 참조합니다.** 버튼 높이가 `--space-5`~`8`인 것과
같은 방식입니다 (`form.md`) — **Radix Themes는 컴포넌트 치수를 전부 스페이싱에서 파생시킵니다.**

**shadcn/ui의 24px은 Radix Themes size 3과 같습니다.**

## 라운드

| 시스템 | 값 |
|--------|-----|
| shadcn/ui | **10px** (`rounded-lg` = `--radius`) |
| Radix Themes | 8 / 8 / 12 / 12px (size별) |
| Mantine | `--mantine-radius-default` (8px), 전체화면이면 **0** |
| Cloudscape | `border-radius-popover` 8px (모달 전용 토큰은 미확인) |
| **Apple (시트)** | **상단 34px / 하단 58px** |

**웹 시스템은 8~12px에 몰려 있습니다.**

**Apple 시트는 자릿수가 다릅니다.** iPhone 시트 상단 34px, 하단 58px —
웹 모달(8~12px)의 3~7배입니다. **하단이 상단의 1.7배로 비대칭**입니다
(`systems/apple-hig.md`).

**Mantine만 전체화면 모드에서 라운드를 강제로 0으로 만듭니다.**

```css
[data-full-screen] { --modal-border-radius: 0 !important; }
```

`!important`가 붙어 있습니다 — 사용자가 `radius` prop을 줘도 무시됩니다.

## 화면 여백 — 모바일 처리가 갈립니다

| 시스템 | 방식 |
|--------|------|
| **shadcn/ui** | `max-w-[calc(100%-2rem)]` → `sm:max-w-lg` |
| **Radix Themes** | 스크롤 컨테이너에 패딩 (`--space-6` 상 / `max(--space-6, 6vh)` 하 / `--space-4` 좌우) |
| **Mantine** | **`5dvh` / `5vw` 오프셋** |

### shadcn/ui — 브레이크포인트로 전환합니다

```
w-full max-w-[calc(100%-2rem)] sm:max-w-lg
```

| 뷰포트 | 너비 |
|--------|------|
| < 640px | `100% - 32px` (좌우 16px씩 여백) |
| ≥ 640px | **512px 고정** |

**640px 미만에서는 화면 폭에 따라 늘어나고, 그 이상에서는 고정됩니다.**

### Mantine — 뷰포트 단위 오프셋

```css
--modal-y-offset: 5dvh;
--modal-x-offset: 5vw;
max-height: calc(100dvh - var(--modal-y-offset) * 2);
```

**`dvh`(dynamic viewport height)를 씁니다** — 모바일 브라우저의 주소창이
숨었다 나타날 때 높이가 따라옵니다. `vh`는 그렇지 않습니다.

**표본에서 `dvh`를 쓰는 것은 Mantine뿐입니다.**

전체화면 모드에서는 오프셋이 0, 높이가 `100dvh`가 됩니다.

### Radix Themes — 스크롤 컨테이너가 별도 층입니다

```
BaseDialogOverlay          position: fixed; inset: 0
  BaseDialogScroll         overflow: auto; position: absolute; inset: 0
    BaseDialogScrollPadding  padding-top: space-6
                             padding-bottom: max(space-6, 6vh)
                             padding-left/right: space-4
      BaseDialogContent      margin: auto; overflow: auto
```

**4층 구조입니다.** 오버레이 / 스크롤 영역 / 스크롤 패딩 / 콘텐츠.

**하단 패딩이 `max(var(--space-6), 6vh)`입니다** — 32px 또는 뷰포트 높이의 6% 중 큰 값.
큰 화면에서 모달이 하단에 너무 붙지 않게 합니다.

**콘텐츠 자체도 `overflow: auto`입니다** — 스크롤이 두 층에서 가능합니다.
모달이 화면보다 길면 바깥 스크롤, 콘텐츠가 모달보다 길면 안쪽 스크롤입니다.

정렬은 `--modal`이 아니라 클래스로 갈립니다 —
`rt-r-align-start`(`margin-top: 0`) / `rt-r-align-center`(`margin-top: auto`).
**`@breakpoints`로 감싸져 있어 뷰포트별로 정렬을 바꿀 수 있습니다.**

## 오버레이(배경)

| 시스템 | 토큰 |
|--------|------|
| Radix Themes | `--color-overlay` |
| Atlassian | `color.blanket` **3개** + `motion.blanket.enter/exit` |
| shadcn/ui (Drawer) | **`bg-black/10` + `backdrop-blur-xs`** — 검정 10%에 블러 보강 |
| Mantine | `Overlay.css` 별도 컴포넌트 |

**Atlassian만 오버레이를 독립 개념으로 토큰화합니다** —
`color.blanket` 3개(기본·선택·위험 등)와 모션 토큰 2개가 있습니다.

shadcn/ui Drawer(v4 스타일 CSS)는 **어둡기 대신 블러**를 씁니다 —
검정 10%는 표본에서 가장 옅은 오버레이인데, `backdrop-blur`로 배경 분리를
보강합니다 (`supports-backdrop-filter:` 가드 포함 — 미지원 브라우저는 10%만 남음).

Radix Themes는 `::before` 의사 요소에 배경을 깔고 **오버레이 자체는 투명**하게 둡니다.

```css
.rt-BaseDialogOverlay::before {
  position: fixed; inset: 0;
  background-color: var(--color-overlay);
}
```

**의사 요소를 쓰는 이유가 애니메이션 분리입니다** — 오버레이 요소는 마운트 상태만
관리하고, 배경 페이드는 `::before`가 담당합니다 (아래 참조).

## 그림자

| 시스템 | 값 |
|--------|-----|
| **Radix Themes** | **`--shadow-6`** (6단계 중 최대) |
| shadcn/ui | `shadow-lg` (Tailwind 9단계 중 7번째) |
| Atlassian | `elevation.shadow.overlay` |

**둘 다 최대치에 가까운 단계를 씁니다.** 모달이 그림자 스케일의 상단을 소비합니다.

## 애니메이션

### 지속시간 — 진입이 길고 퇴장이 짧습니다

| 시스템 | 진입 | 퇴장 | 차이 |
|--------|:---:|:---:|:---:|
| **Radix Themes** (콘텐츠) | **200ms** | **100ms** | **-100** |
| Radix Themes (오버레이) | 200ms | 160ms | -40 |
| **Atlassian** | **250ms** | **200ms** | **-50** |
| **shadcn/ui** | **200ms** | 200ms | **0** |

**shadcn/ui만 진입·퇴장이 같습니다** (`duration-200`을 양쪽에 적용).

**Radix Themes는 콘텐츠와 오버레이의 퇴장 시간이 다릅니다** — 콘텐츠 100ms,
오버레이 160ms. **콘텐츠가 먼저 사라지고 배경이 뒤따릅니다.**

Atlassian은 `motion.modal.enter/exit`가 250/200ms이고 `blanket`(오버레이)도 250/200ms로
**같습니다** — 두 요소가 동시에 움직입니다.

| | 콘텐츠 퇴장 | 오버레이 퇴장 | 순서 |
|---|:---:|:---:|---|
| **Radix Themes** | 100ms | 160ms | **콘텐츠 먼저** |
| Atlassian | 200ms | 200ms | 동시 |

### 키프레임 — 스케일과 이동량

| 시스템 | 진입 | 퇴장 |
|--------|------|------|
| **Radix Themes** | `translateY(5px)` + `scale(0.97)` → 0/1 | 0/1 → `translateY(5px)` + **`scale(0.99)`** |
| **shadcn/ui** | `fade-in-0` + `zoom-in-95` | `fade-out-0` + `zoom-out-95` |
| **Atlassian** | `ScaleIn95to100` (**이동 없음**) | `ScaleOut100to95` |

**Radix Themes의 진입과 퇴장 스케일이 비대칭입니다** — 0.97에서 들어오고 **0.99로 나갑니다.**
퇴장 시 크기 변화가 진입의 3분의 1입니다.

**Atlassian은 이동이 없습니다.** 스케일만 95%→100%입니다.
`popup`에는 `SlideIn*8px`이 있는데 `modal`에는 없습니다 — **화면 중앙 요소는 움직이지 않습니다.**

**shadcn/ui와 Atlassian이 스케일 95%로 일치합니다.** Radix Themes만 97%입니다.

| 시스템 | 진입 스케일 | 이동 |
|--------|:---:|:---:|
| Atlassian | 0.95 | 없음 |
| shadcn/ui | 0.95 | 없음 |
| **Radix Themes** | **0.97** | **5px** |

### 이징

| 시스템 | 값 |
|--------|-----|
| **Radix Themes** | **`cubic-bezier(0.16, 1, 0.3, 1)`** (전 구간 동일) |
| Atlassian (진입) | `cubic-bezier(0.4, 0, 0, 1)` (`inout.bold`) |
| Atlassian (퇴장) | `cubic-bezier(0.6, 0, 0.8, 0.6)` (`in.practical`) |
| shadcn/ui | 미명시 (Tailwind 기본 `cubic-bezier(0.4, 0, 0.2, 1)`) |

**Radix Themes는 진입·퇴장·오버레이 전부 같은 이징을 씁니다.**
`cubic-bezier(0.16, 1, 0.3, 1)`는 y1=1로 시작 직후 급격히 감속하는 곡선입니다.

**Atlassian은 방향별로 나눕니다** — 진입 `inout.bold`, 퇴장 `in.practical`.
모달은 `bold` 계열을 쓰는 큰 영역 컴포넌트입니다 (`motion.md`).

### Mantine ModalBase — 헤더가 sticky이고 스크롤바 폭을 보정합니다

`ModalBase.css` 실측:

| 요소 | 값 |
|------|-----|
| 헤더 | **`position: sticky; top: 0`**, `min-height: 60px`, `z-index: 1000` |
| 패딩 | `--mb-padding` 기본 `--mantine-spacing-md`(16px) |
| 그림자 | `--mantine-shadow-xl` |
| 본문 | 헤더가 있으면 `padding-top: 0` (`:not(:only-child)`) |

두 가지 실무 대응이 소스에 박혀 있습니다:

- **모달 본문이 스크롤될 때 제목이 따라 고정**됩니다 — 헤더 sticky는
  6표본 중 Mantine만 확인됩니다.
- **스크롤바 폭 보정**: `:has([data-mantine-scrollbar])`로 커스텀 스크롤바
  등장을 감지해 헤더 우측 패딩을 5px(0.3125rem) 늘리고, 그 변화에
  `transition: padding-inline-end 100ms`를 겁니다 — 스크롤바가 나타나는
  순간의 레이아웃 점프를 애니메이션으로 흡수합니다.

### 접근성 — Radix Themes만 애니메이션 전체를 감쌉니다

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes rt-dialog-content-show { … }
  .rt-BaseDialogContent[data-state='open'] { animation: … }
}
```

**애니메이션 정의 자체가 미디어 쿼리 안에 있습니다.**
`prefers-reduced-motion: reduce`인 사용자에게는 키프레임이 존재하지 않습니다.

| 시스템 | 접근성 처리 |
|--------|-------------|
| **Radix Themes** | **애니메이션 블록 전체를 `no-preference`로 감쌈** |
| Cloudscape | 지속시간 토큰에 `disabled: 0ms` (`motion.md`) |
| shadcn/ui · Atlassian · Mantine | 모달에서 미확인 |

**두 방식의 차이:** Radix Themes는 애니메이션을 없애고,
Cloudscape는 0ms로 실행합니다. 후자는 `animationend` 이벤트가 여전히 발생합니다.

### `no-op` 키프레임 — 언마운트 타이밍 트릭

```css
@keyframes rt-dialog-overlay-no-op { from { opacity: 1 } to { opacity: 1 } }

.rt-BaseDialogOverlay[data-state='closed'] {
  animation: rt-dialog-overlay-no-op 160ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

**아무것도 바꾸지 않는 애니메이션입니다.** 주석에 이유가 적혀 있습니다 —
*"Keep the overlay mounted until the children have animated"*.

오버레이 요소가 160ms 동안 애니메이션 중인 것으로 취급되어 DOM에서 제거되지 않고,
그 사이 자식(콘텐츠 100ms, `::before` 160ms)이 퇴장을 마칩니다.

**표본에서 이런 트릭이 소스에 있는 것은 Radix Themes뿐입니다.**
`Dialog.Overlay`를 애니메이션 대상으로 두지 않고 `::before`에 배경을 넘긴 이유가 이것입니다.

## Apple 시트 — 드래그 핸들과 툴바

iOS 26 킷의 Toolbars 페이지(`507:25993`)에서 실측한 값입니다.

| 요소 | 크기 |
|------|:---:|
| **Grabber (드래그 핸들)** | **36 × 5** |
| 시트 툴바 — 기본 | 402 × **70** |
| 시트 툴바 — Large Title | 402 × **136** |

**핸들이 36×5pt입니다.** Light/Dark 각각 별도 심볼이며 크기는 같습니다.

**시트 툴바가 일반 툴바보다 높습니다.**

| 툴바 | 폭 | 기본 | Large Title |
|------|:---:|:---:|:---:|
| Top — iPhone | 402 | 54 | 125 |
| Top — iPad | 820 | 54 | 131 |
| **Top — Sheet** | 402 | **70** | **136** |
| Bottom — iPhone | 402 | **84** | — |
| Bottom — iPad | 500 | 58 | — |

**시트 상단 툴바가 iPhone 상단(54)보다 16pt 높습니다** — 핸들 자리입니다.

**Large Title이 세 컨테이너에서 125 / 131 / 136으로 다 다릅니다.**
같은 스타일 이름인데 컨테이너마다 높이가 갈립니다.

**하단 툴바가 상단의 1.56배입니다** (84 vs 54, iPhone).
iPad는 하단 58로 상단(54)과 거의 같습니다 — **iPhone만 하단이 크게 높습니다.**

시트 툴바 버튼은 `Preferred` / `Default` 두 상태이며 44×44입니다 —
일반 툴바의 `Selected`/`Tinted`와 이름이 다릅니다 (`button.md`).

### Detent — 시스템 정의 2단 + 커스텀 (HIG sheets DocC JSON, 2026-08-18)

- 시스템 정의 detent는 **`large`(전체 높이)와 `medium`(전체의 약 절반) 둘**입니다.
  정확한 pt 값이 아니라 비율 서술이며, **커스텀 detent를 추가할 수 있습니다.**
- `large`는 자동 지원. `medium`을 추가하면 두 높이에 머물고,
  **`medium`만 지정하면 전체 확장이 막힙니다.**
- HIG의 medium 용도 규정: **점진적 노출(progressive disclosure)** —
  공유 시트처럼 절반에서 시작해 스크롤·그래버 드래그로 확장.
- 리사이즈 트리거는 **콘텐츠 스크롤 또는 그래버 드래그** 두 가지입니다.
- 모달리티가 플랫폼 축입니다: **macOS·tvOS·visionOS·watchOS 시트는 항상 모달**,
  iOS·iPadOS만 논모달 시트 허용 (Notes의 서식 시트가 공식 예시).
- 배경 처리: iPadOS page/form 시트·macOS 부모 창·visionOS 부모 윈도우 전부
  **dim(어둡게)만 규정**합니다. watchOS는 반투명 + 블러·채도 감소 머티리얼.
  **구 iOS의 부모 뷰 축소(스케일백) 효과는 현행 HIG 본문에 없습니다** —
  "배경 축소 효과" 질문의 답은 "현행 규정 아님"입니다.

## 닫기 버튼

**shadcn/ui만 값이 확인됩니다.**

| 항목 | 값 |
|------|:---:|
| 위치 | 우상단 `top-4 right-4` (16 / 16) |
| 아이콘 | 16 (`size-4`) |
| 라운드 | `rounded-xs` (2px) |
| 기본 불투명도 | **0.7** |
| hover 불투명도 | 1 |
| 포커스링 | **`ring-2` + `ring-offset-2`** |

**포커스링이 다른 컨트롤과 다릅니다.** shadcn/ui의 나머지 컴포넌트는
`ring-[3px]` + offset 없음입니다 (`button.md`). **닫기 버튼만 2px + offset 2px입니다.**

**기본 불투명도가 0.7입니다** — 평소 흐리게 두고 hover에서 선명해집니다.
표본에서 닫기 버튼을 기본 반투명으로 두는 사례는 이것뿐입니다.

**내부 패딩(24px)보다 버튼 위치(16px)가 안쪽입니다** — 콘텐츠 정렬선과 맞지 않습니다.

## 헤더 · 푸터 — 모바일에서 뒤집힙니다

**shadcn/ui만 확인됩니다.**

| 요소 | 클래스 |
|------|--------|
| 헤더 | `flex flex-col gap-2 text-center sm:text-left` |
| 푸터 | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| 설명 | `text-sm text-muted-foreground` |
| 요소 간격 | `gap-4` (16px) |

**모바일에서 헤더가 가운데 정렬, 데스크톱에서 왼쪽 정렬입니다.**

**푸터가 모바일에서 `flex-col-reverse`입니다** — 세로 배치이면서 순서가 뒤집힙니다.
DOM 순서가 `[취소][확인]`이면 모바일에서 확인이 위로 올라갑니다.

| 뷰포트 | 푸터 배치 |
|--------|-----------|
| < 640px | 세로, **역순** (주 액션이 위) |
| ≥ 640px | 가로, 우측 정렬 (주 액션이 오른쪽) |

**엄지가 닿는 자리에 주 액션을 두는 배치가 아닙니다** — 위쪽입니다.
모바일에서 아래쪽 버튼이 취소가 되므로 오조작이 파괴적이지 않은 쪽으로 갑니다.

## 컨테이너 색

| 시스템 | 토큰 |
|--------|------|
| Radix Themes | `--color-panel-solid` |
| **Cloudscape** | **`color-background-dialog`** `#f0fbff` (light) / `#001129` (dark) |
| shadcn/ui | `bg-background` |
| Atlassian | `elevation.surface.overlay` |

**Cloudscape만 다이얼로그 배경이 흰색이 아닙니다** — `#f0fbff`는 연한 청색입니다.
`color-border-dialog`도 `#006ce0`(파란색)입니다.

**Cloudscape에는 `modal` 토큰이 없고 `dialog`·`popover`만 있습니다.**
`color-background-dialog`가 모달 배경인지 인라인 강조 영역인지 확정하지 못했습니다.

Radix Themes의 `--color-panel-solid`는 `data-panel-background` 테마 축과 연결됩니다 —
`solid` / `translucent` 중 선택하는데, **모달은 `solid`를 강제**합니다.

## 판단 지침 — Apple HIG (DocC JSON으로 확보)

그동안 "문서에만 있다"던 종류의 지침이 처음 들어왔습니다 (modality.json · alerts.json):

- **모달은 닫는 행동이 반드시 필요하므로, 집중이 필요할 때만 쓸 것** —
  "명확한 dismiss 방법을 항상 제공"이 명문화돼 있습니다
- **닫기로 사용자 생성 콘텐츠가 사라질 수 있으면, 상황을 설명하고 해결 경로를 줄 것**
  (제스처든 버튼이든 동일 적용) — "배경 클릭으로 닫히는가"에 대한 Apple의 답은
  "닫힘 수단이 무엇이든 데이터 손실 시 확인"입니다
- 모달 내부 하위 뷰는 **단일 경로**로 — 닫기 버튼과 혼동될 버튼을 두지 말 것
- visionOS 얼럿 액세서리 뷰: **최대 높이 154pt · 라운드 16pt** (수치 지침)

표본 1개(Apple)의 지침이므로 교차 권고는 아직 아닙니다.

## 판단 지침 — 웹 시스템 문서 층 실측 (2026-08-18)

문서 사이트가 열린 환경에서 8개 시스템의 모달 지침을 직접 읽었습니다.
GOV.UK는 **모달 컴포넌트 자체가 없습니다** (35개 목록에서 확인 — 부재가 입장).

### 배경 클릭으로 닫히는가 — 규정한 곳은 닫힘, 예외 규정이 정교함

| 입장 | 시스템 |
|------|--------|
| **닫힘** | Atlassian ("blanket 아무 곳이나") · Cloudscape (onDismiss reason `overlay`) |
| **변형별 분기** | **Carbon** — passive 모달만 바깥 클릭으로 닫힘, transactional·acknowledgment·progress는 안 닫힘 |
| **기본 닫힘 + 예외** | **Primer** — "미저장 변경이 가능한 폼을 담으면 (폼 상태와 무관하게) backdrop으로 닫지 않는다" |
| 규정 없음 | M3 · Spectrum · Polaris 현행 (확인함) |

**Carbon의 "행동을 요구하는 모달은 바깥 클릭으로 안 닫힘" + Primer의
"미저장 폼 예외"를 합치면 실무 규칙이 됩니다** — 읽기 전용은 닫고,
입력·확인 중이면 막으세요. Apple의 "데이터 손실 시 확인"(위 절)과 정합.

### ESC — 규정한 6개 시스템 만장일치로 닫힘

M3(a11y 표 명문) · Atlassian · Spectrum("Cancel/OK 확인과 동등") ·
Carbon(4개 변형 전부) · Primer(**"must dismiss"** + 트리거로 포커스 복귀 필수) ·
Cloudscape. 반대 규정 0. 참고: Spectrum은 ESC를 "취소와 동등"으로
정의하므로, ESC로 닫힐 때 파괴적 기본 동작이 실행되면 안 됩니다.

### 중첩 모달 — 금지 4 : 조건부 허용 2

| 입장 | 시스템 | 조건 |
|------|--------|------|
| **금지** | Atlassian("inaccessible and confusing") · Spectrum · Carbon("확인 모달에 의존하는 작업이면 애초에 모달에서 하지 말 것") · Cloudscape("Never" + 모달 체인 금지 — 다단계는 multipage flow로) | |
| **조건부 허용** | M3 | **전체화면 다이얼로그 위에만** — 미저장 닫기 확인이 공식 패턴 |
| | Primer | **포커스 관리 조건 하 2겹까지** (3겹 이상 비권장). 스택 시 ESC·바깥 클릭은 최상위만 닫아야 함 |

**"중첩 규정이 없다"던 기존 기록은 틀렸습니다** — 토큰·소스 층에 없었을
뿐, 문서 층엔 6개 시스템이 명시 규정을 둡니다. 조건부 허용 2곳의 조건이
같은 지점(미저장 확인)이라는 것이 발견입니다.

## 아직 못 채운 것

- ~~배경 클릭으로 닫히는가 / ESC 키 동작 / 모달 안의 모달(중첩)~~ →
  **해소 (2026-08-18)** — 위 "판단 지침 — 웹 시스템 문서 층 실측" 절
- **포커스 트랩 구현** — Radix Primitives · React Aria가 담당하며 토큰·CSS에 없습니다
- **Radix Themes 모달 너비** — `max-width`를 컴포넌트 CSS에 노출하지 않습니다.
  `size` prop이 패딩·라운드만 바꿉니다
- ~~Mantine 모달 패딩~~ → **해소 (2026-08-18)** — `@mantine/core@9.5.1`
  `ModalBase.css` 전체 확인: 패딩은 `--mb-padding` 기본
  `--mantine-spacing-md`(**16px**, 헤더·본문 공통), 헤더 sticky·min-height
  60px·본문 `padding-top: 0` 포함 위 "Mantine ModalBase" 절.
  `Modal.css` 쪽은 크기(320~780)·오프셋(5dvh/5vw)·전체화면 라운드 0
  뿐으로 패딩 없음 재확인
- **Atlassian 모달 치수** — 모션 토큰만 있고 너비·패딩은 컴포넌트 패키지에 있습니다
- **Cloudscape 모달 전용 토큰** — `dialog`·`popover`만 있고 `modal`이 없습니다
- ~~Apple 시트 감지 지점(detent)·배경 축소 효과~~ → **해소 (2026-08-18)** —
  "Apple 시트" 절의 Detent 소절. large/medium 2단 + 커스텀, 축소 효과는 현행 규정 아님
- ~~**모바일 전환(모달 → 하단 시트)** — 전환 브레이크포인트 규정이 없습니다~~ →
  **정정 (2026-08-18)** — shadcn/ui에 없을 뿐, **최소 20개 시스템이 값으로 규정합니다.**
  아래 "79표본 재종합"의 "모바일 전환" 절. shadcn/ui 실측값은 그대로 유지:
  - `drawer`(vaul 기반, 터치 제스처): bottom 방향 `max-h-[80vh]` + 상단만
    라운드, **그래버 100×8px**(bottom일 때만 표시 — Apple 36×5의 2.8배 폭),
    좌우 방향은 폭 75% + `sm:max-w-sm`(384px)
  - `sheet`(Radix Dialog 기반, 제스처 없음): side 기본 `right`, 폭 75% +
    384px 상한, **진입 500ms / 퇴장 300ms 슬라이드** — 같은 라이브러리의
    dialog(200/200)와 다른 자릿수. 오버레이는 dialog와 동일 `bg-black/50`
  - 같은 "옆에서 나오는 패널"인데 **터치 제스처 필요 여부로 프리미티브를
    가릅니다** (vaul vs Radix) — 전환 기준이 뷰포트 폭이 아니라 입력 방식

## 79표본 재종합 — 컴포넌트 실측 (2026-08-18)

`partial` 수집 심화로 모달 실측이 79개 시스템 전부로 늘어, 이 문서의 결론을 그 표본으로 재검증했습니다.
**초기 6표본에서 세운 결론 중 여섯 개가 뒤집힙니다.**

### 폭을 정하는 방식 — 6진영

| 방식 | 시스템 |
|------|--------|
| **px 다단 (전용 스케일)** | Backpack 2 · Paste 2 · NASA WDS 2 · Strapi 2 · Auro 2 · Helios 3 · KRDS 3 · LeafyGreen 3 · PIE 3 · Gestalt 3 · Forma 36 3 · Pharos 3 · Semi 3 · Welcome UI 3 · Charcoal 3 · Thumbprint 3 · eBay 3 · Spindle 3 · Vapor 3 · Vibe 3 · Nord 4 · Braid 4 · Bootstrap 4 · Italia 4 · SGDS 4 · Pajamas 4 · Clarity 4 · Mantine 5 · Cloudscape 5 · Orbit 5 · Siemens iX 5 · Chakra 5 · smarthr 6 · HeroUI 10 |
| **단일 폭** | Seed 272 · Serendie 408 · NYSDS 439 · Canvas 440 · Naive UI 446 · Astro 448 · Ring UI 464 · Shoelace 496 · Blueprint 500 · Base Web 500 · shadcn/ui 512 · Codex 512 · Evergreen 560 · Yoga 580 · Vitamin 600 · Stacks 600 · Kaizen 600(상한) · Cedar 640 · Skeleton 640 · Mistica 680 · HSDS 680 · Protocol 1200(상한) |
| **무단계 — 내용이 폭을 정함** | Asphalt(`fit-content`) · Porsche(`auto`, 276~1535.5) · Vanilla(`auto`, 상한 1280) · Grommet · Vuetify · Kontur · PrimeVue · Origami(**JS가 뷰포트를 실측**) · Pluralsight · Unify · digital-go-jp · Intergalactic |
| **다른 축 재사용** | MUI·Priceline(브레이크포인트) · Backpack(브레이크포인트 = 모달 폭) · Braid(`contentWidth`) · smarthr(12컬럼 col 폭) · Paste(범용 `size` 토큰) · HeroUI(Tailwind `max-w-*` 10단 승계) · Clarity(`space-14`(72) × 4/8/12/16) · EUI(**폼 `maxWidth` 400 = 모달 `min-width`**) · DSFR(그리드 위임 — 폭 단계 0건) |
| **뷰포트 %** | Carbon 48/60/84 · **Tegel 25~100%**(16분할 분수, 브레이크포인트 5값이 Carbon과 동일) · Audi 62.5%(상한 1200) |
| **문자수 · 범위** | **Odyssey `calc(55ch + 64px)`** · **Bolt `optimal` = 75ch** · **Vibes는 단계가 아니라 범위**(min 640 / max 1120) |

**"모달 폭"이 시스템마다 다른 축에서 나옵니다.** 전용 스케일을 두는 쪽이 다수지만,
**폭을 아예 정하지 않는 진영이 12곳**이고 그중 Origami는 CSS에 `max-width`가 0건이며
JS가 런타임에 잽니다. 반대편 극단이 **Vibe**입니다 — px 폭 자체가 미디어쿼리로
3단 성장합니다(small 460 → 480 → 520). px 고정도 뷰포트 %도 아닌 제3 방식입니다.

### 기본 폭 — 450~520px이 최빈, 512는 그 한가운데입니다

```
450~520  ~14개   Ring UI 464 · NASA WDS 480 · Shoelace 496 · Blueprint·Base Web·
                 Bootstrap·Italia·SGDS·Vapor 500 · shadcn/ui·Backpack·Chakra·
                 Codex 512 · Forma 36 520
540~600  ~12개   Vibe 540 · Evergreen 560 · Clarity 576 · Yoga 580 ·
                 Helios·LeafyGreen·PIE·Vitamin·Stacks·Welcome UI·Kaizen·
                 Siemens iX 600
608~680  ~11개   Paste 608 · eBay 616 · Nord 620 · Pharos 624 · Thumbprint 632 ·
                 Cedar·Skeleton·Priceline 640 · Braid 660 · Mistica·HSDS 680
400~448   ~9개   Serendie 408 · NYSDS 439 · Canvas·Mantine·Charcoal 440 ·
                 Naive UI 446 · Astro·Semi·HeroUI 448
700 이상  ~8개   Gestalt 720 · smarthr 728 · Orbit 740 · KRDS 760 · Strapi 830 ·
                 Auro 986 · Protocol 1200 · Vanilla 1280(상한)
그 아래    1개   Seed 272 — iOS `UIAlertController` 270pt를 웹으로 이식
```

**기존 "512px이 무난한 기본값"은 79표본에서 유지됩니다.** 최빈 대역(450~520)의
한가운데이고, 같은 값을 쓰는 시스템이 넷(shadcn/ui · Backpack · Chakra · Codex)입니다.
**440대와 500대가 두 개의 수렴점**이라는 것도 확인됩니다 — 전자는 확인 다이얼로그,
후자는 폼 모달 자리입니다.

**NYSDS 439px이 눈에 띕니다** — 4px 그리드에서 1px 어긋난 리터럴이고 토큰이 아닙니다.

### 라운드 — "8~12px 몰림"이 아닙니다

```
0~4px    ~20개   Astro·Auro·DSFR·Origami·Protocol·Thumbprint·Vanilla 0 ·
                 Codex·Pharos·Pluralsight 2 · Blueprint·Cedar·Clarity·EUI·MUI·
                 Siemens iX·Strapi·Tegel·Vuetify 4 · SGDS 4.8
5~8px    ~20개   Nord 5 · Chakra·Forma 36·smarthr 6 · Kaizen 7 ·
                 Bootstrap·Italia·Helios·NYSDS·Paste·Ring UI·Stacks·Vapor·
                 Vitamin·Unify·digital-go-jp·Serendie·Evergreen·NASA WDS·Cloudscape 8
10~14px  ~10개   shadcn/ui 10 · Radix Themes 8·12 · Backpack V2·KRDS·Odyssey·
                 PrimeVue·Semi·Welcome UI 12 · HeroUI 14 · Intergalactic 12/14
16~32px  ~19개   Asphalt·Base Web·Gestalt·Kontur·Orbit·Pajamas·PIE·Vibe·Yoga 16 ·
                 Seed·Spindle 20 · Braid·Charcoal·eBay·LeafyGreen·Porsche·
                 Priceline·Vibes 24 · Canvas 32
```

> **정정.** 기존 "웹 시스템은 8~12px에 몰려 있습니다"는 6표본 관찰이었습니다.
> 79표본에서 **0~4px 진영과 16~32px 진영이 각각 8~12px대만큼 두껍습니다** —
> 몰림이 아니라 **3개 군집**입니다. 그리고 **Canvas 모달이 32px**이므로
> "Apple 시트(상단 34px)는 자릿수가 다르니 웹으로 가져오지 마세요"도 성립하지 않습니다.
> 두 값의 차이는 2px입니다. 아래 "구현 시 기본값"을 이에 맞게 고쳤습니다.

**라운드를 역할별로 분리하는 진영이 확인됩니다** — NYSDS(버튼 12 / 모달 8 / 입력 4) ·
Semi(컨트롤 2 vs 모달 12) · LeafyGreen(버튼·입력 6 vs 모달 24) · Pajamas(버튼 8 vs 모달 16) ·
Asphalt(액션 6 vs 컨테이너 16, **토큰 이름이 용도로 갈림**). 반대로 **Pharos·Codex는
버튼부터 모달까지 단일 최소 라운드**(2px)로 통일합니다.

**Mistica는 모달 전용 라운드 값이 없습니다** — 카드와 같은 `container` 슬롯을 재사용해
스킨마다 16/8/4px으로 갈립니다.

### 오버레이 — 검정 일색이 아닙니다

> **정정.** 기존 "표본은 전부 검정 계열(가장 옅은 것이 shadcn/ui 검정 10% + 블러)"은
> 틀렸습니다. **라이트 스크림 진영이 5곳**입니다:
> **bf-solid 흰색 90%** · **Codex 흰색 65%**(라이트 모드 전용, 다크는 검정 65%) ·
> **Park UI `white.a10` + blur 4px** · **Cedar 모래색 `#f7f5f3d9` + blur 16px** ·
> **Bolt `--overlay-light` 변형**(검정 0.8이 기본, 흰색은 옵션).

농도 분포:

```
0.2~0.32   Origami·Strapi .2 · Welcome UI ≈.23(color-mix 조립) · Kontur .24 ·
           Vapor·Vuetify .32
0.4~0.5    Braid(라이트) · Ring UI(라이트) · Paste · PrimeVue(라이트) .4 ·
           Shoelace 회색 33% · Astro·Bootstrap·SGDS·Grommet·Kaizen·Orbit·
           Pharos·Pluralsight·Vibes·HeroUI .5
0.55~0.7   Siemens iX .549 · PIE .55 · Semi·LeafyGreen·Braid(다크)·
           PrimeVue(다크) .6 · DSFR .64 · Codex .65(흰) ·
           Backpack·EUI·Evergreen·NYSDS·eBay·Vibe·Ring UI(다크) .7
0.75~0.9   Forma 36·Skeleton .75 · Asphalt·Gestalt·Italia·Bolt·Thumbprint·
           Vitamin·Spindle .8 · Cedar·Protocol·Vanilla .85 · bf-solid .9(흰)
```

**0.5가 최빈이고, 0.2에서 0.9까지 전 구간이 채워집니다.** "표준 농도"는 없습니다.

**순검정이 아닌 틴트 스크림이 최소 10곳입니다** — eBay 잉크색 `rgb(17 24 32)` ·
NYSDS `#1b1b1b` · EUI·Evergreen 청회색(두 데이터 도구가 독립적으로 거의 같은 값) ·
Paste 남색 `#06033a` · Vibe 네이비 `rgb(41 47 76)` · Yoga 자주 `#231B22` ·
Priceline `#001833` · Strapi `#32324d` · Asphalt `#32333a` · Semi `rgb(22 22 26)`.

**스크림 농도를 축으로 삼는 방식이 넷으로 갈립니다.**

| 축 | 시스템 |
|----|--------|
| 컬러 모드 | Braid .4/.6 · Ring UI .4/.7 · PrimeVue .4/.6 · Codex 흰/검 · Park UI 흰/검 · Vitamin(역배경색 hsl 성분) |
| **시맨틱 3단 토큰** | **Priceline** — 같은 `#001833`에 dark .75 / medium .5 / light .25 |
| **중첩 깊이** | **Intergalactic** — 모달 위 모달의 스크림이 `overlay-secondary`로 자동 감쇠 |
| 다른 개념과 공유 | **Vapor** — 스크림 0.32 = disabled 0.32 (시스템 전역 "감쇠 상수") |

**블러를 함께 쓰는 곳이 5곳**입니다 — shadcn/ui Drawer · Cedar 16px · Park UI 4px ·
**Porsche 32px** · HeroUI(`blur` 백드롭이 1급 변형). Porsche는 네이티브 `::backdrop`을
`display:none`으로 죽이고 `<dialog>` 자신을 frosted 레이어로 만듭니다.

### 네이티브 `<dialog>` — 10곳, 그중 5곳이 `@starting-style`까지

| 채택 수준 | 시스템 |
|-----------|--------|
| `<dialog>` + `::backdrop` | Asphalt · Backpack V2 · digital-go-jp · Helios · Porsche |
| **`<dialog>` + `@starting-style` + `transition: display allow-discrete`** | **eBay · LeafyGreen · PIE · Skeleton · Spindle** |
| `::backdrop`을 끄고 자체 오버레이 | **Helios**(`display:none` + 별도 요소) · **Porsche**(dialog 자신이 스크림) |

**2024+ CSS로 진입/퇴장을 JS 없이 처리하는 진영이 5곳으로 늘었습니다** — 각
시스템 문서가 서로를 모른 채 "표본 첫 사례"라고 적어 둔 자리입니다.

### 진입 대 퇴장 — 다수는 진입이 길지만 예외가 실재합니다

| 관계 | 시스템 |
|------|--------|
| **진입 > 퇴장** | Semi 120/90 · Vibe 150/100 · Chakra·Radix Themes·Seed 200/100 · Strapi 200/120 · Vuetify 225/125 · MUI 225/195 · Atlassian 250/200 · PIE 250/150 · Priceline 250/150 · Kaizen 300/200 · Thumbprint 300/250 · Spindle 350/150 · Park UI 400/200 · Clarity 400/300 · Porsche 400/250 · Material Web 500/150 |
| **대칭** | LeafyGreen 150/150 · shadcn/ui·Evergreen·Forma 36·Naive UI 200/200 · Codex·Skeleton·Shoelace 250/250 · smarthr·PrimeVue 300/300 · Base Web·Gestalt 400/400 |
| **퇴장 > 진입** | **Stacks** — 진입 불투명도 100ms / **퇴장 불투명도 200ms** |
| **2단 안무로 총 시간이 튐** | **Audi** — 페이드 0.4s + **지연 0.4s = 총 0.8s** (morph 변형만 지연 0) |

> **정정.** 기존 "진입이 길고 퇴장이 짧습니다"는 4표본 관찰이었습니다.
> 79표본에서 **진입 > 퇴장이 다수(18개)인 것은 유지**되지만,
> **대칭 진영도 12곳**이라 "표본 전체"는 아닙니다. 그리고 **Stacks는 퇴장이 진입의
> 2배**로 명확한 역전이고, **Audi는 진입에만 0.8s**를 써 표본 모달 중 가장 느립니다.

**비대칭 비율의 상한이 Material Web의 3.3배(500/150)입니다** — 웹 표본(1.0~2.0배)과
자릿수가 다릅니다. **Park UI만 2:1 비대칭을 애니메이션 토큰 이름으로 박제**했습니다
(`animations.dialog-in/out` = 400/200ms).

**대칭 진영 안에서도 조절 축이 갈립니다** — Naive UI는 시간만 대칭이고 곡선은
비대칭(진입 easeOut / 퇴장 easeIn), PrimeVue는 곡선까지 완전 대칭
(`cubic-bezier(.19,1,.22,1)` 300ms 양방향)입니다.

### 진입 스케일 — 최빈은 0.95가 아니라 0.8입니다

```
0.5    Blueprint · Kaizen
0.6    bf-solid(`scale3d(.6)`) · Stacks(0.6 + translateY 30%)
0.675  Paste (스프링 물리)
0.7    Semi
0.75   eBay
0.8    Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi · Vibe   ← 최빈 8개
0.85   Forma 36
0.9    Backpack · Naive UI · Vapor · Priceline
0.93   PrimeVue
0.95   Atlassian · shadcn/ui · Bolt · Chakra · Cloudscape(키프레임)
0.97   Radix Themes · Nord
1.3    Seed — **축소 진입**(커진 상태에서 줄어듦). 표본 유일 역방향
```

> **정정.** "스케일은 95%가 표본의 다수값입니다"는 틀렸습니다. **최빈은 0.8(8개)**이고
> 0.95는 5개입니다. **0.5까지 내려가는 진영**(Blueprint · Kaizen)도 있습니다.
> 95%는 "표본 다수"가 아니라 **Material 계열 곡선을 쓰는 시스템들의 값**입니다.

**HeroUI의 퇴장만 방향이 반대입니다** — 데스크톱에서 **103%로 커지며** 사라집니다.
축소 퇴장(Semi 0.7 · Naive 0.9 · PrimeVue 0.93) 다수와 갈립니다.

### 이동 — "중앙 모달은 움직이지 않는다"는 소수파였습니다

> **정정.** 기존 "화면 중앙 모달은 움직이지 않습니다"는 Atlassian·shadcn/ui 2표본
> 관찰이었습니다. **79표본에서는 이동을 함께 쓰는 쪽이 더 많습니다.**

| 방향 | 시스템 |
|------|--------|
| 위에서 내려옴 | Bootstrap·Pajamas·SGDS `-50px` · **Clarity `-15rem`** · PIE `-40px` · Nord `-10px` · Siemens iX `-40px`(기본 배치가 상단) |
| 아래에서 올라옴 | Base Web 20px · EUI 40px · Park UI·Priceline 64px · **Porsche `25vh`** · Pluralsight 8px · Stacks `30%` |
| 전체 슬라이드업(바텀시트) | Charcoal · Thumbprint(모바일) · Orbit(모바일) · Auro(모바일) · Spindle sheet · Seed 바텀시트 |
| **트리거에서 날아옴** | **Vuetify** — container-transform(히어로) 전환, **이동 거리에 따라 지속시간을 1~1.5배로 늘림** |
| 이동 없음(스케일만) | Atlassian · shadcn/ui · Chakra · Bolt · Backpack · Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi · Vapor · Semi · Kaizen · Blueprint · Forma 36 · PrimeVue |

**Bootstrap의 `-50px` 드롭인이 계보를 만듭니다** — Pajamas·SGDS가 gl/sgds 층에서
재정의하지 않아 그대로 상속됩니다. **모달 진입 모션의 가장 넓은 확산 경로가
프레임워크 상속**이라는 것이 이번에 드러납니다.

### 진입 모션이 아예 없는 진영 — 10곳

**NYSDS**(transition·keyframe 0건) · **Vanilla** · **Yoga** · **Vitamin** ·
**Ring UI** · **Tegel**(CSS 진입 애니메이션 없음) · **Gestalt**(스크림만 400ms linear
페이드, 패널은 즉시) · **Pharos**(오버레이만 250ms) · **Thumbprint**(데스크톱
`transition:none`, 커튼만 페이드) · **Orbit**(데스크톱은 무모션, 모바일만 슬라이드).

**"커튼만 움직이고 본체는 즉시 놓는다"가 독립 관행입니다** — Gestalt · Pharos ·
Thumbprint 셋이 같은 결정에 도달했습니다. 모달 등장의 지각 비용을 스크림에만
싣는 방식입니다.

### 오버슈트를 모달 진입에 실제로 쓰는 곳 — 8곳

| 시스템 | 곡선 | 넘김 |
|--------|------|:---:|
| **EUI** | `bounce (.34, 1.61, .7, 1)` — 기본 진입 이징 | y₁ 1.61 |
| **Clarity** | `easing-secondary (0, 1.5, 0.5, 1)` | y₁ 1.5 |
| **Semi** | `(0, 0, 0.26, 1.38)` | y₂ 1.38 |
| **eBay** | `bounce (0.3, 0, 0, 1.25)` | y₂ 1.25 |
| **Kaizen** | `bounce-in (0.485, 0.155, 0.24, 1.245)` | y₂ 1.245 |
| **HSDS** | `boop (0.175, 0.885, 0.325, 1.2)` | y₂ 1.2 |
| **Blueprint** | `(0.54, 1.12, 0.38, 1.11)` | y₁ 1.12 |
| **Vapor** | `(.45, 1.005, 0, 1.005)` | 1.005 |

**`systems/blueprint.md`·`systems/kaizen.md`가 각각 "모달 진입에 오버슈트를 실제
적용한 것은 자기뿐"이라고 적어 둔 것은 둘 다 틀렸습니다** — 최소 8곳입니다.
자세한 순위는 `motion.md` 재종합 절에 있습니다.

### 모바일 전환 — 규정이 없는 게 아니라 값이 제각각입니다

| 브레이크포인트 | 시스템 · 전환 |
|:---:|--------|
| 480px | NYSDS — 미만에서 푸터 `column-reverse` |
| **481px** | Thumbprint — 미만에서 전체화면 + 슬라이드업 |
| **570px** | Pharos — 전체화면 + `top 500ms` 슬라이드 (리터럴, 토큰 아님) |
| **575.98px** | Pajamas — 푸터 버튼 세로 스택 |
| 576px | Orbit(바텀시트) · **Clarity**(전체화면 + 라운드 0) |
| 600px | Asphalt(CSS만으로 바텀시트) · Bolt(전체화면 + **오버레이 제거**) |
| 512px(32rem) | Backpack — 전체화면 |
| 640px(`sm`) | shadcn/ui |
| 768px | Canvas(바텀시트) · Auro(바텀시트) · EUI(전체화면) · DSFR(**미만이 기본 하단 정렬**) |
| **1024 × 550** | **Mistica** — 폭과 **높이를 함께** 게이트로 검사 |
| 컴포넌트 교체 | Gestalt(`SheetMobile`) · Seed(바텀시트 별도) · HeroUI(`placement: auto`) · Priceline(`sheet` prop) · Serendie(**버튼 순서만 미디어 조건으로 반전**) |

> **정정.** 기존 "전환 브레이크포인트 규정은 표본 어디에도 없습니다"는 shadcn/ui
> 한 곳의 관찰이었습니다. **최소 20개 시스템이 값으로 규정합니다** — 문제는 규정의
> 부재가 아니라 **481 · 570 · 575.98 · 576 · 600 · 640 · 768px으로 제각각**이라는 것입니다.

**전환 지점을 모달 기본 폭과 같은 값으로 두는 관행이 둘 확인됩니다** —
**Backpack**(모달 폭 32rem = 전체화면 브레이크포인트 32rem)과
**Clarity**(기본 모달 폭 576 = 전체화면 브레이크포인트 576px). 한 숫자가
두 역할을 하므로 어긋날 수 없습니다.

### 모달 폭과 스크림 밖 — 이번에 드러난 세 가지 실무 장치

- **닫기 거부 피드백을 기본 제공하는 곳이 둘**입니다 —
  **Bootstrap**(`$modal-scale-transform: scale(1.02)`, 변수로 노출) ·
  **Shoelace**(`denyClose`: scale 1 → 1.02 → 1 펄스 250ms, 기본 애니메이션 세트에 포함).
  두 시스템이 독립적으로 **같은 1.02 배율**에 도달했습니다.
- **커서로 "바깥 클릭 = 닫기"를 예고하는 곳** — **Gestalt**만
  `closeOnOutsideClick`일 때 스크림 커서를 `zoom-out`으로 바꿉니다.
- **헤더 sticky가 Mantine 단독이 아닙니다** — **Tegel · Vanilla**도 모달 헤더를
  sticky로 둡니다. **DSFR은 푸터를 sticky**로 두고 `margin-top: -2.5rem` 겹침 +
  스크롤 중에만 뜨는 1px 그라디언트 구분선(`.fr-scroll-divider`)을 씁니다.

## 구현 시 기본값

**너비 — 3단계로 시작합니다.**

```
sm   400  (확인 다이얼로그 · 짧은 폼)
md   512  (기본. shadcn/ui 값)
lg   640  (콘텐츠 · 표)
```

**512px이 무난한 기본값입니다** (2026-08-18 재확인). 79표본에서 **기본 폭 최빈
대역이 450~520px(약 14개)**이고 512는 그 한가운데이며, 같은 값을 쓰는 시스템이
넷입니다(shadcn/ui · Backpack · Chakra · Codex).

**440대와 500대가 두 개의 수렴점입니다.** 확인 다이얼로그는 440대
(Canvas·Mantine·Charcoal 440 · Naive UI 446 · Astro·Semi·HeroUI 448),
폼 모달은 500대입니다. **중간을 비워도 됩니다** — Mantine의 증분이
`md`~`lg`에서 +60에서 +180으로 뛰는 이유입니다.

**폭 단계를 아예 두지 않는 것도 다수 선택입니다** — 79표본에서 단일 폭 22곳,
무단계 12곳입니다. **단계를 둘 거면 3~5단이 관행**이고, 10단(HeroUI)은
유틸리티 스케일 승계일 때만 나옵니다.

**패딩**

```
24px  (모달 크기와 무관하게 고정)
```

shadcn/ui가 고정 24px이고 Radix Themes size 3이 같은 값입니다.

**크기에 연동시킬 거면 스페이싱 토큰을 참조하세요** (Radix Themes 방식) —
`--space-3`~`6`(12/16/24/32)입니다. 라운드는 2단계씩 묶어도 됩니다.

**라운드 — 세 군집 중에서 고르세요** (2026-08-18 정정).

```
0~4px    ~20개  밀집 업무·관제·정부 (Clarity·EUI·MUI·Siemens iX·Tegel·Vuetify·DSFR·Astro)
5~8px    ~20개  범용 기본값 (Bootstrap·Helios·NYSDS·Paste·Ring UI·Stacks·Vapor·Cloudscape)
10~14px  ~10개  프레임워크 계열 (shadcn/ui 10 · Radix Themes 8·12 · Semi·KRDS·HeroUI)
16~32px  ~19개  소비자 서비스·모바일 문법 (Orbit·PIE·Pajamas·Braid·eBay·LeafyGreen·Canvas 32)
```

**이전 판은 "웹 시스템은 8~12px에 몰려 있다"고 적었는데, 6표본 관찰이었습니다.**
79표본에서 **8~12px대가 오히려 가장 얇은 군집**이고, 0~4px과 16~32px이 각각 그 두 배입니다.
**"업계 표준 모달 라운드"는 없습니다** — 제품 성격으로 고르세요.

**Apple 시트(34/58px)도 웹과 자릿수가 다르지 않습니다** (2026-08-18 정정).
**Canvas 모달이 32px**으로 Apple 시트 상단(34px)과 2px 차이입니다.
다만 **상·하단을 다르게 두는 것은 여전히 Apple뿐**이므로, 비대칭 라운드는 옮기지 마세요.

**버튼·입력과 다른 값을 쓸지 먼저 정하세요.** 역할별로 분리하는 진영
(NYSDS 버튼 12 / 모달 8 / 입력 4 · Semi 컨트롤 2 vs 모달 12 ·
LeafyGreen 컨트롤 6 vs 모달 24)과 전면 통일 진영(Pharos·Codex 2px)이 갈립니다.

**전체화면 모드가 있으면 라운드를 0으로 강제하세요** (Mantine `!important`).
화면 끝에 둥근 모서리가 남으면 잘린 것처럼 보입니다. Clarity·PIE·Bolt도
전체화면 전환 시 라운드를 0으로 되돌립니다.

**화면 여백 — 모바일을 먼저 정하세요.**

```
좌우  16px 여백 유지 (max-width: calc(100% - 32px))
상하  5dvh  또는 32px
```

**`vh`가 아니라 `dvh`를 쓰세요** (Mantine 방식). 모바일 브라우저 주소창이
숨었다 나타날 때 `vh`는 갱신되지 않아 모달이 잘립니다.

**하단 여백은 `max(32px, 6vh)`처럼 두는 것을 검토하세요** (Radix Themes 방식).
큰 화면에서 모달이 하단에 붙지 않습니다.

**스크롤을 두 층으로 두세요.**

```
바깥 (오버레이 영역)  모달이 화면보다 길 때
안쪽 (콘텐츠)         콘텐츠가 모달보다 길 때
```

Radix Themes가 `BaseDialogScroll`과 `BaseDialogContent` 양쪽에 `overflow: auto`를 둡니다.
한 층만 두면 긴 모달에서 헤더·푸터까지 함께 스크롤되거나 아예 잘립니다.

**오버레이**

```
검정 계열 50%   (79표본 최빈)
```

**0.2에서 0.9까지 전 구간이 채워집니다 — "표준 농도"는 없습니다.** 0.5에서 시작하고,
모달 뒤 맥락을 살려야 하면 낮추세요(Kontur 0.24 · Origami·Strapi 0.2).

**순검정 대신 브랜드 잉크색을 쓰는 쪽이 다수파에 가깝습니다** —
eBay `rgb(17 24 32)` · Paste 남색 · Vibe 네이비 · Yoga 자주 · EUI·Evergreen 청회색.
**배경색과 같은 계열로 틴트하면 스크림이 "꺼진 화면"이 아니라 "가려진 화면"으로 읽힙니다.**

**컬러 모드로 농도를 나눌지 정하세요.** Braid .4/.6 · Ring UI .4/.7 · PrimeVue .4/.6이
전부 **다크에서 더 짙게** 갑니다. 다크 배경 위 검정 스크림은 그냥 두면 안 보입니다.

**중첩 모달을 허용한다면 안쪽 스크림을 자동으로 옅게 하세요** (Intergalactic 방식).
같은 농도를 두 번 겹치면 사실상 불투명해집니다.

**애니메이션**

```
진입   200ms   scale 0.8~0.95 → 1 + fade
퇴장   100ms   scale 1 → 0.97 + fade
오버레이 진입 200ms / 퇴장 160ms
```

**퇴장을 진입의 절반으로 두세요** (2026-08-18 재확인). 79표본에서
**진입 > 퇴장이 18개로 다수**입니다 — Radix Themes 200/100 · Chakra 200/100 ·
Seed 200/100 · Vibe 150/100. 다만 **대칭 진영도 12곳**이므로 "전 표본 규칙"은 아닙니다.
**비율은 2:1까지만 두세요** — Material Web의 3.3배(500/150)는 웹 표본과 자릿수가 다릅니다.

**스케일은 0.8이 79표본 최빈입니다** (2026-08-18 정정). 이전 판은 95%를 "표본 다수값"으로
적었는데, 그것은 **Material 계열 곡선을 쓰는 시스템 5곳의 값**이었습니다.
0.8을 쓰는 곳이 8곳(Braid · Evergreen · Mistica · HSDS · Shoelace · Grommet · Strapi · Vibe)입니다.
**작은 확인 다이얼로그일수록 깊게 축소해도 됩니다** — Blueprint·Kaizen은 0.5에서 옵니다.

**이동을 넣을지는 취향이 아니라 다수 관행입니다** (2026-08-18 정정).
이전 판의 "화면 중앙 모달은 움직이지 않습니다"는 Atlassian·shadcn/ui 2표본 관찰이었고,
79표본에서는 **이동을 함께 쓰는 쪽이 더 많습니다**. 값은 갈립니다 —
위에서 −50px(Bootstrap 계보) · 아래에서 +64px(Park UI·Priceline) · `25vh`(Porsche).
**넣는다면 이동량을 스케일과 함께 줄이세요**(Priceline: 진입 64px / 퇴장 32px —
들어온 거리의 절반만 내려가며 사라짐).

**모달 본체에 모션을 두지 않는 것도 유효한 선택입니다** — 79표본에서 10곳입니다.
Gestalt·Pharos·Thumbprint 셋이 독립적으로 **"커튼(스크림)만 페이드하고 본체는 즉시"**에
도달했습니다. 지각 비용을 스크림에만 싣는 방식입니다.

**닫기 거부 피드백을 검토하세요.** 배경 클릭으로 안 닫히는 모달이면,
Bootstrap과 Shoelace가 독립적으로 같은 값에 도달했습니다 — **`scale(1.02)` 펄스**.

**콘텐츠를 오버레이보다 먼저 사라지게 하세요** (Radix Themes: 100ms vs 160ms).
배경이 먼저 걷히면 모달이 허공에 떠 있는 프레임이 생깁니다.

**언마운트 타이밍을 맞추려면 `no-op` 애니메이션을 검토하세요.**
Radix Themes가 오버레이에 `opacity: 1 → 1` 애니메이션을 걸어
자식이 퇴장을 마칠 때까지 DOM에 유지합니다.

**접근성 — 애니메이션을 `prefers-reduced-motion`으로 감싸세요.**

```css
@media (prefers-reduced-motion: no-preference) { /* 키프레임과 적용 전부 */ }
```

Radix Themes 방식입니다. Cloudscape처럼 지속시간을 0ms로 만드는 방법도 있지만,
**애니메이션 완료 이벤트에 의존하는 코드가 있으면 0ms가 더 안전합니다** —
이벤트가 여전히 발생합니다.

**닫기 버튼**

```
우상단 16 / 16
아이콘 16px
포커스링은 다른 컨트롤과 같게
```

**shadcn/ui가 닫기 버튼만 포커스링을 다르게 둔 것은 일관성 문제입니다**
(`ring-2 ring-offset-2` vs 나머지 `ring-[3px]`). 따라 하지 마세요.

**기본 불투명도를 0.7로 두는 것은 검토가 필요합니다.** 대비가 낮아지므로
아이콘 색을 `muted-foreground`로 두고 불투명도는 1로 유지하는 편이 안전합니다.

**푸터 — 모바일 배치를 명시적으로 정하세요.**

```
< 640px   세로, 역순 (주 액션 위)
≥ 640px   가로, 우측 정렬 (주 액션 오른쪽)
```

shadcn/ui의 `flex-col-reverse` → `sm:flex-row`입니다.
**DOM 순서를 `[보조][주]`로 두면 두 배치가 자동으로 맞습니다** —
데스크톱에서 주 액션이 오른쪽, 모바일에서 위쪽입니다.

**모달을 하단 시트로 바꿀 브레이크포인트를 정하세요** (2026-08-18 정정).
이전 판은 "표본 어디에도 규정이 없다"고 적었는데, **최소 20개 시스템이 값으로
규정합니다** — 다만 481 · 570 · 575.98 · 576 · 600 · 640 · 768px으로 제각각입니다.

**가장 깨끗한 해법은 전환 지점을 모달 기본 폭과 같은 값으로 두는 것입니다** —
Backpack(폭 32rem = 전체화면 32rem) · Clarity(폭 576 = 전체화면 576px)가 그렇습니다.
한 숫자가 두 역할을 하므로 어긋날 수 없고, "모달이 화면보다 넓어지는 순간"이
정의상 전환 지점이 됩니다.

**전환 방식은 셋으로 갈립니다.**

```
CSS만으로 형태 변경   Asphalt · Canvas · Orbit · Auro · DSFR · HeroUI
전체화면 전환         Backpack · Bolt · Clarity · EUI · Pharos · Thumbprint · PIE
컴포넌트 교체         Gestalt(SheetMobile) · Seed · shadcn/ui(dialog↔drawer/sheet)
```

**같은 컴포넌트가 뷰포트로 형태를 바꾸는 쪽이 다수**입니다. 컴포넌트를 나누면
(shadcn/ui) 전환 판단이 사용하는 쪽으로 넘어가고, 실제로 shadcn/ui는
**터치 제스처 필요 여부로 프리미티브를 가릅니다**(vaul vs Radix) — 전환 기준이
뷰포트 폭이 아니라 입력 방식입니다.

**전체화면으로 갈 때 오버레이를 지울지 정하세요.** Bolt만 명시적으로 제거합니다 —
화면을 다 덮으면 스크림이 보이지 않으므로 페인트 비용만 남습니다.
