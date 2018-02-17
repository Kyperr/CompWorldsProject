var AM = new AssetManager();

//Initialize the game engine

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
AM.queueDownload("./img/dirt_tileset.png");
AM.queueDownload("./img/map.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
	//canvas.style.display = "none";
    //var startMenu = document.getElementById("startMenu");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.assetManager = AM;
    var map = new Map(gameEngine, 4096, 4096);
	var startMenu = new StartMenu(gameEngine, ctx);
    var hud = new HudElement(gameEngine, ctx,
                             AM.getAsset("./img/hud_gray_50.png"), 
                             HUD_HEALTH_BACKDROP_WIDTH, HUD_HEALTH_BACKDROP_HEIGHT, 
                             HUD_HEALTH_BACKDROP_CENTER_X, HUD_HEALTH_BACKDROP_CENTER_Y,
                             AM.getAsset("./img/wireframe.png"),
                             HUD_HEALTH_DISPLAY_WIDTH, HUD_HEALTH_DISPLAY_HEIGHT);

    var marine = new Marine(gameEngine, AM.getAsset("./img/blue_marine.png"));
    marine.init(gameEngine);
    var hydralisk = new Hydralisk(gameEngine, AM.getAsset("./img/red_hydralisk.png"));
    hydralisk.init(gameEngine);
    var zergling = new Zergling(gameEngine, AM.getAsset("./img/red_zergling.png"));
    zergling.init(gameEngine);
    var devourer = new Devourer(gameEngine, AM.getAsset("./img/red_devourer.png"));
    devourer.init(gameEngine);

    //init player
    initializePlayerListeners(marine, gameEngine, canvas);

	
    gameEngine.addMap(map);
    gameEngine.addPlayer(marine);
    gameEngine.addHUD(hud);
    gameEngine.addEnemy(hydralisk);
    gameEngine.addEnemy(zergling);
    gameEngine.addEnemy(devourer);

    gameEngine.camera = new Camera(gameEngine);
	
    gameEngine.addStartMenu(startMenu);
	if (!gameEngine.hasStarted) {
		gameEngine.hasStarted = true;	
		gameEngine.paused = true;
		gameEngine.start();
	}
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

        if (e.code === "Equal") {
            if (marine.stats.hp != marine.stats.maxHP) {
                marine.stats.hp++;
            }
        }

        if (e.code === "Minus") {
            if (marine.stats.hp != 1) {
                marine.stats.hp--;
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
        var game = marine.game;
        var physics = marine.physics;

        physics.velocity = 0;

        var srcX = physics.x + (physics.width / 2);
        var srcY = physics.y + (physics.height / 2);

        var trgX = (e.offsetX - 16) + game.camera.x;
        var trgY = (e.offsetY - 16) + game.camera.y;

        var angle = calculateAngleRadians(trgX, trgY, srcX, srcY);//The 16 magic number comes from the size of the bullets. It is 1/2 the height/width of a bullet. Can fix later. *2 is for scale.

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

