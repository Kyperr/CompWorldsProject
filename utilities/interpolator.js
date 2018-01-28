function interpolate(entity, destAngle, interpSpeed) {//interpSpeed = angles per millisecond

    if (Math.round(entity.trueAngle) == Math.round(destAngle)) {
        return true;
    }

    var currentAngle = entity.trueAngle;
    var delta = entity.game.clockTick;

    var angleDelta = (destAngle - currentAngle);

    if (Math.abs(angleDelta) < interpSpeed) {//If it's too close, just set to destination.
        entity.trueAngle = destAngle;
        return;
    }

    if (angleDelta > 0) {
        entity.trueAngle += interpSpeed;
    } else {
        entity.trueAngle -= interpSpeed;
    }
}