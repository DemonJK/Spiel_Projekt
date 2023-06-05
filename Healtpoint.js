class Healthpotion_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.healthpotion_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 276).setDepth(0)
        this.healthpotion_lvl_1.setBounce(0.3)
        this.healthpotion_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.healthpotion_lvl_1, this.scene.layer)
        this.healthpotion_lvl_1.setInteractive()
        this.onItem = false

        this.healthpotion_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                this.scene.player.player_hp.decrease(-5)
                this.InformationPotionDestroy()
                this.scene.player.inventory.removeItem(this.healthpotion_lvl_1)
            }
        })
        this.healthpotion_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = true
                this.InformationPotion()
            }
        })
        this.healthpotion_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = false
                this.InformationPotion()
            }
        })
    }

    InformationPotion() {
        if (this.onItem === true) {
            this.interactRect = this.scene.add.rectangle(this.healthpotion_lvl_1.x, this.healthpotion_lvl_1.y, 48, 48).setDepth(3)
            this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            this.backgroundBox = this.scene.add.rectangle(this.healthpotion_lvl_1.x + 135, this.healthpotion_lvl_1.y + 100, 200, 300, 0xBBBBBB, 0.655).setDepth(4)
            this.borderForBoxTop = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y - 150, 200, 4, 0x000000).setDepth(5)
            this.borderForBoxLeft = this.scene.add.rectangle(this.backgroundBox.x - 100, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxRight = this.scene.add.rectangle(this.backgroundBox.x + 100, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxBottom = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y + 150, 200, 4, 0x000000).setDepth(5)

            this.informationText = this.scene.add.text(this.backgroundBox.x, this.backgroundBox.y - 130, "Information", {
                fontSize: 18,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextName = this.scene.add.text(this.backgroundBox.x - 75, this.backgroundBox.y - 100, "Name:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterName = this.scene.add.text(this.informationTextName.x + 60, this.informationTextName.y, " Health Potion", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextPotionLevel = this.scene.add.text(this.backgroundBox.x - 77, this.backgroundBox.y - 85, "Level:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterPotionLevel = this.scene.add.text(this.informationTextPotionLevel.x + 25, this.informationTextPotionLevel.y, " 1", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextUsageOfPotion = this.scene.add.text(this.backgroundBox.x - 75, this.backgroundBox.y - 70, "Usage:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterUsageOfPotion = this.scene.add.text(this.informationTextUsageOfPotion.x + 62, this.informationTextUsageOfPotion.y, " Restore 5 HP", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextDuration = this.scene.add.text(this.backgroundBox.x - 67, this.backgroundBox.y - 55, "Duration:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterDuration = this.scene.add.text(this.informationTextDuration.x + 53, this.informationTextDuration.y, " Instant", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)
        }

        if (this.onItem === false) {
            this.InformationPotionDestroy()
        }
    }

    InformationPotionDestroy() {
        this.interactRect.destroy()
        this.backgroundBox.destroy()
        this.borderForBoxTop.destroy()
        this.borderForBoxLeft.destroy()
        this.borderForBoxRight.destroy()
        this.borderForBoxBottom.destroy()
        this.informationText.destroy()
        this.informationTextName.destroy()
        this.informationTextAfterName.destroy()
        this.informationTextPotionLevel.destroy()
        this.informationTextAfterPotionLevel.destroy()
        this.informationTextUsageOfPotion.destroy()
        this.informationTextAfterUsageOfPotion.destroy()
        this.informationTextDuration.destroy()
        this.informationTextAfterDuration.destroy()
    }

    update() {
        if (this.scene.physics.overlap(this.healthpotion_lvl_1, this.scene.player)) {
            this.healthpotion_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.healthpotion_lvl_1)
        }

        if (this.interactRect) {
            if (this.interactRect.visible) {
                if (!this.scene.player.inventory.is_opened) {
                    this.InformationPotionDestroy()
                }
            }
        }
    }
}

class Healthpotion_LVL_2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.healthpotion_lvl_2 = this.scene.physics.add.sprite(this.x, this.y, "potion", 299).setDepth(0)
        this.healthpotion_lvl_2.setBounce(0.3)
        this.healthpotion_lvl_2.setSize(16, 16)
        this.scene.physics.add.collider(this.healthpotion_lvl_2, this.scene.layer)
        this.healthpotion_lvl_2.setInteractive()
        this.onItem = false

        this.healthpotion_lvl_2.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                this.scene.player.player_hp.decrease(-10)
                this.InformationPotionDestroy()
                this.scene.player.inventory.removeItem(this.healthpotion_lvl_2)
            }
        })
        this.healthpotion_lvl_2.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = true
                this.InformationPotion()
            }
        })
        this.healthpotion_lvl_2.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = false
                this.InformationPotion()
            }
        })
    }

    InformationPotion() {
        if (this.onItem === true) {
            this.interactRect = this.scene.add.rectangle(this.healthpotion_lvl_2.x, this.healthpotion_lvl_2.y, 48, 48).setDepth(3)
            this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            this.backgroundBox = this.scene.add.rectangle(this.healthpotion_lvl_2.x + 135, this.healthpotion_lvl_2.y + 100, 200, 300, 0xBBBBBB, 0.655).setDepth(4)
            this.borderForBoxTop = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y - 150, 200, 4, 0x000000).setDepth(5)
            this.borderForBoxLeft = this.scene.add.rectangle(this.backgroundBox.x - 100, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxRight = this.scene.add.rectangle(this.backgroundBox.x + 100, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxBottom = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y + 150, 200, 4, 0x000000).setDepth(5)

            this.informationText = this.scene.add.text(this.backgroundBox.x, this.backgroundBox.y - 130, "Information", {
                fontSize: 18,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextName = this.scene.add.text(this.backgroundBox.x - 75, this.backgroundBox.y - 100, "Name:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterName = this.scene.add.text(this.informationTextName.x + 60, this.informationTextName.y, " Health Potion", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextPotionLevel = this.scene.add.text(this.backgroundBox.x - 77, this.backgroundBox.y - 85, "Level:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterPotionLevel = this.scene.add.text(this.informationTextPotionLevel.x + 25, this.informationTextPotionLevel.y, " 2", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextUsageOfPotion = this.scene.add.text(this.backgroundBox.x - 75, this.backgroundBox.y - 70, "Usage:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterUsageOfPotion = this.scene.add.text(this.informationTextUsageOfPotion.x + 62, this.informationTextUsageOfPotion.y, " Restore 10 HP", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextDuration = this.scene.add.text(this.backgroundBox.x - 67, this.backgroundBox.y - 55, "Duration:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterDuration = this.scene.add.text(this.informationTextDuration.x + 53, this.informationTextDuration.y, " Instant", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)
        }

        if (this.onItem === false) {
            this.InformationPotionDestroy()
        }
    }

    InformationPotionDestroy() {
        this.interactRect.destroy()
        this.backgroundBox.destroy()
        this.borderForBoxTop.destroy()
        this.borderForBoxLeft.destroy()
        this.borderForBoxRight.destroy()
        this.borderForBoxBottom.destroy()
        this.informationText.destroy()
        this.informationTextName.destroy()
        this.informationTextAfterName.destroy()
        this.informationTextPotionLevel.destroy()
        this.informationTextAfterPotionLevel.destroy()
        this.informationTextUsageOfPotion.destroy()
        this.informationTextAfterUsageOfPotion.destroy()
        this.informationTextDuration.destroy()
        this.informationTextAfterDuration.destroy()
    }

    update() {
        if (this.scene.physics.overlap(this.healthpotion_lvl_2, this.scene.player)) {
            this.healthpotion_lvl_2.setPosition(0, 0)
            this.scene.player.inventory.additem(this.healthpotion_lvl_2)
        }

        if (this.interactRect) {
            if (this.interactRect.visible) {
                if (!this.scene.player.inventory.is_opened) {
                    this.InformationPotionDestroy()
                }
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------ HEALTH INCREASE POTION
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------ SPEED INCREASE POTION KATEGORY

class Speedpotion_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.speedpotion_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 285).setDepth(0)
        this.speedpotion_lvl_1.setBounce(0.3)
        this.speedpotion_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.speedpotion_lvl_1, this.scene.layer)
        this.speedpotion_lvl_1.setInteractive()
        this.onItem = false

        this.speedpotion_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                this.scene.player.PlayerDefaultLevel.speed += 10
                this.InformationPotionDestroy()
                this.scene.player.inventory.removeItem(this.speedpotion_lvl_1)
                setTimeout(() => {
                    this.scene.player.PlayerDefaultLevel.speed -= 10
                }, 2000);
            }
        })
        this.speedpotion_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = true
                this.InformationPotion()
            }
        })
        this.speedpotion_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = false
                this.InformationPotion()
            }
        })
    }

    InformationPotion() {
        if (this.onItem === true) {
            this.interactRect = this.scene.add.rectangle(this.speedpotion_lvl_1.x, this.speedpotion_lvl_1.y, 48, 48).setDepth(3)
            this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            this.backgroundBox = this.scene.add.rectangle(this.speedpotion_lvl_1.x + 135, this.speedpotion_lvl_1.y + 100, 200, 300, 0xBBBBBB, 0.655).setDepth(4)
            this.borderForBoxTop = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y - 150, 200, 4, 0x000000).setDepth(5)
            this.borderForBoxLeft = this.scene.add.rectangle(this.backgroundBox.x - 100, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxRight = this.scene.add.rectangle(this.backgroundBox.x + 100, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxBottom = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y + 150, 200, 4, 0x000000).setDepth(5)

            this.informationText = this.scene.add.text(this.backgroundBox.x, this.backgroundBox.y - 130, "Information", {
                fontSize: 18,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextName = this.scene.add.text(this.backgroundBox.x - 75, this.backgroundBox.y - 100, "Name:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterName = this.scene.add.text(this.informationTextName.x + 60, this.informationTextName.y, " Speed Potion", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextPotionLevel = this.scene.add.text(this.backgroundBox.x - 77, this.backgroundBox.y - 85, "Level:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterPotionLevel = this.scene.add.text(this.informationTextPotionLevel.x + 25, this.informationTextPotionLevel.y, " 1", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextUsageOfPotion = this.scene.add.text(this.backgroundBox.x - 75, this.backgroundBox.y - 70, "Usage:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterUsageOfPotion = this.scene.add.text(this.informationTextUsageOfPotion.x + 82, this.informationTextUsageOfPotion.y, " Increase Speed by 100", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextDuration = this.scene.add.text(this.backgroundBox.x - 67, this.backgroundBox.y - 55, "Duration:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterDuration = this.scene.add.text(this.informationTextDuration.x + 60, this.informationTextDuration.y, " 5 Seconds", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)
        }

        if (this.onItem === false) {
            this.InformationPotionDestroy()
        }
    }

    InformationPotionDestroy() {
        this.interactRect.destroy()
        this.backgroundBox.destroy()
        this.borderForBoxTop.destroy()
        this.borderForBoxLeft.destroy()
        this.borderForBoxRight.destroy()
        this.borderForBoxBottom.destroy()
        this.informationText.destroy()
        this.informationTextName.destroy()
        this.informationTextAfterName.destroy()
        this.informationTextPotionLevel.destroy()
        this.informationTextAfterPotionLevel.destroy()
        this.informationTextUsageOfPotion.destroy()
        this.informationTextAfterUsageOfPotion.destroy()
        this.informationTextDuration.destroy()
        this.informationTextAfterDuration.destroy()
    }

    update() {
        if (this.scene.physics.overlap(this.speedpotion_lvl_1, this.scene.player)) {
            this.speedpotion_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.speedpotion_lvl_1)
        }

        if (this.interactRect) {
            if (this.interactRect.visible) {
                if (!this.scene.player.inventory.is_opened) {
                    this.InformationPotionDestroy()
                }
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------ SPEED INCREASE POTION KATEGORY
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------ DAMAGE DECREASE POTION KATEGORY

class Damagedecrease_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.damagedecrease_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 275).setDepth(0)
        this.damagedecrease_lvl_1.setBounce(0.3)
        this.damagedecrease_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.damagedecrease_lvl_1, this.scene.layer)
        this.damagedecrease_lvl_1.setInteractive()
        this.onItem = false

        this.damagedecrease_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                this.scene.player.player_hp.decrease(-2)
                this.InformationPotionDestroy()
                this.scene.player.inventory.removeItem(this.damagedecrease_lvl_1)
                /*setTimeout(() => {
                    this.scene.enemy.damage += 15
                }, 50000);*/
            }
        })
        this.damagedecrease_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = true
                this.InformationPotion()
            }
        })
        this.damagedecrease_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = false
                this.InformationPotion()
            }
        })
    }

    InformationPotion() {
        if (this.onItem === true) {
            this.interactRect = this.scene.add.rectangle(this.damagedecrease_lvl_1.x, this.damagedecrease_lvl_1.y, 48, 48).setDepth(3)
            this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            this.backgroundBox = this.scene.add.rectangle(this.damagedecrease_lvl_1.x + 155, this.damagedecrease_lvl_1.y + 100, 250, 300, 0xBBBBBB, 0.655).setDepth(4)
            this.borderForBoxTop = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y - 150, 250, 4, 0x000000).setDepth(5)
            this.borderForBoxLeft = this.scene.add.rectangle(this.backgroundBox.x - 125, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxRight = this.scene.add.rectangle(this.backgroundBox.x + 125, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxBottom = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y + 150, 250, 4, 0x000000).setDepth(5)

            this.informationText = this.scene.add.text(this.backgroundBox.x, this.backgroundBox.y - 130, "Information", {
                fontSize: 18,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextName = this.scene.add.text(this.backgroundBox.x - 100, this.backgroundBox.y - 100, "Name:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterName = this.scene.add.text(this.informationTextName.x + 95, this.informationTextName.y, " Damage Resistenz Potion", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextPotionLevel = this.scene.add.text(this.backgroundBox.x - 102, this.backgroundBox.y - 85, "Level:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterPotionLevel = this.scene.add.text(this.informationTextPotionLevel.x + 25, this.informationTextPotionLevel.y, " 1", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextUsageOfPotion = this.scene.add.text(this.backgroundBox.x - 100, this.backgroundBox.y - 70, "Usage:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterUsageOfPotion = this.scene.add.text(this.informationTextUsageOfPotion.x + 105, this.informationTextUsageOfPotion.y, " Resist Damage from Enemies", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextDuration = this.scene.add.text(this.backgroundBox.x - 92, this.backgroundBox.y - 55, "Duration:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterDuration = this.scene.add.text(this.informationTextDuration.x + 60, this.informationTextDuration.y, " 5 Seconds", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)
        }

        if (this.onItem === false) {
            this.InformationPotionDestroy()
        }
    }

    InformationPotionDestroy() {
        this.interactRect.destroy()
        this.backgroundBox.destroy()
        this.borderForBoxTop.destroy()
        this.borderForBoxLeft.destroy()
        this.borderForBoxRight.destroy()
        this.borderForBoxBottom.destroy()
        this.informationText.destroy()
        this.informationTextName.destroy()
        this.informationTextAfterName.destroy()
        this.informationTextPotionLevel.destroy()
        this.informationTextAfterPotionLevel.destroy()
        this.informationTextUsageOfPotion.destroy()
        this.informationTextAfterUsageOfPotion.destroy()
        this.informationTextDuration.destroy()
        this.informationTextAfterDuration.destroy()
    }

    update() {
        if (this.scene.physics.overlap(this.damagedecrease_lvl_1, this.scene.player)) {
            this.damagedecrease_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.damagedecrease_lvl_1)
        }

        if (this.interactRect) {
            if (this.interactRect.visible) {
                if (!this.scene.player.inventory.is_opened) {
                    this.InformationPotionDestroy()
                }
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------------ DAMAGE DECREASE POTION KATEGORY
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------ RENERATION POTION KATEGORY

class Regeneration_LVL_1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.regeneration_lvl_1 = this.scene.physics.add.sprite(this.x, this.y, "potion", 289).setDepth(0)
        this.regeneration_lvl_1.setBounce(0.3)
        this.regeneration_lvl_1.setSize(16, 16)
        this.scene.physics.add.collider(this.regeneration_lvl_1, this.scene.layer)
        this.regeneration_lvl_1.setInteractive()
        this.onItem = false

        this.regeneration_lvl_1.on("pointerup", () => {
            if (this.scene.player.inventory.is_opened) {
                // REGENERATIONS EFFEKT ERSTELLEN
                this.scene.player.player_hp.decrease(-2)
                this.InformationPotionDestroy()
                this.scene.player.inventory.removeItem(this.regeneration_lvl_1)
                /*setTimeout(() => {
                    this.scene.enemy.damage += 15
                }, 50000);*/
            }
        })
        this.regeneration_lvl_1.on("pointerover", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = true
                this.InformationPotion()
            }
        })
        this.regeneration_lvl_1.on("pointerout", () => {
            if (this.scene.player.inventory.is_opened) {
                this.onItem = false
                this.InformationPotion()
            }
        })
    }

    InformationPotion() {
        if (this.onItem === true) {
            this.interactRect = this.scene.add.rectangle(this.regeneration_lvl_1.x, this.regeneration_lvl_1.y, 48, 48).setDepth(3)
            this.scene.physics.add.existing(this.interactRect, true).setDepth(3).setStrokeStyle(5, 0xFFFF00)
            this.backgroundBox = this.scene.add.rectangle(this.regeneration_lvl_1.x + 155, this.regeneration_lvl_1.y + 100, 250, 300, 0xBBBBBB, 0.655).setDepth(4)
            this.borderForBoxTop = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y - 150, 250, 4, 0x000000).setDepth(5)
            this.borderForBoxLeft = this.scene.add.rectangle(this.backgroundBox.x - 125, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxRight = this.scene.add.rectangle(this.backgroundBox.x + 125, this.backgroundBox.y, 4, 300, 0x000000).setDepth(5)
            this.borderForBoxBottom = this.scene.add.rectangle(this.backgroundBox.x, this.backgroundBox.y + 150, 250, 4, 0x000000).setDepth(5)

            this.informationText = this.scene.add.text(this.backgroundBox.x, this.backgroundBox.y - 130, "Information", {
                fontSize: 18,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextName = this.scene.add.text(this.backgroundBox.x - 100, this.backgroundBox.y - 100, "Name:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterName = this.scene.add.text(this.informationTextName.x + 95, this.informationTextName.y, " Health Regeneration", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextPotionLevel = this.scene.add.text(this.backgroundBox.x - 102, this.backgroundBox.y - 85, "Level:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterPotionLevel = this.scene.add.text(this.informationTextPotionLevel.x + 25, this.informationTextPotionLevel.y, " 1", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextUsageOfPotion = this.scene.add.text(this.backgroundBox.x - 100, this.backgroundBox.y - 70, "Usage:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterUsageOfPotion = this.scene.add.text(this.informationTextUsageOfPotion.x + 105, this.informationTextUsageOfPotion.y, " Regenerate 2 HP", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextDuration = this.scene.add.text(this.backgroundBox.x - 92, this.backgroundBox.y - 55, "Duration:", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)

            this.informationTextAfterDuration = this.scene.add.text(this.informationTextDuration.x + 60, this.informationTextDuration.y, " 5 Seconds", {
                fontSize: 14,
                fontFamily: "cursive",
                fill: 0xffffff
            }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)
        }

        if (this.onItem === false) {
            this.InformationPotionDestroy()
        }
    }

    InformationPotionDestroy() {
        this.interactRect.destroy()
        this.backgroundBox.destroy()
        this.borderForBoxTop.destroy()
        this.borderForBoxLeft.destroy()
        this.borderForBoxRight.destroy()
        this.borderForBoxBottom.destroy()
        this.informationText.destroy()
        this.informationTextName.destroy()
        this.informationTextAfterName.destroy()
        this.informationTextPotionLevel.destroy()
        this.informationTextAfterPotionLevel.destroy()
        this.informationTextUsageOfPotion.destroy()
        this.informationTextAfterUsageOfPotion.destroy()
        this.informationTextDuration.destroy()
        this.informationTextAfterDuration.destroy()
    }

    update() {
        if (this.scene.physics.overlap(this.regeneration_lvl_1, this.scene.player)) {
            this.regeneration_lvl_1.setPosition(0, 0)
            this.scene.player.inventory.additem(this.regeneration_lvl_1)
        }

        if (this.interactRect) {
            if (this.interactRect.visible) {
                if (!this.scene.player.inventory.is_opened) {
                    this.InformationPotionDestroy()
                }
            }
        }
    }
}

