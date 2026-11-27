# Guía del portfolio

Todo lo que necesitas para mantener la web sin depender de nadie. Si algo de aquí deja de ser verdad, actualízalo. Actualizada el 27 nov 2026 (sistema v3, Play y Work).

---

## 1. Cómo está montado

| Pieza | Qué hace |
|---|---|
| **Astro** | Genera la web. Cada página es un archivo en `src/pages`. |
| **Keystatic** | El editor visual en `/keystatic`. Guarda el contenido como archivos de texto (YAML) en `src/content`. |
| **GitHub** (`alidifreijo/portfolio`) | Guarda todo: código, textos e imágenes. Cada cambio es un *commit*. |
| **Vercel** | Publica la web. La rama `main` es la web; cada rama tiene su vista previa. |

```
estilos/                    ← EL ESTILO APROBADO (lo decide Ali): LEEME.md y tokens.css
DESIGN.md                   ← las reglas del sistema, en llano
src/
  styles/tokens.css         ← generado desde estilos/ (no se edita a mano)
  styles/tokens.json        ← lo mismo en formato DTCG, para agentes y herramientas
  styles/legacy-tokens.css  ← nombres viejos que aún usan páginas antiguas (se van vaciando)
  styles/system-debt.json   ← lo que las páginas viejas aún incumplen (solo baja)
  styles/base.css           ← reset, clases de texto (.type-*) y animaciones
  components/system/        ← LOS COMPONENTES BASE y su manifest.json
  components/               ← piezas antiguas que aún usan la home, About y Contact
  layouts/Base.astro        ← lo común: cabecera, pie, <head>
  pages/                    ← home, about, contact, styleguide, library, how-this-portfolio-is-built, 404
  pages/play/               ← índice de Play (diagonal) y plantilla de caso Play
  pages/work/               ← índice de Work (filas) y plantilla de empresa
  content/projects/         ← un archivo por caso (Play y Work)
  content/agents/           ← los seis agentes de la home
  content/pages/            ← textos de las páginas
scripts/                    ← tokens.mjs, check-system.mjs, video.sh, relativize.mjs
public/images/              ← imágenes y vídeos
.claude/                    ← skills y agentes (método de Ali y portfolio-system)
```

---

## 2. El día a día: editar en Keystatic

