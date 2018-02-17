
function Devourer(x, y, game, spritesheet) {
	
    //Super init
    var physics = new Physics(this, x, y, DEV_FRAME_DIM, DEV_FRAME_DIM, SCALE, true);


    //Sub init                  entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed
    var ai = new BasicEnemyAI(this, DEV_VIEW_DISTANCE, DEV_ATTACK_DISTANCE, DEV_ATTACKS_PER_SECOND, DEV_MOVE_SPEED);
    
    BotEntity.call(this, game, spritesheet, physics, ai, DEV_MAX_HP);
}

Devourer.prototype = new BotEntity();
Devourer.prototype.constructor = Devourer;

Devourer.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, DEV_SHEET_WIDTH, DEV_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 1, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 7, 3, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}
