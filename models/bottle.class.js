class Bottle extends MovableObject {
    y = 415;
    x;
    height = 70;
    width = 80;
    offset = {
        x: 30,
        y: 15,
        width: 50, 
        height: 20,
    };

    IMAGES_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(bottleNumber) {
        super().loadImage(this.IMAGES_ON_GROUND[bottleNumber]);
        this.x = 250 + Math.random() * 4000;
    }
}