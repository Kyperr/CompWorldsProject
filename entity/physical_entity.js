
function PhysicalEntity(game, ctx, x, y, spritesheet, movementFactor) {

    /*Super init*/
    Entity.call(this, game, x, y);

    /*Sub init*/
    this.trueAngle = 0;
    this.ctx = ctx;
    this.movementFactor = movementFactor;

    this.animation = this.createAnimation(spritesheet);
}

PhysicalEntity.prototype = new Entity();
PhysicalEntity.prototype.constructor = PhysicalEntity


/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
PhysicalEntity.prototype.createAnimation = function (spritesheet) {
}

PhysicalEntity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

PhysicalEntity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}