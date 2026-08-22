<!-- lang-links -->
> [English](platforms.md) · **한국어**
<!-- /lang-links -->

# 플랫폼 축

`domain`(엔터프라이즈·커머스·공공…)이 **누구를 위한 시스템인가**를 나눈다면,
`platform`은 **어디서 돌아가는가**를 나눕니다.

이 축이 필요한 이유는 하나입니다 — **플랫폼이 다르면 토큰 구조 자체가 다릅니다.**
같은 회사, 같은 서체를 쓰면서도 값이 갈립니다.

## 분류

| 플랫폼 | 입력 방식 | 시야 거리 | 표본 |
|--------|-----------|-----------|:---:|
| `web` | 마우스 · 키보드 · 터치 | 40~70cm | **95** |
| `mobile` | 터치 | 25~40cm | 1 |
| **`desktop`** | 마우스 · 키보드 | 50~70cm | **1** |
| `spatial` | 시선 · 손 제스처 | 가변 (무한) | **1** |
| **`wearable`** | 터치 (소형) · 크라운 · **베젤 회전**(Tizen) | 20~30cm | **2** |
| **`tv`** | 리모컨 (포커스 이동) | **3m** | **2** |
| `automotive` | 터치 · 물리 컨트롤 · 음성 | 60~90cm | **2** |

## 왜 나눠야 하는가 — 실증

### 1. 스페이싱 토큰의 유무가 플랫폼으로 갈립니다

| 플랫폼 | 스페이싱 스케일 |
|--------|---|
| `web` 30개 | **27개 있음** (Evergreen · Seed Design 없음 · shadcn/ui 상속) |
| `mobile` (Apple HIG) · `[web, mobile]` (Material 3) | **전부 없음** |

**모바일 OS는 둘 다 스페이싱을 토큰화하지 않습니다.**
웹은 30개 중 27개가 합니다.

초기에는 "모바일 OS만의 특성"으로 정리했으나 **성립하지 않습니다** —
`web`인 Evergreen과 `[web, mobile]`인 Seed Design도 스페이싱 토큰이 없습니다.
공통점은 플랫폼이 아니라 **여백을 컴포넌트에 직접 넣는다는 구현 방식**입니다.

**"없음"에 두 종류가 있습니다.**

| 종류 | 시스템 | 내용 |
|------|--------|------|
| **정의하지 않음** | Apple HIG · Material 3 · Seed Design · Evergreen | 여백을 컴포넌트에 직접 지정 |
| **상속함** | **shadcn/ui** | Tailwind의 `--spacing`을 그대로 사용 |
| **열거하지 않음** | **Tailwind** | base 하나에서 `calc()` 곱셈으로 생성 |

**shadcn/ui는 "스페이싱이 없다"가 아니라 "다시 정의하지 않는다"입니다.**
프레임워크 계열이 들어오며 이 구분이 필요해졌습니다 — 의존 관계가 있으면
토큰의 부재가 설계 판단이 아니라 계층 구조의 결과입니다.

**실무적으로는 — iOS·Android 시안에서 스페이싱 스케일을 찾지 마세요. 없습니다.**

### 2. 같은 회사·같은 서체인데 값이 다릅니다

Apple의 iOS 26과 visionOS는 둘 다 SF Pro를 쓰고 스타일 이름도 같습니다.

| 스타일 | iOS 26 | visionOS |
|--------|:---:|:---:|
| Title 2 | 22 / 28 · 자간 **-0.26** | 22 / 28 · 자간 **0** |
| Title 3 | **20** / 25 · 자간 **-0.45** | **19** / 24 · 자간 **0** |
| 기본 굵기 | Regular (400) | **Bold (700)** |

**"Apple 디자인시스템"을 하나로 취급하면 안 됩니다.**
visionOS는 자간을 전부 0으로 두고, Title 3에서 크기까지 1px 다릅니다.

### 3. 상태 집합이 입력 방식에 종속됩니다

| 플랫폼 | Hover | 비고 |
|--------|:---:|---|
| `web` | O | 마우스 |
| `mobile` | ✗ | 터치는 hover가 없음 |
| **`spatial`** | **O** | **시선(gaze)** |
| **`desktop`** | **O** (메뉴에서 확인) | `Clicked` 어휘 + **`Hover + Key`** 조합 상태 + **`Active Window`** 축 (`systems/macos.md`) |
| **`tv`** | **`Focused`가 1차 상태** | D-pad 이동. 포커스 피드백이 **1.1배 확대** 규격 (`systems/android-tv.md`) |

**visionOS는 마우스가 없는데 hover가 있습니다.** 시선으로 대상을 가리키므로
탭 이전 단계가 존재합니다. 터치 전용으로 설계된 컴포넌트를 그대로 옮기면
이 상태가 비어버립니다.

