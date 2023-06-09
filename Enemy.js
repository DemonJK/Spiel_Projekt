class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, config) {
        super(scene, x, y, texture)
        this.config = config
        this.enemy_spawning_attributes()
        this.scene.physics.add.collider(this, this.scene.layer, () => { this.body.touching.down = true })
        this.hp = new HealthBar(this.scene, 150, 960, 80, 16, config.hp_val, this)
        this.anims.play(config.AnimationConfig.idle, true)
        this.setFlipX(true)
        this.has_hp_lose = false
        this.atack_box = this.scene.add.rectangle(this.x, this.y, config.attack_box_width, config.attack_box_heigth).setDepth(-1)
        this.scene.physics.add.existing(this.atack_box, true).setDepth(-1)
        this.atack_box2 = this.scene.add.rectangle(this.x + 100, this.y, config.attack_box_width, config.attack_box_heigth).setDepth(-1)
        this.scene.physics.add.existing(this.atack_box2, true).setDepth(-1)
        this.is_atacking = false
        this.is_in_attack_anim = false
        this.is_position_spawned = false;
        this.visiable_area = this.scene.add.rectangle(this.x, this.y, config.visible_area_width, config.visible_area_height)
        this.scene.physics.add.existing(this.visiable_area, true).setDepth(-1)
        this.is_in_visible_area = false;
        this.scene.group.add(this)
        this.damage = config.damage
        this.xp_drop = config.xp_drop
    }

    create() {
        this.scene.create_collider_player_enemy(this);
    }

    enemy_spawning_attributes() {
        this.scene.add.existing(this)
        this.is_dead = false
        this.scene.physics.world.enable(this)
        this.body.setSize(this.config.body_size_width, this.config.body_size_height, true)
        this.setBounce(this.config.bounce)
        this.setPosition(this.x, this.y)
        this.setPushable(false)
        this.setOffset(this.config.offsetX, this.config.offsetY)
    }

    update_health_bar_pos() {
        this.hp.x = this.body.x + 5
        this.hp.y = this.y - 80
        this.hp.draw()
    }

    update() {
        this.update_health_bar_pos()
        this.atack_box.body.x = this.x - this.config.atack_box_left_margin
        this.atack_box.body.y = this.y + this.config.atack_box_top_margin
        this.atack_box2.body.x = this.x + this.config.atack_box_right_margin
        this.atack_box2.body.y = this.y + this.config.atack_box_top_margin
        this.visiable_area.body.x = this.x - 500
        this.visiable_area.body.y = this.y - 150

        if (this.scene.player.cursors.space.isDown && this.scene.player.body.touching.down || this.scene.player.is_atacking && !this.scene.player.inventory.is_opened) {
            //console.log("SPACEBAR IS ACTIVE")
            this.scene.player.is_atacking = true
            this.scene.player.anims.play("Attack", true)
            this.scene.player.setVelocityX(0)
            if (this.scene.player.looking_direction === "right") {
                this.swing_box = this.scene.add.rectangle(this.scene.player.x + 20, this.scene.player.y, 40, 40).setDepth(-1)
                this.scene.physics.add.existing(this.swing_box).setDepth(-1)
            } else {
                this.swing_box = this.scene.add.rectangle(this.scene.player.x - 20, this.scene.player.y, 40, 40).setDepth(-1)
                this.scene.physics.add.existing(this.swing_box).setDepth(-1)
            }
            if (this.scene.physics.overlap(this.swing_box, this)) {
                if (!this.has_hp_lose) {
                    this.hp.decrease(this.scene.player.PlayerDefaultLevel.damage)
                    this.has_hp_lose = true
                }
            }
            this.scene.player.on('animationcomplete', () => {
                this.scene.player.is_atacking = false
                this.has_hp_lose = false
            })
            this.swing_box.destroy(true)
        }

        if (!this.scene.physics.overlap(this.visiable_area, this.scene.player) && !this.is_dead) {
            this.setVelocityX(0)
            this.anims.play(this.config.AnimationConfig.idle, true)
        }

        if (!this.is_dead && this.scene.physics.overlap(this.visiable_area, this.scene.player)) {
            if (!(Math.round(this.scene.player.x) === Math.round(this.x - 197))) {
                if (this.is_player_left() || this.is_player_right()) {
                    if (this.is_player_left()) {
                        if (this.is_hitting_from_left() && this.is_player_over_enemy()) {
                            this.setVelocityX(0)
                            this.is_in_attack_anim = true
                            this.anims.play(this.config.AnimationConfig.attack, true)
                            this.on("animationcomplete", () => {
                                this.is_atacking = true
                                this.is_in_attack_anim = false
                            })
                            if (this.is_atacking && this.scene.physics.overlap(this.atack_box, this.scene.player)) {
                                this.scene.player.player_hp.decrease(this.damage)

                            }
                            this.is_atacking = false
                        } else {
                            if (this.player_is_not_in_left_area()) {
                                this.setVelocityX(-this.config.speed).setFlipX(-1)
                                this.anims.play(this.config.AnimationConfig.run, true)
                            }
                            this.is_atacking = false
                        }
                    } else if (this.is_player_right()) {
                        if (this.is_hitting_from_right() && this.is_player_over_enemy()) {
                            this.setVelocityX(0)
                            this.is_in_attack_anim = true
                            this.anims.play(this.config.AnimationConfig.attack, true)
                            this.on("animationcomplete", () => {
                                this.is_atacking = true
                                this.is_in_attack_anim = false
                            })
                            if (this.is_atacking && this.scene.physics.overlap(this.atack_box2, this.scene.player)) {
                                this.scene.player.player_hp.decrease(this.damage)
                            }
                            this.is_atacking = false
                        } else {
                            if (this.player_is_not_in_right_area() && !this.is_in_attack_anim) {
                                this.setVelocityX(this.config.speed).setFlipX(0)
                                this.anims.play(this.config.AnimationConfig.run, true)
                            }
                            this.is_atacking = false
                        }
                    }
                }
            } else {
                if (this.velocity === 0) {
                    this.anims.play(this.config.AnimationConfig.idle, true)
                }
            }
            //CHECK WENN TOT FÜR ITEM SPAWN
        } else if (this.is_dead === true) {
            if (!this.is_position_spawned) {
                this.anims.play(this.config.AnimationConfig.death, true)
                this.healthpotion_lvl_1 = new Healthpotion_LVL_1(this.scene, this.x, this.y)
                this.speedpotion_lvl_1 = new Speedpotion_LVL_1(this.scene, this.x + 25, this.y)
                this.damagedecrease_lvl_1 = new Damagedecrease_LVL_1(this.scene, this.x + 50, this.y)
                this.healthpotion_lvl_2 = new Healthpotion_LVL_2(this.scene, this.x + 75, this.y)
                this.regeneration_lvl_1 = new Regeneration_LVL_1(this.scene, this.x + 100, this.y)
                this.is_position_spawned = true
                this.scene.player.PlayerDefaultLevel.xp += this.xp_drop
                this.scene.group.remove(this)
            }
            this.healthpotion_lvl_1.update()
            this.speedpotion_lvl_1.update()
            this.damagedecrease_lvl_1.update()
            this.healthpotion_lvl_2.update()
            this.regeneration_lvl_1.update()
        }
    }

    is_player_left() {
        return this.scene.player.x < this.x && this.body.touching.down
    }
    is_player_right() {
        return this.scene.player.x > this.x && this.body.touching.down
    }
    is_hitting_from_left() {
        return (this.scene.player.x + this.config.attack_range_ot) > (this.x - this.config.attack_range)
    }
    is_hitting_from_right() {
        return (this.scene.player.x - this.config.attack_range_ot) < (this.x + this.config.attack_range)
    }
    is_player_over_enemy() {
        return this.scene.player.y < this.y + 500
    }
    player_is_not_in_left_area() {
        this.left_point = this.body.x - this.config.attack_range
        return this.scene.player.x < this.left_point
    }
    player_is_not_in_right_area() {
        this.left_point = this.body.x + this.config.attack_range
        return this.scene.player.x > this.left_point
    }
}
