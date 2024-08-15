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

    /**
     * Applies gravity to the object
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground
     * 
     * @returns {boolean} true if the object is a ThrowableObject or above the ground, false if the object is below the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 200;
    }

    /**
     * Checks if the object is colliding with another object.
     * 
     * @param {MovableObject} mo - The movable object.
     * 
     * @returns {boolean} true if the object is colliding with another object, false if the object is not colliding with another object.
     */
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

    /**
     * Decreases the energy of the object by 5 and sets the lastHit variable to the current time.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt.
     * 
     * @returns {boolean} true if the time passed since the last hit is less than 0.7 seconds, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.7;
    }

    /**
     * Checks if the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the animation of the object.
     * 
     * @param {string[]} images - The array of paths to the images.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the animation of the object one time.
     * 
     * @param {string[]} images - The array of paths to the images.
     * @param {number} time - The time to wait between each image.
     */
    async playAnimationOneTime(images, time) {
        for (let i = 0; i < images.length; i++) {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            await new Promise(resolve => setTimeout(resolve, time));
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Animates the object.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead() && !this.speed == 0) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}