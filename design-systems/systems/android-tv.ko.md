---
name: Android TV Design
org: Google
coverage: partial
url: https://developer.android.com/design/ui/tv
repo: null
license: "문서 CC BY 2.5 · 코드 샘플 Apache 2.0 (developer.android.com/license, 2026-08-18 확인)"
tech: [Compose for TV]
figma_kit: 미확인
tokens_format: [문서]
a11y_target: 미확인
platform: tv
domain: os
verified: 2026-08-17
source: "developer.android.com/design/ui/tv/guides — {design-for-tv, buttons, cards, navigation-drawer} (HTML 실측)"
---
<!-- lang-links -->
> [English](android-tv.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**코퍼스 첫 `tv` 표본 — 마지막 플랫폼 공백이 닫혔습니다.**
시청 거리 **3m(10ft)** 전제에 **D-pad 포커스가 1차 상태**이고
(hover·터치 없음), 포커스 피드백이 **컨테이너 1.1배 확대**로 규격화돼 있으며,
카드 폭이 **노출 개수별로 열거**됩니다(1장 844dp ~ 5장 124dp).

## 전제 — 10ft UI

- **시청 거리 3m** — 코퍼스 거리 축의 최댓값입니다
  (wearable 20~30cm → mobile 25~40 → desktop 50~70 → automotive 60~90 → **tv 300cm**)
- **D-pad(상하좌우+선택)가 유일한 입력** — "즉각적이고 뚜렷한 피드백" 요구
- **공용 기기** — 개인정보 노출을 설계 고려사항으로 명시.
  프라이버시가 플랫폼 특성으로 문서화된 표본 유일 사례입니다

## 상태 — `Default · Focused · Pressed`

**hover가 없고 `Focused`가 1차 상태입니다.** 전 컴포넌트(버튼·카드·리스트)의
상태 열거가 이 3종입니다. 플랫폼 상태 어휘 표가 완성됩니다:

| 플랫폼 | 탭 이전 상태 | 메커니즘 |
|--------|------|------|
| web | hover | 마우스 |
| spatial (visionOS) | Hover | **시선** |
| desktop (macOS) | 킷에 미열거 / 검색 Focused | 키보드 |
| **tv** | **Focused** | **D-pad 이동** |
| mobile · wearable | 없음 | 터치 직행 |

**포커스 피드백이 수치 규격입니다** — "컨테이너가 포커스 시 **1.1배** 확대,
내부 패딩 유지". 아웃라인 버튼은 확대 + 스트로크·필 색 전환.
포커스를 크기로 표현하는 것은 표본 유일입니다 (웹은 색·링).

## 카드 — 폭이 노출 개수로 열거

```
1장 844dp · 2장 412 · 3장 268 · 4장 196 · 5장 124
비율: 1:1(인물·로고) · 2:3(도서) · 16:9(영상)
```

**"화면에 몇 장 보이느냐"가 폭을 정합니다** — iOS 페이지 점(+16/개) ·
macOS 탭(+44/개) · CarPlay(템플릿 개수 제한)와 같은 **개수 열거 진영**의
TV판이며, 콘텐츠 **비율을 용도별로 지정**하는 것은 미디어 도메인 특성입니다.

## 내비게이션 — 드로어의 두 상태가 다 보입니다

- **collapsed(레일: 아이콘만) ↔ expanded(아이콘+텍스트)가 둘 다 화면에
  존재**합니다 — 모바일 드로어(숨김↔노출)와 달리 접힘이 기본 노출 상태
- expanded 시 standard는 콘텐츠를 밀고, modal은 스크림 오버레이
- 버튼 라운드 12dp (wide/image 버튼 컨테이너)

## 특징적 결정

- **첫 `tv` 표본 — 플랫폼 7축이 전부 채워졌습니다**
- 시청 거리 3m — 거리 축 최대
- **`Focused`가 1차 상태 + 1.1배 확대 규격** — 포커스를 크기로 표현
- 카드 폭 개수 열거(844→124dp) + 용도별 비율 지정
- 공용 기기 프라이버시가 설계 고려사항으로 명문화 — 표본 유일
- 드로어 collapsed가 숨김이 아니라 레일

## 접근성

미확인 (D-pad 전제 자체가 포커스 내비게이션 규격).

## 참고

- 문서: developer.android.com/design/ui/tv (프록시 통과 확인 — HTML 실측)
- **남은 확인 사항:** 타이포 스케일 수치, 오버스캔 안전 영역 값,
  색 토큰, Compose for TV 코드 레벨 값, tvOS(Apple)와의 교차 비교
