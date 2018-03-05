
function Scourge(x, y, game, spritesheet, deathSpriteSheet) {
    //Super init
    var physics = new Physics(this, x, y, SCO_FRAME_DIM, SCO_FRAME_DIM, SCALE, true);
    var ai = new BasicEnemyAI(this, SCO_VIEW_DISTANCE, SCO_ATTACK_DISTANCE, 
                              SCO_ATTACKS_PER_SECOND + DIFFICULTY_ATTACKS_PER_SECOND * game.difficulty, 
                              SCO_MOVE_SPEED + DIFFICULTY_MOVE_SPEED * game.difficulty);
    BotEntity.call(this, game, spritesheet, deathSpriteSheet, physics, ai, 
                   SCO_MAX_HP + DIFFICULTY_SCO_HP * game.difficulty, SCO_DEATH);
    this.hitshapes.push(new Circle(SCO_HITCIRCLE_X, SCO_HITCIRCLE_Y, SCO_HITCIRCLE_R * SCALE, this));
}

Scourge.prototype = Object.create(BotEntity.prototype);
Scourge.prototype.constructor = Scourge;

Scourge.prototype.createAnimation = function (spritesheet) {

    var animation = new Animation(this, spritesheet, SCO_SHEET_WIDTH, SCO_ANGLES, STANDING_ACTION);

    //Really should do away with these magic numbers.
	//animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration, loop
    animation.createVerticalAnimationStates(WALKING_ACTION, SCO_FIRST_FRAME_ANGLE, SCO_FRAME_INCREMENT, 1, 5, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, SCO_FIRST_FRAME_ANGLE, SCO_FRAME_INCREMENT, 1, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, SCO_FIRST_FRAME_ANGLE, SCO_FRAME_INCREMENT, 1, 1, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}

Scourge.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 8;
    var firstFrameAngle = 0;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

	//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect
    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 0, 0, 8, 0, .1, false, false);

    return deathAnimation;
}

Scourge.quickCreate = function(game, x, y){
    var scourge = new Scourge(x, y, game, AM.getAsset("./img/red_scourge.png"), AM.getAsset("./img/sco_zairdths.png"));
    scourge.init(game);
    return scourge;
}