//= require rune/views/LetterView
//= require rune/views/GridView

/* ========== Render Rune ========== */

function RuneView (runeModel) {

	var rune = this;

	this.layers = {
		"grid" : new paper.Layer(),
		"letter" : new paper.Layer()
	}

	// Setup grid

	this.addGrid(runeModel.gridOptions);

	this.addLetterView();

	console.log(runeModel);

	this.drawLetter(runeModel.letter);

	this.redraw();

	this.showGrid = true;


}

RuneView.prototype = {
	constructor: RuneView,
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(letter) {

		this.clearLetterView();

		this.letter.computePoints(letter, this.grid);

		this.layers.letter.activate();

		this.letter.draw(letter.selectedPoints);

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
