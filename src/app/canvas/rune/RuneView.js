var paper = require('paper');
var util = require('../../global/util');

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
                var pointWithTransforms = point.reduce(function(prev, current) {
                    return [prev[0] + current[0], prev[1] + current[1]];
                });
                return runeView.createRuneSegment(
                    runeView.grid.renderPoint(pointWithTransforms),
                    idx,
                    runeView.data.selectedPoints.indexOf(idx) > -1,
                    null
                );
            })
        })

        testPath.runePath = true;
        testPath.strokeColor = '#ff0000';


    },
    createRuneSegment: function(point, value, selected, transform) {

        var paperPoint = new paper.Point(point);

        if(transform) {
            console.log(transform);
            paperPoint.add((function() {
                var point = new paper.Point();
                point.angle = transform[0];
                point.length = transform[1];
                return point;
            })());
        }

        var path = new paper.Path.Rectangle(paperPoint.subtract([5, 5]), 10);

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
            this.selected = !this.selected;
            util.dispatchRuneEvent('selectPoint', [this.selected, e.target.value] );
        }

        path.onKeyDown = function(e) {
            console.log(e.key);
            switch(e.key) {
                case 'delete' :
                    console.log('de');
                break;
            }
        }

        return point;
    }
}

module.exports = RuneView;
