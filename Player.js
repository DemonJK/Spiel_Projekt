class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);
        this.player_spawning_attributes();

        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.collider(this, this.scene.enemy);     
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms, this.onPlatform);
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2, this.onPlatform);
        this.scene.physics.add.collider(this, this.scene.platforms4);
        this.scene.physics.add.collider(this, this.scene.enemy, this.collideObjects, null, this);
    }
    
    player_spawning_attributes() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setSize(30, 30, 1);
        this.body.setOffset(25, 33);
        this.setScale(5);
        this.setPosition(this.x, this.y);
        this.setCollideWorldBounds(true)
    }

    collideObjects() {
        this.is_coliding = true
    }

    update() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        if ((this.cursors.up.isDown && this.body.touching.down)) {
            console.log("UP CURSOR IS ACTIVE");
            this.setVelocityY(-600);
            this.anims.play("up", true);
            
        } else if (this.cursors.left.isDown && !(Math.round(this.scene.enemy.x) === Math.round(this.x - 185))) {
            console.log("LEFT CURSOR IS ACTIVE");
            this.setVelocityX(-160).setFlipX(-1);
            this.anims.play("left", true);
            this.scene.cameras.main.followOffset.x = -250

        } else if (this.cursors.right.isDown) {
            console.log("RIGHT CURSOR IS ACTIVE");
            this.setVelocityX(160).setFlipX(0);
            this.anims.play("right", true);
            this.scene.cameras.main.followOffset.x = -250;

        } else if (this.cursors.space.isDown && this.body.touching.down) {
            console.log("SPACEBAR IS ACTIVE");
            if (this.cursors.space.isDown && this.body.touching.down) {
                this.scene.enemy.hp.decrease(5)
            }
            this.anims.play("space", true);
            this.setVelocityX(0);

        } else {
            this.setVelocityX(0);
            this.anims.play("idle", true);
        }

        if ((this.cursors.down.isDown)) {
            console.log("DOWN CURSOR IS ACTIVE")
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

    