class Healthpotion_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.healthpotion_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 3).setDepth(0)
        this.healthpotion_lvl_1.setBounce(0.3)
        this.healthpotion_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.healthpotion_lvl_1, this.scene.layer)
        this.healthpotion_lvl_1.setInteractive()

        this.healthpotion_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                this.scene.player.player_hp.decrease(-25)
                this.scene.player.inventory.removeItem(this.healthpotion_lvl_1)
            }
        })
        this.healthpotion_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.interactRect = this.scene.add.rectangle(this.healthpotion_lvl_1.x, this.healthpotion_lvl_1.y, 48, 48).setDepth(3)
                this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            }
        })
        this.healthpotion_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.interactRect.destroy()
            } else {
                this.interactRect.destroy()
            }
        })
    }

    update() {
        if (this.scene.physics.overlap(this.healthpotion_lvl_1, this.scene.player)) {
            this.healthpotion_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.healthpotion_lvl_1)
        }
        if (this.scene.is_opened === false) {
            this.interactRect.destroy()
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
        this.speedpotion_lvl_1.setInteractive()

        this.speedpotion_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                // EINBAU VON SPEED BONUS
                this.scene.player.inventory.removeItem(this.speedpotion_lvl_1)
            }
        })
        this.speedpotion_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.interactRect = this.scene.add.rectangle(this.speedpotion_lvl_1.x, this.speedpotion_lvl_1.y, 48, 48).setDepth(3)
                this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            }
        })
        this.speedpotion_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.interactRect.destroy()
            } else {
                this.interactRect.destroy()
            }
        })
    }

    update() {
        if (this.scene.physics.overlap(this.speedpotion_lvl_1, this.scene.player)) {
            this.speedpotion_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.speedpotion_lvl_1)
        }
    }
}

class Damagedecrease_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.damagedecrease_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 2).setDepth(0)
        this.damagedecrease_lvl_1.setBounce(0.3)
        this.damagedecrease_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.damagedecrease_lvl_1, this.scene.layer)
        this.damagedecrease_lvl_1.setInteractive()

        this.damagedecrease_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                // EINBAU VON RESISTENZ VOMSCHADEN
                this.scene.player.inventory.removeItem(this.damagedecrease_lvl_1)
            }
        })
        this.damagedecrease_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.interactRect = this.scene.add.rectangle(this.damagedecrease_lvl_1.x, this.damagedecrease_lvl_1.y, 48, 48).setDepth(3)
                this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            }
        })
        this.damagedecrease_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.interactRect.destroy()
            } else {
                this.interactRect.destroy()
            }
        })
    }

    update() {
        if (this.scene.physics.overlap(this.damagedecrease_lvl_1, this.scene.player)) {
            this.damagedecrease_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.damagedecrease_lvl_1)
        }
    }
}

