class Enemy{
    constructor(){
        this.hpMax = 100;
        this.hp = this.hpMax;
        this.dmg = 10;

        this.images = ['enemy1', 'enemy2', 'enemy3', 'enemy4','enemy5']; // Array of enemy images
        this.selectedImage = this.images[Math.floor(Math.random() * this.images.length)]; // Randomly select a enemy image
        this.image = gameManager.getImage(this.selectedImage);
        this.imageSize = canvasHeight - (tileSize * tileGrid.height) - 100;
    }

    attack(){
        player.hp -= this.dmg;
        if(player.hp <= 0){
            gameStatus = 'shop'
            player.hp = player.hpMax;
        }
    }

    nextLevel(){
        level++;

        this.hpMax += 10;
        this.hp = this.hpMax;
        this.dmg += 5;
        player.hp += player.hpMax/10;
        if(player.hp > player.hpMax){
            player.hp = player.hpMax;
        }

        player.gold = Number(player.gold) + (10 + Math.floor(Math.random() * 5) * level);
        Cookies.set('match3-Money', player.gold , { expires: 365 })

        this.selectedImage = this.images[Math.floor(Math.random() * this.images.length)]; // Randomly select a enemy image
        this.image = gameManager.getImage(this.selectedImage);
    }

    draw(){
        if(this.hp > 0){
            image(this.image, (canvasWidth - this.imageSize)/2, 50, this.imageSize, this.imageSize);
        }
    }
}
