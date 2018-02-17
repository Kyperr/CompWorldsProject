function Box(x, y, width, height) {
	/*Super init*/
	Shape.call(x, y);
	
	this.w = width;
	this.h = height;
}

Box.prototype = new Shape();
Box.prototype.constructor = Box;