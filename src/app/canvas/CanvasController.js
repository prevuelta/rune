var paper = require('paper');

var GridView = require('./grid/GridView.js');
var RuneView = require('./rune/RuneView.js');

/* ========== Render Tablet ========== */

function CanvasController (tabletModel) {

	// Canvas
	var canvasController = this;

    canvasController.data = tabletModel;

	canvasController.canvas = document.getElementById('rune-canvas');

	paper.setup(canvasController.canvas).install(window);

    paper.settings.handleSize = 8;

	canvasController.gridLayer = new paper.Layer(),

	canvasController.layers = [];

	// Setup grid

	canvasController.setupGrid();

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
	setupGrid : function() {
		this.grid = new GridView(this.data.tablet.gridOptions);
		this.drawGrid();
	},
	drawGrid : function() {

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
