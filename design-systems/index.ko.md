<!-- lang-links -->
> [English](index.md) · **한국어**
<!-- /lang-links -->

# 디자인시스템 100 — 인덱스

> **상태 표기**
> - **완료** — 토큰 실값을 확인하고 `systems/`에 항목을 작성함
> - **후보** — 목록에만 있는 상태. **URL·존재 여부·라이선스 모두 미검증입니다.**
>
> 용어가 걸리면 `GLOSSARY.md` — 코퍼스 축약 표현("Liquid Glass 7파라미터" 등)과
> 시스템 간 동의어/이의어를 정리해 뒀습니다.
>
> **아래 표의 `미확인` 표기가 어떤 종류인지는 `UNVERIFIED.md`를 보세요** —
> 전체 미확인을 **A(지금 해소 가능) · B(조건부) · C(구조적 불가)**로 나눠 두었습니다.
> C는 누락이 아니라 발견입니다 ("이 시스템은 X를 공개하지 않는다").
>
> 후보 풀은 `alexpate/awesome-design-systems`에서 가져와 재구성했으며,
> **✓npm 표기는 registry probe로 실제 확인한 것**입니다 (2026-08-17).
> ✓gh·후보 표기는 여전히 미검증입니다 — 항목 작성 전 `HARVESTING.md` 절차로 검증하세요.

**진행: 100 / 100 완료** 🎉 (+ 플랫폼 번외 5 + 2026-08-17 추가 5(Audi·Persona·Italia·NYSDS·WMN) + 프레임워크 번외 3(Headless UI·Panda·vanilla-extract) + **문서층 표본 2(LINE·Aurora)** + **2026-08-18 추가 2(Rakuten ReX·Fleet)** = **총 116**)

> **위 구성은 합이 맞지 않습니다 (2026-08-23 기록).** 100 + 5 + 5 + 3 + 2 + 2 = **117**인데
> 총계는 **116**입니다. 믿을 수 있는 쪽은 총계입니다 — `data/systems.json`은 항목 파일에서
> 생성되며 `count: 116`을 보고하고, `systems/`의 비`.ko` 파일이 117개인 것은 그중 하나가
> `coverage: internal`이라 공개 데이터에서 제외되는 `frr-dashboard.md`이기 때문입니다.
> 어느 항목이 1 어긋났는지는 **어디에도 기록돼 있지 않고 여기서 추측하지 않습니다.**
> 두 가지 독법이 가능합니다 — 기준이 100이 아니라 99이거나, Fleet이 이미 `TODO.md`가 세는
> 113 공개(100 + 5 + 5 + 3)에 들어 있어 두 번 계상됐거나. 구성을 인용하기 전에 항목 파일로
> 확정하고, 그때까지는 **116**을 인용하세요.

## 플랫폼 커버리지

`domain`(사용자층)과 별개로 **실행 환경**을 나눈 축입니다.
플랫폼이 다르면 토큰 구조 자체가 다릅니다 — 근거는 `platforms.md`에 있습니다.

| 플랫폼 | 표본 | 시스템 |
|--------|:---:|--------|
| `web` | **95** | Carbon · Polaris · Primer · Fluent · GOV.UK · Ant · Cloudscape · Backpack · Spectrum · Canvas · Paste · Codex · Vapor · Atlassian · Gestalt · Helios · Protocol · Base Web · Nord · Lightning · EUI · Orbit · Seed · Pajamas · Evergreen · Material 3 · Tailwind · shadcn/ui · Mantine · Radix Themes · Chakra UI · Open Props · Bootstrap · **USWDS · KRDS · Garden · Blueprint · Porsche · Thumbprint · Forma 36 · Cedar · Auro · Astro UXDS · SGDS · Semi · 디지털청 · TDS(Toss) · SmartHR · Charcoal · Spindle · Serendie · Grommet · Vibe · Ring UI · Stacks · Mística · Siemens iX · Vanilla · Strapi · Vibes(freee) · Vuetify · Naive UI · PrimeVue · Skeleton · Shoelace · NASA WDS · DSFR · Odyssey · PIE · Vitamin · Braid · Kaizen · Clarity · LeafyGreen · Solid(BuzzFeed) · Pharos · Artsy Palette · Tegel(Scania) · Priceline · Welcome UI · Intergalactic · NHS · Asphalt(Gojek) · Unify(Tokopedia) · Pluralsight · eBay Skin · Origami(FT) · Bolt · HSDS · MUI · HeroUI · Park UI · Ark UI · Kontur** |
| `mobile` | 1 | Apple HIG(iOS 26) — Yoga·TDS 등은 `[web, mobile]`로 web에 집계 |
| `spatial` | **1** | visionOS |
| **`desktop`** | **1** | **macOS 26** |
| **`wearable`** | **2** | **Wear OS** (Google) · **Tizen CircularUI** (Samsung) |
| **`tv`** | **2** | **Android TV** (Google) · **tvOS** (Apple) |
| **`automotive`** | **2** | **Android Automotive · CarPlay** |

