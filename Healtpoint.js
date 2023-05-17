class Healthpotion_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.healthpotion_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 3).setDepth(0)
        this.healthpotion_lvl_1.setBounce(0.3)
        this.healthpotion_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.healthpotion_lvl_1, this.scene.layer)
        this.healthpotion_lvl_1.setInteractive()
        this.healthpotion_lvl_1.on("pointerup", ()=> {
            if (this.scene.player.inventory.is_opened) {
                this.scene.player.hp.decrease(-25)
                this.scene.player.inventory.removeItem(this.healthpotion_lvl_1)
                
            }
        })
    
    }

    update() {
        //CHANGE POS OF HEALTH POTION IF USED
        if (this.scene.physics.overlap(this.healthpotion_lvl_1, this.scene.player)) {
            this.healthpotion_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.healthpotion_lvl_1)
        }
    }
}

class Speedpotion_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.speedpotion_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 12).setDepth(0)
        this.speedpotion_lvl_1.setBounce(0.3)
        this.speedpotion_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.speedpotion_lvl_1, this.scene.layer)
    }

    update() {
        //CHANGE POS OF SPEED POTION IF USED
        if (this.scene.physics.overlap(this.speedpotion_lvl_1, this.scene.player)) {
            this.speedpotion_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.speedpotion_lvl_1)
            if (this.scene.player.keyA.isDown && (this.scene.player.setVelocityX = -425)) {
                this.scene.player.setVelocityX(-475)
            }
        }
    }
}

