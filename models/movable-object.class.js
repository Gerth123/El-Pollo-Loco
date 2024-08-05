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
        setInterval(() => {
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
        return (this.x + this.offset.x) + (this.width - this.offset.width) > (mo.x + mo.offset.x) &&
            (this.y + this.offset.y) + (this.height - this.offset.height) > (mo.y + mo.offset.y) &&
            (this.x + this.offset.x) < (mo.x + mo.offset.x) &&
            (this.y + this.offset.y) < (mo.y + mo.offset.y) + (mo.height - mo.offset.height);
    }

    hit () {
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

    playAnimationWithInterval(images, interval) {
        setInterval(() => {
            this.playAnimation(images);
        }, interval);
    }

playAnimationSlow(images, animationSpeed) {
    if (!this.animationInterval) {
        this.animationInterval = setInterval(() => {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (!this.isAboveGround()) {
                clearInterval(this.animationInterval);
                this.animationInterval = null;
                let path = images[images.length - 1];
                this.img = this.imageCache[path];
            }
        }, animationSpeed);
    }
}

    async playAnimationOneTime(images) {
    for (let i = 0; i < images.length; i++) {
        
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        

        // await new Promise(resolve => setTimeout(resolve, 500));
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
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
}
}