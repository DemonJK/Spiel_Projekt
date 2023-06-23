class Trader extends Phaser.Scene {
    constructor() {
        super({ key: "Trader" })
    }

    create() {

        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.scale.width + 200, game.scale.height + 200)

        const map = this.make.tilemap({ key: "TRADER", tileWidth: 16, tileHeight: 16 })

        this.tilesetTiles = map.addTilesetImage("Tiles", "Tiles")
        this.tilesetGreenTree = map.addTilesetImage("Green-Tree", "Green-Tree")
        this.tilesetBuildings = map.addTilesetImage("Buildings", "Buildings")

        // BENUTZT GREEN-TREE
        this.greentreeLayer = map.createLayer("greenTreeLayer1", this.tilesetGreenTree, 0, 0)
        // BENUTZT TILES
        this.layerground1 = map.createLayer("groundLayer1", this.tilesetTiles, 0, 0)
        this.layerground1.setCollisionByProperty({ colliders: true })
        // BENUTZT BUILDINGS
        this.layerbuildings1 = map.createLayer("buildingsLayer1", this.tilesetBuildings, 0, 0)
        this.layerbuildings1.setCollisionByProperty({ colliders: true })
        // BENUTZT BUILDINGS
        this.layerbuildings3 = map.createLayer("buildingsLayer3", this.tilesetBuildings, 0, 0)
        // BENUTZT BUILDINGS
        this.layerbuildings2 = map.createLayer("buildingsLayer2", this.tilesetBuildings, 0, 0)

        this.spawnObjects = map.getObjectLayer("spawnPoints").objects

        this.spawnObjects.forEach(obj => console.log(obj.properties));

        // Finde den Spawn-Punkt für den Spieler
        this.playerSpawnPoint = { x: this.spawnObjects[0].x, y: this.spawnObjects[0].y }

        if (this.playerSpawnPoint) {
            // PLAYER
            this.player = new Player(this, this.playerSpawnPoint.x, this.playerSpawnPoint.y, "PlayerIdle")
        }

        this.trader1 = new TraderNPC1(this, this.playerSpawnPoint.x - 150, this.playerSpawnPoint.y, "TraderIdleAnim")
    }

    update() {
        if (this.playerSpawnPoint && this.player) {
            this.player.update()
        }
        if (!this.coinCheck) {
            console.log("CHECK");
            this.coinCount = this.player.coinCounter.increaseCoin(parseInt(localStorage.getItem("COINS")))
            this.coinCheck = true
        }
        this.trader1.update()
    }
}