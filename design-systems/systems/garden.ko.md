---
name: Garden
org: Zendesk
coverage: full
url: https://garden.zendesk.com
repo: https://github.com/zendeskgarden/react-components
license: Apache-2.0
tech: [React]
figma_kit: 미확인
tokens_format: [JS, CSS]
a11y_target: 미확인
platform: web
domain: enterprise
verified: 2026-08-17
source: "npm @zendeskgarden/react-theming@9.15.7 → dist/index.cjs.js (DEFAULT_THEME). 보조: @zendeskgarden/css-variables@7.0.0"
---
<!-- lang-links -->
> [English](garden.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Zendesk의 디자인시스템. **스페이싱에 16px과 24px이 없습니다** —
배수가 `1·2·3·5·8·10·12`로, **코퍼스의 마지막 무결값(16px)을 깬 시스템**입니다.

## 토큰

### 스페이싱 — base 4에 곱수 7개, ×4와 ×6이 없습니다

```js
const BASE = 4;
space = {
  xxs: 4,    // ×1
  xs:  8,    // ×2
  sm:  12,   // ×3
  md:  20,   // ×5  ← ×4(16) 건너뜀
  lg:  32,   // ×8  ← ×6(24) 건너뜀
  xl:  40,   // ×10
  xxl: 48,   // ×12
}
```

**곱수 나열이 `1 · 2 · 3 · 5 · 8 · 10 · 12`입니다.** 앞의 다섯(1·2·3·5·8)은
피보나치 수열과 일치합니다 — 의도인지는 소스에 없습니다.

**`md`(중간값)가 16이 아니라 20입니다.** 30개 스페이싱 표본에서
**16px이 없는 첫 시스템**이며, 24px도 함께 없습니다 (24 부재는 Mantine에 이어 둘째).

레거시 `@zendeskgarden/css-variables@7.0.0`(2024년 정지)과 현행
`react-theming@9.15.7`(2026-07 갱신)에서 **같은 값**을 확인했습니다 —
낡은 패키지의 유물이 아닙니다.

### 파생 스케일 — 전부 `BASE` 곱셈입니다

| 계열 | 정의 | 값 |
|------|------|-----|
| 행간 | `BASE × 4~8, 11` | 16 · 20 · 24 · 28 · 32 · 44 |
| 라운드 | `BASE/2 · BASE · BASE×2` | **2 · 4 · 8** |
| **브레이크포인트** | `BASE × 144/192/248/300` | 576 · 768 · **992** · 1200 |

**브레이크포인트까지 4px 베이스의 곱입니다.** USWDS가 브레이크포인트를 스페이싱
맵에서 파생시키는 것과 같은 계열이되, Garden은 **곱수 하나로** 만듭니다.
`992 = 4×248`처럼 곱수가 커서 사실상 임의값이지만 표기가 곱셈입니다.

576/768/992/1200은 **Bootstrap의 브레이크포인트와 정확히 같습니다**
(`systems/bootstrap.md` — sm~xl).

### 타이포그래피

| 토큰 | 값 |
|------|:---:|
| `xs` | 10px |
| `sm` | 12px |
| **`md`** | **14px** |
| `lg` | 18px |
| `xl` | 22px |
| `xxl` | 26px |
| `xxxl` | 36px |

**본문 14px 진영**입니다 (`patterns/typography.md` — 8번째).
**16px이 폰트 스케일에도 없습니다** — 14 다음이 18입니다.

**레거시 css-variables에는 모노스페이스 전용 크기가 있습니다** —
`11 / 13 / 17px`로 **비례 서체(12/14/18)보다 각 1px 작습니다.**
표본에서 모노스페이스에 별도 크기 스케일을 둔 유일한 사례입니다
(Helios는 크기를 공유하고 서체만 바꿉니다). 현행 theming 패키지에서는
크기 분리가 확인되지 않아 레거시 한정일 수 있습니다.

굵기는 100~900 9단계 전부, 아이콘 크기 3단계(12/16/26).

### 불투명도 — 12단계 등차

```
100: 0.08 → 1200: 0.96  (0.08 등차)
```

**표본에서 가장 촘촘한 불투명도 스케일입니다** (Gestalt `--opacity-0~500`보다 조밀).
0.08 × n 등차라 이름(`100`~`1200`)과 값이 비례합니다.

### 보더 · 그림자

| 계열 | 값 |
|------|-----|
| 보더 두께 | 1 · **3px** |
| 그림자 두께 | 1 · 2 · 3px |
| 그림자 | **함수** — `xs: color => \`0 0 0 1px ${color}\`` |

**보더 두께가 1과 3입니다** — 2px이 없습니다. 표본에서 유일한 구성입니다.

**그림자 토큰이 값이 아니라 함수입니다.** 색을 인자로 받아 조립합니다 —
Open Props가 `--shadow-color`/`--shadow-strength` CSS 변수로 재조합하는 것과
목적이 같고, Garden은 **JS 함수 호출**로 합니다.

## 컴포넌트

`@zendeskgarden/react-*` 패키지군으로 분할 배포됩니다.

### 버튼 심화 (2026-08-17, `@zendeskgarden/css-buttons@9.0.1` — 클래식 CSS 라인)

| | sm | 기본 | lg |
|---|:--:|:--:|:--:|
| 높이 | 32 | **40** | 48px |
| 서체 | 12 | 14 | 14px |
| 좌우 패딩 | `.91667em` | `1.07143em` | `1.35714em` |

- **좌우 패딩이 em 순환소수**입니다 — `1.07143em` = 15px÷14px.
  px 의도값을 em으로 역산한 흔적 (Stacks의 rem 순환소수·Atlassian의
  `32/14em`과 같은 현상, 3번째 표본). 서체 크기를 바꾸면 패딩이 따라
  커지는 부수 효과가 생깁니다.
- `line-height = height − 2px` — 보더 몫 역산 (Mantine 행간 역산과 동일).
- 라운드 4px, `--pill` 변형 9999px, 아이콘 전용 40px 정사각.
- 이 패키지는 클래식 CSS 라인이고 현행은 styled-components(react-*) —
  값 계보 확인용.

## 특징적 결정

- **스페이싱에 16px이 없습니다.** 30개 표본 중 처음이며, 이로써
  **예외 없는 스페이싱 값이 0이 됐습니다** (`tokens/scales.md`)
- **곱수가 1·2·3·5·8·10·12** — ×4·×6·×7·×9·×11이 빠진 선별 목록입니다
- **중간값 `md`가 20px입니다** — 다수 시스템의 16px 자리
- **브레이크포인트까지 BASE 곱셈으로 표기합니다** — 값은 Bootstrap과 동일
- **폰트 스케일에도 16이 없습니다** (14 → 18)
- **모노스페이스 크기가 비례 서체보다 1px 작습니다** (레거시 확인)
- **보더가 1·3px** — 2px 없는 유일 구성
- **그림자가 색을 받는 함수입니다**
- **불투명도 12단계 0.08 등차** — 표본 최다

## 접근성

명시 목표 미확인. 불투명도·그림자(포커스링용 `0 0 0 Npx`) 구조가
포커스 표현에 쓰이는 것으로 읽히나 규격 수치는 소스에 없습니다.

## 참고

- 문서: https://garden.zendesk.com (프록시 차단)
- 토큰: `npm pack @zendeskgarden/react-theming@9.15.7` → `dist/index.cjs.js`
- 레거시 CSS 변수: `@zendeskgarden/css-variables@7.0.0` (2024년 이후 정지)
- **남은 확인 사항:** 컬러 팔레트(`palette`/`colors` 구조), 컴포넌트 목록,
  라이선스, 현행 패키지의 모노스페이스 크기 유무
- **라이선스 해소 (2026-08-18):** `Apache-2.0` — 출처: github zendeskgarden/react-components → `LICENSE.md` (npm `@zendeskgarden/react-theming@9.15.7` 메타와 일치)
