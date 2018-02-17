function BotEntity(game, spritesheet, physics, ai, maxHealth) {

    /*Super init*/
    CharacterEntity.call(this, game, spritesheet, physics, maxHealth);

    /*Sub init*/
    this.ai = ai;
}

BotEntity.prototype = Object.create(CharacterEntity.prototype);
BotEntity.prototype.constructor = BotEntity;

BotEntity.prototype.update = function () {
    this.ai.update();
    CharacterEntity.prototype.update.call(this);
}
