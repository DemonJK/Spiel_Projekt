class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu")
        this.zoomEffect = false
        this.panEffect = false
    }

    create() {
        this.Menubackground = this.add.image(0, 0, "Startmenu").setOrigin(0, 0)
        this.Menubackground.setDisplaySize(game.config.width, game.config.height)
        this.zoomer()
        setTimeout(() => {
            console.log("timer over");
            this.create2()
        }, 38000);

        /*
        const map = this.make.tilemap({ key: "STARTMENU", tileWidth: 16, tileHeight: 16 })
        this.tileset = map.addTilesetImage("GUI", "GUI")
        this.layer = map.createLayer("TileLayer", this.tileset, 0, 0)
        */
    }

    zoomer() {
        if (this.zoomEffect === false) {
            this.cameras.main.fadeIn(6000)
            setTimeout(() => {
                if (this.panEffect === false) {
                    console.log("zoomTopLeft");
                    this.zoomTopLeft()
                    setTimeout(() => {
                        if (this.panEffect === false) {
                            console.log("zoomBottomRight");
                            this.zoomBottomRight()
                            setTimeout(() => {
                                if (this.panEffect === false) {
                                    console.log("zoomBottomLeft");
                                    this.zoomBottomLeft()
                                    setTimeout(() => {
                                        if (this.panEffect === false) {
                                            console.log("zoomTopRight");
                                            this.zoomTopRight()
                                            setTimeout(() => {
                                                if (this.panEffect === false) {
                                                    console.log("zoomCenter");
                                                    this.zoomCenter()
                                                }
                                            }, 6000);
                                        }
                                    }, 6000);
                                }
                            }, 6000)
                        }
                    }, 6000)
                }
            }, 6100)
        }
    }

    zoomTopLeft() {
        this.cameras.main.zoomTo(1.5, 5000)
        this.cameras.main.pan(932, 382, 5000)
    }

    zoomTopRight() {
        this.cameras.main.zoomTo(1.5, 5000)
        this.cameras.main.pan(932 * 2, 382, 5000)
    }

    zoomBottomLeft() {
        this.cameras.main.zoomTo(1.5, 5000)
        this.cameras.main.pan(932, 382 * 2, 5000)
    }

    zoomBottomRight() {
        this.cameras.main.zoomTo(1.5, 5000)
        this.cameras.main.pan(932 * 2, 382 * 2, 5000)
    }

    zoomCenter() {
        this.cameras.main.zoomTo(1, 5000)
        this.cameras.main.pan(
            game.config.width / 2,
            game.config.height / 2,
            5000)
        this.panEffect = true
        console.log("done");
    }

    create2() {
        if (this.panEffect === true) {

            this.boxInt = this.add.rectangle(
                /*x*/game.config.width / 2,
                /*y*/game.config.height / 2,
                /*width*/100,
                /*height*/100,
                /*fillColor*/0x680B0B
            ).setDepth(0)

            this.textPlay = this.add.text(
                game.config.width / 2,
                game.config.height / 2,
                "Play"
            ).setDepth(1)
            console.log(this.textPlay);
        }
    }

    update() {

    }

    testStuff() {
        this.cameras.add(
                /*x*/game.config.width,
                /*y*/game.config.height,
                /*width*/game.config.width,
                /*height*/game.config.height,
                /*makeMain*/false,
        )
    }
}