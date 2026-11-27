# Estado del proyecto

Actualizado: 2026-11-27 (noche)

## Dónde estamos

Modo Construir. Hoy se han construido los bloques 1 a 3 y una exploración del Bloque 4, en ramas encadenadas. La última, `exploracion-lupa`, contiene todo. **Nada está unido a `main`.**

Cadena de ramas, cada una sale de la anterior: `bloque-1-base` → `bloque-2-contenido` → `bloque-3-media` → `pagina-how-built` → `pagina-biblioteca` → `guia-keystatic` → `auditorias` → `webs-solidas` → `exploracion-lupa`.

## Última pieza cerrada

Webs sólidas (cabeceras de seguridad, SEO, README y licencia), 27 nov, rama `webs-solidas`. La revisión completa de toda la web está en `revisiones/2026-11-27-revision-completa/index.html`:
- **la web, en ámbar:** nada se rompe, pero hay 18 marcas de borrador que impiden publicar;
- **el repo, en rojo,** por el nombre interno de Roche que sigue en `main`.

## Resumen de hoy

1. **Bloque 1 · Base.** Sistema de diseño agéntico:
   - tokens en CSS y DTCG generados desde `estilos/`, `DESIGN.md` y un manifiesto de 15 componentes;
   - la skill `portfolio-system`;
   - una comprobación en cada build;
   - `/styleguide` generado.
   
   Además: menú Play · Work, plantilla de empresa y pie común en todas las páginas. Cambios en estilos: contraste de creative y collab oscurecido; orden de Work: Roche, CaixaBank, Cupra.
2. **Bloque 2 · Contenido.**
   - Roche con el texto de Ali, tal cual.
   - Plantilla Play rehecha con el sistema: Cut Scenes recortado, cutouts corto y Silena nuevo, con capturas de su web.
   - Monexa renombrado.
   - About limpio: fuera el dato «BCN»; Garaje y North enlazan a sus casos; sin blur.
   - Quitado el nombre interno de Roche de `docs/project-brief.md` (solo en las ramas nuevas).
3. **Bloque 3 · Media.**
   - Vídeos con su proporción real y pósters con contenido (se cambiaron 6).
   - Cada vídeo carga solo al acercarse a la pantalla, y la web usa AV1 y versión móvil si existen.
   - `scripts/video.sh`, para exportar desde los originales.
   - Imágenes en AVIF y WebP (`npm run images`).
   - Peso al abrir: About pasa de 4,3 a 0,2 MB; Cupra, de 1,9 a 0,5 MB; Cut Scenes, de 4 a 1,3 MB.
4. **Páginas nuevas:**
   - «How this portfolio is built», con el texto en borrador `[DRAFT FOR ALI]`;
   - la página WIP de la Biblioteca, con `[PLACEHOLDER]`.
   
   Ninguna sale en el menú y las dos llevan `noindex` mientras tengan marcas.
5. **Keystatic y guía:** se pueden editar las empresas (con «via»), los capítulos de Play, How it's built, la Biblioteca y una colección «Agents» con los seis textos aprobados. `docs/GUIA.md` está reescrita.
6. **Auditorías** (`docs/auditorias/2026-11-27.md`):
   - deuda del sistema de 550 a 184, sin cambiar nada visible (capturas idénticas píxel a píxel);
   - contenido: ni palabras prohibidas en la web ni frases de búsqueda de trabajo;
   - Lighthouse en local.
7. **Webs sólidas** (`docs/webs-solidas.md`):
   - CSP estricta sin scripts inline, probada con Playwright con cero violaciones;
   - SEO completo, README como portada, licencia MIT solo para el código y `.vercelignore`.
8. **Exploración de la lupa** (`exploraciones/2026-11-27-lupa/`): 5 variantes sin degradado ni brillo, a 1440 y 390, y la idea de móvil en tres toques.

## A medias

- **Copy pendiente de Ali,** que sale como marcas visibles:
  - Monexa: 3;
  - Cupra: 2;
  - cutouts: 2;
  - Silena: 2;
  - Cut Scenes: 1;
  - Library: 3;
  - How it's built: 5 `[DRAFT FOR ALI]`.
