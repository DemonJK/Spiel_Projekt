class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.player_spawning_attributes()
        this.colliders()
        this.hp = new HealthBar(this.scene, 710, 300, 300, 25, 390, this)
        this.hp.bar.setScrollFactor(0, 0)
        this.anims.play("Idle", true)
        this.is_jump_played = false
        this.is_jumpdown_played = false
        this.swing_box
        this.looking_direction = "right"
        this.is_atacking = false
        this.readen = false
        this.items = []
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.regeneration = false
    }

    colliders() {
        this.enemy_collider = this.scene.physics.add.collider(this, this.scene.enemy)
        this.scene.physics.add.collider(this, this.scene.platforms)
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms, this.onPlatform)
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2, this.onPlatform)
        this.scene.physics.add.collider(this, this.scene.platforms4)
        this.scene.physics.add.collider(this, this.scene.buildings3)
        this.scene.physics.add.collider(this, this.scene.groundlayer)

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.groundlayer, () => {
            this.body.touching.down = true
        })
    }

    update_health_bar_pos() {
        this.hp.x = this.body.position.x - 680
        this.hp.y = this.body.position.y - 350
        this.hp.draw()
    }

    player_spawning_attributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.body.setSize(32, 64, true)
        this.setPosition(this.x, this.y)
        // CAMERA MOVING
        this.scene.cameras.main.startFollow(this)
        this.scene.cameras.main.followOffset.set(0, 150)
        this.scene.cameras.main.zoom = 2
    }

    collideObjects() {
        this.is_coliding = true
    }

    update() {

        //console.log(this.items);

        if (this.body.touching.down) {
            this.is_jump_played = false
            this.is_jumpdown_played = false
        }

        if ((this.keyW.isDown && this.body.touching.down && !this.is_atacking)) {
            console.log("UP")
            this.setVelocityY(-425)
            this.anims.play("PlayerUpJump", true)

        } else if (this.keyA.isDown && !this.body.touching.down && !this.is_atacking) {
            this.setVelocityX(-160).setFlipX(-1)
            if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                this.anims.play("Fall", true)
                this.is_jumpdown_played = true
            }

        } else if (this.keyA.isDown && this.body.touching.down && !this.is_atacking) {
            console.log("LEFT")
            this.looking_direction = "left"
            this.setVelocityX(-160).setFlipX(-1)
            this.anims.play("MoveLeft", true)

            // TEST FÜR SPEED POTION
            if (this.keyA.isDown && this.body.touching.down && !this.is_atacking && this.scene.physics.overlap(this, this.scene.speedpotion_lvl_1)) {
                console.log("LEFT")
                this.looking_direction = "left"
                this.setVelocityX(-350).setFlipX(-1)
                this.anims.play("MoveLeft", true)
            }

        } else if (this.keyD.isDown && !this.body.touching.down && !this.is_atacking) {
            this.setVelocityX(160).setFlipX(0)
            if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                this.anims.play("Fall", true)
                this.is_jumpdown_played = true
            }

        } else if (this.body.velocity.y >= 75) {
            if (!this.is_jumpdown_played) {
                this.anims.play("Fall", true)
                this.is_jumpdown_played = true
            }

        } else if (this.keyD.isDown && this.body.touching.down && !this.is_atacking) {
            console.log("RIGHT")
            this.looking_direction = "right"
            this.setVelocityX(160).setFlipX(0)
            this.anims.play("MoveRight", true)
            this.setOffset(30, 0)

            // TEST FÜR SPEED POTION
            if (this.keyD.isDown && this.body.touching.down && !this.is_atacking && this.scene.physics.overlap(this, this.scene.speedpotion_lvl_1)) {
                console.log("RIGHT")
                this.looking_direction = "right"
                this.setVelocityX(350).setFlipX(0)
                this.anims.play("MoveRight", true)
                this.setOffset(30, 0)
            }

        } else if (this.cursors.space.isDown && this.body.touching.down || this.is_atacking) {
            console.log("SPACEBAR IS ACTIVE")
            this.is_atacking = true
            this.setOffset(30, 0)
            this.anims.play("Attack", true)
            this.setVelocityX(0)
            if (this.looking_direction === "right") {
                this.swing_box = this.scene.add.rectangle(this.x + 20, this.y, 40, 40).setDepth(-1)
                this.scene.physics.add.existing(this.swing_box).setDepth(-1)
            } else {
                this.swing_box = this.scene.add.rectangle(this.x - 20, this.y, 40, 40).setDepth(-1)
                this.scene.physics.add.existing(this.swing_box).setDepth(-1)
            }
            if (this.scene.physics.overlap(this.swing_box, this.scene.enemy)) {
                if (!this.scene.enemy.has_hp_lose) {
                    this.scene.enemy.hp.decrease(10)
                    this.scene.enemy.has_hp_lose = true
                }
            }
            this.on('animationcomplete', () => {
                this.is_atacking = false
                this.scene.enemy.has_hp_lose = false
            })
            this.swing_box.destroy(true)

        } else {
            if (this.body.touching.down) {
                this.is_atacking = false
                this.anims.play("Idle", true)
                this.setOffset(15, 0)
                this.setVelocityX(0)
            }
            if (this.body.velocity.y >= 75) {
                this.anims.play("Fall", true)
            }
        }

        if ((this.cursors.down.isDown)) {
            console.log("DOWN CURSOR IS ACTIVE")
            // durch den Boden fallen
            // this.passthrough()
        }

        //TEST FÜR PASSIVE REGENERATION
        console.log(this.regeneration);
        if (this.hp.value > 390 && (this.regeneration = false)) {
            console.log("HIER");
            this.regeneration = true
        }
        if (this.regeneration === true) {
            this.scene.player.hp.decrease(-15)
            this.regeneration = false
        }
    }

    passthrough() {
        this.scene.passThruPlatforms.clear()
        this.scene.passThruPlatforms2.clear()
        setTimeout(() => {
            this.scene.passThruPlatforms.create(0, 296, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                .body.checkCollision.down = false
            this.scene.passThruPlatforms2.create(1350, 260, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                .body.checkCollision.down = false
        }
            , 3000)
    }
}