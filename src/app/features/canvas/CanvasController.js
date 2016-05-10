var GridView = require('./GridView.js');
var RuneView = require('./RuneView.js');
var Util = require('../../global/Util');
var Events = require('../../global/Events');

var paper = require('paper');

/* ========== Render Tablet ========== */

class RuneLayer {
    constructor (name, view) {
        this.name = name;
        this.view = view;
        this.layer = new paper.Layer();
    }
}

class CanvasController {
    constructor (tabletModel) {

    	// Canvas
        let _this = this;

        this.data = tabletModel;
    	this.canvas = document.getElementById('rune-canvas');
        this.isPreview = false;

    	paper.setup(this.canvas).install(window);
        paper.settings.handleSize = 8;

    	this.layers = [new RuneLayer('Grid')];
        this.overLayer = new RuneLayer('Overlay');

        paper.view.onResize = this.resizeHandler.bind(this);

    	// Setup grid

    	this.setupGrid();

    	tabletModel.tablet.runes.forEach(function(val, idx) {
    		_this.layers.push(
                new RuneLayer(
                    'Rune ' + idx,
                    new RuneView(val, _this.grid)
                )
            );
    	});

    	this.currentLayerIndex = 1;

    	this.showGrid = true;

        this.canvas.addEventListener('mouseDown', function(event) {
            Events.deselectAll.dispatch();
        });

        Events.redraw.add(this.drawCanvas.bind(this));
        Events.refreshCanvas.add(this.refreshCanvas.bind(this));
        Events.display.add(this.displayMode.bind(this));
        Events.redraw.dispatch();

    }

    displayMode() {

        this.isPreview = !this.isPreview;

        this.toggleGrid(this.isPreview);

        let _this = this;

        this.layers.forEach(function(layerController, index) {
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
        return this.layers[0].layer;
    }


	setupGrid () {
		this.grid = new GridView(this.data.tablet.gridOptions);
		this.redrawGrid();
	}

    toggleGrid (isPreview) {
        this.showGrid = !isPreview;
        this.gridLayer.visible = this.showGrid;
        Events.redraw.dispatch();
    }

    resizeHandler () {
        this.redrawAllLayers();
    }

    redrawAllLayers () {
        let _this = this;
        this.redrawGrid();
        this.layers.forEach((ctrl) => {
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
        let ctrl = this.layers[this.currentLayerIndex];
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
        console.log("Redrawing...");
        this.redrawCurrentLayer();
		paper.view.draw();
	}
}

module.exports = CanvasController;
