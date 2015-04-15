
//[31, 30, 0, 1, 28, 4, 5, 35, 34, 7]

'use strict';

const SILVER_RATIO = Math.sqrt(2);
const GOLDEN_RATIO =  (1 + Math.sqrt(5)) / 2,

/* ========== Utilities ========== */

var util = {
	getIndices: function(points, gridPoints) {
		console.log(points);
		return points.map(function(point) {
			return gridPoints.indexOf(point);
		});
	}
}

var trigUtil = {
	getSize : function (adj, opp, hyp) {
			if(adj & hyp) {
				return Math.sqrt(hyp*hyp - adj*adj);
			} else if(adj & opp) {
				return Math.sqrt(opp*opp + adj*adj);
			} else if(opp & hyp) {
				return Math.sqrt(hyp*hyp - opp*opp);
			}				
	},
	getAngle: function(p1, p2) {
		// var adj = that.xRes;

		var adj = p1.getDistance(new paper.Point(p2.x, p1.y));
		var hyp = p1.getDistance(p2);

		// cos() = a / h;

		return (Math.PI / 2) - Math.acos( adj / hyp );

	},
	radToDeg: function(radians) {
		return radians * (180 / Math.PI)
	},
	degToRad: function(degrees) {
		return degrees / (180 / Math.PI);
	},
	getMidPoint: function(paper, p1, p2) {
		return new paper.Point( (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
	}
}


/* ========== Letter ========== */

function Letter(options) {

	var _options = {

	}

	this.options = $.extend(_options, options);
	this.renderedPoints = [];
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

	var midPoint = trigUtil.getMidPoint(paper, points[0], points[2]);

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

	var finalVector.length = normalizedVector.length * side;

	var tangentPoint = points[2].subtract(finalVector);
 
	/* ------ Second triangulation ------ */

	var otherPoint = new paper.Point(points[0].x, points[2].y);

	var t2_adj = otherPoint.getDistance(points[2]);

	var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

	// New length for vector (reflects distance to new point[3]
	finalVector.length = Math.abs(t2_hyp) - newVector.length;

	var newPoint3 = newPoint.subtract(newVector);

	var finalMeasure = points[0].getDistance(newPoint3);

	points[3].y = points[0].y + finalMeasure;
	points[1].y = points[2].y - finalMeasure;

}

/* ========== Grid ========== */

function Grid(paper, totalUnits, yUnits, xRes, yRes, offset) {

	var currentY = 0;
	var currentX = 0;

	this.points = [];

	for(i = 0; i < totalUnits; i++) {
		if(i % yUnits == 0 && i != 0) {
			currentY++;
			currentX = 0;
		}
		var point = new paper.Point(currentX * xRes, currentY * yRes);

		this.points[i] = point.add(offset);

		currentX++;
	
	}
}

Grid.prototype.getWidth = function() {
	return this.xUnits & this.xRes;
};

Grid.prototype.getHeight =  function() {
	return this.yUnits * this.yRes;
};

Grid.prototype.totalUnits = function() {
	return this.xUnits * this.yUnits;
};

/* ========== Rune master class ========== */

function Rune(xUnits, yUnits, xRes, yRes) {
	this.xRes = xRes;
}

Rune.prototype.render = function(canvas) {

}

/* ========== Tablet ========== */

function Tablet() {
	this.runes = {};
}





var RuneGrid = {
	
	xUnits: 6,
	yUnits: 6,
	xRes: 40,
	yRes: 40,
	silverRatio: Math.sqrt(2),
	goldenRatio: (1 + Math.sqrt(5)) / 2,

	canvas : {},

	gridLayers : [],

	init: function() {

		console.log(this);

		var that = this;

		
		// console.log(letter);

		this.canvas = document.getElementById('rune-grid');
		// Create an empty project and a view for the canvas:
		paper.setup(this.canvas);

		this.gridLayers[0] =  this.setupGrid(
			paper, 
			this.totalUnits(), 
			this.yUnits,
			this.xRes,
			this.yRes,
			new paper.Point(0, 0)
		);

		// this.gridLayers[1] =  this.setupGrid(
		// 	paper, 
		// 	this.totalUnits(), 
		// 	this.yUnits,
		// 	this.xRes,
		// 	this.yRes,
		// 	// new paper.Point((20 * Math.sqrt(2)) - 20, 0)
		// 	new paper.Point(0, (this.yRes * this.silverRatio) - this.yRes)
		// );

		var grid = this.gridLayers[0];

		letter.render(grid);

		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		path.fillColor = new paper.Color(255, 0, 0, 0.2);

		var start = new paper.Point(0, 0);
		// Move to start and draw a line from there
		path.moveTo(start);

		$.each(this.gridLayers, function(idx, grid) {
			var color = 'black';
			var circles = true;
			switch(idx) {
				case 1 :
					circles = false;
					color = new paper.Color(255, 0, 0, 0.2)
				break;
			}
			// that.drawPoints(grid, color, paper, circles);
		});
		
		var letterLayer = new paper.Layer();

		var secondPath = new paper.Path();

		path.strokeColor = new paper.Color(255, 255, 0, 0.2);

		$.each(letter.rendered, function(idx, point) {
			if(!idx) {
				path.moveTo(point);
			} else {
				path.lineTo(point);
			}
		});

		// Draw the view now:
		paper.view.draw();

		console.log(paper.project.exportSVG());

	},


	drawPoints: function(locations, color, paper, circles) {
		
		var gridColor = new paper.Color(255, 0, 0, 0.2);

		$.each(locations, function(idx, point) {
			// console.log(point);
			if(circles) {
				var circle = new paper.Path.Circle(point, RuneGrid.xRes * Math.sqrt(2));
				circle.strokeColor = gridColor;
			}

			var recPath = new paper.Path.Rectangle(point, RuneGrid.xRes);
			recPath.strokeColor = gridColor;

			var pointText = new paper.PointText({point: new paper.Point(point.x, point.y+10), content: idx});
			pointText.fillColor = color;

			// pointText.onMouseDown = function(e) {
				// console.log(e.target._content);
			// }
			// recPath.fillColor = color;
			// var path = paper.Rectangle(rec);
		});
	},

}

var callback = function() {
	// RuneGrid.init();
}

setupPage([
	{
		"view" : "grid",
		"model": {

		},
		
	}], callback
);


