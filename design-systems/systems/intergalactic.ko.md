---
name: Intergalactic (Semcore)
org: Semrush
coverage: partial
url: https://developer.semrush.com/intergalactic
repo: https://github.com/semrush/intergalactic
license: MIT
tech: [React]
figma_kit: true
tokens_format: [CSS, JS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @semcore/core@17.3.0 → lib/theme/themes/{light,dark,auto,highlights-light,highlights-dark}.css · npm @semcore/button@17.2.1 · input@17.2.2 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](intergalactic.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Semrush의 시스템 — **"강조(feature-highlight)" 전용 테마 파일**이 별도로 있고
그 값이 **전부 그라디언트**입니다. 지속시간이 **컴포넌트별로 열거**되며,
원시 색마다 **사용 조건 주문이 주석으로** 붙습니다(773개).

## 토큰 — 테마 5벌

```
light.css · dark.css · auto.css(원시) ·
highlights-light.css · highlights-dark.css   ← 강조 전용
```

### 강조 테마 — 값이 전부 그라디언트

```css
--intergalactic-control-primary-feature-highlight:
  linear-gradient(90deg, #ab6cfe, #008ff8);
--intergalactic-border-feature-highlight:
  linear-gradient(90deg, #c695ff, #2bb3ff);
```

- **"신기능·유료 기능 강조"를 별도 테마 파일로 배포한 표본 유일 사례입니다.**
  17개 토큰 전부가 보라→파랑 그라디언트이며, 보더까지 그라디언트입니다
  (표본에서 보더에 그라디언트를 쓰는 것도 여기뿐)
- 라이트/다크와 **직교하는 축**입니다 — Tegel의 `mode-variant`(표면 위계)와
  같은 구조를 **마케팅 강조**에 쓴 형태입니다.
  SaaS의 업셀 UI가 토큰 층에 나타난 첫 데이터입니다

### 원시 색에 사용 조건 주석

```css
/* Only suitable for backgrounds. Can be completely invisible to users with
   low-contrast monitor or poor vision. */
--gray-50: #f4f5f9;
/* Use only for light strokes and active backgrounds. */
--gray-100: #e0e1e9;
```

**주석이 773개**입니다 — Cloudscape(`$description` 필드)에 이어 두 번째로
"토큰에 사용 지침을 동봉"하는 사례이고, **저시력/저대비 모니터 위험을
명시**하는 것은 여기뿐입니다. 접근성 경고가 토큰 주석에 있습니다.

### 지속시간 — 컴포넌트별 열거

```
extra-fast 100 · fast 200 · medium 300 · slow 400 · extra-slow 500
accordion 200 · control 200 · counter 200 · modal 200 · popper 200 ·
switch 100
```

의미 5단계 위에 **컴포넌트 6종의 지속시간을 따로** 둡니다 —
Atlassian(컴포넌트별 복합 토큰 68개)의 축소판이며, 값은 대부분 200으로
같습니다(switch만 100). **분리해 뒀지만 값은 아직 안 갈린 상태**입니다.

라운드: `2 · 4 · 6 · 12 · 24` — 6px 포함 홀짝 혼합, 배가 아닌 불규칙.

## 컴포넌트 심화 — (2026-08-18)

컴포넌트별 개별 패키지(`@semcore/button@17.2.1` · `input@17.2.2` ·
`modal@17.2.2`)의 `*.shadow.css`(SButton 같은 컴포넌트 셀렉터를 빌드 시
클래스로 치환하는 자체 CSS 방언)를 실측했습니다. 모든 `var()`에
**OKLCH 폴백이 인라인**돼 있습니다 — 테마 CSS 없이도 동작하는 이중 배포.

### 버튼 — 기본 28px, 좌우 패딩이 없음

| | s | m (기본) | l |
|---|:--:|:--:|:--:|
| height | 20px (**정사각 아이콘 전용**) | **28px** | 40px |
| 서체 | — | 14px / lh 142% | 16px / lh 150% |
| 라운드 | 4px (`addon-rounded`) | 6px (`control-rounded`) | 6px |
| 굵기 | 500 공통 | | |

- **m 기본 28px는 표본 최소급 컨트롤 높이**입니다 — 32px 밀집 진영(Ring UI·
  Siemens iX)보다 한 단 더 낮은, 데이터 도구의 초밀집 좌표입니다.
  s(20px)는 너비까지 고정된 아이콘 전용 사이즈입니다.
- **버튼 자체에 좌우 패딩이 없습니다** — 여백을 자식 `SText`의 margin
  (m 8px / l 12px)과 `SAddon`의 margin이 만듭니다. 아이콘 여백은
  `calc(8px - 1px)`에 **`/* -1px - for border width */` 주석** — 보더 차감
  의도를 주석으로 남깁니다 (Kontur는 값에, 여기는 주석에).
- 변형이 **use(primary/secondary/tertiary) × theme(info/success/warning/
  danger/muted/invert) 매트릭스**로 12종 이상인데, **`primary-warning`의
  값이 `primary-brand`와 완전히 동일**합니다 — 조합 API를 먼저 열어 두고
  값은 아직 안 가른 상태 (지속시간 열거와 같은 패턴의 색 판).
- `neighborLocation`(left/right/both) 속성으로 그룹 결합 — 버튼·입력이
  같은 API를 공유하고, 겹친 보더는 `margin-left:-1px`+의사요소 세로선으로
  처리합니다.
- 배포 CSS에 **`/* disable-tokens-validator */` 주석이 남아 있습니다** —
  리터럴 값을 막는 토큰 강제 린터가 있고, 그 탈출구가 출하물에 보이는
  표본 유일 데이터입니다.

### 입력 — 보더가 별도 형제 요소

| | m | l |
|---|:--:|:--:|
| height | 28px (`form-control-m`) | 40px — 버튼과 동일 토큰 |
| 서체 | 14px | 16px |
| 값 패딩 | 0 8px | 0 12px |
| 라운드 | 6px | 6px |

- **보더·배경이 input이 아니라 `SOutline` 형제 요소**(absolute, z-index −1,
  1px 보더)에 있습니다. `SInput` 컨테이너가 `padding: 1px`로 보더 자리를
  예약하고, 상태(normal/valid/invalid)는 SOutline의 보더색을 갈아 끼웁니다.
- **포커스 링까지 상태색입니다** — valid면 초록 링
  (`keyboard-focus-valid`), invalid면 빨강 링. 포커스 = 파랑이라는 표본
  다수 관행과 갈립니다. 링은 3px (`0 0 0 3px rgba(0,143,248,.5)` 계열).

### 모달 — 중첩 스크림 자동 감쇠, 폴백 드리프트 실물

| 항목 | 값 |
|------|-----|
| 라운드 | 폴백 **14px** vs 테마 파일 **12px** |
| 패딩 | 40px (`spacing-10x`) — 모바일 래퍼 12px |
| 제목 | 24px / 600 |
| 폭 | 스케일 없음 (모바일만 min-width 60%) |
| 지속시간 | `--intergalactic-duration-modal: 200` (단위 없음) |

- **컴포넌트 인라인 폴백(14px)과 테마 값(12px)이 어긋나 있습니다** —
  이중 배포(폴백+테마)의 드리프트가 실제로 관측된 표본입니다.
  어느 쪽이 로드되느냐로 라운드가 달라집니다.
- **모달 위 모달의 스크림이 자동으로 옅어집니다** — `SOverlay` 안의
  `SOverlay`는 `overlay-secondary`(더 낮은 알파)를 받습니다. 중첩 깊이를
  스타일이 인식하는 표본 유일 구조입니다.
- **지속시간 토큰이 단위 없는 `"200"`**입니다 — JS(`cssVariableEnhance`)가
  `parseInt`로 읽어 React 애니메이션에 주입합니다. Siemens iX와 같은
  "CSS 변수 → JS 소비" 방향이며, 단위를 뗀 이유가 JS 파싱입니다.
- 모달 패키지에 **aria 라벨 번역 15개 언어 JSON**이 동봉됩니다 —
  컴포넌트 단위 i18n 배포.

### 특징적 결정 (심화분)

- **기본 컨트롤 28px** — 표본 최소급 밀도
- **패딩 대신 자식 마진** + 보더 차감을 주석으로 문서화
- **SOutline 분리 보더** · 포커스 링이 상태색
- **중첩 모달 스크림 자동 감쇠** — 표본 유일
- **폴백 14px vs 테마 12px 드리프트** — 이중 배포의 실패 표본
- **단위 없는 duration을 JS가 파싱** · `primary-warning`=brand 별칭 상태

## 특징적 결정

- **강조 전용 테마 파일 + 전 토큰 그라디언트** — 표본 유일
- 그라디언트 보더 — 표본 유일
- **원시 색 주석에 저시력 경고** — 표본 유일 (주석 773개)
- 컴포넌트별 지속시간 열거(값은 대부분 동일)
- 테마 5벌 구조 (light/dark × 일반/강조 + 원시)

## 접근성

- 원시 색 주석에 저대비·저시력 사용 위험 명시
- 수치·목표는 미확인

## 참고

- 토큰: `npm pack @semcore/core@17.3.0` → `lib/theme/themes/`
- 컴포넌트는 `@semcore/*` 다수 패키지로 분할 배포
- 컴포넌트 심화: `@semcore/button@17.2.1` · `@semcore/input@17.2.2` ·
  `@semcore/modal@17.2.2`의 `lib/esm/**/*.shadow.css`·`Modal.mjs` +
  `@semcore/utils@4.49.0` `lib/themes/light.css` (2026-08-18)
- **남은 확인 사항:** ~~스페이싱 체계~~ ~~타이포~~ (2026-08-18 해소 —
  utils 테마에서 확보: 스페이싱 `05x~24x` = 2·4·8·12·16·20·24·32·40·56·80·96px
  4px 배수 명명, 타이포 `fs-50~800` = 10·12·14·16·20·24·32·36·48px +
  `lh-100~800` % 행간), 컴포넌트 목록, 강조 테마의 적용 규칙
- **Figma 킷 확인 (2026-08-18):** `figma_kit: true` — `developer.semrush.com/intergalactic` 전역 내비게이션의 "Figma libraries" → `figma.com/@semrush`
