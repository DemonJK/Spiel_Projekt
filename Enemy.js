class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.enemy_spawning_attributes();
        this.scene.physics.add.collider(this, this.scene.layer, () => { this.body.touching.down = true });
        this.scene.physics.add.collider(this, this.scene.player);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2);
        this.scene.physics.add.collider(this, this.scene.platforms4);
        this.hp = new HealthBar(this.scene, 150, 960, 80, 16, 100, this);
        this.anims.play("stand", true);
        this.setFlipX(true)
        this.has_hp_lose = false
    }

    enemy_spawning_attributes() {
        this.scene.add.existing(this);
        this.is_dead = false;
        this.scene.physics.world.enable(this);
        this.body.setSize(90, 137, 1);
        this.setBounce(0.2);
        this.setPosition(this.x, this.y);
        this.setPushable(false);
    }

    update_health_bar_pos() {
        this.hp.x = this.body.x + 5
        this.hp.y = this.y - 80
        this.hp.draw()
    }

    update() {
        this.update_health_bar_pos();

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
                            this.setVelocityX(0);
                            this.anims.play("stand", true)
                        } else {
                            if (this.player_is_not_in_left_area()) {
                                this.setVelocityX(-55).setFlipX(-1);
                                this.anims.play("run-left", true);
                            }
                        }
                    } else if (this.is_player_right()) {
                        if (this.is_hitting_from_right() && this.is_player_over_enemy()) {
                            this.setVelocityX(0);
                            this.anims.play("stand", true)
                        } else {
                            if (this.player_is_not_in_right_area()) {
                                this.setVelocityX(55).setFlipX(0);
                                this.anims.play("run-left", true);
                            }
                        }
                    }
                }
            } else {
                if (this.velocity === 0) {
                    this.anims.play("stand", true);
                }
            }
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
        this.left_point = this.body.x - 200
        return this.scene.player.x < this.left_point
    }
    player_is_not_in_right_area() {
        this.left_point = this.body.x + 200
        return this.scene.player.x > this.left_point
    }
}
