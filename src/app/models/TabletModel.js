'use static';

const RuneModel = require('./RuneModel');
const GridModel = require('./GridModel');

const ViewModeEnum = require('../enums/ViewModeEnum');
const nameGen = require('../global/NameGenerator');

const Util = require('../global/Util');
const DEFAULT_ZOOM_LEVEL = 24;

class TabletModel {
    constructor (data) {

        this.name = data && data.name || nameGen(3);

        this.active = data && data.active || false;
        this.id = data && data.id || Util.guid();

        let zoomLevel = data && data.zoomLevel || DEFAULT_ZOOM_LEVEL;

        this.options = {
            grid: new GridModel(data && data.options),
            zoomLevel: zoomLevel,
            board: this.board = data && data.board || {x : 9, y : 15},
            viewMode: ViewModeEnum.normal
        };

        // this.activePathIndex = data && data.activePathIndex || 0;
        this.runes = data && data.runes.map(rune => new RuneModel(rune)) || [new RuneModel()];
        this.activeRune = this.runes[0];
    }


    setActiveRune (rune) {
        this.activeRune = rune;
    }

    increaseZoom () {
        this.options.zoomLevel++;
    }

    decreaseZoom () {
        this.options.zoomLevel--;
    }
}

module.exports = TabletModel;
