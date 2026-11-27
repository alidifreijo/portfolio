# Webs sólidas · portfolio (27 nov 2026)

Auditoría con el checklist de Ali, adaptada: este proyecto no tiene Supabase, ni datos de visitantes, ni tareas programadas, así que esas secciones son «No aplica». El código está en la rama `webs-solidas`; nada está en `main`.

Columnas: estado (Hecho, A medias, Falta o No aplica), por qué, y quién lo hace (Claude, en el código; Ali, en los paneles).

## 1. Repositorio

| Punto | Estado | Por qué | Quién |
| --- | --- | --- | --- |
| README como portada (título, enlace, autoría, capturas, What it does, How it's built, Why it holds, Decisions, Run it locally, Credits and license) | Hecho | Reescrito en inglés, con capturas en `docs/images/` | Claude |
| Composición de tres pantallas de móvil | A medias | Hay una sola captura de móvil | Claude, cuando haya material final |
| `LICENSE` MIT solo para el código, con exclusiones | Hecho | Excluye imágenes, vídeos, personajes, textos y fuentes | Claude |
| Barra About del repo (descripción, URL, topics) | Falta | Desde aquí no se pueden tocar los ajustes del repo | Ali (texto abajo) |
| `.vercelignore` | Hecho | `docs/`, `exploraciones/`, `revisiones/`, `assets/`, `.claude/` y el embed viejo de hmi. `estilos/` no va, porque el build lo lee | Claude |
| Árbol limpio en la raíz | Hecho | Raíz con config, README, LICENSE, `DESIGN.md` y los archivos del método | Claude |
| Solo la rama `main` | Falta | Hay ramas viejas (`hmi-case`, `hmi-lab`, `ui-taupe`, `v2-extras`, `home-v2`, `claude/kind-hamilton-3vsph6`) y las ramas de piezas de hoy | Ali (borra las viejas y las ya unidas) |
| Commits en inglés que dicen qué y por qué | Hecho | — | Claude |
| Nada sensible en el código | A medias | El email personal está en la cabecera de la web (lo puso Ali en Contact). **El nombre interno de la plataforma de Roche está en `main` y en el historial**, dentro de `docs/project-brief.md` | Ali decide (ver lista) |
| Secret scanning y push protection | Falta (sin comprobar) | Desde aquí no se pueden leer los ajustes de seguridad del repo | Ali |
| Tamaño del repo | A medias | `revisiones/` ocupa ~106 MB de capturas PNG. Conviene que el revisor guarde JPEG | Ali (decide) y el método |

## 2. Hosting y cabeceras

| Punto | Estado | Por qué | Quién |
| --- | --- | --- | --- |
| Vercel, no GitHub Pages | Hecho | Vercel desde el principio | — |
| GitHub Pages apagado | Falta (sin comprobar) | Desde aquí no se puede ver Settings → Pages | Ali |
| CSP estricta (`script-src 'self'` sin `'unsafe-inline'`, `object-src 'none'`, `base-uri`, `form-action`, `frame-ancestors 'none'`, `upgrade-insecure-requests`) | Hecho | En `vercel.json`. `style-src` lleva `'unsafe-inline'` porque las páginas ponen el color del agente con `style=""` | Claude |
| nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy cerrada, COOP same-origin | Hecho | En `vercel.json` | Claude |
| Ningún script inline ni `on…=` | Hecho | Script de primera pintura movido a `public/js/first-paint.js`; Astro ya no mete scripts en el HTML (`assetsInlineLimit: 0`); quitado el `onclick` de Contact. Solo quedan bloques de datos (`application/json`, `application/ld+json`), que no se ejecutan | Claude |
| Excepciones documentadas | Hecho | `/keystatic` y `/api/keystatic` llevan otra CSP (GitHub API, `'unsafe-inline'` y `'unsafe-eval'` del editor). Documentadas en README y en este archivo | Claude |
| CSP probada con Playwright | Hecho en local | Servidor con las cabeceras de `vercel.json`. Recorridos: home, About (collage), Contact (crucigrama y chat), Play, un caso, Work, styleguide, library, how-built y 404, a 1440 y 390. **Cero violaciones** | Claude. Repetir en la vista previa de Vercel con `curl -sI` (Ali o la próxima sesión) |
| 404 propio | Hecho | — | — |

## 3. Dependencias externas

| Punto | Estado | Por qué | Quién |
| --- | --- | --- | --- |
| Fuentes y librerías autoalojadas | Hecho | Fontsource y Satoshi en el propio sitio; ningún CDN | — |
| Embeds con cookies tras un clic | No aplica | No hay embeds (los de LinkedIn, GitHub y Letterboxd son enlaces) | — |

## 4. Supabase · 5. Tareas programadas

| Punto | Estado | Por qué |
| --- | --- | --- |
| Todo | No aplica | Sin base de datos: el contenido es YAML en el repo (Keystatic). Sin tareas programadas |

## 6. Cuentas de Ali

| Punto | Estado | Quién |
| --- | --- | --- |
| 2FA en Gmail, GitHub y Vercel | Sin comprobar | Ali |
| Códigos de recuperación en el gestor | Sin comprobar | Ali |

## 7. Privacidad y normas

| Punto | Estado | Por qué | Quién |
| --- | --- | --- | --- |
| Página de privacidad | Falta, a decidir | El portfolio no recoge datos de nadie: no hay formularios que guarden nada, ni cuentas, ni cookies. El «chat» de Contact son respuestas fijas. Solo haría falta una página si se activa Vercel Analytics | Ali decide; texto propuesto abajo |
| Normas (house rules) | No aplica | Nadie sube contenido | — |
| LSSI | No aplica | Sin actividad económica | — |

**Texto propuesto si se activa Vercel Analytics** (no publicado: `privacy`, «Privacy», enlazado desde el pie):
- Who: Ali de Freijo, based in Spain · contact: el email de estudio que Ali elija.
- What: no forms, no accounts, no cookies. If analytics is on: anonymous page views counted by Vercel Analytics, without cookies and without storing IP addresses.
- Third parties: Vercel (hosting and analytics), which may process data outside the EU under standard contractual clauses.
- Rights: write to the email to ask anything; complaints to the AEPD.
- Last updated: fecha.

## 8. SEO y compartir

| Punto | Estado | Por qué | Quién |
| --- | --- | --- | --- |
| title, description, canonical, Open Graph y Twitter con imagen 1200×630 | Hecho | Canonical y `og:image` en URL absoluta. **El dominio en `astro.config.mjs` era `alidadiazdefreijo.vercel.app`; ahora es `portfolio-alidifreijo.vercel.app`**, el que dice CLAUDE.md | Claude. Ali confirma el dominio |
| Imagen de compartir actual | Hecho | Captura de la home a 1200×630, sin email ni reloj | Claude |
| JSON-LD `WebSite` | Hecho | Solo en la home | Claude |
| `robots.txt` y `sitemap.xml` con lastmod | Hecho | El sitemap se genera con las páginas y casos publicados; `/keystatic` y `/api` excluidos | Claude |
| Favicons | A medias | `favicon.png` (64 px) y `apple-touch-icon.png` (180 px). Falta `favicon.ico` y los de 48, 192 | Claude, con el dibujo final del icono |
| `noindex` mientras no sea el portfolio público | Decisión de Ali | Hoy se puede indexar. El enlace de Vercel no lo tiene nadie, pero Google puede encontrarlo | Ali decide |
| Search Console | Falta | Cuando sea el portfolio público | Ali |

## 9. Vigilancia

| Punto | Estado | Quién |
| --- | --- | --- |
| Vercel Analytics y Speed Insights | Falta | Ali (panel). Si se activa Analytics, hace falta la página de privacidad |
| UptimeRobot | Falta | Ali |
| Plan de incidentes | Hecho (abajo) | Claude |
| Comprobación final en la web publicada (cabeceras con curl, Playwright, enlaces del pie, `.vercelignore` con 404) | Falta | Cuando se una a `main` |

### Plan de incidentes (sin base de datos)

- **Deploy roto:** Vercel → Deployments → el último bueno → «Promote to Production».
- **Algo publicado por error** (texto o imagen): revertir el commit en GitHub. Vercel vuelve a publicar solo.
- **Cuenta robada:** primero la contraseña y la 2FA de Gmail, luego GitHub y Vercel.
- **Keystatic con permisos de más:** GitHub → Settings → Applications → revocar la app de Keystatic y volver a instalarla.

## Lista para Ali, con los pasos exactos

1. **[GitHub] Nombre interno de Roche en el repo público.** Elige:
   - a) dame el sí para un commit en `main` que solo quite esas dos palabras de `docs/project-brief.md`;
   - b) además, pon el repo en privado: Settings del repo → General → abajo, «Danger Zone» → **Change visibility** → Private. Vercel sigue publicando igual.
   
   Reescribir el historial no lo recomiendo si haces la b.
