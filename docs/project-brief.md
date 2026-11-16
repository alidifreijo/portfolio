# Portfolio de Ali · brief del proyecto

> Documento base para cualquier conversación sobre el portfolio. Léelo entero antes de proponer nada.
> Última actualización: 16 de noviembre de 2026.

---

## 1. Quién es Ali

**Álida Díaz de Freijo Valiño**, firma como **Ali**. Product designer. Nació en 1994 en A Coruña y vive en Barcelona desde 2017, cuando llegó para hacer un máster.

**Ahora.** Senior Product Designer en **Garaje de Ideas**, como contractor externa en **Roche**. Allí trabaja en una familia de productos de plataforma de salud (navify), donde:
- lleva las necesidades de UX de uno de los productos, como diseñadora y sin cargo formal;
- impulsa mejoras en la forma de trabajar del equipo;
- trabaja en la migración del design system: tokens y variables, gobernanza y migración apoyada por IA.

**Antes.**
- **North Digital Studio**, 2023–2026: Team Lead / Senior Product Designer. Coordinaba el equipo UX de proyecto, con mucha carga visual y de UI. Hacía conceptualización, propuestas y presentaciones directas a los leads de cliente (CUPRA, CaixaBank).
- **Capgemini Engineering**, 2020–2023: R&D UX/UI Designer.
- **Ciclus Design Studio**, 2018–2020: Product Design Manager. Producto físico.

**Formación.**
- Grado en Ingeniería de Diseño Industrial (UDC, 2012–2017).
- Máster en Diseño y Desarrollo de Producto (ELISAVA, 2017–2018).

**Docencia.**
- Computer II en ESDi (2019–2020), en inglés.
- Desde octubre de 2026, clases de UI.

**Idiomas.** Español, gallego e inglés.

**Cómo se describe.** Sarcástica, con humor, curiosa e inquieta. Tiene un gato, Galileo. Le gustan los crucigramas, el cine y las series. Hace collage analógico con tijera y pegamento.

**Lo que mejor la define como profesional.** Viene de la ingeniería de producto físico y piensa en sistemas, no en pantallas sueltas. Une investigación, UX y una capa visual muy cuidada. Tiene experiencia coordinando equipos y presentando a cliente, y usa IA (Claude, Figma MCP) en su día a día de diseño.

---

## 2. Por qué estamos haciendo esto

El portfolio estaba en **Framer** (alidadiazdefreijo.framer.website). Lo ha pasado a **código propio** por cuatro motivos:
1. Tener el control, sin depender de una plataforma ni de un plugin que dejó de conectar.
2. Poder hacer cosas que en Framer no se pueden: el hmi en vivo, la física de las caras, el crucigrama, el chat de Contact y la entrada a los casos con vídeo.
3. Que el portfolio sea en sí una muestra de cómo trabaja: diseño, dirección y construcción con IA.
4. Poder editar el contenido ella misma desde un panel visual (Keystatic), sin depender de nadie.

**El objetivo del portfolio es que quien lo visite entienda en pocos minutos:**
- quién es Ali y cómo piensa;
- qué ha hecho, con pocos casos y fuertes;
- que tiene un criterio visual y un carácter propios.

**Lo que NO debe transmitir:** que busca trabajo. No está «open to» nada. Como mucho, que está abierta a conocer gente y a colaboraciones.

---

## 3. Tono y copy

- **Todo el contenido de la web va en inglés.** Las conversaciones con Ali, en español informal.
- **Tono:** cálido pero profesional, con humor ácido y seco, estilo *Fleabag*. Puede ser formal o informal, pero siempre con contenido.
- **Regla de oro: o nada, o contenido de valor.**
  - No repetir datos entre páginas.
  - No rellenar huecos.
  - No poner cifras o frases que solo ocupan espacio.
