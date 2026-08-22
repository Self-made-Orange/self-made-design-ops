---
name: PrimeVue
org: PrimeTek
coverage: partial
url: https://primevue.dev
repo: https://github.com/primefaces/primevue
license: MIT
tech: [Vue, JS]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: "WCAG (버전·레벨 미명시 — 2026-08-18 확인)"
platform: web
domain: framework
verified: 2026-08-18
source: "npm primevue@5.0.1 + @primeuix/themes@3.0.0 → dist/aura/{base,datatable,tabs,breadcrumb,panelmenu,menu,toast,message,badge} · npm @primeuix/styles@3.0.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](primevue.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Vue 프레임워크 세 번째 표본 — 토큰이 **프리셋 패키지**(`@primeuix/themes`의
Aura 등)로 분리돼 있고, 참조가 **DTCG식 중괄호 문자열**(`"{border.radius.md}"`)
이며, 폼 필드 패딩이 **10/6px**입니다.

## 토큰 — 프리셋 구조

컴포넌트(`primevue`)와 테마(`@primeuix/themes` — Aura 등 프리셋)가
분리 배포됩니다. 프리셋 하나가 primitive → semantic → component 3층을 다 듭니다.

```js
borderRadius: { none 0 · xs 2 · sm 4 · md 6 · lg 8 · xl 12 }
transitionDuration: "0.2s"        // 단일 지속시간
fontSize: "0.875rem"              // 14px 기본
formField: { paddingX "0.625rem"(10px), paddingY "0.375rem"(6px) }
focusRing: { width: "1px" }
```

- **참조가 JS 안의 `"{border.radius.md}"` 문자열입니다** — W3C DTCG 별칭
  문법을 CSS 변수가 아니라 JS 값 문자열로 쓰는 표본 유일 사례
- **기본 14px** — 밀집 도구 진영. 폼 패딩 10/6은 4배수 이탈 (Mantine 10과 같은 자리)
- 모션이 `0.2s` 하나 — Ant(시드)보다도 축소된 단일 지속시간
- 프리셋 교체(Aura/Material 등)로 전 스킨이 바뀌는 구조 — Mística 스킨과
  같은 자리를 프레임워크 문법으로

## 컴포넌트 심화 — (2026-08-18)

`@primeuix/themes@3.0.0` `dist/aura`의 컴포넌트 토큰(97개 디렉터리)과
구조 CSS인 `@primeuix/styles@3.0.0`(primevue@5.0.1이 의존)을 실측했습니다.

### 버튼 — 치수가 form.field 참조

| | sm | 기본 | lg |
|---|:--:|:--:|:--:|
| 패딩 (상하/좌우) | 4/8px | **6/10px** | 8/12px |
| 서체 | 12px | 14px | 16px |
| 아이콘 전용 폭 | 28px | **36px** | 42px |

- 고정 높이가 없고 **패딩·서체가 전부 `{form.field.*}` 참조**입니다 —
  버튼과 입력의 높이가 **정의상 같아지는** 구조. Backpack·Semi가 같은 값을
  나란히 적어 맞추는 것을 Prime은 **참조로 강제**합니다. 파생 높이
  ~35px(14×1.5 + 12 + 보더 2), 아이콘 전용 폭 36px이 사실상의 기준 치수.
- 라운드 6px(`border.radius.md`) — 버튼·입력 공통. label 굵기 500.
- 변형 행렬: **색 9종**(primary·secondary·success·info·warn·**help**·danger·
  contrast + outlined/text 전용 plain) × **형 4종**(solid·outlined·text·link).
  help(보라)는 PrimeFaces 시절부터의 시그니처 시맨틱입니다.
- **토큰 값 안에 네이티브 CSS 함수가 들어 있습니다**:
  `"light-dark({surface.100}, {surface.800})"`, 다크 hover는
  `color-mix(in srgb, {primary.color}, transparent 96%)`.
  Porsche(표본 첫 light-dark() 테마)에 이은 채택이고, **DTCG 별칭 문자열과
  light-dark()·color-mix()를 한 값에 섞는** 것은 표본 유일입니다.
- 전환 0.2s — background/color/border/outline/box-shadow 5속성 열거.

### 입력 (inputtext) — 자체 값 0

- inputtext 토큰이 **전부 `{form.field.*}` 참조**입니다 — 컴포넌트 고유 값이
  하나도 없습니다. semantic `formField`가 실질적 입력 스펙: 패딩 10/6px,
  라운드 6px, 1px 보더 surface.300, 그림자 `0 1px 2px rgba(18,18,23,.05)`.
