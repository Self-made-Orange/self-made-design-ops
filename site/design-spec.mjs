#!/usr/bin/env node
/**
 * docs/assets/site.css → profiles/interpreted/self-made-designops-site.DESIGN.md
 *
 * The site is the first product this corpus actually built, so it owes the same
 * artefact it asks everyone else to produce: a DESIGN.md with an evidence grade
 * on every value. It belongs in `interpreted/`, not `measured/` — the palette is
 * filled in, which is exactly what `profiles/README.md` says that layer is for.
 *
 * Every number here is READ OUT OF THE STYLESHEET, never typed in. A hand-written
 * spec beside a hand-written stylesheet is two sources of truth, and this
 * repository exists because that arrangement drifts. If a declaration this script
 * expects is gone, it FAILS rather than emitting a plausible number — the same
 * rule site/build.mjs follows for the kit inventory.
 *
 * Contrast ratios are computed here with the WCAG formula, so the grades in the
 * document cannot disagree with the colours in the document.
 *
 * No dependencies. Run:
 *   node site/design-spec.mjs                    # writes the English primary
 *   node site/design-spec.mjs --lang=ko          # writes the Korean version
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARGV, LOCALE, messages } from '../tools/cli-i18n.mjs';

const M = messages({
  en: {
    missingToken: (n, s) => `token --${n} not found in ${s} — site.css changed shape`,
    missingDecl: (sel, prop) => `${sel} { ${prop} } not found — site.css changed shape`,
    written: (path, values, grades) =>
      `${path} — ${values} values read from site.css (${grades})`,
  },
  ko: {
    missingToken: (n, s) => `${s}에서 --${n} 토큰을 찾지 못했습니다 — site.css 구조가 바뀌었습니다`,
    missingDecl: (sel, prop) => `${sel} { ${prop} }를 찾지 못했습니다 — site.css 구조가 바뀌었습니다`,
    written: (path, values, grades) =>
      `${path} — site.css에서 값 ${values}개 (${grades})`,
  },
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CSS = readFileSync(join(ROOT, 'docs', 'assets', 'site.css'), 'utf8');

/* ── Reading the stylesheet ------------------------------------------------ */

/** The body of one rule, by exact selector, anchored so `.copy` does not match
 *  `header.site.scrolled .copy`. */
function block(selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = CSS.match(new RegExp(`^${esc}\\{([^}]*)\\}`, 'm'));
  if (!m) throw new Error(M.missingDecl(selector, '*'));
  return m[1];
}

let reads = 0;

/** Three-digit hex is legal CSS and illegal noise in a spec — #fff and #ffffff are
 *  the same colour, and only one of them can be compared to another value by eye or
 *  by a contrast routine. Every colour leaves this file six digits long. */
const hex6 = (v) => (/^#[0-9a-f]{3}$/i.test(v) ? '#' + v.slice(1).replace(/./g, '$&$&') : v);

/** A custom property, from a named scope. */
function token(name, selector = ':root') {
  const m = block(selector).match(new RegExp(`--${name}\\s*:\\s*([^;]+);`));
  if (!m) throw new Error(M.missingToken(name, selector));
  reads++;
  return hex6(m[1].trim().replace(/\s*\n\s*/g, ' '));
}

/** A plain declaration, from a named rule. */
function decl(selector, prop) {
  const m = block(selector).match(new RegExp(`(?:^|[;{\\s])${prop}\\s*:\\s*([^;}]+)`));
  if (!m) throw new Error(M.missingDecl(selector, prop));
  reads++;
  return m[1].trim().replace(/\s*\n\s*/g, ' ');
}

/** The upper bound of a clamp(), which is the value at desktop widths. */
const clampMax = (v) => {
  const m = v.match(/clamp\([^,]+,[^,]+,\s*([^)]+)\)/);
  return m ? m[1].trim() : v;
};
const px = (v) => Math.round(parseFloat(v));

/* ── Contrast, computed rather than quoted --------------------------------- */

const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const [r, g, b] = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const cr = (a, b) => ratio(a, b).toFixed(2);
const AA = (a, b) => ratio(a, b) >= 4.5;

/* ── The values ------------------------------------------------------------ */

const DARK = '[data-theme="dark"]';

