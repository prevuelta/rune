var paper = require('paper');
var util = require('../../global/util');


/* ========== Grid view ========== */

function GridView(options) {

	this.res = options.res;
	this.units = options.units;
	this.padding = options.padding;

	this.points = [];

	this.gridColor = 'orange';

	for(var row = 0; row < this.units; row++) {
		
		this.points[row] = [];

		for(var col = 0; col < this.units; col++) {
			
			var point = [row, col];
			this.points[row].push(point);

		}

		col = 0;
	}
}

GridView.prototype = {
	constructor: GridView,
	draw: function() {
		console.log("Drawing grid");

		var grid = this;

		// Draw lines
		var gridGrid = new paper.Raster();
		gridGrid.setImageData(gridGrid.createImageData(200));
		gridGrid.setPixel(10, 10, 'black');

		for(var i = this.res / 2; i < 2000; i+= this.res) {
			var p1 = new paper.Point(i, 0);
			var p2 = new paper.Point(i, 2000);
			var rec = new paper.Path.Rectangle([i, 0], 1, 2000);
			rec.fillColor = grid.gridColor;
			for(var j = this.res / 2; j < 2000; j+= this.res) {
				var p1 = new paper.Point(0, i);
				var p2 = new paper.Point(2000, i);
				var rec = new paper.Path.Rectangle([0, i], 2000, 1);
				rec.fillColor = grid.gridColor;
			}
		}

		for(var i = 0, arr; arr = grid.points[i++];) {
			for( var j = 0, point; point = arr[j++];) {
				var paperPoint = new paper.Point( this.renderPoint(point) );
				grid.createGridPoint(paperPoint, point);
			}
		}
	},
	renderPoint: function(point){
		return [point[0] * this.res + this.padding, point[1] * this.res + this.padding];
	},
	createGridPoint : function(point, value) {

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

			// this.active = true;

			util.dispatchRuneEvent('addPoint', e.target.value);
			

		}
	}
}

module.exports = GridView;