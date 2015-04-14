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

		var letter = {
			"gridPoints" : [31, 30, 0, 1, 28, 4, 5, 35, 34, 7],
			"distortions" : 
				{
					"type" : "tri",
					"points" : [1, 28, 34 ,7],
				}
				// {
				// 	"type" : "tri",
				// 	"index" : 3,
				// 	"dir" : "up",
				// 	"p1" : 7,
				// 	"p2" : 8
				// }
			,
			"rendered" : [],
			init: function() {

			},
			render : function(grid) {
				console.log(this);
				var that = this;

				var renderTemp = [];

				$.each(this.gridPoints, function(idx, point) {
					renderTemp.push(grid[point]);
				});

				console.log(this.distortions.points);

				var indices = this.getIndices(this.distortions.points, this.gridPoints);

				var punits = indices.map(function(idx) {
					return renderTemp[idx];
				});

				that.correct(punits);

				that.rendered = renderTemp;
			},
			getIndices: function(points, gridPoints) {
				console.log(points);
				return points.map(function(point) {
					return gridPoints.indexOf(point);
				});
			},
			correct: function(points) {

				// Draw it all
				var testPath = new paper.Path();

				testPath.strokeColor = 'black';

				testPath.moveTo(points[0]);
				testPath.lineTo(points[2]);

				var x = ((points[2].x - points[0].x) / 2) + points[0].x;
				var y = ((points[2].y - points[0].y) / 2) + points[0].y;

				var midPoint = new paper.Point(x, y);

				var circle = new paper.Path.Circle(midPoint, that.xRes / 2);
				circle.strokeColor = 'black'

				/* ------ First triangulation ------ */

				// Hypothesis to midpoint
				var t1_hyp = points[2].getDistance(midPoint);
				var t1_adj = that.xRes / 2;

				// var theta = 
				var t1_phi = 90 - radDeg(Math.acos( t1_adj / t1_hyp));

				console.log("Phi " + t1_phi);

				// New vector
				var vec = new paper.Point(points[2]);
				vec.angle = (90 - radDeg( getAngle(points[0], points[2]))) - t1_phi;

				var side = getSize(null, t1_adj, t1_hyp);

				var newVector = vec.normalize();

				console.log("Side" + side);

				newVector.length = newVector.length * side;

				var newPoint = points[2].subtract(newVector);

				console.log(newPoint);

				// testPath.lineTo(newPoint);

// 
				/* ------ Second triangulation ------ */

				var otherPoint = new paper.Point(points[0].x, points[2].y);

				console.log(otherPoint + " " + points[2]);

				testPath.lineTo(otherPoint);

				testPath.lineTo(points[2]);

				var t2_adj = otherPoint.getDistance(points[2]);

				console.log("adj" + t2_adj);

				console.log("Vec angle" + vec.angle);

				var t2_hyp = t2_adj / Math.cos( degRad(vec.angle) );

				console.log("Hyp: " + t2_hyp + "  " +  newVector.length);

				newVector.length = Math.abs(t2_hyp) - newVector.length;

				var newnewpoint = newPoint.subtract(newVector);

				testPath.lineTo(newnewpoint);

				var finalMeasure = points[0].getDistance(newnewpoint);

				points[3].y = points[0].y + finalMeasure;
				points[1].y = points[2].y - finalMeasure;

				function getAngle(p1, p2) {
					// var adj = that.xRes;

					var adj = p1.getDistance(new paper.Point(p2.x, p1.y));
					var hyp = p1.getDistance(p2);

					// cos() = a / h;

					return (Math.PI / 2) - Math.acos( adj / hyp );

				}

				function radDeg(radians) {
					return radians * (180 / Math.PI)
				}

				function degRad(degrees) {
					return degrees / (180 / Math.PI);
				}

				function getSize(adj, opp, hyp) {
					if(adj & hyp) {
						return Math.sqrt(hyp*hyp - adj*adj);
					} else if(adj & opp) {
						return Math.sqrt(opp*opp + adj*adj);
					} else if(opp & hyp) {
						return Math.sqrt(hyp*hyp - opp*opp);
					}
				}				

			}
		};

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
	drawLetter : function() {
		// runeGrid.canvas

	},
	getWidth: function() {
		return this.xUnits & this.xRes;
	},
	getHeight: function() {
		return this.yUnits * this.yRes;
	},
	totalUnits: function() {
		return this.xUnits * this.yUnits;
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
	setupGrid : function(paper, totalUnits, yUnits, xRes, yRes, offset) {

		var currentY = 0;
		var currentX = 0;

		var grid = [];

		for(i = 0; i < totalUnits; i++) {
			if(i % yUnits == 0 && i != 0) {
				currentY++;
				currentX = 0;
			}
			var point = new paper.Point(currentX * xRes, currentY * yRes);

			grid[i] = point.add(offset);

			currentX++;
		
		}

		return grid;
	}
}

var callback = function() {
	RuneGrid.init();
}

setupPage([
	{
		"view" : "grid",
		"model": {

		},
		
	}], callback
);


