class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel");
    }

    preload() {
        //PRELOAD ALL TILES
        this.load.image("Buildings", "/new_assets/Assets/Buildings.png")
        this.load.image("Hive", "/new_assets/Assets/Hive.png")
        this.load.image("Interior-01", "/new_assets/Assets/Interior-01.png")
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
        const tileset = map.addTilesetImage("Tiles", "Tiles")
        const layer = map.createStaticLayer("ground", tileset, 0, 0)
        const bushLayer = map.createStaticLayer("bush", tileset, 0, 0)

        this.player = new Player(this, 150, 150, "PlayerIdle")

        // CAMERA MOVING
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(0, 150);
        this.cameras.main.zoom = 1.5;

        layer.setCollisionBetween(0, 5)
        layer.setCollisionBetween(25, 30)
        layer.setCollisionBetween(50, 55)
        layer.setCollisionBetween(75, 80)
        layer.setCollisionBetween(100, 105)
        this.physics.add.collider(this.player, layer)
        
    }

    update() {
        console.log("Start Level")
        this.player.update()
    }
}