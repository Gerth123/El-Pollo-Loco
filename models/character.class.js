class Character extends MovableObject {
    height = 300;
    y = 80;
    speed = 10;
    bottles = 10;
    coins = 0;
    direction = 'right';
    offset = {
        x: 15,
        y: 120,
        width: 35,
        height: 135,
    };
    musicEnabled = true;
    gravityInterval;
    moveIntervall;
    audio_elements = {
        background_music: new Audio('audio/music.mp3'),
        walking_sound: new Audio('audio/running.mp3'),
    };
    previousSpeed;


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD_BEFORE_JUMP = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
    ];

    IMAGES_DEAD_JUMP_AND_AFTER = [
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD_BEFORE_JUMP);
        this.loadImages(this.IMAGES_DEAD_JUMP_AND_AFTER);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }


    /**
     * This function animates the character.
     */
    animate() {
        this.moveIntervall = setInterval(() => {
            this.audio_elements.walking_sound.pause();
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.direction = 'right';
                this.otherDirection = false;
                if (this.musicEnabled) {
                    this.audio_elements.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.direction = 'left';
                this.otherDirection = true;
                if (this.musicEnabled) {
                    this.audio_elements.walking_sound.play();
                }
            }

            if (!this.isAboveGround()) {
                this.y = 200;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        let timer = 0;
        let intervalId = setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOneTime(this.IMAGES_DEAD_BEFORE_JUMP, 150);
                this.jump();
                setTimeout(() => { this.playAnimationOneTime(this.IMAGES_DEAD_JUMP_AND_AFTER, 250); }, 200);
                clearInterval(this.moveIntervall);
                clearInterval(this.world.runInterval);
                setInterval(() => {
                    this.y += 10;
                    this.x += 2;
                }, 1000 / 25);

                document.getElementById('overlayLose').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('overlayLose').classList.add('d-none');
                    document.getElementById('overlay').classList.remove('d-none');
                }, 2000);
                clearInterval(intervalId);
                disableSound();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                timer = 0;
            } else if (this.isAboveGround()) {
                setTimeout(() => { this.playAnimation(this.IMAGES_JUMPING); }, 100);
                timer = 0;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                timer = 0;
            } else {
                timer += 1;
                if (timer >= 50 && timer < 100) {
                    this.playAnimation(this.IMAGES_IDLE);
                } else if (timer >= 100) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                }
            }
        }, 1000/10);
    }

    /**
     * This function makes the character jump
     */
    jump() {
        this.speedY = 27;
    }

    /**
     * This function checks if the character is colliding with an object and collects the object.
     */
    checkCollectObjects() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.isColliding(coin) && this.energy > 0) {
                this.world.level.coins.splice(index, 1);
                this.coins += 5;
                this.world.statusBarCoins.setPercentage(this.coins);
            }
        });

        this.world.level.bottles.forEach((bottle, index) => {
            if (this.isColliding(bottle) && this.energy > 0) {
                this.world.level.bottles.splice(index, 1);
                this.bottles += 5;
                this.world.statusBarBottles.setPercentage(this.bottles);
            }
        });
    }

    /**
     * This function checks if the character is colliding with the top, bottom, left or right of an object.
     * 
     * @param {MovableObject} mo - The movable object.
     */
    isColliding(mo) {
        let buffer = 1;
        let thisLeft = this.x + this.offset.x - buffer;
        let thisRight = thisLeft + (this.width - this.offset.width) + 2 * buffer;
        let thisTop = this.y + this.offset.y - buffer;
        let thisBottom = thisTop + (this.height - this.offset.height) + 2 * buffer;
        let moLeft = mo.x + mo.offset.x;
        let moRight = moLeft + (mo.width - mo.offset.width);
        let moTop = mo.y + mo.offset.y;
        let moBottom = moTop + (mo.height - mo.offset.height);
        return thisRight >= moLeft &&
            thisBottom >= moTop &&
            thisLeft <= moRight &&
            thisTop <= moBottom;
    }

    /**
     * This function is used to pause the character.
     */
    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    /**
     * This function is used to unpause the character.
     */
    unpause() {
        this.speed = this.previousSpeed;
    }

}