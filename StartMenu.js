class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu")
    }

    create() {
        this.Menubackground = this.add.image(0, 0, "Startmenu").setOrigin(0, 0)
        this.Menubackground.setDisplaySize(game.scale.width, game.scale.height)
        this.zoomEffect = false
        this.panEffect = false
        this.isSelected = false
        this.keyE = this.input.keyboard.addKey("E")
        this.cursors = this.input.keyboard.createCursorKeys()
        this.zoomer()
        setTimeout(() => {
            if (this.panEffect === true) {

                this.textPlay = this.add.text(
                    /*x*/game.scale.width / 2,
                    /*y*/game.scale.height / 2,
                    /*text*/"Start a New Game",
                ).setOrigin(0.5, 0.5).setScale(1.5, 1.5).setDepth(1)

                this.boxInt = this.add.rectangle(
                    /*x*/game.scale.width / 2,
                    /*y*/game.scale.height / 2,
                    /*width*/0, /* MUSS VERÄNDERT WERDEN SODASS AUTO ANPASSUNG KLAPPT */ 
                    /*height*/0,
                    /*fillColor*/0x680B0B,
                    /*fillAlpha*/0.45
                )

                this.boxInt.setSize(this.textPlay.width + 20, this.textPlay.height + 20)
                this.boxInt.setPosition(game.scale.width / 2, game.scale.height / 2);


                this.isSelected = true
            }
        }, 38000);

        /*
        const map = this.make.tilemap({ key: "STARTMENU", tileWidth: 16, tileHeight: 16 })
        this.tileset = map.addTilesetImage("GUI", "GUI")
        this.layer = map.createLayer("TileLayer", this.tileset, 0, 0)
        */
    }

    update() {
        if (this.panEffect === true) {

            if (this.isSelected === true) {

                this.textPlay.setTint(0xff6441)
            }

            if (this.keyE.isDown && (this.isSelected === true)) {
                this.cameras.main.fadeOut(6000)
                setTimeout(() => {
                    this.scene.start("StartLevel")
                }, 6100);
            }
        }
    }

    zoomer() {
        if (this.zoomEffect === false) {
            this.cameras.main.fadeIn(6000)
            setTimeout(() => {
                if (this.panEffect === false) {
                    this.zoomTopLeft()
                    setTimeout(() => {
                        if (this.panEffect === false) {
                            this.zoomBottomRight()
                            setTimeout(() => {
                                if (this.panEffect === false) {
                                    this.zoomBottomLeft()
                                    setTimeout(() => {
                                        if (this.panEffect === false) {
                                            this.zoomTopRight()
                                            setTimeout(() => {
                                                if (this.panEffect === false) {
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
            game.scale.width / 2,
            game.scale.height / 2,
            5000)
        this.panEffect = true
    }

    testStuff() {
        this.cameras.add(
                /*x*/game.scale.width,
                /*y*/game.scale.height,
                /*width*/game.scale.width,
                /*height*/game.scale.height,
                /*makeMain*/false,
        )
        this.checkCenterBox = this.add.rectangle(
                /*x*/this.textPlay.x,
                /*y*/this.textPlay.y,
                /*width*/1,
                /*height*/1,
                /*fillColor*/0xFFF700
        ).setDepth(2)
    }
}