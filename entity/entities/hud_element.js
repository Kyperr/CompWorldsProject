
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
function HudElement(game, ctx, backdropX, backdropY, backdropScale,
                    backdropImage, bWidth, bHeight, bCenterX, bCenterY, 
                    displaySpritesheet, dWidth, dHeight, displayScale) {
    /*Super init*/
    Entity.call(this, game);

    /*Sub init*/
    this.backdropScale = backdropScale;
    this.displayScale = displayScale;

    this.ctx = ctx;
    this.backdrop = backdropImage;
    this.display = displaySpritesheet;

    this.backdropWidth = bWidth * this.backdropScale;
    this.backdropHeight = bHeight * this.backdropScale;
    this.backdropX = backdropX;
    this.backdropY = backdropY;

    this.displayWidth = dWidth * this.displayScale;
    this.displayHeight = dHeight * this.displayScale;
    this.displayX = backdropX + bCenterX * backdropScale - (this.displayWidth / 2);
    this.displayY = backdropY + bCenterY * backdropScale - (this.displayHeight / 2);
    this.sourceX = 0;
    this.sourceY = null;
}

HudElement.prototype = new Entity();
HudElement.prototype.constructor = HudElement;

HudElement.prototype.update = function () {
    yIndex = this.game.player.stats.maxHP - this.game.player.stats.hp;
    this.sourceY = yIndex * this.displayHeight;
}


HudElement.prototype.draw = function () {    
    this.ctx.drawImage(this.backdrop, this.backdropX, this.backdropY, this.backdropWidth, this.backdropHeight);
    this.ctx.drawImage(this.display, 
                       this.sourceX, this.sourceY, this.displayWidth, this.displayHeight,
                       this.displayX, this.displayY, this.displayWidth, this.displayHeight);
}

