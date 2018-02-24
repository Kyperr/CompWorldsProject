var AM = new AssetManager();

//Initialize the game engine

AM.queueDownload("./img/blue_marine.png");
AM.queueDownload("./img/red_zergling.png");
AM.queueDownload("./img/red_hydralisk.png");
AM.queueDownload("./img/red_devourer.png");
AM.queueDownload("./img/red_ultralisk.png");
AM.queueDownload("./img/red_lurker.png");

AM.queueDownload("./img/red_mutalisk.png");
AM.queueDownload("./img/red_guardian.png");
AM.queueDownload("./img/dev_zairdthl.png");
AM.queueDownload("./img/mut_zairdthl.png");
AM.queueDownload("./img/gua_zairdthl.png");
AM.queueDownload("./img/bricks.png");
AM.queueDownload("./img/mud_tiles.png");
AM.queueDownload("./img/hud_gray_50.png");
AM.queueDownload("./img/wireframe.png");
AM.queueDownload("./img/dirt_tileset.png");
AM.queueDownload("./img/map.png");

AM.queueDownload("./img/player_bullet.png");
AM.queueDownload("./img/enemy_bullet.png");
AM.queueDownload("./img/prediction_bullet.png");
AM.queueDownload("./img/swipe_bullet.png");
AM.queueDownload("./img/oscillate_bullet.png");
AM.queueDownload("./img/payload_bullets.png");
AM.queueDownload("./img/fallout_bullets.png");

AM.queueDownload("./img/start_screen.png");
AM.queueDownload("./img/button.png");
AM.queueDownload("./img/easy.png");
AM.queueDownload("./img/medium.png");
AM.queueDownload("./img/hard.png");
AM.queueDownload("./img/paused_screen.png");
AM.queueDownload("./img/dead_screen.png");
AM.queueDownload("./img/won_screen.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.assetManager = AM;

    var map = new Map(gameEngine, 1600, 1600);

    var startScreen = new Menu(gameEngine, ctx, START_SCREEN, AM);
    var easyButton = new Button(gameEngine, ctx,
                                EASY_BUTTON_X, EASY_BUTTON_Y, BUTTON_SCALE,
                                AM.getAsset("./img/button.png"),
                                BUTTON_WIDTH, BUTTON_HEIGHT,
                                BUTTON_WIDTH * BUTTON_SCALE / 2, 
                                BUTTON_HEIGHT * BUTTON_SCALE / 2,
                                AM.getAsset("./img/easy.png"),
                                EASY_WIDTH, EASY_HEIGHT, EASY_SCALE);
    var mediumButton = new Button(gameEngine, ctx,
                                  MEDIUM_BUTTON_X, MEDIUM_BUTTON_Y, BUTTON_SCALE,
                                  AM.getAsset("./img/button.png"),
                                  BUTTON_WIDTH, BUTTON_HEIGHT,
                                  BUTTON_WIDTH * BUTTON_SCALE / 2, 
                                  BUTTON_HEIGHT * BUTTON_SCALE / 2,
                                  AM.getAsset("./img/medium.png"),
                                  MEDIUM_WIDTH, MEDIUM_HEIGHT, MEDIUM_SCALE);
    var hardButton = new Button(gameEngine, ctx,
                                HARD_BUTTON_X, HARD_BUTTON_Y, BUTTON_SCALE,
                                AM.getAsset("./img/button.png"),
                                BUTTON_WIDTH, BUTTON_HEIGHT,
                                BUTTON_WIDTH * BUTTON_SCALE / 2, 
                                BUTTON_HEIGHT * BUTTON_SCALE / 2,
                                AM.getAsset("./img/hard.png"),
                                HARD_WIDTH, HARD_HEIGHT, HARD_SCALE);

    var deadScreen = new Menu(gameEngine, ctx, DEAD_SCREEN, AM);
    var winScreen = new Menu(gameEngine, ctx, WIN_SCREEN, AM);

    var hud = new HudElement(gameEngine, ctx, 
                             gameEngine.surfaceWidth - HUD_HEALTH_BACKDROP_WIDTH * HUD_HEALTH_BACKDROP_SCALE,
                             gameEngine.surfaceHeight - HUD_HEALTH_BACKDROP_HEIGHT * HUD_HEALTH_BACKDROP_SCALE,
                             HUD_HEALTH_BACKDROP_SCALE,
                             AM.getAsset("./img/hud_gray_50.png"),
                             HUD_HEALTH_BACKDROP_WIDTH, HUD_HEALTH_BACKDROP_HEIGHT,
                             HUD_HEALTH_BACKDROP_CENTER_X, HUD_HEALTH_BACKDROP_CENTER_Y,
                             AM.getAsset("./img/wireframe.png"),
                             HUD_HEALTH_DISPLAY_WIDTH, HUD_HEALTH_DISPLAY_HEIGHT,
                             HUD_HEALTH_DISPLAY_SCALE);


    //init player
    var marX = (gameEngine.surfaceWidth / 2) - MAR_FRAME_DIM * SCALE;
    var marY = (gameEngine.surfaceHeight / 2) - MAR_FRAME_DIM * SCALE;
    var marine = new Marine(marX, marY, gameEngine, AM.getAsset("./img/blue_marine.png"), AM.getAsset("./img/blue_marine.png"));
    marine.init(gameEngine);
    marine.initializePlayerListeners(marine, gameEngine, canvas);

    // init map
    gameEngine.addMap(map);
    gameEngine.addPlayer(marine);
    gameEngine.addHUD(hud);

    gameEngine.camera = new Camera(gameEngine);

    gameEngine.addStartScreen(startScreen, easyButton, mediumButton, hardButton);
    gameEngine.addDeadScreen(deadScreen);
    gameEngine.addWinScreen(winScreen);
    canvas.addEventListener("mousedown", function (e) {
        if (!gameEngine.running && !gameEngine.hasStarted) {
            gameEngine.startScreen.physics = {x: e.offsetX, y: e.offsetY, scale: 1};
            var clickPoint = new Circle(0, 0, 0, gameEngine.startScreen);
            clickPoint.update();

            var easy = clickPoint.doesCollide(easyButton.hitbox);
            var medium = clickPoint.doesCollide(mediumButton.hitbox);
            var hard = clickPoint.doesCollide(hardButton.hitbox);

            if (easy || medium || hard) {
                if (easy) {
                    gameEngine.difficulty = 0;
                } else if (medium) {
                    gameEngine.difficulty = 1;
                } else {
                    gameEngine.difficulty = 2;
                }

                gameEngine.start();
                gameEngine.hasStarted = true;
                gameEngine.running = true;
            }
        }
    });
    console.log("All Done!");
});

// initializedPlayerListeners moved to marine. -G
/*
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

        var trgX = (e.offsetX - BUL_FRAME_DIM / 2) + game.camera.x;
        var trgY = (e.offsetY - BUL_FRAME_DIM / 2) + game.camera.y;

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
		
		if(horizontal != 0 || vertical != 0){
			marine.physics.velocity = MAR_MOVE_SPEED;
		}
		
    });

}
*/