**집계 기준은 `platform` 배열의 첫 값**(주 플랫폼)입니다. 배열이 여러 값인 항목이 7개 있습니다 —
Fluent 2 `[web, desktop, mobile]` · Material 3 · Lightning · Paste · Backpack · Seed · TDS · Yoga · Unify `[web, mobile]`.
**`desktop` 축이 macOS 26으로 열렸습니다** — 컨트롤 24/36pt가 같은 회사 모바일(44/48pt)의
절반 좌표계이고, 상태 어휘가 `Clicked`입니다 (`systems/macos.md`).

**차량 축이 채워졌습니다.** Android Automotive(64dp 터치 타겟 · 24sp 최소 폰트 ·
5화면 태스크 제한 · 2초 응답 규격)와 CarPlay(템플릿 기반, 개수 제한이 API 강제)입니다.
두 플랫폼이 터치 타겟에서 **1.45배 차이**가 납니다.

**플랫폼 7축 전부 표본 확보 + wearable·tv는 교차 비교까지 완료** —
wearable은 Google(% 여백) vs Samsung(내접 사각형), tv는 Google(844dp) vs
Apple(860pt 독립 수렴)로 각각 2표본입니다. watchOS 킷만 공개 링크가 없어 보류.
**Tesla OS는 공개 디자인시스템이 없습니다** — 스크린샷은 있지만 토큰·규격을 공개하지 않습니다.

## `full` 수집 — 깊게 (20)

참조 빈도가 높고 문서·토큰이 상세해서, 컴포넌트별 변형·상태·치수까지 정리할 대상입니다.

| # | 시스템 | 조직 | 상태 | 비고 |
|---|--------|------|------|------|
| 1 | Carbon | IBM | **완료** | 스페이싱·타이포 확인. 컬러·라운드 미확인 |
| 2 | Polaris | Shopify | **완료** | 스페이싱·라운드·보더 확인. 타이포·컬러 미확인 |
| 3 | Primer | GitHub | **완료** | 사이즈·보더 확인. 타이포·컬러·라운드 미확인 |
| 4 | Fluent 2 | Microsoft | **완료** | 스페이싱·라운드 확인. 타이포·컬러 미확인 |
| 5 | Ant Design | Ant Group | **완료** | 시드 파생 스페이싱·라운드·기본 폰트 확인. 컬러 미확인 |
| 6 | Human Interface Guidelines (iOS 26) | Apple | **완료** | 변수 export 전체. 타이포 11단계·행간 3벌·Liquid Glass 13종·컬러 79개. **스페이싱 없음 확인** |
| 7 | Spectrum | Adobe | **완료** | 스페이싱·라운드·보더 확인. desktop/mobile sets 구조 |
| 8 | Atlassian Design System | Atlassian | **완료** | 스페이싱·음수·라운드·보더·**타이포·컬러 466개·모션 68개** 확인. 컴포넌트 미확인 |
| 9 | Cloudscape | AWS | **완료** | 이중 스케일·시맨틱 라운드 확인. 타이포·컬러 미확인 |
| 10 | Lightning Design System | Salesforce | **완료** | 축 분리 스페이싱·라운드 3단계·iOS 토큰. PILL=240px |
| 11 | Base Web | Uber | **완료** | `partial` 수집 깊이. 2px 단위 22단계. 토큰이 `baseui` 내부에 |
| 12 | Material Design 3 | Google | **완료** | 변수 export 전체. 타이포 15단계·라운드 10단계·테마 32종. **스페이싱 없음 확인** |
| 13 | Paste | Twilio | **완료** | 스페이싱·라운드·타이포 확인. 등차수열 스케일 |
| 14 | Canvas | Workday | **완료** | `partial` 수집 깊이. 2px 단위 촘촘한 스케일 |
| 15 | Garden | Zendesk | **완료** | **스페이싱에 16·24 없음** — 곱수 1·2·3·5·8·10·12. 마지막 무결값을 깬 시스템 |
| 16 | Gestalt | Pinterest | **완료** | `partial` 수집 깊이. 4px 등차, 다중 값 라운드 |
| 17 | Orbit | Kiwi.com | **완료** | 스페이싱·라운드·컨트롤 크기 별도 스케일 |
| 18 | Backpack | Skyscanner | **완료** | `partial` 깊이로 작성. 스페이싱·자간 확인 |
| 19 | GOV.UK Design System | UK Government | **완료** | 5px 베이스·반응형 스페이싱 확인. 나머지 미확인 |
| 20 | USWDS | US Government | **완료** | 8px 베이스. 브레이크포인트=스페이싱 파생. 음수 -120px. `ex` 행폭 |

Backpack(18)은 `full` 수집 대상이지만 현재 `partial` 수집 깊이로만 작성돼 있습니다.
컴포넌트 상세 표가 없으므로, 문서 사이트 접근이 가능해지면 A 수준으로 보강해야 합니다.

### `full` 수집 — 프레임워크 계열 (번외)

100개 목록은 **회사가 자기 제품을 위해 만든 디자인시스템**을 대상으로 짰습니다.
아래는 제품이 없는 **프레임워크·컴포넌트 라이브러리**이며, `domain: framework`로 표기합니다
(`SCHEMA.md`). 목록 번호를 쓰지 않고 별도로 둡니다.

