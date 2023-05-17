class Trader extends Phaser.Scene {
    constructor() {
        super({ key: "Trader"})
    }

    create() {

        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.scale.width + 200, game.scale.height + 200)

        const map = this.make.tilemap({ key: "TRADER", tileWidth: 16, tileHeight: 16 })

        this.tilesetTiles = map.addTilesetImage("Tiles", "Tiles")

        // BENUTZT TILES
        this.layerground = map.createLayer("ground", this.tilesetTiles, 0, 0)
        this.layerground.setCollisionByProperty({ colliders: true })


        // PLAYER
        this.player = new Player(this, 1050, 750, "PlayerIdle")
    }

    update() {
        this.player.update()
    }
}