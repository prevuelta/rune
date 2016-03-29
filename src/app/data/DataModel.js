var constants = require('../global/const');
var RunePoint = require('./RunePoint');

/* ========== Tablet Model ========== */

function TabletData(data) {

    var defaultUnits = 10;
    var defaultRes = constants.CANVAS_SIZE / defaultUnits

    var tablet = this;

    tablet.data = data || {
        gridOptions: {
            units: defaultUnits,
            res: defaultRes
        },
        renderedSVG: '',
        currentPathIndex: 0
    };

    tablet.runes = [];

    if(data) {
        data.runes.forEach(function(entry) {
            console.log(entry);
            tablet.runes.push(new RuneModel(entry));
        });
    } else {
        tablet.runes.push(new RuneModel(null));
    }

    // if(gridOptions != null){
    //     $.extend(this.data.gridOptions, gridOptions);
    // }
}

TabletData.prototype = {
    constructor: TabletData,
    get gridOptions() {
         return this.data.gridOptions;
    }
}


/* ========== Rune Model ========== */

function RuneModel (data) {
    this.data = data || {
        paths: [ [] ],
        selectedPoints: [],
        currentPathIndex: 0,
        currentPointIndex: 0
    };
   this.reverseAdd = false;
}

RuneModel.prototype = {
    constructor: RuneModel,
    clearPaths: function() {
        this.data.paths = [[]];
        return this;
    },
    addPoint: function(gridRef) {
        if (this.selectedPoints.length) {
            if (this.selectedPoints[0] == 0 ) {
                this.reverseAdd = true;
            } else if (this.selectedPoints[0] == this.currentPath.length-1) {
                this.reverseAdd = false;
            }
        }
        if(this.reverseAdd) {
            this.currentPath.unshift(new RunePoint(gridRef[0], gridRef[1]));
        } else {
            this.currentPointIndex++;
            this.currentPath.splice(this.currentPointIndex, 0, new RunePoint(gridRef[0], gridRef[1]));
        }
        return this;
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
        return this.data.currentPointIndex;
    },
    set currentPointIndex(currentPointIndex) {
        this.data.currentPointIndex = currentPointIndex;
    }
}

module.exports = TabletData;