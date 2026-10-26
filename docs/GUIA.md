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
  components/           ← piezas reutilizables (Card, Tag, Button, Media…)
  layouts/Base.astro    ← lo común a todas las páginas (menú, head, animaciones)
  pages/                ← home, about, work, contact, styleguide, 404
  pages/work/[slug]     ← la plantilla de TODOS los proyectos
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
2. Rellena la cabecera: título (en minúsculas), tipo (*Client case* o *Exploration*), color de acento, lead, intro, teaser, cover, hero y meta cards.
3. Deja **Status: Draft** mientras trabajas. No aparece en la web hasta que lo pases a **Published**.
4. Añade **bloques** (ver sección 4) siguiendo una de las plantillas (sección 3).
5. **Order** decide la posición: clientes del 1 al 9, exploraciones del 10 en adelante. El bloque *Next* sigue ese orden.

### Imágenes y vídeos

- Formatos: JPG para fotos, PNG para interfaces o transparencias, MP4 para vídeo.
- Tamaño: máximo 2400 px de ancho, menos de 1 MB por imagen y menos de 6 MB por vídeo.
- Nombres descriptivos, en minúsculas y con guiones: `cockpit-night.jpg`, no `IMG_2034.jpg`.
- Escribe siempre la **descripción (alt)**. La lee quien no ve la imagen y también ayuda al SEO.
- Para cada vídeo, si puedes, sube también una imagen con el mismo nombre terminada en `.poster.jpg`. Es lo que se ve mientras carga.

---

## 3. Plantillas (qué bloques usar y en qué orden)

### Caso de cliente (diseño original de Framer)
Panel grande fijo a la izquierda, título fijo arriba a la derecha y tarjetas debajo. El bloque *Next* sale solo (siguiente proyecto de cliente por *Order*).

- **Cabecera**: *Title as shown* (admite `**negrita**`, p. ej. `**fintech** app`), intro, 3 meta cards y *Meta cards width* (200 por defecto).
- **Panel izquierdo**: *Hero* + *Hero style* (*Fill the panel*, *Centred on a colour* o *Video inside a phone*) + *Hero background colour* + *Phone frame* si es un móvil.
- **Bloques** (en este orden suelen funcionar bien):
  1. *Case · Image* o *Case · Video* a todo el ancho. Mantienen su proporción.
  2. *Case · Image + text card*: foto + tarjeta con tag y puntos. Sin foto, la tarjeta ocupa todo el ancho. Estilo *Compact* (título en negrita + línea) o *Spaced* (títulos grandes).
  3. *Case · Carousel*: galería con flechas.
- **Cómo aparece como Next**: *Label when shown as Next*, *Image when shown as Next* y el *Teaser*.

### Exploración (proyectos propios)
El modelo es Cut Scenes.

1. *Quote* · **The idea**: el porqué y la regla que lo guía todo.
2. *Mockup · browser* + *Mockup · phones*: la pantalla principal y el móvil.
3. *Collection* (si hay una colección que enseñar).
4. *Video card* · **Screen flow**.
5. *Video card* · **Architecture**.
6. *Timeline* · **Build**: cómo se construyó.
7. *Details*: 2 a 4 clips cortos.

**Reglas de contenido**
- Menos de 400 palabras por proyecto. Si dudas, quita.
- Una idea por bloque.
- Negrita solo para lo que alguien leería en diagonal.
- Nada que no sea verdad o que no puedas explicar en una entrevista.

---

## 4. Los bloques disponibles

| Bloque | Para qué |
|---|---|
| **Case · Image / Video** | Clientes. Una pieza a todo el ancho de la columna. |
| **Case · Image + text card** | Clientes. Foto + tarjeta con tag (roles, requisitos, arquetipo). |
| **Case · Carousel** | Clientes. Galería con flechas y puntos. |
| **Text** | Un párrafo con eyebrow y pill. Tamaño *Body* o *Lead*. |
| **Quote** | La frase que resume la dirección, con chips. |
| **List** | Títulos + texto, en 1 a 3 columnas (roles, decisiones, necesidades). |
| **Stats** | Números grandes con una línea de contexto. |
| **Image or video** | Una pieza a lo ancho. Ratio, pie y etiqueta opcionales. |
| **Two images or videos** | Pareja lado a lado. |
| **Mockup · browser** | Captura dentro de una ventana de navegador. |
| **Mockup · phones** | 1 a 3 capturas de móvil en marcos. |
| **Collection** | Rejilla de imágenes con etiquetas y frase al pasar el ratón. |
| **Video card** | Vídeo en tarjeta oscura con pie (flujos, arquitectura). |
| **Timeline** | Registro de construcción con hitos y nota manuscrita. |
| **Details** | 2 a 4 clips pequeños con título y una línea. |

---

## 5. El sistema de diseño

Todo vive en **`src/styles/tokens.css`**. Puedes verlo funcionando en **`/styleguide`**.

- **Colores**: `--ink`, `--paper`, `--paper-2`, `--brand`, `--brand-soft` y un acento por proyecto (`--acc-copper`, `--acc-mint`…).
- **Tipografía**: Space Grotesk para títulos y etiquetas, Satoshi para texto. Hay 8 estilos: `.t-display`, `.t-title`, `.t-heading`, `.t-label`, `.t-body-l`, `.t-body`, `.t-small` y `.t-eyebrow`.
- **Espacios**: `--s-1` a `--s-8` (4, 8, 12, 16, 24, 32, 48 y 64 px).
- **Radios**: `--r-xs`, `--r-sm`, `--r-md`, `--r-lg` y `--r-pill`.
- **Motion**: duraciones `--dur-fast`, `--dur-base` y `--dur-slow`, y curvas `--ease-out` y `--ease-in-out`. Patrones: `data-reveal` (aparecer), `.lift` (elevar), `.press` (pulsar). Todo se apaga si el usuario pide reducir movimiento.

**Reglas de oro**
1. Nunca escribas un color, tamaño, radio o duración a mano. Usa el token.
2. Si necesitas algo nuevo, añádelo primero como token y después úsalo.
3. Si un componente casi sirve, amplía el componente. No lo copies.

### Cambiar algo global
- **Un color**: cambia su valor en `tokens.css`. Cambia en toda la web.
- **Añadir un color de acento**: añade `--acc-nombre` y `--on-nombre` en `tokens.css`, el nombre en `ACCENTS` (`src/lib/utils.ts`) y la opción en `ACCENT_OPTIONS` (`keystatic.config.ts`).
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
