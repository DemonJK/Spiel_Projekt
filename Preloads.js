class Preloads extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    //PRELOAD VON HINTERGRUND
    preload() {

        // PRELOAD INVENTAR
        this.load.image("inventory", "/assets/player_model/inventory.png")

        // PRELOAD INTERFACE
        this.load.spritesheet("Interface", "/interface/GUI.png", {
            frameWidth: 16,
            frameHeight: 16
        })

        //PRELOAD BACKGROUND
        this.load.image("SkyBackground", "/new_assets/Background/Background.png")

        //PRELOAD STARTMENU BACKGROUND
        this.load.image("Startmenu", "/new_assets/Startmenu/startmenu.png")

        //PRELOAD AUDIO SONGS
        this.load.audio("Ingame-music", ["/audio/music_zapsplat_game_music.mp3"])
        this.load.audio("action1", ["/audio/mp3/Action1.mp3"])
        this.load.audio("action2", ["/audio/mp3/Action2.mp3"])
        this.load.audio("action3", ["/audio/mp3/Action3.mp3"])
        this.load.audio("action4", ["/audio/mp3/Action4.mp3"])
        this.load.audio("action5", ["/audio/mp3/Action5.mp3"])
        this.load.audio("ambient1", ["/audio/mp3/Ambient1.mp3"])
        this.load.audio("ambient2", ["/audio/mp3/Ambient2.mp3"])
        this.load.audio("ambient3", ["/audio/mp3/Ambient3.mp3"])
        this.load.audio("ambient4", ["/audio/mp3/Ambient4.mp3"])
        this.load.audio("ambient5", ["/audio/mp3/Ambient5.mp3"])
        this.load.audio("ambient6", ["/audio/mp3/Ambient6.mp3"])
        this.load.audio("ambient7", ["/audio/mp3/Ambient7.mp3"])
        this.load.audio("ambient8", ["/audio/mp3/Ambient8.mp3"])
        this.load.audio("ambient9", ["/audio/mp3/Ambient9.mp3"])
        this.load.audio("ambient10", ["/audio/mp3/Ambient10.mp3"])

        //PRELOAD AUDIO EFFECTS
        this.load.audio("footsteps-grass", ["/audio/effects/Footsteps-in-grass-fast.mp3"])

        //PRELOAD ALL TILES
        this.load.image("Buildings", "/new_assets/Assets/Buildings.png")
        this.load.image("Hive", "/new_assets/Assets/Hive.png")
        this.load.image("Inter ior-01", "/new_assets/Assets/Interior-01.png")
        this.load.image("Props-Rocks", "/new_assets/Assets/Props-Rocks.png")
        this.load.image("Tiles", "/new_assets/Assets/Tiles.png")
        this.load.image("Tree-Assets", "/new_assets/Assets/Tree-Assets.png")
        this.load.image("Background", "/new_assets/Trees/Background.png")
        this.load.image("Dark-Tree", "/new_assets/Trees/Dark-Tree.png")
        this.load.image("Golden-Tree", "/new_assets/Trees/Golden-Tree.png")
        this.load.image("Green-Tree", "/new_assets/Trees/Green-Tree.png")
        this.load.image("Red-Tree", "/new_assets/Trees/Red-Tree.png")
        this.load.image("Yellow-Tree", "/new_assets/Trees/Yellow-Tree.png")
        this.load.image("GUI", "/interface/GUI.png")

        //PRELOAD TILED MAP
        this.load.tilemapTiledJSON("TRADER", "/TiledLevels/Trader.json")
        this.load.tilemapTiledJSON("MAP", "/TiledLevels/TiledMapGameStartLevel.json")
        this.load.tilemapTiledJSON("NIGHTMAP", "/TiledLevels/TiledMapGameFirstLevel.json")
        this.load.tilemapTiledJSON("STARTMENU", "/TiledLevels/StartMenu.json")

        //PRELOAD PLAYER
        this.load.spritesheet("PlayerIdle", "/new_assets/Character/Idle/Idle-Sheet.png", {
            frameWidth: 64,
            frameHeight: 80
        })

        this.load.spritesheet("PlayerRun", "/new_assets/Character/Run/Run-Sheet.png", {
            frameWidth: 80,
            frameHeight: 80
        })

        this.load.spritesheet("PlayerJump", "/new_assets/Character/Jumlp-All/Jump-All-Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet("PlayerAttack", "/new_assets/Character/Attack-01/Attack-01-Sheet.png", {
            frameWidth: 96,
            frameHeight: 80
        })

        this.load.spritesheet("PlayerFall", "/new_assets/Character/Jump-End/Jump-End-Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet("PlayerStartJump", "/new_assets/Character/Jump-Start/Jump-Start-Sheet.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        //PRELOAD ENEMY
        this.load.spritesheet("enemy1", "/assets/enemy/idle/Idle.png", {
            frameWidth: 256,
            frameHeight: 256
        })

        this.load.spritesheet("enemyrun", "/assets/enemy/run/Run.png", {
            frameWidth: 256,
            frameHeight: 256
        })

        this.load.spritesheet("enemydie", "/assets/enemy/death/Die.png", {
            frameWidth: 256,
            frameHeight: 256
        })

        this.load.spritesheet("enemyattack", "/assets/enemy/attackVariant1/Attack 1.png", {
            frameWidth: 256,
            frameHeight: 256
        })

        //PRELOAD CONSUMABLES
        this.load.spritesheet("consum", "/new_assets/Consumables/consumables.png", {
            frameWidth: 16,
            frameHeight: 16
        })

        //PRELOAD POTIONS
        this.load.spritesheet("potion", "/new_assets/Potions/potions.png", {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {

        this.anims.create({
            key: "Attack",
            frames: this.anims.generateFrameNumbers("PlayerAttack", { start: 0, end: 7 }),
            frameRate: 20,
        })

        this.anims.create({
            key: "Jump",
            frames: this.anims.generateFrameNumbers("PlayerJump", { start: 0, end: 14 }),
            seframeRate: 10,
        })

        this.anims.create({
            key: "Idle",
            frames: this.anims.generateFrameNumbers("PlayerIdle", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: "MoveRight",
            frames: this.anims.generateFrameNumbers("PlayerRun", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: "MoveLeft",
            frames: this.anims.generateFrameNumbers("PlayerRun", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: "Fall",
            frames: this.anims.generateFrameNames("PlayerFall", { start: 0, end: 2 }),
            frameRate: 4,
        })

        this.anims.create({
            key: "PlayerUpJump",
            frames: this.anims.generateFrameNumbers("PlayerStartJump", { start: 0, end: 3 }),
            frameRate: 7,
        })

        this.anims.create({
            key: "stand",
            frames: this.anims.generateFrameNumbers("enemy1", { start: 0, end: 10 }),
            frameRate: 8,
        })

        this.anims.create({
            key: "run-left",
            frames: this.anims.generateFrameNumbers("enemyrun", { start: 0, end: 6 }),
            frameRate: 8,
            repeat: -1,
        })

        this.anims.create({
            key: "death-anim",
            frames: this.anims.generateFrameNumbers("enemydie", { start: 0, end: 13 }),
            frameRate: 8,
        })

        this.anims.create({
            key: "enemyatt",
            frames: this.anims.generateFrameNumbers("enemyattack", { start: 0, end: 14 }),
            frameRate: 8,
        })

        this.anims.create({
            key: "starter-healthpotion",
            frames: this.anims.generateFrameNumbers("potion", { start: 3, end: 4 }),
            frameRate: 1,
            repeat: -1,
        })

        setTimeout(() => {
            this.scene.start("StartMenu")
        }, 0)
    }
}