class Pet3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.pet3_spawning_attributes() // SPAWNING ATTRIBUTES
        this.pet3_colliders() // COLLIDER FUNCTION
        this.anims.play("IdlePet3Anim", true) // IDLE ANIMATION FROM PET 3

        // Vars
        this.pet3_is_in_jump = false
        this.pet3_is_in_jumpdown = false

        // Vars create
        this.farAwayLeftBox = this.scene.add.rectangle(this.x, this.y, 5, 5, 0xff00ff).setDepth(-1)
        this.scene.physics.add.existing(this.farAwayLeftBox, true).setDepth(-1)

        this.farAwayRightBox = this.scene.add.rectangle(this.x, this.y, 5, 5, 0xff00ff).setDepth(-1)
        this.scene.physics.add.existing(this.farAwayRightBox, true).setDepth(-1)

        this.pet_config = { // PET 3 CONFIG
            speedLeft: -160, // SPEED FOR LEFT
            speedRight: 160, // SPEED FOR RIGHT
        }
    }

    // COLLIDERS
    pet3_colliders() {
        this.scene.physics.add.collider(this, this.scene.platforms4)
        this.scene.physics.add.collider(this, this.scene.buildings3)

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground1, () => {
            this.body.touching.down = true
        })
    }

    // SPAWNING ATTRIBUTES
    pet3_spawning_attributes() {
        this.scene.add.existing(this) // ADD PET 3 IN SCENE
        this.scene.physics.world.enable(this) // PHYSICS FOR PET 3
    }

    update() {

        this.farAwayLeftBox.body.x = this.x - 30
        this.farAwayLeftBox.body.y = this.y

        this.farAwayRightBox.body.x = this.x + 25
        this.farAwayRightBox.body.y = this.y

        if (this.body.touching.down) {
            this.pet3_is_in_jump = false
            this.pet3_is_in_jumpdown = false
        }

        // MOVEMENT FOR PET 3 AFTER PLAYER
        if (this.scene.player.keyW.isDown && this.body.touching.down) {
            this.setVelocityY(-350) // JUMP VELOCITY = +Y
        } else if (this.scene.player.keyD.isDown && this.body.touching.down && this.scene.player.looking_direction === "right") {
            this.setVelocityX(this.pet_config.speedRight).setFlipX(0) // VELOCITY FOR RIGHT = +X
            //this.anims.play("RunDustPet3Anim", true).setDepth(0) // RUN DUST ANIM
            this.anims.play("RunPet3Anim", true) // RUN ANIM & DUST ANIM
        } else if (this.scene.player.keyA.isDown && this.body.touching.down && this.scene.player.looking_direction === "left") {
            this.setVelocityX(this.pet_config.speedLeft).setFlipX(-1) // VELOCITY FOR LEFT = -X
            //this.anims.play("RunDustPet3Anim", true).setDepth(0) // RUN DUST ANIM
            this.anims.play("RunPet3Anim", true) // RUN ANIM & DUST ANIM
        } else {
            this.setVelocityX(0) // IDLE VELOCITY = 0
            this.anims.play("IdlePet3Anim", true) // IDLE ANIM
        }

        if (this.if_player_is_not_in_left_area) {
            //console.log("Far away");
        }
    }

    if_player_is_not_in_left_area() {
        this.left_point_area = this.body.x - 25
        return this.scene.player.x > this.left_point_area
    }
}