<!-- lang-links -->
> [English](GLOSSARY.md) · **한국어**
<!-- /lang-links -->

# 용어집

코퍼스 문서를 읽다 걸리는 용어를 세 묶음으로 정리합니다.

1. **코퍼스 축약 표현** — 이 저장소가 만든 말. 처음 보면 뜻을 알 수 없는 것들
2. **같은 개념, 다른 이름** — 시스템마다 명칭이 갈리는 동의어
3. **같은 이름, 다른 뜻** — 명칭이 같아서 오독하기 쉬운 것들

각 항목의 출처는 괄호의 파일입니다. 여기 없는 값 주장은 하지 않습니다.

---

## 1. 코퍼스 축약 표현

### Liquid Glass 7파라미터

**Liquid Glass는 iOS 26에서 도입된 Apple의 재질(material) 이름**입니다.
반투명 유리처럼 뒤 배경을 굴절시키는 표면이며, 공식 Figma 킷이 이 재질을
**광학 물리 파라미터 변수**로 노출합니다 (`systems/apple-hig.md`).

"7"은 **파라미터 종류 수**입니다:

| 파라미터 | 뜻 | iOS 26 값 |
|----------|-----|:---:|
| Light Angle | 광원 각도 | -45 |
| Opacity | 불투명도 | 60 |
| Refraction | 굴절 | 100 |
| Dispersion | 분산 (프리즘 색 번짐) | 0 |
| Frost | 표면 뿌옇기 | 7 / 12 / 14 (크기별) |
| Depth | 깊이 | 16 |
| Splay | 퍼짐 | 6 |

크기 변형(Frost — Regular/Medium/Large 등)과 그림자 블러 2종까지 펼치면
**토큰 13종**입니다 — `index.md`의 "Liquid Glass 13종"은 이 토큰 수를 말합니다.

**이전과 뭐가 다른가:** iOS 26 이전 Apple 재질은 **블러 강도 단계**였습니다
(ultraThin / thin / regular / thick — Apple 개발자 문서의 Materials, 코퍼스 외 일반 지식).
블러는 "얼마나 흐리게"라는 축 하나인데, Liquid Glass는 굴절·분산·광원 각도까지
**렌즈의 광학 속성**을 각각 토큰으로 둡니다. 다른 시스템과 비교하면 —
표본 대다수는 표면 처리를 `shadow`·`elevation`에서 끝냅니다.
광학 파라미터를 토큰화한 것은 Apple 킷뿐입니다.

**왜 자주 인용되는가:** macOS 26 킷의 같은 변수들이 iOS와 **완전히 같은 값**입니다
(`systems/macos.md`). 치수(24/36 vs 44/48pt)·상태 어휘(`Clicked` vs `Selected`)는
플랫폼마다 갈리는데 재질 물리값만 불변 — "무엇이 플랫폼 종속이고 무엇이 아닌가"의
근거로 씁니다.

### 절반 좌표계

macOS 컨트롤(24/36pt)이 같은 Apple의 터치 타겟(44/48pt) 대비 45~55% 치수인 것
(`systems/macos.md`, `platforms.md` 실증 5). 마우스 포인터는 손가락보다 정밀하므로
타겟이 절반이면 됩니다.

### 스프링 3표현

스프링 모션을 토큰으로 배포하는 세 방식 (`patterns/motion.md`):
Atlassian `linear()` 65 정지점 × 1개 / Open Props `linear()` × 5단계 /
TDS 물리 파라미터(`stiffness`/`damping`/`mass`) 8프리셋.
CSS 진영은 곡선을 미리 계산해 박제하고, TDS는 런타임에 풉니다.

`linear()`는 CSS 이징 함수로, `cubic-bezier()`가 표현 못 하는
**오버슈트(1을 넘었다 돌아오는 구간)**를 정지점 나열로 담습니다.

### T셔츠 스케일

`xs / s / m / l / xl`처럼 옷 사이즈 이름을 쓰는 스케일. 숫자 이름(`space-400`)과
대비되는 명명 방식입니다. 스페이싱 코어 값의 반례가 전부 T셔츠 소단계 스케일이라는
관찰이 `tokens/scales.md`에 있습니다.

