class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel");
    }

    create() {
        const map = this.make.tilemap({ key: "StartLevel"})
        map.addTilesetImage("")
    }

    update() {
        console.log("Start Level");
    }
}