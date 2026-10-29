const { chromium } = require('/tmp/claude-0/-home-claude/bc800774-a202-57bb-ac79-0d8a44d26643/scratchpad/audit/node_modules/playwright');
const fs=require('fs');const [,,file,out,fps='30',onlyFrames]=process.argv;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
const p=await b.newPage({viewport:{width:1600,height:900},deviceScaleFactor:+(process.env.SS||1)});await p.goto('file://'+__dirname+'/'+file.replace(/#.*/,'')+(file.includes('#')?'#'+file.split('#')[1]:''));
await p.waitForFunction(()=>window.READY===true,null,{timeout:30000});await p.waitForTimeout(500);
const dur=await p.evaluate(()=>window.DUR);console.log('dur',dur);fs.mkdirSync(out,{recursive:true});
const N=Math.ceil(dur*fps);const list=onlyFrames?onlyFrames.split(',').map(Number):[...Array(N).keys()];
for(const k of list){await p.evaluate(t=>window.seek(t),k/fps);await p.screenshot({path:`${out}/f${String(k).padStart(5,'0')}.jpg`,type:'jpeg',quality:95});}
await b.close();})();
