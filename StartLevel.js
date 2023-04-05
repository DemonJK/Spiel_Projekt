class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel");
    }

    create() {
        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.config.width + 200, game.config.height + 200)

        const map = this.make.tilemap({ key: "MAP", tileWidth: 16, tileHeight: 16 })
        this.tileset = map.addTilesetImage("Tiles", "Tiles")
        this.tileset2 = map.addTilesetImage("Buildings", "Buildings")
        this.buildings = map.createStaticLayer("buildings", this.tileset2, 0, 0)
        this.layer = map.createStaticLayer("ground", this.tileset, 0, 0)
        const bushLayer = map.createStaticLayer("bush", this.tileset, 0, 0)
        this.enemy = new Enemy(this, 1550, 750, "enemy1")
        this.layer.setCollisionByProperty({ colliders: true })
        this.buildings.setCollisionByProperty({ colliders: true })
        this.player = new Player(this, 1050, 750, "PlayerIdle")

        // CAMERA MOVING
        this.cameras.main.startFollow(this.player)
        this.cameras.main.followOffset.set(0, 150)
        this.cameras.main.zoom = 2

        this.border = this.add.rectangle(900, 750, 20, 1000)
        this.physics.add.existing(this.border, true)
        this.physics.add.collider(this.player, this.border);
    }

    update() {
        console.log("Start Level")
        this.player.update()
        this.enemy.update()
    }

    static center(obj) {
        obj.x = game.config.width / 2
        obj.y = game.config.height / 2
    }
}