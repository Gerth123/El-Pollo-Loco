class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image: ', error);
            console.log('could not load image: ', this.img.src);
        }
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof LittleChicken || this instanceof ThrowableObject || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width - this.offset.width, this.height - this.offset.height);
            ctx.stroke();
        }
    }


}