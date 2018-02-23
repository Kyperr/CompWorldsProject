function UltralistkAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
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

UltralistkAI.prototype = new BasicEnemyAI();
UltralistkAI.prototype.constructor = UltralistkAI;

UltralistkAI.prototype.attack = function (delta) {
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
	console.log("angle to player: " + angle);

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
		this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";

        //var dirX = Math.cos(angle);
        //var dirY = Math.sin(angle);

		var sweepWidth = Math.PI / 2;
        var that = this;
		for(var i = 1; i <= 3; i++){
			//Right swipe
			(function(){
				
				var distance = i * 50;
				
				//console.log("sin: " + Math.cos(angle - (sweepWidth / 2)));
				var startX = PhysicalEntity.getMiddleXOf(that.entity) + (distance * Math.cos(angle - sweepWidth));
				//console.log("cos: " + Math.sin(angle - (sweepWidth / 2)));
				var startY = PhysicalEntity.getMiddleYOf(that.entity) - (distance * Math.sin(angle - sweepWidth));
				//console.log("bullet" + i + " startX" + startX);
				
				var startAngle = calculateAngleRadians(dstX, dstY, startX, startY);
				//console.log("start angle: " + startAngle);
				
				var bulletBehavior = function (bullet) {
                    Bullet.sweepCCW(bullet, angle, distance, sweepWidth);
                }

                // Create a bullet
                var bullet = new Bullet(that.entity.game,
                    that.entity.game.assetManager.getAsset("./img/swipe_bullet.png"),
                    that.entity, false, bulletBehavior);
					
					bullet.physics.x = startX - (bullet.physics.width / 2);
					bullet.physics.y = startY - (bullet.physics.height / 2);
					
                bullet.init(that.entity.game);

                that.entity.game.addBullet(bullet);
				
			})();
			
			//Left Swipe
			(function(){
				
				var distance = i * 50;
				
				//console.log("sin: " + Math.cos(angle - (sweepWidth / 2)));
				var startX = PhysicalEntity.getMiddleXOf(that.entity) - (distance * Math.cos(angle - sweepWidth));
				//console.log("cos: " + Math.sin(angle - (sweepWidth / 2)));
				var startY = PhysicalEntity.getMiddleYOf(that.entity) + (distance * Math.sin(angle - sweepWidth));
				//console.log("bullet" + i + " startX" + startX);
				
				var startAngle = calculateAngleRadians(dstX, dstY, startX, startY);
				//console.log("start angle: " + startAngle);
				
				var bulletBehavior = function (bullet) {
                    Bullet.sweepCW(bullet, angle, distance, sweepWidth);
                }

                // Create a bullet
                var bullet = new Bullet(that.entity.game,
                    that.entity.game.assetManager.getAsset("./img/swipe_bullet.png"),
                    that.entity, false, bulletBehavior);
					
					bullet.physics.x = startX - (bullet.physics.width / 2);
					bullet.physics.y = startY - (bullet.physics.height / 2);
					
                bullet.init(that.entity.game);

                that.entity.game.addBullet(bullet);
				
			})();
		}

        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
