class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel")
    }

    create() {

        this.SkyBackground = this.add.image(0, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(game.scale.width, game.scale.height)
        this.SkyBackground2 = this.add.image(game.scale.width, 0, "SkyBackground").setOrigin(0, 0)
        this.SkyBackground2.setDisplaySize(game.scale.width, game.scale.height)

        const map = this.make.tilemap({ key: "MAP", tileWidth: 16, tileHeight: 16 })

        this.tileset = map.addTilesetImage("Tiles", "Tiles")
        this.tileset2 = map.addTilesetImage("Buildings", "Buildings")
        this.tileset3 = map.addTilesetImage("Props-Rocks", "Props-Rocks")
        this.tileset4 = map.addTilesetImage("Green-Tree", "Green-Tree")
        this.tileset5 = map.addTilesetImage("Background", "Background")
        this.tileset6 = map.addTilesetImage("Interior-01", "Interior-01")

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
        // BENUTZT INTERIOR
        this.interior = map.createLayer("interior", this.tileset6, 0, 0)
        // BENUTZT INTERIOR
        this.interior2 = map.createLayer("interior2", this.tileset6, 0, 0)

        // GROUP COLLIDER
        this.group = this.physics.add.group();

        // PLAYER
        this.player = new Player(this, 1050, 850, "PlayerIdle")

        // enemy configs
        this.enemy_configs = new Config()

        // ENEMY
        this.enemy = new Enemy(this, 1950, 750, "enemy1", this.enemy_configs.GreenGiantConfig)

        // BoD_Enemy
        this.BoD = new Enemy(this, 1700, 750, "SIdle", this.enemy_configs.Skeleton_Config)


        // COLLIDER PLAYER ENEMYs
        this.physics.add.collider(this.group, this.player)

        // BENUTZT TILES
        this.layer2 = map.createLayer("ground2", this.tileset, 0, 0)

        //INGAME AUDIO TEST
        this.Ambient1 = this.sound.add("ambient1", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient2 = this.sound.add("ambient2", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient3 = this.sound.add("ambient3", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient4 = this.sound.add("ambient4", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient5 = this.sound.add("ambient5", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient6 = this.sound.add("ambient6", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient7 = this.sound.add("ambient7", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient8 = this.sound.add("ambient8", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient9 = this.sound.add("ambient9", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.Ambient10 = this.sound.add("ambient10", {
            loop: false,
            volume: 0.23,
            detune: -220,
        })

        this.ambients = [
            this.Ambient1,
            this.Ambient2,
            this.Ambient3,
            this.Ambient4,
            this.Ambient5,
            this.Ambient6,
            this.Ambient7,
            this.Ambient8,
            this.Ambient9,
            this.Ambient10
        ]

        this.random_ambient_num = Math.floor(Math.random() * 10);

        this.Ambient1.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient2.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient3.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient4.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient5.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient6.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient7.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient8.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient9.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.Ambient10.on('complete', () => {
            this.ambients[Math.floor(Math.random() * 10)].play()
        })

        this.ambients[this.random_ambient_num].play()
        this.ambients[this.random_ambient_num].onBlur = false
        this.ambients[this.random_ambient_num].volume = 0

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

        this.shadowBox = this.add.rectangle(this.player.x + 365, this.player.y + 15,
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
        this.BoD.update()

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