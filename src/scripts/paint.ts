/**
 * Paint · the way from a face into its case.
 *
 * Each face fills the home panel with its colour in its own medium:
 *   layers   naming layers      → clean sheets that slide in and stack, with soft shadows
 *   chaos    chaos? not on…     → ink splatters, spray and drips, in no order
 *   ripple   empathetic         → watercolour washes that bloom out of the face
 *   hatch    research           → pen cross-hatching coming in from four directions
 *   puzzle   teamwork           → jigsaw pieces that fly in and lock together
 *   brush    creative mess…     → loaded bristle-brush strokes, row by row
 *
 * paint(canvas, kind, colour, cx, cy, duration) → Promise that resolves when the
 * panel is fully covered. Everything is drawn in CSS px on a DPR-scaled canvas.
 */

type Ctx = CanvasRenderingContext2D;
type Painter = { draw: (t: number) => void };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const eOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
const eOut5 = (t: number) => 1 - Math.pow(1 - clamp(t), 5);
const eInOut = (t: number) => { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function hex(c: string) { const h = c.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
/** k < 0 darkens towards black, k > 0 lightens towards white */
function shade(c: string, k: number, a = 1) {
  const [r, g, b] = hex(c);
  const m = (v: number) => Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k);
  return `rgba(${m(r)},${m(g)},${m(b)},${a})`;
}

/** paper / pigment grain, tiled */
function grain(c: Ctx, seed = 1, size = 180) {
  const g = document.createElement('canvas'); g.width = g.height = size;
  const x = g.getContext('2d')!, img = x.createImageData(size, size), r = rng(seed);
  for (let i = 0; i < img.data.length; i += 4) { const v = r(); img.data[i] = img.data[i + 1] = img.data[i + 2] = v > 0.5 ? 255 : 0; img.data[i + 3] = Math.pow(Math.abs(v - 0.5) * 2, 3) * 70; }
  x.putImageData(img, 0, 0);
  return c.createPattern(g, 'repeat')!;
}

/** wobbly closed blob */
function blob(r: () => number, cx: number, cy: number, R: number, rough = 0.25, n = 36) {
  const p = new Path2D(), ph = [r() * 6, r() * 6, r() * 6];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + rough * (0.5 * Math.sin(a * 3 + ph[0]) + 0.3 * Math.sin(a * 5 + ph[1]) + 0.2 * Math.sin(a * 9 + ph[2]));
    const x = cx + Math.cos(a) * R * k, y = cy + Math.sin(a) * R * k;
    i ? p.lineTo(x, y) : p.moveTo(x, y);
  }
  p.closePath();
  return p;
}

// ─────────────────────────────────────────────────────────── brush
// Loaded bristle brush: every stroke is ~80 bristles, each its own thin line
// with its own load of paint, so the ends dry out into streaks.
function brush(c: Ctx, w: number, h: number, col: string): Painter {
  const r = rng(11), rows = 5, rh = h / rows, steps = 90;
  const strokes = Array.from({ length: rows }, (_, i) => {
    const ltr = i % 2 === 0, y0 = rh * (i + 0.5) + (r() - 0.5) * rh * 0.15, bw = rh * 1.45;
    const pts: [number, number][] = [];
    for (let j = 0; j <= steps; j++) {
      const f = j / steps, x = -40 + f * (w + 80);
      pts.push([ltr ? x : w - x, y0 + Math.sin(f * Math.PI * 1.2 + i) * rh * 0.08]);
    }
    const bristles = Array.from({ length: 90 }, () => ({
      o: (r() - 0.5) * bw, lw: 1.2 + r() * 4.5, a: 0.35 + r() * 0.6, k: r() * 0.5 - 0.25,
      load: 0.82 + r() * 0.3, wob: r() * 6,
    }));
    return { pts, bristles, st: i * 0.13 };
  });
  let done = strokes.map(() => 0);
  const G = grain(c, 5);
  return {
    draw(t) {
      strokes.forEach((s, i) => {
        const p = eInOut((t - s.st) / 0.42), upto = Math.floor(p * steps);
        if (upto <= done[i]) return;
        c.lineCap = 'round';
        for (const b of s.bristles) {
          const end = Math.min(upto, Math.floor(b.load * steps));
          if (end <= done[i]) continue;
          c.beginPath();
          for (let j = done[i]; j <= end; j++) {
            const [x, y] = s.pts[j], off = b.o + Math.sin(j * 0.15 + b.wob) * 1.5;
            j === done[i] ? c.moveTo(x, y + off) : c.lineTo(x, y + off);
          }
          // the paint thins out along the stroke
          const left = 1 - (end / steps) / b.load;
          c.strokeStyle = shade(col, b.k * 0.35, b.a * (0.45 + 0.55 * clamp(left + 0.4)));
          c.lineWidth = b.lw;
          c.stroke();
        }
        done[i] = upto;
      });
      if (t > 0.86) { c.fillStyle = shade(col, 0, eOut((t - 0.86) / 0.14)); c.fillRect(0, 0, w, h); }
      c.fillStyle = G; c.globalCompositeOperation = 'source-atop'; c.globalAlpha = 0.25; c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
    },
  };
}

