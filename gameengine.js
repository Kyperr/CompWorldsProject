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
	this.running =  false;
	this.paused = true;
    this.hud = null;
	this.startMenu = null;
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
        x = Math.floor(Math.random() * this.map.width);
        y = Math.floor(Math.random() * this.map.height);
		zergling = new Zergling(x, y, this, AM.getAsset("./img/red_zergling.png"));
		zergling.init(this);
		this.addEnemy(zergling);
		i++;
	} 
	
	i = 0;
	while (i < HYDRALISKS) {
        x = Math.floor(Math.random() * this.map.width);
        y = Math.floor(Math.random() * this.map.height);
		hydralisk = new Hydralisk(x, y, this, AM.getAsset("./img/red_hydralisk.png"));
		hydralisk.init(this);
		this.addEnemy(hydralisk);
		i++;
	}
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

GameEngine.prototype.addStartMenu = function (startMenu) {
    this.startMenu = startMenu;
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
		this.paused = true;
		this.startMenu.draw();
	}

    this.ctx.restore();
}

GameEngine.prototype.createBoss = function () {
    var x = Math.floor(Math.random() * this.map.width);
    var y = Math.floor(Math.random() * this.map.height);
	var devourer = new Devourer(x, y, this, AM.getAsset("./img/red_devourer.png"));
	devourer.init(this);
	this.addEnemy(devourer);	
	this.bossSpawned = true;
}

GameEngine.prototype.update = function () {
    // Update player
    this.player.update();

    this.hud.update();

	if (this.enemiesKilled === TOTAL_ENEMIES && !this.bossSpawned) { 
		this.createBoss(); 
	}
	
    // Update enemies
    var enemyCount = this.enemies.length;
    for (var i = 0; i < enemyCount; i++) {
        var enemy = this.enemies[i];
        
        if (typeof enemy != 'undefined') {
            if (enemy.removeFromWorld) {
                this.enemies.splice(i, 1);
				this.enemiesKilled++;
				
            } else {
                enemy.update();
            }
        }
    }

    // Update bullets
    var bulletCount = this.bullets.length;
    for (var i = 0; i < bulletCount; i++) {
        var bullet = this.bullets[i];

        if (typeof bullet != 'undefined') {
            if (bullet.removeFromWorld) {
                this.bullets.splice(i, 1);
            } else {
                bullet.update();
            }
        }
    }

    this.camera.update();

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

