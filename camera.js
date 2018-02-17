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
    this.game.ctx.save();
    this.game.ctx.translate(-this.x, -this.y);

    this.drawView();

    this.game.ctx.restore();
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

    game.ctx.clearRect(0, 0, game.surfaceWidth, game.surfaceHeight);

    // Draw map
    game.map.draw(this.ctx);

    // Draw player
    game.player.draw(this.ctx);

    // Draw enemies
    for (var i = 0; i < game.enemies.length; i++) {
        game.enemies[i].draw(this.ctx);
    }
    // Draw bullets
    for (var i = 0; i < game.bullets.length; i++) {
        game.bullets[i].draw(this.ctx);
    }
}