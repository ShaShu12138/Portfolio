class Shield {
  constructor() {
    this.shields = [];
  }

  setImage(img1, img2, img3, img4) {
    this.shieldimg1 = img1;
    this.shieldimg2 = img2;
    this.shieldimg3 = img3;
    this.shieldimg4 = img4;
  }

  draw() {
    for (let i = this.shields.length - 1; i >= 0; i--) {
      let shield = this.shields[i];
      switch (shield.hp) {
        case 4:
          image(shieldimg1, shield.x, shield.y);
          break;
        case 3:
          image(shieldimg2, shield.x, shield.y);
          break;
        case 2:
          image(shieldimg3, shield.x, shield.y);
          break;
        case 1:
          image(shieldimg4, shield.x, shield.y);
          break;
        default:
          break;
      }
    }
  }
}
