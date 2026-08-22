---
name: Headless UI
org: Tailwind Labs
coverage: minimal
url: https://headlessui.com
repo: https://github.com/tailwindlabs/headlessui
license: MIT
tech: [React, Vue]
figma_kit: false
tokens_format: [없음 — CSS 0]
a11y_target: 미확인 (접근성이 제품 그 자체 — 명시 기준은 미확인)
platform: web
domain: framework
verified: 2026-08-17
source: "npm pack @headlessui/react@2.2.10 → dist/ (CSS 파일 0개 확인)"
---
<!-- lang-links -->
> [English](headless-ui.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Tailwind Labs의 **무스타일 동작 컴포넌트** — 패키지에 **CSS가 0바이트**입니다.
Ark UI(토큰 0·CSS 0, anatomy만)와 함께 **"스타일 층이 없는 시스템"** 2번째
표본이며, 위치가 다릅니다: Ark는 상태 기계+해부도, Headless UI는
**완성된 동작 컴포넌트**(열림/닫힘·키보드·포커스 관리까지 구현)입니다.

## 구조

- 컴포넌트 40여 디렉터리 — button · checkbox · combobox(7분할) · dialog ·
  disclosure · field/fieldset · listbox · menu · popover · radio-group ·
  switch · tabs · transition …
- **스타일 훅은 `data-*` 상태 속성**입니다 — `data-open` · `data-active` ·
  `data-disabled` 등에 소비자가 Tailwind 클래스를 붙이는 전제
  (shadcn/ui 스타일 CSS가 조준하는 상태 어휘와 같은 방식)
- React·Vue 두 구현, 자체 설명대로 "Tailwind CSS와 통합되도록 설계"

## 코퍼스 안에서의 자리

| 계열 | 표본 | 배포물 |
|------|------|--------|
| 동작+스타일 | 다수 (MUI·Mantine…) | 컴포넌트+CSS |
| 동작만 | **Headless UI** · Radix Primitives | 컴포넌트, CSS 0 |
| 해부도만 | Ark UI | 상태 기계+part 이름 |
| 스타일만 | Tailwind · Open Props | 토큰/유틸리티, 동작 0 |

**Tailwind Labs가 "스타일만"(Tailwind)과 "동작만"(Headless UI) 양끝을 다
배포합니다** — 한 조직이 분리 원칙을 제품 라인으로 만든 사례.

## 특징적 결정

- CSS 0바이트 — 시각 결정을 전부 소비자에게 위임
- `data-*` 상태 어휘가 사실상의 공용 API (shadcn 등 생태계가 조준)
- combobox를 7개 부품으로 분할 배포

## 접근성

미확인 — "fully accessible"이 제품 슬로건이나 명시적 WCAG 목표는
패키지에 없습니다.

## 참고

- **남은 확인 사항:** 문서 사이트의 컴포넌트별 키보드 규격,
  v2의 앵커 포지셔닝 API
