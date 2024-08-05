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
    IMAGES_SPINNING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    constructor(x, y) {
        super().loadImage(this.IMAGES_SPINNING_BOTTLE[0]);
        this.loadImages(this.IMAGES_SPINNING_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw(100, 150);
        setInterval(() => {
            this.checkCollisionSpecific();
        },50);
    }

    throw() {
        if (world.character.direction == 'right') {
            if (world.keyboard.RIGHT == true && world.character.x < world.level.level_end_x) {
                this.speedY = 20;
                this.applyGravity();
                setInterval(() => {
                    this.x += 21;
                }, 25);
            } else {
                this.speedY = 20;
                this.applyGravity();
                setInterval(() => {
                    this.x += 11;
                }, 25);
            }
            setInterval(() => {
                this.playAnimation(this.IMAGES_SPINNING_BOTTLE);
            }, 5);
        }
        if (world.character.direction == 'left') {
            if (world.keyboard.LEFT == true) {
                this.x = world.character.x - 50;
                this.speedY = 20;
                this.applyGravity();
                setInterval(() => {
                    this.x -= 21;
                }, 25);
            }
            if (world.keyboard.LEFT !== true) {
                this.x = world.character.x - 50;
                this.speedY = 20;
                this.applyGravity();
                setInterval(() => {
                    this.x -= 11;
                }, 25);
            }
        }
        this.thrownObjects.push(this);
    }

    animateFlyingBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPINNING_BOTTLE);
        }, 200);
    }

    checkCollisionSpecific() {
        world.level.enemies.forEach((enemy, enemyIndex) => {
            this.thrownObjects.forEach((thrownObject, thrownObjectIndex) => {
                if (thrownObject.isColliding(enemy)) {
                    if (enemy !== world.class_endboss) {
                        world.level.enemies.splice(enemyIndex, 1);
                    } else if (enemy == world.class_endboss) {
                        world.class_endboss.hurt();
                        if (world.class_endboss.lifes == 0) {
                            world.class_endboss.die();
                            setTimeout(() => {world.level.enemies.splice(enemyIndex, 1)}, 1800);
                        }
                    }
                    setTimeout(() => {this.thrownObjects.splice(thrownObjectIndex, 1)}, 1000);
                }
            })
        });
    }

    isColliding(mo) {
        return (this.x + this.offset.x) + (this.width - this.offset.width) > (mo.x + mo.offset.x) &&
            (this.y + this.offset.y) + (this.height - this.offset.height) > (mo.y + mo.offset.y) &&
            (this.x + this.offset.x) < (mo.x + mo.offset.x) &&
            (this.y + this.offset.y) < (mo.y + mo.offset.y) + (mo.height - mo.offset.height);
    }
}