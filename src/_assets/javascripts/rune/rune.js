//= require ../const
//= require ../util
//= require ../grid
//= require ../letter

/* ========== Paper prototypes ========== */

paper.Point.prototype.getMid = function(p2) {
	return new paper.Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
};


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


