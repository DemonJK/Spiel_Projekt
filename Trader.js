class Trader extends Phaser.Scene {
    constructor() {
        super({ key: "Trader" })
    }

    create() {

        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.scale.width + 200, game.scale.height + 200)

        const map = this.make.tilemap({ key: "TRADER", tileWidth: 16, tileHeight: 16 })

        this.tilesetTiles = map.addTilesetImage("Tiles", "Tiles")

        // BENUTZT TILES
        this.layerground = map.createLayer("groundLayer1", this.tilesetTiles, 0, 0)
        this.layerground.setCollisionByProperty({ colliders: true })

        this.spawnObjects = map.getObjectLayer("spawnPoints").objects

        this.spawnObjects.forEach(obj => console.log(obj.properties));

        // Finde den Spawn-Punkt für den Spieler
        this.playerSpawnPoint = {x: this.spawnObjects[0].x, y: this.spawnObjects[0].y}

        if (this.playerSpawnPoint) {
            // PLAYER
            this.player = new Player(this, this.playerSpawnPoint.x, this.playerSpawnPoint.y, "PlayerIdle")
        }
    }

    update() {
        if (this.playerSpawnPoint && this.player) {
            this.player.update()
        }
    }
}