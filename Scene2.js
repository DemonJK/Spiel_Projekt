class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    
    //PRELOAD VON HINTERGRUND
    preload() {

        this.load.image("background", "assets/images/HillsLayer01.png");
        this.load.image("background2", "assets/images/HillsLayer02.png");
        this.load.image("background3", "assets/images/HillsLayer03.png");
        this.load.image("background4", "assets/images/HillsLayer04.png");
        this.load.image("background5", "assets/images/HillsLayer05.png");
        /*this.load.image("boden", "assets/images/HillsLayer05.png");*/
        this.load.image("background6", "assets/images/HillsLayer06.png");
        console.log("Scene2 Background loaded");
        this.load.image("boden", "assets/images/HillsLayer05.png");
        this.load.spritesheet("playermodel", "/assets/SpriteSheet_P.Model/Warrior_Sheet-Effect.png", {frameWidth: 32, frameHeight: 48});
        console.log("playermodel LOADED");

    }

    //CREATE VON HINTERGRUND UND TEXT "DAS SPIEl WIRD GESPIELT"
    create() {
        console.log("TEXT LOAD");
        this.add.text(35, 35, "Das Spiel wird gespielt", {
            font: "30px Arial",
            fill: "black",
        });
        console.log("TEXT LOADED");

        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.background.setScale(4.5);

        this.background2 = this.add.image(0, 0, "background2");
        this.background2.setOrigin(0, 0);
        this.background2.setScale(4.5);

        this.background3 = this.add.image(0, 0, "background3");
        this.background3.setOrigin(0, 0);
        this.background3.setScale(4.5);

        this.background4 = this.add.image(0, 0, "background4");
        this.background4.setOrigin(0, 0);
        this.background4.setScale(4.5);

        this.background5 = this.add.image(0, 0, "background5");
        this.background5.setOrigin(0, 0);
        this.background5.setScale(4.5);

        this.background6 = this.add.image(0, 0, "background6");
        this.background6.setOrigin(0, 0);
        this.background6.setScale(4.5);

        console.log("TEXT LOAD");
        this.add.text(35, 35, "Das Spiel wird gespielt", {
            font: "30px Arial",
            fill: "black",
        });
        console.log("TEXT LOADED");


        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, "boden").setScale(2).refreshBody();
        console.log("platforms LOADED");

        platforms.create(600, 400, "boden");
        platforms.create(50, 250, "boden");
        platforms.create(750, 220, "boden");

        this.player = this.physics.add.sprite(100, 450, "playermodel");

        console.log("ENDE DES CODES VON SCENE2");
        
    }   
}

