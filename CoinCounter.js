class CoinCounter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.x = x
        this.y = y
        this.scene = scene
        this.coinCount = 0
        this.coinText = null

        this.scene.add.existing(this)
        this.createCoinText()
    }

    createCoinText() {
        this.coinText = this.scene.add.text(this.x, this.y, 'Coins: 0', {
            fontSize: 18,
            fontFamily: "cursive",
            fill: 0xffffff
        }).setResolution(16)
        this.coinText.setOrigin(0.5);
        this.coinText.setScrollFactor(0, 0)
    }

    decreaseCoin(minusAmount) {
        this.coinCount = Math.max(0, this.coinCount - minusAmount);
        this.updateCoinText();
    }

    increaseCoin(plusAmount) {
        this.coinCount += plusAmount;
        this.updateCoinText();
    }

    updateCoinText() {
        this.coinText.setText("Coins: " + this.coinCount)
    }
}