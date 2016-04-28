let RunePoint = require('./RunePoint');
let RuneModel = require('./RuneModel');
let GridModel = require('./GridModel');

/* ========== Tablet Model ========== */

class TabletModel {
    constructor (data) {

        let tablet = this;

        if (data) {
            data.runes.forEach(function(rune, i, runes) {
                rune.paths.forEach(function(path, i2, paths) {
                    path.points.forEach(function(point, i3, points) {
                        data.runes[i].paths[i2].points[i3] = new RunePoint(point);
                    });
                });
            });
        }

        tablet.data = {
            gridOptions: new GridModel(data),
            renderedSVG: data && data.renderedSVG || '',
            currentPathIndex: data && data.currentPathIndex || 0
        };

        tablet.runes = [];

        if(data) {
            data.runes.forEach(function(entry) {
                tablet.runes.push(new RuneModel(entry));
            });
        } else {
            tablet.runes.push(new RuneModel(null));
        }
    }

    get gridOptions () {
         return this.data.gridOptions;
    }
}

module.exports = TabletModel;