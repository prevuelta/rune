'use strict';

let paper = require('paper');
let Events = require('../../global/Events');
let Util = require('../../global/Util');

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
        };

        this.protectedLayers = {
            tools: new paper.Layer()
        };

        this.setupToolsLayer();

        this.initialCenter = paper.view.center;

    }

    // Setup a draw cycle with renderQueue

    setupToolsLayer () {

        this.drawToProtectedLayer('tools', () => {
            let test = new paper.Path.Rectangle(paper.view.center.x - 1000, paper.view.center.y - 1000,2000, 2000);
            test.fillColor = 'red';
            test.visible = false;
        });

        this.deactivateToolLayer();
    }

    activateToolLayer (
        clickCallback,
        mousemoveCallback
    ) {
        let toolsLayer = this.protectedLayers.tools;
        paper.project.addChild(toolsLayer);

        if (clickCallback) {

            toolsLayer.on('click', clickHandler.bind(this));

            function clickHandler (e) {
                clickCallback(e);
                toolsLayer.off('click', clickHandler);
                this.deactivateToolLayer();
            }
        }

        if (mousemoveCallback) {

            let isMoving = false;
            let origin = null;

            let debouncedMoveHandler = Util.debounce(mousemoveHandler, 10);
            toolsLayer.on('mousedown', mousedownHandler);
            toolsLayer.on('mousemove', debouncedMoveHandler);
            toolsLayer.on('mouseup', mouseupHandler);
            toolsLayer.on('mouseleave', mouseupHandler);

            function mousemoveHandler (e) {
                e.preventDefault();
                if (isMoving) {
                    mousemoveCallback(e.point, origin);
                    // origin = e.point;
                }
            }

            function mouseupHandler () {
                isMoving = false;
            }

            function mousedownHandler (e) {
                e.preventDefault();
                origin = e.point;
                isMoving = true;
            }

            return (function () {
                toolsLayer.off('mousedown', mousedownHandler);
                toolsLayer.off('mousemove', mousemoveHandler);
                toolsLayer.off('mouseup', mouseupHandler);
                toolsLayer.off('mouseleave', mouseupHandler);
                this.deactivateToolLayer();
            }).bind(this);
        }
    }


    deactivateToolLayer () {
        console.log("Removing tools layer");
        this.protectedLayers.tools.remove();
        // Events.draw.dispatch();
    }

    resetCanvasOffset () {
        this.canvasOffset = new paper.Point(0, 0);
    }

    setCanvasOffset (delta) {
        console.log("Offset delta", delta);
        this.canvasOffset = this.canvasOffset.subtract(delta);
        this.translateCanvas();
        Events.draw.dispatch();
    }


    // resetCanvasTranslate () {
    //     this.canvasTranslate = new paper.Point(0, 0);
    // }

    // setCanvasTranslate (point) {
    //     this.canvasTranslate = new paper.Point(point);
    //     this.translate();
    //     Events.draw.dispatch();
    // }

    translateCanvas () {
        // debugger;
          paper.view.center = this.initialCenter.add(this.canvasOffset);
    //     // paper.view.center.add(this.canvasOffset);
    //     // console.log("Translating", this.canvasTranslate);
    //     // this.layers.board.translate(this.canvasTranslate);
    //     // this.layers.grid.translate(this.canvasTranslate);
    //     // this.layers.interactive.translate(this.canvasTranslate);
    //     // this.layers.render.translate(this.canvasTranslate);
    //     // this.layers.overlay.translate(this.canvasTranslate);
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
        console.log("datal", this.canvasOffset);
        let newCenter = paper.view.center.add(this.canvasOffset);
        paper.view.center = newCenter;
        // console.log("Offset", this.canvasOffset);
        // this.layers.board.translate(newCenter);
        // this.layers.grid.translate(newCenter);
        this.layers.interactive.translate(newCenter);
        this.layers.render.translate(newCenter);
        this.layers.overlay.translate(newCenter);

    }
}

module.exports = new CanvasService();