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
    // Decomposed this.entities for easy access
    this.map = null;
    this.player = null;
    this.camera = null;
	this.hasStarted = false;
	this.running =  false;
    this.hud = null;
	this.startScreen = null;
	this.deadScreen = null;
	this.winScreen = null;
    this.enemies = [];
    this.bullets = [];
	this.enemiesKilled = 0;
	this.bossSpawned = false;

    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
	this.createEnemies();
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.createEnemies = function() {
	//generate enemies
	
	var x;
    var y;
	var hydralisk; 
	var zergling;
	var i = 0;
	
    while (i < ZERGLINGS) {
		x = this.calcX(ZER_FRAME_DIM);
		y = this.calcY(ZER_FRAME_DIM);
		zergling = new Zergling(x, y, this, AM.getAsset("./img/red_zergling.png"));
		zergling.init(this);
		this.addEnemy(zergling);
		i++;
	} 
	
	i = 0;
	while (i < HYDRALISKS) {
		x = this.calcX(HYD_FRAME_DIM);
		y = this.calcY(HYD_FRAME_DIM);
		hydralisk = new Hydralisk(x, y, this, AM.getAsset("./img/red_hydralisk.png"));
		hydralisk.init(this);
		this.addEnemy(hydralisk);
		i++;
	}
}

GameEngine.prototype.calcX = function (creatureDim) {
	var marX = (this.surfaceWidth/2) + MAR_FRAME_DIM * SCALE;
	var marDim = MAR_FRAME_DIM * SCALE;
	var x = marX - BUFFER;
	while (x >= (marX - BUFFER) && x <= (marX + marDim + BUFFER)) {
		x = randomBetweenTwoNumbers(WALL_W_HITBOX_W, this.map.width - WALL_E_HITBOX_W - creatureDim);
	}
	return x;
}

GameEngine.prototype.calcY = function (creatureDim) {
	var marY = (this.surfaceHeight/2) + MAR_FRAME_DIM * SCALE;
	var marDim = MAR_FRAME_DIM * SCALE;
	var y = marY - BUFFER;
	while (y >= (marY - BUFFER) && y <= (marY + marDim + BUFFER)) {
		y = randomBetweenTwoNumbers(WALL_N_HITBOX_H, this.map.height - WALL_S_HITBOX_H - creatureDim);			
	}
	return y;
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

GameEngine.prototype.addStartScreen = function (screen) {
    this.startScreen = screen;
	this.startScreen.draw();
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

GameEngine.prototype.createBoss = function () {
	var x = this.camera.x;
	var y = this.camera.y;
	while (x >= this.camera.x && x <= (this.camera.x + this.surfaceWidth)) {
		x = randomBetweenTwoNumbers(WALL_W_HITBOX_W, this.map.width - WALL_E_HITBOX_W);
	}
	while (y >= this.camera.y && y <= (this.camera.y + this.surfaceHeight)) {
		y = randomBetweenTwoNumbers(WALL_N_HITBOX_H, this.map.height - WALL_S_HITBOX_H);			
	}
	
	
	var devourer = new Devourer(x, y, this, AM.getAsset("./img/red_devourer.png"));
	devourer.init(this);
	this.addEnemy(devourer);	
	this.bossSpawned = true;
}

GameEngine.prototype.update = function () {
    // Update player
    if (this.player.removeFromWorld) {
		this.dead = true;
    } else {
        this.player.update();
    }

    this.hud.update();

	if (this.enemiesKilled === TOTAL_ENEMIES && !this.bossSpawned) { 
		this.createBoss(); 
	}
	
    // Update enemies
    var enemyCount = this.enemies.length;
    for (var i = 0; i < enemyCount; i++) {
        var enemy = this.enemies[i];
        
        if (typeof enemy !== 'undefined') {
            if (enemy.removeFromWorld) {
                this.enemies.splice(i, 1);
				this.enemiesKilled++;
				if (this.enemiesKilled === TOTAL_ENEMIES) {
					//spawn devourer
					spawnBoss = true;
				} else if (this.enemiesKilled === (TOTAL_ENEMIES + 1)) {
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

