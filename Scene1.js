class Preload extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    //PRELOAD VON HINTERGRUND

    preload() {

        //PRELOAD BACKGROUND

        this.load.image("background", "/assets/images/HillsLayer01.png");
        this.load.image("background2", "/assets/images/HillsLayer02.png");
        this.load.image("background3", "/assets/images/HillsLayer03.png");
        this.load.image("background4", "/assets/images/HillsLayer04.png");
        this.load.image("background5", "/assets/images/HillsLayer05.png");
        this.load.image("background6", "/assets/images/HillsLayer06.png");
        console.log("background LOADED");

        //PRELOAD GROUND

        this.load.image("boden", "/assets/ground/boden_welt_part1.png");
        this.load.image("boden-grass", "assets/ground/boden_welt_part2.png");

        //PRELOAD PLAYER

        this.load.spritesheet("playermodel", "/assets/player_model/NightBorne.png", { frameWidth: 80, frameHeight: 80 });
        console.log("playermodel LOADED");

        //PRELOAD ENEMY
        this.load.spritesheet("enemy1", "/assets/enemy/idle/Idle.png", { frameWidth: 256, frameHeight: 256 });
        console.log("enemy1 IDLE LOADED");
        this.load.spritesheet("enemyrun", "/assets/enemy/run/Run.png", { frameWidth: 256, frameHeight: 256 });
        console.log("enemyrun RUN LOADED")

    }

    create() {
        this.add.text(35, 35, "Das Spiel wird geladen...");


        this.scene.start("playGame");
    }
}




