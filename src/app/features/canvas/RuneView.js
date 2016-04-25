var Events = require('../../global/Events');
var paper = require('paper');

/* ========== Tablet ========== */

class RuneView {
    constructor (runeModel, grid) {

        // this.points = [];
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

        console.log(runeView.path);

        runeView.path.runePath = true;

    }
    
    createRuneSegment (point, idx, isSelected, transform) {

        let paperPoint;

        let renderedPoint = point.render(this.grid.res);

        if (point.isCurve) {
            paperPoint = new paper.Segment({
                point: renderedPoint[0],
                handleIn: renderedPoint[1],
                handleOut: renderedPoint[2]
            });
        } else {
            paperPoint = new paper.Point(renderedPoint);
        }

        let p = paperPoint.point || paperPoint;

        p = p.add(new paper.Point(this.grid.res.x/2, this.grid.res.y/2));

        if(point.transforms) {
            point.transforms.forEach((transform) => {
                console.log("T:", transform);
                p = p.add(new paper.Point(
                    transform[0] * this.grid.res,
                    transform[1] * this.grid.res
                ));
            });
        }

        let path = new paper.Path.Rectangle(p.subtract([7, 7]), 14);

        path.isHandle = true;
        path.fillColor = 'white';
        path.value = { idx: idx, point: point};
        path.isSelected = isSelected || false;
        path.strokeWidth = 4;
        path.strokeColor = path.isSelected ? 'red' : false;


        path.onMouseEnter = function(e) {
            // this.fillColor = this.selected ? 'red' : 'orange';
        }

        path.onMouseLeave = function(e) {
            // this.fillColor = 'white';
        }

        path.onMouseDown = function(e) {
            e.event.stopImmediatePropagation();
            this.isSelected = !this.isSelected;
            Events.selectPoint.dispatch(this.isSelected, e.target.value);
            Events.redraw.dispatch();
        }

        return p;
    }
}

module.exports = RuneView;