// ─────────────────────────────────────────────────────────── chaos
// Ink splatters: irregular blots with satellite drops and the odd drip,
// landing anywhere, any time, in a few blues.
function chaos(c: Ctx, w: number, h: number, col: string): Painter {
  const r = rng(7), D = Math.hypot(w, h);
  const tones = [shade(col, 0), shade(col, -0.18), shade(col, 0.2), shade(col, -0.35)];
  const blots = Array.from({ length: 70 }, (_, i) => {
    const x = r() * w, y = r() * h, R = (0.03 + Math.pow(r(), 1.6) * 0.13) * D;
    const drops = Array.from({ length: 6 + Math.floor(r() * 12) }, () => ({ a: r() * Math.PI * 2, d: 1.1 + r() * 1.4, s: 0.03 + r() * 0.12 }));
    return { x, y, R, st: Math.pow(r(), 0.8) * 0.68, tone: tones[i % 4], path: blob(r, 0, 0, 1, 0.32, 40), drops, drip: r() < 0.3 ? 0.4 + r() * 1.2 : 0 };
  });
  return {
    draw(t) {
      c.clearRect(0, 0, w, h);
      if (t > 0.5) { c.fillStyle = shade(col, 0, eOut((t - 0.5) / 0.5)); c.fillRect(0, 0, w, h); }
      for (const b of blots) {
        const k = (t - b.st) / 0.22; if (k <= 0) continue;
        // a quick splash: overshoots, settles
        const s = k >= 1 ? 1 : 1 + 2.4 * Math.pow(k - 1, 3) + 1.4 * Math.pow(k - 1, 2);
        c.save(); c.translate(b.x, b.y); c.fillStyle = b.tone;
        c.save(); c.scale(b.R * s, b.R * s); c.fill(b.path); c.restore();
        for (const d of b.drops) {
          const dd = b.R * d.d * eOut(k);
          c.beginPath(); c.arc(Math.cos(d.a) * dd, Math.sin(d.a) * dd, b.R * d.s * clamp(k * 2), 0, Math.PI * 2); c.fill();
        }
        if (b.drip) {
          const L = b.R * b.drip * eOut((t - b.st - 0.12) / 0.5);
          c.lineCap = 'round'; c.strokeStyle = b.tone; c.lineWidth = b.R * 0.18;
          c.beginPath(); c.moveTo(0, 0); c.lineTo(0, b.R * 0.8 + L); c.stroke();
          c.beginPath(); c.arc(0, b.R * 0.8 + L, b.R * 0.13, 0, Math.PI * 2); c.fill();
        }
        c.restore();
      }
    },
  };
}

