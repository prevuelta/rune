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
        Events.selectPath.add(this.selectPath.bind(this));
        Events.clearPoints.add(this.clearRune.bind(this));
        Events.addPath.add(this.addPath.bind(this));
        Events.deletePoint.add(this.deletePoint.bind(this));
        Events.addSubPath.add(this.addSubPath.bind(this));

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
        Events.redrawCanvas.dispatch();
        Events.refreshPanels.dispatch();
    }

    deletePoint (p) {
        this.activeRune.deletePoint(p);
        Events.draw.dispatch();
        Events.refreshPanels.dispatch();
    }

    addPath () {
        this.activeRune.addPath();
        Events.reloadPanels.dispatch();
        Events.redrawActiveLayer.dispatch();
    }

    addSubPath (path) {
        this.activeRune.addSubPath(path);
        Events.reloadPanels.dispatch();
        Events.redrawActiveLayer.dispatch();
    }

    clearRune() {
        this.activeRune.clearPaths().currentPointIndex = 0;
        Events.reloadPanels.dispatch();
        Events.redrawActiveLayer.dispatch();
    }

    addTransformToSelected (transform) {

        console.log(transform);

        this.activeRune.selectedPoint.x += transform[0];
        this.activeRune.selectedPoint.y += transform[1];

        Events.redrawActiveLayer.dispatch();
    }

    updateGrid () {
        // var rune = this.getactiveRune();
        // rune.letter.gridPoints.forEach(function(entry, i) {
        // });
    }

    selectPoint(isSelected, point) {
        this.activeRune.selectHandler(isSelected, point);
        Events.refreshPanels.dispatch();
        Events.draw.dispatch();
    }

    selectPath (path) {
        this.activeRune.selectPath(path);
        Events.refreshPanels.dispatch();
        Events.draw.dispatch();
    }
}

module.exports = DataController;
