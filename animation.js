function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.elapsedTime = 0;
    this.scale = scale;
    this.currentAction = "standing";
    this.currentAngle = 0;
    this.animationStates = new Map();
}

function AnimationState(name, xIndex, yIndex, frames, rotationAngle, frameDuration, loop, reflect) {
    this.name = name;//string
    this.xIndex = xIndex;//int
    this.yIndex = yIndex;//int
    this.frames = frames;//int
    this.rotationAngle = rotationAngle;//Angle of rotation for the sprite.
    this.frameDuration = frameDuration;//Double
    this.loop = loop;//boolean
    this.reflect = reflect;//boolean
    this.totalTime = frameDuration * frames;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }


    // console.log("Current animation state: " + this.currentAction + this.currentAngle);

    var state = this.animationStates[this.currentAction + this.currentAngle];
    var frame = this.currentFrame();
    var xindex = state.xIndex;
    var yindex = state.yIndex;

    yindex = (state.yIndex-1) + Math.floor(frame % state.frames);

	ctx.save();
	
    if (state.reflect) {
		ctx.scale(-1, 1);
		
	ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth,
		yindex * this.frameHeight,  // source from sheet
        this.frameWidth,
		this.frameHeight,
        -(x + this.frameWidth*this.scale), y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
		
    } else {
		
	ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth,
		yindex * this.frameHeight,  // source from sheet
        this.frameWidth,
		this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
	}
	
	ctx.restore();
}

Animation.prototype.currentFrame = function () {
    var state = this.animationStates[this.currentAction + this.currentAngle];
    return Math.floor(this.elapsedTime / state.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

Animation.prototype.createAnimationStates = function(animationName, angleIncrements, numberOfAngles, yIndex, frameCount) {
    for (i = 0; i <= numberOfAngles / 2; i++) {
        var x = 2 * i;
        var angle = 90 - (i * angleIncrements);
        if (angle < 0) {
            angle += 360;
        }

        this.animationStates[animationName + angle] = new AnimationState(animationName + angle, x, yIndex, frameCount, angle, .1, true, false);
    }

    for (i = 1; i < numberOfAngles / 2; i++) {
        var x = 2 * i;
        var angle = 90 + (i * angleIncrements);

        this.animationStates[animationName + angle] = new AnimationState(animationName + angle, x, yIndex, frameCount, angle, .1, true, true);
    }

}
