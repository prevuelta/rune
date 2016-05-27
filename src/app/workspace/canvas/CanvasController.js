var GridView = require('./GridView.js');
var RuneView = require('./RuneView.js');
var Util = require('../../global/Util');
var Events = require('../../global/Events');

var paper = require('paper');

/* ========== Render Tablet ========== */

class CanvasController {
    constructor (tabletModel) {

    	// Canvas
        this.data = tabletModel;
        this.isPreview = false;

        // Setup paper
        this.canvas = document.getElementById('rune-canvas');
    	paper.setup(this.canvas).install(window);
        paper.settings.handleSize = 8;

        this.layers = {
            grid: new paper.Layer(),
            render: new paper.Layer(),
            overlay: new paper.Layer(),
            interactive: new paper.Layer()
        };

        this.runeView = new RuneView(
            this.data.activeRune,
            this.data.tablet.gridOptions,
            this.layers
        );

        this.setupGridView();

    	this.showGrid = true;

        this.canvas.addEventListener('mouseDown', function(event) {
            Events.deselectAll.dispatch();
        });

        paper.view.onResize = this.resizeHandler.bind(this);

        Events.draw.add(this.drawCanvas.bind(this));
        Events.redrawCanvas.add(this.redrawCanvas.bind(this));
        Events.updateGridView.add(this.setupGridView.bind(this));
        Events.display.add(this.displayMode.bind(this));

        Events.redrawCanvas.dispatch();

    }

    displayMode() {

        this.isPreview = !this.isPreview;

        this.redrawCanvas();

        if (this.isPreview) {
            this.layers.interactive.removeChildren();
            this.layers.grid.removeChildren();
            this.layers.overlay.removeChildren();
        }

        Events.draw.dispatch();
    }

	setupGridView () {
		this.gridView = new GridView(this.data.tablet.gridOptions, this.layers.grid);
        this.redrawCanvas();
	}

    resizeHandler () {
        this.redrawCanvas();
    }

	redrawGridLayer () {
		this.gridView.draw();
	}

    refreshGrid () {
        this.setupGrid();
        this.redrawCanvas();
    }

    redrawCanvas () {
        this.gridView.draw();
        this.runeView.draw();

        this.layers.interactive.translate(paper.view.center);
        this.layers.render.translate(paper.view.center);
        this.layers.overlay.translate(paper.view.center);

        this.drawCanvas();
    }

	drawCanvas () {
        console.log("Redrawing...");
		paper.view.draw();
	}
}

module.exports = CanvasController;
