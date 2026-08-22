---
name: Origami
org: Financial Times
coverage: partial
url: https://origami.ft.com
repo: https://github.com/Financial-Times/origami
license: MIT
tech: [SCSS, Web Components]
figma_kit: 미확인
tokens_format: [SCSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @financial-times/o-typography@7.7.2 → src/scss/_brand.scss · npm @financial-times/o-buttons@7.11.1 · o-forms@10.0.4 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](origami.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Financial Times의 시스템 — 타이포 스케일 이름이 **음수 지수를 포함한 정수
인덱스**(`-2`~`10`)이고, **크기와 행간이 한 쌍(튜플)**으로 정의되며,
**브랜드별로 스케일이 갈립니다**(기본 브랜드는 고정 행간, 다른 브랜드는 ×1.2).

## 토큰 — 크기·행간 쌍

```scss
$_o-typography-font-scale: (
  -2: (12, 16),   -1: (14, 16),   0: (16, 20),   1: (18, 20),
   2: (20, 24),    3: (24, 28),   4: (28, 32),   5: (32, 32),
   6: (40, 40),    7: (48, 48),   8: (56, 56),   9: (72, 72),  10: (84, 84),
);
```

- **한 단계가 `(크기, 행간)` 튜플입니다** — 크기와 행간을 별도 스케일로 두고
  조합을 사용처에 맡기는 다수(Yoga·Vanilla 등)와 달리, **쌍으로 고정**합니다
- **인덱스 `0`이 본문(16px)이고 아래로 음수**입니다 — Siemens iX(`ms-0`
  기준 + `ms--1`)와 같은 발상이며, 이쪽은 이름이 순수 정수입니다
- **`5`(32px)부터 행간이 크기와 같아집니다** (32/32 · 40/40 · 84/84) —
  제목 구간은 행간 1.0. 본문 구간만 1.17~1.33입니다
- 최대 84px

### 브랜드별로 스케일이 다릅니다

```scss
// 다른 브랜드에서
$_o-typography-font-scale: ( -2: (12, 12*1.2), -1: (14, 14*1.2), … )
```

- **브랜드 오버라이드에서 행간이 `크기 × 1.2` 산식으로 바뀝니다** —
  기본 브랜드(FT 본지)는 4px 격자 고정 행간, 다른 브랜드는 비율 계산.
  **같은 시스템 안에서 행간 모델 자체가 브랜드마다 다른 표본 유일 사례**입니다
- `oBrandGet()` 함수로 브랜드별 값을 조회합니다 (`master`/`internal`/`whitelabel`
  같은 브랜드 축이 Origami 규약 — 이 패키지에서 목록은 미확인)
- 서체 슬롯이 `sans` · `serif` · **`display`** 3종 — 신문 조판 어휘입니다

## 컴포넌트 심화 — (2026-08-18)

컴포넌트가 `o-*` 개별 패키지라 3개를 따로 실측했습니다:
`@financial-times/o-buttons@7.11.1` · `o-forms@10.0.4` · `o-overlay@5.0.3`
(+ 토큰 의존성 `o-private-foundation@1.10.0`).

**패키지끼리 토큰 세대가 갈라져 있습니다** — o-buttons는 구 `o-typography` 스케일
(위 튜플 스케일)을 쓰고, o-forms·o-overlay는 신 **o3 foundation**
(`oPrivateFoundationGet('o3-*')`)을 씁니다. 마이그레이션 단층이 컴포넌트 사이에
그대로 노출된 표본입니다.

### 버튼 (`o-buttons`) — 패딩 산식이 소스 주석에 있습니다

| | 기본 | big |
|---|:--:|:--:|
| **min-height** | **28px** | 40px |
| min-width | **60px** | 80px |
| 패딩 | 6px 8px | 11px 20px |
| 서체 | 14px (scale −1) | 16px (scale 0) |
| line-height | **14px (=서체)** | 16px |
| 보더 | 1px | 1px |
| 라운드 | 0 | 0 |

- 세로 패딩이 소스 주석에 산식으로 문서화돼 있습니다:
  `((min-height − line-height) / 2) − border-width`. Garden·MUI가 코드로 숨긴 역산을
  주석으로 선언한 형태입니다.
- **line-height를 서체 크기와 같게(1.0) 놓고 높이는 min-height가 채웁니다** —
  튜플 스케일의 행간(16·20px)을 버튼에서는 버립니다.
- 기본 높이 **28px** — 이번에 실측한 5개 시스템 중 최소. `border-radius: 0` 명시
  (주석: "Edge 80 insists on a boarder radius").
- 전환이 속성별로 다릅니다: `0.3s background-color, 0.15s color ease-out, 0.15s border-color ease-out`.
- 타입 3종(primary·secondary·ghost) × 테마 6종(inverse·mono·b2c·professional·
  ft-live·professional-inverse) — 색을 열거하지 않고 **단일 `color`+`context`(배경색)에서
  상태색을 함수로 생성**합니다. 아이콘 전용 min-width 40px.

### 입력 (`o-forms` v10 — o3 토큰층)

| | 기본 | small |
|---|:--:|:--:|
| **min-height** | **44px** | 28px |
| 패딩 | 8px 16px | 0 8px |
| 서체 | **18px / 24px** (metric2-1) | 16px / 24px |
| 보더 | **1.5px** `#b3a9a0` | 동일 |
| 라운드 | 2px (`o3-border-radius-1`) | 동일 |

- **입력 서체가 18px** — 본문(16px)보다 큽니다. 신문 본문 조판 감각이 폼까지 온 값.
- 보더가 **1.5px**(Vanilla와 같은 소수 보더)에 색이 `#b3a9a0` — paper(FT 살몬지)
  팔레트의 웜 그레이입니다.
- **버튼 28px vs 입력 44px — 16px 격차.** 같은 시스템 안 버튼-입력 높이 차로는
  실측 표본에서 최대급입니다 (버튼이 구세대 토큰, 입력이 신세대 토큰인 단층과 겹칩니다).
- 라벨 별도 블록 — 16px / 24px / **700**(body-highlight), 아래 12px. 필드 전체
  `margin-bottom: 32px`.
- **선택 필드 표시를 CSS로 주입합니다** — `.o-forms-field--optional …::after { content: 'Optional' }`.
  영문 문자열이 스타일시트에 하드코딩된 드문 사례.
- o3 스페이싱: 기준 4px 증분 함수(`oPrivateSpacingByIncrement(11)` = 44px) +
  이름 스케일 `s1~s8·m12·m16·l18·l24`(이름에 증분 숫자 내장).

### 모달 (`o-overlay`) — 폭을 JS가 잽니다

- **CSS에 폭 단계가 없습니다** — `max-width` 0건. JS(`overlay.js`)가 뷰포트를 실측해
  정렬·크기를 잡습니다. compact·full-screen/full-width/full-height 변형만 CSS.
- 패널: 보더 1px, 라운드 0, elevation `high` 그림자, 콘텐츠 패딩 16px(s4),
  compact 12px(s3). 제목 scale 2 레귤러.
- 진입: 패널·스크림 모두 **opacity 300ms ease-in-out** 페이드.
- 스크림이 `rgba(0,0,0,.2)` — 실측 표본에서 가장 옅은 축입니다
  (Protocol .85, Vanilla .85, DSFR .64와 대조).

### 특징적 결정 (심화분)

- **토큰 2세대·3세대가 패키지별로 병존** — o-buttons(구) vs o-forms·o-overlay(o3)
- **버튼 28px / 입력 44px** — 높이 정합을 포기한 16px 격차
- **버튼 line-height = font-size + min-height 채움** + 패딩 산식의 주석 문서화
- **버튼 색을 열거 대신 함수 생성** (color+context 2변수)
- 모달 폭의 JS 실측 — CSS 폭 단계 부재
- `content: 'Optional'` — 로케일 문자열의 CSS 하드코딩

## 특징적 결정

- **크기·행간 튜플 스케일** — 표본 유일 표현
- **음수 정수 인덱스**(`-2`~`10`), 0이 본문
- **32px 이상 행간 1.0** (제목은 행간을 크기와 동일하게)
- **브랜드별로 행간 모델이 다름**(고정 px ↔ ×1.2) — 표본 유일
- `sans`/`serif`/`display` 3서체 슬롯 — 신문 도메인
- 컴포넌트가 `o-*` 접두 개별 패키지로 분할 (o-grid · o-brand · o-typography …)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @financial-times/o-typography@7.7.2` → `src/scss/_brand.scss`
- 관련 패키지: `o-grid` · `o-brand` · `o-editorial-typography`
- 컴포넌트 심화: `o-buttons@7.11.1` · `o-forms@10.0.4` · `o-overlay@5.0.3` ·
  `o-private-foundation@1.10.0` (2026-08-18)
- **남은 확인 사항:** ~~브랜드 목록~~ (2026-08-18 부분 해소 — o3 토큰이
  core·professional·internal·whitelabel 4브랜드로 분기; 각 브랜드의 타이포 스케일 전체는 미조사),
  ~~스페이싱~~ (2026-08-18 해소 — o3: 기준 4px 증분 함수 + s1~l24 이름 스케일.
  구세대 o-grid는 여전히 미조사), 컬러 팔레트, 컴포넌트 전체 목록(o-* 패키지 열거 미완)
