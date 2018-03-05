
function Marine(x, y, game, spritesheet, invincibleSpriteSheet, deathSpriteSheet) {
	
	var death = randomBetweenTwoNumbers(1, 2);
	var deathSound = MAR_DEATH + death;
	console.log(deathSound);
    /*Super init*/
    var physics = new Physics(this, x, y, MAR_FRAME_DIM, MAR_FRAME_DIM, SCALE, true);

    CharacterEntity.call(this, game, spritesheet, deathSpriteSheet, physics, MAR_MAX_HP, deathSound);
    this.stats.maxHealthPacks = MAX_HEALTH_PACKS; 
    this.stats.healthPacks = STARTING_HEALTH_PACKS - game.difficulty * DIFFICULTY_PACKS_SUBTRACT;

    /*Sub init*/
    this.spriteSheet = spritesheet;
    this.invincibleSpriteSheet = invincibleSpriteSheet;
    this.isShooting = false;// Whether he's shooting
    this.timeSinceLastShot = 0;
    this.timeSinceLastHit = 1;
    this.hit = false;
    this.shotsPerSecond = MAR_SHOTS_PER_SECOND;
    this.scrambled = false;
    this.hitshapes.push(new Box(MAR_HITBOX_X, MAR_HITBOX_Y, 
                                MAR_HITBOX_W * SCALE, MAR_HITBOX_H * SCALE, this));
}

Marine.prototype = new CharacterEntity();
Marine.prototype.constructor = Marine;

//Called by super class.
Marine.prototype.createAnimation = function (spritesheet) {
    var numberOfAngles = 16;
    var sheetWidth = 17;
    var firstFrameAngle = 90;
    var frameIncrement = 2;

    var animation = new Animation(this, spritesheet, sheetWidth, numberOfAngles, STANDING_ACTION);

    //Really should do away with these magic numbers.
    animation.createVerticalAnimationStates(WALKING_ACTION, firstFrameAngle, frameIncrement, 5, 9, .1);
    animation.createVerticalAnimationStates(STANDING_ACTION, firstFrameAngle, frameIncrement, 5, 1, .1);
    animation.createVerticalAnimationStates(AIMING_ACTION, firstFrameAngle, frameIncrement, 1, 3, .1);
    animation.createVerticalAnimationStates(SHOOTING_ACTION, firstFrameAngle, frameIncrement, 3, 2, .1);

    return animation;
}

Marine.prototype.createDeathAnimation = function (deathSpriteSheet) {
    var numberOfAngles = 1;
    var sheetWidth = 17;
    var firstFrameAngle = 90;
    var frameIncrement = 1;

    var deathAnimation = new Animation(this, deathSpriteSheet, sheetWidth, numberOfAngles, DYING_ACTION);

    //Really should do away with these magic numbers.
    deathAnimation.createSingleAnimState(DYING_ACTION + 0, AnimationDirection.HORIZONTAL, 1, 13, 8, 0, .1, false, false);//title, animationDirection, xIndex, yIndex, frameCount, angle, frameDuration, loop, reflect

    return deathAnimation;
}

