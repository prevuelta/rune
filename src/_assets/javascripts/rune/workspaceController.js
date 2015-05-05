//= require rune/actionbarController
//= require rune/gridController

function WorkSpace(options) {

	this.options = options;

	// Load data

	this.displayActionBar();

	// Canvas

	console.log(options.canvasId);

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
	redrawLetter : function(letter) {
		this.runeView
	}
}

/* ========== Render Rune ========== */

function RuneView (runeModel) {

	var rune = this;

	// Setup grid
	this.grid = new Grid(
		runeModel.gridOptions
	);

	this.drawGrid();

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	update : function() {
	// this.letter.clear()
	// this.letter.render(rune.grid);
	// this.letter.draw(this.paper);
	},
	draw : function(pointArray) {

		$.each(pointArray, function(idx, point) {

			var paperPoint = new paper.Point(point);

			createGridPoint(paperPoint, idx);

		});
	},
	drawGrid : function() {

		this.draw(this.grid.points);

	},
	hideGrid : function() {
		this.grid.hide();
	},
	redraw : function() {
		paper.view.draw();
	},
	addLetterView : function(paper) {
		this.letter = new Letter(paper);
	}
}


/* ========== Letter ========== */

function Letter(paper) {


	// var _options = {
		
	// }

	// this.options = $.extend(_options, options);

	this.renderedPoints = [];

	this.gridPoints = [];

	this.layer = new paper.Layer();

}


Letter.prototype = {
	render : function(grid) {

		var renderTemp = [];

		$.each(this.gridPoints, function(idx, point) {
			renderTemp.push(grid.points[point]);
		});

		// console.log(grid.points);

		var indices = util.getIndices(this.gridPoints, grid.points);

		var punits = indices.map(function(idx) {
			return renderTemp[idx];
		});

		this.renderedPoints = renderTemp;

	},
	clear : function() {
		this.layer.removeChildren();
	},
	draw : function() {

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
}
