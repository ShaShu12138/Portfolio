class PlayerBullet {
  constructor() {
    this.playerBullets = [];
    this.speed = 16;
  }

  setImage(img1) {
    this.playerBulletimg = img1;
  }

  collisions() {
    bullets: for (let i = this.playerBullets.length - 1; i >= 0; i--) {
      let playerBullet = this.playerBullets[i];
      //player bullets with enemies
      for (let j = enemyControl.enemies.length - 1; j >= 0; j--) {
        let enemy = enemyControl.enemies[j];
        if (
          playerBullet.x + this.playerBulletimg.width > enemy.x &&
          playerBullet.x < enemy.x + enemyControl.size &&
          playerBullet.y + this.playerBulletimg.height > enemy.y &&
          playerBullet.y < enemy.y + enemyControl.size &&
          enemy.soort <= 3
        ) {
          damageSound.play();

          this.playerBullets.splice(i, 1);
          switch (enemy.soort) {
            case 1:
              score += 200;
              break;

            case 2:
              score += 100;
              break;

            default:
              score += 300;
              break;
          }
          //set soort to 6 to explosion
          enemy.soort = 6;
          continue bullets;
        }
      }

      //player bullets with bouns
      for (let j = bonus.enemiesBonuses.length - 1; j >= 0; j--) {
        let enemiesBonus = bonus.enemiesBonuses[j];
        if (
          playerBullet.x + this.playerBulletimg.width > enemiesBonus.x &&
          playerBullet.x < enemiesBonus.x + 30 &&
          playerBullet.y + this.playerBulletimg.height > enemiesBonus.y &&
          playerBullet.y < enemiesBonus.y + 20
        ) {
          damageSound.play();
          this.playerBullets.splice(i, 1);
          bonus.enemiesBonuses.splice(j, 1);
          score += 1000;
          continue bullets;
        }
      }

      //player bullets with enemy bullets
      for (let j = enemyBulletControl.enemyBullets.length - 1; j >= 0; j--) {
        let enemyBullet = enemyBulletControl.enemyBullets[j];
        if (
          playerBullet.x + this.playerBulletimg.width + 6 > enemyBullet.x &&
          playerBullet.x - 6 <
            enemyBullet.x + enemyBulletControl.enemyBulletimg1.width &&
          playerBullet.y + this.playerBulletimg.height > enemyBullet.y &&
          playerBullet.y <
            enemyBullet.y + enemyBulletControl.enemyBulletimg1.height
        ) {
          damageSound.play();
          this.playerBullets.splice(i, 1);
          enemyBulletControl.enemyBullets.splice(j, 1);
          continue bullets;
        }
      }

      //draw player bullets
      playerBullet.y -= this.speed;
      if (playerBullet.y < 0) {
        this.playerBullets.splice(i, 1); // Delete bullet when it's off the canvas
      } else {
        image(this.playerBulletimg, playerBullet.x, playerBullet.y);
      }
    }
  }
}
