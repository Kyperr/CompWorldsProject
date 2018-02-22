
function Ultralisk(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, ULT_FRAME_DIM, ULT_FRAME_DIM, SCALE, true);
    var ai = new UltralistkAI(this, ULT_VIEW_DISTANCE, ULT_ATTACK_DISTANCE, ULT_ATTACKS_PER_SECOND, ULT_MOVE_SPEED);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, ULT_MAX_HP);

    this.hitshapes.push(new Circle(ULT_HITCIRCLE_X, ULT_HITCIRCLE_Y, ULT_HITCIRCLE_R * SCALE, this));

}

Ultralisk.prototype = Object.create(BotEntity.prototype);
Ultralisk.prototype.constructor = Ultralisk;

Ultralisk.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, ULT_SHEET_WIDTH, ULT_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, ULT_FIRST_FRAME_ANGLE, ULT_FRAME_INCREMENT, 1, 10, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, ULT_FIRST_FRAME_ANGLE, ULT_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, ULT_FIRST_FRAME_ANGLE, ULT_FRAME_INCREMENT, 11, 6, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Ultralisk.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 8;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 15, 10, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}
