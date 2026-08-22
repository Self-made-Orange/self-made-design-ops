---
name: Asphalt
org: Gojek (GoTo)
coverage: partial
url: https://asphalt.gojek.com
repo: null
license: UNLICENSED (npm 명시)
tech: [React]
figma_kit: 미확인
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @gojek/asphalt-web-tokens@1.14.0 → dist/index.js (DTCG 형식) · npm button@2.16.0 · textfield@2.17.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](asphalt.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Gojek의 시스템 — **코퍼스 첫 동남아 표본**입니다.
**`emboss`/`deboss`(볼록/오목) 그림자 계열**을 두고, 타이포에
**`display`와 `heading`이 서로 다른 서체**(Maison Neue Extended vs Maison Neue)를
씁니다. 스페이싱이 **`3XS`~`6XL` 12단계 T셔츠**입니다.

> **기록 정정.** 이 코퍼스는 앞서 "Asphalt는 npm 없음 확인"으로 적었습니다.
> **틀렸습니다** — `@gojek/asphalt-web-tokens` · `@asphalt-react/*` ·
> `@gojek/theme-asphalt-web-{carina,lynx}`가 공개돼 있습니다.
> Toss와 같은 유형의 실수(단일명 probe)이며 `HARVESTING.md` 교훈 9의
> 두 번째 실증입니다.

## 토큰 — DTCG 형식(`{value, type}`)

W3C Design Tokens 형식으로 배포합니다 — `type: "spacing"` · `"typography"` ·
`"boxShadow"` 같은 타입 메타가 값과 함께 들어 있습니다.
참조도 DTCG 별칭(`"{gap.2XL}"`)입니다 (PrimeVue와 같은 문법).

### 스페이싱 — `gap` 12단계 + `space.layout` 참조층

```
3XS 0.125rem(2) · 2XS 0.25(4) · XS 0.5(8) · S 0.75(12) · M 1(16) ·
L 1.25(20) · XL 1.5(24) · 2XL 1.75(28) · 3XL 2(32) · 4XL 2.5(40) ·
5XL 3(48) · 6XL 3.5(56)
```

- **12단계 T셔츠**이며 Yoga(12단계)와 함께 표본 최다입니다.
  x접두 반복(`3XS`·`6XL`) 방식으로 확장합니다 — Yoga의 `huge`/`xhuge`와
  다른 해법입니다
- 20·28px 같은 4px 중간 단계가 있어 코어값(4/8/16/24/32) 전부 보유
- **`space.layout`이 `gap`을 참조**하는 2층 구조 — 레이아웃 여백을
  별도 이름 공간에 두는 진영(Vanilla·Tegel·Pharos)

### 그림자 — `emboss` / `deboss`

```js
emboss.low.top:    innerShadow  #ffffffb3  y1 blur1   // 위쪽 흰 하이라이트
emboss.low.bottom: dropShadow   #ffffffb3  y1 blur1
deboss.low.top:    innerShadow  #1e2c6a0a  y2 blur4   // 눌린 안쪽 그림자
```

- **볼록(emboss)과 오목(deboss)을 별도 계열로 둡니다** — 표본에서
  그림자를 `elevation`(높이)로만 다루지 않고 **양각/음각 방향**으로
  나눈 유일 사례입니다
- 각 단계가 **`top`/`bottom` 두 그림자 쌍**입니다 — 위쪽 흰 하이라이트 +
  아래쪽 그림자로 입체를 만듭니다 (스큐어모픽 계열의 토큰화)
- 색이 `#1e2c6a0a`로 **파랑 기운 그림자**입니다 (순수 검정 아님)

### 타이포 — 역할마다 다른 서체

| 역할 | 서체 | 굵기 | 행간 |
|------|------|:---:|:---:|
| `display` | **Maison Neue Extended** | 700 | 1.5 |
| `heading` | Maison Neue | 600 | 1.29 |
| `code` | Fira Code | 400 | 1.56 |

- **`display`만 Extended(확장 자폭) 서체**를 씁니다 — 큰 제목에 별도
  서체 패밀리를 지정한 표본 유일 사례
- 행간이 1.29·1.56·1.63처럼 **역할마다 소수 비율**입니다
- 자간이 `heading`에서 **+0.015em(양수)**입니다 — 큰 글자에 음수 자간을 주는
  다수 관행과 반대 방향

## 컴포넌트 심화 — (2026-08-18)

컴포넌트 배포를 확인했습니다 — `@asphalt-react/*` 개별 패키지에 **CSS Modules
빌드(`dist/index.css`)**가 들어 있어 그대로 실측 가능합니다.
`button@2.16.0` · `textfield@2.17.0` · `modal@2.16.0` 기준이며,
모든 색·치수가 `var(--토큰, 폴백)` 형태라 폴백 실값까지 함께 읽힙니다.

### 버튼 — 높이 대신 패딩, 보더 몫을 두 겹으로 상쇄

높이 선언이 없고 **서체(행간 1 강제) + 상하 패딩**으로 파생됩니다.

| | L | M | S | Xs |
|---|:--:|:--:|:--:|:--:|
| 서체 (600) | 18px | 16px | 14px | 12px |
| 상하 패딩 (일반) | 19px | 16px | 13px | 12px |
| 상하 패딩 (secondary) | 17px | 14px | 11px | 10px |
| **파생 높이** | **56px** | **48px** | **40px** | **36px** |

- **보더 상쇄가 이중 구조입니다** — 기본 `--padding: calc(2px −
  var(--border-width))` 공식(주석: "보더 폭이 바뀌어도 높이 유지")에 더해,
  `:not(.secondary)` 선택자로 무보더 변형의 패딩을 2px 더 키웁니다.
  secondary만 2px 보더라 어느 쪽이든 총높이가 같습니다 — MUI(1px 차감)·
  Backpack과 같은 의도를 CSS 변수 산식으로 푼 형태.
- 변형이 **격자형**입니다: primary/secondary/tertiary/nude ×
  brand/danger/system **12조합** + link. 브랜드 그린 `#00aa13`.
- **hover 스타일 전체가 `@media (hover: hover) and (pointer: fine)` 안에**
  있습니다 — 터치 기기에서 hover 상태 자체를 배포하지 않는 모바일 퍼스트
  판단. 표본에서 hover를 미디어 쿼리로 게이트한 첫 사례입니다.
- 크기 클래스가 **12종**입니다 — 텍스트 4단 + 아이콘 전용 4단 + compact
  4단(+compactIcon). 라운드 6px(`--roundness-action-control`).
- 포커스는 `outline: 2px solid #86afff` (`--interactive-focus`) —
  파랑 전용 포커스색이 브랜드 그린과 분리돼 있습니다.
- `stick*` 클래스가 모서리를 `--roundness-sharp`(0)로 접어
  **세그먼트 조합**을 만듭니다 (Backpack `--docked`와 같은 메커니즘).

### 입력 (textfield) — 버튼과 같은 4단 사다리, hover가 있는 입력

| | L | M | S | Xs |
|---|:--:|:--:|:--:|:--:|
| **field-height** | **56px** | 48px | 40px | 36px |
| 상하 패딩 | 19px | 16px | 13px | 11px |

- **버튼과 입력이 56/48/40/36 사다리를 공유합니다** — Backpack(36/48 공유)과
  같은 정합을 4단으로. 좌우 패딩 16px, 보더 1px `#cbcfd7`, 라운드 6px,
  min-width 160px.
- **입력에 hover 상태가 있습니다** — 배경이 `#f5f7fa`로 뜹니다. active는
  보더가 `#1c3abb`(파랑)로, focus는 아웃라인 — **세 상태가 세 채널**
  (배경/보더/아웃라인)로 갈립니다.
- 본문 행간이 **1.618**입니다 — `--text-regular-*` 토큰이 황금비 행간.
  버튼(1 강제)·heading(1.5)과 역할별로 다릅니다.
- **Hero 입력 변형** — `display` 서체(Maison Neue **Extended** 700)로
  68/72/76px 높이의 대형 검색 필드를 만들고, **`--shadow-deboss-mid-top`
  내부 그림자**를 얹습니다. 토큰 층의 emboss/deboss 계열이 실제로
  "눌린 입력면"에 쓰이는 것을 확인 — 그림자 방향 계열의 용도 실증입니다.
- multiline(textarea)은 자유 리사이즈가 아니라 **extent 3단(76/92/108px)**
  명명 높이입니다. underline·nude·borderless 변형, OTP용 자간 클래스
  (`letter-spacing: 0.34~0.36rem`)도 배포에 포함.

### 모달 — 네이티브 `<dialog>`, 폭 스케일이 없음

- **폭 단계가 없습니다** — `width: fit-content`. 내용이 폭을 정하고
  상한은 뷰포트뿐입니다. Cloudscape 5단·MUI 브레이크포인트 재사용·
  Yoga 580 고정과 모두 다른 **무스케일** 접근.
- 네이티브 `<dialog>` + `::backdrop`, 스크림 `#32333acc`(≈80%) —
  Backpack V2와 같은 네이티브 진영, 알파는 더 진합니다.
- 라운드 **16px**(`--roundness-container-M`) — 액션(6px)과 컨테이너(16px)
  라운드를 **용도 이름으로 분리**한 토큰 체계가 컴포넌트에서 확인됩니다.
- 그림자 `0 2px 20px #1e2c6a14` — 토큰 층에서 본 **파랑 기운**이 모달
  그림자에도 일관됩니다.
- 내용 패딩 32px, max-height 85vh − 여백 산식, 상단 여백
  `clamp(56px, 12vh, 120px)`.
- **600px 미만에서 CSS만으로 바텀시트가 됩니다** — width 100%, bottom 0,
  하단 라운드 0. 별도 컴포넌트 없이 같은 모달이 형태를 바꿉니다.
  배포 CSS에 모바일 주소창(vh) 보정 주석이 그대로 남아 있습니다.

### 특징적 결정 (심화분)

- **hover를 `@media (hover:hover)`로 게이트** — 표본 첫 사례
- 버튼·입력 **56/48/40/36 4단 공유** + 보더 몫 이중 상쇄 산식
- 본문 행간 **1.618(황금비)**, 버튼은 1 강제
- **deboss 그림자가 Hero 입력의 "눌린 면"에 실사용** — 토큰 용도 실증
- 모달 폭 무스케일(fit-content) + CSS만으로 모바일 바텀시트 전환
- 액션 6px / 컨테이너 16px — 라운드를 용도명으로 분리

## 특징적 결정

- **첫 동남아 표본** — 문화권 우선순위 3순위 축 개통
- **`emboss`/`deboss` 양각·음각 그림자** — 표본 유일
- **`display`에 Extended 서체 별도 지정** — 표본 유일
- DTCG 형식 + 타입 메타 배포
- 12단계 T셔츠(`3XS`~`6XL`) — Yoga와 함께 최다
- 파랑 기운 그림자 색, `heading` 양수 자간
- npm에 `UNLICENSED` 명시 — 공개 배포이나 라이선스 미부여

## 접근성

미확인.

## 참고

- 토큰: `npm pack @gojek/asphalt-web-tokens@1.14.0`
- 컴포넌트: `@asphalt-react/*` (개별 분할) — `button@2.16.0` ·
  `textfield@2.17.0` · `modal@2.16.0`의 `dist/index.css`
  (2026-08-18 심화에 사용)
- 브랜드 테마: `@gojek/theme-asphalt-web-carina` · `-lynx` (미조사)
- **남은 확인 사항:** 컬러 팔레트, 컴포넌트 목록 전수(스코프 검색으로
  button·textfield·modal·popover·tab·tag·checkbox·selection·loader 등 확인,
  전체 열거는 미완), carina/lynx 테마 차이,
  라이선스 조건(UNLICENSED 표기의 의미)
