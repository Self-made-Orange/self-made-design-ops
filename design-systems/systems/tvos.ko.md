---
name: tvOS Design (HIG)
org: Apple
coverage: partial
url: https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos
repo: null
license: "미확인 (2026-08-18 시도: developer.apple.com/design/resources가 JS 렌더링이라 약관 문구 추출 불가 — Figma 커뮤니티 파일 설명 확인은 로컬 세션 몫)"
tech: [문서]
figma_kit: false
tokens_format: [문서]
a11y_target: 미확인
platform: tv
domain: os
verified: 2026-08-17
source: "developer.apple.com HIG DocC JSON — layout.json의 tvOS 절 (그리드·인셋 수치)"
---
<!-- lang-links -->
> [English](tvos.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Apple TV — **`tv` 두 번째 표본**으로 Android TV와 교차 비교가 열렸습니다.
안전 영역이 **상하 60pt / 좌우 80pt 인셋**(오버스캔 대비)이고,
그리드가 **열 수별로 미포커스 콘텐츠 폭을 열거**합니다(2열 860pt · 3열 560pt…).
버튼 중심 간 거리 **최소 60pt**.

## 규격 (HIG layout)

### 안전 영역 — 오버스캔 인셋

```
상·하: 60pt   좌·우: 80pt
```

"구형 TV의 오버스캐닝으로 의도치 않은 크롭"이 명시된 근거입니다.
Android TV 문서에서 미확보였던 **오버스캔 수치가 Apple 쪽에서 확보**됐습니다 —
좌우가 상하보다 넓은 비대칭 인셋입니다.

### 그리드 — 열 수가 폭을 정합니다

| 그리드 | 미포커스 콘텐츠 폭 | 가로 간격 | 세로 최소 간격 |
|:---:|:---:|:---:|:---:|
| 2열 | 860pt | 40pt | 100pt |
| 3열 | 560pt | 40pt | 100pt |

**Android TV의 카드 폭 개수 열거(1장 844dp~5장 124dp)와 정확히 같은 구조**입니다 —
두 TV 플랫폼이 독립적으로 "노출 개수 → 폭" 열거를 택했고, 2열 기준 값도
비슷합니다(Apple 860pt vs Google 844dp). **tv 플랫폼의 수렴 패턴 첫 확인.**

### 포커스 간격

**버튼 중심 간 최소 60pt** — D-pad/리모컨 포커스 이동의 오조작 방지 간격입니다.
터치 타겟(크기 규격)이 아니라 **타겟 간 거리 규격**이라는 점이 tv 고유입니다
(Android Automotive의 타겟 간 24dp와 같은 종류, 값은 2.5배).

## 교차 비교 — tv 2표본

| | Android TV | tvOS |
|---|---|---|
| 안전 영역 | 미확보 | **60/80pt 비대칭 인셋** |
| 폭 열거 | 카드 1~5장 844→124dp | 그리드 2~n열 860→…pt |
| 포커스 피드백 | **1.1배 확대** 규격 | (수치 미확보) |
| 포커스 간격 | 미확보 | **중심 간 60pt** |

두 문서가 서로 다른 축을 수치화해서 **합치면 tv 규격이 완성**되는 관계입니다.

## 특징적 결정

- **tv 두 번째 표본** — Android TV와 교차 비교 개통
- 오버스캔 인셋 60/80pt 비대칭 — tv 유일 종류의 안전 영역
- 열 수별 폭 열거 — Android TV와 독립 수렴 (860≈844)
- 포커스 간격 60pt — 거리 규격
- 공식 Figma 킷 없음 — 문서가 유일 소스

## 접근성

미확인.

## 참고

- **Figma 킷 (false) 근거:** 커뮤니티에 공식 킷 없음 — 기존 확인

- 소스: HIG DocC JSON 채널 (`HARVESTING.md`) — layout.json의 tvOS 절
- **남은 확인 사항:** 타이포 스케일(tvOS 전용 크기), 포커스 확대 배율,
  designing-for-tvos 페이지 전문, 색·재질 규격
