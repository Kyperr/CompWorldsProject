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
PredictionAI.prototype.constructor = DevourerAI;

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
		
		//Predicted X and Y
		var targetAngle = Math.atan2(target.physics.directionY, target.physics.directionX);
		var pTargetX = target.physics.velocity * Math.cos(targetAngle);
		var pTargetY = target.physics.velocity * Math.sin(targetAngle);
		
        // Create a bullet(s)
		
        //Bullet 1
        var dirX = Math.cos(angle);
        var dirY = Math.sin(angle);

        var bulletBehavior = function (bullet) {
            Bullet.moveInDirection(bullet, dirX, dirY);
        }

        var bullet1 = new Bullet(this.entity.game,
            this.entity.game.assetManager.getAsset("./img/enemy_bullet.png"),
            this.entity, false, bulletBehavior1);
        bullet1.init(this.entity.game);
        this.entity.game.addBullet(bullet1);
        
        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
