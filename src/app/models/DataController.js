var TabletModel = require('./TabletModel');
var RuneModel = require('./RuneModel');
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

        Events.nudge.add(this.addTransformToSelected.bind(this));

    }

    get activeRune () {
        return this.tablet.runes[this.currentRune];
    }

    save () {
        localStorage["runeData"] = JSON.stringify(this.tablet);
    }

    addRune () {
        this.tablet.runes.push(new RuneModel(null));
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

        console.log(transform);

        // this.activeRune.selectedPoints.forEach((point) => {
        //     point.transform[0] += transform[0],
        //     point.transform[1] += transform[1]
        // });

        this.activeRune.selectedPoint.x += transform[0];
        this.activeRune.selectedPoint.y += transform[1];

        // this.activeRune.selectedPoints.forEach((point) => {
        //     point.transforms.push(transform);
        // });
        Events.redraw.dispatch();
    }

    clearRune() {
        this.activeRune.clearPaths().currentPointIndex = 0;
        Events.reloadPanels.dispatch();
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