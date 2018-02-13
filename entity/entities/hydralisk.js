
function Hydralisk(game, spritesheet) {


    //Super init
    var physics = new Physics(this, 400, 100, 128, 128, 2, true);

    PhysicalEntity.call(this, game, game.ctx, spritesheet, physics);

    //Sub init                  entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed
    this.ai = new BasicEnemyAI(this, HYD_VIEW_DISTANCE, HYD_ATTACK_DISTANCE, HYD_ATTACKS_PER_SECOND, HYD_MOVE_SPEED);
    
}

Hydralisk.prototype = new BotEntity();
Hydralisk.prototype.constructor = Hydralisk;

Hydralisk.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 16;
    var sheetWidth = 17;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, 90, 2, 6, 7, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, 90, 2, 6, 1, .1);
    animation.createVerticalAnimationStates(ATTACK_ACTION, 90, 2, 1, 7, .1);//Should calculate the duration to sync up with attacks!!!

    return animation;
}