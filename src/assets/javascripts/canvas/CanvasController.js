var paper = require('paper');

var GridView = require('./GridView.js');
var TabletView = require('./TabletView.js');

/* ========== Render Tablet ========== */

function CanvasController (tabletModel) {

	// Canvas

	this.canvas = document.getElementById('rune-canvas');

	paper.setup(this.canvas).install(window);

	this.layers = {
		"grid" : new paper.Layer(),
		"letter" : new paper.Layer()
	};

	// Setup grid

	this.setupGrid(tabletModel.tablet.gridOptions);

	this.tabletView = new TabletView(tabletModel);

	// this.drawLetter(tabletModel.letter);

	this.redraw();

	this.showGrid = true;

}

CanvasController.prototype = {
	constructor: CanvasController,
	toggleGrid: function() {
		// this.runeView.showGrid = !app.workspace.runeView.showGrid;
		// this.runeView.toggleGrid(app.workspace.runeView.showGrid);
	},	
	draw : function(data) {
		// Draw active layer
		console.log("Trying to draw...");
		// this.runeView.draw(data);
	},

	setActiveRune : function(runeModel) {
		// this.runeView = new TabletView(runeModel);
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

module.exports = CanvasController; 
