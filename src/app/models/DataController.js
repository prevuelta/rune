var TabletModel = require('./TabletModel');
var Events = require('../global/Events');
var _ = require('lodash');

/* ========== Data ========== */

class DataController {
    constructor (tabletModel) {

        this.tablet = new TabletModel(tabletModel);
        this.currentRune = 0;

        Events.addPoint.add(this.addPoint);
        Events.selectPoint.add(this.selectPoint);

    }

    get activeRune () {
        return this.tablet.runes[this.currentRune];
    }

    save () {
        debugger;
        this.tablet.data.runes = this.tablet.runes;
        localStorage["runeData"] = JSON.stringify(this.tablet.data);
    }

    addRune () {
        this.tablet.runes.push(new RuneData(null));
    }

    addPoint(gridRef) {
        this.activeRune.addPoint(gridRef);
        Events.deselectAll.dispatch();

    }

    addTransformToSelected (transform) {
        var rune = this.activeRune;
        rune.selectedPoints.forEach(function(pointIndex) {
            rune.currentPath[pointIndex].push(transform);
        });
        Events.redraw.dispatch();

    }

    clearRune() {
        this.activeRune.clearPaths().currentPointIndex = 0;
    }

    updateGrid () {
        // var rune = this.getactiveRune();
        // rune.letter.gridPoints.forEach(function(entry, i) {
        // });
    }

    deleteSelected () {
        // FIX THIS
        // var rune = this.activeRune;
        // rune.currentPath = rune.currentPath.filter(function(value, idx) {
            // return !~rune.selectedPoints.indexOf(idx);
        // });
    }

    selectPoint(data) {
        debugger;
        if(data[0]) {
            this.tablet.activeRune.selectedPoints.push(data);
            this.tablet.activeRune.currentPointIndex = data;
        } else {
            this.tablet.activeRune.selectedPoints = _.reject(this.tablet.activeRune.selectedPoints, (val) => {
                return val.idx === data.idx;
            });
        }
        Events.redraw.dispatch();
    }
}

module.exports = DataController;