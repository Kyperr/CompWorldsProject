
function StartMenu(game, ctx) {
	this.game = game;
	this.ctx = ctx;
    PhysicalEntity.call(this, game, ctx, null, null);
}

StartMenu.prototype = new PhysicalEntity();
StartMenu.prototype.constructor = StartMenu;

StartMenu.prototype.reset = function () {
    this.game.hasStarted = false;
}
StartMenu.prototype.update = function () {
	this.game.hasStarted = true;
	//this.game.paused = false;
}

StartMenu.prototype.draw = function () {
    if (this.game.paused) {
        this.ctx.font = "24pt Impact";
        this.ctx.fillStyle = "lightblue";
        if (this.game.mouse) { this.ctx.fillStyle = "darkblue"; }
        this.ctx.fillText("Click to Play!", this.x, this.y);
    }
    else {
        this.ctx.fillText("Game Over!", this.x-30, this.y);
    }
}