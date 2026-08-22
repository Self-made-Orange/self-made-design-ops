#!/usr/bin/env node
/**
 * to-design-md.mjs — 코퍼스의 "구현 시 기본값"을 DESIGN.md 스캐폴드로 내보냅니다.
 *
 * DESIGN.md는 코딩 에이전트에게 시각 정체성을 넘기는 포맷입니다 (스펙: Google Labs
 * @google/design.md, Apache-2.0). 이 저장소와의 관계·스펙 상세는 `INTEROP.md` 참조.
 *
 *   node to-design-md.mjs                          # 웹 데스크톱 기본
 *   node to-design-md.mjs --profile touch          # 터치 환경
 *   node to-design-md.mjs --density compact        # 밀집 관리 화면
 *   node to-design-md.mjs --name "My Product" -o ../DESIGN.md
 *   node to-design-md.mjs --lang ko                # 한국어 산출물
 *
 * 원칙 — 이 스크립트는 **코퍼스에 근거가 있는 값만** 내보냅니다.
 *   · 색은 비웁니다. 코퍼스에 권장 팔레트가 없습니다 (색은 브랜드 결정).
 *   · 각 값 옆에 표본 근거를 주석으로 남깁니다.
 *   · 모션은 스펙에 자리가 없어 frontmatter가 아닌 본문 섹션으로 나갑니다.
 *
 * 산출 문서의 언어는 기본 영어이고 `--lang=ko`로 한국어입니다 (`tools/cli-i18n.mjs`).
 * **frontmatter의 키·값은 언어와 무관합니다** — 스펙이 정한 이름이기 때문입니다.
 * 갈리는 것은 산문(설명·근거 등급 표·주석)뿐입니다.
 *
 * 의존성 없음. Node 18+ / Bun.
 */
import { writeFileSync } from 'node:fs';
import { ARGV, messages } from '../tools/cli-i18n.mjs';

const argv = ARGV;
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const profile = arg('--profile', 'web');       // web | touch
const density = arg('--density', 'comfortable'); // comfortable | compact
const name = arg('--name', 'Untitled');
const out = arg('-o', arg('--out', null));

/* 근거 있는 값만 — 출처는 각 주석에 */
const isTv = profile === 'tv';
const bodyPx = density === 'compact' ? 14 : 16;   // typography.md: 웹 16 다수(10표본) / 밀도형 14(17표본 — 최대 진영)
const buttonH = profile === 'touch' ? 48 : 40;    // button.md: 77표본 최빈 40(웹) · 터치 48(두 OS 접점)
/* tv 프로필: 코퍼스에 타이포·컨트롤 높이 실측이 없습니다 (systems/tvos.md "남은 확인 사항").
   확보된 것은 안전 영역·포커스 간격·폭 열거뿐 — 없는 값은 비우고 검증 절차를 적습니다. */
const CORPUS = 'design-systems (self-made-design-ops)';

