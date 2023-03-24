class Preloads extends Phaser.Scene {
    constructor () {
        super("bootGame");
    }

    //PRELOAD VON HINTERGRUND
    preload() {

        //PRELOAD BACKGROUND
        this.load.image("SkyBackground", "/new_assets/Background/Background.png")

        //PRELOAD GROUND
        this.load.image("boden", "/assets/ground/boden_welt_part1.png");
        this.load.image("boden-grass", "assets/ground/boden_welt_part2.png");

        //PRELOAD PLAYER
        this.load.spritesheet("PlayerIdle", "/new_assets/Character/Idle/Idle-Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("PlayerRun", "/new_assets/Character/Run/Run-Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("PlayerJump", "/new_assets/Character/Jumlp-All/Jump-All-Sheet.png", {
            frameWidth: 32,
            frameHeight: 64
        });

        this.load.spritesheet("PlayerAttack", "/new_assets/Character/Attack-01/Attack-01-Sheet.png", {
            frameWidth: 32,
            frameHeight: 64
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
    }

    create() {
        this.add.text(35, 35, "Das Spiel wird geladen...");

        this.anims.create({
            key: "Attack",
            frames: this.anims.generateFrameNumbers("PlayerAttack", { start: 0, end: 7 }),
            frameRate: 10,
        });

        this.anims.create({
            key: "Jump",
            frames: this.anims.generateFrameNumbers("PlayerJump", { start: 0, end: 14 }),
            seframeRate: 10,
        });

        this.anims.create({
            key: "Idle",
            frames: this.anims.generateFrameNumbers("PlayerIdle", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "MoveRight",
            frames: this.anims.generateFrameNumbers("PlayerRun", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "MoveLeft",
            frames: this.anims.generateFrameNumbers("PlayerRun", { start: 0, end: 7 }),
            frameRate: 10,
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