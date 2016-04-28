var Events = require('../../global/Events');
var paper = require('paper');

/* ========== Tablet ========== */

class RuneView {
    constructor (runeModel, grid) {
        this.data = runeModel;
        this.grid = grid.options;
    }

    draw () {

        var runeView = this;

        runeView.path = new paper.Path({
            segments: runeView.data.currentPath.points.map(function(point) {
                return runeView.createRuneSegment(
                    point,
                    null
                );
            }),
            closed: runeView.data.currentPath.isClosed,
            style: (runeView.data.currentPath.isClosed ? {fillColor: 'black'} : {strokeColor: 'black'}),
            opacity: 0.6
        });

        runeView.path.runePath = true;

    }
    
    createRuneSegment (point, transform) {

        let segment;

        let renderedPoint = new paper.Point(
            point.render(this.grid.res)
        ).add(
            new paper.Point(this.grid.res.x/2, this.grid.res.y/2)
        );

        if(point.transforms) {
            point.transforms.forEach((transform) => {
                renderedPoint = renderedPoint.add(new paper.Point(
                    transform[0] * this.grid.res.x,
                    transform[1] * this.grid.res.y
                ));
            });
        }


        if (point.isCurve) {

            let h1 = point.handle1 ? new paper.Point(point.handle1[0], point.handle1[1]) : null; 
            let h2 = point.handle2 ? new paper.Point(point.handle2[0], point.handle2[1]) : null; 

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

            segment = new paper.Segment({
                point: renderedPoint,
                handleIn: h1,
                handleOut: h2
            });
        }

        

        let path = new paper.Path.Circle(renderedPoint, 8);
        path.isHandle = true;
        path.fillColor = 'white';
        path.value = point;
        path.isSelected = point.isSelected || false;
        path.strokeWidth = 4;
        path.strokeColor = path.isSelected ? 'red' : false;

        path.onMouseDown = function(e) {
            e.event.stopImmediatePropagation();
            this.isSelected = !this.isSelected;
            Events.selectPoint.dispatch(e.target.value);
            Events.redraw.dispatch();
        }

        Events.display.add((mode)=> {
            if (mode === 'preview') {
                path.visible = false;
            }
        });

        return segment || renderedPoint;
    }
}

module.exports = RuneView;
