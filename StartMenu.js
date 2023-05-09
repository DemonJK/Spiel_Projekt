class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu")
    }

    create() {
        this.Menubackground = this.add.image(0, 0, "Startmenu").setOrigin(0, 0)
        this.Menubackground.setDisplaySize(game.config.width, game.config.height)

        const map = this.make.tilemap({ key: "STARTMENU", tileWidth: 16, tileHeight: 16 })

        this.tileset = map.addTilesetImage("GUI", "GUI")

        this.layer = map.createLayer("TileLayer", this.tileset, 0, 0)
    }

    update() {

    }
}