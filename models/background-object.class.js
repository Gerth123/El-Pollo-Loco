class BackgroundObject extends MovableObject {

    width = 828;
    height = 552;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 552 - this.height;
        this.x = x;
    }
}