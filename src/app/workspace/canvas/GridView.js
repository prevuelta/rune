'use strict';

let Util = require('../../global/util');
let constants = require('../../global/Const');
let Events = require('../../global/Events');
let styles = require('../../global/styles');
let PointModel = require('../../models/PointModel');
let GridNodeFactory = require('./GridNodeFactory');

let paper = require('paper');
let Canvas = require('./CanvasService');

class GridView {
	constructor (options) {

    	this.options = options;
    	this.points = [];

        this.gridUnits = options.grid.size;

        let col, row;
        col = row = -(this.gridUnits/2) + 0.5;

        for (let i = 1; i <= this.gridUnits * this.gridUnits; i++) {
            this.points.push(new PointModel(null, row, col));
            if (i && i % this.gridUnits == 0) {
                row++;
                col = -(this.gridUnits/2) + 0.5;
            } else {
                col++;
            }
        }
    }

    drawToBoard () {
        let boardX = this.options.board.x * this.options.grid.res.x;
        let boardY = this.options.board.y * this.options.grid.res.y;
        let artBoard = new paper.Path.Rectangle(paper.view.center.x-boardX/2,paper.view.center.y-boardY/2, boardX, boardY);
        artBoard.style = styles.board;
    }

	draw () {
        Canvas.drawToLayer('board', this.drawToBoard.bind(this));
        Canvas.drawToLayer('overlay', this.drawToOverlay.bind(this));
        Canvas.drawToLayer('grid', this.drawToGrid.bind(this));
        Canvas.drawToLayer('grid', this.createGridPoints.bind(this));

	}

    drawToOverlay () {
        this.xLine(paper.view.center.y, styles.guides.accent);
        this.yLine(paper.view.center.x, styles.guides.accent);
        this.xLine(paper.view.center.y - this.options.board.y * this.options.grid.res.y / 2, styles.guides.accent);
        this.xLine(paper.view.center.y + this.options.board.y * this.options.grid.res.y / 2, styles.guides.accent);
        this.yLine(paper.view.center.x - this.options.board.x * this.options.grid.res.x / 2, styles.guides.accent);
        this.yLine(paper.view.center.x + this.options.board.x * this.options.grid.res.x / 2, styles.guides.accent);

    }

    drawToGrid () {

        let gridColor = new paper.Color(this.gridColor, 100);

        let {x,y} = this.options.grid.res;

        let rowLines, colLines;

        rowLines = new paper.Group();
        colLines = new paper.Group();

        let thing = styles.guides.primary;

        for (let i = -this.gridUnits/2; i < this.gridUnits/2; i++) {
            rowLines.addChild(this.xLine(i * y, styles.guides.primary));
            colLines.addChild(this.yLine(i * x, styles.guides.primary));
            for (let j = -4; j <= 4; j+=2) {
                if (j) {
                    rowLines.addChild(this.xLine(i * y + (j * (y/10)), styles.guides.secondary));
                    colLines.addChild(this.yLine(i * x + (j * (x/10)), styles.guides.secondary));
                }
            }
        }

        colLines.translate([paper.view.center.x + (x/2), 0]);
        rowLines.translate([0, paper.view.center.y + (y/2)]);

    }

    createGridPoints () {

        this.gridPoints = new paper.Group();

        let _this = this;

        this.points.forEach((point) => {
            _this.gridPoints.addChild(GridNodeFactory(point, this.options.grid.res));
        });

        this.gridPoints.translate(paper.view.center);
    }

	yLine (xLoc, style) {
        let line = new paper.Path.Rectangle([xLoc, 0], 1, 2000);
        line.style = style;

        return line;
	}

	xLine (yLoc, style) {
		let line = new paper.Path.Rectangle([0, yLoc], 2000, 1);
        line.style = style;

        return line;
	}
}

module.exports = GridView;