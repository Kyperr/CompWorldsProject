function AI (entity) {
    console.log("entity in ai : " + entity);
    this.entity = entity;
}

AI.prototype = new AI();
AI.prototype.constructor = AI;

AI.prototype.update = function () {
    //Empty
}
