function Physics(x, y, velocityX, velocityY, acceleration) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.acceleration = acceleration;
}

Physics.prototype = new Physics();
Physics.prototype.constructor = Physics;

Physics.prototype.calculateAngle = function () {
    var angle = Math.atan2(vertical, horizontal) * 180 / Math.PI;//Do to the way Math.atan2 works, this will return between -180 and 180.
    angle = (angle < 0 ? (angle + 360) : angle);//We want between 0 and 360.
    return angle;
}

Physics.prototype.updateLocation = function () {

    var distance = Math.sqrt((this.velocityX ^ 2) + (this.velocityY ^ 2));

    this.x += this.velocityX * distance;
    this.y -= this.velocityY * distance;

}