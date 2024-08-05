class Coin extends MovableObject {
    offset = {
        x: 25,
        y: 25,
        width: 50,
        height: 50, 
    };
    x;
    y = 415;
    height = 100;
    width = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(coinNumber) {
        super().loadImage(this.IMAGES_COIN[coinNumber]);
        this.y = 365 - Math.random() * 200;
        this.x = 300 + Math.random() * 4000;
    }
    }
