# Estilos

Estado: **cerrado** el 27 nov 2026. Sale de las pantallas de Figma «Portfolio v2 · main screens» y de lo que ya funciona en la web. Las variables están en `estilos/tokens.css`; Construir las copia a `src/styles/tokens.css` y rehace `/styleguide` con ellas.

## Base de todas las páginas

Marco negro `#070707` con cabecera fija (la «á», menú, «Based in» con la hora, «Up for: Meeting people and good collabs» y el email). Debajo, panel de papel `#D4D1CB` con radio de 12 px. Pie nuevo en todas las páginas, con LinkedIn, CV y «Let's talk».

## Tipografía: tres familias

- **Instrument Serif:** la voz. Titulares, secciones, capítulos y notas sueltas (en cursiva). La parte importante del titular va en cursiva.
- **Space Grotesk:** la interfaz. Menú, etiquetas, botones, nombres y fichas de agentes.
- **Satoshi:** el texto.

Fuera: DM Sans, DM Mono y Caveat. Las notas a mano se harán con la letra de Ali cuando exista, como imagen o SVG.

Cinco tamaños: display, sección, capítulo, texto y etiqueta (mayúsculas). Nada fuera de la escala.

## Color

- Base: negro, papel, papel claro, gris y línea.
- Rojo `#E92C30`; sobre papel, `#B0161B` para que se lea.
- Seis parejas de agente (fondo y texto). Cada caso usa la de su agente en los números de capítulo, las etiquetas y los hovers. Provisional: se revisará.

## Reglas

- Sin blur decorativo, acuarelas ni degradados.
- Sin sombras, salvo la ficha del agente.
- Patrón de datos único: etiqueta en Space Grotesk mayúscula gris + valor en Satoshi.
- Los vídeos van en cajas con su proporción, nunca recortados, y con un póster con contenido.
- Siempre se respeta «reducir movimiento».

## Componentes base

Cabecera, pie, panel, tarjeta de título (nombre + datos), encabezado de capítulo (número en color + título en serif), bloque de vídeo, ficha de agente, chip de agente, etiqueta, botón negro con flecha de color, fila desplegable, pestañas y «Next case».

## Plantillas

1. **Home:** titular y los 6 agentes; ficha al pasar (radiografía).
2. **Play · índice:** diagonal de objetos recortados.
3. **Work · índice:** filas con empresa, años, rol y una frase.
4. **Caso Play:** escenario a la izquierda y capítulos numerados a la derecha (modelo: caso del hmi).
5. **Caso Work:** manda el texto. Contexto, rol, proceso y resultado.
6. **Página larga:** About y «How this portfolio is built». Título de sección a la izquierda y contenido a la derecha, sobre negro.
7. **WIP:** página de la Biblioteca de referencias. Qué es, por qué y un avance.
8. **Contact:** crucigrama y chat, como ahora.
