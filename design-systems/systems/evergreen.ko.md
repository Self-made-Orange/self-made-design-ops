---
name: Evergreen
org: Segment
coverage: partial
url: https://evergreen.segment.com
repo: https://github.com/segmentio/evergreen
license: MIT
tech: [React]
figma_kit: true
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "github segmentio/evergreen@master → src/themes/default/tokens/"
---
<!-- lang-links -->
> [English](evergreen.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Segment의 데이터 파이프라인 제품용 디자인시스템.
**토큰이 이름 없는 배열**이고, 스페이싱 토큰이 없습니다.

## 토큰

### 라운드 — 이름 없는 3단 배열

```js
radii[0] = '0px'
radii[1] = '4px'
radii[2] = '8px'
```

**토큰 이름이 없습니다.** 배열 인덱스로만 참조합니다.
`xs`·`sm`·`md` 같은 명명도, `radius-100` 같은 번호도 없습니다.

3단계로 전부 8px 이하입니다 — Helios(3·5·6·8px)·Lightning(2·4·8px)과 같은 각진 계열입니다.

출처: `src/themes/default/tokens/radii.js`

### 타이포그래피

| 항목 | 값 |
|------|-----|
| 크기 | 10 · 12 · 14 · 16 · 18 · 20 · 24 · 32px |
| 행간 | 16 · 18 · 20 · 24 · 28 · 32 · 40px |
| 본문 기본 | **14px** |
| 제목 기본 | 16px |
| 캡션 | 10px |

크기·행간도 **배열**입니다. 그 위에 `body` / `heading` / `caption` 별칭만 이름으로 둡니다.

**10px 크기가 있습니다.** 표본에서 가장 작은 본문급 값이며, Seed Design도 10px을 갖습니다.

### 자간 — 유일하게 px 단위이고 `wide`가 있습니다

| 토큰 | 값 |
|------|-----|
| `tightest` | **-0.2px** |
| `tighter` | -0.07px |
| `tight` | -0.05px |
| `normal` | 0 |
| **`wide`** | **+0.6px** |

두 가지가 표본에서 유일합니다.

- **자간을 px로 정의합니다.** Backpack·Seed Design은 `em`, Apple·Material은 소수 px입니다.
  px 고정이므로 글자 크기가 커져도 자간이 비례하지 않습니다.
- **`wide`(양수)를 제공합니다.** Backpack·Seed Design은 음수만 둡니다.

`-0.07px` · `-0.05px` 같은 100분의 1 단위 값을 씁니다.

### 서체

| 계열 | 기본 |
|------|------|
| Display | SF UI Display → system stack |
| UI | SF UI Text → system stack |
| Mono | SF Mono → Monaco · Inconsolata · Fira Mono … |

**Display와 UI를 분리합니다.** 제목용과 인터페이스용 서체를 다르게 둡니다.

### 스페이싱

**없습니다.** `src/themes/default/tokens/` 디렉터리 구성이 이렇습니다.

```
colors.js  fills.js  index.js  intents.js
radii.js   shadows.js  typography.js  z-indices.js
```

**스페이싱 파일이 존재하지 않습니다.** 여백은 컴포넌트에 직접 들어 있습니다.

### 특이한 토큰 계열

| 파일 | 내용 |
|------|------|
| `intents.js` | 의도(success·warning·danger·none) 단위 색 묶음 |
| `fills.js` | 배경 채움 전용 색 |
| `z-indices.js` | z-index 스케일 |

**`intents`를 별도 계열로 둡니다.** 상태색을 `color` 안이 아니라 독립 개념으로 분리합니다.

## 컴포넌트

~~미확인.~~ `src/themes/default/components/`에 컴포넌트별 테마 **38개 파일**이
있습니다. → 아래 심화 절 (2026-08-18).

## 컴포넌트 심화 — (2026-08-18)

GitHub `segmentio/evergreen@master`(커밋 `9b774ae`, 2025-06-11, v7.1.9)의
`src/themes/default/components/*.js`와 `src/dialog/src/Dialog.js` ·
`src/overlay/src/Overlay.js`에서 실측했습니다 (npm 배포본 토큰 누락 —
HARVESTING 교훈 5 — 이라 컴포넌트 층도 GitHub `src/`에서 읽었습니다).

### 버튼 (`components/button.js`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **height** | **24px** | 32px | 40px |
| 좌우 패딩 | 12px | 16px | 20px |
| **min-width** | **24px (= 높이)** | 32px | 40px |
| 서체 | 12px (`fontSizes.1`) | **12px** | 14px (`fontSizes.2`) |
| 라운드 | 4px (`radii.1`) | 4px | 4px |

- `line-height: 높이` 단일행 정렬. **min-width = 자기 높이** — 정사각 하한으로
  아이콘 전용 버튼을 보장하는 방식이며, Polaris(`min-width`=높이,
  `patterns/button.md`)와 같은 결정입니다.
- **medium(32px) 버튼까지 서체가 12px입니다** — 본문(14px)보다 작습니다.
  large만 14px. 컨트롤 서체 < 본문 서체 구조.
- 전환이 **`box-shadow 80ms ease-in-out` 하나뿐**입니다 — 색·배경 전환 없이
  포커스 링만 애니메이션합니다. 80ms는 표본 하위권 지속시간입니다.
- 변형: primary / default(흰 배경+보더) / minimal(투명) / destructive
  + intent(success·danger)가 색 키(blue→green/red)를 통째로 치환합니다 —
  `intents` 토큰 계열(위 절)이 버튼 색 산정에 직접 들어오는 구조.

### 입력 (`components/input.js`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **height** | 24px | 32px | 40px |
| 좌우 패딩 | 12px | 12px | 12px |
| 서체 | 12px | 12px | 12px (행간만 16→18px) |
| 라운드 | 4px | 4px | 4px |
| 보더 | 1px `gray400` | 동일 | 동일 |

- **버튼과 같은 24/32/40px 3단 공유** — Backpack(36/48 2단 공유)과 같은
  정합 패턴, 단계 수만 다릅니다.
- **좌우 패딩 12px 고정** — 크기 변형이 높이만 바꾸고 패딩은 안 바꿉니다.
  높이별 패딩을 두는 다수 진영(EUI·MUI 등)과 갈립니다.
- 서체도 12px 고정 — large는 크기 대신 행간만 18px로 키웁니다.
- focus: `shadows.focusRing` + 보더 `blue200` / invalid: 보더 `red500`.
- 라벨: `FormField`가 별도 블록 라벨(`Label` size 400 = 14px/18px ·
  굵기 500 semibold) + `marginBottom: 8px`. 플로팅 아님.
  `Label`의 baseStyle은 Display 서체지만 **size 400이 UI 서체로 덮어씁니다** —
  기본 조합에서는 라벨도 UI 서체입니다.

### 다이얼로그 (`dialog/src/Dialog.js` + `components/dialog-*.js`)

| 항목 | 값 |
|------|-----|
| 폭 | **기본 560px 단일** (`width` prop 자유값 — 단계 없음) |
| 상한 | `calc(100% − 16px×2)` · 상하 여백 `topOffset: 12vmin` |
| 라운드 | **8px** (`radii.2` — 스케일 최상단) |
| 그림자 | elevation 4 (5단 스케일 최상단) |
| 진입 | scale(0.8)→1 + 페이드, **200ms `deceleration (0,0,0.2,1)`** |
| 퇴장 | 역방향, 200ms `acceleration (0.4,0,1,1)` |
| 스크림 | **rgba(67, 90, 111, 0.7)** (`colors.overlay`) · 페이드 **240ms** |
| 패딩 | 헤더 `32 32 24` · 본문 상하 8/좌우 32 · 푸터 `24 32 32` |

- **폭 단계가 없습니다** — 560px 기본값 하나에 prop으로 자유값을 받습니다.
  Cloudscape 5단·Braid 4단과 대극이고, 같은 "단일 기본값" 진영인
  Mantine과 유사합니다.
- **이징 이름이 Material 용어 그대로입니다** (`deceleration`/`acceleration` =
  Material 표준 곡선). 토큰화 없이 컴포넌트 파일마다 상수로 재선언합니다.
- **패널 200ms vs 스크림 240ms** — 지속시간이 컴포넌트별 하드코딩 상수라
  (Dialog 200 · Overlay/SideSheet/Toast/CornerDialog 240) 진입 시
  스크림이 패널보다 40ms 늦게 끝납니다. 모션 토큰 부재의 전형적 드리프트.
- 스크림이 검정이 아니라 **청회색 70%**입니다 — EUI(rgba(72,89,117,.7))와
  거의 같은 값입니다. 데이터 도구 두 표본의 수렴.

### 특징적 결정 (심화분)

- **버튼·입력이 24/32/40px 3단 공유** + min-width = 높이
- **medium까지 12px 컨트롤 서체** — 본문 14px보다 작음
- **입력 패딩·서체가 크기 변형과 무관하게 고정** (높이·행간만 변동)
- **다이얼로그 폭 단계 없음** (560px 기본 단일)
- **모션 값이 전부 파일별 하드코딩** — 200/240ms 불일치, Material 곡선 차용

## 특징적 결정

- **토큰에 이름이 없습니다.** 라운드·크기·행간이 전부 배열이고 인덱스로 참조합니다.
  표본에서 유일합니다. 단계를 추가·삭제하면 **기존 인덱스가 밀려 깨집니다.**
- **스페이싱 토큰이 없습니다.** Apple HIG · Material 3 · Seed Design과 함께 넷입니다.
- **자간을 px로, 그리고 양수까지 둡니다.** 두 특성 모두 표본에서 유일합니다.
- **Display / UI 서체를 분리합니다.** 대부분의 시스템은 단일 서체 스택을 씁니다.
- **`intents`를 독립 계열로 둡니다.** 상태색을 색 팔레트에서 떼어냈습니다.
- **본문이 14px입니다.** Ant Design · Material 3 · Helios와 같은 계열입니다.

## 접근성

미확인.

## 참고

- 저장소: https://github.com/segmentio/evergreen
- 패키지: `evergreen-ui` (컴포넌트 패키지에 테마 동봉)
- 토큰: `src/themes/default/tokens/*.js`
- 컴포넌트 심화: GitHub `segmentio/evergreen` 커밋 `9b774ae`(2025-06-11, v7.1.9) →
  `src/themes/default/components/{button,input,dialog-*}.js` ·
  `src/dialog/src/Dialog.js` · `src/overlay/src/Overlay.js` ·
  `src/form-field/src/FormField*.js` (2026-08-18)
- **주의:** npm 패키지의 `esm/`에는 컴포넌트만 있고 테마 토큰은 `src/`에 있습니다.
  GitHub에서 읽는 것이 확실합니다.
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github segmentio/evergreen → `LICENSE` (npm `evergreen-ui@7.1.9` 메타와 일치)
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `evergreen.segment.com` 리소스 목록의 "Evergreen Figma Library"
