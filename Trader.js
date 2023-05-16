class Trader extends Phaser.Scene {
    constructor() {
        super("Trader")
    }

    create() {

        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.scale.width + 200, game.scale.height + 200)

        const map = this.make.tilemap({ key: "TRADER", tileWidth: 16, tileHeight: 16 })

        this.tileset = map.addTilesetImage("Tiles", "Tiles")

        // BENUTZT TILES
        this.layer = map.createLayer("ground", this.tileset, 0, 0)
        this.layer.setCollisionByProperty({ colliders: true })
    }

    update() {
        console.log("Trader Scene activee");
    }
}