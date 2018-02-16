function CharacterEntity(game, spritesheet, physics, maxHealth) {
    console.log("CharacterEntity");
    console.log(game);

    /*Super init*/
    PhysicalEntity.call(this, game, spritesheet, physics);

    /*Sub init*/
    this.stats = {};
    this.stats.maxHP = maxHealth;
    this.stats.hp = maxHealth;
}

CharacterEntity.prototype = new PhysicalEntity();
CharacterEntity.prototype.constructor = CharacterEntity;

/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
CharacterEntity.prototype.createAnimation = function (spritesheet) {
}

CharacterEntity.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
}
