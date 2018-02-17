function Shape(xOffset, yOffset, owner) {
	this.xOffset = xOffset;
	this.yOffset = yOffset;

    this.owner = owner;
    this.x = 0;
    this.y = 0;
}

Shape.prototype = new Shape();
Shape.prototype.constructor = Shape;

Shape.prototype.doesCollide = function(otherShape) {
	var collides = false;
	if (otherShape instanceof Circle && this instanceof Circle) {
		//circle circle collision
		collides = this.doesCircleCircleCollide(this, otherShape);
	} else if ((otherShape instanceof Circle && this instanceof Box) 
				|| (otherShape instanceof Box && this instanceof Circle)) {
		//circle box collision
		collides = this.doesCircleBoxCollide(this, otherShape);
	} else if (otherShape instanceof Box && this instanceof Box) {
		//box box collision
		collides = this.doesBoxBoxCollide(this, otherShape);
	}
	
	return collides;
}

Shape.prototype.doesCircleCircleCollide = function (shape, otherShape) {
	var dx = shape.x - otherShape.x;
	var dy = shape.y - otherShape.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	if (distance < shape.r + otherShape.r){ 
		return true;
	}
	return false;
}

Shape.prototype.doesCircleBoxCollide = function (shape, otherShape) {
	if (shape instanceof Circle) {
		//shape is circle, otherShape is box
		return this.helperCircleBoxCollide(shape, otherShape);
	} else {
		//shape is box, otherShape is circle
		return this.helperCircleBoxCollide(otherShape, shape);
	}
}

Shape.prototype.helperCircleBoxCollide = function (circle, box) {
	//do circle box collision detection here
	var collision = false;
	var b = {x: box.x - circle.r, y: box.y - circle.r, w: box.w + 2 * (circle.r), h: box.h + 2 * (circle.r)};
	if (circle.x > b.x && circle.x < (b.x + b.w)
		&& circle.y > b.y && circle.y < (b.y + b.h)) {
		
		//circle center is within the (box+circle r box) so check new box corners
		var left = box.x; 
		var right = box.x + box.w;
		var up = box.y;
		var down = box.y + box.h;
		if ((circle.x < left || circle.x > right) 
			&& (circle.y > up || circle.y < down)) {
			//check shaded box corners because circle if withing outer box and within r of box corner
			//new circle with xy as box xy r = 0 
			//circle circle collision with circle and new circle		
			var pointCircle = {x: box.x, y: box.y, r: 0};			//top left corner of box
			collision |= this.doesCircleCircleCollide(circle, pointCircle);
			
			pointCircle = {x: box.x, y: box.y + box.height, r: 0};	//bottom left corner of box
			collision |= this.doesCircleCircleCollide(circle, pointCircle);
			
			pointCircle = {x: box.x + box.width, y: box.y, r: 0};	//top right corner of box
			collision |= this.doesCircleCircleCollide(circle, pointCircle);
			
			pointCircle = {x: box.x + box.width, y: box.y + box.height, r: 0};	//bottom right corner of box
			collision |= this.doesCircleCircleCollide(circle, pointCircle);
		} else { 	//not in corner, but colliding
			collision = true;
		}
	}
	return collision;
}

Shape.prototype.doesBoxBoxCollide = function (shape, otherShape) {
	if(shape.x < (otherShape.x + otherShape.w) 
		&& otherShape.x < (shape.x + shape.w)  
		&& shape.y < (otherShape.y + otherShape.h) 
		&& otherShape.y < (shape.height + shape.y) ) {
			return true;
	}
	return false;
}

Shape.prototype.update = function () {
    this.x = this.owner.physics.x + this.xOffset * this.owner.physics.scale;
    this.y = this.owner.physics.y + this.yOffset * this.owner.physics.scale;
}
