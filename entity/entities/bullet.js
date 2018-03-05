/**
 *
 *
 * This is the constructor for the bullet class.
 *
 * @param {any} game
 * @param {any} spritesheet
 * @param {any} creator
 * @param {any} fromPlayer
 * @param {any} bulletBehavior - A function that takes (bullet) as an arg that should influence the directionX and directionY of the bullet as you see fit.
 */
function Bullet(game, spritesheet, creator, fromPlayer, bulletBehavior) {


    /*Super init*/
    var physics = new Physics(this, 0, 0, 32, 32, 1, true);
    physics.velocity = BUL_MOVE_SPEED + DIFFICULTY_BUL_SPEED * game.difficulty;

    PhysicalEntity.call(this, game, spritesheet, physics);

    /*Sub init*/
    this.isPlayerBullet = fromPlayer;

    this.timeExist = 0;
    this.duration = 4;
    this.game = game;


    //Position
    var creatorCenterX = creator.physics.x + (creator.physics.width * creator.physics.scale / 2);
    var creatorCenterY = creator.physics.y + (creator.physics.height * creator.physics.scale / 2);

    var spawnX = creatorCenterX - (physics.width * physics.scale / 2);
    var spawnY = creatorCenterY - (physics.height * physics.scale / 2);

    this.physics.x = spawnX;
    this.physics.y = spawnY;

    this.hitshapes.push(new Circle(BUL_HITCIRCLE_X, BUL_HITCIRCLE_Y, BUL_HITCIRCLE_R * creator.physics.scale, this));

    this.callBehaviorEachUpdate = true; //Can set this to false to improve runtime.
    this.bulletBehavior = bulletBehavior;
    this.bulletBehavior(this);

    //Prototype bullet death stuff:
    this.deathAnimation = this.createDeathAnimation(AM.getAsset("./img/bullet_death.png"));
}

Bullet.prototype = new PhysicalEntity();
Bullet.prototype.constructor = Bullet;

//Called by super class.
Bullet.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 1;
    var frameWidth = 32;
    var frameHeight = 32;
    var sheetWidth = 5;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, FLYING_ACTION);

    //Really should do away with these magic numbers.
    //animationName, firstFrameAngle, frameIncrement, yIndex, frameCount
    animation.createHorizontalAnimationStates(FLYING_ACTION, 0, 1, 1, 5, .05);


    return animation;
}

Bullet.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var frameWidth = 32;
    var frameHeight = 32;
    var sheetWidth = 5;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    //Really should do away with these magic numbers.
    //animationName, firstFrameAngle, frameIncrement, yIndex, frameCount
    deathAnimation.createHorizontalAnimationStates(DYING_ACTION, 0, 1, 1, 5, .02, false);


    return deathAnimation;
}

Bullet.prototype.wallBehavior = function (x, y) {
    this.removeFromWorld = true;
}

Bullet.prototype.update = function () {

    var delta = this.game.clockTick;
    this.timeExist += delta;

    if (this.callBehaviorEachUpdate) {
        this.bulletBehavior(this);
    }

    var bullet = this;

    if(this.timeExist < this.duration){
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
                        if (player.timeSinceLastHit >= INVINCIBLE) {
                            if (!GOD_MODE) {
                                player.stats.hp--;
                            }
                            player.timeSinceLastHit = 0;
                            player.animation.spriteSheet = player.invincibleSpriteSheet;
                            player.hit = false;
                        }
                        bullet.removeFromWorld = true;
                    }
                });
            }
        });
    }

    // The following is temporary code so as not to lag the game with off-screen bullets.
    // Eventually this should be replaced with keeping track of distance the bullet has
    // travelled and deleting it after a certain distance.
    // If the bullet is offscreen, delete it.
    if (this.timeExist > this.duration) {
        if (this.deathAnimation.isDone()) {
            this.removeFromWorld = true;
        }
    }

    PhysicalEntity.prototype.update.call(this);
}

