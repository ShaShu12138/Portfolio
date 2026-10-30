class Enemy {
  constructor() {
    this.size = 50; /* enemyimg = 50x50 */
    this.enemies = [];
    this.speed = 10;
    this.direction = 1; /* 1 for right, -1 for left */
    this.drop = 30;
    this.enemyLines = 3;
    this.enemyColumns = 4; /* Number of enemy = enemyLines*enemyColumns */
    this.bulletCooldownMin = 70; // min cooldown
    this.bulletCooldownMax = 150; // max cooldown
  }

  setImage(img1, img2, img3,explosionImg1,explosionImg2,explosionImg3,explosionImg4) {
    this.enemyimg1 = img1;
    this.enemyimg2 = img2;
    this.enemyimg3 = img3;
    this.explosionBig1 = explosionImg1;
    this.explosionBig2 = explosionImg2;
    this.explosionBig3 = explosionImg3;
    this.explosionBig4 = explosionImg4;
  }

  draw() {
    // Move and draw enemies
    let drop = false;
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      if (
        enemy.x + this.speed * this.direction < 0 ||
        enemy.x + this.speed * this.direction + this.size > CanvasX
      ) {
        drop = true;
      }
      switch (enemy.soort) {
        case 1:
          this.shoot(enemy);
          image(this.enemyimg1, enemy.x, enemy.y);
          break;
        case 2:
          image(this.enemyimg2, enemy.x, enemy.y);
          break;
        case 3:
          this.shoot(enemy);
          image(this.enemyimg3, enemy.x, enemy.y);
          break;
        case 6:
          image(this.explosionBig1, enemy.x, enemy.y);
          enemy.soort += 1;
          break;
        case 7:
          image(this.explosionBig2, enemy.x, enemy.y);
          enemy.soort += 1;
          break;
        case 8:
          image(this.explosionBig3, enemy.x, enemy.y);
          enemy.soort += 1;
          break;
        case 9:
          image(this.explosionBig4, enemy.x, enemy.y);
          // Delete enemy when it explod
          this.enemies.splice(i, 1);
          if (this.enemies.length == 0) {
            gameState = "win";
          }
          break;
        default:
          break;
      }
    }
    if (drop == true) {
      this.direction *= -1;
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        enemy.y += this.drop;
        if (enemy.y > CanvasY - 160) {
          gameState = "lose";
        }
        enemy.x += this.speed * this.direction;
      }
    } else {
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        enemy.x += this.speed * this.direction;
      }
    }
  }

  shoot(enemy){
    if (enemy.cooldown <= 0) {
      shootSound2.play();
      let x = enemy.x + this.size / 2;
      let y = enemy.y + this.size;
      let soort = enemy.soort;
      if (enemy.soort == 1) {
        enemy.cooldown = random(this.bulletCooldownMin, this.bulletCooldownMax);
      } else {
        enemy.cooldown = random(
          this.bulletCooldownMin / 2,
          this.bulletCooldownMax / 2
        );
      }
      enemyBulletControl.enemyBullets.push({ x, y, soort });
    }
    enemy.cooldown -= 1;
  }
}
