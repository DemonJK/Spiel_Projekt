class Inventory extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y){
        super(scene, x, y)
        this.items = []
        this.display;
        this.is_opened = false

    }

    openInventory() {
        if(!this.is_opened) {
            this.is_opened=true
            this.display = this.scene.add.image(this.scene.player.x, this.scene.player.y-100,  "inventory").setDepth(1)
            this.x_item = this.display.x-120
            this.y_item = this.display.y-150
            this.row
            
            for (let index = 0; index < this.items.length; index++) {
                console.log(this.items);
                this.items[index].body.destroy()
                this.items[index].setPosition(this.x_item,  this.y_item).setDepth(2).setScale(2, 2)

                this.x_item += 60


                
            }

        }
        else {
            this.display.destroy()
            this.is_opened = false
            for (let index = 0; index < this.items.length; index++) {

                this.items[index].setPosition(0,0)
                
            }



        }

    }




    additem(item) {
        this.items.push(this.scene.physics.add.existing(item, false))
        

    }

    removeItem(item) {

        const index = myArray.indexOf(2);

        this.items.splice(index, 1);
        

    }







}