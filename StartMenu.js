
class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu")
        this.volume = 0
    }

    create() {
        console.clear()
        this.animationSkipped = false;
        this.createBackground();
        this.zoomEffect = false;
        this.panEffect = false;
        this.keyC = this.input.keyboard.addKey("C");
        this.zoomer();
        this.id_6 = setTimeout(() => {
            if (this.panEffect === true) {
                this.createMenu();
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
        console.log(this.volume);

        if (this.keyC.isDown && !this.animationSkipped) {
            this.animationSkipped = true
            clearTimeout(this.id_1)
            clearTimeout(this.id_2)
            clearTimeout(this.id_3)
            clearTimeout(this.id_4)
            clearTimeout(this.id_5)
            this.replaceCamera()
        }
    }

    createBackground() {
        this.Menubackground = this.add.image(0, 0, "Startmenu").setOrigin(0, 0)
        this.Menubackground.setDisplaySize(game.scale.width, game.scale.height)
    }

    zoomer() {
        if (this.zoomEffect === false) {
            this.cameras.main.fadeIn(6000)
            this.id_1 = setTimeout(() => {
                if (this.panEffect === false) {
                    this.zoomTopLeft()
                    this.id_2 = setTimeout(() => {
                        if (this.panEffect === false) {
                            this.zoomBottomRight()
                            this.id_3 = setTimeout(() => {
                                if (this.panEffect === false) {
                                    this.zoomBottomLeft()
                                    this.id_4 = setTimeout(() => {
                                        if (this.panEffect === false) {
                                            this.zoomTopRight()
                                            this.id_5 = setTimeout(() => {
                                                if (this.panEffect === false) {
                                                    this.zoomCenter()
                                                    this.panEffect = true
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
    }

    replaceCamera() {
        this.cameras.add(0, 0, game.scale.width, game.scale.height, true, "newCam")
        this.zoomCenter()
        this.createMenu()
    }

    createMenu() {
        // Start Knopf
        this.startButton = this.add.text(0, 0, "Start", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
        this.startButton.on("pointerover", () => { this.selectButton(this.startButton) });
        this.startButton.on("pointerout", () => { this.deselectButton(this.startButton) });
        this.startButton.on("pointerup", () => { this.scene.pause("StartMenu"), this.scene.start("StartLevel") });
        this.startButton.setPosition(game.scale.width / 2, game.scale.height / 2).setOrigin(0.5, 0.5)

        // Einstellungen Knopf
        this.settingsButton = this.add.text(0, 0, "Einstellungen", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
        this.settingsButton.on("pointerover", () => { this.selectButton(this.settingsButton) });
        this.settingsButton.on("pointerout", () => { this.deselectButton(this.settingsButton) });
        this.settingsButton.on("pointerup", () => { this.scene.pause("StartMenu"), this.scene.launch("SettingsScene") });
        this.settingsButton.setPosition(game.scale.width / 2, game.scale.height / 2 + 50).setOrigin(0.5, 0.5)

        // Credits Knopf
        this.creditsButton = this.add.text(0, 0, "Credits", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
        this.creditsButton.on("pointerover", () => { this.selectButton(this.creditsButton) });
        this.creditsButton.on("pointerout", () => { this.deselectButton(this.creditsButton) });
        this.creditsButton.on("pointerup", () => { console.log("Credits geklickt") });
        this.creditsButton.setPosition(game.scale.width / 2, game.scale.height / 2 + 100).setOrigin(0.5, 0.5)

        // Exit Knopf
        this.exitButton = this.add.text(0, 0, "Exit Game", { fontFamily: "Arial", fontSize: "32px", fill: "#fff" }).setInteractive();
        this.exitButton.on("pointerover", () => { this.selectButton(this.exitButton) });
        this.exitButton.on("pointerout", () => { this.deselectButton(this.exitButton) });
        this.exitButton.on("pointerup", () => { console.log("Exit Game geklickt") });
        this.exitButton.setPosition(game.scale.width / 2, game.scale.height / 2 + 150).setOrigin(0.5, 0.5)

        // Standardauswahl
        this.selectedButton = this.startButton;
        this.selectButton(this.selectedButton);
    }
}

class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
        this.initialVolume = 0.5; // Anfangswert der Lautstärke
        this.volumeSlider = null; // Variable für den Lautstärkeregler
        this.sliderHandleSize = 30; // Größe des Reglergriffs
        this.volume = 0
    }

    create() {
        // Hintergrundbild oder UI-Elemente für die Einstellungen erstellen
        this.add.image(0, 0, "Startmenu").setOrigin(0, 0).setDisplaySize(game.scale.width, game.scale.height);

        // Lautstärkeregler erstellen
        const sliderWidth = 200;
        const sliderHeight = 20;
        const sliderX = 400;
        const sliderY = 300;

        // Hintergrund des Reglers zeichnen
        this.volumeSlider = this.add.graphics();
        this.volumeSlider.fillStyle(0x808080);
        this.volumeSlider.fillRect(sliderX, sliderY, sliderWidth, sliderHeight);

        // Fortschrittsbalken zeichnen
        this.progressWidth = this.initialVolume * sliderWidth;
        this.volumeSlider.fillStyle(0x00ff00);
        this.volumeSlider.fillRect(sliderX, sliderY, this.progressWidth, sliderHeight);

        // Reglergriff erstellen
        const handleX = sliderX + this.progressWidth - this.sliderHandleSize / 2;
        const handleY = sliderY + sliderHeight / 2;
        const handleRadius = this.sliderHandleSize / 2;
        this.volumeSlider.fillStyle(0xffffff);
        this.volumeSlider.fillCircle(handleX, handleY, handleRadius);

        // Interaktive Funktionen für den Regler hinzufügen
        this.volumeSlider.setInteractive(new Phaser.Geom.Rectangle(sliderX, sliderY, sliderWidth, sliderHeight), Phaser.Geom.Rectangle.Contains);

        // Ereignis, das bei Änderungen des Lautstärkereglers aufgerufen wird
        this.volumeSlider.on('pointerdown', function (pointer) {
            const newValue = Phaser.Math.Clamp(pointer.x - sliderX, 0, sliderWidth) / sliderWidth;
            this.updateVolume(newValue);
        }, this);

        // Zurück-Button hinzufügen, um zur vorherigen Szene zurückzukehren
        const backButton = this.add.text(20, 20, 'Zurück', { fill: '#ffffff' })
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1)

        backButton.on('pointerup', function () {
            console.log()
            this.scene.get('StartMenu').volume = this.volume
            this.scene.resume('StartMenu') // Name der vorherigen Spielszene
            this.scene.stop()

            //this.scene.get("StartMenu").createBackground()
            //this.scene.get("StartMenu").replaceCamera()
        }, this);
    }

    updateVolume(volume) {
        this.volume = volume

        // Hier kannst du die Aktionen ausführen, die du bei Änderungen der Lautstärke machen möchtest
        console.log('Neue Lautstärke:', volume)
        // Beispiel: Lautstärke auf Phaser-Soundobjekt anwenden
        // this.sound.volume = volume

        // Fortschrittsbalken des Reglers aktualisieren
        const sliderX = 400;
        const sliderY = 300;
        const sliderWidth = 200;
        const sliderHeight = 20;
        this.progressWidth = volume * sliderWidth;

        this.volumeSlider.clear();
        this.volumeSlider.fillStyle(0x808080);
        this.volumeSlider.fillRect(sliderX, sliderY, sliderWidth, sliderHeight);
        this.volumeSlider.fillStyle(0x00ff00);
        this.volumeSlider.fillRect(sliderX, sliderY, this.progressWidth, sliderHeight);

        // Reglergriff aktualisieren
        const handleX = sliderX + this.progressWidth - this.sliderHandleSize / 2;
        const handleY = sliderY + sliderHeight / 2;
        const handleRadius = this.sliderHandleSize / 2;
        this.volumeSlider.fillStyle(0xffffff);
        this.volumeSlider.fillCircle(handleX, handleY, handleRadius);
    }

    update() {

    }
}