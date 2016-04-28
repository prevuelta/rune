var RunePoint = require('./RunePoint');

/* ========== Rune Model ========== */

class RunePath {
    constructor () {
        this.points = [];
        this.isClosed = false;
    }
}

class RuneModel {
    constructor (data) {

        this.paths = data && data.paths || [new RunePath()];
        this.selectedPoints = data && data.selectedPoints || [];
        this.currentPointIndex = data && data.currentPointIndex || 0;
        this.currentPathIndex = data && data.currentPathIndex || 0;
        this.reverseAdd = false;

        // Events.
    }

    clearPaths ()  {
        this.paths = [new RunePath()];
        Events.reloadPanels.dispatch();
        return this;
    }

    selectHandler (point) {
        point.isSelected = !point.isSelected;
        if(point.isSelected) {
            this.selectedPoints.push(point);
            // this.currentPointIndex = point.idx; ???
        } else { 
            this.selectedPoints.forEach((p, i) => {
                if (point == p) {
                    this.selectedPoints.splice(i, 1);
                }
            });
        }
        Events.reloadPanels.dispatch();
        Events.redraw.dispatch();
        console.log("Updated selected", this.selectedPoints);
    }

    addPath () {
        this.paths.push(new RunePath());
        this.currentPathIndex++;
        Events.reloadPanels.dispatch();
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
            this.currentPath.points.unshift(new RunePoint(gridRef.x, gridRef.y));
        } else {
            this.currentPointIndex++;
            this.currentPath.points.splice(this.currentPointIndex, 0, new RunePoint(gridRef.x, gridRef.y));
        }
        
        Events.reloadPanels.dispatch();

        return this;
    }

    get currentPath() {
        return this.paths[this.currentPathIndex];
    }

    set currentPath(obj) {
        this.paths[this.currentPathIndex] = obj;
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

    deletePoint (p) {

        this.currentPath.points.forEach((point, i) => {
            debugger;
            if (point === p) {
            //     delete this.currentPath.points[i];
            }
        });
        Events.redraw.dispatch();
        // Events.refreshPanels.dispatch();
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