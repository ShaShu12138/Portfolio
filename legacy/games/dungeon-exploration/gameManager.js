class GameManager {
    images; // Holds the image assets for the game

    constructor() {
        this.images = new Map(); // Initializes the Map to store image assets
        this.sounds = new Map(); // Initializes the Map to store sound assets
        this.enemys = new Map(); // Initializes the Map to store enemy assets
        this.loadImages(); // Calls the method to load image assets
        this.loadMp3s(); // Calls the method to load sound assets
        window.gameManager = this; // Makes this instance of GameManager globally accessible
    }

    // Loads image assets and stores them in the 'images' map
    loadImages() {
        this.images.set("blueGem", loadImage("assets/images/gem_Blue.svg"));
        this.images.set("redGem", loadImage("assets/images/gem_Red.svg"));
        this.images.set("yellowGem", loadImage("assets/images/gem_Yellow.svg"));
        this.images.set("greenGem", loadImage("assets/images/gem_Green.svg"));

        // Enemy images
        this.images.set("enemy1", loadImage("assets/images/enemy1.png"));
        this.images.set("enemy2", loadImage("assets/images/enemy2.png"));
        this.images.set("enemy3", loadImage("assets/images/enemy3.png"));
        this.images.set("enemy4", loadImage("assets/images/enemy4.png"));
        this.images.set("enemy5", loadImage("assets/images/enemy5.png"));
    }

    // Loads sound assets and stores them in the 'sounds' map
    loadMp3s() {
        this.sounds.set("match1", loadSound("assets/mp3/match1.mp3"));
        this.sounds.set("match2", loadSound("assets/mp3/match2.mp3"));
        this.sounds.set("match3", loadSound("assets/mp3/match3.mp3"));
        this.sounds.set("match4", loadSound("assets/mp3/match4.mp3"));
        this.sounds.set("match5", loadSound("assets/mp3/match5.mp3"));
        this.sounds.set("test", loadSound("assets/mp3/test.mp3"));
    }

    // Retrieves an image asset by its name, throws an error if not found
    getImage(assetname) {
        try {
            return this.images.get(assetname);
        } catch (exc) {
            throw new Error("file does not exist!");
        }
    }

    // Returns a random gem color from the available options
    getRandomGemColor(){
        const gemColors = ['redGem', 'yellowGem', 'blueGem', 'greenGem'];
        return gemColors[Math.floor(Math.random() * gemColors.length)];
    }

    // Plays a sound asset by its name, logs an error if not found
    playSound(soundName) {
        try {
            let sound = this.sounds.get(soundName);
            if (sound) {
                sound.play();
            } else {
                throw new Error("Sound not found!");
            }
        } catch (exc) {
            console.error("Error playing sound:", exc);
        }
    }
}
