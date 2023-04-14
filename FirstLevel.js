class FirstLevel extends Phaser.Scene {
    constructor() {
        super("FirstLevel")
    }

    create() {
        const map = this.make.tilemap({ key: "NIGHTMAP", tileWidth: 16, tileHeight: 16 })

        this.tileset = map.addTilesetImage("Tiles", "Tiles")

        //BENUTZT TILES
        this.groundlayer = map.createStaticLayer("groundlayer", this.tileset, 0, 0)
        this.groundlayer.setCollisionByProperty({ colliders: true })

        // PLAYER
        this.player = new Player(this, 15, 15, "PlayerIdle")

        // CAMERA MOVING
        this.cameras.main.startFollow(this.player)
        this.cameras.main.followOffset.set(0, 150)
        this.cameras.main.zoom = 2
    }

    update() {
        this.player.update()
    }
}