function Bullet(game, spritesheet, creator, fromPlayer, startingAngle) {

    /*Super init*/
    var movementFactor = new MovementFactor(BUL_MOVE_SPEED);

    console.log("1");

    PhysicalEntity.call(this, game, game.ctx, 0, 0, spritesheet, movementFactor);

    console.log("2");
    /*Sub init*/
    this.isPlayerBullet = fromPlayer;
    this.trueAngle = startingAngle;


    var creatorCenterX = creator.x + (creator.animation.frameWidth * creator.animation.scale / 2);
    var creatorCenterY = creator.y + (creator.animation.frameHeight * creator.animation.scale / 2);

    var spawnX = creatorCenterX - (this.animation.frameWidth * this.animation.scale / 2);
    var spawnY = creatorCenterY - (this.animation.frameHeight * this.animation.scale / 2);

    this.x = spawnX;
    this.y = spawnY;

    console.log("3");

}

Bullet.prototype = new PhysicalEntity();
Bullet.prototype.constructor = Bullet;

//Called by super class.
Bullet.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 1;
    var frameWidth = 32;
    var frameHeight = 32;
    var sheetWidth = 5;
    var scale = 2;//Set to two for testing purposes. Fine tune later.

    var animation = new Animation(this, spritesheet, frameWidth, frameHeight, sheetWidth, numberOfAngles, scale, FLYING_ACTION);

    //Really should do away with these magic numbers.
                                                //animationName, firstFrameAngle, frameIncrement, yIndex, frameCount
    animation.createHorizontalAnimationStates(FLYING_ACTION, 0, 1, 1, 5, .05);

    return animation;
}

Bullet.prototype.update = function () {
    var delta = this.game.clockTick;
    var speed = this.movementFactor.speed;

    // length of hypotenuse
    var hypotenusePixels = delta * speed;

    // cos(theta) = adjacent / hypotenuse
    var cosTheta = Math.cos(degreesToRadians(this.trueAngle));
    var horizontalPixels = hypotenusePixels * cosTheta;

    // sin(theta) = opposite / hypotenuse
    var sinTheta = Math.sin(degreesToRadians(this.trueAngle));
    var verticalPixels = hypotenusePixels * sinTheta;

    this.x += horizontalPixels;
    this.y -= verticalPixels;

    PhysicalEntity.prototype.update.call(this);

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
    PhysicalEntity.prototype.draw.call(this);
}
