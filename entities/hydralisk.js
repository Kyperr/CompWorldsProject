function Hydralisk(game, spritesheet) {
	//spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);
    this.animation.currentState = "walking0";

    //Mapping walking sprites
	
	createAnimationStates(this.animation, 22.5, 16);
	
    this.movementFactor = new MovementFactor(100);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);
}