
function Hydralisk(game, spritesheet) {
    const STANDING_ACTION = "standing";
    const WALKING_ACTION = "walking";
	//number of angles the entity can look
	var angles = 16;
	//degrees each angle covers
	var degrees = 360/angles;	//360 degrees in a circle 
	
	this.frameWidth = 128;
	this.frameHeight =128;
	this.sheetWidth = 17;
	this.scale = 2;
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale, startingAction
    this.animation = new Animation(spritesheet, this.frameWidth, this.frameHeight, 
                                   this.sheetWidth, this.scale, STANDING_ACTION);

    //Mapping walking sprites

    this.animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, degrees, angles, 6, 7);
    this.animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, degrees, angles, 6, 1);
	
    this.movementFactor = new MovementFactor(350);
	this.changeTime = 0;		//time since last direction change

	this.game = game;
    this.ctx = game.ctx;
    Enemy.call(this, game, 400, 100);
}

Hydralisk.prototype = new Enemy();
Hydralisk.prototype.constructor = Hydralisk;


Hydralisk.prototype.update = function () {
	Enemy.prototype.update.call(this);
}

Hydralisk.prototype.draw = function () {
    Enemy.prototype.draw.call(this);
}
