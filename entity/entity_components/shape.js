function Shape(x, y) {
	this.x = x;
	this.y = y;
}

Shape.prototype = Shape();
Shape.prototype.constructor = Shape;

Shape.prototype.doesCollide = function(otherShape) {
	var collides = false;
	if (otherShape instanceof Circle && this.shape instanceof Circle) {
		//circle circle collision
		collides = doesCircleCircleCollide(this.shape, otherShape);
	} else if ((otherShape instanceof Circle && this.shape instanceof Box) 
				|| (otherShape instanceof Box && this.shape instanceof Circle)) {
		//circle box collision
		collides = doesCircleBoxCollide(this.shape, otherShape);
	} else if (otherShape instanceof Box && this.shape instanceof Box) {
		//box box collision
		collides = doesBoxBoxCollide(this.shape, otherShape);
	}
	
	return collides;
}

Shape.prototype.doesCircleCircleCollide = function (shape, otherShape) {
	var dx = shape.x - otherShape.x;
	var dy = shape.y - otherShape.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	if (distance < shape.radius + otherShape.radius){ 
		return true;
	}
	return false;
}

Shape.prototype.doesCircleBoxCollide = function (shape, otherShape) {
	if (shape instanceof Circle) {
		//shape is circle, otherShape is box
		return helperCircleBoxCollide(shape, otherShape);
	} else {
		//shape is box, otherShape is circle
		return helperCircleboxCollide(otherShape, shape);
	}
}

Shape.prototype.helperCircleBoxCollide = function (circle, box) 
	//do circle box collision detection here
	var collision = false;
	var b = {x: box.x - circle.radius, y: box.y - circle.radius, w: box.width + 2 * (circle.radius), h: box.height + 2 * (circle.radius)};
	if (circle.x > b.x && circle.x < (b.x + b.w)
		&& circle.y > b.y && circle.y < (b.y + b.h)) {
		
		//circle center is within the (box+circle radius box) so check new box corners
		var left = box.x; 
		var right = box.x + box.width;
		var up = box.y;
		var down = box.y + box.height;
		if ((circle.x < left || circle.x > right) 
			&& (circle.y > up || circle.y < down)) {
			//check shaded box corners because circle if withing outer box and within radius of box corner
			//new circle with xy as box xy radius = 0 
			//circle circle collision with circle and new circle		
			var pointCircle = {x: box.x, y: box.y, radius: 0};			//top left corner of box
			collision |= doesCircleCircleCollide(circle, pointCircle);
			
			pointCircle = {x: box.x, y: box.y + box.height, radius: 0};	//bottom left corner of box
			collision |= doesCircleCircleCollide(circle, pointCircle);
			
			pointCircle = {x: box.x + box.width, y: box.y, radius: 0};	//top right corner of box
			collision |= doesCircleCircleCollide(circle, pointCircle);
			
			pointCircle = {x: box.x + box.width, y: box.y + box.height, radius: 0};	//bottom right corner of box
			collision |= doesCircleCircleCollide(circle, pointCircle);
		} else { 	//not in corner, but colliding
			collision = true;
		}
	}
	return collision;
}

Shape.prototype.doesBoxBoxCollide = function (shape, otherShape) {
	if(shape.x < (otherShape.x + otherShape.width) 
		&& otherShape.x < (shape.x + shape.width) 
		&& shape.y < (otherShape.y + otherShape.height) 
		&& otherShape.y < (shape.height + shape.y) ) {
			return true;
	}
	return false;
}