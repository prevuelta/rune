var GridView = require('./GridView.js');
var RuneView = require('./RuneView.js');
var Util = require('../../global/Util');
var Events = require('../../global/Events');

var paper = require('paper');

/* ========== Render Tablet ========== */

class CanvasController {
    constructor (tabletModel) {

    	// Canvas
        this.tablet = tabletModel;
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

        this.createRuneView();
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
        Events.resetData.add(this.resetData.bind(this));
        Events.renderSVG.add(this.renderSVG.bind(this));

        Events.redrawCanvas.dispatch();

    }

    resetData (newTablet) {
        this.tablet = newTablet;
        this.createRuneView();
        this.redrawCanvas();
    }

    createRuneView () {
        this.runeView = new RuneView(
            this.tablet.activeRune,
            this.tablet.gridOptions,
            this.layers
        );
    }

    displayMode() {

        this.isPreview = !this.isPreview;
        this.redrawCanvas();
    }

	setupGridView () {
		this.gridView = new GridView(this.tablet.gridOptions, this.layers.grid);
        this.redrawCanvas();
	}

    resizeHandler () {
        this.redrawCanvas();
    }

	redrawGridLayer () {
		this.layers.grid.removeChildren();
        this.gridView.draw();

	}

    refreshGrid () {
        this.setupGrid();
        this.redrawCanvas();
    }

    redrawCanvas () {

        this.layers.grid.removeChildren();
        this.layers.interactive.removeChildren();
        this.layers.render.removeChildren();
        this.layers.overlay.removeChildren();

        this.gridView.draw();
        this.runeView.draw();

        this.layers.interactive.translate(paper.view.center);
        this.layers.render.translate(paper.view.center);
        this.layers.overlay.translate(paper.view.center);

        if (this.isPreview) {
            this.layers.interactive.removeChildren();
            this.layers.grid.removeChildren();
            this.layers.overlay.removeChildren();
        }

        console.log("Debugg");

        this.drawCanvas();
    }

	drawCanvas () {
        console.log("Redrawing...");
		paper.view.draw();
	}

    renderSVG () {

        let renderCanvas = new paper.Project(document.getElementById('rune-render'));

        renderCanvas.addChild(this.layers.render);

        let bounds = renderCanvas.layers[0].bounds;
        renderCanvas.layers[0].translate(-bounds.x, -bounds.y);
        renderCanvas.view.viewSize = new paper.Size(bounds.width, bounds.height);

        let svgString = renderCanvas.exportSVG({asString: true, layerIndex: 0});

        svgString = svgString.replace(/fill-opacity=".+?"/g, '');

        svgString = svgString.replace(/\<svg/, `<svg viewBox="0,0,${bounds.width},${bounds.height}" `);

        this.tablet.renderedSVG = svgString;
    }
}

module.exports = CanvasController;