- **포커스 문법이 이원화**돼 있습니다: 전역 `focus.ring`은
  outline **1px solid primary offset 2px**(버튼이 사용),
  form.field의 focusRing은 **width 0 / style none** — 입력은 링 없이
  **보더 착색만**(focusBorderColor = primary). 버튼=링 / 입력=보더를
  토큰으로 명시해 갈라놓은 설계입니다.

### 다이얼로그 — 폭 토큰이 없음

| | 값 |
|---|---|
| 라운드 | 12px (`border.radius.xl`) |
| 패딩 | **18px**(1.125rem) — 헤더/내용/푸터 공통 |
| 제목 | 18px / 600 |
| 마스크 | light rgba(0,0,0,.4) / **dark .6** |
| 진입/퇴장 | **300ms `cubic-bezier(.19, 1, .22, 1)`**, scale 0.93 ↔ 1 대칭 |

- **폭 스케일이 없습니다** — dialog 토큰에 width가 아예 없고 소비자가
  지정합니다. MUI(브레이크포인트 재사용)·Semi(3단)·Cloudscape(5단)와 다른
  "폭 무정의" 진영.
- 마스크가 다크에서 더 진합니다(.4 → .6) — HeroUI(hover 불투명도 모드별)와
  같은 모드별 강도 보정 계열. 마스크 전환만 0.3s로 전역 0.2s의 유일 예외.
- 이징 `(.19,1,.22,1)` — easeOutExpo 계열 급감속을 진입·퇴장 같은 곡선·같은
  300ms로 씁니다. MUI(시간 비대칭)·Naive(곡선 비대칭)에 이은 셋째 방식 = 완전 대칭.
- 패딩 18px — 폼 10/6에 이어 4배수 이탈이 오버레이에도.

### 표 (`datatable`) — 밀도가 sm/lg 토큰 쌍으로 들어옵니다

`@primeuix/themes@3.0.0` `dist/aura/datatable`.

| 슬롯 | 기본 | sm | lg |
|---|:--:|:--:|:--:|
| headerCell 패딩 | **0.5 / 0.875rem (8 / 14px)** | **0.125 / 0.375rem (2 / 6px)** | 0.75 / 1.125rem (12 / 18px) |
| bodyCell 패딩 | 8 / 14px | 2 / 6px | 12 / 18px |
| footerCell 패딩 | 8 / 14px | 2 / 6px | 12 / 18px |

- **sm의 세로 2px · 가로 6px이 확보 표본의 하한**입니다 (기존 하한은 Polaris
  토큰 6px). 밀도 3단이 컴포넌트 prop이 아니라 **토큰 객체 안의 `sm`/`lg` 키**로
  들어 있는 구조입니다 — Cloudscape(토큰 값에 밀도 축)와 Radix Themes(size prop)
  사이의 세 번째 형태.
- **경계선이 `borderWidth: "0 0 1px 0"`** — header·footer·paginator 전부 같은
  값이고 색은 `datatable.border.color` 한 토큰입니다.
- **`root.transitionDuration: "0s"`** — 표 안 전환을 명시적으로 끕니다.
  Semi("전환 없음")와 같은 결론을 토큰으로 선언한 사례입니다.
- 줄무늬가 `row.stripedBackground: light-dark({surface.50}, {surface.950})` —
  **`light-dark()` CSS 함수를 토큰 값에 직접** 씁니다.
- 정렬 아이콘 **0.75rem(12px)** — 확보 표본에서 가장 작습니다
  (Semi·Vuetify 16 · Carbon 20 · Naive 15).
- 열 리사이저 폭 0.5rem(8px), 리사이즈 인디케이터 1px, 행 토글 버튼 1.5rem 원형.

### 내비게이션 (`tabs` · `breadcrumb` · `panelmenu` · `menu`)

| 항목 | 값 |
|---|---|
| 탭 패딩 | **0.875 / 1rem (14 / 16px)** · 굵기 **600** · 간격 8px |
| **활성 바 높이** | **1px** (`activeBar.height`) |
| 탭 리스트 보더 | `0 0 1px 0` |
| 탭 스크롤 버튼 폭 | 2.25rem (36px) |
| 탭 패널 패딩 | 0.75 / 1 / 1 / 1rem |
| 내비 항목 패딩 | **0.25 / 0.625rem (4 / 10px)** · 라운드 `border.radius.sm` |
| 내비 리스트 패딩·간격 | 4px · **2px** |
| 계층 들여쓰기 | **1rem (16px)** (`panelmenu.submenu.indent`) |
| 브레드크럼 | 컨테이너 패딩 0.875rem · 항목 간격 0.5rem |
| 항목 전환 | **`0s`** (`navigation.item.transitionDuration`) |

- **활성 바가 1px입니다** — 확보 표본에서 가장 얇습니다
  (Vuetify·Carbon·Semi·EUI·Chakra 2 · Blueprint 3). 탭 리스트 하단 보더(1px)와
  같은 두께라 **선이 굵어지지 않고 색만 바뀝니다.**
