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

        console.log(runeView.data.currentPath);

        var testPath = new paper.Path({
            segments: runeView.data.currentPath.map(function(point, idx) {
                return runeView.grid.renderPoint(point);
            }),
            selected: true
        })

        testPath.onMouseDown = function(e) {
            this.selected = !this.selected;
        };

        testPath.strokeColor = '#ff0000';

		// runeView.data.currentPath.forEach(function(point, idx) {

		// 	var runePoint = runeView.createRunePoint(
  //               runeView.grid.renderPoint(point),
  //               idx,
  //               runeView.data.selectedPoints.indexOf(idx) > -1,
  //               runeView.data.transforms[idx] || null);
		// 	runeView.points.push(runePoint);

		// 	if(idx) {
		// 		runeView.path.lineTo(runePoint.point);
		// 	} else {
		// 		runeView.path.moveTo(runePoint.point);
		// 	}

		// });
	},
	createRunePoint: function(point, value, selected, transform) {

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

		return {point:paperPoint, path:path};
	}
}

module.exports = RuneView;
