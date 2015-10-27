var paper = require('paper');

var GridView = require('./grid/GridView.js');
var RuneView = require('./rune/RuneView.js');

/* ========== Render Tablet ========== */

function CanvasController (tabletModel) {

	// Canvas
	var canvasController = this;

	canvasController.canvas = document.getElementById('rune-canvas');

	paper.setup(canvasController.canvas).install(window);

	canvasController.gridLayer = new paper.Layer(),

	canvasController.layers = [];

	// Setup grid

	canvasController.setupGrid(tabletModel.tablet.gridOptions);

	canvasController.runeViews = [];

	tabletModel.tablet.runes.forEach(function(val, idx) {
		canvasController.layers.push(new paper.Layer());
		canvasController.runeViews.push(new RuneView(val, canvasController.grid));
	});

	canvasController.currentRuneIndex = 0;

	canvasController.draw();

	canvasController.showGrid = true;

}

CanvasController.prototype = {
	constructor: CanvasController,
	draw : function() {
		// Draw active layer
		this.layers[this.currentRuneIndex].removeChildren();
		this.layers[this.currentRuneIndex].activate();
		this.runeViews[this.currentRuneIndex].draw();
		this.redraw();
	},
	setActiveRune : function() {
		// this.runeView = new TabletView(runeModel);
	},

	setupGrid : function(gridOptions) {
		this.grid = new GridView(gridOptions);
		this.drawGrid(gridOptions);
	},
	drawGrid : function(gridPoints) {

		this.gridLayer.removeChildren();

		this.gridLayer.activate();

		this.grid.draw();

		this.redraw();

	},
	toggleGrid : function(showGrid) {
		this.showGrid = !this.showGrid;
		this.gridLayer.visible = this.showGrid;
		this.redraw();
	},
	redraw : function() {
		paper.view.draw();
	}
}

module.exports = CanvasController; 
