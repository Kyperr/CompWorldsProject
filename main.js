var AM = new AssetManager();

//Initialize the game engine

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
        this.x, this.y);
};

Background.prototype.update = function () {
};

AM.queueDownload("./img/blue_marine.png");
AM.queueDownload("./img/red_hydralisk.png");
AM.queueDownload("./img/red_zergling.png");
AM.queueDownload("./img/red_devourer.png");
AM.queueDownload("./img/player_bullet.png");
AM.queueDownload("./img/enemy_bullet.png");
AM.queueDownload("./img/bricks.png");
AM.queueDownload("./img/mud_tiles.png");
AM.queueDownload("./img/hud_gray_50.png");
AM.queueDownload("./img/wireframe.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.assetManager = AM;
    var map = new Map(gameEngine, canvas.width / 32, canvas.height / 32, 32);
    var hud = new HudElement(gameEngine, ctx,
                             AM.getAsset("./img/hud_gray_50.png"), 240, 333, 109, 191,
                             AM.getAsset("./img/wireframe.png"), 64, 64);
    var marine = new Marine(gameEngine, AM.getAsset("./img/blue_marine.png"));
    var hydralisk = new Hydralisk(gameEngine, AM.getAsset("./img/red_hydralisk.png"));
    var zergling = new Zergling(gameEngine, AM.getAsset("./img/red_zergling.png"));
    var devourer = new Devourer(gameEngine, AM.getAsset("./img/red_devourer.png"));

    //init player
    initializePlayerListeners(marine, gameEngine, canvas);

    gameEngine.addMap(map);
    gameEngine.addPlayer(marine);
    gameEngine.addHUD(hud);
    gameEngine.addEnemy(hydralisk);
    gameEngine.addEnemy(zergling);
    gameEngine.addEnemy(devourer);
    gameEngine.start();
    console.log("All Done!");
});

//These should be moved into the appropriate class(marine).
function initializePlayerListeners(marine, gameEngine, canvas) {
    var w = 0;
    var a = 0;
    var s = 0;
    var d = 0;

    canvas.addEventListener("keydown", function (e) {

        if (e.code === "KeyA") {
            a = 1;
        }

        if (e.code === "KeyD") {
            d = 1;
        }
        if (e.code === "KeyW") {
            w = 1;
        }

        if (e.code === "KeyS") {
            s = 1;
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
            a = 0;
        }

        if (e.code === "KeyD") {
            d = 0;
        }

        if (e.code === "KeyW") {
            w = 0;
        }

        if (e.code === "KeyS") {
            s = 0;
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
        var physics = marine.physics;

        physics.velocity = 0;

        var srcX = physics.x + (physics.width / 2);
        var srcY = physics.y + (physics.height / 2);

        var angle = calculateAngleRadians(e.offsetX - (16), e.offsetY - (16), srcX, srcY);//The +16 magic number comes from the size of the bullets. It is 1/2 the height/width of a bullet. Can fix later. *2 is for scale.

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
    });

}

