var GridView = require('./GridView.js');
var RuneView = require('./RuneView.js');
var Util = require('../../global/Util');
var Events = require('../../global/Events');

var paper = require('paper');

/* ========== Render Tablet ========== */

class CanvasController {
    constructor (tabletModel) {

    	// Canvas
        let _this = this;

        this.data = tabletModel;

    	this.canvas = document.getElementById('rune-canvas');

    	paper.setup(this.canvas).install(window);

        paper.settings.handleSize = 8;

    	this.layerControllers = [{
            name: 'Grid',
            layer: new paper.Layer()
        }];

        paper.view.onResize = this.resizeHandler.bind(this);

    	// Setup grid

    	this.setupGrid();

    	tabletModel.tablet.runes.forEach(function(val, idx) {
    		_this.layerControllers.push({
                name: 'Rune ' + idx,
                layer: new paper.Layer(),
                view: new RuneView(val, _this.grid)
            });
    	});

    	this.currentLayerIndex = 1;

    	this.showGrid = true;

        this.canvas.addEventListener('mousedown', function(event) {
            Events.deselectAll.dispatch();
        });

        Events.redraw.add(this.drawCanvas.bind(this));

        Events.redraw.dispatch();

    }

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

        Events.redraw.dispatch();
    }

    get gridLayer() {
        return this.layerControllers[0].layer;
    }


	setupGrid () {
		this.grid = new GridView(this.data.tablet.gridOptions);
		this.redrawGrid();
	}

    toggleGrid (showGrid) {
        this.showGrid = !this.showGrid;
        this.gridLayer.visible = this.showGrid;
        Events.redraw.dispatch();
    }

    resizeHandler () {
        this.redrawAllLayers();
    }

    redrawAllLayers () {
        this.redrawGrid();
        this.layerControllers.forEach((ctrl) => {
            if (ctrl.view) {
                ctrl.view.draw();
            }
        });
    }

    redrawCurrentLayer () {
        // Draw active layer
        this.layerControllers[this.currentLayerIndex].layer.removeChildren();
        this.layerControllers[this.currentLayerIndex].layer.activate();
        this.layerControllers[this.currentLayerIndex].view.draw();
        // this.redraw();
    }

	redrawGrid () {

		this.gridLayer.removeChildren();
		this.gridLayer.activate();
		this.grid.draw();
		// this.redraw();

	}

	drawCanvas () {
        console.log("Redrawing canvas...");
		// paper.view.draw();
        this.redrawCurrentLayer();
	}
}

module.exports = CanvasController;
