class FirstLevel extends Phaser.Scene {
    constructor() {
        super("FirstLevel")
    }

    create() {
        this.anims.play("nightbackground", true)
    }

    update() {
        
    }
}