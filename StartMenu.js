class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu")
    }

    create() {
        this.Menubackground = this.add.image(0, 0, "Startmenu").setOrigin(0, 0)
        this.Menubackground.setDisplaySize(game.config.width, game.config.height)
    }

    update() {

    }
}