class ThrowableObject extends MovableObject {
    collectedBottles = 20;
    x;
    y;
    height;
    width;
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
    }

    animateFlyingBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPINNING_BOTTLE);
        }, 200);
    }
}