---
version: alpha
name: self-made-designops-site
description: >-
  The build spec for this corpus's own site. Generated from docs/assets/site.css by
  site/design-spec.mjs, so the spec cannot drift from the page it describes. An
  interpreted profile: the palette is filled in, and every authored value says so.
colors:
  primary: "#ff5926"
  on-primary: "#ffffff"
  surface: "#ffffff"
  on-surface: "#1a1815"
  background: "#faf9f7"
  on-background: "#1a1815"
  outline: "#e6e4de"
  link: "#c2410c"
  warning: "#9a6700"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "72px"
rounded:
  none: "0px"
  full: "9999px"
typography:
  headline-lg:
    fontSize: "54px"
    fontWeight: 730
    lineHeight: 1.05
  headline-md:
    fontSize: "34px"
    fontWeight: 720
    lineHeight: 1.2
  body-lg:
    fontSize: "18.5px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  code-md:
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
components:
  button-primary:
    height: "46px"
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.3xl}"
  button-secondary:
    height: "46px"
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.3xl}"
  input:
    height: "34px"
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
  notice:
    backgroundColor: "{colors.background}"
    textColor: "{colors.warning}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
---
<!-- lang-links -->
> [English](self-made-designops-site.DESIGN.md) · **한국어**
<!-- /lang-links -->

> **생성물입니다.** `node site/design-spec.mjs`가 `docs/assets/site.css`를 읽어 이 파일을
> 씁니다. 손으로 고치지 마세요 — 스타일시트를 고치고 재생성하지 않으면 스펙과 페이지가 어긋나고,
> 그게 바로 이 저장소가 다루는 실패입니다.

## 개요

코퍼스 자신의 사이트 **Self-Made DesignOps**의 시각 정체성입니다. 이 저장소가 실제로 만든 첫
물건이니, 남들에게 요구하는 산출물을 자기도 내놓아야 합니다.

이건 **interpreted** 프로파일입니다(`profiles/README.md`). 뼈대는
`measured/web-comfortable`에서 오고, 그 위에 색과 톤을 채웁니다. 즉 **A 행을 갖습니다**.
맨 아래 표의 요점은 그 A들이 실측인 척 분장하지 않고 그대로 보인다는 데 있습니다.

- 표면: **데스크톱 웹**, 페이지 옆 248px 레일, 940px 아래에서 한 열로 쌓임
- 테마: **둘**, 기본 라이트, 다크는 명시적 선택
- 의존성: **서체 하나**(Pretendard Variable). 프레임워크 없음, 빌드 단계 없음

## 색

채워져 있습니다 — 이게 `measured/`와 이 파일을 가르는 지점입니다. 완전한 팔레트 둘이고,
다크 세트의 중립색은 **R=G=B**라 양쪽 테마에 남은 색기는 오렌지와 상태 점 둘뿐입니다.

| 역할 | 라이트 | 다크 |
|------|-------|------|
| 배경 | `#faf9f7` | `#0c0c0c` |
| 표면 | `#ffffff` | `#161616` |
| 본문 | `#1a1815` (16.84:1) | `#ededed` (16.71:1) |
| 보조 | `#5c574f` (6.81:1) | `#a1a1a1` (7.57:1) |
| 흐림 | `#726c62` (4.94:1) | `#8a8a8a` (5.67:1) |
| 링크 | `#c2410c` (4.92:1) | `#f97316` (6.98:1) |
| 외곽선 | `#e6e4de` | `#2a2a2a` |
| 경고 | `#9a6700` (4.63:1) | `#e3b341` (10.05:1) |

위 비율은 전부 생성기가 계산합니다. 메모에서 베껴온 값이 아닙니다.

**CTA는 예외이고, 묻어두지 않고 적습니다.** `#ff5926`에 `#ffffff` 라벨은
**3.13:1**로 본문 크기 텍스트의 AA 하한 4.5:1 아래이고,
라벨이 15px/600이라 큰 글자에도 해당하지 않습니다. 소유자의 의도된 브랜드 결정이고,
이 페이지에서 AA를 못 넘기는 **유일한** 값입니다. 채움 자체가 라이트 캔버스 대비
2.97:1로 WCAG 1.4.11의 컴포넌트 경계 기준 3:1에 모자라서,
`#e8481a`이 3.71:1로 경계를 집니다.

## 타이포그래피

텍스트는 Pretendard Variable, 모노 열은 ui-monospace. 본문은
**16px/1.6** — `patterns/typography.md`의 웹 다수 진영입니다.

제목은 유동적입니다: `clamp(32px,5vw,54px)`, `clamp(24px,3.2vw,34px)`. DESIGN.md
프론트매터에는 **상한**을 적습니다. 포맷이 크기당 슬롯 하나라, 컴포넌트 라이브러리가 기준으로
삼을 값은 데스크톱 값이기 때문입니다.

## 레이아웃

간격 8단계: **4px · 8px · 12px · 16px · 24px · 32px · 48px · 72px**. 앞 여섯은
`measured/web-comfortable` 세트이고, 48px·72px은 페이지 단위 리듬을 위해 덧붙였습니다.

껍데기는 58px 헤더 아래 248px 레일이 페이지 옆에 서는 구조이고, 940px
아래에서 한 열로 쌓입니다.

