class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
        this.initialVolume = 0.5; // Anfangswert der Lautstärke
        this.volumeSlider = null; // Variable für den Lautstärkeregler
        this.sliderHandleSize = 30; // Größe des Reglergriffs
    }

    create() {
        // Hintergrundbild oder UI-Elemente für die Einstellungen erstellen

        this.Menubackground = this.add.image(0, 0, "Startmenu").setOrigin(0, 0)
        this.Menubackground.setDisplaySize(game.scale.width, game.scale.height)

        // Lautstärkeregler erstellen
        this.volumeSlider = this.add.graphics();

        const sliderWidth = 200;
        const sliderHeight = 20;
        const sliderX = 400;
        const sliderY = 300;

        // Hintergrund des Reglers zeichnen
        this.volumeSlider.fillStyle(0x808080);
        this.volumeSlider.fillRect(sliderX, sliderY, sliderWidth, sliderHeight);

        // Fortschrittsbalken zeichnen
        const progressWidth = (this.initialVolume * sliderWidth);
        this.volumeSlider.fillStyle(0x00ff00);
        this.volumeSlider.fillRect(sliderX, sliderY, progressWidth, sliderHeight);

        // Reglergriff erstellen
        const handleX = sliderX + progressWidth - this.sliderHandleSize / 2;
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
            .setDepth(1);

        backButton.on('pointerup', function () {
            this.scene.pause("SettingsScene");
            this.scene.resume('StartMenu'); // Name der vorherigen Spielszene
        }, this);
    }

    updateVolume(volume) {
        // Hier kannst du die Aktionen ausführen, die du bei Änderungen der Lautstärke machen möchtest
        console.log('Neue Lautstärke:', volume);
        // Beispiel: Lautstärke auf Phaser-Soundobjekt anwenden
        // this.sound.volume = volume;

        // Fortschrittsbalken des Reglers aktualisieren
        const progressWidth = volume * 200;
        this.volumeSlider.clear();
        this.volumeSlider.fillStyle(0x808080);
        this.volumeSlider.fillRect(400, 300, 200, 20);
        this.volumeSlider.fillStyle(0x00ff00);
        this.volumeSlider.fillRect(400, 300, progressWidth, 20);

        // Reglergriff aktualisieren
        const handleX = 400 + progressWidth - this.sliderHandleSize / 2;
        const handleY = 300 + 20 / 2;
        const handleRadius = this.sliderHandleSize / 2;
        this.volumeSlider.fillStyle(0xffffff);
        this.volumeSlider.fillCircle(handleX, handleY, handleRadius);
    }

    update() {

    }
}