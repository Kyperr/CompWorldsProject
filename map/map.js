
//Width and height are in tile-units. NOT PIXELS!!!!!
function Map(game, width, height, tileSize/*Square*/) {
    this.ctx = game.ctx;

    this.availableTiles = {};
    availableTiles["b1"] = AM.queueDownload("./img/bricks.bmp");

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

Map.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Map.prototype.draw = function () {
    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            var tileX = i * width;
            var tileY = j * height;
            var tile = availableTiles["b1"];//tileArray[i][j];
            this.ctx.drawImage(tile.assetSheet,
                xindex * tile.frameWidth,
                yindex * tile.frameHeight,  // source from sheet
                tile.frameWidth,
                tile.frameHeight,
                tileX, tileY,
                tile.frameWidth,
                tile.frameHeight);
        }
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


function Tile(assetSheet, frameWidth, frameHeight, frameX, frameY) {
    this.assetSheet = assetSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameX = frameX;
    this.frameY = frameY;
}

Tile.prototype = {};
Tile.prototype.constructor = Tile;