---
name: Semi Design
org: ByteDance (Douyin FE)
coverage: partial
url: https://semi.design
repo: https://github.com/DouyinFE/semi-design
license: MIT
tech: [React]
figma_kit: 미확인
tokens_format: [CSS, SCSS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @semi-bot/semi-theme-default@1.0.0 → semi.css (--semi-* 1,887개, 표·내비·피드백 실측 2026-08-18) · npm @douyinfe/semi-ui@2.102.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](semi.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

ByteDance(Douyin)의 시스템 — Ant에 이은 **두 번째 중화권 표본**.
토큰의 **70%가 색**(1,319/1,887)이고, 크기·여백은 토큰 없이 컴포넌트에 박혀 있으며
**실사용 지배 크기가 14px**입니다.

## 토큰 — 1,887개, 색 편중

| 계열 | 개수 |
|------|:---:|
| `color` | **1,319 (70%)** |
| `border` | 145 |
| 색상 램프 (`grey`·`blue`·`green`·`red`·`orange` …) | 각 38~73 |
| 라운드 | 6 |
| 그림자 | 1 (`elevated`) |
| **스페이싱 · 폰트 크기** | **0** |

**치수 토큰이 없습니다.** Semi의 테마 시스템은 색 교체용이고,
크기·여백은 컴포넌트 CSS 리터럴입니다 — Mantine의 "컴포넌트별 변수" 방식보다
더 나아가 **변수 자체가 없습니다.**

### 실사용 크기 — 14px 지배

컴포넌트 CSS의 `font-size` 리터럴 빈도:

```
14px ×92 · 12px ×43 · 16px ×19 · 20px ×7 · 18px ×6 · 24px ×4
```

**14px이 16px의 5배 빈도입니다.** Ant(`fontSize: 14` 시드)와 함께
**중화권 두 표본이 모두 14px 본문**입니다 — `patterns/typography.md`의
14px 진영이 중화권에서 2/2입니다.

### 라운드 — 3px 포함, 원형 이원화

```
small 2 · extra-small 3 · medium 6 · large 12 · circle 50% · full 9999px
```

- **4·8이 없고 3→6→12 배가**입니다 — 홀수 라운드 진영(Helios·Spectrum·SGDS) 합류
- **`circle`(50%)과 `full`(9999px)을 둘 다 둡니다** — Thumbprint·Paste와 같은 이원화
- 이름 서열이 특이합니다 — `extra-small`(3)이 `small`(2)보다 **큽니다**.
  SGDS의 `lg` < 기본 역전에 이은 두 번째 이름-값 어긋남입니다

## 컴포넌트

`@douyinfe/semi-ui@2.102.0` (React). 목록 미확인.
테마가 `@semi-bot/semi-theme-*` 별도 패키지로 배포됩니다 —
**테마 마켓 구조**(사용자 제작 테마를 npm으로 배포)입니다.

## 컴포넌트 심화 — (2026-08-18)

테마 패키지의 `semi.css`가 변수 선언만이 아니라 **전 컴포넌트의 컴파일 CSS
20,602줄**을 담고 있습니다 (`@semi-bot/semi-theme-default@1.0.0` — 컴포넌트
구현은 `@douyinfe/semi-ui@2.102.0`). 아래는 이 CSS 실측입니다.

### 버튼 (`.semi-button`)

| | small | 기본 | large |
|---|:--:|:--:|:--:|
| **height** | 24px | **32px** | 40px |
| 상하 패딩 | 2px | 6px | 10px |
| 좌우 패딩 | 12px | 12px | 16px |

- 서체 **14px / 20px / 600** 전 크기 공통 — 굵기 600은 Backpack(700)과
  다수 진영(500) 사이.
- 라운드가 `--semi-border-radius-small` = **2px**입니다 — 버튼·입력 공통.
  모달은 12px — **컨트롤 2px vs 오버레이 12px**, 한 시스템 안의 라운드
  낙차가 표본 최대급입니다.
- **전환(transition)이 없습니다** — 20,602줄 전체에 `transition` 30회뿐,
  버튼·입력에는 0회. hover/active 색이 **즉시 스왑**됩니다. 이징을 토큰화하지
  않은 Backpack조차 리터럴 42회를 쓰는 것과 대조되는 "모션 없는 상태 변화".
- 변형이 **2축 직교**입니다: type 5종(primary·secondary·tertiary·warning·danger)
  × theme 3종(solid·light·borderless). `.semi-button-primary.semi-button-light`처럼
  클래스 조합으로 15칸 행렬을 만듭니다.

### 입력 (`.semi-input`)

| | small | default | large |
|---|:--:|:--:|:--:|
| 내부 height | 22px | **30px** | 38px |
| 래퍼 1px 보더 포함 | 24px | 32px | 40px |
| 서체 | 14px | 14px | 16px |

- **버튼과 같은 24/32/40 3단**입니다 — 입력은 내부 높이에 래퍼 보더 2px를
  더해 도달합니다. Backpack(36/48 2단 공유)과 같은 컴포넌트 간 높이 정합을
  8px 등차 3단으로.
- **filled형입니다** — 래퍼가 `fill-0` 회색 배경 + **투명 1px 보더**, 포커스에
  보더만 착색되고 **링·그림자가 없습니다**. Ant(아웃라인+링)와 갈리는 지점.
- 좌우 패딩 12px = 버튼과 동일.

### 모달 (`.semi-modal`)

| | 값 |
|---|---|
| 폭 | small **448** · medium **684** · large **920** · full-width calc(100vw−64px) |
| 라운드 | 12px (radius-large) |
| 패딩 | 내용 좌우 24px · 헤더/푸터 margin 24px |
| 스크림 | rgba(22,22,26,.6) |
| 진입 | **120ms `cubic-bezier(0, 0, 0.26, 1.38)`** scale 0.7→1 |
| 퇴장 | 90ms ease |

- **진입 이징이 오버슈트(1.38)입니다** — 모달이 살짝 튀며 등장합니다.
  전환이 없는 시스템이 모달에만 바운스를 쓰는 낙차가 특징.
- 진입 120 / 퇴장 90ms 비대칭 — MUI(225/195)와 같은 방향, 절반 이하 길이.
- 헤더 서체가 **14px/600** — 모달 제목도 본문 크기입니다.
- 기본 폭 448px — MUI 다이얼로그 xs(444)·HeroUI md(448)와 같은
  "440대 기본 모달" 수렴대. 684·920은 4배수이되 8배수가 아닙니다.

### 다크 모드 · 램프 (backlog 해소)

- 색상 램프는 **전 색상 10단계**(0~9)입니다 — `--semi-blue-0..9` 등.
  brand는 blue와 같은 값의 별칭 램프.
- 다크가 `body[theme-mode=dark]` 속성 셀렉터이고, **`.semi-always-light` /
  `.semi-always-dark` 클래스로 서브트리 단위 모드 강제**가 가능합니다 —
  지역 모드 반전을 셀렉터 층에 설계해 둔 표본 드문 사례.

### 표 (`.semi-table`) — 세로만 줄이는 밀도 3단

| 밀도 | 셀 세로 패딩 | 셀 가로 패딩 |
|---|:--:|:--:|
| default | **16px** | 16px |
| middle | 12px | **16px (동일)** |
| small | 8px | **16px (동일)** |

- **밀도가 세로 패딩만 바꾸고 가로 16px은 그대로**입니다 — Cloudscape에서
  도출된 "세로만 줄이고 가로는 유지"가 독립 시스템의 배포 CSS에서 다시 확인됩니다.
- 헤더 셀은 **가로 16 / 세로 8px · 굵기 600 · `border-bottom: 2px`**입니다.
  본문 행 구분선은 1px — **헤더 아래만 2배 두껍습니다.**
- **고정 헤더·고정 열 `z-index: 101`**입니다. 확보 표본에서 가장 높은 값이며
  (Vuetify 1~2 · Chakra 1 · Carbon 1 · Ant 2 · Mantine 3 · Cloudscape 798),
  같은 시스템의 다른 층위 값과 연결되지 않은 리터럴입니다.
- **고정 열 경계가 보더 1px + `box-shadow: ±3px 0 0`** 조합입니다 —
  스크롤 그림자를 그림자 블러 없이 단색 3px 띠로 냅니다.
- hover는 `--semi-color-fill-0` 배경이고, **고정 열 셀만 `::before` 의사 요소로
  같은 색을 다시 칠합니다** (고정 셀이 불투명 배경을 갖기 때문).
- 정렬 아이콘 16×16px, 좌측 여백 4px, 활성 시 `--semi-color-primary`.
  **위/아래 화살표가 각각 `height: 0`인 두 요소로 겹쳐 있습니다.**
- 열 크기 조정(`react-resizable`)이 기본 포함이고, 드래그 중 경계가
  `2px solid primary`로 바뀝니다.
- **줄무늬 규칙은 확인하지 못했습니다** (배포 CSS에 `striped`/`zebra` 셀렉터 없음).

### 내비게이션 (`.semi-navigation` · `.semi-tabs` · `.semi-breadcrumb`)

| 항목 | 값 |
|---|---|
| 사이드바 폭 | **240px** (좌우 패딩 8px 포함) |
| 접힘 폭 | **60px** |
| 접힘 전환 | 폭 200ms `cubic-bezier(0.62, 0.05, 0.36, 0.95)` · 패딩 100ms ease-out |
| 항목 높이 | **36px** · 패딩 8/12px · 항목 간 여백 8px |
| 항목 라운드 | `border-radius-small` = **2px** (버튼과 동일) |
| 계층 들여쓰기 | 1단계 32px(`-item-indent`) · 3단계 텍스트 44px |
| 탭(line) 패딩 | large **16/4/14px** · medium 12/4/10 · small 8/4/6 |
| 탭 간격 | **24px** · 활성 표시 하단 **2px** |
| 브레드크럼 | 항목 간 4px · loose 14px / compact **12px** 2단 |

- **탭 상하 패딩이 비대칭**입니다 (위 16 / 아래 14). 아래 2px을 활성 밑줄이
  차지하므로 시각 중심을 맞춘 결과입니다 — 확보 표본에서 이 보정을 한 유일 사례.
- **hover에도 밑줄이 생깁니다** (`fill-0` 2px) — 활성(primary)·active(fill-1)과
  같은 두께로, 상태 전이에서 레이아웃이 밀리지 않습니다.
- 사이드바가 **로고 36px 정사각**을 기준으로 접힘 폭 60px(=36+8+8+여백)을 잡습니다.
- 브레드크럼에 **loose / compact 두 서체 단(14/12px)**이 있습니다.

### 피드백 (`.semi-toast` · `.semi-banner` · `.semi-badge`)

| 항목 | 값 |
|---|---|
| **Toast** 위치 | **상단 중앙 고정** (`top: 0`, `text-align: center`), z-index **1010** |
| Toast 패딩·마진 | **12px 8px** · 마진 12px · 라운드 medium(6px) |
| Toast 폭 | **없음** — `display: inline-flex`로 내용 폭 |
| Toast 서체 | 14px / **굵기 600** |
| Toast 그림자 | `0 0 1px rgba(0,0,0,.3), 0 4px 14px rgba(0,0,0,.1)` 2층 |
| **Banner** 패딩 | **12px 12px** · 컨테이너형은 라운드 small(2px) |
| Banner 닫기 | 24×24px · 좌측 여백 12px |
| **Badge** count | 높이 **18px** / min-width 18px / 라운드 **9px**(=높이 절반) |
| Badge 패딩·서체 | 0 4px · 12px / 행간 16px |
| Badge dot | 8×8px |

- **토스트에 폭 규격이 없습니다** — 확보 표본에서 폭을 정하지 않는 유일 사례입니다
  (Sonner 356 · PrimeVue 352 · Ant 384 · Naive 365 · Grommet 384 · Carbon 288/352).
  내용 길이에 따라 폭이 변합니다.
- **`light` 변형에서만 상태색이 보더로 나옵니다** — `semi-toast-light`가
  `-light-default` 배경 + 1px 상태색 보더이고, 기본 변형은 `bg-3` 단색에
  **아이콘 색만** 상태를 나타냅니다. shadcn/ui(sonner)의 "아이콘 모양만"과
  Cloudscape의 "배경색 전체" 사이의 중간 태도입니다.
- 배지 라운드 9px이 높이(18px)의 정확히 절반 — 알약을 `9999px`이 아니라
  리터럴 절반값으로 씁니다.

### 특징적 결정 (심화분)

- **버튼·입력 높이 24/32/40 공유** — 8px 등차 3단
- **컨트롤 라운드 2px vs 모달 12px** — 라운드 낙차 최대급
- **전환 부재** — 상태색 즉시 스왑, 모달만 오버슈트 바운스(1.38)
- type × theme **2축 15칸 변형 행렬**
- 입력이 filled + 포커스 보더 착색(링 없음)
- `.semi-always-*` 서브트리 모드 강제

## 특징적 결정

- **토큰 70%가 색** — 테마 시스템이 사실상 색 전용
- **치수 토큰 0** — 크기·여백이 전부 컴포넌트 리터럴
- **실사용 14px 지배** — 중화권 14px 패턴 2/2 (Ant·Semi)
- 라운드 3→6→12 배가, `circle`/`full` 이원화
- `extra-small`(3) > `small`(2) — 이름-값 역전
- 테마가 봇 생성 패키지(`@semi-bot/*`)로 배포 — 테마 마켓 구조

## 접근성

미확인.

## 참고

- 테마: `npm pack @semi-bot/semi-theme-default@1.0.0` → `semi.css`
- 컴포넌트: `@douyinfe/semi-ui@2.102.0` — 심화는 `semi.css`의 컴파일된
  컴포넌트 CSS에서 실측 (2026-08-18)
- 라이선스: 테마 패키지 package.json에 **MIT** 명기. 본체 저장소
  (DouyinFE/semi-design) `LICENSE`도 **MIT** — frontmatter 반영 (2026-08-18)
- **남은 확인 사항:** ~~색상 램프 단계 수, 다크 모드 방식~~ (2026-08-18 해소 —
  심화 절: 10단계 램프, `body[theme-mode=dark]`), 컴포넌트 목록(테마 CSS에서
  클래스 접두 ~80종 실측 — semi-ui 자체 목록으로는 미검증), Semi DSM(테마 빌더) 구조
- **라이선스 해소 (2026-08-18):** `MIT` — 출처: github DouyinFE/semi-design → `LICENSE` (npm `@douyinfe/semi-ui@2.102.0` 메타와 일치)
