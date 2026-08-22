---
name: Android for Cars / Automotive OS
org: Google
coverage: full
url: https://developer.android.com/docs/quality-guidelines/car-app-quality
repo: null
license: "문서 CC BY 2.5 · 코드 샘플 Apache 2.0 (developer.android.com/license, 2026-08-18 확인)"
tech: [Car App Library, Android]
figma_kit: 미확인
tokens_format: []
a11y_target: 미확인
platform: automotive
domain: os
verified: 2026-08-17
source: "developer.android.com → docs/quality-guidelines/car-app-quality (품질 요구사항 ID 포함)"
---
<!-- lang-links -->
> [English](android-automotive.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Android Automotive OS·Android Auto 앱의 품질 요구사항.
**표본에서 유일한 차량 플랫폼**이며, 다른 어느 시스템에도 없는 종류의 제약을 갖습니다.

## 토큰

**디자인 토큰을 배포하지 않습니다.** Material 3 토큰을 상속하고,
그 위에 차량 전용 **품질 요구사항**을 규격으로 명시하는 구조입니다.

각 요구사항에 ID가 붙어 있어 검증 가능합니다 (`UX-1`, `DR-2` 등).

## 규격 — 다른 플랫폼과 층위가 다릅니다

### 터치 타겟 — 64dp

| 항목 | 값 | ID |
|------|:---:|:---:|
| 터치 타겟 최소 크기 | **64dp** | `UX-1` |
| 타겟 간 최소 간격 | **24dp** | `UX-2` |
| 화면 가장자리로부터 최소 거리 | **24dp** | `UX-2` |

**64dp는 표본 최대입니다.** 비교하면 이렇습니다.

| 플랫폼 | 터치 타겟 |
|--------|:---:|
| **Android Automotive** | **64dp** |
| Material 3 (모바일) | 48dp |
| Apple iOS 하단 툴바 | 48pt |
| Apple iOS 상단 툴바 | 44pt |
| visionOS 드롭다운 | 44pt |

모바일(48dp)의 **1.33배**입니다.

**타겟 간 간격을 규격화한 것은 이 시스템뿐입니다.** 다른 시스템은 터치 타겟 크기만 말하고
간격은 스페이싱 스케일에 맡깁니다. 차량에서는 24dp 간격이 요구사항입니다.

### 최소 폰트 크기 — 24sp

| 항목 | 값 | ID |
|------|:---:|:---:|
| 최소 폰트 크기 | **24sp** | `UX-3` |

**표본에서 압도적으로 큽니다.**

| 시스템 | 본문 기본 |
|--------|:---:|
| **Android Automotive (최소)** | **24sp** |
| Apple iOS (Body) | 17pt |
| Canvas · Paste · Material 3 Body Large | 16px |
| Ant Design · Material 3 Body Medium · Helios | 14px |
| Evergreen (caption) | 10px |

차량의 최소 크기가 다른 시스템의 **가장 큰 본문보다도 큽니다.**
Material 3 기준으로 `Headline Small`(24px)에 해당합니다.

### 시간 제약 — 다른 어느 시스템에도 없는 축

| 항목 | 제한 | ID |
|------|:---:|:---:|
| 버튼 응답 시간 | **2초 이내** | `DR-1` |
| 앱 실행 시간 | **10초 이내** | `DR-2` |
| 콘텐츠 로딩 시간 | **10초 이내** | `DR-3` |

**응답 시간을 디자인 요구사항으로 규정합니다.** 표본 34개 중 유일합니다.
다른 시스템에서 시간은 모션·트랜지션 토큰(`transition`·`motion`)의 영역이고,
"얼마나 빨라야 하는가"는 규격에 없습니다.

### 태스크 단계 제약

| 항목 | 제한 | ID |
|------|:---:|:---:|
| 태스크 완료까지 화면 수 | **5개 이하** | `AC-1` |

**화면 수를 세어 제한합니다.** 인터랙션 깊이를 규격으로 못박은 유일한 사례입니다.

### 정보량 제약 (앱 카테고리별 예시)

| 항목 | 제한 | ID |
|------|:---:|:---:|
| 날씨 지도 주석 (한 뷰당) | 5개 이하 | `WE-5` |
| 지도 타일 범례 | 3개 이하 | `WE-2` |
| 범례가 여럿이면 색상 | 3개 이하 | `WE-2` |

**한 화면에 담을 정보의 개수까지 제한합니다.**

### 주행 중 제약 (UX Restrictions)

Android Automotive OS에는 **주행 중 앱 사용을 자동 차단하는 기능**이 내장돼 있습니다.

- 앱은 distraction-optimized 액티비티를 포함하지 않아야 합니다
- `distractionOptimized` 메타데이터는 Car App Library로 만든
  `CarAppActivity`를 선언할 때만 씁니다. 다른 액티비티에는 붙이지 않습니다

**플랫폼이 런타임에 UI를 막습니다.** 다른 어느 플랫폼에도 없는 개념입니다.

### 앱 수집 깊이

요구사항이 수집 깊이로 나뉩니다.

| 수집 깊이 | 이름 |
|:---:|------|
| 1 | Car differentiated |
| 2 | Car optimized |

카테고리별로 다른 요구사항이 적용됩니다 — Media · Navigation · POI · Weather ·
Video · Games · Browsers.

## 컴포넌트

Car App Library의 템플릿 기반입니다. 목록은 미확인입니다.

## 특징적 결정

- **터치 타겟이 64dp로 표본 최대입니다.** 모바일의 1.33배입니다.
- **타겟 간 간격(24dp)과 화면 가장자리 거리(24dp)를 규격화합니다.**
  다른 시스템은 간격을 스페이싱 스케일에 맡깁니다.
- **최소 폰트가 24sp입니다.** 다른 시스템의 최대 본문 크기보다 큽니다.
- **응답 시간을 규격으로 둡니다** (버튼 2초, 실행·로딩 10초).
  표본에서 시간 제약을 규격화한 유일한 사례입니다.
- **태스크 단계 수를 제한합니다** (5화면 이하). 인터랙션 깊이를 세어 제한합니다.
- **한 화면의 정보 개수를 제한합니다** (지도 주석 5개, 범례 3개).
- **플랫폼이 주행 중 UI를 런타임에 차단합니다.** 디자인 지침이 아니라 강제 기능입니다.
- **자체 토큰이 없습니다.** Material 3을 상속하고 규격만 추가합니다.
- **요구사항마다 ID가 있습니다** (`UX-1`·`DR-2`·`AC-1`). 검증·감사가 가능한 구조입니다.

## 접근성

미확인. 다만 24sp 최소 폰트와 64dp 터치 타겟은 접근성 기준을 크게 상회합니다.

## 참고

- 품질 요구사항: https://developer.android.com/docs/quality-guidelines/car-app-quality
- Automotive OS 개요: https://developer.android.com/training/cars/platforms/automotive-os
- AOSP 주행 방해 지침: https://source.android.com/docs/automotive/driver_distraction/guidelines
  (이 환경에서 `source.android.com`은 차단)
- **남은 확인 사항:** Car App Library 템플릿 목록, 컬러·타이포 토큰 상속 방식,
  주야간 휘도 전환 규격
