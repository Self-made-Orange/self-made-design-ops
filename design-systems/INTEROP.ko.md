<!-- lang-links -->
> [English](INTEROP.md) · **한국어**
<!-- /lang-links -->

# 상호운용 — DESIGN.md 포맷 생태계

**조사일 2026-08-18.** 이 코퍼스 밖에서 자라고 있는 **에이전트용 디자인시스템
교환 포맷**(`DESIGN.md`)을 조사한 기록입니다. 이 저장소와 경쟁 관계가 아니라
**보완 관계**이며, 소비자 프로젝트가 둘을 함께 쓰는 방법을 정리합니다.

> **수집 경로 주의.** 세 사이트(`designmd.app` · `getdesign.kr` · `designmd.ai`)는
> **이 환경의 이그레스 프록시에서 차단**됩니다(`EGRESS_BLOCKED`). 아래 내용은
> 전부 **npm 배포본**에서 읽은 것입니다 — 사이트 본문에만 있는 주장은 포함하지
> 않았습니다. 사이트와 npm 패키지의 운영 주체 동일 여부는 **미확인**입니다
> (패키지 README가 각각 `designmd.ai`·`getdesign.md`를 가리키는데, 사용자가 준
> 주소는 `.app`·`.kr`이라 도메인이 다릅니다).

## 1. `DESIGN.md` — 포맷 스펙 (Google Labs)

- 소스: `npm pack @google/design.md@0.4.0` → `dist/spec-config.yaml`
  (스펙의 단일 진실 소스라고 파일 주석에 명시), 저장소
  `github.com/google-labs-code/design.md`, **Apache-2.0** 헤더
- 자기 정의: *"코딩 에이전트에게 시각 정체성을 기술하기 위한 포맷 명세"*

### 구조 — 2층

```
--- (YAML frontmatter)   기계 판독 토큰 = 규범값(normative)
---
## 마크다운 본문          사람 판독 근거·적용 방법
```

**토큰이 값을 정하고 산문이 이유를 담는** 이중 구조입니다. 이 저장소의
`systems/*.md`가 frontmatter + 본문으로 된 것과 **같은 발상**이며,
차이는 목적입니다 — 우리는 *관측 기록*, DESIGN.md는 *제작 지시서*입니다.

### 토큰 스키마 (version: alpha)

| 키 | 내용 |
|----|------|
| `colors` | `<이름>: <Color>` — CSS 색 문자열 전부 허용(hex·named·rgb·hsl·**oklch/oklab/lch/lab**·`color-mix()`), 내부적으로 sRGB 변환 후 WCAG 대비 검사 |
| `typography` | `fontFamily · fontSize · fontWeight · lineHeight · letterSpacing · fontFeature · fontVariation` |
| `rounded` · `spacing` | `<단계>: <Dimension>` — 단위는 **px·em·rem 셋뿐** |
| `components` | 컴포넌트별 하위 토큰 8종: `backgroundColor · textColor · typography · rounded · padding · size · height · width` |

- **토큰 참조 문법 `{colors.primary}`** — 중첩 20단계·참조 10단계 상한
- **권장 토큰 이름**: 색 `primary/secondary/tertiary/neutral/surface/on-surface/error`,
  타이포 `headline-display/headline-lg/headline-md/body-lg/body-md/body-sm/label-*`,
  라운드 `none/sm/md/lg/xl/full`
- **변형(hover·active)은 별도 컴포넌트 항목**으로 표현 (`button-primary-hover`)

### 섹션 순서 (있는 것만 이 순서로)

`Overview`(별칭 Brand & Style) → `Colors` → `Typography` →
`Layout`(별칭 Layout & Spacing) → `Elevation & Depth` → `Shapes` →
`Components` → `Do's and Don'ts`

**모르는 섹션은 보존하고 오류로 만들지 않습니다.** 단 **중복 제목은 오류**입니다.

### 린터가 잡는 것 (`npx @google/design.md lint`)

`broken-ref` · `contrast-ratio`(WCAG 자동 계산) · `missing-primary` ·
`missing-sections` · `missing-typography` · `orphaned-tokens` · `section-order` ·
`unknown-key` · `levenshtein`(오타 추정) · `token-summary` · `token-like-ignored`.
JSON 출력에 exit code 1/0. **`diff` 명령이 두 버전의 토큰 변화와 산문 회귀를 보고**합니다.

## 2. 배포·유통 계층 두 갈래

