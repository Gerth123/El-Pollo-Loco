class FullScreen extends DrawableObject {
    isFullscreen = false;

    IMAGE_FULL_SCREEN_OFF = 'img/7_statusbars/fullscreen_false.png';
    IMAGE_FULL_SCREEN = 'img/7_statusbars/fullscreen_true.png';
    constructor() {
        super();
        this.checkFullscreen();
        this.x = 780;
        this.y = 20;
        this.height = 30;
        this.width = 30;
    }
    
    checkFullscreen() {
        if (this.isFullscreen) {
            this.loadImage(this.IMAGE_FULL_SCREEN);
        } else {
            this.loadImage(this.IMAGE_FULL_SCREEN_OFF);
        }
    }

}