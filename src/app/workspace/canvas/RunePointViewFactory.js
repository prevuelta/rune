'use strict';

let paper = require('paper');
let RuneNodeFactory = require('./RuneNodeFactory');
let styles = require('../../global/styles');

function RunePointViewFactory (point, res, layers) {

    let paperPoint = new paper.Point(
        point.render(res)
    );

    // if (point.transform) {
    //     paperPoint = paperPoint.add(new paper.Point(
    //         point.transform[0] * res.x,
    //         point.transform[1] * res.y
    //     ));
    // }

    let handleIn = point.handleIn ? new paper.Point(point.handleIn[0], point.handleIn[1]) : null;
    let handleOut = point.handleOut ? new paper.Point(point.handleOut[0], point.handleOut[1]) : null;

    layers.interactive.activate();

    point.node = RuneNodeFactory(point, paperPoint);

    if (point.isCurve) {
        if (point.isSelected) {
            CreateRuneHandle(paperPoint, paperPoint.add(handleIn));
            CreateRuneHandle(paperPoint, paperPoint.add(handleOut));
        }

        return new paper.Segment({
            point: paperPoint,
            handleIn: handleIn,
            handleOut: handleOut
        });

    } else {
        return paperPoint;
    }
}

function CreateRuneHandle (anchorPoint, handlePoint) {
    let hC = new paper.Path.Circle(handlePoint, 5);
    hC.style = styles.node.handle;
    let l = new paper.Path.Line(handlePoint, anchorPoint);
    l.style = styles.node.handle;
}

module.exports = RunePointViewFactory;