**참조 빈도로만 보면 이쪽이 위 20개보다 높습니다.** 실무에서 UI를 만들 때
Carbon이나 Spectrum보다 Tailwind·shadcn/ui를 먼저 여는 경우가 많으므로,
코퍼스에서 빠져 있던 것이 가장 큰 공백이었습니다.

| 시스템 | 조직 | 수집 깊이 | 상태 |
|--------|------|:---:|------|
| **Tailwind CSS** | Tailwind Labs | A | **완료** — 스페이싱을 열거하지 않는 유일한 사례. 컬러 286개 |
| **shadcn/ui** | shadcn | A | **완료** — 소스 복사 배포. OKLCH 전용. 컴포넌트 61종 + 치수 표 |
| **Radix Themes** | WorkOS | A | **완료** — 테마 5축 6,500조합. 커서 토큰. 컴포넌트 50종 |
| **Mantine** | 오픈소스 | B | **완료** — 라운드 순수 2배. 컴포넌트 101종 |
| **Chakra UI** | 오픈소스 | B | **완료** — 토큰 계열 18종. z-index 13단계·커서·황금비 |
| **Open Props** | Adam Argyle | B | **완료** — CSS 변수 603개. 이징 113개·유동 여백·`ch` 계열 |
| **Bootstrap** | 오픈소스 | B | **완료** — `$enable-*` 빌드 플래그 17개. 32px 없음 |
| **Vuetify** | 오픈소스 | B | **완료** — **첫 Vue 표본**. `$spacer` 4px (Bootstrap과 같은 이름, 다른 값) |
| **Naive UI** | 오픈소스 | B | **완료** — 중립색이 알파 표 합성. strong=500. 프라이머리 초록 |
| **PrimeVue** | PrimeTek | B | **완료** — DTCG 별칭 문자열을 JS 값으로. 프리셋 테마 |
| **Skeleton** | Skeleton Labs | B | **완료** — **첫 Svelte 표본**. 테마 24종이 구조값 소유 |
| **Shoelace** | Font Awesome | B | **완료** — 스페이싱 24·32 동시 부재. Web Components |

**의존 관계가 있습니다.** shadcn/ui는 Tailwind 토큰 위에 시맨틱 계층을 올리고,
프리미티브로 Radix Primitives를 씁니다. Radix Themes는 같은 프리미티브 위의
독립 스타일 레이어입니다 — **Radix Themes와 shadcn/ui는 형제 관계**이며 상하 관계가 아닙니다.

남은 후보: MUI (Material UI) · Ark UI · Park UI · Headless UI · HeroUI ·
Panda CSS · Vanilla Extract. **Vue/Svelte 공백은 해소됐습니다** (Vuetify · Naive UI · PrimeVue · Skeleton 완료).

## `partial` 수집 — 중간 (80)

토큰 실값, 컴포넌트 목록, 특징적 결정, 접근성까지. 컴포넌트 상세 표는 생략합니다.

> **후보 풀을 재구성했습니다 (2026-08-17).** 이전 후보 목록은 지식 기반으로 추린
> 미검증 목록이었습니다. 지금 목록은 `alexpate/awesome-design-systems`(161개 파싱,
> GitHub 소스 컬럼 보유 113개)에서 가져와 **npm 존재 여부를 실제로 probe한 결과**입니다.
>
> | 표기 | 뜻 |
> |------|-----|
> | **완료** | `systems/`에 항목 작성됨 |
> | **✓npm** | npm 패키지 존재를 registry에서 확인 — 바로 수집 가능 |
> | ✓gh | GitHub 저장소만 확인 — raw로 수집 가능성 있음 |
> | 후보 | URL만. 미검증 |
>
> **문화권 우선순위: 영미권 → 한국 → 동남아·중화 → 일본** (수집 순서 기준).
> 이 킷의 목표가 만국공통 먼저, 각 문화권은 그다음이기 때문입니다.

