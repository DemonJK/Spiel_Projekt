class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.portal_spawning_attributes()
        this.anims.play("Portal", true)
    }

    portal_spawning_attributes(){
        this.scene.add.existing(this)
    }

    create() {
    }

    update() {
        this.anims.play("Portal", true)
        console.log();
    }
}