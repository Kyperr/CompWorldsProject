
function Marine(x, y, game, spritesheet) {
    /*Super init*/
    var physics = new Physics(this, x, y, MAR_FRAME_DIM, MAR_FRAME_DIM, SCALE, true);

    CharacterEntity.call(this, game, spritesheet, physics, MAR_MAX_HP);

    /*Sub init*/
    this.isShooting = false;// Whether he's shooting
    this.timeSinceLastShot = 0;
    this.shotsPerSecond = MAR_SHOTS_PER_SECOND;

    this.hitshapes.push(new Box(MAR_HITBOX_X, MAR_HITBOX_Y, 
                                MAR_HITBOX_W * SCALE, MAR_HITBOX_H * SCALE, this));
}

Marine.prototype = new CharacterEntity();
Marine.prototype.constructor = Marine;

//Called by super class.
Marine.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 16;
    var sheetWidth = 17;
	var firstFrameAngle = 90;
	var frameIncrement = 2;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, firstFrameAngle, frameIncrement, 5, 9, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, firstFrameAngle, frameIncrement, 5, 1, .1);
    animation.createVerticalAnimationStates(AIMING_ACTION, firstFrameAngle, frameIncrement, 1, 3, .1);
    animation.createVerticalAnimationStates(SHOOTING_ACTION, firstFrameAngle, frameIncrement, 3, 2, .1);

    return animation;
}

Marine.prototype.update = function () {
    var delta = this.game.clockTick;
    var physics = this.physics;

    this.timeSinceLastShot += delta;

    if (this.isShooting) {
        this.animation.currentAction = "shooting"; 
        if (this.timeSinceLastShot >= (1 / this.shotsPerSecond)) {

            //game, spritesheet, creator, fromPlayer, startingAngle
            var bullet = new Bullet(this.game,
                this.game.assetManager.getAsset("./img/player_bullet.png"),
                this, true, physics.directionX, physics.directionY);

            bullet.init(this.game);            

            this.game.addBullet(bullet);

            this.timeSinceLastShot = 0;
        }

    } else if (physics.velocity != 0) {
        this.animation.currentAction = "walking";
    } else {
        //console.log("Why isn't it standing now?")
        this.animation.currentAction = "standing";
        this.physics.velocity = 0;
    }
    this.physics.updateLocation(delta);
    PhysicalEntity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}
