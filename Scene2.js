class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
        this.is_coliding = false
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

    //CREATE VON HINTERGRUND UND TEXT "DAS SPIEl WIRD GESPIELT

    collideObjects() {
        this.is_coliding = true
    }

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

        //PLATFORM (BODEN) 1

        const platforms = this.physics.add.staticGroup();
        platforms.create(0, 0, "boden").setOrigin(0, -15).setScale(4.5).refreshBody();

        const platforms4 = this.physics.add.staticGroup();
        platforms.create(0, -5, "boden").setOrigin(0, -15).setScale(4.5).refreshBody();

        //PLATFORM (LUFT) 2
        //BEARBEITUNG

        this.passThruPlatforms = this.physics.add.staticGroup();
        this.passThruPlatforms.create(0, 296, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
            .body.checkCollision.down = false;
        this.bodengrass = this.add.image(0, 650, "boden-grass");
        this.bodengrass.setOrigin(0, 0);
        this.bodengrass.setScale(1.5);

        //PLATFORM (LUFT) 3
        //BEARBEITUNG

        this.passThruPlatforms2 = this.physics.add.staticGroup();
        this.passThruPlatforms2.create(1350, 260, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
            .body.checkCollision.down = false;
        this.bodengrass = this.add.image(1350, 615, "boden-grass");
        this.bodengrass.setOrigin(0, 0);
        this.bodengrass.setScale(1.5);

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
        this.physics.add.collider(this.enemy, this.passThruPlatforms, this.onPlatform);
        this.physics.add.collider(this.enemy, this.passThruPlatforms2, this.onPlatform);
        this.physics.add.collider(this.enemy, platforms4);
        this.enemy.setPushable(false)

        //PLAYER SPAWNING


        console.log("PLAYER SPAWNING");
        this.player = this.physics.add.sprite(150, 900, "playermodel");
        this.player.body.setSize(30, 30, 1);
        this.player.body.setOffset(25, 33);
        this.player.setScale(5);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, this.passThruPlatforms, this.onPlatform);
        this.physics.add.collider(this.player, this.passThruPlatforms2, this.onPlatform);
        this.physics.add.collider(this.player, platforms4);
        this.physics.add.collider(this.player, this.enemy, this.collideObjects, null, this);
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

    onPlatform(player, platform) {
        player.isOnPlatform = true;
        player.onPlatform = platform;
    }

    update() {


        //ÜBERPRÜFT DIE X UND Y KORDINATEN ZWICHEN GEGNER UND SPIELER SODASS DER GEGNER NICHT BEWEGBAR IST
        //NUR AN MACHEN UM ETWAS ZU ÜBERPRÜFEN

        //console.log("Player X: " + Math.round(this.player.x) + " Enemy X: " + (Math.round(this.enemy.x - 145)));
        //console.log("Enemy X: " + Math.round(this.enemy.x) + " Player X: " + (Math.round(this.player.x - 185)));
        //console.log("Player Y: " + Math.round(this.player.y + 237) + " Enemy Y; " + (Math.round(this.enemy.y)));


        //CONTROLS OF PLAYERMODEL
        this.cursors = this.input.keyboard.createCursorKeys();
        if ((this.cursors.up.isDown && this.player.body.touching.down)) {
            console.log("UP CURSOR IS ACTIVE");
            this.player.setVelocityY(-800);
            this.player.anims.play("up", true);
            if (this.isOnPlatform) {
                this.onPlatform.body.checkCollision.up = true;
                this.isOnPlatform = false;
                this.onPlatform = null;
            }
        } else if (this.cursors.left.isDown && !(Math.round(this.enemy.x) === Math.round(this.player.x - 185))) {
            console.log("LEFT CURSOR IS ACTIVE");
            this.player.setVelocityX(-160).setFlipX(-1);
            this.player.anims.play("left", true);
            this.cameras.main.followOffset.x = -250

        } else if (this.cursors.right.isDown) {
            console.log("RIGHT CURSOR IS ACTIVE");
            this.player.setVelocityX(160).setFlipX(0);
            this.player.anims.play("right", true);
            this.cameras.main.followOffset.x = -250;

        } else if (this.cursors.space.isDown && this.player.body.touching.down) {
            console.log("SPACEBAR IS ACTIVE");
            this.player.anims.play("space", true);
            this.player.setVelocityX(0);

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }

        if ((this.cursors.down.isDown)) {
            console.log("DOWN CURSOR IS ACTIVE")
            this.passThruPlatforms.clear()
            this.passThruPlatforms2.clear()
            setTimeout(() => {
                this.passThruPlatforms.create(0, 296, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                    .body.checkCollision.down = false;
                this.passThruPlatforms2.create(1350, 260, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                    .body.checkCollision.down = false;

            }
                , 3000);



        }


        if ((Math.round(this.player.y + 237) === Math.round(this.enemy.y)) && !(Math.round(this.player.x) === Math.round(this.enemy.x - 145))) {
            if (this.cursors.left.isDown) {
                this.player.setPosition(this.enemy.x - 220, this.player.y)
            } else if (this.cursors.right.isDown) {
                this.player.setPosition(this.enemy.x + 220, this.player.y)
            };
        }

        //
        //
        // PROBLEM BEREICH
        //
        //

        if (!(Math.round(this.player.x) === Math.round(this.enemy.x - 197))) {
            if (this.player.x < this.enemy.x && this.enemy.body.touching.down || this.player.x > this.enemy.x && this.enemy.body.touching.down) {
                if (this.player.x < this.enemy.x && this.enemy.body.touching.down) {
                    if ((this.player.x + 25) > (this.enemy.x - 170) && this.player.y < this.enemy.y + 500) {
                        this.enemy.setVelocityX(0);
                        this.enemy.anims.play("stand", true)
                    } else {
                        this.left_point = this.enemy.body.x - 200
                        if (this.player.x < this.left_point) {
                            this.enemy.body.setOffset(67, 65);
                            this.enemy.setVelocityX(-55).setFlipX(-1);
                            //console.log("Player X: " + Math.round(this.player.x) + " Enemy X: " + (Math.round(this.enemy.x - 197)));
                            this.enemy.anims.play("run-left", true);
                        }
                    }
                } else if (this.player.x > this.enemy.x && this.enemy.body.touching.down) {
                    this.enemy.body.setOffset(97, 65);
                    this.enemy.setVelocityX(55).setFlipX(0);
                    //console.log("Enemy X: " + Math.round(this.enemy.x) + " Player X: " + (Math.round(this.player.x - 193)));
                    this.enemy.anims.play("run-left", true);
                } else {
                    this.enemy.body.setOffset(97, 67);
                    this.enemy.anims.play("stand", true)
                }
            }
        } else {
            this.enemy.body.setOffset(97, 67);
            this.enemy.anims.play("stand", true)
        }
    }
}