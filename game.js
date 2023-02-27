var config = {
    width: 2300,
    height: 1140,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,

    physics: "arcade",
    arcade: {
        gravity: {y: 450},
        debug: true,
    },
}
var game = new Phaser.Game(config);
