class Config {
    constructor() {
        this.GreenGiantConfig = {
            hp_val: 200,
            damage: 15,
            bounce: 0.2,
            idle_speed: 0,
            pushable: false,
            body_size_width: 90,
            body_size_height: 137,
            attack_range: 70,
            offsetX: 83,
            offsetY: 59.5,
            atack_box_left_margin: 100,
            atack_box_right_margin: 60,
            atack_box_top_margin: 10,
            attack_box_width: 40,
            attack_box_heigth: 40,
            visible_area_width: 1000,
            attack_range_ot: 25,
            visible_area_height: 300,
            speed: 55,
            xp_drop: 100,

            AnimationConfig: {
                idle: "stand",
                attack: "enemyatt",
                run: "run-left",
                death: "death-anim"
            }
        }

        this.Skeleton_Config = {
            hp_val: 150,
            damage: 25,
            attack_range: 30,
            attack_range_ot: 20,
            bounce: 5.2,
            idle_speed: 0,
            pushable: false,
            body_size_width: 32,
            body_size_height: 64,
            atack_box_left_margin: 30,
            atack_box_right_margin: -5,
            atack_box_top_margin: -10,
            offsetX: 10,
            offsetY: -12,
            attack_box_width: 40,
            attack_box_heigth: 40,
            visible_area_width: 1000,
            visible_area_height: 300,
            speed: 70,
            xp_drop: 50,

            AnimationConfig: {
                idle: "SIdle",
                attack: "SAttack",
                run: "SRun",
                death: "SDeath"
            }
        }
    }
}


