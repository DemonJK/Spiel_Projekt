class Preloads extends Phaser.Scene {
    constructor () {
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

        //PRELOAD GROUND
        this.load.image("boden", "/assets/ground/boden_welt_part1.png");
        this.load.image("boden-grass", "assets/ground/boden_welt_part2.png");

        //PRELOAD PLAYER
        this.load.spritesheet("playermodel", "/assets/player_model/NightBorne.png", {
            frameWidth: 80,
            frameHeight: 80
        });

        //PRELOAD ENEMY
        this.load.spritesheet("enemy1", "/assets/enemy/idle/Idle.png", {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet("enemyrun", "/assets/enemy/run/Run.png", {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.spritesheet("enemydie", "/assets/enemy/death/Die.png", {
            frameWidth: 256,
            frameHeight: 256
        });

            console.log("All preloaded")
    }

    create() {
        this.add.text(35, 35, "Das Spiel wird geladen...");

        this.anims.create({
            key: "space",
            frames: this.anims.generateFrameNumbers("playermodel", { start: 46, end: 57 }),
            frameRate: 14,
        });

        this.anims.create({
            key: "up",
            frames: this.anims.generateFrameNumbers("playermodel", { start: 96, end: 100 }),
            frameRate: 6,
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("playermodel", { start: 0, end: 8 }),
            frameRate: 8,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("playermodel", { start: 23, end: 28 }),
            frameRate: 6,
            repeat: -1,
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("playermodel", { start: 23, end: 28 }),
            frameRate: 6,
            repeat: -1,
        });

        this.anims.create({
            key: "stand",
            frames: this.anims.generateFrameNumbers("enemy1", { start: 0, end: 10 }),
            frameRate: 8,
        });

        this.anims.create({
            key: "run-left",
            frames: this.anims.generateFrameNumbers("enemyrun", { start: 0, end: 6 }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "death-anim",
            frames: this.anims.generateFrameNumbers("enemydie", { start: 0, end: 13 }),
            frameRate: 8,
        })
        
        setTimeout(() => {
            this.scene.start("playGame")
        }, 4000);
    }
}




