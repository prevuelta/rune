let Events = require('../../global/Events');
let constants = require('../../global/const');
let styles = require('../../global/styles');
let paper = require('paper');
let Trig = require('../../global/Trig');

/* ========== Tablet ========== */

class _this {
    constructor (runeModel, grid) {
        this.data = runeModel;
        this.grid = grid.options;
    }

    draw (isPreview) {

        var _this = this;

        this.paths = _this.data.paths.map((path) => {
            let style = (path.isClosed ? {fillColor: 'black'} : {strokeColor: path.isActive ? 'red' :'black'});
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
                paperPath = new paper.Path({
                    segments: this.getPathSegment(path, isPreview),
                    style: style,
                    closed: path.isClosed
                });
            }

            paperPath.opacity = 0.6;

            return paperPath;
        });
    }

    getPathSegment (path, isPreview) {
        let _this = this;
        return path.points.map(function(point) {
            return _this.createRuneSegment(
                point,
                null,
                isPreview
            );
        })
    }

    createRuneSegment (point, transform, isPreview) {

        console.log("creating segment");

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
        } else if (point.isArc) {
            let center = new paper.Point(point.arcCenter);
            let radius = renderedPoint.getDistance(center);
            let rotation = new paper.Point(0, 0);
            let midRotation = new paper.Point(0, 0);

            rotation.length = radius;
            midRotation.length = radius;
            rotation.angle = renderedPoint.angle + Trig.radToDeg(point.arcLength);
            midRotation.angle = renderedPoint.angle + (Trig.radToDeg(point.arcLength) / 2);

            console.log('length', rotation.length);
            console.log('angle', rotation.angle);

            segment = new paper.Path.Arc({
                from: renderedPoint,
                through: center.add(midRotation),
                to: center.add(rotation),
                strokeColor: 'black'
            });
            let c1 = new paper.Path.Circle(center, 10);
            c1.strokeColor = 'orange';
            let c2 = new paper.Path.Circle(center.add(rotation), 10);
            c2.strokeColor = 'pink';
            let c3 = new paper.Path.Circle(center.add(midRotation), 10);
            c3.strokeColor = 'blue';
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

module.exports = _this;
