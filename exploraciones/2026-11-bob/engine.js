
/* =====================================================================
   Stage direction
   Every clip starts and ends on the exact same still (the rest pose), so
   one clip is only ever swapped for another when both show that frame.
   ===================================================================== */
var txt = document.getElementById('txt'), sr = document.getElementById('sr');
var CLIPS = {};
['idle','tin','thold','tout','u1','u2','u3'].forEach(function(n){ CLIPS[n] = document.getElementById('c_' + n); });
var cur = 'idle', started = false;
function ok(n){ return CLIPS[n].readyState >= 2; }
function play(v){ var p = v.play(); if(p && p.catch) p.catch(function(){}); }

// swap to a clip. fade = ms of cross-fade, only used when we cannot wait for the rest pose (a poke)
function show(name, rate, fade){
  var v = CLIPS[name], prev = CLIPS[cur];
  v.playbackRate = rate || 1;
  if(v === prev){ v.currentTime = 0; play(v); return; }
  v.style.transition = 'none'; v.style.zIndex = 1; v.classList.add('on'); play(v);
  prev.style.zIndex = 2;
  var retire = function(){ prev.pause(); try{ prev.currentTime = 0; }catch(e){} prev.style.transition = 'none'; };
  if(fade){ prev.style.transition = 'opacity ' + fade + 'ms linear'; prev.classList.remove('on'); setTimeout(retire, fade + 40); }
  else requestAnimationFrame(function(){ requestAnimationFrame(function(){ prev.classList.remove('on'); retire(); }); });
  cur = name;
}

/* ---------- the line she is about to say ---------- */
var line = null;          // {text, words[], think, done}
var queue = [];           // talk clips still to play for the current line
var lastSpoke = -1e9, timers = [];
function clearTimers(){ timers.forEach(clearTimeout); timers = []; }

function wordDelay(w){
  var d = 150 + 42*Math.min(w.length, 9);
  if(/[.!?…:]$/.test(w)) d += 330; else if(/[,;]$/.test(w)) d += 170;
  return d;
}
// pick talk clips whose total length best fits the sentence; the text is then paced to land on it
function plan(ms){
  var names = ['u1','u2','u3'].filter(ok); if(!names.length) return null;
  var dur = {}; names.forEach(function(n){ dur[n] = CLIPS[n].duration*1000; });
  var best = null, max = {u1:4, u2:4, u3:2};
  for(var a=0; a<=(dur.u1?max.u1:0); a++) for(var b=0; b<=(dur.u2?max.u2:0); b++) for(var c=0; c<=(dur.u3?max.u3:0); c++){
    if(!(a+b+c)) continue;
    var total = a*(dur.u1||0) + b*(dur.u2||0) + c*(dur.u3||0);
    var score = Math.abs(total - TAIL - ms) + (a+b+c)*25;          // prefer fewer, longer clips on a tie
    if(!best || score < best.score) best = {score:score, total:total, n:{u1:a, u2:b, u3:c}};
  }
  var seq = [], left = best.n, order = ['u1','u2','u3'], i = 0, guard = 0;
  while(left.u1 + left.u2 + left.u3 > 0 && guard++ < 60){ var k = order[i++ % 3]; if(left[k] > 0){ seq.push(k); left[k]--; } }
  return {seq:seq, total:best.total};
}
var TAIL = 380;           // she stops speaking a beat before the mouth settles

function layout(words){
  txt.textContent = '';
  return words.map(function(w, i){
    var s = document.createElement('span'); s.className = 'w'; s.textContent = w;
    txt.appendChild(s); if(i < words.length-1) txt.appendChild(document.createTextNode(' '));
    return s;
  });
}
function dots(){
  clearTimers(); bubble.classList.remove('off');
  txt.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>';
}
function finishLine(){
  var l = line; line = null; lastSpoke = performance.now();
  Array.prototype.forEach.call(txt.querySelectorAll('.now'), function(n){ n.classList.remove('now'); });
  if(l && l.done) l.done();
}
function startTalk(fade){
  var l = line, words = l.words, spans = layout(words);
  bubble.classList.remove('off'); sr.textContent = l.text;
  var natural = words.reduce(function(a, w){ return a + wordDelay(w); }, 0);
  var p = reduced ? null : plan(natural);
  if(!p){                                   // no video (reduced motion or not loaded): just show the text
    spans.forEach(function(s){ s.classList.add('in'); }); finishLine(); if(cur !== 'idle') show('idle'); return;
  }
  var k = Math.max(0.72, Math.min(1.45, (p.total - TAIL)/natural)), t = 60;
  words.forEach(function(w, i){
    timers.push(setTimeout(function(){
      if(i > 0) spans[i-1].classList.remove('now');
      spans[i].classList.add('in', 'now');
    }, t));
    t += wordDelay(w)*k;
  });
  queue = p.seq.slice(1);
  show(p.seq[0], 1, fade);
}

