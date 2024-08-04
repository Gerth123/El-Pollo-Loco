class Level{
    enemies;
    clouds;
    backgroundObjects; 
    coins;
    bottles;
    level_end_x = 4200;


    constructor(coins, bottles, enemies, clouds, backgroundObjects) {
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        
    }


}