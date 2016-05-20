'use strict';

let Events = require('../../global/Events');
let constants = require('../../global/const');
let styles = require('../../global/styles');
let paper = require('paper');
let Trig = require('../../global/Trig');
let RuneArcView = require('./RuneArcView');
let RuneNodeFactory = require('./RuneNodeFactory');

class RunePathView {

    constructor (path, grid, iLayer, rLayer) {

        this.grid = grid;
        this.iLayer = iLayer;
        this.rLayer = rLayer;

        let style = path.isClosed ? styles.path.filled : path.isActive ? styles.path.active : styles.path.outline;
        let paperPath;

        if (path.hasChildren) {
            let paths = [path].concat(path.children);
            paperPath = new paper.CompoundPath({
                children: paths.map((p) => {
                    return this.generatePath(p, style);
                }),
                style: style
            })
        } else {
            paperPath = this.generatePath(path, style);
            if (paperPath) {
                paperPath.style = style;
                paperPath.isClosed = path.isClosed;
                paperPath.closed = path.isClosed;
            }
        }

        this.path = paperPath;
    }

    generatePath (path, style) {
        let _this = this;
        let paths = [];
        let segments = [];

        path.points.forEach(p => {
            if (p.hasArc) {
                 this.rLayer.activate();
                if (segments.length > 0) {
                    paths.push(new paper.Path(segments));
                    segments = [];
                }
                let renderedPoint = new paper.Point(
                    p.render(_this.grid.res)
                );
                paths = paths.concat(new RuneArcView(p, renderedPoint, _this.grid.res, this.iLayer, this.rLayer).paths);
            } else {
                segments.push(_this.createRuneSegment(p, null));
            }
        });


        if (segments.length > 0) {
          this.rLayer.activate();
           paths.push(new paper.Path(segments));
        }

        if (paths.length > 1) {
            this.rLayer.activate();
            let newPath = new paper.Path();
            paths.forEach(p => newPath.join(p));
            return newPath;
        } else if (paths[0]) {
            return paths[0];
        } else {
            return null;
        }
    }

    getPathSegment (path) {
        let _this = this;
        return path.points.map(function(point) {
            return _this.createRuneSegment(
                point,
                null
            );
        })
    }

    createRuneSegment (point, transform) {

        let segment;

        this.rLayer.activate();

        let renderedPoint = new paper.Point(
            point.render(this.grid.res)
        );

        if(point.transform) {
            renderedPoint = renderedPoint.add(new paper.Point(
                point.transform[0] * this.grid.res.x,
                point.transform[1] * this.grid.res.y
            ));
        }

        let h1 = point.handle1 ? new paper.Point(point.handle1[0], point.handle1[1]) : null;
        let h2 = point.handle2 ? new paper.Point(point.handle2[0], point.handle2[1]) : null;

        if (point.isCurve) {
            this.iLayer.activate();
            segment = new paper.Segment({
                point: renderedPoint,
                handleIn: h1,
                handleOut: h2
            });
        }

        this.iLayer.activate();

        point.node = RuneNodeFactory(point, renderedPoint);

        if (point.isCurve) {

            if (point.handle1) {
                let h1p = new paper.Path.Circle(renderedPoint.add(h1), 5);
                h1p.strokeColor = 'red';
                let p1 = new paper.Path.Line(renderedPoint.add(h1), renderedPoint);
                p1.strokeColor = 'red';
            }

            if (point.handle2) {
                let h2p = new paper.Path.Circle(renderedPoint.add(h2), 5);
                h2p.strokeColor = 'red';
                let p2 = new paper.Path.Line(renderedPoint.add(h2), renderedPoint);
                p2.strokeColor = 'red';
            }
        }

        return segment || renderedPoint;
    }
}

module.exports = RunePathView;