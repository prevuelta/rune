
/* ========== Grid ========== */

function Grid(xUnits, yUnits, xRes, yRes, padding, paper) {
	
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

	this.layer = new paper.Layer();

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

Grid.prototype.hide = function(paper) {
	this.layer.visible = false;
}

Grid.prototype.reset = function() {
	
}

var createGridPoint = function(paper, point, value) {

	var path = paper.Path.Circle(point, 15);

	path.value = value;
	path.active = false;

	var grey = new paper.Color(255, 0, 0, 0.2);

	path.fillColor = grey;
	
	path.onMouseEnter = function(e) {
		if(!this.active) {
			this.fillColor = 'orange';
		}
	}

	path.onMouseLeave = function(e) {
		if(!this.active) {
			this.fillColor = grey;
		}
	}

	path.onMouseDown = function(e) {

		this.fillColor = 'red';

		this.active = true;

		var event = new CustomEvent('addGridPoint', { 'detail' : e.target.value});
		
		document.dispatchEvent(event);

	}

	return path;
}
