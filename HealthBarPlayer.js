class HealthBarPlayer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, hp_val) {
        super(scene, x, y, texture)
        this.x = x
        this.y = y
        this.scene = scene
        this.hp_val = hp_val
        this.hp_bars = []
        this.maxHP = this.hp_val
        this.hp_menu = this.scene.add.image(this.x - 66, this.y, 'healh_menu').setScrollFactor(0, 0).setDepth(1)
        this.hp_menu.setScale(0.2, 0.2)

        for (let i = 0; i < hp_val; i++) {
            this.healthBar = this.scene.add.rectangle(this.x - 54 + i, this.y + 2, 1, 22, 0xFF0000).setScrollFactor(0, 0).setDepth(0)
            this.BlockTop = this.scene.add.rectangle(this.healthBar.x, this.y - 8, 1, 4, 0x000000).setScrollFactor(0, 0).setDepth(1)
            this.BlockBottom = this.scene.add.rectangle(this.healthBar.x, this.y + 14, 1, 4, 0x000000).setScrollFactor(0, 0).setDepth(1)
            this.hp_bars.push(this.healthBar)
        }
        this.BlockEnd = this.scene.add.rectangle(this.healthBar.x + 1, this.y + 3, 4, 20, 0x000000).setScrollFactor(0, 0).setDepth(1)
    }

    decrease(amount) {
        this.hp_val -= amount
        if (this.hp_val > this.maxHP) {
            this.hp_val = this.maxHP
        }
        for (let index = 0; index < this.hp_bars.length; index++) {
            this.hp_bars[index].destroy(true)
        }
        this.hp_bars = []
        
        for (let i = 0; i < this.hp_val; i++) {
            this.healthBar2 = this.scene.add.rectangle(this.x - 54 + i, this.y + 2, 1, 22, 0xFF0000).setScrollFactor(0, 0).setDepth(0)
            this.hp_bars.push(this.healthBar2)
        }
    }

    addHp(amount) {
        for (let index = 0; index < amount; index++) {
            this.BlockTop = this.scene.add.rectangle(this.BlockTop.x + 1, this.y - 8, 1, 4, 0x000000).setScrollFactor(0, 0).setDepth(1)
            this.BlockBottom = this.scene.add.rectangle(this.BlockBottom.x +1 , this.y + 14, 1, 4, 0x000000).setScrollFactor(0, 0).setDepth(1)
        }
        this.BlockEnd.setPosition(this.BlockTop.x, this.BlockEnd.y)
        this.maxHP += amount
    }
}