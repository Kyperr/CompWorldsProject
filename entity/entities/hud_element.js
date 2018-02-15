
/*
 * Constructs a new HudElement.
 * game: the GameEngine of which this HudElement is a member.
 * ctx: the canvas context in which this HudElement will be drawn.
 * backdropImage: a static image containing the backdrop of the HudElement.
 * (bWidth, bHeight): the overall dimensions of the backdropImage.
 * (bCenterX, bCenterY): the center of where on the backdrop the display should be drawn.
 * displaySpritesheet: the spritesheet for the display.
 * (dWidth, dHeight): the dimensions of each frame of the display.
 */
function HudElement(game, ctx, 
                    backdropImage, bWidth, bHeight, bCenterX, bCenterY, 
                    displaySpritesheet, dWidth, dHeight) {

    /*
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    */

    /*Super init*/
    Entity.call(this, game);

    /*Sub init*/
    this.ctx = ctx;
    this.backdrop = backdropImage;
    this.display = displaySpritesheet;
    this.displayWidth = dWidth;
    this.displayHeight = dHeight;
    this.backdropX = game.surfaceWidth - bWidth;
    this.backdropY = game.surfaceHeight - bHeight;
    this.displayX = this.backdropX + bCenterX - Math.floor(dWidth / 2);
    this.displayY = this.backdropY + bCenterY - Math.floor(dHeight / 2);
}

HudElement.prototype = new Entity();
HudElement.prototype.constructor = HudElement;

HudElement.prototype.update = function () {
    // Change sourceX and sourceY based on player HP
}


HudElement.prototype.draw = function () {
    /*
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
    */
    
    sourceX = 0;
    sourceY = 0;

    this.ctx.drawImage(this.backdrop, this.backdropX, this.backdropY);
    this.ctx.drawImage(this.display, 
                       sourceX, sourceY, this.displayWidth, this.displayHeight,
                       this.displayX, this.displayY, this.displayWidth, this.displayHeight);
}

/*
Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
*/
