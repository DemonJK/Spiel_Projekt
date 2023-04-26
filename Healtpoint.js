class Healthpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.scene.physics.add.collider(this, this.scene.layer)
        this.consumable_potion = this.scene.add.rectangle(this.x, this.y, 16, 16).setDepth(-1)
        this.scene.physics.add.existing(this.consumable_potion, true).setDepth(-1)
        this.anims.play("starter-healthpotion", true)
        this.scene.add.text("")
    }

    create() {

    }

    update() {
        console.log(this.consumable_potion);
    }
}

