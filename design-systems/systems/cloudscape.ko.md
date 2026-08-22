---
name: Cloudscape Design System
org: AWS
coverage: full
url: https://cloudscape.design
repo: https://github.com/cloudscape-design/components
license: Apache-2.0
tech: [React]
figma_kit: true
tokens_format: [SCSS, CSS, JSON]
a11y_target: "명시 없음 확인 (2026-08-18 헤드리스 렌더 재확인 — 접근성 문서에 WCAG 언급 자체가 없고 ARIA·시맨틱 마크업 지침만)"
platform: web
domain: enterprise
verified: 2026-08-18
source: "npm @cloudscape-design/design-tokens@3.0.107 → index.scss · index-visual-refresh.json · npm @cloudscape-design/components@3.0.1348 → table/·side-navigation/ styles.scoped.css + app-layout (표·내비 실측, 2026-08-18)"
---
<!-- lang-links -->
> [English](cloudscape.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

AWS 콘솔을 위한 디자인시스템. 클라우드 관리 콘솔 특유의 고밀도 화면을 전제로 합니다.

## 토큰

### 스페이싱 — scaled / static 이중 스케일

**같은 값의 스케일을 두 벌 제공합니다.**

| 토큰 | 값 |
|------|-----|
| `xxxs` | 2px |
| `xxs` | 4px |
| `xs` | 8px |
| `s` | 12px |
| `m` | 16px |
| `l` | 20px |
| `xl` | 24px |
| `xxl` | 32px |
| `xxxl` | 40px |

`$space-scaled-*` 와 `$space-static-*` 두 계열이 위 값을 동일하게 갖습니다.
차이는 **밀도 모드에서의 거동**입니다 — `scaled`는 compact 모드에서 축소되고,
`static`은 고정됩니다.

### 컴포넌트별 시맨틱 스페이싱

원시 스케일과 별개로 **컴포넌트 전용 토큰을 대량으로 제공**합니다. 여기에는
위 스케일에 없는 값이 등장합니다.

| 토큰 | 값 | 스케일에 있나 |
|------|-----|:---:|
| `space-button-horizontal` | 20px | O |
| `space-button-vertical` | 4px | O |
| `space-field-horizontal` | 12px | O |
| `space-field-vertical` | **5px** | ✗ |
| `space-card-vertical-default` | 16px | O |
| `space-card-vertical-embedded` | **10px** | ✗ |
| `space-card-horizontal-embedded` | 12px | O |
| `space-container-horizontal` | 20px | O |
| `space-tree-view-indentation` | 24px | O |
| `space-alert-vertical` | 8px | O |

**5px·10px은 공개 스케일 어디에도 없는 값입니다.**

### 라운드 — 스케일이 없습니다

일반 라운드 스케일 대신 **컴포넌트별 토큰만** 있습니다.

| 토큰 | 값 |
|------|-----|
| `border-radius-badge` | 4px |
| `border-radius-chat-bubble` | 8px |
| `border-radius-alert` | 12px |
| `border-radius-card-default` | 16px |
| `border-radius-card-embedded` | 8px |
| `border-radius-container` | 16px |
| `border-radius-action-card-default` | 16px |
| `border-radius-action-card-embedded` | 8px |
| `border-radius-button` | **20px** |
| `border-radius-control-default-focus-ring` | 4px |
| `border-radius-calendar-day-focus-ring` | 3px |

출처: `@cloudscape-design/design-tokens@3.0.107` → `index.scss`

### 타이포그래피

~~미확인~~ → **해소 (2026-08-18, `@cloudscape-design/design-tokens@3.0.107`
→ `index.scss` 30개 `$font-*` + 10개 `$line-height-*` + 7개 `$letter-spacing-*`).**

**크기 스케일이 없습니다 — 역할 토큰만 있습니다.** `font-size-100` 같은
번호 스케일이 없고 `body` · `heading` · `display` 역할 이름이 곧 토큰입니다.

| 역할 | 크기 | 행간 | 굵기 | 자간 |
|------|:---:|:---:|:---:|:---:|
| `display-xl` | 64px | 72px | **400** | -0.03em |
| `display-l` | 42px | 48px | 700 | -0.03em |
| `heading-xl` | 24px | 30px | 700 | -0.02em |
| `heading-l` | 20px | 24px | 700 | -0.015em |
| `heading-m` | 18px | 22px | 700 | -0.010em |
| `heading-s` | 16px | 20px | 700 | -0.005em |
| `heading-xs` | **14px** | 18px | 700 | `normal` |
| `body-m` | **14px** | 20px | (`normal` 400) | — |
| `body-s` | 12px | 16px | (`normal` 400) | — |
| `tabs` | 16px | 20px | 700 | — |

- **본문이 14px 2단(14/12)뿐**입니다. 16px 본문이 없습니다.
- **`heading-xs`(14px)가 본문과 같은 크기**이고 굵기로만 구분됩니다.
- **자간이 크기가 커질수록 음수로 깊어집니다** — `normal` → -0.005 →
  -0.010 → -0.015 → -0.02 → -0.03em. 본문에는 자간 토큰이 없습니다.
- **`display-xl`만 굵기 400**입니다 (64px). 나머지 제목은 전부 700입니다.
- 굵기 값은 300 / 400 / 700 **3종**뿐이고(`lighter` 300 · `normal` 400 ·
  `bold`·`heavy` 700), 컴포넌트별 굵기 토큰(`font-weight-button` ·
  `font-weight-tabs` · `font-weight-alert-header` · `font-weight-flashbar-header`)이
  전부 700을 가리킵니다.
- `$font-size-tabs`(16px)처럼 **컴포넌트 전용 크기 토큰**이 스페이싱·라운드와
  같은 방식으로 있습니다.

서체 4종 — `base` · `display` · `heading` **세 개가 값이 동일**
(`'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif`)하고
`monospace`(`Monaco, Menlo, Consolas, 'Courier Prime', Courier,
'Courier New', monospace`)만 다릅니다.

### 컬러

~~미확인~~ → **해소 (2026-08-18).**
전체 헥스 나열은 하지 않습니다 (`../SCHEMA.md`) — 구조만 적습니다.

**원시 램프가 없습니다 — 시맨틱 1계층입니다.** 색 토큰 **407개** 중
번호 램프는 **차트 팔레트뿐**이고, 제품 UI 색에는 명도 단계 개념이 없습니다.
라운드에 일반 스케일이 없는 것과 같은 구조입니다.

| 계열 | 개수 |
|------|:---:|
| `color-charts-*` | **155** |
| `color-text-*` | 94 |
| `color-background-*` | 92 |
| `color-border-*` | 50 |
| `color-dropzone-*` | 6 |
| `color-foreground-*` | 3 |
| `color-drag-*` · `color-board-*` | 각 2 |
| `color-tree-*` · `color-shadow-*` · `color-item-*` | 각 1 |

#### 차트 팔레트 — 단계 번호가 대비 비율

8색(red · orange · yellow · green · teal · blue · purple · pink) × 10단
(300~1200)이고, **`blue`만 `blue-1` · `blue-2` 두 벌**이라 90 + 10 = 100.
여기에 `palette-categorical-1`~`50` 50개 + 상태 7 + 임계 4 + 축·격자·눈금 4 =
합계 155개입니다.

단계 번호 ÷ 100 = 대비 비율입니다 (`color-charts-red-500` = 5:1).
`$description`에 "at a contrast ratio of 5:1"이 그대로 적혀 있습니다.
(교차 정리는 `../patterns/color.md`의 "대비 비율" 절.)

#### 라이트/다크 — 한 토큰에 두 값

`index-visual-refresh.json`이 토큰 **563개**를 `$value: {light, dark}` 형태로
담습니다. 색 407개 중 **65개는 라이트·다크가 같고 342개가 다릅니다.**

```json
"color-text-body-default": { "$value": { "light": "#0f141a", "dark": "#c6c6cd" } }
"color-background-container-content": { "$value": { "light": "#ffffff", "dark": "#161d26" } }
```

같은 파일이 **모드 축을 4종** 담습니다:

| 축 | 토큰 수 | 예 |
|------|:---:|------|
| `light` / `dark` | 409 | 색 전부 |
| `comfortable` / `compact` | **43** | `space-scaled-*` · `size-vertical-input` |
| `default` / `disabled` | **15** | `motion-duration-*` · `motion-easing-*` · `motion-keyframes-*` |
| 단일 값 | 96 | 서체·굵기·`space-static-*` 등 |

**모션의 두 번째 값이 "감소된 모션(disabled)" 상태**입니다 —
`prefers-reduced-motion` 대응을 토큰 값 축으로 넣었습니다.

#### 색 컨텍스트 8종 — 국소 테마

`contexts` 키에 **8개 컨텍스트**가 있고, 각각 563개 토큰을 다시 선언한 뒤
일부만 다른 값을 갖습니다.

| 컨텍스트 | 기본과 다른 토큰 수 |
|----------|:---:|
| `header` | **183** |
| `alert-header` | 182 |
| `top-navigation` | 182 |
| `flashbar-warning` | 52 |
| `flashbar` | 47 |
| `alert` | 28 |
| `compact-table` | **17** (전부 스페이싱·크기) |
| `app-layout-toolbar` | **1** (`color-background-layout-main`) |

**`compact-table`만 색이 아니라 스페이싱을 바꿉니다** — 나머지 7개는
전부 색 컨텍스트입니다. 짙은 배경(헤더·상단 내비) 위에서 버튼·링크·아이콘 색을
통째로 갈아끼우는 구조이며, 다크 모드와는 **별개의 축**입니다
(컨텍스트도 각자 light/dark 두 값을 가집니다).

## 컴포넌트

~~미확인~~ → **컴포넌트 CSS 심화 (2026-08-17,
`@cloudscape-design/components@3.0.1348` — 컴포넌트별 `styles.scoped.css`).**

### 실측

| 컴포넌트 | 값 |
|----------|-----|
| 버튼 | 높이 파생 ≈32px (패딩 4px + 행높이 20 + 보더 2px), 좌우 패딩 20px, **라운드 20px(알약)**, 보더 2px |
| 입력 | **`--size-vertical-input: 32px`** 높이 토큰, 상하 패딩 5px, 라운드 8px |
| 모달 | **최대 폭 5단계: 320 / 600 / 820 / 1024 / 1280px** + 모바일 `100vw−24px` + `--awsui-modal-custom-width` 커스텀 훅 |
| 테이블 | `--space-scaled-*` (밀도 반응 스페이싱)이 셀 패딩에 직접 |

### 구조 — 격리와 훅

- **컴포넌트마다 전체 CSS 리셋을 내장**합니다 — 각 scoped CSS 첫 규칙이
  30여 속성을 초기값으로 되돌립니다. 외부 페이지 스타일에서 컴포넌트를
  격리하는 강수 (콘솔 제품이 온갖 호스트 페이지에 박히는 전제).
- **셀렉터마다 `:not(#\9)` 접미** — `!important` 없이 특이도를 올리는
  해크가 빌드에 시스템화돼 있습니다.
- **`--awsui-style-*` 런타임 오버라이드 층**: 모든 색·보더가
  `var(--awsui-style-…, var(--color-토큰, 폴백))` 2중 체인 —
  SLDS 훅·Spectrum `--mod-*`와 같은 "소비자 오버라이드 전용 변수층"
  계열의 세 번째 표본입니다.
- 클래스가 이중 해시(`awsui_button_vjswe_13k2n_157`) — 버전 간 충돌 방지.

토큰 이름에서 확인되는 컴포넌트: alert, button, card, action-card, container,
field, tabs, tree-view, side-navigation, chat-bubble, badge, calendar, option, token.

### 표 — 표 전용 스페이싱 토큰이 있습니다 (2026-08-18 추가 실측)

`table/styles.scoped.css` · `table/body-cell/` · `table/header-cell/`.

| 토큰 | 값 |
|------|:---:|
| `--space-table-horizontal` | **20px** |
| `--space-table-content-bottom` | **4px** |
| `--space-table-header-tools-bottom` | **0px** |
| `--size-table-selection-horizontal` | **40px** |

> **정정.** 이 문서와 `patterns/table.md`가 "`space-table-*` 같은 표 전용
> 토큰은 없다"고 적어 뒀는데, **디자인 토큰 패키지에 없을 뿐 컴포넌트
> 패키지의 배포 CSS에는 있습니다.** 위 4개가 표 전용 이름을 갖습니다.

- 셀 세로 패딩이 `calc(space-scaled-xs(8px) − 보더 1px + 2px)`이고
  **`margin-block: -2px`로 되돌립니다** — 포커스 링이 셀 경계에서 잘리지 않도록
  2px을 벌었다가 마진으로 회수하는 구조입니다.
- **셀 가로 패딩도 `20px − 1px`로 보더 몫을 뺍니다**
  (`patterns/button.md`의 보더 차감 관행이 표에서도).
- **본문 셀 위 보더가 1px 투명, 아래가 1px 실선**입니다 — 선택 상태에서
  위 보더에 색이 들어가도 행 높이가 변하지 않습니다 (Carbon과 같은 해법).
- **고정 헤더·고정 열 `z-index: 798`**입니다. 확보 표본에서 압도적으로 큰 값이며
  (다음이 Semi 101), 앱 레이아웃 층위 체계 안의 값입니다.
- 고정 열 그림자가 `4px 0 8px 1px rgba(0,7,22,.1)` + **`clip-path: inset(0 -24px 0 0)`** —
  그림자를 한쪽으로만 새어 나가게 자릅니다. RTL에서 방향이 뒤집힙니다.
- 고정 셀의 **패딩 전환이 90ms**(`motion-duration-transition-show-quick`)입니다 —
  스크롤로 고정될 때 패딩이 애니메이션됩니다.
- **트리(확장) 들여쓰기가 단계당 `space-m(16) + space-xs(8)` = 24px**입니다.
- 헤더 그룹 셀만 패딩이 `2px / 8px`로 따로 있습니다.

### 내비게이션 — 펼침 폭이 확인됐습니다

| 항목 | 값 | 출처 |
|------|:---:|------|
| **사이드 내비 펼침 폭** | **280px** | `AppLayout` `navigationWidth` 기본값 |
| **접힘 폭** | **54px** | `AppLayout` `navigationCollapsedWidth` 기본값 |
| 접힘 폭 (토큰) | 52px | `size-side-navigation-collapsed-width` |
| 도구 패널 폭 | 290px | `toolsWidth` 기본값 |
| 루트 목록 좌측 패딩 | `space-panel-nav-left(28) − 8` = **20px** | side-navigation CSS |
| 하위 그룹 들여쓰기 | **+20px** (`space-l`) | 같은 파일 |
| 헤더 서체 | 18px / 행간 22px | `font-panel-header-*` |

> 이 문서와 `patterns/navigation.md`가 "펼침 폭 미확인"으로 두었던 값입니다.
> **접힘 폭이 토큰(52px)과 컴포넌트 기본값(54px)에서 2px 다릅니다** —
> 어느 쪽이 실제 렌더 값인지는 확인하지 못했습니다.

## 특징적 결정

- **밀도 모드에 따라 반응하는 스페이싱을 토큰 레이어에서 분리했습니다.**
  `scaled`와 `static`이 같은 값을 갖지만 compact 모드에서 거동이 다릅니다.
  "이 여백은 밀도에 따라 줄어도 되는가"를 구현이 아니라 토큰 선택으로 답하게 한 설계입니다.
  현재까지 수집한 시스템 중 유일합니다.
- **라운드에 일반 스케일이 없습니다.** 다른 시스템은 원시 스케일을 주고 컴포넌트가 골라 쓰지만,
  Cloudscape는 컴포넌트별 값만 노출합니다. 임의 조합을 막는 대신, 신규 컴포넌트를 만들 때
  참조할 원시 값이 없습니다.
- **버튼 라운드가 20px입니다.** 컨테이너(16px)보다 큽니다. 버튼을 알약 형태에 가깝게 만드는
  선택으로, 사각형에 가까운 Carbon과 정반대입니다.
- **시맨틱 토큰에 스케일 밖 값이 섞여 있습니다.** `space-field-vertical: 5px`,
  `space-card-vertical-embedded: 10px`는 공개 스케일에 없습니다.
  고밀도 콘솔에서 픽셀 단위 조정이 필요했던 흔적으로 보이지만, 스케일의 일관성 주장과는 충돌합니다.
- **포커스링 반경을 별도 토큰으로 둡니다** (3px, 4px). 접근성 요소를 토큰 레벨에서 관리합니다.

- **색에도 원시 스케일이 없습니다** (2026-08-18). 라운드와 같은 방침입니다 —
  번호 램프는 차트 팔레트뿐이고 UI 색 236개는 전부 시맨틱 이름입니다.
  **"원시 스케일 없음"이 라운드 한 축이 아니라 시스템 전반의 방침**임이 확인됐습니다.

- **타이포도 번호 스케일이 없습니다.** `body-m` · `heading-l` 같은 역할 이름만
  있고 크기 토큰 자체가 역할입니다. 라운드·색과 같은 구조입니다.

- **색 컨텍스트 8종을 토큰 레이어에 둡니다.** `header` · `top-navigation` ·
  `alert` · `flashbar` 등에서 최대 183개 토큰이 다른 값을 갖습니다.
  다크 모드와 **직교하는 축**입니다 — 각 컨텍스트가 자기 라이트/다크 값을 따로 가집니다.

- **모션 토큰의 두 번째 값이 "모션 감소" 상태입니다.** `$value: {default, disabled}`
  15개 — 접근성 설정을 테마가 아니라 토큰 값 축으로 표현합니다.

## 접근성

포커스링 반경을 컴포넌트별 토큰으로 분리해 관리합니다.

~~구체적 준수 목표는 미확인.~~ → **부재 재확정 (2026-08-18, 헤드리스 렌더).**
`Foundation / Key principles: Accessibility` 페이지 본문(2022-05-04 게시)을 렌더해도
**WCAG 문자열이 한 번도 나오지 않습니다.** 내용은 전부 실행 지침입니다 —
"semantic markup과 적절한 ARIA 속성을 제공한다", "컴포넌트별 usage 탭의
accessibility guidelines(대체 텍스트·ARIA 영역)을 따르라", "애플리케이션 언어 맥락에
맞는 ARIA 레이블을 정의하라", "역할·랜드마크용 불필요한 마크업을 덧붙이지 말라".
"We **strive to** build Cloudscape components with accessibility in mind"처럼
**노력 표현만 있고 준수 선언이 없습니다.**

하위 문서도 `Focus management principles` · `Building accessible experiences`
2건뿐이며 등급 목표를 담지 않습니다.
→ frontmatter `a11y_target: 명시 없음 확인`을 렌더로 재확인 (C 분류 확정).

출처: https://cloudscape.design/foundation/core-principles/accessibility/ (렌더 확인, 2026-08-18)

## 참고

- 저장소: https://github.com/cloudscape-design/components
- 패키지: `@cloudscape-design/design-tokens`
