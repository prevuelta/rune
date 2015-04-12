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

		var that = this;

		var letter = {
			"gridPoints" : [12, 0, 1, 10, 2, 3, 15, 14, 5, 13],
			"distortions" : [
				{
					"type" : "tri",
					"index" : 8,
					"dir" : "down",
					"p1" : 2,
					"p2" : 3
				},
				{
					"type" : "tri",
					"index" : 3,
					"dir" : "up",
					"p1" : 7,
					"p2" : 8
				}
			],
			"rendered" : [],
			render : function(grid) {
				console.log(this);
				var that = this;

				var renderTemp = [];

				$.each(this.gridPoints, function(idx, point) {
					renderTemp.push(grid[point]);
				});

				$.each(this.distortions, function(idx, dist) {
					that.distort(dist.dir, renderTemp[dist.index], renderTemp[dist.p1], renderTemp[dist.p2]);
				});

				that.rendered = renderTemp;
			},
			distort: function(dir, point, p1, p2) {

				var angle = getAngle(p1, p2);

				console.log("angle: " + angle);

				function getAngle(p1, p2) {
					var adj = that.xRes;
					var hyp = p1.getDistance(p2);

					return Math.acos( adj / hyp );
				}

				var adj = that.xRes;

				var hyp = adj / Math.cos(angle);

				console.log("Hyp" + hyp);

				switch(dir) {
					case "down" :
						point.y += hyp - point.y;
					break;

					case "up" :
						point.y -= hyp - point.y;
					break;
				}

				

			}
		};

		console.log(letter);

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

		letter.render(grid);

		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		path.fillColor = '#e9e9ff';

		var start = new paper.Point(0, 0);
		// Move to start and draw a line from there
		path.moveTo(start);

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
			console.log(point);
			if(circles) {
				var circle = new paper.Path.Circle(point, RuneGrid.xRes * Math.sqrt(2));
				circle.strokeColor = gridColor;
			}

			var recPath = new paper.Path.Rectangle(point, RuneGrid.xRes);
			recPath.strokeColor = gridColor;
			
			var pointText = new paper.PointText({point: point, content: idx});
			pointText.fillColor = color;

			pointText.onMouseDown = function(e) {
				console.log(e.target._content);
			}
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


