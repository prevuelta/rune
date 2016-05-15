let constants = require('../global/const');

const DEFAULT_UNITS = 6;
const DEFAULT_BASE_UNIT = 40;

class GridModel {

    constructor (data) {
        this.units = data && data.units || (DEFAULT_UNITS % 2 == 0 ? DEFAULT_UNITS : DEFAULT_UNITS++);
        this.ratio = data && data.ratio || 1;
        this.baseUnit = data && data.baseUnit || DEFAULT_BASE_UNIT;
    }

    get res () {
        return {
            x: this.baseUnit,
            y: this.baseUnit * this.ratio 
        };
    }
}

module.exports = GridModel;