### 영미권·유럽 — 엔터프라이즈 / SaaS (21–40)

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 21 | Pajamas | GitLab | **완료** — `clamp()` 유동 타이포. 유동/고정 쌍 |
| 22 | EUI | Elastic | **완료** — `base` 중간 배치. `.d.ts` JSDoc이 출처 |
| 23 | Helios | HashiCorp | **완료** — 라운드 3·5·6·8px |
| 24 | Evergreen | Segment | **완료** — 이름 없는 배열 토큰. 스페이싱 없음 |
| 25 | Codex | Wikimedia | **완료** — 여백·폭 통합 스케일 |
| 26 | Protocol | Mozilla | **완료** — 6단계 최소 스케일 |
| 27 | Nord | Nordhealth | **완료** — 유일한 의료 도메인 |
| 28 | Blueprint | Palantir | **완료** — 10px 그리드. 기본 컨트롤 30px. 행간 1.28581 |
| 29 | Grommet | HPE | **완료** — 단일 시드(24) 전방위 파생. 본문 18px 표본 최대. 글줄 폭 = 크기×24 |
| 30 | Vibe | monday.com | **완료** — 스케일 중복 값(10=20=14px). 다문자 서체 스택. hacker 테마 |
| 31 | Forma 36 | Contentful | **완료** — 타이포 밀도 변형(`-high`). z-index 10ⁿ 로그 |
| 32 | Strapi Design System | Strapi | **완료** — 62.5% rem 전제 내장. 무명 배열 스페이싱 |
| 33 | Ring UI | JetBrains | **완료** — 전 색 채널 삼중항 쌍. unit×calc 437회. duration+easing 합성 |
| 34 | Stacks | Stack Overflow | **완료** — 본문 13px 표본 유일. 13분수 순환소수 rem |
| 35 | Clarity | VMware | **완료** — **모션 감소 테마 파일**·고대비 forced-colors 시스템 색. 둘 다 표본 유일 |
| 36 | Odyssey | Okta | **완료** — 스페이싱 7분수 rem(루트 14px 전제). rem 기준 불일치 3번째 |
| 37 | Intergalactic (Semcore) | Semrush | **완료** — 강조 전용 테마(전 토큰 그라디언트). 원시 색 주석에 저시력 경고 773개 |
| 38 | Pluralsight DS | Pluralsight | **완료** — z-index를 `layers`로 영역 이름 열거(산법 7번째). `skip-to-content` 1600이 Chakra `skipNav`와 동일 |
| 39 | MongoDB Design (LeafyGreen) | MongoDB | **완료** — 컬러 3차원(속성×역할×상태). 스페이싱 번호=px×25 |
| 40 | Kontur UI | SKB Kontur | **완료** — 테마에 시맨틱 버전 + 과거 4버전 동시 배포. 클래스 상속 체인. 러시아권 첫 표본 |

### 영미권·유럽 — 커머스 / 소비자 (41–54)

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 41 | Vapor UI | goorm | **완료** — 런타임 배율 (한국이지만 기존 위치 유지) |
| 42 | Seed Design | 당근 (Karrot) | **완료** — 타이포 1px 단위 18단계 |
| 43 | Skin (eBay Evo) | eBay | **완료** — **AI 기능 전용 컬러 42개**(코퍼스 첫 사례). iOS/Android 사이즈 클래스 어휘 병기. 보더 0.5px |
| 44 | Thumbprint | Thumbtack | **완료** — 32 이후 배가→256. 원형 이원화(50%/9999px) |
| 45 | Cedar | REI | **완료** — `one-and-a-half-x` 산문 배수. inset squish/stretch |
| 46 | Auro | Alaska Airlines | **완료** — 브랜드 3벌 같은 290키(hawaiian 인수 통합) |
| 47 | Mística | Telefónica | **완료** — 브랜드 스킨 8종+ 표본 최다. HC가 램프 안에. 컴포넌트 시맨틱 라운드 |
| 48 | Priceline DS | Priceline | **완료** — 스페이싱 전 구간 2배 등비(표본 유일). 라운드 3단계. `em` 브레이크포인트 |
| 49 | PIE | Just Eat Takeaway | **완료** — 알파벳 명명(a~j) 표본 유일. `a-small` 삽입 예외 |
| 50 | Vitamin | Decathlon | **완료** — rem 기준별 빌드 2벌(16px/10px) — rem 함정의 유일한 해법 |
| 51 | Braid | SEEK | **완료** — 토큰 값이 격자 배수(grid 4). `lineGap` 행간 모델. 둘 다 표본 유일 |
| 52 | Kaizen | Culture Amp | **완료** — **6px 격자**(코어 4·8·16·32 전면 이탈). `-id` 토큰 |
| 53 | Welcome UI | WTTJ | **완료** — `calc(infinity * 1px)` 알약(표본 유일). 숫자·T셔츠 명명 이중화 |
| 54 | Yoga | Wellhub (Gympass) | **완료** — 브레이크포인트가 폭+마진+거터 묶음. 12단계 T셔츠. 엘리베이션 플랫폼별 3벌 |

### 영미권·유럽 — 미디어 / 콘텐츠 (55–59)

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 55 | Origami | Financial Times | **완료** — 크기·행간 튜플 스케일, 음수 정수 인덱스. **브랜드별로 행간 모델이 다름** |
| 56 | Photon | Mozilla Firefox | ✓gh `FirefoxUX/photon` |
| 57 | Solid | BuzzFeed | **완료** — 순번 1=8px + `05` 삽입. z-index 6번째(산법도 6번째) |
| 58 | Pharos | JSTOR (Ithaka) | **완료** — Cedar와 같은 산문 배수 명명(기준 x=1rem 확정). 굵기 400/700 |
| 59 | Palette | Artsy | **완료** — 스페이싱 10px 단위 5단계(4·8·16 부재). 타이포 최대 102px |

