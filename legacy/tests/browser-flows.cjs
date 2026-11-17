const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const base=process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5190';
(async()=>{
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(base+'/games/dungeon-exploration/');await p.waitForFunction(()=>document.querySelector('#start').textContent==='Start battle');await p.tap('#start');
const box=await p.locator('canvas').boundingBox(),cdp=await ctx.newCDPSession(p);
const x=box.x+box.width/12,y=box.y+box.height*385/825;
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+box.width/6,y}]});
assert(await p.evaluate(()=>tileGrid.isDragging));
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert(await p.evaluate(()=>!tileGrid.isDragging));
await p.waitForTimeout(1800);
// Deterministic fixture exercises actual combat/cascade code through the board.
await p.evaluate(()=>{for(let x=0;x<3;x++){const t=tileGrid.tiles[x][0];t.color='redGem';t.image=gameManager.getImage('redGem');}enemy.hp=1;tileGrid.processMatches();});
await p.waitForFunction(()=>level>=2);assert(await p.evaluate(()=>player.gold)>0);
await p.evaluate(()=>{player.hp=1;enemy.attack();});await p.waitForSelector('#shop:visible');
await p.tap('#next');assert(await p.evaluate(()=>level===1&&player.hp===player.hpMax));
await p.clock.install();await p.goto(base+'/games/check-man/');await p.tap('[data-piece="5"]');
for(let i=0;i<6;i++){
 const index=await p.locator('#board button').evaluateAll(es=>{const target=es.findIndex(e=>e.classList.contains('target')&&!e.classList.contains('covered'));if(target<0)return -1;return es.findIndex((e,j)=>e.getAttribute('aria-label').includes('Empty')&&Math.abs(j%8-target%8)<=1&&Math.abs(Math.floor(j/8)-Math.floor(target/8))<=1);});
 if(index<0)break;await p.locator('#board button').nth(index).tap();
}
assert.equal(await p.locator('#coverage').innerText(),'6 / 6');await p.tap('#check');assert.notEqual(await p.locator('#best').innerText(),'—');
await p.clock.fastForward(121000);assert.equal(await p.locator('#time').innerText(),'0:00');assert.equal(await p.locator('#board button:disabled').count(),64);
await p.tap('#new');assert.equal(await p.locator('#board button:disabled').count(),0);
for(const width of [320,390,768,1024,1440]){
 await p.setViewportSize({width,height:900});await p.goto(base+'/');
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const overlap=await p.evaluate(()=>{const a=document.querySelector('.logo').getBoundingClientRect(),b=document.querySelector('nav').getBoundingClientRect();return a.right>b.left&&a.left<b.right&&a.bottom>b.top&&a.top<b.bottom;});assert(!overlap);
}
assert.deepEqual(errors,[]);console.log('PASS: actual touch drag; match/cascade/level advance; defeat/shop/new run; Check Man valid solution, timed end/restart; five responsive widths and nav overlap.');
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