- Cada bloque de un caso tiene que tener un propósito y un orden narrativo.
- **No inventar datos de Ali.** Si falta algo (años, rol, cifras, preferencias), se pregunta o se deja un `[PLACEHOLDER]` visible.
- **Frases propias que ya funcionan, como referencia de voz:**
  - «Yep, that's me.» / «All the vibes I wear and the ones I'm still manifesting.»
  - «I research first, panic later.»
  - «Pretty that nobody can use is just decoration.»
  - «I let AI do the boring bits so the team gets to do the thinking ones.»

---

## 4. Límites que no se cruzan

- **Cupra está bajo NDA.** No se publica material nuevo de Cupra ni se usan sus fotos en montajes nuevos. Solo se puede usar lo que ya estaba publicado.
- **South (fintech) y el hmi no se presentan como pruebas técnicas.** El hmi es un «digital cockpit concept».
- **Material de cliente** (por ejemplo la RFP de North) sirve solo para entender un proyecto, nunca para publicarse.
- **Fuera:** los slides de BNPL de CaixaBank.
- **Datos privados:**
  - El email personal solo aparece donde Ali lo ha puesto: el enlace de contacto en `contact.yaml`.
  - No se publican direcciones ni datos personales que ella no haya puesto.
- **Identidad visual:** sin blur decorativo, sin acuarelas y sin degradados.

---

## 5. Identidad visual y sistema

- **Estructura de cada página:** marco negro (`#070707`) y cabecera fija arriba con:
  - la «á»;
  - el menú en mayúsculas, con flecha en la página actual;
  - «Based in Barcelona» con la hora en directo;
  - «Up for: Meeting people and good collabs». En los casos, esta casilla dice «Case 04 / 06» y el nombre del caso;
  - el email.

  Debajo, un panel claro (papel, `#D4D1CB`) con radio de 12 px.
- **Tipografías:**
  - **Instrument Serif** para titulares grandes, con la primera palabra o la parte importante en cursiva («*Yep,* that's me.», «let's *play*.», «*hmi* display»).
  - **Space Grotesk** en mayúsculas para títulos de bloque, menú y datos destacados.
  - **Satoshi** para la letra pequeña y el texto, a un único tamaño de 13–16 px (`--fs-print`).
- **Color:**
  - Rojo de acento `#E92C30`; en texto sobre papel, `#B0161B` para que se lea.
  - Cada caso tiene su color de acento.
- **Patrón de datos:** etiqueta pequeña gris + valor («Year / 2023»).
- **Elementos propios:**
  - las caras ilustradas de Ali, en línea negra que se colorea al acercarse;
  - los bocadillos dibujados a mano (formas en `src/data/bubbles.ts`), que también se usan como forma plana de color en Work y en la entrada a los casos;
  - la letra manuscrita (Caveat) para notas sueltas.
- **Movimiento:**
  - las palabras entran con un desenfoque breve;
  - las caras tienen física «pesada», lenta;
  - siempre se respeta *reducir movimiento*.

---

## 6. Qué hay hecho (rama `home-v2`)

**Home**
- Las caras están repartidas alrededor del titular. Se colorean, hablan en su bocadillo, se pueden lanzar y chocan entre ellas con física pesada. Un clic lleva a su caso.
- Al hacer scroll, las caras vuelven a su sitio («tidy»), el texto se hace pequeño y sube el índice.

**About**
- Tarjeta con la frase principal, la intro, las frases rojas y «19 [cara] and 94».
- Al acercarse a la cara aparece «Peek inside my head». Es el **easter egg**: el collage de lo que le gusta, con imágenes que se pueden lanzar.
- Debajo, la versión larga: «In short», «Experience» (desplegables) y «How I work» (pestañas).

**Work**
- Los casos son **objetos recortados** en una diagonal. El scroll los desplaza como un travelling, inspirado en Cartier, *Le Chœur des Pierres*.
- Al pasar el ratón aparece detrás la forma plana del color del caso. Al hacer clic, esa forma crece hasta llenar la pantalla y abre el caso.

