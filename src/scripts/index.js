var RuneGrid = {
	
	xUnits: 4,
	yUnits: 4,
	xRes: 50,
	yRes: 50,
	silverRatio: Math.sqrt(2),
	goldenRatio: (1 + Math.sqrt(5)) / 2,

	canvas : {},

	gridLayers : [],

	init: function() {

		console.log(this);

		var letter = [
			[0, 12],
			[0, 0],
			[0, 1],
			[1, 10],
			[0, 10],
			[0, 2],
			[0, 3],
			[0, 15],
			[0, 14],
			[1, 5],
			[0, 13]

		];

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

		this.gridLayers[1] =  this.setupGrid(
			paper, 
			this.totalUnits(), 
			this.yUnits,
			this.xRes,
			this.yRes,
			// new paper.Point((20 * Math.sqrt(2)) - 20, 0)
			new paper.Point(0, (this.yRes * this.silverRatio) - this.yRes)
		);

		var grid = this.gridLayers[0];

		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		path.fillColor = '#e9e9ff';

		var start = new paper.Point(0, 0);
		// Move to start and draw a line from there
		path.moveTo(start);

		var that = this;

		$.each(this.gridLayers, function(idx, grid) {
			var color = 'black';
			var circles = true;
			switch(idx) {
				case 1 :
					circles = false;
					color = 'red';
				break;
			}
			that.drawPoints(grid, color, paper, circles);
		});
		
		var letterLayer = new paper.Layer();

		var secondPath = new paper.Path();

		path.strokeColor = 'red';

		$.each(letter, function(idx, point) {
			if(!idx) {
				path.moveTo(that.gridLayers[point[0]][point[1]]);
			} else {
				path.lineTo(that.gridLayers[point[0]][point[1]]);
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
		$.each(locations, function(idx, point) {
			console.log(point);
			if(circles) {
				var circle = new paper.Path.Circle(point, RuneGrid.xRes * Math.sqrt(2));
				circle.strokeColor = color;
			}
			var recPath = new paper.Path.Rectangle(point, RuneGrid.xRes);
			recPath.strokeColor = color;
			var pointText = new paper.PointText({point: point, content: idx});
			pointText.fillColor = color;
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
		"template" : "grid",
		"data": {

		},
		
	}], callback
);


