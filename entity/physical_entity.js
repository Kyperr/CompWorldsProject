
function PhysicalEntity(game, ctx, spritesheet, physics) {

    /*Super init*/
    Entity.call(this, game);

    /*Sub init*/
    this.ctx = ctx;
    this.physics = physics;

    this.animation = this.createAnimation(spritesheet);
}

PhysicalEntity.prototype = new Entity();
PhysicalEntity.prototype.constructor = PhysicalEntity;


/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
PhysicalEntity.prototype.createAnimation = function (spritesheet) {
}

PhysicalEntity.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
}
