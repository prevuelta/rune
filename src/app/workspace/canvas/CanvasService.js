'use strict';

let paper = require('paper');
let Events = require('../../global/events');

const DRAG_LIMIT = 30;

class CanvasService {
    constructor () {

        // Setup paper
        this.canvas = document.getElementById('rune-canvas');
        paper.setup(this.canvas).install(window);
        this.view = paper.View['_viewsById']['rune-canvas'];
        this.view.zoom = 1;
        paper.settings.handleSize = 8;

        this.resetCanvasOffset();

        this.layers = {
        	board: new paper.Layer(),
            grid: new paper.Layer(),
            render: new paper.Layer(),
            overlay: new paper.Layer(),
            interactive: new paper.Layer(),
            // tools: new paper.Layer()
        };

        this.protectedLayers = {
            tools: new paper.Layer()
        };

        this.setupToolsLayer();

    }

    setupToolsLayer () {
        // this.protectedLayers.tools.on('mousedown', function () {
        //     console.log("Tool layer clicked");
        // });

        this.drawToProtectedLayer('tools', () => {
            let test = paper.Path.Rectangle(new paper.Point(0, 0), this.view.size);
            test.fillColor = 'red';
            // test.visible = false;
        });

        this.deactivateToolLayer();
    }

    activateToolLayer (cb) {
        let toolsLayer = this.protectedLayers.tools;
        paper.project.addChild(toolsLayer);
        // Events.draw.dispatch();

        toolsLayer.on('mousedown', cbHandler.bind(this));

        function cbHandler (e) {
            cb(e);
            toolsLayer.off('mousedown', cbHandler);
            this.deactivateToolLayer();
        }
    }

    deactivateToolLayer () {
        this.protectedLayers.tools.remove();
        // Events.draw.dispatch();
    }

    setCanvasOffset (point) {
        this.canvasOffset = new paper.Point(point);
    }

    resetCanvasOffset () {
    	this.canvasOffset = new paper.Point(0, 0);
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

    drawToProtectedLayer(layer, cb) {
        this.protectedLayers[layer].activate();
        cb();
    }

    enableToolLayer () {
        console.log("tool layer shown");
        this.layers.tools.visible = true;
    }

    centerLayers () {
        console.log("Offset", this.canvasOffset);
        this.layers.grid.translate(this.canvasOffset);
    	let canvasOffset = paper.view.center.add(this.canvasOffset);
        this.layers.interactive.translate(canvasOffset);
        this.layers.render.translate(canvasOffset);
        // this.layers.overlay.translate(canvasOffset);
    }
}

module.exports = new CanvasService();