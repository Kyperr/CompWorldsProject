function Zergling(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, ZER_FRAME_DIM, ZER_FRAME_DIM, SCALE, true);
    var ai = new BasicEnemyAI(this, ZER_VIEW_DISTANCE, ZER_ATTACK_DISTANCE, 
                              ZER_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                              ZER_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);

    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   ZER_MAX_HP + DIFFICULTY_ZER_HP * game.difficulty);

    this.hitshapes.push(new Box(ZER_HITBOX_X, ZER_HITBOX_Y, 
                                ZER_HITBOX_W * SCALE, ZER_HITBOX_H * SCALE, this));
}

Zergling.prototype = Object.create(BotEntity.prototype);
Zergling.prototype.constructor = Zergling;

Zergling.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, ZER_SHEET_WIDTH, ZER_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, ZER_FIRST_FRAME_ANGLE, ZER_FRAME_INCREMENT, 6, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, ZER_FIRST_FRAME_ANGLE, ZER_FRAME_INCREMENT, 6, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, ZER_FIRST_FRAME_ANGLE, ZER_FRAME_INCREMENT, 1, 7, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Zergling.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 17;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);
    
    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 1, 17, 7, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect
    
    return deathAnimation;
}
