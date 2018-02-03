
function Marine(game, spritesheet) {

    /*Super init*/
    var movementFactor = new MovementFactor(MAR_MOVE_SPEED);
        //var stats = new CharacterStats(game, SHOTS_PER_SECOND);
    
    PhysicalEntity.call(this, game, game.ctx, 0, 0, spritesheet, movementFactor);

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
    var frameWidth = 64;
    var frameHeight = 64;
    var sheetWidth = 17;
    var scale = 2;

    var animation = new Animation(this, spritesheet, frameWidth, frameHeight, sheetWidth, numberOfAngles, scale, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, 5, 9, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, 5, 1, .1);
    animation.createVerticalAnimationStates(AIMING_ACTION, 90, 2, 1, 3, .1);
    animation.createVerticalAnimationStates(SHOOTING_ACTION, 90, 2, 3, 2, .1);

    return animation;
}

Marine.prototype.update = function () {
    var delta = this.game.clockTick;
    var moveFac = this.movementFactor;
    var speed = moveFac.speed;

    this.timeSinceLastShot += delta;

    if (this.isShooting) {
        this.animation.currentAction = "shooting";
        // If it's time to create another bullet...
        // (secondsBetweenShots = 1 / shotsPerSecond)
        if (this.timeSinceLastShot >= (1 / this.shotsPerSecond)) {
            // Create a bullet
            var bullet = new Bullet(this.game,
                                    this.game.assetManager.getAsset("./img/player_bullet.png"), 
                                    this, true, this.trueAngle);
            this.game.addEntity(bullet);    

            // Reset timeSinceLastShot
            this.timeSinceLastShot = 0;
        }

    } else if (moveFac.getHorizontalDirection() == 0 && moveFac.getVerticalDirection() == 0) {
        this.animation.currentAction = "standing";
    } else {
        this.animation.currentAction = "walking";

        var angleToFace = moveFac.getDirectionalAngle();
        this.trueAngle = angleToFace;

        this.x += delta * speed * moveFac.getHorizontalDirection();
        this.y -= delta * speed * moveFac.getVerticalDirection();
        this.x > this.game.surfaceWidth

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.animation.frameWidth * this.animation.scale > this.game.surfaceWidth) {
            this.x = this.game.surfaceWidth - this.animation.frameWidth * this.animation.scale;
        }

        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.animation.frameHeight * this.animation.scale > this.game.surfaceHeight) {
            this.y = this.game.surfaceHeight - this.animation.frameHeight * this.animation.scale;
        }
    }
    PhysicalEntity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}