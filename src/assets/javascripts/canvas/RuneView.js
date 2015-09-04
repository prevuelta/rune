var paper = require('paper');
var util = require('../global/util');

/* ========== Tablet ========== */

function RuneView(runeModel, grid) {

	this.points = [];

	this.runeModel = runeModel;

	console.log(grid);

	this.grid = grid;

}


RuneView.prototype = {
	constructor: RuneView,
	draw : function() {

		console.log("Tablet view drawing");

		var rune = this;

		var runePath = new paper.Path();

		runePath.strokeColor = 'black';

		rune.runePoints = [];

		rune.runeModel.points.forEach(function(point, idx) {

			var runePoint = rune.createRunePoint(rune.grid.renderPoint(point), idx, rune.runeModel.selectedPoints.indexOf(idx) > -1, rune.runeModel.transforms[idx] || null);

			rune.points.push(runePoint);

			if(idx) {
				runePath.lineTo(runePoint.point);
			} else {
				runePath.moveTo(runePoint.point);
			}

		});
	},
	createRunePoint: function(point, value, selected, transform) {

		var paperPoint = new paper.Point(point);

		if(transform) {
			console.log(transform);
			paperPoint.add((function() { var point = new paper.Point(); point.angle = transform[0]; point.length = transform[1]; return point;})());
		}

		var path = new paper.Path.Rectangle(paperPoint.subtract([5, 5]), 10);
		
		path.strokeColor = 'red';
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
