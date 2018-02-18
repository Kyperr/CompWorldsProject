
function Menu(game, type, display) {
    Entity.call(game);
	//this.game = game;
	this.type = type;
	this.display = display;
}

Menu.prototype = new Entity();
Menu.prototype.constructor = Menu;

Menu.prototype.update = function () {
	if (this.type === START_SCREEN) {
		//start game logic
	} else if (this.type === PAUSED_SCREEN) {
		//paused game logic
	} else if (this.type === DEAD_SCREEN || this.type === WIN_SCREEN) {
		//stop game logic
	} 
}

Menu.prototype.draw = function () {
	var screen;
	var canvas = document.getElementById("canvas");
	if (this.type === START_SCREEN && this.display === true) {
		this.game.ctx.drawImage(this.game.assetManager.getAsset("./img/start_screen.png"), 0, 0, CAN_W, CAN_H);
	} else if (this.type === PAUSED_SCREEN && this.display === true) {
		this.game.ctx.drawImage(this.game.assetManager.getAsset("./img/paused_screen.png"), 0, 0, CAN_W, CAN_H);
	} else if (this.type === DEAD_SCREEN && this.display === true) {
		this.game.ctx.drawImage(this.game.assetManager.getAsset("./img/dead_screen.png"), 0, 0, CAN_W, CAN_H);
	} else if (this.type === WIN_SCREEN && this.display === true) {
		this.game.ctx.drawImage(this.game.assetManager.getAsset("./img/won_screen.png"), 0, 0, CAN_W, CAN_H);
	}
}
