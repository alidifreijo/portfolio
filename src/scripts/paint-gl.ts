/**
 * Paint (three.js) · the way from a face into its case.
 *
 * One full-panel quad with a fragment shader. Each face has its own medium,
 * and the medium is in the texture as much as in the motion:
 *   0 brush   creative mess…  loaded bristle strokes, row by row; streaks, dry ends
 *   1 chaos   chaos? …        ink splats with ragged edges, spray and drips
 *   2 ripple  empathetic      watercolour washes: soft bloom, pigment rim, granulation
 *   3 hatch   research        pen hatching from four sides and four angles
 *   4 puzzle  teamwork        jigsaw pieces landing from the team's corners, seams close
 *   5 layers  naming layers   crisp sheets sliding in, soft shadow, hairline edge
 *
 * paintGL(canvas, kind, colour, ox, oy, duration, delay) → Promise when covered.
 */
import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Vector2, Vector3, NoBlending } from 'three';

const MODES: Record<string, number> = { brush: 0, chaos: 1, ripple: 2, hatch: 3, sides: 3, puzzle: 4, layers: 5 };

const frag = /* glsl */ `
precision highp float;
uniform float uT;
uniform vec2 uRes;
uniform vec2 uO;
uniform vec3 uCol;
uniform int uMode;
varying vec2 vUv;

float h1(float n){ return fract(sin(n*127.1)*43758.5453); }
float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
vec2 h22(vec2 p){ return fract(sin(vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(h2(i),h2(i+vec2(1,0)),u.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*vnoise(p); p=p*2.03+17.1; a*=.5; } return v; }
// smoothstep with the edges in either order (reversed edges are undefined in GLSL)
float ss(float a, float b, float x){ return a<b ? smoothstep(a,b,x) : 1.-smoothstep(b,a,x); }
float eOut(float t){ t=clamp(t,0.,1.); return 1.-pow(1.-t,3.); }
float eOut5(float t){ t=clamp(t,0.,1.); return 1.-pow(1.-t,5.); }
float eIO(float t){ t=clamp(t,0.,1.); return t<.5?4.*t*t*t:1.-pow(-2.*t+2.,3.)/2.; }
vec3 shade(vec3 c, float k){ return k<0. ? c*(1.+k) : c+(1.-c)*k; }

// paper grain: fine, slightly anisotropic
float paper(vec2 px){ return vnoise(px*.9)*.6 + vnoise(px*.23+3.)*.4; }

void main(){
  vec2 px = vUv*uRes;               // pixels, origin bottom-left
  vec2 p = vec2(px.x, uRes.y-px.y); // pixels, origin top-left
  float W=uRes.x, H=uRes.y, t=uT;
  vec3 col=uCol; float a=0.;
  float hgt=0., gloss=0.;   // paint thickness and how wet it shines → lit below

  if(uMode==0){
    // ── bristle brush: 5 rows, alternating direction; every pixel row is a bristle
    float rows=5., rh=H/rows;
    for(int k=0;k<5;k++){
      float i=float(k);
      float yc=rh*(i+.5)+ (fbm(vec2(p.x*.004, i*3.))-.5)*rh*.25;
      float hw=rh*.78 + (fbm(vec2(p.x*.01, i*7.))-.5)*rh*.18;
      float dy=abs(p.y-yc); if(dy>hw) continue;
      bool ltr = mod(i,2.)<.5;
      float x = ltr ? p.x : W-p.x;
      float prog = eIO((t-i*.12)/.46)*(W+160.)-80.;
      float bristle = h1(floor(p.y*.55)+i*91.);            // one value per bristle
      float load = .78+.3*bristle;                           // how far its paint lasts
      float front = prog - (1.-load)*W*.35*(1.-t);
      float streak = vnoise(vec2(x*.012, p.y*.55+i*13.));    // long streaks along the stroke
      float edge = ss(hw, hw*.8, dy);            // ragged sides
      float dry = ss(front, front-60.-90.*bristle, x);
      float cov = edge*dry*ss(.15,.55, streak*.6+bristle*.5+ (1.-dry)*.0 + .25);
      cov = max(cov, edge*ss(front-260., front-420., x)); // well behind the front it's solid
      if(cov>a){ a=cov; col = shade(uCol, (streak-.5)*.22 + (bristle-.5)*.08); hgt = cov*(.35+streak*.9+bristle*.4)*(1.-ss(front-500.,front-900.,x)*.5); }
    }
    col *= .94+.08*paper(p);
    gloss=.7;
  }

  else if(uMode==1){
    // ── ink splatter: ragged blots, satellites, drips; in no order
    float D=length(uRes), n1=fbm(p*.012), n2=vnoise(p*.09);
    float best=0.; float tone=0.;
    for(int k=0;k<64;k++){
      float i=float(k);
      vec2 c=vec2(h1(i*1.7),h1(i*2.9))*uRes;
      float st=h1(i*4.1)*.66;
      float R=(.018+pow(h1(i*5.3),2.2)*.085)*D*(.6+st);
      float g=(t-st)/.16; if(g<=0.) continue;
      float gm=g-1.; float s = g>=1. ? 1. : 1.+2.4*gm*gm*gm+1.4*gm*gm;   // pow() is undefined for negative bases
      vec2 d=p-c; float r=length(d), ang=atan(d.y,d.x);
      float rag = 1.+.35*(fbm(vec2(ang*2.,i))-.5)+.25*(n1-.5);
      float body = ss(R*s*rag, R*s*rag-2., r);
      // spray: small drops in a ring around the blot
      float ring = ss(R*2.6, R*1.1, r)*step(.86 - .1*eOut(g), vnoise(d*.12+i*9.));
      // drip
      float drip = 0.;
      if(h1(i*8.3)<.35){ float L=R*(.5+h1(i*9.1))*eOut((t-st-.1)/.5);
        drip = ss(R*.12,R*.08,abs(d.x+sin(d.y*.05)*3.))*step(0.,d.y)*step(d.y,R*.8+L); }
      float cov=max(body, max(ring, drip));
      float dome = body*sqrt(clamp(1.-r/(R*s*rag),0.,1.)) + drip*.6 + ring*.35;
      if(cov>best){ best=cov; tone=h1(i*3.3); }
      hgt=max(hgt, dome*1.6);
    }
    float fill=ss(.55,1.,t)*ss(.3,.7, n1+ (t-.55)*2.2);
    a=max(best, fill);
    col = shade(uCol, (tone-.5)*.28 - (n2-.5)*.08);
    if(best<fill) col=shade(uCol, (n1-.5)*.12);
    gloss=1.;
  }

  else if(uMode==2){
    // ── watercolour: washes bloom out of the face
    vec2 d=p-uO; float r=length(d), ang=atan(d.y,d.x);
    float Dm=length(max(uO, uRes-uO))*1.18;
    float gran = vnoise(p*.35)*.5+vnoise(p*.9)*.5;
    for(int k=0;k<5;k++){
      float i=float(k), st=i*.11;
      float g=eOut5((t-st)/.62); if(g<=0.) continue;
      float R=Dm*g*(k==4?1.:.55+i*.12);
      float edge=R*(1.+.12*(fbm(vec2(ang*1.6+i*4., i))-.5)+.05*(fbm(p*.01+i)-.5));
      float inside=ss(edge, edge-14., r);
      float rim=ss(edge-26., edge-4., r)*inside;           // pigment pools at the edge
      float wash = (k==4?1.:.42)*inside;
      a = a + wash*(1.-a);
      col = mix(col, shade(uCol, -.2), rim*.55*(1.-g*.5));
    }
    col = shade(col, (gran-.5)*.16);                                // granulation
    col *= .95+.07*paper(p);
    hgt = gran*.25*a; gloss=.1;
  }

  else if(uMode==3){
    // ── research: pen hatching from four directions and four angles
    float inkA=0.;
    for(int k=0;k<4;k++){
      float i=float(k);
      float an = i==0.?0.: i==1.?1.5708: i==2.?.7854:-.7854;
      vec2 dir=vec2(cos(an),sin(an)), nrm=vec2(-dir.y,dir.x);
      vec2 q=p-uRes*.5; float s=dot(q,dir), o=dot(q,nrm);
      float gap=9.; float li=floor(o/gap+.5);
      float wob=(vnoise(vec2(s*.02, li))-.5)*2.4;
      float dl=abs(o-li*gap+wob);
      float lw=.9+h1(li*3.1+i)*1.3;
      float line=ss(lw+.8,lw-.2,dl);
      float flip= (k>=2)? -1.:1.;
      float st=.04+i*.08 + h1(li*7.7+i*3.)*.16;
      float L=length(uRes)*.6;
      float front=-L + eIO((t-st)/.32)*2.*L;
      float drawn=step(s*flip, front);
      float grainy=.7+.3*vnoise(vec2(s*.3,li*5.));
      inkA = max(inkA, line*drawn*grainy*(.6+.4*h1(li+i*11.)));
    }
    float tone=ss(.35,.95,t)*(.55+.45*ss(.2,.8, fbm(p*.006)+ (t-.6)*2.));
    a=max(inkA, tone);
    col = mix(shade(uCol,-.05)*(.95+.06*paper(p)), shade(uCol,-.32), inkA*(1.-ss(.85,1.,t)));
    hgt = inkA*.8 + paper(p)*.15; gloss=.35;
  }

  else if(uMode==4){
    // ── teamwork: jigsaw pieces land from four corners; seams close at the end
    float cols=8., rows=max(4., floor(cols*H/W+.5));
    vec2 cs=vec2(W/cols,H/rows);
    float best=0.; float seam=0.; float sh=0.; float pt=0.;
    for(int yy=-1;yy<=1;yy++) for(int xx=-1;xx<=1;xx++){
      vec2 cell=floor(p/cs)+vec2(float(xx),float(yy));
      if(cell.x<0.||cell.y<0.||cell.x>=cols||cell.y>=rows) continue;
      vec2 uv=(cell+.5)/vec2(cols,rows);
      vec2 s0=vec2(0,0),s1=vec2(1,0),s2=vec2(0,1),s3=vec2(1,1), near=s0; float dm=length(uv-s0);
      if(length(uv-s1)<dm){dm=length(uv-s1);near=s1;} if(length(uv-s2)<dm){dm=length(uv-s2);near=s2;} if(length(uv-s3)<dm){dm=length(uv-s3);near=s3;}
      float st=.04+(.75-dm)*.5+h2(cell)*.06;
      float g=(t-st)/.32; if(g<=0.) continue;
      float e=eOut5(g);
      vec2 ctr=(cell+.5)*cs + (near-.5)*uRes*.5*(1.-e);
      float rot=(h2(cell+3.)-.5)*.9*(1.-e), sc=1.+.12*(1.-e);
      vec2 q=p-ctr; q=mat2(cos(rot),sin(rot),-sin(rot),cos(rot))*q/sc;   // into the piece's frame
      vec2 hq=cs*.5;
      // jigsaw: rectangle, plus tabs out, minus tabs in (tab direction per shared edge)
      float tR = (h2(cell+vec2(1,0)+.5)<.5?1.:-1.), tL = -(h2(cell+.5)<.5?1.:-1.);
      float tB = (h2(cell+vec2(0,1)+9.5)<.5?1.:-1.), tT = -(h2(cell+9.5)<.5?1.:-1.);
      if(cell.x==cols-1.) tR=0.; if(cell.x==0.) tL=0.; if(cell.y==rows-1.) tB=0.; if(cell.y==0.) tT=0.;
      float kr=min(cs.x,cs.y)*.16;
      float rect = step(abs(q.x),hq.x)*step(abs(q.y),hq.y);
      float tabs=0., holes=0.;
      vec2 c1=vec2(hq.x+kr*.7*tR,0.), c2=vec2(-hq.x-kr*.7*tL,0.), c3=vec2(0.,hq.y+kr*.7*tB), c4=vec2(0.,-hq.y-kr*.7*tT);
      if(tR>0.) tabs=max(tabs,step(length(q-c1),kr)); if(tR<0.) holes=max(holes,step(length(q-vec2(hq.x-kr*.7,0.)),kr));
      if(tL>0.) tabs=max(tabs,step(length(q-c2),kr)); if(tL<0.) holes=max(holes,step(length(q-vec2(-hq.x+kr*.7,0.)),kr));
      if(tB>0.) tabs=max(tabs,step(length(q-c3),kr)); if(tB<0.) holes=max(holes,step(length(q-vec2(0.,hq.y-kr*.7)),kr));
      if(tT>0.) tabs=max(tabs,step(length(q-c4),kr)); if(tT<0.) holes=max(holes,step(length(q-vec2(0.,-hq.y+kr*.7)),kr));
      float inside=max(rect*(1.-holes), tabs);
      // seam: distance to the rectangle's border (good enough for a hairline)
      vec2 bd=hq-abs(q); float border=1.-ss(0.,1.6,min(bd.x,bd.y));
      if(inside>0. && st>pt-1.){ best=inside; seam=border*rect*(1.-tabs); pt=st; hgt = inside*(.4+ .6*ss(0.,10.,min(bd.x,bd.y)+tabs*10.))*(1.+ (1.-e)*.8); }
      // shadow while in the air
      vec2 qs=q-vec2(0.,10.*(1.-e)); float sIn=step(abs(qs.x),hq.x)*step(abs(qs.y),hq.y);
      sh=max(sh, sIn*(1.-e)*.35);
    }
    float close=ss(.78,.95,t);
    a=max(best, sh*(1.-best));
    col = best>0. ? shade(uCol, (h2(floor(p/cs))-.5)*.08*(1.-close)) : vec3(0.);
    col = mix(col, shade(uCol,-.3), seam*(1.-close)*.8);
    col *= .96+.06*paper(p*1.4);
    a=max(a, ss(.9,1.,t));
    gloss=.45;
  }

  else {
    // ── naming layers: crisp sheets slide in and stack; soft shadow on the lead edge
    a=0.; float sh=0.;
    for(int k=0;k<6;k++){
      float i=float(k), st=i*.1;
      float g=eOut5((t-st)/.46); if(g<=0.) continue;
      bool vert = mod(i,3.)==2.;
      float dir = mod(i,2.)<.5 ? 1. : -1.;
      float off=(1.-g)*(vert?H:W)*dir;
      vec2 q=p-(vert?vec2(0.,off):vec2(off,0.));
      float inside=step(0.,q.x)*step(q.x,W)*step(0.,q.y)*step(q.y,H);
      // distance outside the leading edge → shadow cast on what's below
      float lead = vert ? (dir>0.? -q.y : q.y-H) : (dir>0.? -q.x : q.x-W);
      float shadow = (1.-inside)*ss(60.,0.,lead)*step(0.,lead)*(1.-g*.6);
      sh = sh*(1.-inside) + shadow*.28;
      if(inside>0.){ a=1.; hgt=i*.35; col=shade(uCol, k==5?0.:.34-i*.065);
        float hair = 1.-ss(0.,1.2, min(min(q.x,W-q.x),min(q.y,H-q.y)));
        col=mix(col, shade(uCol,-.25), hair*.6*(1.-g)); sh=0.; }
    }
    col = mix(col, vec3(0.), sh*a);
    a=max(a, sh);
    gloss=.25;
  }

  // light: relief from the paint thickness, a wet highlight, and a soft
  // diagonal shift in the colour so it feels like matter, not a flat fill
  float settle = 1.-ss(.82,1.,t);
  vec3 n = normalize(vec3(-dFdx(hgt)*5., -dFdy(hgt)*5., 1.));
  vec3 L = normalize(vec3(-.45,.55,.7));
  float diff = .82+.28*dot(n,L);
  float spec = pow(max(dot(reflect(-L,n), vec3(0,0,1)),0.), 28.)*gloss;
  float diag = (vUv.x-vUv.y)*.5;
  vec3 lit = shade(col, diag*.14) * diff + spec*.7;
  col = mix(col, lit, settle);

  a=max(a, ss(.93,1.,t));
  if(t>.93) col=mix(col, uCol, ss(.93,1.,t));
  a=clamp(a,0.,1.);
  gl_FragColor=vec4(col*a, a);   // premultiplied, written as is (no blending)
}`;

