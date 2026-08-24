<!-- lang-links -->
> [English](README.md) · **한국어**
<!-- /lang-links -->

# agents/ — 에이전트 작업 지침 계층

이 저장소를 **에이전트(LLM)가 작업 도구로 쓸 때**의 지침입니다.
사람용 문서가 "읽고 이해하는" 대상이라면, 여기 문서는 **"이 순서로 이렇게
작업하라"**는 실행 절차입니다.

| 문서 | 하는 일 |
|------|---------|
| `system-selection.md` | 제품 좌표(플랫폼·거리·문화권·도메인)에 맞는 참조 시스템을 고릅니다 |
| `design-review.md` | 시안·구현을 코퍼스 근거로 검수하고 리포트를 냅니다 |
| `event-instrumentation.md` | Figma·코드에서 UX 맥락을 읽고 이벤트 시트를 제안합니다 |
| `localization.md` | 코드·Figma에서 문자열과 맥락을 읽고 로컬라이제이션합니다 |
| `case-studies/` | 위 절차를 실제로 돌린 기록 — 절차 개정의 근거입니다 |

## case-studies 색인

**지침을 고치려면 먼저 돌려보고 그 기록을 여기 남깁니다.** 개정 항목에는
`(<날짜> 실전 검증 반영)` 또는 `(<날짜> 자체 검증 반영)`을 표기해
어느 기록에서 나온 개정인지 추적할 수 있게 합니다.

| 기록 | 대상 지침 | 대상 | 성격 |
|------|-----------|------|------|
| `frr-dashboard-review.md` | `design-review.md` | 정착 플래너 대시보드 (외부 제품, `74fab8e`) | **실전 검증** — 제품 맥락 판단까지 검증됨 |
| `system-selection-calendar.md` | `system-selection.md` | 가족 캘린더 (폰+벽, 외부 제품) | **실전 검증 (소비자 측 1호)** — 지침이 이 기록에서 역추출됨 |
| `event-taxonomy-selfcheck.md` | `event-instrumentation.md` | `event-taxonomy/` (코퍼스 자체 자산) | **자체 검증** — 절차·도구 정합성만. 제품 맥락 판단 미검증 |
| `i18n-selfcheck.md` | `localization.md` | `i18n/` (코퍼스 자체 자산) | **자체 검증** — 절차·도구 정합성만. 제품 맥락 판단 미검증 |

**자체 검증과 실전 검증을 구분하세요.** 자체 검증은 코퍼스 자산을 대상으로 하므로
명령이 실제로 실행되는가·요구 산출물에 자리가 있는가·규약과 도구가 일치하는가까지만
검증합니다. **화면 인벤토리, 카테고리 도출, 문자열 추출, 레이아웃 실측 같은
제품 맥락 판단은 여전히 미검증이며**, 각 기록 서두에 그 범위가 표로 적혀 있습니다.

## 다른 프로젝트에서 쓰기 — 소비자 연결

이 저장소의 주 사용법은 **다른 제품 프로젝트 옆에 두고 그 프로젝트의
에이전트가 참고하게 하는 것**입니다. 연결 절차:

### 1. 저장소 배치 — 둘 중 하나

```bash
# 방법 A — sibling clone (단순, 항상 최신)
cd <제품-프로젝트의-부모-디렉터리>
git clone https://github.com/Self-made-Orange/self-made-design-ops.git

# 방법 B — submodule (재현성, 커밋 고정)
cd <제품-프로젝트>
git submodule add https://github.com/Self-made-Orange/self-made-design-ops.git self-made-design-ops
```

- 값의 최신성이 중요하면 **A + 주기적 `git pull`** (freshness CI가 월간으로
  코퍼스를 재검증하므로 pull만 하면 따라옵니다)
- 팀원 간 동일 기준이 중요하면 **B + 커밋 고정**, 갱신은 의도적으로

### 2. 제품 저장소 CLAUDE.md에 포인터 추가 (복붙용)

**이게 핵심입니다** — 이 줄이 없으면 에이전트가 옆의 리포를 스스로 발견하지
못합니다. 제품 저장소의 `CLAUDE.md`에:

