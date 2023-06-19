class TraderNPC1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.SpawnAttributes()
        this.CollisionBoxes()

        this.TraderNPC1_Config = {
            idle: "TraderIdleAnim"
        }

        this.anims.play(this.TraderNPC1_Config.idle, true)
    }

    CollisionBoxes() {
        this.scene.physics.add.collider(this, this.scene.buildings3, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground1, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerbuildings1, () => {
            this.body.touching.down = true
        })
    }

    SpawnAttributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(true)
    }

    update() {
        console.log("TraderNPC1 Created");
    }
}