Marine.prototype.update = function () {
    var delta = this.game.clockTick;
    var physics = this.physics;

    this.timeSinceLastShot += delta;
    //console.log("Time since hit: " + this.timeSinceLastHit);
    var invincibilityTime = INVINCIBLE - this.game.difficulty * DIFFICULTY_INVINCIBILITY_SUBTRACT
    if (this.timeSinceLastHit < invincibilityTime) {
        this.hit = true;
        this.timeSinceLastHit += delta;
        this.animation.spritesheet = this.invincibleSpriteSheet;
    } else if (this.timeSinceLastHit >= invincibilityTime) {
        this.animation.spriteSheet = this.spriteSheet;
    }


    if (this.isShooting) {
        this.animation.currentAction = "shooting"; 
        if (this.timeSinceLastShot >= (1 / this.shotsPerSecond)) {

            var dirX = physics.directionX;
            var dirY = physics.directionY;

            var bulletBehavior = function (bullet) {
                Bullet.moveInDirection(bullet, dirX, dirY);
            }

            //game, spritesheet, creator, fromPlayer, startingAngle
            var bullet = new Bullet(this.game,
                this.game.assetManager.getAsset("./img/player_bullet.png"),
                this, true, bulletBehavior);
                bullet.duration = 1.75;  

            bullet.init(this.game);            

            this.game.addBullet(bullet);

            this.timeSinceLastShot = 0;
        }

    } else if (physics.velocity != 0) {
        this.animation.currentAction = "walking";
    } else {
        //console.log("Why isn't it standing now?")
        this.animation.currentAction = "standing";
        this.physics.velocity = 0;
    }
    CharacterEntity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Marine.prototype.draw = function () {
    if (!this.removeFromWorld) {
        CharacterEntity.prototype.draw.call(this);
    }
}

Marine.prototype.initializePlayerListeners = function () {
    var w = 0;
    var a = 0;
    var s = 0;
    var d = 0;
    
    var canvas = this.game.ctx.canvas;
    var marine = this;

    canvas.addEventListener("keydown", function (e) {
        if (e.code === "KeyA") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                a = 1;
            } else {
                d = 1;
            }
        }

        if (e.code === "KeyD") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                d = 1;
            } else {
                a = 1;
            }
        }
        if (e.code === "KeyW") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                w = 1;
            } else {
                s = 1;
            }
        }

        if (e.code === "KeyS") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                s = 1;
            } else {
                w = 1;
            }
        }

        if (e.code === "Equal") {
            if (ENABLE_CHEATS) {
                if (marine.stats.hp < marine.stats.maxHP) {
                    marine.stats.hp++;
                }
            }
        }

        if (e.code === "Minus") {
            if (ENABLE_CHEATS) {
                if (marine.stats.hp > 0) {
                    marine.stats.hp--;
                }
            }
        }

        if (e.code === "Space") {
            if (marine.stats.healthPacks > 0 && marine.stats.hp < marine.stats.maxHP) {
                marine.stats.healthPacks--;

                marine.stats.hp += HP_PER_PACK - marine.game.difficulty * DIFFICULTY_HP_PER_PACK_SUBTRACT;
                if (marine.stats.hp > marine.stats.maxHP) {
                    marine.stats.hp = marine.stats.maxHP;
                }
            }
        }

        if (!marine.isShooting) {

            var horizontal = d - a;
            marine.physics.directionX = horizontal;

            var vertical = w - s;
            marine.physics.directionY = vertical;

            if (horizontal != 0 || vertical != 0) {
                marine.physics.velocity = MAR_MOVE_SPEED;
            }
        }


    }, false);

    canvas.addEventListener("keyup", function (e) {

        if (e.code === "KeyA") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                a = 0;
            } else {
                d = 0;
            }
        }

        if (e.code === "KeyD") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                d = 0;
            } else {
                a = 0;
            }
        }

        if (e.code === "KeyW") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                w = 0;
            } else {
                s = 0;
            }
        }

        if (e.code === "KeyS") {
            if (!marine.scrambled || !SCRAMBLE_MOVEMENT) {
                s = 0;
            } else {
                w = 0;
            }
        }


        if (!marine.isShooting) {
            var vertical = w - s;
            marine.physics.directionY = vertical;

            var horizontal = d - a;
            marine.physics.directionX = horizontal;

            if (horizontal == 0 && vertical == 0) {
                marine.physics.velocity = 0;
            }
        }


    }, false);

    var aimAndShootFunc = function (e) {
        var game = marine.game;
        var physics = marine.physics;

        physics.velocity = 0;

        var srcX = physics.x + (physics.width / 2);
        var srcY = physics.y + (physics.height / 2);

        var trgX = (e.offsetX - BUL_FRAME_DIM / 2) + game.camera.x;
        var trgY = (e.offsetY - BUL_FRAME_DIM / 2) + game.camera.y;

        var angle = calculateAngleRadians(trgX, trgY, srcX, srcY);

        if (marine.scrambled && SCRAMBLE_AIM) {
            angle += Math.PI;
            if (angle > 2 * Math.PI) {
                angle -= 2 * Math.PI;
            }
        }

        physics.directionX = Math.cos(angle);

        physics.directionY = Math.sin(angle);

        marine.isShooting = true;

        marine.animation.currentAction = "shooting"
    };

    canvas.addEventListener("mousemove", function (e) {
        if (marine.isShooting) {
            aimAndShootFunc(e);
        }
    });

    canvas.addEventListener("mousedown", aimAndShootFunc);

    canvas.addEventListener("mouseup", function (e) {
        marine.isShooting = false;
        var horizontal = d - a;
        marine.physics.directionX = horizontal;
        var vertical = w - s;
        marine.physics.directionY = vertical;
		
		if(horizontal != 0 || vertical != 0){
			marine.physics.velocity = MAR_MOVE_SPEED;
		}
		
    });

}
