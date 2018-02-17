
function Hydralisk(x, y, game, spritesheet) {
	
    //Super init
    var physics = new Physics(this, x, y, HYD_FRAME_DIM, HYD_FRAME_DIM, SCALE, true);
    var ai = new BasicEnemyAI(this, HYD_VIEW_DISTANCE, HYD_ATTACK_DISTANCE, HYD_ATTACKS_PER_SECOND, HYD_MOVE_SPEED);
    BotEntity.call(this, game, spritesheet, physics, ai, HYD_MAX_HP);

    this.hitshapes.push(new Box(HYD_HITBOX_X, HYD_HITBOX_Y, 
                                HYD_HITBOX_W * SCALE, HYD_HITBOX_H * SCALE, this));

}

Hydralisk.prototype = Object.create(BotEntity.prototype);//new BotEntity();
Hydralisk.prototype.constructor = Hydralisk;

Hydralisk.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, HYD_SHEET_WIDTH, HYD_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, HYD_FIRST_FRAME_ANGLE, HYD_FRAME_INCREMENT, 6, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, HYD_FIRST_FRAME_ANGLE, HYD_FRAME_INCREMENT, 6, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, HYD_FIRST_FRAME_ANGLE, HYD_FRAME_INCREMENT, 1, 7, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}
