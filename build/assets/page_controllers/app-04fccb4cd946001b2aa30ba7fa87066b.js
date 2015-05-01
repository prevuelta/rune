
const SILVER_RATIO = Math.sqrt(2);
const GOLDEN_RATIO =  (1 + Math.sqrt(5)) / 2;

/* ========== Utilities ========== */


var util = {
	getIndices: function(points, gridPoints) {
		console.log(points);
		return points.map(function(point) {
			return gridPoints.indexOf(point);
		});
	},
	object: function (o) {
        function F() {}
        F.prototype = o;
        return new F();
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
	}
}
;

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
;

/* ========== Letter ========== */


function Letter(options, paper) {


	var _options = {
		
	}

	this.options = $.extend(_options, options);

	this.renderedPoints = [];

	this.gridPoints = [];

	console.log(paper);

	this.layer = new paper.project.Layer();

}

Letter.prototype.clearPoints = function() {
	this.options.gridPoints = [];
}

Letter.prototype.addPoint= function(point) {
	this.options.gridPoints.push(point);
}

Letter.prototype.render = function(grid) {

	var renderTemp = [];

	$.each(this.gridPoints, function(idx, point) {
		renderTemp.push(grid.points[point]);
	});

	console.log(grid.points);

	var indices = util.getIndices(this.gridPoints, grid.points);

	var punits = indices.map(function(idx) {
		return renderTemp[idx];
	});

	this.renderedPoints = renderTemp;

}

Letter.prototype.clear = function() {
	this.layer.removeChildren();
}

Letter.prototype.draw = function(paper) {

	var letter = this;

	letter.layer.activate();

	var letterPath = new paper.Path();

	letterPath.strokeColor = 'black';

	$.each(letter.renderedPoints, function(idx, point) {

		if(idx) {
			letterPath.lineTo(point);
		} else {
			letterPath.moveTo(point);
		}

	});
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
;

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

	this.addLetter(this.paper);

	var rune = this;

	document.addEventListener('addGridPoint', function(e) { 
		// that.addGridPoint(e.detail) ;
		console.log("point added" + e.detail);
		// rune.letter.push(e.detail);
		rune.letter.gridPoints.push(e.detail);

		rune.update();
	
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

Rune.prototype.update = function() {
	this.letter.clear()
	this.letter.render(rune.grid);
	this.letter.draw();
}

Rune.prototype.draw = function(pointArray) {

	var that = this;

	$.each(pointArray, function(idx, point) {

		var paperPoint = new that.paper.Point(point);

		var path = createGridPoint(paper, paperPoint, idx);

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

Rune.prototype.addLetter = function(paper) {
	this.letter = new Letter(paper);
}
;
/* ========== Tablet ========== */



function createTablet() {

	var tablet = [];

	return tablet;

}
;
var actionBar = {
	init: function(container) {
		this.actions.each(function(key, value) {
			$('[data-type="' + key + '"]').on('click', value.action);
		});
	},
	actions: {
		save : {
			title : "Save tablet",
			action : function() {
				console.log("Saved");
			}
		},
		clear : {
			title : "Clear",
			action: function() {
				console.log("Cleared");
				document.dispatchEvent("clear");
			}
		}
	}
}
;








'use strict';

var tablet = createTablet();



var callback = function() {

	tablet.push(
		rune = new Rune({
			xUnits: 10,
			yUnits: 10,
			xRes: 30,
			yRes: 30,
			canvasId: 'rune-grid',
			padding: 30
		}, paper)
	);

	addView($('#rune-tablet'), 'rune-tablets', {}, null);

}

setupPage([
	{
		"view" : "app",
		"model": {

		},
		
	}], callback
);
