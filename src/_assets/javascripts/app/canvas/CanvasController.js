//= require_tree .

/* ========== Render Tablet ========== */

function CanvasController (tabletModel) {

	// Canvas

	this.canvas = document.getElementById('tablet');

	paper.setup(this.canvas).install(window);

	this.layers = {
		"grid" : new paper.Layer()
	};

	// Setup grid

	this.setupGrid(tabletModel.tablet.gridOptions);

	// this.drawLetter(runeModel.letter);

	this.redraw();

	this.showGrid = true;

}

CanvasController.prototype = {
	constructor: CanvasController,
	toggleGrid: function() {
		// this.runeView.showGrid = !app.workspace.runeView.showGrid;
		// this.runeView.toggleGrid(app.workspace.runeView.showGrid);
	},	
	drawRune : function(data) {
		// this.runeView.draw(data);
	},

	setActiveRune : function(runeModel) {
		this.tabletView = new TabletView(runeModel);
	},
	clearLetterView : function() {
		this.layers.letter.removeChildren();
		this.redraw();
	},
	drawLetter : function(letter) {

		// this.clearLetterView();

		// this.layers.letter.activate();

		// this.letter.draw(letter, this.grid);

		// this.redraw();

	},
	setupGrid : function(gridOptions) {
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
