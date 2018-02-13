function Physics(x, y, width, height, scale, isRigid) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.scale = scale;

    this.isRigid = isRigid;

    //We could do something like this if we wanted to seperate vel and dir.
    //this.velocityX = 0;
    //this.velocityY = 0;
    this.velocity = 0;//This isn't true velocity, it should be called speed.
    
    this.directionX = 0;
    this.directionY = 0;
    
}

Physics.prototype = new Physics();
Physics.prototype.constructor = Physics;

Physics.prototype.calculateFacingAngle = function () {
    var angle = Math.atan2(this.directionX, this.directionY) * 180 / Math.PI;//Do to the way Math.atan2 works, this will return between -180 and 180.
    angle = (angle < 0 ? (angle + 360) : angle);//We want between 0 and 360.
    console.log("angle = " + angle);
    return angle;
}

Physics.prototype.updateLocation = function (delta) {

    this.x += this.directionX * this.velocity * delta;
    this.y -= this.directionY * this.velocity * delta;

}

Physics.prototype.reflect = function () {
    return (this.calculateAngle() + 180) % 360;
}