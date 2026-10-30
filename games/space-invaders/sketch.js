const CanvasX = 800;
const CanvasY = 900;
const fps = 20;
let gameState = 0;
let score = 0;
let level = 1;

/* Sounds */
let playedDeadSound = false;

function preload() {
  loadGameAssets();
}

function setup() {
  createCanvas(CanvasX, CanvasY);
  frameRate(fps); /* fps */
  textFont(Font);
  textSize(32);
  fill(255);

  //Show highscore board
  new HighScore().draw();

  document.getElementById('start').disabled = false;
  document.getElementById('start').textContent = 'Start';

  // Create enemies
  for (let i = 0; i < enemyControl.enemyLines; i++) {
    for (let j = 0; j < enemyControl.enemyColumns; j++) {
      let x = j * (enemyControl.size + 10);
      let y = i * (enemyControl.size + 10) + 50;
      let soort;
      let cooldown = Math.floor(
        random(enemyControl.bulletCooldownMin, enemyControl.bulletCooldownMax)
      );
      if (i == 0) {
        soort = 1;
      } else {
        soort = 2;
      }
      enemyControl.enemies.push({ x, y, soort, cooldown });
    }
  }

  // 4 shields with each 4HP
  for (let i = 0; i < 4; i++) {
    let hp = 4;
    let x = i * (shieldControl.shieldimg1.width + 64) + 64;
    let y = CanvasY - 150;
    shieldControl.shields.push({ x, y, hp });
  }
}

function draw() {
  image(backgroundimg, 0, 0);
  if (gameState == 1) {
    playerControl.draw();
    enemyControl.draw();
    bonus.draw();
    shieldControl.draw();
    playerBulletControl.collisions();
    enemyBulletControl.collisions();
    drawGameImformation();
  } else if (gameState == "lose") {
    if (playedDeadSound == false) {
      deadSound.play();
      introMusic.stop();
      gameMusic.stop();
      playedDeadSound = true;
      document.getElementById('score-form').hidden = false;
    }
    textSize(100);
    text("You lose", 230, 400);
    textSize(50);
    text("Score: " + score, 280, 500);
    text('Save your score below', 150, 580);
  } else if (gameState == "win") {
    clearSound.play();
    nextLevel();
    gameState = 1;
  } else {
    //you can also press space or enter to start game
    if ((keyIsPressed && keyIsDown(32)) || (keyIsPressed && keyIsDown(13))) {
      startGame();
    }
  }
}

/* Functions */
function startGame() {
  if (gameState !== 0) return;
  userStartAudio();
  //let game start
  gameState = 1;
  document.getElementById('start').disabled = true;
  document.getElementById('start').textContent = 'Playing';
  introMusic.onended(() => { if (gameState === 1) gameMusic.loop(); });
  introMusic.play();
}

function nextLevel() {
  enemyControl.speed += Math.floor(random(1, 3));
  enemyControl.drop += Math.floor(random(1, 4)); //1-3
  enemyControl.enemyLines = Math.floor(random(3, 6)); //3-5
  enemyControl.enemyColumns = Math.floor(random(4, 7)); //4-6
  enemyControl.bulletCooldownMin = Math.max(12, enemyControl.bulletCooldownMin - Math.floor(random(1, 3)));
  enemyControl.bulletCooldownMax = Math.max(24, enemyControl.bulletCooldownMax - Math.floor(random(1, 5)));
  let linesEnemy3 = Math.floor(random(0, 3)); //0-2
  let linesEnemy2 = Math.floor(
    random(0, enemyControl.enemyLines - linesEnemy3)
  );
  // Create enemies
  for (let i = 0; i < enemyControl.enemyLines; i++) {
    for (let j = 0; j < enemyControl.enemyColumns; j++) {
      let x = j * (enemyControl.size + 10);
      let y = i * (enemyControl.size + 10) + 50;
      let soort;
      let cooldown;
      if (i <= linesEnemy3 - 1) {
        cooldown = Math.floor(
          random(
            enemyControl.bulletCooldownMin / 2,
            enemyControl.bulletCooldownMax / 2
          )
        );
        soort = 3;
      } else if (i <= linesEnemy3 + linesEnemy2 - 1) {
        cooldown = Math.floor(
          random(enemyControl.bulletCooldownMin, enemyControl.bulletCooldownMax)
        );
        soort = 1;
      } else {
        soort = 2;
      }
      enemyControl.enemies.push({ x, y, soort, cooldown });
    }
  }

  // Reset bullets
  playerBulletControl.playerBullets = [];
  enemyBulletControl.enemyBullets = [];

  bonus.enemiesBonuses = [];

  // Player life +1
  if (playerControl.lives < 5) {
    playerControl.lives++;
  }

  //shields hp +2;
  for (let i = shieldControl.shields.length - 1; i >= 0; i--) {
    let shield = shieldControl.shields[i];
    shield.hp += 2;
    if (shield.hp > 4) {
      shield.hp = 4;
    }
  }

  // Level + 1
  level += 1;
}

function drawGameImformation() {
  text("Score: " + score, 10, 40);
  text("Level: " + level, 10, 80);
}
