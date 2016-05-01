let RuneModel = require('./RuneModel');
let GridModel = require('./GridModel');

/* ========== Tablet Model ========== */

class TabletModel {
    constructor (data) {

        let _this = this;

        _this.gridOptions = new GridModel(data && data.gridOptions);

        _this.renderedSVG = data && data.renderedSVG || '';
        _this.activePathIndex = data && data.activePathIndex || 0;

        _this.runes = data && data.runes.map(rune => new RuneModel(rune)) || [new RuneModel()];
    }
}

module.exports = TabletModel;