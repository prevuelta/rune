var RunePoint = require('./RunePoint');

/* ========== Rune Model ========== */

class RuneModel {

    constructor (data) {
        this.paths = data && data.paths || [ [] ];
        this.selectedPoints = data && data.selectedPoints || {};
        this.currentPointIndex = data && data.currentPointIndex || 0;
        this.currentPathIndex = data && data.currentPathIndex || 0;
        this.reverseAdd = false;

        // Events.
    }

    clearPaths ()  {
        this.paths = [ [] ];
        return this;
    }

    selectHandler (isSelected, point) {
        console.log(this);
        if(isSelected) {
            this.selectedPoints[point.idx] = point.point;
            this.currentPointIndex = point.idx;
        } else {
            delete this.selectedPoints[point.idx];
        }
        console.log("Updated selected", this.selectedPoints);
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
            this.currentPath.unshift(new RunePoint(gridRef.x, gridRef.y));
        } else {
            this.currentPointIndex++;
            this.currentPath.splice(this.currentPointIndex, 0, new RunePoint(gridRef.x, gridRef.y));
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

    deleteSelected () {
        // FIX THIS
        // var rune = this.activeRune;
        // this.currentPath = this.currentPath.filter(function(value, idx) {
            // return !~rune.selectedPoints.indexOf(idx);
        // });
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

module.exports = RuneModel;