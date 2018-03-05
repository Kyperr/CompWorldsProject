
function Devourer(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, DEV_FRAME_DIM, DEV_FRAME_DIM, SCALE, true);
    var ai = new DevourerAI(this, DEV_VIEW_DISTANCE, DEV_ATTACK_DISTANCE,
                            DEV_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                            DEV_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   DEV_MAX_HP + DIFFICULTY_DEV_HP * game.difficulty, DEV_DEATH);
    this.hitshapes.push(new Circle(DEV_HITCIRCLE_X, DEV_HITCIRCLE_Y, DEV_HITCIRCLE_R * SCALE, this));
}

Devourer.prototype = Object.create(BotEntity.prototype);
Devourer.prototype.constructor = Devourer;

Devourer.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, DEV_SHEET_WIDTH, DEV_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 1, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 7, 3, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Devourer.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 17;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 0, 8, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}
