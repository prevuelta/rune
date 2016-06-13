'use strict';

let paper = require('paper')

let styles = require('../../global/styles');
let Canvas = require('./CanvasService');
let Events = require('../../global/Events');

/* ========== Grid view ========== */

var GridNodeFactory = (point, res) => {

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
        e.stopPropagation();
        Events.addPoint.dispatch(e.target.value);
        Events.draw.dispatch();
    };

    return path;
}


module.exports = GridNodeFactory;