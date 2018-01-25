const SHOTS_PER_SECOND = 1

var AM = new AssetManager();

//Initialize the game engine



//Animation moved to its own file.

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

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));

    var marine = new Marine(gameEngine, AM.getAsset("./img/marine.png"));
	var hydralisk = new Hydralisk(gameEngine, AM.getAsset("./img/hydralisk.png"));

	//init player
    initializePlayerListeners(marine, gameEngine, canvas);
	
	//init enemies
	initializeEnemyListeners(hydralisk, canvas);

    gameEngine.addEntity(marine);
	gameEngine.addEntity(hydralisk);

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
        //console.log("Mouse move deteced.");
        //console.log("Mouse movement e: " + e);

        // Offset X and Y are based on origin of canvas, as opposed to browser window
        gameEngine.mouseX = e.offsetX;
        gameEngine.mouseY = e.offsetY;
    });

    canvas.addEventListener("mousedown", function (e) {
        console.log("Click at (" + e.offsetX + ", " + e.offsetY + ").")
        var marineCenterX = marine.x + (marine.animation.frameWidth * marine.animation.scale / 2);
        var marineCenterY = marine.y + (marine.animation.frameHeight * marine.animation.scale / 2);
        console.log("Marine's location: (" + marine.x + ", " + marine.y + ").")
        console.log("Marine's location: (" + marineCenterX + ", " + marineCenterY + ").")

        var dx = e.offsetX - marineCenterX;
        var dy = e.offsetY - marineCenterY;

        var radiansAngle = Math.atan2(dy, dx) * -1;
        if (radiansAngle < 0) {
            radiansAngle += 2 * Math.PI;
        }

        console.log("Calculated angle in radians: " + radiansAngle)
        var degreesAngle = radiansToDegrees(radiansAngle);
        console.log("Calculated angle in degrees: " + degreesAngle)
        marine.isShooting = true;
        marine.animation.currentAction = "shooting"
        marine.animation.currentAngle = nearestAngle(degreesAngle, marine.degreesPerAngle);
        console.log("Calculated nearest angle: " + marine.animation.currentAngle)
    });

    canvas.addEventListener("mouseup", function (e) {
        marine.isShooting = false;
        marine.animation.currentState = "standing";
    });
    
}

function initializeEnemyListeners(hydralisk, canvas) {
	
}

/*
 * Returns the angle (in degrees) closest to theDegrees
 * that is a multiple of incrementAmount.
 * For example, nearestAngle(46.2, 22.5) would return 45. 
 */
function nearestAngle(theDegrees, incrementAmount) {
    // Start at 0
    var nearestDegree = 0;

    // Continuously increment by incrementAmount until degrees is passed or met
    while (nearestDegree < theDegrees) {
        nearestDegree += incrementAmount;
    }
    
    // Calculate which is closer, the current nearestDegree or the prior one
    var currentDistance = Math.abs(theDegrees - nearestDegree);
    var priorDistance = Math.abs(theDegrees - (nearestDegree - incrementAmount));

    // If prior nearestDegree was closer to degrees, decrement by incrementAmount
    if (priorDistance < currentDistance) {
        nearestDegree -= incrementAmount;
    }
    
    if (nearestDegree == 360) {
        return 0;
    } else {
        return nearestDegree;   
    }
}

/*
 * Converts radians to degrees.
 * For example, radiansToDegrees(0) returns 0, radiansToDegrees(Math.pi) returns 180.
 */
function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

/*
 * Converts degrees to radians.
 * For example, degreesToRadians(0) returns 0, degreesToRadians(180) returns Math.pi.
 */
function degreesToRadians(degrees) {
    return (180 / Math.PI) / degrees;
}