- **Vídeos que hay que exportar desde los originales:**
  - Monexa (todos);
  - Cupra «no drivers»;
  - intro de cutouts (20 MB);
  - AV1 y versiones móviles de Cut Scenes;
  - Silena, que no tiene vídeo.
  
  Tabla en `docs/notas-sesion-2026-11-27.md`.
- **Deuda del sistema** (184): About, Contact, home de caras, índice de Play, crucigrama y collage. Baja al rehacer esas páginas.
- **Bloque 4 · Home de agentes:** sin empezar. La lupa está explorada.

## Siguiente paso

En el chat del Proyecto, Ali contesta la lista de «Esperando a Ali». Lo primero es lo de Roche (punto 1). Después, en Claude Code y modo Construir, desde la rama `exploracion-lupa`:
- se aplican sus respuestas;
- se rellenan los `[PLACEHOLDER]` con su material;
- se pasa el revisor.

Está hecho cuando ninguna página publicada tiene marcas y el revisor no marca «rompe algo». Entonces Ali decide qué ramas se unen a `main`.

## Tareas

- [x] **Bloque 1 · Base:** tareas 1 y 2.
- [~] **Bloque 2 · Contenido:** tareas 4, 5 y 6 y la página WIP. Construido; falta el copy de Ali.
- [~] **Bloque 3 · Media:** tareas 3 y 7. Hecha la parte de código y la página 7 (en borrador); falta exportar los vídeos desde los originales.
- [ ] **Bloque 4 · Home de agentes:** tareas 8 y 9. Exploración de la lupa hecha.

1. [x] Sistema de diseño agéntico y guía de estilo nuevos.
2. [x] Navegación Play / Work y plantilla de empresa.
3. [~] Vídeos: proporción, pósters, carga perezosa y soporte AV1/móvil hechos. Falta exportarlos desde los originales.
4. [~] Work: Roche hecho. Faltan Monexa (reto → resultado) y Cupra (rol y proceso) con el material de Ali.
5. [~] Play: Silena, Cut Scenes y cutouts montados con enlace en vivo. Faltan los textos de Ali y el vídeo de Silena.
6. [x] About limpio y pie común.
7. [~] «How this portfolio is built»: página hecha; el texto está en borrador para Ali.
8. [ ] Home de agentes (v8) con versión móvil. Lupa explorada; falta elegir.
9. [ ] Revisión completa final. Hecha hoy una intermedia: `revisiones/2026-11-27-revision-completa/`.

## Listo para traspaso

Sí.

- Brief aprobado: sí (27 nov).
- Estilo cerrado en `estilos/`: sí (27 nov).
- Lista de tareas: sí (27 nov).

## Probado y descartado en esta sesión

- **Capturas con `astro dev`:** falla la primera carga. Se usa `npm run build:static` servido en local, y `.vercel/output/static` con las cabeceras de `vercel.json` para probar la CSP.
- **Cambiar `#070707` por `var(--ink)` en Contact, About y el crucigrama** cambiaba colores, porque esas zonas redefinen `--ink` en local. Se dejó el valor escrito y se comprobó píxel a píxel.
- **Capas ocultas del escenario Play:** con `visibility: hidden` siguen contando como visibles para el detector, y descargaban vídeo. Ahora llevan `data-stage-layer` y esperan a su capítulo.
- **La imagen `hero2x.jpg` del prototipo** lleva escrita la cabecera vieja («Open to senior and lead product roles»): no se puede usar tal cual en la home.
- **El revisor nuevo** (con terminal) solo se carga en una sesión nueva. En esta se lanzó como agente aparte, con sus instrucciones.

## Esperando a Ali

Por prioridad. Pasos exactos en `docs/webs-solidas.md`, apartado «Lista para Ali».

