'use strict';

let PathModel = require('./PathModel');
let PointModel = require('./PointModel');
let Events = require('../global/Events');


class RuneModel {
    constructor (data) {

        this.paths = data && data.paths.map(p => new PathModel(p)) || [new PathModel()];
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
        this.paths = [new PathModel()];
        this.activePath = this.paths[0];
        return this;
    }

    deletePath (path) {
        let _this = this;

        del(path, this.paths);

        function del (path, paths) {
            paths.forEach((p, i) => {
                if (p.children) {
                    del(path, p.children);
                }
                if (p === path) {
                    paths.splice(i, 1);
                }
            });
        }
    }

    selectHandler (point, dontSelectPath) {
        if (this.selectedPoint === point) {
            this.deselect();
            return;
        }
        if (this.selectedPoint) {
            this.selectedPoint.setSelected(false);
        }
        if (!dontSelectPath && point.path) {
            this.selectPath(point.path, true);
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

    selectPath (path, dontSelectPoint) {
        console.log("selecting path", path);
        if (path !== this.activePath) {
            if (this.activePath) {
                this.activePath.isActive = false;
            }
            path.isActive = true;
            this.activePath = path;
            this.deselect();
            if (path.hasPoints && !dontSelectPoint) {
               // this.selectHandler(path.points[0], true);
            } else if (!path.hasPoints) {
               // this.deselectAll();
            }
        }
    }

    addPath () {
        console.log("Creating path");
        let path = new PathModel();
        this.paths.push(path);
        this.selectPath(path);
        this.selectedPoint = null;
    }

    addSubPath (path) {
        let subPath = new PathModel();
        path.addChild(subPath);
        this.selectPath(subPath);
    }

    addPoint (gridPoint) {

        let point = new PointModel(this.activePath, gridPoint.x, gridPoint.y);

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

    deletePoint (p) {

        if (this.selectedPoint = p) {
            this.selectedPoint = null;
        }
        this.activePath.points.forEach((point, i) => {
            if (point === p) {
                this.activePath.points.splice(i, 1);
            }
        });
    }
}

module.exports = RuneModel;