**macOS는 검색에 `Focused`가 별도 상태입니다** — iOS 킷의 검색은 3상태
(Placeholder/Typing/Value)인데 macOS는 **키보드 포커스**가 추가됩니다.
같은 Apple 안에서 상태 이름이 플랫폼마다 다릅니다 —
iOS `Selected`/`Tinted` · visionOS `Hover` · macOS `Clicked`/`Focused` (`systems/macos.md`).

**정정 — desktop에 Hover가 있습니다.** 초기 "킷에 미열거"는 Toolbars 페이지만
본 결과였고, Menus 페이지에는 `Hover`와 **`Hover + Key`**(마우스+키보드 동시)가
있습니다. 나아가 **`Active Window` 축**(창 비활성 시 변형)은 다중 창 전제가 있는
desktop에만 존재하는 변형 차원입니다.

### 4. 터치 타겟이 플랫폼·위치별로 갈립니다

| | 값 |
|---|:---:|
| Material 3 (`mobile`) | 48dp 단일 |
| Apple iOS 상단 툴바 | 44pt |
| Apple iOS 하단 툴바 | 48pt |
| visionOS 드롭다운 | 44pt |
| **Apple macOS 컨트롤** | **24pt (Medium) / 36pt (XL)** |

### 5. 데스크톱은 모바일의 절반 좌표계입니다

macOS 26 킷(첫 `desktop` 표본)의 컨트롤 높이는 **Medium 24 / XL 36**입니다.
같은 Apple의 터치 타겟 44/48pt 대비 **45~55% 치수**입니다 —
마우스 포인터는 손가락보다 정밀하므로 타겟이 절반이면 됩니다.
타이틀 바도 22~32pt로, iPhone 바(54~84pt)의 절반 이하입니다.

반면 **Liquid Glass 재질 7파라미터는 iOS와 완전 동일**합니다 —
플랫폼이 가르는 것은 치수·상태 어휘이고, 재질 물리값은 불변입니다 (`systems/macos.md`).

## 플랫폼별 확보 경위

### `automotive` — 채워졌고, 다른 축이 드러났습니다

Android Automotive와 CarPlay 2개를 수집했습니다.
**차량 플랫폼은 다른 어느 플랫폼과도 규격의 종류가 다릅니다.**

### 두 차량 플랫폼이 터치 타겟에서 갈립니다

| 플랫폼 | 터치 타겟 | 타겟 간 간격 | 최소 폰트 |
|--------|:---:|:---:|:---:|
| **Android Automotive** | **64dp** | **24dp** | **24sp** |
| **CarPlay** | 44pt (iOS 일반값) | 미확인 | 미확인 |

**1.45배 차이입니다.** 같은 문제에 두 회사가 다르게 답했습니다.
Android Automotive의 64dp는 표본 34개 중 최대이고, 모바일(48dp)의 1.33배입니다.

### 차량에만 있는 제약 — 3가지

다른 33개 시스템 어디에도 없는 종류입니다.

**1. 시간 제약**

| 항목 | 제한 |
|------|:---:|
| 버튼 응답 | 2초 이내 |
| 앱 실행 | 10초 이내 |
| 콘텐츠 로딩 | 10초 이내 |

다른 시스템에서 시간은 모션 토큰의 영역이고, "얼마나 빨라야 하는가"는 규격에 없습니다.

**2. 태스크 단계 수 제약**

Android Automotive는 태스크 완료까지 **5화면 이하**를 요구합니다 (`AC-1`).
인터랙션 깊이를 세어 제한하는 유일한 사례입니다.

**3. 화면당 정보 개수 제약**

| 시스템 | 제한 방식 |
|--------|-----------|
| Android Automotive | 요구사항으로 명시 (지도 주석 5개, 범례 3개) |
| **CarPlay** | **템플릿 API가 강제** (Grid 8개, POI 12개, Tab 5개) |

**CarPlay는 템플릿 기반이라 개발자가 레이아웃을 짜지 않습니다.**
표본에서 컴포넌트 조합이 아니라 완성된 화면 템플릿을 주는 유일한 시스템입니다.

### 플랫폼이 UI를 런타임에 차단합니다

Android Automotive OS는 **주행 중 미최적화 앱 사용을 자동으로 막습니다.**
디자인 지침이 아니라 강제 기능입니다. 다른 플랫폼에 없는 개념입니다.

### 두 시스템 모두 자체 토큰이 없습니다

Android Automotive는 Material 3을, CarPlay는 iOS를 상속하고
**차량 전용 규격만 추가**합니다. 토큰 배포는 하지 않습니다.

## 프레임워크 계열은 플랫폼 축을 나누지 않습니다

