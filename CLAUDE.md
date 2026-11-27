# portfolio

Proyecto personal de Ali: su portfolio en código. Ella decide el gusto; Claude pone el oficio. Ali es diseñadora, muy visual y no lee código. Háblale en español, informal y breve. El copy de la web y del repo va en inglés.

Web en Vercel: https://portfolio-alidifreijo.vercel.app/ (rama `main`). Todavía no es el portfolio público: el público es el de Framer (https://alidadiazdefreijo.framer.website/), y el enlace de Vercel no lo tiene nadie.

## Normas que valen siempre

1. Todo vive en este repo. Nada es oficial si no está aquí.
2. Se decide en el chat del Proyecto «Portfolio» y se construye en Claude Code en la nube. Se pasa a construir cuando hay brief aprobado, estilo cerrado en `estilos/` y lista de tareas en `ESTADO.md`.
3. Una rama por pieza. Commit y subida en cada parada. `main` solo cambia cuando Ali aprueba la publicación.
4. Ninguna clave en el código ni en el chat. Las pone Ali en los paneles.
5. La lista de riesgos obliga a parar.
6. `ESTADO.md` se regenera con `/cierre`. No se edita a mano. Excepciones: `/definir` escribe la primera lista de tareas, y `/jugar` y `/definir` actualizan "Listo para traspaso".
7. Explica en lenguaje llano y con imagen siempre que se pueda.
8. Di en qué modo estamos al empezar y al cambiar.

## Límites de contenido de este proyecto

- No decir que Ali busca trabajo. Como mucho, que está abierta a conocer gente y a colaboraciones.
- Cupra está bajo NDA: solo se usa el material ya publicado.
- Roche: nada confidencial; solo el texto genérico que Ali apruebe.
- Material de cliente (por ejemplo, la RFP de North) sirve para entender, nunca para publicar.
- Nada de blur, acuarelas ni degradados.
- No inventar datos de Ali. Si falta algo, se pregunta o se deja un `[PLACEHOLDER]` visible.
- No publicar datos personales que ella no haya puesto.
- O nada, o contenido de valor: sin relleno y sin repetir datos entre páginas.

## Modos

- `/jugar`: explorar direcciones visuales. No toca el producto. Se orienta en el chat; si las variantes necesitan espacio, 3D o movimiento, se hacen en Claude Code, en `exploraciones/`.
- `/definir`: brief de una página y primera lista de tareas. En el chat. No escribe código.
- `/construir`: el producto, pieza a pieza, con el agente `revisor`. En Claude Code.
- `/cierre`: al acabar la sesión en Claude Code.

Para retomar en Claude Code basta con: "Lee CLAUDE.md y ESTADO.md y dime qué toca".

## Prueba del relevo

Al empezar cada chat, antes de trabajar, lee solo el repo (`ESTADO.md`, `PROYECTO.md`, `DECISIONES.md` y git) y dile a Ali en tres líneas dónde estamos. Si se equivoca algo o falta algo, es lo que no quedó bien guardado: corrígelo en los archivos de estado antes de seguir. Si no hay instrucción clara, pregunta en qué modo seguimos.

## Skills de este proyecto

Skills de terceros instaladas solo para este proyecto, con alcance Project. Como se trabaja en la nube, viven en `.claude/skills/` con su licencia y una nota de origen.

- Ninguna todavía.

## Qué aprueba Ali siempre

- El brief.
- La dirección de arte.
- La publicación de cada versión (unir a `main`).

## Lista de riesgos: para y pregunta

- **Datos:** cambiar tablas o permisos, tocar datos reales. (Este proyecto no tiene base de datos; el contenido está en Keystatic.)
- **Seguridad y privacidad:** subida de archivos, cuentas, claves, datos personales.
- **Dinero:** un servicio de pago o acercarse al límite de un plan gratuito.
- **Sin vuelta atrás:** borrar, publicar en la web real (unir a `main`), reescribir el historial, tocar el Framer.
- **Cambio de alcance:** una función que no está en el brief, o quitar una que sí.
- **Duda de gusto:** algo visual que `estilos/` no resuelve.
- **Límites de contenido** (arriba): cualquier texto sobre búsqueda de empleo, Cupra o Roche.

En todo lo demás: construye, prueba, pasa el revisor y enseña la pieza terminada.

## Enrutador de cambios

| Si Ali dice | Es | Qué haces |
| --- | --- | --- |
| "Más suave", "mueve esto", "otro texto" | Retoque | Al lote de retoques; una sola vista previa al final |
| "¿Y si fuera en otro estilo?" | Otro estilo | `/jugar`: se orienta en el chat; variantes en Claude Code si hace falta, en rama aparte y sin tocar la mecánica |
| "Quiero que además se pueda..." | Función nueva | Al aparcamiento de `DECISIONES.md`; mini-brief al cerrar la pieza |
| "Quita esto" | Quitar función | Actualizar el brief, retirar, revisor alrededor |
| "Esto va de otra cosa" | Cambio de concepto | Cerrar la versión actual y `/definir` de nuevo |
| "Quiero probar una cosa" | Experimento | De aspecto: `/jugar` en el chat, con bocetos desechables. Técnico (3D, scroll, rendimiento): prueba en Claude Code, a `exploraciones/` |

Si no sabes clasificar un cambio, pregunta con dos opciones. Una mezcla de dos direcciones es una dirección nueva: se enseña antes de darla por elegida.

## Archivos

- `PROYECTO.md`: brief. Solo cambia en `/definir`.
- `DECISIONES.md`: decisiones y aparcamiento. Solo se añade.
- `ESTADO.md`: dónde estamos, tareas y si está listo para traspaso. Lo escribe `/cierre`, salvo las dos excepciones de la norma 6.
- `estilos/`: lo que sale de Jugar y usa Construir. En código, los tokens viven en `src/styles/tokens.css` y se ven en `/styleguide`; `estilos/` dice cuáles son los aprobados.
- `exploraciones/`: variantes y pruebas técnicas hechas en Claude Code, también las descartadas. Los bocetos del chat no se guardan.
- `assets/`: recursos exportados por Ali.
- `revisiones/`: informes del revisor. Solo escribe él.
- `docs/project-brief.md`: el brief largo anterior (referencia: quién es Ali, tono, identidad, inventario de proyectos).
- `docs/casos/`: una ficha por caso, con lo que se sabe y lo que falta por contar. Es la materia prima del copy.
- `docs/GUIA.md`: cómo se mantiene la web (Keystatic, bloques, tokens).
- `docs/historial.md`: el registro anterior. Desde ahora, las decisiones nuevas van a `DECISIONES.md`.

## Deshacer

La red de seguridad es git y el panel de Vercel, no el rebobinado de la sesión.
