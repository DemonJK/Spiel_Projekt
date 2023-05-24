class Pet3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.pet3_spawning_attributes() // SPAWNING ATTRIBUTES
        this.pet3_colliders() // COLLIDER FUNCTION
        this.anims.play("IdlePet3Anim", true) // IDLE ANIMATION FROM PET 3

        this.pet_config = { // PET 3 CONFIG
            speedLeft: -160, // SPEED FOR LEFT
            speedRight: 160, // SPEED FOR RIGHT
        }
    }

    // COLLIDERS
    pet3_colliders() {
        this.scene.physics.add.collider(this, this.scene.platforms4)
        this.scene.physics.add.collider(this, this.scene.buildings3)
        this.scene.physics.add.collider(this, this.scene.layerground)

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground, () => {
            this.body.touching.down = true
        })
    }

    // SPAWNING ATTRIBUTES
    pet3_spawning_attributes() {
        this.scene.add.existing(this) // ADD PET 3 IN SCENE
        this.scene.physics.world.enable(this) // PHYSICS FOR PET 3
    }

    update() {
        if (this.scene.player.keyW.isDown) {
            this.setVelocityY(-425) // JUMP VELOCITY = +Y
        } else if (this.scene.player.keyD.isDown) {
            this.setVelocityX(this.pet_config.speedRight).setFlipX(0) // VELOCITY FOR RIGHT = +X
            this.anims.play("RunPet3Anim", true) // RUN ANIM
        } else if (this.scene.player.keyA.isDown) {
            this.setVelocityX(this.pet_config.speedLeft).setFlipX(-1) // VELOCITY FOR LEFT = -X
            this.anims.play("RunPet3Anim", true) // RUN ANIM
        } else {
            this.setVelocityX(0) // IDLE VELOCITY = 0
            this.anims.play("IdlePet3Anim", true) // IDLE ANIM
        }
    }
}