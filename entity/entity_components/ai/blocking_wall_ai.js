function BlockingWallAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
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

BlockingWallAI.prototype = new BasicEnemyAI();
BlockingWallAI.prototype.constructor = BlockingWallAI;

BlockingWallAI.prototype.attack = function (delta) {
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
		
        //Prediction processing
        var targetAngle = Math.atan2(target.physics.directionY, target.physics.directionX);
        var tVel = target.physics.velocity;
        var pTargetX = PhysicalEntity.getMiddleXOf(target) + (tVel * Math.cos(targetAngle));
        var pTargetY = PhysicalEntity.getMiddleYOf(target) - (tVel * Math.sin(targetAngle));
        
        var sideB = Math.sqrt(Math.pow((pTargetX - dstX), 2) + Math.pow((pTargetY - dstY), 2));//Not to be confused with angleB.
        var sideC = Math.sqrt(Math.pow((dstX - srcX), 2) + Math.pow((dstY - srcY), 2));//Not to be confused with angleC.
        var angleA = targetAngle - angle;//Measure of the angle between sides b and c.

        var sideA = BUL_MOVE_SPEED;//cosineRule(sideB, sideC, angleA);//This represents the distance between the enemy and where the player is predicted to be.

        var sinOfAngleB = sideB * Math.sin(angleA) / sideA;

        var angleB = Math.asin(sinOfAngleB);

        var angleToShoot = (angle + angleB);

        //Wall size processing
        var bulletNum = this.attackDistance / 32;//cosineRule(sideB, sideC, angleA) / 32;

        // Create a bullet(s)
        var that = this;

        for (var i = 0; i < bulletNum; i++) {
            (function () {

                var distanceToTravel = i * 32;

                var dirX = Math.cos(angleToShoot);
                var dirY = Math.sin(angleToShoot);

                var destX = srcX + (dirX * distanceToTravel);
                var destY = srcY + (dirY * distanceToTravel);
                
                var bulletBehavior = function (bullet) {

                    var midX = PhysicalEntity.getMiddleXOf(bullet);
                    var midY = PhysicalEntity.getMiddleYOf(bullet);
                    

                    var distanceTravelled = Math.sqrt(Math.pow((midX - srcX), 2) + Math.pow((midY - srcY), 2));
                    
                    if (distanceTravelled >= distanceToTravel) {
                        bullet.physics.velocity = 0;
                    } else {
                        bullet.physics.velocity = distanceToTravel * 2;
                    }
                    
                    Bullet.moveInDirection(bullet, dirX, dirY);
                }

                var bullet = new Bullet(that.entity.game,
                    that.entity.game.assetManager.getAsset("./img/prediction_bullet.png"),
                    that.entity, false, bulletBehavior);
                bullet.init(that.entity.game);
                that.entity.game.addBullet(bullet);
            })();
        }


        
        
        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}

/**
 * Will produce a value for "a" according to the cosine rule.
 */
function cosineRule(sideB, sideC, angleA) {
    var bSqr = Math.pow(sideB, 2);
    var cSqr = Math.pow(sideC, 2);
    var aSqr = (bSqr + cSqr) - (2 * sideB * sideC * Math.cos(angleA));

    return Math.sqrt(aSqr);
}