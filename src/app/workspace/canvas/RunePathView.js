'use strict';

let Events = require('../../global/Events');
let constants = require('../../global/const');
let styles = require('../../global/styles');
let paper = require('paper');
let Trig = require('../../global/Trig');
let RuneArcView = require('./RuneArcView');
let RunePointViewFactory = require('./RunePointViewFactory');
let RuneNodeFactory = require('./RuneNodeFactory');

class RunePathView {

    constructor (path, grid, layers) {

        this.grid = grid;
        this.layers = layers;

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
                 this.layers.render.activate();
                if (segments.length > 0) {
                    paths.push(new paper.Path(segments));
                    segments = [];
                }
                let renderedPoint = new paper.Point(
                    p.render(_this.grid.res)
                );
                paths = paths.concat(new RuneArcView(p, renderedPoint, _this.grid.res, this.layers).paths);
            } else {
                segments.push(RunePointViewFactory(p, this.grid.res, this.layers));
            }
        });


        if (segments.length > 0) {
           this.layers.render.activate();
           paths.push(new paper.Path(segments));
        }

        if (paths.length > 1) {
            this.layers.render.activate();
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
            return RunePointViewFactory(point, this.grid.res, this.layers);
        })
    }
}

module.exports = RunePathView;