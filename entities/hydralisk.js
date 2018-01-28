//***Constants
const MOVE_SPEED = 250;
const ATTACKS_PER_SECOND = .5;
const PAUSE_AFTER_ATTACK = 300; //milliseconds
const STANDING_ACTION = "standing";
const WALKING_ACTION = "walking";
const ATTACK_ACTION = "attacking";


function Hydralisk(game, spritesheet) {

    Entity.call(this, game, 400, 100);
    this.ctx = game.ctx;
    
	//number of angles the entity can look
	var angles = 16;
	//degrees each angle covers
    this.angleIncrement = 360/angles;	//360 degrees in a circle 
	this.frameWidth = 128;
	this.frameHeight = 128;
	this.sheetWidth = 17;
	this.scale = 2;
    // Actual angle (where he's shooting)
    this.trueAngle = 0;
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale, startingAction
    this.animation = new Animation(this, spritesheet, this.frameWidth, this.frameHeight, 
        this.sheetWidth, this.scale, STANDING_ACTION);
    
    this.ai = new BasicEnemyAI(this, ATTACKS_PER_SECOND, PAUSE_AFTER_ATTACK);
    
    this.attacksPerSecond = ATTACKS_PER_SECOND;
    this.animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, this.angleIncrement, angles, 6, 7);
    this.animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, this.angleIncrement, angles, 6, 1);
    this.animation.createVerticalAnimationStates(ATTACK_ACTION, 90, 2, this.angleIncrement, angles, 1, 7);
	
    this.movementFactor = new MovementFactor(MOVE_SPEED);
	this.changeTime = 0;		//time since last direction change
    
}

Hydralisk.prototype = new Entity();
Hydralisk.prototype.constructor = Hydralisk;

Hydralisk.prototype.update = function () {
    this.ai.update();
}

Hydralisk.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
