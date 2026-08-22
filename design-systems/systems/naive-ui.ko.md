---
name: Naive UI
org: 오픈소스 (TuSimple 출신)
coverage: partial
url: https://www.naiveui.com
repo: https://github.com/tusen-ai/naive-ui
license: MIT
tech: [Vue, TS]
figma_kit: false
tokens_format: [JS]
a11y_target: "명시 없음 확인 (2026-08-18 — 문서 사이트 전 페이지에 WCAG·접근성 목표 언급 없음)"
platform: web
domain: framework
verified: 2026-08-18
source: "npm naive-ui@2.45.0 → es/_styles/common/{_common,light,dark}.mjs · es/{data-table,menu,tabs,breadcrumb,message,notification,alert,badge}/styles/ + es/layout/src/LayoutSider.mjs (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](naive-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Vue 프레임워크 두 번째 표본 — **중립색을 열거하지 않고 흰/검 두 색과 알파 표
20여 개로 빌드 타임 합성**하며, `strong` 굵기가 **500**이고, 기본 프라이머리가
**초록**(#18a058)입니다.

## 토큰

### 중립색이 합성식입니다

```js
alphaBorder: "0.12", alphaDivider: "0.06", alphaPending: "0.05",
alphaDisabled: "0.5", alphaScrollbar: "0.25", …  // 20여 개
neutral(alpha) → composite(흰 배경, 검정×alpha)   // 빌드 타임 합성
```

**회색 램프가 없습니다** — `neutralBase`(#FFF)·`neutralInvertBase`(#000)와
**알파 상수 표**에서 전 중립색을 합성합니다. Ring UI(채널 분리)·shadcn(알파
보더)보다 더 나아가 **팔레트 자체가 산식**인 표본 유일 사례입니다.
다크는 같은 알파 표에 베이스만 교체합니다.

### 크기·굵기 — 어긋남 다수

```
fontSize: Mini 12 = Tiny 12 · Small 14 = Medium 14 · Large 15 · Huge 16
fontWeightStrong: 500 · borderRadius: 3px · lineHeight: 1.6
height: 16/22/28/34/40/46 (6px 등차)
```

- **Mini=Tiny, Small=Medium** — Vibe에 이은 스케일 중복 값 두 번째
- **`strong`이 500** — Ring UI(bold=600)에 이은 굵기 이름-값 어긋남.
  CJK 문맥에서 700 대신 500을 "강조"로 쓰는 선택입니다
- **Large가 15px** — 홀수. 기본 14px는 중화권 3표본째(Ant·Semi·Naive)
- 컨트롤 높이 **6px 등차**(34px medium) — 8배수도 4배수도 아닙니다
- 라운드 기본 3px — 홀수 라운드 진영(Helios·Semi·Shoelace)

### 프라이머리가 초록

`#18a058` — 표본에서 파랑이 아닌 기본 프라이머리는 Naive뿐입니다.
다크에서 `#63e2b7`로 밝아집니다 (Siemens iX와 같은 방향).

## 컴포넌트 심화 — (2026-08-18)

`naive-ui@2.45.0`의 컴포넌트별 스타일 모듈(`es/*/styles/{_common,light}.mjs` —
컴포넌트마다 토큰 객체가 따로 배포됨)과 구조 CSS-in-JS
(`es/*/src/styles/index.cssr.mjs`)에서 실측했습니다.

### 버튼

| | tiny | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | **34px** | 40px |
| 좌우 패딩 | 6px | 10px | 14px | 18px |
| 서체 | 12px | 14px | 14px | 15px |

- 높이 6px 등차 · 패딩 4px 등차 — **두 축의 등차가 서로 다릅니다**.
  round 변형은 각 패딩 +4px. 라운드는 3px 전 크기 공통.
- **기본 버튼에 배경이 없습니다** — `color: "#0000"`(투명) + 1px 회색 보더로
  시작하고, hover에도 배경은 불변, **글자·보더만 primary hover색으로** 물듭니다.
  기본값이 사실상 ghost인 표본 드문 사례입니다.
- secondary/tertiary/quaternary 변형이 `rgba(46,51,56, .05/.09/.13)` —
  **검정 알파 3단**으로 상태를 새깁니다. 공통 토큰의 "알파 산식" 철학이
  컴포넌트 층까지 일관.
- 클릭 시 **box-shadow 파문**: `0 0 0.5px` → `0 0 0.5px 4.5px` 확산 링,
  0.6s — Material의 내부 리플이 아니라 **Ant 계열의 바깥 파문(wave)**입니다.
- 버튼 굵기는 400(fontWeight 기본값) — 500(strong)조차 안 씁니다.

### 입력

| | tiny | small | medium | large |
|---|:--:|:--:|:--:|:--:|
| **height** | 22px | 28px | 34px | 40px |
| 좌우 패딩 | 8px | 10px | 12px | 14px |

- **버튼과 높이 4단이 완전히 같습니다** (22/28/34/40).
- 배경이 `neutral(alphaInput = 0)` = **완전 투명** — 알파 표에 입력 배경이
  알파 0으로 등록돼 있습니다. 1px 보더(rgb 224,224,230)만 면을 긋습니다.
- 포커스: 보더 primaryHover(#36ad6a) + **`0 0 0 2px` primary 20% 링** —
  caret도 primary. 포커스 문법이 전부 브랜드색(초록)입니다.

### 모달 — 토큰 3개, 표현은 위임

Modal 자체 토큰이 **3개뿐입니다**(color·textColor·boxShadow). 실제 표현은
`peers: { Dialog, Card, Scrollbar }`로 **다른 컴포넌트의 테마를 참조**합니다 —
테마 트리가 컴포넌트 간 의존 그래프인 구조.

| Dialog | 값 |
|---|---|
| 폭 | **446px 단일** (max-width calc(100vw − 32px)) |
| 패딩 | **16px 28px 20px 28px** — 상하 비대칭 |
| 제목 | 18px / **500** (fontWeightStrong) |
| 진입/퇴장 | 0.2s, scale 0.9 ↔ 1 |

- **폭이 한 단계**입니다 — 446px. Semi 448·MUI 444와 같은 440대 수렴이되
  스케일 자체가 없습니다.
- 제목 굵기 500 — `strong = 500` 어긋남이 제목 계층까지 관통합니다.
- 이징이 **지속시간 대칭·곡선 비대칭**: 진입 easeOut(0,0,.2,1) /
  퇴장 easeIn(.4,0,1,1) — Material 관례의 교과서 적용입니다.
  MUI(225/195 — 시간 비대칭)와 반대 축을 조절합니다.

### 표 (`data-table`) — 3단인데 medium과 large가 같습니다

`naive-ui@2.45.0` `es/data-table/styles/_common.mjs` · `light.mjs`.

| 항목 | small | medium | large |
|---|:--:|:--:|:--:|
| `thPadding` | **8px** | **12px** | **12px (동일)** |
| `tdPadding` | 8px | 12px | **12px (동일)** |

- **medium과 large의 셀 패딩이 같습니다.** 크기 축이 3단으로 노출되는데
  실제 값은 2단뿐입니다 — 확보 표본에서 크기 단계와 값 단계가 어긋나는 사례입니다.
- 색 토큰이 **`composite(cardColor, …)` 합성식**입니다 —
  `tdColorHover` · `tdColorStriped` · `thColorSorting` 전부 카드 배경 위에
  알파를 합성해 만듭니다. 모달 안에서는 `-Modal` 접미 토큰으로 `modalColor`
  기준으로 다시 합성합니다 — **컨테이너 배경별 재계산**을 토큰 이름으로 표현합니다.
- **정렬 중인 열의 배경이 따로 있습니다** (`thColorSorting` · `tdColorSorting`) —
  헤더뿐 아니라 **본문 셀까지** 색이 바뀝니다. 확보 표본에서 정렬 열 전체를
  강조하는 사례이고, Carbon(`table-sort--active` 헤더 배경)보다 범위가 넓습니다.
- 정렬 아이콘 **15px**(`sorterSize`) · 필터 15px — 홀수 아이콘 크기입니다.
- 열 리사이즈: 손잡이 영역 **8px**(`resizableContainerSize`) 안에 표시선
  **2px**(`resizableSize`).
- 빈 상태 패딩 `48px 0`, 페이지네이션 위 여백 12px, 액션 바 패딩 8/12px.

### 내비게이션 (`layout-sider` · `menu` · `tabs` · `breadcrumb`)

| 항목 | 값 |
|---|---|
| 사이더 폭 | **272px** (`LayoutSider.props.width`) |
| 사이더 접힘 폭 | **48px** (`collapsedWidth`) |
| 접힘 방식 | `collapseMode: 'transform'` 기본 |
| 메뉴 항목 높이 | **42px** (`itemHeight`) |
| 메뉴 들여쓰기 | **32px** (`indent`) · 루트 들여쓰기 **24px** (`rootIndent`) |
| 탭(line) 패딩 | small `6px 0` · medium `10px 0` · large `14px 0` |
| 탭 간격 | **36px** (`tabGap*Line`/`*Bar`) · 세로 8px |
| 탭(card) 패딩 | 8/16 · 10/20 · 12/24px · 카드 간격 4px |
| 탭 서체 | 14 / 14 / **16px** |
| 브레드크럼 활성 굵기 | **400** (`fontWeightActive`) |

- **사이더 272px은 확보 표본에서 가장 넓은 펼침 폭**입니다
  (Ant 200 · Semi 240 · shadcn/ui·Carbon·Vuetify 256 · Cloudscape 280 — 그다음).
- **들여쓰기가 루트(24)와 하위(32)로 다릅니다.** 대부분은 단일 값입니다
  (Vuetify 16 · PrimeVue 16 · Cloudscape 20 · Carbon 32).
- 탭 간격 36px은 확보 표본 최대입니다 (Blueprint 20 · Semi 24 · Ant 32).
- **브레드크럼 활성 항목을 굵게 하지 않습니다** (`fontWeightActive: 400`) —
  현재 위치를 굵기가 아니라 색으로만 구분합니다.

### 피드백 (`message` · `notification` · `alert` · `badge`)

| 항목 | 값 |
|---|---|
| **Message 폭** | **min 420px / max 720px** |
| Message 패딩 | **10 / 20px** · 항목 간 하단 8px |
| **Message 기본 지속시간** | **3000ms** (`MessageProvider.props.duration`) |
| Message 위치 | **`'top'`** 기본 |
| Message 아이콘·닫기 | 20px / 20px(아이콘 16px) |
| **Notification 폭** | **365px** · 패딩 **16px** |
| Notification 서체 | 제목 16px · 메타·본문 **12px** |
| **Alert 패딩** | **13px** · 아이콘 24px(마진 `11px 8px 0 12px`) |
| Alert 닫기 | 20px(아이콘 16px), 마진 `13px 14px 0 0` |
| **Badge** | count 높이·행간 **18px** · dot **8px** · 서체 12px |

- **얼럿 패딩이 13px입니다** — 4·8 배수 밖의 홀수 값이고, 아이콘 마진
  `11px 8px 0 12px`도 사방이 전부 다릅니다. 광학 정렬을 리터럴로 박은 형태입니다.
- **메시지 기본 3000ms**는 5초 미만 지속시간의 코드 층 표본입니다
  (Tizen CircularUI 3000ms와 같은 값).
- **메시지와 알림이 폭 규격이 다릅니다** — 메시지는 min/max(420~720px) 가변,
  알림은 365px 고정. 같은 시스템 안에서 두 토스트류가 다른 전략을 씁니다.
- 메시지가 **상단 중앙**, 알림은 `placement` prop — Semi(상단 중앙)와 같은 계열입니다.

### 특징적 결정 (심화분)

- **버튼·입력 높이 4단 공유(22/28/34/40)** — 6px 등차
- **기본 버튼이 ghost** — hover에도 배경 없음, 색만 물듦 (굵기도 400)
- 상태 fill이 검정 알파 3단(.05/.09/.13) — 알파 산식 철학의 컴포넌트판
- 클릭 wave(바깥 파문) — Ant 혈통
- 모달 폭 446px 단일 + peers 위임 구조
- 진입/퇴장 곡선 비대칭·시간 대칭

## 특징적 결정

- **중립색 = 두 색 + 알파 표 합성** — 팔레트가 산식인 표본 유일
- `strong` = 500 — 굵기 어긋남 두 번째
- 중화권 14px 3표본째 · 행간 1.6 (느슨한 CJK)
- 컨트롤 높이 6px 등차 · 기본 프라이머리 초록

## 접근성

~~미확인.~~ → **부재 확정 (2026-08-18, 헤드리스 렌더).**

렌더링해도 이 시스템은 접근성 목표를 공개하지 않습니다. 문서 사이트를 헤드리스로
열어 확인했습니다 — 좌측 내비의 문서 항목이 Introduction · Installation ·
Usage in SFC · UMD · Fonts · Import on Demand · **Supported Platforms** ·
Common Issues · Controlled & Uncontrolled · JSX/TSX · SSR · Nuxt.js · Vitepress ·
Vite SSG · Customizing Theme · i18n · Create Themed Component ·
Potential Style Conflict · Third-Party Libraries · Changelog 뿐이고,
**접근성(无障碍/可访问性) 문서 자체가 없습니다.** 지원 범위를 다루는
"Supported Platforms"도 브라우저·Vue 버전만 말합니다 ("IE is not supported.
Modern browsers such as Edge, Firefox, Chrome, Safari are tested on the latest
2 versions"). 렌더한 문서 페이지 전체에서 `WCAG` 문자열이 **0회**입니다.
출처: https://www.naiveui.com/en-US/os-theme/docs/introduction ·
https://www.naiveui.com/en-US/os-theme/docs/supported-platforms (2026-08-18 렌더)

프레임워크형 오픈소스(shadcn·Ring UI 계열)에서 반복되는 형태로, 접근성 목표를
채택하는 제품 쪽에 떠넘기는 배치입니다.

## 참고

- 토큰: `npm pack naive-ui@2.45.0` → `es/_styles/common/`
- 컴포넌트 심화: 같은 패키지 `es/{button,input,modal,dialog}/styles/` +
  `src/styles/index.cssr.mjs` (2026-08-18)
- **Figma 킷 — 부재 확정 (2026-08-18, 헤드리스 렌더):** 문서 사이트 상단
  `Resources > Design Resources`가 제공하는 디자인 파일은 **Sketch 한 벌**입니다
  (`NaiveUI-Design-Library-en-US.sketch`, 다운로드 버튼). 사이트 전체 렌더에서
  "Figma" 문자열이 **0회** — Figma 킷은 없습니다.
  **표본에서 디자인 킷을 Sketch로만 배포하는 드문 사례**입니다.
  출처: https://www.naiveui.com/en-US/os-theme (2026-08-18 렌더,
  링크 대상 `https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library-en-US.sketch`)
- **남은 확인 사항:** ~~접근성 목표~~ ~~Figma 킷~~ (2026-08-18 — 둘 다 문서 사이트
  렌더로 부재 확정), ~~스페이싱 체계(공통 토큰에 없음 — 컴포넌트별 미조사)~~
  (2026-08-18 부분 해소 — 전역 스케일은 없고 컴포넌트별 `_common.mjs` 리터럴로
  확인: 버튼 4px 등차 패딩 등), ~~컴포넌트 목록(90+로 알려짐 — 미검증)~~
  (2026-08-18 해소 — `es/` 컴포넌트 디렉터리 **105개** 실측, 보조 컴포넌트 포함)
