class Inventory extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.items = []
        this.display;
        this.player_image;
        this.is_opened = false
        
    }

    openInventory() {
        if (!this.is_opened) {
            this.is_opened = true
            this.display = this.scene.add.image(this.scene.player.x, this.scene.player.y - 150, "inventory").setDepth(1)
            this.x_item = this.display.x - 120
            this.y_item = this.display.y - 150
            this.player_image = this.scene.add.image(this.scene.player.x - 275, this.scene.player.y - 175, "PlayerIdle").setDepth(2)
            this.player_image.setScale(4, 4)

            for (let index = 0; index < this.items.length; index++) {
                if (index <= 29) {
                    this.items[index].body.destroy()
                    this.items[index].setPosition(this.x_item, this.y_item).setDepth(3).setScale(2, 2)
                    this.x_item += 60
                    if (index === 5 || index === 11 || index === 17 || index === 23) {
                        this.y_item += 60
                        this.x_item -= 360
                    }
                }
            }
        } else {
            this.display.destroy()
            this.player_image.destroy()
            this.is_opened = false
            for (let index = 0; index < this.items.length; index++) {
                this.items[index].setPosition(0, 0)
            }
        }
    }

    additem(item) {
        this.items.push(this.scene.physics.add.existing(item, false))
    }

    removeItem(item) {
        this.openInventory()

        const index = this.items.indexOf(item);

        if (index !== -1) {
            const removedItem = this.items.splice(index, 1)[0];
            removedItem.destroy();
        }
        //console.log(this.items);
        this.openInventory()
    }
}