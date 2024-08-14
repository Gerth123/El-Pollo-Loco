class LittleChicken extends MovableObject {
    y = 435;
    height = 50;
    width = 70;
    lives = 1;
    offset = {
        x: 5,
        y: 10,
        width: 10,
        height: 20,
    };
    previousSpeed;
    dead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }

    isDead() {
        if (this.dead) {
            return true;
        } else {
            return false;
        }
    }

    isHit() {
        if (condition) {

        }
    }

    die() {
        this.speed = 0;
        this.dead = true;
        this.loadImage(this.IMAGE_DEAD);
    }

    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    unpause() {
        this.speed = this.previousSpeed;
    }
}