```markdown
## 디자인·이벤트·다국어 작업 규칙

참조 시스템 선정, UI 값 결정(스페이싱·크기·색·모션), 디자인 검수,
분석 이벤트 시트 작성, 다국어(i18n) 작업 시에는 반드시
`../self-made-design-ops/agents/README.md`를 먼저 읽고 그 절차를 따를 것.
(submodule이면 `./self-made-design-ops/agents/README.md`)

- 참조 시스템 선정(새 제품·기능 시작 시): `agents/system-selection.md` —
  단일 채택이 아니라 축별 분할, 코드 이식 전 라이선스 게이트.
- 값 결정: `self-made-design-ops/design-systems/patterns/<컴포넌트>.md`의
  "구현 시 기본값" 절부터. 근거 없는 "업계 표준" 인용 금지.
- 검수: `agents/design-review.md`의 3판정(수렴 이탈/허용 분기/내부 비일관).
- 이벤트 시트: `agents/event-instrumentation.md` + `event-taxonomy/` 규약.
  제출 전 `node self-made-design-ops/event-taxonomy/convert.mjs <시트> --lint-only`.
- 다국어: `agents/localization.md` + `i18n/` 규약.
  제출 전 `node self-made-design-ops/i18n/lint.mjs <파일> --against en-US.json`.
- 이 프로젝트에 `DESIGN.md`가 있으면: UI 작업 전에 읽고, 수정 후
  `npx @google/design.md lint DESIGN.md`를 통과시킬 것.
  초안이 없으면 `self-made-design-ops/profiles/measured/`에서 플랫폼에 맞는 것을
  복사하거나 `node self-made-design-ops/design-systems/to-design-md.mjs`로 생성.
  **값을 바꾸면 그 파일의 "근거 등급" 표도 함께 고칠 것** (A 값에는 의도를 적음).
- 산출물(시트·번역·리포트)은 이 제품 저장소에 커밋. self-made-design-ops에는
  절대 커밋하지 말 것.
```

### 3. 컨텍스트 절약 — 전체를 읽지 않습니다

코퍼스는 116개 항목이라 통째로 읽으면 컨텍스트가 낭비됩니다. 진입 순서:

1. 이 파일(`agents/README.md`)의 내비게이션 맵
2. 해당 작업 지침 1개 (`design-review.md` 등)
3. 필요한 patterns 문서의 **"구현 시 기본값" 절만** — 근거가 필요할 때만 본문
4. 특정 시스템의 상세가 필요할 때만 `systems/<이름>.md`
5. 스크립트에서 소비할 때는 `design-systems/data/*.json`

### 4. 피드백 루프 — 이 사용법이 곧 실전 검증입니다

실제 프로젝트에서 돌리다 문제가 나오면 종류에 따라 처리가 다릅니다:

| 발견한 것 | 처리 |
|-----------|------|
| **지침이 안 맞음** (절차 빠짐·순서 오류·산출물 자리 없음) | self-made-design-ops에 **지침 개정 커밋** + `agents/case-studies/`에 기록. 개정 항목에 `(<날짜> 실전 검증 반영)` 표기 — `frr-dashboard-review.md` 선례(결함 12건 → 개정 24곳) |
| **코퍼스 값이 의심됨** (실측과 다름·버전 낡음) | `HARVESTING.md` 절차로 재수집 → 실변경이면 해당 `systems/*.md`에 **정정 블록** 추가 (Mística·Pajamas 선례) |
| **제품 고유 판단** (이 제품에선 다르게 하기로 함) | self-made-design-ops는 건드리지 않고 **제품 저장소에 결정 기록** — 코퍼스는 표본이지 법이 아닙니다 |

**케이스 스터디에는 제품 데이터를 익명화·최소화해서 담습니다** — 절차 검증에
필요한 만큼만. 제품 식별 정보·실 데이터가 통째로 들어오면 반입 금지 원칙 위반입니다.

## 공통 규율 — 모든 지침에 우선합니다

1. **근거 없는 단정 금지.** 이 저장소의 사실 규율(`design-systems/SCHEMA.md`)을
   에이전트 출력에도 적용합니다 — "~로 보입니다", "아마", "일반적으로 ~합니다"
   같은 표현으로 확인 안 된 값을 사실처럼 쓰지 않습니다.
   확인 못 한 것은 **`미확인`**으로 적고, 필요하면 **사용자에게 질문 목록**으로 넘깁니다.
