function calculateAngleRadians(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;

    var radiansAngle = Math.atan2(dy, dx) * -1;
    if (radiansAngle < 0) {
        radiansAngle += 2 * Math.PI;
    }

    return radiansAngle;
}

function calculateAngle(x1, y1, x2, y2) {
    return radiansToDegrees(calculateAngleRadians(x1, y1, x2, y2));
}

function calculateNearestAngle(x1, y1, x2, y2, incrementAmount) {
    return nearestAngle(calculateAngle(x1, y1, x2, y2), incrementAmount);
}

/*
 * Returns the angle (in degrees) closest to theDegrees
 * that is a multiple of incrementAmount.
 * For example, nearestAngle(46.2, 22.5) would return 45. 
 */
function nearestAngle(theDegrees, incrementAmount) {
    // Start at 0
    var nearestDegree = 0;

    if (incrementAmount <= 0) {
        return nearestDegree;
    }

    // Continuously increment by incrementAmount until degrees is passed or met
    while (nearestDegree < theDegrees) {
        nearestDegree += incrementAmount;
    }

    // Calculate which is closer, the current nearestDegree or the prior one
    var currentDistance = Math.abs(theDegrees - nearestDegree);
    var priorDistance = Math.abs(theDegrees - (nearestDegree - incrementAmount));

    // If prior nearestDegree was closer to degrees, decrement by incrementAmount
    if (priorDistance < currentDistance) {
        nearestDegree -= incrementAmount;
    }

    if (nearestDegree == 360) {
        return 0;
    } else {
        return nearestDegree;
    }
}

function nearestAngleRadians(theAngle, incrementAmount) {
    // Start at 0
    var nearestAngle = 0;

    if (incrementAmount <= 0) {
        return nearestAngle;
    }

    // Continuously increment by incrementAmount until degrees is passed or met
    while (nearestAngle < theAngle) {
        nearestAngle += incrementAmount;
    }

    // Calculate which is closer, the current nearestDegree or the prior one
    var currentDistance = Math.abs(theAngle - nearestAngle);
    var priorDistance = Math.abs(theAngle - (nearestAngle - incrementAmount));
    
    // If prior nearestDegree was closer to degrees, decrement by incrementAmount
    if (priorDistance < currentDistance) {
        nearestAngle -= incrementAmount;
    }

    if (nearestAngle == 2 * Math.PI) {
        return 0;
    } else {
        return nearestAngle;
    }
}

/*
 * Converts radians to degrees.
 * For example, radiansToDegrees(0) returns 0, radiansToDegrees(Math.pi) returns 180.
 */
function radiansToDegrees(radians) {
	radians = radians * (180 / Math.PI);
	if(radians < 0){
		radians += 360;
	}
    return radians;
}

/*
 * Converts degrees to radians.
 * For example, degreesToRadians(0) returns 0, degreesToRadians(180) returns Math.pi.
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/* 
 * Calculates a number between the max and min (inclusive)
 * 
*/
function randomBetweenTwoNumbers(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

calcSpawnX = function(game, dim) {
    var leftmost, rightmost;
	var x = game.camera.x;
    
    if (game.currentLevel == 1) {
        leftmost = JUNGLE_WALL_W_HITBOX_W;
        rightmost = game.map.width - JUNGLE_WALL_E_HITBOX_W;
    } else if (game.currentLevel == 2) {
        leftmost = DESERT_WALL_W_HITBOX_W;
        rightmost = game.map.width - DESERT_WALL_E_HITBOX_W;
    } else if (game.currentLevel == 3) {
        leftmost = ASH_WALL_W_HITBOX_W;
        rightmost = game.map.width - ASH_WALL_E_HITBOX_W;
    }

	while (x >= game.camera.x && x <= (game.camera.x + game.surfaceWidth)) {
		x = randomBetweenTwoNumbers(leftmost + 1, rightmost - DEV_FRAME_DIM - dim);
	}

	return x;
}

calcSpawnY = function(game, dim) {
    var topmost, bottommost;
	var y = game.camera.y;
    if (game.currentLevel == 1) {
        topmost = JUNGLE_WALL_N_HITBOX_H;
        bottommost = game.map.width - JUNGLE_WALL_S_HITBOX_H;
    } else if (game.currentLevel == 2) {
        topmost = DESERT_WALL_N_HITBOX_H;
        bottommost = game.map.width - DESERT_WALL_S_HITBOX_H;
    } else if (game.currentLevel == 3) {
        topmost = ASH_WALL_N_HITBOX_H;
        bottommost = game.map.width - ASH_WALL_S_HITBOX_H;
    }

	while (y >= game.camera.y && y <= (game.camera.y + game.surfaceHeight)) {
		y = randomBetweenTwoNumbers(topmost + 1, bottommost - DEV_FRAME_DIM - dim);			
	}

	return y;
}
