class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.enemy_spawning_attributes()
        this.scene.physics.add.collider(this, this.scene.layer, () => { this.body.touching.down = true })
        this.scene.physics.add.collider(this, this.scene.player)
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms)
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2)
        this.scene.physics.add.collider(this, this.scene.platforms4)
        this.hp = new HealthBar(this.scene, 150, 960, 80, 16, 100, this)
        this.anims.play("stand", true)
        this.setFlipX(true)
        this.has_hp_lose = false
        this.atack_box = this.scene.add.rectangle(this.x, this.y, 40, 40).setDepth(-1)
        this.scene.physics.add.existing(this.atack_box, true).setDepth(-1)
        this.atack_box2 = this.scene.add.rectangle(this.x + 100, this.y, 40, 40).setDepth(-1)
        this.scene.physics.add.existing(this.atack_box2, true).setDepth(-1)
        this.is_atacking = false
        this.is_in_attack_anim = false
    }

    enemy_spawning_attributes() {
        this.scene.add.existing(this)
        this.is_dead = false
        this.scene.physics.world.enable(this)
        this.body.setSize(90, 137, 1)
        this.setBounce(0.2)
        this.setPosition(this.x, this.y)
        this.setPushable(false)
    }

    update_health_bar_pos() {
        this.hp.x = this.body.x + 5
        this.hp.y = this.y - 80
        this.hp.draw()
    }


    update() {
        this.update_health_bar_pos()
        this.atack_box.body.x = this.x - 100
        this.atack_box.body.y = this.y + 10
        this.atack_box2.body.x = this.x + 60
        this.atack_box2.body.y = this.y + 10

        if ((Math.round(this.scene.player.y + 237) === Math.round(this.y)) && !(Math.round(this.scene.player.x) === Math.round(this.x - 145))) {
            if (this.scene.player.cursors.left.isDown) {
                this.scene.player.setPosition(this.x - 220, this.scene.player.y)
            } else if (this.scene.player.cursors.right.isDown) {
                this.scene.player.setPosition(this.x + 220, this.scene.player.y)
            };
        }

        if (!this.is_dead) {
            if (!(Math.round(this.scene.player.x) === Math.round(this.x - 197))) {
                if (this.is_player_left() || this.is_player_right()) {
                    if (this.is_player_left()) {
                        if (this.is_hitting_from_left() && this.is_player_over_enemy()) {
                            this.setVelocityX(0)
                            this.is_in_attack_anim = true
                            this.anims.play("enemyatt", true)
                            this.on("animationcomplete", () => {
                                this.is_atacking = true
                                this.is_in_attack_anim = false
                            })
                            if (this.is_atacking && this.scene.physics.overlap(this.atack_box, this.scene.player)) {
                                this.scene.player.hp.decrease(15)
                            }
                            this.is_atacking = false
                        } else {
                            if (this.player_is_not_in_left_area() && !this.is_in_attack_anim) {
                                this.setVelocityX(-55).setFlipX(-1)
                                this.anims.play("run-left", true)
                            }
                            this.is_atacking = false
                        }
                    } else if (this.is_player_right()) {
                        if (this.is_hitting_from_right() && this.is_player_over_enemy()) {
                            this.setVelocityX(0)
                            this.is_in_attack_anim = true
                            this.anims.play("enemyatt", true)
                            this.on("animationcomplete", () => {
                                this.is_atacking = true
                                this.is_in_attack_anim = false
                            })
                            if (this.is_atacking && this.scene.physics.overlap(this.atack_box2, this.scene.player)) {
                                this.scene.player.hp.decrease(15)
                            }
                            this.is_atacking = false
                        } else {
                            if (this.player_is_not_in_right_area() && !this.is_in_attack_anim) {
                                this.setVelocityX(55).setFlipX(0)
                                this.anims.play("run-left", true)
                            }
                            this.is_atacking = false
                        }
                    }
                }
            } else {
                if (this.velocity === 0) {
                    this.anims.play("stand", true)
                }
            }
        } else if (this.is_dead === true) {
            this.consumable_potion = new Healthpoint(this.scene, this.x, this.y, "starter-healthpotion")
        }
    }

    is_player_left() {
        return this.scene.player.x < this.x && this.body.touching.down
    }
    is_player_right() {
        return this.scene.player.x > this.x && this.body.touching.down
    }
    is_hitting_from_left() {
        return (this.scene.player.x + 25) > (this.x - 70)
    }
    is_hitting_from_right() {
        return (this.scene.player.x - 25) < (this.x + 70)
    }
    is_player_over_enemy() {
        return this.scene.player.y < this.y + 500
    }
    player_is_not_in_left_area() {
        this.left_point = this.body.x - 70
        return this.scene.player.x < this.left_point
    }
    player_is_not_in_right_area() {
        this.left_point = this.body.x + 70
        return this.scene.player.x > this.left_point
    }
    //FUNKTION FÜR POTION
    healthpoint() {
        if (this.is_dead === true) {
            this.consumable_potion = new Healthpoint(this.scene, this.x, this.y, "starter-healthpotion")
        } else {
            console.log("not dead, no drop")
        }
    }
}
