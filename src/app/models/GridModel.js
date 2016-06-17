let constants = require('../global/const');

class GridModel {

    constructor (options) {
        this.ratio = options && options.grid.ratio || 1;
        this.size = options && options.grid.size || 20;
    }

    getRes (zoomLevel) {
        return {
            x: zoomLevel * 1,
            y: zoomLevel * this.ratio
        }
    }

}

module.exports = GridModel;