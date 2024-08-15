class Chicken extends MovableObject {
    y = 415;
    height = 70;
    width = 80;
    offset = {
        x: 5,
        y: 10,
        width: 5,
        height: 20,
    };
    previousSpeed = 0.15 + Math.random() * 0.25;
    dead = false;
    lives = 2;
    speed;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 4000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.checkIfAlive();
        this.animate();
    }

    /**
     * This function checks if the chicken is dead.
     * 
     * @returns {boolean} true if the chicken is dead, false if the chicken is alive.
     */
    isDead() {
        if (this.dead) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * This function sets the state of the chicken to dead and sets the image to the dead image.
     */
    die() {
        this.speed = 0;
        this.dead = true;
        this.loadImage(this.IMAGE_DEAD);
    }

    /**
     * This function pauses the chicken's animation and moves the chicken's speed to 0.
     */
    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    /**
     * This function unpauses the chicken's animation and sets the chicken's speed to the previous speed.
     */
    unpause() {
        this.speed = this.previousSpeed;
    }

    /**
     * This function checks if the chicken is alive and if the chicken is dead, it stops the animation.
     */
    checkIfAlive() {
        if (this.isDead()) {
            this.stopAnimation();
        } else {
            this.animate();
        }
    }
}