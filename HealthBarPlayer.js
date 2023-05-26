class HealthBarPlayer extends Phaser.GameObjects.Sprite {
    constructor(scene, x , y, texture, hp_val) {
        super(scene, x, y, texture)
        this.x = x
        this.y = y
        this.scene = scene
        this.hp_bars = this.scene.add.group()
        this.hp_menu = this.scene.add.image(this.x, this.y, 'healh_menu')
        this.hp_menu.setScale(0.2, 0.2)

    }






}