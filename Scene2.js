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

    }

    //CREATE VON HINTERGRUND UND TEXT "DAS SPIEl WIRD GESPIELT

    create() {

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
        this.enemy = this.physics.add.sprite(1000, 900, "enemy1").setFlipX(0);
        this.enemy.body.setSize(90, 137, 1);
        this.enemy.body.setOffset(73, 67);
        this.enemy.setScale(2);
        this.enemy.setBounce(0.2);
        this.enemy.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemy, platforms);
        this.enemy.setBounce(0.0);
        console.log("ENEMY SPAWNED");

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
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, this.enemy, collideObjects, null, this);
        console.log("PLAYER SPAWNED");

        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-300, 0)


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

        console.log("ENDE VON CREATE ANIMS");
    }

    update() {

        //CONTROLS OF PLAYERMODEL
        var touching = this.player.body.touching;
        var delta = new Phaser.Math.Vector2();
        var rect = new Phaser.Geom.Rectangle();

        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown && !touching.left) {
            this.player.setVelocityX(-160).setFlipX(-1);
            this.player.anims.play("left", true);
            this.cameras.main.followOffset.x = -300
        } else if (cursors.right.isDown && !touching.right) {
            this.player.setVelocityX(160).setFlipX(0);
            this.player.anims.play("right", true);
            this.cameras.main.followOffset.x = -300;
        } else if (cursors.up.isDown && this.player.body.touching.down && !touching.up) {
            this.player.setVelocityY(-495);
            this.player.anims.play("up", true);
        } else if (cursors.space.isDown && this.player.body.touching.down && !touching.down) {
            this.player.anims.play("space", true);
            this.player.setVelocityX(0);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }

        this.enemy.anims.play("stand", true);

        if (!this.player.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {

            delta.copy(this.player.body.velocity).scale(1 / this.physics.world.fps);

            rect.setTo(
                this.player.body.x + delta.x,
                this.player.body.y + delta.y,
                this.player.body.width,
                this.player.body.height
            )

            var bodies = this.physics.overlapRect(rect.x, rect.y, rect.width, rect.height, true, true);

            Phaser.Utils.Array.Remove(bodies, this.player.body);

            if (bodies.length) {
                if (delta.x) this.player.setVelocityX(0);
                if (delta.y) this.player.setVelocityY(0);
            }
        }
    }
}
