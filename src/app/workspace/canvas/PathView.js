'use strict';

let Events = require('../../global/Events');
let constants = require('../../global/const');
let styles = require('../../global/styles');
let paper = require('paper');
let Trig = require('../../global/Trig');
let ArcView = require('./ArcView');
let RunePointViewFactory = require('./RunePointViewFactory');
let RuneNodeFactory = require('./RuneNodeFactory');

let Canvas = require('./CanvasService');

class RunePathView {

    constructor (path, options) {

        this.options = options;

        let style = path.isClosed ? styles.path.filled : path.isActive ? styles.path.active : styles.path.outline;
        let paperPath;

        if (path.hasChildren) {
            let paths = [path].concat(path.children);
            Canvas.drawToLayer('render', () => {
                paperPath = new paper.CompoundPath({
                    children: paths.map((p) => {
                        return this.generatePath(p, style);
                    }),
                    style: style
                });
            });

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
                if (segments.length > 0) {
                    paths.push(new paper.Path(segments));
                    segments = [];
                }
                let renderedPoint = new paper.Point(
                    p.render(_this.options)
                );
                paths = paths.concat(new ArcView(p, renderedPoint, _this.options).paths);
            } else {
                segments.push(RunePointViewFactory(p, this.options));
            }
        });


        if (segments.length > 0) {
            Canvas.drawToLayer('render', () => {
                paths.push(new paper.Path(segments));
            });
        }

        if (paths.length > 1) {
            let newPath;
            Canvas.drawToLayer('render', () => {
                newPath = new paper.Path();
                paths.forEach(p => newPath.join(p));
            });
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
            return RunePointViewFactory(point, this.options);
        })
    }
}

module.exports = RunePathView;