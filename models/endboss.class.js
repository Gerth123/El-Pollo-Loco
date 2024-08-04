class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 110;
    speed = 10;
    offset = {
        top: 25,
        left: 130,
        right: 40,
        bottom: 30,
    };
    img;
    hadFirstContact = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 4500;
        this.animate();
    }

    animate() {
        if (this.hadFirstContact === true) {
    
            setTimeout(() => {
                this.playAnimation(this.IMAGES_WALKING, 200);
                this.speed = 10;
    
                setTimeout(() => {
                    this.playAnimation(this.IMAGES_ALERT, 200);
                    this.speed = 0;
    
                    setTimeout(() => {
                        this.playAnimation(this.IMAGES_ATTACK, 3000);
                        this.speed = 30;
                        this.moveLeft();
                    }, 500); // Verzögerung für die Angriffsanimation
    
                }, 500); // Verzögerung für die Alarm-Animation
    
            }, 50); // Verzögerung für die Geh-Animation
    
        }
    }
    
}