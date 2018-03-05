function CharacterEntity(game, spritesheet, deathSpriteSheet, physics, maxHealth, deathSound) {
    /*Super init*/
    PhysicalEntity.call(this, game, spritesheet, physics);

    /*Sub init*/
	this.deathSound = deathSound;
    this.stats = {};
    this.stats.maxHP = maxHealth;
    this.stats.hp = maxHealth;

    this.deathAnimation = this.createDeathAnimation(deathSpriteSheet);

    this.onDeathCallbacks = [];
    //console.log("death anim " + this.deathAnimation);

}

CharacterEntity.prototype = Object.create(PhysicalEntity.prototype);
CharacterEntity.prototype.constructor = CharacterEntity;

/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
CharacterEntity.prototype.createAnimation = function (spritesheet) {
}

/*This must return an animation object. Creation of animations is rather cumbersome, so it is made into its own function.*/
CharacterEntity.prototype.createDeathAnimation = function (deathSpriteSheet) {
}

CharacterEntity.prototype.update = function () {
    var character = this;
    /*
    character.hitshapes.forEach(function (characterShape) {
        level = character.game.levels[character.game.currentLevel];
        level.hitshapes.forEach(function (wall) {
            if (characterShape.doesCollide(wall)) {
                character.physics.velocity = 0;
                character.physics.directionX = 0;
                character.physics.directionY = 0;
            }
        });
    });
	*/
    if (this.stats.hp > 0) {
        var character = this;

        character.hitshapes.forEach(function (characterShape) {
            level = character.game.levels[character.game.currentLevel];
            level.hitshapes.forEach(function (wall) {
                if (characterShape.doesCollide(wall)) {
                    character.physics.velocity = 0;
                    character.physics.directionX = 0;
                    character.physics.directionY = 0;
                }
            });
        });

        PhysicalEntity.prototype.update.call(this);
    } else {
        //console.log("a");
        if (this.deathAnimation.isDone()) {
            //console.log("deathAnim is done!");
            this.removeFromWorld = true;
            
            this.onDeathCallbacks.forEach(function(func){
                func();
            });
        }
    }
}

CharacterEntity.prototype.draw = function () {
    if (this.stats.hp > 0) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
    } else {
        //console.log("b");
        if (!this.deathAnimation.isDone()) {
            this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
        }
    }

    if (DRAW_HITBOXES) {
        var entity = this;
        entity.hitshapes.forEach(function (shape) {
            entity.ctx.beginPath();
            entity.ctx.lineWidth = 2;
            entity.ctx.strokeStyle = "green";
            if (shape instanceof Circle) {
                entity.ctx.arc(shape.x, shape.y, shape.r, 0, 2 * Math.PI);
            } else if (shape instanceof Box) {
                entity.ctx.rect(shape.x, shape.y, shape.w, shape.h);
            }
            entity.ctx.stroke();
            entity.ctx.closePath();
        });
    }
}

CharacterEntity.prototype.playDeathSound = function () {
	var death = document.getElementById(this.deathSound);
	death.play();
}