// what happens every time a clip reaches its last frame
function onEnd(name){
  if(name !== cur) return;
  if(name === 'idle'){
    if(line && line.think && ok('tin') && ok('tout')){ line.think = false; show('tin'); }
    else if(line && line.text) startTalk();
    else show('idle');
  }
  else if(name === 'tin') show(line && line.text || !ok('thold') ? 'tout' : 'thold', line && line.text ? 1.15 : 1);
  else if(name === 'thold') show(line && line.text ? 'tout' : 'thold', 1.15);
  else if(name === 'tout'){ if(line && line.text) startTalk(); else show('idle'); }
  else{                                                         // a talk clip
    if(queue.length) show(queue.shift());
    else{ finishLine(); show('idle'); }
  }
}
Object.keys(CLIPS).forEach(function(n){ CLIPS[n].addEventListener('ended', function(){ onEnd(n); }); });

// say(text): give her a line. opts.think = look up at the bubble first; opts.now = do not wait for the rest pose
function prepare(opts){ dots(); line = {text:'', words:[], think:!!(opts && opts.think), done:opts && opts.done}; }
function deliver(text, now){
  if(!line) line = {think:false};
  line.text = String(text || '').trim(); line.words = line.text.split(/\s+/).filter(Boolean);
  if(reduced || !started){ startTalk(); return; }
  if(now && cur === 'idle'){ startTalk(200); }
  // otherwise onEnd picks it up the next time the current clip lands on the rest pose
}

/* ---------- chat (asks Claude when the page is allowed to) ---------- */
var history = [], busy = false, sampler = null, samplerAsked = false;
function getSampler(){
  if(!samplerAsked){
    samplerAsked = true;
    sampler = (window.claude && typeof window.claude.use === 'function')
      ? Promise.resolve(window.claude.use('sample')).catch(function(){ return null; })
      : Promise.resolve(null);
  }
  return sampler;
}
function setBusy(b){ busy = b; sendBtn.disabled = b; q.disabled = b; Array.prototype.forEach.call(chips.children, function(c){ c.disabled = b; }); }

function ask(text){
  text = (text || '').trim();
  if(!text || busy) return;
  setBusy(true); q.value = '';
  // she only stops to think on the first question, or when the conversation had gone quiet
  var quiet = performance.now() - lastSpoke > 20000;
  prepare({think: quiet, done: function(){ setBusy(false); }});
  history.push({role:'user', content:text});
  if(history.length > 12) history = history.slice(-12);
  if(history[0].role !== 'user') history.shift();
  var msgs = history.map(function(m, i){
    return i === 0 ? {role:'user', content: PERSONA + '\n\n---\nMensaje de la visita: ' + m.content} : m;
  });
  getSampler().then(function(sample){
    if(!sample) throw {code:'unavailable'};
    return sample(msgs, {modelTier:'quick', cache:false});
  }).then(function(res){
    var out = (res && res.text || '').trim() || 'Me he quedado en blanco. Como un artboard nuevo.';
    history.push({role:'assistant', content:out}); deliver(out);
  }).catch(function(err){
    history.pop();
    var code = err && err.code;
    if(code === 'rate_limited') deliver('Demasiadas preguntas seguidas. Dame un minuto, que soy de peluche.');
    else if(code === 'not_granted' || code === 'unavailable'){ deliver('Aquí no puedo hablar, pero sí dejarme achuchar. Pulsa encima.'); form.hidden = true; chips.hidden = true; }
    else deliver('Se me ha ido el hilo. Prueba otra vez.');
  });
}
form.addEventListener('submit', function(e){ e.preventDefault(); ask(q.value); });
CHIPS.forEach(function(c){
  var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = c;
  b.addEventListener('click', function(){ ask(c); }); chips.appendChild(b);
});

/* ---------- poke ---------- */
var quipI = 0;
function squish(){ doll.classList.remove('squish'); void doll.offsetWidth; doll.classList.add('squish'); }
function poke(){
  squish();
  if(busy || line) return;
  setBusy(true); line = {think:false, done:function(){ setBusy(false); }};
  deliver(QUIPS[quipI++ % QUIPS.length], true);
}
stage.addEventListener('click', poke);
stage.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); poke(); } });
bubble.addEventListener('click', function(e){ e.stopPropagation(); });

/* ---------- start ---------- */
function begin(){
  if(started || reduced) return;
  started = true; CLIPS.idle.classList.add('on'); play(CLIPS.idle);
}
if(!reduced){
  if(ok('idle')) begin(); else CLIPS.idle.addEventListener('loadeddata', begin);
  // some browsers only start video after a gesture
  window.addEventListener('pointerdown', function kick(){ if(CLIPS[cur].paused) play(CLIPS[cur]); window.removeEventListener('pointerdown', kick); });
  document.addEventListener('visibilitychange', function(){ if(!document.hidden && CLIPS[cur].paused) play(CLIPS[cur]); });
}
