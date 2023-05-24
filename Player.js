class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.inventory = new Inventory(this.scene, this.x, this.y) // INVENTAR
        this.player_spawning_attributes() // ATTRIBUTE VOM SPIELER
        this.colliders() // FUNKTION VON COLLIDERN

        this.PlayerDefaultLevel = {
            HPval: 100,
            HPvalWidth: 80,
            damage: 100,
            level: 1,
            xp: 0,
        }
        this.xpThresholds = []; // Beispiel-Schwellenwerte für jedes Level
        const baseXP = 100; // Basis-XP für das erste Level
        const increaseFactor = 1.5; // Faktor zur Erhöhung der XP-Schwelle

        for (let i = 0; i < 100; i++) {
            const threshold = Math.round(baseXP * Math.pow(increaseFactor, i));
            this.xpThresholds.push(threshold);
        }

        this.hp = new HealthBar(
            this.scene,
            720, 400,
            this.PlayerDefaultLevel.HPvalWidth,
            25,
            this.PlayerDefaultLevel.HPval,
            this
        ) // NEUE HP BAR

        this.hp.bar.setScrollFactor(0, 0) // HP BAR STATIC
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
        this.cursors = this.scene.input.keyboard.createCursorKeys() // PFEIL TASTEN
        this.regeneration = false // REGENERATION
        this.speed = 160 // SPEED
        this.update_health_bar_width()
        this.pet3 = new Pet3(this.scene, 1050 - 100, 850, this)
    }

    colliders() {
        this.enemy_collider = this.scene.physics.add.collider(this, this.scene.enemy)
        this.scene.physics.add.collider(this, this.scene.platforms)
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms, this.onPlatform)
        this.scene.physics.add.collider(this, this.scene.passThruPlatforms2, this.onPlatform)
        this.scene.physics.add.collider(this, this.scene.platforms4)
        this.scene.physics.add.collider(this, this.scene.buildings3)
        this.scene.physics.add.collider(this, this.scene.layerground)

        this.scene.physics.add.collider(this, this.scene.buildings, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layer, () => {
            this.body.touching.down = true
        })

        this.scene.physics.add.collider(this, this.scene.layerground, () => {
            this.body.touching.down = true
        })
    }


    player_spawning_attributes() {
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.body.setSize(32, 64, true)
        this.setPosition(this.x, this.y)
        // CAMERA MOVING
        this.scene.cameras.main.startFollow(this) // VERFOLGUNG VOM SPIELER
        this.scene.cameras.main.followOffset.set(0, 150) // OFFSET DER KAMERA
        this.scene.cameras.main.zoom = 2 // ZOOM DER KAMERA
    }


    update() {
        //console.log(this.PlayerDefaultLevel.HPval);
        this.pet3.update()
        this.checkLevelUp()

        if (this.body.touching.down) {
            this.is_jump_played = false
            this.is_jumpdown_played = false
        }

        // INVENTORY OPENING
        if (Phaser.Input.Keyboard.JustDown(this.keyI) && this.body.touching.down) {
            this.inventory.openInventory()
        }

        if ((this.keyW.isDown && this.body.touching.down && !this.is_atacking && !this.inventory.is_opened)) {
            console.log("UP")
            this.setVelocityY(-425)
            this.anims.play("PlayerUpJump", true)

        } else if (this.keyA.isDown && !this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
            this.setVelocityX(-160).setFlipX(-1)
            if (this.body.velocity.y >= 75 && !this.is_jumpdown_played) {
                this.anims.play("Fall", true)
                this.is_jumpdown_played = true
            }

        } else if (this.keyA.isDown && this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
            console.log("LEFT")
            this.looking_direction = "left"
            this.setVelocityX(-this.speed).setFlipX(-1)
            this.anims.play("MoveLeft", true)

        } else if (this.keyD.isDown && !this.body.touching.down && !this.is_atacking && !this.inventory.is_opened) {
            this.setVelocityX(160).setFlipX(0)
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
            this.setVelocityX(this.speed).setFlipX(0)
            this.anims.play("MoveRight", true)
            this.setOffset(30, 0)

        } else if (this.cursors.space.isDown && this.body.touching.down || this.is_atacking && !this.inventory.is_opened) {
            console.log("SPACEBAR IS ACTIVE")
            this.is_atacking = true
            this.setOffset(30, 0)
            this.anims.play("Attack", true)
            this.setVelocityX(0)
            if (this.looking_direction === "right") {
                this.swing_box = this.scene.add.rectangle(this.x + 20, this.y, 40, 40).setDepth(-1)
                this.scene.physics.add.existing(this.swing_box).setDepth(-1)
            } else {
                this.swing_box = this.scene.add.rectangle(this.x - 20, this.y, 40, 40).setDepth(-1)
                this.scene.physics.add.existing(this.swing_box).setDepth(-1)
            }
            if (this.scene.physics.overlap(this.swing_box, this.scene.enemy)) {
                if (!this.scene.enemy.has_hp_lose) {
                    this.scene.enemy.hp.decrease(this.PlayerDefaultLevel.damage)
                    this.scene.enemy.has_hp_lose = true
                }
            }
            this.on('animationcomplete', () => {
                this.is_atacking = false
                this.scene.enemy.has_hp_lose = false
            })
            this.swing_box.destroy(true)

        } else {
            if (this.body.touching.down) {
                this.is_atacking = false
                this.anims.play("Idle", true)
                this.setOffset(15, 0)
                this.setVelocityX(0)
            }
            if (this.body.velocity.y >= 75) {
                this.anims.play("Fall", true)
            }
        }

        if ((this.cursors.down.isDown)) {
            console.log("DOWN CURSOR IS ACTIVE")
            // durch den Boden fallen
            // this.passthrough()
        }

        //TEST FÜR PASSIVE REGENERATION
        //console.log(this.regeneration);
        if (this.hp.value > 390 && (this.regeneration = false)) {
            this.regeneration = true
            if (this.regeneration === true) {
                this.scene.player.hp.decrease(-15)
                this.regeneration = false
            }
        }

        if (this.keyN.isDown && this.body.touching.down && !this.is_atacking) {
            console.log("KeyN isDown");
            setTimeout(() => {
                this.scene.cameras.main.fadeOut(6000)
                setTimeout(() => {
                    this.scene.scene.start("Trader")
                }, 6100);
            }, 1000);
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
        this.PlayerDefaultLevel.HPval += this.PlayerDefaultLevel.HPvalWidth
        this.PlayerDefaultLevel.HPvalWidth += 5
        this.PlayerDefaultLevel.damage += 5
        this.hp.setHealth(this.PlayerDefaultLevel.HPval)
        this.hp.draw()

        this.update_health_bar_width()

    }

    update_health_bar_width() {
        const currentLevel = this.PlayerDefaultLevel.level;
        const maxLevel = this.xpThresholds.length;

        // Berechne die neue Breite basierend auf dem Verhältnis zum maximalen Level
        const newWidth = (this.PlayerDefaultLevel.HPvalWidth / maxLevel) * currentLevel;
        this.hp.bar.width = newWidth;

        this.hp.draw();
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