# Lupa · variantes para la home de agentes (Bloque 4)

Exploración, no producto. Ali elige una lupa antes de construir la home.

- **Qué es:** el prototipo de la radiografía (`../2026-11-agentes-radiografia/`) pasado a los componentes del sistema:
  - la ficha (AgentCard), con dos botones en Systems;
  - el chip (AgentChip);
  - los tokens, sacados del código: `src/styles/tokens.css`;
  - los textos de los seis agentes, sacados de Keystatic: `src/content/agents/`.
- **Cinco lupas, todas sin degradado ni brillo:** el esqueleto se ha aplanado (`skeleton-flat.png`, sin el halo de la imagen original) y se pinta con un color del sistema.
- **Cabecera:** la imagen del prototipo llevaba escrita la cabecera vieja («Open to senior and lead product roles», descartada). Aquí se tapa con la cabecera actual. **Cuando se construya la home, no se puede usar `hero2x.jpg` tal cual.**

| Variante | Cómo es | Captura |
| --- | --- | --- |
| A · Ring | Círculo; dentro, la foto oscurecida en negro plano y el esqueleto en papel; aro del color del agente | `capturas/A-lado-a-lado.jpg` |
| B · Viewfinder | Rectángulo con esquinas de visor en negro; dentro, papel claro y esqueleto en negro | `capturas/B-lado-a-lado.jpg` |
| C · Sticker | Pegatina redonda de papel, un poco girada, con esqueleto en negro y borde del color del agente; no deja ver la foto | `capturas/C-lado-a-lado.jpg` |
| D · Lines | Círculo relleno del color del agente, con líneas de escáner en negro; esqueleto en el color de texto del agente | `capturas/D-lado-a-lado.jpg` |
| E · Film frame | Recuadro con marco grueso del color del agente y la etiqueta del agente encima; dentro, foto oscurecida y esqueleto en su color | `capturas/E-lado-a-lado.jpg` |

Cada captura pone la versión de escritorio (1440) y la de móvil (390) lado a lado, cada una con un agente distinto para ver los colores.

## Móvil: primer toque escanea, segundo abre

`capturas/movil-tres-toques.jpg`
1. **En reposo:** la fila de muñecos se desliza de lado (una escena recortada) y debajo están los seis chips. «Tap a toy to scan it».
2. **Primer toque:** la lupa sobre el muñeco, el chip en su color y la ficha sube desde abajo, con «Tap the toy again to open».
3. **Segundo toque:** abre su caso. Con teclado, Tab lleva a la ficha y Enter abre.

Pendiente para la pieza:
- reducir movimiento (sin barrido, la lupa aparece sin animar);
- una pista de que se puede interactuar;
- el foco con teclado.

## Cómo se regenera

```bash
node exploraciones/2026-11-27-lupa/build.mjs
```

Después se abre `index.html?v=A&a=ops` (o `&w=phone&step=scan`) servido desde esta carpeta.
