
function Hydralisk(game, spritesheet) {


    //Super init
    var physics = new Physics(400, 100, 128, 128, 2, true);

    PhysicalEntity.call(this, game, game.ctx, spritesheet, physics);

    //Sub init    
    this.ai = new BasicEnemyAI(this, HYD_ATTACKS_PER_SECOND, HYD_PAUSE_AFTER_ATTACK);    
    this.attacksPerSecond = HYD_ATTACKS_PER_SECOND;	
	this.changeTime = 0;		//time since last direction change
    
}

Hydralisk.prototype = new BotEntity();
Hydralisk.prototype.constructor = Hydralisk;

Hydralisk.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 16;
    var sheetWidth = 17;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, 6, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, 6, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, 90, 2, 1, 7, .1);

    return animation;
}