
/* ========== Grid ========== */

function Grid(xUnits, yUnits, xRes, yRes, padding) {
	
	this.xUnits = xUnits;
	this.yUnits = yUnits;
	this.xRes = xRes;
	this.yRes = yRes;

	/* ------ Setup default points ------ */

	var currentY = 0;
	var currentX = 0;

	this.points = [];

	for(var i = 0; i < this.getTotalUnits(); i++) {
		if(i % yUnits == 0 && i != 0) {
			currentY++;
			currentX = 0;
		}

		var point = [currentX * xRes + padding, currentY * yRes + padding];

		this.points[i] = point;

		currentX++;
	
	}
}

Grid.prototype.getTotalUnits = function() {
 	return this.xUnits * this.yUnits;
};

Grid.prototype.getWidth = function() {
	return this.xUnits * this.xRes;
};

Grid.prototype.getHeight =  function() {
	return this.yUnits * this.yRes;
};


// function GridPoint (paper, point, value) {

// 	this.value = value;

// 	this.path = paper.Path.Circle(point, 10);

// 	this.path.fillColor = new paper.Color(255, 0, 0, 0.2);

// 	this.path.onMouseEnter = function(e) {
// 		console.log(e.target._content);
// 		this.fillColor = 'red';
// 	}
// }

var GridPoint = function(paper, point, value) {

	// this.value = value;

	var path = paper.Path.Circle(point, 15);

	path.value = value;

	path.fillColor = new paper.Color(255, 0, 0, 0.2);
	
	path.onMouseDown = function(e) {
		console.log(e.target);
		this.fillColor = 'red';

		var event = new CustomEvent('addGridPoint', { 'detail' : e.target.value});
		
		document.dispatchEvent(event);

	}

	return path;
}
