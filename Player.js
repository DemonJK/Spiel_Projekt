class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.inventory = new Inventory(this.scene, this.x, this.y) // INVENTAR
        this.player_spawning_attributes() // ATTRIBUTE VOM SPIELER
        this.colliders() // FUNKTION VON COLLIDERN
        this.player_hp = new HealthBarPlayer(this.scene, this.scene.cameras.main.centerX * 0.57, this.scene.cameras.main.centerY * 0.53, "healh_menu", 100) // NEUE HEALTHBAR
        this.coinCounter = new CoinCounter(this.scene, this.scene.cameras.main.centerX * 1.435, this.scene.cameras.main.centerY * 0.542)
        //this.TestRect = this.scene.add.rectangle(this.x, this.y, 100, 100, 0xFF0000)
        this.PlayerDefaultLevel = {
            HPval: 100,     // HEALTH VALUE
            damage: 100,    // DAMAGE
            speed: 160,     // SPEED
            idle_speed: 0,  // IDLE SPEED
            level: 1,       // LEVEL
            xp: 0,          // EXPERIENCE
        }
        this.xpThresholds = []; // Beispiel-Schwellenwerte für jedes Level
        const baseXP = 100; // Basis-XP für das erste Level
        const increaseFactor = 1.5; // Faktor zur Erhöhung der XP-Schwelle

        for (let i = 0; i < 100; i++) {
            const threshold = Math.round(baseXP * Math.pow(increaseFactor, i));
            this.xpThresholds.push(threshold);
        }

        this.player_hp.setScrollFactor(0, 0)
        this.anims.play("Idle", true) // ANIMATION VOM SPIELER IM IDLE ALS DEFAULT
        this.is_jump_played = false
        this.is_jumpdown_played = false
        this.swing_box // ATTACK BOXEN
        this.looking_direction = "right" // SCHAUT IN DIE RICHTUNG RECHTS ALS DEFAULT
        this.is_atacking = false // CHECK FÜR ANGRIFF
        this.readen = false // TEXT GELESEN
        this.keyW = this.scene.input.keyboard.addKey('W') // SPRUNG
        this.keyA = this.scene.input.keyboard.addKey('A') // LINKS BEWEGEN
        this.keyS = this.scene.input.keyboard.addKey('S') // FALLEN DURCH BESTIMMTE PLATFORMEN
        this.keyI = this.scene.input.keyboard.addKey('I') // INVENTAR
        this.keyD = this.scene.input.keyboard.addKey('D') // RECHTS BEWEGEN
        this.keyN = this.scene.input.keyboard.addKey('N') //TRADER SCENE
        this.keyESC = this.scene.input.keyboard.addKey('ESC') // MENÜ SCENE
        this.cursors = this.scene.input.keyboard.createCursorKeys() // PFEIL TASTEN
        this.pet3 = new Pet3(this.scene, 1050 - 100, 850, this)
        this.isAlive = true
        this.is_death_anim_played = false
        this.isOpenedMenu = false

        this.scene.time.addEvent({
            delay: 3750,
            startAt: 5000,
            loop: true,
            callback: () => {
                this.player_hp.decrease(-1)
            },
            callbackContext: this
        });
    }

    getRelativePositionToCanvas(gameObject, camera) {
        return {
            x: (gameObject.x - camera.worldView.x) * camera.zoom,
            y: (gameObject.y - camera.worldView.y) * camera.zoom
        }
    }

    colliders() {
        //this.scene.physics.add.collider(this, this.scene.passThruPlatforms, this.onPlatform)
        //this.scene.physics.add.collider(this, this.scene.passThruPlatforms2, this.onPlatform)
        this.scene.physics.add.collider(this, this.scene.buildings3, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground1, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerbuildings1, () => {
            this.body.touching.down = true
        })
    }

    player_spawning_attributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.body.setSize(32, 64, true)
        // CAMERA MOVING
        this.scene.cameras.main.startFollow(this) // VERFOLGUNG VOM SPIELER
        this.scene.cameras.main.followOffset.set(0, 150) // OFFSET DER KAMERA
        this.zoomVal = 2 // DEFAULT ZOOM 2
        this.scene.cameras.main.zoom = this.zoomVal // ZOOM DER KAMERA
        if (this.scene.scene.key === "Trader") {
            //this.scene.cameras.main.zoom = this.zoomVal + 1
        }
        this.setPushable(false)
    }

    update() {
        this.pet3.update()
        this.checkLevelUp()
        this.player_hp.update()
        this.coinCounter.update()

        if (this.body.touching.down) {
            this.is_jump_played = false
            this.is_jumpdown_played = false
        }

        if (this.player_hp.hp_val <= 0) {
            this.isAlive = false
        }

        if (this.isAlive) {

            // INVENTORY OPENING
            if (Phaser.Input.Keyboard.JustDown(this.keyI) && this.body.touching.down) {
                this.inventory.openInventory()
            }

            if ((this.keyW.isDown && this.body.touching.down && !this.is_atacking && !this.inventory.is_opened)) {
                console.log("UP")
                this.setVelocityY(-375)
                this.anims.play("PlayerUpJump", true)

            } else if (this.keyA.isDown && !this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
                this.setVelocityX(-this.PlayerDefaultLevel.speed).setFlipX(-1)
                if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                    this.anims.play("Fall", true)
                    this.is_jumpdown_played = true
                }

            } else if (this.keyA.isDown && this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
                console.log("LEFT")
                this.looking_direction = "left"
                this.setVelocityX(-this.PlayerDefaultLevel.speed).setFlipX(-1)
                this.anims.play("MoveLeft", true)

            } else if (this.keyD.isDown && !this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
                this.setVelocityX(this.PlayerDefaultLevel.speed).setFlipX(0)
                if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                    this.anims.play("Fall", true)
                    this.is_jumpdown_played = true
                }

            } else if (this.body.velocity.y >= 75) {
                if (!this.is_jumpdown_played) {
                    this.anims.play("Fall", true)
                    this.is_jumpdown_played = true
                }

            } else if (this.keyD.isDown && this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
                console.log("RIGHT")
                this.looking_direction = "right"
                this.setVelocityX(this.PlayerDefaultLevel.speed).setFlipX(0)
                this.anims.play("MoveRight", true)
                this.setOffset(30, 0)

            } else if (this.cursors.space.isDown && this.body.touching.down || this.is_atacking && !this.inventory.is_opened) {
                console.log("SPACEBAR")
                this.is_atacking = true
                this.setOffset(30, 0)
                this.anims.play("Attack", true)
                this.setVelocityX(this.PlayerDefaultLevel.idle_speed)
                if (this.looking_direction === "right") {
                    this.swing_box = this.scene.add.rectangle(this.x + 20, this.y, 40, 40).setDepth(-1)
                    this.scene.physics.add.existing(this.swing_box).setDepth(-1)
                } else {
                    this.swing_box = this.scene.add.rectangle(this.x - 20, this.y, 40, 40).setDepth(-1)
                    this.scene.physics.add.existing(this.swing_box).setDepth(-1)
                }

                this.on('animationcomplete', () => {
                    this.is_atacking = false
                })
                this.swing_box.destroy(true)

            } else {
                if (this.body.touching.down) {
                    this.is_atacking = false
                    this.anims.play("Idle", true)
                    this.setOffset(15, 0)
                    this.setVelocityX(this.PlayerDefaultLevel.idle_speed)
                }
                if (this.body.velocity.y >= 75) {
                    this.anims.play("Fall", true)
                }
            }

            if ((this.cursors.down.isDown)) {
                console.log("DOWN CURSOR")
                // durch den Boden fallen
                // this.passthrough()
            }

            if (this.keyN.isDown && this.body.touching.down && !this.is_atacking) {
                console.log("KeyN isDown");
                localStorage.setItem("COINS", this.coinCounter.coinCount)
                localStorage.setItem("X-COIN", this.coinCounter.coinText.x)
                setTimeout(() => {
                    this.scene.cameras.main.fadeOut(6000)
                    setTimeout(() => {
                        this.item_names = [];
                        for (let index = 0; index < this.inventory.items.length; index++) {
                            this.item_names.push(this.inventory.items[index].name)
                            
                        }
                        this.scene.scene.start("Trader", { items: this.item_names, hp: this.player_hp.hp_val, xp: this.PlayerDefaultLevel.xp })
                    }, 6100);
                }, 1000);
            }
        } else {
            if (!this.is_death_anim_played) {
                this.anims.play("Death", true)
                this.setOffset(15, -13)
                console.log("YOU SUCK");
                this.is_death_anim_played = true
            }
        }

        if (this.keyESC.isDown && !this.isOpenedMenu) {
            console.log("KeyESC isDown");
            //this.scene.cameras.main.fadeOut(2500)
            this.MenuStart = this.keyESC.on("down", () => { /*this.scene.pause("StartLevel"), this.scene.launch("StartMenu")*/ this.scene.start("Startmenu")})
            console.log(this.MenuStart);
            this.isOpenedMenu = true
        }
    }

    checkLevelUp() {
        var nextLevelThreshold = this.xpThresholds[this.PlayerDefaultLevel.level - 1]
        if (this.PlayerDefaultLevel.xp >= nextLevelThreshold) {
            this.levelUp()
        }
    }

    levelUp() {
        this.PlayerDefaultLevel.level++
        //this.PlayerDefaultLevel.HPval += 5
        this.PlayerDefaultLevel.damage += 5
        this.player_hp.addHp(5)
        console.log("LEVL");

    }

    passthrough() {
        this.scene.passThruPlatforms.clear()
        this.scene.passThruPlatforms2.clear()
        setTimeout(() => {
            this.scene.passThruPlatforms.create(0, 296, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                .body.checkCollision.down = false
            this.scene.passThruPlatforms2.create(1350, 260, "boden").setOrigin(0, -15).setScale(1.5).refreshBody()
                .body.checkCollision.down = false
        }
            , 3000)
    }
}