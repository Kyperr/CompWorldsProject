var AnimationDirection = {
    HORIZONTAL: 1,
    VERTICAL: 2
};

function Animation(physicalEntity, spriteSheet, sheetWidth, numberOfAngles, startingAction) {
    this.physicalEntity = physicalEntity;
    this.spriteSheet = spriteSheet;
    this.frameWidth = physicalEntity.physics.width;;
    this.frameHeight = physicalEntity.physics.height;
    this.sheetWidth = sheetWidth;
    this.numberOfAngles = numberOfAngles;
    this.angleIncrement = 360 / numberOfAngles;
    this.elapsedTime = 0;
    this.scale = physicalEntity.physics.scale;
    this.currentAction = startingAction;
    this.animationStates = {};
}

function AnimationState(name, animDirection, xIndex, yIndex, frames, rotationAngle, frameDuration, loop, reflect) {
    this.name = name;//string
    this.animDirection = animDirection
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
    
    var physics = this.physicalEntity.physics;

    var animAngle = nearestAngle(physics.calculateFacingAngle(), this.angleIncrement);
    var state = this.animationStates[this.currentAction + animAngle];
    var frame = this.currentFrame();
    var xindex = state.xIndex;
    var yindex = state.yIndex;

    //We have animations that go both vertical and horizontal.
    if (state.animDirection == AnimationDirection.VERTICAL) {
        yindex = (state.yIndex - 1) + Math.floor(frame % state.frames);
    } else if (state.AnimationDirection == Animation.HORIZONTAL) {
        xindex = (state.xIndex - 1) + Math.floor(frame % state.frames);
    } else {
        assert(false);
    }

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
    var animAngle = nearestAngle(this.physicalEntity.physics.calculateFacingAngle(), this.angleIncrement);
    //console.log("current state = " + this.currentAction + animAngle);
    var state = this.animationStates[this.currentAction + animAngle];
    return Math.floor(this.elapsedTime / state.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

Animation.prototype.createVerticalAnimationStates = function (animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration) {
    for (i = 0; i <= this.numberOfAngles / 2; i++) {
        var x = frameIncrement * i;
        var angle = firstFrameAngle - (i * this.angleIncrement);
        if (angle < 0) {
            angle += 360;
        }
        this.animationStates[animationName + angle] = new AnimationState(animationName + angle, AnimationDirection.VERTICAL, x, yIndex, frameCount, angle, frameDuration, true, false);
    }

    for (i = 1; i < this.numberOfAngles / 2; i++) {
        var x = frameIncrement * i;
        var angle = firstFrameAngle + (i * this.angleIncrement);
        this.animationStates[animationName + angle] = new AnimationState(animationName + angle, AnimationDirection.VERTICAL, x, yIndex, frameCount, angle, frameDuration, true, true);
    }
}

Animation.prototype.createHorizontalAnimationStates = function (animationName, firstFrameAngle, frameIncrement, yIndex, frameCount, frameDuration) {
    for (i = 0; i <= this.numberOfAngles / 2; i++) {
        var y = frameIncrement * i;
        var angle = firstFrameAngle - (i * this.angleIncrement);
        if (angle < 0) {
            angle += 360;
        }
        this.animationStates[animationName + angle] = new AnimationState(animationName + angle, AnimationDirection.Horizontal, yIndex, y, frameCount, angle, frameDuration, true, false);
    }

    for (i = 1; i < this.numberOfAngles / 2; i++) {
        var x = frameIncrement * i;
        var angle = firstFrameAngle + (i * this.angleIncrement);
        this.animationStates[animationName + angle] = new AnimationState(animationName + angle, AnimationDirection.VERTICAL, x, yIndex, frameCount, angle, frameDuration, true, true);
    }
}
