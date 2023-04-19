class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel")
    }

    create() {
        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.config.width + 200, game.config.height + 200)
        this.SkyBackground2 = this.add.image(2840, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground2.setDisplaySize(game.config.width + 200, game.config.height + 200)

        const map = this.make.tilemap({ key: "MAP", tileWidth: 16, tileHeight: 16 })

        this.tileset = map.addTilesetImage("Tiles", "Tiles")
        this.tileset2 = map.addTilesetImage("Buildings", "Buildings")
        this.tileset3 = map.addTilesetImage("Props-Rocks", "Props-Rocks")
        this.tileset4 = map.addTilesetImage("Green-Tree", "Green-Tree")
        this.tileset5 = map.addTilesetImage("Background", "Background")

        // BENUTZT BACKGROUND
        this.background = map.createLayer("background", this.tileset5, 0, 0)
        // BENUTZT GREEN-TREE
        this.tree = map.createLayer("greentree", this.tileset4, 0, 0)
        // BENUTZT GREEN-TREE
        this.tree2 = map.createLayer("greentree2", this.tileset4, 0, 0)
        // BENUTZT GREEN-TREE
        this.tree3 = map.createLayer("greentree3", this.tileset4, 0, 0)
        // BENUTZT GREEN-TREE
        this.tree4 = map.createLayer("greentree4", this.tileset4, 0, 0)
        // BENUTZT TILES
        this.bushLayer = map.createLayer("bush", this.tileset, 0, 0)
        // BENUTZT PROPS-ROCKS
        this.props = map.createLayer("props", this.tileset3, 0, 0)
        // BENUTZT PROPS-ROCKS
        this.props2 = map.createLayer("props2", this.tileset3, 0, 0)
        // BENUTZT TILES
        this.layer = map.createLayer("ground", this.tileset, 0, 0)
        this.layer.setCollisionByProperty({ colliders: true })
        // BENUTZT BUILDINGS
        this.buildings2 = map.createLayer("buildings2", this.tileset2, 0, 0)
        this.buildings2.setCollisionByProperty({ colliders: true })
        // BENUTZT BUILDINGS
        this.buildings3 = map.createLayer("buildings3", this.tileset2, 0, 0)
        this.buildings3.setCollisionByProperty({ colliders: true })
        // BENUTZT BUILDINGS
        this.buildings = map.createLayer("buildings", this.tileset2, 0, 0)
        this.buildings.setCollisionByProperty({ colliders: true })

        // ENEMY
        this.enemy = new Enemy(this, 1550, 750, "enemy1")

        // PLAYER
        this.player = new Player(this, 1050, 750, "PlayerIdle")

        // BORDERS
        this.border = this.add.rectangle(900, 750, 20, 1000)
        this.physics.add.existing(this.border, true)
        this.physics.add.collider(this.player, this.border)

        this.border2 = this.add.rectangle(3050, 700, 20, 200)
        this.physics.add.existing(this.border2, true)
        this.physics.add.collider(this.player, this.border2)

        this.house_box = this.add.rectangle(3050, 900, 10, 1000,)
        this.physics.add.existing(this.house_box, true)

        this.textbox = this.add.rectangle(2200, 900, 10, 1000,)
        this.physics.add.existing(this.textbox, true)

        // TEXT
        this.hint = this.add.text(this.player.x, this.player.y+20,
            "There is an abandoned House," + "I should check it out")
        this.hint.setScrollFactor(0, 0)
        this.hint.visible = false
    }

    update() {
        this.player.update()
        this.enemy.update()

        if (this.physics.overlap(this.textbox, this.player)) {
            if (!this.player.readen) {                
                this.hint.visible = true
            
                setTimeout(() => {
                    this.player.readen = true
                    if (this.player.readen = true) {
                        this.textbox.destroy(true)
                    }
                }, 1000);
            }
        }

        if (this.physics.overlap(this.house_box, this.player)) {
            this.hint.visible = false
        }
    }
}