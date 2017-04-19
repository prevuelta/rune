'use strict';

let paper = require('paper');
let styles = require('../../global/styles');
let Events = require('../../global/Events');

let Canvas = require('./CanvasService');

module.exports = function (point, renderedPoint) {

	let node;
    Canvas.drawToLayer('interactive', () => {
        node =  new paper.Path.Circle(renderedPoint, 8);
    });

    let _node = node;

    node.isHandle = true;

    if (point) {
        node.value = point;
        node.isSelected = point.isSelected || false;
        node.style = point.isSelected ? styles.node.selected : styles.node.normal;
        node.onMouseDown = function(e) {
            e.event.stopImmediatePropagation();
            _node.style = _node.isSelected ? styles.node.selected : styles.node.normal;
            Events.selectPoint.dispatch(e.target.value);
            Events.draw.dispatch();
        };
        node.setSelected = function (selected) {
            _node.isSelected = selected;
            _node.style = selected ? styles.node.selected : styles.node.normal;
        };
    } else {
        node.style = styles.node.generated;
    }

    node.focus = function () {
        Events.draw.dispatch();
    };

    node.blur = function () {
        _node.fillColor = 'white';
        Events.draw.dispatch();
    };

    return node;
}