class CoinCounter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.coinCount = 0
        this.coinText = null

        this.scene.add.existing(this)
        this.createCoinText()
    }

    createCoinText() {
        this.CoinCounterImage = this.scene.add.image(this.x, this.y, "CoinCounter")
        this.CoinCounterImage.setScale(0.2, 0.2)
        this.CoinCounterImage.setScrollFactor(0, 0)

        this.coinText = this.scene.add.text(this.CoinCounterImage.x - 20, this.CoinCounterImage.y, 0, {
            fontSize: 18,
            fontFamily: "cursive",
            fill: 0xffffff
        }).setResolution(16)
        this.coinText.setOrigin(0.5, 0.5);
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
        this.coinText.setText(this.coinCount)
        if (this.coinCount === 100 || this.coinCount === 1000 || this.coinCount === 10000 || this.coinCount === 100000 || this.coinCount === 1000000 || this.coinCount === 10000000 || this.coinCount === 100000000) {
            this.coinText.x += 5
        }
    }

    update() {
        this.coinCount
    }
}