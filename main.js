var AM = new AssetManager();

//Initialize the game engine

AM.queueDownload("./img/blue_marine.png");
AM.queueDownload("./img/teal_marine.png");
AM.queueDownload("./img/red_devourer.png");
AM.queueDownload("./img/red_defiler.png");
AM.queueDownload("./img/red_queen.png");
AM.queueDownload("./img/red_zergling.png");
AM.queueDownload("./img/red_hydralisk.png");
AM.queueDownload("./img/red_ultralisk.png");
AM.queueDownload("./img/red_mutalisk.png");
AM.queueDownload("./img/red_infested_terran.png");
AM.queueDownload("./img/red_scourge.png");
AM.queueDownload("./img/red_guardian.png");
AM.queueDownload("./img/red_lurker.png");
AM.queueDownload("./img/red_broodling.png");

AM.queueDownload("./img/bro_zairdths.png");
AM.queueDownload("./img/dev_zairdthl.png");
AM.queueDownload("./img/gua_zairdthl.png");
AM.queueDownload("./img/mut_zairdthl.png");
AM.queueDownload("./img/que_zairdthl.png");
AM.queueDownload("./img/sco_zairdths.png");

AM.queueDownload("./img/bricks.png");
AM.queueDownload("./img/mud_tiles.png");
AM.queueDownload("./img/hud_gray_50.png");
AM.queueDownload("./img/wireframe.png");
AM.queueDownload("./img/small_hud_gray_50.png");
AM.queueDownload("./img/packs.png");
AM.queueDownload("./img/dirt_tileset.png");

AM.queueDownload("./img/map_ash.png");
AM.queueDownload("./img/map_jungle.png");
AM.queueDownload("./img/map_dessert.png");

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

    var hpHud = new HudElement(gameEngine, ctx, 
                               gameEngine.surfaceWidth - HUD_HEALTH_BACKDROP_WIDTH * HUD_HEALTH_BACKDROP_SCALE,
                               gameEngine.surfaceHeight - HUD_HEALTH_BACKDROP_HEIGHT * HUD_HEALTH_BACKDROP_SCALE,
                               HUD_HEALTH_BACKDROP_SCALE,
                               AM.getAsset("./img/hud_gray_50.png"),
                               HUD_HEALTH_BACKDROP_WIDTH, HUD_HEALTH_BACKDROP_HEIGHT,
                               HUD_HEALTH_BACKDROP_CENTER_X, HUD_HEALTH_BACKDROP_CENTER_Y,
                               AM.getAsset("./img/wireframe.png"),
                               HUD_HEALTH_DISPLAY_WIDTH, HUD_HEALTH_DISPLAY_HEIGHT,
                               HUD_HEALTH_DISPLAY_SCALE,
                               function () { return this.game.player.stats.maxHP; },
                               function () { return this.game.player.stats.hp; });
    var packsHud = new HudElement(gameEngine, ctx,
                                  0, gameEngine.surfaceHeight - HUD_PACKS_BACKDROP_HEIGHT * HUD_PACKS_BACKDROP_SCALE,
                                  HUD_PACKS_BACKDROP_SCALE,
                                  AM.getAsset("./img/small_hud_gray_50.png"),
                                  HUD_PACKS_BACKDROP_WIDTH, HUD_PACKS_BACKDROP_HEIGHT,
                                  HUD_PACKS_BACKDROP_CENTER_X, HUD_PACKS_BACKDROP_CENTER_Y,
                                  AM.getAsset("./img/packs.png"),
                                  HUD_PACKS_DISPLAY_WIDTH, HUD_PACKS_DISPLAY_HEIGHT,
                                  HUD_PACKS_DISPLAY_SCALE,
                                  function () { return this.game.player.stats.maxHealthPacks; },
                                  function () { return this.game.player.stats.healthPacks; });
                                  


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

                //init player
                var marX = (gameEngine.surfaceWidth / 2) - MAR_FRAME_DIM * SCALE;
                var marY = (gameEngine.surfaceHeight / 2) - MAR_FRAME_DIM * SCALE;
                var marine = new Marine(marX, marY, gameEngine, AM.getAsset("./img/blue_marine.png"), 
                                        AM.getAsset("./img/teal_marine.png"),
                                        AM.getAsset("./img/blue_marine.png"));
                marine.init(gameEngine);
                marine.initializePlayerListeners(marine, gameEngine, canvas);

                gameEngine.addPlayer(marine);

                gameEngine.camera = new Camera(gameEngine);

                gameEngine.addHUD(hpHud);
                gameEngine.addHUD(packsHud);
                
                gameEngine.start();
                gameEngine.hasStarted = true;
                gameEngine.running = true;
            }
        }
    });
    console.log("All Done!");
});

// initializedPlayerListeners moved to marine. -G
