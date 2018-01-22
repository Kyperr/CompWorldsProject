function Marine(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 17, 5);
    this.animation.currentState = "walking0";

    //Mapping walking sprites

    var p = 4//Starting with the 5th sprite(0 based), going clockwise while recording the accurate angle.
    for (i = 0; i < 16; i++) {
        var x = 2 * (Math.abs(p));//x position on the sprite-sheet
        var angle = i * 22.5;//Angle the sprite is facing.
        var reflect = angle > 90 && angle < 270;

        console.log("Adding animation state: x = " + x + " angle = " + angle + " reflecting = " + reflect);


        this.animation.animationStates["walking" + angle] = new AnimationState("walking" + angle, x, 5, 9, angle, .1, true, reflect);
        p -= 1;
        //p = realMod(p, 9);
    }
    
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