Tailwind · shadcn/ui · Mantine · Radix Themes 4개는 **전부 `web`**입니다.
플랫폼 축에는 새 정보를 주지 않습니다.

**대신 이 축에서 확인된 사실을 반증합니다.**

| 초기 관찰 | 반증 |
|-----------|------|
| "런타임 배율은 Vapor UI만" | Mantine · Radix Themes · shadcn/ui도 씀 (4개) |
| "스페이싱 코어 `4/8/16/24`는 예외 없음" | **Mantine에 4·8·24가 없음** |
| "고대비 테마는 시맨틱 계층이 있으면 추가 가능" | 시맨틱 계층이 있는 프레임워크 3개가 전부 미제공 |

**`platform`이 아니라 `domain`이 갈랐습니다.** 실행 환경이 같아도
**시스템의 목적**(자기 제품용 vs 남이 쓸 도구)이 다르면 판단이 갈립니다.

`domain: framework`를 추가한 이유가 이것입니다 (`SCHEMA.md`).

### 남은 차량 후보

`index.md`에 있는 것: Audi UI(80) · Volkswagen(81) · BMW(82) · Mercedes-Benz(83).
**Tesla OS는 공개 디자인시스템이 없습니다** — 스크린샷은 있지만 토큰·규격을 공개하지 않습니다.
COVESA(구 GENIVI)는 업계 컨소시엄으로 아직 확인하지 않았습니다.

### `wearable` — 채워졌습니다 (Wear OS)

Google Wear OS(`systems/wear-os.md`)와 **Samsung Tizen CircularUI**
(`systems/tizen-circularui.md`) 2표본입니다. **같은 원형 화면 문제에 답이
갈립니다** — Google은 여백을 %로 잡아 클리핑을 피하고, Samsung은
**원에 내접하는 사각형**을 콘텐츠 영역으로 정의합니다. 입력도 갈립니다 —
크라운(Apple) vs **베젤 회전**(Samsung). Wear OS의 20sp 이상 배율 금지·
Arc 곡선 타이포는 유지. watchOS 킷은 공개 링크가 없어 보류.

### `tv` — 채워졌습니다 (Android TV)

Android TV(`systems/android-tv.md`)와 **tvOS**(`systems/tvos.md` — HIG DocC
JSON) 2표본입니다. **독립 수렴이 확인됐습니다** — 두 플랫폼 다 "노출 개수 →
폭" 열거이고 2열 기준값이 비슷합니다(tvOS 860pt vs Android TV 844dp).
서로 다른 축을 수치화해 상보적입니다: Android TV가 포커스 1.1배 확대를,
tvOS가 오버스캔 인셋(60/80pt 비대칭)과 포커스 간격(중심 간 60pt)을 줍니다.

### `desktop` — 채워졌습니다 (macOS 26, 킷 12페이지 실측)

Toolbars 실측(실증 5) 후, 사용자 URL 3개에서 출발한 **인접 ID 프로브**로
Combo Boxes·Forms·Buttons·Search Fields·Sheets·Steppers·Lists and Tables·
Tooltips까지 12페이지를 확보했습니다 — 컨트롤 5단계(16~36) ·
`Active Window` 축 · `Hover + Key` · 클릭 해부(Up/Down·Field/Button)
(`systems/macos.md`). 남은 것: 타이포 스케일 페이지(대역에 없음), 커서 규격.

**플랫폼 7축이 전부 채워졌습니다** — web · mobile · desktop · spatial ·
wearable · tv · automotive.

## 수집 우선순위 (교차 비교 보강)

1. **CarPlay 고유 수치** — **HIG DocC JSON 채널이 열려 이제 가능합니다**
   (`developer.apple.com/tutorials/data/design/human-interface-guidelines/*.json` —
   JS 렌더링 우회, `HARVESTING.md`)
2. ~~wearable 교차 비교~~ — **완료** (Tizen CircularUI). watchOS 킷은 공개 링크 없음 — 보류
3. ~~tvOS~~ — **완료** (HIG DocC JSON)
4. ~~macOS 잔여 킷 페이지~~ — **완료** (12페이지 실측, 인접 ID 프로브)

## frontmatter 규칙

`systems/*.md`에 `platform` 필드를 추가합니다.

```yaml
platform: web        # web | mobile | desktop | spatial | wearable | tv | automotive
```

**여러 플랫폼을 지원하는 시스템은 배열로 적습니다.**

```yaml
platform: [web, mobile]      # Material 3 — 웹·Android·Flutter
```

`domain`과 혼동하지 마세요 — `platform`은 실행 환경, `domain`은 사용자층입니다.
Material 3은 `platform: [web, mobile]`이면서 `domain: os`입니다.
