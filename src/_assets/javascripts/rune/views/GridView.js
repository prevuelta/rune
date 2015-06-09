
/* ========== Grid view ========== */

function GridView(options) {

	this.res = options.res;
	this.units = options.units;
	this.padding = options.padding;

	this.points = [];

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

		var grid = this;

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