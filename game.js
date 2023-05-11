var config = {
    pixelArt: true,
    width: '100%',
    height: '100%',
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
    scene: [Preloads, StartMenu, Scene2, StartLevel, FirstLevel],
}
var game = new Phaser.Game(config)