## 형태

**모든 컨트롤이 `0px`** — 버튼·입력·테마 토글·Copy·Reset.
`tokens/scales.md`에 radius-0 진영이 기록돼 있으니 값 자체는 표본 안에 있고, 그걸 고른 건
결정입니다. 칩과 수집 깊이 배지는 완전한 원을 유지합니다. 비대화형 배지와 한 가족으로 그려져
있어서, 대화형 쪽만 각지게 하면 그 가족이 갈라지기 때문입니다.

## 컴포넌트

| 컴포넌트 | 값 | 비고 |
|---|---|---|
| 주/보조 버튼 | 46px | 최빈 40px보다 큼 — 폼이 아니라 CTA 둘짜리 페이지 |
| 헤더 컨트롤 | 32px | 보조 크롬 |
| 검색 입력 | 34px | |
| Copy 버튼 | 30px | 제목 행 안에 앉음 |
| 필터 칩 | 26px | |

## 모션

> DESIGN.md alpha 스펙에는 **모션 토큰 슬롯이 없습니다.** 스펙의 "이해하지 못한 절은 보존한다"
> 조항에 따라 본문 절로 둡니다 (`INTEROP.md` 5절).

인터랙션 지속: **100 · 140 · 180ms**, 전부 `cubic-bezier(.2,.6,.2,1)`.
3단계이고, `patterns/motion.md`의 83표본 최빈은 3단계입니다.

히어로에 앰비언트 루프가 하나 있습니다 — 24px 도트 격자가 **24s linear**로 한 칸씩
흐릅니다. 24px 격자는 실측(29개 중 27개 시스템의 간격 단계)이고, 24s은 아닙니다. 코퍼스에
앰비언트 루프 지속 기록이 없고, 갖고 있는 가장 긴 값은 Codex의 2000ms인데 성격이 다릅니다.

`prefers-reduced-motion: reduce`에서 완전히 멈춥니다. 함정 하나 — 흔한 처방인
`animation-duration: .01ms`만으로는 **무한** 애니메이션이 멈추지 않고 미친 듯이 돕니다.
반복 횟수도 같이 고정해야 합니다.

## 근거 등급

M = 코퍼스 실측 · D = 실측에서 유도 · A = 저자 판단 · U = 의도적 공란.

| 항목 | 등급 | 출처 / 할 일 |
|------|:---:|------|
| 앞 여섯 간격 단계 | **M** | `tokens/scales.md` — 표본에서 4·8·16은 사실상 필수 |
| 본문 `16px` | **M** | `patterns/typography.md` 웹 다수 진영 |
| 컨트롤 라운드 `0px` | **M** | `tokens/scales.md`에 radius-0 진영 기록 — 값은 표본에 있고 고른 건 결정 |
| 24px 도트 격자 | **M** | `tokens/scales.md` — 29개 중 27개 시스템의 간격 단계 |
| 46px 버튼 옆 34px 입력 | **D** | `patterns/form.md`의 컨트롤 높이 정렬을 이 페이지 크롬에 맞춰 조정 (동일값 아님) |
| 제목 스케일 | **D** | 본문 크기에서 유동적으로 유도 — 표본의 특정 스케일 아님 |
| 48px·72px 간격 | **D** | 페이지 단위 리듬을 위해 실측 스케일을 연장 |
| **팔레트 전체** | **A** | 저자. 코퍼스에 권장 램프 없음 — `patterns/color.md`가 표본이 가장 갈리는 축 |
| **CTA `#ff5926`** | **A** | 소유자 선택. 라벨 대비 3.13:1 — 여기서 AA를 못 넘기는 유일한 값이고 덮지 않고 기록 |
| **Pretendard Variable** | **A** | 저자. 코퍼스는 시스템별 서체를 기록할 뿐 권장하지 않음 |
| **레일 248px · 헤더 58px** | **A** | 저자. `patterns/navigation.md`는 표본이 얇은 축(16)이라 기댈 값이 없음 |
| **히어로 드리프트 24s** | **A** | 저자. 코퍼스에 앰비언트 루프 지속 기록 없음 |
| 인터랙션 지속 3단계 | **A** | 표본 최빈은 3단계(`patterns/motion.md`, 83표본). 이 페이지는 3단계이고, 이건 이유 있는 이탈이지 실측이 아님 |
| 다크 테마 중립색 | **A** | 저자. 의도적으로 R=G=B. 코퍼스에 base 램프 없음 |

**A 행이 다수이고, `interpreted/` 프로파일로서는 그게 맞습니다.** A가 이만큼인 파일이
`measured/`에 있으면 잘못 놓인 겁니다.

## Do's and Don'ts

- ✅ 스타일시트를 고치고 **재생성**하세요. 이 파일을 직접 고치지 마세요
- ✅ 값을 더하면 등급 행도 더하세요. 의도가 기록되지 않은 A는 `profiles/README.md` 1번 규칙이
  막으려는 바로 그것입니다
- ❌ 여기 팔레트를 코퍼스 권장으로 읽지 마세요. 한 사이트의 답입니다
- ❌ CTA 대비를 따라 쓰지 마세요. 기록된 예외지 따를 패턴이 아닙니다
