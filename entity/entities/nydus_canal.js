
function NydusCanal(x, y, game, spritesheet) {
    /*Super init*/
    var physics = new Physics(this, x, y, NYD_FRAME_DIM, NYD_FRAME_DIM, SCALE, true);
    PhysicalEntity.call(this, game, spritesheet, physics, (x, y)=>{});
	
	this.isActive = false;

    /*Sub init*/
    this.hitshapes.push(new Box(NYD_HITBOX_X, NYD_HITBOX_Y, 
                                NYD_HITBOX_W * SCALE, NYD_HITBOX_H * SCALE, this));
}

NydusCanal.prototype = new PhysicalEntity();
NydusCanal.prototype.constructor = NydusCanal;

//Called by super class.
NydusCanal.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 1;
    var sheetWidth = 5;
    var firstFrameAngle = 90;
    var frameIncrement = 1;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, INACTIVE_ACTION);

    //Really should do away with these magic numbers.
    animation.createHorizontalAnimationStates(INACTIVE_ACTION, firstFrameAngle, frameIncrement, 3, 1, .1, true);
    animation.createHorizontalAnimationStates(ACTIVE_ACTION, firstFrameAngle, frameIncrement, 1, 5, .1, true);

    return animation;
}

NydusCanal.prototype.update = function () {
    var delta = this.game.clockTick;
    var physics = this.physics;


    if (this.isActive) {
        this.animation.currentAction = ACTIVE_ACTION; 
		
    } else {
        this.animation.currentAction = INACTIVE_ACTION;
    }
    PhysicalEntity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

NydusCanal.prototype.draw = function () {
    PhysicalEntity.prototype.draw.call(this);
}