'use strict';

let RunePathView = require('./RunePathView');

class RuneView {
    constructor (runeModel, grid, interactiveLayer, renderLayer) {

        this.data = runeModel;
        this.grid = grid;
        this.iLayer = interactiveLayer;
        this.rLayer = renderLayer;
    }

    draw () {

        this.iLayer.removeChildren();
        this.rLayer.removeChildren();

        this.data.paths.forEach((path) => {
            new RunePathView(path, this.grid, this.iLayer, this.rLayer);
        });
    }

}

module.exports = RuneView;
