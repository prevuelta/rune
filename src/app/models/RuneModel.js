let RunePoint = require('./RunePointModel');
let Events = require('../global/Events');

/* ========== Rune Model ========== */

class RunePathModel {
    constructor (data) {
        this.points = data && data.points.map(p => new RunePoint(p)) || [];
        this.isClosed = data && data.isClosed || false;
        this.isActive = data && data.isActive || false;
        this.children = data && data.children.map(c => new RunePathModel(c)) || [];
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
        this.activePath = this.paths.find(p => p.isActive) || this.paths[0];
        this.selectedPoints = data && data.selectedPoints || [];
        this.currentPointIndex = data && data.currentPointIndex || 0;
        this.reverseAdd = false;
        this.selectedPoint = null;

        let _this = this;

        // Get selected point
        this.paths.forEach((p) => {
            if (p.points.some(pt => pt.isSelected)) {
                _this.selectedPoint = p.points.find(pt => pt.isSelected);
            }
        });

        // Events.
    }

    clearPaths ()  {
        this.paths = [new RunePathModel()];
        this.activePath = this.paths[0];
        return this;
    }

    selectHandler (point) {
        if (this.selectedPoint === point) {
            this.deselect();
            return;
        }
        if (this.selectedPoint) {
            this.selectedPoint.setSelected(false);
        }
        point.setSelected(true);
        this.selectedPoint = point;

    }

    updateGrid (grid) {
        this.paths.forEach(path => {
            path.points.forEach(p => {
                // eg: grid units = 4, point is 1.5 | 1.5
                // we want 4 | 4
                // -1.5 | -0.5 | 0.5 | 1.5
                // 1,2,3,4 
                // + 2.5
                // Eg. grid units = 3, point is -1 | 1
                // we want 1 | 3
                // -1 | 0 | 1
                // + 2
                // == (+ 1/2 + 0.5)
                console.log("p", p);
                let rX =  p.x + ((grid.old.units/2) + 0.5);
                rX = rX / grid.old.units;
                let nX = grid.new.units * rX;
                nX = nX - ((grid.new.units/2) + 0.5);
                p.x = nX;
                console.log(rX,nX);
            });
        });
    }

    deselect () {
        if (this.selectedPoint) {
            this.selectedPoint.setSelected(false);
            this.selectedPoint = null;
        }
    }

    selectPath (path) {
        path.isActive = true;
        this.activePath.isActive = false;
        this.activePath = path;
    }

    addPath () {
        let path = new RunePathModel();
        path.isActive = true;
        this.paths.push(path);
        this.activePath = path;
    }

    addSubPath (path) {
        let subPath = new RunePathModel();
        subPath.isActive = true;
        path.addChild(subPath);
        this.activePath = subPath;
    }


    addPoint (gridPoint) {

        let point = new RunePoint(gridPoint.x, gridPoint.y);
        // point.gridPoint = gridPoint;

        let selectedIndex = this.activePath.points.indexOf(this.selectedPoint);

        if (selectedIndex > -1) {
            if (selectedIndex === 0) {
                this.activePath.points.unshift(point);
            } else if (selectedIndex === this.activePath.points.length -1) {
                this.activePath.points.push(point);
            } else {
                this.activePath.points.splice(selectedIndex, 0, point);
            }
        } else {
            this.activePath.points.push(point);
        }

        this.selectHandler(point);

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

        this.activePath.points.forEach((point, i) => {
            if (point === p) {
                this.activePath.points.splice(i, 1);
            }
        });
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
