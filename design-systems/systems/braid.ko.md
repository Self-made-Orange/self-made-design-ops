---
name: Braid
org: SEEK
coverage: partial
url: https://seek-oss.github.io/braid-design-system
repo: https://github.com/seek-oss/braid-design-system
license: MIT
tech: [React, vanilla-extract]
figma_kit: 미확인
tokens_format: [TS/JS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm braid-design-system@34.6.2 → dist/lib/themes/baseTokens/nvl.mjs"
---
<!-- lang-links -->
> [English](braid.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

SEEK(구인 플랫폼)의 시스템 — **토큰 값이 px이 아니라 격자 배수**이고
(`grid: 4`, `space.medium: 6` → 24px), 행간을 높이가 아니라
**`lineGap`(줄 사이 간격)**으로 정의합니다. 둘 다 표본 유일.

## 토큰 — 값이 격자 단위입니다

```js
grid: 4                                   // 1단위 = 4px
space: { gutter: 6, xxsmall: 2, xsmall: 3, small: 4, medium: 6,
         large: 8, xlarge: 12, xxlarge: 16, xxxlarge: 24 }
touchableSize: 12                         // = 48px
text.standard: { mobile: { fontSize: 16, lineGap: 12 } }
```

- **스페이싱 값이 무단위 격자 배수입니다** — `medium: 6`은 6px이 아니라
  6단위 = **24px**. px로 환산하면 `8·12·16·24·32·48·64·96`이 되며
  **코어값 4가 없습니다**(최소가 2단위=8px)
- 격자(`grid`)를 바꾸면 전 스케일이 재배율됩니다 — 런타임 배율 진영과
  같은 효과를 **빌드 타임 단위 정의**로 얻습니다
- **`touchableSize: 12`(48px)** — 터치 타겟이 토큰입니다.
  Material 3(48dp)과 같은 값이며, 터치 타겟을 1급 토큰으로 둔 것은
  표본에서 Braid·Orbit(컨트롤 크기) 계열입니다

### `lineGap` — 행간을 "간격"으로 정의

```js
{ fontSize: 16, lineGap: 12 }   // 총 높이가 아니라 줄 사이 빈 공간
```

**표본 전체가 `lineHeight`(총 높이 또는 비율)를 쓰는 자리에서 Braid만
`lineGap`(간격)을 씁니다.** 총 높이는 폰트 메트릭 + gap으로 계산되므로,
서체가 바뀌어도 **시각적 간격이 유지**됩니다.
Vanilla(Canonical)의 `nudge` 베이스라인 보정과 같은 문제의식이며
해법이 다릅니다 — Vanilla는 격자에 맞추려 보정값을 두고,
Braid는 격자 대신 간격을 고정합니다.

### 테마 — 브랜드별 색만 주입

```js
makeTokens({ name: 'seekJobs', brandAccent: palette.seekPink['500'], … })
```

`baseTokens`(구조) + 브랜드 색 3개(`brandAccent`/`Light`/`Soft`)로 테마가
생성됩니다 — Mística(스킨 전체 배포)보다 훨씬 얇은 멀티 브랜드 구조입니다.

## 컴포넌트 심화 — (2026-08-18)

같은 패키지 `braid-design-system@34.6.2`의 **vanilla-extract 빌드 산출물**
(`dist/lib/components/**/*.css.mjs` — `.css.ts`가 값 그대로 ESM으로 배포됨)과
컴포넌트 `.mjs`를 파싱했습니다. 값 참조는 `dist/lib/themes/baseTokens/nvl.mjs`
(현행 유일 baseTokens — seekJobs·seekBusiness 테마 모두 nvl 파생)로 해석.
공개 컴포넌트 디렉터리 **71개**.

### 기반값 추가 확보 (nvl)

| 항목 | 값 |
|------|-----|
| 라운드 | small **4** / standard **8** / large 16 / xlarge 24px |
| 보더 폭 | **standard 2px** / large 4px |
| `contentWidth` | xsmall 400 / small 660 / medium 940 / large 1280px |
| 서체 | SeekSans · 굵기 400 / **medium 600** / strong 700 |
| 본문 | `standard` 16px(lineGap 12) · `small` 14px(lineGap 10) |
| 전환 토큰 | `fast` 125ms ease · `touchable` 200ms `cubic-bezier(0.02,1.505,0.745,1.235)` |
| 누름 변형 | `transform.touchable: scale(0.95)` |

**기본 보더가 2px입니다** — 1px 다수 진영과 갈리는 값이고, 입력 보더에도
그대로 들어갑니다(아래).

### 버튼 (`Button.css.mjs` + `Button.mjs`)

| | small | standard |
|---|:--:|:--:|
| **min-height** | **38.4px** (`touchableSize×0.8`) | **48px** (`touchableSize`) |
| 좌우 패딩 | 16px (`space.small`) | 24px (`space.gutter`) |
| 라운드 | 8px (standard) | 8px |
| 서체 | 14px / 600 | 16px / 600 |

- **높이 선언이 없고 min-height = 터치 타겟 토큰**입니다. 컨트롤 치수의
  단일 원천이 `touchableSize`(48px)이고, small은 그 0.8배 —
  **38.4px 소수점을 방임**합니다 (MUI 36.5px 방임과 같은 진영).
- **상하 패딩이 `(min-height − 캡하이트)/2` 산식**입니다 — 행간이 아니라
  **캡하이트(capHeight)** 기준으로 세로 중앙을 맞춥니다. `lineGap` 행간
  모델(위 절)의 컴포넌트판이며, 캡하이트로 컨트롤 패딩을 파생하는 것은
  이 코퍼스 표본에서 처음 확인된 방식입니다.
- **누름이 `scale(0.95)` 200ms 오버슈트 곡선**(y1=1.505)입니다 —
  `patterns/motion.md` 베지어 오버슈트 순위(Spindle 2.05 · TDS 1.56)와
  나란한 탄성 진영인데, 자리가 모달·진입이 아니라 **버튼 누름**입니다.
- hover/active가 배경 교체가 아니라 **오버레이 레이어 opacity 전환**입니다.
- `transparent` 변형과 small은 패딩을 한 단(24→16px) 줄입니다.

### 입력 (`private/Field`)

| 항목 | 값 |
|------|-----|
| **height** | **정확히 48px** (`touchableSize` — 상하 패딩 `(48−행높이)/2` 산식) |
| 좌우 패딩 | 16px (`space.small`) |
| 라운드 | 8px (standard) |
| 보더 | **inset box-shadow 2px** `grey400` (`borderWidth.standard`) |
| 서체 | 16px (`text.standard`) |

- 버튼 standard와 **같은 48px·같은 산식** — 버튼·입력 높이 정합의 원천이
  높이 토큰이 아니라 터치 타겟 토큰입니다.
- **보더가 border 속성이 아니라 inset box-shadow**입니다. focus/hover 시
  `formAccent` 색 2px 오버레이가 opacity로 겹쳐집니다 — 상태 전환이
  보더 색 교체가 아니라 레이어 페이드.
- 아이콘 슬롯도 `touchableSize` 정사각(48px)입니다.
- 라벨: 별도 블록 — `Text`(16px) + `Strong`(700), 라벨-필드 간격
  16px(`space.small`), 필드-메시지 간격 12px(`xsmall`). 플로팅 아님.

### 모달/다이얼로그 (`private/Modal` + `Dialog`)

| 항목 | 값 |
|------|-----|
| 폭 단계 | **`contentWidth` 재사용 4단**: 400 / **660(기본)** / 940 / 1280px + `content`(fit) |
| 라운드 | **24px (`xlarge`)** |
| 내용 패딩 | 모바일 24px(`gutter`) / 태블릿 32px(`large`) |
| 외부 거터 | 모바일 12 / 태블릿 24 / 데스크톱 48px |
| 스크림 | **라이트 rgba(0,0,0,.4) / 다크 rgba(0,0,0,.6)** |
| 진입(center) | scale(0.8)→1 + 페이드, **`fast` 토큰 = 125ms ease** |
| 진입(drawer) | translateX, 모바일 300ms / 태블릿 175ms `cubic-bezier(0.4,0,0,1)` |

- **다이얼로그 폭이 콘텐츠 폭 토큰의 재사용**입니다 — MUI(브레이크포인트
  재사용)·Backpack(모달 폭=브레이크포인트)과 같은 "한 값 두 역할" 진영이며,
  Braid는 재사용 대상이 본문 콘텐츠 폭이라는 점이 다릅니다.
- **라운드 24px** — 웹 모달 표본(8~12px 밀집, `patterns/modal.md`)의 2배로
  표본 웹 최대이고, Apple 시트(34/58px)와 웹 군집 사이에 들어갑니다.
- **진입 125ms** — 모달 진입으로는 표본 최단입니다(Radix·shadcn 200ms,
  Atlassian 250ms). 전용 모달 모션 없이 범용 `fast` 전환 토큰을 그대로 씁니다.
- 스크림 농도가 **컬러 모드별로 갈립니다**(.4/.6) — 다크에서 더 짙게.
- JS 정리 타이머는 300ms(`ANIMATION_DURATION`) — CSS 125ms와 어긋난
  상수가 병존합니다.

### 특징적 결정 (심화분)

- **컨트롤 치수의 단일 원천이 `touchableSize`** — 버튼·입력·아이콘 슬롯 전부
  48px 파생, small은 ×0.8 (38.4px 소수점 방임)
- **캡하이트 기준 세로 패딩 산식** — lineGap 모델의 컴포넌트판
- **보더 2px 기본 + 입력 보더는 inset box-shadow·상태는 오버레이 페이드**
- **다이얼로그 폭 = contentWidth 재사용**, 라운드 24px(웹 표본 최대), 진입 125ms(표본 최단)
- 버튼 누름 `scale(0.95)` + 오버슈트 곡선 — 탄성을 진입이 아니라 누름에 배정

## 특징적 결정

- **토큰 값이 격자 배수** (무단위) — 표본 유일
- **`lineGap` 행간 모델** — 표본 유일. 서체 독립적 시각 간격
- `touchableSize` 터치 타겟 토큰(48px)
- 브랜드 색 3개만 주입하는 최소 테마 계약
- vanilla-extract 기반 (제로 런타임 CSS-in-TS)

## 접근성

미확인 (터치 타겟 토큰 존재).

## 참고

- 토큰: `npm pack braid-design-system@34.6.2` → `dist/lib/themes/baseTokens/`
- 컴포넌트 심화: 같은 패키지의 `dist/lib/components/**/*.css.mjs`(vanilla-extract
  빌드 산출물) + `dist/lib/components/{Button/Button,private/Field/Field,private/Modal/*,Dialog/Dialog}.mjs`
  (2026-08-18)
- **남은 확인 사항:** 컬러 팔레트 전체, ~~라운드~~ · ~~컴포넌트 목록~~
  (2026-08-18 해소 — 심화 절: 라운드 4단, 공개 컴포넌트 71개),
  반응형(mobile/tablet 쌍) 전수
