---
name: visionOS Design Resources
org: Apple
coverage: partial
url: https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
repo: null
license: "미확인 (2026-08-18 시도: developer.apple.com/design/resources가 JS 렌더링이라 약관 문구 추출 불가 — Figma 커뮤니티 파일 설명 확인은 로컬 세션 몫)" (Apple Design Resources)
tech: [SwiftUI, RealityKit]
figma_kit: true
tokens_format: [Figma Variables]
a11y_target: 미확인
platform: spatial
domain: os
verified: 2026-08-16
source: "Figma 'Apple Design Resources - visionOS (Community)' → Drop Downs 페이지"
---
<!-- lang-links -->
> [English](visionos.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Apple Vision Pro의 공간 UI 지침. **표본에서 유일한 공간 컴퓨팅 플랫폼**이며,
iOS와 같은 SF Pro를 쓰면서도 **수치가 다릅니다.**

## 토큰

### 타이포그래피 — SF Pro, iOS와 다른 값

| 스타일 | visionOS | iOS 26 | 차이 |
|--------|:---:|:---:|---|
| Title 2 | 22 / 28 · 자간 **0** | 22 / 28 · 자간 **-0.26** | 크기 같음, **자간 다름** |
| Title 3 | **19** / 24 · 자간 **0** | **20** / 25 · 자간 **-0.45** | 크기·행간·자간 모두 다름 |

**같은 서체·같은 스타일 이름인데 값이 다릅니다.**

- **Title 3가 19px입니다.** iOS는 20px입니다. 홀수 크기를 쓰는 드문 사례입니다.
- **자간이 전부 0입니다.** iOS는 이 구간에서 음수(-0.26 ~ -0.45)를 씁니다.
  **거리를 두고 보는 화면이라 자간을 좁히지 않는다는 해석이 가능하지만,
  킷에 근거는 적혀 있지 않습니다.**
- **기본 굵기가 Bold(700)입니다.** iOS의 같은 스타일은 Regular(400)이 기본입니다.

확인한 스타일은 2종뿐입니다. 전체 스케일은 미확인입니다.

### 컬러 — 두 값을 쉼표로 묶습니다

| 토큰 | 값 |
|------|-----|
| `Text/Primary` | `#FFFFFF` |
| `Text/Secondary` | `#FFFFFF, #545454` |
| `Text/Tertiary` | `#FFFFFF, #5E5E5E` |
| `Controls/Hover` | `#FFFFFF, #5E5E5E` |
| `Controls/Disabled` | `#FFFFFF, #5E5E5E` |
| `Colors/Black` | `#000000` |
| `Colors/Gray` | `#98989D` |

**대부분의 토큰이 두 색을 쉼표로 묶어 갖습니다.** `Text/Primary`와 `Colors/*`만 단일 값입니다.
두 값의 의미(그라디언트 / 모드별 / 재질 위·아래)는 킷에서 확인하지 못했습니다.

**`Text/Primary`가 흰색입니다.** 다크 기본이라는 뜻이며, iOS(라이트·다크 양쪽 테마)와 다릅니다.

### 스페이싱 / 라운드

미확인.

## 컴포넌트 상세

### Drop Down Button — Hover 상태가 있습니다

| 상태 | 크기 |
|------|------|
| Idle (**No Platter**) | 120 × 44 |
| **Hover** | 120 × 44 |
| Selected | 120 × 44 |
| Disabled | 120 × 44 |

**터치 타겟 높이가 44pt로 iOS 상단 툴바와 같습니다.**

두 가지가 iOS·Android와 갈립니다.

- **`Hover` 상태가 존재합니다.** iOS 킷에는 없습니다.
  visionOS는 시선(gaze)으로 대상을 가리키므로, 탭 이전에 "보고 있는" 상태가 생깁니다.
  **마우스가 없는 플랫폼에 hover가 있는 유일한 사례입니다.**
- **`No Platter`라는 상태 이름을 씁니다.** Platter는 visionOS에서 컨트롤 뒤에 깔리는
  유리판 배경을 뜻합니다. 기본 상태가 "판 없음"이라는 것은 배경이 옵션이라는 의미입니다.

## 컴포넌트

Drop Downs 페이지에서 확인: Drop Down Button (4상태).
다른 페이지는 미확인입니다.

## 특징적 결정

- **iOS와 같은 서체·스타일 이름을 쓰면서 값이 다릅니다.**
  Title 3 19px vs 20px, 자간 0 vs -0.45.
  **"Apple 디자인시스템"을 하나로 취급하면 안 된다는 근거입니다.**
- **자간을 0으로 통일합니다.** iOS가 크기별로 U자 곡선을 그리는 것과 대비됩니다.
- **다크 기본입니다.** `Text/Primary`가 흰색입니다.
- **컬러 토큰이 두 값을 갖습니다.** 표본에서 이런 구조는 visionOS뿐입니다.
- **Hover 상태를 정의합니다.** 시선 입력 때문이며, 터치 전용 플랫폼과 갈립니다.
- **기본 굵기가 Bold입니다.** 확인한 두 스타일 모두 Bold(700)가 기본입니다.

## 접근성

미확인.

## 참고

- 문서: https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
  (이 환경에서 접근 차단)
- Figma: "Apple Design Resources - visionOS (Community)"
- **남은 확인 사항:** 전체 타이포 스케일, 스페이싱, 라운드, 깊이(z축) 토큰,
  Drop Downs 외 페이지의 컴포넌트
