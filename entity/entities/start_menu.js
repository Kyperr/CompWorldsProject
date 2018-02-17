
function StartMenu(game, ctx) {
	this.game = game;
	this.ctx = ctx;
	var physics = new Physics(this, 0, 0, this.game.surfaceWidth, this.game.surfaceHeight, 1, true);
    PhysicalEntity.call(game, null, physics);
}

StartMenu.prototype = new PhysicalEntity();
StartMenu.prototype.constructor = StartMenu;

StartMenu.prototype.reset = function () {
    this.game.running = false;
}
StartMenu.prototype.update = function () {
	this.game.running = true;
	//this.game.paused = false;
}

StartMenu.prototype.draw = function () {
    if (this.game.paused) {
        this.ctx.font = "24pt Impact";
        this.ctx.fillStyle = "darkblue";
        if (this.game.mouse) { this.ctx.fillStyle = "lightblue"; }
        this.ctx.fillText("Click to Play!", this.x, this.y);
    }
    else {
        this.ctx.fillText("Game Over!", this.x-30, this.y);
    }
}