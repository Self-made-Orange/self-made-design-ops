---
name: CarPlay (Human Interface Guidelines)
org: Apple
coverage: partial
url: https://developer.apple.com/design/human-interface-guidelines/carplay
repo: null
license: "미확인 (2026-08-18 시도: developer.apple.com/design/resources가 JS 렌더링이라 약관 문구 추출 불가 — Figma 커뮤니티 파일 설명 확인은 로컬 세션 몫)"
tech: [CarPlay framework, SwiftUI]
figma_kit: 미확인
tokens_format: []
a11y_target: 미확인
platform: automotive
domain: os
verified: 2026-08-17
source: "developer.apple.com HIG (검색 결과 경유 — 원문은 JS 렌더링으로 직접 파싱 불가)"
---
<!-- lang-links -->
> [English](carplay.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Apple CarPlay의 차량 UI 지침. **템플릿 기반**이라 개발자가 레이아웃을 직접 짜지 않고,
Apple이 정한 템플릿에 콘텐츠만 넣습니다.

> **수집 제약.** Apple HIG 문서는 클라이언트 JS로 렌더링되며, 이 환경에서
> 브라우저 렌더링이 프록시에 차단됩니다 (`ERR_CONNECTION_RESET`).
> curl로는 JS 셸(156자)만 받힙니다. 아래는 **검색 결과 경유로 확인한 내용**이며,
> Android Automotive 항목만큼 정밀하지 않습니다.

## 규격

### 터치 타겟 — 44×44pt

| 항목 | 값 |
|------|:---:|
| 최소 탭 영역 | **44 × 44 pt** |

**이 값은 CarPlay 전용이 아니라 iOS·iPadOS 일반 지침입니다.**
CarPlay 고유 값이 별도로 있는지는 확인하지 못했습니다.

Android Automotive(64dp)와 비교하면 **CarPlay가 20dp 작습니다.**
두 차량 플랫폼이 터치 타겟에서 갈립니다.

| 플랫폼 | 터치 타겟 |
|--------|:---:|
| Android Automotive | **64dp** |
| **CarPlay** | **44pt** (iOS 일반값) |

### 템플릿 — 개수 제한이 규격입니다

CarPlay는 개발자가 화면을 자유롭게 만들 수 없고, **정해진 템플릿만** 씁니다.

| 템플릿 | 제한 |
|--------|------|
| **Grid** | 항목 **8개 이하** |
| **Point of Interest** | 지도상 POI **12개 이하** |
| **Tab Bar** | 탭 **5개 이하** |
| **Contact** | 버튼 **4개 이하** |
| **Information** | 버튼 **3개 이하** |
| Action Sheet | 메시지 + 버튼 |
| Alert | 짧은 메시지 + 버튼 |
| List | 계층형 메뉴 목록 |
| Map | 패닝·경로 정보 지원 |
| Now Playing | 재생 정보 |
| Search | 입력 중 결과 표시 |

**정보 개수를 템플릿 정의에 못박습니다.** Android Automotive가 카테고리별 요구사항으로
개수를 제한한 것(지도 주석 5개, 범례 3개)과 목적이 같지만, **CarPlay는 API 레벨에서 강제**합니다.

### 안전 영역

iOS·iPadOS의 `safe area` 개념을 씁니다 — 내비게이션 바·탭 바·툴바,
그리고 상태 바·홈 인디케이터·Dynamic Island가 가리지 않는 영역입니다.

CarPlay 고유의 안전 영역 수치는 확인하지 못했습니다.

### 화면 크기·방향 — HIG DocC JSON으로 확보 (2026-08-17)

화면 크기와 종횡비가 차량마다 다르며, **가로·세로 양쪽을 지원**해야 합니다.
공식 화면 규격 4종이 확인됐습니다 (carplay.json):

| 해상도(px) | 종횡비 |
|:---:|:---:|
| 800×480 | 5:3 |
| 960×540 | 16:9 |
| 1280×720 | 16:9 |
| **1920×720** | **8:3** |

- **8:3 울트라와이드가 공식 규격에 있습니다** — 표본 전체에서 가장 넓은
  종횡비이며, 차량 대시보드 디스플레이의 형태 다양성이 규격으로 명문화된
  자리입니다 (Wear OS의 "지름 단일 치수"와 대칭적인 극단)
- 앱 아이콘: @2x 120×120 / @3x 180×180px
- 1280×720은 macOS 기본 창 크기(1280×720pt)와 수치가 같습니다 — 단위가
  px/pt로 다르며 소스에 관계 언급은 없습니다

### 타이포그래피 / 컬러 / 스페이싱

미확인. iOS 26 킷의 SF Pro 스케일을 상속하는지도 확인하지 못했습니다.

## 컴포넌트

위 템플릿 11종이 사실상 컴포넌트 목록입니다.

## 특징적 결정

- **템플릿 기반입니다.** 개발자가 레이아웃을 짜지 않습니다.
  표본 34개 중 컴포넌트 조합이 아니라 **완성된 화면 템플릿**을 제공하는 유일한 사례입니다.
- **정보 개수를 템플릿에 못박습니다.** Grid 8개, POI 12개, Tab 5개.
  API가 그 이상을 받지 않습니다.
- **터치 타겟이 44pt로 Android Automotive(64dp)보다 작습니다.**
  같은 차량 플랫폼인데 1.45배 차이가 납니다. 두 회사가 같은 문제에 다르게 답했습니다.
- **자체 토큰을 배포하지 않습니다.** Android Automotive와 같습니다 —
  차량 플랫폼 둘 다 모(母) 시스템의 토큰을 상속합니다.

## 접근성

미확인.

## 참고

- HIG: https://developer.apple.com/design/human-interface-guidelines/carplay
- 프레임워크 문서: https://developer.apple.com/tutorials/data/documentation/carplay.json
  (**JSON API로 접근 가능** — 프레임워크 API 문서이며 디자인 지침은 아닙니다)
- **남은 확인 사항:** CarPlay 고유 터치 타겟·안전 영역 수치, 타이포 스케일, 컬러 규격
  (화면 규격 4종·아이콘 크기는 확보됨)
- **수집 방법 (정정):** "HIG가 JS 렌더링이라 정적 fetch 불가"는 **더는 사실이
  아닙니다** — DocC JSON 백엔드(`/tutorials/data/design/human-interface-guidelines/
  carplay.json`)가 프록시를 통과합니다. `HARVESTING.md` 채널 절 참조.
