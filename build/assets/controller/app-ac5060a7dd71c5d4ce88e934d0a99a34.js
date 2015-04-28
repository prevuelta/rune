'use strict';

//= require app/util



const SILVER_RATIO = Math.sqrt(2);
const GOLDEN_RATIO =  (1 + Math.sqrt(5)) / 2;

/* ========== Paper prototypes ========== */

paper.Point.prototype.getMid = function(p2) {
	return new paper.Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
};

/* ========== Letter ========== */

function Letter(options) {

	var _options = {
		gridPoints : []
	}

	this.options = $.extend(_options, options);

	this.renderedPoints = [];

	var that = this;
}

Letter.prototype.clear = function() {
	this.options.gridPoints = [];
}

Letter.prototype.addPoint= function(point) {
	this.options.gridPoints.push(point);
}

Letter.prototype.render = function() {

	var renderTemp = [];

	$.each(this.gridPoints, function(idx, point) {
		renderTemp.push(grid[point]);
	});

	var indices = this.getIndices(this.distortions.points, this.gridPoints);

	var punits = indices.map(function(idx) {
		return renderTemp[idx];
	});

	this.renderedPoints = renderTemp;

}

Letter.prototype.distort = function(type) {
	switch(type) {
		case "random" : 
			this.renderedPoints.forEach(function(idx, element) {
				// Insert randomness here
			});
		break;
		default:
		break;
	}
}

Letter.prototype.changeWeight = function(points, type) {

	var showConstructors = true;

	// Draw it all
	// var testPath = new paper.Path();

	// testPath.strokeColor = 'black';

	// testPath.moveTo(points[0]);
	// testPath.lineTo(points[2]);

	// var circle = new paper.Path.Circle(midPoint, that.xRes / 2);
	// circle.strokeColor = 'black'

	//testPath.lineTo(otherPoint);

	//testPath.lineTo(points[2]);

	/* ------ Get initial vars ------ */

	var midPoint = points[0].getMid(points[2]);

	/* ------ First triangulation ------ */

	// Hypothesis to midpoint
	var t1_hyp = points[2].getDistance(midPoint);

	// Adj 
	var t1_adj = that.xRes / 2;

	var t1_phi = 90 - trigUtil.radToDeg(Math.acos( t1_adj / t1_hyp));

	// var vec = new paper.Point(points[2]);
	var vec = new paper.Point();

	vec.angle = (90 - trigUtil.radToDeg( trigUtil.getAngle(points[0], points[2]))) - t1_phi;

	var side = trigUtil.getSize(null, t1_adj, t1_hyp);

	var normalizedVector = vec.normalize();

	var finalVector = new paper.Point();

	finalVector.length = normalizedVector.length * side;

	var tangentPoint = points[2].subtract(finalVector);
 
	/* ------ Second triangulation ------ */

	var otherPoint = new paper.Point(points[0].x, points[2].y);

	var t2_adj = otherPoint.getDistance(points[2]);

	var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

	// New length for vector (reflects distance to new point[3]
	finalVector.length = Math.abs(t2_hyp) - finalVector.length;

	var newPoint3 = newPoint.subtract(newVector);

	var finalMeasure = points[0].getDistance(newPoint3);

	points[3].y = points[0].y + finalMeasure;
	points[1].y = points[2].y - finalMeasure;

}

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



/* ========== Rune master class ========== */

function Rune(options, paper) {

	this.options = {
		xUnits: 4, 
		yUnits: 4,
		xRes: 20,
		yRes: 20,
		padding: 20,
		canvasId: 'RuneCanvas'
	};

	$.extend(this.options, options);

	console.log(options);

	this.letter = {};

	this.canvas = document.getElementById(this.options.canvasId);

	this.paper = paper;

	document.addEventListener('addGridPoint', function(e) { 
		// that.addGridPoint(e.detail) ;
		console.log("point added");
	} );

	// Setup grid
	this.grid = new Grid(
		this.options.xUnits, 
		this.options.yUnits,
		this.options.xRes,
		this.options.yRes,
		this.options.padding
	);

	this.paper.setup(this.canvas);

	this.drawGrid();

	this.finishDraw();

}

Rune.prototype.draw = function(pointArray) {

	var that = this;

	$.each(pointArray, function(idx, point) {

		var paperPoint = new that.paper.Point(point);

		var path = GridPoint(paper, paperPoint, idx);

		console.log(path);

	});

};

Rune.prototype.drawGrid = function() {

	this.draw(this.grid.points);

	// console.log(paper.project.exportSVG());
};

Rune.prototype.finishDraw = function() {
	paper.view.draw();
}

Rune.prototype.addLetter = function(options) {
	this.letter = new Letter(options);
}


/* ========== Tablet ========== */


function tablet() {


}



// var RuneGrid = {
	
// 	xUnits: 6,
// 	yUnits: 6,
// 	xRes: 40,
// 	yRes: 40,
// 	silverRatio: Math.sqrt(2),
// 	goldenRatio: (1 + Math.sqrt(5)) / 2,

// 	init: function() {


// 	},

// 	getWidth: function() {
// 		return this.xUnits & this.xRes;
// 	},
// 	getHeight: function() {
// 		return this.yUnits * this.yRes;
// 	},
// 	totalUnits: function() {
// 		return this.xUnits * this.yUnits;
// 	},
// 	drawPoints: function(locations, color, paper, circles) {
		
// 		var gridColor = new paper.Color(255, 0, 0, 0.2);

// 		$.each(locations, function(idx, point) {
// 			// console.log(point);
// 			if(circles) {
// 				var circle = new paper.Path.Circle(point, RuneGrid.xRes * Math.sqrt(2));
// 				circle.strokeColor = gridColor;
// 			}

// 			var recPath = new paper.Path.Rectangle(point, RuneGrid.xRes);
// 			recPath.strokeColor = gridColor;

// 			var pointText = new paper.PointText({point: new paper.Point(point.x, point.y+10), content: idx});
// 			pointText.fillColor = color;

// 			// pointText.onMouseDown = function(e) {
// 				// console.log(e.target._content);
// 			// }
// 			// recPath.fillColor = color;
// 			// var path = paper.Rectangle(rec);
// 		});
// 	},

// }

var callback = function() {

	// var tablet = new Tablet();

	var rune = new Rune({
		xUnits: 6,
		yUnits: 6,
		xRes: 40,
		yRes: 40,
		canvasId: 'rune-grid',
		padding: 30
	}, paper);

	rune.addLetter();

}

setupPage([
	{
		"view" : "grid",
		"model": {

		},
		
	}], callback
);


