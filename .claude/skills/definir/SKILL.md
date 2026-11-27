---
name: definir
description: Modo Definir (productora) de los proyectos personales de Ali. Convierte una idea en un brief de una página. Usar al empezar un proyecto, ante una función nueva o un cambio de concepto.
argument-hint: [idea o función nueva]
---

# Modo Definir (productora)

Di primero, en una línea: "Estamos en modo Definir". Habla con Ali en español, informal y breve.

Se usa en el chat del Proyecto. No construye.

Petición de esta vez: $ARGUMENTS

## Antes de nada

1. Comprueba que hay repo con al menos un commit. Si no, propón `/prepara-proyecto`.
2. Lee `PROYECTO.md`, `DECISIONES.md` y `estilos/` si existen.
3. Decide qué toca:
   - **Brief completo:** proyecto nuevo o cambio de concepto.
   - **Mini-brief:** una función nueva sacada del aparcamiento. Ve a la sección de abajo.

## Brief completo

1. **Entrevista.** Como mucho siete preguntas, de una en una y con opciones para elegir. Usa el estilo de `grill-me`: pregunta lo incómodo. Si Ali no lo tiene claro, apúntalo como pregunta abierta. No inventes una respuesta.
2. **Escribe `PROYECTO.md`**, que quepa en una página:
   - **Qué es**, en dos frases.
   - **Para quién.**
   - **Narrativa:** tono, historia y qué debe sentir quien entra.
   - **Entra en la v1.**
   - **NO entra en la v1**, con la misma longitud que la lista anterior.
   - **Hecho significa:** criterios que Ali pueda comprobar mirando. Qué se ve y qué pasa al tocar.
   - **Móvil:** se adapta, tiene versión propia o no hay.
   - **Datos:** si de verdad hace falta base de datos, y qué guarda de la gente.
   - **Recursos:** qué dibuja o exporta Ali, en qué formato y tamaño.
   - **Estados y casos límite:** qué se ve vacío, cargando, con error y sin conexión. Si hay 3D: con un equipo lento y sin WebGL.
   - **Piezas a construir**, ordenadas con la más arriesgada primero. Una pieza es algo que se puede ver y probar solo en una vista previa.
   - **Preguntas abiertas.**
3. **Repasa los estados y casos límite con Ali** antes de dar el brief por bueno. Si alguno no tiene respuesta, va a preguntas abiertas.
4. Enséñale el brief y espera su visto bueno. Es una de las tres cosas que aprueba siempre.
5. **Primera lista de tareas.** Con el brief aprobado, escríbela en el apartado "Tareas" de `ESTADO.md`: las piezas del brief en orden, una por línea, con su criterio de hecho en corto. Ali la aprueba. Es una de las dos excepciones a "`ESTADO.md` solo lo escribe `/cierre`".
6. **Listo para traspaso.** Actualiza ese apartado de `ESTADO.md`: qué de las tres cosas está ya y qué falta. Es la otra excepción.

## Mini-brief (función nueva)

Tres líneas añadidas a `DECISIONES.md`:

- Qué es.
- Qué riesgo trae. Mira la lista de riesgos de `CLAUDE.md`: datos, seguridad, dinero, sin vuelta atrás.
- Propuesta: v1 o v2, y por qué.

Ali decide. Si entra en v1, actualiza las listas de `PROYECTO.md`.

## Prohibido

- Escribir código.
- Dar por buena una respuesta vaga.
- Un brief de más de una página.

## Cuándo termina

Ali aprueba el brief y la lista de tareas, todo queda guardado con commit y subida, y hay una línea en `DECISIONES.md` con la fecha y "brief aprobado". Si con esto ya están las tres cosas del traspaso, díselo a Ali: el siguiente paso es Claude Code en la nube.
