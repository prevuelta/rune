'use strict';

let Events = require('../../global/Events');
let constants = require('../../global/const');
let styles = require('../../global/styles');
let paper = require('paper');
let Trig = require('../../global/Trig');
let RuneArcView = require('./RuneArcView');

/* ========== Tablet ========== */

class RuneView {
    constructor (runeModel, grid) {
        this.data = runeModel;
        this.grid = grid.options;
    }

    draw (isPreview) {

        var _this = this;

        this.paths = _this.data.paths.map((path) => {
            let style = path.isClosed ? styles.path.filled : path.isActive ? styles.path.active : styles.path.outline;
            let paperPath;
            if (path.hasChildren) {
                let paths = [path].concat(path.children);

                paperPath = new paper.CompoundPath({
                    children: paths.map((p) => {
                        return new paper.Path({
                            segments: _this.getPathSegment(p, isPreview)
                        });
                    }),
                    style: style
                })
            } else {
                paperPath = this.generatePath(path, style, isPreview);
                paperPath.style = style;
                paperPath.isClosed = path.isClosed;
                debugger;
            }

            paperPath.opacity = 0.6;

            return paperPath;
        });
    }

    generatePath (path, style, isPreview) {
        let _this = this;
        let paths = [];
        let segments = [];

        path.points.forEach(p => {
            console.log(p.hasArc);
            if (p.hasArc) {
                paths.push(new paper.Path(segments));
                segments = [];
                let renderedPoint = new paper.Point(
                    p.render(_this.grid.res)
                ).add(
                    new paper.Point(_this.grid.res.x/2, _this.grid.res.y/2)
                );
                paths.push(new RuneArcView(p, renderedPoint).path);
            } else {
                segments.push(_this.createRuneSegment(p, null, isPreview));
            }
        });

        debugger;

        if (segments.length > 0) {
           paths.push(new paper.Path(segments));
        }

        if (paths.length > 1) {
            paths = paths.reduce((p, c) => c.join(p));
        }

        return paths == [] ? null || paths;

    }

    getPathSegment (path, isPreview) {
        let _this = this;s
        return path.points.map(function(point) {
            return _this.createRuneSegment(
                point,
                null,
                isPreview
            );
        })
    }

    createRuneSegment (point, transform, isPreview) {

        let segment;

        let renderedPoint = new paper.Point(
            point.render(this.grid.res)
        ).add(
            new paper.Point(this.grid.res.x/2, this.grid.res.y/2)
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
            segment = new paper.Segment({
                point: renderedPoint,
                handleIn: h1,
                handleOut: h2
            });
        } else if (point.hasArcIn) {
            // console.log(point.arcIn);
            // segment = new RuneArcView(point, renderedPoint).segment;
        }

        if (!isPreview) {

            let node = new paper.Path.Circle(renderedPoint, 8);

            node.isHandle = true;
            node.value = point;
            node.isSelected = point.isSelected || false;
            node.style = point.isSelected ? styles.node.selected : styles.node.normal;

            node.focus = function () {
                Events.draw.dispatch();
            };

            node.blur = function () {
                node.fillColor = 'white';
                Events.draw.dispatch();
            };

            node.setSelected = function (selected) {
                node.style = selected ? styles.node.selected : styles.node.normal;
            };

            node.onMouseDown = function(e) {
                e.event.stopImmediatePropagation();
                this.isSelected = !this.isSelected;
                this.style = this.isSelected ? styles.node.selected : styles.node.normal;
                Events.selectPoint.dispatch(e.target.value);
                Events.draw.dispatch();
            };

            point.node = node;

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

        }

        return segment || renderedPoint;
    }
}

module.exports = RuneView;
