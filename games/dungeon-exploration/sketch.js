let tileGrid, player, enemy;
const canvasWidth = 480, canvasHeight = 825;
const tileWidth = 6, tileHeight = 6, tileSize = 80;
let dropSpeed, isDropping = false, checkMatch = true;
let gameStatus = 0, level = 1;
let shopRedGem = 0, shopYellowGem = 0, shopBlueGem = 0, shopGreenGem = 0, shopHp = 0;

function preload() {
  new GameManager();
  tileGrid = new Tile(tileWidth, tileHeight, tileSize);
}
function setup() {
  const surface = createCanvas(canvasWidth, canvasHeight).elt;
  frameRate(60);
  player = new Player();
  enemy = new Enemy();
  const start = document.getElementById('start');
  start.disabled = false;
  start.textContent = 'Start battle';
  start.onclick = () => { userStartAudio(); gameStatus = 'game'; start.hidden = true; };
  document.getElementById('next').onclick = startNextGame;
  document.getElementById('sound').onclick = event => {
    const muted = event.target.getAttribute('aria-pressed') !== 'true';
    event.target.setAttribute('aria-pressed', String(muted));
    event.target.textContent = muted ? 'Sound: off' : 'Sound: on';
    masterVolume(muted ? 0 : 1);
  };
  function point(event) {
    const r = surface.getBoundingClientRect();
    return { x: (event.clientX-r.left)*canvasWidth/r.width, y: (event.clientY-r.top)*canvasHeight/r.height };
  }
  let pointer = null;
  surface.addEventListener('pointerdown', event => {
    if (gameStatus !== 'game' || isDropping || pointer !== null) return;
    const p = point(event);
    if (!tileGrid.getTileAtPosition(p)) return;
    event.preventDefault(); userStartAudio();
    pointer = event.pointerId; surface.setPointerCapture(pointer);
    tileGrid.touchStarted(p);
  });
  surface.addEventListener('pointermove', event => {
    if (event.pointerId === pointer) tileGrid.touchMoved(point(event));
  });
  surface.addEventListener('pointerup', event => {
    if (event.pointerId !== pointer) return;
    pointer = null; tileGrid.touchEnded(point(event));
  });
  function cancel() {
    pointer = null;
    if (tileGrid.selectedTile) tileGrid.touchEnded({x:-1,y:-1});
  }
  surface.addEventListener('pointercancel', cancel);
  surface.addEventListener('lostpointercapture', cancel);
  window.addEventListener('blur', cancel);
}
function draw() {
  background(12,16,25);
  if (gameStatus === 0) {
    fill(240); textAlign(CENTER); textSize(34); text('Dungeon exploration',240,330);
    textSize(21); text('Press Start battle above',240,380); return;
  }
  if (gameStatus === 'shop') { showShop(); return; }
  dropSpeed = Math.min(1, 0.007 * deltaTime);
  isDropping = false;
  for (let x=0;x<tileWidth;x++) for (let y=0;y<tileHeight;y++) {
    const tile = tileGrid.tiles[x][y];
    if (!tile.visible) continue;
    const targetY = canvasHeight-tileSize*tileHeight+y*tileSize;
    if (!tileGrid.isDragging) {
      tile.y = lerp(tile.y,targetY,dropSpeed); tile.x = lerp(tile.x,x*tileSize,dropSpeed);
      if (Math.abs(tile.y-targetY)>2 || Math.abs(tile.x-x*tileSize)>2) {isDropping=true; checkMatch=false;}
    }
    image(tile.image,tile.x,tile.y,tileSize,tileSize);
  }
  fill(12,16,25); rect(0,0,canvasWidth,345);
  enemy.draw();
  fill(80,35,35); rect(95,28,290,18); rect(0,309,480,36);
  fill(59,180,120); rect(95,28,290*Math.max(0,enemy.hp)/enemy.hpMax,18);
  rect(0,309,480*Math.max(0,player.hp)/player.hpMax,36);
  fill(255); textSize(20); textAlign(CENTER);
  text(`Enemy: ${Math.max(0,Math.ceil(enemy.hp))}`,240,24);
  text(`HP ${Math.ceil(player.hp)} / ${player.hpMax}`,240,335);
  textAlign(LEFT); text(`Level ${level}`,10,80);
  textAlign(RIGHT); text(`Gold ${player.gold}`,470,80);
  if (!isDropping && !tileGrid.isDragging && !checkMatch) {checkMatch=true; tileGrid.processMatches();}
}
function showShop() {
  const shop = document.getElementById('shop');
  if (!shop.hidden) return;
  document.querySelector('main').hidden = true;
  shop.hidden = false;
  renderShop();
}
function renderShop() {
  document.getElementById('gold').textContent = `Gold: ${player.gold}`;
  const upgrades = [shopRedGem,shopYellowGem,shopBlueGem,shopGreenGem,shopHp];
  const names = ['Red gem damage +5','Yellow gem damage +5','Blue gem damage +5','Green gem damage +5','Maximum HP +50'];
  const list = document.getElementById('upgrades'); list.replaceChildren();
  upgrades.forEach((value,index) => {
    const cost = 50+value*50;
    const button = document.createElement('button');
    button.textContent = `${names[index]} · Level ${value} · ${cost} gold`;
    button.disabled = player.gold < cost;
    button.onclick = () => {
      if (player.gold < cost) return;
      player.gold -= cost; upgrades[index]++;
      [shopRedGem,shopYellowGem,shopBlueGem,shopGreenGem,shopHp] = upgrades;
      Cookies.set('match3-Money',player.gold,{expires:365});
      Cookies.set('match3-Shop',upgrades.join('/'),{expires:365});
      renderShop();
    };
    list.append(button);
  });
}
function startNextGame() {
  gameStatus='game'; level=1; isDropping=false; checkMatch=true;
  tileGrid=new Tile(tileWidth,tileHeight,tileSize);
  player=new Player(); enemy=new Enemy();
  document.getElementById('shop').hidden=true;
  document.querySelector('main').hidden=false;
}
