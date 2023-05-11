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
                this.playButton()
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

    playButton() {

        // RECHTECK
        this.boxInt = this.add.rectangle(
            /*x*/0,
            /*y*/0,
            /*width*/0,
            /*height*/0,
            /*fillColor*/0x680B0B,
            /*fillAlpha*/0.45
        )

        // TEXT
        this.textPlay = this.add.text(
            /*x*/0,
            /*y*/0,
            /*text*/"Start a New Game", {
            fontFamily: "Arial",
            fontSize: "24px",
        })

        // Textmaße abrufen
        var textWidth = this.textPlay.width
        var textHeight = this.textPlay.height

        // Rechteckgröße an Textinhalt anpassen
        this.boxInt.setSize(this.textPlay.width + 20, this.textPlay.height + 20)

        this.boxInt.setOrigin(0.5, 0.5)

        // Rechteck in die Mitte des Spiels zentrieren
        this.boxInt.setPosition(game.scale.width / 2, game.scale.height / 2)

        // Text in das Rechteck zentrieren
        this.textPlay.setPosition(this.boxInt.x - textWidth / 2, this.boxInt.y - textHeight / 2)
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
}