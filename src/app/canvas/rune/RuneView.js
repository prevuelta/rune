var util = require('../../global/util');
var paper = require('paper');

/* ========== Tablet ========== */

function RuneView(runeModel, grid) {

    this.points = [];
    this.data = runeModel;
    this.grid = grid;
}

RuneView.prototype = {
    constructor: RuneView,
    draw : function() {

        var runeView = this;

        runeView.runePoints = [];
        runeView.path = new paper.Path();
        runeView.path.strokeColor = 'black';

        var testPath = new paper.Path({
            segments: runeView.data.currentPath.map(function(point, idx) {
                // var pointWithTransforms = point.reduce(function(prev, current) {
                //     return [prev[0] + current[0], prev[1] + current[1]];
                // });
                return runeView.createRuneSegment(
                    point.render(runeView.grid.res),
                    //runeView.grid.renderPoint(pointWithTransforms),
                    idx,
                    runeView.data.selectedPoints.indexOf(idx) > -1,
                    null
                );
            })
        })

        testPath.runePath = true;
        testPath.strokeColor = '#000000';

    },
    createRuneSegment: function(point, value, selected, transform) {

        let paperPoint;

        console.log("Point", point);

        if (point.length < 1) {
            paperPoint = new paper.Segment({
                point: point[0],
                handleIn: point[1],
                handleOut: point[2]
            });
        } else {
            paperPoint = new paper.Point(point);
        }

        let p = paperPoint.point || paperPoint;


        if(transform) {
            console.log(transform);
            p.add((function() {
                var point = new paper.Point();
                point.angle = transform[0];
                point.length = transform[1];
                return point;
            })());
        }

        let path = new paper.Path.Rectangle(p.subtract([7, 7]), 14);

        path.isHandle = true;
        path.fillColor = 'white';
        path.value = value;
        path.selected = selected || false;

        path.onMouseEnter = function(e) {
            // this.fillColor = this.selected ? 'red' : 'orange';
        }

        path.onMouseLeave = function(e) {
            // this.fillColor = 'white';
        }

        path.onMouseDown = function(e) {
            e.event.stopImmediatePropagation();
            this.selected = !this.selected;
            util.dispatchRuneEvent('selectPoint', [this.selected, e.target.value] );
        }

        return paperPoint;
    }
}

module.exports = RuneView;
