
function Marine(game, spritesheet) {
    const MOVE_SPEED = 150;
    const SHOTS_PER_SECOND = 1

	//number of angles the entity can look
	var angles = 16;

    this.stats = new CharacterStats(game, SHOTS_PER_SECOND);	
    //degrees each angle covers
	this.degreesPerAngle = 360/angles;	//360 degrees in a circle 
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);

    this.isShooting = false;
    //Mapping walking sprites

    this.animation.createAnimationStates("walking", this.degreesPerAngle, angles, 5, 9);
    this.animation.createAnimationStates("standing", this.degreesPerAngle, angles, 5, 1);
    this.animation.createAnimationStates("aiming", this.degreesPerAngle, angles, 1, 3);
    this.animation.createAnimationStates("shooting", this.degreesPerAngle, angles, 3, 2);
	
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


    //console.log("walking");
    if (this.isShooting) {
        this.animation.currentAction = "shooting";
    } else if (moveFac.getHorizontalDirection() == 0 && moveFac.getVerticalDirection() == 0) {
        this.animation.currentAction = "standing";
    } else {
        this.animation.currentAction = "walking";

        var angleToFace = moveFac.getDirectionalAngle();
        this.animation.currentAngle = angleToFace;

        this.x += delta * speed * moveFac.getHorizontalDirection();
        this.y -= delta * speed * moveFac.getVerticalDirection();
    }


    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Marine.prototype.draw = function () {
    //if(alive){
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    //} else if (dead){
    //this.deathanimation.dajsdnga;jsdng;sjdnfg;sjd
    //}

    Entity.prototype.draw.call(this);
}
