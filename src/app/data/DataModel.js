var constants = require('../global/const');
var RunePoint = require('./RunePoint');

/* ========== Tablet Model ========== */

class TabletData {
    constructor (data) {

        var defaultUnits = 10;
        var defaultRes = constants.CANVAS_SIZE / defaultUnits

        var tablet = this;

        if (data) {
            data.runes.forEach(function(rune, i, runes) {
                rune.paths.forEach(function(path, i2, paths) {
                    path.forEach(function(point, i3, points) {
                        data.runes[i].paths[i2][i3] = new RunePoint(point);
                    });
                });
            });
        }

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
    }

    get gridOptions() {
         return this.data.gridOptions;
    }
    // if(gridOptions != null){
    //     $.extend(this.data.gridOptions, gridOptions);
    // }
}



/* ========== Rune Model ========== */

class RuneModel {

    constructor (data) {
        this.paths = data && data.paths || [ [] ];
        this.selectedPoints = data && data.selectedPoints || [];
        this.currentPointIndex = data && data.currentPointIndex || 0;
        this.currentPathIndex = data && data.currentPathIndex || 0;
        this.reverseAdd = false;
    }

    clearPaths ()  {
        this.paths = [ [] ];
        return this;
    }

    addPoint (gridRef) {
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
    }

    get currentPath() {
        return this.paths[this.currentPathIndex];
    }

    set currentPath(arr) {
        this.paths[this.currentPathIndex] = arr;
    }

    get currentPoint() {
        return this.paths[this.currentPathIndex][this.currentPointIndex];
    }

    set currentPoint(arr) {
        this.currentPathIndex = arr[0];
        this.currentPointIndex = arr[1];
    }


    // set selectedPoints(selectedPoints) {
    //     this.data.selectedPoints = selectedPoints;
    // }

    // get selectedPoints() {
    //     return this.data.selectedPoints;
    // }


    // get currentPathIndex() {
    //     return this.data.currentPathIndex;
    // }

    // get currentPointIndex() {
    //     return this.data.currentPointIndex;
    // }

    // set currentPointIndex(currentPointIndex) {
    //     this.data.currentPointIndex = currentPointIndex;
    // }
}

module.exports = TabletData;