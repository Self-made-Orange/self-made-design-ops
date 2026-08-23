# Self-Made DesignOps

![Design systems](https://img.shields.io/badge/design_systems-116-blue)
![Pattern axes](https://img.shields.io/badge/pattern_axes-9-8A2BE2)
![Platforms](https://img.shields.io/badge/platform_axes-7-teal)
![Machine readable](https://img.shields.io/badge/data-JSON-orange)
![Agent guides](https://img.shields.io/badge/agent_guides-4-green)
![Docs language](https://img.shields.io/badge/corpus_language-English%20%2B%20한국어-blue)

[English](README.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · **简体中文** · [Bahasa Indonesia](README.id.md) · [Español](README.es.md)

📖 **[在网页上浏览语料库](https://keepyaoung.github.io/self-made-design-ops/)** — 可按平台 / 层级 / 领域筛选全部 116 个系统。

一个把设计与开发之间反复出现的工作沉淀为**共享资产**的仓库：跨产品复用的规范、参考资料与工具。**不存放任何特定产品的实际数据** — 那些属于各产品自己的仓库。

`design-systems` `design-tokens` `ui-patterns` `event-taxonomy` `i18n` `l10n` `llm-agents` `figma`

## 怎么用

**1.「这个值是不是只有我们奇怪?」——查清楚，结束争论。**
与其为按钮高度争论二十分钟，不如打开 `design-systems/patterns/button.md`。
那里有 77 个系统的实测分布：**40px 是众数，但也只占约 23%**，
结论是「不存在行业标准高度」。争论从*「哪个值正确」*转向*「哪个值适合我们的密度」*。

**2. 从零开始做时——不必面对空白页。**
每个 `patterns/*.md` 末尾的**「实现时的默认值」**一节就是目的地。
不要从头发明间距、字体、动效比例，从这里开始，只改必须改的部分。

**3. 评审依据——用样本说话，而不是凭喜好。**
不用说「感觉不太对」，可以写**「这个值在 79 个样本中没有反例」**。
`agents/design-review.md` 就是该流程，其三分判定(*偏离收敛 / 可接受的分歧 /
内部不一致*)**把口味问题和真正的缺陷分开。**

**4. 作为 LLM 智能体的依据资料。**
`design-systems/data/*.json` 可被机器读取，`agents/` 中有可执行流程。
让智能体做设计评审、编写事件表、检查多语言时，把这份语料交给它。

## 能得到什么

- **决策更快** — 不必每次重新搜索「别人都怎么做」。
- **决策留得下** — 理由**连同样本量**一起被记录，半年后不会重复同一场争论。
- **过滤掉错误的常识** — 这份语料在扩大样本的过程中**推翻了自己的 24 条结论**
  (例如「Web 弹窗圆角集中在 8~12px」→ 实际上该区间是**最稀疏**的一群)。
- **不知道就写不知道** — 未确认的值保留 `미확인`(未确认)标记，
  好过看似合理地填上，下一个人可以接手。

> **第一次看?** 在 `design-systems/patterns/` 中挑一个轴，**从末尾的「实现时的默认值」读起**。
> 它上面的内容都是该结论的依据。

## 与 awesome-design-systems 有何不同

[`alexpate/awesome-design-systems`](https://github.com/alexpate/awesome-design-systems) 是本语料库的候选池 — 两者目的不同、互为补充:

| | awesome-design-systems | **Self-Made DesignOps** |
|---|---|---|
| 本质 | 精选**链接清单**（约 160 个） | **核验值语料库**（116 个） |
| 内容单位 | 名称 + URL | 实测 token 值 — 每条结论固定来源与版本 |
| 回答的问题 | *"有哪些设计系统？"* | *"它们实际用什么值，在哪里趋同、在哪里分歧？"* |
| 深度 | 链接到各系统文档 | 逐系统条目 + 9 条横向模式轴，以**实现默认值**收尾 |
| 核验 | — | 无法核实的值明确标注；每月 CI 复核所有固定版本 |
| 机器可读 | — | `design-systems/data/*.json` |
| 面向对象 | 浏览的人 | 定值的人 — 以及 **LLM 智能体**（`agents/` 流程） |

发现系统用 awesome 清单；决定按钮高度用这个语料库。


## 目录结构

| 目录 | 内容 | 状态 |
|------|------|------|
| [`design-systems/`](design-systems/) | 公开设计系统参考语料库 — 以真实 token 值核验 | **116 个系统** |
| [`agents/`](agents/) | LLM 智能体工作指南 — 设计评审、事件表、本地化 | 4 份指南 + 导航 |
| [`profiles/`](profiles/) | **制作指令书** — 从语料库派生的 `DESIGN.md` 配置，每个值都标注依据等级 | measured 4 种 + interpreted 层 |
| [`event-taxonomy/`](event-taxonomy/) | 分析事件表编写规范 + 转换/检查脚本 | 规范 · 转换器 |
| [`i18n/`](i18n/) | 本地化规范 + 检查器 | 规范 · 检查器 |
| [`mockups/`](mockups/) | 设备样机素材清单 | Apple · Google · Samsung · Meta · Microsoft · Figma 官方 — **6 项** |

> **注：** 语料库正文以英语为主版，韩语原文以 `<slug>.ko.md` 并存。token 值、表格与 JSON 提取（`design-systems/data/`）与语言无关。

## `design-systems/` — 语料库

面对"模态框宽度分几档"、"间距刻度在哪里断开"这类决策时，用它来核对**主流系统实际怎么做** — 每条结论都固定了来源与版本，无法核实的值标注为"未确认"。

- **`systems/`** — 每个系统一个文件（116 个），带 YAML frontmatter（组织、层级、平台、核验日期、来源）
- **`patterns/`** — **9 条组件轴**的横向对比：typography · color · button · form · motion · modal · table · navigation · feedback。每篇文末的**"实现默认值"**一节就是这个语料库的目的
- **`tokens/scales.md`** — 间距/圆角/描边横向对比。核心结论：**不存在普适的间距值** — 剩下的只有采用率排名（4/8/16 最强，其次 32、24）
- **`platforms.md`** — 平台 7 轴全部有样本：web · mobile · desktop · spatial · automotive · wearable · tv。**平台不同，token 结构本身就不同**
- **`data/`** — 机器可读 JSON（全部 frontmatter + 精选横向结论）
- **`GLOSSARY.md`** — 系统间同义/异义术语表（Liquid Glass 参数、胶囊 vs 正圆、rem 根字号前提……）
- **`HARVESTING.md`** — 采集方法与绕行通道（Apple HIG DocC JSON、androidx sparse-clone、Figma 相邻 ID 探测）
- **`INTEROP.md`** — 与面向智能体的交换格式 **`DESIGN.md`** 的关系（规范、linter），以及把语料默认值导出为脚手架的 `to-design-md.mjs`
- **`check-sources.mjs`** — 新鲜度监控：将各条目固定版本与 npm 最新版对照（每月 CI + git 钩子）

### 按区域分组的采集清单

**平台 / OS 厂商 (10)** — Apple: iOS/iPadOS HIG, macOS 26, tvOS, visionOS, CarPlay · Google: Material 3, Android Automotive, Android TV, Wear OS · Samsung: Tizen CircularUI

**开源框架 (19)** — Tailwind CSS, shadcn/ui, Mantine, Radix Themes, Chakra UI, Ark UI, Open Props, Bootstrap, MUI, HeroUI, Park UI, Naive UI, PrimeVue, Vuetify, Skeleton, Shoelace, Headless UI, Panda CSS, vanilla-extract

**北美 (42)** — Carbon (IBM), Fluent 2 (Microsoft), Spectrum (Adobe), Lightning (Salesforce), Primer (GitHub), Polaris (Shopify), Cloudscape (AWS), Base Web (Uber), Gestalt (Pinterest), Canvas (Workday), Paste (Twilio), Garden (Zendesk), Blueprint (Palantir), Helios (HashiCorp), Pajamas (GitLab), EUI (Elastic), Evergreen (Segment), LeafyGreen (MongoDB), Clarity (VMware), Odyssey (Okta), Grommet (HPE), Protocol (Mozilla), Codex (Wikimedia), Stacks (Stack Overflow), Skin (eBay), Cedar (REI), Thumbprint (Thumbtack), Auro (Alaska Airlines), Priceline, Pluralsight, HSDS (Help Scout), Intergalactic (Semrush), Pharos (JSTOR), Palette (Artsy), Solid (BuzzFeed), Astro UXDS (航天指挥), NASA WDS, USWDS (美国联邦), NYSDS (纽约州), Bolt (Pega), Aurora (加拿大政府、文档层样本), Fleet (波士顿市)

**欧洲 (22)** — GOV.UK, NHS, WMN (交通), Origami (Financial Times), Backpack (Skyscanner), Vanilla (Canonical), PIE (Just Eat Takeaway), DSFR (法国政府), Vitamin (Decathlon), Strapi, Welcome UI (WTTJ), Porsche, Audi UI, Siemens iX, Forma 36 (Contentful), Mística (Telefónica), Italia (意大利政府), Tegel (Scania), Orbit (Kiwi.com), Ring UI (JetBrains), Nord (Nordhealth), Kontur UI (SKB Kontur)

**东亚 (14)** — 韩国: KRDS (政府), TDS (Toss), Seed Design (Karrot), Vapor UI (goorm) · 日本: LINE (LY Corp、文档层样本), ReX (乐天), 数字厅, SmartHR UI, Charcoal (pixiv), Spindle (Ameba), Serendie (三菱电机), Vibes (freee) · 中国: Ant Design (蚂蚁集团), Semi Design (字节跳动)

**东南亚 (4)** — SGDS (新加坡政府), Asphalt (Gojek), Unify (Tokopedia), Persona (Privy)

**大洋洲 (3)** — Atlassian, Braid (SEEK), Kaizen (Culture Amp)

**拉丁美洲 (1)** — Yoga (Wellhub) · **中东 (1)** — Vibe (monday.com)

## `agents/` — LLM 工作指南

把这个仓库当作**智能体的工作工具**（而不只是人的参考资料）时的执行流程。[`agents/README.md`](agents/README.md) 提供语料库导航（问题类型 → 文件）与共同纪律（引用义务、禁止臆测、必须通过检查器）。**在其他项目中使用**：把本仓库 clone 到旁边（或作为 submodule），并在产品仓库的 `CLAUDE.md` 中加入指向 — 可复制的片段与反馈循环见 [`agents/README.md`](agents/README.md) 的"다른 프로젝트에서 쓰기"一节。四份指南：

- **[`system-selection.md`](agents/system-selection.md)** — 按产品坐标（平台、视距、文字文化圈、领域）选定参照系统 — 按轴拆分而非整体采用单一系统，移植代码前先过许可证关
- **[`design-review.md`](agents/design-review.md)** — 以语料库为依据做**三分判定**评审：*偏离共识* / *可接受的分歧* / *内部不一致* — 从结构上杜绝拿不存在的"16px 标准"去指摘 14px 正文的错误
- **[`event-instrumentation.md`](agents/event-instrumentation.md)** — 从 Figma 或代码读取 UX 上下文，按 `event-taxonomy/` 规范提出事件表（状态变体是属性而非屏幕，漏斗用 enum 顺序表达，禁止 PII，无法判断的列为问题清单）
- **[`localization.md`](agents/localization.md)** — 提取字符串与上下文，按 `i18n/` 规范本地化（字符串藏身之处、与事件表共用屏幕名规范化、语气靠观察不靠发明、报告 CJK/RTL 风险）

## `event-taxonomy/` — 分析事件表

产品分析事件定义的表格规范：`{域}_{动作}` 命名、不按屏幕拆分事件而用 `screen_name` enum、条件属性标注法、评审清单。`convert.mjs` 可将表格转换为 **JSON · Markdown · HTML · 电子表格 · Notion**；`--lint-only`（配 CI 用 `--strict`）检查规范违规。

## `i18n/` — 本地化

规范 + 模板 + 检查器：BCP 47 区域标识符、键命名、ICU MessageFormat（复数/选择/数字/日期）、CLDR 各语言复数类别（韩语 1 · 英语 2 · **阿拉伯语 6**）、文本扩展预算、RTL。与语料库相连 — 正文字号惯例因文字文化圈而异（Ant Design 14px · 西方 Web 16px · Apple 17pt），直接影响多语言布局。`lint.mjs` 从文件名读取区域设置，检查该语言实际需要的复数类别。

## `mockups/`

只记录设备样机**在哪里、有什么** — 因许可与体积问题不提交文件本体，仅保留来源与清单。

## 原则

- **只留共享资产。** 产品专属数据一旦混入，就移到对应产品仓库。
- **禁止臆测。** 无法核实的值保持"未确认"。一个貌似合理的错误值会毁掉整个语料库的可信度。
- **凡事留来源与版本。** 必须可以复核。
- **禁止照抄原文。** 外部行文一律摘要转述并链接出处；token 值等事实信息可原样引用。

## 已知限制

- **设计系统文档站被出口代理拦截**（carbondesignsystem.com、m3.material.io、primer.style 等）。GitHub 与 npm 可用，token 采集不受影响，但组件使用指南大多无法抓取。开放源码的系统（shadcn/ui）与发布组件 CSS 的系统（Mantine、Radix Themes）填补了大部分空白，另发现 Apple（HIG DocC JSON）与 Google（developer.android.com、androidx）两条绕行通道 — 见 `design-systems/HARVESTING.md`。
- **只有 Cloudscape 在 token 中以数值标明对比度**（图表色的级数 = 对比度）。116 个系统中，没有其他任何包内嵌对比度数值或 WCAG 目标。
- **新鲜度自动监控** — `check-sources.mjs` 首次运行就发现 Base Web 落后两个大版本，并在 Mística 17 捕获真实 token 变更（高对比度原始值已在上游移除）。

## 前置准备

| 项目 | 说明 |
|------|------|
| Node.js / Bun | 脚本运行时（零依赖） |
| `FIGMA_OAUTH_TOKEN` | Figma API 令牌 — 用环境变量设置，**严禁提交** |

MCP 服务器配置放在 `.claude/settings.local.json`（可能含令牌 — 已在 gitignore 中）。
