let paper = require('paper');
let Events = require('../../global/events');

class CanvasService {
    constructor () {

        // Setup paper
        this.canvas = document.getElementById('rune-canvas');
        paper.setup(this.canvas).install(window);
        paper.settings.handleSize = 8;

        this.resetCanvasPosition();

        this.layers = {
        	board: new paper.Layer(),
            grid: new paper.Layer(),
            render: new paper.Layer(),
            overlay: new paper.Layer(),
            interactive: new paper.Layer()
        };

        Events.canvasMove.add(this.setCanvasPosition.bind(this));
        Events.canvasCenter.add(this.resetCanvasPosition.bind(this));
    }

    setCanvasPosition (point) {
    	this.canvasPosition = point;
    }

    resetCanvasPosition () {
    	this.canvasPosition = new paper.Point(0, 0);
    }

    clearAllLayers () {
        Object.keys(this.layers).forEach(k => this.layers[k].removeChildren());
    }

    clearAllLayersBut (layer) {
        Object.keys(this.layers).forEach(k => {
            if( layer !== k) {
                this.clearLayer(k);
            }
        });
    }

    clearLayer (layer) {
        this.layers[layer].removeChildren();
    }

    drawToLayer (layer, cb) {
        this.layers[layer].activate();
        cb();
    }

    centerLayers () {
    	let canvasPosition = paper.view.center.add(this.canvasPosition);
        this.layers.board.translate(canvasPosition);
        this.layers.interactive.translate(canvasPosition);
        this.layers.render.translate(canvasPosition);
        this.layers.overlay.translate(canvasPosition);
    }
}

module.exports = new CanvasService();