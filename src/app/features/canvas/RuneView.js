var Events = require('../../global/Events');
var paper = require('paper');

/* ========== Tablet ========== */

class RuneView {
    constructor (runeModel, grid) {
        this.data = runeModel;
        this.grid = grid;
    }

    draw () {

        var runeView = this;

        runeView.path = new paper.Path({
            segments: runeView.data.currentPath.points.map(function(point, idx) {
                return runeView.createRuneSegment(
                    point,
                    idx,
                    !!runeView.data.selectedPoints[idx],
                    null
                );
            }),
            closed: runeView.data.currentPath.isClosed,
            style: (runeView.data.currentPath.isClosed ? {fillColor: 'black'} : {strokeColor: 'black'}),
            opacity: 0.6
        });

        runeView.path.runePath = true;

    }
    
    createRuneSegment (point, idx, isSelected, transform) {

        let segment;

        let renderedPoint = new paper.Point(
            point.render(this.grid.res)
        ).add(
            new paper.Point(this.grid.res.x/2, this.grid.res.y/2)
        );

        if(point.transforms) {
            point.transforms.forEach((transform) => {
                console.log("T:", transform);
                renderedPoint = renderedPoint.add(new paper.Point(
                    transform[0] * this.grid.res.x,
                    transform[1] * this.grid.res.y
                ));
            });
        }


        if (point.isCurve) {
            segment = new paper.Segment({
                point: renderedPoint,
                handleIn: new paper.Point(point.handles[0]),
                handleOut: new paper.Point(point.handles[1])
            });
        }

        if (point.handles.length > 0 && isSelected) {
            let h1 = new paper.Path.Circle(new paper.Point(point.handles[1]), 5);
            let h2 = new paper.Path.Circle(new paper.Point(point.handles[1]), 5);
            h1.strokeColor = 'red';
        }

        let path = new paper.Path.Circle(renderedPoint, 8);
        path.isHandle = true;
        path.fillColor = 'white';
        path.value = { idx: idx, point: point};
        path.isSelected = isSelected || false;
        path.strokeWidth = 4;
        path.strokeColor = path.isSelected ? 'red' : false;

        path.onMouseDown = function(e) {
            e.event.stopImmediatePropagation();
            this.isSelected = !this.isSelected;
            Events.selectPoint.dispatch(this.isSelected, e.target.value);
            Events.redraw.dispatch();
        }

        return segment || renderedPoint;
    }
}

module.exports = RuneView;
