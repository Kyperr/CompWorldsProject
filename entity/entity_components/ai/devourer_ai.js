function DevourerAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
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

DevourerAI.prototype = new BasicEnemyAI();
DevourerAI.prototype.constructor = DevourerAI;

DevourerAI.prototype.attack = function (delta) {
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

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
		this.entity.animation.elapsedTime = 0;
        this.entity.animation.currentAction = "attacking";

        // Create a bullet(s)

        var angleCount = 8;
        for (var i = 0; i < 8; i++){
            var that = this;
            (function () {

                var aimAngle = angle + (i * 2 * Math.PI / angleCount);

                var bulletBehavior = function (bullet) {
                    Bullet.oscillate(bullet, aimAngle, distance);
                    //Bullet.oscillate(bullet, aimAngle, distance);
                }

                var bullet = new Bullet(that.entity.game,
                    that.entity.game.assetManager.getAsset("./img/oscillate_bullet.png"),
                    that.entity, false, bulletBehavior);
                bullet.physics.velocity = (BUL_MOVE_SPEED + DIFFICULTY_BUL_SPEED * bullet.game.difficulty) * (2 / 3);
                bullet.init(that.entity.game);
                that.entity.game.addBullet(bullet);
            })();
        }
        // Reset timeSinceLastShot
        this.timeSinceLastAttack = 0;
    }
}
