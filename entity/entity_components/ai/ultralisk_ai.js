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
    var tX = target.physics.x;
    var tY = target.physics.y;

    //Distance between target and self.
    var sX = this.entity.physics.x;
    var sY = this.entity.physics.y;
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
    var tX = target.physics.x;
    var tY = target.physics.y;

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

    var srcX = physics.x + ((physics.width * physics.scale) / 2);
    var srcY = physics.y + ((physics.height * physics.scale) / 2);
    var dstX = target.physics.x + (target.physics.width / 2) * SCALE;
    var dstY = target.physics.y + (target.physics.height / 2) * SCALE;

    var distance = Math.abs((srcX - dstX) + (srcY - dstY));

    var angle = calculateAngleRadians(dstX, dstY, srcX, srcY);

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
		this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";

        //var dirX = Math.cos(angle);
        //var dirY = Math.sin(angle);

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

        }

        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
