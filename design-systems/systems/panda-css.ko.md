---
name: Panda CSS
org: Chakra 팀 (Segun Adebayo 등)
coverage: minimal
url: https://panda-css.com
repo: https://github.com/chakra-ui/panda
license: MIT
tech: [빌드타임 CSS-in-JS, TypeScript]
figma_kit: false
tokens_format: [JS preset]
a11y_target: 미확인
platform: web
domain: framework
verified: 2026-08-17
source: "npm pack @pandacss/preset-base@1.12.0 + @pandacss/preset-panda@1.12.0 → dist/index.mjs"
---
<!-- lang-links -->
> [English](panda-css.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

Chakra 팀의 빌드타임 스타일 엔진 — 기본 토큰 세트(`preset-panda`)가
**Tailwind 값을 그대로 열거**하되 **반단계(4.5·5.5)와 `2xs`를 추가**합니다.
Tailwind가 "base 하나 + 생성"이라면 Panda는 **같은 값을 토큰으로 열거**합니다 —
GLOSSARY의 "스페이싱 없음 3종" 축에서 생성↔열거 대비의 직접 표본.

## 토큰 (preset-panda)

| 축 | 값 |
|----|-----|
| 스페이싱 | Tailwind 열거와 동일(0.125rem 단위) + **4.5(18px)·5.5(22px) 반단계 추가** |
| 폰트 크기 | xs~9xl에 **`2xs`(8px) 추가** — Tailwind에 없는 바닥 단계 |
| 라운드 | Tailwind와 동일 (2~32px + full 9999px) |
| 이징 | `default (0.4,0,0.2,1)` + in/out/in-out — **M3 Legacy 곡선 그대로** |
| 지속시간 | **50~500ms 7단계** (fastest~slowest) — Tailwind에 없는 축 |
| 브레이크포인트 | Tailwind와 동일 (640~1536) |
| 컨테이너 | **12단계** (320~1440px) |
| 종횡비 | square·landscape·portrait·wide·ultrawide·**golden(1.618)** |

- **Tailwind 값 계보의 3번째 배포 형태**입니다 — Tailwind(생성) →
  shadcn(상속) → **Panda(열거+증보)**. 증보분(반단계·2xs·durations)이
  실무에서 부족했던 지점의 목록이기도 합니다.
- `preset-base`는 값이 아니라 **유틸리티 정의**(75KB)로, 값 층(`preset-panda`)
  과 분리 배포됩니다.

## 코퍼스 안에서의 자리

**Ark UI(동작)와 Panda(스타일)가 같은 팀입니다** — Chakra v3 생태계가
Zag(상태 기계) → Ark(컴포넌트) → Panda(스타일 엔진)로 분해된 형태.
Headless UI/Tailwind 쌍(Tailwind Labs)과 같은 "동작·스타일 분리형 제품
라인"의 두 번째 사례입니다.

## 특징적 결정

- Tailwind 값의 열거형 재배포 + 반단계 증보
- durations 7단계 — Tailwind가 안 주는 모션 축을 채움
- golden(1.618) 종횡비 토큰 — 표본 유일
- 빌드타임 생성이라 런타임 CSS-in-JS 비용 없음

## 접근성

미확인.

## 참고

- **남은 확인 사항:** 시맨틱 토큰 층(`semanticTokens`) 실값, 레시피(recipes)
  기본 제공분, Chakra v3 본체와의 값 공유 여부
