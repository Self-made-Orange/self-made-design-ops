---
name: Ant Design
org: Ant Group
coverage: full
url: https://ant.design
repo: https://github.com/ant-design/ant-design
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm antd@6.6.1 → lib/theme/themes/seed.js (6.6.0에서 재검증 — seed 동일), lib/theme/themes/shared/genSizeMapToken.js · es/{table,menu,tabs,breadcrumb,layout,message,notification,alert,badge}/style/index.js (표·내비·피드백 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](ant-design.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Ant Group의 엔터프라이즈 제품용 디자인시스템. 중화권에서 가장 널리 쓰이며,
**모든 토큰을 소수의 시드 값에서 알고리즘으로 파생**시키는 구조가 특징입니다.

## 토큰

### 시드 토큰

전체 시스템이 이 값들에서 계산됩니다.

| 시드 | 값 |
|------|-----|
| `sizeUnit` | 4 |
| `sizeStep` | 4 |
| `fontSize` | 14 |
| `borderRadius` | 6 |
| `lineWidth` | 1 |
| `controlHeight` | 32 |
| `sizePopupArrow` | 16 |

출처: `antd@6.6.1` → `lib/theme/themes/seed.js`

### 스페이싱 — 시드에서 파생

```js
sizeXXS: sizeUnit * (sizeStep - 3)   // 4
sizeXS:  sizeUnit * (sizeStep - 2)   // 8
sizeSM:  sizeUnit * (sizeStep - 1)   // 12
size:    sizeUnit * sizeStep         // 16
sizeMS:  sizeUnit * sizeStep         // 16
sizeMD:  sizeUnit * (sizeStep + 1)   // 20
sizeLG:  sizeUnit * (sizeStep + 2)   // 24
sizeXL:  sizeUnit * (sizeStep + 4)   // 32
sizeXXL: sizeUnit * (sizeStep + 8)   // 48
```

기본 시드 기준 실값: **4, 8, 12, 16, 20, 24, 32, 48**

출처: `lib/theme/themes/shared/genSizeMapToken.js`

### 패딩·마진은 별도 스케일이 아닙니다

`padding*`과 `margin*`은 모두 `size*`를 그대로 참조하는 별칭입니다.

```
paddingXXS → sizeXXS    marginXXS → sizeXXS
padding    → size       margin    → size
paddingLG  → sizeLG     marginLG  → sizeLG
```

다만 **콘텐츠 패딩 계열은 한 단계씩 어긋나게 매핑**돼 있습니다.

| 토큰 | 참조 | 값 |
|------|------|-----|
| `paddingContentHorizontal` | `sizeMS` | 16 |
| `paddingContentVertical` | `sizeSM` | 12 |
| `paddingContentHorizontalLG` | `sizeLG` | 24 |
| `paddingContentVerticalLG` | `sizeMS` | 16 |
| `paddingContentHorizontalSM` | `size` | 16 |
| `paddingContentVerticalSM` | `sizeXS` | 8 |

가로 패딩이 세로보다 항상 한 단계 큽니다.

출처: `lib/theme/util/alias.js`

### 라운드

시드 `borderRadius: 6`. **4도 8도 아닌 6입니다.**

### 타이포그래피

기본 `fontSize: 14`. 16px을 기본으로 두는 서구권 시스템들과 갈립니다.

### 컬러

미확인 — `themes/default/colorAlgorithm.js`에 알고리즘 기반 팔레트 생성 로직이 있습니다.

## 컴포넌트

미확인 — 문서 사이트 접근 차단.

## 컴포넌트 심화 — 표·내비·피드백 (2026-08-18)

`antd@6.6.1`의 컴포넌트 토큰 생성 함수(`es/*/style/index.js`의
`prepareComponentToken`) 실측입니다. Ant은 CSS-in-JS라 배포 CSS가 없고,
**컴포넌트 토큰이 시드에서 파생되는 식**으로만 존재합니다.

### 표 (`es/table/style/index.js`) — 가로를 더 많이 줄입니다

| 크기 | 셀 세로 패딩 | 셀 가로 패딩 |
|---|:--:|:--:|
| 기본 | `padding` = **16px** | `padding` = **16px** |
| middle | `paddingSM` = **12px** | `paddingXS` = **8px** |
| small | `paddingXS` = **8px** | `paddingXS` = **8px** |

- **middle에서 가로가 세로보다 크게 줄어듭니다** (16→8 vs 16→12) —
  Cloudscape·Semi의 "세로만 줄이고 가로는 유지"와 **정반대 방향**입니다.
  확보 표본에서 밀도를 올릴 때 가로를 더 줄이는 유일 사례입니다.
- **셀 서체는 3단계 전부 `fontSize`(14px)로 동일**합니다
  (`cellFontSize` = `cellFontSizeMD` = `cellFontSizeSM`) — Polaris가 데스크톱에서
  14→13px로 줄이는 것과 대비됩니다.
- 고정 열·고정 헤더 `z-index: 2` (`zIndexTableFixed` 리터럴).
- 선택 열 폭이 `controlHeight`(**32px**)입니다 — 버튼 높이를 그대로 씁니다.
- 헤더 라운드가 `borderRadiusLG`(8px), 스크롤바 라운드는 **100px**.
- 정렬 상태가 색 토큰 3벌입니다 — `headerSortActiveBg` · `headerSortHoverBg` ·
  **`bodySortBg`**. Naive UI와 같이 **본문 셀까지** 정렬 강조가 미칩니다.

### 내비게이션 (`layout` · `menu` · `tabs` · `breadcrumb`)

| 항목 | 값 |
|---|---|
| Sider 폭 | **200px** (`Sider.props.width`) |
| Sider 접힘 폭 | **80px** (`collapsedWidth`) |
| Sider 배경 | **`#001529` 하드코딩** (`siderBg`) · 트리거 `#002140` |
| Header 높이 | `controlHeight × 2` = **64px** · 좌우 패딩 `controlHeightLG × 1.25` = **50px** |
| 트리거 높이 | `controlHeightLG + marginXXS × 2` = **48px** |
| Menu 항목 높이 | `controlHeightLG` = **40px** · 항목 간 여백 `marginXXS`(4px) |
| Menu 접힘 폭 | `controlHeightLG × 2` = **80px** · 아이콘 14 → 접힘 16px |
| Menu 드롭다운 폭 | **160px** |
| Tabs 카드 높이 | SM `controlHeight`(32) · 기본 `controlHeightLG`(40) · LG **48px** |
| Tabs 항목 간격 | **32px** (`horizontalItemGutter`) · 패딩 `paddingSM`(12px) / 0 |
| Breadcrumb 구분자 여백 | `marginXS` = **8px** |

- **접힘 폭 80px이 확보 표본에서 가장 넓습니다** (shadcn/ui·Carbon·Naive 48 ·
  Cloudscape 52~54 · Vuetify 56 · Semi 60). 아이콘 16px 기준으로 좌우 32px씩입니다.
- **사이더 배경이 `#001529` 리터럴입니다** — 시드·알리아스 토큰을 거치지 않고
  컴포넌트 토큰에 색을 박아 둡니다. 라이트 테마에서도 사이더는 어둡습니다
  (별도 `lightSiderBg`가 있어야 흰 사이더가 됩니다). Cloudscape가
  `top-navigation` 컨텍스트로 182개 토큰을 덮어 같은 결과를 내는 것과
  **같은 목적, 정반대 구현**입니다.
- 탭 카드 패딩이 **높이에서 역산됩니다** —
  `(cardHeight − fontHeight) / 2 − lineWidth`. 값을 적지 않고 식으로 둡니다.
- `controlHeightLG`에 XL이 없어 **LG 카드 높이는 `controlHeightLG + 8`로
  직접 씁니다** (소스 주석이 이유를 밝힙니다).

### 피드백 (`message` · `notification` · `alert` · `badge`)

| 항목 | 값 |
|---|---|
| **Message 지속시간** | **3초** (`DEFAULT_DURATION`) · 상단 오프셋 8px |
| Message 폭 | **`max-content`** (고정 폭 없음) |
| Message 패딩 | `(controlHeightLG − fontSize × lineHeight) / 2` / `paddingSM`(12px) |
| **Notification 폭** | **384px** |
| **Notification 지속시간** | **4.5초** · 기본 위치 **`topRight`** |
| Notification 패딩 | `paddingMD`(20px) / `paddingContentHorizontalLG`(24px) |
| Notification 진행바 | 높이 **2px**, `linear-gradient(90deg, …)` |
| Notification 화면 여백 | `marginLG` = 24px |
| **Alert 패딩** | 기본 `paddingContentVerticalSM` / **12px 고정** · 설명형 20 / 24px |
| Alert 라운드 | `borderRadiusLG` = 8px · 설명형 아이콘 `fontSizeHeading3` |
| **Badge** | 높이 `round(fontSize × lineHeight) − 2 × lineWidth` = **20px** · dot 6px |
| Badge 서체 | **12px / 굵기 `normal`** · 좌우 패딩 `paddingXS`(8px) |

- **얼럿 가로 패딩만 12px 리터럴입니다** — 소스 주석이 `// Fixed value here.`로
  못 박아 두었습니다. 나머지는 전부 시드 파생인 시스템에서의 예외입니다.
- **배지 서체 굵기가 `normal`(400)입니다** — 확보 표본에서 유일합니다
  (Chakra·Vuetify medium/500 · PrimeVue 700 · EUI medium).
- **지속시간이 컴포넌트마다 다릅니다** — message 3초 / notification 4.5초.
  둘 다 5초 미만이고, 문서 층에서 관측된 "5초 하한"과 어긋나는 코드 층 값입니다.
- 알림에 **진행 바(2px 그라디언트)** 가 규격으로 있습니다 — 남은 시간을
  시각화하는 축을 토큰으로 둔 표본입니다.

## 특징적 결정

- **스케일이 데이터가 아니라 함수입니다.** `sizeUnit`과 `sizeStep` 두 값만 바꾸면 전체 스페이싱이
  재계산됩니다. Carbon이 타이포에만 적용한 방식을 Ant Design은 시스템 전반에 적용했습니다.
  테마 커스터마이징이 강력해지는 대신, 스케일의 개별 단계를 손보기는 어렵습니다.
- **기본 폰트 크기가 14px입니다.** 16px 기본인 서구권 시스템과 다릅니다.
  Material 3 Body Medium(14px)·Helios(13~14px)와 같은 값입니다.
  **다국어 대응 시 이 차이가 레이아웃 전반에 영향을 줍니다.**
- **라운드가 6px입니다.** 4px(Fluent medium)이나 8px 같은 흔한 값 대신 6을 씁니다.
  스페이싱 스케일(4의 배수)과 라운드가 의도적으로 분리돼 있습니다.
- **가로·세로 콘텐츠 패딩을 비대칭으로 둡니다.** 가로가 항상 한 단계 큽니다.
- **`size`와 `sizeMS`가 같은 값(16)입니다.** 별칭 관계입니다.
  실사용 시 둘 중 무엇을 써야 하는지 혼동 요인입니다.

## 접근성

미확인.

## 참고

- 저장소: https://github.com/ant-design/ant-design
- 패키지: `antd`
- 토큰 로직: `lib/theme/themes/seed.js`, `lib/theme/themes/shared/genSizeMapToken.js`
