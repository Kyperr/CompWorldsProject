function Circle(x, y, radius) {
	/*Super init*/
	Shape.call(x, y);
	this.radius = radius;
}

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
