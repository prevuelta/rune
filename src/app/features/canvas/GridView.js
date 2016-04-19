var Util = require('../../global/util');
var constants = require('../../global/Const');
var Events = require('../../global/Events');

var paper = require('paper');


/* ========== Grid view ========== */

class GridView {
	constructor (options) {

	this.res = options.res;
	this.units = options.units;

	this.points = [];

	this.gridColor = constants.BLUE;

	for(var row = -this.units / 2; row < this.units / 2; row++) {

		this.points[row] = [];

		for(var col = -this.units / 2; col < this.units / 2; col++) {

			var point = [row, col];
			this.points[row].push(point);

		}

		col = 0;
	}

	draw () {
		// 
		console.log("Drawing grid");

		var grid = this;

        var gridColor = new paper.Color(grid.gridColor, 100);

		// Draw lines
		var gridGrid = new paper.Raster();
		gridGrid.setImageData(gridGrid.createImageData(200));
		gridGrid.setPixel(10, 10, 'black');

		for(var i = this.res / 2; i < 2000; i+= this.res) {
			var p1 = new paper.Point(i, 0);
			var p2 = new paper.Point(i, 2000);
			var rec = new paper.Path.Rectangle([i, 0], 1, 2000);
			rec.fillColor = gridColor;
			for(var j = this.res / 2; j < 2000; j+= this.res) {
				var p1 = new paper.Point(0, i);
				var p2 = new paper.Point(2000, i);
				var rec = new paper.Path.Rectangle([0, i], 2000, 1);
				rec.fillColor = gridColor;
			}
		}

		for(var i = 0, arr; arr = grid.points[i++];) {
			for( var j = 0, point; point = arr[j++];) {
				var paperPoint = new paper.Point( this.renderPoint(point) );
				grid.createGridPoint(paperPoint, point);
			}
		}
	}

	renderPoint (point){
		return [point[0] * this.res + (this.res / 2), point[1] * this.res + (this.res/2)];
	}

	createGridPoint (point, value) {

		var path = paper.Path.Circle(point, this.res / 2);

		path.value = value;
		path.active = false;

		var opaque = new paper.Color(255, 0, 0, 0.2);

		path.fillColor = opaque;

		path.onMouseEnter = function(e) {
			this.fillColor = 'orange';
		}

		path.onMouseLeave = function(e) {
			this.fillColor = this.active ? 'red' : opaque;
		}

		path.onMouseDown = function(e) {
			this.fillColor = 'red';
            Events.addPoint.dispatch(e.target.value);
            Events.redraw.dispatch();
		}
	}
}

module.exports = GridView;