**명명 방식은 표본에서 다섯 유형입니다** — T셔츠(다수) · 숫자(기준이 6가지로
갈림) · **알파벳**(PIE `a`~`j`, 표본 유일) · 산문 배수(Cedar
`one-and-a-half-x`) · **격자 배수**(Braid — 값 자체가 단위 수).

### 격자 배수 토큰

값이 px이 아니라 **격자 단위 개수**인 방식. Braid의 `space.medium: 6`은
6px이 아니라 `grid: 4` × 6 = **24px**입니다. 격자를 바꾸면 전 스케일이
재배율됩니다 — 런타임 배율(Mantine 등)과 효과는 같고 시점이 빌드 타임입니다.

### `lineGap`

행간을 **총 높이나 비율이 아니라 줄 사이 빈 공간**으로 정의하는 방식.
Braid뿐입니다. 서체가 바뀌어도 시각적 간격이 유지됩니다 —
같은 문제를 Vanilla(Canonical)는 `nudge` 보정값으로 풉니다.

### 램프 (ramp)

한 색상의 명도 단계열 — `blue50 … blue900` 같은 것. "램프가 뒤집힌다"는
TDS 다크 테마처럼 **숫자↔명암 대응이 모드에 따라 역전**되는 것을 말합니다
(`systems/toss-tds.md`: `darkThemeBlue900`이 하늘색).

### 코어 값 / 무결값

표본 전체가 예외 없이 채택한 스페이싱 값을 "무결값"으로 불렀습니다.
**현재 무결값은 없습니다** — 마지막까지 살아 있던 16px이 표본 30개째(Garden)에서
깨졌고, 남은 것은 채택률 순위입니다 (`tokens/scales.md`).

### 시드(seed) 파생

값을 낱개로 열거하지 않고 **기준값 하나에서 산식으로 생성**하는 방식.
Ant Design(`fontSize: 14` 시드), Tailwind(`--spacing` base × `calc()`)가 해당합니다.

### 동반 요소 규격

글자 크기마다 옆에 놓일 아이콘 높이·배지 규격·링크 밑줄 두께까지 함께 묶어
토큰화한 것. 표본에서 TDS뿐입니다 (`systems/toss-tds.md`).

### 재매핑 표

접근성 글자 배율(iOS Dynamic Type) 9단계마다 타이포 역할 20개의 px를
다시 지정한 표. OS가 하던 일을 토큰 층위로 옮긴 것으로, 표본에서 TDS뿐입니다.

---

## 2. 같은 개념, 다른 이름

### 스페이싱(여백) 토큰

| 명칭 | 시스템 |
|------|--------|
| `space` / `spacing` | Polaris · Atlassian · Fluent · Cloudscape · Mantine · Radix 등 다수 |
| `size` | **Ant Design** (`size`/`sizeMS`) · Codex (`size-100`) |
| `dimension` | Vapor (`dimension-200`) |
| `base-size` | Canvas |
| **`$spacer`** | **Bootstrap · SGDS** (기준값 1rem + 배수 맵) |

**이름보다 심한 것이 번호입니다 — 같은 16px을 시스템마다 16 · 50 · 100 · 200 ·
300 · 400 · 4 · 2로 부릅니다** (px 실값 / 10단위 / rem×100 / rem×12.5 / 비균등 /
4px 배수 / 순번 / **px×25**(LeafyGreen) / **8px 배수**(Solid는 2가 16px)).
전체 표는 `tokens/scales.md` "같은 16px을 16가지로 부릅니다".

### 층위(쌓임 순서) 토큰

| 명칭 | 시스템 | 방식 |
|------|--------|------|
| `zIndex.*` 용도명 | Chakra | `dropdown` 1000 → `tooltip` 1800, 100 등차 + `skipNav` |
| `$zindex-*` | Bootstrap | 1000대 + 배경/콘텐츠 +5 (`modal-backdrop` 1050 / `modal` 1055) |
| **`--layer-*`** | Open Props | **서수** 1~5 + `important`(int 최대) |
| `z-index-*` | Forma 36 | **10의 거듭제곱** (1 · 10 · 100 · 1000 · 10000) |
| `*ZIndex` | Vibes(freee) | 불규칙 점프 (100 · 200 · 500 · 1000 · 1500 · 2000 · 3000 · 4000) |
| `$z1`~`$z4` | Solid(BuzzFeed) | 100 등차 서수 |
| **`--ps-layers-*`** | Pluralsight | 화면 영역 이름 + 10 단위 미세 배치 (sidenav 930 / topnav 950) |

