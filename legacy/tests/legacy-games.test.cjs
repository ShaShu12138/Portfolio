const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function load(file, name, values) {
  const context = vm.createContext(values);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../games',file),'utf8'),context);
  return vm.runInContext(name,context);
}
const enemyValues = {CanvasY:900,image(){},damageSound:{play(){}},playerControl:{position:100,lives:1},shieldControl:{shields:[]}};
const EnemyBullet=load('space-invaders/enemyBullets.js','EnemyBullet',enemyValues);
const enemies=new EnemyBullet();enemies.setImage({width:8,height:12},{});
enemies.enemyBullets=[{x:500,y:200,soort:1},{x:100,y:840,soort:1}];
enemies.collisions();assert.equal(enemies.enemyBullets.length,1);assert.equal(enemyValues.playerControl.lives,0);
const playerValues={image(){},damageSound:{play(){}},score:0,enemyControl:{size:50,enemies:[{x:0,y:0,soort:1},{x:0,y:0,soort:2}]},bonus:{enemiesBonuses:[]},enemyBulletControl:{enemyBullets:[]}};
const PlayerBullet=load('space-invaders/playerBullets.js','PlayerBullet',playerValues);
const shots=new PlayerBullet();shots.setImage({width:8,height:12});shots.playerBullets=[{x:500,y:400},{x:0,y:0}];shots.collisions();
assert.equal(shots.playerBullets.length,1);assert.equal(playerValues.enemyControl.enemies.filter(e=>e.soort===6).length,1);
const Tile=load('dungeon-exploration/tile.js','Tile',{canvasHeight:825,gameManager:{getImage:x=>x},console});
const grid=new Tile(6,6,80);let resolutions=0;grid.processMatches=()=>resolutions++;
assert.equal(grid.getTileAtPosition({x:20,y:20}),null);
grid.touchStarted({x:-1,y:-1});assert(!grid.isDragging);
grid.touchStarted({x:40,y:385});grid.touchMoved({x:-1,y:100});grid.touchEnded({x:-1,y:100});
assert.equal(resolutions,0);assert(!grid.isDragging);assert.equal(grid.selectedTile,null);
const first=grid.tiles[0][0],second=grid.tiles[1][0];
grid.touchStarted({x:40,y:385});grid.touchEnded({x:120,y:385});
assert.equal(grid.tiles[0][0],second);assert.equal(grid.tiles[1][0],first);assert.equal(resolutions,1);
console.log('Legacy games: single-hit bullets, death threshold input, outside-grid cancellation and valid swap passed.');
