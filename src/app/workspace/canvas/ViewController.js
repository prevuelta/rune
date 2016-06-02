let GridView = require('./GridView.js');
let RuneView = require('./RuneView.js');
let Util = require('../../global/Util');
let Events = require('../../global/Events');
let paper = require('paper');

let Canvas = require('./CanvasService');

/* ========== Render Tablet ========== */

class ViewController {
    constructor () {

    	// Canvas
        this.isPreview = false;
        this.showGrid = true;

        paper.view.onResize = this.resizeHandler.bind(this);

        Events.draw.add(this.drawView.bind(this));
        Events.redrawView.add(this.redrawView.bind(this));
        Events.updateGridView.add(this.setupGridView.bind(this));
        Events.display.add(this.displayMode.bind(this));
        Events.resetData.add(this.loadTablet.bind(this));
        Events.renderSVG.add(this.renderSVG.bind(this));

    }

    loadTablet (tabletModel) {
        console.log("Loading model");
        this.tablet = tabletModel;
        this.createRuneView();
        this.setupGridView();
        Events.redrawView.dispatch();
    }

    createRuneView () {
        this.runeView = new RuneView(
            this.tablet.activeRune,
            this.tablet.gridOptions
        );
    }

    displayMode() {
        this.isPreview = !this.isPreview;
        this.redrawView();
    }

	setupGridView () {
		this.gridView = new GridView(this.tablet.gridOptions);
	}

    resizeHandler () {
        this.redrawView();
    }

	redrawGridLayer () {
		Canvas.clearLayer('grid');
        this.gridView.draw();

	}

    refreshGrid () {
        this.setupGrid();
        this.redrawView();
    }

    redrawView () {

        Canvas.clearAllLayers();

        this.gridView.draw();
        this.runeView.draw();

        Canvas.centerLayers();

        if (this.isPreview) {
            Canvas.clearAllLayersBut('render');
        }

        this.drawView();
    }

	drawView () {
        console.log("Redrawing...");
		paper.view.draw();
	}

    renderSVG () {

        let renderCanvas = new paper.Project(document.getElementById('rune-render'));

        renderCanvas.addChild(Canvas.layers.render);

        let bounds = renderCanvas.layers[0].bounds;
        renderCanvas.layers[0].translate(-bounds.x, -bounds.y);
        renderCanvas.view.viewSize = new paper.Size(bounds.width, bounds.height);

        let svgString = renderCanvas.exportSVG({asString: true, layerIndex: 0});

        svgString = svgString.replace(/fill-opacity=".+?"/g, '');

        svgString = svgString.replace(/\<svg/, `<svg viewBox="0,0,${bounds.width},${bounds.height}" `);

        this.tablet.renderedSVG = svgString;
    }
}

module.exports = new ViewController();