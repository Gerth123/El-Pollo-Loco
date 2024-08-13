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

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
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
    world;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }



    animate() {
        setInterval(() => {
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

        let intervalId = setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOneTime(this.IMAGES_DEAD);
                document.getElementById('overlayLose').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('overlayLose').classList.add('d-none');
                    document.getElementById('overlay').classList.remove('d-none');
                }, 2000);
                clearInterval(intervalId);
                disableSound();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                setTimeout(() => { this.playAnimation(this.IMAGES_JUMPING); }, 100);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
        

    }

    jump() {
        this.speedY = 27;
    }

    checkCollectObjects() {
        this.world.level.coins.forEach((coin, index) => {
            if (this.isColliding(coin)) {
                this.world.level.coins.splice(index, 1);
                this.coins += 5;
                this.world.statusBarCoins.setPercentage(this.coins);
            }
        });

        this.world.level.bottles.forEach((bottle, index) => {
            if (this.isColliding(bottle)) {
                this.world.level.bottles.splice(index, 1);
                this.bottles += 5;
                this.world.statusBarBottles.setPercentage(this.bottles);
            }
        });
    }

    isColliding(mo) {
        return this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
            this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
            this.x + this.offset.x < mo.x + mo.offset.x &&
            this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height;
    }

    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    unpause() {
        this.speed = this.previousSpeed;
    }

}