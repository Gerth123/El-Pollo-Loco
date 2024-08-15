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

    /**
     * Throws the bottle, checks in which direction the character is facing and plays a sound.
     */
    throw() {
        if (world.character.direction == 'right') {
            this.checkRightThrow();
        }
        if (world.character.direction == 'left') {
            this.checkLeftThrow();
        }
        world.character.audio_elements.throw_bottle_sound.play();
        this.thrownObjects.push(this);
    }

    /**
     * Checks if the character is facing right and throws the bottle to the right.
     */
    checkRightThrow() {
        if (world.keyboard.RIGHT == true && world.character.x < world.level.level_end_x) {
            this.throwToTheRightWithMove();
        } else {
            this.throwToTheRightWithoutMove();
        }
        if (this.exists) {
            this.animateFlyingBottle();
        }
    }

    /**
     * Throws the bottle to the right with extra speed and checks if the bottle smashed already.
     */
    throwToTheRightWithMove() {
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
    }

    /**
     * Throws the bottle to the right without extra speed and checks if the bottle smashed already.
     */
    throwToTheRightWithoutMove() {
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

    /**
     * Checks if the character is facing left and throws the bottle to the left.
     */
    checkLeftThrow() {
        if (world.keyboard.LEFT == true) {
            this.throwToTheLeftWithMove();
        }
        if (world.keyboard.LEFT !== true) {
            this.throwToTheLeftWithoutMove();
        }
        if (this.exists) {
            this.animateFlyingBottle();
        }
    }

    /**
     * Throws the bottle to the left with extra speed and checks if the bottle smashed already.
     */
    throwToTheLeftWithMove() {
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

    /**
     * Throws the bottle to the left without extra speed and checks if the bottle smashed already.
     */
    throwToTheLeftWithoutMove() {
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

    /**
     * Animates the flying bottle.
     */
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

    /**
     * Checks for collisions between thrown objects and enemies.
     */
    checkCollisionSpecific() {
        world.level.enemies.forEach((enemy, enemyIndex) => {
            this.thrownObjects.forEach((thrownObject, thrownObjectIndex) => {
                if (thrownObject.isColliding(enemy)) {
                    this.collidingWithEnemy(enemy, thrownObject, thrownObjectIndex, enemyIndex);
                } else if (!thrownObject.isColliding(enemy) && thrownObject.y >= 395) {
                    thrownObject.smashed = true;
                    world.character.audio_elements.bottle_smash_sound.play();
                    setTimeout(() => { this.thrownObjects.splice(thrownObjectIndex, 1) }, 500);
                }
            })
        });
    }

    /**
     * Checks if the thrown object collides with an enemy.
     * 
     * @param {object} enemy - the enemy.
     * @param {object} thrownObject - the thrown object.
     * @param {number} thrownObjectIndex - the index of the thrown object.
     * @param {number} enemyIndex - the index of the enemy.
     */
    collidingWithEnemy(enemy, thrownObject, thrownObjectIndex, enemyIndex) {
        if (!enemy || !thrownObject || thrownObject.hasCollided) return;
        thrownObject.hasCollided = true;
        world.character.audio_elements.bottle_smash_sound.play();
        if (enemy !== world.class_endboss) {
            this.enemiesWithoutEndbossDieFromCollision(enemy, enemyIndex);
        } else if (enemy === world.class_endboss) {
            this.endbossCheckHurtOrDieFromCollision(enemyIndex);
        }
        clearInterval(this.collisionIntervall);
        thrownObject.smashed = true;
        setTimeout(() => {
            this.thrownObjects.splice(thrownObjectIndex, 1);
        }, 1000);
    }

    /**
     * Kills an enemy without the endboss.
     * 
     * @param {object} enemy - the enemy.
     * @param {number} enemyIndex - the index of the enemy.
     */
    enemiesWithoutEndbossDieFromCollision(enemy, enemyIndex) {
        enemy.die();
        setTimeout(() => {
            world.level.enemies.splice(enemyIndex, 1);
        }, 800);
    }

    /**
     * Kills the endboss.
     * 
     * @param {number} enemyIndex - the index of the enemy.
     */
    endbossCheckHurtOrDieFromCollision(enemyIndex) {
        world.class_endboss.hurt();
        if (world.class_endboss.lives == 0) {
            world.class_endboss.die();
            setTimeout(() => {
                world.level.enemies.splice(enemyIndex, 1);
            }, 200);
            world.character.audio_elements.game_won_sound.play();
        }
    }

    /**
     * Checks if the thrown object collides with the character.
     * 
     * @param {object} mo - the movable object.
     * 
     * @returns {boolean} true if the thrown object collides with the character, false if the thrown object does not collide with the character. 
     */
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