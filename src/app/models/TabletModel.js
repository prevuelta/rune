var constants = require('../global/const');
var RunePoint = require('./RunePoint');
var RuneModel = require('./RuneModel');

/* ========== Tablet Model ========== */

class TabletModel {
    constructor (data) {

        var defaultUnits = 10;
        var defaultRes = constants.CANVAS_SIZE / defaultUnits

        var tablet = this;

        if (data) {
            data.runes.forEach(function(rune, i, runes) {
                rune.paths.forEach(function(path, i2, paths) {
                    path.forEach(function(point, i3, points) {
                        data.runes[i].paths[i2][i3] = new RunePoint(point);
                    });
                });
            });
        }

        tablet.data = data || {
            gridOptions: {
                units: defaultUnits,
                res: defaultRes
            },
            renderedSVG: '',
            currentPathIndex: 0
        };

        tablet.runes = [];

        if(data) {
            data.runes.forEach(function(entry) {
                console.log(entry);
                tablet.runes.push(new RuneModel(entry));
            });
        } else {
            tablet.runes.push(new RuneModel(null));
        }
    }

    get gridOptions () {
         return this.data.gridOptions;
    }
    // if(gridOptions != null){
    //     $.extend(this.data.gridOptions, gridOptions);
    // }
}

module.exports = TabletModel;