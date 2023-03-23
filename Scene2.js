class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }


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
        this.player = new Player(this, 150, 900, "playermodel");

        // ENEMY SPAWNING
        this.enemy = new Enemy(this, 900, 900, "enemy1")


        // CAMERA MOVING
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-250, 0)

        //CREATE BACKGROUND
        this.background5 = this.add.image(0, 0, "background5");
        this.background5.setOrigin(0, 0);
        this.background5.setScale(4.5);

        this.background6 = this.add.image(0, 0, "background6");
        this.background6.setOrigin(0, 0);
        this.background6.setScale(4.5);
    }

    update() {
        this.enemy.update()
        this.player.update()
    }
}