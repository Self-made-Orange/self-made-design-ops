---
name: Wear OS Design (M3 Expressive)
org: Google
coverage: partial
url: https://developer.android.com/design/ui/wear
repo: null
license: "문서 CC BY 2.5 · 코드 샘플 Apache 2.0 (developer.android.com/license, 2026-08-18 확인)"
tech: [Compose for Wear OS]
figma_kit: true
tokens_format: [문서]
a11y_target: 미확인
platform: wearable
domain: os
verified: 2026-08-17
source: "developer.android.com/design/ui/wear/guides — {adaptive-design, type-scale-tokens, screen-sizes, apps/layouts} (HTML 실측)"
---
<!-- lang-links -->
> [English](wear-os.md) · **한국어**
<!-- /lang-links -->

## 한 줄 요약

**코퍼스 첫 `wearable` 표본.** 원형 화면 때문에 **여백을 px이 아니라 %로
정의하라고 규범화**하고, **20sp 이상 글자의 사용자 배율을 금지**하며,
곡선을 따라 흐르는 **`Arc` 타이포 카테고리**가 있습니다.

## 화면 — 192~240+dp, 브레이크포인트 225dp

```
소형: 192 ~ 224dp   |   대형: 225 ~ 240+dp   (원형, 지름 기준)
밀집 레이아웃은 192dp + 큰 글꼴 설정으로 검증
```

- **브레이크포인트가 하나(225dp)**입니다 — 웹(5~8단계)·모바일과 달리
  소형/대형 두 구간뿐. 표본 최소 브레이크포인트 수입니다
- 화면 값 자체가 **지름**입니다 — 폭·높이가 아닌 단일 치수. 원형 전제

## 여백 — %가 규범입니다

> "Define outer margins as percentages rather than absolute values,
> so that margins can scale proportionally on round screens and avoid
> clipping any UI elements."

**바깥 여백을 절대값(px/dp)이 아니라 %로 정의하는 것이 공식 규범**입니다 —
원형 화면에서 모서리 클리핑을 피하려면 여백이 지름에 비례해야 하기 때문입니다.
표본 전체에서 **여백 단위로 %를 규범화한 유일 사례**입니다
(px 다수 · rem · 문자 수(SmartHR) · 격자 배수(Braid)에 이은 다섯 번째 단위 유형).

## 타이포 — 21스타일 + `Arc` + 배율 상한

- **M3 Expressive 21스타일**, 기본 서체 **Roboto Flex**(가변)
- **`Arc` 카테고리** — 원형 화면 가장자리 곡선을 따라 흐르는 텍스트
  (시간 표시·곡선 레이블) 전용. **화면 상단 곡선에서 글자 간격이 벌어지는
  것을 보정하는 전용 폰트 축**을 씁니다. 표본 유일 타이포 카테고리
- **사용자 글꼴 배율 규칙이 역할별로 갈립니다:**

| 카테고리 | 배율 허용 |
|----------|:---:|
| Display · Numeral | **금지** |
| Title · Body | 허용 |
| Label | Medium/Small 허용 · **Large 금지** |

- **"20sp 이상 글자는 배율 금지"가 전 카테고리 공통**입니다 — 화면이 작아
  큰 글자를 더 키울 공간이 없기 때문. **TDS(iOS Dynamic Type 310%까지
  재매핑)와 정반대 극단**이며, 접근성 배율 축의 양끝이 확정됐습니다:
  wearable은 상한을 두고, 모바일 웹은 3배까지 따라갑니다
- 스크롤·변화하는 숫자에는 tabular/mono 자간 권고 (Picker 등)

## 특징적 결정

- **첫 `wearable` 표본** — 마지막에서 두 번째 플랫폼 공백 해소
- **여백 % 규범** — 표본 유일 단위 유형 (원형 클리핑 회피)
- **`Arc` 곡선 타이포 카테고리 + 전용 폰트 축** — 표본 유일
- **20sp 이상 배율 금지** — 접근성 배율의 상한 극단 (TDS와 대칭)
- 브레이크포인트 1개(225dp), 화면 치수가 지름
- 배율 허용이 타이포 역할별로 갈림 (Display 금지 / Body 허용)

## 접근성

- 사용자 글꼴 배율을 역할·크기별로 차등 지원 (본문 상세)
- 대비·터치 타겟 수치는 이 페이지들에서 미확인

## 참고

- **Figma 킷 (true) 근거:** Design kits 페이지 존재 — 미조사

- 문서: developer.android.com/design/ui/wear (프록시 통과 확인 — HTML 실측)
- 구세대 가이드(`m2-5/`)가 URL에 그대로 남아 병존합니다 — 마이그레이션
  노출 사례 (Vibes·HSDS 계열의 문서판)
- **남은 확인 사항:** 컴포넌트별 수치(버튼·카드 등 m3 스펙 페이지),
  Figma Design kits 내용, 색 토큰 실값, 터치 타겟 최소값
