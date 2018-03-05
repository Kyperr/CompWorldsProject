
function InfestedTerran(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, INF_FRAME_DIM, INF_FRAME_DIM, SCALE, true);
    var ai = new KamikazeAI(this, INF_VIEW_DISTANCE, INF_ATTACK_DISTANCE, 
                              INF_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                              INF_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai,
                   INF_MAX_HP + DIFFICULTY_INF_HP * game.difficulty, INF_DEATH);

    this.hitshapes.push(new Box(INF_HITBOX_X, INF_HITBOX_Y, 
                                INF_HITBOX_W * SCALE, INF_HITBOX_H * SCALE, this));

}

InfestedTerran.prototype = Object.create(BotEntity.prototype);
InfestedTerran.prototype.constructor = InfestedTerran;

InfestedTerran.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, INF_SHEET_WIDTH, INF_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
	//animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration, loop
    animation.createVerticalAnimationStates(WALKING_ACTION, INF_FIRST_FRAME_ANGLE, INF_FRAME_INCREMENT, 1, 8, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, INF_FIRST_FRAME_ANGLE, INF_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, INF_FIRST_FRAME_ANGLE, INF_FRAME_INCREMENT, 1, 1, .1);

    return animation;
}

InfestedTerran.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 17;
    var firstFrameAngle = 90;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    //Really should do away with these magic numbers.
	//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect
    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 1, 14, 8, 0, .1, false, false);

    return deathAnimation;
}

InfestedTerran.quickCreate = function(game, x, y){
    var terran = new InfestedTerran(x, y, game, AM.getAsset("./img/red_infested_terran.png"), AM.getAsset("./img/red_infested_terran.png"));
    terran.init(game);
    return terran;
}
