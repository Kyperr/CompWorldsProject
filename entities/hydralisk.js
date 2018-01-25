function Hydralisk(game, spritesheet) {
	//number of angles the entity can look
	var angles = 16;
	//degrees each angle covers
	var degrees = 360/angles;	//360 degrees in a circle 
	
	this.frameWidth = 128;
	this.frameHeight =128;
	this.sheetWidth = 17;
	this.scale = 2;
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale
    this.animation = new Animation(spritesheet, this.frameWidth, this.frameHeight, this.sheetWidth, this.scale);

    //Mapping walking sprites

    this.animation.createAnimationStates("walking", degrees, angles, 6, 7);
    this.animation.createAnimationStates("standing", degrees, angles, 6, 1);
	
    this.movementFactor = new MovementFactor(350);
	this.changeTime = 0;		//time since last direction change

    this.ctx = game.ctx;
    Entity.call(this, game, 400, 100);
}

Hydralisk.prototype = new Entity();
Hydralisk.prototype.constructor = Hydralisk;


Hydralisk.prototype.update = function () {

    var delta = this.game.clockTick;
    var moveFac = this.movementFactor;
    var speed = moveFac.speed;
	var that = this;
	
	this.changeTime += delta;
	
	if (this.changeTime >= 0.5) {
		this.changeTime = 0;
		//random movement
		var dir = Math.floor(Math.random() * (4)); 
		//0=n 1=e 2=s 3=w
		that.movementFactor.reset();
		switch (dir) {
			case 0: 
				that.movementFactor.north = 1;
				break;
			case 1: 
				that.movementFactor.east = 1;
				break;
			case 2: 
				that.movementFactor.south = 1;
			break;
			case 3: 
				that.movementFactor.west = 1;
				break;
		}
	}


    if (moveFac.getHorizontalDirection() == 0 && moveFac.getVerticalDirection() == 0) {
        this.animation.currentAction = "standing";
    } else {
        this.animation.currentAction = "walking";
        var angleToFace = moveFac.getDirectionalAngle();
        this.animation.currentAngle = angleToFace;
    }

	var newX = this.x + delta * speed * moveFac.getHorizontalDirection();
	var newY = this.y - delta * speed * moveFac.getVerticalDirection();
	
	if (newX + (this.frameWidth * this.scale) <= this.game.ctx.canvas.width && newX > 0) { 
		this.x = newX;
	} else {
		this.animation.currentAngle = moveFac.reflect();
	}
	if (newY + (this.frameHeight * this.scale) <= this.game.ctx.canvas.height && newY > 0) { 
		this.y = newY;
	} else {
		this.animation.currentAngle = moveFac.reflect();
	}

    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Hydralisk.prototype.draw = function () {
    //if(alive){
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    //} else if (dead){
    //this.deathanimation.dajsdnga;jsdng;sjdnfg;sjd
    //}

    Entity.prototype.draw.call(this);
}
