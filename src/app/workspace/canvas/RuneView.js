'use strict';

let PathView = require('./PathView');

class RuneView {
    constructor (runeModel, grid, layers) {

        this.data = runeModel;
        this.grid = grid;
        this.layers = layers;
    }

    draw () {

        if (this.data.paths) {
            this.data.paths.forEach((path) => {
                new PathView(path, this.grid, this.layers);
            });
        }
    }

}

module.exports = RuneView;
