# Estado del proyecto

Actualizado: 2026-11-27

## Dónde estamos

Proyecto ordenado con el método en el chat del Proyecto: brief, estilo y tareas aprobados el 27 nov. Rama `main`; todavía no se ha construido nada de la v3.

## Última pieza cerrada

Portfolio v2 (home, about, work, casos y contact), unido a `main` el 17 nov. https://portfolio-alidifreijo.vercel.app/

## Hecho

- Web en código: Astro + Keystatic + Vercel, con redirecciones desde las URL de Framer.
- Home: caras con color al pasar el ratón, bocadillos, física y índice al hacer scroll.
- About: titular, frases rojas, «19 [cara] and 94», easter egg del collage, desplegables de experiencia y pestañas de How I work.
- Work: diagonal de objetos con entrada a pantalla completa.
- Plantilla de caso: vídeo de intro en el panel, barra fija con progreso y columna izquierda.
- Caso de Cut Scenes completo.
- Contact: crucigrama (desktop y móvil, con teclado) y chat con bocadillos.
- Tokens en `src/styles/tokens.css` y guía de mantenimiento en `docs/GUIA.md`.
- Brief largo, historial y una ficha por caso en `docs/`.

## A medias

- cutouts: publicado con «[DRAFT: the full case is still to come.]» y sin enlace en vivo.
- Monexa: tiene el material visual, pero no cuenta el reto ni que se ganó; sigue llamándose «bank platform».
- Cupra: en presente («I work»), «2023 – Today» y sin ejemplos de decisiones.
- Home de agentes (v8): en Figma y en vídeo, fuera del repo. Será la última pieza.
- `/styleguide`: enseña el sistema de la v1 (magenta, sin Instrument Serif). Se rehace desde cero.
- Objetos recortados de Work: borradores.
- Vídeos: bitrate muy bajo (0,25–0,5 Mbps en Monexa y Cupra) y recortados en cajas casi cuadradas.
- CV en `public/cv/`: versión antigua, sin la docencia en ESDi.
- Ramas abiertas sin cerrar: `hmi-case`, `hmi-lab`, `ui-taupe`, `v2-extras`, `home-v2` (ya unida).

## Siguiente paso

En Claude Code en la nube, modo Construir: Bloque 1 · Base (tareas 1 y 2) en la rama `bloque-1-base`. Hecho cuando `src/styles/tokens.css` y `/styleguide` usan `estilos/`, el menú tiene Play y Work y existe la plantilla de empresa, con el revisor sin «rompe algo».

## Tareas

Aprobada el 27 nov. Se construye en cuatro bloques, cada uno en su rama con vista previa:

- **Bloque 1 · Base:** tareas 1 y 2.
- **Bloque 2 · Contenido:** tareas 4, 5 y 6, más la página WIP de la Biblioteca de referencias.
- **Bloque 3 · Media:** tareas 3 y 7.
- **Bloque 4 · Home de agentes:** tareas 8 y 9.

1. Sistema de diseño agéntico y guía de estilo nuevos. Hecho:
   - tokens en `src/styles/tokens.css` y en `tokens.json` (formato estándar DTCG), salidos de `estilos/`;
   - `DESIGN.md` con las reglas en lenguaje llano;
   - un manifiesto de componentes (para qué sirve cada uno, cuándo usarlo y un ejemplo);
   - la skill `portfolio-system` en `.claude/skills/`, que carga todo agente que construye;
   - una comprobación automática en cada build que falla si aparece un color, tamaño o fuente fuera de los tokens, o un blur o degradado;
   - `/styleguide` generado desde los tokens y los componentes, no escrito a mano;
   - el revisor compara cada pieza con el sistema y con capturas de `/styleguide`.
2. Navegación Play / Work y plantilla de empresa. Hecho: Play y Work en el menú; Monexa y Cupra se abren con la plantilla de empresa.
3. Vídeos reexportados. Hecho: nítidos en Retina, póster con contenido, versión móvil.
4. Work: Monexa (reto → resultado), Cupra (rol y proceso), Roche (texto). Hecho: sin datos confidenciales; Ali aprueba el copy.
5. Play: Silena nuevo, Cut Scenes recortado, cutouts corto. Hecho: cada uno con enlace en vivo y vídeo.
6. About limpio y pie común. Hecho: ningún dato repetido; LinkedIn y CV en todas las páginas.
7. «How this portfolio is built». Hecho: el equipo de agentes, el sistema y el proceso, en una página.
8. Home de agentes (v8) con versión móvil. Hecho: titular legible; cada agente lleva a algo con sentido; funciona en 390 px.
9. Revisión completa. Hecho: el revisor sin «rompe algo» en 390, 768 y 1440 px.

## Pendiente (todavía sin empezar)

- Caso de Silena.
- Zona de empresas y texto de Roche.
- Página «How this portfolio is built».
- Sistema de diseño y guía de estilo, desde cero, y la skill del proyecto que los hace cumplir.
- Limpieza de copy (repeticiones e incoherencias del análisis del 27 nov).
- Solapes en móvil (About y Contact) y del chat sobre las pistas en desktop.
- Reexportar los vídeos.

## Listo para traspaso

Sí.

- Brief aprobado: sí (27 nov).
- Estilo cerrado en `estilos/`: sí (27 nov).
- Lista de tareas: sí (27 nov).

## Probado y descartado en esta sesión

Nada.

## Esperando a Ali


## Aparcamiento

6 ideas en `DECISIONES.md`.
