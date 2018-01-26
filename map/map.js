
//Width and height are in tile-units. NOT PIXELS!!!!!
function Map(game, width, height, tileSize/*Square*/) {
    this.ctx = game.ctx;

    this.tileArray = new Array(width);
    for (i = 0; i < width; i++) {
        tileArray[i] = new Array(width);
    }

    this.width;
    this.height;
    this.x = 0;
    this.y = 0;

    Entity.call(this, game, x, y);

}

Map.prototype = new Entity();
Map.prototype.constructor = Bullet;

Bullet.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Bullet.prototype.draw = function () {
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            var tileX = i * width;
            var tileY = j * height;
            var tile = //tileArray[i][j];
            this.ctx.drawImage();
        }
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
