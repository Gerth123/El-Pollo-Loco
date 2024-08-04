class Bottle extends MovableObject {
    y = 415;
    height = 70;
    width = 80;
    offset = {
        top: 25,
        left: 130,
        right: 40,
        bottom: 30,
    };

    IMAGES_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(bottleNumber) {
        super().loadImage(this.IMAGES_ON_GROUND[bottleNumber]);
        this.x = 300 + Math.random() * 4000;
    }
}