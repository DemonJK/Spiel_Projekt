var config = {
    pixelArt: true,
    width: 2529,
    height: 1144,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true,
        }
    },
    scene: [Preloads, Scene2],
}
var game = new Phaser.Game(config);
