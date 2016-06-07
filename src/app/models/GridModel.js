let constants = require('../global/const');

class GridModel {

    constructor (gridOptions, zoomLevel) {
        this.ratio = gridOptions && gridOptions.ratio || 1;
        this.baseUnit = zoomLevel;
        this.size = gridOptions && gridOptions.size || 20;
    }

    get res () {
        return {
            x: this.baseUnit,
            y: this.baseUnit * this.ratio
        };
    }

    setBaseUnit (newBaseUnit) {
        this.baseUnit = newBaseUnit;
    }
}

module.exports = GridModel;