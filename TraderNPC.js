class TraderNPC1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.TraderNPC1_Config = {
            idle: "TraderIdleAnim",         // IDLE ANIM
            offsetX: 23.5,                  // OFFSET X VOM TRADER
            offsetY: -12,                   // OFFSET Y VOM TRADER
            sizeWidth: 47,                  // WIDTH VOM TRADER
            sizeHeight: 91,                 // HEIGHT VOM TRADER
            pushable: false,                // PUSHABLE
            interactionRectX: 15,           // INTERACTION RECHTECK X
            interactionRectY: -28.5,        // INTERACTION RECHTECK Y
            interactionCheckRectX: 15,      // INTERCATION CHECK RECHTECK X
            interactionCheckRectY: -28.5    // INTERCATION CHECK RECHTECK Y
        }

        this.TraderCheckInteract = this.TraderCheckInteract // VAR FÜR TRADER-CHECK-INTERACT
        this.TraderInteract = this.TraderInteract           // VAR FÜR TRADER-INTERACT
        this.notCreated = false
        this.TraderMenuOpen = false

        this.keyE = this.scene.input.keyboard.addKey("E") // INTERAGIEREN TASTE E
        this.keyS = this.scene.input.keyboard.addKey("S") // ITEMS VERKAUFEN

        this.SpawnAttributes()              // SPAWN ATTRIBUTE VOM TRADER => CHECK FUNCTION
        this.CollisionBoxes()               // COLLISION VOM TRADER => CHECK FUNCTION
        this.TraderCheckInteractFunction()  // INTERACTION CHECK => CHECK FUNCTION
        this.TraderInteractFunction()       // INTERACTION => CHECK FUNCTION

        this.anims.play(this.TraderNPC1_Config.idle, true)  // IDLE TRADER ANIMATION
    }

    // COLLISION VOM TRADER
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

    // SPAWN ATTRIBUTE
    SpawnAttributes() {
        this.scene.add.existing(this)                       // ERSTELLT DENN TRADER IN BESTIMMTER SZENE
        this.scene.physics.world.enable(this)               // AKTIVIERT DIE PHYSICS FÜR DENN TRADER
        this.setPushable(this.TraderNPC1_Config.pushable)   // SETZT DENN TRADER AUF PUSHABLE = FALSE
        this.body.setSize(this.TraderNPC1_Config.sizeWidth, this.TraderNPC1_Config.sizeHeight)
        this.setOffset(this.TraderNPC1_Config.offsetX, this.TraderNPC1_Config.offsetY)
    }

    // INTERACTION CHECK
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

    // INTERACT
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

    // TRADER MENU
    TraderMenuFunction() {
        //EINPFLEGUNG VON TRADER MENU
        console.log("TRADER MENU OPENED");
    }

    update() {
        this.TraderCheckInteract.body.x = this.x + this.TraderNPC1_Config.interactionCheckRectX + this.TraderInteract.width
        this.TraderCheckInteract.body.y = this.y + this.TraderNPC1_Config.interactionCheckRectY
        this.TraderInteract.body.x = this.x + this.TraderNPC1_Config.interactionRectX
        this.TraderInteract.body.y = this.y + this.TraderNPC1_Config.interactionRectY

        this.overlapCheck = this.scene.physics.overlap(this.TraderCheckInteract, this.scene.player)
        if (this.overlapCheck === true) {
            //console.log("In Check");
            ///// ---------
            if (this.scene.physics.overlap(this.TraderInteract, this.scene.player)) {
                this.setInteractive()
                this.on("pointerover", () => {
                    if (!this.notCreated) {
                        this.TraderIntText1 = this.scene.add.text(this.x, this.y, "Right-Mouse ClickInteract")
                        this.TraderIntText2 = this.scene.add.text(this.x, this.y + 25, "to Interact")
                        this.notCreated = true
                    }
                })
                this.on("pointerout", () => {
                    this.TraderIntText1.destroy()
                    this.TraderIntText2.destroy()
                    this.notCreated = false
                })
                this.on("pointerup", () => {
                    this.scene.player.setVelocityX(0)
                    if (!this.TraderMenuOpen) {
                        this.TraderMenuFunction()
                        this.TraderMenuOpen = true
                    }
                    
                })
                //console.log("In Interact"); // AFTER CHECK
            } else {
                this.disableInteractive()
            }
            ///// ---------
        } else {
            //console.log("Not in Check");
        }
    }
}