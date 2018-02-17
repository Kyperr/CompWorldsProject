
function Menu(game, type) {
	this.game = game;
	this.type = type;
    Entity.call(game);
}

Menu.prototype = new Entity();
Menu.prototype.constructor = Menu;

Menu.prototype.reset = function () {
    this.game.running = false;
	this.game.paused = true;
}
Menu.prototype.update = function () {
	if (this.type === START_MENU) {
		reset();
	} else if (this.type === PAUSED_MENU) {
		
	} else if (this.type === DEAD_MENU) {
		
	} else if (this.type === WON_MENU) {
		
	}
}

Menu.prototype.draw = function () {
	if (this.type === START_MENU) {
		
	} else if (this.type === PAUSED_MENU) {
		
	} else if (this.type === DEAD_MENU) {
		
	} else if (this.type === WON_MENU) {
		
	}
}