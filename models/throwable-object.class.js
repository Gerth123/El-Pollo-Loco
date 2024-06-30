class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(100, 150);
    }

    throw() {
        // this.x = x;
        // this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 25);
    }
}