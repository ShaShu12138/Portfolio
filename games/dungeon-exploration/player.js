class Player {
    constructor(){
        // Load player gold
        if(Cookies.get('match3-Money') == undefined){
            Cookies.set('match3-Money', 0);
            this.gold = 0;
        }else{
            this.gold = Math.max(0, Number(Cookies.get('match3-Money')) || 0);
        }

        // Load shop information
        if(Cookies.get('match3-Shop') == undefined){
            Cookies.set('match3-Shop', "0/0/0/0/0");
            shopRedGem = 0;
            shopYellowGem = 0;
            shopBlueGem = 0;
            shopGreenGem = 0;
            shopHp = 0;
        }else{
            let shop = Cookies.get('match3-Shop');
            [shopRedGem, shopYellowGem, shopBlueGem, shopGreenGem, shopHp] =
                Array.from({length:5}, (_,i) => Math.max(0, Math.min(1000, Number(shop.split('/')[i]) || 0)));
        }

        this.hpMax = 100 + shopHp*50;
        this.hp = this.hpMax;
        this.redGemDmg = 10 + shopRedGem*5;
        this.yellowGemDmg = 10 + shopYellowGem*5;
        this.blueGemDmg = 10 + shopBlueGem*5;
        this.greenGemDmg = 10 + shopGreenGem*5;
        this.gold;
    }

    attack(number,color){
        if(enemy.hp < 0){
            this.hp += 5;
            if(this.hp > this.hpMax){
                this.hp = this.hpMax;
            }
            this.gold = Number(this.gold) + 2;
        }
        
        switch (color) {
            case 'redGem':
                enemy.hp -= number * this.redGemDmg;
                break;
            case 'yellowGem':
                enemy.hp -= number * this.yellowGemDmg;
                break;
            case 'blueGem':
                enemy.hp -= number * this.blueGemDmg;
                break;
            case 'greenGem':
                enemy.hp -= number * this.greenGemDmg;
                break;
            default:
                break;
        }
    }
}
