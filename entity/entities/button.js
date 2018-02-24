
/*
 * Constructs a new Button.
 * game: the GameEngine of which this Button is a member.
 * ctx: the canvas context in which this Button will be drawn.
 * backdropImage: a static image containing the backdrop of the Button.
 * (bWidth, bHeight): the overall dimensions of the backdropImage.
 * (bCenterX, bCenterY): the center of where on the backdrop the display should be drawn.
 * displaySpritesheet: the spritesheet for the display.
 * (dWidth, dHeight): the dimensions of each frame of the display.
 */
function Button(game, ctx, x, y, backdropScale, 
                backdropImage, bWidth, bHeight, bCenterX, bCenterY, 
                displaySpritesheet, dWidth, dHeight, displayScale) {
    /*Super init*/
    Entity.call(this, game);

    this.backdropScale = backdropScale;
    this.displayScale = displayScale;
    /*Sub init*/
    this.ctx = ctx;
    this.backdrop = backdropImage;
    this.display = displaySpritesheet;
    this.displayWidth = dWidth * this.displayScale;
    this.displayHeight = dHeight * this.displayScale;
    this.backdropWidth = bWidth * this.backdropScale;
    this.backdropHeight = bHeight * this.backdropScale;
    this.backdropX = x;
    this.backdropY = y;
    this.displayX = this.backdropX + (this.backdropWidth / 2) - Math.floor(this.displayWidth / 2);
    this.displayY = this.backdropY + (this.backdropHeight / 2) - Math.floor(this.displayHeight / 2);

    this.physics = new Physics(this, this.backdropX, this.backdropY, 
                               this.backdropWidth, this.backdropHeight, 
                               1, true);
    this.hitbox = new Box(0, 0, this.backdropWidth, this.backdropHeight, this);
    this.hitbox.update();
}

Button.prototype = new Entity();
Button.prototype.constructor = Button;

Button.prototype.draw = function () {    
    this.ctx.drawImage(this.backdrop, this.backdropX, this.backdropY, this.backdropWidth, this.backdropHeight);
    this.ctx.drawImage(this.display, this.displayX, this.displayY, this.displayWidth, this.displayHeight);
    if (DRAW_HITBOXES) {
        this.ctx.beginPath();
        this.ctx.lineWidth=2;
        this.ctx.strokeStyle="green";
        this.ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h); 
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

