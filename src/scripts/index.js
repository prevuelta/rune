var runeGrid = {
	
	xUnits: 4,
	yUnits: 4,
	xRes: 40,
	yRes: 40,


	init: function() {


		var grid = [];

		var locations = [];

		var currentY = 0;
		var currentX = 0;

		var canvas = document.getElementById('rune-grid');
		// Create an empty project and a view for the canvas:
		paper.setup(canvas);

		for(i = 0; i < runeGrid.totalUnits(); i++) {
			if(i % runeGrid.yUnits == 0 && i != 0) {
				currentY++;
				currentX = 0;
			}
			grid[i] = new paper.Point(currentX * runeGrid.xRes, currentY * runeGrid.yRes);
			currentX++;
			
			console.log(currentX + " " + currentY);
		}



		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		path.fillColor = '#e9e9ff';

		var start = new paper.Point(0, 0);
		// Move to start and draw a line from there
		path.moveTo(start);

		$.each(grid, function(idx, point) {
			var recPath = new paper.Path.Rectangle(point, 2);
			recPath.fillColor = 'black';
			// var path = paper.Rectangle(rec);
		});

		// Draw the view now:
		paper.view.draw();

	

	},
	getWidth: function() {
		return runeGrid.xUnits & runeGrid.xRes;
	},
	getHeight: function() {
		return runeGrid.yUnits * runeGrid.yRes;
	},
	totalUnits: function() {
		return runeGrid.xUnits * runeGrid.yUnits;
	}
}




setupPage({
	"grid" : {
		"data": {

		},
		"callback" : runeGrid.init
	}
});


