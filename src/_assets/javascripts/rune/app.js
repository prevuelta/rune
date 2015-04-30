//= require rune/const
//= require rune/util
//= require rune/Grid
//= require rune/Letter
//= require rune/Rune
//= require rune/Tablet

/* ========== Paper prototypes ========== */

paper.Point.prototype.getMid = function(p2) {
	return new paper.Point((this.x + p2.x) / 2, (this.y + p2.y) / 2);
};


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


