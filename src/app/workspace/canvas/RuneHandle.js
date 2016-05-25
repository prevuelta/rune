'use strict';

let paper = require('paper');
let styles = require('../../global/styles');

class RuneHandle {
    constructor (anchorPoint, handlePoint) {
        let hC = new paper.Path.Circle(handlePoint, 5);
        hC.style = styles.node.handle;
        let l = new paper.Path.Line(handlePoint, anchorPoint);
        l.style = styles.node.handle;
    }
}

module.exports = RuneHandle;