1. **[Urgente] El nombre interno de Roche está en `main` y en el historial del repo público.** Elige: (a) sí a un commit en `main` que solo quita esas dos palabras; (b) además, poner el repo en privado. Ver `revisiones/2026-11-27-roche-about/`.
2. **«minor account» aparece en CLAUDE.md** (en la propia regla) y el repo es público. ¿Lo reescribimos como «el término interno para cuentas de menores»?
3. **Copy de los casos:**
   - Monexa: el reto dentro de CaixaBank, tu papel, el equipo y el tiempo, el resultado, y si los nombres son inventados;
   - Cupra: el problema, un ejemplo de decisión, el resultado, si las slides se pueden usar y el rol;
   - cutouts y Cut Scenes: las preguntas de `docs/casos/`;
   - Library: qué es, por qué y el avance.
4. **Silena:** las capturas dicen «Designed by Maria Escarmiento». ¿Quién es? Junto con la pregunta de las fotos.
5. **«How this portfolio is built»:**
   - revisar el borrador;
   - ¿primera persona o hablando de «Ali»?;
   - ¿desde dónde se enlaza (pie, About)?
6. **Elegir la lupa** para la home (A a E): `exploraciones/2026-11-27-lupa/capturas/`.
7. **Exportar los vídeos** desde los originales con `scripts/video.sh`. Lista en `docs/notas-sesion-2026-11-27.md`.
8. **Paneles (pasos en `docs/webs-solidas.md`):**
   - GitHub Pages apagado;
   - secret scanning;
   - barra About del repo;
   - borrar las ramas viejas;
   - Vercel Analytics (si lo activas, hace falta la página de privacidad);
   - UptimeRobot;
   - 2FA.
9. **Decisiones de web:**
   - `noindex` para toda la web mientras no sea el portfolio público;
   - el dominio de `astro.config.mjs` (puse `portfolio-alidifreijo.vercel.app`);
   - las sombras de los objetos de `/play` y de las caras de la home, que van contra DESIGN.md;
   - el degradado de la máscara del chat de Contact.
10. **Contenido:**
    - Barcelona sale en la cabecera y en las líneas rojas del About;
    - inglés británico o americano (`organised` / `organized`);
    - «Engineer first, designer since» parece cortada;
    - Cupra: «2023–Today» o «2023–2026».
11. **Retoques vistos por el revisor:**
    - el bocadillo del About tapa líneas rojas en móvil;
    - la cara de Contact tapa pistas a 390 px;
    - la home a 768 px saca una cara del panel (Bloque 4);
    - el crucigrama tiene 103 paradas de tabulador;
    - con la intro de Play delante, Tab va a enlaces tapados;
    - el salto de letra en How it's built (CLS 0,27).
12. **Repo:** `revisiones/` ya ocupa ~106 MB de capturas PNG. ¿El revisor guarda en JPEG a partir de ahora (cambio en `alidifreijo/metodo`)?

### Webs sólidas: resumen

| Sección | Estado | Quién |
| --- | --- | --- |
| 1 · Repositorio (README, LICENSE, árbol, `.vercelignore`) | Hecho en código. Faltan la barra About, las ramas viejas, el secret scanning y el nombre de Roche en `main` | Claude hecho / Ali paneles |
| 2 · Hosting y cabeceras (CSP estricta, sin inline, 404) | Hecho y probado en local; falta comprobarlo en Vercel tras unir a `main`. GitHub Pages sin comprobar | Claude / Ali |
| 3 · Dependencias (todo autoalojado) | Hecho | — |
| 4 · Supabase · 5 · Tareas programadas | No aplica | — |
| 6 · Cuentas (2FA) | Sin comprobar | Ali |
| 7 · Privacidad | Falta decidir: solo hace falta con Vercel Analytics (texto propuesto) | Ali |
| 8 · SEO (canonical, OG, JSON-LD, robots, sitemap) | Hecho. Faltan `favicon.ico`, los iconos 48/192, la decisión de `noindex` y Search Console | Claude / Ali |
| 9 · Vigilancia (Analytics, UptimeRobot, plan de incidentes) | Plan hecho; lo demás falta | Ali |

## Aparcamiento

8 ideas en `DECISIONES.md`.
