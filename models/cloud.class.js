class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = Math.random() * 0.3 + 0.2;
    previousSpeed;
    
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4000;
        this.animate();
    }

    /**
     * Moves the cloud to the left side of the screen.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
    
    /**
     * Pauses the animation of the cloud.
     */
    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    /**
     * Unpauses the animation of the cloud.
     */
    unpause() {
        this.speed = this.previousSpeed;
    }
}