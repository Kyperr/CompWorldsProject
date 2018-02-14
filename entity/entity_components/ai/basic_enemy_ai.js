function BasicEnemyAI(entity, attacksPerSecond, pauseAfterAttack) {
    console.log("entity: " + entity);
    AI.call(this, entity);

    this.timeSinceLastAttack = 0;

    this.pauseAfterAttack = pauseAfterAttack;

    this.attacksPerSecond = attacksPerSecond;
}

BasicEnemyAI.prototype = new AI();
BasicEnemyAI.prototype.constructor = BasicEnemyAI;

BasicEnemyAI.prototype.update = function () {
    var delta = this.entity.game.clockTick;
    var moveFac = this.entity.movementFactor;


    this.timeSinceLastAttack += delta;


    if (this.timeSinceLastAttack >= 1 / this.entity.attacksPerSecond) {

        this.attack(delta);

    } else if (moveFac.getDirectionalAngle == 0 || this.timeSinceLastAttack * 1000 < this.pauseAfterAttack) {

        this.entity.animation.currentAction = "standing";

    } else {
        this.updateDirection();
        var angleToFace = moveFac.getDirectionalAngle();
        if (interpolate(this.entity, angleToFace, 8)) {
            this.entity.trueAngle = angleToFace;
            this.walk(delta);
        }
    }

    Entity.prototype.update.call(this);
    this.entity.lastUpdated = this.entity.game.gameTime;
}


BasicEnemyAI.prototype.updateDirection = function () {

    this.entity.changeTime += this.entity.game.clockTick;
    if (this.entity.changeTime >= 0.5) {
        this.entity.changeTime = 0;
        //random movement
        var dir = Math.floor(Math.random() * (4));
        //0=n 1=e 2=s 3=w
        this.entity.movementFactor.reset();
        switch (dir) {
            case 0:
                this.entity.movementFactor.north = 1;
                break;
            case 1:
                this.entity.movementFactor.east = 1;
                break;
            case 2:
                this.entity.movementFactor.south = 1;
                break;
            case 3:
                this.entity.movementFactor.west = 1;
                break;
        }
    }
}

BasicEnemyAI.prototype.walk = function (delta) {
    var anim = this.entity.animation;

    var moveFac = this.entity.movementFactor;

    var speed = moveFac.speed;

    this.entity.animation.currentAction = "walking";

    //Direction

    var newX = this.entity.x + delta * speed * moveFac.getHorizontalDirection();
    var newY = this.entity.y - delta * speed * moveFac.getVerticalDirection();

    if (newX + (anim.frameWidth * anim.scale) <= this.entity.game.ctx.canvas.width && newX > 0) {
        this.entity.x = newX;
    } else {
        this.entity.trueAngle = this.entity.movementFactor.reflect();
    }
    if (newY + (anim.frameHeight * anim.scale) <= this.entity.game.ctx.canvas.height && newY > 0) {
        this.entity.y = newY;
    } else {
        this.entity.trueAngle = this.entity.movementFactor.reflect();
    }
}

BasicEnemyAI.prototype.attack = function (delta) {

    // If it's time to create another bullet...
    // (secondsBetweenShots = 1 / shotsPerSecond)
    if (this.timeSinceLastAttack >= (1 / this.entity.attacksPerSecond)) {
        var player = this.entity.game.entities[1];
        var anim = this.entity.animation;

        var srcX = this.entity.x + ((anim.frameWidth * anim.scale) / 2);
        var srcY = this.entity.y + ((anim.frameHeight * anim.scale) / 2);
        var dstX = player.x;
        var dstY = player.y;

        var angleToPlayer = calculateAngle(dstX, dstY, srcX, srcY);

        //this.entity.trueAngle = angleToFace;
        console.log("angle to player: " + angleToPlayer);

        //Interpolate. If interpolate returns true (interpolation complete) then create bullet.
        if (interpolate(this.entity, angleToPlayer, 8)) {
            this.entity.animation.currentAction = "attacking";
            // Create a bullet
            var bullet = new Bullet(this.entity.game,
                this.entity.game.assetManager.getAsset("./img/enemy_bullet.png"),
                this.entity, true, angleToPlayer);
            this.entity.game.addEntity(bullet);
            // Reset timeSinceLastShot
            this.timeSinceLastAttack = 0;
        }
    }
}