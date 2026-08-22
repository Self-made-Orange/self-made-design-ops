---
name: Shoelace (→ Web Awesome)
org: Font Awesome (Cory LaViska)
coverage: partial
url: https://shoelace.style
repo: https://github.com/shoelace-style/shoelace
license: MIT
tech: [Web Components, Lit]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-18
source: "npm @shoelace-style/shoelace@2.20.1 → dist/themes/light.css"
---
<!-- lang-links -->
> [English](shoelace.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Web Components 프레임워크 — 스페이싱에 **24와 32가 둘 다 없고**(20→28→36 점프),
라운드가 3px 시작에 `circle`/`pill` 이원화, 입력 높이가 **30/40/50px**입니다.

## 토큰

```
spacing:   2 · 4 · 8 · 12 · 16 · 20 · 28 · 36 · 48 · 72   (24·32·64 없음)
font-size: 10 · 12 · 14 · 16 · 20 · 24 · 36 · 48 · 72
radius:    small 3px · medium 4 · large 8 · x-large 16 + circle 50% · pill 9999px
input-height: small 30 · medium 40 · large 50px
```

- **스페이싱 코어에서 24·32를 동시에 뺐습니다** — T셔츠 이름 10단계.
  20 다음이 28입니다. 코어 이탈 목록(Garden·Grommet·Mantine…)에 합류하며,
  역시 **이름 기반 스케일**입니다 (`tokens/scales.md`의 경향 재확인)
- 라운드 최소가 **3px** — 홀수 라운드 진영(Helios·Semi·Naive)
- `circle`/`pill` 병존 — 알약/정원 이원화 (`GLOSSARY.md`)
- 입력 높이 30px(small)은 Blueprint 기본 컨트롤과 같은 값입니다
- 다크는 `dist/themes/dark.css` 파일 분리

## 컴포넌트 심화 — (2026-08-18)

같은 `@shoelace-style/shoelace@2.20.1`의 `dist/chunks/*.js`(Lit `css` 태그드
템플릿 — 스타일이 JS 청크에 직렬화)를 파싱하고, 변수는 `dist/themes/light.css`로
끝까지 해석했습니다. 컴포넌트는 58개 디렉터리 확인.

### 버튼 (`<sl-button>`) — 입력 높이 토큰을 그대로 씁니다

| | small | medium | large |
|---|:--:|:--:|:--:|
| **min-height** | **30px** (`--sl-input-height-small`) | 40px | 50px |
| 서체 | **12px** | 14px | 16px |
| 행간 | `calc(높이 − 보더 2px)` = 28px | 38px | 48px |
| 라벨 좌우 패딩 | 12px | 16px | 20px |
| 라운드 | 4px | 4px | 4px |

- **버튼 높이 토큰이 없습니다** — `--sl-input-height-*`를 그대로 씁니다.
  버튼·입력의 30/40/50px 정합이 토큰 하나로 강제되는 구조입니다
  (Backpack은 같은 값을 두 곳에 각각 적는 방식).
- **행간 = 높이 − 보더 2px 역산** — Garden과 같은 수법입니다. 텍스트 한 줄을
  행간으로 세로 중앙 정렬하므로 패딩이 상하에 없습니다.
- **버튼 서체(12/14/16)가 입력 서체(14/16/20)보다 한 단계 작습니다** —
  `--sl-button-font-size-*`가 `--sl-font-size-*`를 한 칸 아래로 참조합니다.
- **굵기 토큰 이름이 `semibold`인데 값은 500입니다** — 대부분의 시스템에서
  500은 medium이고 semibold는 600입니다. 이름-값 어긋남 표본.
- 라운드가 **모든 크기에서 4px** — `--sl-input-border-radius-small/medium/large`
  셋 다 `--sl-border-radius-medium`(4px)을 가리키는 껍데기 3중 별칭입니다.
  토큰층의 3/4/8/16px 스케일이 컨트롤에서는 쓰이지 않습니다.
- `pill` 변형은 라운드에 **높이 토큰을 그대로** 넣고(30/40/50px), `circle`은
  50% + 폭=높이. 전환은 **50ms**(`--sl-transition-x-fast`) — 표본 최단급.
- 변형: default·primary·success·neutral·warning·danger × standard/outline + text.
  hover가 600→500 단계 이동, active는 600 복귀. disabled는 opacity 0.5.

### 입력 (`<sl-input>`)

| | small | medium | large |
|---|:--:|:--:|:--:|
| **height (고정)** | 30px | 40px | 50px |
| 서체 | 14px | 16px | 20px |
| 좌우 패딩 | 12px | 16px | 20px |
| 라운드 | 4px | 4px | 4px |

- 버튼은 min-height, 입력은 고정 height — Backpack과 같은 비대칭입니다.
- 내부 `input` 요소 높이를 `calc(높이 − 보더 2px)`로 별도 지정합니다.

### 다이얼로그·드로어 — 애니메이션이 CSS가 아니라 JS 레지스트리

| | `<sl-dialog>` | `<sl-drawer>` |
|---|---|---|
| 폭 | `--width: 31rem` (496px) | `--size: 25rem` (400px) |
| 상한 | `calc(100% − 36px)` | max 100% |
| 라운드 | 4px | — |
| 머리/본문/발 패딩 | 각 20px (`--sl-spacing-large`) | 동일 |
| 진입 | scale 0.8→1 + 페이드, **250ms ease** | 해당 방향 translate 100% 슬라이드, 250ms ease |
| z-index | 800 | 700 |

- **모든 진입/퇴장이 `setDefaultAnimation()` JS 레지스트리**(Web Animations API)에
  keyframes로 등록돼 있고, 소비자가 `setAnimation()`으로 컴포넌트·방향 단위 교체
  가능합니다. CSS keyframes 진영(Backpack·Radix)과 갈리는 표본 유일 구조입니다.
  RTL 전용 keyframes(`rtlKeyframes`)까지 레지스트리에 있습니다.
- **닫기 거부 피드백이 내장** — `denyClose`: scale 1→1.02→1 펄스 250ms.
  (overlay 클릭으로 못 닫을 때 흔들어 보여주는 동작이 기본 애니메이션 세트에 포함)
- 폭·패딩이 `--width`·`--size`·`--header-spacing` 등 **호스트 커스텀 프로퍼티**로
  노출됩니다 — 이름에 접두어가 없는 소비자 오버라이드 계약입니다.
  Backpack `--bpk-private-*`와 정반대 신호.
- 스크림이 검정이 아니라 **회색**입니다: `hsl(240 3.8% 46.1% / 33%)`.

### 특징적 결정 (심화분)

- **버튼이 입력 높이 토큰을 차용** — 컨트롤 높이 단일 출처 (30/40/50px)
- **행간 역산 세로 중앙 정렬** (높이 − 2px) — Garden 진영
- **라운드 스케일이 있으나 컨트롤은 전부 4px** — 별칭 3개가 한 값으로 수렴
- **애니메이션 JS 레지스트리** + denyClose 펄스 내장 — 표본 유일
- **`semibold` = 500** — 이름-값 어긋남
- 전환 50ms — 컨트롤 상태 전환이 표본 최단급

## 특징적 결정

- **24+32 동시 부재** — 코어 이탈 조합 표본 유일
- Web Components(Lit) 배포 — Siemens iX와 같은 진영, 래퍼는 없음
- 폰트/스페이싱 상단이 같은 값(36/48/72)으로 수렴
- Font Awesome 인수 후 Web Awesome으로 개편 진행 중 (npm 설명 기준)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @shoelace-style/shoelace@2.20.1` → `dist/themes/light.css`
- 컴포넌트 심화: 같은 패키지 `dist/chunks/`의 button·input·dialog·drawer
  스타일 청크 + `setDefaultAnimation` 등록부 (2026-08-18)
- **남은 확인 사항:** ~~컴포넌트 목록~~ (2026-08-18 해소 — 58개 디렉터리),
  Web Awesome 이후 토큰 변화, 접근성 목표
