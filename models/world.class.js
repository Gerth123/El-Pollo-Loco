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
    class_endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);

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
            this.character.checkCollectObjects();
            this.checkFirstContactToBoss();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.energy > 0 && this.character.bottles > 0) {
            this.character.bottles--;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.setPercentage(this.character.bottles);
        }
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

    checkFirstContactToBoss() {
        if (this.character.x > 3830) {
            this.class_endboss.hadFirstContact = true;
            
        }
        this.class_endboss.animate();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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
        if (this.character.musicEnabled) {
            this.character.audio_elements.background_music.loop = true;
            this.character.audio_elements.background_music.play();
        }
    }

    // this.level.enemies[10].hadFirstContact = false; Reset if game finished
}