1. Entra en **/keystatic** (la primera vez te pedirá conectar con GitHub).
2. Elige **Projects**, **Agents** o una página (**Home, About, Work, Contact, How it's built, Library**).
3. Edita, sube imágenes o vídeos y pulsa **Save**. Keystatic guarda en GitHub y Vercel publica.

**Formato en los campos de texto largos**
- `**negrita**` · `*cursiva*` (en los títulos en serif, la parte en cursiva es la importante)
- una línea en blanco → párrafo nuevo
- líneas que empiezan por `- ` → lista
- `[texto](/ruta)` → enlace
- `[PLACEHOLDER: …]` sale marcado en rojo a propósito: es lo que falta por escribir.

### Un caso de Play (tus webs)

*Type: Exploration*. Campos que se usan:
- **Title as shown** (`**cut** scenes`), **Intro**, **Meta cards** (Year, Type, Role, Built), **Buttons** (View live…), **Accent colour** (el color de su agente).
- **Intro video**: vídeo a pantalla completa al entrar (opcional).
- **Play · Chapters**: capítulos numerados. Cada uno con título (`What it *is*`), texto y material. **El primer material de cada capítulo va al escenario** (la columna izquierda, que cambia al leer); el resto sale debajo del texto.
- **Object**: el recorte para la diagonal de `/play`. Sin él, sale la *Cover*.
- **Order** decide la posición en `/play` y el *Next case*.

### Un caso de Work (empresas)

*Type: Client case*. Campos que se usan:
- **Work · Company, Years, Role, Via, One line**: la fila de `/work` y la tarjeta de título.
- **Work · 01 Context, 02 Role, 03 Process, 04 Result**: los capítulos. **Work · Chapter titles** cambia sus títulos si hace falta (Roche usa *My role*, *How we worked*, *Outcome*).
- **Work · Material**: imágenes o vídeos, cada uno en su capítulo (*Top* va bajo el título).
- **Order**: Roche 1, CaixaBank 2, Cupra 3.

### Los agentes

**Agents** tiene un archivo por agente: número, nombre, personaje, *line*, *quote*, *Good at*, *Runs on*, *Allergic to*, *Battery* y los botones (*Opens*). Systems abre dos casos. El color sale del nombre del agente.

### Imágenes y vídeos

- Fotos en JPG; interfaces o transparencias en PNG o WebP.
- Máximo 2400 px de ancho y menos de 1 MB por imagen.
- Nombres en minúsculas y con guiones: `cockpit-night.jpg`, no `IMG_2034.jpg`.
- Escribe siempre la **descripción (alt)**.
- Pon el **ancho y alto reales** del material: la caja usa su proporción y nunca recorta.
- **Vídeos:** prepáralos desde el ORIGINAL con `scripts/video.sh original.mov public/images/projects/<caso>/<nombre>`. Saca, con el mismo nombre:
  - el `.mp4` (H.264);
  - el `.webm` (AV1, más nítido y ligero);
  - el `-mobile.mp4` (para móvil);
  - el `.poster.jpg` (un fotograma con contenido).
  
  La web los encuentra sola. Nunca vuelvas a comprimir un vídeo ya comprimido: no mejora.

---

## 3. Las plantillas

| Plantilla | Dónde | Qué es |
|---|---|---|
| Home | `pages/index.astro` | Titular y caras (se rehace con los agentes en el Bloque 4) |
| Play · índice | `pages/play/index.astro` | La diagonal de objetos recortados |
| Work · índice | `pages/work/index.astro` | Filas: empresa, años, rol, via y una frase |
| Caso Play | `pages/play/[slug].astro` | Escenario a la izquierda, capítulos numerados a la derecha |
| Caso Work | `pages/work/[slug].astro` | Manda el texto: contexto, rol, proceso y resultado |
| Página larga | `pages/how-this-portfolio-is-built.astro` (About aún es el antiguo) | Sobre negro: título de sección a la izquierda, contenido a la derecha |
| WIP | `pages/library.astro` | Qué es, por qué y un avance |
| Contact | `pages/contact.astro` | Crucigrama y chat |

Todas comparten la cabecera (Play · Work · About · Contact) y el pie (LinkedIn, CV y Let's talk), que pone `layouts/Base.astro`.

---

## 4. El sistema de diseño

Las reglas, en llano, están en **`DESIGN.md`**. Resumen:

- **Tres familias:** Instrument Serif (la voz: titulares, secciones y capítulos), Space Grotesk (la interfaz: menú, etiquetas y botones) y Satoshi (el texto).
- **Cinco tamaños:** display, sección, capítulo, texto y etiqueta. Clases: `.type-display`, `.type-section`, `.type-chapter`, `.type-text` y `.type-label`.
- **Color:** negro, papel, gris y línea; el rojo; y seis parejas de agente (fondo y texto). Cada caso lleva la de su agente.
- **Reglas:**
  - sin blur, acuarelas ni degradados;
  - sin sombras, salvo la ficha del agente;
  - los datos van como etiqueta gris en mayúsculas + valor;
  - los vídeos nunca se recortan;
  - siempre se respeta «reducir movimiento».

**Componentes base** (`src/components/system/`; qué es cada uno, cuándo usarlo y cuándo no, en `manifest.json`):
- **Estructura:** SiteHeader, Footer, Panel y LongSection.
- **Texto y datos:** Label, DataPair, TitleCard y ChapterHeading.
- **Acción y material:** Button y VideoBlock.
- **Agentes:** AgentCard y AgentChip.
- **Interacción y navegación:** Disclosure, Tabs y NextCase.

Todos se ven funcionando en **`/styleguide`**, que se genera solo.

**Cambiar algo global**
- **Un valor de estilo** (color, tamaño…): cámbialo en `estilos/tokens.css` y ejecuta `npm run tokens`. Es una decisión de gusto: la aprueba Ali.
- **Un componente nuevo**: va en `src/components/system/` y en `manifest.json`. Aparece solo en `/styleguide`.

**La comprobación.** `npm run build` ejecuta antes `npm run check`, que falla si:
- algo usa un color, tamaño, fuente, radio, espacio o sombra que no es un token;
- hay un blur o un degradado;
- aparecen DM Sans, DM Mono o Caveat;
- el manifiesto y los componentes no coinciden.

Las páginas viejas tienen una «deuda» apuntada en `system-debt.json` que solo puede bajar. Al rehacer una página: `npm run check:system -- --shrink`. Si mueves un archivo viejo: `npm run check:system -- --move <viejo> <nuevo>`.

---

## 5. Trabajar en local (opcional)

```bash
npm install          # la primera vez
npm run dev          # http://localhost:4321 y http://localhost:4321/keystatic
npm run check        # el sistema, sin compilar
npm run build        # comprueba y compila
npm run build:static # copia estática en dist-static/, para abrir sin servidor
```

---

## 6. Publicar

- La web es la rama **`main`**. Cada pieza se hace en su rama, con vista previa en Vercel, y solo se une a `main` cuando Ali lo aprueba.
- Keystatic en la web publicada necesita una **GitHub App**. La primera vez que entres en `/keystatic`, el asistente te guía. Las variables que te pida van en *Vercel → Settings → Environment Variables*, nunca en el código.
- Las direcciones antiguas redirigen solas (`redirects` en `astro.config.mjs`):
  - las de Framer (`/cupra`, `/bank-platform`…);
  - las de la v2 (`/work/cut-scenes` → `/play/cut-scenes`, `/work/bank-platform` → `/work/monexa`).
- Dominio propio: *Vercel → Settings → Domains*.
