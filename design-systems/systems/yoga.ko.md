---
name: Yoga
org: Wellhub (구 Gympass)
coverage: partial
url: https://gympass.github.io/yoga
repo: https://github.com/gympass/yoga
license: MIT
tech: [React, React Native, styled-components]
figma_kit: false
tokens_format: [JS]
a11y_target: null
platform: [web, mobile]
domain: consumer
verified: 2026-08-18
source: "npm @gympass/yoga-tokens@3.9.0 → esm/global/*.js"
---
<!-- lang-links -->
> [English](yoga.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Wellhub(피트니스 구독)의 시스템 — **브레이크포인트가 폭·마진·거터 3값 묶음**이고,
엘리베이션이 **플랫폼별 파일**(`.ios`/`.android`)로 갈리며,
크기 이름이 `huge`·`xhuge`까지 **12단계 T셔츠**입니다.

## 토큰

### 브레이크포인트가 레이아웃 3값 묶음

```js
xxs: { width: 0,    margin: 20, gutter: 16 }
lg:  { width: 1024, margin: 71, gutter: 24 }
xxxl:{ width: 1600, margin: 71, gutter: 24 }
```

- **브레이크포인트마다 마진·거터가 함께 정의됩니다** — 표본 다수는
  브레이크포인트를 폭 하나로 두는데, Yoga는 **그 폭에서 쓸 레이아웃 여백까지
  묶어 배포**합니다. USWDS(브레이크포인트=스페이싱 파생)와 반대 방향으로
  같은 결합을 만든 형태입니다
- **`margin: 71px`** — 8·4배수가 아닌 값입니다 (lg 이상 전 구간).
  71은 표본에서 유일한 종류의 수치이며 근거는 소스에 없습니다
- 8단계 xxs~xxxl (0·360·480·768·1024·1200·1366·1600) — 1366(노트북 실측폭) 포함

### 스케일 — 12단계, `huge` 접미

```
spacing:  0 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 80
fontSize: 10 · 12 · 14 · 16 · 20 · 24 · 32 · 40 · 48 · 60
lineHeight: 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 60 (고정 px)
radii: sharp 0 · xsmall 4 · small 8 · regular 16 · circle 9999
```

- **T셔츠 이름이 `huge`·`xhuge`로 확장됩니다** — xxxlarge 다음을
  x접두 반복이 아니라 새 단어로 넘깁니다. 12단계 T셔츠는 표본 최다
  (`GLOSSARY.md`의 T셔츠 확장 한계에 대한 실제 대응 사례)
- **행간이 크기와 같은 개수의 별도 스케일**입니다 (둘 다 10단계, 고정 px) —
  조합은 사용처가 정합니다
- 라운드에 **`regular`가 최대 사각 단계**(16)입니다 — large가 아니라 regular로
  끝나는 이름 (`GLOSSARY.md` 이름 서열 계열)
- 굵기 `light 300`부터 — 300을 두는 시스템은 소수입니다

### 엘리베이션이 플랫폼별 파일

```
elevations.js · elevations.ios.js · elevations.android.js
```

**그림자를 웹/iOS/안드로이드 세 파일로 나눠 배포합니다** — RN 지원 시스템의
필연이지만, 표본에서 엘리베이션을 플랫폼별로 분기한 것은 Yoga뿐입니다
(TDS는 RN 패키지를 따로 두고 그림자를 분기하지 않았습니다).
`elevate()` 함수로 색에서 생성합니다.

## 컴포넌트 심화 — (2026-08-18)

컴포넌트는 `@gympass/yoga@7.144.4`(웹·RN 겸용, styled-components)에서 실측했습니다.
컴포넌트마다 `*.theme.js`가 토큰 참조로 치수를 정의하므로,
`yoga-tokens@3.9.0` 실값으로 끝까지 해석해 적었습니다.
컴포넌트 디렉터리는 39개(Theme 포함)이며 웹/네이티브 구현이 `web/`·`native/`로 병존합니다.

### 버튼 — 전부 필(pill), 상태는 알파 산식

| | 기본 | small |
|---|:--:|:--:|
| **height** | **48px** | 32px |
| 좌우 패딩 | 24px | 16px |
| 라운드 | **9999 (`radii.circle`)** | 동일 |
| 서체 | 16px / 24px / **500** | 14px / 16px |
| 아이콘 | 24px (여백 8px) | 16px |

- **모든 버튼이 필입니다** — 사각 라운드 스케일(4·8·16)을 건너뛰고
  `radii.circle`(9999)로 직행합니다. 버튼·입력이 라운드를 공유하는
  다수 진영(Backpack 8px 등)과 달리 **버튼만 형태가 다릅니다** (입력은 8px).
- **hover가 배경을 바꾸지 않습니다** — `box-shadow: 0 4px 8px`에
  **자기 배경색의 45% 알파** 글로우만 켜집니다. Bolt(리프트+글로우)와 같은
  계열인데 Yoga는 이동 없이 그림자만입니다.
- **pressed가 같은 색의 75% 알파입니다** — `hexToRgb(primary, 0.75)`.
  상태 팔레트를 따로 두지 않고 **알파 산식으로 상태색을 생성**합니다
  (SmartHR 상태색 함수 계열의 최소형).
- 크기 2단(48/32) — Backpack(36/48)과 같은 2단 진영, 기준값은 48로 더 큽니다.
- 전환은 `transition: all 0.2s` 리터럴 — 모션 토큰(아래)을 쓰지 않습니다.

### 입력 — 너비까지 고정(320px)한 Material 노치 플로팅 라벨

| 항목 | 값 |
|---|---|
| **width** | **320px 고정** |
| height | 52px |
| 패딩 | 사방 16px |
| 보더 · 라운드 | 1px · 8px (`radii.small`) |
| 서체 | 14px / 400 / 행간 20px |

- **기본 너비가 320px 고정값입니다** — 표본 대부분은 부모 폭을 따르거나
  min-width만 둡니다(Asphalt 160, Pluralsight 192). 완성 치수를 박은 드문 사례.
- 라벨이 14→12px로 줄며 **translateY(−24px)** (`height/2 − 2` 산식으로 파생)
  올라가고, `<legend>`의 `max-width`를 0→`max-content`로 전환해
  **보더에 노치를 뚫습니다** — MUI와 같은 Material 혈통 플로팅 라벨을
  fieldset/legend로 구현한 형태입니다.
- 라벨 전환이 **500ms `cubic-bezier(0, 0.75, 0.1, 1)`** — 버튼(200ms)의
  2.5배로, 시스템에서 가장 긴 전환이 라벨 플로팅입니다.

### 다이얼로그 — 폭 1단(580px), 스크림이 자주 기운

- 폭 **580px 단일 단계**(변형 없음) · min-height 160px · 라운드 16px
  (`radii.regular` — **사각 최대 단계를 그대로 씁니다**).
- 패딩: 상단 40px(닫기 버튼이 있으면 24px), 좌우·하단 32px.
- **스크림이 `rgba(35, 27, 34, 0.48)`** — 순검정이 아니라
  **#231B22(자주 기운 다크)의 48%**입니다. 무채색 스크림 다수 진영과 갈립니다.
- **진입 애니메이션이 없습니다** — keyframes·transition 0건.
  FocusLock + portal + 첫 포커스 이동만 합니다.
- 닫기 버튼 40px(spacing.xxlarge) 컨테이너에 20px(spacing.medium) 아이콘.

### 모션 토큰이 이름 없는 배열

```js
duration: [200, 500]
timing: [[0, 0.75, 0.1, 1]]
```

소비가 `transition.duration[1]` · `transition.timing[0]` **인덱스 접근**입니다 —
모션을 토큰화한 표본 중 유일한 무명 배열형이며, 각 슬롯의 용도가 소스에
없습니다 (실사용 관찰: 500ms가 라벨 플로팅, 버튼은 토큰 대신 0.2s 리터럴).
이징을 토큰화하고도 리터럴이 병존하는 점은 Backpack(무토큰+리터럴)과
다른 방식으로 같은 드리프트입니다.

### 특징적 결정 (심화분)

- **버튼 전부 필(9999)** + hover는 자기색 글로우, **pressed는 75% 알파** —
  상태색을 팔레트가 아니라 알파 산식으로
- **입력 기본 너비 320px 고정** — 표본 드묾
- **fieldset/legend 노치 플로팅 라벨**, 500ms 전용 커브
- 다이얼로그 스크림 `rgba(35,27,34,.48)` — 자주 기운 브랜드 스크림
- **모션 토큰이 무명 배열** (`duration[1]` 식 인덱스 소비) — 표본 유일

## 특징적 결정

- **브레이크포인트 = 폭 + 마진 + 거터 묶음** — 표본 유일
- `margin: 71px` — 격자 외 값
- **12단계 T셔츠**(`huge`/`xhuge`) — 표본 최다 단계
- 엘리베이션 플랫폼별 파일 3벌 — 표본 유일
- 라운드 최대 사각 단계 이름이 `regular`
- `[web, mobile]` 양 플랫폼 (RN 동시 지원)

## 접근성

~~미확인~~ → **부재 확정 (2026-08-18, 헤드리스 렌더 확인).**

렌더링해도 Yoga는 **접근성 문서를 공개하지 않습니다.**
문서 사이트 최상위가 Guidelines · Components · System **3개뿐**이고,
그 중 Guidelines의 사이드바는 **Design Tokens 한 묶음**입니다 —
Borders · Breakpoints · Colors · Elevations · Font-Sizes · Font-Weights ·
Fonts · Line-Heights · Shapes · Spacing · Typography.
접근성 항목 자체가 없습니다.

렌더 확인 경로 (각 페이지 `WCAG`·`accessib` 문자열 0회):

- https://gympass.github.io/yoga/ — 랜딩. 3개 섹션 소개뿐
- https://gympass.github.io/yoga/guidelines/tokens/borders — Guidelines
  사이드바 전개 상태
- https://gympass.github.io/yoga/system/getting-started/ — System 섹션

랜딩의 Guidelines 설명이 "Design principles, practical patterns and high
quality design resources"인데, 실제 하위는 **토큰 레퍼런스뿐**입니다 —
선언과 내용물이 어긋난 사례입니다. **C 분류 확정**입니다.

### Figma 킷 부재 — 렌더 확인 (2026-08-18)

`figma_kit: false`의 근거입니다. 위 3개 페이지 렌더 결과 모두
**`figma` 문자열이 0회**입니다. 랜딩이 말하는 "high quality design
resources"에 해당하는 다운로드·링크가 문서 사이트에 없습니다.

## 참고

- 토큰: `npm pack @gympass/yoga-tokens@3.9.0` → `esm/global/`
- 컴포넌트: `@gympass/yoga@7.144.4` → `esm/{Button,Input,Dialog}/`
  `*.theme.js` + `web/*.js` (2026-08-18 심화에 사용)
- 문서 사이트: https://gympass.github.io/yoga (헤드리스 렌더, 2026-08-18 —
  Guidelines는 토큰 레퍼런스뿐)
- **남은 확인 사항:** 컬러 팔레트, ~~컴포넌트 목록~~ (2026-08-18 해소 —
  디렉터리 39개, 심화 절), ~~Figma 킷~~·~~접근성 목표~~ (2026-08-18 렌더 —
  둘 다 부재 확정, 위 절), `71px` 마진의 근거, 다크 모드
