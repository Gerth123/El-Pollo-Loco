class StatusBarBottles extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 110;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * This method sets the count of the bottles.
     * 
     * @param {number} percentage - The count of the bottles.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * This method resolves the index of the image.
     * 
     * @returns {number} - The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage == 65) {
            return 5;
        } else if (this.percentage > 50) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 25) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}