| | `designmd` (CLI·MCP) | `getdesign` (CLI) |
|---|---|---|
| npm | `designmd@0.2.1` · `designmd-mcp@0.2.1` (MIT) | `getdesign@0.6.24` |
| 모델 | **레지스트리** — 검색·조회·다운로드·**업로드**, 태그·trending, API 키 필요 | **템플릿 번들** — 패키지 안에 `templates/*.md` **76개 동봉**, 네트워크 불필요 |
| 자기 규정 | 사용자 업로드 마켓플레이스 | *"공식 디자인시스템이 아니라 **영감(inspiration) 파일**"*이라고 README에 명시 |
| 특징 | *"MCP는 대화마다 토큰을 먹지만 CLI는 실제 실행할 때만 비용"* — **컨텍스트 비용을 판매 논거로 사용** | 릴리스 매니페스트에 **`templateHash`(sha256) + `sourceCommit` + `sourceUpdatedAt`** 기록 |

`getdesign` 템플릿은 브랜드 이름 기반(airbnb·apple·claude·bmw…)이고, 실제 파일은
위 스펙과 같은 frontmatter를 씁니다 — 즉 **스펙은 Google, 유통은 제3자**라는
구도가 이미 성립해 있습니다.

## 3. 이 저장소와의 관계 — 보완재

| | DESIGN.md 생태계 | **이 저장소** |
|---|---|---|
| 단위 | **한 제품의 시각 정체성** 1개 파일 | **116개 시스템의 관측 표본** |
| 값의 성격 | 규범(이대로 만들어라) | 기술(다들 이렇게 했다) + 표본 수 |
| 출처 | 저자 창작 또는 브랜드 해석 | **출처·버전 고정**, 미확인은 미확인 |
| 색 | 팔레트를 확정해 줌 | **권장 팔레트 없음** — 색은 브랜드 결정이라는 입장 |
| 쓰이는 시점 | 제작 지시 | **결정 근거·검수 기준** |

**같이 쓰는 것이 자연스럽습니다** — 이 코퍼스로 *무엇을 참조할지 정하고*
(`agents/system-selection.md`), 그 결론을 제품의 `DESIGN.md`로 굳혀
에이전트에게 넘기는 흐름입니다.

## 4. 실무 지침

- **제품에 `DESIGN.md`가 있으면 검수 시 린터를 먼저 돌리세요** —
  `npx @google/design.md lint DESIGN.md`. 대비비·깨진 참조·고아 토큰은
  기계가 잡습니다. 사람(에이전트)은 그다음 판단에 집중합니다
  (`agents/design-review.md`).
- **초안이 필요하면 이 저장소에서 뽑을 수 있습니다** —
  `node design-systems/to-design-md.mjs > DESIGN.md`가 코퍼스의
  "구현 시 기본값"을 스펙 형식 스캐폴드로 내보냅니다. **색은 비워 둡니다**
  (코퍼스에 권장 팔레트가 없다는 입장 그대로).
  **생성물을 공식 린터로 검증했습니다** (2026-08-18):
  `@google/design.md@0.4.0 lint` → **오류 0 · 경고 0**, info 1건(토큰 요약).
  단 **빈 `colors`는 린터가 잡지 않았습니다** — `missing-primary` 규칙이
  `colors` 키 자체가 비었을 때는 발화하지 않는 것으로 관측됩니다. 즉
  **"린트 통과 = 완성"이 아닙니다.** 색을 채웠는지는 사람이 확인해야 합니다.
- **버전 변화는 `diff`로 관측**할 수 있습니다 — 우리 `check-sources.mjs`가
  외부 시스템의 드리프트를 보는 것과 같은 일을 제품 내부에서 합니다.

## 5. 관측된 스펙의 공백 (2026-08-18 alpha 기준)

**모션 토큰 자리가 없습니다.** 토큰 스키마에 `motion`·`duration`·`easing`이
없고 섹션 목록에도 없습니다 — `getdesign` 템플릿들은 모션을 산문으로만 적습니다.
우리 `to-design-md.mjs`는 스펙의 "모르는 섹션은 보존" 조항을 근거로
`## Motion` 섹션을 덧붙이며, **frontmatter가 아니라 본문에** 둡니다
(스펙 위반을 피하는 배치).

그 밖에 스펙에 자리가 없는 축: 밀도(density)·플랫폼 분기·터치 타겟·z-index·
브레이크포인트. 이 축들이 필요한 제품은 DESIGN.md 하나로 덮이지 않으므로,
**코퍼스 문서를 병용해야 합니다.**

## 참고

- `npm pack @google/design.md@0.4.0` — `dist/spec-config.yaml` · `dist/linter/linter/rules/`
- `npm pack designmd@0.2.1` · `designmd-mcp@0.2.1` — README
- `npm pack getdesign@0.6.24` — README · `templates/`(76) · `releases/0.6.24.json`
- 사이트 3곳은 프록시 차단(`EGRESS_BLOCKED`) — 로컬 세션에서 재확인 가능
