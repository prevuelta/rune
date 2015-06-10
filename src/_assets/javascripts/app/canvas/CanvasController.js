//= require_tree .

/* ========== Render Rune ========== */

function CanvasController (options, tabletModel) {

	// Canvas

	var canvas = document.getElementById(this.options.canvasId);

	paper.setup(canvas);

	paper.install(window);

	var rune = this;

	this.layers = {
		"grid" : new paper.Layer()
	};

	// Setup grid

	this.addGrid(runeModel.gridOptions);

	this.addLetterView();

	console.log(runeModel);

	this.drawLetter(runeModel.letter);

	this.redraw();

	this.showGrid = true;

}

CanvasController.prototype = {
	constructor: CanvasController,
	toggleGrid: function() {
		this.runeView.showGrid = !app.workspace.runeView.showGrid;
		this.runeView.toggleGrid(app.workspace.runeView.showGrid);
	},	
	drawLetter : function(letterModel) {
		this.runeView.drawLetter(letterModel);
	},

	setActiveRune : function(runeModel) {

		this.runeView = new RuneView(runeModel);

	},
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
