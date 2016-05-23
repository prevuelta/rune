var TabletModel = require('./TabletModel');
var RuneModel = require('./RuneModel');
var Events = require('../global/Events');
var _ = require('lodash');

/* ========== Data ========== */

class ModelController {
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
        Events.deselectAll.add(this.deselectAll.bind(this));
        Events.addTablet.add(this.newTablet.bind(this));
        Events.deletePath.add(this.deletePath.bind(this));

        Events.gridUpdate.add(this.updateGrid.bind(this));

        Events.nudge.add(this.addTransformToSelected.bind(this));

    }

    get activeRune () {
        return this.tablet.runes[this.currentRune];
    }

    newTablet () {
        this.save();
        this.tablet = new TabletModel();
        Events.redrawCanvas.dispatch();
        Events.refreshPanels.dispatch();
    }

    save () {
        localStorage[this.tablet.id] = JSON.stringify(this.tablet);
    }

    addRune () {
        this.tablet.runes.push(new RuneModel());
    }

    addPoint (gridRef) {
        this.activeRune.addPoint(gridRef);
        Events.redrawCanvas.dispatch();
        Events.refreshPanels.dispatch();
        // Events.reloadPanels.dispatch();
    }

    deletePoint (p) {
        this.activeRune.deletePoint(p);
        Events.redrawCanvas.dispatch();
        Events.refreshPanels.dispatch();
    }

    deletePath (p) {
        this.activeRune.deletePath(p);
        Events.redrawCanvas.dispatch();
        Events.refreshPanels.dispatch();
    }

    addPath () {
        this.activeRune.addPath();
        Events.reloadPanels.dispatch();
        Events.redrawCanvas.dispatch();
    }

    addSubPath (path) {
        this.activeRune.addSubPath(path);
        Events.reloadPanels.dispatch();
        Events.redrawCanvas.dispatch();
    }

    clearRune() {
        this.activeRune.clearPaths().currentPointIndex = 0;
        Events.reloadPanels.dispatch();
        Events.redrawCanvas.dispatch();
    }

    updateGrid (grid) {
        this.tablet.runes.forEach(r => r.updateGrid(grid));
        Events.updateGridView.dispatch();
    }

    addTransformToSelected (transform) {

        this.activeRune.selectedPoint.x += transform[0];
        this.activeRune.selectedPoint.y += transform[1];

        Events.redrawCanvas.dispatch();
    }

    selectPoint(point) {
        this.activeRune.selectHandler(point);
        Events.refreshPanels.dispatch();
        Events.redrawCanvas.dispatch();
    }

    deselectAll () {
        this.activeRune.deselect();
    }

    selectPath (path) {
        this.activeRune.selectPath(path);
        Events.refreshPanels.dispatch();
        Events.draw.dispatch();
    }
}

module.exports = ModelController;