// ─────────────────────────────────────────────────────────── ripple
// Watercolour: soft washes bloom out of the face, each with a darker rim
// where the pigment pools, a granulated body and little cauliflower blooms.
function ripple(c: Ctx, w: number, h: number, col: string, ox: number, oy: number): Painter {
  const r = rng(3), D = Math.hypot(Math.max(ox, w - ox), Math.max(oy, h - oy)) * 1.15;
  const washes = [0, 0.12, 0.24, 0.36, 0.5].map((st, i) => ({ st, path: blob(r, 0, 0, 1, 0.08 + r() * 0.05, 64), a: i === 4 ? 1 : 0.32, rot: r() * 6, blooms: Array.from({ length: 10 }, () => ({ a: r() * Math.PI * 2, s: 0.04 + r() * 0.06 })) }));
  const G = grain(c, 9, 140);
  return {
    draw(t) {
      c.clearRect(0, 0, w, h);
      for (const wsh of washes) {
        const k = eOut5((t - wsh.st) / 0.62); if (k <= 0) continue;
        const R = D * k * (wsh.a === 1 ? 1 : 0.6 + wsh.st);
        c.save(); c.translate(ox, oy); c.rotate(wsh.rot);
        c.save(); c.scale(R, R);
        c.fillStyle = shade(col, 0.05, wsh.a); c.fill(wsh.path);
        // pigment pools at the edge
        c.lineWidth = 0.035; c.strokeStyle = shade(col, -0.22, 0.35 * (1 - k * 0.4)); c.stroke(wsh.path);
        c.restore();
        c.fillStyle = shade(col, -0.1, 0.25 * (1 - k));
        for (const b of wsh.blooms) { c.beginPath(); c.arc(Math.cos(b.a) * R * 0.97, Math.sin(b.a) * R * 0.97, R * b.s, 0, Math.PI * 2); c.fill(); }
        c.restore();
      }
      c.globalCompositeOperation = 'source-atop'; c.fillStyle = G; c.globalAlpha = 0.5; c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
    },
  };
}