2. **인용 의무.** 코퍼스를 근거로 쓸 때는 파일과 절을 적습니다 —
   `tokens/scales.md`의 "핵심 표", `patterns/button.md`의 높이 분포처럼.
   근거를 못 대는 주장은 리포트에서 뺍니다.
3. **제품 데이터 반입 금지.** 특정 제품의 이벤트 정의·번역 문자열·시안은
   이 저장소에 커밋하지 않습니다. 산출물은 해당 제품 저장소로 보냅니다.
4. **검사 스크립트를 통과시킨 뒤 넘깁니다.** 이벤트 시트는
   `event-taxonomy/convert.mjs --lint-only`, 문자열 파일은
   `i18n/lint.mjs --against en-US.json`. 린터가 있는 산출물을 눈으로만 검사하고
   넘기지 않습니다.

## 코퍼스 내비게이션 — 질문 유형 → 파일

`design-systems/`는 시스템 표본 코퍼스입니다. 에이전트는 전체를 읽지 말고
질문 유형으로 진입하세요.

> **(2026-08-18 자체 검증 반영)** 이전 판은 "104개 시스템 표본"이라고 숫자를
> 박아 뒀는데 코퍼스가 자라 이미 낡았습니다 (`design-systems/data/systems.json`의
> `systems` 배열은 116개). **전체 규모는 `design-systems/index.md`에서,
> 축별 표본 수는 각 `patterns/*.md` 상단에서 읽으세요** —
> `design-review.md`가 같은 이유로 먼저 개정된 항목입니다.

| 알고 싶은 것 | 여는 파일 |
|--------------|-----------|
| 스페이싱 스케일, 어떤 값이 표준인가 | `design-systems/tokens/scales.md` |
| 특정 컴포넌트의 치수·상태·관행 | `design-systems/patterns/{button,form,modal,table,navigation,feedback,motion,typography,color}.md` |
| 특정 시스템 하나의 전모 | `design-systems/systems/<이름>.md` (frontmatter에 org·tier·platform·verified·source) |
| 플랫폼별 차이 (모바일·TV·워치·차량) | `design-systems/platforms.md` |
| 용어가 헷갈릴 때 (Liquid Glass, 알약, rem 전제…) | `design-systems/GLOSSARY.md` |
| 기계 판독 (스크립트에서 소비) | `design-systems/data/systems.json` · `values.json` |
| 이 값을 어떻게 수집했나, 재수집 방법 | `design-systems/HARVESTING.md` |
| 값이 아직 유효한가 | `design-systems/freshness.md` + `check-sources.mjs` |
| 제품의 `DESIGN.md`로 넘기려면 (포맷·린터·내보내기) | `design-systems/INTEROP.md` + `design-systems/to-design-md.mjs` |
| **바로 쓸 제작 지시서**(웹·터치·TV 프로필) | `profiles/README.md` → `profiles/measured/*.DESIGN.md` |

**각 `patterns/` 문서의 끝에는 `구현 시 기본값` 절이 있습니다.**
빠른 결정이 필요하면 그 절만 읽어도 됩니다 — 나머지는 그 결론의 근거입니다.

## 코퍼스를 근거로 쓸 때의 해석 규칙

- **수렴과 분기를 구분합니다.** 표본 다수가 같은 값이면(예: 스페이싱 8·16)
  이탈에 이유가 필요하고, 표본이 갈리면(예: 본문 14 vs 16px — 문화권 차이)
  어느 쪽도 "위반"이 아닙니다. 갈리는 축에서 한쪽을 표준이라 단정하지 않습니다.
- **표본 수를 함께 말합니다.** "7개 시스템이 z-index를 토큰화(산법은 7가지)"와
  "61개 표본 중 57개가 8·16 포함"은 신뢰도가 다릅니다.
- **`미확인`은 데이터입니다.** 코퍼스가 미확인이라고 적은 축을
  에이전트가 임의로 채우지 않습니다.
- **verified 날짜를 봅니다.** frontmatter의 `verified`가 오래됐으면
  `freshness.md` 절차로 재검증하거나, 리포트에 검증 시점을 명시합니다.
