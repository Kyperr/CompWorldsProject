
function Guardian(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, GUA_FRAME_DIM, GUA_FRAME_DIM, SCALE, true);
    var ai = new PredictionAI(this, GUA_VIEW_DISTANCE, GUA_ATTACK_DISTANCE,
                              GUA_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                              GUA_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai,
                   GUA_MAX_HP + DIFFICULTY_GUA_HP * game.difficulty, GUA_DEATH);

    this.hitshapes.push(new Circle(GUA_HITCIRCLE_X, GUA_HITCIRCLE_Y, GUA_HITCIRCLE_R * SCALE, this));

}

Guardian.prototype = Object.create(BotEntity.prototype);
Guardian.prototype.constructor = Guardian;

Guardian.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, GUA_SHEET_WIDTH, GUA_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, GUA_FIRST_FRAME_ANGLE, GUA_FRAME_INCREMENT, 1, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, GUA_FIRST_FRAME_ANGLE, GUA_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, GUA_FIRST_FRAME_ANGLE, GUA_FRAME_INCREMENT, 1, 7, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Guardian.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 8;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 0, 8, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}
