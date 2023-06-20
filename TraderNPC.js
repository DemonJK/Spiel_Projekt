class TraderNPC1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.TraderNPC1_Config = {
            idle: "TraderIdleAnim",
            offsetX: 23.5,
            offsetY: -12,
            sizeWidth: 47,
            sizeHeight: 91,
            pushable: false,
            interactionRectX: 15,
            interactionRectY: -28.5,
            interactionCheckRectX: 15,
            interactionCheckRectY: -28.5
        }

        this.TraderCheckInteract = this.TraderCheckInteract
        this.TraderInteract = this.TraderInteract
        this.Checked = false

        this.SpawnAttributes()
        this.CollisionBoxes()
        this.TraderCheckInteractFunction()
        this.TraderInteractFunction()

        this.anims.play(this.TraderNPC1_Config.idle, true)
    }

    CollisionBoxes() {
        this.scene.physics.add.collider(this, this.scene.buildings3)

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground1, () => {
            this.body.touching.down = true
        })
    }

    SpawnAttributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.setPushable(this.TraderNPC1_Config.pushable)
        this.body.setSize(this.TraderNPC1_Config.sizeWidth, this.TraderNPC1_Config.sizeHeight)
        this.setOffset(this.TraderNPC1_Config.offsetX, this.TraderNPC1_Config.offsetY)
    }

    TraderCheckInteractFunction() {
        this.TraderCheckInteract = this.scene.add.rectangle(
            this.TraderNPC1_Config.interactionRectX,
            this.TraderNPC1_Config.interactionRectY,
            100,
            25,
            0xff0000,
            1
        )
        this.scene.physics.add.existing(this.TraderCheckInteract, true).setDepth(-1)
    }

    TraderInteractFunction() {
        this.TraderInteract = this.scene.add.rectangle(
            this.TraderNPC1_Config.interactionRectX,
            this.TraderNPC1_Config.interactionRectY,
            25,
            25,
            0xff0000,
            1
        )
        this.scene.physics.add.existing(this.TraderInteract, true).setDepth(-1)
    }

    TraderSpeechBoxDestroy() {
        this.BackgroundBox.destroy()
        this.TraderSaying1.destroy()
    }

    update() {
        this.TraderCheckInteract.body.x = this.x + this.TraderNPC1_Config.interactionCheckRectX
        this.TraderCheckInteract.body.y = this.y + this.TraderNPC1_Config.interactionCheckRectY
        this.TraderInteract.body.x = this.x + this.TraderNPC1_Config.interactionRectX
        this.TraderInteract.body.y = this.y + this.TraderNPC1_Config.interactionRectY
        this.overlapCheck = this.scene.physics.overlap(this.TraderCheckInteract, this.scene.player)
        if (this.overlapCheck === true) {
            this.Checked = true
            this.CheckCreated = false
            if (!this.CheckCreated) {
                this.BackgroundBox = this.scene.add.rectangle(this.x, this.y, 250, 50, 0xBBBBBB, 0.655).setDepth(4)
                this.TraderSaying1 = this.scene.add.text(this.BackgroundBox.x, this.BackgroundBox.y, "Welcome, dear Traveler.", {
                    fontSize: 18,
                    fontFamily: "cursive",
                    fill: 0xffffff
                }).setDepth(5).setOrigin(0.5, 0.5).setResolution(16)
                this.CheckCreated = true
            }
            console.log("In Check");

            ///// ---------
            if (this.scene.physics.overlap(this.TraderInteract, this.scene.player)) {
                console.log("In Interact"); // AFTER CHECK
            }
            ///// ---------
        } else {
            if ((this.Checked === true) && (!this.overlapCheck) && (this.CheckCreated === true)) {
                this.TraderSpeechBoxDestroy()
                console.log("Not in Check");
            }
        }
    }
}