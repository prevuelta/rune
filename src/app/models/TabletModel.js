let RuneModel = require('./RuneModel');
let GridModel = require('./GridModel');

/* ========== Tablet Model ========== */

class TabletModel {
    constructor (data) {

        let _this = this;

        this.id = data && data.id || this.guid();

        _this.gridOptions = new GridModel(data && data.gridOptions);

        _this.renderedSVG = data && data.renderedSVG || '';
        _this.activePathIndex = data && data.activePathIndex || 0;

        _this.runes = data && data.runes.map(rune => new RuneModel(rune)) || [new RuneModel()];
    }

     guid () {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}
}

module.exports = TabletModel;