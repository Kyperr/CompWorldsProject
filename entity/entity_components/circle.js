function Circle(x, y, radius, owner) {
	/*Super init*/
	Shape.call(this, x, y, owner);
	this.r = radius;
}

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
