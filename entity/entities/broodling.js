
function Broodling(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, BRO_FRAME_DIM, BRO_FRAME_DIM, SCALE, true);
    var ai = new BasicEnemyAI(this, BRO_VIEW_DISTANCE, BRO_ATTACK_DISTANCE, 
                              BRO_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                              BRO_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai,
                   BRO_MAX_HP + DIFFICULTY_BRO_HP * game.difficulty);

    this.hitshapes.push(new Box(BRO_HITBOX_X, BRO_HITBOX_Y, 
                                BRO_HITBOX_W * SCALE, BRO_HITBOX_H * SCALE, this));

}

Broodling.prototype = Object.create(BotEntity.prototype);
Broodling.prototype.constructor = Broodling;

Broodling.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, BRO_SHEET_WIDTH, BRO_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
	//animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration, loop
    animation.createVerticalAnimationStates(WALKING_ACTION, BRO_FIRST_FRAME_ANGLE, BRO_FRAME_INCREMENT, 1, 8, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, BRO_FIRST_FRAME_ANGLE, BRO_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, BRO_FIRST_FRAME_ANGLE, BRO_FRAME_INCREMENT, 9, 4, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Broodling.prototype.createDeathAnimation = function (deathSpriteSheet) {
	var numberOfAngles = 1;
    var sheetWidth = 8;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

	//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect
    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 0, 8, 0, .1, false, false);

    return deathAnimation;
}

Broodling.quickCreate = function(game, x, y){
    var broodling = new Broodling(x, y, game, AM.getAsset("./img/red_broodling.png"), AM.getAsset("./img/red_broodling.png"));
    broodling.init(game);
    return broodling;
}
