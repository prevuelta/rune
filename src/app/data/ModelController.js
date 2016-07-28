let TabletModel = require('./TabletModel');
let RuneModel = require('./RuneModel');
let Events = require('../global/Events');
let _ = require('lodash');

/* ========== Data ========== */

class ModelController {
    constructor () {

        Events.addPath.add(this.addPath.bind(this));
        Events.addPoint.add(this.addPoint.bind(this));
        Events.addSubPath.add(this.addSubPath.bind(this));
        Events.addTablet.add(this.newTablet.bind(this));
        Events.clearPoints.add(this.clearRune.bind(this));
        Events.deletePath.add(this.deletePath.bind(this));
        Events.deletePoint.add(this.deletePoint.bind(this));
        Events.deselectAll.add(this.deselectAll.bind(this));
        Events.gridUpdate.add(this.updateGrid.bind(this));
        Events.loadTablet.add(this.loadTablet.bind(this));
        Events.nudge.add(this.addTransformToSelected.bind(this));
        Events.saveTablet.add(this.saveTablet.bind(this));
        Events.selectPath.add(this.selectPath.bind(this));
        Events.selectPoint.add(this.selectPoint.bind(this));
        Events.zoomIn.add(this.zoomIn.bind(this));

    }

    get activeRune () {
        // TODO: Remove & refactor
        return this.tablet.activeRune;
    }

    newTablet () {
        this.saveTablet();
        this.tablet = new TabletModel();
        Events.resetData.dispatch(this.tablet);
        Events.redrawView.dispatch();
        Events.refreshPanels.dispatch();
    }

    setTablet (tablet) {
        if (this.tablet) {
            this.saveTablet();
            this.tablet.active = false;
        }
        this.tablet = new TabletModel(tablet);
        this.tablet.active = true;
    }

    loadTablet (tablet) {
        this.setTablet(tablet);
        Events.resetData.dispatch(this.tablet);
        Events.redrawView.dispatch();
        Events.refreshPanels.dispatch();
    }

    saveTablet () {
        localStorage[this.tablet.id] = JSON.stringify(this.tablet);
    }

    addRune () {
        this.tablet.runes.push(new RuneModel());
    }

    addPoint (gridRef) {
        this.activeRune.addPoint(gridRef);
        Events.redrawView.dispatch();
        Events.refreshPanels.dispatch();
        // Events.reloadPanels.dispatch();
    }

    deletePoint (p) {
        this.activeRune.deletePoint(p);
        Events.redrawView.dispatch();
        Events.refreshPanels.dispatch();
    }

    addPath () {
        this.activeRune.addPath();
        Events.reloadPanels.dispatch();
        Events.redrawView.dispatch();
    }

    addSubPath (path) {
        this.activeRune.addSubPath(path);
        Events.reloadPanels.dispatch();
        Events.redrawView.dispatch();
    }

    deletePath (p) {
        this.activeRune.deletePath(p);
        Events.redrawView.dispatch();
        Events.refreshPanels.dispatch();
    }

    clearRune() {
        this.activeRune.clearPaths();
        Events.reloadPanels.dispatch();
        Events.redrawView.dispatch();
    }

    updateGrid (grid) {
        this.tablet.runes.forEach(r => r.updateGrid(grid));
        Events.updateGridView.dispatch();
    }

    addTransformToSelected (transform) {

        this.activeRune.selectedPoint.x += transform[0];
        this.activeRune.selectedPoint.y += transform[1];
        Events.refreshPanels.dispatch();
        Events.redrawView.dispatch();
    }

    selectPoint(point) {
        this.activeRune.selectHandler(point);
        Events.refreshPanels.dispatch();
        Events.redrawView.dispatch();
    }

    deselectAll () {
        this.activeRune.deselect();
    }

    selectPath (path) {
        this.activeRune.selectPath(path);
        Events.refreshPanels.dispatch();
        Events.draw.dispatch();
    }

    zoomIn () {
        this.tablet.increaseZoom();
        Events.updateGridView.dispatch();
    }
}

module.exports = new ModelController();
