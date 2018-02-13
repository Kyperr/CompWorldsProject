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

//AM.queueDownload("./img/background.jpg");
AM.queueDownload("./img/blue_marine.png");
AM.queueDownload("./img/red_hydralisk.png");
AM.queueDownload("./img/red_zergling.png");
AM.queueDownload("./img/player_bullet.png");
AM.queueDownload("./img/enemy_bullet.png");
AM.queueDownload("./img/bricks.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.assetManager = AM;
    var map = new Map(gameEngine, canvas.width / 32, canvas.height / 32, 32);
    
    var marine = new Marine(gameEngine, AM.getAsset("./img/blue_marine.png"));
	var hydralisk = new Hydralisk(gameEngine, AM.getAsset("./img/red_hydralisk.png"));
	//var zergling = new Zergling(gameEngine, AM.getAsset("./img/red_zergling.png"));
	
    //init player
    initializePlayerListeners(marine, gameEngine, canvas);

    gameEngine.addEntity(map);
    gameEngine.addEntity(marine);
	//gameEngine.addEntity(hydralisk);
	//gameEngine.addEntity(zergling);
    gameEngine.start();
    console.log("All Done!");
});

function initializePlayerListeners(marine, gameEngine, canvas) {
    canvas.addEventListener("keydown", function (e) {

        var horizontal = marine.physics.directionX;
        var vertical = marine.physics.directionY;

        if (e.code === "KeyW" && vertical < 1) {
            vertical += 1;
        }

        if (e.code === "KeyS" && vertical > -1) {
            vertical -= 1;
        }

        if (e.code === "KeyA" && horizontal > -1) {
            horizontal -= 1;
        }

        if (e.code === "KeyD" && horizontal < 1) {
            horizontal += 1;
        }

        marine.physics.directionX = horizontal;
        marine.physics.directionY = vertical;

    }, false);
    
    canvas.addEventListener("keyup", function (e) {


        var horizontal = marine.physics.directionX;
        var vertical = marine.physics.directionY;

        if (e.code === "KeyW") {
            vertical -= 1;
        }

        if (e.code === "KeyS") {
            vertical += 1;
        }

        if (e.code === "KeyA") {
            horizontal += 1;
        }

        if (e.code === "KeyD") {
            horizontal -= 1;
        }

        marine.physics.directionX = horizontal;
        marine.physics.directionY = vertical;
    }, false);

    canvas.addEventListener("mousemove", function (e) {
        var physics = marine.physics;
        if (marine.isShooting) {
            //newAngle = calculateAngle(e.offsetX, e.offsetY, marineCenterX, marineCenterY);
            marine.physics.directionY = e.offsetY;
            marine.physics.directionX = e.offsetX;
            marine.isShooting = true;

            marine.animation.currentAction = "shooting"
        }
        
    });

    canvas.addEventListener("mousedown", function (e) {
        // Offset X and Y are based on origin of canvas, as opposed to browser window
        marine.physics.directionY = e.offsetY;
        marine.physics.directionX = e.offsetX;
        marine.isShooting = true;

        //var marineCenterX = physics.x + (physics.width * physics.scale / 2);
        //var marineCenterY = physics.y + (physics.height * physics.scale / 2);
        
        //newAngle = calculateAngle(e.offsetX, e.offsetY, marineCenterX, marineCenterY);

        //marine.trueAngle = newAngle;
        //marine.isShooting = true;
        
        //marine.animation.currentAngle = nearestAngle(newAngle, marine.degreesPerAngle);
        marine.animation.currentAction = "shooting"
    });

    canvas.addEventListener("mouseup", function (e) {
        marine.isShooting = false;
        marine.animation.currentState = "standing";
    });
    
}

