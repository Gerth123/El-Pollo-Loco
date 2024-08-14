class ThrowableObject extends MovableObject {
    collectedBottles = 20;
    x;
    y;
    height;
    width;
    offset = {
        x: 10,
        y: 15,
        width: 20,
        height: 20,
    };
    thrownObjects = [];
    smashed = false;
    exists = true;
    collisionIntervall;
    IMAGES_SPINNING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SMASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    constructor(x, y) {
        super().loadImage(this.IMAGES_SPINNING_BOTTLE[0]);
        this.loadImages(this.IMAGES_SPINNING_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SMASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw(100, 150);
        this.collisionIntervall = setInterval(() => {
            this.checkCollisionSpecific();
        }, 50);
    }

    throw() {
        if (world.character.direction == 'right') {
            if (world.keyboard.RIGHT == true && world.character.x < world.level.level_end_x) {
                this.speedY = 20;
                this.applyGravity();
                let intervalRight = setInterval(() => {
                    if (!this.smashed && this.exists) {
                        this.x += 19;
                    } else if (this.smashed && this.exists) {
                        this.speedY = 0;
                        this.speedAcceleration = 0;
                    } else if (this.smashed && !this.exists) {
                        clearInterval(intervalRight);
                    }
                }, 25);
            } else {
                this.speedY = 20;
                this.applyGravity();
                let intervalNoMoveRight = setInterval(() => {
                    if (!this.smashed && this.exists) {
                        this.x += 11;
                    } else if (this.smashed && this.exists) {
                        this.speedY = 0;
                        this.speedAcceleration = 0;
                    } else if (this.smashed && !this.exists) {
                        clearInterval(intervalNoMoveRight);
                    }
                }, 25);

            }
            if (this.exists) {
                this.animateFlyingBottle();
            }
        }
        if (world.character.direction == 'left') {
            if (world.keyboard.LEFT == true) {
                this.x = world.character.x - 50;
                this.speedY = 20;
                this.applyGravity();
                let intervalLeft = setInterval(() => {
                    if (!this.smashed && this.exists) {
                        this.x -= 19;

                    } else if (this.smashed && this.exists) {
                        this.speedY = 0;
                        this.speedAcceleration = 0;
                    } else if (this.smashed && !this.exists) {
                        clearInterval(intervalLeft);
                    }
                }, 25);
            }
            if (world.keyboard.LEFT !== true) {
                this.x = world.character.x - 50;
                this.speedY = 20;
                this.applyGravity();
                let intervalNoMoveLeft = setInterval(() => {
                    if (!this.smashed && this.exists) {
                        this.x -= 11;
                    } else if (this.smashed && this.exists) {
                        this.speedY = 0;
                        this.speedAcceleration = 0;
                    } else if (this.smashed && !this.exists) {
                        clearInterval(intervalNoMoveLeft);
                    }
                }, 25);
            }
            if (this.exists) {
                this.animateFlyingBottle();
            }
        }
        this.thrownObjects.push(this);
    }

    animateFlyingBottle() {
        let interval = setInterval(() => {
            if (!this.smashed && this.exists) {
                this.playAnimation(this.IMAGES_SPINNING_BOTTLE);
            } else if (this.smashed && this.exists) {
                this.playAnimationOneTime(this.IMAGES_BOTTLE_SMASH);
                setTimeout(() => { this.exists = false }, 100);
            } else if (this.smashed && !this.exists) {
                clearInterval(interval);
            }
        }, 5);
    }

    checkCollisionSpecific() {
        world.level.enemies.forEach((enemy, enemyIndex) => {
            this.thrownObjects.forEach((thrownObject, thrownObjectIndex) => {
                if (thrownObject.isColliding(enemy)) {
                    if (enemy !== world.class_endboss) {
                        enemy.die();
                        setTimeout(() => { world.level.enemies.splice(enemyIndex, 1); }, 800);
                        clearInterval(this.collisionIntervall);
                    } else if (enemy == world.class_endboss) {
                        world.class_endboss.hurt();
                        if (world.class_endboss.lifes == 0) {
                            world.class_endboss.die();
                            setTimeout(() => { world.level.enemies.splice(enemyIndex, 1) }, 400);
                            clearInterval(this.collisionIntervall);
                        }
                    } 
                    thrownObject.smashed = true;
                    setTimeout(() => { this.thrownObjects.splice(thrownObjectIndex, 1) }, 1000);
                } else if (!thrownObject.isColliding(enemy) && thrownObject.y >= 400) {
                    thrownObject.smashed = true;
                    setTimeout(() => { this.thrownObjects.splice(thrownObjectIndex, 1) }, 1000);
                }
            })
        });
    }

    isColliding(mo) {
        let buffer = 1;
        let thisLeft = this.x + this.offset.x - buffer;
        let thisRight = thisLeft + (this.width - this.offset.width) + 2 * buffer;
        let thisTop = this.y + this.offset.y - buffer;
        let thisBottom = thisTop + (this.height - this.offset.height) + 2 * buffer;
        let moLeft = mo.x + mo.offset.x;
        let moRight = moLeft + (mo.width - mo.offset.width);
        let moTop = mo.y + mo.offset.y;
        let moBottom = moTop + (mo.height - mo.offset.height);
        return thisRight >= moLeft &&
            thisBottom >= moTop &&
            thisLeft <= moRight &&
            thisTop <= moBottom;
    }

}