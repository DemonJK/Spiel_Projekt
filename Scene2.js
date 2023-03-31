class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {

        //CREATE BACKGROUND
        this.SkyBackground = this.add.image(0, 0, "SkyBackground");
        this.SkyBackground.setOrigin(0, 0);
        this.SkyBackground.setScale(5.3);

        //PLATFORM (BODEN) 1
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(0, 0, "boden").setOrigin(0, -15).setScale(4.5).refreshBody();

        this.platforms4 = this.physics.add.staticGroup();
        this.platforms.create(0, -5, "boden").setOrigin(0, -15).setScale(4.5).refreshBody();

        //PLATFORM (LUFT) 2
        this.passThruPlatforms = this.physics.add.staticGroup();
        this.passThruPlatforms.create(0, 296, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
            .body.checkCollision.down = false;
        this.bodengrass = this.add.image(0, 650, "boden-grass");
        this.bodengrass.setOrigin(0, 0);
        this.bodengrass.setScale(1.5);

        //PLATFORM (LUFT) 3
        this.passThruPlatforms2 = this.physics.add.staticGroup();
        this.passThruPlatforms2.create(1350, 260, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
            .body.checkCollision.down = false;
        this.bodengrass = this.add.image(1350, 615, "boden-grass");
        this.bodengrass.setOrigin(0, 0);
        this.bodengrass.setScale(1.5);

        //PLAYER SPAWNING
        this.player = new Player(this, 150, 1200, "PlayerIdle");

        // ENEMY SPAWNING
        this.enemy = new Enemy(this, 900, 900, "enemy1");

        // CAMERA MOVING
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(0, 150);
        this.cameras.main.zoom = 1.5;

        this.add.image(0, 0, "Buildings")

        setTimeout(() => {
            this.scene.start("StartLevel")
        }, 5000);
    }

    update() {
        this.enemy.update();
        this.player.update();
    }
}