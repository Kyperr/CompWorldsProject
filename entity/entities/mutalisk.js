
function Mutalisk(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, MUT_FRAME_DIM, MUT_FRAME_DIM, SCALE, true);
    var ai = new FlakAI(this, MUT_VIEW_DISTANCE, MUT_ATTACK_DISTANCE, 
                        MUT_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                        MUT_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   MUT_MAX_HP + DIFFICULTY_MUT_HP * game.difficulty, MUT_DEATH);

    this.hitshapes.push(new Circle(MUT_HITCIRCLE_X, MUT_HITCIRCLE_Y, MUT_HITCIRCLE_R * SCALE, this));

}

Mutalisk.prototype = Object.create(BotEntity.prototype);
Mutalisk.prototype.constructor = Mutalisk;

Mutalisk.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, MUT_SHEET_WIDTH, MUT_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, MUT_FIRST_FRAME_ANGLE, MUT_FRAME_INCREMENT, 1, 5, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, MUT_FIRST_FRAME_ANGLE, MUT_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, MUT_FIRST_FRAME_ANGLE, MUT_FRAME_INCREMENT, 1, 5, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Mutalisk.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 8;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 0, 8, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}
