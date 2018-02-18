
function Mutalisk(x, y, game, spritesheet) {
	
    //Super init
    var physics = new Physics(this, x, y, MUT_FRAME_DIM, MUT_FRAME_DIM, SCALE, true);
    var ai = new BasicEnemyAI(this, MUT_VIEW_DISTANCE, MUT_ATTACK_DISTANCE, MUT_ATTACKS_PER_SECOND, MUT_MOVE_SPEED);
    BotEntity.call(this, game, spritesheet, physics, ai, MUT_MAX_HP);

    this.hitshapes.push(new Box(MUT_HITBOX_X, MUT_HITBOX_Y, 
                                MUT_HITBOX_W * SCALE, MUT_HITBOX_H * SCALE, this));

}

Mutalisk.prototype = Object.create(BotEntity.prototype);//new BotEntity();
Mutalisk.prototype.constructor = Mutalisk;

Mutalisk.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, MUT_SHEET_WIDTH, MUT_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, MUT_FIRST_FRAME_ANGLE, MUT_FRAME_INCREMENT, 1, 5, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, MUT_FIRST_FRAME_ANGLE, MUT_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, MUT_FIRST_FRAME_ANGLE, MUT_FRAME_INCREMENT, 1, 5, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}
