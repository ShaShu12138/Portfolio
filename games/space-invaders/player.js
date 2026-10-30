class Player {
  constructor() {
    this.size = 60; /* Player img is 60x60 pixels */
    this.lives = 5;
    this.position = (CanvasX - 50) / 2; /* set player to the middle */
    this.speed = 15;
    this.bulletCooldown = 3;
    this.bulletCooldownLimit = 8; // 1 bullet per 8f
  }

  setImage(img1, img2, img3, img4, img5) {
    this.playerimg1 = img1;
    this.playerimg2 = img2;
    this.playerimg3 = img3;
    this.playerimg4 = img4;
    this.playerimg5 = img5;
  }

  draw() {
    // Move player
    if (controlDown(LEFT_ARROW) && this.position > 0) {
      this.position = Math.max(0, this.position - this.speed);
    }
    if (
      controlDown(RIGHT_ARROW) &&
      this.position < CanvasX - 60
    ) {
      this.position = Math.min(CanvasX - 60, this.position + this.speed);
    }

    // Shoot
    if (controlDown(32) && this.bulletCooldown <= 0) {
      shootSound1.play();
      let bulletX = this.position + 30; // Position of bullet
      let bulletY = CanvasY - 60 - 10;
      playerBulletControl.playerBullets.push({ x: bulletX, y: bulletY });
      this.bulletCooldown = this.bulletCooldownLimit; // Refresh cooldown
    }
    this.bulletCooldown -= 1;

    // Display different forms for players with different health
    switch (this.lives) {
      case 5:
        image(
          this.playerimg1,
          this.position,
          CanvasY - this.size - 10
        ); /* set player 10px from the bottom */
        break;
      case 4:
        image(this.playerimg2, this.position, CanvasY - this.size - 10);
        break;
      case 3:
        image(this.playerimg3, this.position, CanvasY - this.size - 10);
        break;
      case 2:
        image(this.playerimg4, this.position, CanvasY - this.size - 10);
        break;
      default:
        image(this.playerimg5, this.position, CanvasY - this.size - 10);
        break;
    }
    if (this.lives <= 0) {
      gameState = "lose";
    }
  }
}
