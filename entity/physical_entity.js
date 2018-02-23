
function PhysicalEntity(game, spritesheet, physics, wallBehaviorFunction) {
    /*Super init*/
    Entity.call(this, game);

    /*Sub init*/
    this.ctx = null;
    this.physics = physics;
    this.wallBehaviorFunction;

    this.hitshapes = [];

    this.animation = this.createAnimation(spritesheet);
}

PhysicalEntity.prototype = Object.create(Entity.prototype);
PhysicalEntity.prototype.constructor = PhysicalEntity;

PhysicalEntity.prototype.init = function (game) {
    this.ctx = game.ctx;
}

/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
PhysicalEntity.prototype.createAnimation = function (spritesheet) {
}

PhysicalEntity.prototype.wallBehavior = function (x, y) {
    this.physics.x = x;
    this.physics.y = y;
}

PhysicalEntity.prototype.update = function () {

    var delta = this.game.clockTick;

    this.physics.updateLocation(delta);
    
    this.hitshapes.forEach(function (shape) {
        shape.update();
    });
}

PhysicalEntity.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
    
    if (DRAW_HITBOXES) {
        var entity = this;
        entity.hitshapes.forEach(function (shape) {
            entity.ctx.beginPath();
            entity.ctx.lineWidth=2;
            entity.ctx.strokeStyle="green";
            if (shape instanceof Circle) {
                entity.ctx.arc(shape.x, shape.y, shape.r, 0, 2*Math.PI);
            } else if (shape instanceof Box) {
                entity.ctx.rect(shape.x, shape.y, shape.w, shape.h); 
            }
            entity.ctx.stroke();
            entity.ctx.closePath();
        });
    }
}

PhysicalEntity.getMiddleXOf = function(physicalEntity){
	var xMiddle = physicalEntity.physics.x;
	xMiddle += (physicalEntity.physics.width * SCALE) / 2;
	return xMiddle;
}

PhysicalEntity.getMiddleYOf = function(physicalEntity){
	var yMiddle = physicalEntity.physics.y;
	yMiddle += (physicalEntity.physics.height * SCALE) / 2;
	return yMiddle;
}