주의 — **7개 시스템이 7가지 산법**이고 **층위 순서 자체가 모순**입니다
(예: Forma 36은 `notification`이 `tooltip`보다 위). 이름은 빌려도 순서는
교차 검증이 안 됩니다.

### 완전 원형(알약) 라운드

알약(pill)과 정원(circle)은 결과가 다릅니다 — 9999px은 짧은 변 기준 반원 끝,
50%는 정사각형에서만 원. 그래서 여러 시스템이 **둘 다** 둡니다.

| 뜻 | 이름과 시스템 |
|------|--------|
| 알약 (`9999px`) | Semi `full` · 디지털청 `full`(`624.9375rem` 환산 표기) · **Thumbprint `sides`** · Paste `pill` · Shoelace `pill` · Yoga `circle`(9999!) |
| 알약 (**`calc(infinity * 1px)`**) | **Welcome UI** — CSS `infinity` 키워드, 표본 유일 |
| 정원 (`50%`) | Semi `circle` · Paste `circle` · **Thumbprint `full`** · Mística `avatar` |
| **`PILL` = `240px`** | **Lightning** — 충분히 큰 고정값 방식 |

**주의: `full`이 Semi·디지털청에서는 9999px, Thumbprint에서는 50%입니다.**
**Yoga는 `circle`이 9999px**(50%가 아님)이고, **Welcome UI는 `infinity`**를 씁니다.
이름만 보고 값을 옮기면 틀립니다.

### 다크 모드 전환 방식 — 6가지 (`patterns/color.md`)

| 방식 | 시스템 |
|------|--------|
| 테마 파일 분리 | Apple · Material 3 · Pajamas · Codex · Atlassian · Siemens iX · Strapi · Shoelace |
| CSS 클래스 오버라이드 (`.dark {}`) | shadcn/ui · Radix Themes · Ring UI · Vibe |
| 한 토큰에 두 값 | visionOS (`#FFFFFF, #545454`) |
| **`light-dark()` CSS 함수** | **Porsche** (`light-dark(#fff, hsl(…))` 한 줄) |
| 클래스 + 미디어쿼리 병용 | Stacks |
| **토큰 이름에 모드 쌍 인코딩** | **DSFR**(프랑스 정부) — `--grey-200-850` · `sun`/`moon` |
| 알파 표 재합성 | **Naive UI** — 베이스 색만 바꾸면 중립색 전체가 재계산 |

같은 개념을 부르는 말도 갈립니다 — theme(다수) / mode / scheme /
appearance(Apple 문서). 코퍼스는 "다크 모드 처리 방식"으로 통일해 부릅니다.

### 토큰 계층(원시 → 용도)

| 계층 | 시스템별 명칭 |
|------|--------|
| 원시(값 자체) | `primitive`(디지털청) · `global` · `base` · 색상 램프 이름 그대로 |
| 용도(의미) | `semantic`(다수) · `alias` · Cloudscape `$description` 내장 |
| 그 사이 | **디지털청 `key`** (브랜드 핵심색 13개) · **Seed `static`** |

정확한 층 구조는 시스템마다 달라서 이름만 보고 층수를 단정할 수 없습니다.

### 상태(state) 어휘

| 플랫폼/시스템 | 누르는 중 | 포인터 올림 | 그 외 고유 |
|------|------|------|------|
| 웹 다수 | `active` / `pressed` | `hover` | `focus-visible` |
| iOS 킷 | — | 없음(터치) | `Selected` · `Tinted` |
| visionOS 킷 | — | **`Hover`(시선)** | — |
| **macOS 킷** | **`Clicked`** (Up/Down·Field/Button 세분) | O + **`Hover + Key`** | `Focused` · `Selected=None` · **`Active Window`** 축 · `Selected Inactive` |

같은 회사(Apple) 안에서도 플랫폼마다 상태 이름이 다릅니다 (`platforms.md`).

