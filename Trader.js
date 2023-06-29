class Trader extends Phaser.Scene {
    constructor() {
        super({ key: "Trader" })
    }

    init(data) {
        this.items = data.items
        this.hp = data.hp
        this.xp = data.xp
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

            for (let index = 0; index < this.items.length; index++) {
                if (this.items[index] == "Healthpotion_LVL_1") {
                    this.items[index] = new Healthpotion_LVL_1(this, this.player.x, this.player.y).setTexture("potion")
                    this.physics.add.existing(this.items[index])

                } else if (this.items[index] == "speedpotion_lvl_1") {
                    this.items[index] = new Speedpotion_LVL_1(this, this.player.x, this.player.y).setTexture("potion")
                    this.physics.add.existing(this.items[index])



                } else if (this.items[index] == "damagedecrease_lvl_1") {
                    this.items[index] = new Damagedecrease_LVL_1(this, this.player.x, this.player.y).setTexture("potion")
                    this.physics.add.existing(this.items[index])


                } else if (this.items[index] == "Healthpotion_LVL_2") {
                    this.items[index] = new Healthpotion_LVL_2(this, this.player.x, this.player.y).setTexture("potion")
                    this.physics.add.existing(this.items[index])


                } else if (this.items[index] == "regeneration_lvl_1") {
                    this.items[index] = new Regeneration_LVL_1(this, this.player.x, this.player.y).setTexture("potion")
                    this.physics.add.existing(this.items[index])


                }


            }


        

            this.player.inventory.items = this.items
            this.player.player_hp.hp_val = this.hp
            this.player.PlayerDefaultLevel.xp = this.xp
        }

        this.trader1 = new TraderNPC1(this, this.playerSpawnPoint.x - 150, this.playerSpawnPoint.y, "TraderIdleAnim")

        this.healthpotion_lvl_1 = new Healthpotion_LVL_1(this, this.trader1.x, this.trader1.y)
    }

    update() {

        for (let index = 0; index < this.items.length; index++) {
           this.items[index].update()
            
        }

        if (this.playerSpawnPoint && this.player) {
            this.player.update()
        }
        if (!this.coinCheck) {
            this.coinCount = this.player.coinCounter.increaseCoin(parseInt(localStorage.getItem("COINS")))
            this.coinText = this.player.coinCounter.coinText.setX(localStorage.getItem("X-COIN"))
            this.coinCheck = true
        }
        this.trader1.update()
        this.healthpotion_lvl_1.update()
    }
}