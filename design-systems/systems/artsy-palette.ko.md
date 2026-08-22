---
name: Palette
org: Artsy
coverage: partial
url: https://palette.artsy.net
repo: https://github.com/artsy/palette
license: MIT
tech: [React, styled-system]
figma_kit: false
tokens_format: [JS]
a11y_target: false (등급 선언 없음 — "best-practices in mind, may still have some issues", 2026-08-18 렌더 확인)
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @artsy/palette-tokens@7.3.0 → dist/themes/v3.js, dist/typography/v3.js"
---
<!-- lang-links -->
> [English](artsy-palette.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Artsy(미술 거래)의 시스템 — 스페이싱이 **10px 단위 5단계**(`1`=10px)이고
`half`(5px)만 예외로 있습니다. 타이포 최대가 **102px**이며,
`bq`(blockquote) 전용 변형이 있습니다. **브레이크포인트가 1920px까지** 갑니다.

## 토큰

### 스페이싱 — 10px 단위, 5단계

```js
space = { 0.5: '5px', half: '5px', 1: '10px', 2: '20px',
          4: '40px', 6: '60px', 12: '120px' }
```

- **번호 1이 10px입니다** — GOV.UK(5px) · Blueprint(10px 그리드) ·
  KRDS(루트 10px)에 이어 **10px 계열 네 번째**이고, 스페이싱 스케일을
  10px 배수로만 둔 것은 Artsy뿐입니다
- **4px·8px·16px이 하나도 없습니다** — Kaizen(6px 격자)에 이은 두 번째
  코어 전면 이탈. 두 시스템의 격자가 6px과 10px로 서로 다릅니다
- **`0.5`와 `half`가 같은 값의 두 이름**입니다 — 숫자 키와 단어 키를
  동시에 제공하는 표본 유일 중복
- 단계가 **5개(+half)**로 표본 최소 계열 (Protocol 6 · Bootstrap 6 · Nord 6)

### 타이포 — 11~102px, 이름이 크기 축약

```
xxxl 102/108 · bq 50/60 · xxl 60/70 · xl 40/48 · lg 26/40 · md 20/32
sm 16/26 · xs 13/20 · xxs 11/14 (+ lg-display · sm-display)
```

- **최대 102px** — 표본 최대 타이포 크기(Kaizen 84px, 디지털청 64px을 넘습니다).
  미술 작품 페이지의 전시형 타이포
- **`bq`(blockquote) 전용 변형** — 역할 이름에 HTML 요소가 직접 등장하는
  표본 유일 사례입니다 (50px 인용문)
- `-display` 접미 쌍 — 같은 크기의 전시용 변형 (lg / lg-display)
- 행간이 크기별 고정 px이며 26/40(lg)처럼 **비율 1.54**로 넓습니다
- 서체가 `ll-unica77` 커스텀 하나 — 폴백만 시스템 서체

### 브레이크포인트 — 1920px 상단

```
xs ≤767 · sm 768 · md 1280 · lg 1920
```

**상단이 1920px입니다** — LeafyGreen(1440) · 다수(1200~1440)보다 높습니다.
큰 화면에서 작품 이미지를 크게 보여주는 도메인 특성이며,
`unitlessBreakpoints`로 숫자 사본도 함께 배포합니다.

다크 테마는 `themes/v3Dark.js` 별도 파일입니다.

## 특징적 결정

- **스페이싱 10px 단위 5단계** — 4·8·16 전면 부재, 10px 계열 네 번째
- `0.5`와 `half` 같은 값 두 이름 — 표본 유일 중복
- **타이포 최대 102px** — 표본 최대
- **`bq` HTML 요소 이름 변형** — 표본 유일
- 브레이크포인트 상단 1920px — 표본 최대
- 단위 있는/없는 브레이크포인트 쌍 배포

## 접근성

~~미확인.~~ → **적합성 등급을 선언하지 않습니다 (2026-08-18 해소 — C 확정).**

Storybook `Guides › Accessibility` 문서를 헤드리스 렌더해 읽었습니다
(<https://palette.artsy.net/?path=/story/guides--accessibility>).
WCAG 등급·버전이 **한 번도 등장하지 않고**, 대신 다음 한 문장이 전부입니다.

> 팔레트의 컴포넌트는 일반적으로 접근성 모범 사례를 염두에 두고 만들어졌지만,
> 여전히 일부 문제가 있을 수 있습니다 — 문제를 발견하면 Design System
> Working Group에 버그를, 외부 사용자는 GitHub 이슈를 올려 달라

목표 대신 **실무 지침 두 가지**만 둡니다:

- **클릭 핸들러** — `Button`도 유효한 `href`를 가진 앵커도 아닌 UI에
  `onClick`을 붙일 때는 `Clickable`(`Box` 기반의 벗겨낸 `button` 태그)을
  쓸 것. `<Box onClick={…}>`은 금지 예시로 명시됩니다
- **대체 텍스트** — WebAIM 지침을 그대로 인용합니다. "image of …"·"graphic
  of …" 금지, 주변 텍스트와 중복 금지. Artsy 코드베이스에 **텍스트가 밑에
  붙은 큰 앵커 면적용 이미지의 중복 alt**가 흔하다는 자기 진단이 있고,
  그런 경우 `alt=""`가 허용된다고 적습니다

즉 **선언된 목표는 없고 회귀 방지 장치도 문서에 없습니다**. Storybook에
a11y 애드온(`sb-addons/a11y-3`)이 설치되어 있는 것이 확인되는 정도입니다.

## 참고

- **Figma 킷 (false) 근거:** 공식 킷 없음 — 문서·README 전체에 Figma 언급 0, 2026-08-18 렌더 확인

- 토큰: `npm pack @artsy/palette-tokens@7.3.0` → `dist/themes/v3.js`
- 컴포넌트: `@artsy/palette@46.9.3`, 차트 `palette-charts`
- **남은 확인 사항:** 컬러 팔레트, v3 이전 버전과의 관계, 컴포넌트 목록,
  ~~접근성 목표~~ (2026-08-18 해소 — 선언 부재 확정), ~~Figma 킷~~
  (2026-08-18 해소 — 부재 확정)
- **Figma 킷 부재 확정 (2026-08-18):** Storybook 가이드 4편
  (`guides--getting-started` · `guides--how-palette-works` ·
  `guides--developing-for-palette` · `guides--accessibility`)을 모두
  헤드리스 렌더하고 `github.com/artsy/palette` `README.md`까지 확인했으나
  **Figma·Sketch·디자인 킷 언급이 한 건도 없습니다.** 렌더링해도 이
  시스템은 디자인 툴 킷을 공개하지 않습니다
  (2026-08-18, <https://palette.artsy.net/> 렌더 확인)
