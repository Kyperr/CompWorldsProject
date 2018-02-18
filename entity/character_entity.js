function CharacterEntity(game, spritesheet, physics, maxHealth) {
    /*Super init*/
    PhysicalEntity.call(this, game, spritesheet, physics);

    /*Sub init*/
    this.stats = {};
    this.stats.maxHP = maxHealth;
    this.stats.hp = maxHealth;
}

CharacterEntity.prototype = Object.create(PhysicalEntity.prototype);
CharacterEntity.prototype.constructor = CharacterEntity;

/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
CharacterEntity.prototype.createAnimation = function (spritesheet) {
}

CharacterEntity.prototype.update = function () {
    if (this.stats.hp <= 0) {
        this.removeFromWorld = true;
    }

    var character = this;
    character.hitshapes.forEach(function (characterShape) {
        map = character.game.map;
        map.hitshapes.forEach(function (wall) {
            if (characterShape.doesCollide(wall)) {
                console.log("COLLISION DETECTED");
                character.physics.velocity = 0;
                character.physics.directionX = 0;
                character.physics.directionY = 0;
            }
        });
    });

    PhysicalEntity.prototype.update.call(this);    
}

/*
CharacterEntity.prototype.draw = function () {
    //this.animation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
}
*/
