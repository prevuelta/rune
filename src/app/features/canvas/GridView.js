var Util = require('../../global/util');
var constants = require('../../global/Const');
var Events = require('../../global/Events');
var RunePoint = require('../../models/RunePoint');

var paper = require('paper');


/* ========== Grid view ========== */

var gridPointFactory = (point, res) => {

    let paperPoint = new paper.Point( point.render(res) );
    // let path = new paper.Path.Ellipse({point: paperPoint, size: [res.x, res.y]});
    let path = new paper.Path.Rectangle(paperPoint, res.x, res.y);

    path.value = point;
    path.active = false;

    var opaque = new paper.Color(255, 0, 0, 0.2);

    path.fillColor = opaque;

    path.onMouseEnter = function (e) {
        this.fillColor = 'orange';
    };

    path.onMouseLeave = function (e) {
        this.fillColor = this.active ? 'red' : opaque;
    };

    path.onMouseDown = function (e) {
        this.fillColor = 'red';
        Events.addPoint.dispatch(e.target.value);
        Events.redraw.dispatch();
    };

    return path;
}

class GridView {
	constructor (options) {

    	this.options = options;
    	this.points = [];

        let col, row;
        col = row = -this.options.units/2;

        for (let i = 1; i <= this.options.units * this.options.units; i++) {
            this.points.push(new RunePoint(row, col));
            if (i && i % this.options.units == 0) {
                row++;
                col = -this.options.units/2;
            } else {
                col++;
            }
        }

    }

	draw () {

		let _this = this;

        let gridColor = new paper.Color(_this.gridColor, 100);

        let {x,y} = this.options.res;

        let rowLines = new paper.Group();
        let colLines = new paper.Group();

        for (let i = -this.options.units/2; i < this.options.units/2; i++) {
            rowLines.addChild(this.xLine(i * y));
            colLines.addChild(this.yLine(i * x));
        }


        colLines.translate([paper.view.center.x + (x/2), 0]);
        rowLines.translate([0, paper.view.center.y + (y/2)]);

        this.xLine(paper.view.center.y, constants.RED);
        this.yLine(paper.view.center.x, constants.RED);

        this.createGridPoints();

	}

    createGridPoints () {

        this.gridPoints = new paper.Group();

        let _this = this;

        this.points.forEach((point) => {
            _this.gridPoints.addChild(gridPointFactory(point, this.options.res));
        });

        this.gridPoints.translate(paper.view.center);
    }

	yLine (xLoc, color) {
		let line = new paper.Path.Rectangle([xLoc, 0], 1, 2000);
		line.fillColor = color ? color : constants.BLUE;
        return line;
	}

	xLine (yLoc, color) {
		let line = new paper.Path.Rectangle([0, yLoc], 2000, 1);
		line.fillColor = color ? color : constants.BLUE;
        return line;
	}
}

module.exports = GridView;