const spacing = { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px', '2xl': '32px' }; // scales.md 6단계 권고
const rounded = { none: '0px', sm: '4px', md: '8px', lg: '16px', full: '9999px' };            // scales.md: 0·4·8·16 + 원형 1
const typography = {                                                                          // typography.md 스케일 관행
  'headline-lg':  { fontSize: `${Math.round(bodyPx * 2)}px`,    fontWeight: 700, lineHeight: 1.2 },
  'headline-md':  { fontSize: `${Math.round(bodyPx * 1.5)}px`,  fontWeight: 700, lineHeight: 1.3 },
  'body-lg':      { fontSize: `${bodyPx + 2}px`,                fontWeight: 400, lineHeight: 1.6 },
  'body-md':      { fontSize: `${bodyPx}px`,                    fontWeight: 400, lineHeight: 1.5 },
  'body-sm':      { fontSize: `${bodyPx - 2}px`,                fontWeight: 400, lineHeight: 1.5 },
  'label-md':     { fontSize: `${bodyPx - 2}px`,                fontWeight: 500, lineHeight: 1.4 },
};
const components = isTv
  ? {   /* tv: 코퍼스에 실측이 있는 것만 — 높이·서체는 미확인이라 넣지 않습니다 */
      'focusable':  { padding: '{spacing.xl}', rounded: '{rounded.md}' },
      'card':       { rounded: '{rounded.md}', padding: '{spacing.xl}' },
    }
  : {
      'button-primary': { height: `${buttonH}px`, rounded: '{rounded.md}', padding: '{spacing.lg}' },
      'button-secondary': { height: `${buttonH}px`, rounded: '{rounded.md}', padding: '{spacing.lg}' },
      'input':         { height: `${buttonH}px`, rounded: '{rounded.md}', padding: '{spacing.md}' },
      'modal':         { width: '512px', rounded: '{rounded.lg}', padding: '{spacing.xl}' }, // modal.md: 512 최빈대역 한가운데, 패딩 24 고정
      'card':          { rounded: '{rounded.md}', padding: '{spacing.lg}' },
    };

const yamlValue = (v) => (typeof v === 'number' ? String(v) : `"${v}"`);
const block = (obj, indent = '  ') => Object.entries(obj).map(([k, v]) =>
  typeof v === 'object'
    ? `${indent}${k}:\n` + Object.entries(v).map(([k2, v2]) => `${indent}  ${k2}: ${yamlValue(v2)}`).join('\n')
    : `${indent}${k}: ${yamlValue(v)}`).join('\n');

/** 산출 문서와 CLI 메시지. 기본 영어, `--lang=ko`로 한국어 (`tools/cli-i18n.mjs`). */
const M = messages({
  en: {
    help: `Usage: node to-design-md.mjs [--profile web|touch|tv] [--density comfortable|compact] [--name <name>] [-o <path>] [--lang en|ko]

Evidence: the "implementation defaults" sections of design-systems/patterns/*.md and tokens/scales.md.
Format: DESIGN.md alpha (see INTEROP.md). Colour is left empty on purpose.`,
    badProfile: '--profile takes web · touch · tv',
    badDensity: '--density takes comfortable or compact',
    wrote: (p) => `DESIGN.md scaffold written: ${p}`,
    doc: (c) => `---
version: alpha
name: ${c.name}
description: >-
  A scaffold generated from the "implementation defaults" of the ${c.corpus}
  corpus (profile=${c.profile}, density=${c.density}). The values are a starting
  point drawn from the sample distribution, not a norm.
colors:
  # Left empty — this corpus has no recommended palette.
  # Colour is a brand decision, and the axis on which the sample parts most (patterns/color.md).
  # Check when filling it in: contrast ratios (4.5:1 for text), how dark mode is handled, the on-* pairing rule.
  # primary: "#______"
  # surface: "#______"
  # on-surface: "#______"
spacing:
${c.spacing}
rounded:
${c.rounded}
${c.isTv ? `typography:
  # Left empty — the corpus has no tv typography measurements (systems/tvos.md, "remaining checks").
  # Fill it in after verifying on a real panel at 3m. Do not lift web or mobile values as they are.` : `typography:
${c.typography}`}
components:
${c.components}
---

## Overview

The visual identity of ${c.name}. This file is a scaffold generated from the **${c.corpus}**
corpus, so it is finished only once the brand-specific decisions (colour, typeface, tone)
are filled in.

- Profile: **${c.isTv ? 'wall / TV (a 3m viewing distance)' : c.profile === 'touch' ? 'touch' : 'desktop web'}**${c.isTv ? '' : ` · density: **${c.density}**`}
- The evidence and sample size behind each value are in the "implementation defaults" sections
  of the corpus's \`patterns/*.md\`.

## Colors

**Unsettled.** The corpus provides no recommended palette — colour is the axis on which the
sample parts most, and it is a brand decision. Check when filling it in:

- text contrast of **4.5:1** (WCAG AA). Charts and secondary elements at 3:1 or above
- the \`on-*\` pairing rule (define the foreground colour over each background alongside it)
- pick **one** way of handling dark mode — the sample has six, and mixing them within one
  screen is an internal inconsistency (\`patterns/color.md\`)

## Typography

${c.isTv ? `**Unsettled — the corpus has no tv typography measurements** ("remaining checks" in
\`systems/tvos.md\` and \`android-tv.md\`). The tv specifications captured are the safe area,
the focus spacing and the enumerated widths, and nothing else.

**Do not lift a web or mobile scale into it.** The viewing distance goes from 30cm to 3m, a
factor of ten, and the corpus has no basis for that conversion. How to fill it in:

1. Put candidate sizes on a real panel and check legibility **at 3m**
2. Take the smallest size that passes as the body and build the scale upward
3. Record the settled values **together with the verification conditions** (panel size,
   resolution, distance) — without them it cannot be reproduced` : `Based on a **${c.bodyPx}px** body${c.density === 'compact'
  ? ' — the dense camp (admin screens, enterprise), where 17 of the samples sit.'
  : ' — the Western web convention, where most of the sample sits.'}
**Body size parts by platform** (iOS 17 · automotive a minimum of 24) — do not unify it.

- Keep the token default and the value actually used in components from falling out of step
  (a common accident in the sample)
- Consider raising mobile input fields to 16px (preventing iOS Safari's auto-zoom — seven
  samples handle it in seven different ways)`}

## Layout

${c.isTv ? `**The safe area — overscan insets** (measured on tvOS)

\`\`\`
top / bottom 60pt   left / right 80pt
\`\`\`

Overscan on older panels clips the edges. **It is asymmetric — wider left and right than top
and bottom.**

**A minimum of 60pt between focus targets** (tvOS) — on tv the specification is the *distance
between* targets rather than their *size*, as it is for touch. The purpose is to prevent
D-pad mis-selection.

**Width is decided by "how many fit on screen"** — Android TV enumerates by count, from one
844dp card to five at 124dp, and tvOS enumerates two columns at 860pt and three at 560pt.
The two platforms arrived at the same structure independently.

` : ``}Start with the six spacing steps **4 · 8 · 12 · 16 · 24 · 32.**
In the sample 4, 8 and 16 are effectively required, and the absence of 12 is genuinely
inconvenient.

- Do not make 20 steps from the outset — it costs a judgement at every decision
- If you are reducing, **decide the minimum first**

## Shapes

Radii of **0 · 4 · 8 · 16** plus a circle (\`full\`). Add 12, 20 and 24 when the need arises.
If the brand tone is round, extend to 28 and 32.

## Components

${c.isTv ? `| item | basis |
|---|---|
| focus feedback | **enlarge 1.1×** (the Android TV specification) |
| distance between focus targets | **a minimum of 60pt** (tvOS) |
| control height | **unverified** — the corpus has no tv measurement. Derive it once the typography is settled |

- **Focus is the only state indicator** — there is no hover. A weak focus style loses "where
  am I" on screen
- Consider that the screen is shared — Android TV is the only sample in the corpus to put
  **shared-screen privacy** in writing (\`systems/android-tv.md\`)` : `| component | basis |
|---|---|
| button height | **${c.buttonH}px** ${c.profile === 'touch' ? '(touch — where Material\'s 48dp and Apple\'s 48pt meet)' : '(the mode across 77 samples, though only about 23% — a density choice, not a "standard")'} |
| input height | the same as the button (control height alignment) |
| modal width | **512px** (the middle of the 450–520 modal band across 79 samples) · a fixed 24px padding |

- If you have button size steps, start with **four**, and an even 8px increment is the easiest
  to manage
- ${c.profile === 'touch' ? 'Keep the top touch step at 48 or above' : 'If you plan to support touch, put the top step at 48 or above'}`}

## Motion

> The DESIGN.md alpha spec **has no slot for motion tokens**. Under the spec's "preserve
> sections you do not understand" clause it is kept as a body section (\`INTEROP.md\`, section
> 5).

Start with **three duration steps** (the mode across 83 samples). Grow to five when needed.

\`\`\`
100   a fast exit
150   entry (small elements) · the default transition
250   entry (large areas · modals · panels)
\`\`\`

- **Make the exit shorter than the entry** — a 50ms difference is the convention in the sample
- **Keep a \`0ms\` token** — the accessibility mode needs somewhere to point
- If you break the multiple of 5, leave the reason in the value

## Evidence grades

Per the discipline of \`profiles/README.md\`, this states **where this file's values came
from.**
M = measured in the corpus · D = derived from measurements · A = the author's judgement ·
U = a deliberate blank.

| item | grade | source / what to do |
|------|:---:|------|
| the six spacing steps | **M** | \`tokens/scales.md\` — 4, 8 and 16 are effectively required in the sample |
| the five radius steps | **M** | \`tokens/scales.md\` — 0 · 4 · 8 · 16 plus a circle |
${c.isTv ? `| the 60/80pt safe area | **M** | \`systems/tvos.md\` — overscan insets |
| 60pt focus spacing | **M** | \`systems/tvos.md\` — a specification for target *distance* |
| 1.1× focus enlargement | **M** | \`systems/android-tv.md\` |
| widths enumerated by count | **M** | \`systems/android-tv.md\` 844 → 124dp · \`systems/tvos.md\` two columns at 860pt |
| **all typography** | **U** | **the corpus has no tv measurement** — fill it in after verifying at 3m |
| **control height** | **U** | derive it once the typography is settled |` : `| a ${c.bodyPx}px body | **M** | \`patterns/typography.md\` — ${c.density === 'compact' ? 'the dense camp, 17 samples (the largest)' : 'the web majority camp'} |
| the heading and label scale | **D** | derived from the body (×1.5 and ×2, line heights 1.2–1.6) — not a specific scale from the sample |
| buttons and inputs at ${c.buttonH}px | **M** | \`patterns/button.md\` — ${c.profile === 'touch' ? 'Material 48dp ∩ Apple 48pt' : 'the mode across 77 samples (about 23%)'} |
| a 512px modal with 24px padding | **M** | \`patterns/modal.md\` — the modal band across 79 samples |
| three motion steps | **M** | \`patterns/motion.md\` — the mode across 83 samples |`}
| **all colour** | **U** | **the corpus has no recommended palette** — a slot for the brand to settle |
| the font family | **U** | unspecified — a slot for the product to settle |

**There is no A (author's judgement) in this file.** The moment colour and tone are filled in
an A appears, so add a row to this table then and record **the intent** with it
(\`profiles/README.md\`, rule 1).

## Do's and Don'ts

- ✅ Use these values as **a starting point** and change them to your product's density
- ✅ Record the reason alongside any value you change — it prevents the same argument six
  months later
- ❌ Do not cite the numbers in this file as "the industry standard" —
  the corpus's conclusion is **"there is no universal value"**
- ❌ Do not hand this to an agent with the colours left empty — the generated result comes out
  generic
`,
  },
  ko: {
    help: `사용법: node to-design-md.mjs [--profile web|touch|tv] [--density comfortable|compact] [--name <이름>] [-o <경로>] [--lang en|ko]

근거: design-systems/patterns/*.md 및 tokens/scales.md의 "구현 시 기본값" 절.
포맷: DESIGN.md alpha (INTEROP.md 참조). 색은 의도적으로 비워 둡니다.`,
    badProfile: '--profile은 web · touch · tv',
    badDensity: '--density는 comfortable 또는 compact',
    wrote: (p) => `DESIGN.md 스캐폴드 생성: ${p}`,
    doc: (c) => `---
version: alpha
name: ${c.name}
description: >-
  ${c.corpus} 코퍼스의 "구현 시 기본값"에서 생성한 스캐폴드
  (profile=${c.profile}, density=${c.density}). 값은 표본 분포의 출발점이며 규범이 아닙니다.
colors:
  # 비워 둡니다 — 이 코퍼스에는 권장 팔레트가 없습니다.
  # 색은 브랜드 결정이며, 표본에서 가장 크게 갈리는 축입니다 (patterns/color.md).
  # 채울 때 확인할 것: 대비비(텍스트 4.5:1), 다크 모드 처리 방식, on-* 짝 규칙.
  # primary: "#______"
  # surface: "#______"
  # on-surface: "#______"
spacing:
${c.spacing}
rounded:
${c.rounded}
${c.isTv ? `typography:
  # 비워 둡니다 — 코퍼스에 tv 타이포 실측이 없습니다 (systems/tvos.md "남은 확인 사항").
  # 3m 거리에서 실물 검증 후 채우세요. 웹/모바일 값을 그대로 올리지 마세요.` : `typography:
${c.typography}`}
components:
${c.components}
---

## Overview

${c.name}의 시각 정체성. 이 파일은 **${c.corpus}** 코퍼스에서 생성한 스캐폴드이므로,
브랜드 고유 결정(색·서체·톤)을 채워 넣어야 완성됩니다.

- 프로필: **${c.isTv ? '벽·TV (3m 시야)' : c.profile === 'touch' ? '터치 환경' : '웹 데스크톱'}**${c.isTv ? '' : ` · 밀도: **${c.density}**`}
- 각 값의 근거와 표본 수는 코퍼스의 \`patterns/*.md\` "구현 시 기본값" 절에 있습니다.

## Colors

**미정.** 코퍼스는 권장 팔레트를 제공하지 않습니다 — 색은 표본에서 가장 크게
갈리는 축이며 브랜드 결정 사항입니다. 채울 때 확인할 것:

- 텍스트 대비 **4.5:1**(WCAG AA). 차트·보조 요소는 3:1 이상
- \`on-*\` 짝 규칙(배경색마다 그 위 전경색을 함께 정의)
- 다크 모드 처리 방식을 **하나만** 고르기 — 표본에 6가지 방식이 있고, 한 화면에
  섞이면 내부 비일관입니다 (\`patterns/color.md\`)

## Typography

${c.isTv ? `**미정 — 코퍼스에 tv 타이포 실측이 없습니다** (\`systems/tvos.md\`·\`android-tv.md\`의
"남은 확인 사항"). 확보된 tv 규격은 안전 영역·포커스 간격·폭 열거뿐입니다.

**웹/모바일 스케일을 그대로 올리지 마세요.** 시야 거리가 30cm에서 3m로 10배가 되는
축이며, 코퍼스에 그 환산 근거가 없습니다. 채우는 절차:

1. 실제 패널에 **3m 거리**에서 후보 크기를 띄우고 판독 여부를 확인
2. 합격한 최소 크기를 본문으로 잡고 위로 스케일 구성
3. 확정값과 **검증 조건(패널 크기·해상도·거리)을 함께** 기록 — 조건이 없으면 재현 불가` : `본문 **${c.bodyPx}px** 기준입니다${c.density === 'compact'
  ? ' — 밀도형(관리 화면·엔터프라이즈) 진영으로, 표본 17개가 여기 속합니다.'
  : ' — 서구권 웹 관행이며 표본 다수가 여기 속합니다.'}
**본문 크기는 플랫폼으로 갈립니다** (iOS 17 · 차량 24 최소) — 통일하지 마세요.

- 토큰 기본값과 컴포넌트 실사용값이 어긋나지 않게 하세요 (표본에서 흔한 사고)
- 모바일 입력 필드는 16px로 올리는 것을 검토하세요 (iOS Safari 자동 확대 방지 —
  표본 7개가 각자 다른 방식으로 대응)`}

## Layout

${c.isTv ? `**안전 영역 — 오버스캔 인셋** (tvOS 실측)

\`\`\`
상·하 60pt   좌·우 80pt
\`\`\`

구형 패널의 오버스캔으로 가장자리가 잘립니다. **좌우가 상하보다 넓은 비대칭**입니다.

**포커스 타깃 간 최소 거리 60pt** (tvOS) — tv는 터치 타깃처럼 *크기*가 아니라
**타깃 사이 거리**가 규격입니다. D-pad 오조작 방지 목적입니다.

**폭은 "화면에 몇 장 보일지"로 정합니다** — Android TV는 카드 1장 844dp에서
5장 124dp까지 개수별로 열거하고, tvOS는 2열 860pt·3열 560pt로 열거합니다.
두 플랫폼이 독립적으로 같은 구조를 택했습니다.

` : ``}스페이싱 **4 · 8 · 12 · 16 · 24 · 32** 6단계로 시작합니다.
표본에서 4·8·16은 사실상 필수이고, 12는 없으면 실제로 불편합니다.

- 처음부터 20단계를 만들지 마세요 — 매 결정마다 판단 비용이 듭니다
- 줄일 거면 **최소값을 무엇으로 둘지 먼저** 정하세요

## Shapes

라운드 **0 · 4 · 8 · 16** + 원형(\`full\`). 12·20·24는 필요해지면 추가합니다.
브랜드 톤이 둥근 쪽이면 28·32까지 확장합니다.

## Components

${c.isTv ? `| 항목 | 기준 |
|---|---|
| 포커스 피드백 | **1.1배 확대** (Android TV 규격) |
| 포커스 타깃 간 거리 | **최소 60pt** (tvOS) |
| 컨트롤 높이 | **미확인** — 코퍼스에 tv 실측 없음. 타이포 확정 후 파생시키세요 |

- **포커스가 유일한 상태 표시입니다** — hover가 없습니다. 포커스 스타일이 약하면
  화면에서 "지금 어디"를 잃습니다
- 공용 화면 전제를 검토하세요 — Android TV는 표본에서 유일하게 **공용 화면
  프라이버시**를 명문화합니다 (\`systems/android-tv.md\`)` : `| 컴포넌트 | 기준 |
|---|---|
| 버튼 높이 | **${c.buttonH}px** ${c.profile === 'touch' ? '(터치 — Material 48dp와 Apple 48pt가 만나는 값)' : '(77표본 최빈값, 다만 약 23%에 불과 — "표준"이 아니라 밀도 선택)'} |
| 입력 높이 | 버튼과 동일 (컨트롤 높이 정합) |
| 모달 폭 | **512px** (79표본 최빈 대역 450~520의 한가운데) · 패딩 24px 고정 |

- 버튼 단계를 둘 거면 **4단계**로 시작하고, 8px 등차가 관리가 가장 쉽습니다
- ${c.profile === 'touch' ? '터치 최대 단계를 48 이상으로 유지하세요' : '터치 지원 계획이 있으면 최대 단계를 48 이상으로 두세요'}`}

## Motion

> DESIGN.md alpha 스펙에는 **모션 토큰 자리가 없습니다**. 스펙의 "모르는 섹션은
> 보존한다" 조항에 따라 본문 섹션으로 둡니다 (\`INTEROP.md\` 5절).

지속시간 **3단계로 시작**합니다 (83표본 최빈). 늘릴 때 5단계.

\`\`\`
100   빠른 퇴장
150   진입(작은 요소) · 기본 전환
250   진입(큰 영역 · 모달 · 패널)
\`\`\`

- **퇴장을 진입보다 짧게** — 표본에서 50ms 차이가 관행입니다
- **\`0ms\` 토큰을 두세요** — 접근성 모드가 참조할 자리가 필요합니다
- 5의 배수를 깰 거면 이유를 값에 남기세요

## 근거 등급

\`profiles/README.md\`의 규율에 따라 **이 파일의 값이 어디서 왔는지** 밝힙니다.
M=코퍼스 실측 · D=실측에서 파생 · A=저자 판단 · U=의도적 공백.

| 항목 | 등급 | 출처 / 해야 할 일 |
|------|:---:|------|
| 스페이싱 6단계 | **M** | \`tokens/scales.md\` — 4·8·16은 표본에서 사실상 필수 |
| 라운드 5단계 | **M** | \`tokens/scales.md\` — 0·4·8·16 + 원형 |
${c.isTv ? `| 안전 영역 60/80pt | **M** | \`systems/tvos.md\` — 오버스캔 인셋 |
| 포커스 간격 60pt | **M** | \`systems/tvos.md\` — 타깃 *거리* 규격 |
| 포커스 1.1배 확대 | **M** | \`systems/android-tv.md\` |
| 폭 열거(개수별) | **M** | \`systems/android-tv.md\` 844→124dp · \`systems/tvos.md\` 2열 860pt |
| **타이포 전체** | **U** | **코퍼스에 tv 실측 없음** — 3m 실물 검증 후 채울 것 |
| **컨트롤 높이** | **U** | 타이포 확정 뒤 파생시킬 것 |` : `| 본문 ${c.bodyPx}px | **M** | \`patterns/typography.md\` — ${c.density === 'compact' ? '밀도형 17표본 진영(최대)' : '웹 다수 진영'} |
| 제목·라벨 스케일 | **D** | 본문에서 파생(×1.5·×2, 행간 1.2~1.6) — 표본의 특정 스케일이 아닙니다 |
| 버튼·입력 ${c.buttonH}px | **M** | \`patterns/button.md\` — ${c.profile === 'touch' ? 'Material 48dp ∩ Apple 48pt' : '77표본 최빈(약 23%)'} |
| 모달 512px · 패딩 24 | **M** | \`patterns/modal.md\` — 79표본 최빈 대역 |
| 모션 3단계 | **M** | \`patterns/motion.md\` — 83표본 최빈 |`}
| **색 전체** | **U** | **코퍼스에 권장 팔레트 없음** — 브랜드가 정할 자리 |
| 서체(font family) | **U** | 미지정 — 제품이 정할 자리 |

**A(저자 판단)는 이 파일에 없습니다.** 색·톤을 채우는 순간 A가 생기므로,
그때 이 표에 행을 추가하고 **의도**를 함께 적으세요 (\`profiles/README.md\` 규칙 1).

## Do's and Don'ts

- ✅ 이 값들을 **출발점**으로 쓰고, 제품 밀도에 맞춰 바꾸세요
- ✅ 바꾼 값은 이유와 함께 기록하세요 — 반년 뒤 같은 논쟁을 막습니다
- ❌ 이 파일의 숫자를 "업계 표준"이라고 인용하지 마세요 —
  코퍼스의 결론은 **"보편값은 없다"**입니다
- ❌ 색을 비운 채로 에이전트에게 넘기지 마세요 — 생성 결과가 일반적(generic)이 됩니다
`,
  },
});

if (argv.includes('--help') || argv.includes('-h')) { console.log(M.help); process.exit(0); }
if (!['web', 'touch', 'tv'].includes(profile)) { console.error(M.badProfile); process.exit(1); }
if (!['comfortable', 'compact'].includes(density)) { console.error(M.badDensity); process.exit(1); }

const doc = M.doc({
  name, profile, density, isTv, bodyPx, buttonH, corpus: CORPUS,
  spacing: block(spacing), rounded: block(rounded),
  typography: block(typography), components: block(components),
});

if (out) { writeFileSync(out, doc); console.error(M.wrote(out)); }
else process.stdout.write(doc);
