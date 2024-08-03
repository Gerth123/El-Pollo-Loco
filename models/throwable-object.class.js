class ThrowableObject extends MovableObject {
    collectedBottles = 20;
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
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
}