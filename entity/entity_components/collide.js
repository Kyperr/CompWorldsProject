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
	var dx = shape.x - otherShape.x;
	var dy = shape.y - otherShape.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	if (distance < shape.radius + otherShape.radius){ 
		return true;
	}
	return false;
}

Collide.prototype.doesCircleBoxCollide = function (shape, otherShape) {
	if (shape.type === CIRCLE) {
		//shape is circle, otherShape is box
		return helperCircleBoxCollide(shape, otherShape);
	} else {
		//shape is box, otherShape is circle
		return helperCircleboxCollide(otherShape, shape);
	}
}

Collide.prototype.helperCircleBoxCollide = function (circle, box) 
	//do circle box collision detection here
}

Collide.prototype.doesBoxBoxCollide = function (shape, otherShape) {
	if(shape.x < otherShape.x + otherShape.width 
		&& shape.x + shape.width > otherShape.x 
		&& shape.y < otherShape.y + otherShape.height 
		&& shape.height + shape.y > otherShape.y) {
			return true;
	}
	return false;
}

