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
    lastThrowTime = 0; // Zeitpunkt des letzten Flaschenwurfs
    throwCooldown = 500;

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
            this.character.checkCollectObjects();
            this.checkFirstContactToBoss();
            this.checkThrowObjects();
        }, 50);
    }

    checkThrowObjects() {
        const currentTime = Date.now(); // Aktuelle Zeit in Millisekunden
        if (
            this.keyboard.D &&
            this.character.energy > 0 &&
            this.character.bottles > 0 &&
            (currentTime - this.lastThrowTime >= this.throwCooldown)
        ) {
            this.character.bottles--;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.setPercentage(this.character.bottles);

            this.lastThrowTime = currentTime; // Zeitpunkt des letzten Wurfes aktualisieren
        }
    }

   

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            // if(this.character.isJumpingOnTopOf(enemy)) {

            //     enemy.enemyChickenDie();
            // } else 
            if (this.character.isColliding(this.class_endboss) && this.character.energy > 50) {
                this.character.energy -= 50;
                this.character.hit();
                this.character.x -= 200;
                this.statusBarLives.setPercentage(this.character.energy);
            } else if (this.character.isColliding(this.class_endboss) && this.character.energy <= 50) {
                this.character.energy = 0;
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLives.setPercentage(this.character.energy);
            }
        });
    }
    
       

    checkFirstContactToBoss() {
        if (this.character.x > 3830) {
            this.class_endboss.hadFirstContact = true;
        }
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
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
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
}