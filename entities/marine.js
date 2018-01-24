function Marine(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);

    //Mapping walking sprites
	
	createAnimationStates(this.animation, "walking", 22.5, 16);
	
    this.movementFactor = new MovementFactor(100);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);
}

//This function should be moved out of marine and used for all animation state assignments. It isn't fully astracted, either.
function createAnimationStates(animation, animationName, angleIncrements, numberOfAngles){
	for(i = 0; i <= numberOfAngles/2; i++){
		var x = 2 * i;
		var angle = 90 - (i * angleIncrements);
		if(angle < 0){
			angle += 360;
		}
		
        animation.animationStates[animationName + angle] = new AnimationState(animationName + angle, x, 5, 9, angle, .1, true, false);
	}
	
	for(i = 1; i < numberOfAngles/2; i++){
		var x = 2 * i;
		var angle = 90 + (i * angleIncrements);
		
        animation.animationStates[animationName + angle] = new AnimationState(animationName + angle, x, 5, 9, angle, .1, true, true);
	}
	
}

function realMod(a, n) {
    return a - (n * Math.floor(a / n));
}

Marine.prototype = new Entity();
Marine.prototype.constructor = Marine;


Marine.prototype.update = function () {

    var delta = this.game.clockTick;
    var moveFac = this.movementFactor;
    var speed = moveFac.speed;

    var angleToFace = moveFac.getDirectionalAngle();

    //if (moveFac.getHorizontalDirection == 0 && moveFac.getVerticalDirection == 0) {
    //    this.animation.currentAction = "walking";
    //} else {
        this.animation.currentAction = "walking";
    //}

    this.x += delta * speed * moveFac.getHorizontalDirection();

    this.y -= delta * speed * moveFac.getVerticalDirection();

    this.animation.currentAngle = angleToFace;

    

    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Marine.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}