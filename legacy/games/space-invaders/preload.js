function loadGameAssets() {
  /* Fonts */
  Font = loadFont("./fonts/VT323-Regular.ttf");

  /* Img */
  backgroundimg = loadImage("./img/background.png");

  playerimg1 = loadImage("./img/player1.png");
  playerimg2 = loadImage("./img/player2.png");
  playerimg3 = loadImage("./img/player3.png");
  playerimg4 = loadImage("./img/player4.png");
  playerimg5 = loadImage("./img/player5.png");
  playerControl = new Player();
  playerControl.setImage(
    playerimg1,
    playerimg2,
    playerimg3,
    playerimg4,
    playerimg5
  );

  enemyimg1 = loadImage("./img/enemy1.png");
  enemyimg2 = loadImage("./img/enemy2.png");
  enemyimg3 = loadImage("./img/enemy3.png");
  explosionBig1 = loadImage("./img/explosionBig1.png");
  explosionBig2 = loadImage("./img/explosionBig2.png");
  explosionBig3 = loadImage("./img/explosionBig3.png");
  explosionBig4 = loadImage("./img/explosionBig4.png");
  enemyControl = new Enemy();
  enemyControl.setImage(
    enemyimg1,
    enemyimg2,
    enemyimg3,
    explosionBig1,
    explosionBig2,
    explosionBig3,
    explosionBig4
  );

  enemiesBonusimg = loadImage("./img/enemiesBonus.png");
  bonus = new Bonus();
  bonus.setImage(enemiesBonusimg);

  shieldimg1 = loadImage("./img/shield1.png");
  shieldimg2 = loadImage("./img/shield2.png");
  shieldimg3 = loadImage("./img/shield3.png");
  shieldimg4 = loadImage("./img/shield4.png");
  shieldControl = new Shield();
  shieldControl.setImage(shieldimg1, shieldimg2, shieldimg3, shieldimg4);

  playerBulletimg = loadImage("./img/playerBullet.png");
  playerBulletControl = new PlayerBullet();
  playerBulletControl.setImage(playerBulletimg);

  enemyBulletimg1 = loadImage("./img/enemyBullet1.png");
  enemyBulletimg2 = loadImage("./img/enemyBullet2.png");
  enemyBulletControl = new EnemyBullet();
  enemyBulletControl.setImage(enemyBulletimg1, enemyBulletimg2);

  /* Sounds */
  clearSound = loadSound("./sound/clear.mp3");
  introMusic = loadSound('./sound/bgm1start.mp3');
  gameMusic = loadSound('./sound/bgm1.mp3');
  deadSound = loadSound("./sound/dead.wav");
  damageSound = loadSound("./sound/damage.mp3");
  shootSound1 = loadSound("./sound/shootplayer.mp3");
  shootSound2 = loadSound("./sound/shootenemy.mp3");
}
