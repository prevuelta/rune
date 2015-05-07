//= require rune/actionbarController
//= require rune/gridController

function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);


}

WorkSpace.prototype = {
	displayTablet : function(tablet) {
		addView($(this.options.tabletContainer), 'rune-tablets', { runes : tablet.runes }, null);
	},
	displayToolbar : function() {

	},
	displayRune : function(runeModel) {
		this.runeView = new RuneView(runeModel);
	},
	displayActionBar : function() {

		var actionBar = new ActionBar();

		addView($(this.options.actionbarContainer), 'rune-actionbar', { "actions" : actionBar.actions}, function() {
			actionBar.init();
		});
	},
	drawLetter : function(letterModel) {
		this.runeView.drawLetter(letterModel.gridPoints);
	}
}

/* ========== Render Rune ========== */

function RuneView (runeModel) {

	var rune = this;

	// Setup grid
	this.grid = new Grid(
		runeModel.gridOptions
	);

	console.log(runeModel);

	this.addLetterView();

	this.layers = {
		"grid" : new paper.Layer(),
		"letter" : new paper.Layer()
	}

	this.drawGrid();

	this.drawLetter(runeModel.letter.gridPoints);

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	update : function() {
	// this.letter.clear()
	// this.letter.render(rune.grid);
	// this.letter.draw(this.paper);
	},
	drawLetter : function(gridPoints) {

		this.letter.computePoints(gridPoints, this.grid);

		this.layers.letter.activate();

		this.letter.draw(this);
	},
	drawGrid : function() {

		this.layers.grid.activate();

		$.each(this.grid.points, function(idx, point) {

			var paperPoint = new paper.Point(point);

			createGridPoint(paperPoint, idx);

		});

	},
	hideGrid : function() {
		this.grid.hide();
	},
	redraw : function() {
		paper.view.draw();
	},
	addLetterView : function() {
		this.letter = new LetterView();
	}
}


/* ========== Letter ========== */

function LetterView() {

	this.renderedPoints = [];
	
}


LetterView.prototype = {
	computePoints : function(gridPoints, grid) {

		var renderTemp = [];

		$.each(gridPoints, function(idx, point) {
			renderTemp.push(grid.points[point]);
		});


		var indices = util.getIndices(gridPoints, grid.points);

		var punits = indices.map(function(idx) {
			return renderTemp[idx];
		});

		this.renderedPoints = renderTemp;

		console.log(this);

	},
	clear : function() {
		this.layer.removeChildren();
	},
	draw : function() {

		var letter = this;
		
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
}
