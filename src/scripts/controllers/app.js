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
					"points" : [1, 28, 34, 7],
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

				// var angle = getAngle(points[0], points[2]);

				// console.log("angle: " + angle);

				var testPath = new paper.Path();

				testPath.strokeColor = 'black';

				testPath.moveTo(points[0]);
				testPath.lineTo(points[2]);

				var x = ((points[2].x - points[0].x) / 2) + points[0].x;
				var y = ((points[2].y - points[0].y) / 2) + points[0].y;

				var midPoint = new paper.Point(x, y);

				var circle = new paper.Path.Circle(midPoint, that.xRes / 2);
				circle.strokeColor = 'black'

				var hyp = points[0].getDistance(midPoint);

				var line = new paper.Point(points[2]);

				console.log(line);

				var adj = that.xRes / 2;

				var side = Math.sqrt(hyp*hyp - adj*adj);

				line.angle = (Math.acos( adj / hyp) * (180/Math.PI));

				var nLine = line.normalize();

				console.log(side);

				nLine.length = nLine.length * side;

				console.log(nLine);

				var newPoint = points[2].subtract(nLine);


				console.log(newPoint);

				testPath.lineTo(newPoint);

				function getAngle(p1, p2) {
					// var adj = that.xRes;

					var adj = p1.getDistance(new paper.Point(p2.x, p1.y));
					var hyp = p1.getDistance(p2);

					// cos() = a / h;

					return (Math.PI / 2) - Math.acos( adj / hyp );

				}

				// SOH				

				// o / sin() = h;

				// var opp = that.xRes;

				// var hyp =  opp / Math.sin(angle);

				// console.log("Hyp: " + hyp);


				// switch(dir) {
				// 	case "down" :
				// points[3].y = hyp;

				// var dist = points[1].getDistance(points[2]);

				// points[1].y -= hyp - dist;
				// 	break;

				// 	case "up" :
				// 		point.y -= hyp - point.y;
				// 	break;
				// }

				

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

		return this;

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


