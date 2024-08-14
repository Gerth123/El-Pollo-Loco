class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.2;
    energy = 100;
    lastHit = 0;

    constructor() {
        super();
    }

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 200;
    }

    isColliding(mo) {
        let thisLeft = this.x + this.offset.x;
        let thisRight = thisLeft + (this.width - this.offset.width);
        let thisTop = this.y + this.offset.y;
        let thisBottom = thisTop + (this.height - this.offset.height);

        let moLeft = mo.x + mo.offset.x;
        let moRight = moLeft + (mo.width - mo.offset.width);
        let moTop = mo.y + mo.offset.y;
        let moBottom = moTop + (mo.height - mo.offset.height);

        return thisRight >= moLeft &&
            thisBottom >= moTop &&
            thisLeft <= moRight &&
            thisTop <= moBottom;
    }



    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.7;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    async playAnimationOneTime(images, time) {
        for (let i = 0; i < images.length; i++) {

            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;


            await new Promise(resolve => setTimeout(resolve, time));
        }
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}