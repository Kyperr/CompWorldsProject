
function Marine(game, spritesheet) {

    /*Super init*/
    var physics = new Physics(this, 0, 0, 64, 64, 2, true);

    PhysicalEntity.call(this, game, game.ctx, spritesheet, physics);

    /*Sub init*/
    this.stats = new CharacterStats(game, MAR_SHOTS_PER_SECOND);

    this.isShooting = false;// Whether he's shooting
    this.timeSinceLastShot = 0;
    this.shotsPerSecond = MAR_SHOTS_PER_SECOND;
}

Marine.prototype = new PhysicalEntity();
Marine.prototype.constructor = Marine;

//Called by super class.
Marine.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 16;
    var sheetWidth = 17;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, 5, 9, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, 5, 1, .1);
    animation.createVerticalAnimationStates(AIMING_ACTION, 90, 2, 1, 3, .1);
    animation.createVerticalAnimationStates(SHOOTING_ACTION, 90, 2, 3, 2, .1);

    return animation;
}

Marine.prototype.update = function () {
    var delta = this.game.clockTick;
    var physics = this.physics;

    this.timeSinceLastShot += delta;

    //console.log("X: " + physics.x + " Y:" + physics.y);

    if (this.isShooting) {
        this.animation.currentAction = "shooting"; 
        if (this.timeSinceLastShot >= (1 / this.shotsPerSecond)) {

            //game, spritesheet, creator, fromPlayer, startingAngle
            var bullet = new Bullet(this.game,
                this.game.assetManager.getAsset("./img/player_bullet.png"),
                this, true, physics.directionX, physics.directionY);
            
            this.game.addEntity(bullet);

            this.timeSinceLastShot = 0;
        }

    } else if (physics.velocity != 0) {
        this.animation.currentAction = "walking";
    } else {
        //console.log("Why isn't it standing now?")
        this.animation.currentAction = "standing";
        this.physics.velocity = 0;
    }
    this.physics.updateLocation(delta);
    PhysicalEntity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}