function BotEntity(game, ctx, x, y, spritesheet, movementFactor, ai) {

    /*Super init*/
    PhysicalEntity.call(this, game, ctx, 400, 100, spritesheet, movementFactor);

    /*Sub init*/
    this.ai = ai;
}

BotEntity.prototype = new PhysicalEntity();
BotEntity.prototype.constructor = BotEntity

BotEntity.prototype.update = function () {
    this.ai.update();
}