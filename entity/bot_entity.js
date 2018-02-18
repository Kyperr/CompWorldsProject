function BotEntity(game, spritesheet, deathSpriteSheet, physics, ai, maxHealth) {

    /*Super init*/
    CharacterEntity.call(this, game, spritesheet, deathSpriteSheet, physics, maxHealth);

    /*Sub init*/
    this.ai = ai;
}

BotEntity.prototype = Object.create(CharacterEntity.prototype);
BotEntity.prototype.constructor = BotEntity;

BotEntity.prototype.update = function () {
    CharacterEntity.prototype.update.call(this);

    if (this.stats.hp > 0) {
        this.ai.update();
    }
}