// ─────────────────────────────────────────────────────────── hatch
// Research: pen hatching arrives from four directions at four angles; as the
// lines cross, the tone builds up under them until the panel is solid.
function hatch(c: Ctx, w: number, h: number, col: string): Painter {
  const r = rng(21), sets = [
    { ang: 0, from: 'left', st: 0 }, { ang: Math.PI / 2, from: 'top', st: 0.08 },
    { ang: Math.PI / 4, from: 'right', st: 0.16 }, { ang: -Math.PI / 4, from: 'bottom', st: 0.24 },
  ];
  const D = Math.hypot(w, h), gap = 9;
  const lines = sets.flatMap((s, si) => {
    const n = Math.ceil(D / gap) + 2, out = [];
    for (let i = 0; i < n; i++) {
      const o = -D / 2 + i * gap + (r() - 0.5) * 3;
      const cx = w / 2 + Math.cos(s.ang + Math.PI / 2) * o, cy = h / 2 + Math.sin(s.ang + Math.PI / 2) * o;
      const dx = Math.cos(s.ang) * D * 0.6, dy = Math.sin(s.ang) * D * 0.6;
      const flip = s.from === 'right' || s.from === 'bottom';
      out.push({ x0: flip ? cx + dx : cx - dx, y0: flip ? cy + dy : cy - dy, x1: flip ? cx - dx : cx + dx, y1: flip ? cy - dy : cy + dy, st: s.st + (i / n) * 0.18 + r() * 0.05, lw: 1.2 + r() * 1.8, a: 0.55 + r() * 0.4, tone: si % 2 ? -0.25 : -0.1, wob: r() * 9 });
    }
    return out;
  });
  const prog = lines.map(() => 0);
  return {
    draw(t) {
      c.lineCap = 'round';
      lines.forEach((l, i) => {
        const p = eInOut((t - l.st) / 0.3); if (p <= prog[i]) return;
        const a = prog[i], b = p, segs = 6;
        c.beginPath();
        for (let j = 0; j <= segs; j++) {
          const f = a + ((b - a) * j) / segs, x = l.x0 + (l.x1 - l.x0) * f, y = l.y0 + (l.y1 - l.y0) * f;
          const n = Math.sin(f * 40 + l.wob) * 0.8;
          j ? c.lineTo(x + n, y - n) : c.moveTo(x + n, y - n);
        }
        c.strokeStyle = shade(col, l.tone, l.a); c.lineWidth = l.lw; c.stroke();
        prog[i] = p;
      });
      if (t > 0.45) { c.globalCompositeOperation = 'destination-over'; c.fillStyle = shade(col, 0, eOut((t - 0.45) / 0.4)); c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over'; }
      if (t > 0.88) { c.fillStyle = shade(col, 0, eOut((t - 0.88) / 0.12)); c.fillRect(0, 0, w, h); }
    },
  };
}

// ─────────────────────────────────────────────────────────── puzzle
// Teamwork: real jigsaw pieces fly in from four corners of the team, turn,
// land with a little settle; when all are in, the seams disappear.
function puzzle(c: Ctx, w: number, h: number, col: string): Painter {
  const r = rng(5), cols = 8, rows = Math.max(4, Math.round((cols * h) / w)), pw = w / cols, ph = h / rows;
  const hz = Array.from({ length: rows + 1 }, (_, y) => Array.from({ length: cols }, () => (y === 0 || y === rows ? 0 : r() < 0.5 ? 1 : -1)));
  const vt = Array.from({ length: rows }, () => Array.from({ length: cols + 1 }, (_, x) => (x === 0 || x === cols ? 0 : r() < 0.5 ? 1 : -1)));
  // one side of a jigsaw edge, from (0,0) to (L,0), tab of direction d
  const edge = (p: Path2D, x0: number, y0: number, x1: number, y1: number, d: number) => {
    const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy * d, ny = ux * d;
    const P = (a: number, b: number) => [x0 + ux * a * L + nx * b * L, y0 + uy * a * L + ny * b * L] as const;
    if (!d) { p.lineTo(x1, y1); return; }
    const pts = [[0.35, 0], [0.4, 0.05], [0.37, 0.22], [0.5, 0.25], [0.63, 0.22], [0.6, 0.05], [0.65, 0]];
    p.lineTo(...P(pts[0][0], pts[0][1]));
    p.bezierCurveTo(...P(0.42, 0), ...P(pts[1][0], pts[1][1]), ...P(0.38, 0.12));
    p.bezierCurveTo(...P(0.33, 0.25), ...P(0.45, 0.28), ...P(0.5, 0.27));
    p.bezierCurveTo(...P(0.55, 0.28), ...P(0.67, 0.25), ...P(0.62, 0.12));
    p.bezierCurveTo(...P(0.6, 0.05), ...P(0.58, 0), ...P(0.65, 0));
    p.lineTo(x1, y1);
  };
  const seeds = [[0, 0], [1, 0], [0, 1], [1, 1]];
  const pieces: { path: Path2D; x: number; y: number; st: number; fx: number; fy: number; rot: number; tone: string }[] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const p = new Path2D(); p.moveTo(0, 0);
    edge(p, 0, 0, pw, 0, -hz[y][x]);
    edge(p, pw, 0, pw, ph, vt[y][x + 1]);
    edge(p, pw, ph, 0, ph, hz[y + 1][x]);
    edge(p, 0, ph, 0, 0, -vt[y][x]);
    p.closePath();
    const u = (x + 0.5) / cols, v = (y + 0.5) / rows;
    const near = seeds.reduce((a, s) => (Math.hypot(u - s[0], v - s[1]) < Math.hypot(u - a[0], v - a[1]) ? s : a));
    const d = Math.hypot(u - near[0], v - near[1]);
    pieces.push({ path: p, x: x * pw, y: y * ph, st: 0.04 + (0.75 - d) * 0.55 * 0.9 + r() * 0.06, fx: (near[0] - 0.5) * w * 0.5, fy: (near[1] - 0.5) * h * 0.5, rot: (r() - 0.5) * 0.9, tone: shade(col, (r() - 0.5) * 0.12) });
  }
  pieces.sort((a, b) => b.st - a.st);
  return {
    draw(t) {
      c.clearRect(0, 0, w, h);
      const seam = 1 - eOut((t - 0.8) / 0.15);
      for (const pc of pieces) {
        const k = (t - pc.st) / 0.32; if (k <= 0) continue;
        const e = eOut5(k), land = k >= 1;
        c.save();
        c.translate(pc.x + pw / 2 + pc.fx * (1 - e), pc.y + ph / 2 + pc.fy * (1 - e));
        c.rotate(pc.rot * (1 - e)); const s = 1 + 0.12 * (1 - e); c.scale(s, s);
        c.translate(-pw / 2, -ph / 2);
        if (!land) { c.shadowColor = 'rgba(0,0,0,0.25)'; c.shadowBlur = 18 * (1 - e); c.shadowOffsetY = 10 * (1 - e); }
        c.fillStyle = seam < 1 ? shade(col, 0) : pc.tone; c.globalAlpha = clamp(k * 4); c.fill(pc.path);
        c.shadowColor = 'transparent';
        if (seam > 0) { c.globalAlpha = seam; c.lineWidth = 1.5; c.strokeStyle = shade(col, -0.3, 0.6); c.stroke(pc.path); }
        c.restore();
      }
      if (t > 0.9) { c.fillStyle = shade(col, 0, eOut((t - 0.9) / 0.1)); c.fillRect(0, 0, w, h); }
    },
  };
}

