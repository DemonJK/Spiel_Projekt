class Config {
    constructor() {
        this.GreenGiantConfig = {
            hp_val: 200,
            damage: 15,
            //bounce: 0.2,
            idle_speed: 0,
            //pushable: false,
            body_size_width: 90,
            body_size_height: 137,
            attack_box_width: 40,
            attack_box_heigth: 40,
            visible_area_width: 1000,
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

        this.BoD_Config = {
            BoD_hp_val: 150,
            BoD_damage: 20,
            //BoD_bounce: 0.2,
            BoD_idle_speed: 0,
            //BoD_pushable: false,
            BoD_body_size_width: 140,
            BoD_body_size_height: 93,
            BoD_attack_box_width: 40,
            BoD_attack_box_heigth: 40,
            BoD_visible_area_width: 1000,
            BoD_visible_area_height: 300,
            BoD_speed: 60,

            BoD_AnimationConfig: {
                BoD_ilde: "BoDIdleAnim",
                BoD_attack: "BoDattackAnim",
                BoD_run: "BoDWalkAnim",
                BoD_death: "BoDDeathAnim"
            }
        }
    }
}


