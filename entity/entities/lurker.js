
function Lurker(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, LUR_FRAME_DIM, LUR_FRAME_DIM, SCALE, true);
    var ai = new BlockingWallAI(this, LUR_VIEW_DISTANCE, LUR_ATTACK_DISTANCE, LUR_ATTACKS_PER_SECOND, LUR_MOVE_SPEED);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   LUR_MAX_HP + DIFFICULTY_LUR_HP * game.difficulty);

    this.hitshapes.push(new Circle(LUR_HITCIRCLE_X, LUR_HITCIRCLE_Y, LUR_HITCIRCLE_R * SCALE, this));

}

Lurker.prototype = Object.create(BotEntity.prototype);
Lurker.prototype.constructor = Lurker;

Lurker.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, LUR_SHEET_WIDTH, LUR_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, LUR_FIRST_FRAME_ANGLE, LUR_FRAME_INCREMENT, 1, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, LUR_FIRST_FRAME_ANGLE, LUR_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, LUR_FIRST_FRAME_ANGLE, LUR_FRAME_INCREMENT, 1, 1, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Lurker.prototype.createDeathAnimation = function (deathSpriteSheet) {

    var deathAnimation = new Animation(this, deathSpriteSheet, LUR_SHEET_WIDTH, LUR_ANGLES, DYING_ACTION);

    deathAnimation.createVerticalAnimationStates(DYING_ACTION, LUR_FIRST_FRAME_ANGLE, LUR_FRAME_INCREMENT, 26, 10, .1, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}
