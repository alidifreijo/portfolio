# Notas de la sesión del 27 nov (tarde, Ali fuera)

Cuaderno de trabajo mientras Ali no está. `/cierre` lo resume en `ESTADO.md`. Si la sesión se corta, aquí se ve por dónde iba.

## Bloque 3 · Media (rama `bloque-3-media`)

- Las cajas de vídeo (`VideoBlock`) ya usan la proporción real del vídeo, sin recortar, también en móvil. Lo alto (móvil vertical) se estrecha para no pasar del 70 % de la pantalla.
- Ningún vídeo se descarga hasta que está a una pantalla de distancia (`preload="none"` y carga al acercarse). Con «reducir movimiento» no arrancan solos y enseñan sus controles.
- Si existen, se usan solos: `nombre.webm` (AV1), `nombre-mobile.mp4` (versión ligera para móvil) y `nombre.poster.jpg`. Los genera `scripts/video.sh` desde un ORIGINAL (probado).
- Pósters nuevos, sacados de un fotograma con contenido. No se recodificó ningún vídeo. Son estos:
  - Cupra «no drivers»;
  - Cut Scenes: intro, flow, reveal, empty-state y architecture.
- Doble descarga de cutouts: venía de la plantilla vieja (el mismo vídeo como intro y en el panel). Con la plantilla nueva se descarga una vez (comprobado escuchando la red).
- Borrado el código viejo que ya no usaba ninguna página (Blocks, Card, Carousel, DeviceFrame, Media, Tab, Tag, Button viejo, project/*, kits de South). La deuda del sistema baja de 550 a 304.

### Vídeos que hay que volver a exportar desde el original (Ali)

Con `scripts/video.sh original.mov public/images/.../nombre` salen las cuatro versiones.

| Vídeo | Por qué |
| --- | --- |
| Monexa: hero, academia-flow, exa-bot, laptop, variables, identity (`public/images/f/bank/`) | 0,25–0,52 Mbps: se ven blandos en Retina |
| Cupra: no-drivers (`public/images/f/cupra/`) | 0,27 Mbps y 1362×646 |
| cutouts: intro | 7,5 Mbps y 20 MB: pesa demasiado en móvil; falta versión móvil |
| Cut Scenes: intro, flow, reveal, extreme, empty-state, architecture, hero | Bien de nitidez (1,5–2,9 Mbps), pero sin AV1 ni versión móvil (la intro sí tiene AV1) |
| Silena | No tiene vídeo: solo capturas. Falta grabarlo |
