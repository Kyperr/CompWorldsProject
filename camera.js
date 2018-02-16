function Camera(game) {

    this.game = game;

    this.x = 0;
    this.y = 0;

    this.calcPosition();

}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;

Camera.prototype.update = function () {
    this.calcPosition();
    this.game.ctx.translate(-this.x, -this.y);
}

Camera.prototype.calcPosition = function(){
    var target = this.game.player;
    var targetMidX = target.physics.x + (target.physics.width / 2);
    var targetMidY = target.physics.y + (target.physics.height / 2);

    var width = this.game.surfaceWidth;
    var height = this.game.surfaceHeight;

    this.x = targetMidX - (width / 2);
    this.y = targetMidY - (height / 2);
    

}

Camera.prototype.drawView = function () {
    var game = this.game;

    // Draw map

    var mapX = game.map.x - this.x;
    var mapY = game.map.y - this.y;

    game.map.draw(this.ctx);

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

}