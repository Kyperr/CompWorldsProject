
/**
 * This is the constructor for the bullet class.
 *
 * @param {any} game
 * @param {any} spritesheet
 * @param {any} creator
 * @param {any} fromPlayer
 * @param {any} bulletBehavior - A function that takes (bullet) as an arg that should influence the directionX and directionY of the bullet as you see fit.
 */
function Scrambler(game, spritesheet, creator) {
    /*Super init*/
    Bullet.call(this, game, spritesheet, creator, false, function (bullet) {
        var physics = this.physics;
        var target = this.game.player;

        var srcX = physics.x + ((physics.width * physics.scale) / 2);
        var srcY = physics.y + ((physics.height * physics.scale) / 2);
        var dstX = target.physics.x + ((target.physics.width / 2) * SCALE);
        var dstY = target.physics.y + ((target.physics.height / 2) * SCALE);

        var targetAngle = calculateAngleRadians(dstX, dstY, srcX, srcY);

        var currentAngle = this.physics.calculateFacingAngle() / 180 * Math.PI;

        Bullet.moveInDirection(this, Math.cos(targetAngle), Math.sin(targetAngle));
    });
    this.duration = QUE_PHASE_LENGTH;
    this.attachedToPlayer = false;
}

Scrambler.prototype = Object.create(Bullet.prototype);
Scrambler.prototype.constructor = Scrambler;

//Called by super class.
Scrambler.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 1;
    var frameWidth = 32;
    var frameHeight = 32;
    var sheetWidth = 3;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, FLYING_ACTION);

    //Really should do away with these magic numbers.
    //animationName, firstFrameAngle, frameIncrement, yIndex, frameCount
    animation.createHorizontalAnimationStates(FLYING_ACTION, 0, 1, 1, 3, .1);

    return animation;
}

Scrambler.prototype.wallBehavior = function (x, y) {
    this.removeFromWorld = true;
}

Scrambler.prototype.update = function () {
    var delta = this.game.clockTick;
    this.timeExist += delta;
    var player = this.game.player;

    var scrambler = this;

    if (!scrambler.attachedToPlayer) {
        scrambler.bulletBehavior(this);
    } else {
        scrambler.physics.x = PhysicalEntity.getMiddleXOf(player) - scrambler.physics.width * SCALE / 2;
        scrambler.physics.y = PhysicalEntity.getMiddleYOf(player) - scrambler.physics.height * SCALE / 2;
        scrambler.physics.velocity = 0;
    }
    scrambler.hitshapes.forEach(function (myShape) {
        if (scrambler.timeExist < scrambler.duration) {
            player.hitshapes.forEach(function (theirShape) {
                if (myShape.doesCollide(theirShape)) {
                    scrambler.attachedToPlayer = true;
                    player.scrambled = true;
                }
            });
        } else {
            scrambler.removeFromWorld = true;
            player.scrambled = false;
        }
    });

    PhysicalEntity.prototype.update.call(this);
}
