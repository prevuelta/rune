var Events = require('../../global/Events');
var paper = require('paper');

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

        let segment;

        let renderedPoint = new paper.Point(
            point.render(this.grid.res)
        ).add(
            new paper.Point(this.grid.res.x/2, this.grid.res.y/2)
        );

        // if(point.transforms) {
        //     point.transforms.forEach((transform) => {
        //         renderedPoint = renderedPoint.add(new paper.Point(
        //             transform[0] * this.grid.res.x,
        //             transform[1] * this.grid.res.y
        //         ));
        //     });
        // }

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
        }

        if (!isPreview) {

            let node = new paper.Path.Circle(renderedPoint, 8);
            node.isHandle = true;
            node.fillColor = 'white';
            node.value = point;
            node.isSelected = point.isSelected || false;
            node.strokeWidth = 4;
            node.strokeColor = node.isSelected ? 'red' : false;

            node.onMouseDown = function(e) {
                e.event.stopImmediatePropagation();
                this.isSelected = !this.isSelected;
                Events.selectPoint.dispatch(e.target.value);
                Events.redraw.dispatch();
            }

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
