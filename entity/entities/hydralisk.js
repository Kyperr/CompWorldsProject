
function Hydralisk(x, y, game, spritesheet, deathSpriteSheet) {
	
    //Super init
    var physics = new Physics(this, x, y, HYD_FRAME_DIM, HYD_FRAME_DIM, SCALE, true);
    var ai = new HydraliskAI(this, HYD_VIEW_DISTANCE, HYD_ATTACK_DISTANCE, 
                              HYD_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                              HYD_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai,
                   HYD_MAX_HP + DIFFICULTY_HYD_HP * game.difficulty, HYD_DEATH);

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

Hydralisk.prototype.createDeathAnimation = function (deathSpriteSheet) {

    var deathAnimation = new Animation(this, deathSpriteSheet, HYD_SHEET_WIDTH, 1, DYING_ACTION);

    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 1, 12, 8, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}

Hydralisk.quickCreate = function(game, x, y){
    var hydralisk = new Hydralisk(x, y, game, AM.getAsset("./img/red_hydralisk.png"), AM.getAsset("./img/red_hydralisk.png"));
    hydralisk.init(game);
    return hydralisk;
}
