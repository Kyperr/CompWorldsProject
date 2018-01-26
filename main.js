var AM = new AssetManager();

//Initialize the game engine

// no inheritance
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

AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/marine.png");
AM.queueDownload("./img/hydralisk.png");
AM.queueDownload("./img/zergling.png");
AM.queueDownload("./img/player_bullet.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.assetManager = AM;
    //gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    var map = new MapMap(game, canvas.width / 32, canvas.height / 32, 32);
    gameEngine.addEntity(map);


    var marine = new Marine(gameEngine, AM.getAsset("./img/marine.png"));
	var hydralisk = new Hydralisk(gameEngine, AM.getAsset("./img/hydralisk.png"));

	var zergling = new Zergling(gameEngine, AM.getAsset("./img/zergling.png"));
    var bullet = new Bullet(gameEngine, AM.getAsset("./img/player_bullet.png"), marine, true, 45);
	//init player
    initializePlayerListeners(marine, gameEngine, canvas);

    gameEngine.addEntity(marine);
	gameEngine.addEntity(hydralisk);
	gameEngine.addEntity(zergling);
    gameEngine.addEntity(bullet);    
    gameEngine.start();
    console.log("All Done!");
});

function initializePlayerListeners(marine, gameEngine, canvas) {
    canvas.addEventListener("keypress", function (e) {
        //console.log(e.code);
        if (e.code === "KeyW") {
            marine.movementFactor.north = 1;
        }

        if (e.code === "KeyS") {
            marine.movementFactor.south = 1;
        }

        if (e.code === "KeyA") {
            marine.movementFactor.west = 1;
        }

        if (e.code === "KeyD") {
            marine.movementFactor.east = 1;
        }

    }, false);
    
    canvas.addEventListener("keyup", function (e) {
        //console.log("Key up!");
        if (e.code === "KeyW") {
            marine.movementFactor.north = 0;
        }

        if (e.code === "KeyS") {
            marine.movementFactor.south = 0;
        }

        if (e.code === "KeyA") {
            marine.movementFactor.west = 0;
        }

        if (e.code === "KeyD") {
            marine.movementFactor.east = 0;
        }
    }, false);

    canvas.addEventListener("mousemove", function (e) {
        // Offset X and Y are based on origin of canvas, as opposed to browser window
        if (marine.isShooting) {
            var marineCenterX = marine.x + (marine.animation.frameWidth * marine.animation.scale / 2);
            var marineCenterY = marine.y + (marine.animation.frameHeight * marine.animation.scale / 2);
            
            marine.isShooting = true;
            marine.animation.currentAction = "shooting"
            marine.animation.currentAngle = calculateNearestAngle(e.offsetX,
                                                                  e.offsetY,
                                                                  marineCenterX,
                                                                  marineCenterY,
                                                                  marine.degreesPerAngle)
        }
        
    });

    canvas.addEventListener("mousedown", function (e) {
        var marineCenterX = marine.x + (marine.animation.frameWidth * marine.animation.scale / 2);
        var marineCenterY = marine.y + (marine.animation.frameHeight * marine.animation.scale / 2);
        
        marine.isShooting = true;
        marine.animation.currentAction = "shooting"
        marine.animation.currentAngle = calculateNearestAngle(e.offsetX,
                                                              e.offsetY,
                                                              marineCenterX,
                                                              marineCenterY,
                                                              marine.degreesPerAngle)
    });

    canvas.addEventListener("mouseup", function (e) {
        marine.isShooting = false;
        marine.animation.currentState = "standing";
    });
    
}

