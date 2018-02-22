
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
    /*Super init*/
    Entity.call(this, game);

    this.backdropScale = 0.35;

    /*Sub init*/
    this.ctx = ctx;
    this.backdrop = backdropImage;
    this.display = displaySpritesheet;
    this.displayWidth = dWidth;
    this.displayHeight = dHeight;
    this.backdropWidth = bWidth * this.backdropScale;
    this.backdropHeight = bHeight * this.backdropScale;
    this.backdropX = game.surfaceWidth - this.backdropWidth;
    this.backdropY = game.surfaceHeight - this.backdropHeight;
    this.displayX = this.backdropX + (bCenterX * this.backdropScale) - Math.floor(dWidth / 2);
    this.displayY = this.backdropY + (bCenterY * this.backdropScale) - Math.floor(dHeight / 2);
    this.sourceX = 0;
    this.sourceY = null;
}

HudElement.prototype = new Entity();
HudElement.prototype.constructor = HudElement;

HudElement.prototype.update = function () {
    yIndex = this.game.player.maxHealth - this.game.player.health;
    this.sourceY = yIndex * this.displayHeight;
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
    
    this.ctx.drawImage(this.backdrop, this.backdropX, this.backdropY, this.backdropWidth, this.backdropHeight);

    this.ctx.drawImage(this.display, 
                       this.sourceX, this.sourceY, this.displayWidth, this.displayHeight,
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