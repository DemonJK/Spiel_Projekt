class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image("background", "assets/images/HillsLayer01.png");
        this.load.image("background2", "assets/images/HillsLayer02.png");
        this.load.image("background3", "assets/images/HillsLayer03.png");
        this.load.image("background4", "assets/images/HillsLayer04.png");
        this.load.image("background5", "assets/images/HillsLayer05.png");
        this.load.image("background6", "assets/images/HillsLayer06.png");
        console.log("Scene2 Background loaded");
        this.load.image("boden");
        console.log("Scene2 boden loaded");
    }

    create() {
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
        

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, "boden").setScale(2).refreshBody();




        this.add.text(20, 20, "Das Spiel wird gespielt", {
            font: "25px Arial",
            fill: "black",
        });
    }
}

