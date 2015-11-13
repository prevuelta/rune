var constants = require('../global/const');

/* ========== Tablet Model ========== */

function TabletData(gridOptions) {

    var defaultUnits = 10;
    var defaultRes = constants.CANVAS_SIZE / defaultUnits

    this.data = {
        gridOptions: {
            units: defaultUnits,
            res: defaultRes
        },
        runes: [new RuneModel()],
        renderedSVG: ''
    };

    if(gridOptions != null){
        $.extend(this.data.gridOptions, gridOptions);
    }
}

TabletData.prototype = {
    constructor: TabletData,
    get gridOptions() {
         return this.data.gridOptions;
    },
    get runes() {
         return this.data.runes;
    }
}

/* ========== Rune Model ========== */

function RuneModel () {
    this.data = {
        /* All points / paths in rune */
        paths: [ [] ],
        /* Point specific transforms */
        transforms: [],

        selectedPoints: [],

        /* Current index: [path, point] */
        currentPathIndex: 0,
        currentPointIndex: 0
    };
}

RuneModel.prototype = {
    constructor: RuneModel,
    clearPaths: function() {
        this.data.paths = [[]];
    },
    get currentPath() {
        return this.data.paths[this.data.currentPathIndex];
    },
    set currentPath(arr) {
        this.data.paths[this.data.currentPathIndex] = arr;
    },
    set selectedPoints(selectedPoints) {
        this.data.selectedPoints = selectedPoints;
    },
    get selectedPoints() {
        return this.data.selectedPoints;
    },
    get currentPoint() {
        return this.data.paths[this.data.currentPathIndex][this.data.currentPointIndex];
    },
    set currentPoint(arr) {
        this.currentPathIndex = arr[0];
        this.currentPointIndex = arr[1];
    },
    get currentPathIndex() {
        return this.data.currentPathIndex;
    },
    get currentPointIndex() {
        return this.data.scurrentPointIndex;
    },
    get transforms() {
        return this.data.transforms;
    }
}

module.exports = TabletData;