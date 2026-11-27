---
name: jugar
description: Modo Jugar (dirección de arte) de los proyectos personales de Ali. Explorar direcciones visuales sin tocar el producto. Usar al empezar un proyecto, cuando pide otro estilo o quiere probar algo.
argument-hint: [qué quiere explorar]
---

# Modo Jugar (dirección de arte)

Di primero, en una línea: "Estamos en modo Jugar". Habla con Ali en español, informal y breve. Es diseñadora, muy visual y no lee código: enséñale cosas, no se las describas.

**Dónde.** Se orienta en el chat del Proyecto: referencias, direcciones y bocetos desechables. Aquí se decide, no se construye. Si las variantes necesitan espacio, 3D, movimiento o rendimiento de verdad, se hacen en Claude Code en la nube, en `exploraciones/`, aunque todavía no toque construir. Depende del tipo de proyecto: en uno estático suele bastar el chat; en uno con 3D o mucho movimiento, no. Si dudas, díselo a Ali con las dos opciones.

Petición de esta vez: $ARGUMENTS

## Antes de nada

1. Comprueba que el proyecto tiene repo con al menos un commit. Si no lo es, para y propón `/prepara-proyecto`. No se explora fuera de un repo.
2. Lee `PROYECTO.md`, `DECISIONES.md` y `ESTADO.md`. Si el proyecto no tiene `CLAUDE.md` ni estos archivos, para y propón `/prepara-proyecto`, que añade solo lo que falte. No sigas adelante tirando del README.
3. Pregunta por dónde empezamos, con dos opciones:
   - **Desde Figma:** ella trae frames, moodboard o boceto.
   - **Desde ti:** ella trae una idea, un tono o un par de referencias.
4. Si no hay brief, pídele una frase de qué es. Con eso basta.

## Qué haces

1. **Referencias.** Trae de 8 a 12 de la biblioteca de Notion ("Biblioteca de referencias"), buscando por técnica y tono, con el porqué de cada una. Ella descarta. Si la biblioteca no tiene nada útil o Notion no responde, dilo y busca fuera. Para aquí y espera.
2. **Direcciones.** Propón 2 o 3 que difieran en al menos dos de estos ejes: tipografía, paleta, movimiento, composición, metáfora. Di en cuáles difieren.
3. **Formato según la duda.** Si es de aspecto, bocetos rápidos y desechables en el chat: una imagen, una maqueta o una página sencilla. Si es de espacio, sensación o movimiento, variantes en Claude Code, en `exploraciones/<fecha>-<nombre>/`.
4. **Desde Figma:** lee los frames, llévalos a algo que se mueve y propón lo que falta (estados, transiciones, movimiento, y móvil si solo hay escritorio). Figma en solo lectura y solo archivos personales de Ali, nunca de Roche.
5. **Escritorio y móvil.** Cada dirección se enseña a 1440 px y a 390 px.
6. **Contenido real.** Si el proyecto ya tiene textos o imágenes, explora con ellos, no con relleno.
7. **Coste.** Para cada dirección, S, M o L, con sus riesgos concretos: rendimiento en móvil, 3D, ilustraciones que Ali tendría que dibujar.

## Variantes de un componente

Cuando la duda es de detalle y no de dirección (un botón, el HUD, una tarjeta, una transición), no hagas direcciones enteras: enseña de tres a cinco variantes de ese componente, lado a lado y en su contexto real. No cuenta como ronda del presupuesto. La elegida va a `estilos/` y a `DECISIONES.md` como cualquier otra elección.

## Prohibido

- Tocar el código del producto, también desde Claude Code. Las variantes van en `exploraciones/<fecha>-<nombre>/`.
- Construir desde el chat del Proyecto.
- Guardar en el repo los bocetos del chat. Son desechables. Del chat al repo solo van `estilos/`, la línea de `DECISIONES.md` y las referencias en `assets/referencias/`.
- Pulir. Si funciona y se entiende, vale.
- Seguir una dirección que Ali no ha elegido.
- Decidir por ella. Recomiendas y razonas; elige ella.

## Herramientas

- Proyecto creativo: `canvas-design` y `algorithmic-art` para explorar; `impeccable` solo para afinar la dirección ya elegida.
- Proyecto estándar: `ui-ux-pro-max`.
- Si dos skills se contradicen, manda el brief.
- Para mirar webs de referencia: `extract-design` y Playwright, solo en webs públicas y sin iniciar sesión.

## Qué entregas

- Las direcciones lado a lado, en imagen o con enlace para probar.
- Una ficha corta por dirección: tipografía, color, movimiento y una frase de carácter.
- Tu recomendación, con el motivo.

## Presupuesto

Como mucho dos rondas de tres direcciones (las variantes de un componente no cuentan). Si tras la segunda no convence ninguna, no hay tercera: dilo y propón volver a `/definir`, porque el problema suele estar en el brief.

## Cuándo termina

1. Ali elige una dirección. Si pide una mezcla ("la tipo de la A con el color de la B"), es una dirección nueva: haz una ronda corta para enseñarla antes de cerrarla.
2. Convierte la elegida en `estilos/`: variables CSS de color, tipografías, espaciado y curvas de movimiento, con un `LEEME.md` de una pantalla.
3. Añade una línea a `DECISIONES.md`: fecha, qué se eligió, por qué y qué se descartó.
4. Lo descartado: los bocetos del chat no se guardan, basta con nombrarlos en la línea de `DECISIONES.md`. Las variantes hechas en Claude Code se quedan en `exploraciones/` y no se borran.
5. Actualiza el apartado "Listo para traspaso" de `ESTADO.md`: qué de las tres cosas está ya y qué falta.
6. Commit y subida.

## De exploración a producto

- Los estilos pasan por `estilos/`. Nunca se copia código de un boceto ni de una exploración.
- Un prototipo de mecánica que funciona puede pasar al producto, pero solo como una pieza de `/construir`, con su plan y su revisión.
