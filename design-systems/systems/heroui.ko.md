---
name: HeroUI (구 NextUI)
org: HeroUI
coverage: partial
url: https://www.heroui.com
repo: https://github.com/heroui-inc/heroui
license: MIT
tech: [React, Tailwind]
figma_kit: true
tokens_format: [JS]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-18
source: "npm @heroui/theme@2.4.26 → dist/default-layout.js"
---
<!-- lang-links -->
> [English](heroui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Tailwind 플러그인형 프레임워크 — **다크에서 그림자에 `inset` 흰 테두리를 추가**하고,
**hover 불투명도를 라이트 .8 / 다크 .9로 다르게** 둡니다.
라운드가 **8·12·14px**로 홀수 상단이며 4px 격자가 아닙니다.

## 토큰 — layout 3벌(default/light/dark)

```js
defaultLayout = {
  dividerWeight: '1px', disabledOpacity: '.5',
  fontSize:   { tiny .75rem · small .875 · medium 1 · large 1.125 },
  lineHeight: { tiny 1rem · small 1.25 · medium 1.5 · large 1.75 },
  radius:     { small 8px · medium 12px · large 14px },
  borderWidth:{ small 1 · medium 2 · large 3 },
  boxShadow:  { small · medium · large — 3겹 조합 }
}
lightLayout = { hoverOpacity: '.8' }
darkLayout  = { hoverOpacity: '.9', boxShadow: { … inset 흰 테두리 추가 } }
```

- **다크 그림자에 `inset 0 0 1px rgb(255 255 255 / 0.15)`가 붙습니다** —
  어두운 배경에서 그림자만으로는 면 경계가 안 보이므로 **안쪽 흰 실선**을
  더합니다. shadcn/ui(다크에서 보더를 알파로 전환)와 같은 문제의 다른 해법이며,
  **그림자 안에 하이라이트를 넣는 것은 표본 유일**입니다
- **hover 불투명도가 모드마다 다릅니다** (라이트 .8 / 다크 .9) —
  어두운 배경에서 같은 투명도가 더 강하게 보이는 것을 보정합니다.
  상태 표현 강도를 모드별로 조정한 표본 유일 사례입니다
- **라운드 8/12/14px** — 4px 격자를 벗어난 상단(14)이고 `small`이 이미 8px입니다.
  최근 프레임워크의 큰 라운드 경향(Mantine·shadcn 대비)에서 가장 둥근 편입니다
- 그림자가 **3겹 조합**(퍼짐 + 그림자 + 1px 윤곽)입니다 — 디지털청(2겹)보다 한 겹 많습니다
- 크기 이름이 `tiny`~`large` 4단계뿐 — 프레임워크 중 최소 계열

## 컴포넌트 심화 — (2026-08-18)

`@heroui/theme@2.4.26` `dist/components/*.js`(46개)의 tailwind-variants(tv)
정의를 실측했습니다 — 스타일이 CSS가 아니라 **Tailwind 클래스 문자열 배열**로
배포되고, 값은 layout 토큰(text-small=14px, rounded-medium=12px 등)으로
해석됩니다.

### 버튼

| | sm | md | lg |
|---|:--:|:--:|:--:|
| **height** | 32px | **40px** | 48px |
| 좌우 패딩 | 12px | 16px | 24px |
| min-width | **64px** | 80px | 96px |
| 서체 | 12px | 14px | 16px |
| 라운드 | 8px | **12px** | 14px |

- **라운드가 크기에 따라 8→12→14px로 커집니다** — 크기 변형이 라운드까지
  바꾸는 Backpack 입력(8→12) 사례의 전면화. md가 이미 12px로, 기본 버튼이
  표본에서 가장 둥근 축입니다.
- **press에 `scale(0.97)`** — `data-[pressed=true]:scale-[0.97]`, GPU 변환으로
  버튼이 3% 눌립니다. 누름을 색이 아니라 **기하로** 표현하는 표본 드문 사례.
  전환은 일괄 **250ms ease** + `motion-reduce` 예외.
- 변형 7종(solid·bordered·light·flat·faded·shadow·ghost) × 색 6종 —
  tv compoundVariants로 **42칸 행렬**을 전개합니다.
- min-width 64px는 MUI와 같은 값.
- 포커스: `data-focus-visible` 시 outline 2px + offset 2px, 색은 `focus` 토큰
  (blue-500) — React Aria의 data 속성 상태 어휘를 그대로 셀렉터로 씁니다.

### 입력

| | sm | md | lg |
|---|:--:|:--:|:--:|
| **height** | 32px | **40px** | 48px |
| 라운드 | 8px | 12px | 14px |

- **버튼과 높이·라운드 진행이 동일합니다** (32/40/48 + 8/12/14).
- 기본 변형이 **flat** — `bg-default-100` filled, **보더 없음**. hover에 200,
  포커스에 다시 100 — 포커스가 배경 미분화로만 표시되는 최소주의입니다.
- bordered 변형의 포커스 보더가 **default-foreground(무채색 전경)**입니다 —
  primary가 아닙니다. 포커스=브랜드색 관례(Naive·Prime 등)에서 이탈한 선택.
- underlined 변형은 `after` 의사요소가 중앙에서 **width 0→100%**로 자라는
  Material 밑줄 애니메이션.
- 슬롯이 **10개**(base·label·mainWrapper·inputWrapper·innerWrapper·input·
  clearButton·helperWrapper·description·errorMessage) — tv의 슬롯 시스템으로
  한 컴포넌트의 DOM 전체에 클래스를 배분합니다.

### 모달

| | 값 |
|---|---|
| 폭 | xs 320 ~ 5xl 1024 + full — **10단** (기본 md **448px**) |
| 라운드 | 기본 lg = **14px** |
| 패딩 | 헤더/푸터 24/16px · 본문 24/8px |
| 스크림 | 기본 `bg-overlay/50`(검정 50%) · **blur 변형** = backdrop-blur + /30 |
| 모션 변수 | 모바일 slide-exit **80px** / 데스크톱 **scale-exit 103%** |

- **폭이 Tailwind `max-w-*` 스케일 그대로 10단** — 전용 폭 스케일 없이
  유틸리티 스케일을 승계합니다 (MUI "브레이크포인트 재사용"의 Tailwind판,
  Cloudscape 5단·Semi 3단과 대조). 기본 448px — Semi 448·MUI 444와 같은
  440대 수렴대입니다.
- **placement 기본 auto = 모바일 하단 정렬**(items-end), sm부터 중앙 —
  같은 컴포넌트가 뷰포트에 따라 **바텀시트 ↔ 센터 모달**로 변신합니다.
  퇴장도 모바일은 80px 아래로 슬라이드, 데스크톱은 **103%로 커지며** 사라짐 —
  축소 퇴장 다수(Semi 0.7·Naive 0.9·Prime 0.93)와 반대 방향입니다.
- backdrop이 transparent/opaque/**blur** 3종 — 블러 스크림이 1급 변형인
  표본 드문 사례.

### 특징적 결정 (심화분)

- **높이 32/40/48 + 라운드 8/12/14, 버튼·입력 동일 진행** — 라운드가 크기 종속
- **press scale(0.97)** — 기하적 누름 피드백
- 입력 포커스가 무채색 보더(bordered) 또는 배경 미분화(flat) — 브랜드색 포커스 이탈
- 모달 10단 Tailwind 폭 승계 + **모바일 바텀시트 자동 전환**
- **퇴장이 확대(103%)** — 축소 퇴장 다수와 역방향
- blur 백드롭 1급 변형

## 특징적 결정

- **다크 그림자에 inset 흰 하이라이트** — 표본 유일
- **hover 불투명도를 모드별로 분리**(.8/.9) — 표본 유일
- 라운드 8/12/14 — 격자 이탈, 큰 라운드
- 그림자 3겹 조합
- Tailwind 플러그인으로 배포(`plugin.js`) — shadcn/Skeleton과 같은 상속 진영

## 접근성

미확인.

## 참고

- 토큰: `npm pack @heroui/theme@2.4.26` → `dist/default-layout.js`
- 컴포넌트 심화: 같은 패키지 `dist/components/{button,input,modal}.js` +
  `dist/plugin.js`(focus·overlay 색) (2026-08-18)
- **남은 확인 사항:** 컬러 팔레트(일부 확인 — focus=blue-500·overlay=#000,
  전체 램프는 미조사), 스페이싱(Tailwind 상속 추정 — 미확인),
  ~~컴포넌트 목록~~ (2026-08-18 해소 — `dist/components` tv 모듈 **46개** 실측),
  NextUI에서의 이름 변경 시점
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `heroui.com` → `figma.com/community/file/1546526812159103429`
