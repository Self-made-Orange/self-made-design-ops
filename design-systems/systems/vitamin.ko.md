---
name: Vitamin
org: Decathlon
coverage: partial
url: https://www.decathlon.design
repo: https://github.com/Decathlon/vitamin-web
license: Apache-2.0
tech: [CSS, Web Components, React, Vue]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @vtmn/css@3.0.2 → dist/index.css + dist/index-base10.css"
---
<!-- lang-links -->
> [English](vitamin.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Decathlon의 시스템 — **rem 기준 문제를 빌드 두 벌로 해결합니다.**
`index.css`(루트 16px)와 `index-base10.css`(루트 10px)가 **같은 px 결과**를
내도록 rem 값만 다르게 배포된 표본 유일 사례입니다.

## 토큰

### rem 기준 두 벌 배포

| 토큰 | `index.css` (16px 루트) | `index-base10.css` (10px 루트) | 결과 |
|------|:---:|:---:|:---:|
| `--vtmn-spacing_1` | `0.25rem` | `0.4rem` | **둘 다 4px** |

**루트 폰트 크기를 재정의하는 프로젝트(10px 관행)를 위한 별도 빌드**입니다.
Strapi(62.5% 전제를 값에 내장) · Odyssey(14px 전제) · Stacks(13px 기준)가
**한 벌만 배포해 이식 사고를 남기는 자리**에서, Vitamin은 두 벌을 냅니다 —
`GLOSSARY.md`의 rem 함정에 대한 **유일한 구조적 해결책**입니다.

### 스케일

```
spacing: 0 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56 · 64 (rem 표기, 서수 이름 _0~_10)
radius:  100:4 · 200:8 · 300:12 · 400:16 · 500:20 · 600:24 · 700:32 · 800:48
```

- 스페이싱은 코어값 준수(4/8/16/24/32) — ~~48 이상 없음~~
  **2026-08-18 정정: `_8`(48)·`_9`(56)·`_10`(64)이 존재합니다** — `dist/index.css`
  전문 재추출 결과 11단계 (`_0`~`_10`). 초기 기록은 `_7`에서 잘렸습니다
- **라운드가 100 단위 8단계**입니다 (20 포함). ~~스페이싱(7단계)보다 촘촘~~
  스페이싱이 11단계로 확인되며 촘촘 관계는 성립하지 않습니다 (2026-08-18 정정)
- 이름에 **밑줄 구분자**(`spacing_1`)를 씁니다 — 표본 다수의 하이픈과 다름

## 컴포넌트 심화 — (2026-08-18)

같은 `@vtmn/css@3.0.2`의 `dist/components.css`(+`components-base10.css`)를
실측했습니다. **rem 두 벌 배포가 컴포넌트 치수까지 관통합니다** —
같은 버튼이 `index` 빌드에선 `block-size: 3rem`, `base10` 빌드에선
`4.8rem`으로 재계산돼 **둘 다 48px**입니다.

### 버튼 (`vtmn-btn`) — 32/48/64px 등차 16px 3단

| | small | medium(기본) | large |
|---|:--:|:--:|:--:|
| **block-size** | **2rem (32px)** | **3rem (48px)** | 4rem (64px) |
| 상하 패딩 | 8px | 14px | 20px |
| 좌우 패딩 | 16px | 24px | 40px |
| 서체 | 14px / 700 | 16px / 700 | 20px / 700 |
| 자간 | +0.24px | +0.27px | +0.34px |
| 라운드 | 4px (`radius_100`) | 4px | 4px |

- **높이가 32→48→64 등차 16px**입니다. 40px이 없고 기본이 48px —
  40px 수렴 진영을 건너뛰고 터치 높이를 기본으로 삼았습니다.
  아이콘 전용 버튼은 같은 값의 정사각(32/48/64).
- **자간이 크기별로 다른 양수 소수**(0.015/0.01687/0.02125rem)입니다 —
  Backpack(음수 3종 토큰화)과 정반대 방향이고, 값 정밀도가 소수 4자리를
  넘나드는 표본 드문 자리입니다.
- **secondary의 테두리가 보더가 아니라 `inset box-shadow 2px`**입니다 —
  USWDS outline 버튼과 같은 "크기 불변 테두리" 기법.
- disabled가 색 교체가 아니라 **`opacity: 0.38` 토큰**
  (`--vtmn-opacity_disabled-state`) — Material 유산 값이 토큰 이름을 얻었습니다.
- 포커스: 이중 링 `0 0 0 4px + 0 0 0 6px`, 전환은
  **`--vtmn-transition_focus-visible: box-shadow 200ms ease-out`** —
  transition 선언 전체가 토큰입니다.
- 변형 7종: primary · primary-reversed · secondary · tertiary ·
  **conversion**(구매 전환 전용 강조색 — 커머스 도메인이 변형 이름에) ·
  ghost · ghost-reversed.

### 입력 (`vtmn-text-input`) — 보더가 전부 box-shadow

| | 값 |
|---|-----|
| **min-block-size** | **3rem (48px)** — 버튼 기본과 동일 |
| 패딩 | 상하 12px · 좌 12px · **우 36px** (아이콘 자리) |
| 라운드 | 4px |
| 기본 테두리 | `inset box-shadow 1px` (보더 속성 없음) |
| focus | `inset box-shadow 2px` |
| hover | 1px 유지 + **바깥 3px 헤일로** 추가 |

- **`border`를 아예 쓰지 않습니다** — 기본 1px·포커스 2px·유효/오류 2px까지
  전부 inset box-shadow. 두께가 변해도 치수가 흔들리지 않는 선택을
  입력 전체에 적용한 표본 유일 사례입니다.
- 라벨은 상단 고정 블록(입력 위 4px 간격), 헬퍼는 아래 4px — 플로팅 없음.
- 오류 아이콘을 **data URI SVG `mask` + `background-color`**로 그립니다 —
  Backpack(base64 background)과 같은 자리에서 색만 토큰으로 남기는 개선형.

### 모달 (`vtmn-modal`) — 단일 폭 600px, 진입 애니메이션 없음

| | 값 |
|---|-----|
| 폭 | **37.5rem (600px) 단일** (max-block-size 90vh) |
| 라운드 | 8px (`radius_200`) |
| 패딩 | 32px |
| 스크림 | 역배경색(hsl 성분 변수) **/ 80%** |
| 진입 | **전환 없음** (표시 즉시) |

- **폭 단계가 하나뿐**입니다 — Backpack 2단·PIE 3단·Cloudscape 5단 스펙트럼의
  최소단. 제목 26px/700, 본문 14px.
- **스크림 80%가 표본 최고 농도급**입니다 (다수 40~60%). 역배경색을 hsl
  성분 변수로 조립해 다크 모드에서 자동 반전됩니다.
- 모달 자체엔 애니메이션이 없고, 시스템의 모션은
  **`--vtmn-animation_*` 쇼트핸드 토큰**으로 배포됩니다 —
  `fade-in 200ms ease-in-out forwards` 식 전체 선언이 토큰이며,
  `--vtmn-animation_overlay`는 **fade-in 0.5s + 4.5s 대기 후 fade-out**까지
  한 토큰에 인코딩합니다. **자동 사라짐 타이밍이 토큰에 든 표본 유일 사례**입니다
  (`--vtmn-animation_alert-duration: 7.5s` 별도).

### 특징적 결정 (심화분)

- **rem 두 벌 배포가 컴포넌트 치수까지 적용** (3rem ↔ 4.8rem = 같은 48px)
- **버튼 32/48/64 등차 16px** — 40px 부재, 기본 48px
- **입력 테두리 전면 box-shadow 대체** — 표본 유일
- **animation 쇼트핸드 토큰 + 자동 퇴장 타이밍 내장** (4.5s/7.5s)
- `conversion` 버튼 변형 — 커머스 어휘가 변형 이름에
- disabled `opacity 0.38` · 크기별 양수 자간

## 특징적 결정

- **rem 기준별 빌드 2벌** — 표본 유일. rem 이식 문제의 유일한 구조적 해법
- ~~라운드(8단계)가 스페이싱(7단계)보다 촘촘~~ (2026-08-18 정정 — 스페이싱 11단계)
- 밑줄 구분자 명명
- CSS 우선 배포 + Web Components/React/Vue 래퍼

## 접근성

미확인.

## 참고

- 토큰: `npm pack @vtmn/css@3.0.2` → `dist/index.css`, `dist/index-base10.css`
- 컴포넌트 심화: 같은 패키지 `dist/components.css` · `dist/components-base10.css`
  (2026-08-18)
- 서체: Roboto (`--vtmn-typo_font-family`)
- **남은 확인 사항:** 컬러 팔레트, 타이포 스케일 전체, 다크 모드,
  컴포넌트 전수 목록 (버튼·입력·모달·팝오버·토스트·알림은 2026-08-18 실측)
