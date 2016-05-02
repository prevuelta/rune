var RunePoint = require('./RunePoint');

/* ========== Rune Model ========== */

class RunePathModel {
    constructor (data) {
        this.points = data && data.points.map(p => new RunePoint(p)) || [];
        this.isClosed = data && data.isClosed || false;
        this.isActive = data && data.isActive || false;
        this.children = data && data.children || [];
    }

    addChild (path) {
        this.children.push(path);
    }

    get hasChildren () {
        return !!this.children.length; 
    }
}

class RuneModel {
    constructor (data) {

        this.paths = data && data.paths.map(p => new RunePathModel(p)) || [new RunePathModel()];
        this.activePath = this.paths[0];
        this.selectedPoints = data && data.selectedPoints || [];
        this.currentPointIndex = data && data.currentPointIndex || 0;
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
        let path = new RunePathModel();
        path.isActive = true;
        this.paths.push(path);
        this.activePath = path;
        Events.refreshPanels.dispatch();
    }

    addChildPath () {
        this.activePath.addChild(new RunePathModel());
    }

    selectPath (path) {
        path.isActive = true;
        this.activePath.isActive = false;
        this.activePath = path;
    }

    addPoint (gridPoint) {
        // if (this.selectedPoints.length) {
        //     if (this.selectedPoints[0] == 0 ) {
        //         this.reverseAdd = true;
        //     } else if (this.selectedPoints[0] == this.activePath.length-1) {
        //         this.reverseAdd = false;
        //     }
        // }
        // if(this.reverseAdd) {
        //     this.activePath.points.unshift(new RunePoint(gridRef.x, gridRef.y));
        // } else {
        //     this.currentPointIndex++;
        //     this.activePath.points.splice(this.currentPointIndex, 0, new RunePoint(gridRef.x, gridRef.y));
        // }

        let point = new RunePoint(gridPoint.x, gridPoint.y);

        point.gridPoint = gridPoint;

        this.activePath.points.push(point);
        
        Events.refreshPanels.dispatch();

        return this;
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

        debugger;

        this.activePath.points.forEach((point, i) => {
            if (point === p) {
                this.activePath.points.splice(i, 1);
            }
        });
        Events.redraw.dispatch();
        Events.refreshPanels.dispatch();
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