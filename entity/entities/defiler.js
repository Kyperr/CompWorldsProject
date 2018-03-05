
function Defiler(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, DEF_FRAME_DIM, DEF_FRAME_DIM, SCALE, true);
    var ai = new DefilerAI(this, DEF_VIEW_DISTANCE, DEF_ATTACK_DISTANCE,
                            DEF_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                            DEF_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   DEF_MAX_HP + DIFFICULTY_DEF_HP * game.difficulty);
     this.hitshapes.push(new Box(DEF_HITBOX_X, DEF_HITBOX_Y, 
                                DEF_HITBOX_W * SCALE, DEF_HITBOX_H * SCALE, this));
}

Defiler.prototype = Object.create(BotEntity.prototype);
Defiler.prototype.constructor = Defiler;

Defiler.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, DEF_SHEET_WIDTH, DEF_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
	//animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration, loop
    animation.createVerticalAnimationStates(WALKING_ACTION, DEF_FIRST_FRAME_ANGLE, DEF_FRAME_INCREMENT, 1, 8, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, DEF_FIRST_FRAME_ANGLE, DEF_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, DEF_FIRST_FRAME_ANGLE, DEF_FRAME_INCREMENT, 1, 1, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Defiler.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var deathAnimation = new Animation(this, deathSpriteSheet, DEF_SHEET_WIDTH, DEF_ANGLES, DYING_ACTION);

	//animationName, firstFrameAngle, frameIncrement, xIndex, frameCount, frameDuration, loop
    deathAnimation.createVerticalAnimationStates(DYING_ACTION, DEF_FIRST_FRAME_ANGLE, DEF_FRAME_INCREMENT, 9, 4, .175, false);

    return deathAnimation;
}
