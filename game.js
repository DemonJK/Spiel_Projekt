
var config = {
    pixelArt: true,
    width: '100%',
    height: '100%',
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: document.getElementById('game-container')
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
    scene: [Preloads, StartMenu, SettingsScene, Trader, Scene2, StartLevel, FirstLevel],
}
var game = new Phaser.Game(config)
