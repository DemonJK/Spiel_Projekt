class Coins extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.coinConfig = {
            val: 10
        }

        this.CoinSpawnAttributes()
        this.CoinCollisions()
    }

    CoinSpawnAttributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.setPushable(false)
        this.body.setSize(16, 16)
        this.setOffset(0, 0)
        this.setBounce(0, 0.3)
        this.anims.play("BCoin", true)
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
            //this.setPosition(0, 0)
            this.scene.player.coinCounter.increaseCoin(/*this.coinConfig.val*/ 50)
        }
    }
}