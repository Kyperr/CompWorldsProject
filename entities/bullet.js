function Bullet(game, spritesheet, creator, fromPlayer, startingAngle) {
    const MOVE_SPEED = 300;
    const DEFAULT_ACTION = "flying";
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale, startingAction
    this.animation = new Animation(spritesheet, 32, 32, 5, 2, DEFAULT_ACTION);

    this.angle = startingAngle;
    this.isPlayerBullet = fromPlayer;
    this.movementFactor = new MovementFactor(MOVE_SPEED);
    this.ctx = game.ctx;

    // arguments: name, firstFrameAngle, angleIncrements, numberOfAngles, yIndex, frameCount 
    // temporarily set to 1 yIndex and 1 frameCount until horizontal animation implemented
    //this.animation.createVerticalAnimationStates(DEFAULT_ACTION, 0, 1, 0, 1, 1, 1);
    this.animation.createHorizontalAnimationStates(DEFAULT_ACTION, 0, 1, 0, 1, 1, 5);

    var creatorCenterX = creator.x + (creator.animation.frameWidth * creator.animation.scale / 2);
    var creatorCenterY = creator.y + (creator.animation.frameHeight * creator.animation.scale / 2);
    var spawnX = creatorCenterX - (this.animation.frameWidth * this.animation.scale / 2);
    var spawnY = creatorCenterY - (this.animation.frameHeight * this.animation.scale / 2);

    Entity.call(this, game, spawnX, spawnY);
}

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
    var delta = this.game.clockTick;
    var speed = this.movementFactor.speed;

    // length of hypotenuse
    var hypotenusePixels = delta * speed;

    // cos(theta) = adjacent / hypotenuse
    var cosTheta = Math.cos(degreesToRadians(this.angle));
    var horizontalPixels = hypotenusePixels * cosTheta;
    //console.log("horiz " + horizontalPixels);

    // sin(theta) = opposite / hypotenuse
    var sinTheta = Math.sin(degreesToRadians(this.angle));
    var verticalPixels = hypotenusePixels * sinTheta;

    this.x += horizontalPixels;
    this.y -= verticalPixels;

    Entity.prototype.update.call(this);

    this.lastUpdated = this.game.gameTime;

    // The following is temporary code so as not to lag the game with off-screen bullets.
    // Eventually this should be replaced with keeping track of distance the bullet has
    // travelled and deleting it after a certain distance.
    // If the bullet is offscreen, delete it.
    if (this.x > this.game.surfaceWidth ||
        this.x < 0 - this.animation.frameWidth * this.animation.scale || 
        this.y > this.game.surfaceHeight ||
        this.y < 0 - this.animation.frameHeight * this.animation.scale) { 

        this.isAlive = false;
        this.removeFromWorld = true;
    }
}

Bullet.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
