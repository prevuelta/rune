let RuneModel = require('./RuneModel');
let GridModel = require('./GridModel');

/* ========== Tablet Model ========== */

class TabletModel {
    constructor (data) {

        this.isActive = false;
        this.id = data && data.id || this.guid();
        this.gridOptions = new GridModel(data && data.gridOptions);
        this.renderedSVG = data && data.renderedSVG || '';
        this.activePathIndex = data && data.activePathIndex || 0;
        this.runes = data && data.runes.map(rune => new RuneModel(rune)) || [new RuneModel()];
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