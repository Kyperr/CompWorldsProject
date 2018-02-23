function FlackAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
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

FlackAI.prototype = new BasicEnemyAI();
FlackAI.prototype.constructor = FlackAI;

FlackAI.prototype.attack = function (delta) {
    //This will be done outside the loop so the enemy appears to
    //"track" the player even when the enemy isn't shooting.

    var physics = this.entity.physics;

    physics.velocity = 0;
	
	var attackAnimationTime = .35;//Magic numbers, YAY!
    if (this.timeSinceLastAttack > attackAnimationTime) {
		this.entity.animation.currentAction = "standing";
	}

    var target = this.entity.game.player;

    var srcX = PhysicalEntity.getMiddleXOf(this.entity);
    var srcY = PhysicalEntity.getMiddleYOf(this.entity);
    var dstX = PhysicalEntity.getMiddleXOf(target);
    var dstY = PhysicalEntity.getMiddleYOf(target);
	
	var angle = calculateAngleRadians(dstX, dstY, srcX, srcY);

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
		this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";

        //Master bullet vars
        var dirX = Math.cos(angle);
        var dirY = Math.sin(angle);

        //Sub-bullet variables:
        var spiralRadius = 35;
        var that = this;

        var bulletBehavior = function (bullet) {
            Bullet.moveInDirection(bullet, dirX, dirY);

            //If at position player was at when launched, explode.
            var xDiff = PhysicalEntity.getMiddleXOf(bullet) - dstX;
            var yDiff = PhysicalEntity.getMiddleYOf(bullet) - dstY;
            var distance = Math.sqrt(Math.pow((xDiff), 2) + Math.pow((yDiff), 2));
            console.log("distance from x: " + dstX + " y: " + dstY + " is " + distance);

            if (distance < 10 || bullet.timeExist > bullet.duration) {
                this.removeFromWorld = true;
                var masterBullet = bullet;
                for (var i = 1; i <= 8; i++) {
                    //Spawn a child
                    (function () {
                        var startAngle = i * Math.PI / 4;
                        var bulletBehavior = function (bullet) {
                            Bullet.fallBack(bullet, startAngle, spiralRadius);
                        }
                        var bullet = new Bullet(that.entity.game,
                            that.entity.game.assetManager.getAsset("./img/fallout_bullets.png"),
                            masterBullet, false, bulletBehavior);

                        bullet.init(that.entity.game);

                        that.entity.game.addBullet(bullet);

                    })();
                }
            }
        }

        // Create a bullet
        var bullet = new Bullet(this.entity.game,
            this.entity.game.assetManager.getAsset("./img/payload_bullets.png"),
            this.entity, false, bulletBehavior);
        bullet.init(this.entity.game);

        bullet.physics.velocity = BUL_MOVE_SPEED;

        this.entity.game.addBullet(bullet);
        
        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
