# Decisiones

Solo se añade, nunca se reescribe. Una línea por decisión: fecha, qué, por qué y qué se descartó.

Las entradas anteriores al 27 nov salen de `docs/historial.md` y de los commits. Donde el historial no tenía fecha, se pone la del commit o «antes del 16 nov».

## Registro

- 2026-10-25 · El portfolio sale de Framer a código propio (Astro + Keystatic + Vercel). Por qué: tener el control, hacer cosas que Framer no deja (física, crucigrama, chat, vídeo) y editar el contenido sin depender de nadie.
- antes del 16 nov · Home: las caras de siempre, que hablan, se lanzan y chocan con física lenta. Titular «*Yep,* that's me.» en Instrument Serif. Al hacer scroll, las caras vuelven a su sitio y sube el índice. Descartado: caras más grandes por defecto y look de plastilina (clay).
- antes del 16 nov · Menú sin la palabra «Menu».
- antes del 16 nov · About: el collage de gustos es un easter egg que sale de la cara («Peek inside my head»); versión larga con desplegables y pestañas. Descartado: reordenar el About (How I work primero y el resume dentro).
- antes del 16 nov · Work: cada caso es un objeto recortado en una diagonal que se recorre con scroll (referencia: Cartier, *Le Chœur des Pierres*). Al entrar, la forma plana del bocadillo crece hasta llenar la pantalla, nítida.
- antes del 16 nov · Plantilla de caso: arriba fija con nombre, datos, capítulos y progreso; a la izquierda el escenario de cada capítulo; vídeo de intro dentro del panel, que se encoge al hacer scroll. Vídeos en 1080p, AV1 + H.264 + póster.
- antes del 16 nov · Contact: mantiene la filosofía del resto de la web. Crucigrama protagonista, rehecho desde cero, con versión vertical para móvil. «Let's talk» es una cara que abre un chat para conocer a Ali, no un «mándame un email».
- antes del 16 nov · Identidad: nada de blur, acuarelas ni degradados.
- antes del 16 nov · Copy: no decir que Ali busca trabajo; el estado es «Meeting people and good collabs». O nada, o contenido de valor. Letra pequeña, pero legible.
- antes del 16 nov · Figma como mesa de trabajo: las pantallas se pasan a Figma, Ali ajusta allí y luego se lleva a código.
- 2026-11-16 · Brief del proyecto en `docs/project-brief.md`.
- 2026-11-16 · Criterio para que un proyecto entre: que sea real, que enseñe algo que otro caso no enseña o que Ali lo defienda sin excusas.
- 2026-11-16 · Lista de casos: Cut Scenes, cutouts, Silena, Monexa y Cupra, en ese orden. Monexa pasa a trabajo profesional (pitch a CaixaBank que se ganó). Descartados: hmi (de momento) y South (se pisaba con Monexa).
- 2026-11-16 · Caras de la home: la del hmi abre cutouts y la de South abre el About. Descartado: «12 designers (summer cover included)».
- 2026-11-17 · `home-v2` unida a `main`. Se trabaja en `main` desde entonces.
- 2026-11-27 · Se adopta el método de trabajo (`alidifreijo/metodo`): se decide en el chat del Proyecto y se construye en Claude Code en la nube, una rama por pieza. Sustituye a «trabajar directamente en main» y a cerrar sesión en `docs/historial.md`.
- 2026-11-27 · Nueva estructura propuesta por Ali: Explorations (sus webs) y una zona de empresas (Cupra, CaixaBank, Roche) más genérica, centrada en procesos de trabajo. Silena entra. Pendiente de cerrar en el brief.
- 2026-11-27 · El portfolio se plantea como un proyecto de diseño, front y back, con un sistema de diseño que alimenta a los agentes, y se explicará en la web cómo se ha construido. Pendiente de cerrar en el brief.

