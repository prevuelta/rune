var Util = require('../../global/util');
var constants = require('../../global/Const');
var Events = require('../../global/Events');
var styles = require('../../global/styles');
var PointModel = require('../../models/PointModel');

var paper = require('paper');
var Canvas = require('./CanvasService');

/* ========== Grid view ========== */

var gridPointFactory = (point, res) => {

    let p = point.render(res);
    let paperPoint = new paper.Point( p[0] - (res.x/2), p[1] - (res.y/2) );
    // let path = new paper.Path.Ellipse({point: paperPoint, size: [res.x, res.y]});
    let path;

    Canvas.drawToLayer('grid', () => {
        path = new paper.Path.Rectangle(paperPoint, res.x-2, res.y-2);
    });

    path.value = point;
    path.active = false;

    path.style = styles.grid.fill;
    path.opacity = 0.2;

    path.onMouseEnter = function (e) {
        this.opacity = 0.4;
    };

    path.onMouseLeave = function (e) {
        this.opacity = 0.2;
    };

    path.onMouseDown = function (e) {
        this.opacity = 0.6;
        Events.addPoint.dispatch(e.target.value);
        Events.draw.dispatch();
    };

    return path;
}

class GridView {
	constructor (options) {

    	this.options = options;
    	this.points = [];

        let col, row;
        col = row = -(this.options.units/2) + 0.5;

        for (let i = 1; i <= this.options.units * this.options.units; i++) {
            this.points.push(new PointModel(null, row, col));
            if (i && i % this.options.units == 0) {
                row++;
                col = -(this.options.units/2) + 0.5;
            } else {
                col++;
            }
        }

    }

	draw () {

        Canvas.drawToLayer('grid', this.drawToGrid.bind(this));
        this.createGridPoints();

	}

    drawToGrid () {

        let gridColor = new paper.Color(this.gridColor, 100);

        let {x,y} = this.options.res;

        let rowLines, colLines;

        rowLines = new paper.Group();
        colLines = new paper.Group();

        for (let i = -this.options.units/2; i < this.options.units/2; i++) {
            rowLines.addChild(this.xLine(i * y));
            colLines.addChild(this.yLine(i * x));
        }
        colLines.translate([paper.view.center.x + (x/2), 0]);
        rowLines.translate([0, paper.view.center.y + (y/2)]);

        this.xLine(paper.view.center.y, constants.RED);
        this.yLine(paper.view.center.x, constants.RED);

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