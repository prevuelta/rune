var GridView = require('./GridView.js');
var RuneView = require('./RuneView.js');

var util = require('../global/util');

var paper = require('paper');

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

    canvasController.canvas.addEventListener('mousedown', function(event) {
        util.dispatchRuneEvent('deselectAll');
    });

}

CanvasController.prototype = {
	constructor: CanvasController,
    set displayMode(displayMode) {
        this.toggleGrid();
        var isPreview = displayMode === 'preview';
        this.layerControllers.forEach(function(layerController, index) {
            if (index) {
                console.log(layerController.layer);
                layerController.layer.children.forEach(function(child){
                    console.log(child);
                    if (child.isHandle) {
                        child.visible = !isPreview;
                    } else if (child.runePath) {
                        child.fillColor = isPreview ? 'black' : null;
                        child.strokeColor = isPreview ? null : 'red';
                        child.closed = isPreview;
                    }
                });
            }
        });
        this._displayMode = displayMode;
        this.redraw();
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
