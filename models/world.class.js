class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLives = new StatusBarLives();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];
    background_music = new Audio('audio/music.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        // this.playBackgroundMusic();
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.energy > 0 && this.character.bottles > 0) {
            this.character.bottles--;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollectObjects() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.collect();
                coin.remove();
                this.statusBarCoins.setPercentage(this.character.coins);
            }
        });

        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.collect();
                bottle.remove();
                this.statusBarBottles.setPercentage(this.character.bottles);
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            // if(this.character.isJumpingOnTopOf(enemy)) {

            //     enemy.enemyChickenDie();
            // } else 
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLives.setPercentage(this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLives);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addDescription();

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);



        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    addDescription() {
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 16px Arial";
        this.ctx.textAlign = 'flex-start';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText("Left/Right =            Arrow Keys", 300, 50);
        this.ctx.fillText("Jump =                   Space", 300, 75);
        this.ctx.fillText("Throw Bottle =       D", 300, 100);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    playBackgroundMusic() {
        this.background_music.loop = true;
        this.background_music.play();
    }


}