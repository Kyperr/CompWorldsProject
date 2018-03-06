
function Queen(x, y, game, spritesheet, deathSpriteSheet) {
	
	var death = randomBetweenTwoNumbers(1, 3);
	var deathSound = QUE_DEATH + death;
	
    //Super init
    var physics = new Physics(this, x, y, QUE_FRAME_DIM, QUE_FRAME_DIM, SCALE, true);
    var ai = new QueenAI(this, QUE_VIEW_DISTANCE, QUE_ATTACK_DISTANCE,
                            QUE_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                            QUE_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty, deathSound);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   QUE_MAX_HP + DIFFICULTY_QUE_HP * game.difficulty, deathSound);
    this.hitshapes.push(new Circle(QUE_HITCIRCLE_X, QUE_HITCIRCLE_Y, QUE_HITCIRCLE_R * SCALE, this));

    this.onDeathCallbacks.push(function () { 
        player.stats.healthPacks++;
    });
}

Queen.prototype = Object.create(BotEntity.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, QUE_SHEET_WIDTH, QUE_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
	//animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration, loop
    animation.createVerticalAnimationStates(WALKING_ACTION, QUE_FIRST_FRAME_ANGLE, QUE_FRAME_INCREMENT, 1, 11, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, QUE_FIRST_FRAME_ANGLE, QUE_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, QUE_FIRST_FRAME_ANGLE, QUE_FRAME_INCREMENT, 1, 1, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Queen.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 8;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

	//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect
    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 0, 8, 0, .1, false, false);

    return deathAnimation;
}
