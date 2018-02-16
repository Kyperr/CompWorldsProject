function Physics(physicalEntity, x, y, width, height, scale, isRigid) {

    this.physicalEntity = physicalEntity;
    //console.log("my entity is: " + physicalEntity.constructor.name);
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

    this.facingAngle = 0;
    
}

Physics.prototype = new Physics();
Physics.prototype.constructor = Physics;

Physics.prototype.calculateFacingAngle = function () {

    if (this.directionX != 0 || this.directionY != 0){//This is a horrible way to do this, but time.
        var angle = Math.atan2(this.directionY, this.directionX) * 180 / Math.PI;//Do to the way Math.atan2 works, this will return between -180 and 180.
        angle = (angle < 0 ? (angle + 360) : angle);//We want between 0 and 360.
        this.facingAngle = angle;
    }

    return this.facingAngle;
}

Physics.prototype.updateLocation = function (delta) {
    if (this.velocity != 0) {

        //Round to the nearest angle to align with animation.
        var increment = this.physicalEntity.animation.angleIncrement / 180 * Math.PI;//Converted to radians.

        var angle = Math.tan(this.directionY, this.directionX);

        //angle = nearestAngleRadians(angle, increment);

        var roundedDirX = Math.cos(angle);
        var roundedDirY = Math.sin(angle);

        this.x += this.directionX * this.velocity * delta;



}

Physics.prototype.reflect = function () {
    return (this.calculateAngle() + 180) % 360;
}