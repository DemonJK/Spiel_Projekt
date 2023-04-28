class Healthpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.scene.physics.add.collider(this, this.scene.layer)
        this.consumable_potion = this.scene.physics.add.existing(this)
        this.scene.physics.add.existing(this.consumable_potion, true).setDepth(0)
        this.consumable_potion.setBounce(0.3)
        this.consumable_potion.setSize(16, 16)
    }

    update() {
        //CHANGE POS OF CONSUMABLE POTION IF USED
        if (this.scene.physics.overlap(this.consumable_potion, this.scene.player)) {
            console.log("overlap");
            this.consumable_potion.setPosition(0, 0)
        }
        //this.scene.add.sprite(this.consumable_potion.x, this.consumable_potion.y, "potion", 3).setDepth(0)
    }
}

