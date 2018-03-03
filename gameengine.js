window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {

    //Misc vars:
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.hasStarted = false;
	this.running =  false;
    this.hud = null;
	this.startScreen = null;
	this.deadScreen = null;
	this.winScreen = null;

    //Game state variables:
    this.enemies = [];
    this.bullets = [];
	this.enemiesKilled = 0;
	this.bossSpawned = false;
    this.difficulty = 0;
    this.map = null;
    this.player = null;
    this.camera = null;
    this.levels = [];
    this.currentLevel = 3;

}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();

    this.createLevels();

    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    //this.createEnemies();
    this.levels[this.currentLevel].init();
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.createLevels = function(){

    //Adding levels to this.levels    
    var levelOne = new GameLevel(this,
        GameLevel.levelOneInit,
        GameLevel.stdLevelSequence,
        GameLevel.stdCompleteCondition,
        GameLevel.stdOnCompletion);
this.levels[1] = levelOne;

var levelTwo = new GameLevel(this,
         GameLevel.levelTwoInit,
         GameLevel.stdLevelSequence,
         GameLevel.stdCompleteCondition,
         GameLevel.stdOnCompletion);

this.levels[2] = levelTwo;

var levelThree = new GameLevel(this,
         GameLevel.levelThreeInit,
         GameLevel.stdLevelSequence,
         GameLevel.stdCompleteCondition,
         GameLevel.stdOnCompletion);

this.levels[3] = levelThree;
}

GameEngine.prototype.addMap = function (map) {
    this.map = map;
}

GameEngine.prototype.addCamera = function (camera) {
    this.camera = camera;
}

GameEngine.prototype.addHUD = function (hud) {
    this.hud = hud;
}

GameEngine.prototype.addStartScreen = function (screen, easyButton, mediumButton, hardButton) {
    this.startScreen = screen;
    this.easy = easyButton;
    this.medium = mediumButton;
    this.hard = hardButton;

	this.startScreen.draw();
    this.easy.draw();
    this.medium.draw();
    this.hard.draw();
}

GameEngine.prototype.addDeadScreen = function (screen) {
    this.deadScreen = screen;
}

GameEngine.prototype.addWinScreen = function (screen) {
    this.winScreen = screen;
}

GameEngine.prototype.addPlayer = function (player) {
    this.player = player;
}
GameEngine.prototype.addEnemy = function (enemy) {
    this.enemies.push(enemy);
}

GameEngine.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.camera.drawView();
	
    // Draw HUD on top
    this.hud.draw();
	
	//draw start menu if the game hasn't started
	if (!this.running) {
		this.startScreen.draw();
	}
	if (this.won) {
		this.winScreen.draw();
	} else if (this.dead) {
		this.deadScreen.draw();
	}

    this.ctx.restore();
}

GameEngine.prototype.update = function () {

    //Update level:
    this.levels[this.currentLevel].update();

    // Update player
    if (this.player.removeFromWorld) {
		this.dead = true;
    } else {
        this.player.update(); 
    }

    this.hud.update();

	if (!this.bossSpawned && this.enemiesKilled == TOTAL_ENEMIES * (this.difficulty + 1)) { 
		//this.createBoss(); 
	}
	
    // Update enemies
    var enemyCount = this.enemies.length;
    for (var i = 0; i < enemyCount; i++) {
        var enemy = this.enemies[i];
        
        if (typeof enemy !== 'undefined') {
            if (enemy.removeFromWorld) {
                this.enemies.splice(i, 1);
				this.enemiesKilled++;
				if (this.enemiesKilled === (TOTAL_ENEMIES * (this.difficulty + 1) + 1)) {
					this.won = true;
				}
            } else {
                enemy.update();
            }
        }
    }

    // Update bullets
    var bulletCount = this.bullets.length;
    for (var i = 0; i < bulletCount; i++) {
        var bullet = this.bullets[i];

        if (typeof bullet !== 'undefined') {
            if (bullet.removeFromWorld) {
                this.bullets.splice(i, 1);
            } else {
                bullet.update();
            }
        }
    }

    this.camera.update();
    this.map.update();

}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

