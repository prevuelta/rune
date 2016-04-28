let constants = require('../global/const');

const DEFAULT_UNITS = 10;

class GridModel {

    constructor (data) {
        this.units = data.units || defaultUnits % 2 == 0 ? DEFAULT_UNITS : DEFAULT_UNITS++;;
        this.ratio = data.ratio || 1;
        this.baseUnit = data.baseUnit || constants.CANVAS_SIZE / defaultUnits;
    }

    get res () {
        return {
            x: this.baseUnit,
            y: this.baseUnit * this.ratio 
        };
    }
}

module.exports = GridModel;