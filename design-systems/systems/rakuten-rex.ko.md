---
name: Rakuten ReX
org: Rakuten (일본)
coverage: partial
url: https://rex.rakuten.design (403 — 사내화)
repo: null (github.com/rakuten-rex org는 존속하나 공개 리포 0개 — 아래 "소스 상태")
license: MIT (npm 패키지 LICENSE 기준)
tech: [React, Sass, CSS 빌드 산출물]
figma_kit: 미확인
tokens_format: [토큰 패키지 없음 — 컴포넌트별 *.static.css에서 실측]
a11y_target: 미확인
platform: web
domain: commerce
verified: 2026-08-18
source: "npm @rakuten-rex/typography@1.0.5 · @rakuten-rex/button@1.5.1 · @rakuten-rex/grid@1.6.0 · @rakuten-rex/core@3.0.1 → package/*/​*.static.css"
---
<!-- lang-links -->
> [English](rakuten-rex.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

라쿠텐(일본 커머스)의 React 컴포넌트 시스템 — **npm 2019~2021 배포 후 중단,
문서·저장소가 모두 소멸해 npm tarball이 유일한 생존 소스**인 표본입니다.
타이포에 **`:lang(en)`/`:lang(ja)` 행간 분기**가 CSS에 박혀 있고(LINE 언어축과
교차), 출하된 CSS에 **`undefined` 리터럴이 그대로 남은 빌드 버그**가 있습니다.

## 소스 상태 — npm만 남은 시스템 (2026-08-18 실측)

| 채널 | 상태 |
|------|------|
| 문서 rex.rakuten.design | **403** (사내화 추정 — Wayback에도 2024년 301 → 2025~26년 403 기록) |
| Wayback 200 스냅샷 | **0건** (CDX `statuscode:200` 필터 결과 0행 — 공개 시절 스냅샷 자체가 없음) |
| GitHub org rakuten-rex | org는 200이나 **public_repos: 0** — typography·button·core·grid 리포 전부 404 (package.json의 repository URL이 전부 죽은 링크) |
| npm `@rakuten-rex/*` | **36개 패키지 확인** (검색 35 + 직접 probe로 `core` 1) · 배포 창 2019-07 ~ 2021-02 (`icons@1.3.0` 2021-02-18이 마지막) |

- **토큰 패키지가 없습니다** — `color`·`colors`·`palette`·`spacing`·`tokens`·
  `design-tokens`·`theme`·`foundation`·`elevation`·`shadow` 전부 probe 404.
  `core@3.0.1`은 토큰이 아니라 **normalize.css를 Sass mixin으로 나눈 것**입니다.
- 값은 컴포넌트 패키지의 `*.static.css`(5종 빌드 산출물 중 하나)에서 실측했습니다.
  HARVESTING.md "npm 배포 패키지" 경로의 극단 사례 — **다른 경로가 아예 없는** 경우.

## 타이포 — 16 스타일, :lang() 행간 분기

`@rakuten-rex/typography@1.0.5` (2020-09-11). 기본색 `#333`, 시스템 폰트 스택
(-apple-system … Segoe UI Emoji). 굵기는 클래스로 100/300/400/500/700.

| 스타일 | 데스크톱 | 모바일 (≤25.875em = 414px) |
|--------|----------|------------|
| Display1 | 2.875rem(46px) / 1.391 | 2.25rem + **:lang(en) 1.444 · :lang(ja) 1.333** |
| Display2 | 2.5rem(40) / 1.4 | 2rem / 1.375 |
| Display3 | 2.25rem(36) / 1.5 + **:lang 분기(en 1.444/ja 1.333)** | 1.75rem / 1.429 |
| Display4 | 2rem(32) / 1.375 | 1.5rem / 1.333 |
| Display5 | 1.75rem(28) / 1.429 | (분기 없음) |
| H1~H6 | 24/20/16/14/12/12px | 20/16/14/12/10/10px |
| LeadBody · Body1 · Body2 | 20 / 16 / 14px (lh 1.4/1.5/1.429) | (고정) |
| Caption · Overline | 12 / 10px (lh 1.333/1.6) | (고정) |

- **언어(:lang)별 행간 분기가 CSS 셀렉터로 존재** — ja가 en보다 낮은 행간
  (1.333 vs 1.444). LINE(LDSG)이 토큰 이름에 언어축을 둔 것과 달리 ReX는
  **셀렉터 층에서** 분기합니다. `patterns/typography.md`의 "언어별 행간·자간
  조정 규칙은 못 찾았습니다"(623행)에 대한 반례 표본 · `line.md`·`i18n/` 교차.
- 반응형 다운시프트 경계가 **414px**(25.875em) 단 하나 — 구간 2단 타이포.

## 버튼 — 블루 3단, pill 2.5rem

`@rakuten-rex/button@1.5.1` (2020-11-16). 변형 7종(Button·ButtonUi·Outline·
Link + Pill 3종).

```
기본   #134ff3 · hover #3a6dfa · active #053ace  (블루 3단)
형태   radius 0.25rem · Pill 2.5rem · border 1px · padding 0.5rem 1rem
텍스트 1rem / 1.5 (시스템 폰트)
Outline: 흰 배경 + 파랑 텍스트 → hover 시 채움 / Link: hover bg #ebebeb
```

- **`undefined` 리터럴 출하 버그**: `.rex-button.hover{background-color: undefined}`
  — 상태 미러 클래스(`.hover`/`.active`/`.focus`)에 JS 미정의 값이 CSS로
  직렬화된 채 전 변형에 배포돼 있습니다. 빌드 파이프라인 검증 부재의 물증.
- :focus가 :hover와 동일값 — 포커스 전용 표시 없음 (outline: none과 겹쳐
  접근성 감점 요인).

## 그리드 — 12컬럼, 거터 24px, 브레이크포인트 6단

`@rakuten-rex/grid@1.6.0` (2020-07-01). Bootstrap식 12컬럼 flexbox.

```
브레이크포인트  375 · 414 · 768 · 1024 · 1280 · 1440px (xxl)
컨테이너 최대폭 290 · 345 · 384 · 696 · 936 · 1224px
거터           24px (row -12 / col +12)
```

**414px이 타이포와 그리드에서 공히 1급 경계** — iPhone Plus/Max 계열 폭을
그대로 브레이크포인트로 쓴 모바일 퍼스트 커머스 표본.

## 특징적 결정

- **npm tarball이 유일 생존 소스** — 문서 403 · Wayback 0건 · 리포 소멸.
  "배포 중단 시스템의 사후 실측"이 가능함을 보여주는 표본
- :lang(en)/:lang(ja) 행간 분기를 셀렉터 층에서 — 언어축의 세 번째 위치
  (LINE=토큰 이름 · shadcn/ui=폰트 슬롯 · ReX=CSS 셀렉터)
- 패키지를 컴포넌트 단위로 쪼개고 각각 5종 산출물(development/production/
  static × css/js) 동봉 — static.css가 실측 창구
- 414px 단일 모바일 경계 + 1440 xxl — 커머스 트래픽 기기 분포의 흔적
- `undefined` 출하 버그 — 상태 토큰의 JS→CSS 직렬화 실패가 그대로 배포됨

## 접근성

미확인 (`:focus`가 hover와 동일 + `outline: none` — 명시 규정 없이는 AA 의문).

## 참고

- npm: https://www.npmjs.com/org/rakuten-rex (36개 패키지, 2019-07~2021-02)
- 검증 명령: `registry.npmjs.org/-/v1/search?text=%40rakuten-rex` +
  개별 probe (`@rakuten-rex/<이름>` 404 확인)
- **남은 확인 사항:** 컬러 팔레트 전체(토큰 패키지 부재 — text-field·checkbox
  등 나머지 30여 패키지의 static.css를 훑으면 사용색 목록은 복원 가능),
  `icons@1.3.0`(마지막 배포) 내용물, ReX 이후 라쿠텐 사내 시스템의 행방,
  Figma 킷
