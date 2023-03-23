class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);
        this.player_spawning_attributes();
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.collider(this, this.scene.enemy);     
        this.scene.physics.add.collider(this, this.passThruPlatforms, this.onPlatform);
        this.scene.physics.add.collider(this, this.passThruPlatforms2, this.onPlatform);
        this.scene.physics.add.collider(this, this.platforms4);
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
}

    