- 2026-11-27 · Cabecera: se mantiene «Up for: Meeting people and good collabs». Descartado: «Open to senior and lead product roles» (salía en el vídeo v8 de la home).
- 2026-11-27 · La guía de estilo y el sistema de diseño se rehacen desde cero. El `/styleguide` actual (v1) no vale.
- 2026-11-27 · La home de agentes (v8) es la última pieza. Vive en Figma y en vídeo; hasta que se construya, se queda la home de caras.
- 2026-11-27 · Público: cualquiera que quiera hacerse una idea de Ali. El contenido se orienta a senior, IA y liderazgo de design systems, sin parecer que busca trabajo.
- 2026-11-27 · Las dos zonas del menú se llaman **Play** (sus webs) y **Work** (empresas). Descartados: «Explorations / Companies» y «Things I made / Teams I've been in».
- 2026-11-27 · Home de agentes: cada muñeco abre el caso que prueba su forma de trabajar. Systems (Bob) → Roche y Monexa (dos botones); Research (gorra) → Biblioteca de referencias (WIP); Ops (melena) → Cupra; Empathy (brote) → Silena; Collab (pelo revuelto) → cutouts; Creative (gorro de pescador) → Cut Scenes. Descartados: el reparto del prototipo v8 (About, Contact…) y los nombres técnicos de agentes (orchestrator, evaluator…), porque no se relacionaban con el caso que abren.

- 2026-11-27 · Color: de momento manda el color de cada agente (el de su cara) también en su caso. Se revisa al cerrar la guía de estilo.
- 2026-11-27 · Brief aprobado. Roche entra en genérico y Ali aprueba su texto antes de publicar.
- 2026-11-27 · Lista de tareas aprobada, agrupada en cuatro bloques: Base, Contenido, Media y Home de agentes.
- 2026-11-27 · Textos de las seis tarjetas de agentes aprobados como primera versión; se revisarán más adelante.
- 2026-11-27 · Estilo v3 cerrado en `estilos/`, a partir de Figma «Portfolio v2 · main screens»: tres familias (Instrument Serif, Space Grotesk, Satoshi), cinco tamaños, colores de agente, sin sombras salvo la ficha del agente, y ocho plantillas. Descartados: DM Sans, DM Mono y Caveat; el `/styleguide` de la v1.
- 2026-11-27 · El sistema de diseño será agéntico: legible por máquina (tokens DTCG, manifiesto de componentes, `DESIGN.md`), con una skill que lo hace cumplir, comprobación automática en cada build y una guía generada desde el código. Cambiar un token es una duda de gusto: lo aprueba Ali.
- 2026-11-27 · Se guardan en el repo los archivos del método, `estilos/` y el paquete de los muñecos: prototipo de la radiografía y Bob en `exploraciones/`, recortes de los personajes en `assets/personajes/`.

- 2026-11-27 · Bloque 1: Roche entra ya como fila en `/work` con lo público (Roche · 2026–now · Senior Product Designer · via Garaje de Ideas) y la frase como `[PLACEHOLDER]`. No se une a `main` hasta que Ali apruebe su texto en el Bloque 2.
- 2026-11-27 · Monexa pasa a `/work/monexa`; `/work/bank-platform` y `/bank-platform` redirigen. El nombre visible se cambia en el Bloque 2.
- 2026-11-27 · Las empresas llevan un campo «via»: Garaje de Ideas para Roche; North para Monexa y Cupra.
- 2026-11-27 · Cada caso usa el color de su agente: Roche y Monexa menta (Systems), Cupra azul cielo (Ops), Cut Scenes cian (Creative), cutouts rosa (Collab). Silena, amarillo lima (Empathy), cuando entre.
- 2026-11-27 · Las páginas viejas pueden seguir con valores fuera de los tokens mientras se rehacen: la comprobación del build guarda un listado de lo que ya incumplen, que no puede crecer y se vacía al rehacerlas.

## Aparcamiento de ideas

- Plantillas de front-end reutilizables para las otras webs de Ali, a partir del sistema del portfolio.
- Bob como mini proyecto: artifact «Bob · mini proyecto» (https://claude.ai/artifact/35gFiiSvvRqEN8MCpYp9UW). Para meterlo en el portfolio hace falta una función de Vercel con clave de API (riesgo: claves y dinero) y pasar sus textos al inglés. Sin sección decidida.
- Animar a los otros cinco muñecos y regenerar en Gemini el paseo y la reacción de Bob.
- Letras «Yep, that's me.» en 3D peludo.
- Premio al resolver el crucigrama de Contact.
- Llevar el sistema de diseño a Figma.
- Enlaces de crédito de Cut Scenes, cutouts y Silena hacia el portfolio.
- hmi como pieza corta (un vídeo y dos líneas).

## Descartado

- hmi display como caso: rama `hmi-case` y `hmi-lab`, y `src/content/projects/hmi.yaml` en borrador.
- South (fintech): `src/content/projects/fintech.yaml` en borrador.
- Marco y menú en tono topo (#A19887): rama `ui-taupe`.
- Caras más grandes por defecto; look de plastilina; reordenar el About; «12 designers».
