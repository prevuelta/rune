'use strict';

let PathView = require('./PathView');

class RuneView {
    constructor (runeModel, gridOptions) {

        this.data = runeModel;
        this.gridOptions = gridOptions;
    }

    draw () {

        if (this.data.paths) {
            this.data.paths.forEach((path) => {
                new PathView(path, this.gridOptions);
            });
        }
    }

}

module.exports = RuneView;
