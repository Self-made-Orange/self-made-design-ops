---
name: Persona
org: Privy (인도네시아)
coverage: partial
url: https://privy-open-source.github.io/design-system/
repo: https://github.com/privy-open-source/design-system
license: MIT
tech: [Vue 3, Nuxt, Tailwind preset]
figma_kit: false
tokens_format: [Tailwind preset JS]
a11y_target: null
platform: web
domain: digital-identity
verified: 2026-08-18
source: "npm @privyid/tailwind-preset@1.2.0 · @privyid/persona@1.2.2-rc.9 → basic.js + src/components"
---
<!-- lang-links -->
> [English](persona.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

인도네시아 Privy(디지털 신원·전자서명)의 Vue 시스템 — **동남아 2번째 표본**
(Gojek Asphalt에 이어). 색 램프에 **`milk`라는 0보다 연한 단계**가 있고,
자간 토큰이 **em이 아니라 px**이며, 라운드 스케일에 **7px·22px** 같은
비관행 값이 끼어 있습니다. 도메인 특화 컴포넌트(서명·카메라·크로퍼)가
이름 공간에 그대로 드러납니다.

## 색 — `milk` 단계

```
blue: milk #F5FAFF · 0 #E5F3FF · 10 #ADD9FF · … · 40 #008AFF(기준) · … · 100 #001526
gray: 0~100을 5 간격으로 21단계
```

- 유채색 램프가 **13단계**(milk + 0~100)이고, **`milk`가 0보다 더 연한
  바닥 단계**입니다 — 램프 확장을 이름으로 해결한 코퍼스 유일 사례
  (다른 시스템은 25, 50 같은 중간 숫자를 삽입 — GLOSSARY 이름-값 역전 참조)
- 회색만 21단계로 유채색(13)보다 촘촘 — 텍스트·경계 미세 조정 수요
- 기준 톤이 40 (Tailwind의 500 관행과 다름)
- green.40 `#34C759` — **Apple 시스템 그린과 동일값**입니다 (iOS 차용 흔적)

## 타이포 — px 자간

```js
letterSpacing: { tighter: '-0.4px', tight: '-0.2px', normal: 0,
                 wide: '0.2px', wider: '0.4px', widest: '0.8px' }
lineHeight:    { tightest: 1.33, tighter: 1.42, tight: 1.45, normal: 1.5 }
```

- **자간이 px 고정값**입니다 — em 상대값(표본 다수)과 달리 글자 크기가
  변해도 자간이 그대로입니다. 버튼이 `tracking-wider`(+0.4px)를 기본 적용.
- 행간이 1.33/1.42/1.45로 **소수 둘째 자리까지 조율** — 서체(DM Sans) 맞춤
- 서체: DM Sans / DM Mono (Google Fonts — 브랜드 전용 서체 없음)

## 라운드 — 비관행 값 삽입

```
0 · 4(tn) · 6(xs) · 7(sm) · 8(기본) · 12(md) · 14(lg) · 16(xl) · 20 · 22 · full
```

**7px과 22px**이 정식 단계입니다 — 4배수·짝수 관행(코퍼스 다수)을 벗어난
값이 스케일에 들어와 있습니다. 기본 8px.

## 컴포넌트 — 도메인이 이름 공간에

**89종** 중 도메인 특화가 뚜렷합니다:

```
signature-draw · signature-text   전자서명 (Privy 본업)
camera · cropper                  신원 촬영·문서 크롭
strengthbar                       비밀번호 강도
contextual-bar · tour · wizard    온보딩·안내
```

버튼은 고정 높이가 아니라 **패딩 구동**(xs 상하 2px ~ lg 16px)이고,
`--p-button-*-padding-*` CSS 변수로 **컴포넌트별 오버라이드 훅**을 뚫어놨습니다.

## 특징적 결정

- **동남아 2번째 표본** — Asphalt(Gojek)와 함께 인도네시아 2개
- `milk` 램프 단계 — 확장을 숫자가 아닌 이름으로
- px 자간 + 소수 행간 — 타이포 미세 조율
- 라운드 7·22px — 비관행 값의 정식 편입
- 다크 모드 `class` 방식, Nuxt 모듈 배포
- Apple 시스템 그린 동일값 차용

## 접근성

~~미확인~~ → **부재 확정 (2026-08-18, 헤드리스 렌더 확인).**

렌더링해도 Persona는 **접근성 문서를 공개하지 않습니다.**
VitePress 사이트의 상단 내비가 Docs · Components · Foundation · Styleguide ·
Assets(Icon · Ilustration) · Ecosystem · Tools(PDF Coordinate Finder ·
PDF Optimizer)인데, **어디에도 접근성 항목이 없습니다.**
Docs 섹션의 사이드바도 Documentation · Instalation · Editor Setup ·
Browser Support **4개뿐**입니다.

렌더 확인 경로 (각 페이지 `WCAG`·`accessib` 문자열 0회):

- https://privy-open-source.github.io/design-system/ — 랜딩(전체 내비)
- https://privy-open-source.github.io/design-system/docs/getting-started.html
  — Docs 사이드바 전개 상태
- https://privy-open-source.github.io/design-system/foundation/colors/
  — Foundation 컬러

**C 분류 확정**입니다. 전자서명·신원확인 도메인인데도 접근성 목표 선언이
문서에 없습니다.

## Figma — 스타일 이름 매핑은 있고, 공개 킷은 없음 (2026-08-18)

`figma_kit: false`의 근거이자 **단서가 갈리는 사례**입니다.

- **공개 킷은 없습니다.** 문서 사이트 어디에도 Figma 킷 링크·다운로드·
  Community 파일 안내가 없습니다. 상단 내비의 Assets는 Icon과 Ilustration
  둘뿐이고, 외부 링크는 GitHub 저장소 하나입니다.
- **그런데 컬러 토큰마다 `figma-style-name` 캡션이 붙습니다.**
  Foundation 컬러 페이지를 렌더하면 각 색 견본에 토큰명과 나란히
  `figma-style-name` 라벨의 캡션이 출력됩니다 — **내부 Figma 스타일과
  코드 토큰의 이름 매핑을 문서에 노출**하고 있다는 뜻입니다.
- 즉 **사내 Figma 라이브러리는 존재하는 정황이 문서에 남아 있으나,
  외부에 배포되는 킷은 확인되지 않습니다.** `figma_kit: false`는
  "공개 킷 미배포" 의미로 기록합니다.

## 참고

- ~~스페이싱 스케일~~ → **Tailwind 기본 상속 확정 (2026-08-18).**
  `basic.js`의 `theme` 톱레벨에 spacing 키가 없고 `extend` 블록도 없으며
  (fontFamily·letterSpacing·lineHeight·fontWeight·colors·borderRadius·opacity
  7개 키만 재정의), `index.js`는 `theme.extend`만 사용 — Tailwind 병합
  규칙상 **spacing은 기본 스케일(0.25rem 단위) 그대로**입니다. 오히려
  `extend.minWidth` 등이 `theme('spacing')`을 참조해 기본 스케일에 기댑니다.
- ⚠ 혼동 주의: npm의 `@persona/design-tokens`(미국 신원확인사 Persona)는
  **별개 시스템**입니다 — 그쪽은 자체 spacing(0~9: 0/4/8/…/56px)을 가집니다.
- 문서 사이트: https://privy-open-source.github.io/design-system/
  (헤드리스 렌더로 확인, 2026-08-18 — 프록시 차단 없음)
- **남은 확인 사항:** 다크 팔레트 실값, ~~Figma 킷~~·~~접근성 목표~~
  (2026-08-18 렌더 — 둘 다 부재 확정, 위 절)
