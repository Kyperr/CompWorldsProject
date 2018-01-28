
function Marine(game, spritesheet) {
    const MOVE_SPEED = 200;
    const SHOTS_PER_SECOND = 30;
    const WALKING_ACTION = "walking";
    const STANDING_ACTION = "standing";
    const AIMING_ACTION = "aiming";
    const SHOOTING_ACTION = "shooting";

	//number of angles the entity can look
	var angles = 16;
	this.frameWidth = 64;
	this.frameHeight =64;
	this.sheetWidth = 17;
	this.scale = 2;
    this.stats = new CharacterStats(game, SHOTS_PER_SECOND);	
    //degrees each angle covers
	this.angleIncrement = 360/angles;	//360 degrees in a circle 
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale
    this.animation = new Animation(this, spritesheet, this.frameWidth, this.frameHeight, this.sheetWidth, this.scale, STANDING_ACTION);

    // Actual angle (where he's shooting)
    this.trueAngle = 0;

    // Whether he's shooting
    this.isShooting = false;
    this.timeSinceLastShot = 0;
    this.shotsPerSecond = SHOTS_PER_SECOND;
    this.animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, this.angleIncrement, angles, 5, 9);
    this.animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, this.angleIncrement, angles, 5, 1);
    this.animation.createVerticalAnimationStates(AIMING_ACTION, 90, 2, this.angleIncrement, angles, 1, 3);
    this.animation.createVerticalAnimationStates(SHOOTING_ACTION, 90, 2, this.angleIncrement, angles, 3, 2);
	
    this.movementFactor = new MovementFactor(MOVE_SPEED);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);
}

Marine.prototype = new Entity();
Marine.prototype.constructor = Marine;


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
    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Marine.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
