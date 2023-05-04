class Healthpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.consumable_potion = this.scene.physics.add.sprite(this.x, this.y, "potion", 3).setDepth(0)
        this.consumable_potion.setBounce(0.3)
        this.consumable_potion.setSize(16, 16)
        this.scene.physics.add.collider(this.consumable_potion, this.scene.layer)
    }

    create() {
        
    }

    update() {
        //CHANGE POS OF CONSUMABLE POTION IF USED
        if (this.scene.physics.overlap(this.consumable_potion, this.scene.player)) {
            console.log("overlap");
            this.consumable_potion.setPosition(0, 0)
            this.scene.player.hp.decrease(-25)
        }
    }
}