Bullet.prototype.draw = function () {
    if (this.timeExist <= this.duration) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
    } else {
        if (!this.deathAnimation.isDone()) {
            this.deathAnimation.drawFrame(this.game.clockTick, this.ctx, this.physics.x, this.physics.y);
        }
    }

    if (DRAW_HITBOXES) {
        var entity = this;
        entity.hitshapes.forEach(function (shape) {
            entity.ctx.beginPath();
            entity.ctx.lineWidth = 2;
            entity.ctx.strokeStyle = "green";
            if (shape instanceof Circle) {
                entity.ctx.arc(shape.x, shape.y, shape.r, 0, 2 * Math.PI);
            } else if (shape instanceof Box) {
                entity.ctx.rect(shape.x, shape.y, shape.w, shape.h);
            }
            entity.ctx.stroke();
            entity.ctx.closePath();
        });
    }
}

Bullet.moveInDirection = function (bullet, dirX, dirY) {
    bullet.physics.directionX = dirX;
    bullet.physics.directionY = dirY;
}

Bullet.oscillate = function (bullet, angle, distanceToTarget) {

    angle += Math.sin(5 * (bullet.timeExist)) / 2;

    bullet.physics.directionX = Math.cos(angle);
    bullet.physics.directionY = Math.sin(angle);
}

Bullet.fallBack = function (bullet, angle, spiralRadius) {

    angle += bullet.timeExist * 2;

    bullet.duration = Math.PI;

    bullet.physics.directionX = Math.cos(angle);
    bullet.physics.directionY = Math.sin(angle);
    bullet.physics.velocity = (2 * Math.PI * spiralRadius) / bullet.duration;
}


//Concept(Abandoned?)
Bullet.mineField = function (bullet, angle) {

    //angle += Math.sin(5 * (bullet.timeExist)) / 2;

    var newVel = bullet.physics.velocity - (bullet.timeExist * Math.floor(Math.random() * 4) + 1);

    bullet.physics.velocity = Math.max(newVel, 0);

    bullet.physics.directionX = Math.cos(angle);
    bullet.physics.directionY = Math.sin(angle);

    bullet.duration = 5;
}

Bullet.spiral = function (bullet, startAngle) {

    startAngle += bullet.timeExist * 3;

    bullet.physics.directionX = Math.cos(startAngle);
    bullet.physics.directionY = Math.sin(startAngle);
    bullet.duration = 2;
}

Bullet.spiralOut = function (bullet, startAngle) {

    startAngle += Math.PI / 4 * (1 / bullet.timeExist);

    bullet.physics.directionX = Math.cos(startAngle);
    bullet.physics.directionY = Math.sin(startAngle);
}

//sweep counterclockwise
Bullet.sweepCCW = function (bullet, startAngle, distanceFromSource, sweepWidth) {

    bullet.duration = 1;

    bullet.physics.velocity = (sweepWidth * distanceFromSource) / bullet.duration;

    var angle = startAngle + (sweepWidth / bullet.duration) * bullet.timeExist; //start
    //var angle = startAngle + (sweepWidth / bullet.duration) * (bullet.timeExist);

    //console.log("angle = " + angle);

    bullet.physics.directionX = Math.cos(angle);
    bullet.physics.directionY = Math.sin(angle);
}

//sweep clockwise
Bullet.sweepCW = function (bullet, startAngle, distanceFromSource, sweepWidth) {

    bullet.duration = 1;

    bullet.physics.velocity = (sweepWidth * distanceFromSource) / bullet.duration;

    var angle = startAngle - (sweepWidth / bullet.duration) * bullet.timeExist; //start
    //var angle = startAngle + (sweepWidth / bullet.duration) * (bullet.timeExist);

    //console.log("angle = " + angle);

    bullet.physics.directionX = Math.cos(angle);
    bullet.physics.directionY = Math.sin(angle);
}
