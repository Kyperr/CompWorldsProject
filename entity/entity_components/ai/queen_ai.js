function QueenAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
    AI.call(this, entity);

    //Constructor fields
    this.viewDistance = viewDistance;

    this.attackDistance = attackDistance;

    this.attacksPerSecond = attacksPerSecond;

    this.movementSpeed = movementSpeed;

    this.attackingSequence = 0;
    this.attackSeqTime = 0;

    //Other instance fields.
    this.timeSinceLastAttack = 0;
    this.timeSinceLastMoved = 0;

    this.broodlingCount = 0;
}

QueenAI.prototype = new BasicEnemyAI();
QueenAI.prototype.constructor = QueenAI;

QueenAI.prototype.attack = function (delta) {
    this.attackSeqTime += delta;

    if (this.attackSeqTime >= QUE_PHASE_LENGTH) {
        if (this.attackingSequence == 0) {
            this.attackingSequence = 1;
        } else if (this.attackingSequence == 1) {
            this.attackingSequence = 0;
            this.entity.game.player.scrambled = false;
        }

        this.attackSeqTime = 0;
    }

    //This will be done outside the loop so the enemy appears to
    //"track" the player even when the enemy isn't shooting.

    var physics = this.entity.physics;

    physics.velocity = 0;

    var attackAnimationTime = .35;//Magic numbers, YAY!
    if (this.timeSinceLastAttack > attackAnimationTime) {
        this.entity.animation.currentAction = "standing";
    }

    var target = this.entity.game.player;

    var srcX = physics.x + ((physics.width * physics.scale) / 2);
    var srcY = physics.y + ((physics.height * physics.scale) / 2);
    var dstX = target.physics.x + (target.physics.width / 2) * SCALE;
    var dstY = target.physics.y + (target.physics.height / 2) * SCALE;

    var distance = Math.sqrt(Math.pow((srcX - dstX), 2) + Math.pow((srcY - dstY), 2));

    var angle = calculateAngleRadians(dstX, dstY, srcX, srcY);

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.attackingSequence == 0) {
        this.spawnBroodlings(angle);
    } else if (this.attackingSequence == 1) {
        this.scramblePlayer(angle);
    }
}

QueenAI.prototype.spawnBroodlings = function (angle) {
    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
        this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";

        if (this.broodlingCount < MAX_BROODLINGS) {
            //this.fireBroodling(angle);
            this.broodlingCount++;
        }

        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}

QueenAI.prototype.scramblePlayer = function (angle) {
    if (!this.entity.game.player.scrambled) {
        this.entity.game.player.scrambled = true;
    } 
}

QueenAI.prototype.fireBroodling = function (angle) {
    var game = this.entity.game;
    var x = PhysicalEntity.getMiddleXOf(this.entity) - (BRO_FRAME_DIM / 2);
    var y = PhysicalEntity.getMiddleYOf(this.entity) - (BRO_FRAME_DIM / 2);
    var broodling = new Broodling(x, y, game, AM.getAsset("./img/red_broodling.png"), AM.getAsset("./img/bro_zairdths.png"));
    broodling.onDeathCallbacks.push(() => {this.broodlingCount--});
    broodling.init(game);
    broodling.physics.directionX = Math.cos(Math.PI);
    broodling.physics.directionY = Math.sin(Math.PI);
    game.addEnemy(broodling);
}