### 밀도(density)

| 명칭 | 시스템 | 뜻 |
|------|--------|-----|
| desktop / mobile **sets** | Spectrum | 플랫폼별 값 2벌 |
| `space-scaled-m` / `space-static-m` | Cloudscape | 밀도 모드에 따라 변하는/고정 2계열 |
| 런타임 배율 (`--mantine-scale` 류) | Mantine · Radix · shadcn/ui · Vapor · Ring UI · Stacks · Clarity(축별 2종) | 루트 변수 곱으로 전체 확대 |
| 타이포 스케일 2벌 | Serendie(expanded/compact) · Mística(desktop/mobile 쌍) | 크기 스케일 자체를 두 벌 |
| 뷰포트별 CSS 파일 | Spindle(desktop/tablet/mobile 3벌) | 같은 토큰명, 다른 값 |

### 단위

| 단위 | 어디서 | 주의 |
|------|--------|------|
| `px` | 웹 시스템 다수 | |
| `rem` | Bootstrap·SGDS·Canvas·Codex 등 | 사용자 글꼴 설정에 비례. 1rem = 16px 가정 |
| `pt` | Apple 킷 | Figma 상 1pt = 1px로 실측 |
| `dp` / `sp` | Android (Automotive 64dp·24sp) | `sp`는 글꼴 배율에 비례하는 dp |
| `em` | **Priceline 브레이크포인트** | 부모 기준. 루트에서는 rem과 동일 |
| **무단위** | Braid(격자 배수) · PIE(global 값) | 단위를 소비자가 붙임 |

---

## 3. 같은 이름, 다른 뜻

| 용어 | 뜻 A | 뜻 B |
|------|------|------|
| **`size`** | 스페이싱 스케일 (Ant `sizeMS`, Codex `size-100`) | 컴포넌트 치수 (Primer 등 다수) |
| **`base`** | 기준 배수값 (Backpack `SPACING_BASE`, Tailwind base) | 층위 0 (Chakra `zIndex.base: 0`) |
| **`static`** | 밀도 무관 고정 스페이싱 (Cloudscape `space-static`) | 모드 무관 고정 색 (Seed `static` 계열) |
| **`scale`** | 밀도 셋 (Spectrum) | 타이포 단계열 (type scale) | 
| **`elevation`** | 그림자 프리셋 (디지털청 `--elevation-1~8` = 그림자 2겹) | 층위 개념 일반 (z-order) / **불투명도 스케일** (Serendie `elevation-opacity-scale` 0~1) — 한 단어가 세 가지를 가리킴 |
| **`Medium`** | macOS의 **기본(작은)** 크기 — Medium 24 / XL 36 2단계 | 다수 시스템의 "중간" 크기 |
| **`key`** | 디지털청의 브랜드 핵심색 계열 (13개) | 일반 용법의 "키 컬러"와 층위가 다름 — 원시/시맨틱 사이 별도 층 |
| **`modal`** | 대화상자 (거의 전 표본) | **교통수단**(transport modality) — WMN의 색 분류 축 `colors.modal` = bus·metro·railway… (`systems/wmn.md`) |

### 이름-값 역전 사례 (이름을 믿으면 틀리는 곳)

- **Semi**: `extra-small`(3px) > `small`(2px) — 라운드 이름 서열 역전
- **SGDS**: `lg` 라운드가 기본값보다 작음
- 두 건 다 각 항목(`systems/semi.md` · `systems/sgds.md`)에 실값이 있습니다

### 색 램프 단계 숫자 — 눈금이 세 종류입니다 (2026-08-17)

같은 "blue.40"이라도 시스템에 따라 뜻이 다릅니다:

| 방식 | 표본 | `40`의 뜻 |
|------|------|-----------|
| 균일 눈금 | 다수 (100~900 등) | "4번째쯤" — 서열 |
| **명도 실측치** | **Italia** | 명도 40%대 — 램프마다 단계 숫자가 다름 |
| 기준 톤 지정 | Persona (기준=40), Tailwind (기준=500) | 어느 단계가 브랜드 기준색인지가 관례마다 다름 |

