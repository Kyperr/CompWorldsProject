
//Width and height are in tile-units. NOT PIXELS!!!!!
function Map(game, width, height, tileSize/*Square*/) {
    
    this.cachedImage = document.createElement("canvas");
    this.cachedImage.setAttribute("width", width * tileSize);
    this.cachedImage.setAttribute("height", height * tileSize);
    this.availableTiles = {};
    var brickTile = new Tile(AM.getAsset("./img/bricks.png"), 32, 32, 0, 0);
    this.availableTiles["b1"] = brickTile;

    this.tileArray = new Array(width);
    for (i = 0; i < width; i++) {
        this.tileArray[i] = new Array(width);
    }

    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.x = 0;
    this.y = 0;

    this.ctx = game.ctx;
    Entity.call(this, game, this.x, this.y);

    this.renderTiles();

}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.renderTiles = function () {
    var ctx = this.cachedImage.getContext("2d");
    for (i = 0; i < this.width; i++) {
        for (j = 0; j < this.height; j++) {
            var tile = this.availableTiles["b1"];//tileArray[i][j];

            var tileX = i * this.tileSize;
            var tileY = j * this.tileSize;

            ctx.drawImage(AM.getAsset("./img/bricks.png"),//tile.assetSheet,
                tile.frameX * tile.frameWidth,
                tile.frameY * tile.frameHeight,  // source from sheet
                tile.frameWidth,
                tile.frameHeight,
                tileX, tileY,
                tile.frameWidth,
                tile.frameHeight);
        }
    }
}

Map.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Map.prototype.draw = function () {
    this.ctx.drawImage(this.cachedImage, 0, 0);
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