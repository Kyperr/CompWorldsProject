function Entity(game) {
    this.game = game;
    this.removeFromWorld = false;
}

Entity.prototype = new Entity();
Entity.prototype.constructor = Entity;

Entity.prototype.update = function () {
}
