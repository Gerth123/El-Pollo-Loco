class World {
    character = new Character();
    level = level1;
    backUpLevel = _.cloneDeep(level1);
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLives = new StatusBarLives();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    class_endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    lastThrowTime = 0;
    throwCooldown = 500;
    runIntervall;
    hadFirstContactToBoss = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the world.
     */
    run() {
        this.runIntervall = setInterval(() => {
            this.checkCollisions();
            this.character.checkCollectObjects();
            this.checkFirstContactToBoss();
            this.checkThrowObjects();
        }, 50);
    }

    /**
     * Checks if the character can throw a bottle.
     */
    checkThrowObjects() {
        const currentTime = Date.now();
        if (this.keyboard.D && this.character.energy > 0 && this.character.bottles > 0 && (currentTime - this.lastThrowTime >= this.throwCooldown) && !this.character.characterPaused) {
            this.character.bottles--;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.setPercentage(this.character.bottles);
            this.lastThrowTime = currentTime;
        }
    }

    /**
     * Checks if the character is colliding with an enemy including the endboss.
     */
    checkCollisions() {
        let hitEnemy = false;
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.y < 190 && enemy !== this.class_endboss && !hitEnemy && !this.character.energy <= 0) {
                this.checkIfCharacterJumpsOnEnemy(enemy, index);
                hitEnemy = true;
            } else if (this.character.isColliding(this.class_endboss) && this.character.energy > 50) {
                this.characterCollisionWithEndboss();
            } else if (this.character.isColliding(this.class_endboss) && this.character.energy <= 50) {
                this.character.energy = 0;
            } else if (this.character.isColliding(enemy) && !hitEnemy) {
                this.characterCollisionWithEnemyChicken();
                hitEnemy = true;
            }
        });
    }

    /**
     * Checks if the character jumps on an enemy.
     * 
     * @param {object} enemy - the enemy.
     * @param {number} index - the index of the enemy.
     */
    checkIfCharacterJumpsOnEnemy(enemy, index) {
        this.character.jump();
        if (enemy.lives == 1) {
            this.character.audio_elements.hit_little_chicken.play();
            enemy.die();
            setTimeout(() => { this.level.enemies.splice(index, 1); }, 500);
        } else if (enemy.lives > 1 && enemy !== this.class_endboss) {
            this.character.audio_elements.chicken_alarm_sound.play();
            enemy.lives--;
        }
    }

    /**
     * Subtracts 50 energy points from the character, hits the character and moves the character to the left.
     */
    characterCollisionWithEndboss() {
        this.character.energy -= 50;
        this.character.hit();
        this.character.x -= 200;
        this.statusBarLives.setPercentage(this.character.energy);
    }

    /**
     * Subtracts energy points from the character and hits the character.
     */
    characterCollisionWithEnemyChicken() {
        this.character.hit();
        this.statusBarLives.setPercentage(this.character.energy);
    }

    /**
     * Checks if the character has reached the endboss.
     */
    checkFirstContactToBoss() {
        if (this.character.x > 3830) {
            this.class_endboss.hadFirstContact = true;
            this.hadFirstContactToBoss = true;
            this.statusBarEndboss.setPercentage(this.class_endboss.lives);
        }
    }

    /**
     * Draws the world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawToMap();
        if (this.hadFirstContactToBoss) {
            this.addToMap(this.statusBarEndboss);
        }
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws the world to the map.
     */
    drawToMap() {
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
    }

    /**
     * Adds the objects to the map.
     * 
     * @param {Array} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds the object to the map.
     * 
     * @param {object} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx); Function to draw the frame of the object on the canvas. Necessary for development.
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of the object.
     * 
     * @param {object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back of the object. 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Plays the background music for the game.
     */
    playBackgroundMusic() {
        if (this.character.musicEnabled) {
            this.character.audio_elements.background_music.loop = true;
            this.character.audio_elements.background_music.play();
        }
    }

    /**
     * Stops all sounds in the game by pausing and resetting their current time.
     */
    stopAllSounds() {
        for (let sound in this.character.audio_elements) {
            if (this.character.audio_elements[sound] && typeof this.character.audio_elements[sound].pause === 'function') {
                this.character.audio_elements[sound].pause();
                this.character.audio_elements[sound].currentTime = 0;
            }
        }
    }
}