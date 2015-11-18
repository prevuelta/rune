var TabletData = require('./DataModel');
var util = require('../global/util');
var _ = require('lodash');

/* ========== Data ========== */

function DataController(tabletModel) {

    this.tablet = tabletModel || new TabletData(null);
    this.currentRune = 0;
}

DataController.prototype = {
    constructor: DataController,
    get activeRune() {
        return this.tablet.runes[this.currentRune];
    },
    save : function() {
        localStorage["runeData"] = JSON.stringify(this.tablet.data);
    },
    addRune : function() {
        this.tablet.runes.push(new RuneData(null));
    },
    addPoint: function(gridRef) {
        var rune = this.activeRune;
        rune.currentPath.splice(rune.currentPointIndex, 0, [gridRef]);
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
        this.activeRune.clearPaths();
    },

    updateGrid : function() {
        // var rune = this.getactiveRune();
        // rune.letter.gridPoints.forEach(function(entry, i) {
        // });
    },
    deleteSelected : function() {
        var rune = this.activeRune;
        rune.currentPath = rune.currentPath.filter(function(point, idx) {
            console.log(point);
            console.log(rune.selectedPoints.indexOf(point) > -1);
            return ~rune.selectedPoints.indexOf(point);
            // return rune.selectedPoints.some(function(selectedPoint, idx) {
            //     console.log(selectedPoint);
            //     console.log(point);
            //     selectedPoint === point;
            // });
        });
    },
    selectPoint: function(data) {
        this.activeRune.selectedPoints.push(data);
        this.activeRune.currentIndex = data;
        // this.activeRune.letter.push(data);
    },
    deselectPoint: function(data) {
        this.activeRune.selectedPoints = _.without(this.activeRune.selectedPoints, data);
    }
}

module.exports = DataController;