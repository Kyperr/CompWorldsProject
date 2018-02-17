/*

Use as a condition for movement to change direction before moving.

Interpolate and move sequentially for a homing effect.

*/

/**
 *
 * @param {any} entity - Entity to interpolate
 * @param {any} targetAngle - Target angle in radians.
 * @param {any} interpSpeed - The number of angles(radians) per millisecond to move.
 * @param {any} tolerance - Rounding tolerance in radians. If the difference between srcAngle and dstAngle are less than tolerance, set src = dst.
 */
function interpolate(entity, targetAngle, interpSpeed, tolerance) {//interpSpeed = angles per millisecond
    

    var physics = entity.physics;
    var srcAngle = Math.atan2(physics.directionY, physics.directionX);
    if (srcAngle < 0) {
        srcAngle += 2 * Math.PI;
    }
    

    if (srcAngle == targetAngle) {
        return true;
    }
    
    var delta = entity.game.clockTick;

    if (Math.abs(srcAngle - targetAngle) < tolerance) {//If it's too close, just set to destination.
        physics.directionX = Math.cos(targetAngle);
        physics.directionY = Math.sin(targetAngle);
        return true;
    }

    var angleDelta = Math.abs(srcAngle - targetAngle);
    var newAngle;
    
    if (srcAngle - targetAngle > 0) {
        newAngle = srcAngle -= interpSpeed;
    } else if (srcAngle - targetAngle < 0) {
        newAngle = srcAngle += interpSpeed;
    } else {
        throw new Error("This should have never been reached.");
        return false;
    }
    
    physics.directionX = Math.cos(newAngle);
    physics.directionY = Math.sin(newAngle);

    return false;
}