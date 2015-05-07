
/* ========== Grid ========== */

function Grid(options) {
	
	this.res = options.res;
	this.xUnits = options.xUnits;
	this.yUnits = options.yUnits;
	this.padding = options.padding;

	// console.log(this);

	/* ------ Setup default points ------ */

	var currentY = 0;
	var currentX = 0;

	this.points = [];

	for(var i = 0; i < this.getTotalUnits(); i++) {
		if(i % this.yUnits == 0 && i != 0) {
			currentY++;
			currentX = 0;
		}

		var point = [currentX * this.res + options.padding, currentY * this.res + options.padding];

		this.points[i] = point;

		currentX++;
	
	}

	// this.layer = new paper.Layer();

}

Grid.prototype.getTotalUnits = function() {
 	return this.xUnits * this.yUnits;
};

Grid.prototype.getWidth = function() {
	return this.res * this.xUnits;
};

Grid.prototype.getHeight =  function() {
	return this.res * this.yUnits;
};

Grid.prototype.hide = function() {
	this.layer.visible = false;
}

Grid.prototype.show = function() {
	this.layer.visible = true;
}


Grid.prototype.reset = function() {
	
}

var createGridPoint = function(point, value) {

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

		var event = new CustomEvent('addPoint', { 'detail' : e.target.value});
		
		document.dispatchEvent(event);

	}
}
