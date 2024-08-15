class StatusBarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ]

    percentage = 10;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 600;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(10);
    }

    /**
     * This method sets the percentage.
     * 
     * @param {number} percentage - The count of the lives left.
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
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage > 8) {
            return 4;
        } else if (this.percentage > 6) {
            return 3;
        } else if (this.percentage > 4) {
            return 2;
        } else if (this.percentage > 2) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }
}