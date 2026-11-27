---
name: cierre
description: Cierre de sesión en un proyecto personal de Ali. Regenera ESTADO.md desde git, hace commit y sube. Usar al terminar de trabajar o cuando Ali dice que lo deja por hoy.
---

# Cierre de sesión

Se usa en Claude Code en la nube.

`ESTADO.md` se regenera entero cada vez. No se edita a mano ni se le añaden cosas. Las dos excepciones son de `/definir` (la primera lista de tareas) y de `/jugar` y `/definir` (el apartado "Listo para traspaso"); al regenerar, conserva lo que hayan dejado.

1. Mira git: rama actual, cambios sin guardar, últimos commits y ramas abiertas.
2. Si hay cambios sin guardar, dile a Ali cuáles son y haz commit con un mensaje llano. Si están a medias, dilo en el mensaje.
3. Reescribe `ESTADO.md` con este formato, en español y sin jerga:

```markdown
# Estado del proyecto

Actualizado: <fecha>

## Dónde estamos
<Modo, rama y qué se estaba haciendo, en dos líneas.>

## Última pieza cerrada
<Nombre, fecha y enlace a su vista previa o a su revisión.>

## A medias
<Qué queda abierto y en qué rama. "Nada" si no hay.>

## Siguiente paso
<Una sola acción concreta, la primera que toca al volver. Escrita para que una sesión nueva la haga sin más contexto que "Lee CLAUDE.md y ESTADO.md y dime qué toca": dónde (chat del Proyecto o Claude Code), modo, rama, pieza o archivo, y cómo se sabe que está hecho.>

## Tareas
<Lista de piezas en orden, marcando las hechas. La primera la escribe /definir.>

## Listo para traspaso
<Sí o no. Si no, cuál de las tres cosas falta: brief aprobado, estilo cerrado en estilos/, lista de tareas.>

## Probado y descartado en esta sesión
<Lo que se intentó y no funcionó, y por qué, para no repetirlo. "Nada" si no hay.>

## Esperando a Ali
<Decisiones o pruebas que dependen de ella. "Nada" si no hay.>

## Aparcamiento
<Cuántas ideas hay pendientes en DECISIONES.md.>
```

4. Comprueba que `PROYECTO.md` sigue describiendo lo que hay. Si en la sesión se añadió o se quitó algo del alcance y no está reflejado, dilo. No lo cambies tú: eso es de `/definir`.
5. Relee el siguiente paso como si fueras una sesión nueva sin esta conversación, con solo `CLAUDE.md` y `ESTADO.md`. Si para hacerlo necesitarías algo que no está en el repo, añádelo a `ESTADO.md` o al archivo que toque.
6. Commit de `ESTADO.md` y subida.
7. Dile a Ali, en tres líneas: qué ha quedado hecho, qué queda a medias y cuál es el siguiente paso.
