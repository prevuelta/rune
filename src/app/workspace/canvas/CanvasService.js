let paper = require('paper');

class CanvasService {
    constructor () {

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
        this.layers.interactive.translate(paper.view.center);
        this.layers.render.translate(paper.view.center);
        this.layers.overlay.translate(paper.view.center);
    }
}

module.exports = new CanvasService();