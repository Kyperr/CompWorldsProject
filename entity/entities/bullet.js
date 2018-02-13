
function Bullet(game, spritesheet, creator, fromPlayer, directionX, directionY) {

    /*Super init*/
    var physics = new Physics(0, 0, 32, 32, 2, true);
    physics.directionX = directionX;
    physics.directionY = directionY;
    
    PhysicalEntity.call(this, game, game.ctx, spritesheet, physics);
    
    /*Sub init*/
    this.isPlayerBullet = fromPlayer;
    
    var creatorCenterX = creator.x + (creator.animation.frameWidth * creator.animation.scale / 2);
    var creatorCenterY = creator.y + (creator.animation.frameHeight * creator.animation.scale / 2);

    var spawnX = creatorCenterX - (this.animation.frameWidth * this.animation.scale / 2);
    var spawnY = creatorCenterY - (this.animation.frameHeight * this.animation.scale / 2);

    this.x = spawnX;
    this.y = spawnY;
    
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

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, FLYING_ACTION);

    //Really should do away with these magic numbers.
                                                //animationName, firstFrameAngle, frameIncrement, yIndex, frameCount
    animation.createHorizontalAnimationStates(FLYING_ACTION, 0, 1, 1, 5, .05);
    

    return animation;
}

Bullet.prototype.update = function () {
    var delta = this.game.clockTick;

    // length of hypotenuse
    //var hypotenusePixels = delta * speed;

    // cos(theta) = adjacent / hypotenuse
    //var cosTheta = Math.cos(degreesToRadians(this.trueAngle));
    //var horizontalPixels = hypotenusePixels * cosTheta;

    // sin(theta) = opposite / hypotenuse
    //var sinTheta = Math.sin(degreesToRadians(this.trueAngle));
    //var verticalPixels = hypotenusePixels * sinTheta;

    //this.x += horizontalPixels;
    //this.y -= verticalPixels;

    this.physics.updateLocation(delta);

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