### 자동차 / 산업 (60–63)

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 60 | Porsche Design System | Porsche | **완료** — `light-dark()` 테마. fluid/static 여백 쌍. 모션 최소 250ms |
| 61 | Siemens iX | Siemens | **완료** — ms 음수 지수 스케일. font 축약형 토큰. 4프레임워크 배포 |
| 62 | Audi UI | Audi | **완료** — 뷰포트별 모듈러 스케일 비율(1.14→1.25). 전역 이징 1개. alpha 정지 |
| 63 | Scania Digital Design (Tegel) | Scania | **완료** — element/layout 10:10 분리. `mode-variant` 축(라이트/다크와 직교) |

### 공공 — 영미권·유럽 (64–72)

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 64 | NASA Web Design System | NASA | **완료** — USWDS 설정 오버레이. aerospace 2번째이나 Astro와 비교 불가(웹 vs 관제) |
| 65 | DSFR | 프랑스 정부 | **완료** — 모드 쌍이 토큰 이름에(`--grey-200-850`). sun/moon 어휘. 정부 7번째 |
| 66 | Italia Design System | 이탈리아 정부 | **완료** — DTCG 형식(정부 유일). 색 단계 숫자=명도 실측치. 정부 9번째 |
| 67 | Aurora | 캐나다 정부 | **완료** — **문서층 표본 2호** (2026-08-18). design.gccollab.ca 정적 HTML 실측 — 스와치 6패밀리·타이포 pt 스케일. 리포 2019-06 동결 명기 (`systems/aurora-gc.md`) |
| 68 | NYSDS | 뉴욕주 | **완료** — 8px=100 백분율 스페이싱 명명. `1776px` 라운드. MCP 서버 공식 배포(첫 표본). 정부 10번째 |
| 69 | Fleet | 보스턴시 | **완료** (2026-08-18) — patterns.boston.gov 공개 CSS(184KB) 실측. 유동 타이포 calc 수식·radius 0 진영·코드 CC0 (`systems/fleet-boston.md`) |
| 70 | WMN Design System | West Midlands Network | **완료** — 색 축에 교통수단(`modal`=bus·metro…). 과업 패턴 단위 배포. 교통 도메인 첫 표본 |
| 71 | Vanilla | Canonical (Ubuntu) | **완료** — nudge 베이스라인 보정 토큰. 행간 8px 정수배 강제 |
| 72 | NHS design system | NHS (UK) | **완료** — **GDS 코드 포크인데 스페이싱 4px로 교체**(5px 단독 확정의 직접 증거). 인쇄용 pt 토큰 |

### 한국 (73–76) — 우선순위 2

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 73 | **KRDS** | **대한민국 정부 (NIA)** | **완료** — 본문 17px(Apple 이후 둘째). 여백 이름이 콘텐츠 관계(`h1-h2`). 루트 10px |
| 74 | **TDS** | **Toss** | **완료** — 스프링 물리 파라미터 8프리셋. 접근성 배율 재매핑 표. 11~42px 연속. **미니앱 SDK(`-ait`)로 공개** |
| 75 | Kakao Design | Kakao | 후보 — npm 없음 (**검색 API 재확인 2026-08-17**: SDK류만 존재) |
| 76 | Naver Design | Naver | 후보 — npm 없음 (**검색 API 재확인 2026-08-17**: egjs는 FE 유틸이며 DS 아님) |

> **정정 (2026-08-17).** "Toss npm 없음"은 오판이었습니다 — `@toss/tds` 단일명
> probe만 하고 부재로 기록했는데, 실제로는 `@toss/tds-colors`·`-typography`·
> `-easings`·`-mobile`·`-mobile-ait`로 **분할 배포**돼 있었습니다.
> 미니앱(앱인토스) SDK 개방이 공개의 동인입니다. Kakao·Naver·LINE도
> 같은 방식(분할명·검색 API)으로 재확인이 필요합니다.

### 동남아 · 중화 (77–81) — 우선순위 3

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 77 | **SGDS** | **싱가포르 정부** | **완료** — Bootstrap 포크 혈통 증명. 원본의 32px 구멍 복구 |
| 78 | **Semi Design** | **ByteDance (Douyin)** | **완료** — 토큰 70%가 색. 치수 토큰 0. 실사용 14px 지배 |
| 79 | Persona | Privy (인도네시아) | **완료** — `milk` 램프 단계. px 자간. 라운드 7·22px. 동남아 2번째 |
| 80 | Asphalt | Gojek | **완료** — **첫 동남아 표본**. emboss/deboss 양각·음각 그림자. display 전용 Extended 서체 (**정정: npm 있음**) |
| 81 | Grab Design | Grab | 후보 |

