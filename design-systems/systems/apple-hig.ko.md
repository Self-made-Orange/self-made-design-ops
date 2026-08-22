---
name: Human Interface Guidelines (iOS 26 / iPadOS 26)
org: Apple
coverage: full
url: https://developer.apple.com/design/human-interface-guidelines
repo: null
license: "미확인 (2026-08-18 시도: developer.apple.com/design/resources가 JS 렌더링이라 약관 문구 추출 불가 — Figma 커뮤니티 파일 설명 확인은 로컬 세션 몫)" (Apple Design Resources)
tech: [SwiftUI, UIKit]
figma_kit: true
tokens_format: [Figma Variables (DTCG export)]
a11y_target: 미확인
platform: mobile
domain: os
verified: 2026-08-16
source: "iOS/iPadOS 26 Figma 킷 변수 전체 export (DTCG JSON) + Toolbars 페이지 실측"
---
<!-- lang-links -->
> [English](apple-hig.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Apple의 iOS·iPadOS 디자인 지침. **npm이나 GitHub에 토큰을 배포하지 않아**
공식 Figma 킷의 변수 export가 유일한 기계 판독 경로입니다.

## 토큰

### 타이포그래피 — SF Pro, 11단계

| 스타일 | 크기 | 행간 | 자간 | 기본 굵기 |
|--------|:---:|:---:|:---:|:---:|
| Large Title | 34 | 41 | **+0.40** | 400 |
| Title 1 | 28 | 34 | **+0.38** | 400 |
| Title 2 | 22 | 28 | -0.26 | 400 |
| Title 3 | 20 | 25 | -0.45 | 400 |
| Headline | 17 | 22 | -0.43 | **600** |
| Body | 17 | 22 | -0.43 | 400 |
| Callout | 16 | 21 | -0.31 | 400 |
| Subheadline | 15 | 20 | -0.23 | 400 |
| Footnote | 13 | 18 | -0.08 | 400 |
| Caption 1 | 12 | 16 | 0 | 400 |
| Caption 2 | 11 | 13 | **+0.06** | 400 |

**자간 부호가 크기에 따라 뒤집힙니다.** 28px 이상은 양수(+0.38~+0.40),
20~13px은 음수(-0.45~-0.08), 12px에서 0이 되고 11px에서 다시 양수(+0.06)로 돌아옵니다.
**U자 곡선**입니다.

Headline과 Body는 크기·행간·자간이 모두 같고 **굵기만 다릅니다** (**590** vs 400).

> **정정.** 처음 이 항목을 쓸 때 Headline 굵기를 600으로 적었습니다. 킷 변수의 실제 값은
> **590**입니다 — `Font(family: "SF Pro", style: Semibold, size: 17, weight: 590, …)`.
> 두 노드(`5726:33474`, `5561:41165`)에서 같게 나왔습니다.
> Bold는 700으로 표준값이며 **Semibold만 어긋납니다.**
> 표본에서 100 단위가 아닌 굵기는 Apple(590)과 Atlassian(653) 둘입니다 —
> 양쪽 다 가변 서체를 씁니다.

### 행간 변형 — Tight / 기본 / Loose

같은 크기에 행간만 다른 세 벌이 있습니다.

| | Large Title | Body | Caption 2 |
|---|:---:|:---:|:---:|
| Tight | 39 | — | — |
| 기본 | 41 | 22 | 13 |
| Loose | 43 | 24 | 15 |

**Loose는 전 스타일에서 예외 없이 기본 +2px입니다.** 11개 스타일 모두 동일합니다.

각 스타일에 Regular / Emphasized / Italic / Emphasized Italic 조합이 있어,
정의된 텍스트 스타일은 **총 102개**입니다.

출처: `tokens/shared/typography.json`
(원본은 행간을 rem으로 표기합니다 — `2.5625` × 16 = 41px)

### Liquid Glass — iOS 26의 재질 토큰

수집한 22개 시스템 어디에도 없는 계열입니다.

| 토큰 | 값 |
|------|-----|
| Light Angle | **-45** |
| Opacity | 60 |
| Refraction | 100 |
| Dispersion | 0 |
| Frost — Regular | 7 |
| Frost — Medium | 12 |
| Frost — Large | 14 |
| Depth — Regular | 16 |
| Depth — Medium and Large | 16 |
| Splay — Regular | 6 |
| Splay — Medium and Large | 6 |
| Shadow Blur — BG | 80 |
| Shadow Blur — Layer | 40 |

**Frost만 크기별로 값이 다릅니다** (7 / 12 / 14). Depth와 Splay는 크기 구분이 있으나
값은 동일합니다. 그림자는 배경(80)과 레이어(40) 두 단계입니다.

굴절·분산·조명 각도를 토큰으로 다룹니다. 다른 시스템이 `shadow`·`elevation`으로
끝내는 자리에 **광학 파라미터 13종**을 둡니다.

### 라운드

| 토큰 | 값 |
|------|-----|
| Sheet — iPhone 상단 | **34px** |
| Sheet — iPhone 하단 | **58px** |
| Sheet — iPad | 38px |

**일반 라운드 스케일이 없습니다.** 시트 곡률만 토큰으로 존재합니다.
iPhone 시트는 상단과 하단이 다르며, 하단(58px)이 상단(34px)의 1.7배입니다.

### Scroll Edge Effect

| 토큰 | 값 |
|------|-----|
| Blur Radius | 10px |
| Top | 27 |
| Bottom | 62 |

스크롤 경계에서 콘텐츠가 툴바 밑으로 사라질 때 적용되는 효과의 파라미터입니다.

### 컬러 — 테마당 79개

| 그룹 | 개수 |
|------|:---:|
| Miscellaneous | 23 |
| Accents | 12 |
| Grays | 8 |
| Backgrounds | 6 |
| Backgrounds (Grouped) | 6 |
| Fills | 4 |
| Labels | 4 |
| Labels - Vibrant | 4 |
| Fills - Vibrant | 3 |
| Labels - Vibrant - Controls | 3 |
| Separators | 3 |
| Overlays | 2 |

테마는 `light` · `dark` · `ic---light` · `ic---dark` 4벌이며 **구조가 완전히 동일**합니다.

**같은 개념을 세 층으로 나눕니다** — `Labels`(일반) / `Labels - Vibrant`(재질 위) /
`Labels - Vibrant - Controls`(컨트롤 위). `Fills`도 일반과 Vibrant로 갈립니다.
Liquid Glass 위에 얹히는 요소는 별도 색을 쓴다는 뜻입니다.

`Backgrounds`와 `Backgrounds (Grouped)`가 각각 6개로 분리돼 있습니다 —
그룹 테이블 배경을 별도 계열로 둡니다.

전체 헥스값은 `tokens/{light,dark,ic---light,ic---dark}/colors.json`에 있습니다.

### 스페이싱

**없습니다.** 변수 export 전체를 확인했으나 스페이싱 컬렉션이 존재하지 않습니다.
Apple은 여백을 변수화하지 않고 컴포넌트 프레임에 직접 지정합니다.
아래 실측 치수가 그 정보를 대신합니다.

## 컴포넌트 상세 — 실측 치수

Figma 프레임의 실제 크기입니다 (Toolbars 페이지).

### 터치 타겟 — 상단 44pt, 하단 48pt

| 컴포넌트 | 크기 |
|----------|------|
| 상단 툴바 심볼 버튼 | **44 × 44** |
| 하단 툴바 심볼 버튼 | **48 × 48** |
| 시트 툴바 버튼 | 44 × 44 |

**같은 아이콘 버튼이 위치에 따라 다릅니다.** 킷에 이유는 적혀 있지 않습니다.

심볼 버튼 개수별 너비 (상단): 1개 44 · 2개 104 · 3개 160 · 4개 216 · 5개 272 · 6개 328.
증분 56pt 일정 (44 + 56×(n-1)). 하단은 48 시작에 증분 54~56입니다.

### 툴바

| 컴포넌트 | 크기 |
|----------|------|
| Top · iPhone — Default / Title 2 Line / Compact Large | 402 × 54 |
| Top · iPhone — Large Title | 402 × **125** |
| Bottom · iPhone | 402 × 84 |
| Top · iPad — Default | 820 × 54 |
| Top · iPad — Large Title | 820 × 131 |
| Top · iPad — Title 2 Line (탭바 있음) | 820 × 103 |
| Top · iPad — Title 2 Line Left (탭바 있음) | 820 × 98 |
| Bottom · iPad | 500 × 58 |
| Sheet — Default | 402 × 70 |
| Sheet — Large Title | 402 × 136 |

`402`는 iPhone 기준 폭, `820`은 iPad 기준 폭입니다.

**Large Title이 기본의 2.3배입니다** (54 → 125). iPad는 54 → 131,
시트는 70 → 136으로 컨테이너마다 다릅니다.

### 기타 컨트롤

| 컴포넌트 | 크기 |
|----------|------|
| 검색 — 상단 | 190 × 44 |
| 검색 — 하단 | 190 × 48 |
| 세그먼티드 컨트롤 버튼 | 126 × 36 |
| 텍스트 버튼 | 57 × 36 |
| 뒤로 버튼 | 78 × 36 (라이트) / **80 × 36** (다크) |
| Grabber | 36 × 5 |
| 페이지 도트 | 8 × 8 |

**뒤로 버튼이 다크 모드에서 2pt 넓습니다.** 이유는 킷에 명시돼 있지 않습니다.

## 컴포넌트

Toolbars 페이지에서 확인: 상·하단 툴바(iPhone/iPad/Sheet), 심볼·텍스트·뒤로 버튼,
검색(상단/하단), 세그먼티드 컨트롤, 페이지 컨트롤·도트, Grabber, 타이틀/서브타이틀 스타일.

다른 페이지는 미확인입니다.

## 특징적 결정

- **스페이싱을 토큰화하지 않습니다.** Material 3과 함께 둘뿐이고, 둘 다 모바일 OS입니다.
  타이포·컬러·재질은 변수로 관리하면서 여백만 프레임에 직접 넣습니다.
- **자간이 U자 곡선입니다.** 큰 글자 양수 → 중간 음수 → 아주 작은 글자 다시 양수.
  Material 3(작은 글자만 양수)과도, 자간 0인 시스템들과도 다릅니다.
- **행간을 세 벌로 제공합니다** (Tight / 기본 / Loose). Loose는 전 스타일 +2px 고정입니다.
  행간 변형을 토큰으로 두는 것은 표본에서 Apple뿐입니다.
- **터치 타겟이 화면 위치에 따라 다릅니다.** 상단 44pt, 하단 48pt.
  Material 3의 48dp 단일 최소값과 대비됩니다.
- **재질을 광학 파라미터로 토큰화했습니다.** 굴절·분산·조명 각도·서리 강도 13종.
  다른 시스템의 그림자·엘리베이션과는 층위가 다릅니다.
- **컬러를 재질 층위로 나눕니다.** 일반 / Vibrant / Vibrant-Controls 3층.
  Liquid Glass 위에 얹히는 요소가 별도 색을 갖습니다.
- **시트 라운드가 상하 비대칭입니다.** iPhone 상단 34px, 하단 58px.

## 접근성

44pt 터치 타겟이 접근성 기준으로 널리 인용되지만, 이 킷에서 명시적 준수 목표는
확인하지 못했습니다.

## 참고

- 문서: https://developer.apple.com/design/human-interface-guidelines (이 환경에서 접근 차단)
- Figma: "iOS and iPadOS 26 (Community)" — Apple Design Resources
- 관련 킷: iOS/iPadOS 27, macOS 26/27, watchOS 26, visionOS 26
- **남은 확인 사항:** Toolbars 외 페이지의 컴포넌트 치수
