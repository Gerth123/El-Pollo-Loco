class LittleChicken extends MovableObject {
    y = 435;
    height = 50;
    width = 70;
    offset = {
        top: 25,
        left: 130,
        right: 40,
        bottom: 30,
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }

    

    isDead() {
        if (condition) {

        }
    }

    isHit() {
        if (condition) {

        }
    }
}