'use strict';

let PathView = require('./PathView');

class RuneView {
    constructor (runeModel, options) {

        this.data = runeModel;
        this.options = options;
    }

    draw () {

        if (this.data.paths) {
            this.data.paths.forEach((path) => {
                new PathView(path, this.options);
            });
        }
    }

}

module.exports = RuneView;