const vert = /* glsl */ `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`;

export function paintGL(cv: HTMLCanvasElement, kind: string, colour: string, ox: number, oy: number, duration = 1600, delay = 0): Promise<void> {
  const w = cv.clientWidth, h = cv.clientHeight;
  const renderer = new WebGLRenderer({ canvas: cv, alpha: true, antialias: false, premultipliedAlpha: true, preserveDrawingBuffer: !!(window as any).__paintDebug });
  renderer.setPixelRatio(Math.min(1.5, devicePixelRatio || 1));
  renderer.setSize(w, h, false);
  renderer.setClearColor(0x000000, 0);
  // raw sRGB values on purpose: the shader writes them straight to the screen
  const hx = colour.replace('#', ''), c = new Vector3(...[0, 2, 4].map((i) => parseInt(hx.slice(i, i + 2), 16) / 255));
  const mat = new ShaderMaterial({
    vertexShader: vert, fragmentShader: frag, transparent: true, blending: NoBlending, depthTest: false,
    uniforms: { uT: { value: 0 }, uRes: { value: new Vector2(w, h) }, uO: { value: new Vector2(ox, oy) }, uCol: { value: c }, uMode: { value: MODES[kind] ?? 2 } },
  });
  const scene = new Scene(), cam = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(new Mesh(new PlaneGeometry(2, 2), mat));
  const w0 = window as any;
  if (w0.__paintDebug) { // QA hook: draw any moment on demand, never resolves
    w0.__paintDraw = (t: number) => { mat.uniforms.uT.value = t; renderer.render(scene, cam); };
    return new Promise(() => {});
  }
  return new Promise((done) => {
    const t0 = performance.now() + delay;
    const frame = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      mat.uniforms.uT.value = t;
      renderer.render(scene, cam);
      t < 1 ? requestAnimationFrame(frame) : done();
    };
    requestAnimationFrame(frame);
  });
}
