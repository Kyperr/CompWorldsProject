function Bullet(game, spritesheet, creator, fromPlayer, directionX, directionY) {
    /*Super init*/
    var physics = new Physics(this, 0, 0, 32, 32, 1, true);
    physics.directionX = directionX;
    physics.directionY = directionY;
    physics.velocity = BUL_MOVE_SPEED;
    
    PhysicalEntity.call(this, game, spritesheet, physics);
    
    /*Sub init*/
    this.isPlayerBullet = fromPlayer;

    this.debug_timeExist = 0;

    //Position
    var creatorCenterX = creator.physics.x + (creator.physics.width * creator.physics.scale / 2);
    var creatorCenterY = creator.physics.y + (creator.physics.height * creator.physics.scale / 2);

    var spawnX = creatorCenterX - (physics.width * physics.scale / 2);
    var spawnY = creatorCenterY - (physics.height * physics.scale / 2);

    this.physics.x = spawnX;
    this.physics.y = spawnY;

    this.hitshapes.push(new Circle(BUL_HITCIRCLE_X, BUL_HITCIRCLE_Y, BUL_HITCIRCLE_R * creator.physics.scale, this));
}

Bullet.prototype = new PhysicalEntity();
Bullet.prototype.constructor = Bullet;

//Called by super class.
Bullet.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 1;
    var frameWidth = 32;
    var frameHeight = 32;
    var sheetWidth = 5;
    var scale = 2;//Set to two for testing purposes. Fine tune later.

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, FLYING_ACTION);

    //Really should do away with these magic numbers.
                                                //animationName, firstFrameAngle, frameIncrement, yIndex, frameCount
    animation.createHorizontalAnimationStates(FLYING_ACTION, 0, 1, 1, 5, .05);
    

    return animation;
}

Bullet.prototype.wallBehavior = function (x, y) {
    this.removeFromWorld = true;
}

Bullet.prototype.update = function () {
    var delta = this.game.clockTick;
    this.debug_timeExist += delta;

    this.physics.updateLocation(delta);

    var bullet = this;

    bullet.hitshapes.forEach(function (myShape) {
        if (bullet.isPlayerBullet) {
            bullet.game.enemies.forEach(function (enemy) {
                enemy.hitshapes.forEach(function (theirShape) {
                    if (myShape.doesCollide(theirShape)) {
                        enemy.stats.hp--;
                        bullet.removeFromWorld = true;
                    }
                });
            });
        } else {
            player = bullet.game.player;
            player.hitshapes.forEach(function (theirShape) {
                if (myShape.doesCollide(theirShape)) {
                    player.stats.hp--;
                    bullet.removeFromWorld = true;
                }
            });
        }
    });

    // The following is temporary code so as not to lag the game with off-screen bullets.
    // Eventually this should be replaced with keeping track of distance the bullet has
    // travelled and deleting it after a certain distance.
    // If the bullet is offscreen, delete it.
    if (this.debug_timeExist > 4) { 
        this.removeFromWorld = true;
    }

    PhysicalEntity.prototype.update.call(this);    
}
