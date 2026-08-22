---
name: Kontur UI (react-ui)
org: SKB Kontur
coverage: partial
url: https://ui.kontur.ru
repo: https://github.com/skbkontur/retail-ui
license: MIT
tech: [React]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @skbkontur/react-ui@6.3.0 → lib/theming/, internal/themes/"
---
<!-- lang-links -->
> [English](kontur.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

SKB Kontur(러시아 기업용 SaaS)의 시스템 — **테마에 시맨틱 버전이 붙고
과거 버전이 모두 남습니다**(`LIGHT_THEME_6_0`~`6_3` 동시 배포).
테마가 **클래스 상속 체인**이고, 버전 문자열을 파싱하는 유틸까지 공개합니다.

## 토큰 — 버전이 붙은 테마 클래스 체인

```js
LightTheme6_3 = createTheme({
  themeClass: class LightTheme6_3 extends BasicThemeClassForExtension {},
  prototypeTheme: LightTheme6_2,           // 이전 버전을 프로토타입으로
  themeMarkers: [markThemeVersion('6.3')],
});
export var LIGHT_THEME = LIGHT_THEME_6_3;   // 최신을 기본으로
```

- **테마 버전 4개가 동시에 배포됩니다** (`6_0`·`6_1`·`6_2`·`6_3`,
  다크도 동일). 제품이 원하는 시점의 테마에 고정할 수 있습니다 —
  마이그레이션 병존 사례(Mística `-new` · Vibes 2세대 · HSDS newBrand)에서
  **버전을 명시적으로 매긴 유일 사례**입니다
- **각 버전이 이전 버전을 `prototypeTheme`으로 상속**합니다 —
  6_3은 6_2의 차이만 담습니다. 파일 크기가 1.4KB 수준인 이유입니다.
  **테마를 클래스 상속 체인으로 구성한 표본 유일 구조**입니다
- **버전 파서를 공개합니다** (`parseThemeVersion('1.0')` ·
  `parseVersionFromThemeName('LIGHT_THEME_1_0')`) — 런타임에 테마 버전을
  읽어 분기할 수 있습니다. 토큰이 아니라 **버전 관리 도구를 배포**하는 것으로,
  표본에서 유일합니다
- `themeMarkers`로 테마에 메타데이터를 표시합니다

## 값

`BasicTheme`이 값의 원본이고 버전별 테마는 차이만 담습니다 —
값 자체는 컴포넌트 단위(`getAutocompleteTheme` 등 컴포넌트별 테마 함수 다수)로
흩어져 있어 **전역 스케일 파일이 없습니다**. HSDS(컴포넌트별 JSON)와 같은
절단면이며, 이쪽은 **함수**입니다.

## 컴포넌트 심화 — (2026-08-18)

`BasicTheme`을 **node로 실제 로드해**(peer 의존성 react·warning 등 설치 후
ESM import) 값을 확정했습니다 — 프로토타입 체인을 펼치면 **플랫 키 1,462개**입니다.
전역 스케일 파일이 없다던 절단면의 실체가 이것입니다: 스케일이 아니라
`btnHeightSmall` 같은 컴포넌트 키가 전부입니다.

### 버튼 — 사이즈가 서체까지 바꿈

| | S | M | L |
|---|:--:|:--:|:--:|
| height | 32px | 40px | 48px |
| 서체 | **14px** | **16px** | **18px** |
| 행간 | 20px | 22px | 24px |
| 좌우 패딩 | 12px | 16px | 20px |
| 라운드 | 8px | 8px | 8px |
| 아이콘 / gap | 16px / 4px | 20px / 6px | 24px / 8px |

- **사이즈 3단이 높이뿐 아니라 서체·아이콘·간격까지 비례로 바꿉니다**
  (14/16/18px) — 높이만 바꾸는 다수 표본과 갈립니다.
- 라운드 토큰이 사이즈별로 분리돼 있는데 **값은 셋 다 8px** —
  분리해 두고 아직 안 가른 상태(Intergalactic 지속시간과 같은 패턴).
- **primary가 무채색입니다** — `btnPrimaryBg = #3d3d3d`(`shape-bold-accent`).
  브랜드 컬러 버튼이 아니라 잉크색 버튼이 기본 강조입니다.
- **`use="pay"` 변형이 1급 API입니다** — 결제 전용 노랑 버튼
  (`btnPayBg = #ffbe3d`). success·danger 옆에 결제가 나란히 있는,
  도메인(러시아 SaaS 결제)이 컴포넌트 변형에 박힌 표본 유일 사례입니다.

### 입력 — 버튼과 높이는 같고 라운드는 다름

| | S | M | L |
|---|:--:|:--:|:--:|
| height | 32px | 40px | 48px — 버튼과 동일 |
| 서체 | 14px | 16px | 18px |
| 좌우 패딩 | **7px** | **11px** | **15px** |
| 라운드 | **2px** | 2px | 2px |

- **버튼 8px vs 입력 2px** — 누르는 것은 둥글고 쓰는 것은 각지게.
  컴포넌트 종류로 라운드를 가르는 명시적 비대칭입니다 (Siemens iX는
  둘 다 2px, Backpack은 둘 다 8px).
- **패딩이 8/12/16에서 1px 보더를 차감한 홀수(7/11/15)입니다** —
  MUI outlined의 차감과 같은 의도인데, 여기는 **토큰 값 자체에 반영**됩니다.
- 포커스 토큰에 산식이 그대로 남아 있습니다:
  `inputFocusShadow = "0 0 0 calc(2px - 1px) …"` ·
  `inputOutlineWidth = calc(2px - 1px)` — "2px 링에서 보더 1px을 뺀다"는
  **설계 의도가 값에 문서화**된 형태입니다. 6.x부터 모든 색이
  `var(--k-color-…, 폴백)` 체계입니다.

### 모달 — 표본에서 가장 옅은 스크림

| 항목 | 값 |
|------|-----|
| 라운드 | **16px** |
| 패딩 | 상 24 / 좌우 32 / **하 40px** — 비대칭 |
| 스크림 | **rgba(0,0,0, 0.24)** |
| 폭 | 스케일 없음 — `width` prop 자유값 |

- **스크림 불투명도 0.24는 표본 최저**입니다 (다수 0.5±, Backpack 0.7).
  모달 뒤가 거의 다 보이는 좌표입니다.
- 닫기 버튼의 **클릭 영역이 4방 비대칭 토큰**입니다
  (top 30 / right 28 / bottom 22 / left 24px) — 시각 크기와 히트 영역을
  분리하고 방향별로 다르게 확장한 드문 데이터입니다.

### 테마 버전 diff (backlog 해소)

`LightTheme6_0 → 6_1 → 6_2 → 6_3`을 키 단위로 전수 비교했습니다:

- **6_0 → 6_1: 실변경 9키** — modal/sidePage/textareaCounter 배경이
  `surface-high` → `surface-base`, `mobileMediaQuery` 576 → **767.98px**,
  `mobilePopupContainerBorderRadius` 16 → 8px
- **6_1 → 6_2, 6_2 → 6_3: 값 변경 0** — 버전 마커만 올라간 **빈 버전**.
  라이브러리 마이너 버전과 테마 버전을 기계적으로 동기화한다는 증거이며,
  "버전이 붙은 테마"가 변경 유무와 무관하게 매 릴리스 발행됨을 뜻합니다.

### 특징적 결정 (심화분)

- **사이즈가 서체까지 비례** (14/16/18) — 밀도 3단이 타이포 3단
- **`pay` 버튼 변형** — 도메인이 API에 박힘, 표본 유일
- **버튼 8px / 입력 2px 라운드 비대칭**
- **calc 산식·보더 차감이 토큰 값에 그대로** — 의도의 자기 문서화
- **스크림 0.24 표본 최저** · 닫기 버튼 4방 비대칭 히트 영역
- **빈 테마 버전 2개** — 버전 동기화가 값 변경보다 우선

## 특징적 결정

- **테마에 시맨틱 버전 + 과거 버전 4개 동시 배포** — 표본 유일
- **테마가 클래스 상속 체인**(각 버전이 이전 버전 상속) — 표본 유일
- **테마 버전 파서를 공개 API로 배포** — 표본 유일
- 전역 스케일 없음 — 컴포넌트별 테마 함수로 분산
- 러시아권 첫 표본 (지역 다양성)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @skbkontur/react-ui@6.3.0` → `lib/theming/`, `internal/themes/`
- 저장소 이름은 `retail-ui`이고 패키지는 `@skbkontur/react-ui`입니다
- 컴포넌트 심화: `internal/themes/BasicTheme.js`를 node로 평가
  (+`@skbkontur/colors@2.1.9`) + `components/Modal/*` (2026-08-18)
- **남은 확인 사항:** ~~`BasicTheme` 실값~~ ~~버전 6_0~6_3의 차이~~
  (2026-08-18 해소 — 심화 절), 컴포넌트 목록(디렉터리 60여 개 확인 —
  Autocomplete·CurrencyInput·FileUploader·Kebab·Paging·SidePage 등 전수 미기록),
  전역 스페이싱·타이포 스케일은 **없음이 구조적**(1,462키 전부 컴포넌트 키)
