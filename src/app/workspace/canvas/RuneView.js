'use strict';

let PathView = require('./PathView');

class RuneView {
    constructor (runeModel, grid) {

        this.data = runeModel;
        this.grid = grid;
    }

    draw () {

        if (this.data.paths) {
            this.data.paths.forEach((path) => {
                new PathView(path, this.grid);
            });
        }
    }

}

module.exports = RuneView;
