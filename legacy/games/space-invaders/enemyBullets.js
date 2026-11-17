class EnemyBullet{
  constructor() {
    this.enemyBullets = [];
    this.speed = 16;
  }

  setImage(img1, img2) {
    this.enemyBulletimg1 = img1;
    this.enemyBulletimg2 = img2;
  }

  collisions() {
    bullets: for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      let enemyBullet = this.enemyBullets[i];

      //enemy bullets with player
      if (
        enemyBullet.x + this.enemyBulletimg1.width > playerControl.position &&
        enemyBullet.x < playerControl.position + 60 &&
        enemyBullet.y + this.enemyBulletimg1.height > CanvasY - 60 - 10 &&
        enemyBullet.y < CanvasY - 10
      ) {
        damageSound.play();
        this.enemyBullets.splice(i, 1);
        playerControl.lives -= 1;
        continue;
      }

      //enemy bullets with shield
      for (let j = shieldControl.shields.length - 1; j >= 0; j--) {
        let shield = shieldControl.shields[j];
        if (
          enemyBullet.x + this.enemyBulletimg1.width > shield.x &&
          enemyBullet.x < shield.x + shieldControl.shieldimg1.width &&
          enemyBullet.y + this.enemyBulletimg1.height > shield.y &&
          enemyBullet.y < shield.y + shieldControl.shieldimg1.height &&
          shield.hp > 0
        ) {
          this.enemyBullets.splice(i, 1);
          shield.hp--;
          continue bullets;
        }
      }

      //draw enemy bullets
      enemyBullet.y += this.speed;
      if (enemyBullet.y > CanvasY) {
        this.enemyBullets.splice(i, 1); // Delete bullet when it's off the canvas
      } else {
        if (enemyBullet.soort == 1) {
          image(this.enemyBulletimg1, enemyBullet.x, enemyBullet.y);
        } else {
          image(this.enemyBulletimg2, enemyBullet.x, enemyBullet.y);
        }
      }
    }
  }
}
