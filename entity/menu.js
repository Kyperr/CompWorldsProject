
function Menu(game, ctx, type, AM) {
    Entity.call(game);
	//this.game = game;
	this.ctx = ctx;
	this.type = type;
	this.AM = AM;
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
	if (this.type === START_SCREEN) {
		this.ctx.drawImage(this.AM.getAsset("./img/start_screen.png"), 0, 0, CAN_W, CAN_H);
		console.log("start added");
	} else if (this.type === PAUSED_SCREEN) {
		this.ctx.drawImage(this.AM.getAsset("./img/paused_screen.png"), 0, 0, CAN_W, CAN_H);
	} else if (this.type === DEAD_SCREEN) {
		this.ctx.drawImage(this.AM.getAsset("./img/dead_screen.png"), 0, 0, CAN_W, CAN_H);
	} else if (this.type === WIN_SCREEN) {
		this.ctx.drawImage(this.AM.getAsset("./img/won_screen.png"), 0, 0, CAN_W, CAN_H);
	}
}
