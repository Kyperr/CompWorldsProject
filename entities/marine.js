function Marine(game, spritesheet) {
	//spriteSheet, frameWidth, frameHeight, sheetWidth, scale
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);

    //Mapping walking sprites

    this.animation.createAnimationStates("walking", 22.5, 16, 5, 9);
    this.animation.createAnimationStates("standing", 22.5, 16, 5, 1);
    this.animation.createAnimationStates("aiming", 22.5, 16, 1, 3);
    this.animation.createAnimationStates("shooting", 22.5, 16, 3, 2);
	
    this.movementFactor = new MovementFactor(100);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);
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


    console.log("walking");
    if (moveFac.getHorizontalDirection() == 0 && moveFac.getVerticalDirection() == 0) {
        this.animation.currentAction = "standing";
        console.log("Standing");
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

Marine.prototype.draw = function () {
    //if(alive){
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    //} else if (dead){
    //this.deathanimation.dajsdnga;jsdng;sjdnfg;sjd
    //}

    Entity.prototype.draw.call(this);
}