2. **[GitHub] Comprobar GitHub Pages:** Settings → Pages. Debe decir que está desactivado, con Source en «None». Si pone «Your site is live», ver la sección 2 de la skill.
3. **[GitHub] Secret scanning y push protection:** Settings → Code security → activar «Secret Protection» y «Push protection» (si el repo sigue público).
4. **[GitHub] Barra About:** el ⚙️ junto a «About».
   - Descripción: `A designer's portfolio built like a product: a design system agents can't skip, and a small team of agents.`
   - Web: `https://portfolio-alidifreijo.vercel.app`
   - Topics: `portfolio`, `astro`, `keystatic`, `design-system`, `design-tokens`, `claude-code`, `vercel`.
   - En Settings → General → Features: desactiva Wiki y Projects.
5. **[GitHub] Ramas:** en `/branches`, borra `hmi-case`, `hmi-lab`, `ui-taupe`, `v2-extras`, `home-v2` y `claude/kind-hamilton-3vsph6` (si no las quieres). Las de hoy, cuando se unan.
6. **[Vercel] Analytics:** Project → Analytics → Enable (sin cookies) y Speed Insights. Si lo activas, dime el email para la página de privacidad.
7. **[UptimeRobot] Monitor:** New monitor → HTTPS → `https://portfolio-alidifreijo.vercel.app` → cada 5 min → aviso a tu email → «Test Notification».
8. **[Cuentas] 2FA** en Gmail, GitHub y Vercel, y los códigos de recuperación en tu gestor.
9. **Decide:** `noindex` mientras no sea el portfolio público; dominio de `astro.config.mjs` (puse `portfolio-alidifreijo.vercel.app`).
