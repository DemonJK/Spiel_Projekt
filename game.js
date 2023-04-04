var config = {
    pixelArt: true,
    width: 2400,
    height: 1000,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true,
        }
    },
    fps: {
        target: 60,
    },
    scene: [Preloads, Scene2, StartLevel],
}
var game = new Phaser.Game(config);
