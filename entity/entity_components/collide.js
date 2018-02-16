function Collide(shape) {
	this.shape = shape;
	this.shape.type = shape.type;
}

Collide.prototype = new Collide();
Collide.prototype.constructor = Collide;

Collide.prototype.doesCollide = function(otherShape) {
	var collides = false;
	if (otherShape.type === CIRCLE && this.shape.type === CIRCLE) {
		//circle circle collision
		collides = doesCircleCircleCollide(this.shape, otherShape);
	} else if ((otherShape.type === CIRCLE && this.shape.type === BOX) 
				|| (otherShape.type === BOX && this.shape.type === CIRCLE)) {
		//circle box collision
		collides = doesCircleBoxCollide(this.shape, otherShape);
	} else if (otherShape.type === BOX && this.shape.type === BOX) {
		//box box collision
		collides = doesBoxBoxCollide(this.shape, otherShape);
	}
	
	return collides;
}

Collide.prototype.doesCircleCircleCollide = function (shape, otherShape) {
	
}

Collide.prototype.doesCircleBoxCollide = function (shape, otherShape) {
	
}

Collide.prototype.doesBoxBoxCollide = function (shape, otherShape) {
	
}