램프 확장 방식도 갈립니다 — 중간 숫자 삽입(다수) vs **이름 삽입**
(Persona `milk` = 0보다 연한 바닥 단계) vs 접미(`-tint`류).

### 소비자 오버라이드 전용 변수층 — 이름만 다른 같은 구조 (2026-08-17)

컴포넌트 내부 토큰과 별개로, **소비자가 덮어쓰라고 비워 둔 변수층**을 두는
시스템이 4개 확인됐습니다. 전부 `var(훅, var(내부 토큰, 폴백))` 체인입니다:

| 시스템 | 접두 | 특이점 |
|--------|------|--------|
| Lightning | `--slds-c-*` → `--sds-c-*` | 신·구 이름 공간까지 폴백으로 (3단) |
| Spectrum | `--mod-*` | "modifier"를 접두로 명시 |
| Cloudscape | `--awsui-style-*` | 런타임 테마 주입용 |
| Polaris | `--pc-*` | 상태 폴백 체인(`_pressed`→`_active`) 결합 |

같은 발명이 네 이름으로 존재합니다 — 문서 간 비교 시 동일 개념으로 읽으세요.

### 값에 박힌 문화 서명

- **NYSDS**: 알약 라운드가 `9999px`가 아니라 **`1776px`** — `$description`이
  "Ever upward!"(뉴욕주 모토). 기능은 같고 값이 주 정체성입니다.
- 알약 초과값 표본: `9999px` · `999px`(Mística bar) · `1000px`(Mantine switch) ·
  `calc(infinity*1px)`(Welcome UI) · `1776px`(NYSDS) — **다섯 가지 표기.**

### rem을 옮길 때 — 기준이 16px이 아닐 수 있습니다

전제가 시스템마다 다르고, **값만 복사하면 그만큼 어긋납니다.**

| 시스템 | 루트 전제 | 증상 |
|--------|:---:|------|
| **Strapi** | **10px** (62.5%) | `1.4rem`이 14px 의도인데 16px 루트에서 22.4px |
| **Stacks** | **13px** | `1.46153846rem` 순환소수 = 19/13 |
| **Odyssey**(Okta) | **14px** | `0.28571429rem`(2/7) = 4px 의도, 16px에서 4.57px |
| **Vitamin**(Decathlon) | **양쪽 다** | `index.css`(16px) / `index-base10.css`(10px) **2벌 배포** |

같은 현상이 **em에서도** 나타납니다 (2026-08-17): Garden 버튼 좌우 패딩
`1.07143em`(=15/14), Atlassian 구버튼 높이 `2.28571em`(=32/14) —
**px 의도값 ÷ 서체 크기의 순환소수**가 산출물에 그대로 박혀 있습니다.
순환소수가 보이면 "원래 의도는 px"라고 읽으면 됩니다.

**Vitamin이 표본 유일의 구조적 해법입니다** — 같은 px 결과를 내는 rem 값을
루트 전제별로 따로 냅니다. 나머지는 한 벌만 배포하므로 이식 시 확인이 필요합니다.

### 글줄 폭 (measure / 단락 폭)

본문 한 줄의 최대 폭. 표본 셋이 서로 다른 방식으로 다룹니다 —
**Charcoal**은 고정 토큰 9종(`paragraph-width` 320~924px, 밀도 3종 포함),
**Grommet**은 산식(`폰트 크기 × 24` ≈ 50자, 근거 링크가 소스 주석에),
**USWDS**는 `ex` 단위 행폭. 나머지 표본에는 없습니다.

### "스페이싱 없음"의 3종 (`platforms.md`)

| 종류 | 시스템 | 뜻 |
|------|--------|-----|
| 정의하지 않음 | Apple HIG · Material 3 · Seed · Evergreen | 여백이 컴포넌트에 직접 |
| 상속함 | shadcn/ui | Tailwind `--spacing`을 재정의 없이 사용 |
| 열거하지 않음 | Tailwind | base 하나 + `calc()` 생성 |

"토큰이 없다"는 문장 하나가 세 가지 다른 설계를 가리킬 수 있어 구분합니다.

---

## 추가 요청

여기 없는 용어가 걸리면 이 문서에 항목을 늘립니다 —
기준은 "코퍼스 문서를 읽다 멈추게 되는 말"입니다.
