/**
 * This class is pretty much useless, but it is a placeholder for actually generated maps.
 * @param {any} game
 * @param {any} width
 * @param {any} height
 */

function Map(game, width, height/*Square*/) {

    this.cachedImage = AM.getAsset("./img/map.png");

    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;

    this.ctx = game.ctx;

    Entity.call(this, game);

    this.renderTiles();

    this.hitshapes [];
    this.hitshapes.push(new Box(WALL_W_HITBOX_X, WALL_W_HITBOX_Y, WALL_W__HITBOX_W, WALL_W_HITBOX_H, this));
    this.hitshapes.push(new Box(WALL_N_HITBOX_X, WALL_N_HITBOX_Y, WALL_N__HITBOX_W, WALL_N_HITBOX_H, this));
    this.hitshapes.push(new Box(WALL_E_HITBOX_X, WALL_E_HITBOX_Y, WALL_E__HITBOX_W, WALL_E_HITBOX_H, this));
    this.hitshapes.push(new Box(WALL_S_HITBOX_X, WALL_S_HITBOX_Y, WALL_S__HITBOX_W, WALL_S_HITBOX_H, this));
}

Map.prototype = new Entity();
Map.prototype.constructor = Map;


Map.prototype.update = function () {
    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Map.prototype.draw = function () {
    //this.ctx.drawImage(this.cachedImage, this.x, this.y);
    this.ctx.drawImage(this.cachedImage,
        this.x,
        this.y,  // source from sheet
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height);
}

Tile.prototype = {};
Tile.prototype.constructor = Tile;
