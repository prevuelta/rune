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
        this.isPreview = false;

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
        Events.refreshCanvas.add(this.refreshCanvas.bind(this));
        Events.display.add(this.displayMode.bind(this));
        Events.redraw.dispatch();

    }

    displayMode(displayMode) {

        this.toggleGrid();

        console.log("Display mode", displayMode);

        this.isPreview = displayMode === 'preview';

        let _this = this;

        this.layerControllers.forEach(function(layerController, index) {
            if (index) {
                layerController.layer.children.forEach(function(child){
                    if (child.isHandle) {
                        child.visible = !_this.isPreview;
                    } else if (child.runePath) {
                        child.fillColor = _this.isPreview ? 'black' : null;
                        child.strokeColor = _this.isPreview ? null : 'red';
                        child.closed = _this.isPreview;
                    }
                });
            }
        });

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
        let _this = this;
        this.redrawGrid();
        this.layerControllers.forEach((ctrl) => {
            if (ctrl.view) {
                ctrl.layer.removeChildren();
                ctrl.layer.activate();
                ctrl.view.draw(_this.isPreview);
                ctrl.layer.translate(paper.view.center);
            }
        });
    }

    redrawCurrentLayer () {
        // Draw active layer
        let ctrl = this.layerControllers[this.currentLayerIndex];
        ctrl.layer.removeChildren();
        ctrl.layer.activate();
        ctrl.view.draw(this.isPreview);
        ctrl.layer.translate(paper.view.center);
    }

	redrawGrid () {
		this.gridLayer.removeChildren();
		this.gridLayer.activate();
		this.grid.draw();
	}

    refreshCanvas () {
        this.setupGrid();
        this.redrawAllLayers();
        paper.view.draw();

    }

	drawCanvas () {
        this.redrawCurrentLayer();
		paper.view.draw();
	}
}

module.exports = CanvasController;
