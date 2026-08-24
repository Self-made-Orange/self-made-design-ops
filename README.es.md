# Self-Made DesignOps

![Design systems](https://img.shields.io/badge/design_systems-116-blue)
![Pattern axes](https://img.shields.io/badge/pattern_axes-9-8A2BE2)
![Platforms](https://img.shields.io/badge/platform_axes-7-teal)
![Machine readable](https://img.shields.io/badge/data-JSON-orange)
![Agent guides](https://img.shields.io/badge/agent_guides-4-green)
![Docs language](https://img.shields.io/badge/corpus_language-English%20%2B%20한국어-blue)

[English](README.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [简体中文](README.zh-Hans.md) · [Bahasa Indonesia](README.id.md) · **Español**

📖 **[Explora el corpus en la web](https://self-made-orange.github.io/self-made-design-ops/)** — índice buscable de los 116 sistemas, filtrable por plataforma / nivel / dominio.

Un repositorio que convierte el trabajo repetido entre diseño y desarrollo en **activos compartidos**: convenciones, referencias y herramientas reutilizadas entre productos. **Aquí no vive ningún dato específico de producto** — eso pertenece al repositorio de cada producto.

`design-systems` `design-tokens` `ui-patterns` `event-taxonomy` `i18n` `l10n` `llm-agents` `figma`

## Cómo usarlo

**1. "¿Este valor es raro, o solo lo es para nosotros?" — compruébalo y zanja la discusión.**
En lugar de debatir veinte minutos sobre la altura de un botón, abre `design-systems/patterns/button.md`.
Contiene la distribución medida en 77 sistemas: **40px es la moda, pero solo ~23%**,
así que la conclusión es que *no existe una altura estándar del sector*. La discusión pasa de
*"qué valor es correcto"* a *"qué valor encaja con nuestra densidad"*.

**2. Al empezar algo nuevo — no partas de una página en blanco.**
La sección **"Valores por defecto de implementación"** al final de cada `patterns/*.md` es el destino.
No inventes una escala de espaciado, tipografía o motion desde cero: empieza ahí y cambia solo lo necesario.

**3. Base para revisiones — argumenta con muestras, no con gustos.**
En vez de "no me convence", puedes escribir **"no hay contraejemplo en 79 sistemas"**.
`agents/design-review.md` es ese procedimiento, y su veredicto triple (*desviación de la convergencia /
divergencia aceptable / inconsistencia interna*) **separa las cuestiones de gusto de los defectos reales.**

**4. Como base para agentes LLM.**
`design-systems/data/*.json` es legible por máquina y `agents/` contiene procedimientos ejecutables.
Entrega este corpus cuando pidas a un agente que revise un diseño, redacte una hoja de eventos o audite la localización.

## Qué se gana

- **Las decisiones se aceleran** — se acaba el "¿cómo lo hacen los demás?" cada vez.
- **Las decisiones permanecen** — el razonamiento queda registrado **junto con su tamaño de muestra**.
- **Se filtra la sabiduría heredada** — este corpus **revocó 24 de sus propias conclusiones** al crecer la muestra
  (p. ej. "el radio de los modales web se agrupa en 8–12px" → resultó ser el grupo **más delgado**).
- **Lo desconocido sigue marcado** — los valores sin confirmar se marcan `미확인` (sin verificar),
  mejor que rellenarlos de forma plausible, y así el siguiente puede retomarlos.

> **¿Primera vez?** Elige un eje en `design-systems/patterns/` y lee **primero su sección final**.
> Todo lo que está encima es la evidencia de esa conclusión.

## ¿En qué se diferencia de awesome-design-systems?

[`alexpate/awesome-design-systems`](https://github.com/alexpate/awesome-design-systems) fue el pool de candidatos de este corpus — sirven a propósitos distintos y se complementan:

| | awesome-design-systems | **Self-Made DesignOps** |
|---|---|---|
| Qué es | **Lista de enlaces** curada (~160 sistemas) | **Corpus de valores verificados** (116 sistemas) |
| Unidad de contenido | Nombre + URL | Valores de tokens medidos — fuente y versión fijadas por afirmación |
| Pregunta que responde | *«¿Qué design systems existen?»* | *«¿Qué valores usan realmente y dónde convergen o divergen?»* |
| Profundidad | Enlaza a la documentación de cada sistema | Entradas por sistema + 9 ejes de patrones transversales que terminan en **valores por defecto de implementación** |
| Verificación | — | Los valores no verificables se marcan; un CI mensual recomprueba cada versión fijada |
| Legible por máquina | — | `design-systems/data/*.json` |
| Destinatarios | Quien explora | Quien decide valores — y **agentes LLM** (procedimientos en `agents/`) |

Usa la lista awesome para descubrir sistemas; usa este corpus para decidir la altura de tu botón.


## Contenido

| Directorio | Qué es | Estado |
|------------|--------|--------|
| [`design-systems/`](design-systems/) | Corpus de referencia de design systems públicos — verificado con valores reales de tokens | **116 sistemas** |
| [`agents/`](agents/) | Procedimientos de trabajo para agentes LLM — revisión de diseño, hojas de eventos, localización | 4 guías + navegación |
| [`profiles/`](profiles/) | **Instrucciones de producción** — perfiles `DESIGN.md` derivados del corpus, con grado de evidencia en cada valor | 4 measured + capa interpreted |
| [`event-taxonomy/`](event-taxonomy/) | Convenciones para hojas de eventos de analítica + conversor/linter | convenciones · conversor |
| [`i18n/`](i18n/) | Convenciones de localización + linter | convenciones · linter |
| [`mockups/`](mockups/) | Inventario de mockups de dispositivos | Apple · Google · Samsung · Meta · Microsoft · Figma oficial — **6 entradas** |

> **Nota:** los documentos del corpus son la versión principal en inglés, con el original en coreano conservado junto a cada uno como `<slug>.ko.md`. Los valores de tokens, tablas y extractos JSON (`design-systems/data/`) son neutrales al idioma.

## `design-systems/` — el corpus

Ante decisiones como «cuántos anchos debe tener un modal» o «dónde cortar la escala de espaciado», este corpus permite comprobar **qué hicieron realmente los sistemas de referencia** — con fuente y versión fijadas en cada afirmación, y los valores no confirmados marcados como «sin verificar».

- **`systems/`** — un archivo por sistema (116 entradas), con frontmatter YAML (organización, nivel, plataforma, fecha de verificación, fuente)
- **`patterns/`** — comparación transversal en **9 ejes de componentes**: typography · color · button · form · motion · modal · table · navigation · feedback. Cada documento termina con una sección de **«valores por defecto de implementación»** — esa sección es el propósito del corpus
- **`tokens/scales.md`** — comparación de espaciado/radios/bordes. Conclusión principal: **ningún valor de espaciado es universal**; lo que queda es el ranking de adopción (4/8/16 los más fuertes, luego 32, 24)
- **`platforms.md`** — los 7 ejes de plataforma con muestras: web · mobile · desktop · spatial · automotive · wearable · tv. **Plataforma distinta, estructura de tokens distinta**
- **`data/`** — JSON legible por máquina (todo el frontmatter + conclusiones transversales curadas)
- **`GLOSSARY.md`** — términos que parecen iguales pero difieren entre sistemas (parámetros de Liquid Glass, píldora vs círculo, supuestos del root rem…)
- **`HARVESTING.md`** — cómo se recolectaron los valores, incluidos canales que sortean el proxy (HIG DocC JSON de Apple, sparse-clone de androidx, sondeo de IDs adyacentes en Figma)
- **`INTEROP.md`** — relación con el formato de entrega para agentes **`DESIGN.md`** (especificación, linter) y `to-design-md.mjs`, que exporta los valores por defecto del corpus como andamiaje
- **`check-sources.mjs`** — vigilancia de frescura: compara la versión fijada de cada entrada con la última de npm (CI mensual + git hook)

### Corpus por región

**Plataformas / OS (10)** — Apple: iOS/iPadOS HIG, macOS 26, tvOS, visionOS, CarPlay · Google: Material 3, Android Automotive, Android TV, Wear OS · Samsung: Tizen CircularUI

**Frameworks open source (19)** — Tailwind CSS, shadcn/ui, Mantine, Radix Themes, Chakra UI, Ark UI, Open Props, Bootstrap, MUI, HeroUI, Park UI, Naive UI, PrimeVue, Vuetify, Skeleton, Shoelace, Headless UI, Panda CSS, vanilla-extract

**Norteamérica (42)** — Carbon (IBM), Fluent 2 (Microsoft), Spectrum (Adobe), Lightning (Salesforce), Primer (GitHub), Polaris (Shopify), Cloudscape (AWS), Base Web (Uber), Gestalt (Pinterest), Canvas (Workday), Paste (Twilio), Garden (Zendesk), Blueprint (Palantir), Helios (HashiCorp), Pajamas (GitLab), EUI (Elastic), Evergreen (Segment), LeafyGreen (MongoDB), Clarity (VMware), Odyssey (Okta), Grommet (HPE), Protocol (Mozilla), Codex (Wikimedia), Stacks (Stack Overflow), Skin (eBay), Cedar (REI), Thumbprint (Thumbtack), Auro (Alaska Airlines), Priceline, Pluralsight, HSDS (Help Scout), Intergalactic (Semrush), Pharos (JSTOR), Palette (Artsy), Solid (BuzzFeed), Astro UXDS (aeroespacial), NASA WDS, USWDS (gobierno federal de EE. UU.), NYSDS (estado de Nueva York), Bolt (Pega), Aurora (gobierno canadiense, muestra de capa documental), Fleet (Ciudad de Boston)

**Europa (22)** — GOV.UK, NHS, WMN (transporte), Origami (Financial Times), Backpack (Skyscanner), Vanilla (Canonical), PIE (Just Eat Takeaway), DSFR (gobierno francés), Vitamin (Decathlon), Strapi, Welcome UI (WTTJ), Porsche, Audi UI, Siemens iX, Forma 36 (Contentful), **Mística (Telefónica)**, Italia (gobierno italiano), Tegel (Scania), Orbit (Kiwi.com), Ring UI (JetBrains), Nord (Nordhealth), Kontur UI (SKB Kontur)

**Asia Oriental (14)** — Corea: KRDS (gobierno), TDS (Toss), Seed Design (Karrot), Vapor UI (goorm) · Japón: LINE (LY Corp, muestra de capa documental), ReX (Rakuten), Digital Agency, SmartHR UI, Charcoal (pixiv), Spindle (Ameba), Serendie (Mitsubishi Electric), Vibes (freee) · China: Ant Design (Ant Group), Semi Design (ByteDance)

**Sudeste Asiático (4)** — SGDS (gobierno de Singapur), Asphalt (Gojek), Unify (Tokopedia), Persona (Privy)

**Oceanía (3)** — Atlassian, Braid (SEEK), Kaizen (Culture Amp)

**Latinoamérica (1)** — Yoga (Wellhub) · **Oriente Medio (1)** — Vibe (monday.com)

## `agents/` — procedimientos para agentes LLM

Procedimientos de ejecución para usar este repositorio como **herramienta de trabajo de un agente**, no solo como referencia humana. [`agents/README.md`](agents/README.md) contiene el mapa de navegación del corpus (tipo de pregunta → archivo) y la disciplina común (deber de citar, prohibido especular, los linters deben pasar). **Para usarlo desde otro proyecto**: clona este repo al lado (o como submodule) y añade un puntero en el `CLAUDE.md` del producto — el snippet listo para copiar y el bucle de retroalimentación están en [`agents/README.md`](agents/README.md) § "다른 프로젝트에서 쓰기". Cuatro guías:

- **[`system-selection.md`](agents/system-selection.md)** — elegir sistemas de referencia según las coordenadas del producto (plataforma, distancia de visión, cultura de escritura, dominio) — dividido por ejes en vez de adoptar un solo sistema entero, con una puerta de licencia antes de tomar código
- **[`design-review.md`](agents/design-review.md)** — auditar un diseño/implementación contra el corpus con un **veredicto de tres vías**: *desviación de la convergencia* / *divergencia aceptada* / *inconsistencia interna* — para que un cuerpo de texto de 14px nunca sea señalado contra un «estándar de 16px» que no existe
- **[`event-instrumentation.md`](agents/event-instrumentation.md)** — leer el contexto UX desde Figma o el código y proponer una hoja de eventos bajo las convenciones de `event-taxonomy/` (las variantes de estado son propiedades, los funnels son orden de enum, sin PII, las dudas vuelven al usuario como lista de preguntas)
- **[`localization.md`](agents/localization.md)** — extraer cadenas y contexto, y localizar bajo las convenciones de `i18n/` (dónde se esconden las cadenas, normalización de nombres de pantalla compartida con las hojas de eventos, el tono se observa, no se inventa, riesgos CJK/RTL reportados)

## `event-taxonomy/` — hojas de eventos de analítica

Convenciones de hoja para definir eventos de analítica de producto: nomenclatura `{dominio}_{acción}`, pantallas como enum `screen_name` en lugar de eventos por pantalla, notación de propiedades condicionales, checklist de revisión. `convert.mjs` convierte hojas a **JSON · Markdown · HTML · hoja de cálculo · Notion**; `--lint-only` (+ `--strict` para CI) comprueba violaciones de la convención.

## `i18n/` — localización

Convenciones + plantillas + linter: identificadores de locale BCP 47, nomenclatura de claves, ICU MessageFormat (plural/select/número/fecha), categorías de plural CLDR por idioma (coreano 1 · inglés 2 · **árabe 6**), presupuestos de expansión de texto, RTL. Conectado con el corpus: las convenciones de tamaño de texto difieren por cultura de escritura (Ant Design 14px · web occidental 16px · Apple 17pt) y eso condiciona el layout multilingüe. `lint.mjs` lee el locale del nombre del archivo y comprueba las categorías de plural que ese idioma realmente necesita.

## `mockups/`

Registra **dónde están los mockups de dispositivos y qué cubren** — solo fuentes e inventario; los archivos en sí no se suben (licencia y tamaño).

## Principios

- **Solo activos compartidos.** Los datos específicos de producto se mueven a su repositorio.
- **Prohibido especular.** Los valores no verificables quedan marcados como «sin verificar». Un valor plausible pero erróneo envenena la confianza en todo el corpus.
- **Fuente y versión en todo.** La reverificación debe ser posible.
- **Prohibido copiar literalmente** prosa externa; resumir y enlazar. Los valores factuales de tokens se citan tal cual.

## Limitaciones conocidas

- **Los sitios de documentación de design systems están bloqueados** por el proxy de salida (carbondesignsystem.com, m3.material.io, primer.style, …). GitHub y npm están abiertos, así que la recolección de tokens funciona; las guías de uso de componentes en general no. Los sistemas con código abierto (shadcn/ui) o que publican CSS de componentes (Mantine, Radix Themes) llenan gran parte del hueco, y se hallaron dos canales alternativos para Apple (HIG DocC JSON) y Google (developer.android.com, androidx) — ver `design-systems/HARVESTING.md`.
- **Solo Cloudscape declara ratios de contraste numéricamente** en sus tokens (número de paso del color de gráfica = ratio de contraste). Entre 116 sistemas, ningún otro paquete incluye cifras de contraste ni un objetivo WCAG.
- **La frescura se vigila automáticamente** — `check-sources.mjs` detectó en su primera ejecución que Base Web llevaba dos versiones mayores de retraso, y un cambio real de tokens en Mística 17 (primitivas de alto contraste eliminadas aguas arriba).

## Requisitos previos

| Ítem | Nota |
|------|------|
| Node.js / Bun | runtime de los scripts (sin dependencias) |
| `FIGMA_OAUTH_TOKEN` | token de la API de Figma — como variable de entorno, **nunca commitear** |

La configuración del servidor MCP vive en `.claude/settings.local.json` (en gitignore — puede contener tokens).
