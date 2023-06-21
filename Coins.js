class Coins extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, CoinConfig) {
        super(scene, x, y, texture)

        this.CoinConfig = CoinConfig
        this.CoinSpawnAttributes()
        this.CoinCollisions()

    }

    CoinSpawnAttributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.setPushable(this.CoinConfig.pushable)
    }

    CoinCollisions() {
        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground1, () => {
            this.body.touching.down = true
        })
    }

    update() {

        if (this.scene.physics.overlap(this, this.scene.player)) {
            console.log("IN OVERLAP"); // SOLL IN DENN COIN COUNTER HINZUFÜGEN
        }
    }

}