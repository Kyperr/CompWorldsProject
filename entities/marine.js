function Marine(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);
    this.animation.currentState = "walking0";

    //Mapping walking sprites
	
	createAnimationStates(this.animation, 22.5, 16);
	
    this.movementFactor = new MovementFactor(100);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);
}

function createAnimationStates(animation, angleIncrements, numberOfAngles){
	for(i = 0; i <= numberOfAngles/2; i++){
		var x = 2 * i;
		var angle = 90 - (i * angleIncrements);
		if(angle < 0){
			angle += 360;
		}
		
        console.log("Adding animation state: x = " + x + " angle = " + angle);
        animation.animationStates["walking" + angle] = new AnimationState("walking" + angle, x, 5, 9, angle, .1, true, false);
	}
	
	for(i = 1; i < numberOfAngles/2; i++){
		var x = 2 * i;
		var angle = 90 + (i * angleIncrements);
		
        console.log("Adding animation state: x = " + x + " angle = " + angle);
        animation.animationStates["walking" + angle] = new AnimationState("walking" + angle, x, 5, 9, angle, .1, true, true);
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

    //Walking direction

    this.x += delta * speed * moveFac.getHorizontalDirection();
    
    this.y -= delta * speed * moveFac.getVerticalDirection();


    //Looking direction
    
    var angleToFace = moveFac.getDirectionalAngle();
    //console.log("Angle to face: " + angleToFace);
    
    this.animation.currentState = "walking" + angleToFace;

    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Marine.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}