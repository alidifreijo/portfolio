# Estado del proyecto

Actualizado: 2026-11-27

## Dónde estamos

Modo Construir, rama `bloque-1-base`. Las dos piezas del Bloque 1 están construidas, revisadas y subidas. Falta que Ali las vea y decida.

## Última pieza cerrada

Bloque 1 · Base (tareas 1 y 2), 27 nov, en la rama `bloque-1-base`. No está unida a `main`. Revisiones:

- `revisiones/2026-11-27-sistema-de-diseno/index.html`: ámbar, 0 rompe algo.
- `revisiones/2026-11-27-play-work/index.html`: ámbar, 0 rompe algo.

Vista previa: la de la rama `bloque-1-base` en el panel de Vercel. En local, `npm run build:static` genera una copia en `dist-static/`.

## A medias

- `bloque-1-base` no se une a `main` hasta que Ali apruebe el texto de Roche (Bloque 2). La fila de Roche y su caso enseñan `[PLACEHOLDER]` a propósito.
- La «deuda» del sistema son 576 usos fuera de los tokens en las páginas viejas (`src/styles/system-debt.json`). Baja cada vez que se rehace una página en los bloques 2 a 4.
- Páginas viejas con blur o degradado, contra la identidad, apuntadas como deuda: entrada de la home y del About (blur), Media y ProjectTitle (blur) y Contact (degradado en la máscara del chat). Se quitan al rehacerlas.
- Hallazgos «se nota» de los revisores que siguen abiertos:
  - el foco de teclado no tiene token propio;
  - en `/styleguide`, el email de la cabecera de ejemplo sale cortado a 1440 px y las descripciones de los tokens están en español;
  - en Contact, a 390 px, la cara tapa las pistas 02 y 03 (ya pasaba antes);
  - la comprobación no mira espacios en rem/em, duraciones, alturas de línea ni estilos puestos desde JS.
- Ramas antiguas sin cerrar: `hmi-case`, `hmi-lab`, `ui-taupe`, `v2-extras`, `home-v2` (ya unida).

## Siguiente paso

Ali mira la vista previa de `bloque-1-base` (`/styleguide`, `/work`, `/work/monexa`, `/work/cupra`, `/work/roche`, `/play`) y responde a «Esperando a Ali». Después, en Claude Code y en modo Construir: Bloque 2 · Contenido (tareas 4, 5 y 6, y la página WIP de la Biblioteca de referencias), en una rama nueva `bloque-2-contenido` que sale de `bloque-1-base`. Cada página rehecha usa solo `src/components/system/` y baja su deuda con `npm run check:system -- --shrink`. Está hecho cuando se cumplen los criterios de las tareas 4, 5 y 6 y el revisor no marca nada como «rompe algo».

## Tareas

- **Bloque 1 · Base:** tareas 1 y 2. Hecho, pendiente de que lo vea Ali.
- **Bloque 2 · Contenido:** tareas 4, 5 y 6, más la página WIP de la Biblioteca de referencias.
- **Bloque 3 · Media:** tareas 3 y 7.
- **Bloque 4 · Home de agentes:** tareas 8 y 9.

1. [x] Sistema de diseño agéntico y guía de estilo nuevos:
   - tokens en `src/styles/tokens.css` y en `src/styles/tokens.json` (DTCG), generados desde `estilos/tokens.css` con `npm run tokens`;
   - `DESIGN.md`;
   - manifiesto en `src/components/system/manifest.json`, con 14 componentes base;
   - skill `portfolio-system`;
   - comprobación en cada build (`npm run check`);
   - `/styleguide` generado;
   - el revisor compara con `/styleguide`.
2. [x] Navegación Play / Work y plantilla de empresa:
   - menú Play · Work · About · Contact;
   - `/play` con Cut Scenes y cutouts;
   - `/work` en filas (empresa, años, rol, via y una frase);
   - Monexa (`/work/monexa`), Cupra y Roche con la plantilla de empresa (Contexto, Rol, Proceso y Resultado);
   - las direcciones viejas redirigen.
3. [ ] Vídeos reexportados. Hecho: nítidos en Retina, póster con contenido, versión móvil.
4. [ ] Work: Monexa (reto → resultado), Cupra (rol y proceso), Roche (texto). Hecho: sin datos confidenciales; Ali aprueba el copy. Se rellenan los `[PLACEHOLDER]` de `src/content/projects/monexa.yaml`, `cupra.yaml` y `roche.yaml`, y Monexa deja de llamarse «bank platform».
5. [ ] Play: Silena nuevo, Cut Scenes recortado, cutouts corto. Hecho: cada uno con enlace en vivo y vídeo.
6. [ ] About limpio y pie común. Hecho: ningún dato repetido; LinkedIn y CV en todas las páginas. El pie ya existe: `src/components/system/Footer.astro`.
7. [ ] «How this portfolio is built». Hecho: el equipo de agentes, el sistema y el proceso, en una página.
8. [ ] Home de agentes (v8) con versión móvil. Hecho: titular legible; cada agente lleva a algo con sentido; funciona en 390 px. La ficha y el chip ya existen: `AgentCard` y `AgentChip`.
9. [ ] Revisión completa. Hecho: el revisor sin «rompe algo» en 390, 768 y 1440 px.

## Listo para traspaso

Sí.

- Brief aprobado: sí (27 nov).
- Estilo cerrado en `estilos/`: sí (27 nov).
- Lista de tareas: sí (27 nov).

## Probado y descartado en esta sesión

- Hacer las capturas con `astro dev`: falla la primera carga (504 «Outdated Optimize Dep»). Se usa la copia estática (`npm run build:static`) servida en local.
- Un estilo puesto en la etiqueta `class` de un componente de sistema (por ejemplo `<Panel class="wk">`) no se aplica desde la página, porque Astro aísla los estilos de cada archivo. Se envuelve el contenido en un `div` propio o se usa `:global`.
- El agente `revisor` del método declara las herramientas `mcp__playwright__*`, pero aquí Playwright se llama de otra forma y el agente no tiene terminal. Por eso se lanza como agente general con las instrucciones de `revisor.md`. Conviene corregirlo en `alidifreijo/metodo`.

## Esperando a Ali

- Ver el Bloque 1 en la vista previa.
- Contraste de dos colores de agente: el texto en cian (creative, 4,3:1) y en rosa (collab, 4,2:1) se queda justo por debajo del 4,5:1 recomendado para letra pequeña. Opciones: dejarlo, oscurecer el texto de esas dos parejas o no usar letra pequeña sobre ellos. Es una duda de gusto.
- Cómo se mapeó el estilo, para que lo confirme:
  - menú en Space Grotesk a tamaño texto, en mayúsculas;
  - la «á» a tamaño capítulo;
  - los números de capítulo en una píldora del color del agente, porque el color sobre papel no se lee.
- En `/work`, la fila de Monexa enseña «CaixaBank» como empresa (sale del brief). Confirmar que se puede nombrar.

## Aparcamiento

8 ideas en `DECISIONES.md`.
