class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
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
        console.log("Scene2 Background LOADED");

        //PRELOAD GROUND

        this.load.image("boden", "/assets/ground/boden_welt_part1.png");

        //PRELOAD PLAYER

        this.load.spritesheet("playermodel", "/assets/player_model/NightBorne.png", { frameWidth: 80, frameHeight: 80 });
        console.log("playermodel LOADED");

        //PRELOAD ENEMY
        this.load.spritesheet("enemy1", "/assets/enemy/idle/Idle.png", { frameWidth: 256, frameHeight: 256 });
        console.log("enemy1 IDLE LOADED");
        this.load.spritesheet("enemyrun", "/assets/enemy/run/Run.png", { frameWidth: 256, frameHeight: 256 });
        console.log("enemyrun RUN LOADED")

    }

    //CREATE VON HINTERGRUND UND TEXT "DAS SPIEl WIRD GESPIELT

    create() {

        this.player_is_touching_enemy = false;

        //CREATE BACKGROUND

        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.background.setScale(4.5);

        this.background2 = this.add.image(0, 0, "background2");
        this.background2.setOrigin(0, 0);
        this.background2.setScale(4.5);

        this.background3 = this.add.image(0, 0, "background3");
        this.background3.setOrigin(0, 0);
        this.background3.setScale(4.5);

        this.background4 = this.add.image(0, 0, "background4");
        this.background4.setOrigin(0, 0);
        this.background4.setScale(4.5);

        //PLATFORM (BODEN)

        const platforms = this.physics.add.staticGroup();
        platforms.create(0, 0, "boden").setOrigin(0, -15).setScale(4.5).refreshBody();

        //ENEMY SPAWNING

        console.log("ENEMY SPAWNING");
        this.enemy = this.physics.add.sprite(1500, 3000, "enemy1").setFlipX(true);
        this.enemy.body.setSize(90, 137, 1);
        this.enemy.body.setOffset(93, 67);
        this.enemy.setScale(2);
        this.enemy.setBounce(0.2);
        this.physics.add.existing(this.enemy);
        this.enemy.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemy, platforms);

        //PLAYER SPAWNING

        function collideObjects() {
            this.enemy.setVelocityX(0);
            this.player.setVelocityX(0);
        }

        console.log("PLAYER SPAWNING");
        this.player = this.physics.add.sprite(150, 900, "playermodel");
        this.player.body.setSize(30, 30, 1);
        this.player.body.setOffset(25, 33);
        this.player.setScale(5);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, this.enemy, collideObjects, null, this);
        console.log("PLAYER SPAWNED");

        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-250, 0)

        //CREATE BACKGROUND

        this.background5 = this.add.image(0, 0, "background5");
        this.background5.setOrigin(0, 0);
        this.background5.setScale(4.5);

        this.background6 = this.add.image(0, 0, "background6");
        this.background6.setOrigin(0, 0);
        this.background6.setScale(4.5);

        //CREATE TEXT

        console.log("TEXT LOAD");
        this.add.text(35, 35, "Das Spiel wird gespielt", {
            font: "30px Arial",
            fill: "black",
        });
        console.log("TEXT LOADED");

        //ANIMATIONEN DES SPIELS

        //PLAYER
        //0 - 8 (22)
        //23 - 28 (45)
        //46 - 57 (68)
        //69 - 73 (91)
        //92 - 114 (114)
        //PLAYER

        //ENEMY STAND
        //0 - 11 (12)
        //ENEMY STAND

        console.log("ANIMS LOADING")

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
            frameRate: 6,
            repeat: -1,
        });

        console.log("ENDE VON CREATE ANIMS");
    }

    update() {

        //ÜBERPRÜFT DIE X UND Y KORDINATEN ZWICHEN GEGNER UND SPIELER SODASS DER GEGNER NICHT BEWEGBAR IST
        //NUR AN MACHEN UM ETWAS ZU ÜBERPRÜFEN

        //console.log("Player X: " + Math.round(this.player.x) + " Enemy X: " + (Math.round(this.enemy.x - 145)));
        //console.log("Enemy X: " + Math.round(this.enemy.x) + " Player X: " + (Math.round(this.player.x - 185)));
        //console.log("Player Y: " + Math.round(this.player.y + 237) + " Enemy Y; " + (Math.round(this.enemy.y)));


        //CONTROLS OF PLAYERMODEL

        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && !(Math.round(this.enemy.x) === Math.round(this.player.x - 185))) {
            this.player.setVelocityX(-160).setFlipX(-1);
            this.player.anims.play("left", true);
            this.cameras.main.followOffset.x = -250

        } else if (cursors.right.isDown && !(Math.round(this.player.x) === Math.round(this.enemy.x - 145))) {
            this.player.setVelocityX(160).setFlipX(0);
            this.player.anims.play("right", true);
            this.cameras.main.followOffset.x = -250;

        } else if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-495);
            this.player.anims.play("up", true);

        } else if (cursors.space.isDown && this.player.body.touching.down) {
            this.player.anims.play("space", true);
            this.player.setVelocityX(0);

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }

        if ((Math.round(this.player.y + 237) === Math.round(this.enemy.y)) && !(Math.round(this.player.x) === Math.round(this.enemy.x - 145))) {
            if (cursors.left.isDown) {
                this.player.setPosition(this.enemy.x - 220, this.player.y)
            } else if (cursors.right.isDown) {
                this.player.setPosition(this.enemy.x + 220, this.player.y)
            };
        }

        if (!(Math.round(this.player.x) === Math.round(this.enemy.x - 145))) {
            if (this.enemy.body.touching.down) {
                this.enemy.body.setOffset(67, 65);
                this.enemy.setVelocityX(-45);
                this.enemy.anims.play("run-left", true);
                console.log("ENEMY X: ", this.enemy.x, "PLAYER X: ", this.player.x)
            } else if (this.enemy.body.touching.down) {
                this.enemy.anims.play("stand", true);
            }
        } else {
            this.enemy.anims.play("stand", true);
        }
    }
}
