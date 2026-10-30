const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:5190';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true});
 const results=[];
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:900},isMobile:mobile,hasTouch:mobile});
  const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(`${r.status()} ${r.url()}`);});
  await p.goto(base+'/games/space-invaders/');await p.waitForFunction(()=>document.querySelector('#start').textContent==='Start');await p.click('#start');
  const initial=await p.evaluate(()=>playerControl.position);
  async function hold(selector,ms){const r=await p.locator(selector).boundingBox();const x=r.x+r.width/2,y=r.y+r.height/2;if(mobile){const cdp=await context.newCDPSession(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await p.waitForTimeout(ms);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();}else{await p.mouse.move(x,y);await p.mouse.down();await p.waitForTimeout(ms);await p.mouse.up();}}
  await hold('[data-key="39"]',220);
  assert(await p.evaluate(()=>playerControl.position)>initial);
  await hold('[data-key="32"]',500);
  assert(await p.evaluate(()=>playerBulletControl.playerBullets.length)>0);
  await p.evaluate(()=>{score=1234;gameState='lose';});await p.waitForSelector('#score-form:visible');await p.fill('#player-name','Test pilot');await p.click('#score-form button');
  await p.reload();await p.waitForFunction(()=>document.querySelector('#start').textContent==='Start');assert((await p.locator('#highScore').innerText()).includes('1234'));
  await p.click('#start');await p.waitForTimeout(600);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  results.push(`Space Invaders ${mobile?'touch':'desktop'}: movement, shooting, game over, local scores, layout`);
  await p.goto(base+'/games/dungeon-exploration/');await p.waitForFunction(()=>document.querySelector('#start').textContent==='Start battle');await p.click('#start');
  const canvas=p.locator('canvas'),box=await canvas.boundingBox();
  // Real pointer coordinates exercise the CSS-scaled canvas input mapping.
  await p.mouse.move(box.x+box.width/12,box.y+box.height*(385/825));await p.mouse.down();await p.mouse.move(box.x+box.width*3/12,box.y+box.height*(385/825),{steps:6});await p.mouse.up();await p.waitForTimeout(1500);
  assert(await p.evaluate(()=>!tileGrid.isDragging));
  if(mobile){await p.tap('canvas',{position:{x:box.width/2,y:15}});}
  await p.evaluate(()=>{tileGrid.touchStarted({x:-5,y:-5});tileGrid.touchStarted({x:40,y:385});tileGrid.touchMoved({x:-20,y:200});tileGrid.touchEnded({x:-20,y:200});});
  assert(await p.evaluate(()=>!tileGrid.isDragging&&tileGrid.selectedTile===null));
  await p.evaluate(()=>{player.gold=100;gameStatus='shop';});await p.waitForSelector('#shop:visible');await p.locator('#upgrades button').first().click();assert.equal(await p.evaluate(()=>shopRedGem),1);await p.click('#next');assert.equal(await p.evaluate(()=>player.redGemDmg),15);
  await p.reload();await p.waitForFunction(()=>document.querySelector('#start').textContent==='Start battle');assert.equal(await p.evaluate(()=>shopRedGem),1);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  results.push(`Dungeon ${mobile?'touch':'desktop'}: drag, out-of-bounds, shop, upgrade persistence, layout`);
  await p.goto(base+'/games/check-man/');await p.waitForSelector('#board button');await p.click('[data-piece="6"]');
  const empty=await p.locator('#board button').evaluateAll(es=>es.findIndex(e=>e.getAttribute('aria-label').includes('Empty')));
  await p.locator('#board button').nth(empty).click();assert.equal(await p.locator('#cost').innerText(),'4');await p.locator('#board button').nth(empty).click();assert.equal(await p.locator('#cost').innerText(),'0');
  await p.click('#check');assert((await p.locator('#status').innerText()).includes('still need'));
  await p.selectOption('#difficulty','10');assert.equal(await p.locator('#board .target').count(),10);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  results.push(`Check Man ${mobile?'touch':'desktop'}: piece placement/removal, cost, invalid solution, difficulty, layout`);
  await p.goto(base+'/');assert.equal(await p.getByText('No public build',{exact:true}).count(),0);
  const images=await p.evaluate(async()=>{const imgs=[...document.images];imgs.forEach(i=>i.loading='eager');await Promise.all(imgs.map(i=>i.decode().catch(()=>{})));return imgs.filter(i=>!i.naturalWidth).map(i=>i.src);});assert.deepEqual(images,[]);
  assert.equal(await p.locator('.project-item').count(),9);
  assert.equal(await p.locator('a.project-item').count(),9);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  results.push(`Portfolio ${mobile?'phone':'desktop'}: nine linked cards, no overflow`);
  if(errors.length)throw Error(errors.join('\n'));
  await context.close();
 }
 console.log(results.join('\n'));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
