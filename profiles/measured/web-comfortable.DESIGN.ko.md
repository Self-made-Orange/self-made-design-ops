---
version: alpha
name: web-comfortable
description: >-
  design-systems (self-made-design-ops) 코퍼스의 "구현 시 기본값"에서 생성한 스캐폴드
  (profile=web, density=comfortable). 값은 표본 분포의 출발점이며 규범이 아닙니다.
colors:
  # 비워 둡니다 — 이 코퍼스에는 권장 팔레트가 없습니다.
  # 색은 브랜드 결정이며, 표본에서 가장 크게 갈리는 축입니다 (patterns/color.md).
  # 채울 때 확인할 것: 대비비(텍스트 4.5:1), 다크 모드 처리 방식, on-* 짝 규칙.
  # primary: "#______"
  # surface: "#______"
  # on-surface: "#______"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "9999px"
typography:
  headline-lg:
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
  headline-md:
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
components:
  button-primary:
    height: "40px"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  button-secondary:
    height: "40px"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  input:
    height: "40px"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  modal:
    width: "512px"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card:
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
---
<!-- lang-links -->
> [English](web-comfortable.DESIGN.md) · **한국어**
<!-- /lang-links -->

## Overview

web-comfortable의 시각 정체성. 이 파일은 **design-systems (self-made-design-ops)** 코퍼스에서 생성한 스캐폴드이므로,
브랜드 고유 결정(색·서체·톤)을 채워 넣어야 완성됩니다.

- 프로필: **웹 데스크톱** · 밀도: **comfortable**
- 각 값의 근거와 표본 수는 코퍼스의 `patterns/*.md` "구현 시 기본값" 절에 있습니다.

## Colors

**미정.** 코퍼스는 권장 팔레트를 제공하지 않습니다 — 색은 표본에서 가장 크게
갈리는 축이며 브랜드 결정 사항입니다. 채울 때 확인할 것:

- 텍스트 대비 **4.5:1**(WCAG AA). 차트·보조 요소는 3:1 이상
- `on-*` 짝 규칙(배경색마다 그 위 전경색을 함께 정의)
- 다크 모드 처리 방식을 **하나만** 고르기 — 표본에 6가지 방식이 있고, 한 화면에
  섞이면 내부 비일관입니다 (`patterns/color.md`)

## Typography

본문 **16px** 기준입니다 — 서구권 웹 관행이며 표본 다수가 여기 속합니다.
**본문 크기는 플랫폼으로 갈립니다** (iOS 17 · 차량 24 최소) — 통일하지 마세요.

- 토큰 기본값과 컴포넌트 실사용값이 어긋나지 않게 하세요 (표본에서 흔한 사고)
- 모바일 입력 필드는 16px로 올리는 것을 검토하세요 (iOS Safari 자동 확대 방지 —
  표본 7개가 각자 다른 방식으로 대응)

## Layout

스페이싱 **4 · 8 · 12 · 16 · 24 · 32** 6단계로 시작합니다.
표본에서 4·8·16은 사실상 필수이고, 12는 없으면 실제로 불편합니다.

- 처음부터 20단계를 만들지 마세요 — 매 결정마다 판단 비용이 듭니다
- 줄일 거면 **최소값을 무엇으로 둘지 먼저** 정하세요

## Shapes

라운드 **0 · 4 · 8 · 16** + 원형(`full`). 12·20·24는 필요해지면 추가합니다.
브랜드 톤이 둥근 쪽이면 28·32까지 확장합니다.

## Components

| 컴포넌트 | 기준 |
|---|---|
| 버튼 높이 | **40px** (77표본 최빈값, 다만 약 23%에 불과 — "표준"이 아니라 밀도 선택) |
| 입력 높이 | 버튼과 동일 (컨트롤 높이 정합) |
| 모달 폭 | **512px** (79표본 최빈 대역 450~520의 한가운데) · 패딩 24px 고정 |

- 버튼 단계를 둘 거면 **4단계**로 시작하고, 8px 등차가 관리가 가장 쉽습니다
- 터치 지원 계획이 있으면 최대 단계를 48 이상으로 두세요

## Motion

> DESIGN.md alpha 스펙에는 **모션 토큰 자리가 없습니다**. 스펙의 "모르는 섹션은
> 보존한다" 조항에 따라 본문 섹션으로 둡니다 (`INTEROP.md` 5절).

지속시간 **3단계로 시작**합니다 (83표본 최빈). 늘릴 때 5단계.

```
100   빠른 퇴장
150   진입(작은 요소) · 기본 전환
250   진입(큰 영역 · 모달 · 패널)
```

- **퇴장을 진입보다 짧게** — 표본에서 50ms 차이가 관행입니다
- **`0ms` 토큰을 두세요** — 접근성 모드가 참조할 자리가 필요합니다
- 5의 배수를 깰 거면 이유를 값에 남기세요

## 근거 등급

`profiles/README.md`의 규율에 따라 **이 파일의 값이 어디서 왔는지** 밝힙니다.
M=코퍼스 실측 · D=실측에서 파생 · A=저자 판단 · U=의도적 공백.

| 항목 | 등급 | 출처 / 해야 할 일 |
|------|:---:|------|
| 스페이싱 6단계 | **M** | `tokens/scales.md` — 4·8·16은 표본에서 사실상 필수 |
| 라운드 5단계 | **M** | `tokens/scales.md` — 0·4·8·16 + 원형 |
| 본문 16px | **M** | `patterns/typography.md` — 웹 다수 진영 |
| 제목·라벨 스케일 | **D** | 본문에서 파생(×1.5·×2, 행간 1.2~1.6) — 표본의 특정 스케일이 아닙니다 |
| 버튼·입력 40px | **M** | `patterns/button.md` — 77표본 최빈(약 23%) |
| 모달 512px · 패딩 24 | **M** | `patterns/modal.md` — 79표본 최빈 대역 |
| 모션 3단계 | **M** | `patterns/motion.md` — 83표본 최빈 |
| **색 전체** | **U** | **코퍼스에 권장 팔레트 없음** — 브랜드가 정할 자리 |
| 서체(font family) | **U** | 미지정 — 제품이 정할 자리 |

**A(저자 판단)는 이 파일에 없습니다.** 색·톤을 채우는 순간 A가 생기므로,
그때 이 표에 행을 추가하고 **의도**를 함께 적으세요 (`profiles/README.md` 규칙 1).

## Do's and Don'ts

- ✅ 이 값들을 **출발점**으로 쓰고, 제품 밀도에 맞춰 바꾸세요
- ✅ 바꾼 값은 이유와 함께 기록하세요 — 반년 뒤 같은 논쟁을 막습니다
- ❌ 이 파일의 숫자를 "업계 표준"이라고 인용하지 마세요 —
  코퍼스의 결론은 **"보편값은 없다"**입니다
- ❌ 색을 비운 채로 에이전트에게 넘기지 마세요 — 생성 결과가 일반적(generic)이 됩니다
