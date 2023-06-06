class HealthBar {

    constructor(scene, x, y, width, height, val, living_object) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.living_object = living_object;
        this.x = x;
        this.y = y;
        this.value = val;
        this.p = 76 / 100;
        this.width = width
        this.height = height
        this.scene = scene

        this.draw();

        scene.add.existing(this.bar);
    }

    setHealth(value) {
        this.value = value;
        this.draw();
    }



    decrease(amount) {
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        if (this.value <= 0 && !this.living_object.is_dead) {
            this.living_object.is_dead = true;
            this.living_object.setVelocity(0, 0);
            this.bar.destroy(true)
        }
        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        // Outline

        // BG

        // Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);



        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);

        } else {
            this.bar.fillStyle(0x00ff00);

        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, this.height - 4);



    }
}