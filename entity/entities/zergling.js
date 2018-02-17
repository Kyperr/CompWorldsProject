function Zergling(game, spritesheet) {
	//get random x and y coordinates that are > 0 and < the canvas x and y
	var x = Math.floor(Math.random() * game.surfaceWidth);
	var y = Math.floor(Math.random() * game.surfaceHeight);
	
    //Super init
    var physics = new Physics(this, x, y, ZER_FRAME_DIM, ZER_FRAME_DIM, SCALE, true);

    //Sub init                  entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed
    var ai = new BasicEnemyAI(this, ZER_VIEW_DISTANCE, ZER_ATTACK_DISTANCE, ZER_ATTACKS_PER_SECOND, ZER_MOVE_SPEED);
    
    BotEntity.call(this, game, spritesheet, physics, ai, ZER_MAX_HP);
}

Zergling.prototype = new BotEntity();
Zergling.prototype.constructor = Zergling;

Zergling.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, ZER_SHEET_WIDTH, ZER_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, ZER_FIRST_FRAME_ANGLE, ZER_FRAME_INCREMENT, 6, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, ZER_FIRST_FRAME_ANGLE, ZER_FRAME_INCREMENT, 6, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, ZER_FIRST_FRAME_ANGLE, ZER_FRAME_INCREMENT, 1, 7, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}