// ─────────────────────────────────────────────────────────── layers
// Naming layers: crisp sheets slide in, each one a shade on its way to the
// final colour, with a soft shadow at the leading edge and a hairline.
function layers(c: Ctx, w: number, h: number, col: string): Painter {
  const n = 6;
  const sheets = Array.from({ length: n }, (_, i) => ({
    st: i * 0.11, dir: [1, -1, 1, -1, 1, -1][i], vert: i % 3 === 2,
    tone: shade(col, i === n - 1 ? 0 : 0.35 - i * 0.07),
  }));
  return {
    draw(t) {
      c.clearRect(0, 0, w, h);
      for (const s of sheets) {
        const k = eOut5((t - s.st) / 0.45); if (k <= 0) continue;
        c.save();
        const off = (1 - k) * (s.vert ? h : w) * s.dir;
        c.translate(s.vert ? 0 : off, s.vert ? off : 0);
        c.shadowColor = 'rgba(0,0,0,0.22)'; c.shadowBlur = 40; c.shadowOffsetX = s.vert ? 0 : -s.dir * 12; c.shadowOffsetY = s.vert ? -s.dir * 12 : 0;
        c.fillStyle = s.tone; c.fillRect(0, 0, w, h);
        c.shadowColor = 'transparent';
        c.strokeStyle = shade(col, -0.25, 0.5 * (1 - k)); c.lineWidth = 1;
        c.strokeRect(0.5, 0.5, w - 1, h - 1);
        c.restore();
      }
    },
  };
}

const MAKERS: Record<string, (c: Ctx, w: number, h: number, col: string, ox: number, oy: number) => Painter> = {
  brush, chaos, ripple, hatch, sides: hatch, puzzle, layers,
};

export function paint(cv: HTMLCanvasElement, kind: string, col: string, ox: number, oy: number, duration = 1500, delay = 0): Promise<void> {
  const w = cv.clientWidth, h = cv.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  const c = cv.getContext('2d')!; c.scale(dpr, dpr);
  const p = (MAKERS[kind] || ripple)(c, w, h, col, ox, oy);
  return new Promise((done) => {
    const t0 = performance.now() + delay;
    const frame = (now: number) => {
      const t = clamp((now - t0) / duration);
      if (now >= t0) p.draw(t);
      t < 1 ? requestAnimationFrame(frame) : done();
    };
    requestAnimationFrame(frame);
  });
}
