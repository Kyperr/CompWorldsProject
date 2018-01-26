
function Bullet(game, spritesheet, creator, fromPlayer, startingAngle) {
    const MOVE_SPEED = 300;
    const DEFAULT_ACTION = "flying";
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale, startingAction
    this.animation = new Animation(spritesheet, 32, 32, 5, 2, DEFAULT_ACTION);

    this.angle = startingAngle;
    this.isPlayerBullet = fromPlayer;

    // arguments: name, angleIncrements, numberOfAngles, yIndex, frameCount 
    // temporarily set to 1 yIndex and 1 frameCount until horizontal animation implemented
    this.animation.createVerticalAnimationStates(DEFAULT_ACTION, 0, 90, 1, 1, 1);
	
    this.movementFactor = new MovementFactor(MOVE_SPEED);

    this.ctx = game.ctx;
    Entity.call(this, game, creator.x, creator.y);
}

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
    var delta = this.game.clockTick;
    var moveFac = this.movementFactor;
    var speed = moveFac.speed;

    // length of hypotenuse
    var hypotenusePixels = delta * speed;

    // cos(theta) = hypotenuse / adjacent
    var horizontalPixels = hypotenusePixels / Math.cos(this.angle)

    // sin(theta) = opposite / hypotenuse
    var verticalPixels = hypotenusePixels * Math.sin(this.angle)

    this.x += horizontalPixels; 
    this.y -= verticalPixels;

    Entity.prototype.update.call(this);

    this.lastUpdated = this.game.gameTime;
}

Bullet.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
