class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.enemy_spawning_attributes();
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.collider(this, this.scene.player);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2);
        this.scene.physics.add.collider(this, this.scene.platforms4);
        this.hp = new HealthBar(this.scene, 150, 960, this);
        this.anims.play("stand", true);
    }

    enemy_spawning_attributes() {
        this.scene.add.existing(this);
        this.is_dead = false;
        this.scene.physics.world.enable(this);
        this.body.setSize(90, 137, 1);
        this.setScale(2);
        this.setBounce(0.2);
        this.setPosition(this.x, this.y);
        this.setCollideWorldBounds(true);
        this.setPushable(false);
    }

    update() {
        this.hp.x = this.body.x + 50
        this.hp.y = this.y - 150
        this.hp.draw()

        if ((Math.round(this.scene.player.y + 237) === Math.round(this.y)) && !(Math.round(this.scene.player.x) === Math.round(this.x - 145))) {
            if (this.scene.player.cursors.left.isDown) {
                this.scene.player.setPosition(this.x - 220, this.scene.player.y)
            } else if (this.scene.player.cursors.right.isDown) {
                this.scene.player.setPosition(this.x + 220, this.scene.player.y)
            };
        }

        if (!this.is_dead) {
            if (!(Math.round(this.scene.player.x) === Math.round(this.x - 197))) {
                if (this.scene.player.is_player_left() || this.scene.player.is_player_right()) {
                    if (this.scene.player.is_player_left()) {
                        if (this.scene.player.is_hitting_from_left() && this.scene.player.is_player_over_enemy()) {
                            this.setVelocityX(0);
                            this.anims.play("stand", true)
                        } else {
                            if (this.scene.player.player_is_not_in_left_area()) {
                                this.setVelocityX(-55).setFlipX(-1);
                                this.anims.play("run-left", true);
                            }
                        }
                    } else if (this.scene.player.is_player_right()) {
                        if (this.scene.player.is_hitting_from_right() && this.scene.player.is_player_over_enemy()) {
                            this.setVelocityX(0);
                            this.anims.play("stand", true)
                        } else {
                            if (this.scene.player.player_is_not_in_right_area()) {
                                this.setVelocityX(55).setFlipX(0);
                                this.anims.play("run-left", true);
                            }
                        }
                    }
                }
            } else {
                this.anims.play("stand", true)
            }
        }
    }
}
