---
name: NHS design system (nhsuk-frontend)
org: NHS (영국 국민보건서비스)
coverage: partial
url: https://service-manual.nhs.uk/design-system
repo: https://github.com/nhsuk/nhsuk-frontend
license: MIT
tech: [SCSS, Nunjucks]
figma_kit: 미확인
tokens_format: [SCSS]
a11y_target: "WCAG 2.2 AA (명시 — 2026-08-18 확인)"
platform: web
domain: public
verified: 2026-08-18
source: "npm nhsuk-frontend@10.6.0 → src/nhsuk/core/settings/_{spacing,typography,globals}.scss · npm govuk-frontend@6.4.0 (컴포넌트, 2026-08-18)"
---
<!-- lang-links -->
> [English](nhs.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**GOV.UK 코드를 가져왔는데 스페이싱 베이스를 4px로 바꿨습니다** —
소스 주석에 "Original code taken from GDS"가 명시돼 있고, 그러면서
`$nhsuk-spacing-points`는 `4·8·16·24·32…` 4px 배수입니다.
**GOV.UK의 5px가 계승되지 않은 직접 증거**입니다. 의료 도메인 두 번째,
공공 여덟 번째 표본.

## GOV.UK 5px 질문이 닫혔습니다

```scss
// @link https://github.com/alphagov/govuk-frontend
//        Original code taken from GDS (Government Digital Service)
$nhsuk-spacing-points: (0: 0, 1: 4px, 2: 8px, 3: 16px, 4: 24px,
                        5: 32px, 6: 40px, 7: 48px, 8: 56px, 9: 64px);
```

- **같은 코드 계보(GDS 포크)인데 스페이싱 값만 4px 배수로 교체**했습니다.
  `tokens/scales.md`에서 "GOV.UK 5px는 공공 경향이 아니라 단독 선택"으로
  정리한 결론이, **그 코드를 실제로 가져다 쓴 시스템이 값을 바꿨다**는
  형태로 확정됐습니다
- 구조(반응형 스페이싱 맵·순번 키·믹스인)는 그대로 물려받았습니다 —
  **물려받은 것은 메커니즘, 바꾼 것은 값**입니다

### 반응형 스페이싱 — 브레이크포인트별 값

```scss
3: (null: 8px,  tablet: 16px)   // 모바일 8 → 태블릿 16
4: (null: 16px, tablet: 24px)
5: (null: 24px, tablet: 32px)
```

같은 토큰이 뷰포트에 따라 다른 값을 갖습니다 — Spindle(CSS 파일 3벌) ·
Mística(desktop/mobile 쌍)와 같은 판단을 **SCSS 맵**으로 합니다.
GOV.UK와 공유하는 메커니즘입니다.

## 타이포 — 브레이크포인트 + 인쇄 3값

```scss
$nhsuk-typography-scale: (
  64: (모바일 48px / 데스크톱 64px / 인쇄 34pt),
  48: (32px / 48px / 26pt),
  36: (27px / 36px / 20pt),
  26: (22px / 26px / 17pt),
  22: (19px / 22px / 15pt), 19: (…)
)
```

- **인쇄용 크기를 `pt`로 함께 정의합니다** — 표본에서 인쇄 타이포를
  토큰에 둔 것은 NHS(및 GDS 계보)뿐입니다. 의료 문서를 종이로 출력하는
  현실이 토큰에 들어와 있습니다
- 크기 이름이 **데스크톱 px 값**입니다 (`64`가 데스크톱 64px)
- 27px·19px 같은 홀수가 모바일 값에 있습니다

## 컬러 — 함수 기반 + 포커스 노랑

```scss
$nhsuk-focus-colour: nhsuk-colour("yellow");
$nhsuk-reverse-secondary-text-colour: nhsuk-tint($nhsuk-brand-colour, 78%);
```

- 색이 **`nhsuk-colour()` 함수 조회**로 참조됩니다 (팔레트 맵 + 접근자) —
  SmartHR(변환 함수)과 비슷한 자리의 SCSS판
- **포커스가 노랑**입니다 — GOV.UK와 같은 선택이며, 공공 시스템의
  접근성 구조 공유를 다시 확인합니다 (`tokens/scales.md` 공공 표)
- `nhsuk-tint()` 78% 같은 **비관행 비율**을 씁니다

## 컴포넌트 심화 — (2026-08-18)

같은 `nhsuk-frontend@10.6.0`의 `src/nhsuk/components/`(43개 디렉터리)를
실측했습니다. GOV.UK 파생이므로 **원본(`govuk-frontend@6.4.0`, `govuk.md`
컴포넌트 절) 대비 차이 위주**로 기록합니다.

### 버튼 — 물리 은유는 계승, 누름 깊이는 2배

그림자 위로 주저앉는 물리 버튼(`box-shadow 0 Npx 0` + `:active { top: Npx }`),
클릭 타깃을 그림자까지 넓히는 `::before` 확장, 모바일 full-width→태블릿 auto,
`forced-colors` 분기 — **메커니즘은 GDS 그대로**입니다. 바뀐 것은 값입니다:

| | GOV.UK | NHS |
|---|:--:|:--:|
| 라운드 | **0** | **4px** |
| 그림자·누름 깊이 | 2px | **4px** |
| min-height | 없음 (파생) | **44px / 데스크톱 56px** (그림자 4px 포함) |
| 상하 패딩 | 8px 고정 | **10px → 데스크톱 14px** |
| 좌우 패딩 | `spacing(2)` = 10px | **16px** |
| small 변형 | 없음 | **있음** (36px, 패딩 6/12, 데스크톱 서체 16px) |
| 변형 | secondary·warning·inverse | secondary(+solid)·reverse·warning·**login** |

- **누름이 4px로 GDS의 2배**입니다 — `top: 4px` + 그림자 소멸.
  코퍼스 최심 물리 이동입니다 (shadcn 1px·GOV.UK 2px).
- **원본에 없는 것 둘**: 라운드 4px(직각 진영 이탈), 명시적 `min-height` +
  **데스크톱에서 더 커지는 반응형 컨트롤 높이**(40→52px 몸체). GOV.UK는
  높이 무선언·단일 크기입니다. small 변형과 `--login` 변형(NHS 로그인 전용
  색 세트)도 추가분입니다.
- 서체는 19px/행간 19px/bold 공유 — 타이포는 원본, **치수는 4px 배수로 재조립**
  (라운드 4·그림자 4·좌우 패딩 16). 토큰 절의 "물려받은 것은 메커니즘,
  바꾼 것은 값" 결론이 컴포넌트 층에서 반복됩니다.

### 폼 컨트롤 — 같은 40px, 패딩만 4px

- 입력: **높이 40px · 보더 2px · 라운드 0** — GOV.UK와 동일. 유일한 차이가
  **패딩 4px**(`nhsuk-spacing(1)`) vs GOV.UK 5px — **베이스 교체(5→4px)가
  컴포넌트 패딩에 그대로 반영된 자리**입니다.
- 포커스 입력: 검정 2px 보더 + 같은 두께 inset box-shadow(보더 시각 4px) +
  노랑 4px outline — GDS 구조 공유.
- 체크박스·라디오: **시각 40px + 터치 44px(거터 4px), small 24px** — GOV.UK와
  같은 값. 체크 표시는 CSS 보더 드로잉인데 **22×10px·획 4px** —
  GOV.UK(23×12px·획 5px)의 5px 배수 획이 **4px 배수로 재조정**돼 있습니다.
  체크마크 획 두께까지 베이스 교체가 침투한 사례입니다.

### 모달 — 없음 확인

43개 컴포넌트에 modal/dialog가 없습니다 (`grep -ril "modal|<dialog"` 0건).
GOV.UK도 모달을 배포하지 않으므로 **"모달 없는 정부 프런트엔드" 관행까지
계승**된 셈입니다 (경향 확인은 USWDS가 반례 — usa-modal 보유).

### 특징적 결정 (심화분)

- **누름 깊이 4px** — 물리 버튼 은유의 코퍼스 최심값
- **라운드 0→4px 이탈** + 명시적 반응형 min-height(44→56px) — 원본에 없는 층
- **small·login 변형 추가** — 포크가 변형 축도 확장
- **4px 배수 침투**: 입력 패딩 5→4px, 체크마크 획 5→4px
- 모달 없음 (GDS 관행 공유)

## 특징적 결정

- **GDS 코드 포크 + 스페이싱 4px 교체** — 5px 단독 선택의 직접 증거
- **인쇄용 `pt` 크기를 토큰에** — GDS 계보 고유
- 반응형 스페이싱·타이포 맵 (뷰포트별 값)
- 색 함수 조회 + 포커스 노랑(GOV.UK 공유)
- 의료 도메인 2번째(Nord 다음) · 공공 8번째

## 접근성

- 포커스 노랑 등 GDS 접근성 구조 상속
- ~~WCAG 목표 수치는 패키지에서 미확인~~ → **WCAG 2.2 level AA (2026-08-18 해소)**
  출처: `service-manual.nhs.uk/design-system` — "We've updated the design system
  to meet WCAG 2.2 level AA" (v10 업데이트 안내)

## 참고

- 토큰: `npm pack nhsuk-frontend@10.6.0` → `src/nhsuk/core/settings/`
- 컴포넌트 심화: 같은 패키지 `src/nhsuk/components/{button,input,checkboxes}/` ·
  `core/tools/_{buttons,focused}.scss`, 대조용 `govuk-frontend@6.4.0` (2026-08-18)
- React 래퍼 `nhsuk-react-components@6.0.1`, Vue `nhsuk-frontend-vue` 존재
- **남은 확인 사항:** 컬러 팔레트 실값, 접근성 목표 수치,
  ~~컴포넌트 목록~~ (2026-08-18 해소 — 43개 디렉터리, 모달 없음)