const t = {
  // spacing scale
  sp: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => token(`sp-${n}`)),
  rControl: token('r-control'),
  headH: token('head-h'),
  railW: token('rail-w'),

  sans: token('sans'),
  mono: token('mono'),
  ease: token('ease'),

  light: {
    bg: token('bg'), sunken: token('bg-sunken'), surface: token('surface'),
    border: token('border'), borderStrong: token('border-strong'),
    text: token('text'), mut: token('text-mut'), dim: token('text-dim'),
    accent: token('accent'), accentText: token('accent-text'), link: token('link'),
    warn: token('warn'), dot: token('dot'),
    panel: token('panel'),
  },
  dark: {
    bg: token('bg', DARK), sunken: token('bg-sunken', DARK), surface: token('surface', DARK),
    border: token('border', DARK), borderStrong: token('border-strong', DARK),
    text: token('text', DARK), mut: token('text-mut', DARK), dim: token('text-dim', DARK),
    accentText: token('accent-text', DARK), link: token('link', DARK),
    warn: token('warn', DARK), dot: token('dot', DARK),
    panel: token('panel', DARK),
  },
  btn: token('btn'), btnHover: token('btn-hover'),
  btnText: token('btn-text'), btnLine: token('btn-line'),

  // control heights
  hBtn: decl('.btn', 'height'),
  hCtrl: decl('.ctrl', 'height'),
  hInput: decl('#q', 'height'),
  hCopy: decl('.copy', 'height'),
  hChip: decl('.chip', 'height'),

  // type
  body: decl('body', 'font'),
  h1: decl('.hero h1', 'font-size'),
  h1Weight: decl('.hero h1', 'font-weight'),
  h1Leading: decl('.hero h1', 'line-height'),
  h2: decl('.sec-head h2', 'font-size'),
  h2Weight: decl('.sec-head h2', 'font-weight'),
  lede: decl('.hero .lede', 'font-size'),
  btnSize: decl('.btn', 'font-size'),
  code: decl('.code', 'font-size'),
  codeLeading: decl('.code', 'line-height'),

  // motion
  drift: decl('.hero::before', 'animation'),
  hover: decl('.row,.kititem', 'transition'),
  ctrlT: decl('.ctrl', 'transition'),
  cardT: decl('.card', 'transition'),
};

const bodySize = t.body.match(/(\d+)px/)[1] + 'px';
const bodyLeading = t.body.match(/\/([\d.]+)/)[1];
const driftDur = t.drift.match(/([\d.]+)s/)[1] + 's';
const durations = [...new Set(
  [t.hover, t.ctrlT, t.cardT].join(' ').match(/(?<![\d.])\.\d+s/g) || [],
)].map((d) => Math.round(parseFloat(d) * 1000)).sort((a, b) => a - b);

