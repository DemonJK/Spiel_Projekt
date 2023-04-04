class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.player_spawning_attributes();
        this.colliders();
        this.hp = new HealthBar(this.scene, this.x - 700, this.y - 600, 300, 25, 390, this);
        this.anims.play("Idle", true);
        this.is_jump_played = false
        this.is_jumpdown_played = false
        this.swing_box;
        this.looking_direction = "right";
        this.is_atacking = false
    }

    colliders() {
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.collider(this, this.scene.enemy);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms, this.onPlatform);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2, this.onPlatform);
        this.scene.physics.add.collider(this, this.scene.platforms4);
        this.scene.physics.add.collider(this, this.scene.enemy, this.collideObjects, null, this);
        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })
        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })
    }

    update_health_bar_pos() {
        this.hp.x = this.x - 700
        this.hp.y = this.y - 500
        this.hp.draw();
    }

    player_spawning_attributes() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setSize(32, 64, true);
        this.setPosition(this.x, this.y);
        this.setCollideWorldBounds(true)
    }

    collideObjects() {
        this.is_coliding = true
    }

    update() {
        if (this.body.touching.down) {
            this.is_jump_played = false
            this.is_jumpdown_played = false
        }

         

        this.update_health_bar_pos();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        if ((this.cursors.up.isDown && this.body.touching.down && !this.is_atacking)) {
            console.log("UP CURSOR IS ACTIVE");
            this.setVelocityY(-600);
            this.anims.play("PlayerUpJump", true);

        } else if (this.cursors.left.isDown && !this.body.touching.down && !this.is_atacking) {
            this.setVelocityX(-160).setFlipX(-1);
            if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                this.anims.play("Fall", true);
                this.is_jumpdown_played = true;
            }

        } else if (this.cursors.left.isDown && this.body.touching.down && !this.is_atacking) {
            console.log("LEFT CURSOR IS ACTIVE");
            this.looking_direction = "left"
            this.setVelocityX(-160).setFlipX(-1);
            this.anims.play("MoveLeft", true);

        } else if (this.cursors.right.isDown && !this.body.touching.down && !this.is_atacking) {
            this.setVelocityX(160).setFlipX(0);
            if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                this.anims.play("Fall", true);
                this.is_jumpdown_played = true;
            }

        } else if (this.body.velocity.y >= 75) {
            if (!this.is_jumpdown_played) {
                this.anims.play("Fall", true);
                this.is_jumpdown_played = true
            }

        } else if (this.cursors.right.isDown && this.body.touching.down && !this.is_atacking) {
            console.log("RIGHT CURSOR IS ACTIVE");
            this.looking_direction = "right"

            this.setVelocityX(160).setFlipX(0);
            this.anims.play("MoveRight", true);
            this.setOffset(30, 0);

        } else if (this.cursors.space.isDown && this.body.touching.down || this.is_atacking) {
            console.log("SPACEBAR IS ACTIVE");
            this.is_atacking = true
            this.setOffset(30, 0)
            this.anims.play("Attack", true);
            this.setVelocityX(0);
            if (this.looking_direction === "right") {
                this.swing_box = this.scene.add.rectangle(this.x + 20, this.y, 40, 40).setDepth(-1)
                this.swing_box.setStrokeStyle(2, 0x1a65ac);
                this.scene.physics.add.existing(this.swing_box, true).setDepth(-1)

            } else {
                this.swing_box = this.scene.add.rectangle(this.x - 20, this.y, 40, 40).setDepth(-1)
                this.swing_box.setStrokeStyle(2, 0x1a65ac)
                this.scene.physics.add.existing(this.swing_box, true).setDepth(-1)
            }

            console.log(this.swing_box.body.onOverlap);
          
            
            this.on('animationcomplete', () => {
                this.is_atacking = false
            });
            this.swing_box.destroy(true)


        } else {      

            if (this.body.touching.down) {
                this.is_atacking = false

                this.anims.play("Idle", true);
                this.setOffset(15, 0);
                this.setVelocityX(0);



            }
            if (this.body.velocity.y >= 75) {
                this.anims.play("Fall", true);
            }
        }


        if ((this.cursors.down.isDown)) {
            console.log("DOWN CURSOR IS ACTIVE")
            // durch den Boden fallen
            // this.passthrough()
            
        }
        }

    passthrough () {
        this.scene.passThruPlatforms.clear()
            this.scene.passThruPlatforms2.clear()
            setTimeout(() => {
                this.scene.passThruPlatforms.create(0, 296, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                    .body.checkCollision.down = false;
                this.scene.passThruPlatforms2.create(1350, 260, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                    .body.checkCollision.down = false;
            }
                , 3000);
    }

    is_player_left() {
        return this.x < this.scene.enemy.x && this.scene.enemy.body.touching.down
    }

    is_player_right() {
        return this.x > this.scene.enemy.x && this.scene.enemy.body.touching.down
    }

    is_hitting_from_left() {
        return (this.x + 25) > (this.scene.enemy.x - 170)
    }

    is_hitting_from_right() {
        return (this.x - 25) < (this.scene.enemy.x + 170)
    }

    is_player_over_enemy() {
        return this.y < this.scene.enemy.y + 500
    }

    player_is_not_in_left_area() {
        this.left_point = this.scene.enemy.body.x - 200
        return this.x < this.left_point
    }

    player_is_not_in_right_area() {
        this.left_point = this.scene.enemy.body.x + 200
        return this.x > this.left_point
    }
}