var TabletData = require('./DataModel');
var util = require('../global/util');
var _ = require('lodash');

/* ========== Data ========== */

function DataController(tabletModel) {

    this.tablet = new TabletData(tabletModel) || new TabletData(null);
    this.currentRune = 0;
}

DataController.prototype = {
    constructor: DataController,
    get activeRune() {
        return this.tablet.runes[this.currentRune];
    },
    save : function() {
        this.tablet.data.runes = this.tablet.runes.map(function(entry) {
            return entry.data;
        });
        localStorage["runeData"] = JSON.stringify(this.tablet.data);
    },
    addRune : function() {
        this.tablet.runes.push(new RuneData(null));
    },
    addPoint: function(gridRef) {
        this.activeRune.addPoint(gridRef);
        util.dispatchRuneEvent('deselectAll')

    },
    addTransformToSelected: function (transform) {
        var rune = this.activeRune;
        rune.selectedPoints.forEach(function(pointIndex) {
            rune.currentPath[pointIndex].push(transform);
        });
        util.dispatchRuneEvent('redraw');

    },
    clearRune: function() {
        this.activeRune.clearPaths().currentPointIndex = 0;
    },

    updateGrid : function() {
        // var rune = this.getactiveRune();
        // rune.letter.gridPoints.forEach(function(entry, i) {
        // });
    },
    deleteSelected : function() {
        var rune = this.activeRune;
        rune.currentPath = rune.currentPath.filter(function(point, idx) {
            return !~rune.selectedPoints.indexOf(idx);
        });
    },
    selectPoint: function(data) {
        this.activeRune.selectedPoints.push(data);
        this.activeRune.currentPointIndex = data;
        console.log("Currnet index: " + this.activeRune.currentPointIndex);
    },
    deselectPoint: function(data) {
        this.activeRune.selectedPoints = _.without(this.activeRune.selectedPoints, data);
    }
}

module.exports = DataController;