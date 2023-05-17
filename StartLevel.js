class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel")
    }

    create() {

        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.scale.width + 200, game.scale.height + 200)
        this.SkyBackground2 = this.add.image(2840, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground2.setDisplaySize(game.scale.width + 200, game.scale.height + 200)

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

        // BENUTZT TILES
        this.layer2 = map.createLayer("ground2", this.tileset, 0, 0)

        //INGAME AUDIO TEST
        this.Ambient1 = this.sound.add("ambient1", {
            loop: true,
            volume: 0.055,
            detune: -220,
        })

        this.Ambient2 = this.sound.add("ambient2", {
            loop: true,
            volume: 0.055,
            detune: -220,
        })
        this.Ambient3 = this.sound.add("ambient3", {
            loop: true,
            volume: 0.055,
            detune: -220,
        })
        this.Ambient4 = this.sound.add("ambient4", {
            loop: true,
            volume: 0.055,
            detune: -220,
        })

    

        this.ambients = [this.Ambient1, this.Ambient2, this.Ambient3, this.Ambient4]
        this.random_ambient_num = Math.floor(Math.random() * 4);

        this.Ambient1.on('complete', ()=>{
            this.ambients[Math.floor(Math.random() * 4)].play()
        })

        this.Ambient2.on('complete', ()=>{
            this.ambients[Math.floor(Math.random() * 4)].play()
        })

        this.Ambient3.on('complete', ()=>{
            this.ambients[Math.floor(Math.random() * 4)].play()
        })

        this.Ambient4.on('complete', ()=>{
            this.ambients[Math.floor(Math.random() * 4)].play()
        })

        this.ambients[this.random_ambient_num].play()
        this.ambients[this.random_ambient_num].onBlur = false


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
        this.hint = this.add.text(0, 0,
            "There is an abandoned House," + " I should check it out", {
            fontSize: "32px",
            fontFamily: "Arial",
            fill: "#fff"
        }).setPosition(this.player.x, this.player.y /*+ 150*/)
        this.hint.setScrollFactor(0, 0)
        this.hint.visible = false
        this.textBounds = this.hint.getBounds()

        this.shadowBox = this.add.rectangle(this.player.x+365, this.player.y+15,
            this.textBounds.width,
            this.textBounds.height
        )
        this.shadowBox.setFillStyle(0x000000, 0.3)
        this.shadowBox.setScrollFactor(0, 0)
        this.shadowBox.visible = false
    }

    update() {
        this.player.update()
        this.enemy.update()
        if (this.physics.overlap(this.textbox, this.player)) {
            if (!this.player.readen) {
                this.hint.visible = true
                this.shadowBox.visible = true
                console.log(this.hint.x);
                console.log(this.hint.y);
                console.log(this.shadowBox.x);
                console.log(this.shadowBox.y);

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
            this.shadowBox.visible = false
        }
    }
}