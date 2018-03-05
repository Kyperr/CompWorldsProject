/**
 * This class is pretty much useless, but it is a placeholder for actually generated maps.
 * @param {any} game
 * @param {any} width
 * @param {any} height
 */

function Map(game, mapAsset, width, height/*Square*/) {

    this.cachedImage = mapAsset;//AM.getAsset("./img/map_jungle.png");
    
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.ctx = game.ctx;

    Entity.call(this, game);
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

    if (DRAW_HITBOXES) {
        var entity = this;
        entity.hitshapes.forEach(function (shape) {
            entity.ctx.beginPath();
            entity.ctx.lineWidth=2;
            entity.ctx.strokeStyle="green";
            if (shape instanceof Circle) {
                entity.ctx.arc(shape.x, shape.y, shape.r, 0, 2*Math.PI);
            } else if (shape instanceof Box) {
                entity.ctx.rect(shape.x, shape.y, shape.w, shape.h); 
            }
            entity.ctx.stroke();
            entity.ctx.closePath();
        });
    }
}
