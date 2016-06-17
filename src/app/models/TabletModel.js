'use static';

let RuneModel = require('./RuneModel');
let GridModel = require('./GridModel');

let ViewModeEnum = require('../enums/ViewModeEnum');

const DEFAULT_ZOOM_LEVEL = 24;

class TabletModel {
    constructor (data) {

        this.isActive = false;
        this.id = data && data.id || this.guid();

        let zoomLevel = data && data.zoomLevel || DEFAULT_ZOOM_LEVEL;

        this.options = {
            grid: new GridModel(data && data.options),
            zoomLevel: zoomLevel,
            board: this.board = data && data.board || {x : 9, y : 15},
            viewMode: ViewModeEnum.normal
        };

        this.renderedSVG = data && data.renderedSVG || '';
        // this.activePathIndex = data && data.activePathIndex || 0;
        this.runes = data && data.runes.map(rune => new RuneModel(rune)) || [new RuneModel()];
        this.activeRune = this.runes[0];
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

    increaseZoom () {
        this.options.zoomLevel++;
    }

    decreaseZoom () {
        this.options.zoomLevel--;
    }
}

module.exports = TabletModel;
