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
    this.enemies = [];
    this.bullets = [];

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
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.addMap = function (map) {
    this.map = map;
}

GameEngine.prototype.addCamera = function (camera) {
    this.camera = camera;
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
    this.ctx.save();

    // Draw map
    this.map.draw(this.ctx);

    // Draw player
    this.player.draw(this.ctx);

    // Draw enemies
    for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].draw(this.ctx);
    }
    // Draw bullets
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw(this.ctx);
    }

    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    // Update player
    this.player.update();

    // Update enemies
    var enemyCount = this.enemies.length;
    for (var i = 0; i < enemyCount; i++) {
        var enemy = this.enemies[i];
        
        if (typeof enemy != 'undefined') {
            if (enemy.removeFromWorld) {
                this.enemies.splice(i, 1);
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

