function Box(x, y, width, height, owner) {
	/*Super init*/
	Shape.call(this, x, y, owner);
	
	this.w = width;
	this.h = height;
}

Box.prototype = new Shape();
Box.prototype.constructor = Box;
