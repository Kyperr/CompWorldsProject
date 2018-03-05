function PredictionAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
    AI.call(this, entity);

    //Constructor fields
    this.viewDistance = viewDistance;

    this.attackDistance = attackDistance;

    this.attacksPerSecond = attacksPerSecond;

    this.movementSpeed = movementSpeed;

    //Other instance fields.
    this.timeSinceLastAttack = 0;
    this.timeSinceLastMoved = 0;
}

PredictionAI.prototype = new BasicEnemyAI();
PredictionAI.prototype.constructor = PredictionAI;

PredictionAI.prototype.attack = function (delta) {
    //This will be done outside the loop so the enemy appears to
    //"track" the player even when the enemy isn't shooting.

    var physics = this.entity.physics;

    physics.velocity = 0;
	
	var attackAnimationTime = .35;//Magic numbers, YAY!
    if (this.timeSinceLastAttack > attackAnimationTime) {
		this.entity.animation.currentAction = "standing";
	}

    var target = this.entity.game.player;

    var srcX = PhysicalEntity.getMiddleXOf(this.entity);// physics.x + ((physics.width * physics.scale) / 2);
    var srcY = PhysicalEntity.getMiddleYOf(this.entity);//physics.y + ((physics.height * physics.scale) / 2);
    var dstX = PhysicalEntity.getMiddleXOf(target);//target.physics.x + (target.physics.width / 2) * SCALE;
    var dstY = PhysicalEntity.getMiddleYOf(target);//target.physics.y + (target.physics.height / 2) * SCALE;

    var angle = calculateAngleRadians(dstX, dstY, srcX, srcY);
    var angleVariance = 45 / 180 * Math.PI;

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
		this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";
        
        //Prediction vars
        var targetAngle = Math.atan2(target.physics.directionY, target.physics.directionX);
        var tVel = target.physics.velocity;
        var pTargetX = PhysicalEntity.getMiddleXOf(target) + (tVel * Math.cos(targetAngle));
        var pTargetY = PhysicalEntity.getMiddleYOf(target) - (tVel * Math.sin(targetAngle));
        
        var sideB = Math.sqrt(Math.pow((pTargetX - dstX), 2) + Math.pow((pTargetY - dstY), 2));//Not to be confused with angleB.
        var sideC = Math.sqrt(Math.pow((dstX - srcX), 2) + Math.pow((dstY - srcY), 2));//Not to be confused with angleC.
        var angleA = targetAngle - angle;//Measure of the angle between sides b and c.

        //var sideA = BUL_MOVE_SPEED;//cosineRule(sideB, sideC, angleA);//This represents the distance between the enemy and where the player is predicted to be.
        var sideA = BUL_MOVE_SPEED + DIFFICULTY_BUL_SPEED * this.entity.game.difficulty; 

        var sinOfAngleB = sideB * Math.sin(angleA) / sideA;

        var angleB = Math.asin(sinOfAngleB);

        var angleToShoot = (angle + angleB);

        // Create a bullet(s)
		
        //Bullet 1
        var dirX = Math.cos(angleToShoot);
        var dirY = Math.sin(angleToShoot);

        var bulletBehavior = function (bullet) {
            Bullet.moveInDirection(bullet, dirX, dirY);
            //Bullet.oscillate(bullet, angleToShoot, null);
        }

        var bullet1 = new Bullet(this.entity.game,
            this.entity.game.assetManager.getAsset("./img/prediction_bullet.png"),
            this.entity, false, bulletBehavior);
        bullet1.init(this.entity.game);
        this.entity.game.addBullet(bullet1);
        
        
        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
