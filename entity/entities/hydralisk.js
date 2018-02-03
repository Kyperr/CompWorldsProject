
function Hydralisk(game, spritesheet) {


    //Super init
    var movementFactor = new MovementFactor(HYD_MOVE_SPEED);

    PhysicalEntity.call(this, game, game.ctx, 400, 100, spritesheet, movementFactor);

    //Sub init    
    this.ai = new BasicEnemyAI(this, HYD_ATTACKS_PER_SECOND, HYD_PAUSE_AFTER_ATTACK);    
    this.attacksPerSecond = HYD_ATTACKS_PER_SECOND;	
	this.changeTime = 0;		//time since last direction change
    
}

Hydralisk.prototype = new PhysicalEntity();
Hydralisk.prototype.constructor = Hydralisk;

Hydralisk.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 16;
    var frameWidth = 128;
    var frameHeight = 128;
    var sheetWidth = 17;
    var scale = 2;


    var animation = new Animation(this, spritesheet, frameWidth, frameHeight, sheetWidth, numberOfAngles, scale, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, 6, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, 6, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, 90, 2, 1, 7, .1);

    return animation;
}

Hydralisk.prototype.update = function () {
    this.ai.update();
}

Hydralisk.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    PhysicalEntity.prototype.draw.call(this);
}
