class Chicken extends MovableObject {
    y = 415;
    height = 70;
    width = 80;
    offset = {
        x: 5,
        y: 10,
        width: 10,
        height: 20,
    };
    previousSpeed;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.25; 
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

    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    unpause() {
        this.speed = this.previousSpeed;
    }
}