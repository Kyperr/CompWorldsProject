function DefilerAI(entity, viewDistance, attackDistance, attacksPerSecond, movementSpeed) {
    AI.call(this, entity);

    //Constructor fields
    this.viewDistance = viewDistance;

    this.attackDistance = attackDistance;

    this.attacksPerSecond = attacksPerSecond;

    this.movementSpeed = movementSpeed;

    //Other instance fields.
    this.timeSinceLastAttack = 0;
    this.timeSinceLastMoved = 0;

    this.attackingSequence = 0;
    this.attackSeqTime = 0;

    //Spinshot specific.
    this.lastSpinShotStartAngle = 0;
}

DefilerAI.prototype = new BasicEnemyAI();
DefilerAI.prototype.constructor = DefilerAI;

DefilerAI.prototype.attack = function (delta) {

    this.attackSeqTime += delta;
    if (this.attackSeqTime >= DEF_ATTACK_TIME_CHANGE) {
        this.attackingSequence = randomBetweenTwoNumbers(0, 1);
        console.log("attack seqb: " + this.attackingSequence);
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
    var dstX = target.physics.x + ((target.physics.width / 2) * SCALE);
    var dstY = target.physics.y + ((target.physics.height / 2) * SCALE);

    var angle = calculateAngleRadians(dstX, dstY, srcX, srcY);

    var distance = Math.sqrt(Math.pow((srcX - dstX), 2) + Math.pow((srcY - dstY), 2));

    var interpSpeed = 10 * Math.PI / 180;
    var tolerance = 10 * Math.PI / 180;
    interpolate(this.entity, angle, interpSpeed, tolerance);

    if (this.timeSinceLastAttack >= (1 / this.attacksPerSecond)) {
        console.log("attack Seq: " + this.attackingSequence);
        if (this.attackingSequence == 0) {
            console.log("homing");
            this.fireHomingShots(delta, angle);
        } else if (this.attackingSequence == 1) {
            console.log("spin");
             this.fireSpinShots(delta, angle);
        }

        this.timeSinceLastAttack = 0;
    }
}

DefilerAI.prototype.fireHomingShots = function (delta, angle) {

    for (var i = 0; i < 3; i++) {
        var that = this;
        (() => {
            var startingAngle = (angle - Math.PI / 2) + (Math.PI / 2) * i;

            var startDirX = Math.cos(startingAngle);
            var startDirY = Math.sin(startingAngle);

            var bulletBehavior = function (bullet) {

                var physics = bullet.physics;
                var target = bullet.game.player;

                var srcX = physics.x + ((physics.width * physics.scale) / 2);
                var srcY = physics.y + ((physics.height * physics.scale) / 2);
                var dstX = target.physics.x + ((target.physics.width / 2) * SCALE);
                var dstY = target.physics.y + ((target.physics.height / 2) * SCALE);

                var targetAngle = calculateAngleRadians(dstX, dstY, srcX, srcY);

                //var currentAngle = bullet.physics.calculateFacingAngle() / 180 * Math.PI;

                var interpSpeed = .75 * Math.PI / 180;
                var tolerance = 10 * Math.PI / 180;

                interpolate(bullet, targetAngle, interpSpeed, tolerance);

                //Bullet.moveInDirection(bullet, Math.cos(currentAngle), Math.sin(currentAngle));
            }

            // Create a bullet
            var bullet = new Bullet(that.entity.game,
                that.entity.game.assetManager.getAsset("./img/homing_bullets.png"),
                that.entity, false, bulletBehavior);
            bullet.init(that.entity.game);
            bullet.physics.directionX = startDirX;
            bullet.physics.directionY = startDirY;
            bullet.physics.velocity = MAR_MOVE_SPEED * (.5);//lol "that.entity.game.player.physics.velocity"

            //console.log(bullet);
            that.entity.game.addBullet(bullet);

        })();
    }
}

DefilerAI.prototype.fireSpinShots = function (delta, angle) {
    var angleCount = 16;
    var firstAngle = this.lastSpinShotStartAngle + (Math.PI/angleCount);
    this.lastSpinShotStartAngle = firstAngle % (2 * Math.PI/angleCount);
    for (var i = 0; i < angleCount; i++) {
        var that = this;
        (() => {
            var aimAngle = firstAngle + 2*Math.PI - ((2 * Math.PI / angleCount) * i);

            var bulletBehavior = function (bullet) {
                Bullet.spiralOut(bullet, aimAngle);
            }

            var bullet = new Bullet(that.entity.game,
                that.entity.game.assetManager.getAsset("./img/oscillate_bullet.png"),
                that.entity, false, bulletBehavior);
            bullet.init(that.entity.game);
            bullet.duration = 10;
            bullet.physics.velocity /= 2;

            that.entity.game.addBullet(bullet);

        })();
    }
}

