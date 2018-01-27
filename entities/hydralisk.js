function Hydralisk(game, spritesheet) {
    const MOVE_SPEED = 250;
    const ATTACKS_PER_SECOND = 1;
    const STANDING_ACTION = "standing";
    const WALKING_ACTION = "walking";
	const ATTACK_ACTION = "attacking";
	//number of angles the entity can look
	var angles = 16;
	//degrees each angle covers
	var degrees = 360/angles;	//360 degrees in a circle 
	
	this.frameWidth = 128;
	this.frameHeight =128;
	this.sheetWidth = 17;
	this.scale = 2;
    // Actual angle (where he's shooting)
    this.trueAngle = 0;
	
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale, startingAction
    this.animation = new Animation(spritesheet, this.frameWidth, this.frameHeight, 
                                   this.sheetWidth, this.scale, STANDING_ACTION);


    this.isAttcking = false;
    this.timeSinceLastAttack = 0;
    this.attacksPerSecond = ATTACKS_PER_SECOND;
    this.animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, degrees, angles, 6, 7);
    this.animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, degrees, angles, 6, 1);
    this.animation.createVerticalAnimationStates(ATTACK_ACTION, 90, 2, degrees, angles, 1, 7);
	
    this.movementFactor = new MovementFactor(MOVE_SPEED);
	this.changeTime = 0;		//time since last direction change

    this.ctx = game.ctx;
    Entity.call(this, game, 400, 100);
}

Hydralisk.prototype = new Entity();
Hydralisk.prototype.constructor = Hydralisk;


Hydralisk.prototype.update = function () {

    var delta = this.game.clockTick;
    var moveFac = this.movementFactor;

    this.timeSinceLastAttack += delta;
	
	this.updateDirection();
	if (this.timeSinceLastAttack >= 1/this.attacksPerSecond) {
		this.attack(delta);
	} else if (moveFac.getHorizontalDirection() == 0 && moveFac.getVerticalDirection() == 0){
        this.animation.currentAction = "standing";
        var angleToFace = moveFac.getDirectionalAngle();
        this.animation.currentAngle = angleToFace;
	} else {
		this.walk(delta);
	}

    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Hydralisk.prototype.newX = function (delta, speed, moveFac) {	
	return (this.x + delta * speed * moveFac.getHorizontalDirection());
}

Hydralisk.prototype.newY = function (delta, speed, moveFac) {	
	return (this.y - delta * speed * moveFac.getVerticalDirection());
}
	
Hydralisk.prototype.updateDirection = function() {
	
	this.changeTime += this.game.clockTick;
	if (this.changeTime >= 0.5) {
		this.changeTime = 0;
		//random movement
		var dir = Math.floor(Math.random() * (4)); 
		//0=n 1=e 2=s 3=w
		this.movementFactor.reset();
		switch (dir) {
			case 0: 
				this.movementFactor.north = 1;
				break;
			case 1: 
				this.movementFactor.east = 1;
				break;
			case 2: 
				this.movementFactor.south = 1;
			break;
			case 3: 
				this.movementFactor.west = 1;
				break;
		}
	}
}
	
Hydralisk.prototype.walk = function (delta) {
	var that = this;
	
    var speed = this.movementFactor.speed;
	
    this.animation.currentAction = "walking";
    var angleToFace = this.movementFactor.getDirectionalAngle();
    this.animation.currentAngle = angleToFace;
	
	var newX = this.newX(delta, speed, this.movementFactor);
	var newY = this.newY(delta, speed, this.movementFactor);
	
	if (newX + (this.frameWidth * this.scale) <= this.game.ctx.canvas.width && newX > 0) { 
		this.x = newX;
	} else {
		this.animation.currentAngle = this.movementFactor.reflect();
		//this.x = this.newX(delta, speed, moveFac);	//this addition makes the boundary not work
	}
	if (newY + (this.frameHeight * this.scale) <= this.game.ctx.canvas.height && newY > 0) { 
		this.y = newY;
	} else {
		this.animation.currentAngle = this.movementFactor.reflect();
		//this.y = this.newY(delta, speed, moveFac);	//this addition makes the boundary not work
	}
}

Hydralisk.prototype.attack = function (delta) {
	
	var availDir = [];
	
	this.animation.currentAction = "attacking";
        // If it's time to create another bullet...
        // (secondsBetweenShots = 1 / shotsPerSecond)
        if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
			var player = this.game.entities[1];
			
			var srcX = this.x + ((this.frameWidth * this.scale) / 2);
			var srcY = this.y + ((this.frameHeight * this.scale) / 2);
			console.log("Entity.scale = " + player.scale);
			var dstX = player.x;// + ((player.frameWidth * player.scale) / 2);
			var dstY = player.y;// + ((player.frameHeight * player.scale) / 2);
			
			var angleToPlayer = calculateAngle(dstX, dstY, srcX, srcY);
			console.log("angle to player: " + angleToPlayer);
			
			
            // Create a bullet
            var bullet = new Bullet(this.game,
                                    this.game.assetManager.getAsset("./img/enemy_bullet.png"), 
                                    this, true, angleToPlayer);
            this.game.addEntity(bullet);    

            // Reset timeSinceLastShot
            this.timeSinceLastAttack = 0;
        }
}

Hydralisk.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