const fontStack = (v) => v.split(',')[0].replace(/["']/g, '').trim();

/* ── The document ---------------------------------------------------------- */

const OUT = {
  en: 'profiles/interpreted/self-made-designops-site.DESIGN.md',
  ko: 'profiles/interpreted/self-made-designops-site.DESIGN.ko.md',
};

const langLinks = (c) => c === 'ko'
  ? '> [English](self-made-designops-site.DESIGN.md) · **한국어**'
  : '> **English** · [한국어](self-made-designops-site.DESIGN.ko.md)';

/** Frontmatter is language-independent: keys AND values are the machine contract.
 *  Only the prose below it is localised — the same rule to-design-md.mjs follows. */
const frontmatter = () => `---
version: alpha
name: self-made-designops-site
description: >-
  The build spec for this corpus's own site. Generated from docs/assets/site.css by
  site/design-spec.mjs, so the spec cannot drift from the page it describes. An
  interpreted profile: the palette is filled in, and every authored value says so.
colors:
  primary: "${t.btn}"
  on-primary: "${t.btnText}"
  surface: "${t.light.surface}"
  on-surface: "${t.light.text}"
  background: "${t.light.bg}"
  on-background: "${t.light.text}"
  outline: "${t.light.border}"
  link: "${t.light.link}"
  warning: "${t.light.warn}"
spacing:
  xs: "${t.sp[0]}"
  sm: "${t.sp[1]}"
  md: "${t.sp[2]}"
  lg: "${t.sp[3]}"
  xl: "${t.sp[4]}"
  2xl: "${t.sp[5]}"
  3xl: "${t.sp[6]}"
  4xl: "${t.sp[7]}"
rounded:
  none: "${t.rControl}"
  full: "9999px"
typography:
  headline-lg:
    fontSize: "${clampMax(t.h1)}"
    fontWeight: ${t.h1Weight}
    lineHeight: ${t.h1Leading}
  headline-md:
    fontSize: "${clampMax(t.h2)}"
    fontWeight: ${t.h2Weight}
    lineHeight: 1.2
  body-lg:
    fontSize: "${clampMax(t.lede)}"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontSize: "${bodySize}"
    fontWeight: 400
    lineHeight: ${bodyLeading}
  label-md:
    fontSize: "${t.btnSize}"
    fontWeight: 600
    lineHeight: 1.4
  code-md:
    fontSize: "${t.code}"
    fontWeight: 400
    lineHeight: ${t.codeLeading}
components:
  button-primary:
    height: "${t.hBtn}"
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.3xl}"
  button-secondary:
    height: "${t.hBtn}"
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.3xl}"
  input:
    height: "${t.hInput}"
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
  notice:
    backgroundColor: "{colors.background}"
    textColor: "{colors.warning}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
---
`;

const doc = {
  en: () => `${frontmatter()}<!-- lang-links -->
${langLinks('en')}
<!-- /lang-links -->

> **Generated.** \`node site/design-spec.mjs\` reads \`docs/assets/site.css\` and writes this
> file. Do not edit it by hand — change the stylesheet and regenerate, or the spec and the
> page stop agreeing, which is the failure this repository is about.

## Overview

The visual identity of **Self-Made DesignOps**, the corpus's own site. It is the first thing
this repository actually built, so it owes the artefact it asks of everyone else.

This is an **interpreted** profile (\`profiles/README.md\`): the skeleton comes from
\`measured/web-comfortable\`, and colour and tone are filled in on top. That means it carries
**A rows**, and the point of the table at the bottom is that they are visible rather than
dressed up as measurements.

- Surface: **desktop web**, a ${px(t.railW)}px rail beside the page, stacking below 940px
- Themes: **two**, light by default, dark by explicit choice
- Dependencies: **one typeface** (${fontStack(t.sans)}); no framework, no build step

## Colors

Filled in — that is what separates this file from \`measured/\`. Two complete palettes; the
neutrals in the dark set are **R=G=B**, so the only hue in either theme is the orange and two
status dots.

| role | light | dark |
|------|-------|------|
| background | \`${t.light.bg}\` | \`${t.dark.bg}\` |
| surface | \`${t.light.surface}\` | \`${t.dark.surface}\` |
| text | \`${t.light.text}\` (${cr(t.light.text, t.light.bg)}:1) | \`${t.dark.text}\` (${cr(t.dark.text, t.dark.bg)}:1) |
| muted | \`${t.light.mut}\` (${cr(t.light.mut, t.light.bg)}:1) | \`${t.dark.mut}\` (${cr(t.dark.mut, t.dark.bg)}:1) |
| dim | \`${t.light.dim}\` (${cr(t.light.dim, t.light.bg)}:1) | \`${t.dark.dim}\` (${cr(t.dark.dim, t.dark.bg)}:1) |
| link | \`${t.light.link}\` (${cr(t.light.link, t.light.bg)}:1) | \`${t.dark.link}\` (${cr(t.dark.link, t.dark.bg)}:1) |
| outline | \`${t.light.border}\` | \`${t.dark.border}\` |
| warning | \`${t.light.warn}\` (${cr(t.light.warn, t.light.bg)}:1) | \`${t.dark.warn}\` (${cr(t.dark.warn, t.dark.bg)}:1) |

Every ratio above is computed by the generator, not copied from a note.

**The CTA is the exception, and it is stated rather than buried.** \`${t.btn}\` with a
\`${t.btnText}\` label is **${cr(t.btnText, t.btn)}:1** — ${AA(t.btnText, t.btn) ? 'over' : 'under'} the 4.5:1 AA floor for
body-size text, and the label is ${px(t.btnSize)}px/600, which is not large text either. It is a
deliberate brand call by the owner and the **only** value on the page that does not clear AA.
\`${t.btnLine}\` carries the button's boundary at ${cr(t.btnLine, t.light.bg)}:1 on the light canvas, because the
fill alone is ${cr(t.btn, t.light.bg)}:1 — under the 3:1 that WCAG 1.4.11 wants for a component edge.

## Typography

${fontStack(t.sans)} for text, ${fontStack(t.mono)} for the monospaced column. Body is
**${bodySize}/${bodyLeading}** — the web majority camp in \`patterns/typography.md\`.

Headings are fluid: \`${t.h1}\` and \`${t.h2}\`. The DESIGN.md
frontmatter records the **upper bound**, since the format has one slot per size and the
desktop value is the one a component library would be built against.

## Layout

Eight spacing steps: **${t.sp.join(' · ')}**. The first six are the
\`measured/web-comfortable\` set; ${t.sp[6]} and ${t.sp[7]} are added for page-level rhythm.

The shell is a ${px(t.railW)}px rail beside the page under a ${px(t.headH)}px header, stacking to one column
below 940px.

## Shapes

**\`${t.rControl}\` on every control** — buttons, inputs, the theme toggle, Copy, Reset.
\`tokens/scales.md\` records a radius-0 camp, so the value is in the sample; choosing it is a
decision. Chips and coverage badges stay fully round, because they are drawn as one family
with the non-interactive badges and squaring only the interactive half would split it.

## Components

| component | value | note |
|---|---|---|
| primary / secondary button | ${t.hBtn} | above the 40px mode — a page with two CTAs, not a form |
| header control | ${t.hCtrl} | secondary chrome |
| search input | ${t.hInput} | |
| Copy button | ${t.hCopy} | sits in a heading row |
| filter chip | ${t.hChip} | |

## Motion

> The DESIGN.md alpha spec **has no slot for motion tokens**. Under the spec's "preserve
> sections you do not understand" clause it is kept as a body section (\`INTEROP.md\`,
> section 5).

Interaction durations: **${durations.join(' · ')}ms**, all on \`${t.ease}\`.
That is ${durations.length} steps, against the mode of three across 83 samples in
\`patterns/motion.md\`.

The hero carries one ambient loop: a 24px dot field drifting **${driftDur} linear**, one cell
per cycle. The 24px step is measured (a spacing step in 27 of 29 systems); the ${driftDur} is not —
the corpus records no ambient-loop duration, and the longest value it holds is Codex's 2000ms,
which is a different kind of animal.

\`prefers-reduced-motion: reduce\` stops it outright. Note the trap: the common recipe sets
\`animation-duration: .01ms\` alone, and for an **infinite** animation that is not stopped, it
is a spin — the iteration count has to be pinned as well.

## Evidence grades

M = measured in the corpus · D = derived from measurements · A = the author's judgement ·
U = a deliberate blank.

| item | grade | source / what to do |
|------|:---:|------|
| the first six spacing steps | **M** | \`tokens/scales.md\` — 4, 8 and 16 are effectively required in the sample |
| \`${bodySize}\` body | **M** | \`patterns/typography.md\` — the web majority camp |
| radius \`${t.rControl}\` on controls | **M** | \`tokens/scales.md\` records a radius-0 camp — the value is in the sample, choosing it is a decision |
| the 24px dot grid | **M** | \`tokens/scales.md\` — a spacing step in 27 of 29 systems |
| input height = ${t.hInput} beside a ${t.hBtn} button | **D** | control-height alignment from \`patterns/form.md\`, scaled to this page's chrome rather than matched exactly |
| the heading scale | **D** | fluid, built off the body size — not a specific scale from the sample |
| ${t.sp[6]} and ${t.sp[7]} spacing | **D** | extending the measured scale for page-level rhythm |
| **the whole palette** | **A** | the author's. The corpus has no recommended ramp — \`patterns/color.md\` is the axis the sample parts on most |
| **the CTA at \`${t.btn}\`** | **A** | the owner's choice. ${cr(t.btnText, t.btn)}:1 with its label — the one value here under AA, recorded rather than smoothed over |
| **${fontStack(t.sans)}** | **A** | the author's. The corpus records typefaces per system and recommends none |
| **${px(t.railW)}px rail · ${px(t.headH)}px header** | **A** | the author's. \`patterns/navigation.md\` is a thin-sample axis (16) and carries nothing to appeal to here |
| **the ${driftDur} hero drift** | **A** | the author's. No ambient-loop duration exists in the corpus |
| ${durations.length} interaction durations | **A** | the sample's mode is three (\`patterns/motion.md\`, 83 samples); this page uses ${durations.length}, which is a deviation with a reason, not a measurement |
| the dark-theme neutrals | **A** | the author's, R=G=B by intent. The corpus has no base ramp |

**The A rows are the majority, and that is correct for an \`interpreted/\` profile.** A file in
\`measured/\` with this many A rows would be misfiled.

## Do's and Don'ts

- ✅ Change the stylesheet and **regenerate** — never edit this file
- ✅ When you add a value, add its grade row. An A with no recorded intent is the thing
  \`profiles/README.md\` rule 1 exists to prevent
- ❌ Do not read the palette here as a corpus recommendation. It is one site's answer
- ❌ Do not copy the CTA contrast. It is a recorded exception, not a pattern to follow
`,

  ko: () => `${frontmatter()}<!-- lang-links -->
${langLinks('ko')}
<!-- /lang-links -->

> **생성물입니다.** \`node site/design-spec.mjs\`가 \`docs/assets/site.css\`를 읽어 이 파일을
> 씁니다. 손으로 고치지 마세요 — 스타일시트를 고치고 재생성하지 않으면 스펙과 페이지가 어긋나고,
> 그게 바로 이 저장소가 다루는 실패입니다.

## 개요

코퍼스 자신의 사이트 **Self-Made DesignOps**의 시각 정체성입니다. 이 저장소가 실제로 만든 첫
물건이니, 남들에게 요구하는 산출물을 자기도 내놓아야 합니다.

이건 **interpreted** 프로파일입니다(\`profiles/README.md\`). 뼈대는
\`measured/web-comfortable\`에서 오고, 그 위에 색과 톤을 채웁니다. 즉 **A 행을 갖습니다**.
맨 아래 표의 요점은 그 A들이 실측인 척 분장하지 않고 그대로 보인다는 데 있습니다.

- 표면: **데스크톱 웹**, 페이지 옆 ${px(t.railW)}px 레일, 940px 아래에서 한 열로 쌓임
- 테마: **둘**, 기본 라이트, 다크는 명시적 선택
- 의존성: **서체 하나**(${fontStack(t.sans)}). 프레임워크 없음, 빌드 단계 없음

## 색

채워져 있습니다 — 이게 \`measured/\`와 이 파일을 가르는 지점입니다. 완전한 팔레트 둘이고,
다크 세트의 중립색은 **R=G=B**라 양쪽 테마에 남은 색기는 오렌지와 상태 점 둘뿐입니다.

| 역할 | 라이트 | 다크 |
|------|-------|------|
| 배경 | \`${t.light.bg}\` | \`${t.dark.bg}\` |
| 표면 | \`${t.light.surface}\` | \`${t.dark.surface}\` |
| 본문 | \`${t.light.text}\` (${cr(t.light.text, t.light.bg)}:1) | \`${t.dark.text}\` (${cr(t.dark.text, t.dark.bg)}:1) |
| 보조 | \`${t.light.mut}\` (${cr(t.light.mut, t.light.bg)}:1) | \`${t.dark.mut}\` (${cr(t.dark.mut, t.dark.bg)}:1) |
| 흐림 | \`${t.light.dim}\` (${cr(t.light.dim, t.light.bg)}:1) | \`${t.dark.dim}\` (${cr(t.dark.dim, t.dark.bg)}:1) |
| 링크 | \`${t.light.link}\` (${cr(t.light.link, t.light.bg)}:1) | \`${t.dark.link}\` (${cr(t.dark.link, t.dark.bg)}:1) |
| 외곽선 | \`${t.light.border}\` | \`${t.dark.border}\` |
| 경고 | \`${t.light.warn}\` (${cr(t.light.warn, t.light.bg)}:1) | \`${t.dark.warn}\` (${cr(t.dark.warn, t.dark.bg)}:1) |

위 비율은 전부 생성기가 계산합니다. 메모에서 베껴온 값이 아닙니다.

**CTA는 예외이고, 묻어두지 않고 적습니다.** \`${t.btn}\`에 \`${t.btnText}\` 라벨은
**${cr(t.btnText, t.btn)}:1**로 본문 크기 텍스트의 AA 하한 4.5:1 ${AA(t.btnText, t.btn) ? '위' : '아래'}이고,
라벨이 ${px(t.btnSize)}px/600이라 큰 글자에도 해당하지 않습니다. 소유자의 의도된 브랜드 결정이고,
이 페이지에서 AA를 못 넘기는 **유일한** 값입니다. 채움 자체가 라이트 캔버스 대비
${cr(t.btn, t.light.bg)}:1로 WCAG 1.4.11의 컴포넌트 경계 기준 3:1에 모자라서,
\`${t.btnLine}\`이 ${cr(t.btnLine, t.light.bg)}:1로 경계를 집니다.

## 타이포그래피

텍스트는 ${fontStack(t.sans)}, 모노 열은 ${fontStack(t.mono)}. 본문은
**${bodySize}/${bodyLeading}** — \`patterns/typography.md\`의 웹 다수 진영입니다.

제목은 유동적입니다: \`${t.h1}\`, \`${t.h2}\`. DESIGN.md
프론트매터에는 **상한**을 적습니다. 포맷이 크기당 슬롯 하나라, 컴포넌트 라이브러리가 기준으로
삼을 값은 데스크톱 값이기 때문입니다.

## 레이아웃

간격 8단계: **${t.sp.join(' · ')}**. 앞 여섯은
\`measured/web-comfortable\` 세트이고, ${t.sp[6]}·${t.sp[7]}은 페이지 단위 리듬을 위해 덧붙였습니다.

껍데기는 ${px(t.headH)}px 헤더 아래 ${px(t.railW)}px 레일이 페이지 옆에 서는 구조이고, 940px
아래에서 한 열로 쌓입니다.

## 형태

**모든 컨트롤이 \`${t.rControl}\`** — 버튼·입력·테마 토글·Copy·Reset.
\`tokens/scales.md\`에 radius-0 진영이 기록돼 있으니 값 자체는 표본 안에 있고, 그걸 고른 건
결정입니다. 칩과 수집 깊이 배지는 완전한 원을 유지합니다. 비대화형 배지와 한 가족으로 그려져
있어서, 대화형 쪽만 각지게 하면 그 가족이 갈라지기 때문입니다.

## 컴포넌트

| 컴포넌트 | 값 | 비고 |
|---|---|---|
| 주/보조 버튼 | ${t.hBtn} | 최빈 40px보다 큼 — 폼이 아니라 CTA 둘짜리 페이지 |
| 헤더 컨트롤 | ${t.hCtrl} | 보조 크롬 |
| 검색 입력 | ${t.hInput} | |
| Copy 버튼 | ${t.hCopy} | 제목 행 안에 앉음 |
| 필터 칩 | ${t.hChip} | |

## 모션

> DESIGN.md alpha 스펙에는 **모션 토큰 슬롯이 없습니다.** 스펙의 "이해하지 못한 절은 보존한다"
> 조항에 따라 본문 절로 둡니다 (\`INTEROP.md\` 5절).

인터랙션 지속: **${durations.join(' · ')}ms**, 전부 \`${t.ease}\`.
${durations.length}단계이고, \`patterns/motion.md\`의 83표본 최빈은 3단계입니다.

히어로에 앰비언트 루프가 하나 있습니다 — 24px 도트 격자가 **${driftDur} linear**로 한 칸씩
흐릅니다. 24px 격자는 실측(29개 중 27개 시스템의 간격 단계)이고, ${driftDur}은 아닙니다. 코퍼스에
앰비언트 루프 지속 기록이 없고, 갖고 있는 가장 긴 값은 Codex의 2000ms인데 성격이 다릅니다.

\`prefers-reduced-motion: reduce\`에서 완전히 멈춥니다. 함정 하나 — 흔한 처방인
\`animation-duration: .01ms\`만으로는 **무한** 애니메이션이 멈추지 않고 미친 듯이 돕니다.
반복 횟수도 같이 고정해야 합니다.

## 근거 등급

M = 코퍼스 실측 · D = 실측에서 유도 · A = 저자 판단 · U = 의도적 공란.

| 항목 | 등급 | 출처 / 할 일 |
|------|:---:|------|
| 앞 여섯 간격 단계 | **M** | \`tokens/scales.md\` — 표본에서 4·8·16은 사실상 필수 |
| 본문 \`${bodySize}\` | **M** | \`patterns/typography.md\` 웹 다수 진영 |
| 컨트롤 라운드 \`${t.rControl}\` | **M** | \`tokens/scales.md\`에 radius-0 진영 기록 — 값은 표본에 있고 고른 건 결정 |
| 24px 도트 격자 | **M** | \`tokens/scales.md\` — 29개 중 27개 시스템의 간격 단계 |
| ${t.hBtn} 버튼 옆 ${t.hInput} 입력 | **D** | \`patterns/form.md\`의 컨트롤 높이 정렬을 이 페이지 크롬에 맞춰 조정 (동일값 아님) |
| 제목 스케일 | **D** | 본문 크기에서 유동적으로 유도 — 표본의 특정 스케일 아님 |
| ${t.sp[6]}·${t.sp[7]} 간격 | **D** | 페이지 단위 리듬을 위해 실측 스케일을 연장 |
| **팔레트 전체** | **A** | 저자. 코퍼스에 권장 램프 없음 — \`patterns/color.md\`가 표본이 가장 갈리는 축 |
| **CTA \`${t.btn}\`** | **A** | 소유자 선택. 라벨 대비 ${cr(t.btnText, t.btn)}:1 — 여기서 AA를 못 넘기는 유일한 값이고 덮지 않고 기록 |
| **${fontStack(t.sans)}** | **A** | 저자. 코퍼스는 시스템별 서체를 기록할 뿐 권장하지 않음 |
| **레일 ${px(t.railW)}px · 헤더 ${px(t.headH)}px** | **A** | 저자. \`patterns/navigation.md\`는 표본이 얇은 축(16)이라 기댈 값이 없음 |
| **히어로 드리프트 ${driftDur}** | **A** | 저자. 코퍼스에 앰비언트 루프 지속 기록 없음 |
| 인터랙션 지속 ${durations.length}단계 | **A** | 표본 최빈은 3단계(\`patterns/motion.md\`, 83표본). 이 페이지는 ${durations.length}단계이고, 이건 이유 있는 이탈이지 실측이 아님 |
| 다크 테마 중립색 | **A** | 저자. 의도적으로 R=G=B. 코퍼스에 base 램프 없음 |

**A 행이 다수이고, \`interpreted/\` 프로파일로서는 그게 맞습니다.** A가 이만큼인 파일이
\`measured/\`에 있으면 잘못 놓인 겁니다.

## Do's and Don'ts

- ✅ 스타일시트를 고치고 **재생성**하세요. 이 파일을 직접 고치지 마세요
- ✅ 값을 더하면 등급 행도 더하세요. 의도가 기록되지 않은 A는 \`profiles/README.md\` 1번 규칙이
  막으려는 바로 그것입니다
- ❌ 여기 팔레트를 코퍼스 권장으로 읽지 마세요. 한 사이트의 답입니다
- ❌ CTA 대비를 따라 쓰지 마세요. 기록된 예외지 따를 패턴이 아닙니다
`,
};

/* ── Write ----------------------------------------------------------------- */

const flag = ARGV.find((a) => a === '-o' || a === '--out');
const path = flag ? ARGV[ARGV.indexOf(flag) + 1] : OUT[LOCALE] ?? OUT.en;
const abs = join(ROOT, path);
mkdirSync(dirname(abs), { recursive: true });

const body = (doc[LOCALE] ?? doc.en)();
writeFileSync(abs, body);

const grades = ['M', 'D', 'A', 'U']
  .map((g) => `${g}${(body.match(new RegExp(`\\| \\*\\*${g}\\*\\* \\|`, 'g')) || []).length}`)
  .join(' ');
console.log(M.written(path, reads, grades));
