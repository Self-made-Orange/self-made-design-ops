---
name: Stacks
org: Stack Overflow
coverage: partial
url: https://stackoverflow.design
repo: https://github.com/StackExchange/Stacks
license: MIT
tech: [CSS, LESS]
figma_kit: 미확인
tokens_format: [CSS]
a11y_target: 미확인
platform: web
domain: consumer
verified: 2026-08-18
source: "npm @stackoverflow/stacks@2.9.0 → dist/css/stacks.css"
---
<!-- lang-links -->
> [English](stacks.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Stack Overflow의 시스템 — **본문이 13px로 표본 유일**이고, 파생 크기가
**13의 배수 순환소수**(1.46153846rem)로 노출되며, 스페이싱이
**static 원시값 × 배율 변수** 구조입니다.

## 토큰

### 타이포 — 13px 본문

```
--fs-base: 13px · fine 11 · caption 12
subheading 1.46153846rem (=19px) · title 1.61538462rem (=21px)
```

- **기본 13px** — 표본에서 유일한 값입니다. 본문 기본 축이
  13(Stacks) · 14(Ant·Semi·Ring UI 등) · 15 · 16(다수) · 17(CJK 3) ·
  18(Grommet)으로 6값이 됐습니다
- **1.46153846rem 같은 순환소수가 그대로 배포됩니다** — 19/13, 21/13의
  나눗셈 결과입니다. rem 기준(16px)이 아니라 **자기 base(13px) 기준 비율**을
  rem에 억지로 얹은 흔적이 값에 남아 있습니다
- `-relative` 접미 **em 쌍둥이 토큰**이 병행됩니다 (`--fs-title-relative:
  1.61538462em`) — px/상대단위 이중 배포

### 스페이싱 — static × 배율

```css
--su-static8: 8px;                            /* 원시 px */
--su8: calc(var(--su-static8) * var(--su-base));  /* 배율 적용 */
--su-base: 1;
```

- 전 단계가 **`static`(고정 px)과 배율 적용본의 쌍**입니다 —
  Cloudscape(scaled/static 열거)와 같은 구분을 **calc 곱셈**으로 만듭니다.
  런타임 배율 진영(Mantine·Radix·Vapor·Ring UI)과 static 이원화의 결합
- 단계: `1 2 4 6 8 12 16 24 32 48 64 96 128` — 6 포함(Semi·Helios 계열),
  코어값 전부 보유

### 라운드

`sm 4 · md 6 · lg 8 + circle 50%` — **6px 중간 단계**(홀짝 혼합)와
`circle`(50%) 이름은 `GLOSSARY.md`의 알약/정원 구분에서 정원 진영입니다.

다크 모드는 `.theme-dark` 클래스와 `prefers-color-scheme` **양쪽을 다 씁니다**
(합계 556개 분기) — 클래스 강제와 OS 추종을 동시에 지원하는 형태입니다.

## 컴포넌트

CSS 프레임워크형(클래스 기반) + Stimulus 컨트롤러. ~~목록 미조사.~~ →
아래 심화 절 (2026-08-18). CSS 컴포넌트 **47종**(`lib/components/`) +
Stimulus 컨트롤러 **9종**(banner · expandable · modal · navigation ·
popover · table · toast · tooltip · uploader).

## 컴포넌트 심화 — (2026-08-18)

`@stackoverflow/stacks@2.9.0`의 `lib/components/*.less`(LESS 원본)를 읽고
`dist/css/stacks.css`로 값을 대조했습니다. 전제 하나가 중요합니다 —
**`html, body { font-size: var(--fs-base) }`로 1rem = 13px입니다.**
아래 rem 파생값은 전부 13px 기준으로 해석했습니다.

### 버튼 (`.s-btn`)

높이 선언이 없고 **패딩이 px이 아니라 em**입니다 — 절대 패딩이 폰트 크기에
비례해 자라고, 높이는 `서체 × 행간 + 패딩 + 보더`로 파생됩니다.

| | xs | sm | 기본 | md |
|---|:--:|:--:|:--:|:--:|
| 서체 | 11px (fine) | 12px (caption) | 13px (body1) | 17px (body3) |
| 패딩(전방향) | 0.6em (6.6px) | 0.8em (9.6px) | 0.8em (10.4px) | 0.7em (11.9px) |
| 라운드 | 6px | 6px | 6px (`--br-md`) | **5px** (`calc(--br-sm + 1px)`) |
| **파생 높이** | **≈27.9px** | **≈35.0px** | **≈37.8px** | **≈45.4px** |

- **버튼 굵기가 400입니다** (`font-weight: normal`) — 13px 본문 크기에 굵기도
  본문 그대로. Backpack(16px·700)과 정반대 극단이고, 14px·500~600 다수 진영
  어디에도 없습니다. **최소 너비 없음**, 보더 1px, 행간 `--lh-sm` =
  (13+2)/13 ≈ 1.1538 (무단위 — 큰 서체에서는 "+2px" 의도에서 어긋남).
- **기본 크기가 스케일 밖의 무명 단계입니다** — 크기 클래스는 xs/sm/md뿐이고,
  클래스 없는 기본(37.8px)이 sm(35.0)과 md(45.4) **사이**에 낍니다.
- **md에서 라운드가 6→5px로 오히려 줄어듭니다** — `calc(4px + 1px)` 홀수 라운드.
  Backpack(large에서 8→12px 확대)과 반대 방향.
- 전 치수·색이 `--_bu-*` 언더스코어 접두 변수 + `--theme-button-*` 폴백 체인 —
  Backpack `--bpk-private-*`와 같은 "내부용" 신호를 `_` 접두로 냅니다.
- 변형: filled · outlined · link · unset + danger/featured/muted +
  **소셜 로그인 3종(facebook · google · github)이 시스템 안에 있습니다** —
  Facebook 브랜드색은 LESS `darken()`으로 컴파일 시 파생.

### 입력 (`.s-input` / `.s-textarea`)

역시 높이 미고정 + em 패딩입니다. 크기가 **버튼(3단)보다 많은 5단**입니다.

| | 기본 | sm | md | lg | xl |
|---|:--:|:--:|:--:|:--:|:--:|
| 서체 | 13px | 12px | 17px | 21px (title) | 27px (headline1) |
| 상하 패딩 | 0.6em (7.8px) | 0.6em (7.2px) | 0.5em (8.5px) | 0.45em (9.45px) | 0.4em (10.8px) |
| 좌우 패딩 | 0.7em (9.1px) | 0.7em | 0.7em (11.9px) | 0.6em (12.6px) | 0.5em (13.5px) |

- **크기가 커질수록 em 계수를 줄입니다** (0.6→0.4em) — em 패딩의 비례 폭주를
  계수로 감쇠시키는 보정. 보더 1px, 라운드 6px (md·lg 5px, xl 6px).
- **iOS Safari 전용 분기가 컴포넌트 CSS에 있습니다** — `@supports
  (-webkit-overflow-scrolling: touch)`에서 서체를 **16px로 강제**(포커스 시
  페이지 줌 방지)하고 패딩을 0.55/0.36em으로 재보정합니다. 접근성/UX 보정이
  토큰이 아니라 컴포넌트 층에 박힌 형태.
- 라벨(`.s-label`)은 플로팅 없는 **별도 블록** — 15px (body2) · **700** ·
  `padding: 0 2px`(입력과 시각 정렬용 주석 명기). 라벨은 700인데 버튼이 400 —
  굵기 위계가 표본 다수와 뒤집혀 있습니다.

### 모달 (`.s-modal`)

| | 값 |
|---|---|
| 폭 | max-width **600px 단일 단계** (+`__full` = 100%−48px) |
| 라운드 | 8px (`--br-lg`) |
| 패딩 | 24px 사방 (celebration 변형은 상단 64px) |
| 스크림 | `hsla(210, 8%, 5%, 0.5)` (black-600 50% — LESS `fade()` 컴파일) |
| 진입 | 불투명도·transform **100ms + 10ms 딜레이**, `--te-smooth` |
| 퇴장 | **불투명도 200ms** · transform 100ms |

- **퇴장 불투명도(200ms)가 진입(100ms)의 2배입니다** — `patterns/modal.md` 표본
  (Radix 200/160 · Atlassian 250/200 · MUI 225/195 · shadcn 200/200)이 전부
  진입≥퇴장인 것과 **역방향**입니다.
- 대화상자 진입 변형이 `translateY(30%) + scale(0.6)` → 1 — 표본 모달 스케일
  (0.95~0.97, `patterns/modal.md`)보다 훨씬 큰 이동량입니다.
- 폭 1단계(600px)는 shadcn(512px 1단계)과 같은 단일 폭 진영.

### 이징 — Penner 상수 세트를 토큰화

`--te-*` 8종이 전부 **Penner easing(easings.net 상수)과 일치**합니다:

| 토큰 | 값 | Penner 대응 | 실사용 |
|------|-----|------|:---:|
| `--te-smooth` | (0.165, 0.84, 0.44, 1) | easeOutQuart | **11회** |
| `--te-smooth-slow` | (0.25, 0.46, 0.45, 0.94) | easeOutQuad | 2회 |
| `--te-ease-in` | (0.47, 0, 0.745, 0.715) | easeInSine | 1회 |
| `--te-smooth-quick` | (0.19, 1, 0.22, 1) | easeOutExpo | 0회 |
| `--te-ease-out` / `--te-ease-in-out` | Sine 계열 | easeOut/InOutSine | 0회 |
| `--te-back-out` / `--te-back-in-out` | (…1.275) / (…1.55) | easeOut/InOutBack | 0회 |

- **8종 중 실사용 3종** — back 계열(오버슛)은 배포만 되고 0회입니다.
  Material 곡선 진영(MUI·Backpack 신규 컴포넌트)과 다른 혈통이고,
  본류는 easeOutQuart 단일 곡선입니다.
- 고대비는 미디어쿼리가 아니라 **`body.theme-highcontrast` 클래스**로 받습니다
  (`forced-colors` 쿼리는 전체 CSS에서 체크박스 1곳뿐). 포커스 링에는
  **2px 투명 outline**을 깔아 Windows 강제 색상 모드에서 윤곽이 살아나게 합니다.

### 특징적 결정 (심화분)

- **em 패딩 파생 높이** — 고정 높이 진영도, MUI식 px 파생 진영도 아닌 em 비례층
- **버튼 400 · 라벨 700** — 굵기 위계 역전
- **기본 버튼 크기가 크기 스케일 밖** (sm과 md 사이)
- **Penner easing 8종 토큰화, 실사용 3종**
- **모달 퇴장 > 진입** — 표본 역방향
- iOS Safari 16px 강제 분기가 컴포넌트 CSS에 내장

## 특징적 결정

- **본문 13px** — 표본 유일값
- **13분수 순환소수 rem** — base 불일치의 흔적이 값에 노출
- static/배율 쌍 스페이싱 — Cloudscape식 구분의 calc 구현
- px/em 쌍둥이 타이포 토큰
- 다크가 클래스+미디어쿼리 병용 (556 분기)

## 접근성

미확인.

## 참고

- 토큰: `npm pack @stackoverflow/stacks@2.9.0` → `dist/css/stacks.css`
- 컴포넌트 심화: 같은 패키지의 `lib/components/{button,input_textarea,label,modal}/*.less`
  + `lib/exports/mixins.less`(size-styles·focus-styles·highcontrast-mode),
  `dist/css/stacks.css` 대조 (2026-08-18)
- **남은 확인 사항:** 컬러 팔레트 구조, ~~컴포넌트 목록~~ ~~고대비 대응~~
  ~~Stimulus 컨트롤러 목록~~ (2026-08-18 해소 — 심화 절)