### 일본 (82–89) — 우선순위 4

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 82 | **디지털청 디자인시스템** | **일본 정부 (デジタル庁)** | **완료** — 행간 순비율 8단계(최다). 굵기 400/700. 17px 보유 |
| 83 | **SmartHR UI** | SmartHR | **완료** — 문자 수 단위 스페이싱. 조화수열 폰트 생성. 상태색이 함수 |
| 84 | **Charcoal** | pixiv | **완료** — 단락 폭 토큰 표본 유일. 라운드=스페이싱 별칭. 다크 램프 음수 단계 |
| 85 | **Spindle** | CyberAgent (Ameba) | **완료** — 뷰포트별 스페이싱 3벌. View Transitions 토큰화 표본 유일 (`@openameba/spindle-tokens@1.10.0`) |
| 86 | **Vibes** | freee | **완료** — 팔레트 2세대 병존. rem 인코딩 이름. z-index 5번째. 버전 100 |
| 87 | **Serendie** | Mitsubishi Electric | **완료** — 타이포 스케일 2벌(expanded/compact). elevation=불투명도. 차트 색 240+ |
| 88 | LINE Design System | LY Corporation | **완료** — **문서층 표본** (2026-08-18, 코퍼스 첫 사례). npm 없음은 여전(서체뿐)이나 공식 문서 page-data JSON에서 실측 — 컬러 ~170헥스·HSV 상태 수식·스페이싱 15단 (`systems/line.md`) |
| 89 | ReX | Rakuten | **완료** (2026-08-18) — 문서 사이트 사내화(403·Wayback 0건)이나 **npm 36패키지(MIT)가 생존 소스**. :lang(en/ja) 행간 분기 확보 (`systems/rakuten-rex.md`) |

**우선순위와 소스 가용성이 반대입니다.** 일본이 우선순위 4위인데 검증된 npm 패키지가
**6개로 아시아권 최다**입니다 (한국 1 · 동남아·중화 2). 특히 **CJK 타이포 규격**
(본문 크기·행간·자간)은 일본 시스템에서 먼저 확보될 가능성이 큽니다 —
`patterns/typography.md`의 "CJK 서체 슬롯을 둔 시스템은 표본에 없음" 공백에 직결됩니다.

### 기타 · 저우선 (90–100)

| # | 시스템 | 조직 | 상태 |
|---|--------|------|------|
| 90 | VTEX Styleguide | VTEX (브라질) | ✓gh |
| 91 | BLiP | Take (브라질) | ✓gh |
| 92 | Bold | Bridge/UFSC (브라질) | ✓gh |
| 93 | Bento | buildo (이탈리아) | ✓gh |
| 94 | SAP Fundamental | SAP | ✓gh `SAP/fundamental` |
| 95 | Foundation | ZURB | ✓gh `foundation/foundation-sites` |
| 96 | Cloudflare cf-ui | Cloudflare | ✓gh — 유지보수 중단 가능성 |
| 97 | Pivotal UI | Pivotal | ✓gh — 유지보수 중단 가능성 |
| 98 | HSDS | Help Scout | **완료** — 컴포넌트별 JSON 52개가 토큰 1차 단위. default/newBrand 2벌 완전 중복 |
| 99 | Rendition | balena | ✓gh |
| 100 | Bolt | Bolt DS (Pega) | **완료** — **축별 비정수 베이스**(x 1.55 / y 1.35). 4px 격자와 완전 무관, 표본 유일 |

### 프레임워크 후보 (번외 — 100 목록 밖)

Shoelace · Vuetify · Naive UI · PrimeVue · Skeleton — **전부 완료** (프레임워크 번외 표 참조).
MUI · Ark UI · Park UI · HeroUI **완료**. ~~남은 후보~~ → **Headless UI · Panda CSS · vanilla-extract 완료 (2026-08-17)** — 스타일 층 없음/열거/계약 3유형이 채워졌습니다.

### 플랫폼 보강 (번외)

`index.md`의 100개 목록과 별개로, 플랫폼 축을 채우기 위해 추가한 항목입니다.

| 시스템 | 조직 | 플랫폼 | 상태 |
|--------|------|--------|------|
| visionOS Design Resources | Apple | `spatial` | **완료** — 타이포 2종·컬러·Hover 상태 확인 |
| **Wear OS** | **Google** | **`wearable`** | **완료** — 여백 % 규범·Arc 타이포·20sp 배율 상한 |
| watchOS 26 | Apple | `wearable` | 후보 — Wear OS와 교차 비교용 |
| **Tizen CircularUI** | **Samsung** | **`wearable`** | **완료** — 내접 사각형 안전 영역(Wear OS %와 대비). 베젤 회전 입력. **토스트 3000ms 첫 표본** |
| **macOS 26** | **Apple** | **`desktop`** | **완료** — Toolbars/Titlebars 페이지 실측. 컨트롤 24/36 · `Clicked` · Liquid Glass iOS 동일 |
| **Android TV** | **Google** | **`tv`** | **완료** — 3m 거리·Focused 1.1배·카드 폭 개수 열거 |
| **tvOS** | **Apple** | **`tv`** | **완료** — HIG DocC JSON. 인셋 60/80pt. 그리드 폭 열거(860pt)가 Android TV(844dp)와 독립 수렴 |
| **Android Automotive OS** | Google | `automotive` | **완료** — 64dp·24sp·시간·단계 제약 |
| **Apple CarPlay** | Apple | `automotive` | **완료** — 템플릿 11종. 고유 수치 미확인 |

Khan Academy를 Codex(Wikimedia)로 교체했습니다. Vapor UI는 목록에 없던 시스템이지만
한국 공개 시스템이라 표본 다양성 확보를 위해 추가했습니다.

