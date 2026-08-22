---
name: macOS 26 (Apple Design Resources)
org: Apple
coverage: partial
url: https://www.figma.com/community (macOS 26 공식 킷)
repo: null
license: "미확인 (2026-08-18 시도: developer.apple.com/design/resources가 JS 렌더링이라 약관 문구 추출 불가 — Figma 커뮤니티 파일 설명 확인은 로컬 세션 몫)"
tech: [Figma Kit]
figma_kit: true
tokens_format: [Figma Variables]
a11y_target: 미확인
platform: desktop
verified: 2026-08-17
source: "Figma 커뮤니티 파일 'macOS 26' (Apple Design Resources), 로컬 복제본에서 읽음 — 복제본 fileKey는 의도적으로 기록하지 않습니다, HARVESTING.md 참고 → 12페이지 실측 (207:14473~14503 — 사용자 URL 3 + ID 프로브로 7 자체 발견) + developer.apple.com HIG DocC JSON"
domain: os
---
<!-- lang-links -->
> [English](macos.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**코퍼스 첫 `desktop` 표본 — 킷 12페이지 실측.** 컨트롤 크기가
**16/20/24/28/36 5단계**로 모바일 터치 타겟(44/48pt)의 절반 좌표계이고,
**창 활성/비활성(`Active Window`)이 변형 축**이며(표본 유일),
**Liquid Glass 7파라미터는 iOS 26과 완전 동일**합니다.

> **정정 2건.** (1) 초기에 "컨트롤이 Medium 24/XL 36 두 단계"로 적었으나
> **툴바 한정**이었습니다 — Combo Box·Search Field에서 16/20/24/28/36
> 5단계가 확인됐습니다. (2) "desktop 킷에 Hover 미열거"도 틀렸습니다 —
> **Menus 페이지에 Hover가 있고, `Hover + Key` 조합 상태까지 있습니다.**

## 실측 — Toolbars and Titlebars 페이지

### 컨트롤 높이 — 24 / 36 두 단계

| 컴포넌트 | Medium | XL |
|----------|:---:|:---:|
| Button | 36×**24** | 36×**36** |
| Segmented Control | h**24** | h**36** |
| Button Group | h24 | h36 |
| Search | 130×24 | 130×36 |
| Pull Down Button | 39×24 | 50×36 |
| Pop-Up Button | 57×24 | 63×36 |

**전 컨트롤이 같은 두 높이를 공유합니다.** 이름이 `Medium`/`XL`이고
Small·Large가 이 페이지에 없습니다.

**같은 Apple인데 좌표계가 절반입니다:**

| | macOS (desktop) | iOS (mobile) |
|---|:---:|:---:|
| 기본 컨트롤 | **24pt** | 44pt (터치 타겟) |
| 큰 컨트롤 | **36pt** | 48pt (하단) |
| 타이틀/툴바 | **22~32pt** | 54~84pt |

`platforms.md`의 "플랫폼이 값을 가른다"의 가장 극단적 사례입니다 —
**마우스 포인터 전제가 터치 대비 45~55% 치수를 만듭니다.**

### 타이틀 바 — 창 종류별 2단계

| 창 | 타이틀 바 높이 |
|------|:---:|
| Standard Window | **32** |
| **Utility Panel** | **22** |

유틸리티 패널(팔레트 창)이 표준 창보다 10pt 낮습니다 —
창의 위계가 크롬 높이로 표현됩니다. iPhone(54)·시트(70)·하단(84)과 이어 보면
**Apple의 바 높이가 22~84pt까지 컨테이너 종류로만 4배 갈립니다.**

### 개수별 열거 — iOS 패턴의 데스크톱판

**Segmented Control: `Size × Buttons(2~6) × Selected(1~N + None)`** — 변형 55개+.

| 항목 | Medium | XL |
|------|:---:|:---:|
| 버튼 6개 폭 | 235 (≈39/개) | 203 (≈34/개) |
| 버튼 2개 폭 | 79 | 71 |

**`Selected=None` 변형이 있습니다** — iOS 세그먼트에는 없는 상태입니다.
macOS 세그먼트는 선택 없음이 유효 상태입니다 (툴바 모드 전환 vs 명령 버튼).

**XL(36pt)이 Medium(24pt)보다 버튼당 폭이 좁습니다** (34 vs 39/개) —
높이가 커지며 폭이 줄어드는 역방향입니다. 킷에 이유는 없습니다.

**Utility Panel Tabs: `Tabs(2~6) × Selected`** — 폭 88/132/176/220/264,
**탭당 정확히 +44pt 등차**. 높이 29. iOS 페이지 컨트롤(점당 +16)과 같은
개수 열거 방식입니다 (`patterns/navigation.md`).

### 상태 어휘 — `Clicked`, 그리고 클릭의 해부

```
기본: Idle · Clicked · Disabled (+ Selected)
메뉴: Idle · Hover · Hover + Key · Disabled     ← Hover 존재 (정정)
스테퍼: Clicked - Up / Clicked - Down            ← 클릭 위치 분리
콤보박스: Field Clicked / Button Clicked         ← 클릭 영역 분리
검색: Placeholder · Value · Typing · Focused (+ Disabled 조합)
```

- **`Pressed`가 아니라 `Clicked`입니다** — iOS(`Selected`/`Tinted`) ·
  visionOS(`Hover`)에 이어 **Apple 안에서 플랫폼마다 상태 이름이 다른 세 번째 사례**
- **메뉴에는 Hover가 있고 `Hover + Key`가 별도입니다** — 마우스 올림과
  "마우스 올림 + 키보드 탐색 중"을 구분합니다. **두 입력 장치의 동시 상태를
  열거한 표본 유일 사례**입니다 (Submenu 타입에만 있고 Action에는 없음)
- **클릭이 해부됩니다** — 스테퍼는 위/아래 반쪽(`Clicked - Up/Down`),
  콤보박스는 필드/버튼 영역(`Field/Button Clicked`)을 별도 상태로 둡니다.
  단일 `pressed`로 뭉개는 웹 다수와 대비되는 정밀도입니다
- **검색에 `Focused`와 `Typing`이 별도** — 키보드 포커스 추가
  (`platforms.md`: web hover / spatial gaze / desktop keyboard focus)
- **`Value + Disabled` 같은 조합 상태**를 명시적 변형으로 둡니다

### `Active Window` 축 — 데스크톱 유일의 변형 차원

**Push Button(7스타일 × On/Off × 3상태) · Stepper · List 선택 행이 전부
`Active Window=True/False` 변형을 갖습니다** — 창이 비활성이 되면 컨트롤이
회색조로 가라앉는 데스크톱 동작이 **변형 축으로 열거**돼 있습니다.
리스트는 `Selected` 외에 **`Selected Inactive`**를 둡니다.
다중 창 전제가 없는 다른 6개 플랫폼 어디에도 없는 축입니다.

### 컨트롤 5단계 — 16 · 20 · 24 · 28 · 36

Combo Box·Search Field가 **같은 5단계**를 공유합니다. 폼 컨트롤은 더 작습니다 —
Switch 36×16 · 라디오/체크 16 · 테이블 행 **20** · 메뉴 항목 24 ·
사이드바 항목 24/32/40. 데스크톱 절반 좌표계가 5단계 전체로 확인됩니다.

### 페이지별 확보 수치 (12페이지)

| 페이지 | 핵심 수치 |
|--------|-----------|
| Menu Bar and Dock | 메뉴 바 심볼 34(항목 24 — HIG 문서는 24pt) · 독 아이콘 36 · 앱 아이콘 72 × Default/**Dark** 2모드 40여 종 · 템플릿 1512×982 |
| Menus | 항목 160×24 · 구분선 h11 · 단축키 h16 · 메뉴 폭 190~250 |
| Combo Boxes | **5단계 16/20/24/28/36** · Field/Button Clicked |
| Forms | **시스템 컬러 16색 열거**(Mint·Teal·Cyan·Indigo…) · 액세서리 12종 · Form Stepper만 `Focused` |
| Buttons | Push Button **스타일 7종**(Bordered Neutral/Colored/Destructive/Secondary · Default/Preferred · Borderless ×2) × On/Off × 3상태 × Active Window = 84변형 · 화살표 버튼 16~36 |
| Search Fields | 5단계 + **Context 4종**(Content Area/Over-glass × Form 여부) |
| Sheets | 시트 심볼 300×300 |
| Sidebars | 항목 3크기(24/32·34/40) × **들여쓰기 Level 0~4** · 섹션 헤더 34/39/43 · 폭 240 |
| Steppers | 20×24 · Clicked Up/Down · No/Inside/Outside Field 3배치 |
| Lists and Tables | **행 20** · 열 헤더 28 · Selected/**Selected Inactive**/Alternating Gray · 트리 Level 0~4 |
| Toolbars | (기존 실측 — 상단 절 참조) |
| Tooltips | 97×18 |

**`Over-glass` 컨텍스트 축** — 검색 필드가 "Liquid Glass 위에 있는가"를
변형으로 둡니다. 재질이 컴포넌트 변형 축으로 들어온 표본 유일 사례이며,
Cloudscape의 컨텍스트 오버라이드와 같은 문제를 변형 열거로 풉니다.

**사이드바 Level 0~4 vs HIG "2단계까지"** — 킷은 들여쓰기 5레벨을 제공하고
문서는 2단계를 권고합니다. 도구가 제공하는 범위와 지침이 다른 실례입니다.

## HIG 문서 보강 — 메뉴 바 24pt · 기본 창 1280×720

Figma 킷의 페이지 열거가 막혀 있던 자리를 **HIG의 DocC JSON 백엔드**
(`developer.apple.com/tutorials/data/design/human-interface-guidelines/*.json` —
프록시 통과)로 보강했습니다:

| 항목 | 값 | 출처 |
|------|:---:|------|
| **메뉴 바 높이** | **24pt** | the-menu-bar.json |
| **기본 창 크기** | **1280×720pt** | windows.json |

크롬 축이 완성됩니다 — **유틸리티 패널 22 · 메뉴 바 24 · 표준 타이틀 바 32pt**.
메뉴 바(24)가 타이틀 바(32)보다 낮습니다.

판단 지침도 같은 채널로 확보했습니다 (킷에 없던 종류):
사이드바 계층은 **최대 2단계**(더 깊으면 split view로) · 사이드바 숨김은
"기본으로 숨기지 말 것" · 사이드바 아이콘은 시스템 강조색 추종 등
(`scratchpad/hig/*.txt` 원문 보존).

## 변수 — Liquid Glass가 iOS와 동일합니다

```
Liquid Glass/Refraction 100 · Dispersion 0 · Light Angle -45
Frost - Regular 7 · Depth - Regular 16 · Splay - Regular 6
```

**iOS 26 킷과 7파라미터 전부 같은 값입니다** (`systems/apple-hig.md`).
타이포(590 가중치)·치수가 플랫폼마다 갈리는 것과 달리
**재질 물리값은 플랫폼 불변 상수**로 관리됩니다.

`Labels/Primary`가 `#000000d9`(검정 85%)입니다 — iOS의 알파 내장 8자리 헥스와 같은 방식.

**Vibrant 계열 그룹명에 블렌드 모드 지시가 들어 있습니다** —
`Labels - Vibrant (Use Plus Lighter | Darker)`. **사용법이 토큰 이름에 박힌**
표본 유일 사례입니다.

## 특징적 결정

- **첫 `desktop` 표본** — 컨트롤 5단계 16~36pt, 모바일의 절반 좌표계
- **`Active Window` 변형 축** — 창 활성/비활성, 표본 유일 차원
- **`Hover + Key` 조합 상태** — 두 입력 장치의 동시 상태, 표본 유일
- 클릭의 해부 (Up/Down · Field/Button) — 클릭 위치·영역이 상태
- **`Over-glass` 컨텍스트 축** — 재질 위 여부가 컴포넌트 변형
- **Liquid Glass 7파라미터가 iOS와 완전 동일** — 재질은 불변, 치수는 가변
- **`Clicked` 상태 어휘** — Apple 플랫폼별 상태 이름 3종째
- **검색의 `Focused` 별도 상태** — 키보드 전제가 상태 집합에 추가됨
- **`Selected=None` 세그먼트** — iOS에 없는 유효 상태
- 유틸리티 패널이 표준 창보다 낮은 크롬(22 vs 32)
- 탭 폭 +44 등차, XL 세그먼트의 버튼당 폭 역전
- 블렌드 모드 지시가 토큰 그룹명에 포함

## 접근성

미확인.

## 참고

- 킷: Figma Community "macOS 26" (Apple 공식)
- **수집 방법:** `get_metadata`의 페이지 목록은 "Cover"만 보고하지만
  노드 ID를 직접 짚으면 읽힙니다 (`HARVESTING.md` Figma MCP 절)
- **수집 방법 확정:** 페이지 열거 API는 막혀 있지만, **페이지 URL 하나만 있으면
  인접 홀수 ID 프로브로 나머지를 찾을 수 있습니다** — 사용자 제공 3페이지에서
  출발해 7페이지(Combo Boxes·Forms·Buttons·Search Fields·Sheets·Steppers·
  Lists·Tooltips)를 프로브로 자체 발견했습니다 (`HARVESTING.md`)
- **시스템 액센트 12색 실값 (Forms 페이지 변수):**
  ```
  Red #ff383c · Orange #ff8d28 · Yellow #ffcc00 · Green #34c759
  Mint #00c8b3 · Teal #00c3d0 · Cyan #00c0e8 · Blue #0088ff
  Indigo #6155f5 · Purple #cb30e0 · Pink #ff2d55 · Brown #ac7f5e
  ```
  (Black/그레이 2종/White는 액센트 변수 밖 — 미확보)
- **남은 확인 사항:** 타이포 스케일 페이지(이 대역에 없음), 커서 규격, 라이선스
