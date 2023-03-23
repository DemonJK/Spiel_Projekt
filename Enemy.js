class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture) {
        super(scene, x, y, texture);  
        this.enemy_spawning_attributes();
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.scene.physics.add.collider(this, this.scene.player);
        this.hp = new HealthBar(this.scene, 150, 960);
    }

    enemy_spawning_attributes() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setSize(90, 137, 1);
        this.body.setOffset(93, 67);
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
    }
}
