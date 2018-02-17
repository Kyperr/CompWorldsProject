
function Devourer(game, spritesheet) {
	
	//get random x and y coordinates that are > 0 and < the canvas x and y
	var x = Math.floor(Math.random() * game.surfaceWidth);
	var y = Math.floor(Math.random() * game.surfaceHeight);
	
    //Super init
    var physics = new Physics(this, x, y, DEV_FRAME_DIM, DEV_FRAME_DIM, SCALE, true);
    var ai = new BasicEnemyAI(this, DEV_VIEW_DISTANCE, DEV_ATTACK_DISTANCE, DEV_ATTACKS_PER_SECOND, DEV_MOVE_SPEED);
    BotEntity.call(this, game, spritesheet, physics, ai, DEV_MAX_HP);
    this.hitshapes.push(new Circle(DEV_HITCIRCLE_X, DEV_HITCIRCLE_Y, DEV_HITCIRCLE_R * SCALE, this));
}

Devourer.prototype = Object.create(BotEntity.prototype);
Devourer.prototype.constructor = Devourer;

Devourer.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, DEV_SHEET_WIDTH, DEV_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 1, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, DEV_FIRST_FRAME_ANGLE, DEV_FRAME_INCREMENT, 7, 3, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}
