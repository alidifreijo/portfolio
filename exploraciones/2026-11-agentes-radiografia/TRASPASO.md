# Traspaso · Muñequitos de peluche + Bob (portfolio)

Contexto para seguir en el chat del Proyecto del portfolio. Todo el contenido del portfolio va en inglés.

## 1. Qué es

- **Familia de peluches:** 6 muñecos de peluche hechos con Gemini a partir de las 6 caras ilustradas del hero de la home ("Yep, that's me."). Son de la misma familia: cara de peluche, gafas ovaladas ahumadas, mono de mohair con bolsillo y puños en un color de acento, y se les ven pies y manos.
- **Bob:** mini proyecto. Es la muñeca del flequillo, viva, con vídeos, personalidad y chat. Ya está publicada como artifact.
- **Hero "mini agents":** en la home, cada muñeco es un agente. Al pasar el ratón se le hace una radiografía (lente con esqueleto, marco de detección y tarjeta de info). Al hacer clic se abre su caso.

## 2. Dónde está cada cosa

### Figma: Portfolio v2 · main screens
https://www.figma.com/design/Ty7Ju5cZnErvhx0xd6yJRO/Portfolio-v2-%C2%B7-main-screens (página "Main screens")

| Nodo | Qué es |
|---|---|
| `50:11` · 01 Home | La home con los 6 muñecos. Los recortes limpios están en "Frame 1" y las elipses "Floor shadow" van centradas bajo los pies. |
| `66:10` · 01 Home · scan · Research agent | Ejemplo de hover sobre la de la gorra (Cupra). |
| `66:223` · 01 Home · scan · Empathy agent | Ejemplo de hover sobre la del brote (Bank platform). |
| `66:9` · Agent chip | Componente con State=Default/Scanning y la propiedad de texto Label. |

Dentro de cada frame de escaneo, en "Scan overlay":
- "X-ray lens": tinte "X-ray tint" #4f8aa3 al 62% y el "Skeleton" en PNG transparente.
- "Lens ring": 3 px en el color del agente.
- "Detection": esquinas de 24 × 2,5 px, contorno fino y la etiqueta (pill) del color del agente.
- "Scan card": la tarjeta de info.
- El titular "Yep, that's me." está en contorno (relleno al 6% y trazo de 1,2 px).

### Artifact de Bob
https://claude.ai/artifact/35gFiiSvvRqEN8MCpYp9UW ("Bob · mini proyecto")

### Repo y web
- Repo `alidifreijo/portfolio` (Astro), desplegado en https://portfolio-alidifreijo.vercel.app/
- Ni Bob ni la radiografía están metidos todavía en el código del portfolio.

## 3. Sistema visual del hover (tokens del portfolio)

**Color por agente**, con la pareja de fondo y texto del portfolio:

| Agente | Personaje | Color (fondo / texto) | Abre |
|---|---|---|---|
| Systems | Bob | mint #a3ffa9 / #113830 | About |
| Research | gorra | amber #e89a3c / #261e13 | Cupra |
| Creative | gorro de pescador | cyan #98e7eb / #146d72 | Contact |
| Ops | melena | sky #86cbf7 / #065486 | Cutouts |
| Empathy | brote | lime #f0fdab / #301d15 | Bank platform (Monexa) |
| Collab | pelo revuelto | rosa #ffa4bf / #9e194c | Cut Scenes |

**Comportamiento del hover:**
- El resto de muñecos se pone en gris suave.
- El titular pasa a solo contorno.
- La lente sigue al cursor, con una línea de escaneo.
- Hay un solo marco de detección, con esquinas negras y una etiqueta tipo "RESEARCH AGENT .98".
- La tarjeta va al lado del muñeco, sin tapar el titular.

**Tarjeta:**
- Fondo paper-2 #eceae5, esquinas de 12 px, línea fina y sombra suave.
- Cabecera en DM Mono: punto de color, nombre y "02/06".
- Frase en Space Grotesk Medium 18 y cita en Instrument Serif cursiva 17.
- Datos en DM Mono: Good at / Runs on / Allergic to / Battery (barra en el color del agente).
- Botón negro "OPEN CUPRA ↗" con la flecha del color del agente.

**Chips bajo los muñecos:** en reposo son texto gris con un punto de color; el que se escanea es una píldora de su color.

**Decisiones tomadas:**
- El mismo esqueleto para todos, de momento. Más adelante se podría cambiar el "órgano" según el agente (ahora es un corazón rosa para todos).
- Escáner claro, no negro.
- Nada de azul eléctrico: todo sale de los tokens del portfolio.

**Pendiente:**
- Móvil: primer toque para escanear y segundo para abrir.
- Foco con teclado.
- Respetar "reduce motion".
- Una pista de que se puede interactuar, como una pasada automática del escáner al cargar.
- Llevar el color de cada agente a su caso: etiqueta de la cabecera, hovers y el botón "Next case".

## 4. Bob · cómo funciona

- **Vídeos:** son clips de Gemini que empiezan y terminan en el mismo fotograma de reposo, así se encadenan sin salto.
  - `c_enter`: entrada.
  - `c_idle`: reposo con respiración sutil.
  - `c_tin`, `c_thold`, `c_tout`: pensar (entrar, mantener, salir). La versión mirando a la izquierda lleva el sufijo `l`.
  - `c_tf` y `c_tr`: hablar, en una toma hacia delante y otra al revés.
  - `c_cafe`: dos sorbitos de café.
  - `c_walk`: paseo.
- **Burbujas:** cojines de mohair hechos con texturas en nine-slice (verde oscuro y menta, los colores del traje), con letras planas encima. Usan pesos y tipografías distintos, y las palabras clave en negrita y cursiva con `**` y `_`. El texto va acompasado con el habla, y las burbujas se colocan para no taparle la cara.
- **Personalidad:** tranquila, irónica sin mala idea y segura. Responde en una o dos frases (35 palabras como máximo), en el idioma del usuario. Le da paz nombrar bien las capas y le quita la paz el "Frame 4582". El prompt completo está en `PERSONA`, dentro de `bob/index.html`.
- **Chat:** ahora usa la IA del artifact (`window.claude`), que solo funciona dentro de Claude. Para meterlo en el portfolio hace falta una función de Vercel con la API key y traducir los textos al inglés. Todavía no está decidido en qué sección iría.
- **Reacción al tocarla:** de momento usa frases ingeniosas (QUIPS).

**Pendiente en Gemini**, cuando vuelva a dejar generar vídeos:
- El paseo, sin la colita de conejo.
- La reacción al tocarla: sin la mancha blanca del golpe y sacudiéndose de verdad, no como una pluma.
- Opcional: el café (la taza aparece de la nada y abre mucho los ojos).
- Más adelante, animar a los otros personajes.

## 5. Archivos de este paquete

- `bob/`: el proyecto de Bob (index.html, engine.js, clips mp4, texturas de cojines, scripts build/prep).
- `radiografia/`: prototipo HTML del hover.
  - `index.html` (se abre en local y está maquetado a 1440×900).
  - Imágenes: `hero2x.jpg`, `notext2x.jpg` (la home sin titular), `skeleton.png` y `type-*.png` (contorno del titular).
  - Fuentes y los scripts `drive.py` / `rec.py` (Playwright) para sacar capturas y grabar.
  - Vídeo `radiografia-agentes-v8.mp4` y el esqueleto original de Gemini.
- `personajes/`:
  - Estáticos alineados de cada muñeco (1920×1080) y `familia-completa.png`.
  - En `recortes-con-sombra/`, los 6 recortes con sombra de contacto, que son los que hay ahora en Figma.
