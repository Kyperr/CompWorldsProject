function Hydralisk(game, spritesheet) {
	//number of angles the entity can look
	var angles = 16;
	//degrees each angle covers
	var degrees = 360/angles;	//360 degrees in a circle 
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);
    this.animation.currentState = "walking0";

    //Mapping walking sprites
	
	createAnimationStates(this.animation, degrees, angles);
	
    this.movementFactor = new MovementFactor(100);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);
}