var config = {
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
    scene: [Preload, Scene2],
    pixelArt: true,
}
var game = new Phaser.Game(config);