**Casos**
- Si el caso tiene vídeo de intro, se abre dentro del panel. Al hacer scroll, el vídeo se encoge hacia la columna izquierda.
- Barra fija con el nombre, los datos, los capítulos y una línea de progreso. A la izquierda, el escenario que acompaña al capítulo, con rayitas para saltar.

**Contact**
- **Crucigrama** de ocho palabras que la resumen, rehecho desde cero, con una versión vertical para móvil.
- Una cara en la esquina abre un **chat** con bocadillos dibujados: el visitante elige preguntas y Ali responde con sus enlaces.

---

## 7. Proyectos

| Caso | Estado | Nota |
|---|---|---|
| **hmi display** | Se queda; caso estrella visual | Concept de cockpit. Hmi animado en vivo, capítulos y película de construcción. Idea futura: montado en coche y un minijuego |
| **Monexa** (bank platform) | Se queda | Acadexa (app para gestionar dinero) + versión desktop donde Exa, el bot rosa, guía al usuario. El amarillo marca lo que ve el asistente y no el usuario. Falta el icono de Exa |
| **Cupra** | Se queda, pendiente de reescribir | Caso de rol y proceso, sin material nuevo, por el NDA |
| **Cut Scenes** | Se queda (exploration) | Web de puzzles con fotogramas de cine, para regalar. Publicada en cut-scenes.vercel.app. Tráiler como vídeo de intro |
| **Cutouts** | Se queda (exploration), caso en borrador | Collages analógicos y «make your own mess». Publicada en cut-outs.vercel.app. Reel como vídeo de intro |
| **Silena** | Entra cuando Ali diga que está terminada | Web de producto concept basada en la lámpara VARMBLIXT de IKEA |
| **South** (fintech) | Propuesta: archivar | Se pisa con Monexa. Pendiente de que Ali lo confirme |

**Idea abierta:** un caso corto sobre cómo trabaja en Roche (design systems, producto regulado), sin pantallas confidenciales.

---

## 8. Cómo está montado

- **Repo:** `alidifreijo/portfolio` (GitHub). Astro, con contenido en YAML editable en **Keystatic**.
- **Rama de trabajo:** `home-v2`. Producción en `main`.
- **Hosting:** Vercel. Cada rama tiene su vista previa: `portfolio-git-<rama>-alidifreijo.vercel.app`.
  - Producción: https://portfolio-alidifreijo.vercel.app/
- **Contenido:**
  - `src/content/pages/*.yaml` para home, about y contact;
  - `src/content/projects/*.yaml` para los casos, cada uno con `object`, que es su recorte en Work, e `introVideo`.
- **Vídeos:** se sirven en 1080p, con AV1 (`.webm`) y H.264 (`.mp4`) de respaldo y un póster.
- **Commits:** a nombre de Ali, con la línea de coautoría de Claude.
- **Figma de trabajo:** «Portfolio v2 · main screens», con las ocho pantallas principales importadas como capas editables. Ali ajusta allí y luego se pasa a código.
- **Canvas de propuestas:** «Portfolio · South y Monexa · merge», con las propuestas de Home, About, Case, Work y las pruebas de animación.

---

## 9. Pendientes

1. **Recortes de copy.** Quitar repeticiones:
   - Barcelona sale en muchos sitios;
   - la experiencia y las capacidades aparecen triplicadas;
   - las cifras «BCN» y «3 languages» repiten otros datos;
   - el segundo párrafo de la intro del About repite lo que ya cuentan las frases rojas y el collage.
2. **Corregir incoherencias:**
   - Cupra dice «2023 – Today», pero North termina en 2026;
   - «Teaches UI» no aparece en Learn & teach.
3. **Archivar South**, si Ali lo confirma.
4. **Reescribir Cupra** como caso de rol y proceso.
5. **Objetos recortados definitivos.** Los actuales son borradores y Ali los hará en Figma.
6. **Capítulos para los demás casos** (contexto → proceso → resultado), como el hmi.
7. **Contact en móvil:** la cara tapa parte de las pistas.
8. **Datos por confirmar:** años y rol del hmi, y la lista de clientes.
