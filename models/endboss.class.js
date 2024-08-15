class Endboss extends MovableObject {
    height = 400;
    width = 250;
    x;
    y = 110;
    speed = 0.15;
    offset = {
        x: 25,
        y: 70,
        width: 40,
        height: 100,
    };
    img;
    hadFirstContact = false;
    lives = 10;
    animationEndbossIndex = 0;
    previousSpeed = 5;
    pause = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4500;
        this.animate();
    }

    /**
     * Sets the interval to animate the endboss and checks if the first contact was made.
     */
    animate() {
        setInterval(() => {
            if (this.hadFirstContact === true) {
                this.hadFirstContactAnimation();
            }
        }, 100);
    }

    /**
     * Animates the endboss if the first contact was made and checks the status of the animation.
     */
    hadFirstContactAnimation() {
        if (this.animationEndbossIndex === 0 && this.pause === false) {
            this.walkAnimation();
        } else if (this.animationEndbossIndex === 1 && this.pause === false) {
            this.alertAnimation();
        } else if (this.animationEndbossIndex === 2 && this.pause === false) {
            this.attackAnimation();
        } else if (this.animationEndbossIndex === 3 && this.pause === false) {
            this.playAnimation(this.IMAGES_HURT);
            this.speed = 0;
        } else if (this.animationEndbossIndex === 4 && this.pause === false) {
            this.deadAnimation();
        } else if (this.pause === true) {
            this.loadImage(this.IMAGES_WALKING[0]);
        }
    }

    /**
     * Plays the animation of the endboss walking.
     */
    walkAnimation() {
        world.character.audio_elements.angry_endboss_sound.play();
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 5;
        this.moveLeft();
        setTimeout(() => { this.animationEndbossIndex = 1; }, 500);
    }

    /**
     * Plays the animation of the endboss alerting.
     */
    alertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
        this.speed = 0;
        setTimeout(() => { this.animationEndbossIndex = 2; }, 500);
    }

    /**
     * Plays the animation of the endboss attacking.
     */
    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.speed = 20;
        this.moveLeft();
    }

    /**
     * Plays the animation of the endboss dying.
     */
    deadAnimation() {
        this.speed = 0;
        setInterval(() => { this.playAnimationOneTime(this.IMAGES_DEAD), 650 });
        setTimeout(() => { this.x = -1000 }, 650);
        this.winningScreen();
    }

    /**
     * Sets the winning screen.
     */
    winningScreen() {
        document.getElementById("overlayWin").classList.remove("d-none");
        setTimeout(() => {
            document.getElementById("overlayWin").classList.add("d-none");
            document.getElementById("overlay").classList.remove("d-none");
            pauseGame();
        }, 2000);
        setTimeout(() => { window.location.reload() }, 2000);
    }

    /**
     * Hurt the endboss.
     */
    hurt() {
        this.animationEndbossIndex = 3;
        this.lives -= 1;
        world.statusBarEndboss.setPercentage(this.lives);
        setTimeout(() => { this.animationEndbossIndex = 2; }, 500);
    }

    /**
     * Die the endboss.
     */
    die() {
        this.animationEndbossIndex = 4;
    }

    /**
     * Pauses the game.
     */
    pauseGame() {
        this.previousSpeed = this.speed;
        this.speed = 0;
        this.pause = true;
    }

    /**
     * Unpauses the game.
     */
    unpause() {
        this.speed = this.previousSpeed;
        this.pause = false;
    }
}