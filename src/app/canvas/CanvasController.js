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

	canvasController.layerControllers = [{
        name: 'Grid',
        layer: new paper.Layer()
    }];

	// Setup grid

	canvasController.setupGrid();

	tabletModel.tablet.runes.forEach(function(val, idx) {
		canvasController.layerControllers.push({
            name: 'Rune ' + idx,
            layer: new paper.Layer(),
            view: new RuneView(val, canvasController.grid)
        });
	});

	canvasController.currentLayerIndex = 1;

	canvasController.draw();

	canvasController.showGrid = true;

}

CanvasController.prototype = {
	constructor: CanvasController,
    set displayMode(displayMode) {
        switch(displayMode) {
            case 'preview':
                this.toggleGrid();
            break;
            default :
                this.toggleGrid();
            break;
        }
        this.displayMode = displayMode;
    },
    get gridLayer() {
        return this.layerControllers[0].layer;
    },
	draw : function() {
		// Draw active layer
		this.layerControllers[this.currentLayerIndex].layer.removeChildren();
		this.layerControllers[this.currentLayerIndex].layer.activate();
		this.layerControllers[this.currentLayerIndex].view.draw();
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