## 표본 편향 메모

완료 34개의 도메인 분포는
**엔터프라이즈 15 · `framework` 7 · 소비자 5 · OS 5 · 공공 2 · 커머스 2 · 의료 1**입니다.
플랫폼 분포는 `web` 33 · `automotive` 2 · `mobile` 1 · `spatial` 1입니다
(`platform` 배열 첫 값 기준).

### `framework` 4개가 결론을 바꿨습니다

프레임워크 계열(Tailwind · shadcn/ui · Mantine · Radix Themes)을 넣기 전까지
코퍼스는 **회사 제품용 디자인시스템만** 보고 있었습니다. 넣은 뒤 세 가지가 뒤집혔습니다.

| 이전 결론 | 수정 |
|-----------|------|
| 스페이싱 코어 `4/8/16/24`는 18개 표본에서 **예외 없음** | **Mantine에 4·8·24가 없음.** 예외 없는 값은 `16` 하나 |
| 런타임 배율(`calc(var(--scale) * N)`)은 **Vapor UI만** | **4개** (Mantine · Radix Themes · shadcn/ui 추가) |
| 시맨틱 계층이 있으면 고대비 테마 추가가 쉽다 | 시맨틱 계층이 있는 프레임워크 3개가 **전부 미제공** |

**참조 빈도로 보면 이쪽이 위 20개보다 높습니다.** 실무에서 UI를 만들 때
Carbon·Spectrum보다 Tailwind·shadcn/ui를 먼저 여는 경우가 많은데,
30개를 채울 때까지 하나도 들어 있지 않았습니다. **이게 가장 큰 편향이었습니다.**

### 프레임워크가 열어준 축

문서 사이트가 차단된 환경에서 **소스가 공개된 시스템이 토큰보다 정보가 많습니다.**

| 축 | 이전 근거 | 지금 |
|----|-----------|------|
| 버튼 패딩 | Cloudscape 2개 · Ant 계열명 | **shadcn/ui 4단계 전부 + 아이콘 조건부 패딩** |
| 입력 필드 규격 | Cloudscape `space-field-*` 이름만 | **3개 시스템 높이·패딩·라운드·상태색** |
| 포커스링 | 라운드 값 2건 | **두께·offset·구성 5개 시스템** |
| 에러 상태 | 없음 | **`aria-invalid` · `--mantine-color-error`** |
| 모션 | 없음 | **Atlassian 68개 토큰** (컴포넌트별) |

`patterns/` 문서 6개(`form` · `motion` · `modal` · `table` · `navigation` · `feedback`)가
이 덕분에 작성 가능해졌습니다 — **문서 사이트 접근 없이 채웠습니다.**

가장 큰 근거는 **컴포넌트 소스 공개**입니다. shadcn/ui `sidebar.tsx` 하나가
21KB이고 폭·항목 높이·상태 영속화(쿠키 7일)·키보드 단축키(`Cmd+B`)까지 담고 있습니다.
**Mantine·Radix Themes의 소스 주석도 근거였습니다** —
`border-collapse` × `position: sticky` 충돌, 오버레이 언마운트 타이밍 트릭의 이유가
주석에 적혀 있습니다.

**Cloudscape를 다시 열어 얻은 것도 있습니다.**

| 발견 | 내용 |
|------|------|
| **대비 비율 규격** | 차트 색 90개의 단계 번호가 **대비 비율**입니다 (`red-500` = 5:1). 코퍼스에서 유일 |
| **밀도 축 토큰 43개** | 색이 `light`/`dark`를 갖듯 여백이 `comfortable`/`compact`를 가집니다 |
| **컨텍스트 오버라이드 8개** | `compact-table`(17개) · `top-navigation`(182개) 등 영역별 토큰 예외 |
| `space-field-vertical` | 5px / compact 3px — `form.md`에서 미확인이던 값 |

**"34개 어디에도 대비 비율 규격이 없다"는 결론은 폐기했습니다.** Cloudscape에 있습니다.

### 표본 확대 이력

| 표본 | 결과 |
|------|------|
| 4개 | 공통 코어 7개(`2/4/8/12/16/24/32`)로 판단 |
| 8개 | **뒤집힘.** 코어가 5개(`4/8/16/24/32`)로 축소. GOV.UK 때문에 "전부 공통"이 소멸 |
| 13개 | **유지** |
| 16개 | **유지.** Protocol이 최소 스케일로 코어를 역검증 |
| 18개 | **일부 수정.** Nord에 32px이 없어 코어가 `4/8/16/24`로 축소 |
| **24개** | **다시 뚫림.** Mantine에 4·8·24가 없어 **예외 없는 값은 `16` 하나** |

(스페이싱 스케일이 확인된 시스템 수 기준입니다. 완료 항목 수와 다릅니다.)

**확대 6번 중 3번에서 결론이 바뀌었습니다.**
`16px`만 예외가 없고, `4/8/24/32`는 22/23입니다.
**남은 66개를 채우면 `16`도 뚫릴 수 있습니다 — 현재 결론을 확정으로 쓰지 마세요.**

