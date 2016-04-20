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

    	for(var row = -this.units / 2; row < this.units / 2; row++) {

    		this.points[row] = [];

    		for(var col = -this.units / 2; col < this.units / 2; col++) {

    			var point = [row, col];
    			this.points[row].push(point);
    		}

    		col = 0;
    	}
    }

	draw () {

		let _this = this;

        let gridColor = new paper.Color(_this.gridColor, 100);

		for (let i = 0; i < 100; i += this.res) {
			this.vLine(paper.view.center.x + i)
			this.vLine(paper.view.center.x - i)
		}

        let midX = new paper.Path.Rectangle([0, paper.view.center.y], 2000, 1);
        midX.fillColor = constants.RED;

        this.vLine(paper.view.center.x, constants.RED);
	}

	yLine (xLoc, color) {
		let line = new paper.Path.Rectangle([xLoc, 0], 1, 2000);
		line.fillColor = color ? color : constants.BLUE;
	}

	xLine (xLoc, color) {
		let line = new paper.Path.Rectangle([0, xLoc], 2000, 1);
		line.fillColor = color ? color : constants.BLUE;
	}

	createGridPoints () {
		for(var i = 0, arr; arr = grid.points[i++];) {
			for( var j = 0, point; point = arr[j++];) {
				var paperPoint = new paper.Point( this.renderPoint(point) );
				grid.createGridPoint(paperPoint, point);
			}
		}
	}

	renderPoint (point) {
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