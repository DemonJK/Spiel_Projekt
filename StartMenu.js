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
                this.isSelected = true

                // Start Knopf
                this.startButton = this.add.text(0, 0, "Start", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
                this.startButton.on("pointerover", () => { this.selectButton(this.startButton) });
                this.startButton.on("pointerout", () => { this.deselectButton(this.startButton) });
                this.startButton.on("pointerup", () => { this.scene.start("StartLevel") });
                this.startButton.setPosition(game.scale.width / 2, game.scale.height / 2).setOrigin(0.5, 0.5)

                // Einstellungen Knopf
                this.settingsButton = this.add.text(0, 0, "Einstellungen", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
                this.settingsButton.on("pointerover", () => { this.selectButton(this.settingsButton) });
                this.settingsButton.on("pointerout", () => { this.deselectButton(this.settingsButton) });
                this.settingsButton.on("pointerup", () => { console.log("Einstellungen geklickt") });
                this.settingsButton.setPosition(game.scale.width / 2, game.scale.height / 2 + 50).setOrigin(0.5, 0.5)

                // Credits Knopf
                this.creditsButton = this.add.text(0, 0, "Credits", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
                this.creditsButton.on("pointerover", () => { this.selectButton(this.creditsButton) });
                this.creditsButton.on("pointerout", () => { this.deselectButton(this.creditsButton) });
                this.creditsButton.on("pointerup", () => { console.log("Credits geklickt") });
                this.creditsButton.setPosition(game.scale.width / 2, game.scale.height / 2 + 100).setOrigin(0.5, 0.5)

                // Standardauswahl
                this.selectedButton = this.startButton;
                this.selectButton(this.selectedButton);
            }
        }, 38000);
    }

    // Funktion zum Auswählen des Knopfes und Ändern der Farbe
    selectButton(button) {
        this.deselectButton(this.selectedButton);
        this.selectedButton = button;
        this.selectedButton.setColor("#ff0");
    }

    // Funktion zum Abwählen des Knopfes und Zurücksetzen der Farbe
    deselectButton(button) {
        button.setColor("#fff");
    }

    update() {

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