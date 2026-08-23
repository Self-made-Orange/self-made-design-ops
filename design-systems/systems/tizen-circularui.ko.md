---
name: Tizen Wearable CircularUI
org: Samsung
coverage: partial
url: https://samsung.github.io/Tizen.CircularUI
repo: https://github.com/Samsung/Tizen.CircularUI
license: Apache-2.0
tech: [Xamarin.Forms, C#]
figma_kit: false
tokens_format: [문서, API 기본값]
a11y_target: 미확인
platform: wearable
domain: os
verified: 2026-08-17
source: "github Samsung/Tizen.CircularUI@bd20530f2f → README.md + doc/design/part01~16 (아카이브 — 2023-04 동결, 문서가 한국어)"
---
<!-- lang-links -->
> [English](tizen-circularui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

삼성 Galaxy Watch(Tizen)용 UI — **wearable 두 번째 표본**입니다.
콘텐츠 영역을 **"원에 내접하는 사각형"**으로 정의하고, **베젤 회전**이 입력 축이며,
**토스트 기본 지속시간 3000ms가 API 기본값**으로 박혀 있습니다 —
코퍼스에서 토스트 지속시간의 **첫 표본**입니다.

## 원형 화면의 기하학 — Wear OS와 다른 답

```
TwoButtonPage: "Circle에 내접하는 사각형 영역을 Contents 영역으로 가진다"
             + Overlap 옵션 (콘텐츠가 버튼과 겹칠지 여부)
CircleStackLayout: 원형 영역 안에서 자식을 선형 배치
CircleImage: 이미지를 원형으로 크롭
```

- **Google Wear OS는 여백을 %로 잡아 클리핑을 피하고, Samsung은 내접
  사각형으로 안전 영역을 기하학적으로 정의합니다** — 같은 원형 화면 문제에
  두 회사가 다른 해법입니다 (`systems/wear-os.md` 교차)
- 컨트롤 이름이 **`Circle*` 접두 20종** (CircleListView · CircleScrollView ·
  CircleDateTimeSelector · CircleProgressBar…) — 원형 대응이 컴포넌트
  이름 공간 자체입니다

## 베젤 회전 — 하드웨어 입력 축

`BezelInteractionPage` · `CircleSliderSurfaceItem`("베젤 액션에 반응") —
**시계 테두리 회전이 스크롤·값 조정 입력**입니다. Apple 크라운과 같은 자리의
삼성 답이며, 입력 방식 축(`platforms.md`)에 **bezel rotation**이 추가됩니다.

## 토스트 — 지속시간 첫 표본

```csharp
public static void DisplayText(string text, int duration = 3000)
```

**기본 3000ms(3초)가 API 시그니처에 기본값으로 명시**돼 있습니다.
`patterns/feedback.md`의 "토스트 지속시간 — 표본 어디에도 없음"이
여기서 처음 채워졌습니다. 시간이 지나면 자동 소멸합니다.

## 그 외

- `CircleDateTimeSelector`가 **팝업 없이 페이지 인라인**입니다 — Xamarin 기본
  (팝업형)과 명시적으로 다른 선택. 작은 화면에서 모달 중첩을 피하는 판단
- `TwoButtonPage/Popup` — 원형 화면의 2버튼 배치를 페이지 유형으로 규격화
- **설계 문서가 한국어입니다** (`doc/design/*.md`) — 코퍼스에서 한국어가
  1차 문서 언어인 유일한 비한국 기업 사례
- 상태: Xamarin.Forms 기반 (Galaxy Watch가 Wear OS로 전환된 이후의
  레거시 — 저장소 활동 상태는 미확인)

## 특징적 결정

- **wearable 2번째 표본** — 원형 안전 영역을 내접 사각형으로 (Wear OS %와 대비)
- **베젤 회전 입력 축** — 표본 유일 하드웨어 입력
- **토스트 3000ms 기본값** — 코퍼스 첫 토스트 지속시간 표본
- 날짜 선택을 인라인으로 (팝업 회피)
- `Circle*` 이름 공간 20종

## 접근성

미확인.

## 참고

- 소스: `git clone --depth 1 Samsung/Tizen.CircularUI` (raw.githubusercontent가
  일시 429일 때 clone이 우회가 됩니다 — `HARVESTING.md`)
- **남은 확인 사항:** 치수 규격(문서에 px 값 없음 — 스크린샷 기반),
  Galaxy Watch(Wear OS 전환 후)의 현행 시스템, One UI Watch와의 관계
