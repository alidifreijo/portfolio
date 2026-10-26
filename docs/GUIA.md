# Guía del portfolio

Todo lo que necesitas para mantener la web sin depender de nadie. Si algo de aquí deja de ser verdad, actualízalo.

---

## 1. Cómo está montado

| Pieza | Qué hace |
|---|---|
| **Astro** | Genera la web. Cada página es un archivo en `src/pages`. |
| **Keystatic** | El editor visual en `/keystatic`. Guarda el contenido como archivos de texto (YAML) en `src/content`. |
| **GitHub** (`alidifreijo/portfolio`) | Guarda todo: código, textos e imágenes. Cada cambio es un *commit*. |
| **Vercel** | Publica la web. Cada vez que algo cambia en GitHub, la web se actualiza sola en un minuto. |

```
src/
  styles/tokens.css     ← EL SISTEMA: colores, tipos, espacios, radios, motion
  styles/base.css       ← estilos de texto (.t-display, .t-body…) y animaciones
  components/           ← piezas reutilizables (Card, Tag, Button, Carousel, Blocks…)
  components/project/   ← partes de la plantilla de proyecto (hero, título, next)
  layouts/Base.astro    ← lo común a todas las páginas (menú, head, animaciones)
  pages/                ← home, about, work, contact, styleguide, 404
  pages/work/[slug]     ← LA plantilla de todos los proyectos
  content/projects/     ← un archivo por proyecto (lo editas en Keystatic)
  content/pages/        ← textos de home, about, work y contact
public/images/          ← imágenes y vídeos
docs/GUIA.md            ← esta guía
```

---

## 2. El día a día: editar en Keystatic

1. Entra en **tudominio.com/keystatic** (la primera vez te pedirá conectar con GitHub).
2. Elige **Projects** o una página (**Home, About, Work, Contact**).
3. Edita, sube imágenes o vídeos y pulsa **Save**.
4. Keystatic guarda el cambio en GitHub y Vercel lo publica en ~1 minuto.

**Formato de texto** en los campos largos:
- `**negrita**` → **negrita**
- una línea en blanco → párrafo nuevo

### Añadir un proyecto nuevo

1. **Projects → Add**.
2. Rellena la cabecera: título (en minúsculas), *Title as shown*, tipo (*Client case* o *Exploration*), color de acento, intro, teaser, cover, hero (+ estilo) y meta cards.
3. Deja **Status: Draft** mientras trabajas. No aparece en la web hasta que lo pases a **Published**.
4. Añade **bloques** (sección 4) siguiendo el orden recomendado (sección 3).
5. **Order** decide la posición: clientes del 1 al 9, exploraciones del 10 en adelante. El bloque *Next* sigue ese orden.

### Imágenes y vídeos

- Formatos: JPG para fotos, PNG para interfaces o transparencias, MP4 para vídeo.
- Tamaño: máximo 2400 px de ancho, menos de 1 MB por imagen y menos de 6 MB por vídeo.
- Nombres descriptivos, en minúsculas y con guiones: `cockpit-night.jpg`, no `IMG_2034.jpg`.
- Escribe siempre la **descripción (alt)**. La lee quien no ve la imagen y también ayuda al SEO.
- Para cada vídeo, si puedes, sube también una imagen con el mismo nombre terminada en `.poster.jpg`. Es lo que se ve mientras carga.

---

## 3. La plantilla de proyecto (una sola para todos)

Todos los proyectos, de cliente o propios, usan **la misma plantilla** (`src/pages/work/[slug].astro`). Si cambias algo en ella o en un bloque, cambia en todos los proyectos a la vez.

**Estructura de la página**
1. **Panel izquierdo fijo** (*Hero*): imagen o vídeo. *Hero style*: *Fill the panel*, *Centred on a colour* o *Video inside a phone* (con *Phone frame*).
2. **Tarjeta de título fija** arriba a la derecha, en el color del proyecto: *Title as shown* (admite `**negrita**`), *Intro*, meta cards a la derecha (*Meta cards width*, 200 por defecto) y botones opcionales (*Buttons*).
3. **Bloques** (ver sección 4).
4. **Next**: sale solo. Es el siguiente proyecto por *Order*; usa su *Teaser*, *Label when shown as Next* e *Image when shown as Next*.

**Orden recomendado de bloques**
1. *Image* o *Video* de contexto.
2. *Image + text card* (rol, arquetipo, necesidades…).
3. Más *Image* / *Video* / *Carousel* con el trabajo.
4. Bloques de historia si hacen falta (*Quote*, *Timeline*, *Details*…).

