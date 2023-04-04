class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel");
    }

    preload() {
        //PRELOAD ALL TILES
        this.load.image("Buildings", "/new_assets/Assets/Buildings.png")
        this.load.image("Hive", "/new_assets/Assets/Hive.png")
        this.load.image("Inter ior-01", "/new_assets/Assets/Interior-01.png")
        this.load.image("Props-Rocks", "/new_assets/Assets/Props-Rocks.png")
        this.load.image("Tiles", "/new_assets/Assets/Tiles.png")
        this.load.image("Tree-Assets", "/new_assets/Assets/Tree-Assets.png")
        this.load.image("Background", "/new_assets/Trees/Background.png")
        this.load.image("Dark-Tree", "/new_assets/Trees/Dark-Tree.png")
        this.load.image("Golden-Tree", "/new_assets/Trees/Golden-Tree.png")
        this.load.image("Green-Tree", "/new_assets/Trees/Green-Tree.png")
        this.load.image("Red-Tree", "/new_assets/Trees/Red-Tree.png")
        this.load.image("Yellow-Tree", "/new_assets/Trees/Yellow-Tree.png")

        //PRELOAD TILED MAP
        this.load.tilemapTiledJSON("MAP", "/TiledLevels/TiledMapGameStartLevel.json")
    }

    create() {
        this.SkyBackground = this.add.image(0, 0, "SkyBackground")
        this.SkyBackground.setOrigin(0, 0)
        this.SkyBackground.setDisplaySize(2400, 1000)
        const map = this.make.tilemap({ key: "MAP", tileWidth: 16, tileHeight: 16 })
        this.tileset = map.addTilesetImage("Tiles", "Tiles")
        this.tileset2 = map.addTilesetImage("Buildings", "Buildings")
        this.buildings = map.createStaticLayer("buildings", this.tileset2, 0, 0)
        this.layer = map.createStaticLayer("ground", this.tileset, 0, 0)
        this.enemy = new Enemy(this, 750, 150, "enemy1")

        const bushLayer = map.createStaticLayer("bush", this.tileset, 0, 0)
        const testLayer = map.createStaticLayer("test", this.tileset, 0, 0)

        

        this.layer.setCollisionByProperty({ colliders: true })
        this.buildings.setCollisionByProperty({ colliders: true })

        this.player = new Player(this, 400, 150, "PlayerIdle")

        // CAMERA MOVING
        this.cameras.main.startFollow(this.player)
        this.cameras.main.followOffset.set(0, 150)
        this.cameras.main.zoom = 1.5

        


    }

    update() {
        console.log("Start Level")
        this.player.update()
        this.enemy.update()
        
        
    }
}