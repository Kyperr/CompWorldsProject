
function NydusCanal(x, y, game, spritesheet) {
    /*Super init*/
    var physics = new Physics(this, x, y, NYD_FRAME_DIM, NYD_FRAME_DIM, SCALE, true);
    PhysicalEntity.call(this, game, spritesheet, physics);

    this.isActive = false;
    this.isActivated = false;

    /*Sub init*/
    this.hitshapes.push(new Box(NYD_HITBOX_X, NYD_HITBOX_Y,
        NYD_HITBOX_W * SCALE, NYD_HITBOX_H * SCALE, this));
}

NydusCanal.prototype = new PhysicalEntity();
NydusCanal.prototype.constructor = NydusCanal;

//Called by super class.
NydusCanal.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 1;
    var sheetWidth = 5;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, INACTIVE_ACTION);

    //Really should do away with these magic numbers.
    animation.createHorizontalAnimationStates(INACTIVE_ACTION, firstFrameAngle, frameIncrement, 3, 1, .1);
    animation.createHorizontalAnimationStates(ACTIVE_ACTION, firstFrameAngle, frameIncrement, 1, 5, .1);

    return animation;
}

NydusCanal.prototype.update = function () {
    if (this.isActive) {
        this.animation.currentAction = ACTIVE_ACTION;
        //console.log("ACTIVE");	
        var canal = this;
        canal.hitshapes.forEach(function (myShape) {
            var player = canal.game.player;
            player.hitshapes.forEach(function (theirShape) {
                if (myShape.doesCollide(theirShape)) {
                    canal.isActivated = true;
                }
            });
        });
    } else {
        this.animation.currentAction = INACTIVE_ACTION;
        //console.log("INACTIVE");
    }

    if (this.isActivated) {
        var level = canal.game.levels[canal.game.currentLevel];

        var delta = canal.game.clockTick;
        level.timeSinceCompleted += delta;

        //transport to next level
        if (level.timeSinceCompleted > 1) {
            canal.game.bullets = [];
            canal.game.currentLevel++;
            canal.game.levels[canal.game.currentLevel].init();
            canal.isActivated = false;
            canal.isActive = false;
        }
    }

    PhysicalEntity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

NydusCanal.prototype.draw = function () {
    PhysicalEntity.prototype.draw.call(this);
}