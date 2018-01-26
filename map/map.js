
//Width and height are in tile-units. NOT PIXELS!!!!!
function Map(game, width, height, tileSize/*Square*/) {

    console.log("Map size x: " + width + " y: " + height);

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

}

Map.prototype = new Entity();
Map.prototype.constructor = Map;

Map.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Map.prototype.draw = function () {
    console.log("Drawing map " + this.width);
    for (i = 0; i < this.width; i++) {
        for (j = 0; j < this.height; j++) {
            var tile = this.availableTiles["b1"];//tileArray[i][j];

            var tileX = i * this.tileSize;
            var tileY = j * this.tileSize;

            console.log("Drawing tile at x: " + tileX + " y: " + tileY);

            this.ctx.drawImage(AM.getAsset("./img/bricks.png"),//tile.assetSheet,
                tile.frameX * tile.frameWidth,
                tile.frameY * tile.frameHeight,  // source from sheet
                tile.frameWidth,
                tile.frameHeight,
                tileX, tileY,
                tile.frameWidth,
                tile.frameHeight);
            /*
            this.ctx.drawImage(this.spriteSheet,
                xindex * this.frameWidth,
                yindex * this.frameHeight,  // source from sheet
                this.frameWidth,
                this.frameHeight,
                -(x + this.frameWidth * this.scale), y,
                this.frameWidth * this.scale,
                this.frameHeight * this.scale);*/
        }
    }
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