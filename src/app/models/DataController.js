var TabletModel = require('./TabletModel');
var Events = require('../global/Events');
var _ = require('lodash');

/* ========== Data ========== */

class DataController {
    constructor (tabletModel) {

        this.tablet = new TabletModel(tabletModel);
        this.currentRune = 0;

        Events.addPoint.add(this.addPoint.bind(this));
        Events.selectPoint.add(this.selectPoint.bind(this));
        Events.clearPoints.add(this.clearRune.bind(this));
        Events.addPath.add(this.addPath.bind(this));
        Events.deletePoint.add(this.deletePoint.bind(this));

    }

    get activeRune () {
        return this.tablet.runes[this.currentRune];
    }

    save () {
        this.tablet.data.runes = this.tablet.runes;
        localStorage["runeData"] = JSON.stringify(this.tablet.data);
    }

    addRune () {
        this.tablet.runes.push(new RuneData(null));
    }

    addPoint (gridRef) {
        this.activeRune.addPoint(gridRef);
        Events.deselectAll.dispatch();
    }

    addPath () {
        this.activeRune.addPath();
        Events.redraw.dispatch();
    }

    addTransformToSelected (transform) {
        this.activeRune.selectedPoints.forEach((point) => {
            point.transforms.push(transform);
        });
        Events.redraw.dispatch();
    }

    clearRune() {
        this.activeRune.clearPaths().currentPointIndex = 0;
        Events.redraw.dispatch();
    }

    updateGrid () {
        // var rune = this.getactiveRune();
        // rune.letter.gridPoints.forEach(function(entry, i) {
        // });
    }

    selectPoint(isSelected, point) {
        this.activeRune.selectHandler(isSelected, point);
    }

    deletePoint (p) {
        this.activeRune.deletePoint(p);
    }
}

module.exports = DataController;