"Protocol이 최소 스케일로 코어를 역검증한다"는 16개 시점의 해석은 **폐기했습니다.**
Mantine이 더 적은 5단계로 줄이면서 코어 중 `16`·`32`만 남겼습니다 —
"최소로 줄이면 코어가 남는다"는 성립하지 않습니다.

**스페이싱 토큰이 없는 시스템** — 두 종류로 나뉩니다.

| 종류 | 시스템 |
|------|--------|
| 정의하지 않음 | Apple HIG · Material 3 · Seed Design · Evergreen |
| **상속함** | **shadcn/ui** (Tailwind의 `--spacing`) |
| **열거하지 않음** | **Tailwind** (base 하나 + `calc()` 곱셈) |

앞의 둘만 있을 때는 "모바일 OS 특성"으로 봤으나 `web`인 Evergreen이 나와 폐기했습니다.
프레임워크가 들어오며 **"없음"에 세 종류가 있다**는 것이 드러났습니다.

### 남은 편향

- **모바일 2개 완료** (Material 3, Apple HIG). 터치 타겟·타이포·재질 축이 열렸습니다.
  **둘 다 스페이싱 스케일이 존재하지 않는다는 것이 확인**됐습니다 (미확인이 아니라 없음).
  안전 영역은 아직 못 봤습니다.
- **엔터프라이즈 편중** (34개 중 15개). 소비자는 Backpack·Gestalt·Protocol·Base Web·Orbit 5개입니다.
- **의료 1개** (Nord). 규제 산업 표본이 더 필요합니다.
- **아시아권 3개** (Ant Design, Vapor UI, Seed Design)에서 시작해 이후 TDS·Semi·디지털청·일본 4종 등으로 보강됐습니다. Kakao·Naver·LINE은 검색 API 재확인(2026-08-18)으로도 토큰 패키지 부재 — 단 **LINE은 문서층 표본으로 편입**됐습니다(코퍼스 첫 사례, `systems/line.md`). **Kakao·Naver는 문서층 파일럿 결과 편입 불가 확정**(2026-08-18) — 공식 발행물이 로그인 버튼 가이드·브랜드 CI뿐이라 밀도 미달, 사내 DS는 비공개(TODO.md D절에 상세).
- **프레임워크 4개가 전부 React 기반입니다.** Vue·Svelte 계열
  (Vuetify · Naive UI · PrimeVue · Skeleton)이 0개입니다.
  Tailwind만 프레임워크 비종속입니다.
- **디자인 도구 연동 정보가 부족합니다.** Figma 킷을 공식 제공하는지
  (`figma_kit` 필드)가 34개 중 다수 `미확인`입니다.
  프레임워크 4개는 특히 그렇습니다 — 커뮤니티 킷은 있으나 공식 여부를 확인하지 못했습니다.
- **컴포넌트 상세가 shadcn/ui 하나뿐입니다.** `full` 수집 20개 중 `## 컴포넌트 상세`
  섹션이 있는 것은 shadcn/ui입니다. 나머지는 문서 사이트가 필요합니다.

### 우선 수집 대상

1. **✓npm 확인된 후보부터.** probe까지 끝났으므로 `npm pack` 한 번이면 시작됩니다.
   문화권 우선순위를 적용한 순서:
   - **영미권**: Blueprint · Grommet · Vibe · Forma 36 · Ring UI · Stacks ·
     Thumbprint · Cedar · Auro · Mística · Porsche · Siemens iX · Vanilla · USWDS · Garden
   - **한국**: **KRDS** (`krds-uiux@1.1.0`) — GOV.UK 5px 베이스가 공공 계열 경향인지
     단독 선택인지 가르는 세 번째 공공 표본이면서 첫 한국 정부 표본
   - **동남아·중화**: SGDS · Semi Design
   - **일본**: 디지털청 · SmartHR · Charcoal · Spindle · Vibes · Serendie —
     **CJK 타이포 공백을 채울 가능성이 가장 큰 묶음**
2. **플랫폼 공백** — `wearable`·`tv` 0개 (`desktop`은 macOS 26으로 채워짐).
   macOS 잔여 페이지(Sidebar·Menu·Table — 노드 URL 필요), watchOS 26은 커뮤니티에 존재 확인,
   **Tizen CircularUI**(✓gh)가 Apple 외 첫 wearable 후보입니다. tvOS는 킷이 없습니다
3. **Base Web 재수집** — `check-sources.mjs`가 baseui 16.1.1 → 18.2.0 (major 2개) 낡음을
   보고했습니다. `tokens/scales.md`의 2px 22단계 인용이 유효한지 재확인 필요
4. **`aerospace` 두 번째 표본** — NASA WDS(✓gh). Astro UXDS의 등급색·관제 어휘가
   도메인 경향인지 단독인지 가릅니다
5. **shadcn/ui 24개 스타일 변형** — `styles/{base,aria,radix}-{luma…vega}/` 미개봉
6. **Radix Themes 26색 실값** — 대비 비율 검증용 (규격 명시는 Cloudscape 차트뿐)