**Reglas de contenido**
- Siempre visual: cada bloque de texto va junto a algo que se ve.
- Una idea por bloque. Negrita solo para lo que se lee en diagonal.
- Nada que no puedas explicar en una entrevista. Nada bajo NDA.

---

## 4. Los bloques disponibles

| Bloque | Para qué |
|---|---|
| **Image** | Una imagen a todo el ancho, con su proporción. |
| **Video** | Un vídeo en bucle a todo el ancho, con su proporción. Sube también `nombre.poster.jpg`. |
| **Image + text card** | Foto + tarjeta con tag y puntos. Sin foto, la tarjeta ocupa todo el ancho. Estilo *Compact* o *Spaced*. |
| **Carousel** | Galería con flechas y puntos. |
| **Text** | Un párrafo con eyebrow y pill. |
| **Quote** | La frase que resume la dirección, con chips. |
| **List** | Títulos + texto, en 1 a 3 columnas. |
| **Stats** | Números grandes con una línea de contexto. |
| **Image or video** · **Two images or videos** | Pieza con ratio fijo, sola o en pareja. |
| **Mockup · browser** · **Mockup · phones** | Capturas dentro de marcos. |
| **Collection** | Rejilla de imágenes con etiquetas. |
| **Video card** | Vídeo en tarjeta oscura con pie. |
| **Timeline** | Registro de construcción con nota manuscrita. |
| **Details** | 2 a 4 clips pequeños con título y una línea. |

---

## 5. El sistema de diseño

Todo vive en **`src/styles/tokens.css`** y se ve funcionando en **`/styleguide`**. La escala sale del diseño original de Framer.

- **Color**: `--ink`, `--paper`, `--paper-2`, `--surface` (tarjetas oscuras), `--brand`, `--brand-soft` y un acento por proyecto (`--acc-*` + `--on-*`).
- **Tipografía**: Space Grotesk (títulos, etiquetas), Satoshi (texto), DM Sans (botones). Clases: `.t-display`, `.t-title`, `.t-lead`, `.t-heading`, `.t-label`, `.t-body`, `.t-tab`, `.t-small`, `.t-micro`, `.t-ui`, `.t-eyebrow`, `.t-hand`.
- **Espacio**: `--s-1` a `--s-8` (4, 8, 12, 16, 24, 32, 40, 64). 8 entre tarjetas, 12 entre paneles, 24 dentro de una tarjeta, 40 dentro de un panel.
- **Radios**: `--r-xs` 4 (chips), `--r-sm` 8 (tarjetas), `--r-btn` 10 (botones), `--r-md` 12 (paneles), `--r-tab` 18 (pestañas), `--r-pill`.
- **Layout**: `--frame` 12, `--split` (proporción panel/columna), `--tab-h`.
- **Motion**: `--dur-fast/base/slow`, `--ease-out`, `--ease-in-out`, `--ease-spring` (las caras de la home).

**Reglas de oro**
1. Color, tipo, espacio, radio y duración siempre con token. Lo único que se escribe a mano es la geometría propia de un componente (p. ej. dónde va la pantalla dentro del marco del móvil), con un comentario.
2. Si necesitas algo nuevo, añádelo primero como token y después úsalo.
3. Si un componente casi sirve, amplíalo. No lo copies.

### Cambiar algo global
- **Un color**: cambia su valor en `tokens.css`.
- **Un color de acento nuevo**: `--acc-nombre` y `--on-nombre` en `tokens.css`, el nombre en `ACCENTS` (`src/lib/utils.ts`) y la opción en `ACCENT_OPTIONS` (`keystatic.config.ts`).
- **Un tamaño de texto**: cambia la variable `--fs-…` en `tokens.css`.

---

## 6. Trabajar en local (opcional)

```bash
npm install        # la primera vez
npm run dev        # abre http://localhost:4321 y http://localhost:4321/keystatic
npm run build      # comprueba que todo compila antes de subir
```

En local, Keystatic guarda directamente en tus archivos. Después haz commit y push.

---

## 7. Publicar y dominio

- **Vercel → Import project → `alidifreijo/portfolio`**. No hay que tocar nada más: detecta Astro solo.
- Keystatic en la web publicada necesita una **GitHub App**. La primera vez que entres en `/keystatic` en producción, el asistente te guía. Al terminar, añade en Vercel (*Settings → Environment Variables*) las variables que te indique.
- Las URLs antiguas de Framer (`/cupra`, `/fintech`, `/bank-platform`, `/projecthmi`) redirigen solas a `/work/…` (`redirects` en `astro.config.mjs`).
- Las imágenes y vídeos traídos de Framer están en `public/images/f/`.
- Dominio propio: *Vercel → Settings → Domains*.
