class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel");
    }

    create() {
        this.SkyBackground = this.add.image(0, 0, "SkyBackground");
        this.SkyBackground.setOrigin(0, 0);
        this.SkyBackground.setScale(5.3);
        const map = this.make.tilemap({ key: "MAP", tileWidth: 16, tileHeight: 16 })
        const tileset = map.addTilesetImage("Buildings", "tiles")
        const layer = map.createStaticLayer("Trees on Layer 1", tileset, 0, 0)
        const layer2 = map.createStaticLayer("Tree Background", tileset, 0, 0)
        const layer3 = map.createStaticLayer("House layer", tileset, 0, 0)
        const layer4 = map.createStaticLayer("Roof layer", tileset, 0, 0)
        const layer5 = map.createStaticLayer("Layer 1", tileset, 0, 0)
        const layer6 = map.createStaticLayer("House Int layer", tileset, 0, 0)


    }

    update() {
        console.log("Start Level");
    }
}