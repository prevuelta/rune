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

        this.updateOptions(options);

        this.points = [];

        let col, row;
        col = row = -(this.options.grid.size/2) + 0.5;

        for (let i = 1; i <= this.options.grid.size * this.options.grid.size; i++) {
            this.points.push(new PointModel(null, row, col));
            if (i && i % this.options.grid.size == 0) {
                row++;
                col = -(this.options.grid.size/2) + 0.5;
            } else {
                col++;
            }
        }
    }

    updateOptions (options) {
        if (options) {
            this.options = options;
        }
        let res = this.options.grid.getRes(this.options.zoomLevel);
        this.resX = res.x;
        this.resY = res.y;
    }

    drawToBoard () {
        let boardX = this.options.board.x * this.resX;
        let boardY = this.options.board.y * this.resY;
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
        this.xLine(paper.view.center.y - this.options.board.y * this.resY / 2, styles.guides.accent);
        this.xLine(paper.view.center.y + this.options.board.y * this.resY / 2, styles.guides.accent);
        this.yLine(paper.view.center.x - this.options.board.x * this.resX / 2, styles.guides.accent);
        this.yLine(paper.view.center.x + this.options.board.x * this.resX / 2, styles.guides.accent);

    }

    drawToGrid () {

        let gridColor = new paper.Color(this.gridColor, 100);;

        let rowLines, colLines;

        rowLines = new paper.Group();
        colLines = new paper.Group();

        let thing = styles.guides.primary;

        for (let i = -this.options.grid.size/2; i < this.options.grid.size/2; i++) {
            colLines.addChild(this.yLine(i * this.resX, styles.guides.primary));
            rowLines.addChild(this.xLine(i * this.resY, styles.guides.primary));
            for (let j = -4; j <= 4; j+=2) {
                if (j) {
                    colLines.addChild(this.yLine(i * this.resX + (j * (this.resX/10)), styles.guides.secondary));
                    rowLines.addChild(this.xLine(i * this.resY + (j * (this.resY/10)), styles.guides.secondary));
                }
            }
        }

        colLines.translate([paper.view.center.x + (this.resX/2), 0]);
        rowLines.translate([0, paper.view.center.y + (this.resY/2)]);

    }

    createGridPoints () {

        this.gridPoints = new paper.Group();

        let _this = this;

        this.points.forEach((point) => {
            _this.gridPoints.addChild(GridNodeFactory(point, this.options));
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