//= require_tree .

/* ========== Render Rune ========== */

function CanvasController (tabletModel) {

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);

	paper.install(window);



	var rune = this;

	this.layers = {
		"grid" : new paper.Layer()
	};

	tabletModel.letter.forEach(){

	}

	// Setup grid

	this.addGrid(runeModel.gridOptions);

	this.addLetterView();

	console.log(runeModel);

	this.drawLetter(runeModel.letter);

	this.redraw();

	this.showGrid = true;

}

CanvasController.prototype = {
	constructor: RuneView,

	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(letter) {

		this.clearLetterView();

		this.layers.letter.activate();

		this.letter.draw(letter, this.grid);

		this.redraw();

	},
	addGrid : function(gridOptions) {
		this.grid = new GridView(gridOptions);
		this.drawGrid(gridOptions);
	},
	drawGrid : function(gridPoints) {

		this.layers.grid.removeChildren();

		this.layers.grid.activate();

		this.grid.draw();

		this.redraw();

	},
	toggleGrid : function(showGrid) {
		this.layers.grid.visible = showGrid;
		this.redraw();
	},
	redraw : function() {
		paper.view.draw();
	},
	addLetterView : function() {
		this.letter = new LetterView();
	}
}
