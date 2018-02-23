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

UltralistkAI.prototype = new AI();
UltralistkAI.prototype.constructor = UltralistkAI;

UltralistkAI.prototype.update = function () {
    var delta = this.entity.game.clockTick;


    this.timeSinceLastAttack += delta;
    this.timeSinceLastMoved += delta;

    //Getting target location
    var target = this.entity.game.player;
    var tX = PhysicalEntity.getMiddleXOf(target);
    var tY = PhysicalEntity.getMiddleYOf(target);

    //Distance between target and self.

    var sX = this.entity.physics.x + ((this.entity.physics.width * SCALE) / 2);
    var sY = this.entity.physics.y + ((this.entity.physics.height * SCALE) / 2);

    var distance = Math.sqrt(Math.pow((tX - sX), 2) + Math.pow((tY - sY), 2));

    if (distance < this.viewDistance) {
        if (distance > this.attackDistance - 5) {
            this.timeSinceLastMoved = 0;
            this.moveTowards(tX, tY);
        } else {
            if (this.timeSinceLastMoved > .5) {
                this.attack(delta);
            }
        }
    } else {
		this.entity.physics.velocity = 0;
		this.entity.animation.currentAction = "standing";
	}

    Entity.prototype.update.call(this);
    this.entity.lastUpdated = this.entity.game.gameTime;
}


UltralistkAI.prototype.moveTowards = function (tX, tY) {

    //This is super rudimentary. If we add obstacles, we will need to make a more complex algorithm.

    var physics = this.entity.physics;

    var angle = calculateAngleRadians(tX, tY, physics.x, physics.y);


    //Getting target location
    var target = this.entity.game.player;
    var tX = PhysicalEntity.getMiddleXOf(target);
    var tY = PhysicalEntity.getMiddleYOf(target);

    //10 degrees in radians. Fairly fast. This is a magic number and should be standardized.
    var interpSpeed = 10 * Math.PI / 180;

    var tolerance = 10 * Math.PI / 180;

    if (interpolate(this.entity, angle, interpSpeed, tolerance)) {
        physics.velocity = this.movementSpeed;
    }
    //Idk, maybe this should be inside the interp check.
    this.entity.animation.currentAction = "walking";
}

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

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
		this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";

        //var dirX = Math.cos(angle);
        //var dirY = Math.sin(angle);

		var sweepWidth = Math.PI;
        var that = this;
		for(var i = 1; i <= 3; i++){
			(function(){
				
				var distance = i * 25;
				
				var startX = PhysicalEntity.getMiddleXOf(that.entity) + (distance * Math.cos(angle - (sweepWidth / 2)));
				var startY = PhysicalEntity.getMiddleYOf(that.entity) + (distance * Math.sin(angle - (sweepWidth / 2)));
				
				var startAngle = calculateAngleRadians(dstX, dstY, startX, startY);
				
				var bulletBehavior = function (bullet) {
                    Bullet.sweep(bullet, startAngle, distance, sweepWidth);
                }

                // Create a bullet
                var bullet = new Bullet(that.entity.game,
                    that.entity.game.assetManager.getAsset("./img/enemy_bullet.png"),
                    that.entity, false, bulletBehavior);
					
					bullet.physics.x = startX;
					bullet.physics.t = startY;
					
                bullet.init(that.entity.game);

                that.entity.game.addBullet(bullet);
				
			})();
		}
		/*
        for (var i = 0; i < 8; i++) {
            //Oh my god. Javascript is an absolute abomination.
            var that = this;
            (function () {

                var startAngle = i * (Math.PI / 4);

                var bulletBehavior = function (bullet) {
                    Bullet.spiral(bullet, startAngle);
                }

                // Create a bullet
                var bullet = new Bullet(that.entity.game,
                    that.entity.game.assetManager.getAsset("./img/enemy_bullet.png"),
                    that.entity, false, bulletBehavior);
                bullet.init(that.entity.game);

                that.entity.game.addBullet(bullet);
            })();

        }*/

        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
