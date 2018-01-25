function Hydralisk(game, spritesheet) {
	//number of angles the entity can look
	var angles = 16;
	//degrees each angle covers
	var degrees = 360/angles;	//360 degrees in a circle 
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale
    this.animation = new Animation(spritesheet, 128, 128, 17, 2);

    //Mapping walking sprites

    this.animation.createAnimationStates("walking", degrees, angles, 6, 7);
    this.animation.createAnimationStates("standing", degrees, angles, 6, 1);
	
    this.movementFactor = new MovementFactor(100);

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
	//only pausing before going super fast. acting like setTimeout not setInterval. ???????
	setInterval(function() {
		//var b = 0 //Math.floor((that.game.timer.gameTime * 1000) % 500); //not reliable
		//console.log(this.game.timer.gameTime);
		//if (b === 0) { 	//not reliable
		//random movement
		var dir = Math.floor(Math.random() * (4)); 
		//console.log(dir);
		//0=n 1=e 2=s 3=w
		switch (dir) {
			case 0: 
				that.movementFactor.reset();
				that.movementFactor.north = 1;
				break;
			case 1: 
				that.movementFactor.reset();
				that.movementFactor.east = 1;
				break;
			case 2: 
				that.movementFactor.reset();
				that.movementFactor.south = 1;
			break;
			case 3: 
				that.movementFactor.reset();
				that.movementFactor.west = 1;
				break;
		}
	}, 1000);


    if (moveFac.getHorizontalDirection() == 0 && moveFac.getVerticalDirection() == 0) {
        this.animation.currentAction = "standing";
    } else {
        this.animation.currentAction = "walking";
        var angleToFace = moveFac.getDirectionalAngle();
        this.animation.currentAngle = angleToFace;
    }

    this.x += delta * speed * moveFac.getHorizontalDirection();

    this.y -= delta * speed * moveFac.getVerticalDirection();

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
