var RunePoint = require('./RunePoint');

/* ========== Rune Model ========== */

class RunePathModel {
    constructor (data) {
        this.points = data && data.points.map(p => new RunePoint(p)) || [];
        this.isClosed = data && data.isClosed || false;
    }
}

class RuneModel {
    constructor (data) {

        this.paths = data && data.paths.map(p => new RunePathModel(p)) || [new RunePathModel()];
        this.selectedPoints = data && data.selectedPoints || [];
        this.currentPointIndex = data && data.currentPointIndex || 0;
        this.activePathIndex = data && data.activePathIndex || 0;
        this.reverseAdd = false;
        this.selectedPoint = null;

        // Events.
    }

    clearPaths ()  {
        this.paths = [new RunePathModel()];
        return this;
    }

    selectHandler (point) {
        point.isSelected = !point.isSelected;
        if(point.isSelected) {
            this.selectedPoint = point;
            console.log("Selectedpoint", this.selectedPoint);
            // this.currentPointIndex = point.idx; ???
        } else { 
            this.selectedPoint = null;
            // this.selectedPoints.forEach((p, i) => {
                // if (point == p) {
                    // this.selectedPoints.splice(i, 1);
                // }
            // });
        }
        Events.refreshPanels.dispatch();
        Events.redraw.dispatch();
    }

    addPath () {
        this.paths.push(new RunePath());
        this.activePathIndex++;
        Events.refreshPanels.dispatch();
    }

    addPoint (gridRef) {
        if (this.selectedPoints.length) {
            if (this.selectedPoints[0] == 0 ) {
                this.reverseAdd = true;
            } else if (this.selectedPoints[0] == this.activePath.length-1) {
                this.reverseAdd = false;
            }
        }
        if(this.reverseAdd) {
            this.activePath.points.unshift(new RunePoint(gridRef.x, gridRef.y));
        } else {
            this.currentPointIndex++;
            this.activePath.points.splice(this.currentPointIndex, 0, new RunePoint(gridRef.x, gridRef.y));
        }
        
        Events.refreshPanels.dispatch();

        return this;
    }

    get activePath() {
        return this.paths[this.activePathIndex];
    }

    set activePath(obj) {
        this.paths[this.activePathIndex] = obj;
    }

    get currentPoint() {
        return this.paths[this.activePathIndex][this.currentPointIndex];
    }

    set currentPoint(arr) {
        this.activePathIndex = arr[0];
        this.currentPointIndex = arr[1];
    }

    deleteSelected () {
        // FIX THIS
        // var rune = this.activeRune;
        // this.activePath = this.activePath.filter(function(value, idx) {
            // return !~rune.selectedPoints.indexOf(idx);
        // });
    }

    deletePoint (p) {

        this.activePath.points.forEach((point, i) => {
            if (point === p) {
                this.activePath.points.splice(i, 1);
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


    // get activePathIndex() {
    //     return this.data.activePathIndex;
    // }

    // get currentPointIndex() {
    //     return this.data.currentPointIndex;
    // }

    // set currentPointIndex(currentPointIndex) {
    //     this.data.currentPointIndex = currentPointIndex;
    // }
}

module.exports = RuneModel;