- **내비 항목에 높이 토큰이 없습니다** — 패딩(4/10px) + 행간 파생입니다.
  버튼·입력이 `form.field` 높이를 참조하는 것과 달리 내비는 파생 진영입니다.
- 항목 전환이 `0s`로 명시돼 있습니다 — 표와 같은 태도입니다.

### 피드백 (`toast` · `message` · `badge`)

| 항목 | 값 |
|---|---|
| **Toast 폭** | **22rem (352px)** |
| Toast 패딩 | `overlay.popover.padding` = **0.625rem (10px)** · 간격 8px |
| Toast 라운드·보더 | `content.border.radius` · **1px** |
| Toast 전환 | **0.3s** · **`blur: 10px`** |
| Toast 아이콘 | 1rem, 마진 `1px 0 0 0` (첫 줄 보정) |
| Toast 요약/상세 | 14px·500 / **12px**·500 |
| 닫기 버튼 | 1.5rem 원형, 아이콘 0.875rem |
| **Message 패딩** | 0.375 / 0.625rem (6 / 10px) · sm 4 / 8 · lg 8 / 12 |
| Message 아이콘 | 16px · sm 14 · lg 18 |
| **Badge 높이** | **1.25rem(20px)** · sm 18 · lg 24 · xl 28 |
| Badge 패딩·서체 | `0 0.375rem` · **0.625rem(10px)** / 굵기 **700** |

- **토스트에 `blur` 토큰이 있습니다** (10px) — 배경 흐림을 규격화한 사례로,
  확보 표본에서 이 축을 토큰으로 둔 것은 PrimeVue뿐입니다.
- **상태색이 `color-mix(in srgb, {색}, transparent N%)` 조합**입니다 —
  info/success/warn/error·contrast·secondary가 배경 5%(라이트) / 84%(다크)
  투명도로 만들어지고, 그림자까지 상태별로 다릅니다
  (`0px 4px 8px 0px color-mix(… transparent 96%)`).
- **배지 서체가 10px / 굵기 700**입니다 — 확보 표본에서 가장 작고 가장 굵습니다
  (Chakra·Vuetify 12/500 · Ant 12/normal · Semi 12).
- Message가 얼럿 자리인데 **패딩이 6/10px로 토스트(10px)보다 좁습니다** —
  인라인 메시지를 폼 필드 옆에 붙이는 전제입니다.

### 특징적 결정 (심화분)

- **버튼 치수가 form.field 참조** — 버튼=입력 높이를 참조로 강제
- **DTCG 별칭 + light-dark()/color-mix()를 한 값에** — 표본 유일 조합
- **포커스 이원화** — 버튼 outline 링 / 입력 보더 착색(focusRing width 0 명시)
- 다이얼로그 폭 무정의 + 마스크 다크 증량(.4/.6)
- 300ms easeOutExpo 완전 대칭 모달 모션 (전역 0.2s의 1.5배)

## 특징적 결정

- **DTCG 별칭 문자열을 JS 값으로** — 표본 유일
- 테마가 별도 패키지의 프리셋 — 토큰/컴포넌트 분리 + 스킨 구조의 결합
- 단일 transitionDuration · 기본 14px · 라운드 6단계(2~12)

## 접근성

~~미확인 (focusRing 토큰 존재).~~ → **WCAG 준수 표방 (2026-08-18 해소 — 버전·레벨
표기는 없습니다).** 출처: `primevue.org` (현 도메인은 `primevue.dev`로 리다이렉트) —
"Accessible by Default. WCAG compliant." focusRing 토큰이 이에 대응합니다.

## 참고

- **URL 이전 (2026-08-18 확인):** `primevue.org` → `primevue.dev` (301)

- 토큰: `npm pack @primeuix/themes` → `dist/aura/base/index.mjs`
- 컴포넌트 심화: 같은 패키지 `dist/aura/{button,inputtext,dialog}/index.mjs` +
  `@primeuix/styles@3.0.0` `dist/{button,inputtext,dialog}/index.mjs` (2026-08-18)
- **남은 확인 사항:** ~~스페이싱 전역 스케일(base 프리셋에서 미발견 — 컴포넌트
  전수 미조사라 단정 보류)~~ (2026-08-18 해소 — semantic 키 16종 전수 확인,
  spacing 계열 **없음 확정**: typography·focusRing·formField·overlay·mask 등뿐),
  ~~컴포넌트 목록(90+ 알려짐 — 미검증)~~ (2026-08-18 해소 — aura 프리셋
  컴포넌트 토큰 디렉터리 **97개** 실측), 프리셋 간 값 차이(aura·lara·material·
  nora 4종 + *-compat 존재 확인 — 값 비교는 미실시)
