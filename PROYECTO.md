# portfolio

Estado del brief: aprobado (27 nov 2026)

## Qué es

El portfolio de Ali, hecho en código propio (Astro, Keystatic, Vercel) y construido como un proyecto de diseño, front y back con un equipo de agentes. Enseña sus exploraciones (webs que ha hecho desde cero) y cómo trabaja con equipos en empresas.

## Para quién

Para cualquiera que quiera hacerse una idea de Ali. Sin decirlo, el contenido se orienta a perfiles senior, a IA aplicada al diseño y a liderar design systems. No es un portfolio de búsqueda de empleo: Ali no está buscando trabajo.

## Narrativa

Tono: cálido y profesional, con humor seco (estilo *Fleabag*). Copy en inglés.
Historia: «Yep, that's me.» Una diseñadora que piensa en sistemas, une investigación, UX y una capa visual muy cuidada, y dirige equipos, también de agentes.
Qué debe sentir quien entra: que en pocos minutos entiende quién es Ali y cómo piensa, que ve pocos casos y fuertes, y que tiene criterio visual y carácter propios.

## Entra en la v1

- Home de agentes (v8), como última pieza. Hasta que esté, se queda la home de caras.
- Dos zonas en el menú: **Play** (sus webs: Cut Scenes, Silena, cutouts) y **Work** (empresas: CaixaBank / Monexa, Cupra, Roche).
- About sin datos repetidos, con «How I work».
- Página «How this portfolio is built».
- Contact: crucigrama y chat.
- Sistema de diseño agéntico, desde cero: tokens, reglas, componentes base y guía de estilo (`/styleguide`), hecho para que los agentes lo lean, lo usen y no puedan saltárselo.
- Vídeos clave reexportados con buena calidad.

## NO entra en la v1

- Plantillas reutilizables para otras webs (Cut Scenes, cutouts, Silena…).
- cutouts como caso completo (va en versión corta).
- Mini proyectos: muñecos animados, letras peludas, hablar con Bob.
- hmi y South.
- Llevar el sistema a Figma.
- Tocar el portfolio de Framer.
- Dominio propio.

## Hecho significa

- En la home se lee el titular entero y cada personaje lleva a algo con sentido.
- En el menú se ven Play y Work, y cada caso abre con su plantilla.
- Ningún dato sale dos veces entre páginas, y no hay ningún «[DRAFT]» ni texto de relleno a la vista.
- Los vídeos se ven nítidos en una pantalla Retina y cargan en móvil.
- A 390, 768 y 1440 px no hay nada tapado, cortado ni desbordado.
- LinkedIn y el CV se encuentran desde cualquier página.
- El revisor no marca nada como «rompe algo».

## Móvil

Se adapta. La home de agentes necesita su propia versión.

## Datos

No hay base de datos. El contenido vive en Keystatic (YAML en el repo). No se guarda nada de quien visita.

## Recursos

Qué dibuja o exporta Ali, formato y tamaño.

- Objetos recortados definitivos para Work, en Figma.
- Originales de los vídeos (o nuevas grabaciones a 2×).
- [PLACEHOLDER: material de Silena y cutouts.]

## Estados y casos límite

- Vacío: no aplica (contenido fijo).
- Cargando: los vídeos enseñan un póster con contenido, nunca negro ni liso.
- Error: un vídeo que no carga deja su póster.
- Sin conexión: no aplica.
- Equipo lento: la física de la home se simplifica.
- Movimiento reducido: sin física ni animaciones de entrada.

## Piezas a construir

El método pide la más arriesgada primero; la home de agentes va al final por decisión de Ali (27 nov).

1. Sistema de diseño y guía de estilo nuevos, desde cero.
2. Navegación Play / Work y plantilla de empresa.
3. Vídeos reexportados.
4. Casos de Work: Monexa, Cupra y Roche.
5. Casos de Play: Silena nuevo, Cut Scenes recortado, cutouts corto.
6. About limpio y pie común.
7. «How this portfolio is built».
8. Home de agentes (v8), con versión móvil. Reparto agente → caso en `DECISIONES.md` (27 nov).
9. Revisión completa en 390, 768 y 1440 px.

## Preguntas abiertas

- Roche: entra en genérico (entorno regulado, design system, gobernanza, IA), sin nombres de producto ni pantallas. Ali aprueba el texto antes de publicar.
