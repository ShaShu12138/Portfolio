  class Bonus {
    constructor() {
      this.enemiesBonuses = [];
      this.enemiesBonusCoolDown = 100;
      this.bonusImage = null;
    }
  
    setImage(img) {
      this.bonusImage = img;
    }
  
    draw() {
      for (let i = this.enemiesBonuses.length - 1; i >= 0; i--) {
        let enemiesBonus = this.enemiesBonuses[i];
        enemiesBonus.x += 20;
  
        if (enemiesBonus.x > 900) {
          this.enemiesBonuses.splice(i, 1); // Delete bonuses when it's off the canvas
        } else {
          image(this.bonusImage, enemiesBonus.x, enemiesBonus.y);
        }
      }
  
      if (this.enemiesBonusCoolDown <= 0) {
        let x = 10;
        let y = 60;
        this.enemiesBonuses.push({ x, y });
        this.enemiesBonusCoolDown = random(200, 400);
      }
  
      this.enemiesBonusCoolDown--;
    }
  }
  
  